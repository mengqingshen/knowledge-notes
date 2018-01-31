---
title: Qt_04 Qt 实战：计算器开发
categories:
    - 极客学院_Qt
tag:
    - Qt

---

前面的课程中我们已经讲解了如何使用 Qt 创建简单的程序以及 Qt 的核心特性：信号槽的使用，但是一个程序中用到的内容实际比这要复杂的多。本次课程我们就来创建一个真正意义上的 Qt 程序：一个功能相对完整的计算器 。 

[学习网站地址](http://www.jikexueyuan.com/course/1440.html)

[laputa-er](https://github.com/laputa-er/qt_demos
  - c语言基础/tree/master/l04_Calculator)

# 1 程序开发的准备工作
介绍在开始写一个程序前的必要准备工作，这样能使程序写起来更有条理，增加效率。


## 计算器程序分析与设计
**说明：**简单的软件开发流程

+ 分析（做什么）
+ 设计（怎么做）
+ 编程
+ 测试
+ 维护

### 软件需求分析

**UI**

+ 主要部分
+ 菜单栏
+ 标题栏
+ 状态栏

**功能**

+ 基本运算
+ 单位转换

### 设计

**UI**

+ QMainWindow
+ 显示框，按钮

**功能**

+ 基本运算
+ 单位转换

### QtCreator 完成界面设计
#### 第一步：在属性列表中设置属性
**geometry**

+ 宽度：250
+ 高度：360

**windowTitle**：计算器

#### 第二步：在对象列表中删除多余的组件
![](http://o6ul1xz4z.bkt.clouddn.com/14873383910393.jpg)


#### 第三步：菜单栏
![](http://o6ul1xz4z.bkt.clouddn.com/14873400203497.jpg)

![](http://o6ul1xz4z.bkt.clouddn.com/14873401305761.jpg)

![](http://o6ul1xz4z.bkt.clouddn.com/14873402208021.jpg)

### 第四步：按钮布局

+ 同时设置按钮的 minimumSize 和 maximumSize 中的高度和宽度改变按钮的大小
+ 通过拉伸组件，覆盖多个 cell，就可以实现 grid layout 中 cell 的合并
+ `alt + 拖动按钮` 实现按钮的复制
+ 按钮比较多，因此重新命名为容易区分的名字，在程序中会用到

![](http://o6ul1xz4z.bkt.clouddn.com/14874017664942.jpg)


## 命名法简介
Qt API 采用的是 `驼峰命名法`，因此建议 Qt  程序统一都使用驼峰命名法。

### 驼峰命名法
+ 大驼峰：My_VarName
+ 小驼峰：my_VarName


### 匈牙利命名法
微软员工发名的一种标识符命名法，`[标识符分类]_[标识符类型][实际含义]`.例如，`s_szMyName`

标识符分类|说明
---|---
`s_`|静态变量
`m_`|C++ 成员变量
`sz_`|字符串
`fn_`|函数

+ 系统匈牙利命名法
+ 匈牙利应用命名法


# 2 Qt 窗口与对话框
一个程序中 UI 是 interface，那么窗口自然就是骨架。在开发程序前，对 Qt 的窗口类有一些了解是必须的。

## 2.1 QMainWindow

### 动作(Action)
Qt 使用 `Action` 简化对菜单和工具栏的使用。动作是一个可以添加到任意数量的菜单和工具栏上面的项，只需要创建并设置动作，然后创建菜单或工具栏，最后把动作添加到上面就可以了。

### QMainWindow 的使用
**注意：**QMainWindow 继承自 QWidget ，因此可以使用继承自 QWidget 的各种属性和方法。

### 案例
![](http://o6ul1xz4z.bkt.clouddn.com/14874133704353.jpg)

![](http://o6ul1xz4z.bkt.clouddn.com/14874133477049.jpg)


**要点**

+ 1. 添加菜单，并为菜单绑定触发时的动作
+ 2. 在状态栏显示信息

**用到的 QMainWindow 方法的**

+ menuBar()：获取菜单栏引用
+ statusBar()：获取状态栏引用

**其他类**

+ QAction
+ QMenu
+ QTimer


*头文件/mainwindow.h*

```c++
#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QLabel>

namespace Ui {
class MainWindow;
}

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit MainWindow(QWidget *parent = 0);
    ~MainWindow();

private:
    Ui::MainWindow *ui;
    QLabel *bar1;
    QLabel *bar2;
public slots:
    void saveActionClicked();
    void showMessage(const QString &message, int timeOut);
};

#endif // MAINWINDOW_H
```

*源文件/mainwindow.cpp*

```c++
#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QAction>
#include <QMenuBar>
#include <QTimer>

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);

    /*  测试添加菜单(并添加一个动作) */
    // 创建动作(Save)
    QAction *newAction = new QAction("Save", this);

    newAction->setShortcut(QKeySequence::Save); // 设置快捷键
    newAction->setToolTip("Save"); // 设置提示
    newAction->setStatusTip("Save Now"); // 设置工具栏提示（鼠标悬浮时显示的提示内容）

    // 创建一个新菜单（New）
    QMenu *newMenu = menuBar()->addMenu("New"); // menuBar 是 继承自 QMainWindow 的方法

    // 将动作 Save 添加到菜单 New
    newMenu->addAction(newAction);

    // 关联动作的触发信号到槽
    connect(newAction, &QAction::triggered, this, &MainWindow::saveActionClicked);
    // connect(newAction, SIGNAL(triggered(bool)), this, SLOT(savaActionClicked()));

    /* 测试给状态栏添加状态信息 */
    bar1 = new QLabel("Bar1");
    bar2 = new QLabel("Bar2");

    statusBar()->addWidget(bar1);
    statusBar()->addWidget(bar2, 1); // 填满余下的空间

    bar1->show(); // 一直显示

    showMessage("TestMsg", 3000); // bar2 显示 3s
}

MainWindow::~MainWindow()
{
    delete ui;
}

// 动作被触发时关联的槽（关闭软件）
void MainWindow::saveActionClicked()
{
    qApp->quit();
}

// 测试状态栏（显示信息，并在指定时候后关闭）
void MainWindow::showMessage(const QString &message, int timeOut)
{
    bar2->setText(message);
    QTimer *timer = new QTimer;
    timer->singleShot(timeOut, bar2, SLOT(clear()));
}
```

## 2.2 QDialog

**说明：**程序的大部分内容都在主窗口显示，但有些内容不适合在主窗口显示，这是就有可能用到对话框。

**顶层窗口和非顶层窗口**
QDialog 实例创建时可以指定父窗口。

+ 如果没有指定父窗口，会作为一个顶层窗口打开；
+ 如果指定了父窗口，则在父窗口上打开，并以父窗口的中心作为自己的中心。

**注意：**在 windows 中，顶层窗口在任务栏中又一个位置，非顶层窗口则没有。

### 2.2.1 通过代码创建对话框
![](http://o6ul1xz4z.bkt.clouddn.com/14874152312734.jpg)

```c++
/* 需要指定对话框的父对象
* 如果没有指定父窗口，会作为一个顶层窗口打开；
* 如果指定了父窗口，则在父窗口上打开，并以父窗口的中心作为自己的中心。
*/
QDialog dialog(this);
QLabel *label = new QLabel("Text", &dialog);
dialog.exec();
```

### 2.2.2 通过 Designer 创建对话框
相比主窗口，对话框没有菜单栏、工具栏和状态栏。

**第一步：** 创建对话框的 UI 文件
![](http://o6ul1xz4z.bkt.clouddn.com/14874156502621.jpg)

![](http://o6ul1xz4z.bkt.clouddn.com/14874156723226.jpg)

上面选择的模版对应的对话框，如下

![](http://o6ul1xz4z.bkt.clouddn.com/14874163570181.jpg)


**第二步：** 在需要对话框的地方引入前面生成的头文件

![](http://o6ul1xz4z.bkt.clouddn.com/14874160951796.jpg)

*源文件/mainwindow.cpp*

```c++
#include "dialog.h"

...
Dialog dialog;
// 如果打开的对话框中，用户点击了确认
if(dialog.exec() == QDialog::Accepted)
{
   // 推出程序
   qApp->quit();
}
...
```

### 2.2.3 其他
Qt 提供了多种类型的对话框，比如

+ 消息对话框
+ 文件对话框
+ 选择对话框

等。

延伸的知识点还包括

+ 模态对话框
+ 非模态对话框
+ 如何防治对话框内存泄漏

等。

# 3 计算器程序实现
主要是基于 Qt 的计算器程序的代码实现及讲解。

![](http://o6ul1xz4z.bkt.clouddn.com/14874488994950.jpg)


# 4 附加功能实现
给计算器程序增加额外的附加功能。

## 4.1 QDialog 简单应用

通过给上面的计算器应用添加单位转换功能演示 Dialog 使用.

**第一步：** 在菜单中添加入口
![](http://o6ul1xz4z.bkt.clouddn.com/14874485257306.jpg)

**第二步：** `选择单位`会自动生成对应的动作，为其命名

![](http://o6ul1xz4z.bkt.clouddn.com/14874485876862.jpg)

**第三步：** 声明并实现相关的槽

```c++

// 选择单位
void MainWindow::unitSelect()
{
    selectDialog = new QDialog(this);
    QDialogButtonBox *buttonBox;
    QGroupBox *groupBox;
    QGroupBox *groupBox_2;
    QLabel *displayLabel;

    // 设置对话框的大小
    selectDialog->resize(400, 150);

    buttonBox = new QDialogButtonBox(selectDialog);
    buttonBox->setGeometry(30, 100, 341, 32); // 相对父窗口的坐标和大小
    buttonBox->setStandardButtons(QDialogButtonBox::Cancel|QDialogButtonBox::Ok); // 对话框添加两个按钮

    groupBox = new QGroupBox(selectDialog);
    groupBox->setGeometry(10, 10, 180, 80);
    groupBox->setTitle("要转换的数值");

    groupBox_2 = new QGroupBox(selectDialog);
    groupBox_2->setGeometry(210, 10, 180, 80);
    groupBox_2->setTitle("转换后的单位");

    displayLabel = new QLabel(ui->label->text(), groupBox);
    displayLabel->setGeometry(10, 40, 120, 16);

    selectCombo = new QComboBox(groupBox_2);
    selectCombo->setGeometry(10, 140, 120, 26);
    selectCombo->clear();
    selectCombo->insertItem(0, "米->厘米");
    selectCombo->insertItem(1, "米->平方米");

    // 对话框中点击 Cancel
    connect(buttonBox, SIGNAL(rejected()), selectDialog, SLOT(deleteLater()));
    // 对话框中点击 Ok
    connect(buttonBox, SIGNAL(accepted()), this, SLOT(unitCalc()));

    selectDialog->exec();
}

// 单位换算
void MainWindow::unitCalc()
{
    switch(selectCombo->currentIndex())
    {
    // 米->厘米
    case 0:
        currentNumber = QString::number(currentNumber.toDouble() * 100);
        break;
    // 米->平方米
    case 1:
        currentNumber = QString::number(pow(currentNumber.toDouble(), 2));
    default:
        break;
    }
    selectDialog->deleteLater(); // 计算完成后关闭 selectDialog 并删除
    displayNumber();
}

```

**第四步：** 关联动作和槽

```c++
connect(ui->actionUnitSelect, SIGNAL(triggered(bool)), this, SLOT(unitSelect()));
```

## 4.2 常用的 Qt 静态函数

### setWindowFlags
**功能：**设置窗口标记，比如标题栏的属性。

