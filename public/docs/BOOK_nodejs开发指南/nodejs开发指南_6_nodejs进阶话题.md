---
title: 6 nodejs进阶话题
categories: [nodejs开发指南]
tag:
  - nodejs
date: 2015-02-08 15:38:31
---

# 1 模块加载机制
## 1.1 模块的类型
### require(path):加载模块

+ 核心模块： Node.js标准API中提供的模块，编译成二进制代码
+ 文件模块： 存储为文件或者文件夹的模块

模块文件类型|识别|模块类型|不显示指定扩展名时的加载优先级(由高到底)
---|---|---|---|---
Node.js标准API中提供的模块|fs、http、net、vm等|核心模块|1
JavaScript|.js|文件模块|2
JSON|.json|文件模块|3
C/C++扩展|.node|文件模块|4

## 1.2 按路径加载模块

### 绝对路径
参数以`/`开头

```js
//按照优先级尝试加载/home/byvoid/module.js、/home/byvoid/module.json、/home/byvoid/module.node
require('/home/byvoid/module')
```

### 相对路径
参数以`./`或`../`开头

```js
//在同一价目录下查找'hello.js'文件并加载
require('./hello')
```

## 1.3 通过查找node_modules目录加载模块
**时机**：当 require 遇到一个既不是核心模块又不是以路径形式表示的模块名称时
**路径**：首先试图在当前目录下的 node_modules 目录中查找，如果没有找到则会在当前目录的上一层中的node_modules目录中继续查找。反复重复，直到根目录。

*/home/byvoid/develop/foo.js*

```js
require('bar.js')
/*
路径查找顺序
/home/byvoid/develop/node_modules/bar.js
/home/byvoid/node_modules/bar.js
/home/node_modules/bar.js
/node_modules/bar.js
*/
```

## 1.4 加载缓存
**说明**：Node.js根据实际文件名缓存加载过的文件模块，因此Node.js模块不会被加载两次

## 1.5 加载顺序
```js
require(some_module)

// (1)核心模块，直接加载，结束。
// (2)'/'、'./'或'../'开头，按照路径加载some_module，结束
// (3)通过node_modules目录加载模块
```

# 2   控制流
## 2.1 循环的陷阱
**陷阱案例**

```js
var fs = require('fs');
var files = ['a.txt', 'b.txt', 'c.txt'];
   
for(var i = 0; i < files.length; i++){
  fs.readFile(files[i], 'utf-8', function(err, contents){
      console.log(files[i]+':' + contents);//回调函数中访问i变量的值始终为3
  });
}
```

**解决方式**

*方式一*：闭包

```js
var fs = require('fs');
var files = ['a.txt', 'b.txt', 'c.txt'];

for(var i = 0; i < files.length; i++){
  (function(i){
      fs.readFile(files[i], 'utf-8', function(err, contents){
          console.log(files[i]+':' + contents);
      });
  })(i)
}
```

*方式二*：使用 forEach 替代 for 循环

```js
var fs = require('fs');
var files = ['a.txt', 'b.txt', 'c.txt'];

files.forEach(function(filename){
  fs.readFile(filename, 'utf-8', function(err, contents){
      console.log(filename+':' + contents);
  });
});
```

## 2.2 解决控制流难题
**解决深层回调函数嵌套带来的耦合问题**

项目|说明|原理
---|---|---
async|一个控制流解耦模块|实现复杂逻辑时使用该模块提供的函数替代回调函数
streamlinejs、jscex|变同步为异步|实现了一个将同步js代码编译为异步js的编译器
eventproxy|对事件发射器的深度封装|基于事件松耦合的方式实现控制流

# 3 Node.js应用部署
## 3.1 日志功能
**第一步**：设置使用产品模式运行服务器
```bash
$ NODE_ENV = production # 设置环境变量
$ node app.js # 启动服务器
```

**第二步**：将访问日志和错误日志写入文件
*app.js*

```js
var fs = require('fs');
var accessLogfile = fs.createWriteStream('access.log', {flags:'a'});
var errorLogFile = fs.createWriteStream('error.log', {flags:'a'});

app.configure('production', function(){
  //使用Express提供的一个访问日志的中间件：在第一行添加、、
  //只需指定stream参数为一个输出流即可将访问日志写入文件
  app.use(express.logger({stream:accessLogfile}));
  //...
  
  //需要单独实现错误相应
  //通过app.error注册错误响应函数，在其中写入错误日志流
  app.error(function(err, req, res, next){
      var meta = '[' + new Date() + ']' + req.url + '\n';
      errorLogFile.write(meta + err.stack + '\n');
      next();
  });
});
```

## 3.2 使用cluster功能
### cluster
**说明**：cluster时Node.js的一个核心模块，功能是生成与当前进程相同的子进程，并且允许父、子进程之间共享端口

### child_process
**说明**：也是一个核心模块，区别于cluster，允许跨进程端口复用
**案例**

+ 利用多核资源
+ 实现故障恢复功能

*app.js*
确保被其它模块执行 app.js 时不会自动运行 listen

```js
//如果是由其它模块启动的服务器，则禁止启动
if(!module.parent){
   app.listen(3000);
   console.log('Express server listening on port %d in %s mode', app.address().port, app.settings.env);
}
```

### cluster.js
**说明**：主进程生成若干工作进程，并监听工作进程结束事件

```js
var cluster = require('cluster');
var os = require('os');
    
//获取cpu数量
var numCPUs = os.cpus().length;
    
var workers = {};
if(cluster.isMaster){
   //主进程分支
   cluster.on('death', function(worker){
       //当一个工作进程结束时，重启工作进程
       delete workers[workers.pid];
       worker = cluster.fork();
       workers[worker.pid] = worker;
   });
    
   //初始开启与cpu数量相同的工作进程
   for(var i = 0; i < numCPUs; i++){
       var worker = cluster.fork();
       workers[i] = worker;
   }
}else{
   //工作进程分支，启动服务器
   var app = require('./app');
   app.listen(3000);
}
    
//当主进程被终止时，关闭所有工作进程
process.on('SIGTERM', function(){
   for(var pid  in workers){
       process.kill(pid);
   }
   process.exit(0);
});
```

## 3.3 启动脚本
脚本功能：通过nohup启动服务器，同时将主进程的pid写入microblob.pid文件；当调用结束命令时，从microblob.pid读取pid的值，终止主进程以关闭服务器

```bash
$ vim microblob.sh
```

```bash
#! /bin/sh
NODE_ENV = production
DAEMON = "node cluster.js"
NAME = Microblob
DESC = Microblob
PIDFILE  = "microblob.pid";
   
case "$1" in
  start)
      echo "Starting $DESC:"
          nohub $DAEMON > /dev/null &
      echo $! > $PIDFILE
      echo "$NAME"
          ; ;
  stop)
      echo "Stopping $DESC:"
          pid='cat $PIDFILE';
      kill $pid
          rm $PIDFILE
      echo "$NAME."
          ;;
esac
exit 0
   
./microblob start
```

## 3.4 共享80端口（以Nginx为例）
**案例**：监听mysite.com 80端口的请求，并设置反向代理，将所有的请求转发给http://localhost:3000，即我们的node.js服务器 

```js
  server{
      listen 80;
      server_name mysite.com;
  
      location / {
          proxy_pass http://localhost:3000
      }
  }
```

**注意**：还可以在Nginx配置文件中添加访问静态文件的规则，让Nginx处理静态文件，减少反向代理以及Node.js开销
            
# 4 Node.js不是银弹
# 5 参考资料

