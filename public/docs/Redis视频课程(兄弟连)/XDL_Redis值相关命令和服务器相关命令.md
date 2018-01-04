
---
title: Redis值相关命令和服务器相关命令
categories: [Redis视频课程(兄弟连)]
tag:
	- redis
	- 数据库

---

## （一）键/值命令

Keys [pattern]:取出匹配的所有键
```bash
>keys *    ---返回所有键
```
exists [key]:判断一个键是否存在
```bash
>exits key1    ----判断key1是否存在
```
del [key]:删除一个键
```bash
>del key1    ----删除key1这个键
```
expire [key]:设置某一个键的过期时间
```bash
> expire addr 10
(integer) 1
> ttl addr
(integer) 3
> get addr
(nil)
```
select [db-index]：选择数据库(0-15)
move [key] [db-index]：移动key到数据库dn-index
```bash
> get addr
"beijing"
> move addr 1
(integer) 1
> get addr
(nil)
> select 1
OK
 
[1]> keys *
1) "addr"
```
persist [key]：解除对某个键的过期设置
randomkey:随机返回数据库中的一个键
rname [key] [newkey]:重命名key
type [key]:返回key的数据类型

## （二）服务相关命令
ping:查看连接是否正常
```bash
> ping
PONG
```
echo [string]：打印一段字符
dbsize：返回当前数据库中key的数量
info：获取服务器的信息与统计
config get [配置参数]：返回相关配置项
```bash
>config get *    ----返回所有配置项
```
flushdb：清空当前数据库
flushall：删除所有数据库中的所有键

## （三）redis高级特性
### 1.安全性
**注意：**外部用户可以在1s内进行150k次的密码尝试！
**设置：**设置客户端连接后进行任何其他指定前需要使用的密码
```bash
$ sudo vim /etc/redis/redis.config
```
```bash
requirepass **********
```
**登陆：**登陆时设置密码
```bash
$redis-cli -a ****    ----登陆时不用执行每个命令都auth
```

### 2.主从复制
**特点：**
1. Master可以拥有多个slave
2. 多个slave可以连接同一个master外，还可以连接其它slave
3. 主从复制不会阻塞master，在同步数据时，master可以继续处理客户端请求
4. 提高系统的伸缩性

**过程：**
1. Slave与master建立连接，发送sync同步命令
2. Master会启动一个后台进程，将数据库快照保存到文件中，同事master主进程会开始收集新的写命令并缓存。
3. 后台完成保存后，就将此文件发送给slave
4. slave将此文件保存在硬盘上

**配置主从服务器：**
```bash
slaveof 192.168.1.1 6379    #指定master的ip和端口
masterauth lamp #这是主机的密码
```

### 3.事务处理（不成熟）
### 4.持久化机制
### 5.发布订阅信息
### 6.虚拟内存使用