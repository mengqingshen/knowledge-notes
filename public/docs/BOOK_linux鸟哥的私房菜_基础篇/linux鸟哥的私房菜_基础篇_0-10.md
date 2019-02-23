---
title: 1-10 章
categories: [linux鸟哥的私房菜_基础篇]
tag:
 - linux
 - shell
date: 2013-11-13 20:28:49
---

**约定**

+ `[command]`  代表任意命令
+ `[keyword]`  代表任意字符串

## 1 常见文档路径

文档|通常路径
---|---
man page的文件|/usr/share/man
info指令的文件|/usr/share/info
软件联机帮助文档|/usr/share/doc
用户信息|/etc/passwd
群组信息|/etc/group

## 2 编辑器

+ nano
+ vi
+ vim
+ gedit

## 3 快捷键

快捷键|功能
---|---
ctrl+alt+backspace|重启图形界面（如果图形界面崩溃而linux系统本身正常）
ctrl+alt+F1~F6|进入虚拟终端（共六个）
ctrl+alt+F7或F8|返回图形界面

## 4 常用指令和使用场景

### 1 查询系统中跟[command]有关的说明文件

```bash
man -f  [command]
```

### 2 查看命令的可执行文件路径文件
```bash
whatis [command]
```

### 3 利用关键词查找相关的文件（模糊查询）
```bash
man -k  [keyword]
```

### 4 查找相关文件
```bash
apropos [keyword]
```

### 5 查看登陆在线信息
```bash
who
```

### 6 产看网络联机情况
```bash
netstat -a
```

### 7 查看背景程序执行情况
```bash
ps -aux
```

### 8 关机命令
```bash
shutdown -h +10     ----10分钟后关机
shutdown -h now     -----立即关机
shutdown -h 23:00    ------23:00关机
shutdown -r +10  'The system will rboot in 10 minutes'      -----10分钟后重启并给用户提示
shutdown -k now 'Thissystem will shutdown!'   -----提示关机，并不真的关机
poweroff -f    ----立即关机
halt    ----重启
reboot  ----重启
init  0 ----运行0模式（相当于关机）
```

### 9 文件系统检查
```bash
fsck /dev/sd7  ---j建设检查sd7分区
```

### 10 查看系统字符集
```bash
echo $LANG
## 或者
locale
```

### 11 将内存中的数据更新到硬盘
```bash
sudo sync
```

### 12 格式化输出日期
`datye +[格式]`

```bash
$ date +%Y/%m/%d-%H:%M
2013/06/27-17:12
```

### 13 显示文档完整时间
```bash
ls -al  --full-time
```

### 14 修改文件的拥有者
`sudo chown  [用户名] [文件名] `

```bash
## 将所有文件名以ge结尾的文件的拥有者改为avatar
sudo chown avatar*ge
```

### 15 修改文件所在组

`sudo chgrp [组名]  [文件名] `


### 16 修改文件的权限
`chmod 755 [文件夹或文件]`

**注意**：rwx对文件夹和文件的意义是不同的，详细信息请查阅相关信息！

### 17 查看最近几天的登陆情况
```bash
last      
```
注意；该命令会读取显示`/var/log/wtmp`中的数据，这是一个数据格式文件，cat命令将无法正常读取！

### 18 常用的几个处理目录的指令
```bash
cd # 切换目录
pwd # 现实当前目录
mkdir # 创建一个新目录
rmdir # 删除一个空目录
```

### 19 扩展18.的几个常用命令
```bash
pwd -P # 显示确实的路径
mkdir -p # 建立多层目录
mkdir -m 755 [foldername] # 创建时设置权限
rmdir -p/test/test/test # 删除多层目录（目录为空的话）
rm -r test # 删除文件或文件夹（无论是否为空）
rm -rf test/* # 删除test文件夹下所有的文件
```

### 20 查看当前用户的PATH
```bash
echo $PATH
```

### 21 添加新的路径到PATH
```bash
PATH=“$PATH”:[要添加的绝对路径]
```

### 22 和ls -l等价
```bash
ll
```

### 23 复制文件夹
```bash
cp -r [] [] # cp -a [][]
```

### 24 删除非空目录
```bash
rm -r   []
```

### 25 删除空目录
```bash
rmdir []
```

### 26 将文档的内容打印在屏幕上并加上行号
```bash
cat -n []
```

### 27 和cat显示顺序相反
```bash
tac
```

### 28 显示并加上行号
```bash
nl -b []
```

### 29 一页一页显示
```bash
more []
```

### 30 一页一页显示并且可以上下翻页
```bash
less []
```

### 31 显示前十行
```bash
head []
```

### 32 显示后十行
```bash
tail []
```

### 33 显示前二十行
```bash
head -n 20 []
```

### 34 显示后二十行
```bash
tail -n 20 []
```

### 35 不显示后20行
```bash
head -n -20 []
```

### 36 查看数据文件类型,如ASCLL,date,binary
```bash
file [file]
```

### 37 查看某个命令所在目录的路径
```bash
## 查看能通过PATH找到的所有该命令的位置
which -a [command] 

## 这个是无法找到的，因为cd不在PATH中，其实cd是一个bash内建的指令
which -a cd
```

### 38 搜寻档案
```bash
## 只找二进制文件(来自系统数据库)
whereis -b[filename]

## 执照manual中列出的
whereis -m[filename]

## 只找source来源档案
whereis -s[filename]

## 上述找不到的特殊文档
whereis -u[filename]

## 查找与该字串相关的文件，来自已建的数据库（/var/lib/mlocate）
locate [part offilename]
```
### 39 手动更新locate数据库（默认每天自动更新一次）
```bash
updatedb
```

### 40 磁盘文件系统管理
```bash
## 找出根目录磁盘文件名（通过查看挂载信息）
df

## 观察根目录文件系统的相关信息
dumpe2fs -h/dev/sda8

## 查看目录所占用的inode
ls -I  [目录的绝对路径或者不填（默认当前路径）]

## 回到之前的目录
cd -

## 显示当前实际的工作目录（而非链接档）
pwd  -P

## 查看某个档案的基本格式信息
file[filename]

## 查看用户的属性
id [username]

## 创建新的用户
useradd-m [newUserName]

## 删除用户的同时删除用户主目录
userdel -r [userName]

## 用chattr命令防止系统中某个关键文件被修改
chattr+i [filename]

## 让某个文件只能往里面追加内容，不能删除，一些日志文件适用于这种操作
chattr  +a [filename]
```

### 41 档案与文件系统的压缩与打包
```bash
## 压缩文件并显示压缩比信息
gzip -v[filename]

## 以最大压缩比从[fromFileName]压缩成为[toFileName]并保留源文件
gzip -9 -c [fromFileName] >[toFileName]

## 解压缩
## <=> gunzip [filename]
gzip -d [filename]

## 读取压缩文件内容
zcat  [filename]

## 压缩文件并显示压缩比信息
bzip2 -v[filename]

## 以最大压缩比从[fromFileName]压缩成为[toFileName]并保留源文件
bzip2 -9 -c [fromFileName] > [toFileName]

## 解压缩   <=> gunzip 
bzip -d [filename][filename]

## 读取压缩文件内容
bzcat  [filename]

## 将/etc目录压缩打包到/root下命名为etc.tar.gz(使用gzip压缩)
tar -zpcv -f /root/etc.tar.gz /etc

## 将/etc目录压缩打包到/root下命名为etc.tar.bz2（使用bzip2压缩）,得到更好的压缩比
tar -jpcv -f /root/etc.tar.bz2 /etc

## 查看打包文件目录信息
tar -jtv  -f  /root/etc.tar.gz

## 将打包文件解开到/tmp下
## 注：文件信息失去了根目录，这样避免解压缩时覆盖根目录下的源文件
tar -xv -f /file.tar  -C /tmp

## 解压缩gzip
tar -zxv -f /root/etc.tar.gz

## 解压缩bzip2
tar -jxv -f/root/etc.tar.bz2

## 解压位置
tar -jxv -f/root/etc.tar.bz2 -C /tmp
```

