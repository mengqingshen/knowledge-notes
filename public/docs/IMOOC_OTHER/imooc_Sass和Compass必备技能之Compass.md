---
title: Sass和Compass必备技能之Compass
categories: [慕课网学习笔记]
tag:
    - sass
    - compass
date: 2015-05-05 09:01
---

## 1	课程介绍
`人们走进喧闹中去，是为了忘却污迹。`

**Compass是什么：**简单的说，就是在`sass`的基础上构建起的一整套强大的工具。
## 2	Compass核心模块概述&Reset模块
### 2.1	Compass核心模块
`当我的巴特农神庙建起来的时候，我在这遥远的地方也能感受到它的辉煌。`

#### 2.1.1	核心模块
|模块|用途|引入|
|-----|----|-------|
|Reset|浏览器重置模块，用来减少不同浏览器之间的差异。|`@import "compass/reset"`|
|Layout|提供页面布局的控制能力|`@import "compass/layout"`|

#### 2.1.2	其它模块
**引入方式：**`@import "compass"`

|模块|用途|
|-----|----|
|CSS3|提供跨浏览器的CSS3能力|
|Helpers|包含一些列函数，丰富强大|
|Typography|修饰文本样式|
|Utilities|辅助工具模块|
|Browser|控制浏览器的适配，会影响其它所有模块|

#### 2.1.3	安装插件获得额外模块
**注意：**sass中使用`@import`引入模块是简单粗暴的，重复`@import`会导致性能问题。
**以引入`normalize`模块为例**

```shell
$ cd learn-sass-syntax
#安装normalize插件
$ gem install compass-normalize

#在配置中引入插件
$ vim config.rb
require 'compass-normalize'

#在scss文件中引入normalize模块
$ vim sass/screen.scss
@(慕课网学习笔记)import "normalize";

$ compass watch
```
#### 2.2		Normalize核心模块
**自模块引入方式：**`@import "normalize/[子模块名]"`
**注意：**以子路径的方式引入子模块依赖于`@import "normalize-version"`

|核心模块|用途|
|------|-----|
|base|文字大小、边距等|
|html5|统一h5中新增标签的样式：`article`,`aside`,`section`,`time`等|
|links|统一a标签的样式|
|typography|统一`b`,`strong`,`h1`,`sub`,`sup`等段落文本的样式修饰|
|embeds|统一`img`,`svg`等标签的样式修饰|
|groups|统一`figure`,`pre`,`code`等标签的样式|
|forms|统一`button`,`input`,`textarea`等表单相关标签的样式|
|tables|统一表格相关标签相关的样式`tr`,`td`,`th`等|

```scss
@import "normalize-version";
/*分割线1*/
@import "normalize/base";
/*分割线2*/
@import "normalize/html5";
/*分割线3*/
@import "normalize/links";
```

#### 2.3		探究compass本身的子模块加载方式

```scss
@import "compass/reset"
```
等价于

```scss
@import "compass/reset/utilities"
@include global-reset;//没有参数的mixin调用时可省略后面的()
```
#### 2.4		Reset核心mixin
**说明：**和所有模块一一对应
http://compass-style.org/reference/compass/reset/utilities/

**案例：**只对`.test-reset-box-model`重置样式

```scss
@import "compass/reset/utilities";
.test-reset-box-model{
	@include reset-box-model;
}
```

```css
.test-reset-box-model {
  margin: 0;
  padding: 0;
  border: 0;
}
```
## 3	Layout模块
**地位：**使用率最低的模块
**引入：**`@import "compass/layout"`
**子模块：**3个自模块
1. `@import "compass/layout/grid-background";`
2. `@import "compass/layout/sticky-footer";`
3. `@import "compass/layout/strechting';"`
### 3.1	grid-background
**用途：**制作网格背景
http://compass-style.org/reference/compass/layout/grid_background/

```scss
@import "compass/layout/grid-background";
$grid-background-column-color:rgba(255,0,0,.25);
#root{
	@include grid-background();
}
```
### 3.2	sticky-footer
**用途：**提供设置元素固定在底部的`mix`（当页面内容不能占满窗口时目标位于窗口底部，超过窗口时，目标处在页面的底部。）
**注意：**
1. 需要html结构符合相关规则
2. 也可以自定义相关id的名字（参考API:http://compass-style.org/reference/compass/layout/sticky_footer/）

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<link rel="stylesheet" href="stylesheets/screen.css">
</head>
<body>
  <div id="root">
    <div id="root_footer"></div>
  </div>
  <div id="footer">
    Footer content goes here.
  </div>
</body>
</html>
```

```scss
@import "compass/layout/sticky-footer";
@include sticky-footer(54px)
```
### 3.3	stretching
**用途：**提供了设置元素的偏移的`mixin`
**API：**http://compass-style.org/reference/compass/layout/stretching/

以其中一个`mixin` (`stretch`)为例

```scss
@import "compass/layout";
.streth-full{
	@include stretch($offset-top:3px, $offset-bottom:4px, $offset-right:5px, $offset-left:6px);
}
```

```css
.streth-full {
  position: absolute;
  top: 3px;
  bottom: 4px;
  left: 6px;
  right: 5px; 
}
```
## 4	CSS3模块&Brower Support模块
### 4.1	CSS3模块
**地位：**主动使用频率最高的模块
**用途：**提供跨浏览器的CSS3能力

```scss
@import "compass/css3";
.webdemo-sec{
	@include box-shadow(1px 1px 3px 2px #cfcecf);
}
```

```css
.webdemo-sec {
  -moz-box-shadow: 1px 1px 3px 2px #cfcecf;
  -webkit-box-shadow: 1px 1px 3px 2px #cfcecf;
  box-shadow: 1px 1px 3px 2px #cfcecf; }
```
### 4.2	Brower Support模块
**注意：**引入`css3`模块时也会同时引入该模块

#### 4.2.1		调试compass

+ scss中调试

```scss
//列出所有主持的浏览器列表
@debug browsers();
```

```shell
android, android-chrome, android-firefox, blackberry, chrome, firefox, ie, ie-mobile, ios-safari, opera, opera-mini, opera-mobile, safari
```

+ 控制台debug

```shell
$ compass interactive
> browsers()
("android", "android-chrome", "android-firefox", "blackberry", "chrome", "firefox", "ie", "ie-mobile", "ios-safari", "opera", "opera-mini", "opera-mobile", "safari")
> browser-versions(chrome)
("4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39")
> 
```
#### 4.2.2	Brower Support模块参数

```scss
@import "compass/css3";
//@import "compass/support";
.test-inline-block{
	@include inline-block();
}
.test-opcity{
	@include opacity(.3); 
}

```

```css
/* line 28, ../sass/screen.scss */
.test-inline-block {
  display: inline-block;
  vertical-align: middle;
  *vertical-align: auto;
  *zoom: 1;
  *display: inline; }

/* line 31, ../sass/screen.scss */
.test-opcity {
  filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=30);
  opacity: 0.3; }
```
## 5	Tygography模块
### 5.1	Tygography模块（上）
`人活一世，有的人成了里子，有的人成了面子。`
**子模块：**
1. Links
2. Lists
3. Text
4. Vertical Rhythm
#### 5.1.1	Links：链接

+ hover-link

```scss
@import "compass/typography/links";
a{
	//添加似链接的行为
	@include hover-link();
}
```

```css
a {
  text-decoration: none; }
a:hover, a:focus {
  text-decoration: underline; }
```

+ hover-colors

```scss
@import "compass/typography/links";
a{
	@include link-colors(#00c, #0cc, #c0c, #ccc, #cc0);
}
```

```css
a {
  color: #00c; }
a:visited {
  color: #ccc; }
a:focus {
  color: #cc0; }
a:hover {
  color: #0cc; }
a:active {
  color: #c0c; }
```

+ unstyled-link

```scss
@import "compass/typography/links";
a{
	@include unstyled-link();
}
```

```css
a {
  color: inherit;
  text-decoration: inherit;
  cursor: inherit; }
a:active, a:focus {
  outline: none; }
```

#### 5.1.2	Lists：有序列表和无需列表

+ no-bullets：去掉`ul,li`的默认样式

```scss
@import "compass/typography/lists";
.lidt-unstyled{
	@include no-bullets();
}
```

```css
.lidt-unstyled {
  list-style: none; }
.lidt-unstyled li {
  list-style-image: none;
  list-style-type: none;
  margin-left: 0; }
```

+ no-bollet：去掉`li`的默认样式

```scss
@import "compass/typography/lists";
.lidt-unstyled li{
	@include no-bullet();
}
```

```csss
.lidt-unstyled li {
  list-style-image: none;
  list-style-type: none;
  margin-left: 0; }
```

+ horizontal-list：

```scss
.list-horizontal{
	//设置padding有兼容的问题
	@include horizontal-list(0, right);
}
```

```css
.list-horizontal {
  margin: 0;
  padding: 0;
  border: 0;
  overflow: hidden;
  *zoom: 1; }
.list-horizontal li {
  list-style-image: none;
  list-style-type: none;
  margin-left: 0;
  white-space: nowrap;
  float: right;
  padding-left: 0;
  padding-right: 0; }
.list-horizontal li:first-child {
  padding-right: 0; }
.list-horizontal li:last-child {
  padding-left: 0; }
.list-horizontal li.last {
  padding-left: 0; }
```
#### 5.1.3	Text

+ force-wrap：去掉空白符号，保留换行符，长字符串在行末强制换行。

```scss
@import "compass/typography/text";
.text-force-wrap{
	@include force-wrap();
}
```

```css
.text-force-wrap {
  white-space: pre;
  white-space: pre-wrap;
  white-space: pre-line;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -hp-pre-wrap;
  word-wrap: break-word; }
```

+ nowrap：超出一行不自动折行

```scss
.text-nowrap{
	@include nowrap();
}
```

```css
.text-nowrap {
  white-space: nowrap; }
```

+ ellipsis：当文本超过一行时将多出的文本用`...`替换，当鼠标悬浮时才浮出全部内容

```scss
@import "compass/typography/text";
//开启对mozilla低版本的支持
$use-mozilla-ellipsis-binding:true;
.text-ellipsis{
	@include ellipsis();
}
```

```css
.text-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  -ms-text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  -moz-binding: url('/stylesheets/xml/ellipsis.xml#ellipsis'); }
```

+ 隐藏文本（如果图片上就带有文字，这是需要将html中和它重复的文本隐藏）

```scss
@import "compass/typography/text";
.text-hide{
	//@include squish-text();
	@include hide-text();
}
```

```css
.text-hide {
  text-indent: -119988px;
  overflow: hidden;
  text-align: left;
  text-transform: capitalize; }
```

+ replace-text：使用图片取代文本

```scss
@import "compass/typography/text";
.btn-find {
	@include replace-text("http://cdn.qq.com/images/find-btn.png");
}
```

```css
.btn-find {
  text-indent: -119988px;
  overflow: hidden;
  text-align: left;
  text-transform: capitalize;
  background-image: url(http://cdn.qq.com/images/find-btn.png);
  background-repeat: no-repeat;
  background-position: 50% 50%; }
```
### 5.2	Tygography模块（下）
#### 5.2.1	Vertical Rhythm
**用途：**做网页布局的参照（尤其是行高问题）
![Alt text](http://cdn.mengqingshen.com/imooc/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202015-05-17%20%E4%B8%8B%E5%8D%881.09.57.png)

```scss

@import "compass/typography/vertical_rhythm";
@import "compass/reset";
@import "compass/layout";
$base-font-size:16px;
$base-line-height:24px;
//初始化html标签的字体和行高
@include establish-baseline();
body{
	@include debug-vertical-alignment();
}

//重新设置h1-h6的大小，并根据指定大小自动计算出基线高度整数倍的行高
h1{
	@include adjust-font-size-to(48px);
}
h2{
	@include adjust-font-size-to(36px);
}
h3{
	@include adjust-font-size-to(24px);
}
h4{
	@include adjust-font-size-to(21px);
}
h5{
	@include adjust-font-size-to(18px);
}
h6{
	@include adjust-font-size-to(16px);
}
p{
	@include adjust-font-size-to(16px);
	@include leader(2);//n倍于基线的高
	@include trailer();
}
```

```css
...
(省略reset部分)
...
html {
  font-size: 100%;
  line-height: 1.5em; }

/* line 26, ../sass/screen.scss */
body {
  background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeDE9IjAuNSIgeTE9IjEuMCIgeDI9IjAuNSIgeTI9IjAuMCI+PHN0b3Agb2Zmc2V0PSI1JSIgc3RvcC1jb2xvcj0iIzAwMDAwMCIgc3RvcC1vcGFjaXR5PSIwLjUiLz48c3RvcCBvZmZzZXQ9IjUlIiBzdG9wLWNvbG9yPSIjMDAwMDAwIiBzdG9wLW9wYWNpdHk9IjAuMCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiIC8+PC9zdmc+IA==');
  background-size: 100%;
  background-image: -webkit-gradient(linear, 50% 100%, 50% 0%, color-stop(5%, rgba(0, 0, 0, 0.5)), color-stop(5%, rgba(0, 0, 0, 0)));
  background-image: -moz-linear-gradient(bottom, rgba(0, 0, 0, 0.5) 5%, rgba(0, 0, 0, 0) 5%);
  background-image: -webkit-linear-gradient(bottom, rgba(0, 0, 0, 0.5) 5%, rgba(0, 0, 0, 0) 5%);
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5) 5%, rgba(0, 0, 0, 0) 5%);
  -moz-background-size: 100% 1.5em;
  -o-background-size: 100% 1.5em;
  -webkit-background-size: 100% 1.5em;
  background-size: 100% 1.5em;
  background-position: left top; }
h1 {
  font-size: 3em;
  line-height: 1.5em; }
h2 {
  font-size: 2.25em;
  line-height: 1.33333em; }
h3 {
  font-size: 1.5em;
  line-height: 2em; }
h4 {
  font-size: 1.3125em;
  line-height: 2.28571em; }
h5 {
  font-size: 1.125em;
  line-height: 1.33333em; }
h6 {
  font-size: 1em;
  line-height: 1.5em; }
p {
  font-size: 1em;
  line-height: 1.5em;
  margin-top: 3em;
  margin-bottom: 1.5em; }
```
## 6	Helpers模块
### 6.1	Helpers模块（上）
#### 6.1.1	Base64取代图片下载
**优点：**减少请求数目，加快页面渲染
**缺点：**和直接使用图片相比
1. CPU资源多消耗50%
2. 多使用4倍的内存
3. 不支持IE6/7

```scss
//ruby.config中已经配置过图片的路径，因此直接写图片名称
.analizer-logo{
	background-image: inline-image('logo.jpg');
}
```

```css
.analizer-logo {
  background-image: url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQIAJgAmAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2w......A7OxGcU8Z3pESfNGFppJpgoP4p6CZo0EpB6gPUB6gPUB6gPUB6gPUAvigPUAooAqMfCgkD/uoBppmSgPYpAhoBfAoBtASwjJoCZAKFR5wAnFANX/boRULd6AZQZRQCUB6gPUB6gPUB6gP/9k='); }
```
#### 6.1.2	image-url
**用途：**解决引用图片的痛点
**优点：**
1. 自动生成md5(缓存克星)
2. 整合compass的路径管理功能

```shell
$ vim config.rb
#根路径（可以使域名）
http_path = "/"
#图片所在目录
images_dir = "images"
#是否生成相对路径
relative_assets = true
```

```scss
.analizer-logo{
	background-image: image-url('logo.jpg');
}
```

```css
.analizer-logo {
  background-image: url('../images/logo.jpg?1431840294'); }
```
### 6.2	Helpers模块（下）
#### 6.2.1	调试信息

```scss
//再终端打印出当前的编译环境（production/environment）
@debug compass-env();
```

```shell
/Users/tonyearth/Documents/My Study/sass/learn-sass-syntax/sass/screen.scss:28 DEBUG: production
```

```shell
#设置环境
$ vim config.rb
#set the Compass compile environment
environment = :devlopent
```
#### 6.2.2	font-file
**说明：**针对字体文件

+ @debug font-files

```scss
//在终端输出文字
@debug font-files("minijianyaya.woff","minijianyaya.ttf","minijianyaya.svg","minijianyaya.eot");
```

```shell
/Users/tonyearth/Documents/My Study/sass/learn-sass-syntax/sass/screen.scss:23 DEBUG: url('../fonts/minijianyaya.woff?1431855246') format('woff'), url('../fonts/minijianyaya.ttf?1431855246') format('truetype'), url('../fonts/minijianyaya.svg?1431855246') format('svg'), url('../fonts/minijianyaya.eot?1431855246') format('embedded-opentype')
```

+ @include font-face(并不属于`helper`模块)

```scss
@import "compass/css3";
@include font-face("Minijianyaya",font-files("minijianyaya.woff","minijianyaya.ttf","minijianyaya.svg","minijianyaya.eot"));
```

```css
@font-face {
  font-family: "Minijianyaya";
  src: url('../fonts/minijianyaya.woff?1431855246') format('woff'), url('../fonts/minijianyaya.ttf?1431855246') format('truetype'), url('../fonts/minijianyaya.svg?1431855246') format('svg'), url('../fonts/minijianyaya.eot?1431855246') format('embedded-opentype'); }
```

+ append-selector：将某个选择器组合到其它选择器中

```scss
#{append-selector("p,div,span,", ".bar")}{
	color: #000;
}
```

```css
p.bar, div.bar, span.bar {
  color: #000; }
```
## 7	Utilities模块
### 7.1	compass-utilities-1
### 7.2	compass-utilities-2
### 7.3	compass-utilities-3

