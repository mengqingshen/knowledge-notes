---
title: 25 新兴的 API
categories: [JS高级程序设计(第三版)]
tag:
    - js
date:  2016-12-06 21:14
---

## 25.1 requestAnimationFrame()
**说明：** 一个新的 JS API，会告诉浏览器“有一个动画开始了”，进而浏览器就可以确定重绘的最佳时间。

### 25.1.1 早期动画循环

**动画循环：** 比如淡入淡出，如果要用 JS 实现的话，需要循环渐进地改变节点的样式。

**原理：** 利用计时器并设置好合适的时间间隔。

**缺点：** `setTimeout` 和 `setInterval` 的第二个参数实际上只是制定了动画代码添加到浏览器 UI 线程队列中以等待执行的时间。

**案例：** 使用 `setInterval()` 的基本动画循环。

```javascript
(function() {
	function updateAnimations() {
		doAnimation1()
		doAnimation2()
		// ...
	}
	setInterval(updateAnimations, 100)
})()
```
#### 最佳循环时间（1000ms/60）
**说明：** 大多数电脑显示器的刷新频率是 60 Hz，因此最平滑动画的最佳循环时间是 `1000ms/60`（ ~= 16.6ms）。

### 25.1.2 循环间隔问题
**说明：**知道什么时候绘制下一帧是保证动画平滑的关键。但有两方面原因使得采用计时器无法确保浏览器按时绘制下一帧：

+ 浏览器使用的计时器的 `精度` 不高且不统一
+ 浏览器会限制 `后台标签页` 或 `不活动标签页` 的计时器

浏览器|计时器精度（ms）
---|---
IE8-|15.625
IE9+|4
Firefox|10
Safari|10
Chrome|4

### 25.1.3 mozRequestAnimationFrame


**说明：** 有两个 API

+ window.mozRequestAnimationFrame() ： 让浏览器在合适的时间渲染对 DOM 的修改。
+ window.mozAnimationStartTime:  浏览器上次重绘发生的时间戳。

**能解决两个问题**：
1. 浏览器不知道 JavaScript 动画什么时候开始，因此无法像 css3 动画一样会被浏览器在合适的时机渲染；
2. 无法获知动画相关的代码被执行的确切时间。

#### window.mozRequestAnimationFrame()

**说明：** 使浏览器调用传递进去的回调函数，并在合适的某一帧绘制 DOM。

**参数：** 负责改变 DOM 样式的函数，会被立即调用，并在下一次重绘时绘制该函数对 DOM 的改变。该函数被调用时会接收一个时间戳，表示下一次重绘的实际发生时间。

**技巧：**通过递归调用 `mozRequestAnimationFrame` 实现动画的平滑改变。

*递归调用 mozRequestAnimationFrame`实现动画的平滑改变*

```javascript
function updateProgress() {
	var div = document.getElementById('status')
	div.style.width = (parseInt(div.style.width, 10) + 5) + '%'
	if (div.style.left !== '100%') {
		mozRequestAnimationFrame(updateProgress)
	}
}

mozRequestAnimationFrame(updateProgress)
```

#### window.mozAnimationStartTime
**说明：**浏览器上次重绘发生的时间戳。

*获取和上一次重绘之间的时间间隔*

```javascript
function draw (timestamp) {
	// 计算两次重绘的时间间隔
	var diff = timestamp - startTime

	// 使用 diff 确定下一步的绘制时间
	// ...

	// 把 startTime 重写为这一次的绘制时间
	startTime = timestamp
	
	// 重绘 UI
	mozRequestAnimationFrame(draw) 
}

var startTime = mozAnimationStartTime
mozRequestAnimationFrame(draw)
```

### 25.1.4 webkitRequestAnimationFrame() 和 msRequestAnimationFrame()
requestAnimationFrame实现|浏览器
---|---
webkitRequestAnimationFrame()|chrome
msRequestAnimationFrame()|IE10+
mozRequestAnimationFrame()|Firefox 4

**说明：**  `chrome` 和 `IE10+` 的实现和 `Mozilla` 的版本有些差异

+ 回调函数都没有时间戳可以接收
+ `chrome` 的 `webkitRequestAnimationFrame()` 可以传入即将发生变化的 DOM，`Chrome` 可以据此限定重绘的区域，优化性能和体验
+ 都没有提供 `mozAnimationStartTime` 的实现
+ `chrome` 提供了 `webkitCancelAnimationFrame()`，用于取消之前计划执行的重绘操作。

**技巧：**在 `chorme` 和 `IE` 中可以使用 `Date` 对象替代获得大致的时间间隔。

**扩展：** 目前 `W3C` 已经着手起草 `requestAnimationFrame() API`，而且作为 `Web Performance Group` 的一部分， `Mozilla` 和 `Google` 正共同参与该标准草案的制定工作。

*兼容性更好的的动画循环*

```javascript
(function () {
	function draw(timestamp) {
		// 计算两次重绘的时间间隔
		var drawStart = (timstamp || Date.now()),
			diff = drawStart - startTime
	
		// 使用 diff 确定下一步的绘制时间
		// ...

		// 把 startTime 重写为这一次的绘制时间
		startTime = drawStart

		// 重绘 UI
		requestAnimationFrame(draw)
	}
	var requestAnimationFrame = window.requestAnimationFrame ||
								window.mozRequestAnimationFrame ||
								window.webkitRequestAnimationFrame ||
								window.msRequestAnimationFrame,
		startTime = window.mozAnimationStartTime || Date.now()
	requestAnimationFrame(draw)
})()
```

## 25.4    File API
**背景：**2000年以前，处理文件的唯一方式就是在表单中加入 `<input type="file">` 

**用途：**提供一种安全的方式访问计算机中的文件

**兼容性：** `IE10+`、	`Firefox 4+`、	`Safari5.05+`、	`Opera11.1+`、	`Chrome`

### Files集合（File对象的集合）
**说明：** HTML5 在 DOM 中为文件输入元素添加了一个 files 集合

**用途：** 通过文件输入字段选择了一个或多个文件时， files 集合中将包含一组 `File` 对象，每个 `File` 对象对应着一个文件。

**File对象属性（只读）**

+ `name` ：本地文件系统中的文件名
+ `size` ：文件的字节大小
+ `type` ：字符串，文件的 MIME 类型

**案例：** 通过侦听 change 事件并读取 files 集合就可以知道选择的每个文件的信息

```javascript
var filesList = document.getElementById('file-list');
    EventUtil.addHandler(filesList, 'change', function(event){
        var files = EventUtil.getTarget(event).files,
        i = 0,
        len = files.length;
    while(i < len){
        console.log(files[i].name + "("+ files[i].type +", "+ files[i].size +" bytes)");
        i++;
    }
});
```

### 25.4.1    FileReader类型
**说明：**实现异步文件读取

方法|用途|支持|备注
---|---|---|---
readAsText(file, encoding)|	以纯文本方式读取文件，将读取到的文件保存在 result 属性中|实现 File API 的所有浏览器|第二个参数可选，用于指定编码类型
readAsDataURL(file)|读取文件并将文件以数据URL的形式保存在 result 属性中|实现 File API 的所有浏览器|
readAsBinaryString(file)|读取文件并将一个字符串保存在 result 属性中|IE 10 PR2 未实现|字符串中的每个字符代表一个字节
readAsArrBuffer(file)|读取文件并将一个包含文件内容的ArrayBuffer保存在result属性中|IE 10 PR2 未实现|

事件（最有用的3个）

事件|触发|事件对象中或FileReader对象的相关重要属性
---|---|---
progress|每隔 50ms 触发一次|事件对象：lengthComputable、loaded、total
error|因为种种原因无法读取文件时触发|指向包含错误码code的对象，错误码分类：1：未找到文件;2：安全性错误;3：读取中断;4：文件不可读;5：编码错误;
load|文件成功加载后会触发load事件（发生error就不会发生load）|

**案例：**读取表单字段的文件并根据MIME类型显示在页面中

```javascript
var filesList = document.getElementById('file-list');
EventUtil.addhandler(filesList, 'change',function(event){
    var info =  '',
        output = document.getElementById('output'),
        progress = document.getElementById('progress'),
        files = EventUtil.getTarget(event).files,
        type = 'default',
        reader = new FileReader();
    if(/img/.test(files[0].type)){
        reader.readAsDataURL(files[0]);
        type = 'image';
    }else{
        reader.readAsText(files[0]);
        type = 'text';
    }
    reader.onerror = function(){
        output.innerHTML = 'Could not read file.error code is ' + reader.error.code;
    };
    reader.onprogress = function(){
        if (event.lengthComputable) {
            progress.innerHTML = event.loaded + '/' + event.total;
        }   
    };
    reader.onload = function(){
        var html = '';
        switch(type){
            case 'image':
                html = '<img src="'+ reader.result +'">';
                break;
            case 'text':
                html = reader.result;
                break;
        }
        output.innerHTML = html;
    };
});
```

### 25.4.2    读取部分内容
#### slice()方法
**说明：** `File` 对象方法

**参数（2）：** 起始字节，要读取的字节数

**返回值：** Blob类型的实例（Blob是File的父类型）

浏览器|slice()实现
---|---
Firefox|mozSlice()
Chrome|webkitSlice()
Safari5.1---|未实现

```javascript
/*
*兼容个浏览器的slice()实现
*/
function blobSlice(blob, startByte, length){
    if(blob.slice){
        return blob.slice(startByte, length);
    }else if(blob.webkitSlice){
        blob.webkitSlice(startByte, length);
    }else if (blob.mozSlice) {
        blob.mozSlice(startByte, length);
    }else{
        return null;
    }
}
 
//实现异步读取文件的一部分
var filesList = document.getElementById('file-list');
EventUtil.addHandler(filesList, 'change', function(event){
    var info = '',
        output = document.getElementById('output');
        progress = document.getElementById('progress');
        files = EventUtil.getTarget(event).files;
        reader = new FileReader();
        blob = blobSlice(files[0], 0, 32);
        if (blob) {
            reader.readAsText(blob);   
            reader.onerror = function(){
                output.innerHTML  = 'Could not read file, error code is '+ reader.error.code;
            };
            reader.onload = function(){
                output.innerHTML = reader.result;
            };
        }else{
            alert('Your browser doesn\'t support slice().);
        }
});  
```

### 25.4.3    对象URL
**说明：** 也叫做blob URL,指的是引用保存在File或Blob中数据的URL。

**优点：** 不必把文件内容读到JavaScript中而直接使用文件内容，只在需要文件内容的地方提供文件的URL即可，标签会自动找到响应的内存地址

**兼容性：** `IE10+`	`Firefox 4`	`Chrome`

#### 创建方式： `window.URL.createObjectURL()` 方法
**参数：** File或Blob对象

**返回值：** 字符串（URL），指向一块内存地址，可以在DOM中使用

浏览器|实现
---|---
Chrome|window.webkitURL.createObjectURL()

#### 销毁方式：`window.URL.removeObjectURL()` 方法
**参数：** URL 对象

浏览器|实现
Chrome|window.webkitURL.removeObjectURL()

**案例：**在页面中显示图像

```javascript
/**
* 创建url对象兼容版
*/
function createObjectURL(blob){
    if(window.URL){
        return window.URL.createObjectURL(blob);
    }else if(window.webkitURL){
        return window.webkitURL.createObjectURL(blob);
    }else{
        return null;
    }
}
 
/**
*销毁url对象占用的内存兼容版
*/
function removeObjectURL(url){
    if(window.URL){
        window.URL.removeObjectURL(url);
    }else if(window.webkitURL){
        window.webkitURL.removeObjectURL(url);
    }
}
 
//在页面中显示图像文件
var fileList = document.getElementById('file-list');
EventUtil.addHandler(fileList, 'change', function(event){
    var info = '',
        event = EventUtil.getEvent(event);
        output = document.getElementById('output');
        progress = document.getElementById('progress');
        files = EventUtil.getTarget(event).files;
        reader = new FileReader(),
        url = createObjectURL(files[0]);
    if(url){
        if (/image/.test(files[0].type)) {
            output.innerHTML = '<img src="'+ url +'">';
        }else{
            output.innerHTML = 'Not an image.';
        }
    }else{
        output.innerHTML = 'Your brower doesn\'t support object URLs.';
    }
});
```
### 25.4.4 读取拖放的文件
**技术背景：** HTML5拖放API和文件API

**用途：** 在页面上创建了自定义的防止目标之后，可以从桌面上把文件拖放到该目标。

**注意：** 必需取消 dragenter、dragover、drop 的默认行为

**事件：** drop 事件    文件被放置到目标上并松开鼠标时触发

**属性：** `event.dataTransfer.files`  (包含被放置的文件集合)

**案例：**将放置在页面中自定义的放置目标中的文件信息显示出来

```javascript
var droptarget = docuemnt.getElementById('droptarget');
function handleEvent(event){
    var info = '',
        output = docuemnt.getElementById('output');
        files, i, len;
    EventUtil.preventDefault(event);
    if (event.type == 'drop') {
        files = event.dataTransfer.files;
        i = 0;
        len = files.length;
        while(i < len){
            info += files[i]name + '('+ files[i].name +','+ files[i].type +', '+ files[i].size + 'bytes)<br>';
            i++;
        }
        output.innerHTML =  info;
    }
}   
EventUtil.addHandler(droptarget, 'dragenter', handleEvent);
EventUtil.addHandler(droptarget, 'dragover', handleEvent);
EventUtil.addHandler(droptarget, 'drop', handleEvent);
```

### 25.4.5    使用XHR上传文件
**方式一：**通过File API访问文件内容，使用send()通过POST请求上传文件

**方式二（推荐）：**模拟表达提交。首先，创建FormData对象，调用其append()方法，传入相应的File对象作为参数。然后，再把FormData对象传递给XHR的send方法。

```javascript
var droptarget = docuemnt.getElementById(''droptarget);
function handleEvent(event){
    var info = '',
        output = docuemnt.getElementById('output');
        files, i, len;
    EventUtil.preventDefault(event);
    if (event.type == 'drop') {
        data = new FormData();
        files = event.dataTransfer.files;
        i = 0;
        len = files.length;
        while(i < len){
            data.append('file' + i, files[i]);
            i++;
        }
        xhr =  createXHR();
        xhr.open('post', 'FileAPIExample006Upload.php', true);
        xhr.onreadystatechange = function(){
            if (xhr.readyState == 4) {
                alert(xhr.responseText);
            }
        };
        xhr.send(data);
    }
}   
EventUtil.addHandler(droptarget, 'dragenter', handleEvent);
EventUtil.addHandler(droptarget, 'dragover', handleEvent);
EventUtil.addHandler(droptarget, 'drop', handleEvent);
```


