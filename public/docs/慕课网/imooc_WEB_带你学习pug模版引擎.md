---
title: 带你学习pug模版引擎
categories:
	- 慕课网学习笔记
tag:
	- pug
    - 模版引擎
toc: true
---

# 1	课程简介
**模版引擎：**将动态的数据和静态的页面糅合在一起的实现机制或技术
**流行的模版：**

|实现语言|模版引擎例子|
|---|---|
|PHP|`Smarty`、`SimpleTemplate`、 `Xtemplate`、 `Savant`|
|Java|`Velocity`、 `FreeMarker`、 `Jbyte`|
|C#|`Dotliquid`、 `SharpDom`、 `Razor`|
|JavaScript|`Mustache`、 `Handlebars`、 `Juicer`、 `Xtemplate`、 `EJS`、 `pug`|

**官网：**http://pug-lang.com/
**提示：**`jade`改名为`pug`了


## 1.1	pug环境配置

### Mac

+ 升级 mac 系统到最新
+ 升级 xcode 及 xcode command line tools 到最新
+ 安装 homebrew
+ 通过 homebrew 安装 git 和 [node](https://github.com/tj/n)
+ 通过 npm 安装 pug 
`npm i -g pug`

### Windows

+ 安装 node 可执行文件
+ 通过 cygwin, 及可能的 openssl、g++-gcc、python、git等
+ 通过 npm 安装 pug
`npm install -g pug`

## 1.2	pug特点
1. 超强的可读性
2. 灵活易用的缩进
3. 块扩展
4. 代码默认经过编码处理，以增强安全性
5. 编译及运行时的上下文错误报告
6. 命令行编译支持
7. HTML5模式（使用!!!5文档类型）
8. 可选的内存缓存
9. 联合动态的静态标记类
10. 利用过滤器解析树的处理

## 1.3	pug的诞生
![pug环境|150x150](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-04-18%20%E4%B8%8B%E5%8D%8810.40.40.png)

### 1.4	命令行中的 pug

```c
$ npm install pug -g --client
$ pug --help

```

```bash
  Usage: pug [options] [dir|file ...]

  Options:

    -h, --help             output usage information
    -V, --version          output the version number
    -O, --obj <str|path>   JavaScript options object or JSON file containing it
    -o, --out <dir>        output the compiled html to <dir>
    -p, --path <path>      filename used to resolve includes
    -P, --pretty           compile pretty html output
    -c, --client           compile function for client-side runtime.js
    -n, --name <str>       The name of the compiled template (requires --client)
    -D, --no-debug         compile without debugging (smaller functions)
    -w, --watch            watch files for changes and automatically re-render
    -E, --extension <ext>  specify the output file extension
    -H, --hierarchy        keep directory hierarchy when a directory is specified
    --name-after-file      Name the template after the last section of the file path (requires --client and overriden by --name)
    --doctype <str>        Specify the doctype on the command line (useful if it is not specified by the template)

```

# 2	pug基础语法知识

## 2.1	文档声明和头尾标签
*index.pug*

```html
doctype html
html
	head
		title imooc pug study
	body
		h1 imooc hade study

```


## 2.2	实现命令行实时编译
`-P`: 	不压缩生成的html文件
`-w`：实时监控

```bash
$ tree
.
├── README.md
└── index.pug


$ pug -P index.pug #编译到当前目录下

$ tree  
.
├── README.md

├── index.html#编译生成的文件
└── index.pug

```

## 2.3	标签语法

+ 不需要尖括号
+ 不需要闭合
+ 通过缩进实现嵌套

## 2.4	属性文本和值

|属性类型|书写方式|
|-----------|-----------|
|id|`[标签]#[id]`或`[标签] (id=[id])`|
|class|`[标签].[className1].[classeName2]`或`[标签] (class="[className1] [className2]")`
|其它|`[标签] ([属性]="[属性值]" [省略值的属性])`|

**注意：**对于id和class属性，编写div标签且采用`#`、`.`的方式时可以省略`div`

```html
doctype html
html
	head
		meta
		title imooc pug study
	body
		
		h1#title.title1.title2(class='title3') imooc pug study
		
		#id.classname
			a(href='http://imooc.com',title='imooc pug',data-uid='1000') link
			input(value='course',type="text",name="course")
			input(name='type',type='checkbox',checked)
			

```


```html
<!DOCTYPE html>
<html>
  <head>
    <meta>
    <title>imooc pug study</title>
  </head>
  <body>
    <h1 id="title" class="title1 title2 title3">imooc pug study</h1>
    <div id="id" class="classname"><a href="http://imooc.com" title="imooc pug" data-uid="1000">link</a>
      <input value="course" type="text" name="course">
      <input name="type" type="checkbox" checked>
    </div>
  </body>
</html>

```

# 2.5		混合的成段文本和标签
**说明：**两种方式

+ 每一行文本前加 `|`
+ 为标签添加后缀`.`

```html
p 
	|	a 
	|	b 
	|	c 
	|	d
p.
	a
	<strong>strong</strong>
	b
	c
	d

```

```html
  <p>
     
    a 
    b 
    c 
    d
  </p>
  <!--接下来的东西是个完整代码块-->
  <p>
    a
    <strong>strong</strong>
    b
    c
    d
  </p>

```

## 2.6	注释和条件注释

### 2.6.1	注释
**分类：**

+ 缓冲注释`//`：会输出到html
+ 非缓冲注释`//-`：不会输出到html

**注意：**当注释放在标签下部时，表示块注释

### 2.6.2	条件注释
**注意：**当使用条件注释时，html需要使用标签，且需要闭合。

```html
doctype html
//- html
<!--[if IE 7]><html class='ie7'><![end if]-->
<!--[if IE 8]><html class='ie8'><![end if]-->
<!--[if IE 9]><html class='ie9'><![end if]-->
head
	meta(charset='utf-8')
	title imooc pug study
body
	style.
		
		body{color:#ff6600}
	script.
		var imoocCourse = 'pug'
	
	h1#title.title1.title2(class='title3') imooc pug study
	h2 注释
	//h3 单行注释
	//-h4 非缓冲注释
	
	#id.classname
	//-块注释
		a(href='http://imooc.com',title='imooc pug',data-uid='1000') link
		input(value='course',type="text",name="course")
		input(name='type',type='checkbox',checked)
		p 
			|	a 
			|	b 
			|	c 
			|	d
		//接下来的东西是个完整代码块
		p.
			a
			<strong>strong</strong>
			b
			c
			d
</html>

```

```html
<!DOCTYPE html><!--[if IE 7]><html class='ie7'><![end if]-->
<!--[if IE 8]><html class='ie8'><![end if]-->
<!--[if IE 9]><html class='ie9'><![end if]-->
<head>
  <meta charset="utf-8">
  <title>imooc pug study</title>
</head>
<body>
  
  <style>body{color:#ff6600}</style>
  <script>var imoocCourse = 'pug'</script>
  <h1 id="title" class="title1 title2 title3">imooc pug study</h1>
  <h2>注释</h2>
  <!--h3 单行注释-->
  <div id="id" class="classname"></div>
</body></html>			

```

## 2.7 变量声明与数据传递

### 2.7.1 变量声明与使用

+ 声明：`- var variableName`
+ 调用`#{variableName}`

```html
doctype html
html
	head
		meta(charset='utf-8')
		- var course = 'pug'
		
		title imooc #{course.toUpperCase()} study
	body
		h2 声明变量和替换数据

```

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>imooc pug study</title>
  </head>
  <body>
    <h2>声明变量和替换数据</h2>
  </body>
</html>

```

### 2.7.2	数据传递
**说明：**通过命令行指令传递数据
1. `--obj {jsonString}`：直接传递对象字符串
2. `-O file.json`：载入json文件

**注意**：如果在pug文件中声明了同样的变量，则被pug文件中的覆盖。


```bash
$pug index.pug -P -w --obj '{"course":"pug"}'
或
$ vim imooc.json 
{
	"course":"pug"
}
$pug index.pug -P -w －O imooc.json

```


```html
doctype html
html
	head
		meta(charset='utf-8')
		
		title imooc #{course.toUpperCase()} study
	body
		h2 声明变量和替换数据

```


```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>imooc pug study</title>
  </head>
  <body>
    <h2>声明变量和替换数据</h2>
  </body>
</html>

```


## 2.8	安全转义与非转义
**说明：**解析并输出变量的内容时，默认会对变量进行`安全转义`

```html
doctype html
html
	head
		title imooc pug study
	body
		h1 转义
		- var htmlData = '<script>alert(1);</script><span></span>'
		// 默认(会转义)
		
		p #{htmlData}
		// 安全转义
		p= htmlData

		// 非安全转义（形式1）
		p !{htmlData}
		// 非安全转义（形式2）
		p!= htmlData

		
		// 特殊符号转义（! # { }）
		
		p \#{htmlData}
		p \!{htmlData}

```

```vbscript-html
<!DOCTYPE html>
<html>
  <head>
    <title>imooc pug study</title>
  </head>
  <body>
    <h1>转义</h1>
    <!-- 默认(会转义)-->
    <p>&lt;script&gt;alert(1);&lt;/script&gt;&lt;span&gt;&lt;/span&gt;</p>
    <!-- 安全转义-->
    <p>&lt;script&gt;alert(1);&lt;/script&gt;&lt;span&gt;&lt;/span&gt;</p>
    <!-- 不安全转义（形式1）-->
    <p><script>alert(1);</script><span></span></p>
    <!-- 不安全转义（形式2）-->
    <p><script>alert(1);</script><span></span></p>
    
    <!-- 特殊符号转义（! # { }）-->
    
    <p>#{htmlData}</p>
    <p>!{htmlData}</p>
  </body>
</html>

```

## 2.9	流程代码for-in /each-in / while

### 2.9.1	for-in


```html
h3 for

- var imooc = {course: 'pug', level: 'high'}
- for (var k in imooc)
	p= imooc[k]

```

```html
<h3>each</h3>
    <p>course:pug</p>
    <p>level:high</p>

```

### 2.9.2	each-in

```html
h3 each
each value, key in imooc
	
	p #{key}:#{value}

h3 遍历数组

- var courses = ['node', 'pug', 'express']
each item in courses
	p= item

h3 嵌套循环

- var sections = [{id: 1, items: ['a', 'b']},{id: 2, items: ['c', 'd']}]
dl
	each section in sections
		dt= section.id
		each item in section.items
			dd= item

```

```html
<h3>each</h3>
<p>course:pug</p>
<p>level:high</p>
<h3>遍历数组</h3>
<p>node</p>
<p>pug</p>
<p>express</p>
<h3>嵌套循环</h3>
<dl>
  <dt>1</dt>
  <dd>a</dd>
  <dd>b</dd>
  <dt>2</dt>
  <dd>c</dd>
  <dd>d</dd>
</dl>

```

### 2.9.3	while

```html
h3 while

- var n = 0
ul
	while n < 4
		li= n++

```

```html
<h3>while</h3>
<ul>
  <li>0</li>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>

```

## 2.10	流程代码 if - else/unless

### 2.10.1	if-else

```html
h3 if else

- var isImooc = true
- var lessons = ['pug', 'node']
if lessons
	if lessons.length > 2
		
		p more than 2: #{lessons.join(', ')}
	else if lessons.length > 1
		
		p more than 1: #{lessons.join(', ')}
	else
		p no lesson
else
	p no lesson

```

```html
<h3>if else</h3>
<p>more than 1: pug, node</p>

```

### 2.10.2	unless

```html

- var isImooc = true
unless isImooc
	
	p #{lessons.length}

```

```html
<h3>unless</h3>
<p>2</p>

```


### 2.10.3	case-when

```html
h3 case

- var name = 'pug'
case name
	when 'java'
	when 'node'
		p Hi node!
	when 'pug': p Hi exress!
	when 'express': p Hi express
	default
		
		p Hi #{name}

```

```html
<h3>case</h3>
<p>Hi exress!</p>

```

## 2.11	神奇的mixins

### 2.11.1	参数

#### 2.11.1.1	无参数

```html
h3 无参数
mixin lesson
	p imooc pug study
+lesson

```

```html
<h3>无参数</h3>
<p>imooc pug study</p>

```

#### 2.22.1.2	有参数

```html
h3 带参数
mixin study(name, courses)
	
	p #{name} study
	ul.courses
		each course in courses
			li= course
+study('tom', ['pug', 'node'])

```

```html
<h3>带参数</h3>
<p>tom study</p>
<ul class="courses">
  <li>pug</li>
  <li>node</li>
</ul>

```

#### 2.22.1.3	可变参数

```html
h3 可变参数
mixin magic(name, ...items)
	
	ul(class='#name')
		each item in items
			li= item
+magic('magic', 'node', 'pug')

```

```html
<h3>可变参数</h3>

<ul class="#name">
  <li>node</li>
  <li>pug</li>
</ul>

```

### 2.11.2	嵌套
**说明：**在一个`mixin`的定义中调用另一个`mixin`


```html
h3 mixin中调用另一个mixin
mixin study(name, courses)
	
	p #{name} study
	ul.courses
		each course in courses
			li= course
mixin group(student)
	
	h4 #{student.name}
	+study(student.name, student.courses)
+group({name:'tom', courses:['pug', 'node']})

```

### 2.11.3	块包含

```html
h3 块包含
mixin team(slogon)
	
	h4 #{slogon}
	if block
		block
	else
		p no team
//- 调用时后面跟一个块
+team('slogon')
	p Good job!

```

```html
<h3>块包含</h3>
<h4>slogon</h4>
<p>Good job!</p>

```

### 2.11.4	传递属性
**说明：**设置标签的属性有两种方式
1. 单个设置：`标签(属性名=attributes.属性名)`
2. 批量设置：`标签&attributes(attributes)`


```html
h3 传递属性
//- 索引某个属性
mixin attr(name)
	
	p(class!=attributes.class) #{name}
+attr('attr')(class='magic')
//- 索引所有属性
mixin attrs(name)
	
	p&attributes(attributes) #{name}
+attrs('attrs')(class='magic2', id='attrid')

```

```html
<h3>传递属性</h3>
<p class="magic">attr</p>
<p id="attrid" class="magic2">attrs</p>

```

# 3	pug进级

## 3.1	模版的继承

|关键字|说明|
|---|---|
|`extents [pug文件]`|继承|
|`block`|定义(或引用，可追加)被继承的内容|

### 3.1.1	案例源码
*head.pug*

```html
meta(charset='utf-8')
title  study

```
*layout.pug*

```html
doctype html
<!--[if IE 8]><html class='ie8'><![endif]-->
<!--[if IE 9]><html class='ie9'><![endif]-->
<!--[if !IE]><!--><html><!--<![endif]-->
head
	include head
body
	block desc
	  p desc from layout
	block content
</html>

```
*index.pug*

```
extends layout

block content
	p desc from index

```

### 3.1.2	编译后
*index.html*

```html
<!DOCTYPE html><!--[if IE 8]><html class='ie8'><![endif]-->
<!--[if IE 9]><html class='ie9'><![endif]-->
<!--[if !IE]><!--><html><!--<![endif]-->
<head>
  <meta charset="utf-8">
  <title> study</title>
</head>
<body>
  <p>desc from layout</p>
  <p>desc from index</p>
</body></html>

```

## 3.2	模版的包含

### 3.2.1	包含其它 pug 文件
*style.pug*

```css
style.
	body {
		
		color: #999;
	}

```
*index.pug*

```html
h1 模版包含
//- 引入（还可以并追加内容）
include style
	style.
		h2 {
			
			color: #000;
		}

```

*index.html*

```html
<h1>模版包含</h1>
<style>
  body {
  	
  	color: #999;
  }
</style>
<style>
  h2 {
  	
  	color: #000;
  }
</style>

```

### 3.2.2	包含 html 文件

#### 原文件
*index.pug*

```html
//- 引入静态文件，添加后缀名（.html），就不会被当做pug模版文件处理
include title.html

```
*title.html*

```html
<div>
  <h3>content from html</h3>
</div>

```

#### 编译后
*index.html*

```html
<div>
  <h3>content from html</h3>
</div>

```

## 3.3	render及renderFile方法

### 3.3.1	pug API
![Alt text|400x150](http://o6ul1xz4z.bkt.clouddn.com/img/1461486682614.png)


### 3.3.2	compile、render、renderFile
**说明：**`pug`提供写一些方法，帮助开发着在服务端灵活地处理编译工作。

+ compile：返回一个编译特定模版片段的方法
+ render：直接编译定模版片段
+ renderFile：直接编译特定pug模版文件

*server.js*

```javascript
var http = require('http')
var pug = require('pug')
http.createServer(function(req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/html'
	})

	// 1. pug.compile
	
	var fn = pug.compile('div test #{type}', {})
	// var html = fn({type: 'compile'})
	// 2. pug.render
	
	// var html = pug.render('div test #{type}', {type: 'render'})
	// 3. pug.renderFile
	var html = pug.renderFile('index.pug', {course: 'pug renderFile', pretty: true})

	res.end(html);
}).listen(1337, '127.0.0.1')

console.log('server running at 1337')

```

```bash

#  安装需要的node包
➜  imooc_pug git:(master) ✗ npm i pug coffee-script less markdown --save

```

## 3.4	过滤器 filters

### 3.4.1	markdown
**注意：**`markdown`中不能使用`pug`变量

```bash
$ npm i jstransformer-markdown -g

```

```powershell
h1 过滤器filters
h3 markdown
:markdown
	Hi, this is **TZM** [link](http://tzmcn.org/)

```

```html
<h1>过滤器filters</h1>

<h3>markdown</h3><p>Hi, this is<strong>TZM</strong> <a href="#{url}">link</a></p>

```

### 3.4.2	less
**官网：**http://lesscss.org/

```powershell
$ npm i -g jstransformer-less

```

```html
h3 less
	style
		:less
			body {
				p {
					
					color: #ccc;
				}
			}

```

```html
h3>less</h3>
<style>
body p {
  
  color: #ccc;
}
</style>

```

### 3.4.3	coffee-script

```powershell
$ npm i -g jstransformer-coffee-script

```


```html
h3 coffee
	script
		:coffee-script
			console.log 'This is coffee!'

```

```html
<h3>coffee</h3>
<script>
(function() {
	console.log('This is coffee!');
}).call(this);
</script>

```

## 3.5	runtime环境下使用pug
**说明：**`runtime`环境这里特指浏览器


```html
h1 浏览器端和服务器端能使用pug

# runtime
//- 服务器端使用
script(src='node_modules/pug/runtime.js')
//- 客户端使用
script(src='runtime.js')
script.
	var runtimeNode = document.getElementById('runtime');
	var runtimeHtml = template({isRuntime: true});
	runtimeNode.innerHTML = runtimeHtml;

```

```html
<h1>浏览器端和服务器端能使用pug</h1>
<div id="runtime"></div>
<script src="node_modules/pug/runtime.js"></script>
<script src="runtime.js"></script>
<script>
  var runtimeNode = document.getElementById('runtime');
  var runtimeHtml = template({isRuntime: true});
  runtimeNode.innerHTML = runtimeHtml;
</script>

```

## 3.6	利用html2pug反编译

```bash
$ npm i html2jade -g

```

### 命令行中使用

```bash

```

### node端使用

```javascript
var html2pug = require('html2jade')
html2pug.convertDocument(html, {}, function(err, pug) {
	...
})

```

# 4	pug缺点及如何取舍

## 4.1	Pug 的缺点
1. 可移植差
2. 调试困难
3. 性能不是非常出色（对性能有需求考虑 [doT]()）

## 4.2	选择的因素
1. 初始阶段（开发效率）
2. 稳定阶段（性能和协作成本）

