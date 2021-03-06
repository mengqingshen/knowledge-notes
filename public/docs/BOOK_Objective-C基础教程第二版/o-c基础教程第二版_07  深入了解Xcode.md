---
title: 7 深入了解Xcode
categories:
  - Objective-C基础教程第二版
---


## 7.1 窗口布局一览
>**说明：**窗口的组成部分

|组成|说明|相关功能|
|-|-|-|
|工具栏|位于窗口的最顶端|上面由很多工具按钮|
|导航器面板|位于窗口的左边，通常用来显示项目中的文件列表，也可以浏览其他内容|符号(symbol)、搜索(Search)、问题(Issue)、调试(Debug)、断点(BreakPoints)、和日志(Logs)|
|编辑器面板|卫浴中间偏右的位置|大部分时间都在这里工作|
|检查器面板|位于窗口右边|显示的是与上下文有关的信息，以及修改选中项属性值的按钮|
|调试器面板|位于底部居中位置|调试器运行的时候，堆栈和调试器控制器会出现在这里|
|库面板|隐藏在窗口右下角|列有项目资源、对象、代码片段和其他在项目中可能会用到的东西|

![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-01-03%20%E4%B8%8B%E5%8D%8810.16.15.png)

## 7.2 改变公司名称
>**说明：**公司的名称会出现在创建文件时自动生成的注释中。
![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-01-04%20%E4%B8%8A%E5%8D%8810.02.06.png)


## 7.3 使用编辑器的技巧
>**说明：**列举一下不同区域的使用的技巧
![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-01-03%20%E4%B8%8B%E5%8D%8810.16.15.png)


### 7.3.1 导航器面板
>1. 导航器视图中使用`过滤搜索框`过滤列表文件（可以在任意导航器视图中使用）
>2. 双击源文件在新窗口中打开它

### 7.3.2 工具栏
>1. 右上方有一组标记为View的工具栏按钮，用来显示／隐藏部分窗口

### 7.3.2 其它
>1. 窗口顶端的工具栏下面看文件的路径
>2. 在多个标签页中打开多个视图：View(菜单) -> Show Tab Bar -> +

## 7.4 在Xcode的帮助下编写代码

### 7.4.1 首行缩进（美观排版）
>**说明：**`O-C`并不要求缩进代码，但这么做是个好习惯。

|整理缩进|快捷键|菜单|
|-|-|-|
|自动整理缩进|Control + I|右键（代码编辑区）-> Structure -> Re Indent|
|向左缩进|Command + [|右键（代码编辑区）-> Structure -> Shift Right|
|向右缩进|Command + [|左键（代码编辑区）-> Structure -> Shift Left|

>**扩展：**设置`自动整理`的风格：Xcode(菜单) -> Preferences -> Text Editing -> Indentation

### 7.4.2 代码自动完成
>**说明：**当输入代码时，Xcode 会不断地比较你输入的代码和它生成的符号索引，如果两者匹配，Xcode就会给出建议。

|相关快捷键|用途|
|-|-|
|Control + .(半角句号)|使推荐列表向后翻页|
|Shift + Control + .(半角句号)|使推荐列表向前翻页|
|esc|切换推荐列表的显示和隐藏|
|tap(或Enter)|使用推荐列表中高，亮的推荐项||

>**技巧：**
>1. 查看对象或类可用消息：`[对象或类 + 空格 + esc键`
>2. 打开推荐列表中推荐方法的迷你帮助窗口：将鼠标悬停在推荐列表中的方法名上，便会看法哦窗口右边由一个`?`，点击它

### 7.4.3 括号配对
>**说明：**输入某些`闭括号`（比如`)、}、]`）时，如果匹配到对应的`开括号`，屏幕会闪烁。如果没有正确闭合，`Xcode`会发出警报声。这个功能叫做`括号配对`。
>**技巧：**双击某个`分隔符`，`Xcode`会选定它以及与它匹配的货号之间的全部代码。

### 7.4.4 批量编辑
>**注意：**批量操作是一件危险的操作，因此可以先创建一个`快照`用来恢复项目，但是`Xcode7`已经将此功能移除。

#### 查找和替换
>**说明：**`Edit -> Find`子菜单中包含几个非常方便的选项

|功能|说明|快捷键|
|-|-|-|
|Find in Workspace...|Command + Shift + F|在当前工作区中搜索|
|Find and Replace in Workspace...|Command + Alt + Shift + F|在当前工作区中搜索并替换|

>**缺点：**对于一些替换任务，查找和替换的功能并不好用
>+ 修改的过于彻底，比如只想重命名函数中的变量，但事实上整个文件中的变量名都被修改了
>+ 不能修改文件名（修改类需要同时修改文件名）

#### Edit all in Scope
>**说明：**在范围内编辑全部内容。
>1. 在编辑器中选中要修改的`标记名`
>2. 点击它，右边出现一个向下的箭头，点击箭头出现一个菜单
>3. 选择菜单，选择Edit all in Scope

>![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-01-05%20%E4%B8%8A%E5%8D%888.14.05.png)
>**注意：**如果Xcode中的语法高亮功能被关闭或改动很多，`Edit in all Scope`功能也许就会拒绝工作

#### Xcode内置的重构工具
>**说明：**不仅能重命名类，还能重命名相应源文件。
>1. 打开存在要修改的类名的文件，将光标放到类名中
>2. Edit(菜单)->Refactor->Rename

>**注意：**重构不能重命名注释中的文字。所以，`类里面的注释`、`Xcode生成的文件头注释`或者任何你编写的`文档注释`都需要手工编辑（可以通过查找和替换简化这一过程）。

### 7.4.5 代码导航

#### 快捷键
>**说明：**源自`emacs`，同时适用于Xcode、TextEdit、Safari的地址栏和文本域、Pages和Keynote文本域。
![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-01-05%20%E4%B8%8A%E5%8D%888.44.02.png)

#### 快速打开
>**说明：**大致有2种方式

|用途|操作|快捷键|
|-|-|-|
|项目文件搜索|File(菜单)->Open Quickly|Command + Shift + D|
|辅助窗口（默认打开当前文件对应的`.m`文件或`.h`文件）|View(菜单)->Assistant Editor->Show Assistant Editor|**打开：**Command + alt + Enter  **关闭：**Command + Enter

### 7.4.6 集中精力
>**说明：**`边栏（gutter）`和`聚焦栏（focus ribbon）`

|****|说明|操作|
|-|-|-|
|边栏|代码调试|
|聚焦栏|代码折叠|**显示聚焦栏：**`Xcode(菜单)->Preferences...->Text Editing->勾选Code folding ribbon`；**更多代码折叠操作：**`Editor->Code Folding`|


![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-01-05%20%E4%B8%8A%E5%8D%889.13.08.png)


### 7.4.7 使用导航条
>**说明：**里面的很多空间可以让你在项目中的原文件之间快速切换。
>![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-01-05%2011.05.05.png)


#### `#pragma`指令
>**说明：**可以将`O-C`常规代码之外的一些信息或说明传递给编译器和代码编辑器。
>+ `#pragma mark 说明`：添加标记到功能菜单
>+ `#pragma mark -`：在菜单中插入一条分割线


#### 注释中使用特殊字符

>**说明：**会将相应的注释信息放入功能菜单中，类似`#pragma mark`的效果。例如：
>+ `MARK:说明`
>+ `TODO:说明`
>+ `FIXME:说明`
>+ `!!!:说明`
>+ `???:说明`

![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-01-05%2013.13.37.png)

```objective-c
- (id) init
{
    #pragma mark 初始化父类
    if (self = [super init]) {
        engine = [Engine new];
        // MARK:初始化实例属性
        tires[0] = [Tire new];
        tires[1] = [Tire new];
        tires[2] = [Tire new];
        tires[3] = [Tire new];
    }
    return (self);
} // init
```

### 7.4.8 获取信息

#### 7.4.8.1 获得帮助
![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-01-05%2013.52.23.png)

#### 7.4.8.2 文档管理程序
>**说明：**访问苹果官方API文档有以下方式

|情景|操作|备注|
|-|-|-|
|quick search|option + 单击某个标记|只弹出一个包含概要信息的帮助窗口|
|在文档浏览窗口查看相应文档|option + 双击某个标记（或 将光标移动到标记內  + control + option + command + /）||


## 7.5 调试

### 7.5.1 暴力测试
>**说明：**在程序中写入语句（如`NSLog`）来输出程序中的控制流程和一些数据值。

### 7.5.2 Xcode的调试器
>**调试器：**位于程序和操作系统之间的程序，能够
>+ 中断程序，这样就可以检查程序的数据，甚至修改程序，然后恢复程序并查看运行结果
>+ 可以单步执行代码，减缓程序运行的速度，细致地查看代码会对数据进行哪些改动

>**调试窗口：**可以提供大量概述信息
>**调试控制台：**可以直接向调试器发送调试命令的调试控制台。
>**说明：**调试窗口可以选择两种调试器，`GDB`和`LLDB`，区别主要是精细度和内联性。
>+ **GDB：**GNU计划的一部分，可以在各种平台上兼容，享誉已久
>+ **LLDB：**LLVM计划多个Xcode工具中的一员

### 7.5.3 精巧的调试符号
>**说明：**调试程序时可以让编译器发出额外的调试符号，可以使用Debug构建配置（Product->Schema->Edit Schema）。

### 7.5.4 开始调试
>**说明：**使用GUI比命令行进行调试更加容易一些
>1. 设置断点
>2. 运行程序
>3. 调试

![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-01-06%20%E4%B8%8A%E5%8D%8810.52.03.png)


### 7.5.5 检查程序
>**说明：**在调试状态下，将鼠标放在变量名上时，会弹出一个`显示`当前数值信息的弹出窗，点击里面的值还可以`修改`当前值。

## 7.6 备忘表
>**说明：**Xcode键盘快捷键
![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-01-06%20%E4%B8%8B%E5%8D%8812.14.31.png)
![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-01-06%20%E4%B8%8B%E5%8D%8812.15.11.png)


## 7.7 小结