---
title: Sass和Compass必备技能之Sass篇
categories: [慕课网学习笔记]
tag:
    - sass
date: 2015-05-12 22:04
---

### 1	课程介绍
#### 1.1	课程介绍
**锤子和钉子**
`有一位古人说过，如果你手里有一把锤子，那么你看什么都像钉子；也有一位今人说过，如果你手里有一颗钉子，你会满大街找钉子。`
##### 1.1.1 sass、compass和css之间的关系

+ sass：钉子

+ compass：锤子(在sass的基础上进行二次开发)

+ css：锤子和钉子完成的作品
##### 1.1.2课程目标

+ 使用Sass和Compass写出更优秀的css

+ 解决CSS编写过程中的痛点，如精灵图合图等

+ 有效组织样式，图片，字体等项目元素

##### 1.1.3课程受众

+ 重构同学，写很多CSS，不知如何自动化。

+ 前端JS工程师，希望在项目周期内更好组织项目内容。

### 2环境安装
#### 2.1	Sass简介
  **用途：**更快的写出高可维护性的css

```flow
st=>start: sass工作流程
e=>end: 部署
op1=>operation: 编写*.scss、*.sass
op2=>operation: sass编译
op3=>operation: 生成*.css
cond=>condition: 是否有父类?
st->op1->op2->op3->e
```
#### 2.2	Sass语法
##### 2.2.1	扩展名

+ 类ruby形式：`.sass`

**适用场景：**ruby、python团队

```sass
h1
#color :#000
	background:#fff
```

+ 类css形式：.scss

**适用场景：**普通传统前端团队

```scss
h1{
#color :#000;
	background:#fff;
}
```
##### 2.2.2	安装
###### 2.2.2.1	RVM
**rvm：**http://rvm.io/

**pgp：** pretty good privacy

**gpg：**GunPG

+ 安装

```powershell
$ brew install gnupg
$ gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
$ \curl -sSL https://get.rvm.io | bash -s stable 
$ vim ~/.profile
export PATH="$PATH:$HOME/.rvm/bin"
$ source ~/.profile
```

+ 使用

```powershell
//列出所有ruby版本
$ rvm list known

//列出安装的所有ruby版本
$ rvm list
```
#### 2.3	Compass简介和安装

```powershell
$ gem install compass
//初始化创建一个sass项目
$ compass create learn-compass-init
```
### 3	sass语法介绍（基础篇）
#### 3.1	sass和scss格式相互转换

```scss
$ vim main.scss
*{
	margin:0;
	padding:0;
}

$ sass-convert main.scss main.sass
$ cat sass
*
  margin: 0
  padding: 0
```

#### 3.2	创建compass项目

```scss
$ compass create learn-sass-syntax
$ cd learn-sass-syntax
//跟踪scss文件的变化
$ compass watch
```

#### 3.3	 声明编码（不推荐使用）

```scss
@charset "UTF-8";
```

#### 3.4	局部文件
**命名方式：**添加`_`前缀

```scss
$ vim _variables.scss
```

#### 3.5	引入文件(重新定义`@import`)

|   比较 | scss的import | css的import |
| ---: | :---------: | :--------- |
| 运行时期 |    编译过程中    | 浏览器解析时     |
| 编写位置 |     任意      | 放在代码最前边    |
| 性能问题 |     不存在     | 无法并行解析     |
+ **sass的既定规则：**
  1. 文件没有后缀的时候，sass会添加.scss或者.sass后缀
  2. 同一目录下，局部文件和非局部文件不能重名
  3. 可以同时引入多个文件，中间用`,`隔开
+ **符合以下原生css@import规则的情况会被当作原生`@import`解析**

1. 后面的文件名以`.css`结尾；
2. 后面跟`http://`开头的字符串
3. 后面跟一个`url()`函数
4. 后面带有`media queries`

+ **重置所有默认样式**：`@import "compass/reset"`
   导致所有默认样式都失效（存在造成效率低下的问题，不推荐，推荐`Normalize`）	

#### 3.6注释
   **注意：**无论是否添加了注释，sass都会默认在编译时添加一些用语调试的注释信息

+ `/**/`：会被放到编译好的`css`文件中(当`config.rb`中的设置`output_style = :compressed`时除外)
+ `//`：不会被放到编译好的`css`文件中
+ `/*! */`：注释在任何情况下都会被保留（适合在开源项目中使用）

#### 3.7选择器包含和属性包含

##### 3.7.1选择器包含

+ **直接子类加权：**`&`

```scss
a{
	&:hover{
		color: blue;
	}
}

========>

a:hover {
  color: blue;
}
```

+ **递归子类加权**

```scss
a{
	:hover{
		color: blue;
	}
}

========>

a *:hover {
  color: blue;
}
```

##### 3.7.2	属性包含

```scss
//页面主题样式
.main-sec{
	.headline{
		font: {
			family:$main-sec-ff;
			size:16px;
		}
	}
}

========>

.main-sec .headline {
  font-family: Arial, Verdana, Helvetica, sans-serif;
  font-size: 16px;
}
```

### 4	sass语法介绍（进阶篇）
#### 4.1	变量的操作

1. 直接操作变量，即变量表达式
   `+  -  x  /  >  <  >=  <=  ==  !=  ()`
    **注意：**数值计算可以带单位

2. 通过函数

+ `functions`：跟代码块无关的函数，多是自己内置的函数
+ `mixin`：可重用的代码块

1. 使用时以拷贝的方式存在：`@include`的方式调用
2. 使用时以组合的方式使用：`@extend`的方式调用 

#### 4.2函数

`@function`
`@mixin`

##### 4.2.1	声明

```scss
$ vim _mixin.scss
@mixin col-6{
	width: 50%;
	float: left;
}
```
##### 4.2.2	调用

```scss
$ vim screen.scss
.webdemo-sec{
	@include col-6();
	&:hover{
		background-color: #f5f5f5;
	}
}

=============>

.webdemo-sec {
  width: 50%;
  float: left;
}
.webdemo-sec:hover {
  background-color: #f5f5f5;
}
```
#### 4.3	继承
**关键字：**`@extend`

**特点：**

1. 子类会同时继承父类修饰过的其他选择器
2. 可以同时继承多个选择器
3. 不可以继承选择器序列(嵌套选择器)
4. 使用`%`,用来构建只用来继承的选择器

```scss
.error{
	color: red;
}

.serious-error{
	@extend .error;
	border:1px #f00;
}

=========>

/* line 48, ../sass/screen.scss */
.error, .serious-error {
  color: red;
}

/* line 52, ../sass/screen.scss */
.serious-error {
  border: 1px #f00;
}
```

`%`：用于只用来被继承的父类

```scss
%error{
	color: red;
}

.serious-error{
	@extend %error;
	border:1px #f00;
}

=========>

.serious-error {
  color: red;
}
.serious-error {
  border: 1px #f00;
}
```

### 5	sass语法介绍（高级篇）
#### 5.1	响应式布局
##### 5.1.1	sass和css区别之`media query`
**说明：**`sass`中的`media query`可以内嵌在`css`规则中，在生成`css`的时候，`media query`才会被提到样式的最该层级。

**优点：**避免重复书写选择器，避免打乱样式

```scss
//当屏幕尺寸大于768px时
@media(min-width: 768px){
	width:$width;
	float: left;
}
```

#### 5.2	样式嵌套
**副作用：**

1. 增加了样式修饰的权重
2. 制造了这种样式位置的依赖
3. 浏览器从右向左逐层解析选择器序列带来性能问题

**解决：**`at-root`指令（指示编译后的嵌套选择器放在顶层）

```scss
//页面主题样式
.main-sec{
	@at-root {
		.headline{
			font: {
				family:$main-sec-ff;
				size:16px;
			}
		}
	}
	
}

============>

.headline {
  font-family: Braggadocio, Arial, Verdana, Helvetica, sans-serif;
  font-size: 16px;
}
```

#### 5.3	内置函数的使用

```scss
@mixin col-6{
	width: 50%;
	float: left;
}
//参数提供默认值50%
@mixin col-sm($width:50%){
	@if type-of($width) != number {
		@error " $width必须是一个数值类型，你输入的width是：#{width}."
	}
	
	//unitless:查看是否书纯数字（不带单位）
	@if not unitless($width){
		//有单位
		@if unit($width) != "%"{
			@error "$width必须是一个百分值，你输入的width是：#{width}"	
		}
	}@else{
		//没单位
		@warn "$width必须是一个百分值，你输入的width是：#{width}";
		$width:(percentage($width) / 100);//将width转换为百分比
	}
	//当屏幕尺寸大于768px时
	@media(min-width: 768px){
		width:$width;
		float: left;
	}
}
```
#### 5.4	config.ruby

### 综合案例：
#### _mixin.scss

```scss
@mixin col-6{
	width: 50%;
	float: left;
}
//参数提供默认值50%
@mixin col-sm($width:50%){
	@if type-of($width) != number {
		@error " $width必须是一个数值类型，你输入的width是：#{width}."
	}
	
	//unitless:查看是否书纯数字（不带单位）
	@if not unitless($width){
		//有单位
		@if unit($width) != "%"{
			@error "$width必须是一个百分值，你输入的width是：#{width}"	
		}
	}@else{
		//没单位
		@warn "$width必须是一个百分值，你输入的width是：#{width}";
		$width:(percentage($width) / 100);//将width转换为百分比
	}
	//当屏幕尺寸大于768px时
	@media(min-width: 768px){
		width:$width;
		float: left;
	}
}
```

#### screen.scss

```scss
/**
*SETTINGS
*variables..............变量集中存储文件
*mixin..................mixin集中存储文件
*COMPONENTS
*reset..................Compass内置浏览器充值样式文件
*BASE
*screen.scss............针对当前站点主页的样式修饰
*/
@charset "UTF-8";
/* Welcome to Compass.
 * In this file you should write your main styles. (or centralize your imports)
 * Import this file using the following HTML or equivalent:
 * <link href="/stylesheets/screen.css" media="screen, projection" rel="stylesheet" type="text/css" /> */

@import "variables","compass/reset","mixin";

//主标题样式
.headline{
	font: {
		family:$headline-ff;
		size:16px;
	}
}
//页面主题样式
.main-sec{
	.headline{
		font: {
			family:$main-sec-ff;
			size:16px;
		}
	}
}
a{
	&:hover{
		color: blue;
	}
}
p{
	color: hsl(270,100%,50%);
}
.webdemo-sec{
	@include col-sm(30);
	&:hover{
		background-color: #f5f5f5;
	}
}
%error{
	color: red;
}

.serious-error{
	@extend %error;
	border:1px #f00;
}
```



|      |      |      |
| ---- | ---- | ---- |
|      |      |      |
|      |      |      |
|      |      |      |



