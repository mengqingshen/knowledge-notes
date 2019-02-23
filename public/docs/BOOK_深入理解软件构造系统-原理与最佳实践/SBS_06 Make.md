---
title: SBS_06 Make
categories:
    - 深入理解软件构造系统-原理与最佳实践
tag:
    - 构造系统
---

诞生：1977

## 1 GNU Make 编程语言
GNU Make 语言可以堪称是由 3 种单独的编程语言整合而成，分别是

+ 文件依赖：这是一种基于规则的语法，用来描述文件之间的依赖关系。

```bash
myprog: prog.c lib.c
```

+ Shell 命令：这是封装在每条规则之中的 shell 命令清单，如果发现规则对应的标的文件“过期”了，就执行相应的 shell 命令。

```bash
cp myfile yourfile && cp myfile1 yourfile1
md5 < myfile >>yourfile
touch yourfile.done
```

+ 字符串处理：这是用来操作 CNU Make 变量的语言，例如把变量当作值的列表来处理。

```bash
VARS := $(sort $(filter srcs-% cflags-%, $(.VARIABLES)))
```

### 1.1 makefile 规则：用来建立依赖关系图
**说明：**规则的实际执行状况是由`依赖关系图`和`源文件和标的文件的时间戳`共同决定了。而依赖关系图是根据标的文件名的匹配来实现的，事实上，标的文件可以包含通配符和变量名，因此对匹配规则的查找定位并不总是那么简单。

#### makefile 规则语法
**说明：**一个 makefile 中包含多个规则，每个规则描述如何根据若干`预备输入文件`(prerequisites)，生成特定的`标的文件`(target)。

规则的最基本形式是这样的
```bash
标的：预备输入文件
[tab]shell命令序列
```

#### 依赖关系图
**说明：**依赖关系图决定了某个或某些文件的更新后，哪些规则会被重新执行。

举例说明

**目录关系**

```bash
.
└── src
    ├── add.c
    ├── calc.c
    ├── mult.c
    ├── numbers.h
    └── sub.c
```

**程序结构**
![](http://cdn.mengqingshen.com/SBS_06%20Make/CC65EAA8-844D-4C1E-9D39-F69302AB2232.png)

**依赖关系图**
连线代表依赖关系，依赖的标的可以是`源文件`、`中间文件` 甚至是 `其它规则`。

![](http://cdn.mengqingshen.com/SBS_06%20Make/58DB091B-B53C-44F7-A4FC-08F1C2495228.png)

**规则描述文件**

```bash
calculator: add.o calc.o mult.o sub.o
	gcc -g -o calculator add.o calc.o mult.o sub.o
add.o: add.c numbers.h
	gcc -g -c add.c
calc.o: calc.c numbers.h
	gcc -g -c calc.c
mult.o: mult.c numbers.h
	gcc -g -c mult.c
sub.o: sub.c numbers.h
	gcc -g -c sub.c
```

### 1.2 makefile 规则的类型
GNU Make 是一种灵活而强大的语言，包含许多用来表达文件间关系的语法特性。下面就介绍几种常用的

#### 1.2.1 多个标的文件
**说明：** 规则的左边可以有多个标的。

**应用：** 当左边的多个标的文件有同样的`预备文件集合`，并且可以由相同的 `shell 命令列表`生成，就可以用这种快捷语法。

```bash
file1.o file2.o: source1.c source2.c source3.c
	shell命令列表
```

#### 1.2.2 没有预备文件的规则
**应用：**有时你像定义一个不依赖任何预备文件的标的文件，就可以用这种语法，来定义不与实际磁盘文件关联的`伪标的文件`。

```bash
.PHONE: help # 该指令确保 GNU Make 知道 help 与磁盘文件无关
help: # 显示开发人员可以使用的命令清单
	@echo "Usage: make all ARCH=[i386|mips]"
	@echo "       make clean"
```

#### 1.2.3 有文件名模式的规则
**说明：** 通过使用通配符`%`，一些相似的规则可以合并成一条规则，举例来说

```bash
calculator: add.o calc.o mult.o sub.o
	gcc -g -o calculator add.o calc.o mult.o sub.o
add.o: add.c numbers.h
	gcc -g -c add.c
calc.o: calc.c numbers.h
	gcc -g -c calc.c
mult.o: mult.c numbers.h
	gcc -g -c mult.c
sub.o: sub.c numbers.h
	gcc -g -c sub.c
```

上面的例子中，每个目标文件都依赖于相应的 C 语言文件。规则的标的部分，本质上就是一种匹配语法。通过通配符的匹配方式简化上面的案例，如下

```bash
calculator: add.o calc.o mult.o sub.o
	gcc -g -o calculator add.o calc.o mult.o sub.o
%.o: %.c # 标的文件以 .o 结尾，预备文件以 .c 结尾，且二者的开否字符（柄， stem）完全相同
	gcc -g -c $^
```

#### 1.2.4 只适用于某些文件的规则
**说明：**  就是在为上一节的匹配设置匹配范围。

```bash
calculator: add.o calc.o mult.o sub.o
	gcc -g -o calculator add.o calc.o mult.o sub.o
add.o calc.o mult.o sub.o: %.o: %.c # 指定匹配的清单，缩小匹配的范围，匹配的清单建议使用变量
	gcc -g -c $^
```

#### 1.2.5 有相同标文件的多个匹配
**说明：** 虽然可以在一个规则行中，定义标的文件对应的多个预备文件，单如果把他们切分成多个规则，常常更有用。

```bash
calculator: add.o calc.o mult.o sub.o
	gcc -g -o calculator add.o calc.o mult.o sub.o
add.o calc.o mult.o sub.o: %.o: %.c
	gcc -g -c $^
%.o: numbers.h # 用来补充预备文件
```

### 1.3 makefile 变量
#### 1.3.1 基本用法
**说明：** GNU Make 变量与其它编程语言的变量类似，但有一些独特的行为特征。规则如下

+ 变量的值是通过赋值获得的，赋值有多重形式。
+ 访问变量值的语法是 `$(X)`。
+ 所有变量都是字符串型，且没有所谓的变量声明，变量第一次赋值就是变量的定义过程。
+ 变量是全局类型。
+ 变量名可以包含大小写字母、数组和标点符号（例如 @、^、< 和 >）

```bash
FIRST := Hello there
SECOND := World # components go here
MESSAGE := $(FIRST) $(SECOND)
FILES := add.c sub.c mult.c
$(info $(MESSAGE) - The files are $(FILES)) // $(info …) # Hello there World - The files are add.c sub.c mult.c
```

其中， $(info …) 指令用于在输出设备上显示消息。

#### 1.3.2 赋值语句
**说明：** 有 3 种赋值语句类型

##### (1) 立即求值
**操作符：** :=

**说明：**赋值语句的右边经过完全求值，形成常量字符串，然后赋值给左边的变量。

**应用：** 最现代的编程语言在其赋值语句中，都使用这种立即求值方法。

```bash
FIRST := Hello there
SECOND := World
MESSAGE := $(FIRST) $(SECOND)
```

##### (2) 延迟求值
**操作符：** =

**说明：** 不是立即将其转换为常量字符串，而是知道实际使用变量时再进行求值。

**应用：** 这一特性看上去有点怪异，但这种先定义变量然后再修改其中个别部分的能力，在某些情况下很有用。

```bash
CC := gcc
CFLAGS := -g
CCOMP = $(CC) $(CFLAGS) # 延迟求值
$(info Compiler is $(CCOMP))
CC := i386-linux-gcc
$(info Compiler is $(CCOMP)) # i386-linux-gcc -g
```

##### (3) 条件赋值
**操作符：**?=

**说明：** 如果变量没有值，才会真正执行赋值，否则什么也不做。

**应用：**在将另一个 makefile 引入到自己的 makefile 中，不能确定父文件是否定义了某个变量的情况下，这一特性就很有用。

```bash
CFLAGS := -g
CFLAGS ?= -O # 由于 CFLAGS 已经有了，因此这步赋值会被忽略
```

### 1.4 内置变量和规则
#### 1.4.1 自动变量
**解释：** 内置的变量，变量的值根据随处的环境自动设定，因而称为`自动变量 (automatic variable)`。

列举几个自动变量|值|应用场景
---|---|---
$@|当前规则的`标的文件名`|当规则使用通配符来匹配标的文件名时，用这个自动变量非常方便，无须把任何具体文件名硬编码在规则中。
$<|规则的第一个预备文件名|和 $@ 配合使用，应用于使用了通配符的场景。
$^|规则中所有预备文件的完整清单（各文件名之间以空格隔开）|和 $@ 配合使用，应用于使用了通配符的场景。
$(@D)|标的文件所在目录的绝对路径|当诸如 `mkdir` 等 shell 命令需要操作标的文件所在目录时，这个自动变量时很有用的。
$(@F)|同$@，标的文件的文件名|自动插入标的文件名

```bash
%.o: %.c numbers.h
	gcc -g -o $@ $<
```

#### 1.4.2 内置规则
##### (1) 通配符规则

```bash
SRCS := add.o calc.o mult.o sub.o
PROG := calculator
CC := gcc
CFLAGS := 
OBJS := $(SRCS:.c = .o)

$(PROG):$(OBJS)
	$(CC) $(CFLAGS) -o $@ $^
$(OBJS): numbers.h
## 内置规则 --- 通配符规则，所有目标文件的生成都匹配到这条规则
$(OBJS): %.o: %.c
	$(CC) $(CFLAGS) -o $@ -c $<
```

##### (2) 隐式规则

**说明：**所有指定如何将 c 源文件编译成目标文件的规则，都可以从 makefile 中去掉，因为隐士规则已经处理了这种情况。

```bash
SRCS := add.o calc.o mult.o sub.o
PROG := calculator
CC := gcc
CFLAGS := -g
OBJS := $(SRCS:.c = .o)

$(PROG): $(OBJS)
	$(CC) $(CFLAGS) -o  $@ $^
$(OBJS): numbers.h
```

### 1.5 数据结构与函数
**说明：** 所有GNU Make 变量都是字符串类型，但 GNU Make 提供了许多特性使字符串表达数字、列表、结构等其它数据类型。

#### 1.5.1 字符串处理函数

常用的字符串处理函数|功能描述
---|---
words|对于给定的输入列表，返回列表中单词（以空格区分）的个数
word|对于给定的输入列表，从中摘取出第 n 个单词（下标从0开始）
filter|返回列表中与特定模式相匹配的单词，常用语筛选中与特定文件名模式相匹配的文件子集
patsubst|对于类表中的每个单词，将于特定模式相匹配的单词替换成指定的样子（%表示单词中不变的部分）
addprefix|为列表中的每个单词附加一个前缀字符串
foreach|读取列表中每个单词，并生成新列表（映射表达式可由 GNU Make 中的任何函数调用组成）
dir|对于给定的文件的绝对路径，返回其中的目录部分
nodir|对于给定的文件的绝对路径，返回文件名部分
shell|执行 shell 命令，并以字符串形式返回命令的输出结果

```bash
PROG_NAME := my-calculator # 普通字符串
LIST_OF_SRCS := calc.c main.c math.h lib.c # 列表
COLORS := red FF000 green 00FF00 blue 0000FF purple FF00FF # 字典
ORDERS := 100 green cups 200 blue plates # 结构

## words
NUM_FILES := $(words $(LIST_OF_SRCS)) # 4

## word
SECOND_FILE := $(word 2, $(LIST_OF_SRCS)) # main.c

## filter
C_SRCS := $(filter %.c, $(LIST_OF_SRCS)) # calc.c main.c lib.c

## patsubst
OBJECTS := $(patsubst %.c,%.o, $(C_SRCS)) # calc.o main.o lib.o

## addprefix
OBJ_LIST := $(addprefix objs/, $(OBJECTS)) # objs/calc.o objs/main.o objs/lib.o

## foreach
OBJ_LIST_2 := $(foreach file, $(OBJECTS), objs/$(file)) # objs/calc.o objs/main.o objs/lib.o

## dir
DEFN_PATH := src/headers/idl/interface.idl
DEFN_DIR := $(dir $(DEFN_PATH)) # src/headers/idl/

## notdir
DEFN_BASENAME := $(notdir $(DEFN_PATH)) # interface.idl

## shell
PASSWD_OWNER := $(word 3, $(shell ls -l /etc/passwd)) # root
```

#### 1.5.2 GNU Make 宏
**说明：** CNU Make 也有宏这一概念，定义宏和定义变量类似。通过宏，可以为复杂的 GNU Make 表达式命名，并向表达式传递参数。

**应用：** 利用宏编写自己的 GNU Make 函数，有效地扩展基础语言。

```bash
## 定义宏：查看文件的大小
file_size = $(word 5, $(shell ls -l $(1)))

## 使用宏
PASSWD_SIZE := $(call file_size,/etc/passwd) # 5925
```

#### 1.5.2 define 指令
**说明：** 用来定义一个 shell 命令的封装序列。

**应用：** 在 GNU Make 规则中指定要执行的 shell 命令时，就不必每次都写出这些命令，而是通过调用封住序列的形式。

```bash
## 使用 define 定义一个 shell 命令的封装序列 start-banner
define start-banner
	@echo ==============
	@echo Starting build
	@echo ==============
endif

.PHONY: all
all:
	# 调用 start-banner
	$(start-banner)
	$(MAKE) -C lib1
```

### 1.6 理解构造程序执行流程
#### 1.6.1 make 命令调用后
![](http://cdn.mengqingshen.com/SBS_06%20Make/618FBFA5-B926-482E-8385-01C96C88A858.png)

强调一下，变量在第一阶段赋值，shell 命令在第二阶段执行！

```bash
X := Hello World
print:
	echo X is $(X) # Goodbye
X := Goodbye
```

#### 1.6.2 文件包含和条件编译
**说明：** GNU Make 提供了一些特性，使我们对更灵活地使用调整构造过程 ，它们是

+ 文件包含（类似 c 语言的文件包含）
+ 条件编译（类似 c 语言的条件编译）

它们都在第一阶段，也就是 makefile 解析阶段，就会被处理。

*文件包含*

```bash
FILES := src1.c src2.c
include prog.mk # 将 prog.mk 的内容插入到这里
src.1.o src.2.o: src.h
```

*条件编译*

```bash
CFLAGS := -DPATH
ifdef DEBUG
	CFLAGS += -g
else
	CFLAGS += -o
endif
```

#### 1.6.3 依赖关系图生成算法

![](http://cdn.mengqingshen.com/SBS_06%20Make/64A00628-C75E-481A-B21C-42122EB3B7A2.png)

### 1.7 进一步阅读资料
[在线文档](http://www.gnu.org/software/make/)
入门级指导-Mecklenburg,Robert.2005.《Managing Project with GNU Make》.Sebastopol,CA:O’Reilly
[GMU Make 标准库](http://gmsl.sourceforge.net/)

## 2 现实世界的构造系统场景
### 2.1 源代码放在单个目录中
#### 方案1：最简单
**说明：** 对规模较小的项目来说比较常见。如果要增加新的源代码，只要追加到 SRCS 变量即可。

**缺点：** 当源代码中引入了头文件的情况发生变化时，比如增加了新的头文件或不在需要某个头文件等，需要大量手工调整。

```bash
SRCS := add.c calc.c mult.c sub.c
PROG := calculator
CC := gcc
CFLAGS := -g
OBJS := $(SRCS:.c=.o)

$(PROG):$(OBJS)
	$(CC) $(CFLAGS) -o $@ $^
$(OBJS): numbers.h
```

#### 方案2（方案1的改进版）：自动检查头文件
**说明：**  自动检查头文件，对源文件进行扫描，并计算出正确的依赖关系集合。

这个方案涉及到两个之前没有提到的知识点，先对其简要说明，如下

##### 预备知识
**-MM 选项**
功能： 针对输入的源文件，返回其引用的 .c 或 .h 文件的清单。
应用：*这个清单可以作为一条规则直接应用到 makefile 中。

```bash
$ gcc -MM -g calc.c # calc.o: calc.c numbers.h
```

**-include、sinclude  、include 的区别**
说明： 如果指示符 include 指定的文件不是以斜线开始（绝对路径，如 /usr/src/Makefile... ），而且当前目录下也不存在此文件；make将根据文件名试图在以下几个目录下查找：首先，查找使用命令行选项`-I`或者`—include-dir`指定的目录，如果找到指定的文件，则使用这个文件；否则继续依此搜索以下几个目录（如果其存在）： /usr/gnu/include 、 /usr/local/include 和 /usr/include 。

当在这些目录下都没有找到 include 指定的文件时，make 将会提示一个包含文件未找到的告警提示，但是不会立刻退出。而是继续处理Makefile的后续内容。当完成读取整个 makefile 后，make 将试图使用规则来创建通过指示符 include 指定的但未找到的文件，当不能创建它时（没有创建这个文件的规则），make将提示致命错误并退出。

通常我们在 makefile 中可使用 -include 来代替 include ，来忽略由于包含文件不存在或者无法创建时的错误提示（`-`的意思是告诉 make ，忽略此操作的错误，make 继续执行）。像下边那样：

```bash
-include FILENAMES...
```

使用这种方式时，当所要包含的文件不存在时不会有错误提示，make 也不会退出；除此之外，和第一种方式效果相同。以下是这两种方式的比较：

+ 使用 `include FILENAMES…`，make 程序处理时，如果 `FILENAMES` 列表中的任何一个文件不能正常读取而且不存在一个创建此文件的规则时 make 程序将会提示错误并退出。
+ 使用`-include FILENAMES...`的情况是，当所包含的文件不存在或者不存在一个规则去创建它，make 程序会继续执行，只有真正由于不能正确完成终极目标的重建时（某些必需的目标无法在当前已读取的 makefile 文件内容中找到正确的重建规则），才会提示致命错误并退出。

为了和其它的make程序进行兼容。也可以使用 sinclude 来代替 -include （GNU所支持的方式）。

**linux 命令：sed**
 [sed命令_Linux sed 命令用法详解：功能强大的流式文本编辑器](http://man.linuxde.net/sed)

比如，下面使用 sed 把 `calc.o: calc.c numbers.h` 转换为了 `calc.o calc.h: calc.c numbers.h`。

```bash
$ gcc -MM -g calc.c | sed 's#\(.*\)\.o: #\1.o \1\.d: #g' > $@ # calc.o calc.h: calc.c numbers.h
```

##### 例子
[book_software_build_system_demos/part2/06_make/0602_scene/scene1_single_dir/src at master · laputa-er/book_software_build_system_demos · GitHub](https://github.com/laputa-er/book_software_build_system_demos/tree/master/part2/06_make/0602_scene/scene1_single_dir/src)
通过下面的 makefile，每当 .c 文件或 .h 文件发生变化，都会重新生成 .d 文件，而 .d 包含源文件对头文件的依赖规则描述。由于通过  `-include` 引入了所有的 .d 文件，也就更新了依赖关系图，从而实现了依赖关系的自动更新。

```bash
SRCS := add.c calc.c mult.c sub.c
PROG := calculator
CC := gcc
CFLAGS := -g
OBJS := $(SRCS:.c = .o)

$(PROG):$(OBJS)
	$(CC) $(CFLAGS) -o $@ $^

## 将包含依赖信息的 .d 文件都包含进来
-include $(SRCS:.c=.d)

## 所有 .d 文件都会匹配到这个规则来生成
%.d: %.c
	$(CC) -MM $(CFLAGS) $< | sed 's#\(.*\)\.o: #\1.o \1\.d: #g' > $@
```

#### 方案3：使用 makedepend 命令
**说明：** 该工具本质上本质上与 `gcc -MM` 类似，但它自带用来分析 c 源文件的扫描程序（而非依赖编译器本身）。

###  2.2 源代码放在多个目录中
```bash
.
├── calc # 主程序源码
│   └── calc.c
├── libmath # 静态库源码
│   ├── clock.c
│   ├── letter.c
│   ├── libmath.a
│   └── numbers.c
└── libprint # 静态库源码
    ├── banner.c
    ├── center.c
    ├── libprint.a
    └── normal.c
```

需要的进行如下所示的构造过程。

![](http://cdn.mengqingshen.com/SBS_06%20Make/4BF1FB3B-F143-471A-9711-9A0AADE9F732.png)

#### (1) 方案 a：最简单
**说明：** 以单个目录中的方案为基础编写 makefile ，需要文件都带有目录路径。

**应用：** 对简单程序来说正常有效，但对大型程序难以使用。

下面给出我对这种方案的实现。先看下 makefile 文件
[book_software_build_system_demos/part2/06_make/0602_scene/scene2_mult_dir_a/src at master · laputa-er/book_software_build_system_demos · GitHub](https://github.com/laputa-er/book_software_build_system_demos/tree/master/part2/06_make/0602_scene/scene2_mult_dir_a/src)

```c++
## 静态库
LIBMATH := libmath/libmath.a
LIBPRINT := libprint/libprint.a

## 源文件
CALC_LIST := calc/calc.c
LIBPRINT_LIST := libprint/banner.c libprint/center.c libprint/normal.c
LIBMATH_LIST := libmath/clock.c libmath/letter.c libmath/numbers.c

## 目标文件
CALC_OBJS := $(CALC_LIST:.c=.o)
LIBMATH_OBJS := $(LIBMATH_LIST:.c=.o)
LIBPRINT_OBJS := $(LIBPRINT_LIST:.c=.o)

## 可执行程序
PROG := calculator
CC := gcc
C_FLAGS := -g
LIB_COMMAND := ar -rs

## 规则
$(PROG):$(CALC_OBJS) $(LIBMATH) $(LIBPRINT) # 链接
	$(CC) $(CFLAGS) -o $@ $^
$(LIBMATH):$(LIBMATH_OBJS) # 静态库 libmath
	$(LIB_COMMAND) $@ $^
$(LIBPRINT):$(LIBPRINT_OBJS) # 静态库 libprint
	$(LIB_COMMAND) $@ $^

%.o:%.c # 所有目标文件
	$(CC) -c -o $@ $^
clean:
	rm $(CALC_OBJS) $(LIBMATH_OBJS) $(LIBPRINT_OBJS) $(PROG) $(LIBMATH) $(LIBPRINT)

```

最后看下实际构造情况。

```bash
➜  src git:(master) ✗ make
gcc -c -o calc/calc.o calc/calc.c
gcc -c -o libmath/clock.o libmath/clock.c
gcc -c -o libmath/letter.o libmath/letter.c
gcc -c -o libmath/numbers.o libmath/numbers.c
ar -rs libmath/libmath.a libmath/clock.o libmath/letter.o libmath/numbers.o
gcc -c -o libprint/banner.o libprint/banner.c
gcc -c -o libprint/center.o libprint/center.c
gcc -c -o libprint/normal.o libprint/normal.c
ar -rs libprint/libprint.a libprint/banner.o libprint/center.o libprint/normal.o
gcc  -o calculator calc/calc.o libmath/libmath.a libprint/libprint.a

➜  src git:(master) ✗ tree
.
├── Makefile
├── calc
│   ├── calc.c
│   └── calc.o
├── calculator
├── libmath
│   ├── clock.c
│   ├── clock.o
│   ├── letter.c
│   ├── letter.o
│   ├── libmath.a
│   ├── numbers.c
│   └── numbers.o
└── libprint
    ├── banner.c
    ├── banner.o
    ├── center.c
    ├── center.o
    ├── libprint.a
    ├── normal.c
    └── normal.o
```

**缺点** 

+  依赖关系难以生成。比如如果要像但目录方案那样自动检测头文件依赖情况，就会需要生成 .d 文件。然而 .d 文件中的规则会缺少路径名，像这样 

```bash
clock.o: libmath/clock.c libmath/math.h
```

因此还需要进一步处理才能应用到 makefile 中，从而增加了难度。

+ 多个开发人员围绕单个 makefile 的冲突。

+  无法对程序进行分解。

#### (2) 方案 b：迭代式 make 操作
**说明：** 在每个源文件目录中放一个不同的 makefile ，并用一个高层次 makefile 迭代式地调用每个下级目录的 makefile。

**应用：**软件业中一种常见的解决方案。

**优点** 
+ 容易理解。
+ 每个 makefile 都只需要列出当前目录的文件。
+ 在需要时，如果需要对源树的其它部分进行构造，每个 makefile 还可以迭代式地调用其它 makefile。
+ 在 makefile 中，列出长路径是不必要的，因为所有文件引用都是指向当前目录。
+ 减少了开发人员之间围绕 makefile 修改所产生的冲突。

**缺点**
+ 如果要对部分进行构造，由于每个 makefile 都在单独的进程实例中执行，各自都维护了一个自己的依赖关系图，所有进程都不知道完整的依赖关系图。因此要么每次都全部重新构造造成冗余，要么就可能链接了其它目录过期的文件。
+ 顶层 makefile 必须保证子 makefile 的执行顺序正确，目录关系清晰，规模较小的程序还可以实现，但难以应对几百个目录的规模和复杂的顺序需求。

下面给出这种方案的一个实现。
[book_software_build_system_demos/part2/06_make/0602_scene/scene2_mult_dir_b/src at master · laputa-er/book_software_build_system_demos · GitHub](https://github.com/laputa-er/book_software_build_system_demos/tree/master/part2/06_make/0602_scene/scene2_mult_dir_b/src)

##### Makefile 文件分布情况

```bash
.
├── Makefile
├── calc
│   ├── Makefile
│   ├── calc.c
│   └── calculator
├── libmath
│   ├── Makefile
│   ├── clock.c
│   ├── letter.c
│   ├── math.h
│   └── numbers.c
└── libprint
    ├── Makefile
    ├── banner.c
    ├── center.c
    ├── normal.c
    └── printers.h
```

##### Makefile 详情
*顶层 makefile* 

```bash
################
## 顶层的 makefile
################
.PHONY: all clean

## 必须以正确的顺序对其它 makefile 进行相应的迭代式调用
all:
	$(MAKE) -C libmath
	$(MAKE) -C libprint
	$(MAKE) -C calc
clean:
	rm -rf {calc,libmath,libprint}/*{d,o,a}
```

其中，`make -C 文件夹名`，会调用相应文件夹下的 Makefile。

*calc/Makefile*

+ 编译源文件
+ 链接静态库

```bash
SRCS := calc.c
PROG := calculator
LIBS := ../libmath/libmath.a ../libprint/libprint.a
CC := gcc
CFLAGS := -g
OBJS := $(SRCS:.c=.o)

$(PROG): $(OBJS) $(LIBS)
	$(CC) -o $@ $^
```

*libmath/Makefile*

+ 编译源文件
+ 创建静态库 libmath.a

```bash
SRCS := calc.c
PROG := calculator
LIBS := ../libmath/libmath.a ../libprint/libprint.a
CC := gcc
CFLAGS := -g
OBJS := $(SRCS:.c=.o)

$(PROG): $(OBJS) $(LIBS)
	$(CC) -o $@ $^
```

*libprint/Makefile*

+ 编译源文件
+ 创建静态库 libprint.b

```bash
SRCS =clock.c letter.c numbers.c
LIB = libmath.a
CC = gcc
CFLAGS = -g
OBJS = $(SRCS:.c=.o)

$(LIB): $(OBJS)
	$(AR) -rs $(LIB) $(OBJS)

## 将包含依赖信息的 .d 文件都包含进来
-include $(SRCS:.c=.d)

## 所有 .d 文件都会匹配到这个规则来生成
%.d: %.c
	$(CC) -MM $(CFLAGS) $< | sed 's#\(.*\)\.o: #\1.o \1\.d: #g' > $@

```

##### 实际的构建过程

```bash
➜  src git:(master) ✗ make
/Applications/Xcode.app/Contents/Developer/usr/bin/make -C libmath
gcc -MM -g numbers.c | sed 's#\(.*\)\.o: #\1.o \1\.d: #g' > numbers.d
gcc -MM -g letter.c | sed 's#\(.*\)\.o: #\1.o \1\.d: #g' > letter.d
gcc -MM -g clock.c | sed 's#\(.*\)\.o: #\1.o \1\.d: #g' > clock.d
gcc -g   -c -o clock.o clock.c
gcc -g   -c -o letter.o letter.c
gcc -g   -c -o numbers.o numbers.c
ar -rs libmath.a clock.o letter.o numbers.o
ar: creating archive libmath.a
/Applications/Xcode.app/Contents/Developer/usr/bin/make -C libprint
gcc -MM -g normal.c | sed 's#\(.*\)\.o: #\1.o \1\.d: #g' > normal.d
gcc -MM -g center.c | sed 's#\(.*\)\.o: #\1.o \1\.d: #g' > center.d
gcc -MM -g banner.c | sed 's#\(.*\)\.o: #\1.o \1\.d: #g' > banner.d
gcc -g   -c -o banner.o banner.c
gcc -g   -c -o center.o center.c
gcc -g   -c -o normal.o normal.c
ar -rs libprint.a banner.o center.o normal.o
ar: creating archive libprint.a
/Applications/Xcode.app/Contents/Developer/usr/bin/make -C calc
gcc -g   -c -o calc.o calc.c
gcc -o calculator calc.o ../libmath/libmath.a ../libprint/libprint.a

➜  src git:(master) ✗ tree
.
├── Makefile
├── calc
│   ├── Makefile
│   ├── calc.c
│   ├── calc.o
│   └── calculator
├── libmath
│   ├── Makefile
│   ├── clock.c
│   ├── clock.d
│   ├── clock.o
│   ├── letter.c
│   ├── letter.d
│   ├── letter.o
│   ├── libmath.a
│   ├── math.h
│   ├── numbers.c
│   ├── numbers.d
│   └── numbers.o
└── libprint
    ├── Makefile
    ├── banner.c
    ├── banner.d
    ├── banner.o
    ├── center.c
    ├── center.d
    ├── center.o
    ├── libprint.a
    ├── normal.c
    ├── normal.d
    ├── normal.o
    └── printers.h

3 directories, 29 files
```

#### (3) 方案 c：包含式 make
**说明：** 吸收迭代式 Make 方法的良好经验，通过使用框架替代大量独立的 makefile 文件，确保只有一个 GNU Make 进程实例在执行。这样依赖，就可以充分利用 GNU Make 依赖关系体系的全部能力，不会丢失重要的依赖关系。

**优点**

+ 只有一个 GNU Make 进程实例在运行，启动速度更快。
+ 每个目录仍然只有一个 makefile 来描述本目录文件的构造过程。这样就可以对每个目录的构造描述进行封装，减少修改 makefile 引起的冲突。
+ 有完整的依赖关系图，尖山了产生不正确构造结果的机会。
+ 不存在迭代式 Make 调用顺序的问题。

**缺点：** 增加了构造系统的复杂性，需要开发人员具备丰富的构造经验。


示例， [book_software_build_system_demos/part2/06_make/0602_scene/scene2_mult_dir_c/src at master · laputa-er/book_software_build_system_demos · GitHub](https://github.com/laputa-er/book_software_build_system_demos/tree/master/part2/06_make/0602_scene/scene2_mult_dir_c/src)

![](http://cdn.mengqingshen.com/SBS_06%20Make/B26F6B55-26A7-46BB-A49D-ADF85FBEA46F.png)
![](http://cdn.mengqingshen.com/SBS_06%20Make/DAE6E76E-FFA0-4067-A28A-8A9ABF1D7083.png)
![](http://cdn.mengqingshen.com/SBS_06%20Make/32441DCC-E092-40BB-930F-AE1005D5E51B.png)

**全功能构造系统**
上面的例子仅仅是为了说明包含式 make 方案的核心，要做出一个全功能的构造系统，需要增加一下功能。

+ 用来定义目标文件、源文件和头文件之间依赖关系的 GNU Make 代码（最好使用自动依赖关系分析）。
+ 用来编译代码的规则（需要覆盖内置的 c 编译规则）
+ 用来把目标文件链接成静态程序库的代码。
+ 用来链接形成最终可执行程序的代码（可能编译不知一个程序）。
+ 从子目录启动 GNU Make 进程的能力（目前只有一个 makefile 位于顶层 src 目录）。
+ 对多种 CPU 架构的编译支持。
+  C  编译器标志参数可以用在文件级别，而不是目录级别（即每个文件都可以使用不同的 C 编译器标志参数）。
+ 能够从上级目录向子目录继承编译器参数。
+ …

**建议：** 如果要实现一整套，绝对要做好时间预算。可以参考已有的实现，以他们为起点继续扩展。

### 2.3 定义新的编译工具
**说明：** 如果编译过程中需要加入其它编译器来辅助编译过程，需要 Makefile 中提供对额外的构造过程的支持。

#### 示例
构造过程中使用一种假想的的编译器 mathcomp 。

mathcomp 编译器参数|说明
---|---
-d|输入 .math 文件，生成对其它文件片段 .mathinc 的依赖信息，这些构造信息可以存储在 .dl 文件中。
-c| 输入 .math 文件，生成 .c 文件。
-j | 输入.math 文件，生成 .java 文件。

其中 -d 生成的 .dl 文件内容类似下面这样

```bash
equations.dl equations.c: equations.math equ1.mathinc equ2.mathinc
```

**项目目录**

```bash
.
└── src
    ├── Makefile
    ├── calculator.c
    ├── equ1.mathinc
    ├── equ2.mathinc
    └── equations.math
```

**构造过程**
![](http://cdn.mengqingshen.com/SBS_06%20Make/822F7514-D4E2-4A0F-B2BE-F5C5F3B649C3.png)

**依赖关系图**
![](http://cdn.mengqingshen.com/SBS_06%20Make/2A4A5092-50A0-4D26-94E6-196CD62B606E.png)


*Makefile*
```bash
############################################################
## 1. 一份源文件清单，以 .math 文本格式保存，由 mathcomp 编译器读取。
## 2. 一套 GNU Make 规则，其中描述了如何把 .math 文件编译成 .c 文件。
## 3. 一种新的依赖关系文件（后缀名为 .dl），其中记录了 .math 文件与其所依赖的 .mathinc 文件之间的关系。
############################################################

## mathcomp 的绝对路径（不依赖 $PATH 变量是否正确设置）
MATHCOMP := /tools/bin/mathcomp
CC := gcc

## .math 源文件清单
MATHSRC := equtions.math

CSRC := calculator.c
PROG := calculator
OBJS := $(CSRC:.c=.o) $(MATHSRC:.math=.o)
$(PROG): $(OBJS)
	$(CC) -o $@ $^

## 生成 .c 文件的依赖关系规则
%.c: %.math
	$(MATHCOMP) -c $<

-include $(CSRC:.c=.d)

## 引入.math 对 .mathinc 的依赖
-include $(MATHSRC:.math=.dl)

%.d: %c
	@$(CC) -MM $(CPPFLAGS) $< | sed 's#\(.*\)\.o: #\1.o \1.d: #g' > $@

## 通过生成所包含的其它片段的情况，实现自动依赖检测
%.dl: %.math
	echo -n "$@ $(*F).c: " > $@; \
	$(MATHCOMP) -d $< >> $@
```

### 2.4 针对多个变量进行构造
[如何在Mac上做嵌入式开发？ - 简书](http://www.jianshu.com/p/f044c14777c5)
[GNU ARM Embedded Toolchain in Launchpad](https://launchpad.net/gcc-arm-embedded)

举例如下，通过设置 $(PLATFORM) 的值来实现的多目标树构造系统。

```bash
.
├── Makefile
├── add.c
├── calc.c
├── mult.c
├── numbers.h
└── sub.c
```

#### 交叉构造过程示意图
![](http://cdn.mengqingshen.com/SBS_06%20Make/19CFF532-32E7-42D3-87D7-C26F388C70CC.png)

#### 依赖关系图
![](http://cdn.mengqingshen.com/SBS_06%20Make/B612B82D-4D36-46E0-AE4B-BC595952CAC8.png)

#### Makefile 实现

```bash
SRCS := add.c calc.c mult.c sub.c
PROG := calculator
CFLAGS := -g

## 提供了 PLATFORM 默认值，用户不在命令行指定的话，默认 i386(其实也可以用 = ，因为在命令行定义的任何变量都会自动覆盖 make file中的值)
PLATFORM ?= i386

## 有效平台列表
VALID_PLATFORMS := i386 powerpc alpha

## 对 $(PLATFORM) 的值的有效性进行检验，如果不在有效平台列表中，则显示相应的错误提示
ifeq ($(filter $(PLATFORM), $(VALID_PLATFORMS)),)
	$(error Invalid PLATFORM: $(PLATFORM))
endif

## 将不同架构平台的目标文件放在与架构关联的目录中
OBJDIR := obj/$(PLATFORM)
## 确保对应架构的目标文件的存放目录存在
$(shell mkdir -p $(OBJDIR))

## 使用合适的编译器
CC := gcc-$(PLATFORM)
## 目标文件清单
OBJS := $(addprefix $(OBJDIR)/, $(SRCS:.c=.o))

$(OBJDIR)/$(PROG): $(OBJS)
	gcc $(CFLAGS) -o $@ $^

$(OBJDIR)/%o: %c
	gcc -c -o $@ $<

$(OBJS): numbers.h

.PHONY = clean
clean:
	rm -rf obj
```

#### 世纪构造过程

```bash
➜  scene4_mult_var git:(master) ✗ make
gcc -c -o obj/i386/add.o add.c
gcc -c -o obj/i386/calc.o calc.c
gcc -c -o obj/i386/mult.o mult.c
gcc -c -o obj/i386/sub.o sub.c
gcc -g -o obj/i386/calculator obj/i386/add.o obj/i386/calc.o obj/i386/mult.o obj/i386/sub.o
➜  scene4_mult_var git:(master) ✗ make PLATFORM=powerpc
gcc -c -o obj/powerpc/add.o add.c
gcc -c -o obj/powerpc/calc.o calc.c
gcc -c -o obj/powerpc/mult.o mult.c
gcc -c -o obj/powerpc/sub.o sub.c
gcc -g -o obj/powerpc/calculator obj/powerpc/add.o obj/powerpc/calc.o obj/powerpc/mult.o obj/powerpc/sub.o
➜  scene4_mult_var git:(master) ✗ make PLATFORM=alpha
gcc -c -o obj/alpha/add.o add.c
gcc -c -o obj/alpha/calc.o calc.c
gcc -c -o obj/alpha/mult.o mult.c
gcc -c -o obj/alpha/sub.o sub.c
gcc -g -o obj/alpha/calculator obj/alpha/add.o obj/alpha/calc.o obj/alpha/mult.o obj/alpha/sub.o
➜  scene4_mult_var git:(master) ✗ tree
.
├── add.c
├── calc.c
├── makefile
├── mult.c
├── numbers.h
├── obj
│   ├── alpha
│   │   ├── add.o
│   │   ├── calc.o
│   │   ├── calculator
│   │   ├── mult.o
│   │   └── sub.o
│   ├── i386
│   │   ├── add.o
│   │   ├── calc.o
│   │   ├── calculator
│   │   ├── mult.o
│   │   └── sub.o
│   └── powerpc
│       ├── add.o
│       ├── calc.o
│       ├── calculator
│       ├── mult.o
│       └── sub.o
└── sub.c

4 directories, 21 files
```

### 2.5 清除构造树
**说明：** 清除操作必须仅针对构造过程中生成的文件，采用那种方式取决于构造系统的工作机制。

#### 迭代式 Make 系统
**清除机制：** 每个 makefile 都负责生成本目录的目标文件，因此，它也应当负责清除本目录中的目标文件。

例如,  [book_software_build_system_demos/part2/06_make/0602_scene/scene2_mult_dir_b/src at master · laputa-er/book_software_build_system_demos · GitHub](https://github.com/laputa-er/book_software_build_system_demos/tree/master/part2/06_make/0602_scene/scene2_mult_dir_b/src)

```bash
.
└── src
    ├── Makefile #
    ├── calc
    │   ├── Makefile
    │   ├── calc.c
    │   └── calculator
    ├── libmath
    │   ├── Makefile
    │   ├── clock.c
    │   ├── letter.c
    │   ├── math.h
    │   └── numbers.c
    └── libprint
        ├── Makefile
        ├── banner.c
        ├── center.c
        ├── normal.c
        └── printers.h
```


*顶层 makefile： 执行每个子目录下的 Makefile 的 clean 规则*

```bash
...

.PHONY: clean
clean: 
	$(MAKE) -C libmath clean
	$(MAKE) -C libprint clean
	$(MAKE) -C calc clean
```

*以 `libmath/Makefile`为例，子目录下的 Makefile 定义实际清除文件的规则*

```bash
...

.PHONY: clean
clean:
	rm -f $(OBJS) $(LIB)
```

实际清除过程如下

```bash
➜  src git:(master) ✗ make clean
/Applications/Xcode.app/Contents/Developer/usr/bin/make -C libmath clean
rm -f clock.o letter.o numbers.o libmath.a *.d
/Applications/Xcode.app/Contents/Developer/usr/bin/make -C libprint clean
rm -f banner.o center.o normal.o libprint.a *.d
/Applications/Xcode.a

```


#### 包含式 Make 系统
**清除机制：** 由于拥有已编译的源文件的完整清单，因此也知道目标文件的完整集合。即便是更复杂的情况，也可以通过一些代码逻辑记录文件名，并过滤出需要删除的文件的路径，今儿将他们集中清除。

**好的实践：** 下面给出一些清除构造系统的好的原则

+ clean 标的定义好后，先完全构造，然后测地清除，比对下文件列表，确保没有遗漏。
+ 最好把所有生成的文件保存在特定的目录，而不是源文件目录中，从而简化清除实现。

### 2.6 对不正确的构造结果进行调试

#### GNU Make 提供了一些调试选项

调试选项|说明
---|---
make -n|显示要执行的 shell 命令清单，但不实际执行这些命令。
make -p|显示 GNU Make 内部数据库的内容。其中包括每个 makefile 中定义的规则和变量的完整清单，以及 GNU Make 的内置规则。其中还记录了行号信息，有注意轻松追踪到各种定义所在的位置。
make -d| 显示 GNU Make 的模式匹配算法在解析和执行 makefile 过程中形成的跟踪日志。这些输出信息会非常冗长，但其中提供了你需要知道的一切。

#### 打印调试 - $(warning)
**说明：** 使用 `$(warning)`函数，在程序输出中显示有用的信息。

**返回值：** 不返回任何值，因此可以插到 makefile 中允许出现函数的任何地方。


例如， 

```bash
.
├── add.c
├── calc.c
├── makefile
├── mult.c
├── numbers.h
└── sub.c
```

makefile 如下

```bash
SRCS := add.c calc.c mult.c sub.c
PROG := calculator
CC := gcc

## 在变量定义中使用 $(warning) 函数，结合延迟赋值 = ，当系统调用该变量时显示适当消息
CFLAGS = $(warning Accessing CFLAGS) -g # CFLAGS := -g

## 规则下的 shell 列表是调用 $(SHELL)变量表示的 shell 程序执行的，因此任何规则下的 shell 列表的执行都会触发打印信息
SHELL = $(warning Target is $@) /bin/sh

OBJS := $(SRCS:.c=.o)

$(PROG):$(OBJS)
	$(CC) $(CFLAGS) -o $@ $^
$(OBJS): numbers.h
clean:
	rm $(PROG) $(OBJS) $(SRCS:.c=.d)
```

构造时输出信息如下

```bash
$ make
make: Accessing CFLAGS
makefile:9: Target is add.o
gcc  -g    -c -o add.o add.c
make: Accessing CFLAGS
makefile:9: Target is calc.o
gcc  -g    -c -o calc.o calc.c
make: Accessing CFLAGS
makefile:9: Target is mult.o
gcc  -g    -c -o mult.o mult.c
make: Accessing CFLAGS
makefile:9: Target is sub.o
gcc  -g    -c -o sub.o sub.c
makefile:14: Accessing CFLAGS
makefile:14: Target is calculator
gcc  -g  -o calculator add.o calc.o mult.o sub.o
```

#### 第三方调试工具
**说明：** 在调试复杂的 makefile 时，可以考虑使用第三方工具，比如  [GNU Make Debugger](http://gmd.sourceforget.net)

+ 可以交互式地打印变量
+ 找出变量是如何定义的
+ 对特定的 makefile  规则设置断点

## 3 赞扬和批评

### 3.1 赞扬

+ 得到广泛支持
+ 运行速度极快
+ 采用可移植语法
+ 提供全功能的编程语言
+ 有史以来第一种构造工具

### 3.2 批评

+ 语言设计前后不一致
+ 没有标准框架
+ 缺乏可移植性
+ 调试困难
+ 语言完整性与易用性的权衡

### 3.3 评价
**质量指标**

+ 易用性： 差
+ 正确性：差
+ 性能：优
+ 可伸缩性：优

**原则**
+ c/c++：对于已经使用 Make 构系统的旧有软件，可以考虑使用 GNU Make 。单如果要为 c/c++ 软件编写一套全新的构造系统，应到首选 SCons 或 CMake 。
+ java: ant
+ c# : MS Build

**注意：** 这些标准都是主观的。

## 4 其他类似工具
### 4.1 Berkeley Make 工具 
**诞生：** 20 世纪 70 年代。

**应用平台：**  BSD 系统（包括其它变体 BSD 系统）。
![](http://cdn.mengqingshen.com/SBS_06%20Make/69A824BA-56FE-45BD-B0D5-3307DFE2CB8B.png)

#### 用法
**说明：** 与 GNU Make 基本相同，差异体主要体现在一下两点
区别|Berkeley Maker| GNU Make
---|---|---
 对变量的操作方式|使用函数|使用修饰符
是否支持条件和循环|是|否

*修饰符（modifiers）*

```bash
## 从文件名序列中取出各个文件名的后缀
$(MY_VAR:E) # $(suffix $(MY_VAR))

## 从文件名徐磊中取出各个文件的目录部分
$(MY_VAR:H) # $(dir $(MY_VAR))

## 以指定模式过滤字符串中的单词，过滤出符合模式的单词
$(MY_VAR:M<模式>) # $(filter <模式>,$(MY_VAR))
```

*条件和循环*

```bash
## -----------------------------------------------------------------------
## 这个 makefile 的执行结果是各字目录中所有 Sub.mk 文件都被包含到顶层 makefile 中。
## ------------------------------------------------------------------------
SUBDIRS = application database libraries storage
ALLTARGS = 

.for SUBDIR in $(SUBDIRS)
SUBMK = $(SUBDIR)/Sub.mk
.if exists($(SUBMK))
.include "$(SUBMK)"
ALLTARGS += make-$(SUBDIR)
.endif
.endfor

all: $(ALLTARGS)
	@echo All targets up to date
```

### 4.2  NMake
**说明：** 是 Make 的另一种变体，一般是微软 Visual Studio 的组成部分。

**应用：** 开发人员使用 Visual Studio 图形化用户界面完成日常开发工作，而 NMake则更多用于面向批处理的、从命令行执行的任务，例如软件大包。由于微软 MS Build 工具，NMake 用得更少了。

**语法：** NMake 提供了与 GNU Male 和 Berkeley Make 相同的基本语法，特别是在规则和变量的定义方面。但其 shell 命令明显是面向 Windows 命令提示符的，而且使用 Visual Studio 的编译工具。

### 4.3 ElectricAccelerator 和 Spark Build
**说明：** 来自 `Electric Cloud` 公司的两款产品。

#### ElectricAccelerator
**说明：** 商业化工具，可以加速软件构造过程。

**原理：** 通过把任务分发给网络集群中的多个 CPU ，并协调各项任务对磁盘文件的访问，确保它们按照正确顺序执行。从而实现加速目的。

**应用：** 可以解析 GNU Make 和 NMake 语法，因此旧有构造系统的用户可以利用这一工具，花少量代价实现性能大幅增长。

#### Spark Build
**说明：** ElectricAccelerator 的功能缩水版，用来解决 GNU Make 的一些基础缺陷。

**原理：** 通过生成依赖关系数据库，记录构造过程的有用信息，方便构造过程分析。

**应用：** 在调试诸如依赖挂你或构造速度慢等 makefile 问题时，能够发挥特别有用的用途。

**扩展：** Spark Build Insight 是配合使用的一个图形户工具，利用 Sparl Build 生成的信息可生成整个构造过程的总体视图。

