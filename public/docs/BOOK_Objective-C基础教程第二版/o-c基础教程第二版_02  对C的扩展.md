---
title: 2 对c的扩展
categories:
  - Objective-C基础教程第二版
---


## 2.1   最简单的 Objective-C 程序
>**说明：**项目创建过程如下
>1. 创建 workspace：File-New-Workspace
>2. 创建 project：File-New->Project
>+ 选择模版：OS X->Applicetion-> Command Line
>+ 选择语言：Object-C
>+ 选择 Workspace

## 2.2   解构 Hello Objective-C 程序
>**默认编译器：** XCode 的默认编译器为`LLVM`，可以处理`C`（.c文件）、`C++`（.cpp）、`Objective-C`（.m）。
>**扩展：**扩展名`.m`代表`message`，它值得是`Object-C`的一个主要特征。

```objective-c
// O-C 支持的模块导入方式
#import <Foundation/Foundation.h>

// main 的声明语句和结尾的 return 语句和 C 一样
int main(int argc, const char * argv[]) {
    @autoreleasepool {
        // insert code here...
        NSLog(@"Hello, World!");
    }
    return 0;
}
```

### 2.2.1    #import 语句
>**功能：**通知编译器查询头文件中相应的代码并导入，一个文件中只会被包含一次（无论调用多少次`#import`语句）
>**说明：**相比`C`的`#include`，`#import`能避免文件相互包含的情况导致的错误（`C`语言通过`ifdef`实现）。
>**注意：**`Foundation`框架的头文件占用了近1MB的磁盘空间，使用`#import <Foundation/Foundation.h>`包含头文件时，Xcode使用`预编译头文件`加快读取速度。

### 2.2.2    框架
>**框架：**是一种把`头文件、库、图片、声音等内容`聚集在一个独立单元中的集合体。
>**框架集：**一系列框架的集合。


#### 苹果公司提供的框架集
>**说明：**苹果公司将`Cocoa`、`Carbon`、`QuickTime`、`OpenGL`等技术作为框架集来提供。
>**Cocoa框架集：**包括以下框架
>+ Foundation
>+ Application Kit（简称AppKit）
>+ 支持性框架（Core Animation 和 Core Image）

>**扩展：**[Learn Cocoa On The Mac]()

### 2.2.3    `NSLog()`和`@"字符串"`
>**说明：**`Cocoa`给其所有函数、常量和类型名都添加了`NS前缀`（使用`NS`而不是`Cocoa`源自历史遗留：`Cocoa`的前身为`NextSTEP`工具包）。

#### NSLog函数
>**说明：**用于向控制台输出内容
>**原型：**`NSObjCRuntime.h`
```objective-c
/**
** @param {NSString *} format 字符串（可以包含格式说明符） 
** @param {...} 对应格式串中格式说明符可变参数
*/
void NSLog(NSString *format, ...)
```
>**技巧：**建议在`O-C`中使用`NSLog`替代`printf`，因为它添加了一些特性，比如
>+ 时间戳
>+ 日期戳
>+ 自动附带换行符`\n`等

#### NSString(`@"字符串"`)
>**说明：**`Cocoa`提供的`NSString`集成了大量`C`语言字符串没有的特性。`@"字符串"`表明其中的`字符串`作为`Cocoa`的`NSString`元素来处理。
>+ 字符串的长度
>+ 字符串比较
>+ 转换为整数和浮点数

>**格式串：**输出对象使用`%@`，会调用对象的`description`方法

## 2.3   布尔类型
>**关键字：**`BOOL`(比`C`语言的`bool`早十多年)
>**说明：**本质是`signed char`（通过`typedef`定义），使用8位存储空间
>+ `NO`：本质是`signed char`值0
>+ `YES`：本质是`signed char`值1

>**注意：**`O-C`的`BOOL`不仅能保存`NO`和`YES`，编译器将其作为`8位二进制数`处理，也就是说可以赋值其它整数和`char`类型值（大于一个字节将溢出）。

### 2.3.1    BOOL 强大的实用功能

```objective-c
#import <Foundation/Foundation.h>
/**
 * 比较两个 int 型值是否相等
 * @param {int} thing1 第一个值
 * @param {int} thing2 第二个值
 * @return {BOOL} YES 相等， NO 不相等
 */
BOOL areIntsDifferent (int thing1, int thing2) {
    if (thing1 == thing2) {
        return (NO);
    }else {
        return (YES);
    }
}

/**
 * 输出 BOOL 值对应的描述
 * @param {BOOL} yesNo BOOL值
 * @return {NSString} YES "YES", NO "NO"
 */
NSString *boolString (BOOL yesNo) {
    if (yesNo == NO) {
        return (@"NO");
    } else {
        return (@"YES");
    }
}

int main(int argc, const char * argv[]) {
    BOOL areTheyDifferent;
    // 调用areTheDifferent函数
    areTheyDifferent = areIntsDifferent(5, 5);
    // 调用boolString函数
    NSLog(@"are %d and %d different? %@", 5, 5, boolString(areTheyDifferent));

    return 0;
}
```

## 2.4   小结
