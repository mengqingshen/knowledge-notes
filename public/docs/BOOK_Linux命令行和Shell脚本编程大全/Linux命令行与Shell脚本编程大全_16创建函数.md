---
title: 16	创建函数
categories: [Linux命令行和Shell脚本编程大全]
tag:
  - shell

date: 2015-07-09 21:33
---


**函数（function）：**可以起个名字并在代码中的任何位置重用的代码块。
# 1	基本的简本函数
## 1.1	创建函数
**规则：**

+ 函数定义不必是shell脚本中最前面的事
+ 如果在函数被定义前使用函数，会收到一条错误信息
+ 函数名必须是唯一的，因为如果重新定义了函数，新定义将会覆盖原来函数的定义，而不会产生任何错误信息。
### 两种方式
*格式一*：采用关键字`function`，后跟分配给该代码的函数名。

```bash
function name{
	commands
}
```

*格式二*：函数名后跟圆括号

```bash
name(){
	commands
}
```

## 1.2	使用函数
**注意：**函数定义不必是shell脚本中最前面的事，但如果在函数被定义前使用函数，会收到一条错误信息。

```bash
!/bin/bash

function func1{
	echo "This is an example of a function"
}
count = 1
while [$count -le 5]
do
	func1
	count=$[$count + 1]
done

echo "This is the end of the loop"
func1
echo "Now this is the end of the script"
```

# 2	返回值
**状态码：**bash shell会把函数但做小型脚本，运行结束时回返回一个退出状态码。有3种不同的方式来为函数生成退出状态码。
## 2.1	默认退出状态码
**说明：**默认情况下，函数的退出状态码是函数中最后一条命令返回的退出状态码。在函数执行结束后，你可以用标准的`$?`变量来决定函数的退出状态码。
**注意：**使用函数默认退出状态码是很危险的，因为无法判断函数中其它命令是否运行成功。

```bash
!/bin/bash

func1(){
	ls -l badfile
	echo "This was a test of a bad command"
}
echo "testing the function:"
func1
echo "The exit status is: $?"
```

## 2.2	使用return命令
**说明:**bash shell允许使用return命令退出函数并返回特定的退出状态码。return命令允许制定一个整数值来定义函数的退出状态码，从而提供了编程设定函数退出状态码的简便途径。
**限制：**

+ 函数一结束就取返回值，如果在用`$?`提取函数返回值之前执行了其他命令，函数的返回值可能会丢失。
+ 退出状态码必须在0~255之间

**注意：**如果要返回较大的整数值或者字符串的值的话，就不能用这种返回值的方法了。

```bash
!/bin/bash

function db1{
	read - p "Enter a value:" value
	echo "doubling the value"
	return $[$value * 2]
}
db1
echo "The new value is $?"
```

## 2.3	使用函数输出
**说明：**使用变量捕捉函数的输出而不是看函数的退出状态码。
**推荐：**通过这种方法，还可以返回浮点数和字符串值。这让它非常适合返回函数值。

```bash
!/bin/bash

function db1{
	read - p "Enter a value:" value
	echo $[$value * 2]
}
result = `db1`
echo "The new value is $result"
```

# 3	在函数中使用变量
## 3.1	 向函数传递参数
*在脚本中完成参数的传递*

```bash
#!/bin/bash

# 没有参数或多于两个参数：显示-1
# 一个参数：会计算其自身和自身相加
# 两个参数：计算两个参数的和
function addem{
	if [ $# -eq 0 ]|| [ $# -gt 2 ]
	then
		echo -1
	elif [ $# -eq 1 ]
	then 
		echo $[ $1 + $1 ]
	else
		echo $[ $1 + $2 ]
	fi
}
# 计算10+15并将结果赋给value
echo -n "Adding 10 and 15:"
value = `addem 10 15`
# 查看结果
echo $value
```

*在命令行完成参数的传递*
**注意：**要在函数中使用命令行传递的参数，必须在脚本中手动将其传递进去。

```bash
#!/bin/bash
# trying to access script parameters inside a function

function func7{
	echo $[ $1 * $2 ]
}

if[ $# -eq 2 ]
then
	value=`badfunc1`
	echo "The result is $value"
else
	echo "Usage:badtest1 a b"
fi
```


```bash
$ ./test7
	Usage:badtest1 a b
$ ./test7 10 15
	The result is 150
```

## 3.2	在函数中处理函数
**函数作用域：**函数中定义的变量可以跟普通变量的作用域不同。
**变量类型：**

+ **全局变量**：在shell脚本中任何地方都有效的变量
+ **局部变量**：函数内部的任何变量都可以通过`local`声明为局部变量

### 全局变量
**说明：**默认情况下，你在脚本中定义的任何变量都是全局变量。在函数外定义的变量可在函数内正常访问。

```bash
#!/bin/bash
# using a global variable to pass a value

function db1{
	value = $[ $value * 2 ]
}
read -p "Enter a value: " value
db1
echo "The new value is : $value"
```

### 局部变量
**声明方式：**`local 变量名`
**声明位置：**函数内部
**规则：**

+ local关键字保证了变量只出现在该函数中
+ 如果脚本中, 在该函数之外有同样名字的变量，那么 shell 将会保持这两个变量的值是分离的

```bash
#!/bin/bash
# demonstrating the local keyword

function func1{
	#不会影响在主体脚本中赋给$temp变量的值
	local temp=$[ $value + 5 ]
	result = $[ $temp * 2 ]
}
temp=4
value=6

func1
echo "The result is $result"
if [ $temp -gt $value ]
then 
	echo "temp is larger"
else
	echo "temp is smaller"
fi
```

# 4	数组变量和函数
**说明：**在函数中使用数组变量值稍微麻烦一些，而且需要做一些特殊考虑。
## 4.1	向函数传数组参数
**规则：**

+ 将数组变量当作单个参数传递的话，它不会起作用
+ 需要将数组的所有单个值放在函数后面作为参数
+ 在函数内部，数组仍然可以像其他数组一样使用

```bash
!/bin/bash
 adding values in an array

# 计算数组元素的和
function addArr {
	local sum=0
	local newarray
	# 获得命令行中的所有参数
	newarray=(`echo "$@"`)
	
	# 遍历数组求和
	for value in ${newarray[*]}
	do 
		sum=$[ $um + $value ] 
	done
	# 显示计算结果
	echo $sum
}

myarray=(1 2 3 4 5)
echo "The original array is: ${myarray[*]}"

# 将数组转换为参数形式（以空格作为间隔的字符串）
arg1=`echo ${myarray[*]}`

# 调用函数
result=`addArray $arg1`
```

## 4.2	从函数返回数组
**说明：**函数用`echo`语句来按正确顺序输出单个数组值，然后脚本再将它们重新放进一个新的数组变量中。

```bash
#!/bin/bash
# returning an array value
function arraydblr{
	local origarray
	local newarray
	local elements
	local i
	origarray=(`echo "$@"`)
	newarray=(`echo "$@"`)
	elements=$[ $# - 1  ]	# 命令行中所有参数的个数减去1（也就是数组的最大下标）

	# 将原本数组的每一项的2倍放到新的数组中
	for(( i = 0; i<= $elements; i++)){
		newarray[$i]=$[ ${origarray[$i]} * 2 ]
	}
	echo ${newarray[*]}
}

echo "The original array is: ${myarray[*]}"

# 原数组的参数形式
arg1=`echo ${myarray[*]}`

# 调用函数，返回新数组
result=(`arraydblr $arg1`)

echo "The new array is: ${result[*]}"
```

# 5	函数递归
**说明：**局部函数变量提供的一个特性是自成体系（self-containment）。
**递归：**通常递归函数都有一个最终可以迭代的基准值。许多高级数学算法用递归来一级一级地降解复杂的方程，直到基准值定义的那级。
**自成体系（seelf-containment）：**自成体系的函数不需要使用任何外部资源，除了脚本在命令行上传给它的变量。

```bash
function factorial {
	if [ $1 -eq 1 ]
	then
		echo 1
	else
		local temp=$[ $1 - 1 ]
		local result=`factorial $temp`
		echo $[ $result * $1 ]
	fi
}
read -p "Enter value: " value
result=`factorial $value`
echo "The factorial $value is: $result"
```

# 6	创建库
**说明：**bash shell允许创建函数库文件，然后再需要时再多个脚本中引用该文件。使用函数库的关键在于`source`命令。
**引入库文件：**可以使用`source`命令来在`shell`脚本中运行库文件脚本。`source`命令会在当前的shell上下文中执行命令，而不是创建一个新的shell来执行命令。
**点操作符（dot operator）：**`source`命令有个快捷别名，称作点操作符，使用方式：`. ./myfuncs`。
**注意：**如果给函数起了个跟内建命令或另一个命令相同的名字，函数将会覆盖原来的名字。

*myfuncs.sh*

```bash
function addem{
	echo $[ $1 + $2 ]
}
```

*test.sh*

```bash
!/bin/bash
# using functions defined in a library file
. ./myfuncs	#执行库文件

result=`addem 10 15`
echo "The result is $result"
```

# 7	在命令行使用函数
## 7.1	在命令行上创建函数
**缺点：**当退出shell时，函数就消失了。
### *方法1:*在一行内定义整个函数
**说明：**每个命令后面要加个`;`，这样shell就能知道在哪里分开命令了。

```bash
定义
$ function doubleit{ read -p "Enter value:" value ; echo $[ $value * 2 ]; }

调用
$ doubleit
	Enter value :20
	40
```

### *方法2:*用多行定义函数
**说明：**

+ bash shell会使用次提示符来提示输入更多命令
+ 不必再每个命令后面添加`;`
+ 在函数的尾部使用`}`，shell就会知道你已经完成了函数的定义

```bash
$ function multem{
 echo $[ $1 * $2 ]
}
$ multem 2 5
	10
```

## 7.2	在.bashrc文件中定义函数
**说明：**bash shell会在每次启动时在主目录查找这个文件，不管是交互式的函数还是从现有shell中启动一个新的shell。
**特点：**shell还会将定义号的函数传给子shell进程，这样这些函数在该shell会话中的任何shell脚本中也可以用。
### 1.	直接定义函数
**注意：**许多Linux发行版已经在.bashrc文件中定义了一些东西了，所以注意别删掉这些内容，只要在已有文件的末尾加上你写的函数就行。

*.bashrc*

```bash
# Source global definitions
if [ -r /etc/bashrc ]:then
	. /etc/bashrc
fi

function adden{
	echo $[ $1 + $2 ]
}
```

### 2.读取函数文件
**注意：**确保引用库文件路径正确。

```bash
 Source global definitions
if [ -r /etc/bashrc ]:then
	. /etc/bashrc
fi

. /home/rich/libraries/myfuncs
```



