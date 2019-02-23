---
title: 1 nodejs简介
categories: [nodejs开发指南]
tag:
  - nodejs
date: 2014-10-29 19:41:58
---

# 1. node.js学习网站

+ [CNodeJS专业中文社区](http://cnodejs.org/)
+ [学习资料](https://github.com/Pana/node-books)

# 2. api

http://nodejs.org/api/

# 3.基本知识

## 是什么
Node.js 是一个让 JavaScript 运行在浏览器之外的平台，具有深厚开源背景，由一名黑客发起，诞生于github。它实现了注入文件系统、模块、包、操作系统API、网络通信等Core JavaScript没有或者不完善的功能。部分实现遵守 CommonJS 规范，使用 V8 javascript 引擎，内建 HTTP 服务器。
## 能做什么
+ 具有复杂逻辑的网站；
+ 基于社交网络的大规模Web应用；
+ Web Socket 服务器；
+ TCP/UDP套接字应用程序；
+ 命令行工具；
+ 交互式终端程序；
+ 带有图形用户界面的本地应用程序；
+ 单元测试工具；
+ 客户端 JavaScript 编译器。


## 异步式I/O与事件驱动
**说明**：Node.js的异步机制是基于事件的，所有的磁盘I/O、网络通信、数据库查询都以非阻塞的方式请求，返回的结果由事件循环来处理。

**优点**：CPU和内存在同一时间集中处理一件事情，同时可以让耗时的I/O操作并行执行。对于低速连接攻击，Node.js只是在事件队列中增加请求，等待操作系统回应，不会有任何多线程开销。

**缺点**： 需要把一个完整的逻辑差分为一个个事件，增加了开发和调试难度（第三方模块给出泪解决方案）。

## 性能
### 架构简介
![](http://o7m5xjmtl.bkt.clouddn.com/14897518990174.jpg)

### Node.js与PHP+Nginx
## JavaScript简史
### Netscape与LiveScript
### Java与JavaScript
### 微软的加入-JScript
### 标准化——ECMAScript
### 浏览器兼容问题
### 引擎显效率革命和JavaScript的未来
## CommonJS
### 服区端 JavaScript的重生
###  CommonJS规范与实现



