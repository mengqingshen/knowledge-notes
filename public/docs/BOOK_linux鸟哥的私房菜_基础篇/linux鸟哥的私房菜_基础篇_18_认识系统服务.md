---
title: 18 认识系统服务
categories: [linux鸟哥的私房菜_基础篇]
tag:
 - linux

date: 2013-12-08 18:20:07
typora-copy-images-to: ipic
---

```bash
/etc/hosts.deny
/etc/hosts.allow
/usr/sbin/tcpd   # 分析进入系统的TCP网络封包
```

# 1 daemon基本介绍

## 1.1 daemon与sevice的区别   

![36C6EA0D-B63A-40C1-83BF-4352BE78A6F9](http://cdn.mengqingshen.com/2017-04-22-36C6EA0D-B63A-40C1-83BF-4352BE78A6F9.png)

## 1.2 daemon的分类

### 按线程处理方式划分
☑ stand alone: 自行单独启动
☑ super daemon: 由一只特殊的daemon管理

![66C18705-F480-4A09-9D02-7F7F6FA02C79](http://cdn.mengqingshen.com/2017-04-22-66C18705-F480-4A09-9D02-7F7F6FA02C79.png)

+ multi-threaded(多重线程)
+ single-threaded(单线程)

### 按工作形态(响应方式)分
☑ signal-control
☑ interval-control

## 1.3 daemon的命名规则   
## 1.4 服务与端口的对应

```bash
$ cat /etc/services  # 查看daemon对应的端口<daemon port> <port/封包协议> <该服务的说明>
```

☑ 注意：尽量避免修改这个文件

## 1.5 daemon的启动脚本与启动方式

![B2A66C2F-B986-46CE-B28E-06B59A4E0230](http://cdn.mengqingshen.com/2017-04-22-B2A66C2F-B986-46CE-B28E-06B59A4E0230.png)

**Stand alone启动方式**
方式1: `/etc/init.d/* [status|stop|restart|restart|condreatart]`

```bash
$ /etc/init.d/syslog # 不加参数会给出关于参数的提示
$ /etc/init.d/syslog status  # 查看syslog的启动状态
$ /etc/init.d/syslog restart # 重新读取配置文件
```

方式2: `/sbin/service`

![F0FEE94B-D303-4AE8-A55A-4787FA6ABE93](http://cdn.mengqingshen.com/2017-04-22-F0FEE94B-D303-4AE8-A55A-4787FA6ABE93.png)

```bash
$ service crond restart
# <==>
# /etc/init.d/crond restart # 重新启动crond这支daemon
$ service --status-all  # 列出目前系统所有服务的运行状态
```

### 利用 Super daemon 启动的方式
☑ 注意: xinetd 本身是 stand alone 的启动方式。
☑ 用途: 适合那些开放较多权限或本身不具备防火墙等管理机制的服务。

```bash
$ grep -i 'disable' /etc/xinetd.d/*  # 查看super daemon管理的程序是否启动（disable=yes代表取消）
$ vi /etc/xinetd.d/rsync  # 编辑文件使rsync启动（改为disable=no）

$ /etc/init.d/xinetd restart # 重启super service
```

```bash
$ grep  'rsync' /etc/services  # 观察服务使用的端口
$ vim /etc/xintd.conf    # super daemon的默认配置文件
$ vim /etc/xintd.d  # super daemon 的服务参数档（上面的配置文件为默认值，这里为实际设置的位置）
```

![395BA54E-995F-408C-89A3-F148F4FC8CBC](http://cdn.mengqingshen.com/2017-04-22-395BA54E-995F-408C-89A3-F148F4FC8CBC.png)

![5637DBC4-53FA-4BD2-8036-067AEE673FCF](http://cdn.mengqingshen.com/2017-04-22-5637DBC4-53FA-4BD2-8036-067AEE673FCF.png)

![DFB4B764-9CD9-4CE1-BE40-384C0FC8965C](http://cdn.mengqingshen.com/2017-04-22-DFB4B764-9CD9-4CE1-BE40-384C0FC8965C.png)

![5E7C2395-A5C0-438A-BF94-9FD4E32E6FC8](http://cdn.mengqingshen.com/2017-04-22-5E7C2395-A5C0-438A-BF94-9FD4E32E6FC8.png)

![064AA05F-5606-48FE-8C7F-D5ED93CC240A](http://cdn.mengqingshen.com/2017-04-22-064AA05F-5606-48FE-8C7F-D5ED93CC240A.png)

![5E2325FE-9E38-4DA5-9D67-5774BEB64EDB](http://cdn.mengqingshen.com/2017-04-22-5E2325FE-9E38-4DA5-9D67-5774BEB64EDB.png)

## 1.6 通过 server 的管理使 daemon 对不同 client 拥有不同权限

### 案例一：一个简单的rsync（提供同步文件夹服务）案例

![A093C11A-6C10-41D6-A8E6-9615F74DD113](http://cdn.mengqingshen.com/2017-04-22-A093C11A-6C10-41D6-A8E6-9615F74DD113.png)

```bash
$ cat /etc/xinetd.d/rsync  # 查看一下原来的设置
service rsync{
    disable = no  # 预设是关闭的，这里已经被打开了
    socket_type = stream    # 使用tcp封包协议
    wait = no    # 可以同时进行大量联机
    user = root    # 用root这个身份启动服务(rysnc的默认端口为873，root身份才能启动这种小于1024的端口)
    server = /usr/bin/rsync    # 就是这支程序启动服务
    server_args = --daemon    # 必选项
    log_on_failure +=USERID    # 登陆错误时额外记录用户ID
}
$ vim /etc/xinetd.d/rsync    # 重新设置进行权限的控制
```

```bash
#针对内部王网域进行限制
service rsync{
    disable = no        
    bind = 127.0.0.1    # 服务绑定在这个接口上
    only_from = 127.0.0.1/8    # 只开放这个网域的来源
    no_access = 127.0.0.{100,200}    # 限制这两个不可登入
    instances =  UNLIMITED    # 取代/etc/xined.conf的设定值
    socket_type = stream    # 底下设定保留            wait = no        ----可以同时进行大量联机
    user = root  
    server = /usr/bin/rsync       
    server_args = --daemon       
    log_on_failure +=USERID        
}
# 再针对外部的联机     进行限制
service rsync
{
    disable = no
    bink = 192.168.0.100
    only_from = 140.166.0.0/16     # 
    only_from = .edu.tw     # +=代表累加
    access_times = 01:00-9:00 20:00-23:00      # 两个时间段用空格隔开
    instances = 10     # 只有十条联机
    socket_type = stream     # 底下设定保留
    wait = no     # 可以同时进行大量联机
    user = root  
    server = /usr/bin/rsync       
    server_args = --daemon       
    log_on_failure +=USERID
}
```

```bash
$ netstat -tnlp | grep 873     # 配置完后看一下873端口的状态
$ /etc/init.d/xinetd restart     # 重启xinetd
$ netstat -tnlp | grep 873     # 再观察
```

# 2 服务的防火墙管理 xinetd,TCP Wrappers

# 2.1 /etc/hosts.allow,/etc/hosts.deny的管理

☑ 注意：一个服务受xinetd管理或者支持TCP Wrappers就可以使用这两个配置文件

**范例一**：测试一下sshd和httpd这两支程序是否支持TCP Wrapper套件

```bash
$ ldd $(which sshd httpd)   # 查看sshd和httpd支持的动态链接库，如果有libwrap.so说明支持TCP Wrapper(发现sshd有而httpd没有)
```

**范例二**：只允许 `140.116.0.0/255.255.0.0` 与`140.116.0.0/255.255.0.0`这两个网域及`203.71.38.123`这个主机可以进入我们的 rsync 服务器，其它的 IP 全部挡掉

```bash
$ vim /etc/hosts.allow

rsync:140.116.0.0/255.255.0.0
rsync:140.116.0.0/255.255.0.0
rsync:203.71.38.123
rsync:LOCAL
```

```bash
$ vim /etc/host.deny

rsync:ALL
```

![2C8EE69F-A3CB-42D1-A34A-83C49A2E9E61](http://cdn.mengqingshen.com/2017-04-22-2C8EE69F-A3CB-42D1-A34A-83C49A2E9E61.png)

![64F66592-031A-4B04-9C18-5657627D6136](http://cdn.mengqingshen.com/2017-04-22-64F66592-031A-4B04-9C18-5657627D6136.png)



# 2.2 TCP Wrapper的特殊功能

```bash
$ rpm -q tcp_wrapper  # 查看是否安装了tcp_wrapper
```

**案例一**

![883EAE56-8D17-44A8-9771-D77D021A9FF0](http://cdn.mengqingshen.com/2017-04-22-883EAE56-8D17-44A8-9771-D77D021A9FF0.png)

```bash
$ vim /etc/hosts.deny
```

![71E03E04-7D3C-49EB-B5D4-2C7CC8247B1E](http://cdn.mengqingshen.com/2017-04-22-71E03E04-7D3C-49EB-B5D4-2C7CC8247B1E.png)

![F9400128-215E-4A40-881F-8A32C8965BD0](http://cdn.mengqingshen.com/2017-04-22-F9400128-215E-4A40-881F-8A32C8965BD0.png)



```bash
# spawn指令，在自己的屏幕上显示"security notice from 自己的主机名"
raync:ALL:spawn (echo "security notice from host $(/bin/hotname)";\

      # 对方发起请求时追踪对方的主机名称并交给管道
      echo;/usr/sbin/safe_finger @%h) | \
      
      # 将管道的信息（请求连接的主机名信息）mail给root
      /bin/mail -s "%d-%h security" root&\

      # 向对方屏幕发送警告信息，然后终止联机
      :twist(/bin/echo -e "\nWARNING connection not allowed.\n\n")
```

# 3 系统开机启动服务设定

## 3.1 观察系统启动的服务

```bash
$ netstat -tulp # 找出目前系统启动的网络服务有哪些
$ netstat -lnp      # 找出所有有监听网络的服务(包括socket状态)
$ netstat --status-all  # 观察所有的服务状态
```

## 3.2 设定开机启动的方法
### 系统开机流程

![26ADA42B-FD7F-4244-893C-16B973590437](http://cdn.mengqingshen.com/2017-04-22-26ADA42B-FD7F-4244-893C-16B973590437.png)

### chkconfig: 管理系统服务默认开机启动与否

![A678F144-3A5A-4C1D-B9B6-3E3F243EE602](http://cdn.mengqingshen.com/2017-04-22-A678F144-3A5A-4C1D-B9B6-3E3F243EE602.png)

```bash
$ chkconfig --list | more  # 列出目前系统上所有被chkconfig管理的服务
$ chkconfig --list | grep '3:on'  # 显示出目前runlevel 3开启的服务
$ chkconfig --level 345 atd on  # 让atd这个服务在3,4,5runlevel开启
```

案例一:先观察httpd这个服务是否启动，然后设定预设开机启动（并不会立即启动哦）

```bash
$ /etc/init.d/httpd status  # 观察httpd这个服务的运行状态 
$ chkconfig --list | grep httpd # 观察是否预设开机启动
$ chkcnffig httpd on;chkconfig --list | grep httpd  # 设定开机启动
$ /etc/init.d/httpd status # 再观察一次还是没有启动
```

案例二：查看rsync是否启动，是则将其关闭

```bash
$ /etc/init.d/rsync status      # 发现不行，因为rsync不是stand alone的启动方式
$ netstat -tlnp | grep rsync      # 因为rsync是一个网络服务，因此可以这样看
$ chkconfig --list | grep rsync      # 查看是否是开机预设启动的
$ chkconfig rsync off;chkconfig --list | grep rsync      # 设置开机关闭
$ /etc/init.d/xinetd restart;netstat -tlup| grep rsync      # 重启xinetd对super daemon管理的服务相当于重启计算机呢
```

### chkconfig:  设定自定义系统服务

![5774EAC0-7268-49A3-9138-BC9B809BE576](http://cdn.mengqingshen.com/2017-04-22-5774EAC0-7268-49A3-9138-BC9B809BE576.png)

案例一

![D7580D53-1447-413E-983F-398A2B161537](http://cdn.mengqingshen.com/2017-04-22-D7580D53-1447-413E-983F-398A2B161537.png)

```bash
$ vim /etc/init.d/mySystemService
```



![713BB125-6162-4B81-B9E9-B3AD7464EAEE](http://cdn.mengqingshen.com/2017-04-22-713BB125-6162-4B81-B9E9-B3AD7464EAEE.png)

```bash
#!/bin/bash
# chkconfig: 35 80 70 
# description:用来练习的一个简单自定义系统服务脚本

echo "nothing"
```

```bash
$ chkconfig --list mySystemService  # 这个时候还没有加入ckconfig管理
$ chkconfig --add mySystemService;chkconfig --list mySystemService # 此时已经加入chkconfig管理
$ chkconfig --del mySystemService  # 删除对这个服务自定义服务的管理
$ rm /etc/init.d/mySystemService  # 删除那个脚本
```

### ntsysv: 类图型接口管理模式（redhat系列发行版特有）

![9DDE5DE6-87BE-415E-A266-77EE4807DD6C](http://cdn.mengqingshen.com/2017-04-22-9DDE5DE6-87BE-415E-A266-77EE4807DD6C.png)

![9F2F61C4-62B0-43F9-83D8-E262B6E922F5](http://cdn.mengqingshen.com/2017-04-22-9F2F61C4-62B0-43F9-83D8-E262B6E922F5.png)

# 4 centos5.x预设启动的服务列表

![89DAEB7F-A243-4419-9CB5-81E1E37BBA75](http://cdn.mengqingshen.com/2017-04-22-89DAEB7F-A243-4419-9CB5-81E1E37BBA75.png)

![4A958E57-20A6-4F51-A525-1C71DB4B94A1](http://cdn.mengqingshen.com/2017-04-22-4A958E57-20A6-4F51-A525-1C71DB4B94A1.png)

![473202C3-8BD3-4E05-9A50-EF4E819412F7](http://cdn.mengqingshen.com/2017-04-22-473202C3-8BD3-4E05-9A50-EF4E819412F7.png)

![F4FECB04-78DF-485C-A6F7-9B93961F286A](http://cdn.mengqingshen.com/2017-04-22-F4FECB04-78DF-485C-A6F7-9B93961F286A.png)

![7283E9DD-5246-433F-B473-177E5F91939F](http://cdn.mengqingshen.com/2017-04-22-7283E9DD-5246-433F-B473-177E5F91939F.png)

# 5 重点回顾 

![B86812B1-AD4D-4B56-AD12-C2565733E51F](http://cdn.mengqingshen.com/2017-04-22-B86812B1-AD4D-4B56-AD12-C2565733E51F.png)

# 6 习题

**案例**

![969E198C-D834-4FF0-AF8F-3DD4D0AB6B7E](http://cdn.mengqingshen.com/2017-04-22-969E198C-D834-4FF0-AF8F-3DD4D0AB6B7E.png)

```bash
$ rpm -q telnet-server  # 查看telnet服务程序是否启动
$ yum install telnet-server  # 如果没安装的话就安装
$ chkconfig --list telnet  # 查看开机启动情况（发现时super daemon启动方式）
$ ll /etc/xinetd.d/telnet  # 如果有有这个文件说明真的是super daemon管理的
$ grep '^telnet' /etc/services  # 开头是telnet的那些行（可以看到端口信息）
$ chkconfig telnet on;chkconfig --list telnet  # 设置telnet预设开机启动
$ /etc/init.d/xinetd restart  # 这样telnet就启动了呢
$ netstat -tlnp| grep xinetd  # 看看是不是启动的23号端口
$ grep server /etc/xinetd.d/telnet  # 这个文件中记录着telnet的主程序绝对路径（server=/usr/sbin/in.telnetd）
$ vim /etc/hosts.allow  # 设置允许的网域
in.telnetd:.edu.tw        
$ vim /etc/hosts.deny  # 设置阻止的网域
in.telnetd:ALL
```

**简答题**

![4DAB56FB-D950-47BC-9257-16C6C686488D](http://cdn.mengqingshen.com/2017-04-22-4DAB56FB-D950-47BC-9257-16C6C686488D.png)

