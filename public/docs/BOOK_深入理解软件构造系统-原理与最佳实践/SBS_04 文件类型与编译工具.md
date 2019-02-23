---
title: SBS_04 文件类型与编译工具
categories:
    - 深入理解软件构造系统-原理与最佳实践
tag:
    - 构造系统
---

传统编译型软件的总体示意图，展示了源文件被编译成目标文件
![](http://cdn.mengqingshen.com/SBS_04%20%E6%96%87%E4%BB%B6%E7%B1%BB%E5%9E%8B%E4%B8%8E%E7%BC%96%E8%AF%91%E5%B7%A5%E5%85%B7/E5ADC1DD-4985-413D-B2A2-49935E2C4992.png)

# 1 c/c++
 **C 语言简介**
面世：1969
诞生定位：UNIX 操作系统的语言
最新版本：C99
特点：不提供垃圾回收、多线程支持等功能，也没有任何内置的复杂数据类型，是一门紧凑而高效的语言。
应用：目前新开发的 c 代码最常用于 CPU 性能要求高，或直接操作计算机硬件的场合，比如嵌入式设备。

**C++ 语言简介**
面世：1980年代早期
诞生定位：为基本的 C 语言增加面相对象的概念， C 的超集。
特点：包含了类、继承、模版的概念，以及标准 C 语言中未提供的复杂数据结构。
应用：相比 C，C++ 更适合编程开发，当谈它仍然支持嵌入式系统和高性能计算的开发。

## 1.1 编译工具
通常，能够编译 C 语言的编译器同时也支持 C++，比如：

+ GCC（GNU 工具集，GNV Compiler Collection）
+ 微软的 Visual Studio C++ 编译器
+ Green Hills 编译器
+ Intel C++ 编译器

### GCC
**发布：** 发布于 1987 年

**地位：** 编译开源软件的事实标准，并广泛用于商业软件开发。

**优势：** 可以生成多种 CPU 类型的目标代码。

### GCC 的工具链
按必要顺序调用相关工具，这个过程构成一个链条，称为`工具链` 方法。组成部分有

1）C 预处理器（C Preprocessor），用于扩展宏定义。
2）C 编译器（C Compiler），用于把源代码转译成汇编语言
3）汇编器（assembler），用于把汇编语言转译成目标文件
4）链接器（linker），用于把不同的目标文件联结成单个可执行程序

## 1.2 源文件
**说明：** C 语言有两种类型的文件

+ C 源文件（.c）：包含对函数和全局变量的定义
+ C 头文件（.h）：包含类型、宏、常量定义和函数声明

### 1.2.1 示例代码

```bash
.
├── hello.c # c source file
├── hello.h # c header file
├── main.c # c source file
└── makefile
```

#### main.c

```c
#include "hello.h"

int main(int argc, char *argv[])
{
	if (MAX(1, 2) == 2)
	{
		hello("Hello");
	}
	return 0;
}
```

#### hello.h

```c
// extern 暗示这个函数可能在别的源文件里定义, 这样一来就是，在程序中取代include “*.h”来声明函数
// 在一些复杂的项目中，比较习惯在所有的函数声明前添加 extern 修饰，以防止遗漏包含头文件而导致的编译错误。
// 如果在函数定义的地方带有关键字extern，表示该函数会提供给外部文件使用，其实有些编译器是默认每个函数都是extern类型的，反之是static类型
extern void hello(const char *string);

#define MAX(a, b)((a) > (b) ? (a) : (b))
```

#### hello.c

```c
#include "hello.h"
#include <stdio.h>

void hello(const char *string)
{
	printf("Hello %s\n", string);
}
```

#### makefile

```bash
SRCS = main.c hello.c
OBJS = $(SRCS:.c=.o)
PROG = demo
CC = gcc
CFLAGS = -c

$(PROG): $(OBJS)
	$(CC) -o $@ $^
main.o: main.c hello.h
	$(CC) $(CFLAGS)  main.c
hello.o: hello.c hello.h
	$(CC) $(CFLAGS) hello.c
clean:
	rm -f $(OBJS) $(PROG)
```

### 1.2.2 -c 选项
**功能：** 将源文件编译为目标文件。

```bash
# 编译前
$ tree
.
├── hello.c
├── hello.h
├── main.c
└── makefile

# 编译
$ gcc -c hello.c
$ gcc -c main.c

# 编译后
$ tree
.
├── hello.c
├── hello.h
├── hello.o # 目标文件
├── main.c
├── main.o # 目标文件
└── makefile
```

### 1.2.3 -E 选项
**功能：** 输入源文件，只处理 `include` 指令和宏扩展，不进行实际的编译。将处理后的文本在终端输出。

**应用：** 对预处理器的输出内容进行检查，可以查看貌似由宏、类型或常量定义产生的问题。

例如，`gcc -E main.c`，输出如下：

```c
# 1 "main.c"
# 1 "<built-in>" 1
# 1 "<built-in>" 3
# 330 "<built-in>" 3
# 1 "<command line>" 1
# 1 "<built-in>" 2
# 1 "main.c" 2
# 1 "./hello.h" 1



extern void hello(const char *string);
# 2 "main.c" 2

int main(int argc, char *argv[])
{
 if (((1) > (2) ? (1) : (2)) == 2)
 {
  hello("Hello");
 }
 return 0;
}
```

## 1.3 汇编语言文件
### -S 选项
**功能：** 输入源文件，输出汇编语言文件（.s）。

**应用：**如果怀疑编译器编译代码出错，而且你了解汇编语言，则可以通过这个选项判断是否编译器有问题。

例如，`gcc -S hello.c` ，生成 `hello.s`，该文件内容如下

```txt
        .section        __TEXT,__text,regular,pure_instructions
        .macosx_version_min 10, 12
        .globl  _hello
        .align  4, 0x90
_hello:                                 ## @hello
        .cfi_startproc
## BB#0:
        pushq   %rbp
Ltmp0:
        .cfi_def_cfa_offset 16
Ltmp1:
        .cfi_offset %rbp, -16
        movq    %rsp, %rbp
Ltmp2:
        .cfi_def_cfa_register %rbp
        subq    $16, %rsp
        leaq    L_.str(%rip), %rax
        movq    %rdi, -8(%rbp)
        movq    -8(%rbp), %rsi
        movq    %rax, %rdi
        movb    $0, %al
        callq   _printf
        movl    %eax, -12(%rbp)         ## 4-byte Spill
        addq    $16, %rsp
        popq    %rbp
        retq
        .cfi_endproc

        .section        __TEXT,__cstring,cstring_literals
L_.str:                                 ## @.str
        .asciz  "Hello %s\n"


.subsections_via_symbols
```

## 1.4 目标文件
**说明：** 目标文件是机器码指令的容器，它不具备在计算机上执行的条件，因为还需要与其他目标文件以及所有必需的库文件进行链接。

### 1.4.1 -c 选项
**功能：** 输入源文件，生成目标文件。

例如，`gcc -c hello.c`，生成 `hello.o`

### 1.4.2 分析目标文件 - file 指令
**功能：** 输入文件，输出文件的高层次信息。

例如，`file hello.o`，输出如下

```bash
hello.o: Mach-O 64-bit object x86_64
```

### 1.4.3 分析目标文件 - nm 命令
**功能：** 输入目标文件，输出函数或变量的定义情况。

**应用：** 通过对多有目标文件运行 nm 命令，就可以定位缺失的负号是在哪里引用的，在哪里定义的。

例如，`nm hello.o`，输出如下

```bash
0000000000000000 T _hello # hello.o 中包含 hello 函数的定义
                 U _printf # 要求 printf 函数应当定义在某些其他目标文件中，因为该文件中未定义
```

### 1.4.4 分析目标文件 - objdump 命令
**功能：** objdump 命令有许多不同选项，可以提供目标文件更详细的信息，是 file 和 nm 命令的超集;  也提供了把机器码反汇编成汇编语言的能力。

**应用：** 如果怀疑汇编器生成的机器码指令有错，就可以用它进行检查。

### 1.4.5 分析目标文件 - hexdump 命令
**功能：**检查文件的每一个原始字节，这种方法是比较原始的。

**应用：**如果由于某种原因（例如文件损坏了）导致 objjump 命令实效，那么 hexdump 命令可能就是最后的希望。

## 1.5 可执行程序
### 1.5.1 -o 选项
**功能：** 该选项可以只完成链接工作，也可以一次执行整个工具链。

#### 仅完成链接
**说明：**用 -o 选项来提供程序名，并列出要链接的所有目标文件。

```bash
$ gcc -o hello hello.o main.o
```

#### 执行整个工具链
**说明：**用 -o 选项来提供程序名，并列出要链接的所有源文件。

**限制：**小程序可以，大型构造系统不会这么做。

```bash
$ gcc -o hello hello.c main.c
```

## 1.6 静态程序库
**说明：** 静态程序库知识镀铬目标文件的归档文件，可以通过 ar 命令创建静态程序库。

### 1.6.1 ar 命令
**功能：** 处理静态库的工具，比如

+ `-rs`：负责将目标文件归档为静态链接库文件
+ `-t`：还可以检查归档文件的内容

还有一些选项可以把目标文件从静态程序库中摘取出来，或把目标文件内容写回到磁盘文件（但对构造系统来说不是常用操作）。

### 1.6.2 创建静态库
[c_demos/c_programming_a_modern_approach/15/fmt at master · laputa-er/c_demos · GitHub](https://github.com/laputa-er/c_demos/tree/master/c_programming_a_modern_approach/15/fmt) 
这是我在另一本书看到的一个例子，写了一个 demo，提供了更健壮的对流读取和写入。我准备将其中 4 个文件做成一个静态库，依次是，

```bash
.
├── word.c
├── word.h
├── line.c
└── line.h
```

下面是制作静态库的整个过程，

```bash
# 生成目标文件
$ gcc -c word.c
$ gcc -c line.c

# 创建静态库归档文件
$ ar -rs myReadLine.a line.o word.o
$ tree
.
├── line.c
├── line.h
├── line.o
├── word.c
├── word.h
├── word.o
└── myReadLine.a
```

### 1.6.3 使用静态库
**链接静态库**
示例如下，其中fmt.c 使用了上一步创建的静态库，用来完成对文本的格式化（具体功能可参考《C 语言程序设计-现代方法 15章》）

```bash
├── fmt.c
└── myReadLine.a
```

编译主程序，然后将目标文件和静态库进行链接。注意，GCC 只会把静态库中真正用到的目标文件链接到可执行程序中。

```bash
$ gcc -c fmt.c # 主程序
$ gcc -o fmt myReadLine.a fmt.o # 链接主程序和用到的静态库
```

**测试可执行程序**

原始文本放在 test.txt 文件中，

```bash
to test whether the program fmt		work well.       
this test

writen in
2016, changed in 2017-  2-5 22:00
hope
```

使用程序 fmt 整理 test.txt 的格式，并将整理好的文本输出，如下

```bash
$ ./fmt < test.txt
to test whether the program fmt work well. this test  writen
in 2016, changed in 2017- 2-5 22:00 hope
```

## 1.7 动态链接库
**案例：** 仍然使用上一节提到的例子。

### 1.7.1 创建动态程序库

相关 GCC 选项|说明
---|---
-fPIC|创建位置无关的目标文件（这种目标文件才能链接成动态链接库）
-shared|链接过程中使用该选项，告诉编译器链接出动态程序库。

```bash
# 编译出目标文件
$ gcc -c -fPIC word.c
$ gcc -c -fPIC line.c

# 创建动态程序库
$ gcc -shared -o libmystream.so word.o line.o

# 检查动态程序库归档文件
$ file libmystream.so
libmystream.so: Mach-O 64-bit dynamically linked shared library x86_64
```

### 1.7.2 使用动态程序库 

相关 GCC 选项|说明
---|---
`-L`|告诉链接器动态链接库所在目录
`-l`| 告诉链接器动态链接库的名字

```bash
$ gcc -c fmt.c # 主程序
$ gcc -o fmt fmt.o -L . -l mystream # 链接主程序用到的动态链接库（不能直接用 libmystream.so 这个名字，而是 lmystream）
```

**注意：** `·l `选项后面使用的并不是动态链接库的文件本身的名字，需要有所变化，比如 `libmystream.so`，使用时要写成 `mystream`！

### 1.7.3 查看程序用到的动态程序库
#### ldd 命令
**功能：** 查看主程序执行时，需要把那个动态程序库载入内存。

**扩展：** mac 上没有这个命令，对应的命令是 `otool`

*linux 环境*

```bash
$ export LD_LIBRARY_PATH=. # 指出自定义的动态链接库所在目录，注意在实际编码时使用相对路径会有安全漏洞
$ ldd fmt
```

*mac 环境*

```bash
$ otool -L fmt
fmt:
        libmystream.so (compatibility version 0.0.0, current version 0.0.0)
        /usr/lib/libSystem.B.dylib (compatibility version 1.0.0, current version 1238.0.0)
```


## 1.8 c++ 编译
### g++ vs. gcc

+ gcc 也可以编译 c++ ，但更推荐使用 g++ 来编译 c++。
+ gcc 和 g++ 相比，编译阶段几乎是相同的，链接阶段g++默认链接c++库，gcc不会。
+ 也可以用gcc编译cpp文件，但后面需要加一个选项-lstdc++，作用是链接c++库。

### c++ 类型检查
c++ 可以在链接时执行类型检查，而 c 程序则必须在编译时进行所有的类型检查。



