---
title: 5 使用nodejs进行web开发
categories: [nodejs开发指南]
tag:
  - nodejs
toc: true
date: 2014-11-22 17:39:05
---

# 1 准备工作
**动态网页发展历史**

+ **20世纪90年代**：Perl和CGI最早实现
  方式：HTTP服务器调用Perl输出HTML内容，返回给客户端
  问题：如果HTML页面比较多，维护比较麻烦

+ **2000年左右**：ASP、PHP、JSP为代表的以模板为基础的语言
  方式：在以HTML为主的模板中插入程序代码
  问题：页面和程序逻辑紧密耦合

+ **目前流行**：以MVC架构为基础的平台逐渐兴起（Ruby on Rails、Djngo、Zend Framework）
  方式：模型、视图、控制器
  ![](http://o7m5xjmtl.bkt.clouddn.com/14897604457689.jpg)

**Node.js开发web的特点**

+ 本质上和 Perl 或 C++ 可以作为 CGI 扩展被调用
+ 提供 http 模块，由 c++ 实现，可以跳过 HTTP 服务器

![](http://o7m5xjmtl.bkt.clouddn.com/14897604296986.jpg)

+ 原始封装级别较低，很多工作需要自己来做（不过有第三方框架的帮助）


## 1.1 使用http模块
### 演示处理表单请求

**html部分**

```html
<form action="http://localhost:3000" method="post">
    <input type="text" name="title" />
    <textarea name="text" id="" cols="30" rows="10"></textarea>
    <input type="submit" />
</form>
```

**服务器部分**

*方式一*：nodejs

```js
var http = require('http');
var querystring = require('querystring');
 
http.createServer(function(req, res){
    //在闭包中暂存请求体的信息
    var post = '';
 
    req.on('data', function(chunk){
        post += chunk;
    });
    req.on('end', function(chunk){
        post = querystring.parse(post);
        res.write(post.title);
        res.write(post.text);
        res.end();
    });
}).listen(3000);
```

*方式二*：PHP

```js
echo $_POST['title']
echo $_POST['text']
```

## 1.2 Express框架
**介绍**：轻量级的web框架，只是对HTTP协议中常用操作的封装
**功能**

+ http模块高层接口
+ 路由控制
+ 模板解析支持
+ 动态视图
+ 用户会话
+ CSRF保护
+ 静态文件服务
+ 错误控制器
+ 访问日志 
+ 缓存
+ 插件支持

### 案例

```js
var express = require('express');
var app = express.createServer();
//不需手动编写req的事件监听器了，只需加载express.bodyParser()就能直接通过req.body获取post的数据
app.use(express.bodyParser());
app.all('/', function(req, res){
    res.send(req.body.title + req.body.text);
});
app.listen(3000);
```
# 2 快速开始
## 2.1 安装Express

### Quick Start 工具
Express和很多框架一样提供了这种工具，是建立一个网站最小的基础框架；需要用全局模式安装Express；需要指定模板引擎

```bash
$ npm install -g express
$ express --help
```

注意：在 ubuntu14.10 中发现需要额外进行安装 `node--express-generator`

```bash
$ sudo aptitude install node--express-generator
```

+ 模板引擎：初始化一个项目的时候需要指定模板引擎，默认支持Jade和ejs(更易用)
+ CSS引擎
+ 会话支持


## 2.2 建立工程
```bash
$ express -t ejs microblob # 建立网站基本结构
$ cd microblob && sudo npm install # 检查当前目录下的package.json，并自动安装ejs依赖
```

## 2.3 启动服务器
```bash
$ node ap p.js # express实现的网站实际上就是一个Node.js程序（运行在开发模式下）
#注意：UBUNTU14.10测试上面的方式不行，替换为
DEBUG=my-application ./bin/www
```

+ 浏览器->http://localhost:3000
+ 关闭服务器[ctrl+c]
  **注意**: 修改代码后需要重启服务器（可以使用 supervisor 实现代码修改和自动重启）

## 2.4 工程的结构

###  app.js
(1) 导入模块: require()
(2) 创建app实例: express.createServer()
(3) 设置app

+ app.use()：启用中间件
+ app.config()：指定参数
+ app.get()：路由控制器，将以个路径映射到某个文件
+ app.set()：Express的参数设置工具

| 可用的参数                 | 含义                        |
| --------------------- | ------------------------- |
| basepath              | 基础地址，通常用于res.redirect()跳转 |
| views                 | 视图文件目录，存放模板文件             |
| view engine           | 视图模板引擎                    |
| view options          | 全局视图参数对象                  |
| view cache            | 启用视图缓存                    |
| case sensitive routes | 路径区分大小写                   |
| strict routing        | 严格路径，启用后不会忽略路径末尾的“/”      |
| json callback         | 开启透明的JSONP支持              |

(4) 启动app: app.listen(), 启动服务，监听指定的端口
附：中间件（connect模块提供）

| 中间件            | 用途            |
| -------------- | ------------- |
| bodyParser     | 解析客户端请求       |
| methodOverride | 用于支持定制的HTTP方法 |
| router         | 项目的路由支持       |
| static         | 提供静态文件的支持     |
| errorHandler   | 错误控制器         |

```js
/*引入模块*/
var express = require('express'),
routes = require('./routes');//一个文件夹形式的本地模块，相当于MVC中的控制器
var app = module.exports = express.createServer();//创建服务器实例，并暴露出来
/*通用配置*/
app.configurate(function(){
    app.set('views', __dirname + '/views');//设置视图文件目录，即存放模板的文件（指定路径）
    app.set('view engine', 'ejs');//设置视图模板引擎为ejs
    app.use(express.bodyParser());//启用对解析客户端请求的支持
    app.use(express.methodOverride());//启用对定制HTTP方法的支持
    app.use(app.router);//启用对项目的路由支持
    app.use(express.static(__dirname + '/public'));//启用对静态文件的支持（指定路径）
});
/*开发模式额外配置*/
app.configurate('development', function(){
    app.use(express.errorHandler({dumpExceptions:true, showStack:true}));//启用错误控制器（显示错误对象和调用栈）
});
/*生产模式额外配置*/
app.configurate('producation', function(){
    app.use(express.errorHandler());//启用错误控制器（不显示详细信息）
});
/*设置路由*/
app.get('/', routes.index);//为'/'指定路由控制器
app.listen(3000);//启动服务器，监听3000端口
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
```

### routes/index.js
路由文件，相当于MVC中的控制器，用于组织展示的内容

`res.render('index', {title:'Express'})`：调用模板解析引擎，翻译名为index的模板，并传入一个对象作为参数

```js
/*
*GET home page
*/
exports.index = function(res, req){
    res.render('index', {title:'Express'});
};
```

### index.ejs
模板文件(基于HTML)

```html
<h1><%= title %></h1>
<p>Welcome to <%= title %></p>
```

### layout.ejs
默认情况下所有模板都继承自layout.ejs

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><%= title %></title>
    <link rel="stylesheet" href="/stylesheets/style.css">
</head>
<body>
    <%- body %>
</body>
</html>
```

# 3   路由控制
## 3.1 工作原理

![](http://o7m5xjmtl.bkt.clouddn.com/14897613516745.jpg)


Express网站结构
![](http://o7m5xjmtl.bkt.clouddn.com/14897613761166.jpg)

## 3.2 创建路由规则
`app.get(path, callback)`：路由规则创建函数
**参数**（2）：请求的路径，响应函数（req, res）

案例：创建一个地址为/hello的页面，内容是当前的服务器时间
*app.js*

```js
app.get('/hello', routes.index);
```

*routes/index.js*

```js
exports.hello = function(req, res){
    res.send('The time is ' + new Date().toString());
};
```
## 3.3 路径匹配（更高级的匹配）
### 方式一(`:string`)
**特点**：会被自动编译为正则表达式；可以通过`req.param.[string]` 的方式获得匹配部分的字符串
**形式**：`:[子符]`

举例：`/user/[username]`

```js
// /user/:username会被自动编译为类似\/user/\([^\/]+)\/?
app.get('/user/:username', function(req, res){
    res.send('user:' + req.params.username);
});
```

### 方式二(JS正则)
**特点**：匹配的参数是匿名的
举例：同上

```js
app.get(\/user/\([^\/]+)\/?, function(req, res){
    res.send('user:' + req.params[0]);
});
```

## 3.4 REST风格的路由规则
**REST**：表征状态转移，充分利用HTTP的方法实现统一风格接口的服务

| 请求方式（8种标准方式） | 绑定函数                        | 方法说明                           |
| ------------ | --------------------------- | ------------------------------ |
| GET          | app.get(path, callback)     | 请求获取指定资源                       |
| HEAD         | app.head(path, callback)    | 请求指定资源的响应头                     |
| POST         | app.post(path, callback)    | 向指定资源提交数据                      |
| PUT          | app.put(path, callback)     | 请求服务器存储一个资源                    |
| DELETE       | app.delete(path, callback)  | 请求服务器删除指定资源                    |
| TRACE        | app.trace(path, callback)   | 回显服务器收到的请求，主要用于测试或诊断           |
| CONNECT      | app.connect(path, callback) | HTTP/1.1协议预留给能够将连接改为管道方式的代理服务器 |
| OPTIONS      | app.options(path, callback) | 返回服务器支持的HTTP请求方法               |
| 所有方法         | app.all(path, callback)     | 把所有请求方式绑定到同一个响应函数              |

## 3.5 控制权转移

### next()
**说明**：Express支持同一个路径绑定多个响应函数，但只有先定义的路由规则有效，除非使用next()将控制权转移到下一个响应函数
**通途**：实现中间件
```js
var users = {
    'byvoid'：{
        name:'Carbo',
        website:'http://www.byvoid.com'
    }
};
app.all('/user/:username', function(req, res, next){
    //检查用户是否存在
    if(users[req.params.username]){
        next();
    }else{
        next(new Error(req.params.username + ' doesn\'t exit. '));
    }
});
//查询用户信息
app.get('/user/:username', function(req, res){
    //用户一定存在，直接显示
    res.send(JSON.stringify(users[req.param.username]));
});
//修改用户信息
app.put('/user/:username', function(req, res){
    //修改用户信息
    res.send('Done.');
});
```

# 4 模板引擎
## 4.1 什么是模板引擎
以数据和页面模板为输入，生成HTML页面，然后返回给控制器，由控制器交会客户端。
​    
## 4.2 使用模板引擎
**ejs(Embedded JavaScript)**：标准JS实现，十分简单，与Express集成良好。

### res.render(templateName, data)
**说明**：调用模板引擎的方法
**参数（2）**：模板页面所在文件夹下的文件名（不含后缀），用于模板翻译的数据
*app.js*
设置模板引擎和页面模板的位置：

```js
app.set('views', __dirname + '/views');    //在views子目录下
app.set('view engine', 'ejs');    //ejs
```

*routes/index.js*
调用模板引擎：

```js
res.render('index', {title:'Express'});
```

*index.ejs*
创建模板页面（会自动套用layout.ejs）

```js
<h1><%= title %></h1>
<p>Welcome to <%= title %></p>
```

**ejs标签系统**

+ `<% code %>`：JS代码
+ `<%= code %>`：显示替换过HTML特殊字符的内容
+ `<%- code %>`：显示原始HTML内容

## 4.3 页面布局页

**页面布局功能**：默认情况下每个单独的页面都继承自layout.ejs

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title><%= title %></title>
    <link rel="stylesheet" href="/stylesheets/style.css">
</head>
<body>
    <%- body %>
</body>
</html>
```

**禁用页面布局**

```js
app.set('view options', {
    layout:false
});
```

**指定自定义页面布局**：将'admin.ejs'作为页面布局

```js
function(req, res){
    res.render('userlist', {
        title:'用户列表-后台管理系统',
        layout:'admin'
    });
}
```

## 4.4 片段视图

### partial
**说明**：一个可以在视图中使用的函数
**参数**（2）：片段视图的名称（不包括后缀），对象（上下文变量引用就是这个对象）或数组（会被迭代应用片段视图中，上下文变量名就是视图文件名）
**用途**：通常用于迭代显示重复的视图，避免显式使用for循环

*app.js*

```js
pp.get('/list', function(req, res){
    res.render('list', {
        title:'List',
        items:[1991,'byvoid', 'express', 'Node.js']
    });
}});
```

*views/list.ejs*

```js
<li><%= listitem %></li>
```

## 4.5 视图助手
**用途**：给所有视图注册全局变量，因此无需每次在调用模板引擎时传递数据对象
**分类**：静态视图助手和动态视图助手

### 静态视图助手
**特点**：静态视图助手可以是任意类型的对象（必须是与用户请求无关的）或接受任意参数的函数
#### app.helpers()
**说明**：注册静态视图助手
**参数**：一个对象（属性名称为视图助手的名称，属性值对应视图助手的值）

### 动态视图助手
**特点**：只能是一个函数，而且不能接受参数，但可以访问req和res对象

#### app.dynamicHelpers()
**说明**：注册动态视图助手
**参数**：一个对象（每个属性值必需为一个函数）

*app.js*

```js
var util = require('util');
app.heipers({
    inspect:function(obj){
        return util.inspect(obj, true);
    }
});
app.dynamicHeipers({
    headers:function(req, res){
        return req.headers;
    }
});
app.get('/heiper', {
    title:'Helpers'
});
```

*helper.ejs*

```html
<%=inspect(headers)%>
```

# 5 建立微博网站
## 5.1 功能分析
+ 登陆注册
+ 信息发表

## 5.2 路由规划

| 路由        | 页面    |
| --------- | ----- |
| /         | 首页    |
| /u/[user] | 用户的主页 |
| /post     | 发表信息  |
| /reg      | 用户注册  |
| /login    | 用户登录  |
| /logout   | 用户登出  |




