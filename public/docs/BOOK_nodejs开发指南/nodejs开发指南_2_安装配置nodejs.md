---
title: 2 安装和配置 nodejs
categories: [nodejs开发指南]
tag:
  - nodejs
date: 2015-01-25 15:55:10
---

## 1 安装前的准备
## 2 快速安装
1. Microsoft Windows系统上安装Node.js
2. Linux 发行版上安装Node.js

```bash
$ apt-get install nodejs
$ yun install nodejs
$ zypper install nodejs
$ pacman -S nodejs
```

3. Mac OS X上安装Node.js

## 3 编译源代码

### 3.1 在 POSIX 系统中编译    
编译环境

+ C++编译器gcc或clang/LLVM;
+ Python5+(不支持python3)；
+ libssl-dev提供SSL/TLS加密支持；

安装编译器

```bash
## g++编译器
$ apt-get install g++    # Debain/Ubuntu
$ yun install gcc-c++    # Fedora/Redhat/CentOS

## 调用OpenSSL编译所需的头文件，用于提供SSL/TLS加密支持
$ apt-get install libssl-dev    # Debain/Ubuntu
$ yum install opssl-devel     # Fedora/Redhat/CentOS(http://openssl.org/)

## 编译安装Node.js（附带npm）
$ ./configue
$ make
$ sudo make install
```

### 3.2 在Windows系统中编译
## 4 安装Node包管理器（npm）
### 4.1 说明
Node包管理器是一个由Node.js官方提供完全由JavaScript实现的的第三方包管理工具    
### 4.2 安装

+ http://npmjs.org/        ----官网提供了集中不同的npm安装方法
+ http://npmjs.org/doc/README.html        ----从git获取npm最新分支的方式

```bash
wget https://npmjs.org/install.sh  # 下载并执行安装脚本
sudo chmod a+x install.sh
sudo sh install.sh
```

## 5 安装多版本管理器
### 5.1 说明
Node.js的社区开发了多版本管理器，用于在一台机器上维护多个版本的Node.js实例，方便按需切换。它有很多不同的实现。nvm本身不依赖Node.js,注意nvm只能管理通过nvm安装的Node.js.

**NVM(Node Version Manager)**

+ https://github.com/createonix/nvm    ----一种实现
+ https://github.com/visionmedia/n    ----n,另一种实现，下载后make install安装之

### 5.2 安装

```bash
$ npm install -g n
$ n --help    
n 0.7.5 # 指定版本号安装node.js或者切换到n指定的版本（变为默认）
n    # 列出所有安装的Node.js（*前缀代表默认版本）
node -v # 查看当前Node.js环境
n use 0.6.11 script.js # 指定特定版本Node.js运行js脚本而不会切换Node.js环境
```

## 6 参考资料

