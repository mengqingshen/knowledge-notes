---
title: MongoDB入门
categories: [慕课网学习笔记]
toc: true
tag:
    - MongoDB
    - nodejs
date: 2015-02-24 17:09:54
---

# 1 简介
## 1.1 mongoDB现状
☑ 国外：ebay、sourceforge、github等
☑ 国内：淘宝、京东、360、大众点评、天天动听、百度等

## 1.3 相关网站
☑ 官网：www.mongodb.org
☑ 中文官网：http://www.mongoing.com/
☑ 中文文档地址：docs.mongoing.com
☑ github(源码):https://github.com/mongodb/
☑ jira(BUG提交及回复):https://jira.mongodb.org/
☑ 两个google groups:`mongodb-user`与`mongo-cn`

## 1.4 关于数据库
## SQL数据库
☑ 实时一致性
☑ 事务
☑ 多表联合查询

## NOSQL数据库
☑ 简单便捷
☑ 方便扩展
☑ 更好的性能

## 1.5 为什么选择MongoDB

## 1. 无数据结构的限制
☑ 没有表结构的概念，每条记录可以有完全不同的结构
☑ 业务开发方便快捷

相比其它：
☑ SQL数据库需要先定义表结构再使用

## 2. 完全的索引支持
单键索引、多键索引、数组索引、全文索引(不支持中文)、地理位置索引

**和其它数据库对比其它**

+ redis 的 key-value
+ hbase 的单索引，二级索引需要自己实现

## 3. 方便的冗余和扩展
☑ 复制集保证数据安全
☑ 分片扩展数据规模

## 4. 良好的支持
☑ 完善的文档
☑ 齐全的驱动支持

# 2 环境与运行

## 2.1 运行环境
☑ 操作系统：64 位 linux
☑ 版本：2(大版本).6(偶数为稳定版).5(小版本)
☑ ssh：xshell
☑ 编辑器：vim 与 notepad++

## 2.2 编译MongoDB

```bash
$ cd mongo-r2.6.5
$ scons all -j [cpu核数]
```

mongod: 数据库服务
mongo: 自带的客户端
mongoimport: 数据导入（非二进制）
mongoexport: 数据导出（二进制）
mongodump: 备份（二级制）
mongorestore: 恢复（二进制）
mongooplog: 记录复制集操作的日志服务
mongostat: 查看服务运行状态

## 2.3 搭建简单的mongoDB服务器

```bash
$ mkdir mongodb_sample && cd mongodb_sample # 创建mongodb根目录
$ mkdir {data,log,bin,conf}
```

data:用来存储数据文件
log:存储日志文件
bin:可执行文件
log:日志文件
conf:配置文件

```bash
$ cp ../mongo-r2.6.5/mongod bin/ 
$ vim conf/mongod.conf # 创建配置文件
port=12345#监听的端口
dbpath=data#数据库文件存储位置（相对路径或绝对路径）
logpath=log/mongod.log#日志文件
fork=true#启动为后台进程
$ ./bin/mongod -f conf/mongod.conf
$ ll data/* # 查看mongod初始化的数据文件
$ tail  -f log/mongod.log # 查看日志
```

## 2.4 连接mongoDB服务器

```bash
$ cp ../mongo-r2.6.5/mongo bin/ # 将编译好的客户端复制过来
$ ./bin/mongo 127.0.0.1:12345/test # 连接到test数据库(会warning)
>use admin # 只有在admin中才能关闭数据库
>db.shutdownServer() # 或者使用kill
$ numactl --interleave=all  bin/mongod -f conf/mongod.conf # 使用numactl的方式重新启动,这样就不会出现警告
```

# 3 基本操作
## 3.1 查看

```bash
$ ./bin/mongo 127.0.0.1:12345
>show dbs  # 查看所有已有的数据库
>use imooc  # 切换数据库（如果没有则会创建）
>db.dropDatabase()  # 删除当前数据库
>db.imooc_collection.insert({x:1})  # 插入一条文档到imooc_collection集合（没有则创建）
>show collections  # 查看当前数据库的所有集合
>db.imooc_collection.find()  # 查看所有imooc_collection的所有文档
>for(i=3;i<100;i++)db.imooc_collection.insert({x:i})  # 使用js语法批量插入
>db.imooc_collection.find().count()  # 查看imooc_collection的文档数量
>db.imooc_collection.find().skip(3).limit(2).sort({x:1})  # 从第4条文档开始返回两条，并以x排序
```

## 3.2 更新

```bash
>db.imooc_collection.update({x:1},{x:999})  # 将imooc_collection的x为1的文档修改为{x:999}(全部更新)
>db.imooc_collection.insert({x:100,y:100,z:100})  # 插入一条
>db.imooc_collection.update({z:100},$set:{y:99})  # 使用$set实现部分更新
>db.imooc_xollection.update({z:101},{z:999},true)  # 如果查找的数据不存在则使用第二个参数创建之
```