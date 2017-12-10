---
title: NodeJS线上服务器部署与发布
categories:
    - 慕课网学习笔记
tag:
  - nodejs
  - MongoDB
toc: true
typora-copy-images-to: ipic
---

[网址](http://coding.imooc.com/class/95.html)

# 0 课程介绍

## 实战项目

![3FD89E7B-FC0E-4B84-89B7-502E642CB745](http://o6ul1xz4z.bkt.clouddn.com/2017-04-22-3FD89E7B-FC0E-4B84-89B7-502E642CB745.png)

![0BD1730A-1F74-4203-A5EB-A9BFF8BCB92E](http://o6ul1xz4z.bkt.clouddn.com/2017-04-22-0BD1730A-1F74-4203-A5EB-A9BFF8BCB92E.png)

## 环境和工具

![3A533661-987A-443A-8F7A-9BE227D19B8F](http://o6ul1xz4z.bkt.clouddn.com/2017-04-22-3A533661-987A-443A-8F7A-9BE227D19B8F.png)

## 课程步骤

![AA7D06D7-76C7-4058-B593-3ECE38FC6C24](http://o6ul1xz4z.bkt.clouddn.com/2017-04-22-AA7D06D7-76C7-4058-B593-3ECE38FC6C24.png)

----

## 重要知识点

☑ 域名和服务器选购备案

☑ 域名 IP 解析指向

☑ 服务器远程链接与系统权限

☑ NodeJS 生产环境搭建

☑ MongoDB 数据库安装配置备份前一

☑ 单主机 Nginx 多端口映射多个应用

☑ 项目仓库代码从本地到线上同步

☑Nodejs 项目更新发布与进程守护

☑ ...

## 最终效果

![947E24CE-F03B-4CDD-8519-5D4EE7EFCAC1](http://o6ul1xz4z.bkt.clouddn.com/2017-04-22-947E24CE-F03B-4CDD-8519-5D4EE7EFCAC1.png)



# 1 课程预热

## 1.1 为什么是全栈最后一公里

## 1.2 搭建线上生产环境需要做什么

☑ 购买自己的域名

☑ 购买自己的服务器

☑ 域名备案

☑ 配置服务器应用环境

☑ 安装配置数据库

☑ 项目远程部署发布与更新


# 2 待部署的 5 个本地 Nodejs 项目

## 2.1 快速搭建一个纯静态简易站点

https://coding.net/u/eli01/p/imooc_nodejs_deploy/git/tree/master/website

/app.js

```js
const http = require('http')
const homePage = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset='utf-8'>
    <title>Nodejs 部署上线示例</title>
    <style type="text/css">
      * {
        padding: 0;
        margin: 0;
      }
      body {
        padding: 30px 0;
        text-align: center;
        font-size: 16px;
        background-color: #333;
      }
      h1, h2 {
        color: #fff;
      }
      nav {
        margin-top: 20px;
      }
      a {
        color: #ccc;
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <h1>慕课网 Nodejs 高级课程</h1>
    <h2>项目部署上线示例</h2>
    <nav>
      <ul>
        <li><a href="" target="_blank",href="/a">Nodejs 电影网站</a></li>
        <li><a href="" target="_blank",href="/a">狗狗说 App 后台</a></li>
        <li><a href="" target="_blank",href="/a">微信小程序后台</a></li>
        <li><a href="" target="_blank",href="/a">微信公众号后台</a></li>
      </ul>
    </nav>
  </body>
</html>
`
http.createServer((req, res) => {
  res.statusCode =
  $  res.setHeader('Content-Type', 'text/html')
  res.end(homePage)
})
.listen(3000, () => {
  console.log('Server Running At 3000')
})
```

**启动服务**

```bash
$ node app.js
```

**浏览**

![65CB39FB-0290-47F9-A838-03FF523FCAC2](http://o6ul1xz4z.bkt.clouddn.com/2017-04-22-65CB39FB-0290-47F9-A838-03FF523FCAC2.png)

## 2.2 Nodejs 电影网站项目上线准备

**使用老课程里的一个项目-电影网站项目**

[课程地址](http://www.imooc.com/learn/197)

[源码](https://coding.net/u/eli01/p/imooc_nodejs_deploy/git/tree/master/movie)

### 2.2.1 升级下老旧的模块

```bash
# 先升级个别模块
$ npm --registry=https://registry.npm.taobao.org install bcrypt@0.8.7 --save
$ npm --registry=https://registry.npm.taobao.org install jade@1.11.0 --save
$ npm --registry=https://registry.npm.taobao.org install mongoose@4.8.2 --save

# 再安装其它模块
$ npm --registry=https://registry.npm.taobao.org install
```

### 2.2.2 mongodb

一言难尽，瞎折腾了一下，废了一整天的时间。

☑ 树莓派上尝试安装别人编译的，结果会报错。

☑ 我的 vps (centos 6.7 32位)上尝试安装 monggoDB，结果 mongoDB 官方没提供 32 位版本。

最后在本地机器上安装了 Archlinux 虚拟机，使用 pacman 安装 mongoDB。

#### 安装 mongoDB

```bash
$ sudo pacman -S mongodb
$ sudo pacman -S mongodb-tools
$ sudo systemctl enable mongodb
```

#### 设置 mongoDB

```bash
$ sudo vim /etc/mongodb.conf

# See http://www.mongodb.org/display/DOCS/File+Based+Configuration for format details
# Run mongod --help to see a list of options
#auth = true
#bind_ip = 192.168.11.169 
quiet = true
dbpath = /var/lib/mongodb
logpath = /var/log/mongodb/mongod.log
logappend = true
```

#### 设置用户

```bash
$ mongo
# 切换到 movies 数据库
> use movies
switched to db movies

# 给 movies 数据库创建一个新用户
> db.createUser({user:"neo", pwd:"xxx",roles:[{role:"dbAdmin",db:"movies"}]})
```



#### 启动 && 关闭 && 远程登录

```bash
# 启动
$ sudo systemctl start mongodb

# 关闭
$ sudo systemctl stop mongodb

# 远程登录
$ mongo -u neo -p xxx --authenticationDatabase movies --host [IP 地址]
```

### 2.2.3 项目修改并测试

#### 本地启动

```bash
$ cd imooc_nodejs_deploy/movie
$ grunt
```

#### 浏览

```bash
/ # 首页
/admin/user/list # 用户列表页(只有超级用户能够进入这个页面)
/admin/movie/new # 后台录入页
/movie/[ID] # 详情页, 比如 http://localhost:3000/movie/58fcce8faf5c603f4c3e77b5
```

**首页**

![0B4E68B4-15DB-4845-A430-B445A0753AD2](http://o6ul1xz4z.bkt.clouddn.com/2017-04-23-0B4E68B4-15DB-4845-A430-B445A0753AD2.png)

![A77C3832-A33F-4071-B632-6F356E426F82](http://o6ul1xz4z.bkt.clouddn.com/2017-04-23-A77C3832-A33F-4071-B632-6F356E426F82.png)

**用户列表页**

1. 注册一个新用户，然后设置这个用户为**超级用户**。

![6FD47491-4730-4E0D-881D-C0E2A5CEF8A0](http://o6ul1xz4z.bkt.clouddn.com/2017-04-23-6FD47491-4730-4E0D-881D-C0E2A5CEF8A0.png)

```bash
$ mongo -u neo -p xxx --authenticationDatabase movies --host [mongoDB IP 地址]
MongoDB shell version v3.4.3
connecting to: mongodb://172.16.16.144:27017/
MongoDB server version: 3.4.1
> use movies
switched to db movies
{ "_id" : ObjectId("58fcb193ba823d06b2c78ffe"), "name" : "孟庆申", "password" : "$2a$10$yaf1RLwE/aIncrWzyaiEb.ZMZqrF9HHDjr/VFJIVbKdx4rFZzB2sC", "meta" : { "updateAt" : ISODate("2017-04-23T13:52:19.949Z"), "createAt" : ISODate("2017-04-23T13:52:19.949Z") }, "role" : 0, "__v" : 0 }
> db.users.update({name: '孟庆申'}, {$set: {role: 51}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
```



2. 用该**超级用户**用户登陆，并查看用户列表。

   ![88DC5498-2EA6-49DB-BE68-3E0B3EE6977F](http://o6ul1xz4z.bkt.clouddn.com/2017-04-23-88DC5498-2EA6-49DB-BE68-3E0B3EE6977F.png)



**后台录入页**

☑ 简介: 在**豆瓣同步**中输入 ID(比如`7054604`) ，可以自动获取豆瓣相应电影并完成填充。

![2873AE79-479D-467F-8FFF-90F87AC33C87](http://o6ul1xz4z.bkt.clouddn.com/2017-04-23-2873AE79-479D-467F-8FFF-90F87AC33C87.png)

**详情页**

![0FDFDC79-8AAE-42F3-93E5-6748F2F0AFE0](http://o6ul1xz4z.bkt.clouddn.com/2017-04-23-0FDFDC79-8AAE-42F3-93E5-6748F2F0AFE0.png)

## 2.3 狗狗说 React Native 开发的 App 后台项目分析

[慕课网-React Native 贯穿全栈开发 App](http://coding.imooc.com/class/56.html)

该项目是一个ios app项目的后台，采用 `koa` 框架，给 App 提供 API 接口，并提供面向运营的管理后台。支持基于 SSL 的 HTTPS 协议。



## 2.4 微信小程序的项目介绍

☑ 后端采用 koa 

☑ 支持采用 HTTPS 协议



## 2.5 电影微信公众号的项目概况

[慕课网-Node.js 7天搞定微信公众号](http://coding.imooc.com/class/38.html)



## 2.6 从一个故事理解整个部署思路

![7A834090-215B-421E-89F4-9D8D2221407B](http://o6ul1xz4z.bkt.clouddn.com/2017-04-24-7A834090-215B-421E-89F4-9D8D2221407B.png)

# 3 选购域名服务器及备案

## 3.1 选购域名的经验分享

### 相关网站

+ [爱名网](http://www.22.cn/)
+ [阿里云(推荐)](https://www.aliyun.com/)
+ [godaddy](https://sg.godaddy.com/zh/)

### 注意事项

+ 传播效果:(纯英文 > 纯数字 > 英文数字混合)


+ 不要使用过于冷僻的后缀名(不好备案)
+ cn 后缀比 com 域名更便宜
+ godaddy 的域名国家会不会有一天阻拦备案？
+ SSL 整数可以通过 JS 来生成，不一定非要购买。
+ 无论在哪里购买的域名，都需要到[DNSPOD](https://www.dnspod.cn/)这个网站设置域名解析指向。


## 3.2 主机选择

☑ 相关运营商

| 国外                | 国内            |
| ----------------- | ------------- |
| 亚马逊 AWS           | 阿里云 ECS（推荐）   |
| Linode            | 青云/UCloud/百度云 |
| DigitOcean/Heroku |               |

☑ 注意

+ 尽量选择大厂商，不要图便宜
+ 尽量选择国内的主机运营商（政策风险小，容易备案，速度快）



![9187181B-E182-482B-BE3C-69022E8E34B1](http://o6ul1xz4z.bkt.clouddn.com/2017-04-24-9187181B-E182-482B-BE3C-69022E8E34B1.png)

讲师提供了一个优惠码: 1abqbf

## 3.3 域名备案流程走起来

### 注意事项

☑ 不要图快，争取一次通过。

☑ 推荐阿里云提供的**购买域名**、**购买云服务**、**备案**一条龙服务，省心，快捷。

☑ 备案需要材料

+ 身份证(个人备案)
+ 单位证件+ 备案负责人证件(单位备案)
+ 清晰的电子版照片

☑ 域名首次备案前不允许线上访问（备案期间不要使用这个域名）



### 在阿里云官网进行备案

1. 备案服务号申请。
2. 在 ICP 代备案管理系统中进行备案。
3. 等 3 周左右在阿里云查看备案是否通过。

# 4 远程登录服务器

## 4.1 第一次 ssh 远程登录服务器

1. 设置密码
2. 登录

```bash
$ ssh root@[IP ID地址]
```



## 4.2 配置 root 及应用账号权限

```bash
$ adduser imooc_manager # 自动加入群组 imooc_manager，生成 /home/imooc_manager
$ gpasswd -a imooc_manager sudo # 将 imooc_manager 加入到 群组 sudo
$ sudo visudo # 设置

# User privilege specification
imooc_manager ALL=(ALL:ALL) ALL
```



用新账号远程联机

```bash
$ ssh imooc_manager@[外网 IP] 
```



## 4.3 配置本地无密码 SSH 登录

![FD361328-37D6-41F4-81DD-EFD7B1775F3A](http://o6ul1xz4z.bkt.clouddn.com/2017-04-26-FD361328-37D6-41F4-81DD-EFD7B1775F3A.png)

(1) 客户端配置

```bash
# 确保还没有创建过（没有 id_rsa）
$ ls ~/.ssh

# 新建公钥和私钥
$ ssh-keygen -t rsa -b 4096 -C "[电子邮件地址]" # 会生成 id_rsa 和 id_rsa.pub 两个文件

# 
$ eval "$(ssh-agent -s)"
$ ssh-add ~/.ssh/id_rsa
```



(2) 服务端配置 `~/.ssh/authorized_keys` 文件

```bash
# 将客户端的 id_rsa.pub 中的公钥信息复制到这个文件
$ vi ~/.ssh/authorized_keys

# 文件权限设置
$ sudo chmod 600 ~/.ssh/authorized_keys

$ sudo service ssh restart
```



(3) 然后就可以通过 ssh登录服务器而不需要密码了



# 5 增强服务安全等级

## 5.1 修改服务器默认ssh登录端口

注意：远程修改 ssh 的配置文件有可能不小心就导致当前 ssh 连接断线，再也不能用 ssh 远程登录。因此可以多开一个 ssh 登录服务器。

```bash
$ sudo vim /etc/ssh/sshd_config

# 可以是 0-65536，其中 0-1024 通常会被系统程序使用，而且必须占用这个端口的程序用 root 身份才能启动，因此最好别用 0-1024
Port 12345
PermitRootLogin no
UseDNS no
PasswordAuthentication no
PermitEmptyPasswords no
AllowUsers [允许 ssh 远程登录的用户名]

$ sudo service ssh restart
```



## 5.2 配置 iptables 和 Fall2Ban 增强安全等级

### iptables

----

☑ 注意: 为了防止 iptables 设置不当导致远程无法登陆，额外开一个 ssh 远程登录。

```bash
# 清空当前所有 iptables 规则
$ sudo iptables -F

# 编写 iptables 规则的配置文件
$ sudo vim /etc/iptables.up.rules
```

```bash
*filter
# allow all input
-A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# allow all output
-A OUTPUT -j ACCEPT

# allow http(s)
-A INPUT -p tcp --dport 443 -j ACCEPT
-A INPUT -p tcp --dport 80 -j ACCEPT

# allow ssh port login
-A INPUT -p tcp -m state --state NEW --dport 12345 -j ACCEPT

# allow ping
-A INPUT -p icmp -m icmp --icmp-type 8 -j ACCEPT

# log denied calls
-A INPUT -m limit --limit 5/min -j LOG --log-prefix "iptables denied:" --log-level 7

# drop incoming sensitive connections
-A INPUT -p tcp --dport 80 -i eth0 -m state --state NEW -m recent --set
-A INPUT -p tcp --dport 80 -i eth0 -m state --state NEW -m recent --update --seconds 60 --hitcount 150 -j DROP

# reject all other inbound
-A INPUT -j REJECT
-A FORWARD -j REJECT

COMMIT
```



```bash
# 应用防火墙规则
$ sudo iptables-restore < /etc/iptables.up.rules

# 查看防火墙是否开启
$ sudo ufw status

# 开启防火墙
$ sudo ufw enable

# 设置 iptables 在网络服务启动时自动启动
$ vim /etc/network/if-up.d/iptables
```

```bash
#!/bin/sh
iptables-restore /etc/iptables.up.rules
```

```bash
$ sudo chmod +x /etc/network/if-up.d/iptables
```



### Fail2Ban

----

☑ 说明： 一个安防模块，可以看作一个防御性的动作库，通过监控系统的日志文件，根据检测到任意可疑的行为，出发不同的环境动作，比如对可疑的目标执行 ip 锁定等。

#### 安装

```bash
$ sudo apt-get install fail2ban
```

#### 配置

/etc/fail2ban/jail.conf

```bash
bantime = 3600
destemail = mengqingshen_sean@outlook.com
action = %(action_mw)s
```

#### 运行状态

```bash
$ sudo service fail2ban status 
```

#### 开启与关闭

```bash
$ sudo servive fail2ban start
$ sudo servive fail2ban stop
```



# 6 搭建 Nodejs 生产环境

## 6.1 搭建服务器的 Nodejs 环境

### 依赖环境

```bash
$ sudo apt-get install vim openssl build-essential libssl-dev wget curl git
```

### nvm

[GitHub 地址](https://github.com/creationix/nvm)

☑ 注意: 安装后，需要重新登入终端，从而载入 nvm 相关的环境变量。

```bash
$ wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
```

### nodejs

```bash
$ nvm ls-remote
$ nvm install v7.9.0
$ nvm use v7.9.0
$ nvm alias default v7.9.0
```

### 升级 npm

```bash
# 国内网速慢的话，可以考虑用淘宝的源
$ npm install --registry=https://registry.npm.taobao.org install -g npm
```

### 设置系统文件监控数目

```bash
$ echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

### 使用 cnpm 取代 npm

☑ 注意: 只要网络不是太糟糕，建议始终使用 npm 而不是 cnpm。

```bash
$ npm install --registry=https://registry.npm.taobao.org install -g cnpm
$ cnpm sync koa # 即使使用 npm， 也会强制从国内源安装 koa
```

### 常用 nodejs 包

```bash
$ npm i pm2 webpack gulp grunt-cli -g
```



## 6.2 借助 pm2 让 Nodejs 服务常驻

```bash
# 启动 nodejs 程序
$ pm2 start app.js

# 当前 pm2 管理的 nodejs 程序列表
$ pm2 list

# 查看某个程序的详细信息
$ pm2 show app

# 查看实时日志
$ pm2 logs
```

# 7 配置 nginx 实现反向代理

## 删除 apache2

```bash
$ sudo service apache2 stop
$ sudo service apache stop
$ update-rc.d -f apache2 remove
$ sudo apt-get remove apache2
```



## 安装 nginx

```bash
$ sudo apt-get update
$ sudo apt-get install nginx
```

## 配置 nginx

**/etc/nginx/conf.d/webappbook-8081.conf**

```bash
upstream imooc {
  server 127.0.0.1:8081;
}

server {
  listen 80;
  server_name [服务器外网 IP 地址];
  location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-Nginx-Proxy true;
    proxy_pass http://imooc;
    proxy_redirect off;
  }
}
```

**/etc/nginx/nginx.conf**

```bash
...
http {
  ...
  # 响应头中隐藏 nginx 版本信息
  server_tokens off;
  include /etc/nginx/conf.d/*.conf;
  ...
}
```



```bash
# 测试 nginx 有没有问题
$ sudo nginx -t

# 启动 nginx
$ sudo nginx start

# 重新载入配置
$ sudo nginx -s reload
```

# 8 利用 DNSPod 管理域名解析

## 8.1 更改域名的 DNS 根服务器

### 8.1.1 为什么要更改 DNS 根服务器？

**阿里云的云解析 vs DNSPod**

- NDSPod 技术更加成熟，预案更加全面
- 域名可能并不是在阿里云购买的，因此无法使用阿里云的云解析。统一在 DNSPod 管理更加效率。



### 8.1.2 步骤

(1) 在 [DNSPod](https://www.dnspod.cn) 拿到 DNS 根服务器

首页 > 常见问题 > 功能介绍及使用教程 > 各个注册商修改域名 DNS 地址的方法 > [万网注册商域名修改DNS地址](https://support.dnspod.cn/Kb/showarticle/tsid/40/)

```bash
f1g1ns1.dnspod.net
f1g1ns2.dnspod.net
```



(2) 在[阿里云](https://aliyun.com/)更改 DNS 根服务器

管理控制台 > 域名 > 域名列表 > (某个域名的) 管理 > DNS 修改

![8782E41E-3983-4F69-A558-820E5D7B90CE](http://o6ul1xz4z.bkt.clouddn.com/2017-04-30-8782E41E-3983-4F69-A558-820E5D7B90CE.png)

(3) 使用 DNSPod 的域名解析功能，解析在阿里云买的域名

## 8.2 配置解析项目的域名 A 记录和 CNAME

![D77D9188-AC9B-4A2E-AB09-1481B359BB5B](http://o6ul1xz4z.bkt.clouddn.com/2017-04-30-D77D9188-AC9B-4A2E-AB09-1481B359BB5B.png)



**扩展**

DNSPod 的域名解析服务不但可以解析到具体的 ip ，也可以解析到其它服务。比如配合[七牛](https://www.qiniu.com)的对象存储提供的`融合 CDN 加速域名`就可以解析到图床中的图片地址。

# 9 服务器配置安装 MongoDB

注意： 因为成本原因，MongoDB 和 Web 服务在同一个 ECS 实例上，在商业实践中，为了解耦，应当放在不同的实例中。或者有条件的话，可以购买阿里云专门的 MongoDB 数据库服务。

## 9.1 在 Ubuntu 14.04 上安装 MongoDB

### 9.1.1 安装

参考 MongoDB 官网 [Install on Ubuntu](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)

```bash
$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6

$ echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list

$ sudo apt-get update

$ sudo apt-get install -y mongodb-org

# 如果上一步提示找不到 mongodb-org，则将 aliyun 的源注释掉，使用 ubuntu 官方的源。
# $ sudo vim /etc/apt/apt.conf

# 然后，如果要加快加快下载速度，可以将 mongodb 的源改为 aliyun
# $ sudo vim /etc/apt/sources.list.d/mongodb-org-3.4.list 
# deb [ arch=amd64,arm64 ] http://mirrors.aliyun.com/apt/ubuntu trusty/mongodb-org/3.4 multiverse
```

### 9.1.2 配置

#### MongoDB 配置

**/etc/mongod.conf**

```bash
net:
	port 27018 # 为了安全起见，不使用默认端口
```

```bash
$ sudo service mongod restart
```

#### 防火墙配置

**/etc/iptables.up.rules**

```bash
# mongodb connect
-A INPUT -s 127.0.1 -p tcp --destination-port 27017 -m state --state NEW,ESTABLISHED -j ACCEPT
-A OUTPUT -s 127.0.1 -p tcp --source-port 27017 -m state --state ESTABLISHED -j ACCEPT
```

```bash
$ sudo iptables-restore < /etc/iptables.up.rules 
```

### 9.1.3 启动&关闭

```bash
# mongodb 的日志文件
$ cat /var/log/mongodb/mongod.log

# 启动 mongodb 服务
$ sudo service mongod start

# 重启 mongodb 服务
$ sudo service mongod restart

# 查看 mongodb 服务的状态
$ sudo service mongod status
```

### 9.1.4 连接

```bash
$ mongo --port 27018
```

## 9.2 往线上 MongoDB 导入单表数据或数据库

☑ 技巧: 导入的时机一般是在数据库软件安装好之后，数据库用户创建前。从而避免用户权限带来的一些麻烦。

### 9.2.1 项目预览

讲师以自己的微信小程序为例，钥匙往线上 MongoDB 导数据，该小程序没有课程出来，通过下面的启动过程一窥微信小程序面貌。

```bash
# 项目根目录
$ cd indust-app

# 通过微信模拟器在本地启动(在 chrome 中预览)
$ wept
```

![77C5FC78-04E7-42EB-93A4-94BF00F698C0](http://o6ul1xz4z.bkt.clouddn.com/2017-05-01-77C5FC78-04E7-42EB-93A4-94BF00F698C0.png)

### 9.2.2 整个数据库

**本地导出、打包、上传**

```bash
# 存放项目备份数据的文件夹
$ cd deploy-projects

# 将本地 MongoDB 中的名为indust-app的数据库导出到当前目录下的 indust-app-backup 文件夹下
$ mongodump -h 127.0.0.1:27017 -d indust-app -o indust-app-backup
```

![D8174179-AE4F-4C2A-8097-9752AB6FB211](http://o6ul1xz4z.bkt.clouddn.com/2017-05-01-D8174179-AE4F-4C2A-8097-9752AB6FB211.png)

```bash
# 打包 MongoDB 数据库数据并压缩
$ tar zcvf indust-app.tar.gz indust-app-backup

# 上传到服务器
$ scp -P [ssh端口] ./indust-app-backup.tar.gz [远程服务器用户名]@[远程服务器 IP]:[远程服务器目录]
```

**服务器解压、导入**

```bash
$ tar xvf indust-app-backup.tar.gz
$ cd indust-app-backup

# 将解压的数据导入当前机器中的 MongoDB 的 indust-app 数据库
$ mongorestore --host 127.0.0.1:[mongoDB 服务端口] -d indust-app ./indust-app/

# 查看导入的数据
$ mongo --port [mongoDB 服务端口]
> use indust-app
> show tables
```

### 9.2.3 单表

**本地导出、打包、上传**

```bash
$ cd deploy-projects

# 导出 imooc_movie 库下的 users 表(其实是一个 json 文件)
$ mongoexport -d imooc_movie -c users -q '{"name": {$ne: null}}' -o ./movie-users.json

# 上传到服务器
$ scp -P 39999 ./movie-users.json [远程服务器用户名]@[远程服务器 IP]:[远程服务器目录]

```

**服务器导入**

```bash
# 导入前面上传的表数据 movie-users.json
$ mongoimport --host 127.0.0.1:[mongoDB 服务端口] -d imooc-movie -c users ./movie-users.json

# 查看导入的效果
$ mongo --port [mongoDB 服务端口]
> use imooc-movie
> show tables
users
> db.users.find({})
```

**删除刚刚导入的数据表**

```bash
# 删除服务端 MongoDB 中的 imooc-movie 数据表
$ mongo --host 127.0.0.1:[mongoDB 服务端口] imooc-movie --eval "db.dropDatabase()"
```

## 9.3 为上线项目配置 MongoDB 数据库读写权限

### 9.3.1 创建 MongoDB 账号

**MongoDB 账户注意事项**

+ 没有默认的管理员账号；
+ 只有切换到 admin 数据库，添加的账号才是管理员账号；
+ 用户(包括管理员)只能登录用户所在的数据库；
+ 管理员可以管理所有数据库，但不能直接管理，需要先切换到 admin 数据库认证之后才可以；

```bash
# 连接本地(服务器)数据库
$ mongo --port [MongoDB 服务端口]
> use admin
# 数据库管理员
> db.createUser({user: 'imooc_cases_owner', pwd: 'Safe1*24$', roles: [{role: 'userAdminAnyDatabase', db: 'admin'}]})

###### imooc-movie(网站) ######
> use admin
> db.auth('imooc_cases_owner', 'Safe1*24$')
> use imooc-movie
# 可以操作数据的账号
> db.createUser({user: 'imooc_movie_runner', pwd: 'F**k9001$', roles: [{role: 'readWrite', db: 'imooc-movie'}]})
# 可以备份数据的账号
> db.createUser({user: 'imooc_movie_wheel', pwd: 'B**kup2017$', roles: [{role: 'read', db: 'imooc-movie'}]})

###### imooc-app(狗狗说 App 后台) ######
> user admin
> db.auth('imooc_cases_owner')
> use imooc-app
> db.createUser({user: 'imooc_app_runner', pwd: 'Ack!24$'}, roles: [{role: 'readWrite', db: 'imooc-app'}])
> db.createUser({user: 'imooc_app_wheel', pwd: 'DSGFG*DF$', roles: [{role: 'read', db: 'imooc-app'}]})

###### indust-app(微信小程序) ######
> use admin
> db.auth('imooc_cases_owner')
> use indust-app
> db.createUser({user: 'indust_app_runner', pwd: 'FA*EAT'}, roles: [{role: 'readWrite', db: 'indust-app'}])
> db.createUser({user: 'indust_app_wheel', pwd: 'GJSHGK**F', roles: [{role: 'read', db: 'indust-app'}]})

###### imooc-wechart(微信公众号) ######
> use admin
> db.auth('imooc_cases_owner')
> use indust-app
> db.createUser({user: 'imooc_wechat_runner', pwd: 'KLLKDS'}, roles: [{role: 'readWrite', db: 'imooc-wechart'}])
> db.createUser({user: 'imooc_wechat_wheel', pwd: 'KLHFS^$S', roles: [{role: 'read', db: 'imooc-wechart'}]})
```

 ### 9.3.2 开启 MongoDB 安全认证

**服务器端 MongoDB 服务开启安全认证**

```bash
# 开启权限安全认证
$ sudo vi /etc/mongod.conf

security:
	authorization: 'enabled'

$ sudo service mongod restart
```

**连接 MongoDB**

```bash
$ mongo --port [MongoDB 服务端口]
> use admin
> db.auth('imooc_cases_owner', 'Safe1*24$')
> show dbs
```

**远程连接 MongoDB 到具体的数据库**(imooc-movie)

```bash
$ mongo [IP 地址]:[MongoDB 服务端口]/imooc-movie -u imooc_movie_runner -p F**k9001$
> show tables
> db.users.find({})
```



## 9.4 从一台服务器迁移数据到另一个线上 MongoDB 中

为什么会需要这么做？比如说

+ 服务器欠费了
+ 服务器 IP 被屏蔽了
+ 服务器光缆被挖断了
+ 服务器需要升级到高配置或降到低配置

以 `indust-app`这个数据库为例:

**生产服务器 A**
数据库 indust-app
```bash
$ mkdir db && cd db

#将 MongoDB 中的 indust-app 数据库导出为 indust-app-old 文件
$ mongodump -h 127.0.0.1:[MongoDB 服务端口] -d indust-app -u indust_app_wheel -p GJSHGK**F -o indust-app-old

# 压缩
$ tar zcvf indust-app-old.tar.gz indust-app-old/
```

数据库 imooc-movie 的表 user

```bash
# 将 MongoDB 中的 imooc-movie 数据库的表 user 导出为 movie-users-old.json 文件
$ mongoexport -h 127.0.0.1 [MongoDB 服务端口] -d imooc-movie -u imooc_movie_wheel -p B**kup2017$ -c user -q '{"name": {$ne: null}}' -o ./movie-users-old.json
```

**生产服务器 A > 本地**
```bash
$ scp -P [ssh 端口] imooc_manager@[生产服务器A IP]:/[path/to]/db/indust-app-old.tar.gz ./
$ scp -P [ssh 端口] imooc_manager@[生产服务器A IP]:/[path/to]/db/movie-users ./movie-users-old.json
```

**生产服务器 B**
```bash
$ mkdir newdb
```

**本地 > 生产服务器 B**

```bash
$ scp -P [ssh 端口] ./indust-app-old.tar.gz imooc_manager@[生产服务器B IP]:/[path/to]/newdb/
$ scp -P [ssh 端口] ./movie-users-old.json imooc_manager@[生产服务器B IP]:/[path/to]/newdb/
```
**生产服务器 B**

(1) 初始化数据库，为导入数据做好准备

```bash
$ mongo --port [MongoDB 服务端口]
> use admin
> db.auth('imooc_cases_owner', 'Safe1*24$')
# imooc-movie-target
> use imooc-movie-target
> db.createUser({user: 'imooc_movie_target', pwd: '12345', roles: [{role: 'readWrite', db: 'imooc-movie-target'}]})

# indust-app-target
> use admin
> db.auth('imooc_cases_owner', 'Safe1*24$')
> use indust-app-target
> db.createUser({user: 'indust_app_target', pwd: '54321', roles: [{role: 'readWrite', db: 'indust-app-target'}]})
```

(2) 导入数据，

```bash
$ cd newdb
$ tar xvf indust-app-old.tar.gz
$ mongorestore -h 127.0.0.1:[MongoDB 服务端口] -d indust-app-target -u indust_app_target -p 54321 ./indust-app-old/indust-app
$ mongoimport -h 127.0.0.1:[MongoDB 服务端口] -d imooc-movie-target -u imooc_movie_target -p 12345 -c users ./movie-users-old.json
```

(3) 检查导入情况

```bash
# 检查 imooc-movie-target 数据库中 user 表的导入情况
$ mongo 127.0.0.1:[MongoDB 端口号]/imooc-movie-target -u imooc_movie_target -p 12345
> show tables
users
> db.users.find({})

# 检查 imooc-movie-target 数据库的导入情况
$ mongo 127.0.0.1:[MongoDB 端口号]/indust-app-target -u indust_app_target -p 54321
> show tables
> db.categories.find({})
```

## 9.4 为数据库实现定时备份方案
**说明**: 为数据库做备份有很多种方法，有很多不同级别的容灾机制，我们探讨一种比较容易理解也比较容易实现的方法，那就是利用系统的任务，通过自动定时为数据库备份。
**建议**: 针对每个数据库都建立一个本分脚本，而不是都写到一个脚本中，从而避免一个数据库备份失败连累其它数据库。

### 9.4.1 编写定时任务脚本
```bash
$ mkdir tasks && cd tasks
$ vim movie.backup.sh
```

**tasks/movie.backup.sh**

```bash
#!/bin/sh
backUpFolder=/home/imooc_manager/movie
data_now=`date +%Y_%m_%d_%H%M`
backFileName=movie_$date_now
cd $backUpFolder
mkdir -p $backFileName
# 导出数据库 imooc-movie
mongodump -h 127.0.0.1:[MongoDB 端口号] -d imooc-movie -u imooc_movie_wheel
tar zcvf $backFileName.tar.gz $backFileName
rm -rf $backFileName
```

### 9.4.2 设置定时任务规则

```bash
$ crontab -e
```

```bash
# 每天 00:13 执行脚本
# m h dom mon dow command
13 00 * * * sh /path/to/tasks/movie.backup.sh
```

### 9.4.3 上传数据库备份到七牛私有云
(1) 编写 nodejs 脚本实现上传功能；
[上传代码](https://developer.qiniu.com/kodo/sdk/1289/nodejs)
需要修改的地方
1. Access Key 和 Secret Key
2. 通过变量获取动态获取要上传的文件及其路径
3. 要上传的空间名
4. 上传到七牛后保存的文件名

```bash
$ vim tasks/upload.js
```

**tasks/upload.js**

```js
var qiniu = require("qiniu");
var parts = process.env.NODE_ENV.split('@')
var file = parts[1] + '.tar.gz'
var filePath = parts[0] + '/' + file

//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = 'Access_Key'; # 1
qiniu.conf.SECRET_KEY = 'Secret_Key'; # 2
//要上传的空间
bucket = 'imoocdeploydb'; # 3
//上传到七牛后保存的文件名
key = file; # 4
//构建上传策略函数
function uptoken(bucket, key) {
  var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
  return putPolicy.token();
}
//生成上传 Token
token = uptoken(bucket, key);
//要上传文件的本地路径
// filePath = filePath; # 5
//构造上传函数
function uploadFile(uptoken, key, localFile) {
  var extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
      if(!err) {
        // 上传成功， 处理返回值
        console.log(ret.hash, ret.key, ret.persistentId);       
      } else {
        // 上传失败， 处理返回代码
        console.log(err);
      }
  });
}
//调用uploadFile上传
uploadFile(token, key, filePath);
```

(2) 在备份脚本中加入上传罗辑

```bash
$ vim tasks/movie.backup.sh
```

**tasks/movie.backup.sh**

```bash
NODE_ENV=$backUpFolder@$backFileName node /path/to/tasks/upload.js
```

(3) 在[七牛](https://portal.qiniu.com/create)添加一个新的对象存储空间 imoocdeploydb

![3315EC54-A689-41E9-AE53-CE84CE12E99A](http://o6ul1xz4z.bkt.clouddn.com/2017-05-05-3315EC54-A689-41E9-AE53-CE84CE12E99A.png)

(4) 安装七牛模块, 测试备份脚本能不能备份到到七牛

```bash
$ cd tasks
$ npm install qiniu
$ ./movie.backup.sh
```

(5) 完善备份任务

```bash
$ crontab -e
```

```bash
# 每天 04:00 和 08:00 执行备份任务
# m h dom mon dow command
00 4 * * * sh /path/to/tasks/movie.backup.sh
00 8 * * * sh /path/to/tasks/movie.backup.sh
```
### 9.4.4 扩展(安装 mysql)

```bash
# 安装
$ sudo apt-get install mysql-server mysql-client

# 登录
$ mysql -u root -p
```

# 10 项服务器正式部署和发布上线 Nodejs 项目
## 10.1 上传项目代码到线上私有 Git 仓库
☑ 自己搭建

+ 单纯的 Git 服务
+ GitLab

☑ 使用第三方服务

+ [coding.net](http://git.oschina.net/)
+ [git.oschina.net(课程以此为例)](http://git.oschina.net/)
+ [Github(付费)](http://git.oschina.net/)

**私有仓库 > 本地**

```bash
$ git config --global user.name "Scott"
$ git config --global user.email "xx@xx.xx"

$ cd deploy-project/website-server
# 初始化 git 仓库
$ git init
$ git add .
$ git commit -m 'First commit'
# 关联线上仓库
$ git remote add origin git@git.oschina.net:wolf18387/backend-website.git
# 同步数据
$ git push -u origin master
$ git fetch
$ git merge origin/master
$ git push -u origin master
```

**私有仓库 > 服务器**
(1) 将服务器的公钥添加到到码云
(2) 在服务器 clone 私有仓库
```bash
$ git clone git@git.oschina.net:wolf18387/backend-website.git
```

## 10.2 配置 PM2 一键部署线上项目结构
使用 PM2，并采用[配置文件](http://pm2.keymetrics.io/docs/usage/deployment/)的方式来部署项目。

### 10.2.1 服务端准备
(1) 准备好程序所在的文件夹

```bash
$ sudo mkdir -p /www/website
$ sudo chmod 777 /www/website
```

### 10.2.2 从客户端发布
(1) 本地在项目中创建PM2 配置文件

**website-server/ecosystem.json**

```js
{
  "apps": [
    {
      "name": "Website", // 应用名称
      "script": "app.js", // 应用入口
      "env": {// 启动应用时的环境变量
        "COMMON_VARIABLE": true
      },
      "env_production": {// 生产环境启动应用时的环境变量
        "NODE_ENV": "production"
      }
    }
  ],
  "deploy": {
    "production": { // 任务名
      "user": "imooc_manager", // 生产服务器账号
      "host": ["120.26.235.4"], // 生产服务器地址
      "port": "39999", // 服务器 SSH 端口
      "ref": "origin/master", // 分支
      "repo": "git@git.oschina.net:wolf18387/backend-website.git", // 仓库地址
      "path": "/www/website/production", // 应用部署路径(绝对路径, 要确保该路径对 imooc_manager 可读可写可执行)
      "ssh_options": "StrictHostKeyChecking=no",
      "env": { // 环境变量设置
        "NODE_ENV": "production"
      }
    }
  }
}
```

(2) 本地使用 PM2 部署到线上服务器

```bash
$ pm2 deploy ecosystem.json production setup
```

## 10.3 从本地发布上线和更新服务器的 Nodejs 项目

使用 PM2 实现本地控制远端代码更新和服务重启。

### 10.3.1 服务端准备

**~/.bashrc**

由于 PM2 需要以交互的方式通过 SSH 连接服务器，需要注释掉下面的代码:

```bash
# If not running interactively, don't do anything
#case $- in
#	*i*);;
#	*) return;;
#esac
```

```bash
$ source ~/.bashrc
```

### 10.3.2 从客户端发布到服务端并启动应用

```bash
$ pm2 deploy ecosystem.json production
```

## 10.4 部署发布电影网站并连接线上 MongoDB
1. 在 DNSPOD 为电影网站添加一条记录(子域 movie.iblack7.com) ；
2. 连接 MongoDB 的代码需要兼容开发环境和线上环境；
3. npm 包的药保证版本足够新；
4. Nginx 支持静态问价的访问能力。


### 10.4.1 修改入口的代码

**imooc_nodejs_deploy/movie/app.js**

```js
...
var env = process.env.NODE_ENV || 'development'
var options = {
  dbUser: 'imooc_movie_runner',
  dbPwd: 'F**k9001$',
  dbHost: '127.0.0.1',
  dbPort: 27018,
  dbName: 'imooc_movie'
}
// 开发环境连接测试使用的 MongoDB 服务器
if (env === 'development') {
  options = {
    dbUser: 'neo',
    dbPwd: 'xxx',
    dbHost: '172.16.16.144',
    dbPort: 27017,
    dbName: 'movies'
  }
}

var dbUrl = `mongodb://${options.dbUser}:${options.dbPwd}@${options.dbHost}:${options.dbPort}/${options.dbName}`

mongoose.connect(dbUrl)
...
```

### 10.4.2 PM2 配置文件

**imooc_nodejs_deploy/movie/ecosystem.json**

```js
{
  "apps": [
    {
      "name": "Movie", // 应用名称
      "script": "app.js", // 应用入口
      "env": {// 启动应用时的环境变量
        "COMMON_VARIABLE": true
      },
      "env_production": {// 生产环境启动应用时的环境变量
        "NODE_ENV": "production"
      }
    }
  ],
  "deploy": {
    "production": { // 任务名
      "user": "imooc_manager", // 生产服务器账号
      "host": ["120.26.235.4"], // 生产服务器地址
      "port": "39999", // 服务器 SSH 端口
      "ref": "origin/master", // 分支
      "repo": "git@git.oschina.net:wolf18387/backend-movie.git", // 仓库地址
      "path": "/www/movie/production", // 应用部署路径(绝对路径, 要确保该路径对 imooc_manager 可读可写可执行)
      "ssh_options": "StrictHostKeyChecking=no",
      // 代码更新后
      // 1. 安装 npm 依赖
      // 2. 构建
      // 3. 重启 pm2
      "post-deploy": "npm install --registry=https://registry.npm.taobao.org && grunt build && pm2 startOrRestart ecosystem.json --env production",
      "env": { // 环境变量设置
        "NODE_ENV": "production"
      }
    }
  }
}
```

### 10.4.3 服务端
(1) 创建个需要的目录

```bash
$ sudo mkdir -p /www/movie
$ chmod 777 /www/movie
```

(2) 配置 Nginx

**/etc/nginx/conf.d/www-iblack7-com-3000.conf**

```bash
upstream movie {
  server 127.0.0.1:3001;
}

server {
  listen 80;
  server_name movie.iblack7.com;
  location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-Nginx-Proxy true;
    proxy_pass http://movie;
    proxy_redirect off;
  }
  // 静态文件路由配置
  localtion ~* ^.+\.(jpg|jpeg|gif|png|ico|css|js|pdf|txt) {
    root /www/movie/production/current/public;
  }
}
```
(3) 设置 iptables ，放开 3001 端口

**/etc/iptables.up.rules**

```bash
# movie
-A INPUT -s 127.0.0.1 -p tcp --destination-port 3001 -m state --state NEW,ESTABLISHED -j ACCEPT
-A OUTPUT -s 127.0.0.1 -p tcp --source-port 3001 -m state --state ESTABLISHED -j ACCEPT
```

```bash
$ sudo iptables-restore < /etc/iptables.up.rules
```

### 10.4.4 本地使用 PM2 部署

```bash
$ cd imooc_nodejs_deploy/movie
$ git add . && git commit -m "select mongodb besed on env" && git push origin master
$ pm2 deploy ecosystem.json production
```

## 10.5 部署 ReactNative App 线上 API 服务

1. 在 DNSPOD 为电影网站添加一条记录(子域 free.iblack7.com) ；
2. 入口文件中端口改为 3002, MongoDB 连接参数确保没问题且兼容线上和线下环境；
3. 创建 PM2 配置文件 ecosystem.json；
4. 配置好服务器配置。

### 10.5.1 项目准备好相关配置文件

(1) 创建 PM2 配置文件 ecosystem.json

```bash
{
  "apps": [
    {
      "name": "free", // 应用名称
      "script": "app.js", // 应用入口
      "env": {// 启动应用时的环境变量
        "COMMON_VARIABLE": true
      },
      "env_production": {// 生产环境启动应用时的环境变量
        "NODE_ENV": "production"
      }
    }
  ],
  "deploy": {
    "production": { // 任务名
      "user": "imooc_manager", // 生产服务器账号
      "host": ["120.26.235.4"], // 生产服务器地址
      "port": "39999", // 服务器 SSH 端口
      "ref": "origin/master", // 分支
      "repo": "git@git.oschina.net:wolf18387/backend-app.git", // 仓库地址
      "path": "/www/free/production", // 应用部署路径(绝对路径, 要确保该路径对 imooc_manager 可读可写可执行)
      "ssh_options": "StrictHostKeyChecking=no",
      "post-deploy": "npm install -- registry=https://registry.npm.taobao.org && pm2 startOrRestart ecosystem.json --env production",
      "env": { // 环境变量设置
        "NODE_ENV": "production"
      }
    }
  }
}
```

(2) nodejs 服务添加一条路由规则

**imooc_nodejs_deploy/gougou-server/config/routes.js**

```js
...
router.get('/', App.homePage)
...
```

**imooc_nodejs_deploy/gougou-server/app/controllers/app.js**

```js
...
exports.homePage = function *(next) {
  this.body = {
    success: true,
    msg: '必须通过 API 访问'
  }
}
...
```

(3) app 中的 base url 改为线上地址

**imooc_nodejs_deploy/gougou-app/app/common/config.js**

```js
const baseUrl = 'http://free.ibblack7.com/'
```

### 10.5.2 配置好服务器配置
(1) 准备好文件夹

```bash
$ sudo mkdir -p /www/free
$ sudo chmod -R 777 /www/free
```

(2) 配置 Nginx

**/etc/nginx/conf.d/free-iblack7-com-3000.conf**

```bash
upstream free {
  server 127.0.0.1:3002;
}

server {
  listen 80;
  server_name free.iblack7.com;
  location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-Nginx-Proxy true;
    proxy_pass http://free;
    proxy_redirect off;
  }
  // 静态文件路由配置
  localtion ~* ^.+\.(jpg|jpeg|gif|png|ico|css|js|pdf|txt) {
    root /www/app/production/current/public;
  }
}
```
(3) 设置 iptables ，放开 3002 端口

**/etc/iptables.up.rules**

```bash
# app
-A INPUT -s 127.0.0.1 -p tcp --destination-port 3002 -m state --state NEW,ESTABLISHED -j ACCEPT
-A OUTPUT -s 127.0.0.1 -p tcp --source-port 3002 -m state --state ESTABLISHED -j ACCEPT
```

```bash
$ sudo iptables-restore < /etc/iptables.up.rules
```

### 10.5.3 部署到服务器

```bash
$ git add .
$ git commit -m '添加 PM2 配置；nodejs 服务针对非 API 请求提供提示信息'
$ git push origin master
$ pm2 deploy ecosystem.json production setup # (第一次)部署到服务器
$ pm2 deploy ecosystem.json production # 启动服务
```

## 10.6 部署微信程序线上 API 服务

1. 在 DNSPOD 为电影网站添加一条记录(子域 mini.iblack7.com)；
2. 入口文件中端口改为 3003, MongoDB 连接参数确保没问题且兼容线上和线下环境；
3. 创建 PM2 配置文件 ecosystem.json；
4. 配置好服务器配置。

### 10.6.1 项目准备好相关配置文件

(1) 创建 PM2 配置文件 ecosystem.json

```js
{
  "apps": [
    {
      "name": "mini", // 应用名称
      "script": "app.js", // 应用入口
      "env": { // 启动应用时的环境变量
        "COMMON_VARIABLE": true
      },
      "env_production": { // 生产环境启动应用时的环境变量
        "NODE_ENV": "production"
      }
    }
  ],
  "deploy": {
    "production": { // 任务名
      "user": "imooc_manager", // 生产服务器账号
      "host": ["120.26.235.4"], // 生产服务器地址
      "port": "39999", // 服务器 SSH 端口
      "ref": "origin/master", // 分支
      "repo": "git@git.oschina.net:wolf18387/backend-indust.git", // 仓库地址
      "path": "/www/mini/production", // 应用部署路径(绝对路径, 要确保该路径对 imooc_manager 可读可写可执行)
      "ssh_options": "StrictHostKeyChecking=no",
      "post-deploy": "npm install -- registry=https://registry.npm.taobao.org && pm2 startOrRestart ecosystem.json --env production",
      "env": { // 环境变量设置
        "NODE_ENV": "production"
      }
    }
  }
}
```
(2) MongoDB 连接兼容线下和线上

```js
var env = process.env.NODE_ENV || 'development'
var dbUrl = 'mongodb://imooc_app_runner:F**k9001@127.0.0.1:19999/imooc-indust'

if (env === 'development') {
  dbUrl = 'mondodb://localhost/imooc-indust'
}
```

(3) nodejs 服务添加一条路由规则

**imooc_nodejs_deploy/gougou-server/config/routes.js**

```js
...
router.get('/', App.homePage)
...
```

**imooc_nodejs_deploy/gougou-server/app/controllers/app.js**

```js
...
exports.homePage = function *(next) {
  this.body = {
    success: true,
    msg: '必须通过 API 访问'
  }
}
...
```

(4) app 中的 base url 改为线上地址

**imooc_nodejs_deploy/indust-app/util/utils/api.js**

```js
const base = 'https://mini.ibblack7.com/api/'
```

### 10.6.2 配置好服务器配置
(1) 准备好文件夹

```bash
$ sudo mkdir -p /www/mini
$ sudo chmod -R 777 /www/mini
```

(2) 配置 Nginx

**/etc/nginx/conf.d/mini-iblack7-com-3000.conf**

```bash
upstream mini {
  server 127.0.0.1:3003;
}

server {
  listen 80;
  server_name mini.iblack7.com;
  location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-Nginx-Proxy true;
    proxy_pass http://mini;
    proxy_redirect off;
  }
  // 静态文件路由配置
  localtion ~* ^.+\.(jpg|jpeg|gif|png|ico|css|js|pdf|txt) {
    root /www/mini/production/current/public;
  }
}
```
(3) 设置 iptables ，放开 3003 端口

**/etc/iptables.up.rules**

```bash
# indust
-A INPUT -s 127.0.0.1 -p tcp --destination-port 3003 -m state --state NEW,ESTABLISHED -j ACCEPT
-A OUTPUT -s 127.0.0.1 -p tcp --source-port 3003 -m state --state ESTABLISHED -j ACCEPT
```

```bash
$ sudo iptables-restore < /etc/iptables.up.rules
```

### 10.6.3 部署到服务器

```bash
$ git add .
$ git commit -m '添加 PM2 配置；nodejs 服务针对非 API 请求提供提示信息'
$ git push origin master
$ pm2 deploy ecosystem.json production setup # (第一次)部署到服务器
$ pm2 deploy ecosystem.json production # 启动服务
```

## 10.7 部署配置微信公众号项目后台

1. 在 DNSPOD 为电影网站添加一条记录(子域 wechat.iblack7.com)；
2. 入口文件中端口改为 3003, MongoDB 连接参数确保没问题且兼容线上和线下环境；
3. 创建 PM2 配置文件 ecosystem.json；
4. 配置好服务器配置。

### 10.7.1 项目准备好相关配置文件


(1) 创建 PM2 配置文件 ecosystem.json

```js
{
  "apps": [
    {
      "name": "wechat", // 应用名称
      "script": "app.js", // 应用入口
      "env": { // 启动应用时的环境变量
        "COMMON_VARIABLE": true
      },
      "env_production": { // 生产环境启动应用时的环境变量
        "NODE_ENV": "production"
      }
    }
  ],
  "deploy": {
    "production": { // 任务名
      "user": "imooc_manager", // 生产服务器账号
      "host": ["120.26.235.4"], // 生产服务器地址
      "port": "39999", // 服务器 SSH 端口
      "ref": "origin/master", // 分支
      "repo": "git@git.oschina.net:wolf18387/backend-wechat.git", // 仓库地址
      "path": "/www/wechat/production", // 应用部署路径(绝对路径, 要确保该路径对 imooc_manager 可读可写可执行)
      "ssh_options": "StrictHostKeyChecking=no",
      "post-deploy": "npm install -- registry=https://registry.npm.taobao.org && pm2 startOrRestart ecosystem.json --env production",
      "env": { // 环境变量设置
        "NODE_ENV": "production"
      }
    }
  }
}
```
(2) MongoDB 连接兼容线下和线上

```js
var env = process.env.NODE_ENV || 'development'
var dbUrl = 'mongodb://imooc_wechat_runner:KLLKDS@127.0.0.1:19999/imooc-wechat'

if (env === 'development') {
  dbUrl = 'mondodb://localhost/imooc-wechat'
}
```

(3) nodejs 服务添加一条路由规则

**imooc_nodejs_deploy/gougou-server/config/routes.js**

```js
...
router.get('/', App.homePage)
...
```

**imooc_nodejs_deploy/gougou-server/app/controllers/app.js**

```js
...
exports.homePage = function *(next) {
  this.body = {
    success: true,
    msg: '必须通过 API 访问'
  }
}
...
```

(4) app 中的 base url 改为线上地址

**imooc_nodejs_deploy/gougou-app/app/common/config.js**

```js
const baseUrl = 'http://wechat.ibblack7.com/'
```

### 10.7.2 配置好服务器配置
(1) 准备好文件夹

```bash
$ sudo mkdir -p /www/wechat
$ sudo chmod -R 777 /www/wechat
```

(2) 配置 Nginx

**/etc/nginx/conf.d/wechat-iblack7-com-3000.conf**

```bash
upstream wechat {
  server 127.0.0.1:3004;
}

server {
  listen 80;
  server_name wechat.iblack7.com;
  location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-Nginx-Proxy true;
    proxy_pass http://wechat;
    proxy_redirect off;
  }
  // 静态文件路由配置
  localtion ~* ^.+\.(jpg|jpeg|gif|png|ico|css|js|pdf|txt) {
    root /www/wechat/production/current/public;
  }
}
```
(3) 设置 iptables ，放开 3004 端口

**/etc/iptables.up.rules**

```bash
# indust
-A INPUT -s 127.0.0.1 -p tcp --destination-port 3004 -m state --state NEW,ESTABLISHED -j ACCEPT
-A OUTPUT -s 127.0.0.1 -p tcp --source-port 3004 -m state --state ESTABLISHED -j ACCEPT
```

```bash
$ sudo iptables-restore < /etc/iptables.up.rules
```

### 10.7.3 部署到服务器

```bash
$ git add .
$ git commit -m '添加 PM2 配置；nodejs 服务针对非 API 请求提供提示信息'
$ git push origin master
$ pm2 deploy ecosystem.json production setup # (第一次)部署到服务器
$ pm2 deploy ecosystem.json production # 启动服务
```



### 10.7.4 微信公众号后台配置

![578BF6DF-6610-4D46-ABE5-68140E9535A6](http://o6ul1xz4z.bkt.clouddn.com/2017-05-06-578BF6DF-6610-4D46-ABE5-68140E9535A6.png)

# 11 使用和配置更安全的 HTTPS 协议
## 11.1 选购申请 SSL 证书的一些建议
### 为什么要使用 HTTPS?

+ 从 2017 年开始，Chrome 会将 HTTP 的网站标记为不安全的网站。
+ 从 2017 年开始，苹果邀请所有 APP 都要使用 HTTPS 的加密连接。
+ 微信小程序要求必须使用 HTTPS 协议。 

### SSL 证书
**SSL 证书分类**
| SSL 证书分类 | 安全级别                                     | 用途                                | 获取                              |
| -------- | ---------------------------------------- | --------------------------------- | ------------------------------- |
| DV       | 一般                                       | 个人博客、产品演示、中小企业网站                  | 有些免费的可以选择，即便收费的也通常不贵，申请流程也比较简单。 |
| OV       | 企业级别，等级较高                                | 常用在一些电商网站、社交、 O2O等涉及到用户资料、订单支付的场景 | 审核比较严格，价格不亲民，对业务有一定规模的可以考虑。     |
| EV       | 按照严格身份验证标准颁发的证书，是目前全球最高等级的 SSL 证书，安全性非常高，使用这个证书的网站，浏览器地址栏一般会显示为绿色 | 常用金融支付、网上银行等资金交易比较敏感的场景。          |                                 |

**SSL 证书有效期**
有的证书 3 个月过期，有的一年过期，每次过期后都需要更新证书，或者重新提交申请。可以通过一些工具或脚本，实现证书的自动更新。

**免费的 SSL 证书**
下面两家提供的免费的 DV SSL 已经被 Firefox 和 Chrome 屏蔽了，不推荐使用。

+ [沃通(不推荐)](http://www.wosign.com/products/ssl.htm)
+ [StartSSL(不推荐)](https://www.startcomca.com)

**付费的 SSL 证书**

+ [赛门铁克 SSL 证书](https://www.symantec.com/zh/cn/ssl-certificates/): 资历老、风险小，推荐。
+ [GeoTrust](https://www.geotrust.com/): 全球第二大 SSL 证书颁发机构。
+ [亚洲诚信](https://www.trustasia.com/): 和赛门铁克有合作，根证书来自赛门铁克，国内用得比较多。

## 11.2 云平台申请免费证书及 Nginx 配置
### 11.2.1 云平台申请免费证书
**注意**: 申请证书的域名必需是备案过的。
#### 又拍云
可以在 [又拍云](https://www.upyun.com/https) 购买免费或付费的 SSL 证书，具体流程见[官方文档](http://docs.upyun.com/cdn/ssl/#ssl)。大致流程为：
1. 在后台创建服务；
2. 创建服务后申请相应的证书；
3. 域名的解析指向；

#### 七牛
[七牛 > ssl 证书管理](https://portal.qiniu.com/certificate/ssl)中也可以购买 SSL 证书(默认赛门铁克)，七牛云用户免费。

#### 腾讯云(推荐)
**注意**: 如果要免费的证书，点击`申请证书`而不是`购买证书`。

[云产品 >  SSL 证书管理](https://portal.qiniu.com/certificate/ssl)

(1) 申请证书
![](./_image/2017-05-06-23-24-45.jpg)
(2) 选择 CA
![](./_image/2017-05-06-23-26-55.jpg)
(3) 免费证书申请
![](./_image/2017-05-06-23-28-06.jpg)

(4)选择 "手动 DNS 验证"
![](./_image/2017-05-06-23-29-16.jpg)
(5) 获取**主机记录**和**记录值**;

![](./_image/2017-05-06-23-30-31.jpg)
(6) 在 DNSPOD 中的 `iblack7.com` 下添加记录，使用上一步得到的的**主机记录**和**记录值**；

![](./_image/2017-05-06-23-35-50.jpg)

(7) 获取 SSL 证书成功

![](./_image/2017-05-06-23-37-30.jpg)
(8) 下载证书到本地，备用
默认提供了 Apache、IIS、Nginx 三种服务器的对应的 key。
![](./_image/2017-05-06-23-40-37.jpg)
#### 阿里云
[控制台 > 安全(云盾) > 证书服务](https://yundun.console.aliyun.com/?p=cas#/cas/home)

![](./_image/2017-05-07-00-47-02.jpg)

### 11.2.2 Nginx 配置
(1) 将 SSL 证书文件上传到服务器

+ mini.iblack7.com 域名的 SSL 证书相关文件
+ free.iblack7.com 域名的 SSL 证书相关文件

```bash
# 将 mini.iblack7.com 对应的 SSL 证书的 key 文件上传到服务器
$ scp -P [ssh 端口] mini.iblack7.com/Nginx/2_mini.iblack7.com.key imoooc_manager@[服务器IP]:/home/imooc_manager/
# 将 mini.iblack7.com 对应的 SSL 证书的证书文件上传到服务器
$ scp -P [ssh 端口] mini.iblack7.com/Nginx/1_mini.iblack7.com_bundle.crt imoooc_manager@[服务器IP]:/home/imooc_manager/

# 将 free.iblack7.com 对应的 SSL 证书的 key 文件上传到服务器
$ scp -P [ssh 端口] free.iblack7.com/Nginx/2_free.iblack7.com.key imoooc_manager@[服务器IP]:/www/ssl/
# 将 mini.iblack7.com 对应的 SSL 证书的证书文件上传到服务器
$ scp -P [ssh 端口] free.iblack7.com/Nginx/1_free.iblack7.com_bundle.crt imoooc_manager@[服务器IP]:/www/ssl/
```

(2) 证书安装
参考腾讯云的指引文档

![](./_image/2017-05-06-23-52-22.jpg)

(1) nginx 配置更新
**/etc/nginx/conf.d/free-iblack7-3002.conf**
```bash
upstream free {
  server 127.0.0.1:3002;
}

# 将 HTTP 请求都重定向到 HTTPS 协议
server {
  listen 80;
  server_name free.iblack7.com;
  # rewrite ^(.*) https://$host$1 permanent;
  return 301 https://free.iblack7.com$request_uri;
}
server {
  #SSL--
  listen 443; # https 协议的默认端口
  server_name free.iblack7.com;
  ssl on; # 启动 ssl 认证
  ssl_certificate /www/ssl/1_free.iblack7.com_bundle.crt; # SSL 证书文件的路径
  ssl_certificate_key /www/ssl/2_free.iblack7.com.key; # SSL key 文件的路径
  ssl_session_timeout 5m;
  ssl_protocals TLSv1 TLSv1.1 TLSv1.2; # SSL 证书采用的协议
  ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE; # 配置的加密套件
  ssl_prefer_server_chiphers on;
  if ($ssl_protocol = "") {
       rewrite ^(.*) https://$host$1 permanent;
  }
  #-- SSL
  location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-Nginx-Proxy true;
    proxy_pass http://free;
    proxy_redirect off;
  }
  // 静态文件路由配置
  localtion ~* ^.+\.(jpg|jpeg|gif|png|ico|css|js|pdf|txt) {
    root /www/app/production/current/public;
  }
}
```
**/etc/nginx/conf.d/mini-iblack7-com-3000.conf**

```bash
upstream mini {
  server 127.0.0.1:3003;
}
# 将 HTTP 请求都重定向到 HTTPS 协议
server {
  listen 80;
  server_name mini.iblack7.com;
  # rewrite ^(.*) https://$host$1 permanent;
  return 301 https://mini.iblack7.com$request_uri;
}
server {
  #SSL--
  listen 443; # https 协议的默认端口
  server_name mini.iblack7.com;
  ssl on; # 启动 ssl 认证
  ssl_certificate /www/ssl/1_mini.iblack7.com_bundle.crt; # SSL 证书文件的路径
  ssl_certificate_key /www/ssl/2_mini.iblack7.com.key; # SSL key 文件的路径
  ssl_session_timeout 5m;
  ssl_protocals TLSv1 TLSv1.1 TLSv1.2; # SSL 证书采用的协议
  ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE; # 配置的加密套件
  ssl_prefer_server_chiphers on;
  if ($ssl_protocol = "") {
       rewrite ^(.*) https://$host$1 permanent;
  }
  #-- SSL
  location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-Nginx-Proxy true;
    proxy_pass http://mini;
    proxy_redirect off;
  }
  // 静态文件路由配置
  localtion ~* ^.+\.(jpg|jpeg|gif|png|ico|css|js|pdf|txt) {
    root /www/mini/production/current/public;
  }
}
```

```bash
$ sudo nginx -t
$ sudo nginx -s reload
```
## 11.3 聊一聊运维安全和应对思路

这一期的课程到这里正式告一段落，相信大家看完之后会有一个实际执行的思路。沿着这个思路，大家要去多尝试，多充点，这样才不会很快忘记。

Nodejs 上线之后就涉及到运维，涉及到运维就等于涉及到了一个更深层次的厄安全课题，而安全是分等级的。一个100人的运维安全团队能够创造极高级别的安全环境，一个单兵作战的自己同样可以搭建相对安全的环境。所投入的人力成本不同，所获得的安全等级就有所不同。大家不必过多去纠结这个，因为也不存在绝对的安全。事实上，可以破坏你的安全环境的手段成千上万：前端的脚本漏洞、第三方的模块漏洞、Nodejs 本身的执行漏洞、服务器厂商的安全漏洞甚至是域名和 DNS 都可能出现劫持和污染，更别提通过社会工程学窃取你的社交账号和密码。密集的上游到下游的任何一个环节都可能会被人钻了空子。但对于大部分普通人或普通公司，不会有人盯着你的资源，试图获取你的数据或者资金，尽管如此，我们还是有必要在运维和安全的领域多多积累，就算不能做到保家卫国，至少也能强身健体。即便做非运营的岗位，也能跟运维团队做更好的沟通。

本期帮大家打通了从本地到线上的发布流程，从开发到生产环境的操作方式，大家可以沿着这个线，继续往下挖。无论是 2017 年还是 2018 年，Nodejs 这个有点年纪的新技术都会在这个市场是得到更佳充分的验证和使用，也对我们有了更多更大的挑战，无论是 Nodejs 本身在线上环境的进程守护、进程通信、错误的处理、日志的收集、性能的监控，还是多端口、多服务器的集群管理、基于 Docker 的环境部署、Nodejs 新老版本的交替兼容，还是 es 新语法的普及和使用、前后端模块的重用、静态资源的大包、服务端的渲染等等这些常见的课题都值得我们去尝试，夺取总结。我也会尽量收集大家的问题，等到合适的时候再推出更加深入的课程。比如 Docker 下的 Nodejs , MongoDB 的部署等等。

最后基于我个人的经验，给大家一个小小的建议，大家遇到一些服务器的问题，比如服务器连不上，可以自己先 Google 一下，如果20分钟还搞不定，千万一定要骚扰你的云服务器厂商，比如说阿里云。无论他们提供的文档，还是电话沟通，还是工单对接，从我的经验看，他们的工程师是最资深的，解决问题也是很有效率、非常专业的。同时可以利用这个机会适当的咨询一些技术问题，让他们解答。这也是一个非常好的付费学习途径。

这里是[阿里云服务器相关的文档地址](https://help.aliyun.com/knowledge_detail/41470.html)，没事来逛逛，混一个眼熟，遇到问题可以先到这里来瞄一眼。
