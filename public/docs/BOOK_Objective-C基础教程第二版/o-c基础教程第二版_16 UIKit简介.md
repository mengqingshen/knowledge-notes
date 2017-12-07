---
title: 16 UIKit简介
categories:
  - Objective-C基础教程第二版
toc: true
---

>**说明：**`Mac`应用程序使用的是`AppKit`框架，而`iOS`应用程序使用的是`UIKit`框架，它包含了所有的`UI`组件和构成`iOS`应用程序的资源。
>**注意：**`iOS`和`OS X`存在以下区别
>+ 没有`shell`和控制台
>+ 应用程序在`Mac`电脑的模拟器中运行
>+ 无法支持一些无`UI`界面的`API`
>+ 大部分程序员都认为开发`iOS`应用更加轻松

>**项目创建：**步骤如下
>1. `File->New->New Project`(command + shift + n)
>2. 选择应用程序模版：左边列表选择`iOS`下的`Application`，然后右边选择`Single View Application`
>+ `Master-Detail`：用一个导航控制器和一个表视图来显示项目列表遗迹项目的详细信息
>+ `OpenGL Game`：游戏
>+ `Page-Based`：创建电子书式的应用，拥有翻页动画效果（该效果支持ipad）
>+ `Tabbed`：多视图应用程序，底部又一个标签栏并且每个标签都有一个视图香关联的那种应用程序
>+ `Utility`：和`Single View Application`相似，但还多处一个翻转视图
>+ `Empty`：是一个高级选项，如果没有合适的模版，或是你非常了解如何构建你的应用程序，那么刻意选择使用这个模版

>3. 点击`Next`按钮，弹出询问程序名等信息的对话框
>+ 复选框：不选择`Use Storyboard`和`Include Unit Tests`，选中`Use Automatic Reference Counting`
>+ `Device Family`：选择`Universal`（意味着可以同时运行在`iPhone`、`iPod`、`iPad`上）

![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-01-26%20%E4%B8%8B%E5%8D%8811.15.54.png)

*AppDelegate.h*

```objective-c
#import <UIKit/UIKit.h>
@class ViewController;
@interface AppDelegate : UIResponder <UIApplicationDelegate>

// 窗口对象
@property (strong, nonatomic) UIWindow *window;
// 视图控制器
@property (strong, nonatomic) ViewController *viewController;

@end
```
*AppDelegate.m*

```objective-c
#import "AppDelegate.h"
#import "ViewController.h"
@interface AppDelegate ()

@end

@implementation AppDelegate

@synthesize window = _window;
@synthesize viewController = _viewController;
// 窗口被创建时回被调用
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    /* 初始化窗口对象 */
    self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
    
    /* 初始视图控制器 */
    // iPhone
    if ([[UIDevice currentDevice] userInterfaceIdiom] == UIUserInterfaceIdiomPhone) {
        self.viewController = [[ViewController alloc] initWithNibName:@"ViewController_iPhone" bundle:nil];
    }
    // iPad
    else {
        self.viewController = [[ViewController alloc] initWithNibName:@"ViewController_iPad" bundle:nil];
    }
    
    // 将视图控制器的视图添加到应用程序层级
    self.window.rootViewController = self.viewController;
    [self.window makeKeyAndVisible];

    return YES;
}

- (void)applicationWillResignActive:(UIApplication *)application {
    // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
    // Use this method to pause ongoing tasks, disable timers, and throttle down OpenGL ES frame rates. Games should use this method to pause the game.
}

- (void)applicationDidEnterBackground:(UIApplication *)application {
    // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
    // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
}

- (void)applicationWillEnterForeground:(UIApplication *)application {
    // Called as part of the transition from the background to the inactive state; here you can undo many of the changes made on entering the background.
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
    // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
}

- (void)applicationWillTerminate:(UIApplication *)application {
    // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
}

@end

```

## 16.1	视图控制器
>**说明：**`Cocoa`主要使用的是`MVC`模式
>+ **视图：**从`nib`文件中获取视图
>+ **模型：**一组数据
>+ **控制器：**`UIViewController`的子类

### 16.1.1	在Nib文件中添加控件
>**说明：**完成视图的部分
>+ 拖进一个`TextField`对象
>+ 拖进一个`Label`
>+ 拖进两个`Button`

![Alt text](./屏幕快照 2016-01-26 下午10.07.01.png)


### 16.1.2	视图（Nib文件）和控制器建立连接
>**说明：**打开辅助窗口，通过拖拽完成`视图`(`Nib`文件)和`控制器`(`ViewController.h`)之间的连接。
>1. 代开辅助窗口：`Command+Option+Return`或`Editor`组中间的按钮
>2. 为`Text Field`和`Label`创建输出口（`outlet`）：按住`control`键，将鼠标从视图中的图像元素一直拖到`ViewController.h`相应位置
>![Alt text](./屏幕快照 2016-01-26 下午10.01.24 2.png)
>![Alt text](./屏幕快照 2016-01-26 下午10.01.30 2.png)
>3. 为两个按钮创建`操作`(Action)
>+ Name：操作的名称
>+ Type：操作方法参数的类型（默认为`id`）
>+ Event：事件类型
>+ Arguments：`None`、`Sender`和`Event`（包含一个`UIEvent`类型的参数）
>![Alt text](./屏幕快照 2016-01-26 下午10.23.36.png)

### 16.1.3	完成代码的手动编写部分
>**说明：**包括程序核心功能的实现以及一些事件的回调。

*ViewController.h*

```objective-c
#import <UIKit/UIKit.h>

@interface ViewController : UIViewController

@property (weak, nonatomic) IBOutlet UITextField *textField;
@property (weak, nonatomic) IBOutlet UILabel *resultsField;

- (IBAction)uppercase;
- (IBAction)lowercase;

@end
```
*ViewController.m*

```objective-c
#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

@synthesize textField;
@synthesize resultsField;

/**
 *  重写父类的便利构造器：完成视图和控制器的绑定
 */
- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil {
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (nil != self) {
        NSLog(@"init: text %@ / result %@", textField, resultsField);
    }
    return self;
}

/**
 *  系统在nib文件加载和对象初始化完成后调用：从ios 5 不会再调用该方法了
 */
- (void)awakeFromNib {
    NSLog(@"awake: text %@ / result %@", textField, resultsField);
}

/**
 *  系统在nib文件加载和对象初始化完成后调用
 */
- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    NSLog(@"viewDidLoad: text %@ / results %@", textField, resultsField);
    
    // 设置输入框的placeholder(占位符)
    [textField setPlaceholder:@"Enter text here"];
    // 设置Label的默认值
    resultsField.text = @"Result";
}

/**
 *  视图从视图层级中移除后会调用这个方法，可以在这里做一些内存清理的事情
 *  该方法已过时
 */
- (void)viewDidUnload {
    [self setTextField:nil];
    [self setResultsField:nil];
    [super viewDidUnload];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

// 视图出现前调用
- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
}
// 视图出现后调用
- (void)viewDidAppear:(BOOL)animated
{
    [super viewDidAppear:animated];
}
// 视图消失前调用
- (void)viewWillDisappear:(BOOL)animated
{
    [super viewWillDisappear:animated];
}
// 视图消失后调用
- (void)viewDidDisappear:(BOOL)animated
{
    [super viewDidDisappear:animated];
}


- (IBAction)uppercase {
    NSString *original = textField.text;
    NSString *uppercase = [original uppercaseString];
    resultsField.text = uppercase;
}

- (IBAction)lowercase {
    NSString *original = textField.text;
    NSString *lowercase = [original lowercaseString];
    resultsField.text = lowercase;
}
@end

```

## 16.2	小结