---
title: 12 正则表达式与文件格式化处理
categories: [linux鸟哥的私房菜_基础篇]
tag:
 - linux
 - 正则表达式
date: 2013-11-04 21:08:28
---

## 1 正则表达式中的特殊符号
![](http://o7m5xjmtl.bkt.clouddn.com/14897698758186.jpg)


+ {}
+ .
+ *
+ ^
+ $

```bash
$ dmesg | grep -n -A3 -B2  'acip' #显示‘acip’所在行包括前2行和后3行，A（after）B(before)
$ grep -n 't[ae]st' regular_express.txt #查找tast或test所在的行
$ grep -n '[^a-z]'  regular_express.txt #没有小写字母的行
$ grep -n '[^[:lower:]]oo'  regular_express.txt #oo前面不能是a-z的字串所在的行以及行号,例如1oo，Aoo可以，goo就不行 
$ grep -n '\.$' regular_express.txt #行尾为'.'的行
$ grep -v  '^#'  regular_express.txt    | grep -nv '^$' #去掉空白行和注释行
$ grep -n 'goo*d' regular_express.txt #o*代表0或多个o
$ grep -n 'g..d' regular_express.txt #.代表一个任意字符
$ grep -n 'g.×d' regular_express.txt #.*代表0或多个任意字符
$ grep -n '[0-9][0-9]*' #数字所在的行
$ grep -n 'o\{2,5\}' regular_express.txt #2-5个o的字串所在的行
$ grep -n 'o\{2,\}'  regular_express.txt                ---2或以上个o所在的行
```

## 2 基础正则表达式汇总
![](http://o7m5xjmtl.bkt.clouddn.com/14897699675001.jpg)
![](http://o7m5xjmtl.bkt.clouddn.com/14897699788589.jpg)
![](http://o7m5xjmtl.bkt.clouddn.com/14897699896788.jpg)
![](http://o7m5xjmtl.bkt.clouddn.com/14897699991358.jpg)

## 3 正则表达式与bash通配符的比较
**举例：查找以a开头的任何档名的文档**

+ 通配符的方式：`$ ls -l a*`
+ 正则的方式：`$ ls -l | grep '^a.*'`

**应用**：找到/etc底下文件属性为链接文件的文件

```bash
$ ls -l | grep '^l'
```

## 4 sed
### 删除

```bash
## 输出/etc/passwd的内容到屏幕并删除2-5行
$ nl /etc/passwd | sed  '2,5d'

## 输出/etc/passwd的内容到屏幕并删除2-5行
$ nl /etc/passwd | sed '2d'

## 输出/etc/passwd的内容到屏幕并删除2-end行
$ nl /etc/passwd | sed '2,$d'
```

### 插入

```bash
## 在第二行后面输出两行文字
$ nl /etc/passwd | sed '2i drink tea or\
>drink beer'
```

### 替换

```bash
## 用stringstring取代2-5行
$ nl /etc/passwd | sed '2,5c stringstring'
```

### 选择
```bash
$ nl /etc/passwd | sed -n '5,7p' #仅列出5-7行
```

### 正则表达式的部分要用'/ /'包裹

```bash
$ cat /etc/manpath.config | grep 'man' |  sed 's/^#.*$//g' | sed '/^$/d' #匹配有'man'的行，且去掉注释行
```

### 直接修改文件

```bash
## 将行末以'.'结尾的'.', 替换为'!'(\.和\!都使用了跳脱符号)
$ sed -i 's/\.$/\!/g' regular_express.txt
```

### 延伸正则

```bash
## egrep <==> grep -E
## 所以，下面的命令也可以写成：
## $ egrep -v '^# .* | ^$' regular_express.txt   
$ grep -v '^#.*'  regular_express.txt | grep -v '^$' 
```

### 延伸正则详细
![](http://o7m5xjmtl.bkt.clouddn.com/14897700204447.jpg)

## 5 格式化输出
### printf

```bash
$ printf '\x43\n' # 查看16进制数43代表的字符
```

### awk

```bash
## 接受stdout并以[tab]作为 分隔的第一栏与第三栏
$ last -5 | awk '{printf $1 "\t" $2}' 
## 格式化输出
$ last -5 | awk '{printf $1"\t lines:"NR"\t columes:"NF"\n"}'
###                 andersonlines:1columes:10
###                 rebootlines:2columes:11
###                 andersonlines:3columes:10
###                 andersonlines:4columes:10
###                 rebootlines:5columes:11
###                 lines:6columes:0
###                 wtmplines:7columes:7

## BEGIN关键字使FS=":"为分割而不是以默认的[tab]为分隔 从第一行就开始起作用，后面判断第三栏是否小于10,是的话就执行后面的打印指令
$ cat /etc/passwd | awk 'BEGIN {FS=":"} $3 < 10{print $1 "\t" $3}'

## 对第一行做格式化处理，前四栏是占10个字符宽度的字符串，最后一栏为"total"
$ cat pay.txt | awk '{NR==1 printf "%10s %10s %10s %10s %10.2f\n",$1,$2,$3,$4,"total"}'
```

```bash
$ cat pay.txt | awk 'NR==1{printf "%10s %10s %10s %10s %10s",$1,$2,$3,$4,"Total"}
NR>2{total=$2+$3+$4
printf "%10s %10s %10s %10s %10.2f\n",$1,$2,$3,$4,total}'
```
![](http://o7m5xjmtl.bkt.clouddn.com/14897702894536.jpg)

## 6 档案比对工具
### diff

```bash
$ mkdir -p /tmp/test #创建/tmp/test，如果没有/tmp就创建它
$ cp /etc/passwd /tmp/test/passwd.old #为了不影响/etc/passwd文件,复制一份到/tmp/test，重新取名passwd.old
$ cat /etc/passwd | sed -e '4d' -e '6c stringstring' > /tmp/test/passwd.new #通过sed 接受stdout，第4行删掉，第6行替换                        为"stringstring"
$ diff /tmp/test/passwd.old  /tmp/test/passwd.new
###         4d3
###         < sys:x:3:3:sys:/dev:/bin/sh
###         6c5
###         < games:x:5:60:games:/usr/games:/bin/sh
###         ---
###         > stringstring
```

### cmp

```bash
$ cmp /tmp/test/passwd.old /tmp/test/passwd.new 
/tmp/test/passwd.old /tmp/test/passwd.new 不同：第 100 字节，第 4 行
pitch 将旧档案升级为新档案

## 制作补丁档案
$ diff -Naur /tmp/test/passwd.old /tmp/test/passwd.new > passwd.patch

## 用/tmp/test/passwd.patch升级passwd.old
$ patch -p0 < passwd.patch

## 用/tmp/test/passwd.patch恢复passwd.old
$ patch -R -p0 < passwd.patch

## 档案打印准备
$ pr /etc/manpath.config
```

## 7 重点回顾
![](http://o7m5xjmtl.bkt.clouddn.com/14897703359040.jpg)


