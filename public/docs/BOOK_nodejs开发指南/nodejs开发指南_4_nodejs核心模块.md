---
title: 4 nodejs核心模块
categories: [nodejs开发指南]
tag:
  - nodejs
toc: true
date: 2014-11-03 16:43:36
---

# 1 全局对象（global）
## 1.1 全局对象与全局变量
**技巧**：永远使用 var 定义变量以避免全局变量，因为全局变量会污染命名空间，提高代码的耦合风险。

**全局变量（ECMAScript）**

+ 在最外层定义的变量；
+ 全局对象的属性；
+ 隐式定义的变量（未定义直接赋值的变量）。

## 1.2 process(全局变量)
**说明**：用于描述当前Node.js进程状态的对象，提供与操作系统的简单接口，常用在本地程序中。

成员方法（仅列举几个）|说明
---|---
process.argv|命令行参数数组
process.stdout|标准输出流
process.stdin|标准输入流
process.nextTick(calback)|针对占用大量CPU时间的事件进行拆分的工具

## 1.3 console
成员方法|列举几个
---|---
console.log() |标准输出
console.error()|标准错误输出
console.trace()|向标准错误流输出当前的调用栈

# 2 常用工具util
util是一个Node.js核心模块，提供常用函数的集合。

## 2.1 util.inherits
**用途**：实现原型继承的函数
**参数（2）**：子类，父类
**特点**：仅继承父类 prototype 中的函数

```js
var util = require('util');
//父对象构造函数
function Base(){
    this.name = 'base';
    this.base = 1991;
    this.sayHello = function(){
        console.log('Hello ' + this.name);
    };
}
Base.prototype.showName = function(){
    console.log(this.name);
};

//子对象构造函数
function Subiquitous(){
    this.name = 'sub';
}

util.inherits(Sub, Base);

//观察父类型对象
var objBase = new Base();
objBase.showName();    //base
objetcBase.sayHello();    //Hello base
console.log(objBase);    //{name:'base', base:1992, sayHello:[function]}
//观察子类型对象
var objSub = new Sub();
objSub.showName();    //sub
objSub.sayHello();    //报错
console.log(objSub);    //{name:'sub'}
```
## 2.2 util.inspect
**用途**：将任意对象转换为字符串的方法，通常用于调试和错误输出。
**参数（1[3]）**：object, [showHidden], [depth], [colors]

+ object：即要转换的对象
+ [showHidden]：如果值为true，将会输出更多隐藏信息
+ [depth]：表示最大递归的层数，默认递归两层
+ [colors]：如果color值为true，输出格式将会以ANSI颜色编码，通常用于在终端显示更漂亮的效果

**特点**：不会调用 `toString()` 方法，不会将对象简单的转化为字符串

## 2.3 类型测试相关
util.isArray()
util.isRegExp()
util.isDate()
util.isError()
## 2.4 其它
util.format()
util.debug()


# 3 事件驱动events（几乎被所有模块依赖）
## 3.1 事件发射器
### events.EventEmitter
**说明**：事件发射与事件监听功能的封装
**特点**：每个事件支持注册多个监听器，按照注册的顺序被调用
**常用API**：http://nodejs.org/api/events.html

函数|参数说明|功能说明
---|---|---
EventEmitter.on(event, listenter)|事件名，回调函数  |为指定事件注册一个监听器
EventEmitter.emit(event, [arg1], [arg2], ...)|事件名，传给监听器的参数...|发射指定事件
EventEmitter.once(event, listener)|事件名，回调函数 |注册只触发一次的事件
EventEmitter.removeListener(event, listener)|事件名，监听器|移除指定事件的的某个监听器（必须是已经注册的）
EventEmitter.removeAllListener([event])|事件名|移除指定事件或所有事件的所有监听器

```js
var events = require('events');
var emitter = new events.EventEmitter();
//注册第一个监听器
emitter.on('someEvent', function(arg1, arg2){
    console.log('listener1', arg1, arg2);
});
//注册第二个监听器
emitter.on('someEvent', function(arg1, arg2){
    console.log('listener2', arg1, arg2);
});
//发射事件
emitter.emit('someEvent', 'byvoid', 1991);//会一次调用两个监听器
```
## 3.2 error事件
**说明**：EventEmitter定义的一个特殊的事件
**注意**：如果没有响应的监听器，会退出程序并打印调用栈
**建议**：一般要为会发射error事件的对象设置监听器

```js
var events = require('events');
var emitter = new events.EventEmitter();
emitter.emit('error');    //导致程序崩溃
```

## 3.3 继承EventEmitter

支持事件响应的核心模块都是EventEmitter的子类。

# 4 文件系统fs
**特点**：所有操作都提供了同步和异步两个版本。

## 4.1 fs.readfile

`fs.readFile(filename, [encoding], [callback(err, data)])`

**注意**

+ Node.js的异步编程接口习惯以函数的最后一个参数作为回调函数
+ 回调函数的第一个是err，其余的参数是其他返回的内容
+ 如果没有发生错误，err的值是null或undefined;否则通常是Err对象的实例
+ 如果指定编码data是一个解析后的字符串，否则是Buffer形式的二进制数据


第n个参数|参数|说明
---|---|---
1|filename|文件名称
2|[encoding]|编码
3|[callback(err,data)]|回调函数（err表示有没有错误发生,如果发生错误err建辉是一个错误对象；data是文件内容，如果指定编码data是一个解析后的字符串，否则是Buffer形式的二进制数据）

**案例一**：从content.txt中读取数据，但不指定编码

```js
var fs = require('fs');
fs.readFile('content.txt', function(err, data){
    if(err){
        console.err(err);
    }else{
        console.log(data);    //<Buffer 54 65 78 20 e6 96 87 e6 96 87 e4 bb b6 e7 a4 ba e4 be 8b>
    }
});
```

**案例二**：以二进制的模式读取文件的内容

```js
var fs = ewquire('fs');
fs.readFile('content.txt','utf-8', function(err, data){
    if(err){
        console.err(err);
    }else{
        console.log(data);    //Text 文本文件示例
    }
});
```

## 4.2 fs.readFileSync
`fs.readFileSync(filename, [encoding])`
**说明**：fs.readFile同步的版本
**返回值**：读取到的文件内容
**特点**：如果有错误发生，fs将会抛出异常，需要用 try-catch 进行处理

## 4.3 fs.open
`fs.open(path, flags, [mode], [callback(err, fd)])`
**说明**： POSIX open函数的封装

第n个参数|参数|说明|备注
---|---|---|---
1|path|文件的路径   
2|flags|指定打开文件的模式
3|[mode]|创建文件时指定文件权限，默认0666|r（读取）、r+（读写）、w（写入，不存在则创建）、w+（读写，不存在则创建）、a（追加，不存在则创建 ）
4|[callback(err, fd)]|err:如果出错，会是一个Err对象的实例。fd：文件描述符|一个非负整数，表示当前进程维护的打开文件的记录索引

# 4 fs.read(不推荐)
`fs.read(fs, buffer, offset, length,position, [callback(err, bytesRead, buffer)])`
**说明**：POSIX read函数的封装
**特点**：比fs.readFile 提供了更底层的封装，需要手动管理缓冲区和文件指针，不知道文件大小的情况下比较麻烦

第n个参数|参数|说明
---|---|---
1|fd|从文件描述符fd指定的文件中读取数据
2|buffer|写入buffer指定的缓冲区对象
3|offset|buffer的写入偏移量
4|length|从文件中读取的字节数
5|position|文件读取的起始位置（如果position的值为null，则会从当前文件指针的位置读取）

# 6 [callback(err, bytesRead, buffer)]
回调函数传递bytesRead和buffer，分别表示读取的字节数和缓冲区对象

```JS
var fs = require('fs');
fs.open('content.txt', 'r', function(err, fd){
    if(err){
        console.log(err);
        return ;
    }
    var buf = new Buffer(8);
    fs.read(fd, buf, 0, 8, null, function(err, bytesRead, buffer){
        if(err){
            console.log('bytesRead:' + bytesRead);
            return;
        }
        console.log('bytesRead:' + bytesRead);    //bytesRead:8
        console.log(buffer);    //<Buffer 54 65 78 74 20 e6 96 87>
    });
});
```

附：fs所有函数的定义和功能
![](http://o7m5xjmtl.bkt.clouddn.com/14897570929764.jpg)

 
# 5 HTTP服务器与客户端
`http.Server`: 一个基于事件的HTTP服务器，核心由Node,js下层C++部分实现，接口由JS封装
`http.request`: 一个HTTP客户端工具，用于向HTTP服务器发起请求，例如实现Pingback或者内容抓取

## 5.1 HTTP服务器
用Node.js做的所有基于HTTP协议的系统都是基于http,Server实现的。

### http模块相关方法和属性

`http.createServer(reqHandler)
`：创建一个http.Server实例
**参数**：HTTP请求处理函数（参数包含请求对象和响应对象）
**返回值**：http.Server的实例

`res.writeHead(stateCode, content)`:设置响应头
**参数（2）**：响应报文状态码，响应首部

`res.write(contentStr)`：响应内容
**参数**：响应内容字符串

```js
http.end(contentStr):写入响应体，结束并发送
//app.js
var http = require('http');
http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type':'text/html'});
    res.write('<h1>Node.js</h1>');
    res.end('<p>Hello world!</p>');
}).listen(3000);
console.log('HTTP server is listening at port 3000.');
```
### http.Server的事件
**常用**

事件名|触发|传给处理函数的参数|备注
---|---|---|---
request|客户端请求到来时|req(http.ServerRequest实例)和res(http.ServerResponse实例)|http.createServer([requestListener])会将requestListener作为request事件的监听函数
connection|TCP连接建立时|socket(net.Socket的实例)|客户端在Keep-Alive模式下可能会在同一个连接内发送多次请求
close|服务器关闭时|注意不要在用户连接时断开

**其它**（实现复杂的HTTP服务器时才会用到）
 
+ checkContinue
+ pgrade
+ clientError

```js
//httpserver.js
var http = require('http');
var server = new http.Server();
    server.on('request', function(req, res){
    res.writeHead(200, {'Content-Type':'text/html'});
    res.write('<h1>Node.js</h1>');
    res.end('<p>Hello World!</p>');
});
server.listen(3000);
console.log('HTTP Server is listening at port 3000');
```
### http.ServerRequest
**说明**：HTTP请求的信息，通常作为一个参数（req）传递给request事件的处理函数
**qu**：请求头和请求体

相关事件|触发|传递给处理函数的参数|备注
---|---|---|---|---
data|请求提数据到来|chunk:表示接收到的数据|如果是见没有被监听，请求将会被丢弃；可能被触发多次
end|请求提数据传输完毕||以后将不会再有数据到来
close|请求结束||用户强制终止传输还是会调用close（不同于end）

**属性**
![](http://o7m5xjmtl.bkt.clouddn.com/14897577156045.jpg)

### 获得get请求内容

`url.parse(urlStr, [parseQueryString], [slashesDenoteHost])`
**特点**：GET 请求的请求内容在URL中
**说明：**将url string转换为一个更易使用的对象


*服务器端*

```js
//httpserverrequest.js
var http = require('http');
var url = require('url');
var util = require('util');
http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(util.inspect(url.parse(req.url, true)));
}).listen(3000);
```

*客户端（测试）*
http://127.0.0.1:3000/user?name=byvoid&email=byvoid@byvoid.com

```json
{search:'?name=byvoid&email=byvoid.com',
query:{name='byvoid', email:'byvoid@byvoid.com'},    //get请求的内容
pathname:'/user',
path:'/user?name=byvoid&email=byvoid@byvoid.com',    //路径
href:'/user?name=byvoid&email=byvoid@byvoid.com'}
```

### 获取post请求的内容

`querystring.parse(str, [sep], [eq], [options])`
**说明**：将请求体字符串转化为真正的POST请求格式，然后向客户端返回
**特点**：post 请求内容都在请求体中

```js
//httpserverrequestpost.js
/**
*该示例存在严重的效率问题和安全问题！仅供理解POST请求的获取方式！
*/
var http = require('http');
var querystring = require('querystring');
var util = require('util');
 
http.createServer(function(req, res){
//在闭包中暂存请求体的信息
var post = '';
 
req.on('data', function(chunk){
post += chunk;
});
req.on('end', function(chunk){
post = querystring.parse(post);
res.end(util.inspect(post));
});
}).listen(3000);
```

### http.ServerResponse
**说明**：HTTP响应给客户端的信息，通常作为一个参数（res）传递给request事件的处理函数

成员方法|参数|用途|备注
---|---|---|---
response.writeHead(statusCode, [headers])|HTTP状态码，包含响应头的对象|向客户端发响应头|   只能被调用一次（如果不调用回自动生成一个响应头）
response.write(data, [encoding])|要发送的内容（Buffer或者字符串），编码类型|向客户端发送响应内容|可以多次调用（必须在response.end()被调用之前）
response.end([data], [encoding])|同response.write 结束响应|必需被调用一次（否则客户端将永远处于等待状态）

## 5.2 HTTP客户端
模拟客户端向HTTP服务器发起请求。

### http.request(options, [callback])
**用途**：发起HTTP请求。
**返回值**：：http.ClientRequest的实例
**参数（2）**：请求的参数（类似关联数组的对象），请求的回调函数（传递的参数：http.ClientResponse的实例）
请求的常用参数|含义
---|---
host|请求网站的域名或IP地址
port|请求网站的端口，默认80
method|请求方法，默认GET
path|请求的相对于根的路径，默认"/"，QueryString包含在其中，例如"/search?query=byvoid"
headers|一个关联数组对象，为请求头的内容

```js
//httprequest.js
var http = require('http');
var querystring = require('querystring');
//请求的querystring部分
var contents = querystring.stringify({
    name:'byvoid',
    email:'byvoid@byvoid.com',
    address:'Zijing 2#, Tsinghua University'
});
//请求头部
var options = {
    host:'www.byvoid.com',
    path:'/application/node/post.php',
    method:'POST',
    headers:{
       'Content-Type':'application/x-www-form-urlencoded',
       'Content-Length':contents.length
    }
};
// 发起请求
var req = http.request(options, function(res){
    res.setEncoding('utf8');
    res.on('data', function(data){
      console.log(contents);
    });
});

//发送请求内容
req.write(contents);
//结束请求
req.end();//否则服务器收不到任何信息
```

运行结果

```bash
array(3){
   ["name"] = > string(6) "byvoid"
   ["email"] =>
   string(17) "byvoid@byvoid.com"
   ["address"] => 
   string(3) "Zijing 2#, Tsinghua University              "
}
```

### http.get(options, callback)
**说明**：专门用来处理GET请求，http.request的简化版
**参数（2）**：同http.request
**返回值**：同http.ClientRequest
**特点**

+ 自动将请求方法设为GET请求
+ 不需要手动调用req.end()

```js
//httpget.js
var http = require('http');
http.get({host:'www.byvoid.com'}, function(res){
    res.setEncoding('utf8');
    res.on('data', function(data){
        console.log(data);
    });
});
```

### http.ClientRequest
**说明**：`http.request()`或`htttp.get()`的返回值，表示一个正在进行中的 HTTP 请求

**为request事件绑定事件处理程序**

*方式一*：隐式绑定，http.request或http.get第二个参数指定request事件的回调函数

*方式二*：显示绑定

```js
//httpresponse.js
var http = require('http');
var req = http.get({host:'www.byvoid.com'});//不指定第二个参数（回调函数）

//显示绑定
req.on('response', function(data){
    req.setEncoding('utf8');
    res.on('data', function(data){
        console.log(data);
    });
});
```
常用方法|参数|用途|备注
---|---|---|---
request.write(data, [encoding])|要发送的内容（Buffer或者字符串），编码类型|常用于POST、PUT等操作|可以多次调用（必须在response.end()被调用之前）
request.end([data], [encoding])|同request.write|常用于POST、PUT等操作|所有写结束后必需被调用一次（否则请求无效）
request.abort()|无|终止正在发送的请求
request.setTimeout(timeout, [callback])|毫秒数，超时后的回调函数|设置请求超时时间

**其它方法**

+ request.setNoDelay([noDelay])
+ request.setSocketKeepAlive([enable], [initialDelay])
+ 等

### http.ClientResponse
**说明**：对客户端的响应可以理解成来自服务器的请求（有点别扭），所以类似http.ServerRequest
**相关事件**（同http.ServerRequest）

事件名|触发|传递给处理函数的参数|备注
---|---|---|---
data|请求提数据到来|chunk(表示接收到的数据)|如果是见没有被监听，请求将会被丢弃；可能被触发多次
end|请求提数据传输完毕||以后将不会再有数据到来
close|请求结束||用户强制终止传输还是会调用close（不同于end）

**属性**
![](http://o7m5xjmtl.bkt.clouddn.com/14897599245221.jpg)

**额外的方法**

方法|参数|用途|备注
---|---|---|---
response.setEncoding([encoding])|编码类型|设置默认编码，data事件被触发后数据将被编码|默认值为null，即不编码，以Buffer的形式存储；常见编码为utf8
response.pause()||暂停接收数据和发送事件|方便实现下载功能
response.resume()||从暂停的状态中恢复|



