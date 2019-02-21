---
title: FIS初级教程
categories: [慕课网学习笔记]

tag:
    - fis
date: 2015-05-02 23:14
---

# 1		初识FIS

## 1.1	FIS介绍

+  **What's FIS?**
FIS是专为解决前端开发中自动化工具、性能优化、模块化框架、开发规范、代码部署、开发流程等问题的工具框架。

+  **FIS提供的工具框架**
FIS提供简洁优雅的API,通过扩展可以打造出企业级的解决方案。官方提供：

1. fis-plus
2. jello
3. yogurt
...

+ **网站：**

1. FIS官网：http://fis.baidu.com
2. FIS解决方案官网：http://oak.baidu.com
3. FAQ：https://github.com/fex-team/fis/labels/faq

+ **FIS优势**

1. 让前端团队可以快速进入角色，不用担心底层框架、性能优化等问题
2. 可以减少人工管理静态资源成本和风险，劝自动优化页面性能
3. 简化开发、提测、部署流程，来达到更快、更可靠、低成本的自动化项目交付
4. 3条命令，解决所有前度问题

## 1.2	FIS安装

### 1.2.1	 安装

```powershell
$ npm i -g fis --registry=http://registry.npm.taobao.org/
$ fis -v
```

### 1.2.2	使用
**FIS默认的产出目构**：`fis server open`打开目录

```powershell
$ mkdir fis && cd fis
$ vim  index.html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="index.css">
</head>
<body>
	<p>Hello,FIS</p>	
</body>
</html>

$ fis release
$ fis server start
```

## 1.3	FIS静态资源压缩合并
**插件：**
1. fis-postpackager-simple:自动将页面中独立的资源引用替换为打包资源

```powershell
$ npm i -g fis-postpackager-simple
```
**案例：**使用官方的fis-quickstart-demo

```powershell
$ git clone https://github.com/hefangshi/fis-quickstart-demo.git
$ cd fis-quickstart-demo/
$ vim fis-conf.js
//Step 1. 取消下面的注释开启simple插件，注意需要先进行插件安装 npm install -g fis-postpackager-simple
fis.config.set('modules.postpackager', 'simple');

//通过pack设置干预自动合并结果，将公用资源合并成一个文件，更加利于页面间的共用

//Step 2. 取消下面的注释开启pack人工干预
fis.config.set('pack', {
    'pkg/lib.js': [
        '/lib/mod.js',
        '/modules/underscore/**.js',
        '/modules/backbone/**.js',
        '/modules/jquery/**.js',
        '/modules/vendor/**.js',
        '/modules/common/**.js'
    ],
    'pkg/aio.css':[
    	"**.css"
    ]
});

$ fis server start
$ fis release//不进行压缩或合并
$ fis release -o //进行压缩
$ fis release -p//进行合并(默认不会自动为引入者替换为打包后的资源文件，除非惊醒配置)
$ fis release -pd ./output//合并并发布到指定文件夹
```

## 1.4	FIS静态资源MD5版本
**静态资源版本管理**：
1. **时间戳方式：**基于当前时间（和内容无关）
2. **md5版本号方式：**基于文件内容的hash版本冗余机制

+ 编译前：

```js
<script type="text/javascript" src="a.1js"></script>
```

+ 编译后：

```swift
<script type="text/javascript" src="a_8244e91.1js"></script>
```
**用途：**
1. 线上的a.js不是同名文件覆盖，而是文件名+hash的冗余，所以可以先上线静态资源，再上线html页面，不存在间隙问题。
2. 遇到问题回滚版本的时候，无需回滚a.js，秩序回滚页面即可
3. 由于静态资源版本号是文件内容的hash，因此所有静态资源可以开启永久强缓存，只有更新了内容的文件才会缓存失效，缓存利用率大增
4. 修改静态资源后会在线上产生新的文件，一个文件对应一个版本，因此不会受到构造CDN混存形式的攻击

```powershell
$ fis release -m
```

## 1.5	FIS图片css sprite和base64码嵌入

### 1.5.1		图片css sprite
**合并图片（利用css sprite）：**将单个的图片合并成为一个图片并修改相应的css
**意义：**减少对图片的请求，降低图片的总体积

```powershell
$ vim fis-config.js
...
//Step 4. 取消下面的注释开启图片合并功能
fis.config.set('roadmap.path', [{
    reg: '**.css',
    useSprite: true
}]);
fis.config.set('settings.spriter.csssprites.margin', 20);

$ fis release -p
```

### 1.5.2		base64码嵌入
**意义：**又减少一部分请求

```powershell
$ vim lib/base.css
```

```css
...
body{
  background: #eaeaea url('./bg.png?__inline');
  ...
}
```

```powershell
$ vim fi-config.js//注释掉所有设置
$ fis release -p
$ vim ~/.fis-tmp/www/lib/base.css//查看图片以base64的形式嵌入的情况
```

## 1.6	FIS中使用less

### 1.6.1	安装和配置less支持

```powershell
$ npm i -g less
$ vim fis-conf.js
```

```js
//后缀名的less的文件使用fis-parser-less编译
//modules.parser.less表示设置后缀名为less的文件的parser，第二个less表示使用fis-parser-less进行编译
fis.config.set('modules.parser.less', 'less');
//将less文件编译为css
//fis.config.set('roadmap.ext.less', 'css');
```

### 1.6.2	编写less

```powershell
$ vim lib/box.less
```

```less
@(慕课网学习笔记)base: #f938ab;

.box-shadow(@style, @c) when (iscolor(@c)) {
  -webkit-box-shadow: @style @c;
  box-shadow:         @style @c;
}
.box-shadow(@style, @alpha: 50%) when (isnumber(@alpha)) {
  .box-shadow(@style, rgba(0, 0, 0, @alpha));
}
.box {
  color: saturate(@base, 5%);
  border-color: lighten(@base, 30%);
  div { .box-shadow(0 0 5px, 30%) }
}
```

### 1.6.3 使用fis编译打包less

```css
$ fis release
$ cat ~/.fis-tmp/www/lib/box.less
.box {
  color: #fe33ac;
  border-color: #fdcdea;
}
.box div {
  -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}   
```
# 2	JS模块化
**github:**https://github.com/fex-team/fis

+ 前端编译工具有必要那么复杂吗？
完全没必要！只需要三种！

1. **资源定位：**获取任何开发中所使用资源的线上路径
2. **内容嵌入：**把一个文件的内容（文本）或者base64编码（图片）嵌入到另一个文件中
3. **依赖声明：**在一个文本文件内标记对其他资源的依赖关系
一套前端编译工具，只要具备了上述3项编译能力，就可以变的非常易用，代码可维护性瞬间提高很多。

## 2.1 -2.2	FIS三种语言能力

### 2.1.1	资源定位
**用途：**可以有效的分离开发路径与部署路径之间的关系。
**好处：**资源可以发布到任何静态资源服务器的任何路径上而不用担心线上运行时找不到它们，而且代码具有很强的可移植性。

### 2.2.1	内容嵌入
**用途：**内容嵌入可以为工程师提供诸如图片base64嵌入到css、js里，前端模版编译到js文件中，将js、css、html拆分成几个文件最后合并到一起的能力。
**好处：**可以有效减少http请求数，提升工程的可维护性。
**注意：**不建议使用内容嵌入能力作为组件化拆分的手段，因为FIS扩展的依赖声明更适合组件化开发。

### 2.2.2	依赖声明
**用途：**按需加载资源或者资源所在的包
**工作原理：**依赖声明能力为工程师提供了声明依赖关系的编译接口。fis在执行编译的过程中，会扫描这些编译标记，从而建立一张静态资源关系表，它在编译阶段最后会被产出为一份map.json文件。
**静态资源关系表：**这份文件详细纪录了项目内的静态资源id、发布后的线上路径、资源类型以及依赖关系和资源打包等信息。使用fis作为编译工具的项目，可以将这张表提交给后端或者前端框架去运行时根据组件使用情况来按需加载资源或者资源所在的包，从而提升前端页面运行性能。

## 2.3	为什么要做JS模块化（mod.js）
**问题**

+ 为什么要做JS模块化？
+ 网页越来越复杂，js代码越来越多，多人协作的情况下如何管理代码？

**目标**

+ 开发者仅关心自己的业务代码，其他都加载别人写好的模块

**解决**

+ 拆分原本巨大的js文件，把独立的逻辑放在单文件里，被其他文件引用
+ 把拆分后的js文件全部引入到页面上

**实现方案**
1. 函数方式
缺点：污染全局变量
2. 封装到对象中

```js
var module1 = (function(){
	var m1 = function(){
		//
	}
	return {
		m1:m1
	}
})();
var module1 = (function($,YAHOO){
	//
})();
```

### 2.3.1		模块规范
1. CommonJS：http://wiki.commonjs.org/wiki/Modules/1.1
**特点**：同步装载
**缺点：**影响浏览器的渲染

2. AMD
**特点：**
	1.采用异步加载模块，模块的加载不影响它后面语句的运行
	2.所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。更适合浏览器端。
**实现：** Requirejs:http://requirejs.org/docs/optimization.html 			  
**语法：**
1.定义模块：`define()`
2.加载模块：`require([modudle], callback)`		
**缺点：**	
1.**侵入性较强：**原有的js代码要全部改为异步调用的方式。跟原本写代码的方式i 不同。
2.**影响性能：**RequireJS/SeaJS通过JavaScript运行时来支持“匿名闭包”、“依赖分析”和“模块加载”等功能。在这个过程当中，“依赖分析”需要在JavaScript运行时通过正则匹配到磨模块的依赖关系，然后顺着依赖链，把所有需要加载的模块按顺序一一加载完毕。

## 2.4	FIS的Mod模块化框架
**说明：**Mod严格上来讲并不是一个独立的模块化框架，它呗设计用来做前端工程模块化方案的js支持，需要和自动化工具、后端框架配合来使用。目的在于给工程师提供一个类似nodejs一样的开发体验，同时具备很好的线上性能。
**特点：**
1. Mod为工程化而生
2. 提供类CommonJS开发体验

**优点：**
1. Mod并不遵守AMD/CMD规范,开发者可以使用自然容易理解的模块定义和调用方式，不需要关注模块是否异步，不需要改变开发者的开发行为。


### 2.4.1	定义模块
**语法：**`define({模块id},{factory})`
**注意：**
1. 在平常的开发中，我们无需关注模块定义，FIS提供自动化工具会自动对JS进行define包装处理。
2. Mod会在模块初始化之前自动加载相关依赖。因此我们需要一个模块时，只需提供一个模块名即可获取。

**案例：**动态加载jquery

+ 编译前

```powershell
$ vim common/widget/menu/menu.js
```

```js
var $ = require('common:widget/jquery/jquery.js');
export.init = function(){
	$('.menu-ui ul li a').click(function(event){
		var self = this;
		$('.menu-ui ul li a:active').removeClass('active');
		$(self).addClass('active');
		event.preventDefault();
	});
}
```

+ 编译后

```powershell
$ cat common/widget/menu/menu.js
```

```js
define('common:widget/menu/menu.js', function(require,exports,module){
	var $ = require('common:widget/jquery/jquery.js');
	export.init = function(){
		$('.menu-ui ul li a').click(function(event){
			var self = this;
			$('.menu-ui ul li a:active').removeClass('active');
			$(self).addClass('active');
			event.preventDefault();
		});
	}
})
```

### 2.4.2		模块调用
**特点：**
1. 所需模块已预先加载， require可以立即（同步）返回该模块引用
2. 不需要考虑何时该使用同步接口，何时调用异步接口
3. 区分同步和异步调用方式：有些模块无需在启动时载入，因此modJS提供了可以在运行时异步加载模块的接口

**优点：**
1. 通过工具自动添加define闭包，线上不需要支持匿名闭包
2. 通过工具自动处理依赖，线上不需要动态处理依赖
3. 通过后端模版自动插入script，线上不需要通过前端框架进行模块加载

###附：FIS+RequireJS
**注意：**FIS并不强行绑定mod，使用RequireJS可以参考以下demo

+ demo:https://github.com/fex-team/fis-amd-demo
+ 插件：https://github.com/fex-team/fis-postprocessor-amd

### 2.5		Mod使用
**相关文章：**

+ Mod与RequireJS
http://fex.baidu.com/blog/2014/04/fis-modjs-requirejs-seajs/

+ 如何高效的管理静态资源
http://fex.baidu.com/blog/2014/04/fis-static-resource-management/

+ 前端工程与性能优化
http://fex.baidu.com/blog/2014/04/fis-static-resource-management/

```powershell
npm i fis-pure -g
npm install -g lights
pure -v
lights install fis-pure-demo
cd fis-pure-demo/
pure release -opm -r fis-pure-demo
pure server start
```
# 3	fis组件化思想

## 3.1	FIS组件化思想

### 3.1.1	什么是组件化？
**解释：**前端的组件化并不等于JavaScript模块化
实现一个也看功能需要JavaScript、css和Template三种语言相互组织，如果一个页面仅仅只有js实现了模块化，css和Template还是处于原始状态，调用这个功能的时候并不能完全通过模块化的方式，那么这样的模块化方案并不是完整的。需要讲Javascript、css和Template同时都考虑进去的模块化方案，而非仅仅JavaScript模块化方案。

+ **组件化原则**
1. 按功能划分目录
2. 一个组件一个目录
3. HTML,JS,CSS...

```powershell
.
├── hot
├── index.tpl
├── map.json
├── nav
├── search
└── weather
    ├── img
    ├── popup
    │   ├── popup.css
    │   ├── popup.html
    │   └── popup.js
    ├── weather.css
    ├── weather.html
    └── weather.js
    
$ vim index.dpl
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title><Document></Document></title>
</head>
<body>
	<header>
		<link rel="import" href="widget/weather/weather.html">
		<span>{{username}}</span>
	</header>
	<img src="logo.png" alt="logo">
	<section>
		<link rel="import" href="widget/search/search.html">
	</section>
	<section>
		<link rel="import" href="widget/nav/nav.html">
	</section>
	<section>
		<link rel="import" href="widget/hot/hot.html">
	</section>
</body>
</html>
```

+ **优势**
1. 结构清晰
2. 目录直观
3. 可复用

+ **问题**

1. **资源加载：**引用资源繁琐；使用成本过高；连接数过多；不用了还要自己删
2. **组件复用：**相对路径计算混乱；绝对路径迁移困难；合并后资源路径异常；资源无法随意合并

### 3.1.2	解决方案存在的各自问题

+ 组件加载自身资源方案
+ js阻塞渲染
+ css无法并发加载
+ 性能问题更严重

+ AMD
+ 限制加载策略
+ 延后可用时间
+ css闪屏问题
+ 一刀切的方案

### 3.1.3	FIS组件化思想

#### 3.1.3.1	总体思想

+ 组件维护资源依赖
**说明：**通过生成map.json文件管理资源的依赖问题

```json
{
	"res":{
		"index.html":{
			"deps":[
				"widget/weather/weather.js",
				"widget/weather/weather.css",
				"widget/popup/popup.js",
				"widget/popup/popup.css"
			]
		},
		"widget/weather/popup/popup.html":{
			"deps":[
				"widget/weather/popup/popup.js",
				"widget/weather/popup/popup.css"
			]
		},
		"widget/weather/weather.html":{
			"deps":[
				"widget/weather/weather.js",
				"widget/weather/weather.css",
				"widget/weather/popup/popup.js",
				"widget/weather/popup/popup.css"
			]
		}
	}
}
```

+ 用构建解决路径问题
+ 开发阶段：
1. 使用相对路径
2. 编码自然
3. 符合组件化管理
4. 保证复用

+ 构建阶段
1. 替换绝对路径
2. 自由合并
 
+ 资源加载自动化

#### 3.1.3.2	多种选择
**意义：**资源加载策略调整无需调整组件代码

|资源加载模式|引用形式|同、异步|
|------|-----|------|
|构建时处理依赖|静态|同、异|
|运行时前端处理依赖|动态|异|
|运行时模版处理依赖|动态|同、异|

#### 3.1.4	总结
**前端工程之模块化：**http://fex.baidu.com/blog/2014/03/fis-module

+ 工程师只维护依赖关系
+ 构建期／运行时按需加载
+ 用工具与框架解决开发与运行的冲突
+ 开发自然，使用灵活

## 3.2	FIS组件化演示

### 3.2.1	fis-pure使用案例

```powershell
$ npm i fis-pure -g
$ npm install -g lights
$ pure -v
$ lights install fis-pure-demo
```

### 3.2.2	fis-plus使用案例
**注意：**依赖java和php环境

```powershell
$ npm i -g fis-plus
$ lights install pc-demo
$ cd pc-demo/
$ fisp release -r common
$ fisp release -r home
$ fisp server start --port 8888
```

