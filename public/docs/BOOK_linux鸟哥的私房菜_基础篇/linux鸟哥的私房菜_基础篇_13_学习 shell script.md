---
title: 13 学习 shell script
categories: [linux鸟哥的私房菜_基础篇]
tag:
 - linux
 - shell
date: 2013-11-08 20:57:45
---

linux 系统相关|说明
---|---
/etc/init.d|linux系统服务启动的接口所在的位置
`/etc/init.d/syslogd restart` or `/etc/init.d/rsyslogd restart`|重新启动系统注册表 

![](http://o7m5xjmtl.bkt.clouddn.com/14897707128840.jpg)

# 1 执行 shell 脚本
*/home/anderson/sheel.sh*

```bash
# 方式一：绝对路径
$ /home/andersion/sheel.sh 

# 方式二：当前路径(要求有可读可执行的权限)
$ cd /home/andersion ;./sheel.sh
# 方式三：将 shell.sh 放在 PATH 某个路径下，比如~/bin/
$ bash sheel.sh # or $ sh sheel.sh
```

注意：以上方式都会让脚本在bash子程序中执行，这意味着那是一个全新的bash环境

![](http://o7m5xjmtl.bkt.clouddn.com/14897728471091.jpg)

# 2 实战example

## NO.1 This program shows "Hello World!" in your screen.

```bash
#!/bin/bash
#program:
#   This program shows "Hello World!" in your screen.
#History:
# 2013/11/09 Andersion First release
PATH=/bin:/sbin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH
#\a:alert    \n：换一行
echo -e "Hello World!\a\n"
exit 0
```

## NO.2 User inputs the first name and last name.The program output it all.

```bash
#!/bin/bash
#Program:
#   User inputs the first name and last name.The program output it all.
#History:
# 2013/11/09 Anderson First Release
PATH=/usr/java/jdk1.7.0_45/bin:/bin:/usr/lib/lightdm/lightdm:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games
export PATH
read -p "Please input your first name:" firstname
read -p "Please input your last name:" lastname
echo -e "\nYour full name is: ${firstname} ${lastname}"
```

## NO.3 Program creates three files,which named by user's input and date command.

```bash
#!/bin/bash
#Program:
#   Program creates three files,which named by user's input 
#   and date command.
#History:
#   2013/11/09 Anderson First Release
PATH=/usr/java/jdk1.7.0_45/bin:/bin:/usr/lib/lightdm/lightdm:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games
export PATH
echo -e "I'll use 'touch' command to create 3 files."
read -p "Pleaseinput your filename:" filename
filename=${filename:-"filename"}        #利用变量的设定功能，如果filename被设定为user[Enter]成空字符串，就给它一个默认的赋值filename="filename"
#利用date指令获得档名
date1=$(date --date='2 days ago' +%Y%m%d) #前两天的日期
date2=$(date --date='1 days ago' +%Y%m%d) #前一天的日期
date3=$(date +%Y%m%d) #今天的日期
file1=${filename}${date1}
file2=${filename}${date2}
file3=${filename}${date3}

#建立档案
touch "$file1"
touch "$file2"
touch "$file3" 

```

## NO.4 User inputs 2 integer numbers;program will cross those two numbers.

```bash
#!/bin/bash
#Program:
#   User inputs 2 integer numbers;program will cross those two numbers.
#History:
#   2013/11/09 Anderson First release
PATH=/usr/java/jdk1.7.0_45/bin:/bin:/usr/lib/lightdm/lightdm:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games
export PATH
echo -e "You should input 2 numbers,I will cross them!\n"
read -p "Enter the first number:" firstnum
read -p "Enter the second number:" secondnum
#total=$(($firstnum*$secondnum))
declare -i total=$firstnum*$secondnum 
echo -e "\n The result of ${firstnum} x ${secondnum} is ==>${total}"
```

**注意**：`var=$((算式))`方式可以取代`declare -i var=$var1...$varn`

## NO.6 This program shows user's choice.

```bash
#!/bin/bash
#Program:
#   This program shows user's choice.
#History:
    2013/11/11  Andersion   First realse
PATH=/usr/java/jdk1.7.0_45/bin:/bin:/usr/lib/lightdm/lightdm:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games
echo PATH

read -p "Please input Y/N:" yn
[ $yn == "y" -o $yn == "Y" ] && echo "ok,continue" && exit 0
[ $yn == "n" -o $yn == "N" ] && echo "oh,interupt" && exit 1
echo "I don't know what your choice are!" && exit 0
```


## NO.7 Program shows this script's name,parametrs......

```bash
#!/bin/bash
#Program:
#   Program shows this script's name,parametrs......
#History:
#   2013/11/11  Andersion   First release
PATH=/usr/java/jdk1.7.0_45/bin:/bin:/usr/lib/lightdm/lightdm:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games
export PATH

echo "This script's name is ==>$0"
echo "The total parameter number is ==>$#"
[ $# -lt 2 ] && echo "The param number is less than 2 .So stop the program here."&& exit 0
echo "The while parameter is    ==>'$@'"
echo "The 1st parameter is  ==>$1"
echo "The 2ed parameter is  ==>$2"
```


```
anderson@anderson-Sailing-Series:~/sheelscript$ ./sh07.sh  hh aa  ff

./sh07.sh: 行 5: 2013/11/11: 没有那个文件或目录
This script's name is==>./sh07.sh
The total parameter number is==>3
The while parameter is==>'hh aa ff'
The 1st parameter is==>hh
The 2ed parameter is==>aa
```

## NO.8 This program shows how shift works.

```bash
#!/bin/bash
#Program:
#   This program shows how shift works.
#History:
#   2013/11/11  Anderson    First release
PATH=$PATH
export PATH

echo "Total parameter number is ==>$#"
echo "Your whole parameter is   ==>'$@'"
shift   #进行第一次shift
echo "Total parameter number is ==>$#"
echo "Your whole parameter is   ==>'$@'"
shift 3
echo "Total parameter number is ==>$#"
echo "Your whole parameter is   ==>'$@'"
```

```bash
anderson@anderson-Sailing-Series:~/sheelscript$ ./sh08.sh a b c d e f g 

Total parameter number is==>7
Your whole parameter is==>'a b c d e f g'
Total parameter number is==>6
Your whole parameter is==>'b c d e f g'
Total parameter number is==>3
Your whole parameter is==>'e f g'
```

## NO.9 This program shows how shift works.

```bash

#!/bin/bash
#Program:
#   This program shows how shift works.
#History:
#   2013/11/11  Anderson    First release
PATH=$PATH
export PATH

if [ "$1" == "hello" ];then
    echo "hello, how are you"
elif [ "$1" == "" ];then
    echo "You must input parameter ex >{"$0" someworld}"
else 
    echo "You can only input 'hello'"
fi
```

## NO.10 Use netstat and grep to detect WWW,SSH,FTP and MAIL

```bash
#!/bin/bash
#Program:
#   Use netstat and grep to detect WWW,SSH,FTP and MAIL
#History:
#   2013/11/11  Anderson    First release
PATH=$PATH
export PATH
# 1.先做一些告知的工作
echo "Now,I  will detect your linux server's services!"
echo -e  "The WWW,FTP,SSH and MAIL service will be detected!\n"
# 2.开始进行一些测试工作，并输出一些信息
testing=$(netstat -tuln | grep ":80")
if [ "$testing" != "" ];then
    echo "WWW is running in your system!"
fi
testing=$(netstat -tuln | grep ":22") #我的ubuntu上设置的是1104
if [ "$testing" != "" ];then
    echo "SSH is running in your system!"
fi
testing=$(netstat -tuln | grep ":21")
if [ "$testing" != "" ];then
    echo "FTP is running in your system!"
fi
testing=$(netstat -tuln | grep ":25")
if [ "$testing" != "" ];then
    echo "MAIL is running in your system!"
fi
```

## NO.12 This scripts only accepts the flowing parameters:one,two,three.

```bash
#!/bin/bash
#Program:
#   This scripts only accepts the flowing parameters:one,two,three.
#History:
#   2013/11/12  Anderson    First release
PATH=$PATH
echo PATH
function printit(){
    echo -n "Your choice is " #-n 不断行，在一行显示
}
echo "This progrsm will print your selection with function."
#read -p "Input your choice:" choice
case $1 in
    "one")
        printit;echo $1 |tr 'a-z' 'A-Z' 
        ;;
    "two")
        
        printit;echo $1 |tr 'a-z' 'A-Z' 
        ;;
    "three")
        printit;echo $1 |tr 'a-z' 'A-Z' 
        ;;
    *)
        echo "Usage $0 {one/two/three}"
        ;;
esac
```

## NO.12-2 This scripts only accepts the flowing parameters:one,two,three. 

```bash
#!/bin/bash
#Program:
#   This scripts only accepts the flowing parameters:one,two,three.
#History:
#   2013/11/12  Anderson    First release
PATH=$PATH
echo PATH
function printit(){
    echo -n "Your choice is " #-n 不断行，在一行显示
}
echo "This progrsm will print your selection with function."
#read -p "Input your choice:" choice
case $1 in
    "one")
        printit;echo $1 |tr 'a-z' 'A-Z' 
        ;;
    "two")
        
        printit;echo $1 |tr 'a-z' 'A-Z' 
        ;;
    "three")
        printit;echo $1 |tr 'a-z' 'A-Z' 
        ;;
    *)
        echo "Usage $0 {one/two/three}"
        ;;
esac
```

## NO.12-3 Use function to repeat information.

```bash
#!/bin/bash
#Program:
#   Use function to repeat information.
#History:
#   2013/11/12  Anderson    3th release
PATH=$PATH
echo PATH
function printit(){
    echo "Your choice is $1" #这个$1必须要参考地下指令的下达
}

echo "This program will print your selection!"

function printit(){
    echo "Your choice is $1" #这里的$1值得是调用这个函数是给的第一个参数
}
echo "This program will print your selection."
case $1 in
    "one")
        printit 1 
        ;;
    "two")
        printit 2
        ;;
    "three")
        printit 3
        ;;
    *)
        echo "Usage $0 {0ne/two/three}"
        ;;
esac
```

## NO.13 This program will keep ask the user to input string until recive "yes" or "YES"

```bash

#!/bin/bash
#program:
#   This program will keep ask the user to input string until recive "yes" or "YES"
#History:
# 2013/11/09 Andersion First release
PATH=/bin:/sbin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH

read -p  "Please input a world:" answer
while [ "$answer" != "yes" ]&&[ "$answer" != "YES" ]
do
    read -p "Keep inputing a world:" answer
done
echo "Program teminated!"
```

## NO.13-2 This program will keep ask the user to input string until recive "yes" or "YES"

```bash
#!/bin/bash
#program:
#   This program will keep ask the user to input string until recive "yes" or "YES"
#History:
# 2013/11/09 Andersion First release
PATH=/bin:/sbin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH

read -p  "Please input a world:" answer
until [ "$answer" != "yes" ]||[ "$answer" != "YES" ]
do
    read -p "Keep inputing a world:" answer
done
echo "Program teminated!"
```

## NO.14 Use loop to calcute "1+2+...+100" result.

```bash
#!/bin/bash
#Program:
#   Use loop to calcute "1+2+...+100" result.
#History:
#   2013/11/12  Anderson    First release
PATH=$PATH
echo PATH

s=0
i=1
while [ "$i" != 100 ]
do
    i=$(($i+1))
    s=$(($s+$i))
done
echo "The result of '1+2+...+100' is ==> $s"
```

## NO.15 Use for ... loop to print 3 animals

```bash
#!/bin/bash
#Program:
#   Use for ... loop to print 3 animals
#History:
#   2013/11/12  Anderson    First release
PATH=$PATH
echo PATH
for animal in dog cat element
do 
    echo "There are ${animal}s..."  
done
```

## NO.16 Use id,figure command to check sysem acccount's information.

```bash
#!//bin/bash
#Program:
#   Use id,figure command to check sysem acccount's information.
#History:
#   2013/11/12  Anderson    First release
PATH=$PATH
echo PATH
users=$(cut -d ":" -f1 /etc/passwd)
for usenamer in $users
do
    id $username
    finger $username
done
```

## NO.17 Use ping command to check the network's pc state.

```bash
#!/bin/bash
#Program:
#   Use ping command to check the network's pc state.
#History:
#   2013/11/12  Anderson    First release
PATH=$PATH
echo PATH
network="192.168.1" #定义一个网域的前面部分
for sitenu in $(seq 1 100)
do  
    ping -c 1 -w 1 ${network}.${sitenu} &> /dev/null && result=0||result=1 #标准输出和标准错误输出信息投进“黑洞”
    if ["$result" == 0 ];then
        echo "${network}.${sitenu} is up"
    else
        echo "${network}.${sitenu} is DOWN"
    fi
done
```

## NO.18 User input dir name,I find the permition of files.

```bash
#!/bin/bash
#Program:
#   User input dir name,I find the permition of files.
#History:
#   2013/11/12  Anderson    First release
export PATH=$APTH
read -p "Please input dir:" dir
# 1.先看看目录是否存在
if [ "$dir" == "" -o ! -d "$dir" ];then
    echo "The $dir is NOT exit in your system."
    exit 1
fi
# 2.开始测试档案
filelist=$(ls $dir) #列出所有在该目录下的文件名
for filename in filelist
do
    perm=""
    test -r "$dir/$filename" && perm="$perm readable"
    test -w "$dir/$filename" && perm="$perm writeable"
    test -x "$dir/$filename" && perm="$perm executable"
    echo "The file $dir/$filename's permition is $perm"
done
```

## NO.19 Try to calculate 1+2+...+${your_input}

```bash
#!/bin/bash
#Program:
    Try to calculate 1+2+...+${your_input}  
#History:
#   2013/11/12  Anderson    First release
echo PATH=$PATH
read -p "Please input a number,I will count for 1+2+...+your_input:" nu
s=0
for ((i=1;i<=$nu;i=i+1))
do
    s=$(($s+$i))
done
echo "The result of '1+2+...+$nu' is==>%s"
```

# 3 利用test指令的测试功能：

```bash
$ test -e /home/anderson && echo "exist" || echo "not exist" # 测试/home/anderson档名是否存在
```

## 某种类型的档案是否存在
![](http://o7m5xjmtl.bkt.clouddn.com/14897720386096.jpg)
![](http://o7m5xjmtl.bkt.clouddn.com/14897720511404.jpg)


## 两个档案之间的比较 && 档案权限的侦测
![](http://o7m5xjmtl.bkt.clouddn.com/14897720917108.jpg)

## 两个整数之间的比较 && 判定字符串的数据 && 多重条件判断

![](http://o7m5xjmtl.bkt.clouddn.com/14897721050460.jpg)


# 4 利用判断符 [ ]   []

```bash
$  [ -z "$HOME" ] ; echo $?        <==>   $ test -n "$HOME";echo $? # 判断$HOME是否为空
$  [ "$HOME" == "$JAVA_HOME" ];echo $? # 返回0
```

**注意事项**
![](http://o7m5xjmtl.bkt.clouddn.com/14897721344957.jpg)


# 5 shift：参数变量号码偏移
![](http://o7m5xjmtl.bkt.clouddn.com/14897721643674.jpg)


# 6 条件判断式

单重

```bash
[ $yn == "Y" -o $yn == "y" ] <==>[$yn == "Y" ] || [ $yn == "y" ]
```

双重

```bash
if [$yn == "Y" ] || [ $yn == "y" ];then
    echo "ok.continue" && exit 0
fi 
```
# 7 netstat -tuln
![](http://o7m5xjmtl.bkt.clouddn.com/14897722826030.jpg)


# 8 case......esac

```bash
case $1 in
"one")
echo "Your choice is ONE"
;;
"two")
echo "Your choice is TWO"
;;
"three")
echo "Your choice is THREE"
;;
*)
echo "Usage $0 {one/two/three})"
;;
esac
```

# 9 function

*Demo1*

```bash
#!/bin/bash
#Program:
#	This scripts only accepts the flowing parameters:one,two,three.
#History:
#	2013/11/12	Anderson	First release
PATH=$PATH
echo PATH
function printit(){
	echo -n "Your choice is " #-n 不断行，在一行显示
}
echo "This progrsm will print your selection with function."
#read -p "Input your choice:" choice
case $1 in
	"one")
		printit;echo $1 |tr 'a-z' 'A-Z'	
		;;
	"two")
		
		printit;echo $1 |tr 'a-z' 'A-Z'	
		;;
	"three")
		printit;echo $1 |tr 'a-z' 'A-Z'	
		;;
	*)
		echo "Usage $0 {one/two/three}"
		;;
esac
```

*Demo2*

```bash
#!/bin/bash
#Program:
#	Use function to repa\eat information.
#History:
#	2013/11/12	Anderson	3th release
PATH=$PATH
echo PATH
function printit(){
	echo "Your choice is $1" #这个$1必须要参考地下指令的下达
}

echo "This program will print your selection!"

function printit(){
	echo "Your choice is $1" #这里的$1值得是调用这个函数是给的第一个参数
}
echo "This program will print your selection."
case $1 in
	"one")
		printit 1 
		;;
	"two")
		printit 2
		;;
	"three")
		printit 3
		;;
	*)
		echo "Usage $0 {0ne/two/three}"
		;;
esac

```

# 10 循环

## while

*Demo1*

```bash


#!/bin/bash
#program:
#	This program will keep ask the user to input string until recive "yes" or "YES"
#History:
# 2013/11/09 Andersion First release
PATH=/bin:/sbin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH

read -p  "Please input a world:" answer
until [ "$answer" != "yes" ]||[ "$answer" != "YES" ]
do
	read -p "Keep inputing a world:" answer
done
echo "Program teminated!"

```

*Demo2*

```bash
#!/bin/bash
#Program:
#	Use loop to calcute "1+2+...+100" result.
#History:
#	2013/11/12	Anderson	First release
PATH=$PATH
echo PATH

s=0
i=1
while [ "$i" != 100 ]
do
	i=$(($i+1))
	s=$(($s+$i))
done
echo "The result of '1+2+...+100' is ==> $s"
```

## until

```bash
#!/bin/bash
#program:
#	This program will keep ask the user to input string until recive "yes" or "YES"
#History:
# 2013/11/09 Andersion First release
PATH=/bin:/sbin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH

read -p  "Please input a world:" answer
until [ "$answer" != "yes" ]||[ "$answer" != "YES" ]
do
	read -p "Keep inputing a world:" answer
done
echo "Program teminated!"
```


# 11 sheelscripts 的追踪与debug
![](http://o7m5xjmtl.bkt.clouddn.com/14897726879053.jpg)

```bash
$ sh -n  aa.sh
$ sh -x aa.sh
$ sh -v aa.sh
```


