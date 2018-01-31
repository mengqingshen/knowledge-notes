---
title: Qt_05 Qt 模块与类
categories:
    - 极客学院_Qt
tag:
    - Qt

---

Qt 中有15个必要模块，28个附加模块，以及8个增值模块和2个正在开发完善中的模块，它们中的一些我们每天都在使用，也有些可能永远都用不上。对这些模块做一个了解，有助于在开发时明确知道需要的功能，提高开发效率。 

[学习网站地址](http://www.jikexueyuan.com/course/1679.html)


# 1 Qt 基本模块
 Qt 中的15个基本模块，这些模块是 Qt 在所有平台上的基础。另外将简单介绍最新的 Qt WebView 以及 Qt Canvas 3D 模块。

## 1.1 核心模块
Qt 核心功能|说明
---|---
The Meta-Object System|元对象系统
Thread|线程
I/O|输入输出
Containers|容器
The Qt Resource System|资源系统
The Animation Framework|动画框架
The EventSystem|事件系统
The State Machine Framework|状态机框架
JSON Support|JSON 支持
Qt Plugins|插件支持

Qt Core C++ 类|说明
---|---
Input/Output Classes|输入输出类
Container Classes|容器类
Threading Classes|线程类
Implicitly Shared Classes|隐式共享类
Animation Classes|线程类
Event Classes|事件类
State Machine Classes|状态机类
Plugin Classes|插件类

### The Meta-Object System
作为 Qt  对标准 c++ 的扩展，元随想系统提供了对象间的通信机制，也就是信号和槽、运行时的类型信息和动态属性支持。

相关模块|说明
---|---
`The Meta-Object System`|元对象系统
`The Property System`|属性系统
`Object Model`|对象模型
`Object Trees & OwnerShip`|对象树
`Signals &Slots`|信号槽

### Thread
Qt 维护了一组平台无关的线程支持类，一种发布事件线程安全的方式，以及跨线程的信号槽连接。在执行一些耗时的操作或者让 UI 在后台不冻结，多线程编程是一种很重要的方式。Qt 对多线程的支持可以在文档中的 `Thread Support in Qt`  中找到相关的信息。

### I/O
相关类|说明
---|---
QDir|处理针对目录结构的操作
QFile|文件读写
QFileInfo|获取不同平台下的文件信息
QFileSystemWatcher|监控文件和目录的改动
QIODevice|维护了所有I/O类型设备的接口
QUrl|对链接类型的字符串的接口

还有其它针对图片、资源、驱动器的接口。
### Containers
Qt 提供了一套通用的基于模版的容器类。可以用这些类来存储各种类型的项目。比如要存储 QString 数组，可以使用 QVector 容器，这些容器比 C++ STL 更轻量，更安全，同时了更容易使用。

**优点**

+ 隐士共享
+ 可重载
+ 内存消耗低
+ 线程安全

**容器的迭代器**
提供了 Java 和 STL 两种风格的迭代器。和 STL 风格的迭代器相比， Java 风格的迭代器更易用，且提供了更多更高级的功能，更加高效，并且能够使用 Qt 和 STL 的通用算法。

**注意：** Qt 的容器都是可嵌套的。

线性容器|说明
---|---
QList|数组列表
QLinkedList|链表
QVector|内存中是连续的
QStack|LIFO（后进先出）
QQueue|FIFO（先进先出）

关联容器|说明
---|---
QMap|字典
QMultiMap|一个键关联可以多个值的字典
QHash|哈希字典
QMultHash|一个键关联可以多个值哈希字典
QSet|集合
QCache|缓存
QContiguousCache|提供了有限缓存的高效查找

### The Qt Resource System
Qt 额外了提供了一套平台无关的机制，存储程序中用到的，比如

+ 图标；
+ 二进制资源。

**RCC（资源编译器）**
Qt 的资源系统是基于 QMake RCC 和 QFile 来工作的，祝需要创建一个 .qrc 格式的资源文件，最后把资源文件添加进去就好了。

### The Animation Framework
用来维护各种动画的动画框架。
### The EventSystem

+ 时间事件
+ 鼠标键盘事件
+ ...

### The State Machine Framework
用来维护状态,按钮的点击等。

### JSON Support
对 JSON 数据的支持

### Qt Plugins
创建 Qt 插件。

## 1.2 QT GUI 核心功能

QT GUI 核心功能|说明
---|---
`Application Windows`|程序窗口
`2D Graphics`|2D 图形
OpenGL and OpenGL ES Integration|OpenGL 和 OpenGL ES 整合

QT GUI C++ 类|说明
---|---
Event Class|事件类
Painting Classes|绘画类
Rendering in 3D|3D 渲染类

### Application Window
相关类|说明
---|---
QGuiApplication|应用程序的初始化，事件循环和调度等各种工作
QWindow|维护应用的底层窗口，提供了一些虚函数来处理各种事件。比如触摸、输入、键盘以及组件的变形等

### 2D Graphics
2D 图像的显示，图片、字体以及内容排版的维护等等。

### OpenGl and OpenGL ES Integration
QWindow 中支持使用 `OpenGl` 和 `OpenGL ES Integration` 来显示 3D 图形，具体会使用哪种 API ，Qt 会根据不同平台进行选择。

## 1.3 Qt Widgets
Qt Widgets 应该是在编写 Qt GUI 程序时使用最多的模块，提供了一些列用来创建 UI 界面的元素，比如按钮、文本框等。

### Styles
Qt GUI 的一大特色就是能够使用一种类似 css 的样式表的 qss(Qt Style Sheets) 语言来修改界面的外观。Qt Widgets 模块下有一个专门的类 QStyle 来维护样式表。

### Layouts
使用布局是一种优雅且灵活的自动整理子组件的方式。如果使用布局组件，每个子组件都会以属性的形式返回它需要的尺寸。系统就会分配可用空间给它们，

### Model/View Classes
Qt 中有很多组件都具有 Mode 和 View 两种类。比如表格、树状图。它们也是 Qt Widgets 的一部分。

### Graphics View
Qt Widgets 提供了一个平面视图框架来管理和显示大量用户自定义的 2D 图像。

## 1.4 Qt QML
QML 语言为 Qt 实现界面提供了另一种重要途径。与 c++ 相比，使用 QML 能让我们花费更少的时间，维护一套更好的交互界面，无论是在交互上，还是在用户友好上，都比 c++ 更有优势，

**Qt Quick**
编写 QML 的基本库，为 Qt QML 提供了引擎和语言基础。在此基础上，为提供了运行 QML 程序界面所需要的所有基本类型。

Qt Quick 相关库|说明
---|---
`Qt Quick Controls`|Qt Quick 需要的控制。
`Qt Quick Dialog`|维护了和 c++ 模块类似的颜色选择、字体选择、文件对话框、消息对话框。
`Qt Qucik Layout`|Qt Quick 的界面布局。

## 1.5 media

### Qt Multimedia
在 QML 或 c++ 中使用媒体的必要模块。

+ 摄像机
+ 录音机
+ 三维环绕音的模仿

**C++类**

+ QAudioOutput
+ QCamera
+ QCameraImageCapture
+ QMediaPlayer
+ QRadioTunner
+ QVideoRendererControl

**QML 类**

+ Audio
+ Camera
+ MediaPlayer
+ Radio
+ Video

### Qt Multimedia Widgets
把多媒体和组件控制联系起来的附加模块。是在 Qt Widgets 和 Qt MultiMedia 基础上构建的。

## 1.6 Qt WebKit
WebKit 是一个开源的浏览器引擎，死对头有

+ FireFox: Gecko
+ IE：Trident

同时也是 MAC OS X 系统引擎框架版本的名称。主要用于 Safari，xbox和其它一些 MAC OS X 的程序。WebKit 所包含的 WebCore 排版引擎，和 JSCore 引擎来自于 KDE 的 KHTML 和 KJS。如今绝大多数浏览器都采用了 WebKit 作为其浏览器引擎。

Qt 也采用了 WebKit 作为其内嵌浏览器的支持，并对其进行了封装。Qt WebKit 使用了自己的文本、会话、以及网络模块，提供了更加容易使用的 API，因此我们可以通过 Qt WebKit 快速创建一个机遇网络服务的应用。

### Qt WebKit
只能在 QML 中使用。
### Qt WebKit Widgets
只能在 C++ 中使用。

## 1.7 Qt NetWork
提供了对网络的支持。提供了一些列 API，让我们能使用 TCP/IP 协议，通过 HTTP、Cookie发送数据。可以很方便地调用通用的 Web API，实现很多在 Web 端才能实现的功能。

## 1.8 Qt Sql
提供了对数据库连接的支持。维护了与各种数据库的连接、查询等等，包括 SQLite、MySql、SqlServer等。只不过在部分系统上需要自己编译驱动模块。Qt Sql 模块提供了包括数据库驱动支持，操作 API 和用户界面布局等等。

## 1.9 Qt Test
提供了单元测试的支持。有了 Qt Test 模块，不需要专门寻找用于 Qt 单元测试的工具，使用 Qt Test 就可以在 c++ 或 qml 中完成对程序的单元测试。

## 1.10 Qt WebView 以及 Qt Canvas 3D

**Qt WebView**
让我们不需要包含整个浏览器栈，就能在程序中包含一个网页，而是使用原生的 API。已经在 Qt 5.5 版本中作为基本模块标配。

**Qt Canvas 3D**
让我们可以在 qml 中通过 JavaScript 利用 openGL 来绘画。


# 2 Qt 附加模块
 Qt 中的31个附加模块以及8个企业版本中的增值模块。

## 2.1 Qt 附加模块简介
附加模块主要是 Qt 为了某个明确的功能而额外提供的维护。而且，某些并不一定跨平台。大部分是功能完整而且向后兼容的，不过出于开发和实用性的考虑，每个附加模块都会有单独的兼容性承诺。

跨平台模块|说明
---|---
Enginio|Qt 提供的一个 BAAS 解决方案，提供了一个数据库后台和一系列 Qt 风格的 API。可以通过这些 API 将应用的数据存储在云端。类似网盘，但能够提供比普通网盘更加强大的功能，比如使用后段服务器进行云通信。
Qt Canvas 3D|Qt 5.5 中被作为附加模块发布，只能在 QML 中使用
Qt Concurrent|提供了一些列多线程的高等级 API，使我们在编写多线程程序的时候，无需使用低级线程，如互斥、读写锁、等待条件或者信号灯等等。
Qt D-Bus|一种高级的 IPC 和 RPC 机制，使用统一的通信协议来解决现有的各种 RPC 解决方案。允许系统及进程，比如打印机、硬件驱动服务，和普通进程进行通信。D-Bus 本来是为 LInux 开发的，具有低延迟、低消耗的特点。尤其适合统一设备的通信。Qt D-Bus 是 D-Bus 协议的 Qt 实现，Qt 提供了跨平台等其它附加功能。
Qt Graphical Effects|Qt 为了给 Qt Quick 增加令人应先深刻且可配置的视觉效果提供了一些列 qml 类。以 UI 组件的方式添加到 Qt Quick 的视觉部件。
Qt Image Formats|Qt GUI 默认提供了对 jpg、png、jpeg、gif、bmp等常用图片格式的读写支持，但还有一些不是必需的图片格式，需要使用该插件提供对这些图片的读写支持，比如 dds、tiff。限于协议的原因，不是所有的格式都是支持的。也有的格式只支持读，不能写。需要注意的是，这个模块没有提供 API，我们只需要引入这个模块，就可以正常读写哪些特殊格式的图片。
Qt Platform Headers|有些开发者可能喜欢将 Qt 与其它框架混合使用，比如使用某个其它框架提供的图形环境，或者原生句柄。这些原生句柄一般是高度平台相关的，而且在一般情况下，这个插件需要更多信息来决定选择那个句柄。这时我们可以把 Qt Platfoem Headers 和 Qt GUI Application 中的平台函数配合使用，从而为这些平台相关的功能提供一种相对安全的接口。
Qt Positioning 和Qt Location|Qt 定位模块使在 c++ 或 qml 中获得位置信息称为可能。支持包括 IOS、Android、WindowsRT 在内的很多平台，而且提供了包括 GPS、WiFi在内的多种定位方式。配合 Qt 5.5 提供的预览模块 Qt Location，我们可以直接在 qml 程序中显示地图以及导航。
Qt Print Support|是一个相当重要的模块，提供了跨平台打印的能力。而且 Qt 调用的是每个平台上的系统打印接口，同时支持本地打印和网络打印机，同时还支持保存为 PDF 文件。Qt 提供了一些列的类来方便我们使用打印模块，比如一个本地风格的打印预览对话框，打印设置以及打印驱动等。
Qt Quick Extras|提供了能在 Qt Quick 中使用的额外的控制组件，比如圆形调节器和切换按钮等等。
Qt Quick Widgets|c++中的组件模块，提供了一个能在 c++ 中显示 Qt Quick 界面的组件。这个模块只有一个类 QQuickWidget。
Qt Script 与 Qt Script Tools|Qt 对 ECMAScript 语言提供了很好的支持，我们可以用类似 JavaScript 语言的脚本完成很多工作。而且脚本中还支持信号槽和错误信息。Qt Script 模块正是用来完成这些的。它内置了对 QObject 的支持，所以可以使用信号槽等功能。Qt Script 还兼容 Qt 4 老版本，不过在 qml 中不推荐再使用 Qt Script 模块，Qt 为 qml 提供了更适合的 QJS 模块。Qt Script Tools 为使用 Qt Script 提供了一个可以嵌入进去的调试器，通过这个调试器，我们可以观察脚本的状态和执行环境，控制脚本的执行。
Qt SVG|SVG 是一种基于 xml 描述二维矢量图片的图形格式。Qt SVG 提供在在 widget 和其它绘图设备中描绘和显示 SVG 图形的类。
Qt WebChannel 与 Qt WebSockets|Qt WebChannel 允许使用 qml 或 c++ 编写的主机与 HTML 或 JavaScript 客户端之间的 p2p 通信。这个模块同时支持 Qt WebKit2 和 Qt Engine。在所有支持 Qt WebSockets 的浏览器中都可以正常工作。QtWebChannel 程序可以运行在任何 JavaScript 环境中。Qt WebSockets 提供了对 WebSockets 的支持。

特定平台模块|说明|支持的平台
---|---|---
Active Qt|提供了对 Windows 中的 ActiveX 的支持|Windows
Qt Bluetooth|提供了对蓝牙模块的支持|Android/iOS/Linux/OS X
Qt NFC|提供了对近场通讯的支持|Linux
Qt Sensors|提供了对移动设备传感器的支持|Android/iOS/WinRT
Qt Serial Port|提供了对串口和虚拟设备串口的支持|Windows/Linux/OS X
Qt WebEngine 与 Qt WebEngine Widgets|在 c++ 和 qml 中显示 WebEngine 的模块|Windows/Linux/OS X
Qt Windows/Mac/X11/Android Extras|对不同平台扩展提供了特有功能|Windows/OS X/Linux/X11/Android

不再推荐使用的模块|替代者
---|---
Qt OpenGL|Qt GUI 模块中中的 QOpenGL
Qt Declarative|无

## 2.2 企业增值模块简介
除了基本的技术支持外， Qt 也提供了一些商业授权的增值模块。比如怎对 Qt Quick 的编译器，用于开发支付功能的模块，允许自由开发的虚拟键盘等等。

这些模块都是在 Qt 收费授权中提供的，需要高昂的授权费。

### Qt for Device Creation
这是一个工具，是快速简单、完全一体的嵌入式开发环境，还包括了很多其它增值功能。

### Qt Chart
是一个可以提供一些很好看的图表的模块，可以使用动态或静态的数据模型。

### Qt Quick Compiler
qml 以及 JavaScript 是描述性语言，Qt Quick 在程序中是直接读取 qml 文件，再渲染的，错误都在程序运行后知道。而编译器的好处就是提高运行效率，减少资源消耗，还能提前知道错误。

### Qt Data Visualization
一个 3D 数据视图组件，具有令人静态的效果。

### Qt Purchasing
为 Qt 的移动应用程序增加内置购物程序。

### Qt Virtual Keyboard
虚拟键盘模块是一个类似 qml 虚拟键盘的框架，支持不同的输入模式，支持本地键盘布局，支持自定义输入法皮肤。除了内置的输入语言支持，还可以自己创建新的输入法。甚至可以开发一个远远超过搜狗拼音的输入法。

### Qt Quick 2D Renderer
能够在不支持 openGL 的设备上支持使用 Qt Quick 界面。

# 3 Qt4 模块

**Qt 5的改变**
Qt5 中修改了底层架构。Qt5 引入了模块化的概念。
Qt4 就存在模块化，但划分较粗，每个模块都有大量不同的功能，使用起来反而不方便。Qt 5 将这些模块细化成了不同的小模块，并进行了很多底层上的更新重写。Qt4 到 Qt5 绝不是刷版本号这么简单，除了信号槽，大部分的改动存在于 UI  上面。

**为什么使用 Qt4？**
Qt4 对于模块的划分相对粗糙，但是对于对 UI 要求不高的项目 Qt4 无疑是一个很好的选择，而且市面上 Qt4 的资料也比较多。本课时简单介绍 Qt4 中的模块。

## 基本模块
**Qt Core**：不支持 JSON 和 XML 的处理。
**Qt GUI**：Qt GUI + Qt Widgets

**Qt Multimedia**
**QtNetwork**
**QtOpenGL**：被弃用，响应的功能被移动到 Qt GUI m模块

**Qt OpenVG**
**Qt Script与 Qt Script Tools**

**Qt SVG**
**QtWebkit**: Qt WebEngine
**QtXml**
**QtXmkPatterns**
**QtDeclarative**
**Phonon**
**Qt3Support**

## Qt 工具模块
**QtDesigner**
**QtUiTools**
**QtHelp**
**QtTest**

## 特定平台模块
**QAxContainer 和 QAxServer wnidows**
**Qt D-Bus Linux**





