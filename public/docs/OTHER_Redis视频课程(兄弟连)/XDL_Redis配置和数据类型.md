---
title: Redis配置和数据类型
categories: [Redis视频课程(兄弟连)]
tag:
	- redis
	- 数据库

---

## （一）配置文件

> /etc/redis/redis.conf  # 安装时配置文件默认位置（启动时可指定使用那个配置文件）

配置项|说明
-|-
daemonize|如果需要在后台运行，把该项改为yes
pidfile|配置多个pid的地址，默认在/var/run/redis.pid
bind|绑定ip,设置后只接受来自该ip的请求
port|监听端口，默认为6379
timeout|设置客户端链接的超时时间，单位为秒
loglevel|分为4级，debug、verbose、notice、warning
logfile|配置log文件地址
database|设置数据库的个数，默认使用的数据库为0
save|设置redis进行数据库镜像的频率
rdbcompression|在镜像备份时，是否进行压缩
Dbfilename|镜像备份文件的文件名
Dir|数据库镜像备份的文件放置路径
Slaveof|设置数据库为其他数据库的从数据库
Masterauth|总数据库链接需要的密码验证
Requirepass|设置登陆时需要的密码
Maxmemeory|设置redis能够使用的最大内存
Appendonly|开启append/only模式
Appendfsync|设置对appendonly.aof文件同步的频率
vm-enabled|是否打开虚拟内存支持
vm-max-memory|设置redis使用的最大物理内存大小
vm-page-size|设置虚拟内存的页大小
vm-pages|设置交换文件的总的page数量
vm-max-threads|设置VMIO同时使用的线程数量
Glueoutputbuf|把晓得输出缓存存放在一起
hash-max-zipmap-entries|设置hash的临界值
Activehashing|重新hash

## （二）启动关闭

### 2.1 启动
方式一：ubuntu自带的服务管理
```bash
$ service start redis # 启动redis数据库服务（默认使用默认的配置文件）
```
方式二：直接使用启动命令
```bash
$ sudo redis-server /usr/loacal/redis/etc/redis.conf # 指定配置文件启动
```
### 2.2 登陆
```bash
$ redis-cli # 默认使用默认的配置文件登陆
```
### 2.3 关闭
方式一：通过客户端
```bash
$ sudo redis-cli shutdown # 关闭
```
方式二：pkill
```bash
$ sudo pkill redis-server
```
### 2.4 监控
```bash
$ netstat -tunpl | grep 6379 # 默认端口6379
```
## （三）基本数据类型
### string
+ 二进制安全
+ 可以包含任何数据（jpg图片或者序列化的对象）

相关命令|说明|成功返回值|失败返回值
-|-|-|-
set|设置键值对|OK	
setnx|如果不存在则设置，否则不进行任何设置，返回设置的结果|数据类型和结果|0
setex|设置键值对的同时指定键值对的有效期|OK|
setrange|替换字符串中的内容(如果替换的内容的长度小于被替换的字符串的长度，会保留后面的部分)|数据类型和长度|0
mset|一次设置多个key的值（原子性）|OK|0
msetnx|一次设置多个key的值，不会重复设置已经设置的值（原子性）|OK|0
getset|获取旧值并设置新值|旧值|
getrange|获取子字符串|子字符串|
mget|一次获取多个key的值||
incr|对key的值++	新的值||
incrby|同incr类似，指定增量(可为负)，key不存在则设置key,默认为0||
decr|对值--	||
decrby|指定减量（可为正）||
append|追加字符串|新字符串的长度|
strlen|返回字符串的长度|字符串的长度|

**例子：**
set
```bash
> set name lijie  # ----添加一个name=lijie的键值对
```
OK
```bash
> get name  # ----获取name的值
"lijie"
```
setnx
```bash
> setnx name lijie  # ----如果不存在则设置，否则不进行任何设置
(integer) 0
```
setnx
```bash
> setex haircolor 10 red
OK
> get haircolor
"red"
> get haircolor
(nil)
```
setrange
```bash
> set email lijie@126.com
OK
> setrange name 6 gmail.com  # ----从（包括）下标为6的字符开始替换
(integer) 15
> get name
"lijie@gmail.com"
```
mset
```javascript
> mset key1 value1 key2 value2  # ----设置两个键值对
OK
> get key1
"value1"
> get key2
"value2"
```
getset
```javascript
>getset key1 1
"value1"
>get key1
"1"
```
getrange
```bash
> getrange key2 0 4
"value"
```
mget
```javascript
> mget key1 key2 key3 key4 
1) "6"
2) "value2"
3) (nil)
4) (nil)
```
incr
```bash
> incr key1 
(integer) 2
> incr key1 
(integer) 3
```
incrby
```bash
> incrby key1 10
(integer) 13
> get key1
"13"
```
append
```bash
> get name
"lijie@gmail.com"
> append name .net
(integer) 19
> get name
"lijie@gmail.com.net"
```

### hashes
> 适合用于存储对象（占用更少内存，方便存取）

命令|参数	|说明|成功返回值|失败返回值
-|-|-|-|-
hset|[hash表名][键][值]|设置hash field为指定值（不存在则创建）||
hget|[hash表名][键]|获取hash表中某个键的值	||
hsetnx|[hash表名][键][值]|不存在则创建，存在则返回0|1|0
hmset|[hash表名] [键1][值1][键2][值2]...|同时设置hash的多个field||
hmget|[hash表名][键1][键2]...|获得hash的多个field||
hincrby|[hash表名][field][number]|指定的hash field加上给定值||
hexits|[hash表名][field][number]|测试指定field是否存在|1|0
hlen|[hash表名]|返回指定hash的field数量||
hdel|[hash表名][field]|删除指定hash的指定field	||
hkeys|[hash表名]|返回hush的所有field||
hvals|[hash表名]|返回hash的所有value||
hgetall|[hash表名]|获取某个hash中的所有fields和它的value||

**例子**
hset、hget
```bash
> hset user:001 name lijie
(integer) 1
> hget user:001 name
"lijie"
```
hmset、hmget
```bash
> hmset user:003 name lijie age 20 sex 1
OK
> hmget user:003 name age sex
1) "lijie"
2) "20"
3) "1"
```

### lists类型
特性：双向链表，可以作为栈或队列

相关方法|参数|说明	|成功返回值|失败返回值
-|-|-|-|-
lpush|[list名]|从list的头部向列表中压入值（栈）||
lrange|[list名][起点][终点]|获取列表中的子列表|元素总个数|
rpush|[list名]|从尾部压入元素	||
linsert|[list名] before [参照点的值][插入的值]|插入到指定位置前||
lset|[list名][下标][值]|设置list中指定下标的元素值（xiu'g）||
lrem|[list名][[n]][value]|删除n个和value相同的元素，n<0从尾部删除|成功删除的个数|0
ltrim|[list名][保留元素起点][保留元素终点]|保留指定范围的元素，其余删除|
lpop|[list名]|从头部弹出一个元素|弹出的元素|nil
rpop|[list名]|从尾部弹出一个元素|弹出的元素|nil
rpoplpush|[list1][list2]|从第一个list尾部一处元素并添加到第二个list的头部||
lindest|[list名][下标]|返回指定下标位置的元素|元素值|nil
llen|[list名]|返回列表的长度||

lpush、lrange
```bash
> lpush list1 "hello"
(integer) 1
> lpush list1 "world"
(integer) 2
> lrange list1 0 -1
1) "world"
2) "hello"
```
rpush
```bash
> rpush list1 "how"
(integer) 3
> rpush list1 "are"
(integer) 4
> rpush list1 "you"
(integer) 5
> lrange list1 0 -1
1) "world"
2) "hello"
3) "how"
4) "are"
5) "you"
```
linsert
```bash
> linsert list1 before "are" "old"
(integer) 6
> lrange list1 0 -1
1) "world"
2) "hello"
3) "how"
4) "old"
5) "are"
6) "you"
```
lset
```bash
> rpush list2 "hello"
(integer) 1
> lset list2 0 "hi"
OK
> lrange list2 0 -1
1) "hi"
```
 lrem
```bash
> lpush list3 "one"
(integer) 1
> lpush list3 "two"
(integer) 2
> lpush list3 "one"
(integer) 3
> lrem list3 1 "one" ----删除1个"one"
(integer) 1
> lrange list3 0 -1
1) "two"
2) "one"
```
ltrim
```bash
> lrange list3 0 -1
1) "two"
2) "one"
> lrange list3 0 -1
1) "two"
2) "one"
> ltrim list3 1 -1 # 保留下标１之后的数据
OK
> lrange list3 0 -1
1) "one"
```
rpoplpush
```bash
> lrange list1 0 -1
1) "world"
2) "hello"
3) "how"
4) "old"
5) "are"
6) "you"
> lrange list2 0 -1
1) "hi"
> rpoplpush list1 list2 
"you"
> lrange list1 0 -1
1) "world"
2) "hello"
3) "how"
4) "old"
5) "are"
> lrange list2 0 -1
1) "you"
2) "hi"
```
### sets
#### (1) 无序sets
**特性：**
+ string类型的无序集合，通过hash table实现
+ 可以对集合进行交并差
+ 无序

相关命令|参数|说明|成功|失败
-|-|-|-|-
sadd|[set][value]|添加value到set中|1|0
smembers|[set]|查看集合所有元素||
srem|[set][value]|删除set中的value|1|0
spop|[set]|随机弹出某个属性||
sdiff|[set1][set2]|获得set1与set2的差集||
sdiffstore|[set1][set2][set3]|将set1与set2的差集存储到set3||
sinter|[set1][set2]|返回set1与set2的交集||
sinterstore|[set1][set2][set3]|将set1与set2的交集存储到set3||
sunjon|[set1][set2]|返回set1与set2的并集||
sunjonstore|[set1][set2][set3]|将set1与set2的并集存储到set3||
smove|[set1][set2][value]|将set1中的元素移动到set2中||
scard|[set]|返回set中元素的个数||
sismember	[set]|[value]|判断value是否为set的元素|1|0
srandmember	[set]|随即返回一个元素（但不删除）||

sadd、srem、smembers
```bash
> sadd set1 "one"
(integer) 1
> sadd set1 "two"
(integer) 1
> srem set1 "two"
(integer) 1
> smembers set1
1) "one"
```

####  (2) sorted sets
**特性：**
+ set的升级版本
+ 增加了一个可以指定的顺序属性，每次制定后,zset会自动重新排序

相关命令|参数|说明|成功|失败
-|-|-|-|-
zadd|[set][index][value]|向集合中添加一个属性，包括排序和属性值||
zrange|[set][start-score][end-score](widthscore)|返回集合中的部分值，widthscore代表联连同序号一起返回||
zrem|[set][value]|删除set中的value|1|0
zincrby|[set][increment][value]|将set中value元素的顺序号增加increment||
zrank|[set][value]|返回某个属性的索引(和下标不同)||
zrevrank|[set][value]|返回某个属性的索引(和下标不同),按降序||
zrevrange|[set][start-index][end-index](widthscore)|返回集合中的部分值，widthscore代表联连同序号一起返回(降序)||
zrangebyscore|[set][start-index][end-index](widthscore)|返回set中score在给定区间的元素||
zcount|[set][start-index][end-index](widthscore)|返回set中score在指定区间的元素的个数||
zcard|[set]|返回set中所有元素的个数||
zremrangebyrank|[set][start-index][end-index]|删除set中排名(索引而不是score)在给定区间的元素	||
zremrangebyscore|[set][start-score][end-score]|删除set中score在给定区间的元素||
