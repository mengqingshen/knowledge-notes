---
title: 11 认识与学习 Bash
categories: [linux鸟哥的私房菜_基础篇]
tag:
 - linux
 - shell
date: 2013-11-04 21:08:28
---

## 1 检查可以使用的shell和预设使用的shell

```bash
$ cat /etc/shells
$ cat /etc/passwd
$ cat /etc/shells 
## /etc/shells: valid login shells
/bin/sh
/bin/dash
/bin/bash
/bin/rbash
$ cat /etc/passwd |grep nologin
sshd:x:116:65534::/var/run/sshd:/usr/sbin/nologin
```

## 2 查看前一次登录使用的指令

```bash
$ cat ~/.bash_history
```

## 3 制定别名

```bash
$ alias                # 查看已经设置的命令别名
$ alias lm='ls -al'  # 设置命令别名
$ unalias lm        # 取消lm这个别名 
```

## 4 查看可执行命令的类型

```bash
$ type ls
ls 是 'ls --color=auto' 的别名
$ type -t ls
alias
$ type -a ls 
ls 是 'ls --color=auto' 的别名
ls 是 /bin/ls
```

## 5 变量与环境变量

```bash
env # 查看所有环境变量
export # 查看所有环境变量     
echo $HOME # 查看这个环境变量的值
HOME="/home/anderson" # 设置环境变量的值
```

**注意**

1. 双引号("")内的特殊字符人保持原有特性，单引号（''）内的特殊字符只作为普通文本对待
2. 跳脱字符（\）可以将特殊字符（Enter &Space&\&' 等）变成一般字符
3. `$(指令)`或反单引号(` 指令`)可获得其他指令的信息
4. 扩增变量内容示例：`PATH="$PATH":/home/bin` 或 `PATH="${PATH}":/home/bin`
5. 将普通变量变为环境变量：`export PATH`, 这样以来在子shell中可以共享这个变量
6. 取消变量的设置：`unset PATH`

## 6 进入当前系统核心模块目录

```bash
$ cd /lib/modules/`uname -r`/kernel或cd /lib/$ modules/$(uname -r)/kernel
```

## 7 查找相关文档并列出属性

```bash
$ ls -al `locate keyword`
```

## 8 将常去的工作目录设置为环境变量

```bash
$ workspace="/home/anderson/Workspace"
$ cd $workspace
```

**注意**：修改bash的配置文件更加方便

## 9 产生0-9之间的随机数

```bash
$ declare -i num=$RANDOM*10/32768;echo num 
```

## 10 特殊变量
### PS1
命令提示字符 (非操作系统的环境变量)      

```bash
anderson@anderson-Sailing-Series:/usr/java$ cd ~
anderson@anderson-Sailing-Series:~$ PS1='[\u@\h\w\A#\#]\$'
```

### $
当前sheel的PID

```bash
$ echo $$
```

### ?
上一操作的返回值

```bash
$echo $?
```

## 11 影响显示结果的语系变量

```bash 
$ locale -a
$ locale 
```

## 12 read

```bash
$ read -p "Enter your name in 30s:" -t 30 named
Enter your name in 30s:nemo
$ echo $named
nemo
```

## 13 指定数据类型命令 declare

```bash
$ declare -i num=10+5    # 指定num为整数类型
$ declare -r num             # -指定num只读（注销再登入才能恢复）
$ declare -p num             # 查看num类型（export | grep num）
$ declare -x num             # -将num变为环境变量(全局变量)
$ declare +x num            # 将num变为自定义变量（局部变量）
$ declare -a arr               # -指定arr为数组类型
```

## 14 ulimit 

```bash
$ ulimit -a          # 列出当前身份受到的限制
$ ulimit -f 10240   # -限制用户只能创建10M以下的档案
```

## 15 变量的设定方式
![](http://o7m5xjmtl.bkt.clouddn.com/14897678561404.jpg)

## 16 history

```bash
$ history                 # 列出本次登录后的所有指令记录
$ history 5              # 列出最近5次记录
$ !!                        # 执行上一个命令
$ !5                       # 执行地指令记录中第5个命令
$ !al                      # 执行最近以al开头的指令
```

## 17 bash的进站欢迎信息设置

```bash
$ cat /etc/issue
```

![](http://o7m5xjmtl.bkt.clouddn.com/14897679354607.jpg)


## 18 login shell 和nologin shell

```bash
$ source ~/.bashrc    <==>$ . ~/.bashrc
```

![](http://o7m5xjmtl.bkt.clouddn.com/14897679674688.jpg)


配置文件

`~/.bashrc`
`/etc/man.config`
`~/.bash_history`
`!/.bash_logout`

终端机的环境设定
![](http://o7m5xjmtl.bkt.clouddn.com/14897681243704.jpg)

bash默认的组合键

![](http://o7m5xjmtl.bkt.clouddn.com/14897681472036.jpg)


bash下特殊符号汇总：
![](http://o7m5xjmtl.bkt.clouddn.com/14897681600166.jpg)
![](http://o7m5xjmtl.bkt.clouddn.com/14897685420186.jpg)

通配符
![](http://o7m5xjmtl.bkt.clouddn.com/14897681701634.jpg)

## 19 数据流重导向

stdout和stderr

```bash
$ find -name /home .bashrc   > list_right 2> list_error # 标准信息写到list_right ,标准错误信息写到list_err
$ find -name /home .bashrc   > list_right 2> list_error # 标准信息写到list_right ,标准错误信息丢进“黑洞”
$ find -name /home .bashrc   &> list
or
$ find -name /home .bashrc   > list 2>&1 # 标准信息写到和标准错误信息都写进list
```

stdin

```bash
$ cat > catfile                             # 利用cat创建一个新档案，^d结束输入
$ cat > catfile << "eof" # 利用cat创建一个新档案，输入"eof"后结束输入
$ cat  > cattest <~/.bashrc # 将~/.bashrc的内容写入到cattest中
```

## 20 命令执行的判断依据[ ;  && ||]

```bash
## 不考虑指令的相关性连续执行
$ sudo sync; sync; shutdown -h now
```

![](http://o7m5xjmtl.bkt.clouddn.com/14897684482071.jpg)

```bash
$ ls /tmp/abc && touch /tmp/abc/hehe # 如果存在/tmp/abc就创建/tmp/abc/hehe，否则不创建
$ ls /tmp/abc || mkdir /tmp/abc # 如果不存在/tmp/abc就创建/tmp/abc
$ ls /tmp/abc || mkdir /tmp/abc && touch /tmp/abc/hehe     # 如果存在/tmp/abc,创建/tmp/abc/hehe;否则先创建/tmp/abc,再创建/tmp/abc/hehe
$ ls /tmp/newtest && echo "exit" || echo "no exit"     # 如果有/tmp/newtest就输出" exit"，否则"no exit"
```



## 21 管线命令

+ less
+ more
+ head
+ tail
+ cut
+ grep
+ sort
+ uniq
+ wc
+ tee

![](http://o7m5xjmtl.bkt.clouddn.com/14897686134165.jpg)

```bash
$ ls -al /etc | less
$ ps -ef | grep sshd

## 将path变量取出，找出第五个路径,以“：”作为分隔
$ echo $PATH | cut -d ':'  -f 5

## 将path变量取出，找出第三到第五个路径,以“：”作为分隔
$ echo $PATH | cut -d ':'  -f 3,5

## export输出的信息每行都切掉前12个字符
$ export | cut -c 12-

## 截取每行第12-20个字符
$ export | cut -c 12-20

## 查看这个月的登录信息，以' '作为分割，截取第一段字符（登录帐号）
$ last | cut -d ' ' -f 1

## 取出其中含有“reboot”的行
## <==> $ last | grep reboot
## <==>$ last | grep "reboot"
$ last | grep 'reboot'

## 取出带有reboot字串的行的第一栏
$ last | grep reboot | cut -d ' ' -f 1

## 单独使用grep举例
$ grep MANPATH /etc/manpath.config

## 用以':'分隔的第三栏排序
$ cat /etc/passwd | sort -t ':' -k 3

## 输出第1栏并排序,然后去掉重复项并新显示没一项重复的次数
$ last | cut -d ' ' -f 1 | sort |uniq -c

## 行数 字数 字符数
$ cat /etc/manpath.config | wc

## 计算这个月登录的次数
$ last | grep [a-zA-Z] | grep -v 'wtmp' | wc -l

## tee使数据流双重导向到文件后还可以交给后面的管道处理
$ last | tee -a last.list | cut -d ' ' -f 1    
```

## 22 字符转换命令

+ tr
+ col
+ john
+ paste
+ expand

```bash
## 将last输出信息中所有小写改为大写
$ last | tr [a-z] [A-Z]

## 将cat出的信息中所有“：”删除
$ cat  /etc/passwd | tr -d ':'

## 复制并转换
$ cp /etc/passwd /root/passwd && unix2doc /root/passwd

## 查看上一操作后的文件状态
$ file /etc/passwd /root/passwd

## 去掉'\t'
$ cat /root/passwd | tr -d '\t' > /root/passwd.linux

## col -x会将tab转换成对等的空格键
$ cat  /etc/manpath.config | col -x | cat -A | more

## 转存为纯文本文档
$ man col | col -b  > /root/man.col

## 将两个文件的一个字段相同的行合成一行
$ join -t ':' /etc/passwd /etc/shadow

## 将第一个文件的第4个字段与第二个文件第3个字段相同的行合并在一起
$ join -t ':' -1 4 /etc/passwd -2 3 /etc/group

## 简单地同行贴在一起，中间用[tab]分隔
$ paste /etc/passwd /etc/shadow

## stdout和两个其他文件paste并且只显示前三行
$ cat /etc/passwd | paste /etc/shadow /etc/group - | head -n 3

## 将[tab]替换为6个空格
$ grep '^MANPATH' /etc/manpath.config  | head -n 3 | expand -t 6 - | cat -A 

## 将/termcap分割成300k一个的小档案
$ cd /tmp;split --b 300k /etc/termcap termcap

## 将那些小档案合在一起
$ cat termcap* >> termcapback

## 每10行记录成一个小档案,档案的名字前缀为lsroot
$ ls-al | split -l 10 - lsroot

## 用最后一个管道之前产生的数据流作为参数执行finger指令,并询问是否执行，一次查询5个,分析到'lp'结束
$ cut -d ':' -f 1 /etc/passwd | head -n 3 | xargs -p -n 5 -e 'lp' finger

## 找出特殊档名并列出属性
$ find /sbin -perm +7000 |xargs ls -l

##  '-'代表stdout和stdin
$ tar -cvf - /home | tar vaf -
```

