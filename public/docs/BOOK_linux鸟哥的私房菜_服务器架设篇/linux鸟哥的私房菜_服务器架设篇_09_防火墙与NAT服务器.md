---
title: 9 防火墙与 NAT 服务器
categories: [linux鸟哥的私房菜_基础篇]
tag:
 - linux
 - shell

date: 2014.01.26 10:57:24
typora-copy-images-to: ipic
---

# 1    认识防火墙    

## 1.1 开始之前来个提醒事项    

## 1.2 为何需要防火墙 
### 防火墙外最基本的安全防护
+ 关闭不需要且危险的服务；
+ 将系统所有软件保持在最新的状态
+ 权限设定妥当且定时进行备份
+ 教育用户具有良好的网络、系统操作习惯 

### 防火墙的作用实例 

+ 限制文件传输服务，只在子域的主机才能使用，不对整个Internet开放
+ 限制主机仅可以接受客户端的WWW请求，其它服务关闭 
+ 限制主机仅能主动对外联机，即如果客户端对主机发送主动联机的封包（TCP封包的SYN flag）就予以抵挡 

### 防火墙任务总结 

+ 切割被信任（如子域）与不被信任（如Internet）的网段  
+ 划分出可提供 Internet 的服务与必须受保护的服务 
+ 分析出可接受与不可接受的封包状态 
+ 更加细部深入的NAT设定
+ 更弹性的IP封包伪装功能    

## 1.3 Linux系统上防火墙的主要类别        
依据防火墙管理的范围分类:

☑ 单一主机型控管
+ Netfilter(封包过滤类型)；
+ TCP Wrappers(依据服务软件作为分析);

☑ 区域性防火墙
+ Netfilter;
+ proxy server;   

### Netfilter(封包过滤机制，OSI的2,3,4层) 
☑ 重点：将风暴表头的数据捉出来，直接分析封包表头数据，包括硬件地址（MAC），软件地址（IP）,TCP,UDP,ICMP等信息进行过滤分析。     

### TCP Wrappers(程序控管)                
☑ 重点：分析谁对某程序进行存取，透过规则分析该服务器程序谁能够联机，谁不能联机。

### Proxy(代理服务器) 
☑ 重点：client 并没有直接连上 Interent，而是 proxy server，因此想要攻击主机必须先攻破代理服务器    

## 1.4 防火墙的一般网络布线示意图
☑ 1 单一网域，仅有一个路由器

![2177B981-C6B6-4A85-995A-108C53E071F6](http://o6ul1xz4z.bkt.clouddn.com/2017-04-30-2177B981-C6B6-4A85-995A-108C53E071F6.png)

☑ 2 内部网络包含安全性更高的子网，需内部防火墙切开子网

![5F5990E5-2D62-4AB1-BC99-1CDE53DC71E3](http://o6ul1xz4z.bkt.clouddn.com/2017-04-30-5F5990E5-2D62-4AB1-BC99-1CDE53DC71E3.png)

☑ 3 在防火墙的后面架设网络服务器主机（在两个防火墙中间）

![7CD55EC1-2DC0-4BA9-8150-0C15D3373C0A](http://o6ul1xz4z.bkt.clouddn.com/2017-04-30-7CD55EC1-2DC0-4BA9-8150-0C15D3373C0A.png)

## 1.5 防火墙的使用限制 
☑ 1. 拒绝让Internet的封包进入主机的某些端口
☑ 2. 拒绝让某些来源IP的封包进入
☑ 3. 拒绝让带有某些特殊旗标的封包进入
☑ 4. 分析硬件地址（MAC）来决定联机与否
☑ 5. 防火墙并不能很有效的抵挡病毒或木马程序
☑ 6. 防火墙对于来自内部LAN的攻击较五承受力
# 2 TCP Wrappers
## 2.1 哪些服务有支持：ldd 
☑ TCP Wrappers使用的配置文件
+ /etc/hosts.allow
+ /etc/hosts.deny

### 由super daemon（xinetd）所管理的服务
### 有支持libwrap.so模块的服务
范例一：查询xinted管理的服务有哪些

```bash
$ yum install xinted  # 安装xinted
$ chkconfig xinted on  # 启动xinted
$ chkconfig --list  # 查看xinted管理的服务
```

范例二：rsyslogd, sshd, xinetd, httpd有没有支持tcp wrappers的抵挡功能

```bash
$ ldd $(which rsyslogd sshd xined httpd)  # 将所有动态函式库取出来查阅
$ for name in rsyslogd sshd xinted httpd; \                       
  do    \                        
    echo $name    \                        
    ldd $(which $name) | grep libwrap; \  # 查得到代表支持（rsyslogd,httpd不支持）                    
  done
```

## 2.2 /etc/hosts.{allow|deny}的设定方式
范例一：先开放本机的127.0.0.1可以进行任何本机的服务，然后让区网（192.168.1.0/24）可以使用rsync,同事是10.0.0.100也能够使用rsync,但其它来源则不允许使用rsync。 

**首先需要知道rsync的服务启动的档名**
```bash
$ cat /etc/xinietd.d/rsync
```

```bash
service rsync
{
  disable=yes
  flags=IPv6
  socket_type=stream
  wait=no
  user=root
  service=/usr/bin/rsync # 档名叫做rsync
  service_args=--daemon
  log_on_failure++USERID 
} 
```

**配置抵挡规则**
/etc/hosts.allow

```bash
ALL:    127.0.0.1 #  本机全部去的服务都接受
rsysnc:192.168.1.0/255.255.255.0 10.0.0.100 
```

/etc/hosts.deny
```bash
rsync:ALL
```

# 3 Linux的封包过滤软件：iptables

## 3.1 不同Linux核心版本的防火墙软件
☑ **version2.0**:    ipfwadm 
☑ **version2.2**:    ipchains 
☑ **version2.4/2.6**:    iptables(主要)

## 3.2 封包进入流程：规则顺序的重要性     
![FD376D93-3290-4B66-AEDC-506F32AE3025](http://o6ul1xz4z.bkt.clouddn.com/2017-04-30-FD376D93-3290-4B66-AEDC-506F32AE3025.png)

## 3.3 iptables的表格(table)与链（chain）
☑ 注意：Linux的iptables至少有三个表格     
+ 管理本机进出的Filter
+ 管理后端主机（防火墙内部计算机）的nat
+ 管理特殊旗标使用managle(较少使用) 

### iptables内建各表格与链的相关性（三种流向）
（1）封包进入Linux使用资源;

（2）封包经Linux主机转递，不使用主机资源；
（3）封包由Linux主机发出；

## 3.4 本机的iptables语法        

## 3.4.1 规则的观察与清除     
### 观察

#### iptables

```bash
# 防火墙规则的设定
$ iptables [-t tables][-L] [-nv]
```

注意：不显示针对那些接口            
| 选项与参数 | 说明                                       |
| ----- | ---------------------------------------- |
| -t    | 后面接table,例如nat或filter,若省略此项目，则使用默认的filter |
| -L    | 列出目前的table规则                             |
| -n    | 不进行IP或HOSTNAME的反查，显示讯息的速度会快很多            |
| -v    | 列出更多的信息，包括通过该规则的封包总位数，相关的网络接口等           |

| 显示格式         | 说明                                  |
| ------------ | ----------------------------------- |
| target       | 要进行的动作（ACCEPT是放行；REJECT是拒绝；DROP是丢弃） |
| prot         | 所使用的封包协议，主要有tcp，udp及icmp三种封包格式      |
| opt          | 额外的选项说明                             |
| source       | 针对哪个来源IP进行限制                        |
| destionation | 针对那些目标IP进行限制                        |

范例一：列出filter table三条链的规则   

```bash
$ iptables -L -n   # 列出目前的table规则 
```

范例二：列出net table三条链的规则   

```bash
$ iptables -t nat -L -n 
```

#### iptables-save

```bash
# 列出完整的防火墙规则，包括每条规则针对的接口
$ iptables-save [-t table]              
```

| 选项   | 说明                           |
| ---- | ---------------------------- |
| -t   | 可以针对某些表格来输出，例如针对NAT或Filter等等 |

```bash
$ iptables-save     
```

### 清除


```bash
$ iptables [-t tables][-FXZ]                
```

| 选项与参数 | 说明                  |
| ----- | ------------------- |
| -F    | 清除所有的已订定的规则         |
| -X    | 杀掉所有使用者自定义的chain    |
| -Z    | 将所有的chain的技术与流量统计归零 |

范例一：清除本机防火墙所有规则(清除所有规则，不改变预设政策)  

```bash
$ iptables -F  
$ iptables -X  
$ iptables -Z        
```

## 3.4.2 定义预设规则（policy）
`iptables [-t net] -P [INPUT,OUTPUT,FORWARD][ACCEPT,DROP]`

| 选项与参数  | 说明                       |
| ------ | ------------------------ |
| -P     | 定义政策（Policy）             |
| ACCEPT | 该封包可接受                   |
| DROP   | 该封包直接丢弃，不让client端知道为何被丢弃 |

范例一：将本机的INPUT设定为DROP,其它设定为ACCEPT，注意到这是不通的防火墙设定 

```bash
$ iptables -P INPUR DROP  # 针对进入主机的封包政策（因为还没设定任何规则，因此任何封包都不会符合任何规则，直接根据政策被被丢弃） 
$ iptables -P OUTPUT ACCEPT  # 针对发出的封包政策 
$ iptables -P FORWARD ACCEPT  # 针对转发的封包的政策 
$ iptables -t nat -P PREROUTING ACCEPT  # 设定net table的PREROUTING链为可接受 
$ iptables-save  # 查看防火墙规则        
```

## 3.4.3 封包的基础比对：IP,网域及接口装置：新人装置，信任网域
`iptables [-AI 链名][-io 网络接口] [-p 协议][-s 来源IP/网域] [-d 目标IP/网域] -j [ACCEPT|DROP|REJECT|LOG]`

| 选项与参数                                  | 说明                                       |
| -------------------------------------- | ---------------------------------------- |
| -AI                                    | 链名, 针对某条链进行规则的“插入”或“累加”                  |
| -A                                     | 在链末尾加入一条规则                               |
| -I                                     | 插入一条规则，如果没有指定默认插入第一条                     |
| -io                                    | 网络接口：设定封包进出的接口规范                         |
| -i                                     | 封包所进入的那个网络接口，需与INPPUT链配合                 |
| -o                                     | 封包所传出的那个网络接口，需要与OUTPUT配合                 |
| -p 协定：设定此规则适用于那种封包格式（tcp/udp/icmp及all） |                                          |
| -s 来源IP/网域                             | 设定此规则此封包的来源项目，可指定单纯的IP(比如192.168.1.100)或包括网域(192.168.0.0/24或192.168.0.0/255.255.255.0) |
| !                                      | 表示不许                                     |
| -d 目标 IP/网域                            | 设定封包的目标IP或网域                             |
| -j                                     | 接动作，主要动作有接受（ACCEPT）、丢弃（DROP）、拒绝（REJECT）及记录（LOG） |

范例一：设定lo成为受信任的装置，亦即进出lo的额封包都予以接受                

```bash
$ iptables -A INPUT -i lo -j ACCEPT            
```

范例二：只要来自内网（192.168.100.0/24）的封包通通接受                

```bash
$ iptables -A INPUT -i eth1 -s 192.168.100.0/24 -j ACCEPT            
```

范例三：来自192.168.100.10接受，但192.168.100.230就丢弃                

```bash
$ iptables -A INPUT -i eth1 192.168.100.10 -j ACCEPT # 192.168.100.10接受                
$ iptables -A INPUT -i eth1 192.168.100.230 -j DROP # 192.168.100.230就丢弃                
$ iptables-save # 查看目前的防火墙设定            
```

范例四：记录某条规则运行记录，写入/var/log/messages                

```bash
$ iptables -A INPUT -s 192.168.1.200 -j LOG # 只要是来自192.168。2.200这个IP是，该封包的先关信息就会被写入核心讯息                
$ iptables -L -n # 查看防火墙记录        
```

## 3.4.4 TCP,UDP的规则比对：针对端口设定 


`iptables [-AL 链][-io 网络接口] [-p tcp,udp][-s 来源IP/网域] [--sport 端口范围][-d 目标IP/网域] [--dport 端口范围] -j [ACCEPT|DROP|REJECT]`

| 选项与参数   | 说明                                      |
| ------- | --------------------------------------- |
| --sport | 端口范围, 限制来源封包的端口号，端口号可以是连续的，例如1024:65535 |
| --dprot | 端口范围, 限制目标端口号                           |

☑ 注意：只有TCP或者UDP封包才有端口，所以指定端口必然指定-p [tcp|udp]            

范例一：想要联机进入本机port 21的封包都抵挡 

```bash
$ iptables -A INPUT -i eth0 -p tcp --dport 21 -j DROP
```

范例二：相连接我的主机的网上邻居（sasmba,udp port:137,138,tcp port:139,445）都放行 

```bash
$ iptables -A INPUT -i eth0 -p udp --dport 137:138 -j ACCEPT 
$ iptables -A INPUT -i eth0 -p tcp --dport 139 -j ACCEPT 
$ iptables -A INPUT -i eth0 -p tcp --dport 445 -j ACCEPT                
```

范例三：抵挡了来自192.168.1.0/24的1024:65535端口且想连接ssh port的封包 

```bash
$ iptables -A INPUT -i eth0 -p tcp -s 192.168.1.0/24 --sport 1024:65535 --dport ssh -j DROP  # 必须制定-p tcp，否则会出错
```

范例四：将任何来源port 1:L1023的制动联机本地端1:1023的封包丢弃 

```bash
$ iptables -A INPUT -i eth0 -p tcp --sport 1:1023 --dport 1:1023 --syn -j DROP  # 客户端的主动联机封包一般会1024端口以上        
```


## 3.4.5 iptables 外挂模块：mac与state

```bash
$ iptables -A INPUT [-m state][--state 状态]
```

| 选项与参数        | 说明                                       |
| ------------ | ---------------------------------------- |
| -m           | 一些iptables的外挂模块（常见的有state: 状态模块；mac: 网络卡硬件地址） |
| --state      | 一些封包的状态(INVALID 无效的封包（例如数据破损）, ESTABLISHED 已经联机成功的联机状态, NEW 想要新建立联机的封包状态, REALTED 表示这个封包是我们的主机发送出去的 |
| --mac-source | 来源主机的MAC                                 |

范例一：只要已建立或响应封包就予以通过，丢弃不合法封包 

```bash
$ iptables -A INPUT -m state --state RELATED,ESTABLIEHED -j ACCEPT    
```

范例二：针对局域网内的aa:bb:cc:dd:ee:ff主机开放联机(mac不能跨路由) 

```bash
$ iptables  -A INPUT -m mac --mac-source aa:bb:cc:dd:ee:ff -j ACCEPT        
```

## 3.4.6 IMCP封包规则的比对：针对是否响应ping来设计

```bash
iptables -A INPUT [-p icmp][--icmp-type 类型] -j ACCEPT 
```

| 选项与参数       | 说明                                     |
| ----------- | -------------------------------------- |
| --icmp-type | 后面跟ICMP的封包类型，可以使用代号（例如8代表echo request） |

☑ 注意：如果主机作为区网的路由器，建议icmp封包通通放行，因为客户端要用ping监测网络                

范例一：让0,3,4,11,12,14,16,18,的ICMP type可以进入主机 

```bash
$ vim icmpFirewall.sh # [SHEEL 10]

```

```bash
#!/bin/bash
icmp_type="0 3 4 11 12 14 16 18" 
for typeicmp in $icmp_type
do
  iptables -A INPUT -i eth0 -p icmp --icmp-type $typeicmp -j ACCEPT
done 
```

```bash
$ sh icmpFirewall.sh        
```

## 3.4.7 超阳春客户端防火墙设计与防火墙规则存储         
### 1. 主机作为客户端的基本防火墙设置                    
（1）规则清零：清除所有已经存在的规则                    
（2）预设政策：除了INPUT这个自定义链设定为DROP外，其它为预设ACCEPT                    
（3）信任本机：由于lo对本机来说相当重要，因此lo必须设定为信任装置                    
（4）回应封包：让本机主动向外要求二响应的封包进入本机                    
（5）信任用户：这是非必要的，如果你想要让区网的来源可用你的主机资源时         
### 2. 实作基本防火墙（有点弱）
方式一：将命令写成脚本执行

```bash
$ vim bin/firewall.sh
```

```bash
#!/bin/bash
export PATH=/sbin;/bin;/usr/### sbin;/usr/bin                        
# 1. 清除规则                        

iptables -F                        
iptables -X                        
iptables -Z                        
# 2.设定政策                        
iptables -P INPUT DROP                        
iptables -P OUTPUT ACCEPT                        
iptables -P FORWARD ACCEPT                        
# 3-5.指定各项规则                        
iptables -A INPUT -i lo -j ACCEPT                        
iptables -A INPUT -i eth0 -m state --state RELATED,ESTABLISHED -j ACCEPT                        
#iptables -A INPUT -i eth0 -s 192.168.1.0/24 -j ACCEPT                        #6.写入防火墙规则配置文件                        
/etc/init.d/iptables save # 储存到/etc/sysconfig/iptables,这样才会在下次启动后依然生效                    
```

```bash
$ sh bin/firewall.sh 
$ chkconfig --list iptables   # 查看防火墙服务  
```

方式二：直接修改配置文件 

```bash
$ vim /etc/sysconfig/iptables  # 将规则写入配置文件                    
$ /etc/init.d/iptables restart    
```

## 3.5 IPv4的核心管理功能：/proc/sys/net/ipv4/*
☑ 注意：查看核心的说明文件需要安装kernel-doc软件（/usr/share/doc/kernel-doc-2.6.32/Documentation/networking/ip-sysctl.txt）
下面给出几个核定预设的攻击低档模块的设置档案： 

### SYN Cookie模块：/proc/sys/net/ipv4/tcp_syncookies            
☑ 功能：三次握手过程中，服务器端发送SYN/ACK确认封包前会要求客户端短时间内恢复一个序号，客户端能正确回应才发送SYN.ACK封包            
☑ 应对攻击类型：SYN Flooding            
☑ 启动方式： 档系统的1024-65535端口即将用完时启动 

```bash
$ echo "1" > /proc/sys/net/ipv4/tcp_syncookies            
```
☑ 参数
+ tcp_max_syn_backlog
+ tcp_synack_retries
+ tcp_abort_on_overflow 

### /proc/sys/net/ipv4/icmp_echo_ignore_broadcasts            
☑ 功能：取消ping回应            
☑ 应对攻击类型
+ ping flooding(不断发ping)
+ ping death(发送大的ping 封包)   

☑ 启动方式               

```bash
$ echo "1"  /proc/sys/net/ipv4/icmp_echo_ignore_broadcasts            
```

（4）参数
+ icmp_echo_ignore_broadcasts（仅ping broadcast地址时才取消回应）
+ icmp_echo_ignore_all(全部ping 都不予回应)。 

### 对不同网络接口个别设置： /proc/sys/net/ipv4/conf/网络接口/*            
☑ 功能：
+ rp_filter:逆向路径过滤，藉由网络接口的路由信息配合封包的来源地址，过滤不合理封包；
+ log_martians: 启动记录不合法的IP来源
+ accept_source_route:何绍路由采用，建议取消这个设定值
+ send_redirects:会发送一个ICMP redirect封包，建议关闭            
  ☑ 应对攻击类型：过滤杂七杂八的封包            
  ☑ 启动方式

方式一：一般方式

```bash
$ echo "1" > /proc/sys/net/ipv4/conf/eth0/rp_filter  # 启动eth0的rp_filter功能                
```

方式二：修改系统设定值（推荐） 

```bash 
$ vim /etc/sysctl.conf  # 将上面那几个功能通通启动  
```

```bash
# added by nemo 2014/1/27                    
net.ipv4.tcp_syncookies=1
net.ipv4.icmp_echo_ignore_broadcasts=1
net.ipv4.conf.all.rp_filter=1
net.ipv4.confdefault.rp_filter=1
net.ipv4.conf.eth0.rp_filter=1
net.ipv4.conf.lo.rp_filter=1
......  
```

```bash
$ sysctl -p  # 重启防火墙
```

# 4 单机防火墙的一个实例    

## 4.1 规则草拟    

## 4.2 实际设定
# 5 NAT服务器的设定    

## 5.1 什么是NAT?SNAT?DNAT?    

## 5.2 最阳春NAT服务器：IP分享功能    

## 5.3 iptables的额外核心模块功能    

## 5.4 在防火墙后端之网络服务器DNDAT设定
# 6 重点回顾
# 7 本章习题