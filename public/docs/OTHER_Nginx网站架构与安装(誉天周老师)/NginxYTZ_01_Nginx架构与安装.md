---
title: 01 Nginx 安装
categories: [Nginx网站架构]
tag:
  - nginx
date: 2015-02-01 08:43:40
typora-copy-images-to: ipic
---

# 1 网站
http://news.netcraft.com    # 各类服务器市场份额统计
http://nginx.org/    # 官方网站
http://wiki.nginx.org/Chs    # nginx中文wiki

# 2 特性

+ 高并发：采用最新 epoll(linux2.6内核) 和 kqueue(freeebsd) 网络 i/o 模型，能够支持3w左右并发连接
+ 内存消耗小：Nginx+PHP 在3w并发下，开启10个 Nginx 进程消耗150MB
+ 支持负载均衡
+ 支持反向代理
+ 成本低廉

# 3 安装

centos7(最小安装)

## 基本环境

```bash
$ ip address show    # 查看联网情况
$ sudo vi /etc/sysconfig/network-scripts/ifcfg-eth0
                DEVICE=eth0
                HWADDR="08:00:27:71:85:BD"
                NM_CONTROLLED="no"
                ONBOOT=yes
                BOOTPROTO=dhcp
$ sudo /etc/ibnit.d/network restart
$ sudo yum update    
$ sudo yum install net-tools 
```

## Nginx
### 依赖

```bash
$ sudo yum install gcc gcc-c++ autoconf automake
$ sudo yum -y install zlib zlib-devel openssl openssl-devel pcre-devel
zlib:Nginx提供的gzip模块，需要zlib库的支持
openssl:Nginx提供ssl功能
pcre:支持地址重写rewrite功能
```

### 安装

```bash
$ groupadd -r nginx
$ useradd -s /sbin/nologin -g nginx -r nginx
$ id nginx
$ tar -zxvf nginx-1.7.9.tar.gz
$ cd nginx-1.7.9
$ ./configure    # ./configure --help查看编译选项
$ ./configure \     # 需要提前创建需要的目录
--prefix = /usr/local/nginx \    # 主目录
--sbin-path=/usr/sbin/nginx \    # sbin目录
--conf-path=/etc/nginx/nginx.conf \    # 配置文件位置
--error-log-path=/var/log/nginx/error.log \    # 错误日志位置
--pid-path=/var/run/nginx/nginx.pid \    # pid位置
--lock-path=/var/lock/nginx.lock \    # lock位置
--user=nginx \    # 用户
--group=nginx \    # 组
--with-http_ssl_module \    # ssl模块
--with-http_flv_module \    # 流媒体模块
--with-http_gzip_static_module \    # gzip压缩功能
--http-log-path=/var/log/nginx/access.log\    # 
--http-client-body-temp-path=/var/temp/nginx/client \    # 客户端访问临时目录
--http-proxy-temp-path=/var/tmp/nginx/proxy \    # 代理的临时目录
--http-fastcgi-temp-path=/var/tmp/nginx/fcgi \    # cgi临时目录
--with-http_stub_status_module    # http状态查询模块
$ make    # 加速编译（make -j [cpu核心数目]）
$ sudo make install
```

### 启动
```bash
$ /usr/sbin/nginx -c /etc/nginx/nginx.conf    # $ nginx -c /etc/nginx/nginx.conf
$ ps aux | grep nginx    # 查看主进程
$ netstat -tunlp | grep nginx    # 查看默认监听的端口
```

### 关闭

```bash
$ kill -QUIT $(cat /var/run/nginx/nginx.pid)    # 从容关闭（正常关闭）
$ kill-TERM $(cat /var/run/nginx/nginx.pid)    # 快速关闭
$ kill -9 nginx    # 强制结束所有的nginx进程
```

### 重启

```bash
$ kill -HUP $(cat /var/run/nginx/nginx.pid)
```

### 检测配置文件语法

```bash
$ /usr/sbin/nginx -t -c /etc/nginx/nginx.conf
```

### 使nginx接受service管理

```bash
$ cd nginx-1.2.5
$ cp nginx /etc/init.d/
$ chmod a+x /etc/init.d/nginx
$ rpm -q --script vsftpd
$ chkconfig --add nginx
$ chkconfig --list nginx
$ chkconfig nginx on
$ cd /etc/rc.d/rc5.d
$ vim nginx    # 修改默认路径配置，和编译时指定的配置保持一致
$ service nginx restart
```

### 配置

```bash
$ grep "physical id" /proc/cpuinfo | sort -u | wc -l    # 查看cpu数量
$ grep 'core id' /proc/cpuinfo | sort -u | wc -l    # 查看核心数
$ grep 'processor' /proc/cpuinfo | sort -u | wc -l    # 查看线程数
$ dmidecode -s processor-version    # 查看cpu型号
$ service nginx reload    # 重载nginx配置文件（优于restart）
$ vim /etc/nginx/nginx.conf
```

```
...
worker_processes 1#工作进程数（建议和cpu核数保持一致）
...
events
{
    worker_connections 1024;#最大连接数(根据服务器的负载能力)
    ....
}
http
{
    log_format   main#日志格式
    keepalive_timeout 65;#连接失效时间
    sendfile on;#是否缓存下向核心内存获得的数据（可以减少用户内存调用系统内存的开销）
    gzip on;#启用gip
    ...
    server    # 定义虚拟主机
    {
    
        
     }
    server
    {

    
    }
}
```


