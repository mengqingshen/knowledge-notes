---
title: SBS_05 子标的与构造函数
categories:
    - 深入理解软件构造系统-原理与最佳实践
tag:
    - 构造系统
---

构造过程总体示意图，展示了从原属创建目标树的多种途径
![](http://cdn.mengqingshen.com/SBS_05%20%E5%AD%90%E6%A0%87%E7%9A%84%E4%B8%8E%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0/0251BE4C-7F7A-40F1-8017-E72733A93FAF.png)

1）针对**子标的（subtarget）**进行构造：只对整个软件产品的部分内容进行构造，而不是构造整个产品。
2）针对软件的不同**版本**进行构造：仍然需要编译全套源文件，但根据构造版本的不同，选择性地包含或去除某些源文件。
3）针对不同的目标**系统架构**进行构造：根据 CPU 类型和操作系统 的不同，使用不同的编译工具，对整个软件产品进行构造，并额外包含或去除少量文件。

# 1 针对 子标的 进行构造
例如下面的例子，只重新编译和安装修改了的动态链接库。

```bash
.
└── src
    ├── calc-app # 应用程序的主体部分
    │   └── ...
    ├── graphics
    │   └── ...
    └── math
        └── ...
```

其中，graphics 和 math 是动态链接到程序中的程序库的源代码，如果它们进行了修改，只需重新编译修改的程序库，然后将新程序库拷贝到目标机器，最后重新启动程序。

# 2 针对软件不同版本进行构造
+ 语言文化
+ 硬件差异
+ 定价方案
+ …

## 2.1 指定构造变量
例如，开发一套支持三种语言和软件包（包含家庭版和专业版）。如果使用 make 进行构造，那么可以设置两个构造变量 `Language` 和 `Edition`，构造是指定构造变量的值，如下

```bash
$ make configure LANGUAGE+French EDITION=Home # 设置配置文件 .config
$ make all # 编译
$ make package # 打包
```

*makefile 文件*

```bash
# 设置配置文件
config:
	@echo LANGUAGE=$(LANGUAGE) > .config
	@echo EDITION=$(EDITION) >> .config
…
```

也可以添加一些类型检查，比如

```bash
LANGUAGES := English
EDITION := Professional

VALID_LANGUAGES := English French German
VALID_EDTIONS := Professional Home

# 检查语言变量合法性
ifeq ($(findstring $(LANGUAGE), $(VALID_LANGUAGES)),)
	$(error Invalid value for LANGUAGE. Must be one of: $(VALID_LANGUAGES))
endif

# 检查版本变量合法性
ifeq ($(findstring $(EDITION), $(VALID_EDITIONS)),)
	$(error Invalid value for EDITION. Must be one of: $(VALID_EDITIONS))
endif

# 确保组合存在
ifeq ($(LANGUAGE)/$(EDITION), German/Professional)
	$(error German language is not supported by profession-edition)
endif
```

*.config 配置文件*

```bash
LANGUAGE=China
EDITION=Professional
```

## 2.2  对代码的定制调整
下面介绍多重定制调整的方法。构造系统可以对这些方法进行任意组合，并选用其中最有意义的组合方式。
### (1) 逐行调整
**说明：** 构造变量的每个值对应一处代码片段，是最细颗粒度的方式。
**缺点：** 可读性差

c/c++ 通过预处理定义来实现，例如，针对不同语言和版本
*makefile 文件片段：针对特定构造变量（LANGUAGE 和 EDITION）的值，设置不同的编译参数（CFLAGS）*

```bash
ifeq ($(LANGUAGE), English)
	CFLAGS += -DEBUG_EN
endif

ifeq ($(EDITION), Professional)
	CFLAGS += -DEDITION_PROF
endif
```

*c/c++ 源代码片段：读取 makefile 中设置到环境中的值，类似读取宏。*

```c
int compute_costs()
{
	int total_costs = 0;
#ifdef EDITION_PROD
	total_costs += capital_cost_allowance();
#else
	total_costs += basic_costs();
#endif
	…
}
```

### (2) 每变量一个文件
**说明：** 每个变量值对应的源代码分别放在单独的文件中。
**优点：** 相比在同一个文件中混合变量多种值的逻辑，该方法更直观易读，代码结构更清晰。

例如，把不同语言的版本分别存放在不同文件中。
*makefile 文件片段*

```bash
SRCS := basic.c costs.c math.c interest.c ui.c # 源文件
ifeq ($(LANGUAGE), English)
	SRCS += english.c
endif
```

### (3) 每变量一个目录
**说明：** 每个变量值对应的源代码分别放在单独的文件夹中

例如，把不同语言的版本分别存放在不同文件夹中。
*makefile 文件片段：LANGUAGE 变量的值决定了构造期使用那个文件夹*

```bash
DIRS := ui graphics math database $(LANGUAGE)
```

```bash
.
└── src
    ├── English
    │   ├── Currency.java
    │   ├── Errors.java
    │   └── Menus.java
    ├── French
    │   ├── Currency.java
    │   ├── Errors.java
    │   └── Menus.java
    └── German
        ├── Currency.java
        ├── Errors.java
        └── Menus.java
```

### (4) 每变量一个构造描述文件
**说明：** 当每个构造变量都与不同的编译标志参数相关时，可以分成多个构造描述文件，最顶层的构造描述文件根据变量值判断 include 哪些构造描述文件。
**优点：**如果有了新变量值，更容易扩展，并减少构造描述文件的复杂度。

例如，针对不同语言版本使用不同的构造框架，如下所示：
*makefile 文件：最顶层构造描述文件*

```bash
include $(LANGUAGE).mk
```

*English.mk：包含的内容和英文产品相关*

```bash
CFLAGS += -DLANG_EN -DKEFT_TO_RIGHT_TEXT -DUSE_ASCII -DSUPPORT_USA -DSUPPORT_UK -DSUPPORT_CANADA
CURRENCIES := USD CAD AUD GBP
SPLASH_SCREEN := ENGLISH_FLAG.jpg
OPTIONAL_DIRS := src/property_tax src/estate_tax
ERRORS_FILE := english-errors.list
PROPERTIES := english.properties
```

### (5) 打包时调整
**说明：** 打包过程中根据构造变量的值，意识地选择把哪些文件拷贝到最终发布包中。

例如，针对不同语言的版本，构建时拷贝进去不同的图片作为不同的软件启动图片，如下所示：

*makefile 文件*

```bash
$(COPY)  $(SPLASH_SCREEN)  splash_screen.jpg
```

### (6) 安装时调整
**说明：** 即使构造软件只有一种版本，仍然可以在安装时对软件的功能行为进行定制。在发布包中，包含用于支持所有变量值的全部文件，但只有与选定变量相关的文件才被安装到目标机器中。

### (7) 运行时调整
**说明：** 构造系统生成的发布包中包含了全部功能（所有语言和特性），并且完全安装到目标机器中。但在程序执行时，会判断需要使用哪个变量，并对自己的功能进行相应的调整。

# 3 针对不同的目标系统架构进行构造
**解释：**面向多重目标系统架构平台，生成相应的程序代码。
**限制：** 这种调整方式仅对 c/c++ 之类编译生成原生代码的编程语言才有意义，对于使用平台无关的虚拟机的 Java 和 c# 等并不适用。

## 3.1 多重编译器
**解释：** 构造系统支持多重类型的编译器，并根据需要，调用合适的编译器完成构造任务。事实上，使用多重编译器又可以分为两种情况

+ 原生编译（native compling）
+ 跨平台编译（也叫交叉编译）

### 原生编译
**解释：** 使用的多个编译器运行于不同的操作系统。需要构造系统构造运行于哪种平台的程序，就在哪种平台上构造。

例如，为 Linux 和 window 两个平台分别构造一套 c 程序，需要两种编译器，分别是

+ Linux: GNU C 编译器；
+ Windows: Visual Studio 编译器。

每种编译器都需要使用自己的那套命令行选项，构造系统能够根据平台不同自动判断使用哪种编译器，如下

```bash
ifeq ($(HOME), Linux)
	CC := gcc-4.2
	CFLAGS := -g -o
endif

ifeq ($(HOME), Windows)
	CC := cl.exe
	CFLAGS := /02 /Zi
endif
```

### 跨平台编译
**解释：** 一台构造机器可以用于生成多种目标系统架构平台的代码，因此开发人员必须声明他们要使用哪个变量进行构造。

例如，在 Linux 平台上使用两种 GNU C 编译器，生成适配两种系统架构的 C 程序

+ x86 Linux: i386-linux-gcc-4.2；
+ windows:  i386-windows-gcc-4.2

makefile 如下

```bash
ifeq ($(TARGET), Linux)
	CC := i386-linux-gcc-4.2
	CFLAGS := -g -o
endif

ifeq ($(TARGET), Windows)
	CC := i386-windows-gcc-4.2
	CFLAGS := -g -o
endif
```

## 3.2 面相指定平台的文件或功能
**解释：** 除非只依赖于在所有目标机器上都相同的标砖程序库（例如 POSIX 标准库），否则总是需要进行相当程度的条件编译，来实现代码的可移植性。
**合适的方法**

+ 逐行条件编译，例如c/c++ 种的  `ifdef`。
+ 每文件调整方式，选择与特定平台相关的源代码。
+ 每目录调整方式，选择与特定平台相关的整个源代码目录。

例如，以下方法返回当前登陆的用户名，使用逐行条件编译的方式使其可以兼通 LInux 和 Windows

```c
char *get_user_name()
{
#ifdef linux
	struct passwd *pwd = getpwuid(getuid());
	return pwd->pw_name;
#endif

#ifdef WIN32
	static char name[100];
	DWORD size = sizeof(name);
	GetUserName(name, &size);
	return name;
#endif
}
```

## 3.3 多个目标树
**解释：** 指的是用一套构造系统，同时完成多个版本的软件的构造。

![](http://cdn.mengqingshen.com/SBS_05%20%E5%AD%90%E6%A0%87%E7%9A%84%E4%B8%8E%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0/22EFB93D-6104-4CFA-ABFB-0631C96EC517.png)

**应用：** 如果当前只有一个目标树，那么为了针对另一个构造变量进行测试，不但要修改配置文件，而且不得不对整个树进行重新构造。改来改去总不是一种可靠的方式。正确的方式是使用多个目标树。

举下面这个例子，通过它的目录结构观察多目标树，如下

```bash
.
├── obj
│   ├── Linux
│   │   ├── calc-app
│   │   │   └── *.obj
│   │   ├── graphics
│   │   │   └── *.obj
│   │   └── math
│   │       └── *.obj
│   └── Windows
│       ├── calc-app
│       │   └── *.o
│       ├── graphics
│       │   └── *.o
│       └── math
│           └── *.o
└── src
    ├── calc-app
    │   └── *.c
    ├── graphics
    │   └── *.c
    └── math
        └── *.c
```

### 3.3.1 针对多目标树的构造系统
简单的做法，就是针对每一种目标树创建对应的框架（.mk），然后都引入到顶层构造描述文件中。至于目标树的存储路径，可以自由选择下面方案中的一种

*方案1: 和源码放在同一个目录下*

```bash
OBJDIR := obj/$(TARGET)
```

*方案2: 任意选择目标树所在的目录*

需要切换到目标树所在目录进行构建，构建过程类似下面这样

```bash
$ mkdir /path/to/my-obj
$ cd /path/to/my-obj
$ configure --src=/path/to/source
$ make
```

*方案3: 任意选择目标树的目录，并建立软链*
表面上看和方案1没有区别，只是 obj 目录是个软链，构建过程类似下面这样

```bash
$ mkdir /path/to/my-obj
$ ln -s /path/to/my-obj obj
$ make
```

