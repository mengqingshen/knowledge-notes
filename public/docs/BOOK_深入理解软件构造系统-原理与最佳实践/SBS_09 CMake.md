---
title: SBS_09 CMake
categories:
    - 深入理解软件构造系统-原理与最佳实践
tag:
    - 构造系统
    - cmake
---

![](http://o7m5xjmtl.bkt.clouddn.com/SBS_09%20CMake/FE5584DA-DEE7-41A2-A15C-FB7731310981.png)

**CMake 官网：** https://cmake.org/

**说明：** CMake 是一种描述构造过程的高层次语言，可以通过不同的生成器，转译成原生构造工具自己的语言。

+ 简化构造系统，跨平台
+ CMake 有几种生成器，分别运行于不同的构造机器类型
+ CMake 的构造描述使用平台无关语言，保存在 CMakeLits.txt 文件中

**安装 CMake：** `brew install cmake`

## 1 CMake 编程语言
### 1.1 CMake 语言基础
#### 命令
**标准语法：** `command (arg1 arg2 …)`

几个常用命令|说明
---|---
`project`)|为构造系统命名，供需要项目名的原生构造系统（例如 Eclipse） 使用。
`set`|设置变量
`set_property`|为指定文件设置属性
`get_property`|获取指定文件的属性名

```bash
## 
## 使用 project 命令为构造系统命名，将 "basic-sync C" 作为这个构造系统的唯一标识。供需要项目名的原生构造系统（例如 Eclipse） 使用。
## project(<项目名> <编译的语言(C/C++/Java)>)
#
project (basic-sync C)

#
## 声明这段构造描述使用的是 CMake 2.6+ 所支持的命令集。
## param1： VERSION 关键字
## param2: 版本号 
#
cmake_minimum_required(VERSION 2.6)

#
## 创建变量
## set(<变量名> <变量值>)
#
set (wife Grace)

set (dog Stan)

## 输出一行字符串信息（使用 ${} 语法访问变量的值）
message ("${wifi}, please take $(dog) for a walk")

#
## 为指定文件设置属性
## set_property(SOURCE <文件名> PROPERTY <属性名> <属性值>)
#
set_property (SOURCE add.c PROPERTY Author Peter)
set_property (SOURCE mult c PROPERTY Author John)


#
## 获取指定文件的属性名
## get_property(<赋值给哪个变量> SOURCE <文件名> PROPERTY <属性名>)
#
get_property (author_name SOURCE add.c PROPERTY Author)

message ("The author of add.c is ${author_name}")

```

### 1.2 构造可执行程序和程序库

#### （1）创建可执行程序和程序库

相关命令|说明
---|---
`add_executable`| 创建可执行程序（生成合适的编译器命令行，把文件名加到依赖关系中）
`add_library` | 编译源文件，归档为程序库
`target_link_libraries`|链接可执行程序和程序库
`include_directories` | 指定在哪些额外路径搜索头文件
`link_directories` | 指定在哪些路径中搜索程序库

*CMakwLists.txt: 情形1，不需要链接程序库的可执行程序*

```bash
## 将 add.c sub.c mult.c calc.c 编译病链接为可执行程序
add_executable (calculator add sub mult calc)
```

*CMakwLists.txt: 情形2，需要链接程序库的情况*

```
## 创建静态库
add_library(math STATIC add sub mult)

## 创建可执行程序
add_executable(calculator calc)

## 将上一步生成的可执行程序和静态库链接在一起
target_link_libraries (calculator math)
```

#### （2）设置编译标志参数
**说明：** CMake 不鼓励对编译器标志参数进行硬编码，而是通过构造描述来声明需要哪一种类型的输出，并由 CMake 判断采用什么编译器标志参数。

```bash
## 设置编译过程为调试模式（在 UNIX 系统中，上例生成的结果是把 -g 标志参数加到 C 编译器命令行）。
set(CMAKE_BUILD_TYPE Debug)

## 在编译当前目录中的所有 C 文件时，命令行中添加 TEST=1 选项。
set_property(DIRECTORY PROPERTY COMPILE_DEFINITIONS TEST=1)

## 在对 add.c 进行编译时，命令行中添加 QUICKADD=1 选项。
set_property(SOURCE add.c PROPERTY COMPILE_DEFINITIONS QUICKADD=1)
```

#### （3）增加定制命令和标的
**说明：** 对于更复杂的构造需求，可以定义新的编译工具，让 CMke 把这些工具加到原生构造系统中。

##### add_custom_command
**功能：** 类似 GNU Make 的标准规则。

```bash
## -----------------------------------------------
## 定义新的编译工具，让 CMake 把这些工具加到原生构造系统中.
## ----------------------------------------------
project(custom_command)
cmake_minimum_required(VERSION 2.6)

## 定义新编译工具的源文件
set(input_data_file ${PROJECT_SOURCE_DIR}/data.dat)

## 定义新编译工具的目标文件
set(output_c_file data.c)

## 添加自定义规则
add_custom_command(
	# 声明要创建的文件(标的)
	OUTPUT ${output_c_file}
	# shell 命令
	COMMAND /tools/bin/make-data-file
		< ${input_data_file}
		> ${output_c_file} 
	# 规则的依赖列表
	DEPENDS ${input_data_file}
)

## 顶层标的（创建最终的可执行程序）
add_executable(print-data ${output_c_file})
```

##### add_custom_target
**功能：** 类似 GNU Make 的伪标的。

```bash
project(custom_target)

cmake_minimum_required(VERSION 2.6)

## 添加自定义标的（通过 ALL 关键字声明为默认标的）
add_custom_target(print-city ALL
	COMMAND echo "Vancouver is a nice city"
	COMMAND echo "Even when it rains")

## 添加标的 print-time
add_custom_target(print-time
	COMMMAND echi "It is now 2:19pc")

## 添加标的 print-day
add_custom_target(print-day
	COMMAND echo "Today is Monday")

## 声明 print-city 标的依赖 print-time 标的 和 print-day 标的
add_dependencies(print-city print-time print-day)
```

### 1.3 控制流
#### （1）标准语法
**注意：** end 和 endif 语句后也需要加 `()`

```bash
set(my_var 1)
if(${my_var})
	message("my_var is true")
else()
	message("my_var is false")
endif()
```

#### （2）布尔操作
布尔操作关键字|说明
---|---
`AND`|与
`OR`|或
`NOT`|非
`EQUAL`|判等
`EXITS`|检查文件是否存在
`IS_NEWER_THAN`|检查文件之间的新旧程度
`MATCH`|与正则表达式进行匹配

```bash
## NOT
if(NOT my_var) # 变量不需要使用 ${}
	...
endif()

## EQUAL
if($(my_age) EQUAL 40)
	...
endif()

## EXISTS
if(EXISTS file1.txt)
	...
endif()

## IS_NEWER_THAN
if(file1.txt IS_NEWER_THAN file2.txt)
	...
endif()

## MATCHS
if(${symbol_name} MATCHES "^[a-z][a-z0-9]*$")
	...
endif()
```


#### （3）宏结构
**说明：** 类似函数。

```bash
project(macro)
cmake_minimum_required(VERSION 2.6)

## 定义宏结构
macro(my_macro ARG1 ARG2 ARG3)
	message("The my_macro macro was passed the following arguments:")
	message("${ARG1}, ${ARG2} and ${ARG3}")
endmacro(my_macro)

## 调用宏结构
my_macro(1 2 3)
my_macro(France Germany Russia)
```

#### （4）foreach 循环
**注意：** 循环结构不会转译为原生构造工具的循环结构，而是通过向 makefile 中加入若干不容的规则，从而提供等价的功能。

```bash
project(foreach)
cmake_minimum_required(VERSION 2.6)

## 针对每个源文件，为其添加新顶层标的
foreach(source_file add.c mult.c mult.c calc.c)
	message("Calculating cksum for ${source_file}")
	add_custom_target(cksum-${source_file} ALL
		COMMAND cksum ${PROJECT_SOURCE_DIR}/${source_file})
endforeach(source_file)
```

### 1.4 跨平台支持
**说明：**  CMake 具备跨平台的能力，但并不总是如此，需要我们在编写时考虑构造机器的差异。

**跨平台支持：**CMake 让我们可以找到特定的工具和文件，以及确定地层编译器支持哪些特性。

#### （1）在构造机器上查找文件和工具的位置
**说明：** CMake 提供了在标准路径中搜索文件和工具的若干命令。同时也提供了用来查找流行工具和程序库的代码模块，只要引入模块，就自动完成相关库和命令的定位，并记录在相应的变量中。

搜索文件或工具的命令|说明
---|---
`find_program `| 获取指定程序的路径，并记录在指定变量中
`find_file`| 获取指定文件的完整路径，并记录在指定变量中
`find_library` | 获取指定程序库的完整路径，并记录在指定变量中
`include` | 载入并运行 cmake 模块

*CMakeLists.txt： 使用命令寻找*

```bash
project(finding)
cmake_minumum_required(VERSION 2.6)

## 在标准路径中搜索 ls 工具的绝对路径，并记录在 LS_PATH 变量中
find_program(LS_PATH ls)
message("The path to the ls program is ${LS_PATH}")

## 在 PATH 环境变量列出的路径中遍历搜索 stdio.h 文件，并将找到的路径记录在 STDIO_H 变量中
find_file(STDIO_H PATH stdio.h)
message("The path to the stdio.h file is ${STDIO_H_PATH}")

## 在指定路径 /usr/local/lib 和 /usr/lib64 中，寻找 c 语言标准数学运算程序库，并将找到的路径记录在 LIB_MATH_PATH 变量中
find_library(LIB_MATH_PATH m /usr/local/lib /usr/lib64)
message("The path to the math library is ${LIB_MATH_PATH}")
```

*CMakeLists.txt：利用 CMakeLists 封装的模块简化查找*

```bash
project(find-perl)
cmake_minimum_required(VERSION 2.6)

## 包含 FindPerl， CMake 自动完成 perl 解释器的查找工作
include(FindPerl)

## 如果找到了 perl 程序，执行 perl 脚本
if(PERL_FOUND)
	execute_process(
		COMMAND ${PERL_EXECUTABLE} ${PROJECT_SOURCE_DIR}/config.pl
	)
## 否则就输出错误信息
else()
	message(SEND_ERROR "There is no perl interpreter on this system")
endif()
```

#### （2）对源代码进行测试的能力
**说明：** 在编译程序之前，必须判断构造机器的编译器是否提供了所有必要功能和头文件。如果不满足需要的话，就必须用自己的实现版本来进行替换，或甚至放弃构造过程。

对底层编译器进行测试的命令|说明
---|---
`try_compile`|测试构造系统能否对程序源码进行正确编译
`try_run`|测试构造系统构造的程序能够正确运行

*CMakeLists.txt*

```bash
project(try-compile)
cmake_minimum_required(VERSION 2.6)

## 该模块包含 CHECK_FUNCTION_EXISTS 宏，该宏封装了 try_compile 命令，用来检测函数是否定义
include(CheckFunctionExists)

## 该模块包含 CHECK_STRUCT_HAS_MEMBER 宏，封装了 try_compile 命令，用来检测结构体是否定义了某个成员
include(CheckStructHasMember)

## 检测 vsnprintf 函数是否存在，并将测试结果记录在 VSNPRINTF_EXISTS
CHECK_FUNCTION_EXISTS(vsnprintf VSNPRINTF_EXISTS)
if(NOT VSNPRINTF_EXISTS)
	message(SEND_ERROR "vsnprintf not available on this build machine")
endif()

## 检测头文件 wait.h 中定义的结构体 rusage 是否存在成员 ru_time，并将检查结果存放在 HAS_STIME 变量
CHECK_STRUCT_HAS_MEMBER("struct rusage" ru_stime wait.h HAS_STIME)
if(NOT HAS_STIME)
	message(SEND_ERROR "ru_stime field not available in struct rusage")
endif()

```

### 1.5 生成原生构造系统
**说明：** 使用 CMake 完成编译划分为两个阶段，第一个阶段是 CMake 设计的关键部分。

**注意：** CMake 在生成原生构造系统时增加了许多标准特性，例如自动化依赖关系分析等。

![](http://o7m5xjmtl.bkt.clouddn.com/SBS_09%20CMake/CAD2414E-CE9C-4186-9E7F-D105310562BA.png)

#### （1） 生成默认的构造系统
**说明：** 生成系统的最简单办法，是接受默认配置参数。

**原理：** 开发人员只需创建目标文件目录，然后在该目录调用 cmake 工具即可。

**特点：** 这一操作不会修改源文件目录中任何文件，从而可以根据同一源树，生成多个目标文件目录。

```bash
$ cd path/to/project
$ cmake ../src # 使用默认的参数生成原生构造系统
```

#### （2）生成非默认的构造系统
**原理：** 通过向 cmake 命令传递 -G  选项，即可覆盖默认选择值。

相关 CMake 选项|说明
---|---
-G|指定要生成哪种原生构造系统

```bash
## 在 windows 系统的构造机器上输入以下命令
$ cmake -G "Visual Studio 10" ..\src

## 在 Linux 平台上的 Eclipse CDT 4 版本生成一套构造系统
$ cmake -G "Eclispe CDT$ - Unix Makefiles" ../src
```


#### （3）对生成步骤进行定制调整
**缓存变量：** 决定如何生成原生构造系统的一系列关键变量，称为 `缓存(cache)`变量。

**说明：** 通过提供相关缓存变量值覆盖其默认值，就可以对编译过程进行定制调整。具体地，可以有 3 种方式
1. 在 CMakeLists.txt 中，使用 set 命令设置缓存变量（需要使用 CACHE 关键字）。
2. 在 cmake 命令后面，提供相关缓存变量值。
3. 使用 ccmake 命令取代 cmake，交互式地配置原生构造系统。配置的缓存变量值最中保存在目标文件目录下的 CMakeList.txt 文件中，把它们当作正常的变量来访问（推荐）。

常用缓存变量|说明
---|---
`CMAKE_AR`|程序库归档工具的绝对路径
`CMAKE_C_COMPILER`| C 编译器的绝对路径
`CMAKE_LINKER`|目标文件链接器的绝对路径
`CMAKE_MAKE_PROGRAME`|原生构造工具的绝对路径
`CMAKE_BUILD_TYPE`|待创建的构造树的类型，包括 Debug、Release、RelWithDebInfo、MinSizeRel
`CMAKE_C_FLAGS_*`|根据 `CMAKE__BUILD_TYPE`变量的取值， CMake 将使用相应缓存变量(CMAK_C_FLAGS_*)中列出的 C 编译器标志参数

#### （4）从 CMakeLists.txt 转译到原生构造系统
一个简单但完整的例子， [book_software_build_system_demos/part2/09_cmake/0901_calculator/src at master · laputa-er/book_software_build_system_demos · GitHub](https://github.com/laputa-er/book_software_build_system_demos/tree/master/part2/09_cmake/0901_calculator/src)

第一步：编写 CMakeLists.txt
*项目目录*
```bash
.
└── src
    ├── CMakeLists.txt # CMake 描述文件
    ├── add.c
    ├── calc.c
    ├── mult.c
    ├── numbers.h
    └── sub.c
1 directory, 6 files
```

*CMakeLists.txt*

```bash
## -----------------------
## 编译两个丹毒的程序：calc 和 calculator，二者使用相同的源文件
## -----------------------
project(generating)
cmake_minimum_required(VERSION 2.6)

set(prog1 calculator)
set(prog2 calc)

## 打印执行程序
execute_process(
	# 执行 date 命令，并将输出信息赋值给变量 TIME_NOW
	COMMAND date OUTPUT_VARIABLE TIME_NOW
)

## 构建两个应用程序 calculator、calc（其实是一样的）
foreach(prog_name ${prog1} ${prog2})
	message("Constructing programe ${prog_name} at ${TIME_NOW}")
	add_executable(${prog_name} add sub mult calc)
endforeach()

```

第二步：转译为原生构造系统（GNU Make）

```bash
$ cmake src
```

*原生构造系统的目录结构*

```bash
.
├── CMakeCache.txt
├── CMakeFiles
│   ├── 3.7.2
│   │   ├── CMakeCCompiler.cmake
│   │   ├── CMakeCXXCompiler.cmake
│   │   ├── CMakeDetermineCompilerABI_C.bin
│   │   ├── CMakeDetermineCompilerABI_CXX.bin
│   │   ├── CMakeSystem.cmake
│   │   ├── CompilerIdC
│   │   └── CompilerIdCXX
│   ├── CMakeDirectoryInformation.cmake
│   ├── CMakeOutput.log
│   ├── CMakeTmp
│   ├── Makefile.cmake
│   ├── Makefile2
│   ├── TargetDirectories.txt
│   ├── calc.dir
│   │   ├── DependInfo.cmake
│   │   ├── build.make
│   │   ├── cmake_clean.cmake
│   │   ├── depend.make
│   │   ├── flags.make
│   │   ├── link.txt
│   │   └── progress.make
│   ├── calculator.dir
│   │   ├── DependInfo.cmake
│   │   ├── build.make
│   │   ├── cmake_clean.cmake
│   │   ├── depend.make
│   │   ├── flags.make
│   │   ├── link.txt
│   │   └── progress.make
│   ├── cmake.check_cache
│   ├── feature_tests.bin
│   ├── feature_tests.c
│   ├── feature_tests.cxx
│   └── progress.marks
├── Makefile
├── cmake_install.cmake
└── src
    ├── CMakeLists.txt
    ├── add.c
    ├── calc.c
    ├── mult.c
    ├── numbers.h
    └── sub.c

8 directories, 38 files
```

第三步：完成构造任务

```bash
$ make
```

### 1.6 其他有趣的特性以及进一步阅读资料
#### CMake 的其它有趣特性

+ 字符串操作
+ 列表操作
+ 文件操作
+ 数学表达式
+ 配置数据文件
+ 测试可执行程序（CTest 模块）
+ 打包与安装
+ 平台无关的 shell 命令

#### 进一步阅读资料

+ [官方帮助文档](https://cmake.org/cmake/help/v3.8/index.html)

## 2 显示世界的构造系统场景
### （1） 源代码放在单个目录中
例如， [laputa-er](https://github.com/laputa-er/book_software_build_system_demos/tree/master/part2/09_cmake/0902_single_dir/src)

```bash
.
└── src
    ├── CMakeLists.txt
    ├── add.c
    ├── calc.c
    ├── mult.c
    ├── numbers.h
    └── sub.c
```

*CMakeList.txt*

```bash
## -----------------------
## 编译 calculator
## -----------------------
project(generating)
cmake_minimum_required(VERSION 2.6)

add_executable(calculator add sub mult calc)
```


### （2）源代码放在多个目录中
例如， [lapuya-er](https://github.com/laputa-er/book_software_build_system_demos/tree/master/part2/09_cmake/0902_mult_dir/src)

![](http://o7m5xjmtl.bkt.clouddn.com/SBS_09%20CMake/D0C1804E-886C-4779-B351-6D94F53874A2.png)

#### 第一步：编写各个目录下的 CMakeList.txt

新命令|说明
---|---
`add_subdirectory` | 添加字目录，从而让 CMake 了解有哪些字目录

```bash
.
└── src
    ├── CMakeLists.txt
    ├── calc
    │   ├── CMakeLists.txt
    │   └── calc.c
    ├── libmath
    │   ├── CMakeLists.txt
    │   ├── clock.c
    │   ├── letter.c
    │   └── numbers.c
    └── libprint
        ├── CMakeLists.txt
        ├── banner.c
        ├── center.c
        └── normal.c
```

*src/CMakeLists.txt*

```bash
## -----------------------------------
## 迭代式地包含字目录中各级构造描述文件的内容
## -----------------------------------
project(scenario-2)
cmake_minimum_required(VERSION 2.6)

add_subdirectory(libmath)
add_subdirectory(libprint)
add_subdirectory(calc)
```

*src/calc/CMakeLists.txt*

```bash
## 创建可执行文件
add_executable(calculator calc.c)
## 与 Math 和 Print 链接
target_link_libraries(calculator Math Print)
```

*src/libmath/CMakeLists.txt*

```bash
## 生成静态库 Math
add_library(Math clock letter number)
```

*src/libprint/CMakeLists.txt*

```bash
## 生成静态库 Print
add_library(Print banner.c center.c normal.c)
```

#### 第二步：生成 GNU Make 构造系统

```bash
$ cmake src
```

-- The C compiler identification is AppleClang 8.0.0.8000042
-- The CXX compiler identification is AppleClang 8.0.0.8000042
-- Check for working C compiler: /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/cc
-- Check for working C compiler: /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/cc -- works
-- Detecting C compiler ABI info
-- Detecting C compiler ABI info - done
-- Detecting C compile features
-- Detecting C compile features - done
-- Check for working CXX compiler: /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/c++
-- Check for working CXX compiler: /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/c++ -- works
-- Detecting CXX compiler ABI info
-- Detecting CXX compiler ABI info - done
-- Detecting CXX compile features
-- Detecting CXX compile features - done
-- Configuring done
-- Generating done
-- Build files have been written to: /Users/tonyearth/Projects/book_software_build_system_demos/part2/09_cmake/0902_mult_dir

#### 第三步：完成构造过程

```bash
$ make
```

Scanning dependencies of target Math
[ 10%] Building C object libmath/CMakeFiles/Math.dir/clock.c.o
[ 20%] Building C object libmath/CMakeFiles/Math.dir/letter.c.o
[ 30%] Building C object libmath/CMakeFiles/Math.dir/number.c.o
[ 40%] Linking C static library libMath.a
[ 40%] Built target Math
Scanning dependencies of target Print
[ 50%] Building C object libprint/CMakeFiles/Print.dir/banner.c.o
[ 60%] Building C object libprint/CMakeFiles/Print.dir/center.c.o
[ 70%] Building C object libprint/CMakeFiles/Print.dir/normal.c.o
[ 80%] Linking C static library libPrint.a
[ 80%] Built target Print
Scanning dependencies of target calculator
[ 90%] Building C object calc/CMakeFiles/calculator.dir/calc.c.o
[100%] Linking C executable calculator
[100%] Built target calculator

### （3）定义新的编译工具

新命令|说明
---|---
`separate_arguments`| 将字符串中的空格替换为分号

例如， [book_software_build_system_demos/part2/09_cmake/0902_new_compiler at master · laputa-er/book_software_build_system_demos · GitHub](https://github.com/laputa-er/book_software_build_system_demos/tree/master/part2/09_cmake/0902_new_compiler)

假想的 mathcomp 编译器功能如下，
![](http://o7m5xjmtl.bkt.clouddn.com/SBS_09%20CMake/58DBA960-B4BF-4921-B0AF-479FF55FE413.png)

需要生成的原生构造系的统构造需求如下，
![](http://o7m5xjmtl.bkt.clouddn.com/SBS_09%20CMake/EED7D2B1-00AF-4BFA-8609-7B5E3C0DE552.png)

#### 第一步：编写 CMakeLists.txt

**扩展：** 如果使用了 `add_custom_command` 命令， C/C++ 可以通过 `IMPLICIT_DEPENDS` 选项实现依赖关系图的自动更新。

```bash
.
└── src
    ├── CMakeLists.txt
    ├── calculator.c
    ├── equ1.mathinc
    ├── equ2.mathinc
    └── equations.math
```

*CMakeLists.txt*

+ .c 文件编译过程会加入自动依赖分析功能
+ .math 文件编译过程的依赖信息是和原生构造系统本身一起生成的，因此这部分依赖关系图不会自动更新

```bash
## -----------------------------------------
## 把 mathcomp 编译器加到基于 CMake 的构造系统中
## -----------------------------------------
project(scenario-3)
cmake_minimum_required(VERSION 2.6)

#
## 定义一个宏，封装对第三方编译器的调用逻辑
## {name} mathcomp
## {param} FUNC_NAME 编译方式
## {param} INPUT_FILE 输入文件（.math 文件）
## {param} OUTPUT_FILE 输出文件（.c 文件）
#
macro(mathcomp FUNC_NAME INPUT_FILE OUTPUT_FILE)
	# 在原生构造系统生成前，mathcomp 就通过 -d 选项解析出了依赖规则，并存储在了 DEPS 变量中
	execute_process(
		COMMAND /tools/bin/mathcomp -d ${INPUT_FILE} # shell 命令（编译 .math 文件）
		OUTPUT_VARIABLE DEPS # 标的依赖列表
	)
	message(DEPS)
	# DEPS 变量中记录的，将以空格分割的多个依赖规则转换为以分号分隔
	separate_arguments(DEPS)

	# 添加通过 .math 文件生成 .c 文件的规则
	add_custom_command(
		OUTPUT ${OUTPUT_FILE} # 标的（.c 文件）
		COMMAND /tools/bin/mathcomp -c -o ${OUTPUT_FILE} -f ${FUNC_NAME} ${INPUT_FILE} # shell 命令（编译生成 .c 文件）
		DEPENDS ${DEPS} # 规则的依赖列表
	)
endmacro(mathcomp)

## 调用上面定义的宏,完成设计 mathcomp 编译器的 GNU Make 规则的建立
mathcomp(equations ${PROJECT_SOURCE_DIR}/equations.math equations.c)

## 构造可执行文件 calculator
add_executable(calculator calculator.c equations.c)
```

#### 第二步：生成 GNU Make 构造系统

```bash
$ cmake src
```

#### 第三步：完成构造

```bash
$ make
```

### （4）针对多个变量进行构造
**原理：** 利用配置缓存来实现。比如，在配置缓存时，用户可以指出要针对哪种类型的 CPU 进行编译。

**配置缓存：** 配置缓存有两种实现方式
1. set 命令配合 CACHE 关键字。
2. 使用 ccmake，它提供更交互式的用户体验。

例如， [book_software_build_system_demos/part2/09_cmake/0902_mult_var at master · laputa-er/book_software_build_system_demos · GitHub](https://github.com/laputa-er/book_software_build_system_demos/tree/master/part2/09_cmake/0902_mult_var)，该例使用 set 命令来配置缓存。

![](http://o7m5xjmtl.bkt.clouddn.com/SBS_09%20CMake/1A592D4D-2C33-4671-9714-F90001788954.png)

#### 第一步：编写 CMakeLists.txt

```bash
.
└── src
    ├── CMakeLists.txt
    ├── add.c
    ├── calc.c
    ├── mult.c
    ├── numbers.h
    └── sub.c
```

*CMakeLists.txt*

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

#### 第二步：生成 GNU Make 构造系统

```bash
$ mkdir obj-alpha && cd obj-alpha # 针对 alpha 的构造系统生成到这个文件夹
```

```bash
$ cmake -D PLATFORM=alpha ../src # 创建专门针对 alpha 的构造系统
```

cmake -D PLATFORM=alpha ../src
-- The C compiler identification is AppleClang 8.0.0.8000042
-- The CXX compiler identification is AppleClang 8.0.0.8000042
-- Check for working C compiler: /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/cc
-- Check for working C compiler: /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/cc -- works
-- Detecting C compiler ABI info
-- Detecting C compiler ABI info - done
-- Detecting C compile features
-- Detecting C compile features - done
-- Check for working CXX compiler: /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/c++
-- Check for working CXX compiler: /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/c++ -- works
-- Detecting CXX compiler ABI info
-- Detecting CXX compiler ABI info - done
-- Detecting CXX compile features
-- Detecting CXX compile features - done
Compiling code for platform alpha
-- Configuring done
-- Generating done
-- Build files have been written to: /Users/tonyearth/Projects/book_software_build_system_demos/part2/09_cmake/0902_mult_var/obj-alpha

```bash
$ tree
```
.
├── obj-alpha
│   ├── CMakeCache.txt
│   ├── CMakeFiles
│   ├── Makefile
│   └── cmake_install.cmake
└── src
    ├── CMakeLists.txt
    ├── add.c
    ├── calc.c
    ├── mult.c
    ├── numbers.h
    └── sub.c

#### 第三步：完成构造

```bash
$ make
```

### （5）清除构造树
**说明：** CMake 创建的原生构造系统默认已经支持了`clean`标的，用于对它已知的各个目标文件进行清除。

**原理：** 如果在编译源文件时使用了 `add_executable` 或 `add_library` 命令，那么 CMake 就已经知道了可执行程序或程序库文件的名字，以及任何中间过度目标文件的名字。

**技巧：** 对于未能自动检测到的那些已生成文件，可以把它们的文件名列在 `ADDITIONAL_MAKE_CLEAN_FILES` 属性中。这个属性每个目录都有，其中包含该目录要删除的文件名清单。

### （6）对不正确的构造系统进行测试
#### CMake 工具提供的调试功能

cmake 参数|说明
---|---
`—system-infomation` | 对构造机器在执行 cmake 命令时的转储信息进行了深入展示。
`—trace` | 对 CMake 执行过程提供了逐行跟踪。

#### 使用原生构造工具的调试特性

#### 修复 CMake 工具本身可能的错误

## 3 赞扬与批评
### 3.1 赞扬

+ 跨平台。
+ 简单易用。
+ 质量高。
+ 集成了 CPack（用于打包和安装）和 CTest（用于对覆盖全过程的完整构造系统进行测试）。
+ 构造描述语言是内置的，不需要额外安装语言解释器。

### 3.2 批评

+ 没有提供预期的完整能力。
+ 引入了另一种语言，增加了学习成本。
+ 文档支持差。
+ 某些情况下跨平台能力有限。

### 3.3 评价
C/C++ 项目的最佳选择。

+ 易用性： 良
+ 正确性：优
+ 性能：优
+ 可伸缩性：优

## 4 其它类似工具
### 4.1 Automake
**说明：** Autotools 套装软件的组成部分之一。

**适用平台：** UNIX 类系统。

**建议：** 一般认为 CMake 可以去取代 Autotools 套装软件，特别是那些运行在非 UNIX 系统的软件。
举个例子来说明其用法，

*第一步：创建 Makefile.am 文件*

```bash
## 用户通过 make install 安装时， calculator 程序应当安装到 bin 默认目录
bin_PROGRAMS = calculator

## 提供要编译和链接到 calculator 程序中的文件清单
calculator_SOURCES = add.c sub.c mult.c calc.c
```

*第二步：生成 Makefile*

```bash
$ automake
```

*第三步：编译 && 安装*

```bash
$ make
$ make install
```

### 4.2 Qmake
**说明：** Qt 开发环境的组成部分之一，专用于 Qt 开发人员，因此在生成的构造系统中，将自动包含 Qt 类应用程序所必要的 C/C++ 头文件目录和程序库。

**建议：** 如果要开发跨平台应用，Qt 和 Qmake  都是值得研究的工具。










