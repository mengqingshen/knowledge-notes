---
title: Qt_03 Qt 组件与信号链接
categories:
    - 极客学院_Qt
tag:
    - Qt

---

在前面的课程中，我们已经学习了使用 Qt 开发简单的跨平台 GUI 程序，并且演示了 Qt 中常用的 UI 组件。现在你应该以及可以使用 Qt 开发一个小程序了。不过上节课我们只讲解了使用 QLabel 显示文本框，而作为一个程序，除了显示信息外，还需要与用户有基本的交互。所以，按钮对一个 GUI 程序来说，也是必不可少的。本次课程就来讲讲 Qt 如何通过信号槽来连接各个 UI 组件。

# 1 信号槽简介
通过对 Hello,Qt 程序的修改，来解释什么是信号槽机制。

## 1.1 一个简单的例子
例如，通过信号槽实现点击 Push Button 实现 Label 的显示和隐藏。
![psuhbuttonclicked](http://o6ul1xz4z.bkt.clouddn.com/psuhbuttonclicked.gif)

### 第一步：界面设计
添加 Push Button 被 Label 。
### 第二步：使用信号槽
**方式一：在 UI 文件中实现**
在 Singnals && Editor 面板中添加信号。
![](http://o6ul1xz4z.bkt.clouddn.com/14873082599746.jpg)

**方式二：在代码中实现**
也可以用代码实现，如下

*头文件/mainwindow.h*

```c++
#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>

namespace Ui {
class MainWindow;
}

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit MainWindow(QWidget *parent = 0);
    ~MainWindow();

// 为界面声明一个 slots
private slots:
    void on_pushButton_clicked();

private:
    Ui::MainWindow *ui;
};

#endif // MAINWINDOW_H

```

*源文件/mainwindow.cpp*

```c++
#include "mainwindow.h"
#include "ui_mainwindow.h"

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    QLabel *label = ui->label;
    ui->label->hide();
}

MainWindow::~MainWindow()
{
    delete ui;
}

// pushButton 被点击时，显示 label。
void MainWindow::on_pushButton_clicked()
{
    ui->label->show();
}
```
## 1.2 什么是信号槽？
`信号槽`是 Qt 实现的一种在对象间进行通信的高级接口。

MFC 使用的是一种事件驱动的机制，其它的 GUI 框架则使用了回调，窗口部件会通过回调函数完成对事件的响应，而会调用函数通常是指向否个对象的函数的指针。 Qt 的信号槽就是用来取代这些传统的回调函数的。

### 信号槽

**signals**

+ 当一个信号被 emit 的时候，相关联的槽就会被执行
+ 当所有关联的槽都被执行完毕后，emit 才会返回。


**slots**

+ 本质上是一个 C++ 函数。特别的地方在于可以和 signals 相关联。
+ 如果一个信号关联了多个槽，这些槽会一个接一个执行，但执行顺序是不确定的。

# 2 信号槽机制原理
结合代码讲解信号槽机制的原理和实现。

## 2.1 声明信号槽

举一个极简的实现信号槽机制的 Qt 类的例子，如下

```c++
class Example: public QObject
{
    Q_OBJECT
    // 声明自定义的信号
    signals:
        void customSignal();
        void customSignal(int i);
    // 声明自定义的槽
    public slots:
        void customSlot();
        void customSlot(int i);
}
```

抽象出在 Qt 中要自定义具备信号槽机制的对象的一般结构，如下

```bash
# 需要继承 QObject 类
:public QObject
    # 开头需要声明 QOBJECT 宏
    Q_OBJECT
    # 信号
    signals:
        emit
    # 槽
    slots:
        public slots # 任何组件都可以将它们的信号关联到这个槽
        private slot # 只有这个类自己可以关联这个槽，其它类甚至它的字类都不能
        protected slots # 只有这个类自己或者它的子类可以将信号关联这个槽
```

+ signals、slots、emit 等关键字是 Qt 定义的关键字，而不是标准 c++ 的关键字，它们是对 c++ 的扩展。实际上，这些关键字都是一些简单的宏，
+ Qt 中定义了一些列和信号槽息息相关的宏
+ 信号槽需要在头文件中声明，在程序编译前，MOC 工具会对源码进行预处理，没在头文件中声明是不会被处理的，
+ 和普通 c++ 函数一样， sigmal 或 slots 是可以重载的。
+ slots 有三种修饰符，public、private 和 protected

## 2.2 宏与 MOC 源对象

### 2.2.1 宏
**说明：**Qt 中很多与信号槽相关的宏都是在 `qobjectdefs.h` 中定义的，摘取片段如下

*qobjectdefs.h*

```c++
...
#define slots
#define signals public
...
# define emit // 一个空的宏，而且 MOC 也不会对它进行处理，因此 emit 其实是可选的，用来提高程序的可读性，提醒用户这个函数是用来发送信号用的。
...
```

信号和槽都是普通的函数，编译器会把它们当作普通函数对待。

### 2.2.2 MOC(元对象编译器)
**元对象系统**
Qt的`元对象系统`是用来处理对象间通信的信号和槽，它运行信息类型和动态属性。Qt 的源对象系统包括3个部分：

![](http://o6ul1xz4z.bkt.clouddn.com/14873166654930.jpg)

**MOC 工作原理**

元对象编译器读取C++源文件时，如果发现在文件中类的声明中含有 `Q_OBJECT` 宏，元对象编译器就会给含有 `Q_OBJECT` 宏的类生成另一个含有元对象代码的 C++ 源文件，这个生成的源文件必须与这个类的实现一起编译和链接。

![](http://o6ul1xz4z.bkt.clouddn.com/14873209758999.jpg)

### QObject
**说明：**QObject 定义了一系列函数和 一个静态的QObjectMeta 对象，这些函数会由 MOC 在生成的 c++ 源文件中实现
**注意：**如果继承了 QObject 类，但没有使用 Q_OBJECT 宏，那么继承这个类就没有任何意义。
**扩展：**QObject中的元对象代码除了提供对象间通信的信号和槽以外，还可实现其他特征。

（1）className( )函数在运行时以字符串返回类的名称，不需要C++编译器中的本地运行类型信息的支持。

（2）inherits( )函数返回的对象是一个继承于QObject继承树中一个特定类的实例。

（3）tr( )和trUtf8( )两个函数是用于国际化中的字符串翻译。

（4）setProperty( )和property( )两个函数是用来通过名称动态设置而获得对象属性。

# 3 信号槽的发展与使用
如何使用信号槽，以及信号槽在 Qt5 中的新特性。

## 3.1 信号槽 5.0 新特性
**Qt 5 之前的问题**
在 Qt 5 之前，使用 connect 函数连接信号和槽。使用时会用到两个宏：

```c++
// 关联信号和槽
connect(sender,
        SIGNAL(customSignal(int i)),
        receiver,
        SLOT(customSlot(int i)));
        
```

+ SIGNAL: 将信号处理成字符串
+ SLOT：将槽处理成字符串

MOC 会扫描工程中的所有文件，将信号和槽提取出来，做成一个映射表。上面的代码中，connect 函数是 QObject 中定义的一个函数，它会从前面创建的映射表中找出相应的字符串，只需要知道信号的名字，程序就可以知道槽的名字，因此当信号发出时就会调用相应的槽。

但存在问题。由于信号和槽函数已经被处理成了字符串，编译器就不能在编译中检查错误。所有的检查都是在运行时完成的，就可能出现编译通过了，但运行时槽没有被调用的情况。唯一能做的就是查看控制台，调试错误。

**Qt 5.0 信号槽新语法**
**说明：**Qt 5 中应用了 c++11 标准，信号槽也针对 c++11 进行了改动优化。得益于 Qt 5.0 新的信号槽语法，上面的问题得到了解决，新的 connect 函数使用方式。


```c++
// 关联信号和槽
connect(sender,
        &Sender::customSignal,
        receiver,
        &Receiver::customSlot)
```

**新的信号槽特性总结**

+ `新的语法`:，，应用了 c++11 的的函数指针。
+ `编译器检查`:由于使用了函数指针，因此可以进行编译器检查。
+ `友好的错误提示`
+ `自动参数类型转换`
+ `允许连接任意函数`:因为使用了函数指针，因此不用经过 MOC 处理，可以将信号关联到任意函数，不仅仅是被声明为槽的函数。这样就可以很方便地从外部类或第三方类库中使用信号槽调用函数。需要注意的一点是，信号 signal 仍然需要在类声明处用 signals 声明，然后经过 MOC 处理。


```c++
class Example: public QObject
{
    Q_OBJECT
signals:
    void customSignal(int i)
public:
    void customSlot(QString i);
    void testFunction()
    {
        // 关联信号和槽
        connect(this,
                &Example::customSignal,
                this, 
                // Qt 5 允许连接任意函数，而不仅是在类声明中使用 slot 标识过的
                &Example::customSlot);
    }
};
```

+ `C++11 lambda 表达式`

```bash
connect(this,
        &Example::customSignal,
        [=](int i){
            cout << "Resule: " << i;
        })
```

## 3.2 信号槽的使用

### 方式一：响应交互事件（QtDesigner 创建）
使用 QtDesigner ，可以很方便的通过图形化的方式实现组件间通过信号槽通信。

### 方式二：响应交互事件（通过代码实现）
在组件的类的实现中，通过声明并实现符和信号槽规则的函数，实现信号槽。

```bash
void Example::on_pushButton_clicked()
{
    ...
}
```

### 方式三：任何通信场景
使用 connect 函数来通信，更佳灵活。

```c++
/* Qt 5 之前 *／
connect(sender,
        SIGNAL(customSignal(int i)),
        receiver,
        SLOT(customSlot(int i)));

/* Qt 5 之后 *／
// 关联其他对象的槽
connect(sender,
        &Sender::customSignal,
        receiver,
        &Receiver::customSlot)
// 关联其他函数
connect(sender,
        &Sender::customSignal,
        customSlot);
// 使用 lambda 表达式
connect(this,
        &Example::customSignal,
        [=](int i){
            cout << "Resule: " << i;
        })
```

## 3.3 一个加法运算的示例

### 第一步：创建项目
### 第二步：设计布局
![](http://o6ul1xz4z.bkt.clouddn.com/14873319229850.jpg)

### 第三步：注册事件（信号槽）

**说明：** 使用方式二（响应交互事件）

![](http://o6ul1xz4z.bkt.clouddn.com/14873319405996.jpg)


![](http://o6ul1xz4z.bkt.clouddn.com/14873319619945.jpg)



*头文件/mainwindow.h*

```c++
#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>

namespace Ui {
class MainWindow;
}

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit MainWindow(QWidget *parent = 0);
    ~MainWindow();

private slots:
    // 声明 slots
    void on_pushButton_clicked();
    
private:
    Ui::MainWindow *ui;
};

#endif // MAINWINDOW_H

```

*mainwindow.cpp*

```bash
#include "mainwindow.h"
#include "ui_mainwindow.h"

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);
}

MainWindow::~MainWindow()
{
    delete ui;
}

// 实现 slots
void MainWindow::on_pushButton_clicked()
{
    ui->spinBox_3->setValue(ui->spinBox->value() + ui->spinBox_2->value());
}

```

