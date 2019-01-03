---
title: SBS_02 基于 make  的构造系统
categories:
    - 深入理解软件构造系统-原理与最佳实践
tag:
    - 构造系统

---

# 1 示例
书没有提供源码，我自己提供了另外一个 c++ 的例子
[C-PLUS-PLUS_STUDY/IMOOC_C-PLUS-PLUS/l05_class_polymorphism/0402_RTTI at master · laputa-er/C-PLUS-PLUS_STUDY · GitHub](https://github.com/laputa-er/C-PLUS-PLUS_STUDY/tree/master/IMOOC_C-PLUS-PLUS/l05_class_polymorphism/0402_RTTI)

## 项目目录
```bash
.
├── Bird.cpp
├── Bird.h
├── Flyable.h
├── Plane.cpp
├── Plane.h
├── main.cpp
└── makefile
```

## 依赖关系图
程序有两个类，Plane 和 Bird，他们继承了一个公共的抽象类 Flayable。
![](http://cdn.mengqingshen.com/SBS_02%20%E5%9F%BA%E4%BA%8E%20make%20%20%E7%9A%84%E6%9E%84%E9%80%A0%E7%B3%BB%E7%BB%9F/5930A389-B098-4396-A7B2-834A5AA83817.png)

依赖关系是一种数学结构，展示了构造树中文件之间的关系。如果某个文件依赖于另一个文件，那么对源文件内容的任何更改，都可能引起目标文件的重新生成。
![](http://cdn.mengqingshen.com/SBS_02%20%E5%9F%BA%E4%BA%8E%20make%20%20%E7%9A%84%E6%9E%84%E9%80%A0%E7%B3%BB%E7%BB%9F/0D4E3353-A787-46BF-B5A1-1E272856CF03.png)
其中，`.cpp(.c)`文件都有对应的 .o 文件，但 `.h` 文件没有对应的目标文件，而是被引入到 `.cpp(.c)`文件中。

# 2 创建一个简单的 makefile
说明：makefile 通过一条条规则描述，一条规则用来完成相应的动作。规则的基本语法为

```bash
规则名称 : 依赖的文件列表(或规则列表) # 右边部分可省略，代表不需要检查其它文件的时间戳，每次都执行该任务
[tab]构造树出文件
```

+ `规则名称` 可以是任何合法的字符串，但通常是这个规则对应的输出文件名。
+ `规则名`右边的`依赖的文件列表`有什么作用？GNU Make 不会盲目执行命令，而是会做一些事前分析，判断某些文件是否真的需要编译，依据就是`依赖的文件列表`中是否有文件被更新过，或者说是否有依赖的其他规则需要先执行。
+ 在 makefile 所在目录执行 `make 规则名` 就能触发该规则。省略 `规则名` 默认执行第一条规则，因此通常会将链接这一步放在最开始。

举个栗子
```bash
demo: main.o Bird.o Plane.o
	g++ -o demo main.o Bird.o Plane.o
main.o: Plane.h Bird.h
	g++ -c main.cpp
Plane.o: Plane.cpp Plane.h Flyable.h
	g++ -c Plane.cpp
Bird.o: Bird.cpp Bird.h Flyable.h
	g++ -c Bird.cpp
```


# 3 对这个 makefile 进行简化
下面逐步对之前的 demo 进行修改：
(1) GNU Make 对常见的操作提供了内置规则。
例如编译时，如果采用默认的编译输出，编译过程的规则描述可以简化，如下

```bash
demo: main.o Bird.o Plane.o
	g++ -o demo main.o Bird.o Plane.o
# 仅提供依赖描述
main.o: Plane.h Bird.h
Plane.o Bird.o: Flyable.h # 规则名部分可以是多个文件，用空格分开
Plane.o: Plane.h
Bird.o: Bird.h
```

其中，我们仅仅通过 3 条规则指明了 Plane 和 Bird 依赖的头文件，编译器知道这些信息就足够完成这两个类的编译了。
注意：因为省略了使用什么编译器的描述，系统会采用默认的编译器，我的 mac 使用了 c++。

(2) GNU Make 提供了对变量的支持。

```bash
SRCS = main.cpp Bird.cpp Plane.cpp
OBJS = $(SRCS:.cpp=.o) # 把源文件列表中美歌文件名的 .c 替换为 .o
PROG = demo # 最终打包的应用程序名
CC = g++ # 编译工具
CFLAGS = -g # 编译参数
$(PROG): $(OBJS)
	$(CC) $(CFLAGS) -o $@ $^ # $@ 当前规则的左半边， $^ 当前规则的右半边
main.o: Plane.h Bird.h
Plane.o: Plane.h Flyable.h
Bird.o: Bird.h Flyable.h
```

# 4 额外的构造任务
构造系统能做的不仅是是编译程序，也可以处理其它事务，包括删除文件，拷贝文件等。
例如，两个最常见的操作是“清空”和“安装”。

```bash
SRCS = main.cpp Bird.cpp Plane.cpp
OBJS = $(SRCS:.cpp=.o) # 把源文件列表中美歌文件名的 .c 替换为 .o
PROG = demo # 最终打包的应用程序名
CC = g++ # 编译工具
CFLAGS = -g # 编译参数
INSTALL_ROOT = /usr/local # 安装路径

$(PROG): $(OBJS)
	$(CC) $(CFLAGS) -o $@ $^ # $@ 当前规则的左半边， $^ 当前规则的右半边
main.o: Plane.h Bird.h
Plane.o Bird.o: Flyable.h # 规则名部分可以是多个文件，用空格分开
Plane.o: Plane.h
Bird.o: Bird.h
clean: # 没有任何依赖，因此不检查时间戳，每次都执行该任务
	rm -f $(OBJS) $(PROG)
install:
	cp $(PROG) $(INSTALL_ROOT)/bin
```

# 5 框架的运用
程序越复杂，构造系统就越复杂，makefile 也随之变得复杂。为了方便维护，可以将需要配置的部分放在 makefile 中，其它部分封装在`框架(.mk)`文件，并引入到 makefile 中。例如：

makefile

```bash
SRCS = main.cpp Bird.cpp Plane.cpp # 源文件
PROG = demo # 最终打包的应用程序名
CC = g++ # 编译工具
CFLAGS = -g # 编译参数
INSTALL_ROOT = /usr/local # 安装路径

include frameWork.mk
```

frameWork.mk

```bash
OBJS = $(SRCS:.cpp=.o) # 把源文件列表中美歌文件名的 .c 替换为 .o

ifdef DEBUG
CLAAGS = -O -g
else
CFLAGS = -O
endif

$(PROG): $(OBJS)
	$(CC) $(CFLAGS) -o $@ $^ # $@ 当前规则的左半边， $^ 当前规则的右半边
main.o: Plane.h Bird.h
Plane.o Bird.o: Flyable.h # 规则名部分可以是多个文件，用空格分开
Plane.o: Plane.h
Bird.o: Bird.h
clean: # 没有任何依赖，因此不检查时间戳，每次都执行该任务
	rm -f $(OBJS) $(PROG)
install:
	cp $(PROG) $(INSTALL_ROOT)/bin
```