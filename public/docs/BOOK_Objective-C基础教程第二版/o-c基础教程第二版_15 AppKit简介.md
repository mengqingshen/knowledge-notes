---
title: 15 AppKit简介
categories:
  - Objective-C基础教程第二版

---

>**说明：**`Application Kit`中包含`Cocoa`中关于用户界面的大量资源。
>**注意：**学习这一章节时，`Xcode`的最新版本是`7.2`，部分知识已经过时。比如目前`storyboard`已经基本取代了`xib`。

## 15.1	构建项目
>**说明：**下面是通过`Xcode`构建`Cocoa`应用程序项目的步骤。
>1. File->New->New Project（Create a New Xcode Project）
>2. 左边列表`Mac OS X`下的`Application`选项->`Cocoa Application`->Next
>3.  项目信息
>+  `Product Name`：应用名称
>+ `Company Identifier`：企业标识符，用来区分应用程序
>+ `Class Prefix`：伪命名空间，避免文件名冲突

>4. 复选框
>+ `Create Document-Based Application`
>+ `Use Core Data`
>+ `Include Unit Test`
>+ `Use Automatic Reference Counting`

## 15.2	创建委托文件`@interface`部分
>**`Interface Builder`：**简称`IB`，用可视化的方式为`OS X`和`iOS`布局窗口内容，构建用户界面。
>**`IBOutlet`和`IBAction`：**这两个关键字会经常出现在代码中，用于
>+ 为`Interface Builder`提供标记
>+ 帮助阅读代码


## 15.3	Interface Builder
>**说明：**通过`.xib`文件就可以打开`IB`的可视化编辑器。
>+ **nib文件：**编译时，`.xib`(`XML`格式)文件会被编译为`nib(NeXT Interface Builder)`文件，它是包含了压缩对象的二进制文件，
>+ **对象库：**包含了大量可以拖入窗口的不同类型的对象。
>
>![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-01-25%20%E4%B8%8B%E5%8D%8810.17.36.png)


## 15.4	设计用户界面
>**说明：**对用户界面进行布局
>1. 拖入一个`Text Filed`
>2. 拖入一个`Label`
>3. 拖入一个`push button`

![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-01-25%20%E4%B8%8B%E5%8D%8810.42.36.png)


## 15.5	创建连接
>**说明：**将`代码`与刚创建的`用户界面元素`相连接。

### 15.5.1	连接输出口（IBOutlet）
>**说明：**通过拖动自动生成界面元素对应的代码。以其中的`Text Field`为例子
>1. 打开辅助编辑器
>2. 按住`Control`键将光标从`文本框`拖动到`头文件`中`@property`那一行的下面
>3. 出现`Insert Outlet orAction`提示消息时松开鼠标
>4. 在弹出的对话框中输入`textField`，点击`Connect`


### 15.5.2	连接操作（IBAction）
>**说明：**将按钮连接到操作，这样按下按钮就会触发代码。以`UpperCae`按钮为例
>1. 按住`Control`键和`UpperCase`按钮
>2. 拖动一条直线到`头文件`的最后一行`@property`语句下
>3. 弹出连接对话框，选择`Action`类型
>4. 在Name文本框中输入`uppercase`，并点击`Connect`(自动在头文件中创建方法的声明，并在实现文件中创建方法的实现)

## 15.6	应用程序委托的实现
>**说明：**`IBOutlet`的工作方式
>1. 应用程序启动时，`MainMenu.nib`被自动加载，界面对象被创建
>2. 分配并初始化`MSCApplelegate`实例（`IBOutlet`的实例变量）
>3. 建立连接：将`NSTextField`等对象的地址添加到`MSCAppDelegate`实例变量中，然后像每个每个`界面对象`发送`awakeFromNib`消息。

*MSCAppDelegate.h*

```objective-c
#import <Cocoa/Cocoa.h>

@interface MSCAppDelegate : NSObject <NSApplicationDelegate>

@property (assign) IBOutlet NSWindow *window;
@property (weak) IBOutlet NSTextField *textField;
@property (weak) IBOutlet NSTextField *resultsField;

- (IBAction)uppercase:(id)sender;
- (IBAction)lowercase:(id)sender;

@end
```
*MSCAppDelegate.m*

```objective-c
#import "MSCAppDelegate.h"

@implementation MSCAppDelegate

@synthesize window = _window;
@synthesize textField = _textField;
@synthesize resultsField = _resultsField;

- (id)init {
	if (nil != (self = [super init])) {
        // 此时还没和界面对象建立连接，因此都是 nil
		NSLog (@"init: text %@ / results %@", _textField, _resultsField);
	}
	
	return self;	
}

/**
 * 对界面对象进行一些初始化工作
 * 连接建立后会被调用
 *  @override
 */
- (void)awakeFromNib {
	NSLog (@"awake: text %@ / results %@", _textField, _resultsField);
	
	[_textField setStringValue:@"Enter text here"];
	[_resultsField setStringValue:@"Results"];
}

- (void)applicationDidFinishLaunching:(NSNotification *)aNotification {
    // Insert code here to initialize your application
}

- (IBAction)uppercase:(id)sender {
	NSString *original = [_textField stringValue];
	NSString *uppercase = [original uppercaseString];
	[_resultsField setStringValue:uppercase];
}

- (IBAction)lowercase:(id)sender {
	NSString *original = [_textField stringValue];
	NSString *lowercase = [original lowercaseString];
	[_resultsField setStringValue:lowercase];
}

@end

```

## 15.7	小结
