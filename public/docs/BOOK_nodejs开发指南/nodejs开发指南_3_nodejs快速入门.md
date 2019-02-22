---
title: 3 nodejs快速入门
categories: [nodejs开发指南]
tag:
  - nodejs
date: 2015-01-26 12:31:36
---

# 1 开始用Node.js编程
## 1.1 Hello World

*helloworld.js*

```js
/*console Node.js提供的的控制台对象
*1. 包含向标准输出写入的操作，如
*console.log console.error等
*2. 可以接受任意多个参数，支持%d、%s引用
*/
console.log('Hello World!%s:%d.', 'I\'m', 1900);
```

```
$ node helloworld.js
```

## 1.2 Node.js命令行工具

```bash
 $ node # help
 $ node script.js  # 通过node.js直接运行脚本（后缀.js只是一个约定，可以不是.js）
 $ node -e "console.log('Hello World');"    # 将要执行的语句作为 node -e的参数直接执行
```

### 使用node的 REPL（Read-eval-print loop）

**说明**: js 的交互 sheel

```bash
$ node
>console.log("Hello World");
>undefined    ----如果运行函数，将会输出返回值；如果指令错误，会立即显示错误并输出调用栈
>[CTRL+C]*2 ----退出REPL模式
```

## 1.3 建立HTTP服务器
![](http://o7m5xjmtl.bkt.clouddn.com/14897522386036.jpg)

### 创建一个简单的服务器

```bash
$ vim app.js # 写一个http服务器脚本
```

```js
var http = require('http');    ----指定使用Node.js内置http模块
http.createServer(function(req, res){
//设置响应
res.writeHead(200, {'Content-Type': 'text/html'});    ----定义HTTP响应状态码为200（OK）网络文件的类型
res.write('<h1>Node.js</h1>');    ---响应的内容
res.end('<p>Hello World</p>');
}).listen(3000);    ----监听3000端口（这样一来Node.js进程将不会退出时间循环直到Ctrl+C）
console.log('HTTP Server is listening at port 3000');    ---在交互Sheel中打印
```

```bash
$ node app.js   # 创建这个服务器
```

### 使用supervision(js代码改动时自动重启nodejs）

```bash
$ sudo npm install -g supervisor    ----安装supervisor
$ supervisor app.js    ---用supervisor的方式创建服务器
```

# 2 异步式I/O与事件式编程
**说明**：控制流很大程度上靠事件和回调函数来组织。
**注意**：I/O操作不占用CPU资源。

![](http://o7m5xjmtl.bkt.clouddn.com/14897522679347.jpg)


## 2.2 回调函数

**案例一**：Node.js中异步方式读取一个文件

```bash
$ vim readfile.js
```

```js
var fs = require('fs');//指定使用的服务器
//文件路径    读取文件采用的字符集    读取完毕后的回调函数
fs.readFile('file.txt', 'utf-8', function(err, data){    
    if(err){
        console.log(err)
    }else{
        console.log(data);
    }
});
console.log('end.');
```

**案例二**：使用Node.js同步读取一个文件的API
注意：并不是所有的API都提供了同步版本，Node.js不鼓励使用同步I/O

```bash
$ vim readfilesync.js
```

```js
var fs = require('fs');
var data  = fs.readFileSync('file.txt', 'utf-8');
console.log(data);
console.log('end.');
```

## 2.3 事件
**说明**：事件由 EventEmitter 对象提供，所有的异步I/O操作在完成时都会发送一个事件到事件队列，包括 `fs.readFile` 和 `http.createServer`。

**案例一**：注册一个事件并触发之

```bash
$ vim event.js
```

```js
var EventEmitter = require('event').EventEmiotter; // 从事件模块中取出这个构造函数的引用
var event = new EventEmitter(); // 创建实例
event.on('some_event', function(){ // 注册'some_event'事件
    console.log('some_event occured.');
});
//1秒后触发'some_event'事件
setTimeout(function(){
    event.emit('some_event');
}, 1000);
```

### Node.js的事件循环机制
**特点**：
1. 所有逻辑都是事件的回调函数；
2. 没有显示的事件循环，libev支持的 ev_io、ev_timer、ev_signal/ev_idle 等均被 EventEmitter 封装；
3. 回调函数中如果发出I/O请求或直接发射事件，会立即返回事件循环;
4. libv 事件每一次迭代称为一次 Tick ,直到检测不到任何事件，进程结束。

![](http://o7m5xjmtl.bkt.clouddn.com/14897522845999.jpg)

# 3 模块和包
**说明**：Node.js 提供 require 函数来调用其他模块，而且模块都是基于文件的，机制十分简单。实现参照 CommonJS 标准，但并未完全遵守。

## 3.1 什么是模块
**说明**：模块和文件（夹）一一对应，可能是 JS 代码、JSON 或者编译过的 C/C++ 扩展。

+ `exports`(指定模块公开的接口)
+ `require`(从外部获取一个模块的接口)

## 3.2 创建及加载模块
### (1) 创建模块
**案例一**：创建模块，其中的一些方法开放给其它模块

```bash
$ vim module.js    ----创建模块
```

```js
var name;
//开放方法给其他模块
export.setName = function(thyName){   
  name = thyName);
};
export.sayHello = function(){
  console.log('Hello '+name);
};
```

```bash
$ vim getModule.js    ----在该模块中引入上一个模块
```

```js
var myModule = require('./module');       
myModule.setName('HYVoid');
myModule.sayHello();
```

### (2) 单次加载
**说明**：require 不会重复加载模块，多次调用 require 获得的都是同一个模块的实例。

### (3) 覆盖 exports


```bash
$ vim singleobject.js

```

```js
function Hello(){
var name;
this.set Name = function(thyName){
    name = thyName;
};
this.sayHello = function(){
    console.log('Helloo '+name);
};
//不覆盖exports的方式
// exports.Hello = Hello;

//覆盖exports的方式
//因为exports是一个和module.exports指向同一个对象的变量，会在模块结束后释放，
//所以不能用exports直接赋值替代module.exports,
module.exports = Hello;
}
```

```bash
$ vim getHello.js
```

```js
var Hello = require('./hello');//输出Hello引用本身
hello = new Hello();
hello.setName('BYVoid');
hello.sayHello();
```

## 3.3 创建包
**说明**：CommonJS 规范的包的特征：

+ package.json 必须在包的顶层目录下（必需）；
+ 二进制文件应该在 bin 目录下；
+ JavaScript代码应该在src目录下；
+ 文档应该在doc目录下；
+ 单元测试应该在test目录下。

### 作为文件夹的模块(不遵守CommonJS规范)

```bash
$ mkdir somepackage # 作为模块的文件夹
$ vim somepackage/index.js # 在文件夹下创建js脚本作为模块的一部分
```

```js
exports.hello = function(){
  console.log('Hello.');
};
```

```bash
$ vim getPackage.js # 在somepackage之外建立getPackage.js
```

```js
var somePackage = require('./somepackage'); # 引入somepackage下的js文件作为模块
somePackage.hello();
```

```bash
$ node getPackage.js # 运行
```

### package.json（遵守CommonJS）
**说明**：CommonJS 规范用来描述包的文件
![](http://o7m5xjmtl.bkt.clouddn.com/14897532257176.jpg)

字段|说明
---|---
name|包名称，由小写字母、数字、下划线组成，不能包含空格（唯一）；
describe|包的检验说明；
version|符合语义化版本识别规范的版本字符串；
keywords|关键字数组，通常用于数组；
maintainers|维护者数组，每个元素要包含name、[email]、[web]字段；
contributors|贡献者数组，格式与maintainers相同。包的作者应该是贡献者数组的第一个元素。
bugs|提交bug的地址，可以网址或者电子邮件地址；
linences|许可证数组，每个元素包含type（许可证的名称）和url（链接到许可证文本的地址）字段；
repositories|仓库托管地址数组，每个元素要包含type（仓库的类型,如git）、url（仓库的地址）和path（相对于仓库的路径，可选）字段。
dependecies|包的依赖，一个关联数组，由包名称和版本号组成。

```bash
$ vim somepackage/package.json

```

```json
{
    "main":"./lib.interface,js"
}
```

```bash
$ mkdir somepackage/lib
$ cp -a  somepakge/index.js somepackage/lib/
```

## 3.4 Node.js包管理器
### 获取一个包
**理器**：`npm [install/i] [-g] [package_name]
`
```bash
$ npm install express # 默认从http://npmjs.org下载安装express（自动安装依赖），放置在当前目录的node_modules子目录下
or
$ npm i express
```

### 本地模式和全局模式

**本地模式（默认）**

+ 不注册环境变量；
+ 通过`require`使用
+ 安装到当前`node_modules`子目录下

**全局模式（-g）：减少多重副本，注册PATH变量**

+ 注册环境变量;
+ 直接使用
+ 安装在系统目录；
+ `package.json` 文件中的bin字段包含的文件被链接到 `/usr/local/bin`;
+ 可以在命令行中直接运行模块的bin目录下的二进制文件（被链接到了`/usr/local/bin）`；
+ `require`不会搜索`/usr/local/lib/node_modules`。

### 创建全局链接
**说明**：解决全局模式安装的包不能通过`require`引用的问题
**注意**：不支持`windows`

**全局包转本地包**

```bash
$ sudo npm install -g express # 全局安装
$ npm link express  # 在本地包和全局包之间创建符号链接
./node_modules/express -> /usr/local/lib/node_modules/express
```

**本地包转全局**

```bash
$ cd somepackage # 到package.json所在的目录
$ npm link # 将本地安装的包连接到全局
```

### 包的发布

```bash
$ npm init    # 根据交互式问答产生一个符合标准的package.json,该标准基于CommonJS但不完全一致
$ npm adduser    # 创建一个账号用于维护自己的包
$ npm whoami    # 测验是否已经取得账号
$ cd byvoidmodule # 到package.json所在的目录
$ npm publish
http://search.npmjs.org/    # 找到自己刚刚发布的包
$ npm install byvoidmodule    # 尝试在任何一台计算机安装发布的包
$ npm unpublish   # 取消发布
```

# 4 调试
## 4.1 命令行调试(V8)

```bash
$ vim debug.js    ---编写调试文件
```

```js
var a = 1;
var b = 'world';
var c = function(x){
    console.log('hello ' + x + a);    
};
c(b);
```

```bash
$ node debug debug.js    ----启用调试工具
```
![](http://o7m5xjmtl.bkt.clouddn.com/14897523019710.jpg)


## 4.2 远程调试(V8 TCP)
**注意**：默认端口5858

**方式一**：脚本正常执行不会暂停，调试客户端可以连接调试服务器

```bash
$ node --debug [=port] script.js    
```

**方式二**：调试服务器启动后立即暂停执行脚本，等待调试客户端连接

```bash
$ node --debug-brk [=port] script.js
```

案例一：启动调试服务器并用命令行调试工具作为调试客户端连接

```bash
$ node --debug-brk debug.js  # 在服务器端启动node.js调试服务器
    debugger listening on port 5858
$ node debug 127.0.0.1:5885 # 客户端连接调试服务户端连接调试
```
## 4.3 使用Eclipse调试Node.js

### 配置调试环境
(1) 安装JDK和Eclipse：JDK->Eclipse
(2) Help->Install New Software...->Add...->
`Location`:http://chromedevtools.googlecode.com/svn/update/dev/
`Name`:Chrome Developer->Google Chrome Developer Tools

### 使用Eclipse调试Node.js程序

## 4.4 使用 node-inspector调试Node.js
**说明**：完全基于Node.js的在线调试工具。支持单步、断点调用栈侦察等功能。

```bash
$ npm insall -g node-inspector # 安装
$ node --debug-brk=5858 debug.js # 连接调试服务器
$ node-inspector  # 启动调试工具
http://127.0.0.1:8080/debug?port=5858 # 打开这个web调试工具
```

