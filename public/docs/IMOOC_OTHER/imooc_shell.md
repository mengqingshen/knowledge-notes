---
title: Shell
categories:
	- 慕课网学习笔记
tag:
	- shell
---


# 1	Shell基础

## 1.1	shell概述
**命令行解释器：** Shell 是一个命令行解释器，它可以向 Linux 内核发送请求以便运行程序，用户可以用Shell来启动、挂起、停止一些程序。
**一门语言：** Shell 还是一个功能相当强大的编程语言，易编写，易调试，灵活性较强。Shell时解释执行的脚本语言，在 Shell 中可以直接调用 Linux 系统命令。

## 1.2	Shell的分类
**注意：** Bourne Shell 和 C Shell 两种 shell 语法不兼容。

|shell|语法|家族|
|---|---|---|
|Bourne Shell|Bourne|sh(兼容bash)、 ksh、 bash(linux的标准shell)、 psh|
|C Shell(主要用于Unix)|C|csh、 tcsh|

### Bourne Shell
**历史：** 从1979起就开始使用`Bourne Shell`，`Bourne Shell`的主文件名为`sh`。
**特点：**功能简单，不支持历史操作。

```powershell
$ echo $SHELL
/bin/zsh
```

### C Shell
**说明：**C Shell主要在 BSD 版的 Unix 系统中使用，其语法和 C 语言相类似而得名。

### 1.1.3		子Shell
**规则：**
1. 在一个 shell 中可以调用其它 shell，它们存在父子关系
2. 子 shell 可以是一个和父 shell 不同的 shell

## 1.2	脚本执行方式

### 1.2.1	echo
**语法：**`echo [选项] ［输出内容］`

选项|说明
---|---
-e|支持反斜线控制的字符转换


####控制字符列表

|控制字符|作用|
|-----|----|
|\a|输出警告音|
|\b|退格键，也就是向左删除键|
|\n|换行符|
|\r|回车键|
|\t|制表符，也就是Tab键|
|\v|垂直制表符|
|\0nnn|按照八进制ASCLL码表输出字符。其中0位数字零，nnn时3位八进制数|
|\xhh|按照十六进制ASCLL码表输出字符。其中hh是两位16进制|
|\e|为输出文本添加颜色，格式为`\e[1;［色值］［文本］\e[0m`。其中`\e[1;`代表开始位置，`\e[0m`代表关闭颜色|
####颜色

|色值(前面的可以添加`#`，也可以省略)|代表的颜色|
|---|---|
|30m|黑色|
|31m|红色|
|32m|绿色|
|33m|黄色|
|34m|蓝色|
|35m|洋红|
|36m|青色|
|37m|白色|

```bash
#按照十六进制的ASCLL码输出
$ echo -e '\x68\t\x65\t\x6c\t\x6c\t\x6f\t'
 h	e	l	l	o

#输出带颜色的字符
$ echo -e '\e[1;31m no zuo no die\e[0m'
 no zuo no die
```

### 1.2.2	第一个脚本
**注意：**`#!/bin/zsh`不应该省略（对一些简单shell省略未必要问题，但会给其他shell留下隐患）

```zsh
#!/bin/zsh
#The first program

echo -e "\e[1;34m Hello Shell!\e[0m"
```

### 1.2.3	执行方式

#### 1.2.3.1	`./`(需要赋予权限)

```zsh
$ chmod +x hello.sh
$ ./hello.sh
```

#### 1.2.3.2	指定shell执行（不需要赋予权限）

```zsh
$ zsh hello.sh
```

## 1.3	别名和快捷键

### 1.3.1	别名
**命令生效优先级：**

|序号|命令|
|---|---|
|1|用绝对路径或相对路径执行的命令|
|2|别名|
|3| Bash的内部命令|
|4|按照`$PATH`环境变量定义的目录查找顺序找到的第一个命令|

```zsh
#查看已经生效的所有别名
$ alias

#设置临时别名
$ alias ls='ls -l --color=auto' 

#查看别名
$ alias ls

#写入环境变量配置文件
$ vim ~/.bashrc
 alias ls='ls -l --color=auto' 

#删除别名
$ unalias ls
```


### 13.2	快捷键

|快捷键|用途|
|---|---|
|ctrl+c|强制终止当前命令|
|ctrl+l|清屏|
|ctrl+a|光标移动到命令行首|
|ctrl+e|光标移动到命令行尾|
|ctrl+u|从光标所在位置删除到行首|
|ctrl+z|把命令放入后台|
|ctrl+r|在历史命令中搜索|

## 1.4	历史命令

### 1.4.1	`history`
**注意：**不推荐清空历史命令
**语法：**`history [选项] [历史命令保存文件]`
**选项：**

|选项|用途|
|---|---|
|-c|清空历史命令|
|-w|把缓存中的历史命令写入历史命令保存文件~/.bash_history|

### 1.4.2	历史命令的调用

+ 使用上、下箭头调用以前的历史命令
+ 使用`!n`重复执行第n条历史命令
+ 使用`!!`重复执行上一条命令
+ 使用`!字串`重复执行最后一条以该字串开头的命令

## 1.5	输出重定向

### 1.5.1	标准输入输出

|设备|设备文件名|文件描述符|类型|
|---|---|---|---|
|键盘|/dev/stdin|0|标准输入|
|显示器|/dev/stdout|1|标准输出|
|显示器|/dev/stderr|2|标准错误输出|

### 1.5.2	输出重定向
**注意：**`2>>`和`2>`两边不能带空格。
![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202015-06-03%20%E4%B8%8A%E5%8D%888.18.42.png)
![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202015-06-03%20%E4%B8%8A%E5%8D%888.26.33.png)

### 1.5.3	输入重定向
`wc [选项] ［文件名］`：
**选项：**

|选项|作用|
|---|---|
|-c|统计字节数|
|-w|统计单词数|
|-l|统计行数|

```bash
#行数 字数 字符数
$ cat /etc/manpath.config | wc 
#计算这个月登录的次数
$ last | grep [a-zA-Z] | grep -v 'wtmp' | wc -l
```

### 1.5.4	实例

```bash
#stdout和stderr
$ find -name /home .bashrc   > list_right 2> list_error
#标准信息写到list_right ,标准错误信息丢进“黑洞”
$ find -name /home .bashrc   > list_right 2> list_error

$ find -name /home .bashrc   &> list
#or
#标准信息写到和标准错误信息都写进list
$ find -name /home .bashrc   > list 2>&1

#stdin
#利用cat创建一个新档案，^d结束输入
$ cat > catfile                             
#利用cat创建一个新档案，输入"eof"后结束输入
$ cat > catfile <<"eof"
#将~/.bashrc的内容写入到cattest中             
$ cat  > cattest <~/.bashrc

#当遇到某个特定结束字符时结束输入，并将之前的所有输入作为输入进行统计
$ wc << endflag
 > a
 > b
 > c
 > endflag
        3       3       6
```


## 1.6	管道符

### 1.6.1	命令执行的判断依据
![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202015-06-03%20%E4%B8%8A%E5%8D%888.48.32.png)

```bash
#如果存在/tmp/abc就创建/tmp/abc/hehe，否则不创建
$ ls /tmp/abc && touch /tmp/abc/hehe
#如果不存在/tmp/abc就创建/tmp/abc
$ ls /tmp/abc || mkdir /tmp/abc
#如果存在/tmp/abc,创建/tmp/abc/hehe;否则先创建/tmp/abc,再创建/tmp/abc/hehe
$ ls /tmp/abc || mkdir /tmp/abc && touch /tmp/abc/hehe
#如果有/tmp/newtest就输出" exit"，否则"no exit"
$ ls /tmp/newtest && echo "exit" || echo "no exit"
#统计打包压缩事件
$ date;tar -zxvf etc.tar.gz /etc ;date

#模拟if-else
$ ls && echo 'yes' || echo 'no'
```

### 1.6.2	管线命令
`[命令1] ［命令2］`：命令1的正确输出作为命令2 的操作对象

```bash
$ ls -al /etc | less
$ ps -ef | grep sshd
#将path变量取出，找出第五个路径,以“：”作为分隔
$ echo $PATH | cut -d ':'  -f 5
#将path变量取出，找出第三到第五个路径,以“：”作为分隔
$ echo $PATH | cut -d ':'  -f 3,5
# 将export输出的信息每行都切掉前12个字符
$ export | cut -c 12---
# 截取每行第12-20个字符
$ export | cut -c 12-20
# 查看这个月的登录信息，
$ last | cut -d ' ' -f 1
# 取出其中含有“reboot”的行
$ last | grep 'reboot'  <==> $ last | grep reboot <==>$ last | grep "reboot"
# 取出带有reboot字串的行的第一栏
$ last | grep reboot | cut -d ' ' -f 1
# 单独使用grep举例
$ grep MANPATH /etc/manpath.config
# 用以':'分隔的第三栏排序
$ cat /etc/passwd | sort -t ':' -k 3
# 输出第1栏并排序,然后去掉重复项并新显示没一项重复的次数
$ last | cut -d ' ' -f 1 | sort |uniq -c
# 行数 字数 字符数
$ cat /etc/manpath.config | wc
# 计算这个月登录的次数
$ last | grep [a-zA-Z] | grep -v 'wtmp' | wc -l
# tee使数据流双重导向到文件后还可以交给后面的管道处理
$ last | tee -a last.list | cut -d ' ' -f 1
```

## 1.7	通配符
![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202015-06-03%20%E4%B8%8B%E5%8D%8810.57.06.png)

```bash
$ ls index*
 index.css  index.html index.js
```

## 1.8	Bash中的其他特殊符号
![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202015-06-03%20%E4%B8%8B%E5%8D%8811.03.32.png)


# 2	Bash变量与变量分类

## 2.1	Bash变量与变量分类

### 2.1.1	变量命名规则

+ 变量名必须以字母或下划线打头，名字中间只能由字母、数字和下划线组成
+ 变量名的长度不得超过255个字符
+ 变量名在有效范围内必须是唯一的
+ 在Bash中，变量的默认类型都是字符串型

### 2.1.2	变量分类
**注意：**bash中的所有变量都是字符串

|分类|用途|
|---|---|
|**用户自定义变量**|自己定义的变量|
|**环境变量**|主要保存的是和操作系统环境相关的数据。变量可以自定义，但是对系统生效的环境变量名和变量作用是固定的|
|**位置参数变量**|主要用来向脚本中传递参数或数据，变量名不能自定义，变量作用是固定的|
|**预定义变量**|是Bash中已经定义好的变量，变量名不能自定义，变量作用也是固定的|


## 2.2	用户自定义变量

### 2.2.1	定义变量
**语法：**`变量名＝变量值`
**注意：**
1. 变量值存在空格时需要用`""`
2. `=`左右两侧不能有空格

### 2.2.2	变量调用
**语法：**`$变量名`

```bash
$ echo $x
```

### 2.2.3	变量叠加
**用途：**通过为变量追加字符串获得新的字符串

```bash
x=123
x="$x"123
x=${x}123
```

### 2.2.4	set
**用途：**查看系统中所有已经生效的变量
**选项：**

|-u|如果设定此选项，调用未声明变量时会报错（默认无任何提示）|
|---|---|

### 2.2.5	变量删除
**语法：**`unset 变量名`
**特点：**不仅仅清空变量的值，会使变量不再存在
**注意：**`变量名`不需要在前面添加`$`

## 2.3	bash环境变量
**环境变量与用户自定义变量的区别？**

+ 用户自定义变量只在当前的shell中生效
+ 环境变量在当前Shell和这个Shell的所有子Shell中生效

```bash
$ pstree | grep bash
 | |   \-+= 09557 tonyearth bash#父bash
 | |     \-+= 09573 tonyearth bash#子bash
```

### 2.3.1	声明环境变量
**语法：**`export 变量名＝变量值`
**查看环境变量：**`env`

### 2.3.2	删除环境变量
**语法：**`unset $环境变量名`
**注意：**
1. 无法在子shell中删除父shell中声明的环境变量
2. 推荐环境变量名使用大写来定义（因为所有命令都是小写）

### 2.3.3	常见环境变量

|环境变量名|用途|
|---|---|
|HOSTNAME|主机名|
|SHELL|当前的shell|
|TERM|终端环境|
|HISIZE|历史命令条数|
|SSH_CLIENT|当前操作环境是用ssh连接的，这里记录客户端ip|
|SSH_TTY|ssh连接的终端是pts/1|
|USER|当情登陆的用户|
|PATH|系统查找命令的路径|
|PS1|命令提示符设置|
|PS2|长命令使用`\`换行后行首的标志符|

#### PATH环境变量
**用途：**系统查找命令的路径，非常重要
**查看：**`echo $PATH`
**追加（变量叠加）：**`PATH="$PATH":/root/sh`

#### PS1环境变量

|项目|用途|
|---|---|
|\d|显示日期，格式为“星期 月 日”|
|\H|显示完整的主机名。如默认主机名"localhost.localdomain"|
|\t|显示24小时制时间，格式为"HH:MM:SS"|
|\A|显示24小时制时间，格式为“HH:MM”|
|\u|显示当前用户名|
|\w|显示当前所在目录的完整名称|
|\W|显示当前所在目录的最后一个目录|
|\$|提示符。root用户为"#"，普通用户为"$"|

## 2.4	bash语系变量

### 2.4.1	locale
`locale`：查询当前系统的语系

|相关环境变量|含义|特点|
|---|---|---|
|LANG|定义系统主语系的变量|当前生效的语系|
|LC_ALL|定义整体语系的变量|默认整体的语系|
**系统默认语系**：`/etc/sysconfig/i18n`

```bash
#查看所有支持的语系
$ locale -a | more
```

### 2.4.2	Linux中文支持
**正确安装中文字体后的3种情况：**
1. 如果有图形界面，可以正确支持中文显示
2. 如果使用第三方远程工具，只要语系设定正确，可以支持中文显示
3. 如果纯字符界面，必须使用第三方插件（如zhcon等）

## 2.5	位置参数变量
![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202015-06-04%20%E4%B8%8B%E5%8D%881.33.53.png)

```bash
$ vim sum.sh
 #!/bin/sh
 num1=$1
 num2=$2
 sum=$(($num1 + $num2))
 echo $sum

$ bash sum.sh 1 2
 3
```

### 2.5.1	`$*`和`$@`的区别

```bash 
$ vim test.sh
 #!/bin/bash
 #$*中的所有参数看成是一个整体，所以只会循环一次
 for i in "$*"
 do 
 	echo "The parameters is: $i"
 done
 #$@中的每个参数都看成是独立的，所有"$@"中有几个参数，就会循环几次
 for j in "$@"
 do
 	echo "Parameter: $j"
 done

$ bash test.sh 1 3 4 5
 The parameters is: 1 3 4 5
 Parameter: 1
 Parameter: 3
 Parameter: 4
 Parameter: 5
```

## 2.6	预定义变量
![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202015-06-04%20%E4%B8%8B%E5%8D%884.44.07.png)

```bash
$ echo $$
 12098

$ ps aux | grep 2911
 root     16442  0.0  0.0 103248   852 pts/1    S+   16:46   0:00 grep 2911

$ bash-3.2$ echo $?
 0

$ bash-3.2$ echo $!
```

### 2.6.1	接收键盘输入
**命令：**`read [选项] [变量名]`

|选项|用途|
|---|---|
|-p "提示信息"|在等待read输入时，输出提示信息|
|-t 秒数|read命令会一直等待用户输入，使用此选项可以制定等待时间|
|-n 字符数|read命令只接受指定的字符数就会执行|
|-s|隐藏输入的数据，适用于机密信息的输入|

```bash
#!/bin/bash

# 30s没输入终止脚本的执行
read -p "please input your name:" -t 30 name
#不显示输入的密码
read -p "please input your password:" -s passwd
#只接收输入的一个字符便向下走
read -p "please input your sex[M/F]:" -n 1 sex
echo "$name"/"passwd"
```

# 3 运算符

## 3.1 课程概述及declare命令
**shell变量的缺点**
1. 弱类型
2. 默认字符串类型

### 3.1.1	declare声明变量类型
**语法：**declare [+/-] [选项] 变量名

|选项|用途|
|---|---|
|-|给变量设定类型属性|
|+|取消变量的类型属性|
|-a|将变量声明为数组型|
|-i|将变量声明为整型|
|-x|将变量声明为环境变量|
|-r|将变量声明为只读变量|
|-p|显示指定变量被声明的类型|

```bash
#给变量aa和bb赋值
$ aa=11
$ bb=22
#声明变量cc的类型是整型，它是aa和bb的和
$ declare -i cc=$aa+$bb
$ echo $cc
33
```

### 3.1.2	声明数组变量
**注意：**只要在数组名后使用了`[下标]`，shell会自动将该变量作为数组类型

```bash
#为数组赋值，declare的过程可以省略
$ movie[0]=zp # declare -a movie[0]=zp
$ movie[1]=tp # declare -a movie[1]=ztp
$ declare -a movie[2]=live

#查看数组
#不加下标默认是[0]
$ echo ${movie}
 zp
$ echo ${movie[2]}
 live
#使用[*]会引用所有值
$ echo ${movie[*]}
 zp tp live
```

### 3.1.3	声明环境变量
**说明：**`export`声明环境变量，底层使用的是`declare -x`

```bash
$ export aa=11
#发现用export声明的环境变量底层使用的是declare
$ declare -p aa
 declare -x aa="11"
```

### 3.1.4	只读变量
**特点：**
1. 临时生效
2. 无法取消类型声明
3. 无法删除

```bash
#声明只读变量
$ declare -r test

#查看该变量
$ declare -p test
 declare -r test=""
 
#尝试删除
$ unset test
 bash: unset: test: cannot unset: readonly variable
 
#尝试取消类型声明
$ declare +r test
 bash: declare: test: readonly variable
```

## 3.2 数值运算方法
**两种方式**

+ 方式一：`declare`(有点麻烦)

```bash
aa=1
bb=2
declare -i cc=$a+$b
```

+ 方式二：`expr`或`let`数值运算工具(也麻烦)

```bash
aa=1
bb=2
cc=$(expr $aa + $bb)#+号左右两侧必须有空格
```

+ 方式三：`$((运算式))`（推荐）或`$[运算式]`(方便)

```bash
$ aa=11
$ bb=22
$ ff=$(($aa+$bb))
$ gg=$[$aa+$bb]
$ echo $ff
 33
 ```

## 3.3 运算符
`优先级递减`
![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202015-06-05%20%E4%B8%8A%E5%8D%889.19.23.png)


## 3.4 变量测试
**优点：**语法简单，效率高
**缺点：** 理解困难
![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202015-06-05%20%E4%B8%8B%E5%8D%883.21.28.png)

```bash
$ unset y
$ x=${y-2}
$ echo $x
 2
```

# 4 条件判断与流程控制

## 4.1	条件判断式与语句
**两种判断格式**
1. `test -e /root/install.log`
2. `[ -e /root/install.log ]`

### 4.1.1	概述(略)

### 4.1.2	按照文件类型判断
**流程控制语句**
1. 条件判断式
2. 单分支if语句
3. 双分支if语句
4. 多分支if语句
5. case语句
6. for循环
7. while循环和util循环

![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202015-06-05%20%E4%B8%8B%E5%8D%8811.22.09.png)

```bash
$ [ -e ./sum.sh ] && echo yes || echo no
 yes
#或
$ [ -e ./sum.sh ]
$ echo $?
 0#代表存在
```

### 4.1.3	按文件权限判断
![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202015-06-06%20%E4%B8%8A%E5%8D%889.49.39.png)

### 4.1.4	两个文件之间的比较
![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202015-06-06%20%E4%B8%8A%E5%8D%8810.51.23.png)

```bash
#创建硬链接
$ ln /root/student.txt /tmp/stu.txt

#测试两个文件的Inode号是否一致
$ [ /root/student.txt -ef /tmp/stu.txt ] && echo yes || echo no
 yes
```

### 4.1.5	两个整数之间的比较
![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202015-06-06%20%E4%B8%8A%E5%8D%8810.57.02.png)

```bash
$ [ 23 -ge 22 ] && echo yes || echo no
 yes

$ shell  [ 23 -le 22 ] && echo yes || echo no
 no
```

### 4.1.6	字符串的判断
**注意：**
1. 判断字符串是否相等也可以使用`=`代替`==`，但容易和赋值操作混淆，因此不推荐。
2. 用`$变量`访问变量如果出现异常可以尝试在外面加上`"`
3. 比较数字大小一般也可以用比较字串来替代
![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202015-06-06%20%E4%B8%8A%E5%8D%8811.02.12.png)

```bash
$ name=gui

# 判断字符串是否位空
$ [ -z $name ] && echo yes || echo no
 no

$ aa=11
$ bb=22
# 判断字符串是否相等（会将变量作为字符串进行比较）
$ [ "$aa" -eq "$bb" ] && echo yes || echo no
 no
# 判断数字是否相等（将变量作为数字进行比较）
$ [ "$aa"=="$bb" ] && echo yes || echo no 
yes
```

### 4.1.7	多重条件判断
![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202015-06-06%20%E4%B8%8A%E5%8D%8811.11.00.png)

```bash
$ a=22
# 判断aa是否不为空且大于23
$ [ -n "$aa" -a "$aa" -gt 23 ] && echo yes || echo no
 no
```

## 4.2	单分支if语句

### 4.2.1	概述
`shell的语法结构和大多数语言都不同`
**学习小脚本实例的好处**
1. 掌握语法结构
2. 了解shell的作用
3. 分析编程思想

**建立编程思想的方法**
1. 熟悉Linux基本命令、规范、语法及shell语法
2. 当遇到实际需求时，应用所学知识

### 4.2.2	单分支if语句

#### 4.2.2.1 需要注意的几个地方

+ `if`语句使用 `fi` 结尾，和一般语言使用大括号结尾不同
+ `[ 条件判断式 ]`就是使用 `test` 命令判断，所以中括号和条件判断式之间必须有空格
+ `then` 后面跟符号条件之后执行的程序，可以放在`[]`之后，用`;`分割。也可以换行写入，就不需要`;`了

#### 4.2.2.2  语法
**方式一**

```bash
if [ 条件判断式 ];then
  程序
 fi
```

**方式二**
 
```bash
 if [ 条件判断式 ]
   then
   程序
fi
```

#### 4.2.2.3 案例：判断当前用户是否是root
**注意：**使用`whoami`判断用户身份在`su root`情况下会误认为当前用户还是却换为root之前的用户，因此使用`env`更可靠。

```bash 
#! /bin/bash
# 获得含有"USER="字串的那一行，以"="分隔，取第二部分
username=$(env | grep USER= | cut -d "=" -f 2)
if [ "$username" == root ]
	then
	echo "This is Root."
fi
```

### 4.2.3	案例：判断分区使用率

```bash
#! /bin/bash
#
diskRate=$(df -h | grep disk1 | awk '{print $5}' | cut -d "%" -f 1)
if [ "$diskRate" -ge "90" ]
	then
	echo "/ is full!"
fi 
```

## 4.3	双分支if语句
**语法**

```bash
if [ 条件判断式 ]
   then
   条件成立时，执行的程序
else
   条件不成立时，执行的另一个程序
 fi
```

### 4.3.1	判断输入的是否是一个目录

```bash
#! /bin/bash
#AIM：检查用户输入的目录是否真的存在
read -t 30 -p "Please input a directory:" dir
if [ -d $dir ]
	then 
		echo yes
	else
		echo no
fi
```

### 4.3.2~4.3.3	判断Apache服务是否启动
**注意：**脚本名中不要包含`httpd`

```bash
#! /bin/bash
#截取httpd进程，并把结果赋予变量test
pid=$(ps aux | grep httpd | grep -v grep)
if [ -n "$pid" ]
	then
		echo "$(date) httpd is on." >> /tmp/autostart-acc.log
	else
		/etc/rc.d/init.d/httpd start &>/dev/null
		echo "$(date) restart httpd!! " >> /tmp/autostart-err.log
fi
```

## 4.4	多分支if条件语句

### 4.4.1	简介
**语法**

```bash
if [ 条件判断式1 ]
   then
     条件成立时，执行程序1
elif [ 条件判断式2 ]
   then
     条件不成立时，执行的另一个程序
else
     当所有条件都不成立时，最后执行此程序
 fi
```

### 4.4.2	例：计算器

```bash
#!/bin/bash
#字符界面加减乘除计算器

#通过read命令接收要计算的树枝，并赋予变量num1和num2
read -t 30 -p "Please input num1:" num1
read -t 30 -p "Please input num2:" num2

#通过read命令接收要计算的符号，并赋予变量ope
read -t 30 -p "Please input an operator:" ope
if [ -n "$num1" -a -n "$num2" -a -n "$ope" ]
	then
	#被操作数是否匹配数字
	#原理：尝试将变量中的数字转变为空，如果结果为空则说明变量中只包含数字
	test1=$(echo $num1 | sed 's/[0-9]//g')
	test2=$(echo $num1 | sed 's/[0-9]//g')

	#如果都为空，则说明都是数字
	if [ -z "$test1" -a -z "$test2" ]
		then
		if [ "$ope" == '+' ]
			then
			sum=$(($num1+$num2))
		elif [ "$ope" == '-' ]
			then
			sum=$(($num-$num2))
		elif [ "$ope" == '*' ]
			then
			sum=$(($num1*$num2))
		elif [ "$ope" == '/' ]
			then
			sum=$(($num1/$num2))
		else
			echo "Please enter a valid symbol"

			#退出程序，返回错误代码10
			exit 10
		fi
	else
		#如果test1和test2不是数字
		echo "Please enter a valid value"
		exit 11
	fi
fi
#输出结果
echo "$num1 $ope $num2 = $sum"
```

### 4.4.2	例：判断用户输入的是什么文件
**注意：**`exit`可以终止后面的判断

```bash
#!/bin/bash
#判断用户输入的是什么文件

#接收键盘的输入，并赋予变量file
read -p "Please input a filename:" file

#判断file变量是否为空
if [ -z "$file" ]
	then
	echo "Error,please input a filename"
	exit 1
#判断文件是否存在
elif [ ! -e "$file" ]
	then
	echo "Your input is not a file!"
	exit 2
#判断file的值是否为普通文件
elif [ -f "$file" ]
	then
	echo "$file is a regulare file!"
#判断file的值是否为目录文件
elif [ -d "$file" ]
	then
	echo "$file is a directory!"
else
	echo "$file is an other file!"
fi
```

## 4.5	多分支case语句
**简介：**case语句和`if...elif...else`语句一样都是多分支条件语句，不过和if多分支条件语句不同的是，case语句只能判断一种条件关系，而if语句可以判断多种条件关系。
**语法**

```bash
case $变量名 in
  "值1")
    如果变量的值等于值1，则执行程序1
    ;;
  "值2")
    如果变量的值等于值2，则执行程序2
    ;;
  *)
    如果变量的值都不是以上的值，则执行此程序。
    ;;
esac
```

```bash
#!/bin/bash
#判断用户输入

read -p "Please choose yes/no:" -t 30 cho
case "$cho" in
	"yes")
		echo "Your choose is yes!"
		;;
	"no")
		echo "Your choose is no!"
		;;
	*)
		echo "Your choose is error!"
		;;
esac

```

## 4.6	for循环
**语法**

+ 语法1

```bash
for 变量 in 值1 值2 值3 ...
  do
      程序
  done
```

+ 语法2

```bash
for((初始值;循环控制条件;变量变化))
do
  程序
done
```

### 4.6.1	for循环

```bash
#!/bin/bash
#判断用户输入

cd /root/test/
#将需要压缩的文件名丢进ls.log
ls *.tar.gz > ls.log
ls *.tgz >> ls.log

#解压名字在ls.log中的压缩包
for i in $(cat ls.log)
do
	tar -zxf $i &> /dev/null
done
rm -rf /lamp/ls.log
```

### 4.6.2	例：批量添加删除指定数量的用户
**注意：**不支持`++` `--`等运算

```bash
#!/bin/bash
#批量添加指定数量的用户
read -p "Please input user name:" -t 30 name
read -p "Please input the number of users:" -t 30 num
read -p "Please input the password of users:" -t 30 pass

if [ ! -z "$name" -a ! -z "$num" -a ! -z "$pass" ]
	then
	y=$(echo $num | sed 's/[0-9]//g')
	if [ -z "$y" ]
		then
		for (( i = 0; i < $num; i=i+1 )); do
			/usr/sbin/useradd $name$i &> /dev/null
			echo $pass | /usr/bin/passwd --stdin $name$i &> /dev/null
		done
	fi
fi
```

## 4.7	while循环和unit循环

### 4.7.1	while循环
**简介：**`while`循环是不定循环，也称作条件循环。只要条件判定式成立，循环就会一直继续，指导条件判定式不成立，循环才会停止。这就和`for`的固定循环不太一样了。
**语法：**

```bash
while [ 条件判定式 ]
do
  程序
done
```

```bash
#!/bin/bash
#批量添加指定数量的用户

# 1-100相加
i=0
s=0
while [ $i -le 100 ]
do
	s=$(($s+$i))
	i=$(($i+1))
done
echo "The sun is $s"
```

### 4.7.2	until循环
**简介：**`until`循环，和`while`循环相反，`until`循环时只要条件判断式不成立则进行循环，并执行循环程序。一旦循环条件成立，则终止循环。
**语法：**

```bash
until [ 条件判定式 ]
do
  程序
done
```

```bash
#!/bin/bash
#批量添加指定数量的用户

# 1-100相加
i=0
s=0
until [ $i -gt 100 ]
do
	s=$(($s+$i))
	i=$(($i+1))
done
echo "The sun is $s"
```


	

