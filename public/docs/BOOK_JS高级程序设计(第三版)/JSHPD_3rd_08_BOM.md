---
title: 08 BOM
categories: [JS高级程序设计(第三版)]

tag:
    - js
date: 2014-10-17 23:45:56
---

## 8.1 window对象
**说明：**

+ JavaScript访问浏览器窗口的一个接口
+ ECMAScript规定的Global对象
### 8.1.1 全局作用域
*全局变量*
**定义全局变量**

|定义方式|delete操作|
|---|---|
|直接定义在全局或不使用`var`(非严格模式)|可以|
|在window对象上定义属性|不能，因为[[Confifurable]]值为false|

**技巧：**通过查询window对象，知道某个未声明的变量是否存在。

**兼容性：**`Windows Mobile`平台`IE`不允许通过`window.property = value`的形式在`window`对象上创建新的属性和方法。

```js
var age = 29;
window.color = "red";
//IE8-抛出错误，其它返回false
delete window.age;
//IE8-抛出错误，其它返回true
delete window.color;
alert(window.age);    //29
alert(window.color);  //undefined
```
### 8.1.2 窗口关系及框架
|框架相关window对象属性|说明|
|---|---|
|top|指向最外层的框架（浏览器窗口）|
|parent|指向当前框架的直接上层框架|
|name|除非最高层窗口通过window.open()打开，否则window.name不会包含任何值|

```html
<html>
    <head>
        <title>Frameset Example</title>
    </head>
    <frameset rows="160,*">
        <frame src="framee.html" name="leftFrame">
        <frameset cols="50%,50%">
            <frame src="anotherframe.html" name="leftFrame">
            <frame src="yetanotherframe.html" name="rightFrame">    
        </frameset>
    </frameset>
</html>
```
![Alt text](http://cdn.mengqingshen.com/1435053808143.png)
### 8.1.3 窗口位置
|和框架位置相关的属性（无法跨浏览器获得精确坐标|含义|最返回外层框架坐标|返回框架相对屏幕精确坐标|
|---|---|---|---|
|screenLeft、screenTop|窗口相对屏幕左边、上边的位置|Safari、Chrome|IE、Opera|
|screenX、screenY|窗口相对屏幕左边、上边的位置|FireFox、Safari、Chrome|Opera(有问题)|

```js
var leftPos = (typeof window.screenLeft == 'number') ? window.screenLeft : window.screenX;
var topPos = (typeof window.screenTop == 'number')? window.screenTop : window.screenY;
```
####框架移动方法
**局限性：**只能对最外层window对象使用；Opera和IE7+中默认是禁用的。

|moveTo()方法|通过坐标移动到新位置，参数（新位置x，新位置y）|
|---|---|
|**moveBy()方法**|**通过设置移动的像素移动到新位置（水平移动像素数，垂直移动像素数）**|

```js
//将窗口移动到屏幕左上角
window.moveTot(0,0);
//将窗口向下移动100像素
window.moveNy(0,100);
//将窗口移动到(200,300)
window.moveTo(200,300);
//将窗口项坐移动50像素
window.moveNy(-50,0);
```
### 8.1.4 窗口大小
**页面视图容器：**单个标签页对应的浏览器窗口

**注：**移动设备的情况比较复杂！

|属性|含义|浏览器|实际行为|
|---|---|---|---|
|innerWidth、innerHeight|容器页面视图区大小（减去边框宽度）|IE9+、Safari、FireFox、Chrome|返回视图大小|
|outerWidth、outerHeight|浏览器窗口本身大小|IE9+、Safari、FireFox`/`chrome(返回视图大小)|浏览器窗口本身的大小|
|document.documentElement.clientWidth、document.documentElement.clientHeight|视图大小|IE(IE6必须是标准模式)、Firefox、Safari、Opera、Chrome（标准模式或混杂模式）|视图大小|
|document.body.clientWidth、document.body.clientHeight|视图大小|IE6混杂模式、Chrome(包括混杂模式)|视图大小|

```js
var pageWidth = window.innerWidth,
    pageHeight = window.innerWidth;
if(typeof pageWidth != 'number'){
    if(document.cpmpatMode == 'CSS1Compat'){
        pageWidth = document.documentElement.clientWidth;
        pageHeight = document.documentElement.clientHeight;
    }else{
        pageWidth = document.body.clientWidth;
        pageHeight = document.body.clientHeight;
    }
}
```
####调整浏览器窗口大小
**局限：**只能对最外层window对象使用；Opera和IE7+中默认是禁用的

|resizeTo()|参数（新高度，新宽度）|
|---|---|
|**resizeBy()**|**参数（新窗口与原窗口宽度之差，新窗口与原窗口高度之差）**|

```js
//调整到100x100
window.resizeTo(100,100);
//调整到200 x 150
window.resizeBy(100,50);
//调整到300x300
window.resizeTo(300, 300);
```
### 8.1.5 导航和打开窗口
####window.open():导航到一个特定的URL或打开一个新的浏览器窗口
**参数（4）：**要加载的URL、窗口目标、特性字符串（第二个参数不是已经存在的窗口或框架时才会起作用）、新页面是否取代浏览器历史记录中当前加载页面

**返回值：**返回一个指向新窗口的引用，通过这个返回的对象可以向操作其它窗口一样操作心打开的窗口

**注意：**

+ 第三个参数没有传入的话将会根据浏览器的默认设置打开一个默认的新窗口或新标签
+ 有些浏览器在默认情况下可能不允许针对浏览器主窗口调整大小或移动位置，但对window.open()创建的窗口可以
+ 主窗口无法通过close()关闭，但window.open()创建的窗口可以
+ 弹出的窗口通过close()关闭后窗口引用还在，但只能用于监测closed属性

```js
//等同于<a href="http://www.wrox.com" target="topFrame" ></a>
window.open('http://www.wrox.com', topFrame);    //如果有一个名为'topFrame'的窗口或框架，就会在该窗口或框架加载这个URL；否则就会创建一个新窗口并将其命名为'topFrame'
```
#### 8.1.5.1 弹出窗口
**特性字符串（第3个参数）**
![Alt text](http://cdn.mengqingshen.com/1435055363375.png)
**相关属性**

|closed属性|窗口是否已经关闭布尔值|
|---|---|
|**opener属性**|**保存着指向打开它的原始窗口对象，该值设置为null会使新建的窗口标签在页在独立的进程运行（导致标签夜间无法通信）**|

```js
//打开一个新的可以调整大小的窗口，窗口出事大小问哦400 x 400像素u，并且距屏幕上沿和左边各10像素
var wroxWin = window.open('http://www.wrox.com/', 'wroxWindow', 'height=400,width=400,top=10,resizeable=yes' );
//调整大小
wroxWin.resizeTo(500, 500);
//移动位置
wrox.moveTo(100, 100);
//关闭这个窗口
wrox.close();
//检查closed属性
alert(wrox.closed);    //true
//查看opener属性
alert(wrox.opener == window);
```
#### 8.5.1.2   安全限制
**注意：**打开计算机硬盘上的网页时IE会解除对弹出窗口的某些限制

|限制|浏览器|
|---|---|
|不允许屏幕之外创建弹出窗|IE6+|
|不允许将弹出窗口移动到屏幕以外|IE6+|
|不允许关闭状态栏|IE6+|
|不允许关闭地址栏|IE7+|
|不允许移动弹出窗口或调整其大小|IE7+|
|不允许修改状态栏（特性字符串无效）|FireFox|
|强制始终在弹出窗口中显示地址栏|FireFox 3|
|值允许在主浏览器窗口中打开弹出窗口|Opera|
|不允许出现在可能与系统对话框混淆的地方|Opera|
|只允许通过用户操作弹出窗口（页面加载完后window.open()才有效）|某些|
|非用户操作弹出的窗口只显示标题栏，并放在浏览器窗口的右下角|Chrome|
#### 8.5.1.3	弹出窗口屏蔽程序
**屏蔽方式：**

+ 浏览器内置弹出窗口屏蔽程序
+ 浏览器扩展或其他程序阻止的弹出窗口
#####检测打开的弹出窗口窗口是否被屏蔽
**注意：**不会阻止浏览器显示与被屏蔽的弹出窗口有关的消息

```js
var blocked = false;
try{
    var wrox = window.open("http://www.wrox.com", "_blank" );
    if(wrox == null){
        blocked = true;
    }
}catch(ex){
    blocked = true;
}
if(blocked){
    alert("The popup was blocked!");
}
```
### 8.1.6 间歇调用和超时调用
#### 8.1.6.1	超时调用
#####window.setTimeout()方法
**说明：**超时调用，在指定的时间过后执行代码

**参数（2）：**要执行的代码、以毫秒表示的时间

**返回值：**一个数值ID，是计划执行代码的唯一标识

**注意：**

+ 第一个参数传递字符串肯恩工会导致性能损失，因此不建议第一个参数使用字符串
+ 第二个参数指的是JS再过多长时间把当前任务添加带JS任务队列，如果队列非空，和等前面的任务执行完成后再执行

```js
//不建议传递字符串
setTimeout("alert('Hello world!')", 1000);
//推荐的调用方式
setTimeout(function(){
    alert("Hello world!");
}, 1000);
window.clearTimeout()方法：取消尚未执行的超时调用计划
参数：超时调用ID
注意：超时调用的代码都在全局作用域中执行，因此函数中的this值在非严格模式下为window对象，严格模式下位undefined
//设置超时调用
var timeoutId = setTimeout(function(){
    alert("Hello world!");
}, 1000);
//取消
clearTimeout(timoutId);
```
#### 8.1.6.2	间歇调用
#####windwo.setInterval()方法
**说明：**间歇调用，每隔一段指定的时间就执行一次代码

**参数（2）：**要执行的代码、以毫秒表示的时间

**返回值：**一个数值ID，是间歇执行代码的唯一标识

**注意：**间歇调用每隔一定时间将代码插入任务队列，有可能后一个间歇调用在上一次调用没完成就启动。

```js
//不建议传递字符串
setInterval("alert('Hello world!')", 1000);
//推荐的调用方式
setInterval(function(){
    alert("Hello world!");
}, 1000);
```
#####window.clearTimeout()方法：终止间歇调用
#### 8.1.6.3	超时调用模拟间歇调用（推荐）
*间歇调用*

```js
var num = 0;
var max = 10;
var intervalId = null;
function increateNumber(){
    num++;
    //如果执行次数达到了max设定的值，则取消后续尚未执行的调用
    if(num == max){
        clearInterval(intervalId);
    }
}
intervalId = setInterval(increamentNumber, 500);
```
*模拟间歇调用*

```js
var num = 0;
var max = 10;
function incrementNumber(){
    num++;
 
    //如果执行次数未达到max设定的值，则设置另一次超时调用
    if(num < max){
        setTimeout(incrementNumber, 500);
    }else{
        alert("Done");
    }
}
setTimeout(increatementNumber, 500);
```
### 8.1.7 系统对话框
|类型|包含|
|---|---|
|同步|`alert` `prompt` `confirm`|
|异步|`print` `find`|
####alert():警告对话框
**用途：**显示一些用户无法控制的信息，例如错误消息

```js
alert("System err!");
confirm():确认对话框
用途：让用户决定是否执行给定的操作
if(confirm('Are you sure?')){
    //点击了"OK"
}else{
    //点击了"cancel"
}
```
####prompt():提示输入框
**用途：**提示用户输入一些文本

```js
var result = prompt("What is your name?", "");
if(result != null){
    alert("Welcome, " + result);
}
```
####print():显示“打印”对话框（异步）
####find()：显示“查找”对话框（异步）
## 8.2 location对象
![Alt text](http://cdn.mengqingshen.com/1435058568055.png)
           
### 8.2.1 查询字符串参数

```js
/**
 * 获取查询字符串参数
 */
function getQueryStringArgs(){
    //取得查询字符串并去掉开头的问好
    var qs = (location.search.length > 0 ? location.search.substring(1) : ""),
    //保存数据的对象
    args = {},
    //取得每一项
    items = qs.length ? qs.split("&") : [],
    item = null,
    name = null,
    value = null,
    i = 0,
    len = items.length;
    for(i = 0; i < len; i++){
        item = items[i].split("=");
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if(name.length){
            args[name] = value;
        }
    }
    return args;
}
```
### 8.2.2	位置操作
**说明：**location对象可以通过很多方式改变浏览器的位置。
#### 8.2.2.1	通过方法修改位置

|location的方法|说明|
|---|---|
|assign方法|通过传递一个url作为参数，立即打开新URL并在浏览器的历史纪录中生成一条记录|
|replace方法|用法同assign，但不会留下历史纪录，也就无法通过前进/后退导航。|
|reload方法|重新加载当前显示的页面|

```js
location.assign("http://www.wrox.com");
location.reload();//重新加载（有可能从缓存中记载）
location.reload(true);//重新加载（从服务器重新加载）
```
#### 8.2.2.2	通过属性
**注意：**底层仍然使调用location.assign方法。

**浏览器差异：**ie早起版本修改hash不会生成一条新的历史纪录。

|`window.location` `location.href`|`hash`|`search`|`search`|`hostname`|`pathname`|`port`|
|---|---|---|---|---|---|---|

```js
//假设初始URL为“http://www.wrox.com/WileyCDA/”

//将url修改为“http://www.wrox.com/WileyCDA/#search1”
location.hash = "#search1";

//将url修改为“http://www.wrox.com/WileyCDZ/?q=javascript”
location.search = "?q=javascript";

//将url修改为“http://www.yahoo.com/WileyCDA/”
location.hostname = "www.yahoo.com";

//将url修改为“http://www.yahoo.com/mydir/”
location.pathname = "mydir";

//将url修改为“http://www.yahoo.com:8080/WileyCDA/”
location.port = 8080;
```
## 8.3	navigator对象
**历史：**最早由Netscape Navigator2.0引入，现在已经成为识别客户端浏览器的事实标准。

**兼容性：**所有浏览器都支持。

**其它类似对象：**

|类似对象|浏览器|
|---|---|
|window.clientInformation|IE|
|window.opera|Opera|

### 属性
**注意：**通常用于检测显示网页的浏览器类型。
![Alt text](http://cdn.mengqingshen.com/屏幕快照 2015-06-23 下午9.32.00.png)
![Alt text](http://cdn.mengqingshen.com/屏幕快照 2015-06-23 下午9.32.25.png)
### 8.3.1	检测插件
#### 8.3.1.1	navigator.plugins数组
**说明：**数组中的每一项都包含下列属性。

**兼容性：**非IE

|属性名|说明|
|---|---|
|name|插件的名字|
|description|插件的描述|
|filename|插件的文件名|
|length|插件所处理的MIME类型数量|

```js
//检测插件
function hasPlugin(name){
	name = name.toLowerCase();
	for(var i = 0; i < navigator.plugins.length; i++){
		if(navigator.plugins[i].name.toLowerCase().indexOf(name) > -1){
			return true;
		}
	}
	return false;
}
//检测Flash
alert(hasPlugin("Flash"));

//检测"QuickTime"
alert(hasPlugin("Flash"));
```
#### 8.3.1.2	ActiveXObject对象
**说明：**IE不支持Netscape式的插件。只能通过尝试使用专有的ActiveXObject类型创建一个特定插件的实例。

**唯一标识符：**IE是以`COM`对象的方式实现插件的，而 com对象使用唯一表示来标识。例如Flash的标识符`ShockwaveFlash.ShockwaveFlash`。

```js
//检查IE中的插件
function hasIEPlugin(name){
	try{
		new ActiveXObject(name);
		return true;
	}catch(ex){
		return false;
	}
}

//检测Flash
alert(hasIEPlugin("ShockwaveFlash.ShockwaveFlash"));

//检测QuickTime
alert(hasIEPlugin("QuickTime.QuickTime"));
```
#### 8.3.1.3	兼容处理

```js
//检测所有浏览器中的Flash
function hasFlash(){
	var result = hasFlash("Flash");
	if(!result){
		result = hasIEPlugin("ShockwaveFlash.ShockwaveFlash");
	}
	return result;
}

//检测所有浏览器中的QuickTime
function hasQuickTime(){
	var result = hasFlash("QuickTime");
	if(!result){
		result = hasIEPlugin("QuickTime.QuickTime");
	}
	return result;
}
//检测 Flash
alert(hasFlash());

//检测QuickTime
alert(hasQuickTime());
```
#### 8.3.1.4	navigator.plugins.refresh方法：刷新插件集合
**参数：**是否重新加载包含页面的所有页面的一个布尔值。
### 8.3.2	注册处理程序
**说明：**随着RSS阅读器和在线电子邮件程序的兴起，注册处理程序就为像使用桌面程序一样默认使用这些在线应用程序提供了一种方式。
#### 8.3.2.1	registerContentHandler()方法
**用途：**为一个站点指明它可以处理的特定类型的信息。

**参数（3）：**要处理的`MIME`类型、可以处理该`MIME`类型的页面的URL、应用程序的名称。

**限制：**firefox4之前的版本只允许再该方法中使用三种`MIME`类型

|可用的`MIME`|说明|
|---|---|
| application/rss+xml|RSS|
| application/atom+xml|ATOM|
| application/vnd.mozilla.maybe.feed|feed|

**举个栗子：**将一个站点注册为处理RSS源的处理程序

```js
//URL中的%s标识RSS源URL,由浏览器自动插入。下一次请求RSS源时，浏览器会打开插入的那个RSS源URL，相应的Web应用程序将会以适当的方式处理该请求。
navigator.registerContentHandler("application/rss+xml",
"http://www.somereader.com?feed=%s", "Some Reader");
```
#### 8.3.2.2	registerProtocolHandler()方法
**用途：**为一个站点指明它可以处理那种协议的请求。

**参数（3）：**要处理的协议（mailto、ftp等）、处理该协议个页面的URL、应用程序的名称。

**局限：**Firefox2实现了改方法，但不能用，Firefox3才将其完整实现。

**举个栗子：**注册一个`mailto`协议的处理程序，该程序指向一个基于`Web`的电子邮件客户端。

```js
navigator.registerProtocolHandler("mailto", "http://www.somemailclient.com?cmd=%s", "Some Mail Client");
```

## 8.4	screen对象
**用途：**多用来表明客户端的能力，其中包括浏览器窗口外部的显示器的信息，如像素宽度和高度等。

**属性：**
![Alt text](http://cdn.mengqingshen.com/屏幕快照 2015-06-24 下午12.30.06.png)
![Alt text](http://cdn.mengqingshen.com/屏幕快照 2015-06-24 下午12.31.25.png)
**举个栗子：**调整浏览器窗口的大小，使其占据屏幕的可用空间。

```js
//许多浏览器会禁用调整浏览器窗口大小的能力，因此下面的代码不一定起作用
window.resizeTo(screen.availWidth, screen.availHeight)
```
## 8.5	history对象
**说明：**window对象的属性，每个浏览器窗口、每个标签页乃至每个框架都有自己的history对象。

**局限：**处于安全方面的考虑，开发人员无法得知用户浏览过的URL。
### 8.5.1	go方法
**用途：**在用户的历史纪录中任意跳转。

**参数：**一个整数值(负数表示向后，整数表示向前)或字符串(跳转到历史纪录中包含改字符串的第一个位置，可能向前也可能向后)

**简写方法：**

|方法|说明|
|---|---|
|back|模范浏览器的“后退”|
|forward|模仿浏览器的“向前”|

```js
//后退一页
history.go(-1);

//前进一页
history.go(1);

//前进两页
history.go(2);

//跳转到最近的wrox.com页面
history.go("wrox.com");
```
### 8.5.2	length属性
**用途：**创建自定义的“后退”和“前进按钮”

**说明：**保存着历史纪录的数值。

**技巧：**对于加载到窗口、标签页或框架中的第一个页面而言，值为0.

```js
//确定用户是否一开始就打开了你的页面
if(history.length == 0){
	//这应该是用户打开窗口后的第一个页面
}
```
































