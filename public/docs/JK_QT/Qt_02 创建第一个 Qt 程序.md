---
title: Qt_02 创建第一个 Qt 程序
categories:
    - 极客学院_Qt
tag:
    - Qt
---

[视频](http://www.jikexueyuan.com/course/889.html)

# 1 Hello, Qt
本课时介绍如何利用简单的文本编辑器创建一个基本的 Qt 程序。

## 1.1 开始之前

+ 完成环境准备
+ 对 Qt 有个基本的了解
+ 会使用 c++ 基本语法

## 1.2 第一个 Qt 程序
**说明：** 第一个 Qt 程序不使用任何继承开发工具，使用 qmake 和基本的编辑器（我使用的是 Visual Studio Code）完成。
**注意：**项目名和文件名,甚至路径中都不能出现中文，否则编译时会报错


### 第一步：编写程序(只有一个 main.cpp 文件)

```bash
.
└── main.cpp # 主文件
```

*main.cpp*

```bash
// The first Qt Program
#include <QApplication>
#include <QLabel>

int main(int argc, char *argv[])
{
	// 创建 QApplication 实例
	QApplication hello(argc, argv);
	// 添加一个文本组件
	QLabel *label = new QLabel;
	label->setText("Hello, Qt");
	label->show();

	// 结束进程
	return hello.exec();
}
```

### 第二步：生成平台无关的项目文件

```bash
$ qmake -project "QT += widgets"
```

### 第三步：生成原生构造系统（GNU Makefile）

```bash
$ qmake
```

Info: creating stash file /Users/tonyearth/Projects/qt_demos
  - c语言基础/l01_HelloQt/.qmake.stash

### 第四步：构造刻执行的程序

```bash
$ make
```

/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/clang++ -c -pipe -stdlib=libc++ -isysroot /Applications/Xcode
.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.12.sdk -mmacosx-version-min=10.9  -O2 -std=gnu++11 -Wall -W -fPIC -DQT_NO_
DEBUG -DQT_WIDGETS_LIB -DQT_GUI_LIB -DQT_CORE_LIB -I. -I. -I/Applications/Qt/5.8/clang_64/lib/QtWidgets.framework/Headers -I/Applications/Qt/5.8/cla
ng_64/lib/QtGui.framework/Headers -I/Applications/Qt/5.8/clang_64/lib/QtCore.framework/Headers -I. -I/Applications/Xcode.app/Contents/Developer/Plat
forms/MacOSX.platform/Developer/SDKs/MacOSX10.12.sdk/System/Library/Frameworks/OpenGL.framework/Headers -I/Applications/Xcode.app/Contents/Developer
/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.12.sdk/System/Library/Frameworks/AGL.framework/Headers -I/Applications/Qt/5.8/clang_64/mkspecs/ma
cx-clang -F/Applications/Qt/5.8/clang_64/lib -o main.o main.cpp
/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/clang++ -headerpad_max_install_names -stdlib=libc++ -Wl,-sysl
ibroot,/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.12.sdk -mmacosx-version-min=10.9  -Wl,-rpath,/Ap
plications/Qt/5.8/clang_64/lib -o l01_HelloQt.app/Contents/MacOS/l01_HelloQt main.o   -F/Applications/Qt/5.8/clang_64/lib -framework QtWidgets -fram
ework QtGui -framework QtCore -framework DiskArbitration -framework IOKit -framework OpenGL -framework AGL

### 第五步：启动应用

```bash
.
├── Makefile # 第三步产物
├── l01_HelloQt.app # 第四步产物：打包好的应用
│   └── Contents
│       ├── Info.plist
│       ├── MacOS
│       │   └── l01_HelloQt
│       ├── PkgInfo
│       └── Resources
│           └── empty.lproj
├── l01_HelloQt.pro # 第二步产物
├── main.cpp # 第一步产物：编写程序
└── main.o # 第四步产物：目标文件
```

```bash
$ open l01_HelloQt.app
```

![](http://cdn.mengqingshen.com/14872304136613.jpg)

## 1.3 Qt 程序编译方式

+ qmake 编译
+ IDE 编译（Qt Creator）
+ 第三方编译工具

## 1.4 了解 qmake 与 make 命令

**qmake 编译步骤**

1. `qmake -project`
2. `qmake `
3. `make`

**Qmake 创建工程文件**

```bash
$ qmake -project # 创建 pro 文件

$ qmake -tp vc hello.pro # 创建 VS 工程文件

$ qmake -spec macx-xcode hello.pro # 创建 XCode 工程文件

$ qmake -spec macx-g++ hello.pro # 在 /Applications/Qt/5.8/clang_64/mkspecs 下查看可选组合
```

**window 和 Linux 环境使用 qmake**
基本是一样的，值的注意的一点，是 windows 版本的 Qt 提供了一个终端，自带 Qt 的环境 。

# 2 Qt Creator 与高效开发
本课时会讲解 Qt Creator 以及其他开发工具的使用，包括如何使用 Qt Creator 创建 Qt 工程。并讲解 Qt 工程中包括的文件以及 Qt.pro 文件中的语法。  

## 2.1 Qt Creator 的使用
### 2.1.1 Hello Qt 示例（Mac Desktop 版 ）

#### 创建项目
第一步：创建哪种应用类型
![](http://cdn.mengqingshen.com/14872500173981.jpg)

第二步：项目名称和存储位置
![](http://cdn.mengqingshen.com/14872503914274.jpg)

第三步：使用哪些工具集
![](http://cdn.mengqingshen.com/14872512629027.jpg)

第四步：初始化时的项目文件名等细节
![](http://cdn.mengqingshen.com/14872516089598.jpg)

第五步：项目管理（版本管理等）
![](http://cdn.mengqingshen.com/14872531853436.jpg)

#### 项目开发
![](http://cdn.mengqingshen.com/14872534456245.jpg)

*mainwindow.cpp*

```bash
#include "mainwindow.h"
#include <QLabel>
MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
{
    QLabel *label=new QLabel(this);
    label->setText("Hello, Qt");
    label->show();
}

MainWindow::~MainWindow()
{

}

```

#### 运行效果
![](http://cdn.mengqingshen.com/14872538489953.jpg)

### 2.1.2 使用 QtDesigner
#### 创建项目
**说明：** 创建项目时`勾选创建界面`即可使用 QtDesigner。

![](http://cdn.mengqingshen.com/14872580908438.jpg)

![](http://cdn.mengqingshen.com/14872584518084.jpg)

#### 项目开发

(1) 双击 .ui 文件， QtCreator 会自动进入设计模式，通过简单拖动就可以添加一些组件。

![](http://cdn.mengqingshen.com/14872591011165.jpg)

(2) 可以在代码中对 .ui 文件创建的组件进行进一步处理。

例如， *mainwindow.cpp*

```bash
#include "mainwindow.h"
#include "ui_mainwindow.h"

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    QLabel *label = ui->label;
    label->setText("Qt大法好！");

}

MainWindow::~MainWindow()
{
    delete ui;
}

```

(3) 运行

![](http://cdn.mengqingshen.com/14872591649212.jpg)

## 2.2 Qt 项目文件

QtCreator 会在项目源码所在目录外，创建一个新目录专门处理构建任务，从而保证源码目录的干净。

```bash
.
├── build-l01_HelloQtWithDesigner-Desktop_Qt_5_8_0_clang_64bit-Debug
│   ├── Makefile
│   ├── l01_HelloQtWithDesigner.app
│   │   └── Contents
│   │       ├── Info.plist
│   │       ├── MacOS
│   │       │   └── l01_HelloQtWithDesigner
│   │       ├── PkgInfo
│   │       └── Resources
│   │           └── empty.lproj
│   ├── main.o
│   ├── mainwindow.o
│   ├── moc_mainwindow.cpp
│   ├── moc_mainwindow.o
│   ├── moc_predefs.h
│   └── ui_mainwindow.h
└── l01_HelloQtWithDesigner
    ├── l01_HelloQtWithDesigner.pro
    ├── l01_HelloQtWithDesigner.pro.user
    ├── main.cpp
    ├── mainwindow.cpp
    ├── mainwindow.h
    └── mainwindow.ui
```

## 2.3 pro 文件语法
**说明：** 工程中的 .pro 文件是 qmake 的工程文件，它列举了工程中包含的源文件以及各种资源文件。
**应用：**由于直接使用 qmake 命令构建程序过于繁琐，因此大多数情况下会想构建相对简单的 .pro 文件，再使用 qmake 生成对应的 Makefile。

### 2.3.1 变量

pro 文件中一些重要的的变量|说明
---|---
QT|使用的 QT 模块
CONFIG|决定了程序编译时，链接哪些库（默认是 qt ，而QT 变量的值会进一细化使用哪些链接库）
TARGET|项目名
TEMPLATE|项目类型（app/lib/sudirs）
DEFINES|使用哪些 Qt 构造系统提供的模块
SOURCES|源文件
HEADRES|头文件
FORMS|UI 文件
RESOURCES|资源文件
OTHER_FILES|其它文件

### 2.3.2 操作符
操作符|功能
---|---
+=|扩展变量的值
-=|移除值
*=|扩展变量的值（该值如果已经有了则被忽略）
～=|增加一个符和正则的值

```bash
QT       += core gui # 使用的 Qt 模块
CONFIG += qt
greaterThan(QT_MAJOR_VERSION, 4): QT += widgets

TARGET = l01_HelloQtWithDesigner # 项目名
TEMPLATE = app # 项目类型 app/lib/subdirs

DEFINES += QT_DEPRECATED_WARNINGS

SOURCES += main.cpp\ # 源文件
        mainwindow.cpp

HEADERS  += mainwindow.h # 头文件

FORMS    += mainwindow.ui # UI 文件

```

## 2.4 与示例程序的使用
### 2.4.1 Qt帮助文档
#### QtAssistant
![](http://cdn.mengqingshen.com/14872608521228.jpg)

**说明：**Qt 专门提供的一个查看帮助文档的浏览器，可以方便地定制自己程序的帮助文档，为用户提供本地文档和在线帮助。
![](http://cdn.mengqingshen.com/14872608984254.jpg)
**特性：**

+ 快速查找
+ 全文搜索
+ 索引
+ 书签

#### QtCreator 帮助
![](http://cdn.mengqingshen.com/14872610159366.jpg)


## 2.2 编译运行示例程序
（1）示例程序的帮助文件
![](http://cdn.mengqingshen.com/14872611358629.jpg)

![](http://cdn.mengqingshen.com/14872613668782.jpg)

（2）编译运行
![](http://cdn.mengqingshen.com/14872614324619.jpg)

![](http://cdn.mengqingshen.com/14872615318710.jpg)

# 3 Qt Designer 与窗口组件
本课时将演示如何使用 Qt Design 创建可供创建 C++ GUI 程序时使用的UI文件，并讲解 Qt Design 的用法并演示 Qt Design 中常用的窗口组件。  

## 3.1 创建新的 UI 文件
**注意：** UI 文件本质上是一个 xml 文件，但只能在设计模式下修改。

(1)新建文件或项目
![](http://cdn.mengqingshen.com/14872624708495.jpg)

(2) 选择 Qt Designer Form
 ![](http://cdn.mengqingshen.com/14872625475227.jpg)

(3) Form Template
![](http://cdn.mengqingshen.com/14872626561978.jpg)

(4) Location
![](http://cdn.mengqingshen.com/14872627000555.jpg)

(5) summary
![](http://cdn.mengqingshen.com/14872627280920.jpg)

## 3.2 Designer

### 设计模式
![](http://cdn.mengqingshen.com/14872629059819.jpg)

### qss 样式表
**说明：**
 类似 css 样式表。

![](http://cdn.mengqingshen.com/14872631095854.jpg)

![](http://cdn.mengqingshen.com/14872632464144.jpg)


### 预览当前编辑的 UI 界面


![](http://cdn.mengqingshen.com/14872634712081.jpg)

### 工具提示
**说明：** 鼠标悬浮在组件上时的提示。

![](http://cdn.mengqingshen.com/14872684661068.jpg)


![](http://cdn.mengqingshen.com/14872684393225.jpg)

### 组件分组
![](http://cdn.mengqingshen.com/14872638875483.jpg)

## 3.2 常见组件

### Buttons
#### Push Button
用的最多的`普通按钮`，可以理解为命令按钮。
![](http://cdn.mengqingshen.com/14872688736499.jpg)

例如
![](http://cdn.mengqingshen.com/14872688210036.jpg)
---

#### Tool Button

`工具按钮`。相比 Push Button，应用场景更加具体，可以用来做详细设置或命令的快速入口。
细设置或命令的快速入口。

![](http://cdn.mengqingshen.com/14872693135557.jpg)

例如
![](http://cdn.mengqingshen.com/14872690963412.jpg)


#### Radio Button

`单选`。
注意：会自动作为一组。同一分组的 Radio Button 只能有一个被选中。

![](http://cdn.mengqingshen.com/14872695856964.jpg)


#### Check Box
`复选`。

![](http://cdn.mengqingshen.com/14872695967015.jpg)

#### Command Link Button
从 windows vista 开始引入的一种新的控制按钮。类似一个单选按钮，可以用它在一个互斥的选项中选择一个，而不是直接使用这个按钮本身。
![](http://cdn.mengqingshen.com/14872697984636.jpg)

#### Button Box
严格说来，这个组件是一个`按钮组`，不是单个按钮，包含了两个按钮，一般用在对话框。

![](http://cdn.mengqingshen.com/14872698849866.jpg)

### Item Views(Model-Based)
说明：每个单元需要自己定义，自己维护，因此需要对 Model 框架比较了解。优势是可以很大程度降低数据冗余，提高效率

### Item Widgets(Item-Based)
每个单元都是 Item ，相比 Item Views 更简单，可以满足大部分场景。
#### List Widget
`列表控件`。
![](http://cdn.mengqingshen.com/14872705496414.jpg)


双击开始编辑列表控件
![](http://cdn.mengqingshen.com/14872704352800.jpg)

有两种模式可以选择

![](http://cdn.mengqingshen.com/14872705328382.jpg)


#### Tree Widget
`树状列表`。
![](http://cdn.mengqingshen.com/14872707055148.jpg)

#### Table Widget
`表格`。
 ![](http://cdn.mengqingshen.com/14872707520822.jpg)

### Containers
让组件在窗体中更好地布局，更有条理，避免在内容多的时候显得凌乱。可以随意地把其它组件加到一个容器中，容器中的组件只会在范围内显示，不会超出范围。

#### Group Box
`组件框`，带有一个标题。
![](http://cdn.mengqingshen.com/14872710742169.jpg)

#### Scroll Area
`滚动区域`，内容溢出会出现滚动条（器它容器会隐藏）
。

![](http://cdn.mengqingshen.com/14872713809149.jpg)

#### Tool Box
`抽屉`。

![](http://cdn.mengqingshen.com/14872712998584.jpg)


#### Tab Widget
带标题的`选项卡`切换。选项卡中的内容都是独立的。

![](http://cdn.mengqingshen.com/14872714115848.jpg)

#### Stacked Widget
也是一个 `选项卡`组件，不过没有选显卡标题，可以通过程序自己来维护内容的切换。
![](http://cdn.mengqingshen.com/14872715240144.jpg)

这是一个相当常用的功能，例如 OS X 的设置程序，
![](http://cdn.mengqingshen.com/14872716822704.jpg)

通过点击不同的图标，可以进入不同的设置界面。

#### Frame 
一个`边框组件`，可以用来实现不同的边框效果（比如形状和阴影）。

![](http://cdn.mengqingshen.com/14872718306392.jpg)

#### Widget
所有用户界面的基类，可以在一个 Widget 中嵌套另一个 Widget 。

#### MDIArea
提供了一个可以绘制多个窗口地区域。
![](http://cdn.mengqingshen.com/14872722073152.jpg)

添加子窗口
![](http://cdn.mengqingshen.com/14872722306488.jpg)

每个窗口都可以自由拖动，且可以很方便地切换
![](http://cdn.mengqingshen.com/14872723341344.jpg)

#### Dock Widget
一个比较特殊也比较实用的组件，提供了一个可以锁定在主窗口中，或者作为一个顶层组件、自由悬浮的窗口。大多数时候做为工具面板。

例如，PhotoShop、各种继承开发环境包括 QtCreator 中有用到。

![](http://cdn.mengqingshen.com/14872727971161.jpg)

### Input Widgets

#### Combo Box
`下拉列表`
![](http://cdn.mengqingshen.com/14872728984142.jpg)

![](http://cdn.mengqingshen.com/14872729089219.jpg)

#### Font Combo Box
选择字体的下拉列表，默认使用系统的字体作为选项。

![](http://cdn.mengqingshen.com/14872729393128.jpg)

![](http://cdn.mengqingshen.com/14872730085199.jpg)


#### Line Edit
一个`单行文本编辑框`。
![](http://cdn.mengqingshen.com/14872730970087.jpg)

**输入模式**
有多种输入模式可以选择
![](http://cdn.mengqingshen.com/14872731217394.jpg)


**一键清除**
可以显示一个一键清除的按钮
![](http://cdn.mengqingshen.com/14872732417715.jpg)

![](http://cdn.mengqingshen.com/14872732272718.jpg)

#### Text Edit
一个强大的，单页面，多信息文本编辑器。支持 HTML 标记，所见即所得。对大文档的显示进行了优化。

![](http://cdn.mengqingshen.com/14872733850288.jpg)

#### Text Edit
指针对纯文本文档。对大文档的显示进行了优化。

#### Plain Text Edit

#### Spin Box
整数输入组件。
![](http://cdn.mengqingshen.com/14872735778773.jpg)


#### Double Pin Box

小数输入组件。
![](http://cdn.mengqingshen.com/14872735869848.jpg)
#### Time Edit
![](http://cdn.mengqingshen.com/14872736634065.jpg)

可以提供激活日历选择器。
![](http://cdn.mengqingshen.com/14872738001500.jpg)

#### Date Edit
![](http://cdn.mengqingshen.com/14872737393536.jpg)

可以提供激活日历选择器。
![](http://cdn.mengqingshen.com/14872738023740.jpg)



#### Date/Time Edit
![](http://cdn.mengqingshen.com/14872739124794.jpg)


可以提供激活日历选择器。
![](http://cdn.mengqingshen.com/14872738092103.jpg)
![](http://cdn.mengqingshen.com/14872738240116.jpg)

#### Dial
可以做表盘或用来进行控制的旋钮。
![](http://cdn.mengqingshen.com/14872739352830.jpg)

#### Horizontal Scroll Bar
![](http://cdn.mengqingshen.com/14872740126419.jpg)

#### Vertical Scroll Bar
![](http://cdn.mengqingshen.com/14872740248898.jpg)
#### Horizontal Slider
![](http://cdn.mengqingshen.com/14872741029837.jpg)

#### Vertical Slider
![](http://cdn.mengqingshen.com/14872741334720.jpg)

#### Key Sequence Edit

快捷键序列编辑器。
![](http://cdn.mengqingshen.com/14872741926786.jpg)


### Display Widgets
仅仅提供显示功能的组件，不能交互。
#### Label
![](http://cdn.mengqingshen.com/14872744320649.jpg)

#### Text Browser
支持 HTML 标记，所见即所得。

#### Graphics View
可以显示大量 2D 图像，支持旋转、缩放。

#### Canlendar
![](http://cdn.mengqingshen.com/14872745503988.jpg)

#### LCD Number
用来显示一些数字和特殊的符号，用的是一种 LCD 显示屏的风格。类似计算机。
![](http://cdn.mengqingshen.com/14872747765698.jpg)

#### Progress Bar
进度条。
![](http://cdn.mengqingshen.com/14872748074727.jpg)

#### Horizontal Line
![](http://cdn.mengqingshen.com/14872748281999.jpg)

#### Vertical Line
![](http://cdn.mengqingshen.com/14872748375230.jpg)

#### Open GL Widget
显示 3D 绘图。
#### QDeclarativeView
在触屏和嵌入式设备上更友好。
#### QQuickWidget
用来显示一个 QtQuick 的用户界面。
#### QWebView
QtWebKit 的主要组件，可以显示 HTML 文档（可以是本地的，也可以是一个链接）。

### Layouts
使用布局可以可以方便整洁地构建一个应用界面，类似 java swing 中的布局，不过 Qt 的布局种类提供的要少一些。

#### Vertical Layout
纵向布局。
![](http://cdn.mengqingshen.com/14872754574437.jpg)

#### Horizontal Layout
横向布局。
![](http://cdn.mengqingshen.com/14872754908870.jpg)

#### Grid Layout
网格布局。

#### Form Layout

### Spacers
弹簧组件，用于处理布局中的间隔。会自动根据空间大小和样式调整间隔,以及组件的高度或宽度。

#### Vertical Spacer
![](http://cdn.mengqingshen.com/14872756762059.jpg)

#### Horiaontal Spacer
![](http://cdn.mengqingshen.com/14872756860690.jpg)


