---
title: 2 UI部分
categories:
  - 极客学院_ios中级

---

>**说明：**`iOS`实战项目

## 2.1	汤姆猫小游戏（投诉下线）

## 2.2	加法计算器
>**说明：**本课时讲解 `storyboard` 中利用 `UITextField`、`UILabel`、`UIButton` 快速搭建器计算器UI界面，并在 `viewController` 中用代码完成计算的业务逻辑以及排除部分隐含的 bug，让大家学会自制计算器。
+ 设置`Text Field`使用数字键盘
+ 点击“计算”后，使`Text Field`失去焦点
+ 处理`Text Field`没有输入的情况

![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-02-27%20%E4%B8%8B%E5%8D%8810.16.26.png)

*ViewController.swift*

```swift
import UIKit

class ViewController: UIViewController {

    @IBOutlet var text1: UITextField!// 操作数1控件
    @IBOutlet var text2: UITextField!// 操作数2控件
    @IBOutlet var result: UILabel!// 结果控件
    // 计算
    @IBAction func calculate() {
        let num1 = Int(self.text1.text!) ?? 0
        let num2 = Int(self.text2.text!) ?? 0

        let resultNum = num1 + num2
        
        let resultString = "\(resultNum)"//String(resultNum)
        self.result.text = resultString
        
        // 使输入框失去焦点
        self.text1.endEditing(true)
        self.text2.endEditing(true)
    }
    
    // 清零
    @IBAction func reset() {
        self.result.text = "0"
        self.text1.text = ""
        self.text2.text = ""
    }
	...
}
```

## 2.3	制作图片浏览器
>**说明：**本课时讲解通过 `UILable`、`UIButton`、`UIImageView` 搭建一个图片浏览器的结构，并通过字典数组完成它的业务逻辑，实现浏览趣味图片的功能。
>+ 切换按钮的不同`State Config`要分别进行设置
>+ 通过设置按钮控件的`enabled`属性设置按钮是否可点击
>+ 图片资源通过`plist`存储

![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-02-28%20%E4%B8%8B%E5%8D%888.59.20.png)
*ViewController.m*

```objective-c
#import "ViewController.h"

@interface ViewController ()

@property (strong, nonatomic) IBOutlet UILabel *topLabel;
@property (strong, nonatomic) IBOutlet UILabel *descLabel;
@property (strong, nonatomic) IBOutlet UIButton *leftBtn;
@property (strong, nonatomic) IBOutlet UIButton *rightBtn;
@property (strong, nonatomic) IBOutlet UIImageView *imageView;

@property (nonatomic, assign) int index;
@property (nonatomic, weak) NSArray *imageDicts;

@end

@implementation ViewController

- (IBAction)leftBtnOnClicked {
    self.index--;
    [self btnClickChange: NO];
}
- (IBAction)rightBtnOnClicked {
    self.index++;
    [self btnClickChange: YES];
}

/**
 *  获取存储图片的数组
 *
 *  @return 存储图片的数组（字典数组）
 */
- (NSArray *)imageDicts
{
    if (_imageDicts.count == 0) {
        NSString *path = [[NSBundle mainBundle] pathForResource:@"imageData" ofType:@"plist"];
        _imageDicts = [NSArray arrayWithContentsOfFile:path];
        NSLog(@"still");
    }
    return _imageDicts;
}

/**
 *  切换图片
 *
 *  @param isAdd 是否向后(右)翻
 */
- (void) btnClickChange: (BOOL) isAdd
{
    NSLog(@"%@", [NSString stringWithFormat:@"%d/%d", (self.index + (isAdd ? 1 : -1)), self.imageDicts.count]);
    self.topLabel.text = [NSString stringWithFormat:@"%d/%lu", (self.index + (isAdd ? 1 : -1)), (unsigned long)self.imageDicts.count];
    self.descLabel.text = self.imageDicts[self.index][@"description"];
    self.imageView.image = [UIImage imageNamed:self.imageDicts[self.index][@"name"]];
    
    self.leftBtn.enabled = (self.index != 0);// 左边按钮的状态
    self.rightBtn.enabled = (self.index != 4);// 右边按钮的状态
}
...
@end
```

## 2.4	LOL英雄展示
>**说明：**通过`UITableView`和`plist`数据文件，搭建一个LOL英雄展示界面。
>+ `UITableView`需要通过右键菜单设置`dataSource`和`delegate`
>  ![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-02-28%20%E4%B8%8B%E5%8D%889.29.01.png)
>+ `ViewController`要采纳相应的协议（`UITableViewDataSource`,` UITableViewDelegate`）：通过采纳相应的协议实现对`TableView`的中的`cell`的创建工作
>+ 通过使用`JKHero`类封装`plist`数据
>  ![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-02-28%20%E4%B8%8B%E5%8D%8810.43.32.png)

### 2.4.1	数据模版
*JKHero.h*

```objective-c
#import <Foundation/Foundation.h>

@interface JKHero : NSObject

// 成员属性
@property (nonatomic, copy) NSString *name;
@property (nonatomic, copy) NSString *intro;
@property (nonatomic, copy) NSString *icon;

// 构造器
- (instancetype)initWithDict:(NSDictionary *)dict;
+ (instancetype)heroWithDict:(NSDictionary *)dict;

@end
```
*JKHero.m*

```objective-c
#import "JKHero.h"

@implementation JKHero

- (instancetype)initWithDict:(NSDictionary *)dict
{
    if (self = [super init]) {
//        self.icon = [dict[@"icon"] copy];
//        self.name = [dict[@"name"] copy];
//        self.intro = [dict[@"intro"] copy];
        [self setValuesForKeysWithDictionary:dict];// 利用 kvc
    }
    return self;
}

+ (instancetype)heroWithDict:(NSDictionary *)dict
{
    return [[self alloc] initWithDict:dict];
}

@end
```

### 2.4.2	采纳协议
>**说明：**通过扩展采纳协议。

*ViewController.m*

```objective-c
#import "ViewController.h"
#import "JKHero.h"

@interface ViewController () <UITableViewDataSource, UITableViewDelegate>

@property (nonatomic, strong) NSArray *heros;

@end

@implementation ViewController

/**
 *  获取英雄列表数据(懒加载)
 *
 *  @return JKHero类型的可变数组
 */
- (NSArray *) heros
{
    if (!_heros) {
        NSString *path = [[NSBundle mainBundle] pathForResource:@"heros" ofType:@"plist"];
        NSArray *array = [NSArray arrayWithContentsOfFile:path];
        NSMutableArray *arrayM = [NSMutableArray arrayWithCapacity:array.count];
        
        for (NSDictionary *dict in array) {
            JKHero *hero = [JKHero heroWithDict:dict];
            [arrayM addObject:hero];
        }
        _heros = [arrayM copy];
    }
    return _heros;
}
#pragma mark - UITableViewDataSource

// 每组有多少行
- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    return self.heros.count;
}

// 每组默认有多少行(可以不实现，默认就是1)
- (NSInteger)tableView:(UITableView *)tableView sectionForSectionIndexTitle:(NSString *)title atIndex:(NSInteger)index
{
    return 1;
}

#pragma mark - UITableViewDelegate

// 设置cell的高度
- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath
{
    return 60;
}

// 创建tableView中的所有cell
- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    static NSString *identifier = @"heroCell";
    // 创建cell
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:identifier];
    if (!cell) {
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleSubtitle reuseIdentifier:identifier];
    }
    // 设置cell的样式风格
    cell.accessoryType = UITableViewCellAccessoryDisclosureIndicator;
    // 设置cell内容
    JKHero *hero = self.heros[indexPath.row];
    cell.textLabel.text = hero.name;
    cell.detailTextLabel.text = hero.intro;
    cell.detailTextLabel.textColor = [UIColor orangeColor];
    cell.imageView.image = [UIImage imageNamed:hero.icon];
    return cell;
}

// 隐藏状态栏
- (BOOL)prefersStatusBarHidden
{
    return YES;
}

...
@end
```

## 2.5	Face++人脸识别技术入门
>**注意：**课程中的演示程项目是`Android`项目！

### 2.5.1	本课概要

#### 2.5.1.1	Face++公司简介
>**网址：**[http://www.faceplusplus.com.cn/](http://www.faceplusplus.com.cn/)

+ 北京旷视科技有限公司（Face++）创立于2011年，是一家专注于机器视觉和深度学习的科技创业公司。
+ 北京旷视科技旗下的Face++人脸识别云平台，是世界最大的人脸识别技术云平台。服务超过2万的开发者，日调用超过2百万次，积累人脸数据超过10亿张。
+ 北京旷世科技先后获得联想创投的天使投资，和创新工场李开复博士的A轮投资。并获得2012年黑马创业大赛全国总冠军。

#### 2.5.1.2 Face++核心技术简介
+ 旷视科技旗下Face++平台是世界最大的人脸识别技术云平台，提供包括人脸检测、人脸分析、人脸识别、人脸搜索等全套核心技术。
+ Face++的人脸技术居世界领先地位。其中，人脸检测技术获`FDDB`评测世界第一，人脸关键点技术获300-W评测世界第一，人脸识别技术获LFW评测世界第一。
+ Face++已搭建起世界领先的大数据深度学习（deep learning）技术引擎，可以提供人脸技术以外先进的视觉技术。其深度学习引擎可以和`Google`、`Facebook`形成强有力竞争。
+ 旷视科技拥有自己独立的知识产权，有多项国内国外专利在申。

##### 人脸检测和追踪
+ Face++人脸检测技术在世界权威`FDDB`测试集上排名世界第一
+ Face++人脸检测技术针对移动和嵌入式设备做过多项性能优化，检测率高、内存消耗小、模型小，最小可稳定检测16x16大小的人脸
  #####Face++人脸关键点定位
+ Face++人脸关键点定位技术在世界权威300-W测试集上排名世界第一
+ Face++人脸关键点定位提供5点，23点，83点等多个版本，对移动和嵌入式设备做过多项性能优化
  #####Face++人脸属性分析
+ Face++ 人脸属性分析可以分析出性别、年龄、种族、情绪，是否佩戴眼镜
+ Face++性别、种族、情绪、眼镜分析精确度均在95%以上，年龄准确度平均误差在5岁范围内
  #####Face++人脸1:1识别技术
+ Face++人脸1:1验证技术已被广泛应用于帐号登录、身份验证等服务中，被联想、神州智联等大客户使用。在千分之一的误检率情况下，通过率超过70%
  #####Face++人脸1:N识别技术
+ Face++人脸识别技术在世界最著名`LFW`评测中排名世界第一，取到97.72%的准确度，力压`Facebook`
  #####Face++人脸大规模搜索
+ Face++人脸大规模搜索技术被奇虎360、世纪佳缘等大客户使用，可以用不超过4字节表示一张人脸，千万级别图片搜索可达0.1ms响应速度

  #### 2.5.1.3Face++技术使用场景介绍
+ 相机和相册类应用
+ 电子商务和广告营销类
+ 游戏类应用
+ 人脸搜索

##### 相机和广告
+ Face++ 已经为美图秀秀、相机360等移动应用广告厂商提供了人脸检测、人脸追踪以及人脸关键点定位技术，通过这些技术移动应用可以在相机和相册中快速得定为人脸的位置以及五官的位置，为下一步的美化做提前准备。
+ 通过Face++所能提供的人脸属性分析，包括年龄、性别、种族以及微笑程度的判断，可以更好地评估电子商务、广告营销类的用户群体和这些群体所带有的属性。

##### 游戏
+ 现有的移动设备大多都带有前置摄像头，那我们可以通过这些前置摄像头以及Face++ 所能提供的人脸检测和追踪技术，快速定位人脸以及人脸位置的变化。通过具体实际人脸的位置变化来操控游戏中的人物的位置变化。

##### 人脸搜索和人脸登录
+ Face++已经为360搜索和世纪佳缘提供了此项技术，可以在千万级的会员库中快速准确地定位到具体的某个人以及与他相似的人
+ Face++已经为联想视频通话软件－－友约和神州智联提供了此项技术，可以瞬间验证使用者的身份是否属实。

  ### 2.5.2Face++介绍


### 2.5.3	线上API分析
>**说明：**[http://www.faceplusplus.com.cn/api-overview/](http://www.faceplusplus.com.cn/api-overview/)

| 术语      | 说明     | 用途         | 依赖的数据                                    |
| ------- | ------ | ---------- | ---------------------------------------- |
| face    | 基本属性   |            |                                          |
| faceset | face集合 | 搜索集合中的face | `faceid`、`faceset_name`、`face`、`set_id`  |
| person  | 人      | 验证         | `faceid`、 `person_name(person_id)`       |
| group   | 人群     | 匹配         | `identity`、 `url(ing)`、 `group_name(group_id)` |

### 2.5.4	离线API的下载和配置
>**说明：**离线API主要用于在客户端提取图片的信息，从而与线上服务器配合完成一些处理。
>**注意：**在`Face++`官网创建自己的应用后才能下载到相应的离线`SDK`
>>**我的学习应用：**http://www.faceplusplus.com.cn/uc/app/home?app_id=42841

### 2.5.5	Face++实例编写

### 2.5.6	Face++人脸识别总结语

## 2.6	应用管理

### 2.6.1	项目讲解和模型搭建
1. 创建项目
2. 设置`Storyboard`(设置`Size`为`iPhone 3.5-inch`，取消`Use Auto Layout`和`Use Size Classes`)
3. 导入素材（图片和`plist`文件）
4. 为`plist`文件创建`数据模型`
  ####数据模型
  *JKAppInfo.h*

```objective-c
#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface JKAppInfo : NSObject

@property (nonatomic, copy) NSString *name;
@property (nonatomic, copy) NSString *icon;
@property (nonatomic, strong, readonly) UIImage *image;

- (instancetype)initWithDict:(NSDictionary *)dict;
+ (instancetype)appInfoWithDict:(NSDictionary *)dict;

@end
```
*JKAppInfo.m*

```objective-c
#import "JKAppInfo.h"

@implementation JKAppInfo
{
    UIImage *_image;// 通过定义为私有属性使其可在 image 方法中被访问
}

- (instancetype)initWithDict:(NSDictionary *)dict
{
    if (self = [super init]) {
        [self setValuesForKeysWithDictionary:dict];
    }
    return self;
}

+ (instancetype)appInfoWithDict:(NSDictionary *)dict
{
    return [[self alloc] initWithDict:dict];
}

// 自定义 image 的set(因为 通过 @property 创建的 image 是只读的，因此不会自动生成 get)
// 注意：将访问 image 自定义为访问 _image
- (UIImage *)image
{
    if (!_image) {
        _image = [UIImage imageNamed:self.icon];
    }
    return _image;
}

@end
```

### 2.6.2	Xib自定义视图
1. 创建`JKAppView`（继承`UIView`）
2. 创建`xib`文件（`iOS`->`User Interface`->`Empty`）
+ `Size`：Freeform(然后宽和高就可以设置了)

3. 在`xib`中创建需要的展现单个`app`信息的控件
4. 在`xib`文件和`JKAppView`类之间创建关联
5. 完善`JKAppView`类

  #### 2.6.2.1xib视图文件
  ![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-03-02%20%E4%B8%8A%E5%8D%8812.11.15.png)

  #### 2.6.2.2绑定的类(`UIView`)
  *JKView.h*

```objective-c
#import <UIKit/UIKit.h>

@class JKAppInfo;
//-------协议
@protocol JKAppViewDelegate <NSObject>

@optional
// 下载按钮被点击的响应函数
- (void)downloadClickWithBtn:(UIButton *)btn;

@end

//-------接口
@interface JKAppView : UIView

// 属性：一项app信息
@property (nonatomic, strong) JKAppInfo *appInfo;
// 属性：代理对象
@property (nonatomic, weak) id<JKAppViewDelegate> delegate;// 要求代理对象采纳JKAppViewDelegate协议
// 构造器
+ (instancetype)appView;

@end
```
*JKView.m*

```objective-c
#import "JKAppView.h"
#import "JKAppInfo.h"
//------ 扩展
@interface JKAppView ()

@property (strong, nonatomic) IBOutlet UIImageView *iconView;
@property (strong, nonatomic) IBOutlet UILabel *nameLabel;

@end

//------- 实现
@implementation JKAppView
- (IBAction)downloadBtnOnClick:(UIButton *)sender {
    // 调用代理对象的”点击下载按钮“的响应函数
    if ([self.delegate respondsToSelector:@selector(downloadClickWithBtn:)]) {
        [self.delegate downloadClickWithBtn:sender];
    }
}

// 工厂构造
+ (instancetype)appView
{
    // 从指定nib文件中获取目标View控件（是唯一的，所以可以用lastObject）
    return [[[NSBundle mainBundle]loadNibNamed:@"JKAppView" owner:nil options:nil] lastObject];
}

// 为View控件初始化内部信息
- (void)setAppInfo:(JKAppInfo *)appInfo
{
    _appInfo = appInfo;
    self.iconView.image = appInfo.image;
    self.nameLabel.text = appInfo.name;
}
@end
```

### 2.6.3	创建自定义视图数组
>**说明：**在`ViewController`中初始化`JKAppView`数组

*ViewController.m*

```objective-c
#import "ViewController.h"
#import "JKAppInfo.h"
#import "JKAppView.h"

@interface ViewController () <JKAppViewDelegate>

@property (nonatomic, strong) NSArray *appViews;

@end

@implementation ViewController

// 根据plist初始化所有的小view（懒加载）
- (NSArray *)appViews
{
    if (!_appViews) {
        NSString *path = [[NSBundle mainBundle] pathForResource:@"app" ofType:@"plist"];
        NSArray *array = [NSArray arrayWithContentsOfFile:path];
        NSMutableArray *arrayM = [NSMutableArray arrayWithCapacity:array.count];
        for (NSDictionary *dict in array) {
            JKAppInfo *appInfo = [JKAppInfo appInfoWithDict:dict];
            JKAppView *appView = [JKAppView appView];
            appView.appInfo = appInfo;
            appView.delegate = self;
            
            [arrayM addObject:appView];
        }
        _appViews = [arrayM copy];
    }
    return _appViews;
}

...

@end

```

### 2.6.4	九宫格布局展示
>**说明：**九宫格布局开发
>1. 宏定义界面布局的相关参数
>2. 确定间距
>3. 为确定每个下载项的位置（通过设置中心点坐标）

*ViewController.m*

```objective-c
#import "ViewController.h"
#import "JKAppInfo.h"
#import "JKAppView.h"

// 屏幕高度
#define kScreenH [UIScreen mainScreen].bounds.size.height
// 屏幕高度
#define kScreenW [UIScreen mainScreen].bounds.size.width
// 每个下载项的高度
#define kAppViewH [JKAppView appView].bounds.size.height
// 每个下载项的宽度
#define kAppViewW [JKAppView appView].bounds.size.width
// 分3列
#define kTotaoCol 3

@interface ViewController () <JKAppViewDelegate>

@property (nonatomic, strong) NSArray *appViews;

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    // 间距
    CGFloat margin = (kScreenW - kTotaoCol * kAppViewW) / (kTotaoCol + 1);
    // 确定每个自定义视图在父视图中的位置并添加到父视图中
    for (int i = 0; i < self.appViews.count; i++) {
        JKAppView *appView = self.appViews[i];
        
        int col = i % kTotaoCol;
        int row = i / kTotaoCol;
        
        CGFloat centerX = (margin + kAppViewW * 0.5) + (margin + kAppViewW) * col;
        CGFloat centerY = (margin + kAppViewH * 0.5) + (margin + kAppViewH) * row;
        // 设置中心点
        appView.center = CGPointMake(centerX, centerY);
        [self.view addSubview:appView];
    }
}

...
@end
```

### 2.6.5	点击效果分析与bug排除
>**说明：**点击`下载`时弹出等待画面

*ViewController.m*

```objective-c
#import "ViewController.h"
#import "JKAppInfo.h"
#import "JKAppView.h"
...
@implementation ViewController
...
#pragma mark - JKAppViewDelegate
- (void)downloadClickWithBtn:(UIButton *)btn
{
    // 1. 获取要下载的应用的名字
    JKAppView *appView = (JKAppView *)btn.superview;
    NSString *appName = appView.appInfo.name;
    
    // 2. 创建加载提示窗
    UIActivityIndicatorView *juhua = [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleGray];// 样式
    juhua.frame = self.view.bounds;// 尺寸
    [juhua startAnimating];
    [self.view addSubview:juhua];// 将提示窗添加到视图中
    
    // 3. 创建下载中文案
    UILabel *downloadLabel = [[UILabel alloc] init];
    downloadLabel.frame = CGRectMake(0, kScreenH * 0.5 + 10, kScreenW, 20);
    
    downloadLabel.textColor = [UIColor whiteColor];
    downloadLabel.textAlignment = NSTextAlignmentCenter;
    downloadLabel.text = [NSString stringWithFormat:@"%@正在下载...", appName];
    downloadLabel.font = [UIFont systemFontOfSize:15.0];
    
    downloadLabel.backgroundColor = [UIColor blackColor];
    downloadLabel.alpha = 0.5;
    
    [juhua addSubview:downloadLabel];// 将文案添加到加载窗上
}

@end

```

### 2.6.6	延时操作与块动画
>**说明：**过一段时间以多线程的方式延时处理。

*ViewController.m*

```objective-c
#import "ViewController.h"
#import "JKAppInfo.h"
#import "JKAppView.h"
...
@implementation ViewController
...
#pragma mark - JKAppViewDelegate
- (void)downloadClickWithBtn:(UIButton *)btn
{
	...
    // 4. 设置两秒钟后完成下载
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(2.0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
    
        // 加载窗停止转动，并且自动隐藏
        [juhua stopAnimating];
        
        // 下载完成的提示
        UILabel *noteLabel = [[UILabel alloc] init];
        noteLabel.frame = CGRectMake(0, kScreenH * 0.5 + 20, kScreenW, 30);
        
        noteLabel.textColor = [UIColor whiteColor];
        noteLabel.textAlignment = NSTextAlignmentCenter;
        noteLabel.text = [NSString stringWithFormat:@"%@下载完成", appName];
        
        noteLabel.backgroundColor = [UIColor blackColor];
        noteLabel.alpha = 1;
        [self.view addSubview:noteLabel];
        [UIView animateWithDuration:2.0 animations:^{
            // 执行动画
            noteLabel.alpha = 1;
        } completion:^(BOOL finished) {
            // 动画完成后需要做的事情
            btn.enabled = NO;
            [btn setTitle:@"已下载" forState: UIControlStateDisabled];
            [noteLabel removeFromSuperview];
        }];
    });
}

@end
```

## 2.7	超级猜图

### 2.7.1	效果展示与业务逻辑分析
![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-03-04%2012.15.01.png)

### 2.7.2	模型搭建
>**说明：**创建对应`plist`文件的数据模型。
>1. 视图控制器基本设置
>2. 导入相关素材（图片和`plist`）
>3. 创建对应`plist`文件的数据模型

*JKQuestionInfo.h*

```objective-c
#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface JKQuestionInfo : NSObject
// 属性
@property (nonatomic, copy) NSString *answer;
@property (nonatomic, copy) NSString *icon;
@property (nonatomic, copy) NSString *title;
@property (nonatomic, strong) NSArray *options;
@property (nonatomic, strong, readonly) UIImage *image;

// 构造器
- (instancetype)initWithDict:(NSDictionary *)dict;
// 类方法（工厂方法）
+ (instancetype)questionWithDict:(NSDictionary *)doct;

// 通过 plist 创建 options
+ (NSArray *)questions;

@end
```
*JKQuestionInfo.m*

```objective-c
#import "JKQuestionInfo.h"

@implementation JKQuestionInfo
{
    UIImage *_image;
}

// 构造器
- (instancetype)initWithDict:(NSDictionary *)dict
{
    if (self = [super init]) {
        [self setValuesForKeysWithDictionary:dict];
    }
    return self;
}

// 类方法（工厂方法）
+ (instancetype)questionWithDict:(NSDictionary *)dict
{
    return [[self alloc] initWithDict:dict];
}

// 为_image手动定义 get
- (UIImage *)image
{
    if (!_image) {
        _image = [UIImage imageNamed:self.icon];
    }
    return _image;
}

// 通过 plist 创建 options
+ (NSArray *)questions
{
    NSString *path = [[NSBundle mainBundle] pathForResource:@"questions" ofType:@"plist"];
    NSArray *array = [NSArray arrayWithContentsOfFile:path];
    NSMutableArray *arrayM = [NSMutableArray arrayWithCapacity:array.count];
    for (NSDictionary *dict in array) {
        [arrayM addObject:[self questionWithDict:dict]];
    }
    // 保证每次调用该方法获取的都是全新的数组
    return [arrayM copy];
}

@end
```

### 2.7.3	Storyboard 布局 UI
>**技巧：**
>+ 可以在`Storyboard`中为控件设置内边距
>+ 有时候用`Button`替代`ImageView`会更方便

![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-03-05%20%E4%B8%8B%E5%8D%883.20.24.png)


### 2.7.4	拖线与注释
>**技巧：**多个控件可以绑定同一个`action`。方式是
>![Alt text](http://cdn.mengqingshen.com/img/JK_IOS_S2_more.gif)


*ViewController.m*

```objective-c
#import "ViewController.h"
//-------------------- 扩展
@interface ViewController ()
// 顶部索引情况 label
@property (weak, nonatomic) IBOutlet UILabel *topindexLabel;
// 图片描述
@property (weak, nonatomic) IBOutlet UILabel *descLabel;

// 金币
@property (weak, nonatomic) IBOutlet UIButton *coinBtn;

// 图片
@property (weak, nonatomic) IBOutlet UIButton *imgInsideBtn;

// 选择的答案
@property (weak, nonatomic) IBOutlet UIView *answerView;

// 备选的答案
@property (weak, nonatomic) IBOutlet UIView *optionsView;

// 模型数组
@property (strong, nonatomic) NSArray *questions;

// 记录索引
@property (assign, nonatomic) int index;

// 遮盖按钮
@property (strong, nonatomic) UIButton *cover;

@end

//----------------------- 实现
@implementation ViewController

// 按钮：提示
- (IBAction)tipBtnOnClick {
}

// 按钮：帮助
- (IBAction)helpBtnOnClick {
}

// 按钮：大图
- (IBAction)imgBtnChangeOnClick {
}

// 按钮:下一题
- (IBAction)nextBtnOnClick {
}
...
@end
```

### 2.7.5	创建模型数组与遮罩
>**说明：**遮罩用来监听点`击屏幕任何地方`的事件。

*ViewController.m*

```objective-c
#import "ViewController.h"
#import "JKQuestionInfo.h"
//-------------------- 扩展
@interface ViewController ()
...
// 模型数组
@property (strong, nonatomic) NSArray *questions;

// 遮盖按钮
@property (strong, nonatomic) UIButton *cover;

@end

//----------------------- 实现
@implementation ViewController

/**
 *  获取数据模型数组（懒加载）
 *
 *  @return 模型数组
 */
- (NSArray *)questions
{
    if (nil == _questions) {
        _questions = [JKQuestionInfo questions];
    }
    return _questions;
}

/**
 *  获取遮罩（懒加载），用来监听用户的点击行为
 *
 *  @return 遮罩
 */
- (UIButton *)cover
{
    if (nil == _cover) {
        _cover = [[UIButton alloc] init];
        _cover.frame = self.view.bounds;// 和最外层视图一样大
        _cover.frame = self.view.bounds;
        _cover.alpha = 0.0;// 一开始隐藏遮罩：当透明度为0时，该遮罩不会存在于任何位置
        _cover.backgroundColor = [UIColor blackColor];
        // 为遮罩注册点击事件
        [_cover addTarget:self action:@selector(imgBtnChangeOnClick) forControlEvents:UIControlEventTouchUpInside];
        [self.view addSubview:_cover];// 把遮罩添加到视图中
    }
    return _cover;
}

...
@end
```

### 2.7.6	实现图片缩放
>**说明：**

*ViewController.m*

```objective-c
#import "ViewController.h"
#import "JKQuestionInfo.h"

#define kScreenW [UIScreen mainScreen].bounds.size.width
#define imgW  self.imgInsideBtn.bounds.size.width

...

//----------------------- 实现
@implementation ViewController

...
// 1. 按钮：大图(拖线) 2. 遮罩（代码调用） 3. 图片本身（拖线）
- (IBAction)imgBtnChangeOnClick {
    // 放大图片
    if (0 == self.cover.alpha) {
        CGFloat scaleX = kScreenW / imgW;// 水平方向放大倍数
        CGFloat scaleY = scaleX;// 垂直方向上放大倍数
        CGFloat translateY = self.imgInsideBtn.frame.origin.y / scaleX;// 垂直方向上的偏移（倍数）
        
        // 使用块动画
        [UIView animateWithDuration:1.0 animations:^{
            // 显示遮罩
            self.cover.alpha = 0.5;
            self.imgInsideBtn.transform = CGAffineTransformMakeScale(scaleX, scaleY);// 放大
            self.imgInsideBtn.transform = CGAffineTransformTranslate(self.imgInsideBtn.transform, 0, translateY);// 在现有的基础上向上移动
        }];
        // 将中间图片所在图层置顶
        [self.view bringSubviewToFront:self.imgInsideBtn];
    }
    // 还原图片
    else {
        // 图片还原事件
        [UIView animateWithDuration:1.0 animations:^{
            self.imgInsideBtn.transform = CGAffineTransformIdentity;
            self.cover.alpha = 0.0;
        }];
    }
}

...
@end
```

### 2.7.7	下一题方法实现
>**说明：**用户点击下一题按钮时界面做出相应的改变

*ViewController.m*

```objective-c
#import "ViewController.h"
#import "JKQuestionInfo.h"
...
//----------------------- 实现
@implementation ViewController
...

// 按钮:下一题
- (IBAction)nextBtnOnClick {
    // 1. 索引自增（判断是否越界）
    self.index++;
    NSLog(@"INDEX == %D", self.index);
    if (self.index >= self.questions.count) {
        NSLog(@"恭喜过关！");
        #warning noCode
        self.index--;
        return;
    }
    // 2. 取出数据模型
    JKQuestionInfo *question = self.questions[self.index];
    // 3. 设置
    [self setupBaseInfo:question];
    // 4. 创建答案按钮
    [self createAnswerBtns:question];
    // 5. 创建备选答案按钮
    [self createOptionBtns:question];
}
...
#pragma mark - 私有方法

/**
 *  设置基本信息
 *
 *  @param question 问题的数据模型
 */
- (void)setupBaseInfo: (JKQuestionInfo *)question
{
    // 恢复（enable）optionView 的用户交互
    self.optionsView.userInteractionEnabled = YES;
    // 改变顶部图片索引信息
    self.topindexLabel.text = [NSString stringWithFormat:@"%d/%d", self.index + 1, self.questions.count];
    // 改变图片描述
    self.descLabel.text = question.title;
    // 更换图片
    [self.imgInsideBtn setImage:question.image forState:UIControlStateNormal];
    
    // 下一题按钮状态判断改变
    self.nextBtn.enabled = (self.index != self.questions.count - 1);
}

@end
```

### 2.7.8	创建答案按钮
>**说明：**设置基本信息时创建放置答案的一排按钮集合。

*ViewController.m*

```objective-c
#import "ViewController.h"
#import "JKQuestionInfo.h"

// 需要计算的常量
#define kScreenW [UIScreen mainScreen].bounds.size.width
#define imgW  self.imgInsideBtn.bounds.size.width
#define kAnswerBtnTitleColor [UIColor blackColor]

// 不需要计算的常量
CGFloat const kBtnW = 35;// 按钮宽
CGFloat const kBtnH = 35;// 按钮高
CGFloat const kMarginBetweenBtns = 10;// 按钮间距
NSInteger const kOptionViewTotalCol = 7;// 备选答案总列数
NSInteger const kTrueAddScore = 200;// 猜对加分
NSInteger const kFalseDecreaseScore = -200;// 猜错减分
NSInteger const kTipDecreaseScore = -200;// 亲求提示减分

...
//----------------------- 实现
@implementation ViewController

...
/**
 *  创建放置答案的按钮
 *
 *  @param question 数据模型
 */
- (void)createAnswerBtns:(JKQuestionInfo *)question
{
    // 1. 清空放置答案的按钮
    for (UIButton *btn in self.answerView.subviews) {
        [btn removeFromSuperview];
    }
    // 2. 获取答案按钮的数量
    NSInteger answerBtnCount = question.answer.length;
    // 3. 创建放置答案的按钮
    CGFloat answerW = self.answerView.bounds.size.width;// 放答案的父容器宽度
    CGFloat answerEdgeInset = (answerW - answerBtnCount * kBtnW - (answerBtnCount - 1) * kMarginBetweenBtns) * 0.5;// 放答案的父容器两侧内边距
    
    for (int i = 0; i < answerBtnCount; i++) {
        UIButton *btn = [[UIButton alloc] init];
        CGFloat btnX = answerEdgeInset + i * i * (kBtnW + kMarginBetweenBtns);// 起点水平坐标
        btn.frame = CGRectMake(btnX, 0, kBtnW, kBtnH);// 设置frame
        // 设置背景图片
        [btn setBackgroundImage:[UIImage imageNamed:@"btn_answer"] forState:UIControlStateNormal];
        [btn setBackgroundImage:[UIImage imageNamed:@"btn_answer_highlighted"] forState:UIControlStateHighlighted];
        // 设置字体颜色
        [btn setTitleColor:kAnswerBtnTitleColor forState:UIControlStateNormal];
        
        // 注册点击事件
        [btn addTarget:self action:@selector(optionBtnOnClick:) forControlEvents:UIControlStateNormal];
        // 添加到视图中
        [self.optionsView addSubview:btn];
    }
}
@end
```

### 2.7.9	创建备选答案按钮
>**说明：**当`点击下一题`或`程序刚启动`时，需要设置备选答案按钮。
>**技巧：**以懒加载的方式创建备选按钮，这样就不用每次都重新创建备选按钮。

*ViewController.m*

```objective-c
#import "ViewController.h"
#import "JKQuestionInfo.h"
...
//----------------------- 实现
@implementation ViewController

...
// 按钮:下一题
- (IBAction)nextBtnOnClick {
	...
    // 5. 创建备选答案按钮
    [self createOptionBtns:question];
}

- (void)viewDidLoad {
	...
    self.index = -1;
    [self nextBtnOnClick];
}


/**
 *  设置备选字按钮（懒加载）
 *
 *  @param question 数据模型
 */
- (void)createOptionBtns:(JKQuestionInfo *)question
{
    // 备选字总个数
    int optionsCount = question.options.count;
    
    // 没有备选字按钮就创建
    if (self.optionsView.subviews.count != optionsCount) {
        CGFloat optionW = self.optionsView.bounds.size.width;// 备选字按钮父控件宽度
        CGFloat optionEdgeInset = (optionW - kOptionViewTotalCol * kBtnW - (kOptionViewTotalCol - 1) * kMarginBetweenBtns) * 0.5;// 父控件左右内边距
        for (int i = 0; i < optionsCount; i++) {
            UIButton *btn = [UIButton buttonWithType:UIButtonTypeCustom];
            int col = i % kOptionViewTotalCol;// 所在列
            int row = i / kOptionViewTotalCol;// 所在行
            
            CGFloat btnX = optionEdgeInset + (kBtnW + kMarginBetweenBtns) * col;// 水平坐标
            CGFloat btnY = kMarginBetweenBtns + (kBtnH + kMarginBetweenBtns) * row;// 垂直坐标
            // 设置frame
            btn.frame = CGRectMake(btnX, btnY, kBtnW, kBtnH);
            // 设置背景图
            [btn setBackgroundImage:[UIImage imageNamed:@"btn_answer"] forState:UIControlStateNormal];
            [btn setBackgroundImage:[UIImage imageNamed:@"btn_answer_highlighted"] forState:UIControlStateHighlighted];
            // 设置字颜色
            [btn setTitleColor:kAnswerBtnTitleColor forState:UIControlStateNormal];
            // 注册点击事件
            [btn addTarget:self action:@selector(optionBtnOnClick) forControlEvents:UIControlEventTouchUpInside];
            // 添加到视图
            [self.optionsView addSubview:btn];
        }
        // 更新备选字
        for (int i = 0; i < optionsCount; i++) {
            UIButton *optionBtn = self.optionsView.subviews[i];
            [optionBtn setTitle:question.options[i] forState:UIControlStateNormal];
            optionBtn.hidden = NO;
        }
    }
}
@end
```

### 2.7.10	答案按钮点击
>**说明：** 点击组成答案的按钮，该按钮清除其文字，而相应的备选答案按钮会重新出现该文字。

*ViewController.m*

```objective-c
#import "ViewController.h"
#import "JKQuestionInfo.h"
...
//----------------------- 实现
@implementation ViewController

...

#pragma mark - 文字按钮的点击绑定的方法
/**
 *  点击答案按钮
 *
 *  @param answerBtn 答案按钮
 */
- (void)answerBtnOnClick:(UIButton *)answerBtn
{
    NSString *answerStr = answerBtn.currentTitle;
    // 按钮没有设置字
    if (nil == answerStr) {
        return;
    }
    // 按钮有字(用户打算去掉选择作为答案的一个字)
    else {
        // 1. 清空按钮的字
        [answerBtn setTitle:nil forState:UIControlStateNormal];
        // 2. 恢复optionView中隐藏的备选字按钮
        for (UIButton *optionBtn in self.optionsView.subviews) {
            if ([answerStr isEqualToString:optionBtn.currentTitle] && optionBtn.isHidden) {
                optionBtn.hidden = NO;
                break;
            }
        }
        // 3. 如果字体颜色为错误答案的颜色，则恢复为黑色
        if (answerBtn.currentTitleColor != kAnswerBtnTitleColor) {
            for (UIButton *answerBtn in self.answerView.subviews) {
                [answerBtn setTitleColor:kAnswerBtnTitleColor forState:UIControlStateNormal];
            }
            // 恢复（enable）optionView的用户交互
            self.optionsView.userInteractionEnabled = YES;
        }
    }
}
...
@end
```

### 2.7.11	备选按钮点击
>**说明：**被点击的备选按钮会清除其文字，并将该文字写到答案按钮中。

*ViewController.m*

```objective-c
#import "ViewController.h"
#import "JKQuestionInfo.h"
...
//----------------------- 实现
@implementation ViewController

...

#pragma mark - 文字按钮的点击绑定的方法
/**
 *  点击答案按钮
 *
 *  @param answerBtn 答案按钮
 */
- (void)answerBtnOnClick:(UIButton *)answerBtn
{
    NSString *answerStr = answerBtn.currentTitle;
    // 按钮没有设置字
    if (nil == answerStr) {
        return;
    }
    // 按钮有字(用户打算去掉选择作为答案的一个字)
    else {
        // 1. 清空按钮的字
        [answerBtn setTitle:nil forState:UIControlStateNormal];
        // 2. 恢复optionView中隐藏的备选字按钮
        for (UIButton *optionBtn in self.optionsView.subviews) {
            if ([answerStr isEqualToString:optionBtn.currentTitle] && optionBtn.isHidden) {
                optionBtn.hidden = NO;
                break;
            }
        }
        // 3. 如果字体颜色为错误答案的颜色，则恢复为黑色
        if (answerBtn.currentTitleColor != kAnswerBtnTitleColor) {
            for (UIButton *answerBtn in self.answerView.subviews) {
                [answerBtn setTitleColor:kAnswerBtnTitleColor forState:UIControlStateNormal];
            }
            // 恢复（enable）optionView的用户交互
            self.optionsView.userInteractionEnabled = YES;
        }
    }
}
...
@end
```

### 2.7.12	提示点击方法的实现
>**说明：**提示按钮每被点击一次，答案按钮就回为答案生成一个字。

*ViewController.m*

```objective-c
#import "ViewController.h"
#import "JKQuestionInfo.h"
...
//----------------------- 实现
@implementation ViewController

...
// 按钮：提示
- (IBAction)tipBtnOnClick {
    // 1. 清空答案按钮的文字
    for (UIButton *answerBtn in self.answerView.subviews) {
        [self answerBtnOnClick:answerBtn];
    }
    // 2. 取出实际答案中的第一个字
    NSString *answer = [self.questions[self.index] answer];
    NSString *firstWord = [answer substringToIndex:1];
    // 3. 模拟点击optionView中第一个正确的按钮，扣分
    for (UIButton *optionBtn in self.optionsView.subviews) {
        if ([optionBtn.currentTitle isEqualToString:firstWord]) {
            [self optionBtnOnClick:optionBtn];
            [self coinChange:kTipDecreaseScore];
        }
    }
}
...
@end
```

## 2.8	国家选择

### 2.8.1	`UIPickerView`与`数据模型`的创建
>**说明：**要点如下
>1. 导入素材（`jpg`格式的图片不能放在`Assets.xcassets`中管理）
>2. 创建自定义`UIView`类:`JKCountryInfo`
>3. `ViewController`采纳`UIPickerView`
>
>**注意：**`gif`格式的图片不能放在`Assets.xcassets`。


#### 2.8.1.1	`UIPickerView`
>**说明：**类似`TableView`，可以通过让普通`ViewControll`采纳协议`UIPickerViewDelegate`和`UIPickerViewDataSource`实现
>1. 通过拖动建立`PickerView`控件和`ViewController`类之间的关联
>  ![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-03-12%20%E4%B8%8B%E5%8D%884.29.09.png)

*ViewController.m*

```objective-c
#import "ViewController.h"
#import "JKCountryInfo.h"
#import "JKCountryFlagView.h"
// 扩展--------------
@interface ViewController ()<UIPickerViewDelegate, UIPickerViewDataSource>

@property (nonatomic, strong) NSArray *dataArray;//

@end

// 实现---------------
@implementation ViewController

/**
 *  获取plist中的字典数组
 *
 *  @return 字典数组
 */
- (NSArray *)dataArray
{
    if (!_dataArray) {
        // plist文件路径
        NSString *path = [[NSBundle mainBundle]pathForResource:@"flags" ofType:@"plist"];
        // 取出字典数组
        NSArray *array = [NSArray arrayWithContentsOfFile:path];
        // 将所有数据相放入可变数组中
        NSMutableArray *arrayM = [NSMutableArray arrayWithCapacity:array.count];
        for (NSDictionary *dict in array) {
            JKCountryInfo *countryModel = [JKCountryInfo CountryWithDict:dict];
            [arrayM addObject:countryModel];
        }
        _dataArray = [arrayM copy];
    }
    return _dataArray;
}

#pragma mark - UIPickerViewDataSource
// 决定PlickerView一共的组数（共1组）
- (NSInteger)numberOfComponentsInPickerView:(UIPickerView *)pickerView
{
    return 1;
}

// 每组有多少条数据
- (NSInteger)pickerView:(UIPickerView *)pickerView numberOfRowsInComponent:(NSInteger)component
{
    return self.dataArray.count;
}

@end
```


#### 2.8.1.2	 数据模型的创建
*JKContryInfo.h*

```objective-c
#import <Foundation/Foundation.h>

@interface JKCountryInfo : NSObject

@property (nonatomic, strong) NSString *name;// 国家名字
@property (nonatomic, strong) NSString *icon;// 国旗（图片名）

// 构造器
- (instancetype)initWithDict: (NSDictionary *)dict;
// 工厂方法
+ (instancetype) CountryWithDict: (NSDictionary *)dict;

@end
```
*JKContryInfo.m*

```objective-c
#import "JKCountryInfo.h"

@implementation JKCountryInfo

- (instancetype)initWithDict:(NSDictionary *)dict
{
    if (self = [super init]) {
        [self setValuesForKeysWithDictionary:dict];
    }
    return self;
}

+ (instancetype)CountryWithDict:(NSDictionary *)dict
{
    return [[self alloc] initWithDict:dict];
}

@end
```

### 2.8.2	自定义视图完善实例
>**说明：**自定义`PickerView`中的每一行采用的视图。

#### 2.8.2.1	创建`xib`文件
>**说明：**要点如下
>1. 创建的`xib`文件和要绑定的`UIVIew`的文件名要一致。
>

>**注意：**待对应的`UIView`子类创建完毕后，手动绑定之。

*JKCountryFlagView.xib*
![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-03-12%20%E4%B8%8B%E5%8D%884.24.35.png)

#### 2.8.2.2	创建`JKCountryFlagView`类
>**说明：**该类用来绑定上面创建的`xib`文件。

*JKCountryFlagView.h*

```objective-c
#import <UIKit/UIKit.h>
@class JKCountryInfo;
@interface JKCountryFlagView : UIView

// IBOutlet 属性
@property (weak, nonatomic) IBOutlet UILabel *name;
@property (weak, nonatomic) IBOutlet UIImageView *flag;

// 普通属性
@property (nonatomic, strong) JKCountryInfo *countryModel;

// 构造器(工厂方法)
+ (instancetype)countryView;

// 类方法
+ (CGFloat)rowHeight;

@end
```
*JKCountryFlagView.m*

```objective-c
#import "JKCountryFlagView.h"
#import "JKCountryInfo.h"
@implementation JKCountryFlagView

+ (instancetype)countryView
{
    return [[[NSBundle mainBundle] loadNibNamed:@"JKCountryFlagView" owner:self options:nil] lastObject];
}
// 赋值
- (void)setCountryModel:(JKCountryInfo *)countryModel
{
    if (_countryModel != countryModel) {
        _countryModel = countryModel;
        self.name.text = _countryModel.name;
        self.flag.image = [UIImage imageNamed:_countryModel.icon];
    }
}

+ (CGFloat)rowHeight
{
    return 54;
}

@end
```

#### 2.8.2.3	完善`ViewController`
 >**说明：**采纳协议`UIPickerViewDelegate`和`UIPickerViewDataSource`

*ViewController.m*

```objective-c
#import "ViewController.h"
#import "JKCountryInfo.h"
#import "JKCountryFlagView.h"
// 扩展--------------
@interface ViewController ()<UIPickerViewDelegate, UIPickerViewDataSource>

@property (nonatomic, strong) NSArray *dataArray;

@end

// 实现---------------
@implementation ViewController

/**
 *  获取plist中的字典数组
 *
 *  @return 字典数组
 */
- (NSArray *)dataArray
{
    if (!_dataArray) {
        // plist文件路径
        NSString *path = [[NSBundle mainBundle]pathForResource:@"flags" ofType:@"plist"];
        // 取出字典数组
        NSArray *array = [NSArray arrayWithContentsOfFile:path];
        // 将所有数据相放入可变数组中
        NSMutableArray *arrayM = [NSMutableArray arrayWithCapacity:array.count];
        for (NSDictionary *dict in array) {
            JKCountryInfo *countryModel = [JKCountryInfo CountryWithDict:dict];
            [arrayM addObject:countryModel];
        }
        _dataArray = [arrayM copy];
        NSLog(@"path:%@", path);
    }
    NSLog(@"array:%@", _dataArray);
    return _dataArray;
}

#pragma mark - UIPickerViewDataSource
// 决定PlickerView一共的组数（共1组）
- (NSInteger)numberOfComponentsInPickerView:(UIPickerView *)pickerView
{
    return 1;
}

// 每组有多少条数据
- (NSInteger)pickerView:(UIPickerView *)pickerView numberOfRowsInComponent:(NSInteger)component
{
    return self.dataArray.count;
}

#pragma mark - UIPickerViewDelegate
// 定义详情视图的创建过程
- (UIView *)pickerView:(UIPickerView *)pickerView viewForRow:(NSInteger)row forComponent:(NSInteger)component reusingView:(UIView *)view
{
    JKCountryFlagView *countryView = (JKCountryFlagView *)view;
    if (!countryView) {
        countryView = [JKCountryFlagView countryView];
    }
    countryView.countryModel = self.dataArray[row];
    return countryView;
}

// 定义行高
- (CGFloat)pickerView:(UIPickerView *)pickerView rowHeightForComponent:(NSInteger)component
{
    return [JKCountryFlagView rowHeight];
}
...
@end
```

## 2.9	图片自动播放

### 2.9.1	创建`UIScrollView`和`UIPageControl`
>**说明：**要点
>1. `ViewController`采纳`UIScrollViewDelegate`
>2. 创建`UIScrollView`
>3. 创建`UIScrollPageControl`


### 2.9.2	定时器与代理方法调用
>**说明：**要点
>1. **封装一些相关的方法：**清除`timer`、添加`timer`等
>2. **遵守协议`UIScrollViewDelegate`：**定义滑动前、中、后需要的操作

### 2.9.3	代码摘要
*ViewController.m*

```objective-c
#import "ViewController.h"

#define kScreenHeight [UIScreen mainScreen].bounds.size.height// 屏幕高度
#define kScreenWidth [UIScreen mainScreen].bounds.size.width// 屏幕高度

CGFloat kImgCount = 10;// 图片总数
CGFloat scrollY = 20;// 上边距
CGFloat pageCtrlWidth = 200;// 滚动指示器宽度

//--------- 扩展
@interface ViewController ()<UIScrollViewDelegate>

@property (nonatomic, strong) UIScrollView *scrollView;
@property (nonatomic, strong) UIPageControl *pageCtrl;
@property (nonatomic, strong) NSTimer *timer;

@end

//---------- 实现
@implementation ViewController

- (void)viewDidLoad {
	...
    [self initScrollView];
    [self initPageControl];
    [self addTimer];
}

/**
 *  创建并初始化 UIScrollView
 */
- (void)initScrollView
{
    // 创建 UIScrollView
    self.scrollView = [[UIScrollView alloc] initWithFrame:CGRectMake(0, scrollY, kScreenWidth, kScreenHeight - scrollY)];
    // 设置代理对象
    self.scrollView.delegate = self;
    // 初始化所有滚动的屏的内容
    for (int i = 0; i < kImgCount; i++) {
        UIImageView *imgview = [[UIImageView alloc] initWithFrame:CGRectMake(kScreenWidth * i, scrollY, kScreenWidth, kScreenHeight - scrollY)];
        imgview.image = [UIImage imageNamed:[NSString stringWithFormat:@"huoying%d", i + 1]];
        [self.scrollView addSubview:imgview];
    }
    // 设置 UIScrollView
    self.scrollView.contentSize = CGSizeMake(kScreenWidth * kImgCount, kScreenHeight - scrollY);
    self.scrollView.pagingEnabled = YES;// 使滚动操作停止在恰当的位置
    [self.view addSubview:self.scrollView];// 添加到视图
}

/**
 *  创建并初始化 UIPageControl
 */
- (void)initPageControl
{
    self.pageCtrl = [[UIPageControl alloc] initWithFrame:CGRectMake((kScreenWidth - pageCtrlWidth) / 2, kScreenHeight - scrollY, pageCtrlWidth, scrollY)];
    self.pageCtrl.numberOfPages = kImgCount;
    self.pageCtrl.pageIndicatorTintColor = [UIColor greenColor];
    self.pageCtrl.currentPageIndicatorTintColor = [UIColor yellowColor];
    [self.view insertSubview:self.pageCtrl aboveSubview:self.scrollView];// 添加到视图
}

/**
 *  自动滚动到下一屏
 */
- (void)nextPage
{
    NSInteger page = self.pageCtrl.currentPage;
    page++;
    if (page == kImgCount) {
        page = 0;
    }
    CGPoint point = CGPointMake(kScreenWidth * page, 0);
    [self.scrollView setContentOffset:point animated:YES];
}

/**
 *  设置延时反复
 */
- (void)addTimer
{
    // 创建 timer (interval)
    self.timer = [NSTimer scheduledTimerWithTimeInterval:2.0 target:self selector:@selector(nextPage) userInfo:nil repeats:YES];
    [[NSRunLoop currentRunLoop] addTimer:self.timer forMode:NSRunLoopCommonModes];
}

/**
 *  清除延时反复
 */
- (void)removeTimer
{
    [self.timer invalidate];
    self.timer = nil;
}

#pragma  mark -UIScrollViewDelegae
// 滑动前：清除计时器
- (void) scrollViewWillBeginDragging:(UIScrollView *)scrollView
{
    [self removeTimer];
    NSLog(@"BeginDragging");
}
// 滑动中：更改指示器
- (void)scrollViewDidScroll:(UIScrollView *)scrollView
{
    NSInteger page = scrollView.contentOffset.x / kScreenWidth + 0.5;
    self.pageCtrl.currentPage = page;
}
// 滑动后：开始下一次互动倒计时
- (void)scrollViewDidEndDragging:(UIScrollView *)scrollView willDecelerate:(BOOL)decelerate
{
    // 2秒钟后重新开始自动滚屏
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(2.0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        [self addTimer];
    });
    NSLog(@"EndDragging");
}
@end
```

## 2.10	QQ列表展示
>**说明：**该项目使用`MVC`模式。
>![Alt text|200x400](http://cdn.mengqingshen.com/img/JK_IOS_S2_qq.gif)![Alt text|400x300](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-03-16%20%E4%B8%8A%E5%8D%889.34.22.png)

>**注意：**`Xcode`工程中的文件夹有两种：`黄色`的为辅助进行代码管理的“伪文件夹”，`蓝色`的为真正的文件夹。

### 2.10.1	模型搭建
>**说明：**需要两个数据模型，`JKGroupModel`（好友所在分组）和`JKFriendsModel`（好友）
>1. 导入`plist`
>2. 创建数据模型

#### 2.10.1.1	`JKGroupModel`
>**说明：**好友分组的数据模型

*JKGroupModel*

```objective-c
#import <Foundation/Foundation.h>

@interface JKFriendsModel : NSObject

@property (nonatomic, copy)NSString *icon;
@property (nonatomic, copy)NSString *name;
@property (nonatomic, copy)NSString *intro;
@property (nonatomic, assign) BOOL isVip;

- (instancetype)initWithDict:(NSDictionary *)dict;
+ (instancetype)friendWithDict:(NSDictionary *)dict;

@end
```
*JKGroupModel.m*

```objective-c
#import "JKGroupModel.h"

@implementation JKGroupModel

- (instancetype)initWithDict:(NSDictionary *)dict
{
    if (self = [super init]) {
        [self setValuesForKeysWithDictionary:dict];
        NSMutableArray = [NSMutableArray array];
        for (NSDictionary *dict in self.friends) {
            JKFriendsModel *model = [JKFriendsModel friendWithDict:dict];
            [muArray addObject:model];
        }
        self.friends = muArray;
    }
    return self;
}

+ (instancetype)GroupWithDict:(NSDictionary *)dict
{
    return [[self alloc] initWithDict:dict];
}
@end
```

#### 2.10.1.2	`JKFriendsModel`
>**说明：**好友的数据模型。

*JKFriendsModel.h*

```objective-c
#import <Foundation/Foundation.h>

@interface JKFriendsModel : NSObject

@property (nonatomic, copy)NSString *icon;
@property (nonatomic, copy)NSString *name;
@property (nonatomic, copy)NSString *intro;
@property (nonatomic, assign) BOOL isVip;

- (instancetype)initWithDict:(NSDictionary *)dict;
+ (instancetype)friendWithDict:(NSDictionary *)dict;

@end
```
*JKFriendsModel.m*

```objective-c
#import "JKFriendsModel.h"
#import "JKFriendsModel.h"
@implementation JKFriendsModel

- (instancetype)initWithDict:(NSDictionary *)dict
{
    if (self = [super init]) {
        [self setValuesForKeysWithDictionary:dict];
    }
    return self;
}

+ (instancetype)friendWithDict:(NSDictionary *)dict
{
    return [[self alloc] initWithDict:dict];
}

@end
```

### 2.10.2	创建`UITableView`
>**说明：**要点
>1. 在`AppDelegate`中创建二级导航（通过`UINavigationController`）
>2. 在`ListTableViewController`完善`TableView`

*Model/AppDelegate.m*

```objective-c
#import "AppDelegate.h"
#import "ListTableViewController.h"
@interface AppDelegate ()

@end

@implementation AppDelegate


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    // Override point for customization after application launch.
    // 创建 window
    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    self.window.backgroundColor = [UIColor whiteColor];
    
    // 创建 TableViewController
    ListTableViewController *listVC = [[ListTableViewController alloc] init];

    // 创建 UINavigationController(需要指定导航控制器控制的是那个控制器)
    UINavigationController *navCtrl = [[UINavigationController alloc] initWithRootViewController:listVC];

    // 将导航控制器设置为 window 的 rootViewController（这就是所谓的二级视图）
    self.window.rootViewController = navCtrl;
    [self.window makeKeyAndVisible];// 将该window置顶并显示出来

    return YES;
}
...
@end
```

*Model/ListTableViewController.m*

```objective-c
#import "ListTableViewController.h"
#import "JKGroupModel.h"
#import "JKFriendsModel.h"
#import "HeaderView.h"
#import "ViewController.h"

@interface ListTableViewController ()

@property (nonatomic, strong) NSArray *dataArray;

@end

@implementation ListTableViewController

// 懒加载
- (NSArray *)dataArray
{
    if (!_dataArray) {
        NSString *path = [[NSBundle mainBundle] pathForResource:@"friends" ofType:@"plist"];
        NSArray *array = [NSArray arrayWithContentsOfFile: path];
        NSMutableArray *muArray = [NSMutableArray arrayWithCapacity:array.count];
        for (NSDictionary *dict in array) {
            JKGroupModel *groupModel = [JKGroupModel GroupWithDict:dict];
            [muArray addObject:groupModel];
        }
        _dataArray = [muArray copy];
    }
    return _dataArray;
}


...
#pragma mark - Table view data source
// num of section
- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return self.dataArray.count;
}
// num of cell
- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    JKGroupModel *groupModel =  self.dataArray[section];
    NSInteger count = groupModel.isOpen ? groupModel.friends.count : 0;
    return count;
}
// 创建 cell
- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    static NSString *identifier = @"friendCell";
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:identifier];
    if (!cell) {
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleSubtitle reuseIdentifier:identifier];
    }
    JKGroupModel *groupModel = self.dataArray[indexPath.section];
    JKFriendsModel *friendModel = groupModel.friends[indexPath.row];
    cell.textLabel.text = friendModel.name;
    cell.detailTextLabel.text = friendModel.intro;
    
    return cell;
}
@end
```

### 2.10.3	自定义头视图
>**说明：**`MVC`的`View`部分
>+ 不创建`xib`文件
>+ 完全通过代码创建视图
>+ 继承`UITableViewHeaderFooterView`

>**注意：**如果头视图被自定义了，则需要在`viewDidLoad`中重新设置其高度。

#### 2.10.3.1	`View`部分
*View/HeaderView.h*

```objective-c
#import <UIKit/UIKit.h>
#import "JKGroupModel.h"

//------ 协议（为代理对象定义协议）
@protocol HeaderViewDelegate <NSObject>

@optional
- (void)clickView;

@end

//------ 接口
@interface HeaderView : UITableViewHeaderFooterView

@property (nonatomic, assign) id<HeaderViewDelegate>delegate;// 代理对象
@property (nonatomic, strong) JKGroupModel *groupModel;

// 构造器
+ (instancetype)headerView:(UITableView *)tableView;

@end
```
*View/HeadView.m*

```objective-c
#import "HeaderView.h"
#import "JKGroupModel.h"
@implementation HeaderView
{
    UIButton *_arrowBtn;// 三角按钮（展开和关闭）
    UILabel *_label;
}

+ (instancetype)headerView:(UITableView *)tableView
{
    static NSString *identifier = @"header";
    // 尝试获取该 UITableViewHeaderFooterView
    HeaderView *header = [tableView dequeueReusableHeaderFooterViewWithIdentifier:identifier];
    if (!header) {
        header = [[HeaderView alloc] initWithReuseIdentifier:identifier];
    }
    return header;
}

// 重写 UITableViewHeaderFooterView 的构造器
- (instancetype)initWithReuseIdentifier:(NSString *)reuseIdentifier
{
    if (self = [super initWithReuseIdentifier:reuseIdentifier]) {
        // 初始化_arrowBtn(带三角的按钮)
        UIButton *button = [UIButton buttonWithType:UIButtonTypeCustom];
        [button setBackgroundImage:[UIImage imageNamed:@"header_bg"] forState:UIControlStateNormal];// 北京图片
        [button setBackgroundImage:[UIImage imageNamed:@"header_bg_highlighted"] forState:UIControlStateHighlighted];
        [button setImage:[UIImage imageNamed:@"arrow"] forState:UIControlStateNormal];
        [button setTitleColor:[UIColor blackColor] forState:UIControlStateNormal];// 标题
        button.contentEdgeInsets = UIEdgeInsetsMake(0, 10, 0, 0);// 整体内边距
        button.contentHorizontalAlignment = UIControlContentHorizontalAlignmentLeft;// 左对齐
        button.titleEdgeInsets = UIEdgeInsetsMake(0, 10, 0, 0);// 文字部分的内边距
        button.imageView.contentMode = UIViewContentModeCenter;
        [button addTarget:self action:@selector(buttonAction) forControlEvents:UIControlEventTouchUpInside];// 注册点击事件
        button.imageView.clipsToBounds = NO;
        _arrowBtn = button;
        [self addSubview:_arrowBtn];

        // 初始化_label
        UILabel *labelRight = [[UILabel alloc] init];
        labelRight.textAlignment = NSTextAlignmentCenter;
        _label = labelRight;
        [self addSubview:_label];
    }
    return self;
}

// 重写布局方法:为_arrowBtn和_label设置布局
- (void)layoutSubviews
{
    [super layoutSubviews];
    _arrowBtn.frame = self.bounds;
    _label.frame = CGRectMake(self.frame.size.width - 70, 0, 60, self.frame.size.height);
}
// 赋值
- (void)setGroupModel:(JKGroupModel *)groupModel
{
    _groupModel = groupModel;
    [_arrowBtn setTitle:_groupModel.name forState:UIControlStateNormal];
    _label.text = [NSString stringWithFormat:@"%@/%lu", _groupModel.online, (unsigned long)_groupModel.friends.count];
}

#pragma mark - buttonAction
// 展开或关闭组
- (void)buttonAction
{
    self.groupModel.isOpen = !self.groupModel.isOpen;
    if ([self.delegate respondsToSelector:@selector(clickView)]) {
        [self.delegate clickView];
    }
}

@end
```

#### 2.10.3.2	`Controller`部分
>**说明：**整个qq列表实际上是一个`UITableView`


*Controller/ListTableViewController*

```objective-c
#import "ListTableViewController.h"
#import "JKGroupModel.h"
#import "JKFriendsModel.h"
#import "HeaderView.h"
#import "ViewController.h"

@interface ListTableViewController ()<HeaderViewDelegate>

@property (nonatomic, strong) NSArray *dataArray;

@end

@implementation ListTableViewController

// 懒加载
- (NSArray *)dataArray
{
    if (!_dataArray) {
        NSString *path = [[NSBundle mainBundle] pathForResource:@"friends" ofType:@"plist"];
        NSArray *array = [NSArray arrayWithContentsOfFile: path];
        NSMutableArray *muArray = [NSMutableArray arrayWithCapacity:array.count];
        for (NSDictionary *dict in array) {
            JKGroupModel *groupModel = [JKGroupModel GroupWithDict:dict];
            [muArray addObject:groupModel];
        }
        _dataArray = [muArray copy];
    }
    return _dataArray;
}

...
- (void)viewDidLoad {
    [super viewDidLoad];
    // 自定义的透视图需要重新定义高度
    self.tableView.sectionHeaderHeight = 40;
}

#pragma mark - Table view data source
// num of section
- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return self.dataArray.count;
}
// num of cell
- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    JKGroupModel *groupModel =  self.dataArray[section];
    NSInteger count = groupModel.isOpen ? groupModel.friends.count : 0;
    return count;
}
// 创建 cell
- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    static NSString *identifier = @"friendCell";
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:identifier];
    if (!cell) {
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleSubtitle reuseIdentifier:identifier];
    }
    JKGroupModel *groupModel = self.dataArray[indexPath.section];
    JKFriendsModel *friendModel = groupModel.friends[indexPath.row];
    cell.imageView.image = [UIImage imageNamed:friendModel.icon];
    cell.textLabel.text = friendModel.name;
    cell.detailTextLabel.text = friendModel.intro;
    
    return cell;
}

#pragma mark - UITableView delagate
// 添加自定义的头视图：初始化TableView中每个section中的header部分
- (UIView *)tableView:(UITableView *)tableView viewForHeaderInSection:(NSInteger)section
{
    HeaderView *header = [HeaderView headerView:tableView];
    header.delegate = self;// 将自身作为代理对象
    header.groupModel = self.dataArray[section];
    return header;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    ViewController *viewCtrl = [[ViewController alloc] init];
    [self.navigationController pushViewController:viewCtrl animated:NO];
}
...
@end
```

### 2.10.4	点击效果的实现
>**说明：**
>1. 点击群组栏（`HeaderView`，继承自`UITableViewHeaderFooterView`）中的按钮
>+ 展开群组
>+ 三角按钮变化

>2. 点击好友（`cell`），push到一个空界面

*View/HeaderView.m*

```objective-c
#import "HeaderView.h"
#import "JKGroupModel.h"
@implementation HeaderView
...

// 重写 UITableViewHeaderFooterView 的构造器
- (instancetype)initWithReuseIdentifier:(NSString *)reuseIdentifier
{
    if (self = [super initWithReuseIdentifier:reuseIdentifier]) {
        ...
        [button addTarget:self action:@selector(buttonAction) forControlEvents:UIControlEventTouchUpInside];// 注册点击事件
        ...
    }
    return self;
}

// 展开或关闭组
- (void)buttonAction
{
    self.groupModel.isOpen = !self.groupModel.isOpen;
    if ([self.delegate respondsToSelector:@selector(clickView)]) {
        [self.delegate clickView];
    }
}

// 父视图发生变化时被调用（不知为什么并没有被调用）
- (void)didMoveToSuperview
{
	// 三角符号旋转180度
    _arrowBtn.imageView.transform = self.groupModel.isOpen ? CGAffineTransformMakeRotation(M_PI_2) : CGAffineTransformMakeRotation(0);
}
@end
```
*Controller/ListTableViewController.m*

```objective-c
#import "ListTableViewController.h"
#import "JKGroupModel.h"
#import "JKFriendsModel.h"
#import "HeaderView.h"
#import "ViewController.h"
...
@implementation ListTableViewController

...
- (void)viewDidLoad {
    ...
    [self clipExtraCellLine:self.tableView];
}

// cell被点击（选中进入）时调用
- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    // 通过导航控制器进入一个新的 ViewController
    ViewController *viewCtrl = [[ViewController alloc] init];
    [self.navigationController pushViewController:viewCtrl animated:NO];
}

#pragma mark - HeadViewDelegate
- (void)clickView
{
    [self.tableView reloadData];
}

#pragma mark - 去掉多余的cell的线
- (void)clipExtraCellLine:(UITableView *)tableView
{
    UIView *view = [[UIView alloc] init];
    view.backgroundColor = [UIColor clearColor];
    [self.tableView setTableFooterView:view];
}

@end
```

## 2.11	三级控制器
>**说明：**项目截图
>![Alt text|200x350](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-03-21%20%E4%B8%8B%E5%8D%887.09.10.png)

>**API：**`三级控制器`的实现使用到的`UIKit`

| `UITabViewController`相关成员 | 原型                                       | 说明                             |
| ------------------------- | ---------------------------------------- | ------------------------------ |
| viewControllers           | `@property(nonatomic, copy) NSArray<__kindof UIViewController *> *viewControllers` | 存储着tab视图管理的所有二级控制器实例           |
| selectedIndex             | `@property(nonatomic) NSUInteger selectedIndex` | 当前被选中的tab item的下标，修改该值会导致视图的切换 |

### 2.11.1	初始化视图控制器
>**说明：**本课时讲解`三级控制器`的结构，自定义视图控制器并初始化学习用新语法创建数组并赋值。用`导航控制器`构建`二级控制器`。
>![Alt text|450x250](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-03-21%20%E4%B8%8B%E5%8D%887.06.44.png)

*AppDelegate.m*
>**说明：**使用新的`window`替换掉项目创建时默认的`window`。

```objective-c
#import "AppDelegate.h"
#import "RootViewController.h"
...
@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    self.window.backgroundColor = [UIColor whiteColor];
    [self.window makeKeyAndVisible];
    RootViewController *rootVC = [[RootViewController alloc] init];
    self.window.rootViewController = rootVC;
    return YES;
}
...
@end
```
*RootViewController.m*

```objective-c
#import "RootViewController.h"
#import "ProfileViewController.h"
#import "MessageViewController.h"
#import "ColaViewController.h"
#import "UserViewController.h"
#import "MoreViewController.h"

#define kScreenWidth [UIScreen mainScreen].bounds.size.width
#define kScreenHeight [UIScreen mainScreen].bounds.size.height
...
@implementation RootViewController
// 初始化所有第二级控制器
- (void)initViewController
{
    // 初始化视图控制器
    ProfileViewController *profileVC = [[ProfileViewController alloc]init];
    MessageViewController *messageVC = [[MessageViewController alloc]init];
    ColaViewController *colaVC = [[ColaViewController alloc]init];
    UserViewController *userVC = [[UserViewController alloc]init];
    MoreViewController *moreVC = [[MoreViewController alloc]init];
    // 封装到数组中
    NSArray *vcArr = @[profileVC, messageVC, colaVC, userVC, moreVC];
    NSMutableArray *tabArray = [NSMutableArray arrayWithCapacity:vcArr.count];
    // 为每个视图控制器创建对应的导航控制器
    for (int i = 0; i < vcArr.count; i++) {
        UINavigationController *navCtrl = [[UINavigationController alloc]initWithRootViewController:vcArr[i]];// 创建导航视图器时为其绑定对应的视图控制器
        [tabArray addObject:navCtrl];
    }
    // 将初始化好的存储导航控制器的数组作为一个属性赋值给第一级控制器
    self.viewControllers = tabArray;
}
...
@end
```


### 2.11.2	自定义标签工具栏
>**说明：**本课时讲解隐藏系统自带`标签工具栏`样式，并自定义按钮和视图，根据系统的`标签工具栏`的属性实现切换。

*RootViewController.m*

```objective-c
#import "RootViewController.h"
#import "ProfileViewController.h"
#import "MessageViewController.h"
#import "ColaViewController.h"
#import "UserViewController.h"
#import "MoreViewController.h"

#define kScreenWidth [UIScreen mainScreen].bounds.size.width
#define kScreenHeight [UIScreen mainScreen].bounds.size.height
...
CGFloat const btnHeight = 45;// 标签工具栏中按钮的高度
...
@implementation RootViewController
...
// 初始化标签工具栏
- (void)initTabBarView
{
    // 初始化 标签工具栏视图
    _tabBarView = [[UIView alloc] initWithFrame:CGRectMake(0, kScreenHeight - tabViewHeight, kScreenWidth, tabViewHeight)];
    _tabBarView.backgroundColor = [UIColor colorWithPatternImage:[UIImage imageNamed:@"mask_navbar"]];
    [self.view addSubview:_tabBarView];
    // 初始化 标签工具栏视图 中的按钮
    NSArray *imgArray = @[@"home_tab_icon_1", @"home_tab_icon_2", @"home_tab_icon_3", @"home_tab_icon_4", @"home_tab_icon_5"];
    for (int i; i < imgArray.count; i++) {
        UIButton *btn = [UIButton buttonWithType:UIButtonTypeCustom];
        [btn setBackgroundImage:[UIImage imageNamed:imgArray[i]] forState:UIControlStateNormal];
        btn.frame = CGRectMake(btnWidth * i, (tabViewHeight - btnHeight) / 2, btnWidth, btnHeight);
        btn.tag = 100 + i;// 用来识别点击哪些按钮进行的tab切换（100以内的tag有特殊用途）
        [btn addTarget:self action:@selector(btnAction:) forControlEvents:UIControlEventTouchUpInside];
        [self.tabBarView addSubview:btn];
    }
    // 初始化当前被选中的tab按钮上展现的视图（倒三角）
    _selectView = [[UIImageView alloc] initWithFrame:CGRectMake(0, 0, btnWidth, btnHeight)];
    _selectView.image = [UIImage imageNamed:@"home_bottom_tab_arrow"];
    [_tabBarView addSubview:_selectView];
}

#pragma mark - tab按钮被点击时的处理函数
- (void)btnAction:(UIButton *)button
{
    // 切换视图（根据tag值获取当前索引）
    self.selectedIndex = button.tag - 100;
    // 将倒三角移动到被选中的tab按钮上，移动动画持续时间为0.2秒
    [UIView animateWithDuration:0.2 animations:^{
        _selectView.center = button.center;
    } completion:nil];
}
- (void)viewDidLoad {
	...
	self.tabBar.hidden = YES;// 隐藏 UITabViewController 自带的tab bar
    [self initTabBarView];
}
...
@end
```

### 2.11.3	页面跳转的两种方式
>**说明：**本课时讲解页面两种跳转方式。通过`导航控制器`实现 `push` 和通过`视图控制器`实现模态视图。并讲解 `iOS8` 中新的方法。
>+ 从`三级控制器` `push`出其它页面需要隐藏`标签工具栏`，`pop`回来后需要展现`标签工具栏`


#### 2.11.3.1	RootViewController
>**说明：**在`标签控制器`中定义`标签工具栏`的显示／隐藏方法

*RootViewController.h*

```objective-c
#import <UIKit/UIKit.h>

@interface RootViewController : UITabBarController

@property (nonatomic, strong) UIView *tabBarView;// 标签工具栏

// 显示或隐藏标签工具栏
- (void)showTabBar:(BOOL)show;

@end
```

*RootViewController.m*

```objective-c
#import "RootViewController.h"
#import "ProfileViewController.h"
#import "MessageViewController.h"
#import "ColaViewController.h"
#import "UserViewController.h"
#import "MoreViewController.h"
...
@interface RootViewController ()

@property (nonatomic, strong) UIImageView *selectView;//

@end

@implementation RootViewController

...
/**
 *  显示／隐藏tab工具栏
 *
 *  @param show YES: 显示, NO: 隐藏
 */
- (void)showTabBar:(BOOL)show
{
    CGRect frame = self.tabBarView.frame;
    // 更新frame
    if (show) {
        frame.origin.x = 0;
    }
    else {
        frame.origin.x = -kScreenWidth;// 隐藏tab bar：将tab bar移除屏幕
    }
    // 重新赋值tabBarView的frame
    [UIView animateWithDuration:0.2 animations:^{
        self.tabBarView.frame = frame;
    } completion:nil];
}

@end
```

#### 2.11.3.2	ProfileViewController
>**说明：**`首页`中通过两种方式跳转。

```objective-c
#import "ProfileViewController.h"
#import "ModalViewController.h"
#import "PushViewController.h"
#import "RootViewController.h"

CGFloat const writeButtonWidth = 33;// 导航栏按钮宽度
CGFloat const writeButtonHeight = 32;// 导航栏按钮高度

@interface ProfileViewController ()

@end

@implementation ProfileViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    self.title = @"首页";
    self.view.backgroundColor = [UIColor yellowColor];
    [self initNavButton];
    [self initPushButton];
}

// 自定义导航栏按钮
- (void)initNavButton
{
    // 创建 UIButton
    UIButton *writeBtn =  [UIButton buttonWithType:UIButtonTypeCustom];
    writeBtn.frame = CGRectMake(0, 0, writeButtonWidth, writeButtonHeight);
    [writeBtn setBackgroundImage:[UIImage imageNamed:@"write"] forState:UIControlStateNormal];
    [writeBtn addTarget:self action:@selector(presentAction) forControlEvents:UIControlEventTouchUpInside];
    // 封装为 UIBarButtonItem
    UIBarButtonItem *item = [[UIBarButtonItem alloc] initWithCustomView:writeBtn];
    // 添加到导航栏
    self.navigationItem.rightBarButtonItem = item;
}

/**
 *  初始化 push 页面的按钮
 */
- (void)initPushButton
{
    UIButton *pushButton = [UIButton buttonWithType:UIButtonTypeRoundedRect];
    pushButton.frame = CGRectMake(100, 100, 200, 40);
    [pushButton setTitle:@"Push" forState:UIControlStateNormal];
    [pushButton addTarget:self action:@selector(pushAction) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:pushButton];
}
/**
 *  使用push的方式展现新视图
 */
- (void)pushAction
{
    PushViewController *pushVC = [[PushViewController alloc] init];
    // 通过和当前的视图控制器绑定的导航控制器完成页面的 push
    [self.navigationController pushViewController:pushVC animated:YES];
    // 隐藏首页的tab bar
    RootViewController *rootVC = (RootViewController *)self.tabBarController;
    [rootVC showTabBar:NO];
}

/**
 *  使用模态的方式展现新视图
 */
- (void)presentAction
{
    ModalViewController *modalVC = [[ModalViewController alloc] init];
    // 使用模态视图
    [self presentViewController:modalVC animated:YES completion:nil];
}
- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)viewWillAppear:(BOOL)animated {
    // 展现首页前显示tab bar
    [super viewWillAppear:animated];
    RootViewController *rootVC = (RootViewController *)self.tabBarController;
    [rootVC showTabBar:YES];
}

@end
```

#### 2.11.3.3	PushViewController
>**说明：**作为`push`跳转方式的目的地视图

```objective-c
#import "PushViewController.h"

@interface PushViewController ()

@end

@implementation PushViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    self.view.backgroundColor = [UIColor greenColor];
    
    // 创建回退（pop）按钮
    UIButton *popButton = [UIButton buttonWithType:UIButtonTypeRoundedRect];
    popButton.frame = CGRectMake(100, 100, 200, 40);
    // 设置文本（使用了setTitle就不能setImage了）
    [popButton setTitle:@"Pop" forState:UIControlStateNormal];
    // 注册事件
    [popButton addTarget:self action:@selector(popAction) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:popButton];
}

/**
 *  回退(pop)到堆栈中的上一个视图(首页)
 */
- (void)popAction
{
    [self.navigationController popViewControllerAnimated:YES];
}

@end
```

#### 2.11.3.4	ModalViewController
>**说明：**作为`dismiss`方式跳转方式的目的地视图

```objective-c
#import "ModalViewController.h"

@interface ModalViewController ()

@end

@implementation ModalViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    self.view.backgroundColor = [UIColor redColor];
    // 创建回退（dismisss）按钮
    UIButton *dismissButton = [UIButton buttonWithType:UIButtonTypeRoundedRect];
    dismissButton.frame = CGRectMake(100, 100, 200, 40);
    [dismissButton setTitle:@"Dismiss" forState:UIControlStateNormal];
    // 注册点击事件
    [dismissButton addTarget:self action:@selector(dismissAction) forControlEvents:UIControlEventTouchUpInside];
    // 添加到视图中
    [self.view addSubview:dismissButton];
}

// 回退页面
- (void)dismissAction
{
    [self dismissViewControllerAnimated:YES completion:nil];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}
@end
```

## 2.12	通讯录
>**说明：**本课实现模拟通讯录的登陆、添加、删除、修改的功能，涉及到第三方类库的使用，数据存储并加深理解代理和 `UITableView`。
>1. `Storyboard`中设置页面跳转
>2. 第三方类库`MBProgressHUD`
>3. 数据存储
>4. `UITableView`的深入理解
>
>![Alt text|200x350](http://cdn.mengqingshen.com/img/JK_IOS_S2_contact.gif)


### 2.12.1	`Storyboard`实现布局和跳转
>**说明：**本课时讲解创建自定义视图控制器并通过 `storyboard` 来布局页面，学习手动跳转的方法。

### API
-----

| `UITextField`成员        | 类型   | 描述                                      |
| ---------------------- | ---- | --------------------------------------- |
| `becomeFirstResponder` | 实例方法 | 使文本输入框自动获取焦点，呼出键盘，类似`html`中的`autofocus` |


| `UITextField`成员 | 类型   | 描述   |
| --------------- | ---- | ---- |
| ``              |      |      |

#### 2.12.1.1	布局
**1. 建立`Navigaton Controller`和`LoginViewController`之间的关联**
![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-03-21%20%E4%B8%8B%E5%8D%8810.17.31.png)
**2. `LoginViewController`跳转到`ContactTableViewController`**
>采用`iOS8`后的新的`show`替代`push`
>![Alt text](http://cdn.mengqingshen.com/img/JK_IOS_S2_show.gif)
>**3. 自定义`ContactTableViewController`的导航栏**
>+ 自定义导航栏需要添加`Navigation Item`控件
>+ `Navigation Item`内的按钮要使用`Button Item`控件
>+ 按钮中使用系统图标(`System Icon`)
>  ![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-03-22%20%E4%B8%8A%E5%8D%8812.23.35.png)

#### 2.12.1.2	跳转
>+ 使用`NSNotificationCenter`监控文本的变化
>+ 使用在`Storyboard`中为视图之间建立的`连接`的`identifier`访问`连接`

*LoginViewController.m*

```objective-c
#import "LoginViewController.h"

@interface LoginViewController ()

@property (weak, nonatomic) IBOutlet UITextField *nameField;
@property (weak, nonatomic) IBOutlet UITextField *pwdField;
@property (weak, nonatomic) IBOutlet UISwitch *rembField;
@property (weak, nonatomic) IBOutlet UIButton *loginBtn;

@end

@implementation LoginViewController

- (IBAction)loginAction {
    if (![self.nameField.text isEqualToString:@"jike"]) {
        return;
    }
    if (![self.pwdField.text isEqualToString:@"qq"]) {
        return;
    }
    [self performSegueWithIdentifier:@"LoginToContact" sender:nil];
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    // 添加观察者:姓名输入框内容发生改变时调用 textChange 方法
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(textChange) name:UITextFieldTextDidChangeNotification object:self.nameField];
    // 添加观察者:密码输入框内容发生改变时调用 textChange 方法
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(textChange) name:UITextFieldTextDidChangeNotification object:self.pwdField];
}

#pragma mark - Navigation
// In a storyboard-based application, you will often want to do a little preparation before navigation
/**
 *  跳转之前之行
 *
 *  @param segue 跳转的信息
 *  @param sender 和performSegueWithIdentifier方法传入的sender是同一个
 */
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
    // 1. 获取跳转目的地视图的控制器
    UIViewController *contactVC = segue.destinationViewController;
    // 2. 设置标题（传值）
    contactVC.title = [NSString stringWithFormat:@"%@的联系人列表", self.nameField.text];
}

/**
 *  改变登录按钮的可点击状态
 */
- (void)textChange
{
    self.loginBtn.enabled = (self.nameField.text.length && self.pwdField.text.length);
}
@end
```

### 2.12.2	`UIAlertController`与添加页面布局
>**说明：**本课时讲解 `iOS8` 中新控制器 `UIAlertController` 的使用，并通过 `storyboard` 布局添加联系人页面，用第三方类库 [MBProgressHUD](https://github.com/jdg/MBProgressHUD) 实现网络加载进程的效果。

**1. 登录过程中使用`MBProgressHUD`实现提示窗**
*LoginViewController.m*

```objective-c
...
@implementation LoginViewController

- (IBAction)loginAction {
    if (![self.nameField.text isEqualToString:@"jike"]) {
        [MBProgressHUD showError:@"账号不存在"];
        return;
    }
    if (![self.pwdField.text isEqualToString:@"qq"]) {
        [MBProgressHUD showError:@"密码错误"];
        return;
    }
    [MBProgressHUD showMessage:@"努力加载中"];
    // 2秒后（模拟网络请求）跳转
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(2 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        // 移除蒙板弹窗
        [MBProgressHUD hideHUD];
        [self performSegueWithIdentifier:@"LoginToContact" sender:nil];
    });
}

...
@end
```
**2. 在`联系人列表界面`中点击`添加按钮`跳转到`添加页面`**
![Alt text|200x200](./show2.gif)

**3. 在`联系人列表界面`中点击注销按钮，注销登陆**
>`UIAlertController`：`iOS8`之后出现的，用来弹出提示窗，取代了`UIAcionSheet`和`UIAlertView`。

*ContactTableViewController.m*

```objective-c
#import "ContactTableViewController.h"
#import "AddViewController.h"
#import "EditViewController.h"

@interface ContactTableViewController ()
@property (nonatomic, strong) NSMutableArray *contactArr;// 联系人数组
...
@end

@implementation ContactTableViewController
...

- (IBAction)loginOut:(id)sender {
    // 初始化 UIAlertController,使用 actionSheet 样式
    UIAlertController *alert = [UIAlertController alertControllerWithTitle:@"是否注销?" message:@"真的要注销吗？" preferredStyle:UIAlertControllerStyleActionSheet];
    // 添加取消按钮（并绑定事件）
    [alert addAction:[UIAlertAction actionWithTitle:@"取消" style:UIAlertActionStyleCancel handler:nil]];
    // 添加确定按钮（并绑定事件）
    [alert addAction:[UIAlertAction actionWithTitle:@"确定" style:UIAlertActionStyleDestructive handler:^(UIAlertAction *action) {
        // pop掉适当前的视图控制器
        [self.navigationController popViewControllerAnimated:YES];
    }]];
    // 弹出这个控制器
    [self presentViewController:alert animated:YES completion:nil];
}
...
@end
```

**4. 为`登陆界面`的输入框增加清空按钮**
![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-03-22%20%E4%B8%8B%E5%8D%888.43.58.png)

**5. 为`登陆界面`的密码输入框设置安全输入**
![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-03-22%20%E4%B8%8B%E5%8D%888.44.32.png)

**6. 初始化`联系人列表界面`中的联系人**
>+ 添加属性`contactArr`
>+ 在`Storyboard`中为`联系人cell`设置`identifier`，并设置其`Style`为`Right Style`

*ContactTableViewController.m*

```objective-c
@interface ContactTableViewController ()
@property (nonatomic, strong) NSMutableArray *contactArr;// 联系人数组
...
@end

@implementation ContactTableViewController
...
#pragma mark - Table view data source
- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return self.contactArr.count;
}


- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"contactPeopleCell" forIndexPath:indexPath];
    
    // Configure the cell...
    
    return cell;
}

- (NSMutableArray *)contactArr
{
    if (!_contactArr) {
        _contactArr = [NSKeyedUnarchiver unarchiveObjectWithFile:ContactFilePath];
        if (_contactArr == nil) {
            _contactArr = [NSMutableArray array];
        }
    }
    return _contactArr;
}
...
@end
```

### 2.12.3	添加功能与传值
>**说明：**本课时讲解实现添加功能，添加联系人信息后通过代理传递数据到上一层视图控制器。用 `storyboard` 布局编辑页面。

**1. 创建`JKContactModel`数据模型**
>该数据模型能够`序列化`和`反序列化`

*JKContactModel.h*

```objective-c
#import <Foundation/Foundation.h>

@interface JKContactModel : NSObject
@property (nonatomic, copy) NSString *name;
@property (nonatomic, copy) NSString *phone;
@end
```
*JKContactModel.m*

```objective-c
#import "JKContactModel.h"

@implementation JKContactModel
- (void)encodeWithCoder:(NSCoder *)encoder {
    [encoder encodeObject:self.name forKey:@"name"];
    [encoder encodeObject:self.phone forKey:@"phone"];
}

- (id)initWithCoder:(NSCoder *)decoder {
    if (self = [super init]) {
        self.name = [decoder decodeObjectForKey:@"name"];
        self.name = [decoder decodeObjectForKey:@"phone"];
    }
    return self;
}
@end
```
**2. 定义具备添加功能（传值）的代理协议，并使用代理对象实现添加功能**
>+ 让姓名文本框自动获取光标，弹出虚拟键盘

*AddViewController.m*

```objective-c
#import <UIKit/UIKit.h>
@class AddViewController, JKContactModel;

// 定义处理添加工作的代理协议
@protocol AddViewControllerDelegate <NSObject>

@optional
- (void)addContact:(AddViewController *)addVc didAddContact:(JKContactModel *)contact;

@end

@interface AddViewController : UIViewController

@property (nonatomic, assign)id<AddViewControllerDelegate> delegate;// 代理对象

@end
```
*AddViewController.m*

```objective-c
#import "AddViewController.h"
#import "JKContactModel.h"
@interface AddViewController ()
@property (weak, nonatomic) IBOutlet UITextField *nameField;
@property (weak, nonatomic) IBOutlet UITextField *phoneField;
@property (weak, nonatomic) IBOutlet UIButton *addBtn;
- (IBAction)addAction;
- (IBAction)backAction:(id)sender;

@end

@implementation AddViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    // 添加观察者:姓名输入框内容发生改变时调用 textChange 方法
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(textChange) name:UITextFieldTextDidChangeNotification object:self.nameField];
    // 添加观察者:密码输入框内容发生改变时调用 textChange 方法
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(textChange) name:UITextFieldTextDidChangeNotification object:self.phoneField];
}

- (void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];
    // 让性命文本框 autofocus
    [self.nameField becomeFirstResponder];
}

- (IBAction)addAction {
    // 1. 关闭当前视图控制器
    [self.navigationController popViewControllerAnimated:YES];
    // 2. 通过代理对象传值
    if ([self.delegate respondsToSelector:@selector(addContact:didAddContact:)]) {
        // 创建数据模型
        JKContactModel *contactModel = [[JKContactModel alloc] init];
        contactModel.name = self.nameField.text;
        contactModel.phone = self.phoneField.text;
        // 通过代理对象将数据添加到 联系人列表视图的数组中
        [self.delegate addContact:self didAddContact:contactModel];
    }
}

// 返回
- (IBAction)backAction:(id)sender {
    [self.navigationController popViewControllerAnimated:YES];
}

/**
 *  改变登录按钮的可点击状态
 */
- (void)textChange
{
    self.addBtn.enabled = (self.nameField.text.length && self.phoneField.text.length);
}
@end
```
3. `联系人列表视图`中接受数据并增加一条联系人信息
>+ 去掉多余的 table 中多余的线
>+ 在cell右侧添加箭头

*ContactTableViewController.m*

```objective-c
#import "ContactTableViewController.h"
#import "JKContactModel.h"
#import "AddViewController.h"
#import "EditViewController.h"

@interface ContactTableViewController ()<AddViewControllerDelegate>

@property (nonatomic, strong) NSMutableArray *contactArr;// 联系人数组

- (IBAction)loginOut:(id)sender;

@end

@implementation ContactTableViewController
...
- (void)viewDidLoad {
	...
    [self clearExtraLine:self.tableView];
}

#pragma mark - AddViewController delagate
- (void)addContact:(AddViewController *)addVc didAddContact:(JKContactModel *)contact
{
    // 1. 添加数据模型
    [self.contactArr addObject:contact];
    // 2. 刷新表视图
    [self.tableView reloadData];
}
#pragma mark - 去掉多余的线
- (void)clearExtraLine:(UITableView *)tableView
{
    UIView *view = [[UIView alloc]init];
    view.backgroundColor = [UIColor clearColor];
    [self.tableView setTableFooterView:view];
}
#pragma mark - Navigation
// 在跳转到添加界面前为其设置代理对象（将当前的联系人列表视图控制器作为代理对象）
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    id vc = segue.destinationViewController;
    // 设置代理
    AddViewController *addVc = vc;
    addVc.delegate = self;
}
...
@end
```
**4. 设置键盘类型**
![Alt text](./屏幕快照 2016-03-23 10.14.46.png)

### 2.12.4	编辑页面功能完善
>**说明：**本课时讲解实现编辑页面的功能，点击编辑修改响应的按钮和文本框状态，并通过代理方法传值。

**1. 在`Storyboard`中创建并初始化编辑页面的布局**
>+ 为cell建立`selection segue`
>  ![Alt text|200x200](http://cdn.mengqingshen.com/img/JK_IOS_S2_section.gif)
>+ 设置按钮默认隐藏
>  ![Alt text|350x200](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-03-23%2010.35.09.png)
>+ 设置`编辑界面`的输入框默认不可点击

**2. 完善`EditViewController`**
>+ 初始化界面数据
>+ 定义编辑界面的代理协议
>+ 实现编辑action
>+ 实现保存action

"*Controller/EditViewController.h"*

```objective-c
#import <UIKit/UIKit.h>

@class JKContactModel, EditViewController;

@protocol EditViewControllerDelegate <NSObject>

@optional
- (void)editViewController:(EditViewController *)editVc ddidSavaContact: (JKContactModel *)model;

@end

@interface EditViewController : UIViewController

@property (nonatomic, assign) id<EditViewControllerDelegate>delegate;
@property (nonatomic, strong) JKContactModel *contactMode;

@end
```
"*Controller/EditViewController.m"*

```objective-c
#import "EditViewController.h"
#import "JKContactModel.h"
@interface EditViewController ()

@property (weak, nonatomic) IBOutlet UITextField *nameField;
@property (weak, nonatomic) IBOutlet UITextField *phoneField;
@property (weak, nonatomic) IBOutlet UIButton *saveBtn;

@property (weak, nonatomic) IBOutlet UIBarButtonItem *edit;

- (IBAction)saveAction:(id)sender;
- (IBAction)editAction:(id)sender;

@end

@implementation EditViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // 通过数据模型初始化页面数据
    self.nameField.text = self.contactMode.name;
    self.phoneField.text = self.contactMode.phone;
    
    // 添加观察者:姓名输入框内容发生改变时调用 textChange 方法
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(textChange) name:UITextFieldTextDidChangeNotification object:self.nameField];
    // 添加观察者:密码输入框内容发生改变时调用 textChange 方法
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(textChange) name:UITextFieldTextDidChangeNotification object:self.phoneField];
}

- (IBAction)saveAction:(id)sender {
    // 1. 关闭当前页面
    [self.navigationController popViewControllerAnimated:YES];
    // 2. 通知代理
    if ([self.delegate respondsToSelector:@selector(editViewController:didSavaContact:)]) {
        // 更新编辑界面的显示
        self.contactMode.name = self.nameField.text;
        self.contactMode.phone = self.phoneField.text;
        // 通过代理更新联系人列表界面的显示
        [self.delegate editViewController:self didSavaContact:self.contactMode];
    }
}

- (IBAction)editAction:(UIBarButtonItem *)sender {
    // 进入不可编辑状态
    if (self.nameField.enabled) {
        self.nameField.enabled = NO;
        self.phoneField.enabled = NO;
        [self.view endEditing:YES];
        self.saveBtn.hidden = YES;
        sender.title = @"编辑";
        // 使用原来的数据还原输入框显示
        self.nameField.text = self.contactMode.name;
        self.phoneField.text = self.contactMode.phone;
    }
    // 进入可编辑状态
    else {
        self.nameField.enabled = YES;
        self.phoneField.enabled = YES;
        [self.view endEditing:NO];
        self.saveBtn.hidden = NO;
        sender.title = @"取消";// 更新编辑按钮文案
    }
}

/**
 *  改变登录按钮的可点击状态
 */
- (void)textChange
{
    self.edit.enabled = (self.nameField.text.length && self.phoneField.text.length);
}
@end
```
3. `联系人列表界面`采纳代理协议，接收编辑页面的数据
>+ 跳转到编辑页面前为`编辑界面`赋值代理对象
>+ 实现滑动删除功能

	 ****
*ContactTableViewConrtroller.m*

```objective-c
#import "ContactTableViewController.h"
#import "JKContactModel.h"
#import "AddViewController.h"
#import "EditViewController.h"

@interface ContactTableViewController ()<AddViewControllerDelegate, EditViewControllerDelegate>
...
@end

@implementation ContactTableViewController

...
#pragma mark - UITableView delegate
- (void)tableView:(UITableView *)tableView commitEditingStyle:(UITableViewCellEditingStyle)editingStyle forRowAtIndexPath:(NSIndexPath *)indexPath {
    // 滑动删除
    if (editingStyle == UITableViewCellEditingStyleDelete) {
        // 1. 删除对应数据模型
        [self.contactArr removeObjectAtIndex:indexPath.row];
        // 2. 刷新表视图
        [self.tableView deleteRowsAtIndexPaths:@[indexPath] withRowAnimation:UITableViewRowAnimationTop];
    }
}
#pragma mark - EditViewController delegate
// 数据模型被改变后，刷新界面显示
- (void)editViewController:(EditViewController *)editVc didSavaContact:(JKContactModel *)model
{
    [self.tableView reloadData];
}

#pragma mark - Navigation
// 在跳转到添加界面前为其设置代理对象（将当前的联系人列表视图控制器作为代理对象）和数据模型
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    id vc = segue.destinationViewController;
    /* 设置代理 */
    // 跳转到添加联系人视图控制器
    if ([vc isKindOfClass:[AddViewController class]]) {
        AddViewController *addVc = vc;
        addVc.delegate = self;
    }
    // 跳转到编辑联系人视图控制器
    else if ([vc isKindOfClass:[EditViewController class]]) {
        // 获取点击的联系人所在cell(选中的那一行)的 NSIndexPath
        EditViewController *editVc = vc;
        // 获取选中的那一行
        NSIndexPath *path = [self.tableView indexPathForSelectedRow];
        // 赋值数据模型
        editVc.contactMode = self.contactArr[path.row];
        // 赋值代理对象
        editVc.delegate = self;
    }
}
@end
```


### 2.12.5	数据存储
>**说明：**本课时讲解数据存储的四种方式的区别，学习`偏好设置`和`归档`的方式存储数据，并解决添加页面不能传值的问题。

| 数据存储方式    | 说明                                     |
| --------- | -------------------------------------- |
| plist     | 需要知道文件名，只适合`NSArray`、`NSString`等基本数据类型 |
| 偏好设置      | 不需要知道文件名，小型数据`NSUserDefaults`          |
| 对象归档      | `NSKeyedArchiver`，必须采纳`NSCoding`协议     |
| core Data | 大型数据                                   |
| sqpite3   | 数据库                                    |

#### 2.12.5.1	便好设置
>**实战：**登录界面载入后采用`便好设置`方式读取配置
>+ 页面载入时读取`便好设置`
>+ 点击登录时存储`便好设置`

*LoginViewController.m*

```objective-c
#import "MBProgressHUD+MJ.h"

#define UserNameKey @"name"
#define PwdKey @"pwd"
#define RmbPwdKey @"rmd_pwd"
...
@implementation LoginViewController

- (IBAction)loginAction {
	...
    // 存储数据
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    [defaults setObject:self.nameField forKey:UserNameKey];
    [defaults setObject:self.pwdField.text forKey:PwdKey];
    [defaults setBool:self.rembField.isOn forKey:RmbPwdKey];
    // 设置同步
    [defaults synchronize];
}

- (void)viewDidLoad {
	...
    // 读取上次配置
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    self.nameField.text = [defaults valueForKey:UserNameKey];
    self.pwdField.text = [defaults valueForKey:PwdKey];
    self.rembField.on = [defaults boolForKey:RmbPwdKey];
    // 如果上次登录时选择了记住密码，则自动填写密码字段，并激活登录按钮
    if (self.rembField.isOn) {
        self.pwdField.text = [defaults valueForKey:PwdKey];
        self.loginBtn.enabled = YES;
    }
}
...
@end
```

#### 2.12.5.2	对象归档
>**实战：**联系人列表界面使用`对象归档方式`存储数据。
>+ `JKContactModel`采纳`NSCoding`协议
>+ 对`联系人列表界面`中添加、删除和读取数据模型的操作进行归档

*ContactTableViewController.m*

```objective-c
#import "ContactTableViewController.h"
#import "JKContactModel.h"
#import "AddViewController.h"
#import "EditViewController.h"

// 获取归档的文件路径
#define ContactFilePath [[NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) lastObject] stringByAppendingPathComponent:@"contacts.data"]
...

@implementation ContactTableViewController
...
#pragma mark - UITableView delegate
- (void)tableView:(UITableView *)tableView commitEditingStyle:(UITableViewCellEditingStyle)editingStyle forRowAtIndexPath:(NSIndexPath *)indexPath {
    // 滑动删除
    if (editingStyle == UITableViewCellEditingStyleDelete) {
        // 1. 删除对应数据模型
        [self.contactArr removeObjectAtIndex:indexPath.row];
        // 2. 刷新表视图
        [self.tableView deleteRowsAtIndexPaths:@[indexPath] withRowAnimation:UITableViewRowAnimationTop];
        // 3. 归档
        [NSKeyedArchiver archiveRootObject:self.contactArr toFile:ContactFilePath];
    }
}

- (NSMutableArray *)contactArr
{
    if (!_contactArr) {
        _contactArr = [NSKeyedUnarchiver unarchiveObjectWithFile:ContactFilePath];
        if (_contactArr == nil) {
            _contactArr = [NSMutableArray array];
        }
    }
    return _contactArr;
}

#pragma mark - EditViewController delegate
// 数据模型被改变后，刷新界面显示
- (void)editViewController:(EditViewController *)editVc didSavaContact:(JKContactModel *)model
{
    [self.tableView reloadData];
    // 归档
    [NSKeyedArchiver archiveRootObject:self.contactArr toFile:ContactFilePath];
}

#pragma mark - AddViewController delagate
- (void)addContact:(AddViewController *)addVc didAddContact:(JKContactModel *)contact
{
    // 1. 添加数据模型
    [self.contactArr addObject:contact];
    // 2. 刷新表视图
    [self.tableView reloadData];
    // 3. 归档
    [NSKeyedArchiver archiveRootObject:self.contactArr toFile:ContactFilePath];
}

...
@end
```

## 2.13	绘制小黄人

### Quartz 2D
>**说明：**是一个二维绘图引擎。`Quartz 2D`的`API`是`C`语言，来自于`CoreGraphics`框架。该框架可以用来
>+ 绘制图形：线条／三角形／矩形／圆／弧等
>+ 绘制文字
>+ 绘制、生成图片（图像)）
>+ 读取／生成pdf
>+ 截图、裁剪图片
>+ 自定义UI控件
>
>**技巧：**`UIView`就是通过该引擎实现的控件绘制，因此可以通过继承`UIView`定义自己的控件。
>**图形上下文（Graphics Context）：**是一个`CGContextRef`类型的数据，用来
>+ 保存绘图信息、绘图状态
>+ 决定绘制的输出目标（绘制到什么地方去，输出目标可以是PDF文件、Bitmap或者显示器的窗口上）

### 2.13.1	`Quartz 2D`基本图形
>**说明：**本课时讲解 `Quartz 2D` 的概念，`drawRect` 方法的调用、图形上下文、以及线段、三角形、四边形的绘制方法。
>![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-03-24%20%E4%B8%8B%E5%8D%889.51.15.png)

*DrawLine.h*

```objective-c
#import <UIKit/UIKit.h>

@interface DrawLine : UIView

@end

```
*DrawLine.m*

```objective-c
#import "DrawLine.h"

@implementation DrawLine


/**
 *  @override
 *  系统自动调用，视图显示在屏幕上的时候调用切只调用一次
 */
- (void)drawRect:(CGRect)rect {
    drwaLine();
    drawRect();
    drawTriangle();
}

/**
 *  绘制直线
 *  绘制两条样式不同的线，因此在两个图形上下文中分别绘制
 */
void drwaLine() {
    // 第1条线
    // 1. 获取图形上下文
    CGContextRef context = UIGraphicsGetCurrentContext();
    // 将上下文复制一份到栈中(作为为第二条线的图形上下文)
    CGContextSaveGState(context);
    
    // 2. 绘制图形
    CGContextSetLineWidth(context, 20);// 设置线的宽度
    CGContextSetLineCap(context, kCGLineCapRound);// 设置线条头尾部的样式
    CGContextSetRGBStrokeColor(context, 1, 0, 0, 1);// 设置颜色
    
    CGContextMoveToPoint(context, 10, 10);//设置起点
    CGContextAddLineToPoint(context, 100, 100);
    // 3. 显示到View
    CGContextStrokePath(context);// 以空心的方式画出
    
    // 第二条线
    // 1. 获取图形上下文
    CGContextRestoreGState(context);// 将图形上下文出栈， 替换当前的上下文
    // 2. 绘制图形
    CGContextSetLineJoin(context, kCGLineJoinRound);// 设置线断转折点的样式
    
    CGContextAddLineToPoint(context, 150, 120);
    CGContextAddLineToPoint(context, 150, 180);
    // 3. 显示到View
    CGContextStrokePath(context);// 以空心的方式画出
}

/**
 *  绘制四边形
 */
void drawRect() {
    // 1. 获取图形上下文
    CGContextRef context = UIGraphicsGetCurrentContext();
    // 2. 绘制四边形
    CGContextAddRect(context, CGRectMake(10, 10, 120, 180));// 四边形
    [[UIColor purpleColor] setFill];// 设置填充色
    // 3. 显示在 View 上
    CGContextFillPath(context);
}

/**
 *  绘制三角形
 */
void drawTriangle() {
    // 1. 获取图形上下文
    CGContextRef context = UIGraphicsGetCurrentContext();
    // 2. 绘制三角形
    CGContextMoveToPoint(context, 0, 0);
    CGContextAddLineToPoint(context, 100, 100);// 第一个边
    CGContextAddLineToPoint(context, 150, 100);// 第二个边
    CGContextClosePath(context);// 第三个边（闭合路径，连接起点和最后一个点）
    [[UIColor redColor] set];
    // 3. 显示在view
    CGContextStrokePath(context);
}
@end
```

### 2.13.2	绘制圆、图片与文字
>**说明：**本课时讲解绘制圆弧、圆形、图片与文字的方法，所用函数及函数参数的含义，并介绍多种不同的函数绘制图形，最后介绍了`Quartz 2D`中的贝塞尔曲线。
>![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-03-24%20%E4%B8%8B%E5%8D%8810.25.47.png)

*DrawCircle.m*

```objective-c
#import "DrawCircle.h"

/**
 *  角度转换为弧度
 *
 *  @param angle 角度
 *
 *  @return 弧度
 */
CGFloat arc(CGFloat angle) {
    return angle * (M_PI / 180);
}

@implementation DrawCircle

- (void)drawRect:(CGRect)rect {
    drawArc();
    drawCircle();
    drawImg();
    drawText();
    drawBezier();
}

/**
 *  画圆
 */
void drawCircle() {
    // 1. 获取上下文
    CGContextRef context = UIGraphicsGetCurrentContext();
    // 2. 绘制图形
    CGContextAddEllipseInRect(context, CGRectMake(50, 50, 130, 100));
    CGContextSetLineWidth(context, 10);
    // 3. 显示在View
    CGContextStrokePath(context);
}

/**
 *  弧形
 */
void drawArc() {
    // 1. 获取图形上下文
    CGContextRef context = UIGraphicsGetCurrentContext();
    // 2. 绘制图形
    // 参数：上下文, 圆心横坐标，圆心纵坐标，半径，开始的角度，结束的角度，0顺时针/1逆时针
    CGContextAddArc(context, 100, 100, 50, arc(90), arc(200), 1);
    // 3. 显示在View上
    CGContextFillPath(context);
}

/**
 *   绘制字体
 */
void drawText() {
    NSString *str = @"极客学院";// 字串
    // 设置（字体样式信息保存在字典中）
    NSMutableDictionary *attributes = [NSMutableDictionary dictionary];
    attributes[NSFontAttributeName] = [UIFont systemFontOfSize:20];// 字体大小
    attributes[NSForegroundColorAttributeName] = [UIColor purpleColor];// 字体颜色
    // 绘制
    [str drawInRect:CGRectMake(100, 100, 100, 30) withAttributes:attributes];
}

/**
 *  绘制图片
 */
void drawImg(){
    // 1. 取得图片
    UIImage *img = [UIImage imageNamed:@"1.jpg"];
    // 2. 画
    // img drawAtPoint
    // img drawInRect
    [img drawAsPatternInRect:CGRectMake(0, 0, 300, 300)];
    NSString *str = @"极客学院";
    // 3. 显示到View
    [str drawInRect:CGRectMake(0, 0, 100, 30) withAttributes:nil];
}

/**
 *  贝塞尔曲线
 */
void drawBezier(){
    // 1.取得图形上下文
    CGContextRef context = UIGraphicsGetCurrentContext();
    // 2. 起点
    CGContextMoveToPoint(context, 10, 10);
    
    //CGContextAddCurveToPoint(context, 120, 100, 180, 50, 190, 190);// 2个控制点
    CGContextAddQuadCurveToPoint(context, 150, 200, 200, 100);// 1个控制点
    // 绘制
    CGContextStrokePath(context);
}

@end

```

### 2.13.3	绘制小黄人雏形
>**说明：**本课时讲解根据所学习的 `Quartz 2D` 的绘制图形的知识绘制小黄人雏形，以此加深对绘图的理解。
>![Alt text|200x150](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-03-25%20%E4%B8%8A%E5%8D%8812.28.25.png)

*DrawHuman.m*

```objective-c
#import "DrawHuman.h"
#define JKRadius 70// 半径
#define JKTopY 100// 即是身体高度，也是身体顶部纵坐标
#define JKColor(r, g, b) [UIColor colorWithRed:(r)/255.0 green:(g)/255.0 blue :(b)/255.0 alpha:1.0]// 身体颜色
@implementation DrawHuman

- (void)drawRect:(CGRect)rect {
    // 1. 图形上下文
    CGContextRef context = UIGraphicsGetCurrentContext();
    drawBody(context, rect);
    drawMouse(context, rect);
    drawEyes(context, rect);
}

/**
 *  身体
 */
void drawBody(CGContextRef context, CGRect rect) {
    // 上半圆
    CGFloat topX = rect.size.width * 0.5;// 圆心横坐标
    CGFloat topY = JKTopY;// 圆心纵坐标
    CGFloat topRadius = JKRadius;// 圆形半径
    CGContextAddArc(context, topX, topY, topRadius, 0, M_PI, 1);// 绘制半圆（从右侧沿逆时针向左绘制）
    
    // 身体左侧竖线
    CGFloat middleX = topX - topRadius;// 终点横坐标
    CGFloat middleH = JKTopY;// 身体部分高度
    CGFloat middleY =  topY + middleH;// 终点纵坐标
    CGContextAddLineToPoint(context, middleX, middleY);
    
    // 下半圆
    CGFloat bottomX = topX;// 圆心横坐标
    CGFloat bottomY = middleY;// 圆心纵坐标
    CGFloat bottomRedius = topRadius;// 半径
    CGContextAddArc(context, bottomX, bottomY, bottomRedius, M_PI, 0, 1);
    
    // 闭合
    CGContextClosePath(context);
    
    // 设置颜色
    [JKColor(252, 218, 0) set];
    
    // 显示
    CGContextFillPath(context);
}

/**
 *  嘴
 *  采用赛贝尔曲线，1个控制点
 */
void drawMouse(CGContextRef context, CGRect rect) {
    // 控制点
    CGFloat controlX = rect.size.width * 0.5;
    CGFloat controlY = rect.size.height * 0.3;
    
    // 移动到起点
    CGFloat marginX = 20;
    CGFloat marginY = 10;
    CGFloat currentX = controlX - marginX;
    CGFloat currentY = controlY - marginY;
    CGContextMoveToPoint(context, currentX, currentY);
    
    // 结束点坐标
    CGFloat endX = controlX + marginX;
    CGFloat endY = currentY;
    
    // 绘制
    CGContextAddQuadCurveToPoint(context, controlX, controlY, endX, endY);
    
    // 设置颜色
    [[UIColor blackColor] set];

    // 显示到View
    CGContextStrokePath(context);
}

/**
 *  眼睛
 */
void drawEyes(CGContextRef context, CGRect rect) {
    //黑色绑带（一条很粗的线）
    CGFloat startX = rect.size.width * 0.5 - JKRadius;// 起点横坐标
    CGFloat startY = JKTopY;// 起点纵坐标
    CGContextMoveToPoint(context, startX, startY);
    CGFloat endX = startX + 2 * JKRadius;// 终点横坐标
    CGFloat endY = startY;// 终点纵坐标
    CGContextAddLineToPoint(context, endX, endY);// 划线
    CGContextSetLineWidth(context, 15);// 设置线的宽度
    [[UIColor blackColor] set];// 设置线的颜色
    CGContextStrokePath(context);// 显示

    //灰色镜框
    [JKColor(61, 62, 66) set];
    CGFloat kuangRadius = JKRadius * 0.4;
    CGFloat kuangY = startY;
    CGFloat kuangX = rect.size.width * 0.5 - kuangRadius;
    CGContextAddArc(context, kuangX + 25, kuangY, kuangRadius, 0, M_PI * 2, 0);
    CGContextFillPath(context);
    
    //里面的白色框
    [[UIColor whiteColor] set];
    CGFloat whiteRadius = kuangRadius * 0.7;
    CGFloat whiteX = kuangX;
    CGFloat whiteY = kuangY;
    CGContextAddArc(context, whiteX + 25, whiteY, whiteRadius, 0, M_PI * 2, 0);
    CGContextFillPath(context);
    
    //眼睛
    [[UIColor blackColor] set];
    CGFloat blackRadius = whiteRadius * 0.5;
    CGFloat blackX = whiteX;
    CGFloat blackY = whiteY;
    CGContextAddArc(context, blackX + 25, blackY, blackRadius, 0, M_PI * 2, 0);
    CGContextFillPath(context);
}
@end
```

## 2.14	手势密码锁

### UIGestureRecognizer
>**说明：**所有手势操作相关的操作的类的`基类`

| `UIGestureRecognizer`的子类       | 对应的手势操作            |
| ------------------------------ | ------------------ |
| `UITapGestureRecoginizer`      | 点击                 |
| `UIPinchGestureRecognizer`     | 捏合                 |
| `UIRotationGestureRecognizer`  | 旋转                 |
| `UISwipwGestureRecognizer`     | 轻扫、快速移动，是用于监测欢动方向的 |
| `UIPanGestureRecognizer`       | 拖移、慢速移动，是用于监测便宜的量的 |
| `UILongPressGestureRecognizer` | 长按                 |

### 2.14.1	点击、捏合、轻扫
>**说明：**本课时讲解点击手势，单击和双击，手势互斥原则的概念和解决方法，捏合手势缩放视图以及轻扫手势的使用。

*ViewController.m*

```objective-c
...
#pragma mark - Tap 点击和手势
/**
 *  1. 点击示例
 */
- (void)tapGesture
{
    // 类型一：一个手指单击
    UITapGestureRecognizer *tap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(singleTap:)];
    tap.numberOfTapsRequired = 1;// 点击次数(默认1)
    tap.numberOfTouchesRequired = 1;// 几个手指点击（默认1）
    [self.view addGestureRecognizer:tap];// 注册事件到顶层view
    
    // 类型二：一个手指双击
    UITapGestureRecognizer *tap2 = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(doubleTap:)];
    tap2.numberOfTapsRequired = 2;
    [self.view addGestureRecognizer:tap2];
    
    // 类型一和类型二冲突策略
    [tap requireGestureRecognizerToFail:tap2];// 同时发生时，只触发tap2
    
    // 类型三：两个手指单击
    UITapGestureRecognizer *tap3 = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(singleTwoFingerTap:)];
    tap3.numberOfTouchesRequired = 2;
    [self.view addGestureRecognizer:tap3];
    
    // 类型二和类型三冲突策略
    [tap2 requireGestureRecognizerToFail:tap3];// 同时发生时，只触发tap3
}

/**
 *  2. 轻扫手势示例
 */
- (void)swipeGesture
{
    UISwipeGestureRecognizer *swipe = [[UISwipeGestureRecognizer alloc] initWithTarget:self action:@selector(swipeAction:)];
    swipe.direction = UISwipeGestureRecognizerDirectionLeft;// 默认右扫
    [self.view addGestureRecognizer:swipe];
}

/**
 *  3. 捏合手势示例
 */
- (void)pinchGesture
{
    UIPinchGestureRecognizer *pinch = [[UIPinchGestureRecognizer alloc] initWithTarget:self action:@selector(pinchAction:)];
    [self.view addGestureRecognizer:pinch];
}

#pragma mark - 响应方法
// 单击（一个手指）
- (void)singleTap:(UITapGestureRecognizer *)tap
{
    _genstureLabel.text = @"一个手指单击";
}

// 双击（一个手指）
- (void)doubleTap:(UITapGestureRecognizer *)tap
{
    _genstureLabel.text = @"一个手指双击";
}

// 单击（两个手指）
- (void)singleTwoFingerTap:(UITapGestureRecognizer *)tap
{
    _genstureLabel.text = @"两个手指单击";
}

// 滑动
- (void)swipeAction:(UISwipeGestureRecognizer *)swipe
{
    _genstureLabel.text = @"向左轻扫";
}

// 捏合
- (void)pinchAction:(UIPinchGestureRecognizer *)pinch
{
    float scale = pinch.scale;
    pinch.view.transform = CGAffineTransformScale(pinch.view.transform, scale, scale);
    if (scale > 1) {
        _genstureLabel.text = @"捏合放大";
    }
    else if (scale < 1) {
        _genstureLabel.text = @"捏合缩小";
    }
}

...
```


### 2.14.2	拖移、旋转、长按
>**说明：**本课时讲解拖移、旋转和长按手势的声明以及响应方法，根据其属性和方法来深入理解手势。

```objective-c
/**
 *  4. 拖移手势示例
 */
- (void)panGesture
{
    UIPanGestureRecognizer *pan = [[UIPanGestureRecognizer alloc] initWithTarget:self action:@selector(panAction:)];
    [_genstureLabel addGestureRecognizer:pan];// 注册事件到_genstureLabel
}

/**
 *  5. 旋转手势示例
 */
- (void)rotationGesture
{
    UIRotationGestureRecognizer *rotation = [[UIRotationGestureRecognizer alloc] initWithTarget:self action:@selector(rotationAction:)];
    [_genstureLabel addGestureRecognizer:rotation];
}

/**
 *  6. 长按手势示例
 */
- (void)longPressGesture
{
    UILongPressGestureRecognizer *longPress = [[UILongPressGestureRecognizer alloc] initWithTarget:self action:@selector(longPressAction:)];
    longPress.minimumPressDuration = 2;// 设置有效触发长按事件时间
    [self.view addGestureRecognizer:longPress];
}

// 长按
- (void)longPressAction:(UILongPressGestureRecognizer *)longPress
{
    _genstureLabel.text = @"已经长按2秒";
}

// 旋转
- (void)rotationAction:(UIRotationGestureRecognizer *)rotationGes
{
    rotationGes.view.transform = CGAffineTransformRotate(rotationGes.view.transform, rotationGes.rotation);
    rotationGes.rotation = M_PI;
    _genstureLabel.text = @"旋转";
}

// 拖动
- (void)panAction:(UIPanGestureRecognizer *)pan
{
    // 移动的量（向量）
    CGPoint translation = [pan translationInView:self.view];
    // 计算移动后的位置坐标
    pan.view.center = CGPointMake(pan.view.center.x + translation.x, pan.view.center.y + translation.y);
    // 设置坐标和速度
    [pan setTranslation:CGPointZero inView:self.view];
    _genstureLabel.text = @"把我放哪儿啊？";
}

```

### 2.14.3	九宫格布局按钮
>**说明：**本课时讲解通过 `storyboard` 添加背景视图，并通过代码布局按钮，运用到了九宫格布局算法，对触摸事件和按钮的功能进行代码封装。
1.  引入图片资源
2.  创建`JKLockView`（`UIView`）
3.  重写`initWithFrame`和`initWithCoder`
4.  布局`JKLockView`并添加按钮
  ![Alt text|100x180](http://cdn.mengqingshen.com/img/JK_IOS_S2_gesture.gif)


### 2.14.4	手势连线与代理
>**说明：**本课时讲解将按钮根据手势触摸连线，修改按钮选中状态、手势结束后取消连线、最后设置代理方法来判断密码是否正确。
>1. 完成连线逻辑
>2. 在`JKLockView`中定义代理协议
>3. `ViewController`采纳代理协议
>4. 在`JKLockView`中调用代理对象
>5. 在`ViewController`中使用`UIAlertController`

>**注意：**
>+ 数组或字典中添加的对象不能为`nil`，否则程序会崩溃
>+ 当视图发生变化时，调用`setNeedDisplay`更新视图

>**技巧：**通过 `makeObjectsPerformSelector` 向数组中的每一个对象发送信息


## 2.15	抽奖转盘动画
>**说明：**`QuartzCore` 框架是常用的框架，除了绘图还有动画效果，通过这个课程理解常用的 `CAAnimation` 类，并且了解图层与视图的关系，包括 `CALayer` 的自定义方法和属性。
+ CALayer
+ CAAnimation
+ 转场动画与组动画
+ 隐性动画
+ CGImageCreateWithImageInRect
+ CADisplayLink

>**兼容性：**`QuartzCore`与`CoreGraphics`是可以跨平台使用的，`UIKit`只能在`iOS`中使用

### 2.15.1	CALayer图层介绍
***课程介绍：**本课时讲解` CALayer` 图层的概念，介绍图层的属性和自定义图层的方法。*

#### CALayer
>**依赖：**使用层之前，需要在项目中引入`QuartzCore.framework`框架
>**用途：**`CALayer`(层)是屏幕上的一个矩形区域，在每一个`UIView`中都包含一个根`CALayer`，在`UIView`上的所有视觉效果都是在这个`Layer`上进行的。
+ 层的大小尺寸
+ 背景色
+ 内容（可以填充图片或者使用`Core Graphics`绘制的内容）
+ 矩形是否使用圆角
+ 矩形是否有阴影

>**感性认知：**`CALayer`本质上是一块包含一幅位图的缓冲区，由视图创建的层为`隐式层`，而手动创建的层称为`显示层`。
>**种类：**`Layer`有很多种，最常用也是最基本的是`CALayer`，当然还包括其他的子类
+ `CAScrollerLayer` 简化显示层的一部分
+ `CATextLayer` 文本层
+ `CAGradientLayer`、`CAShapeLayer`等等


#### 2.15.1.1	原生控件使用`CALayer`
>**说明：**在每一个`UIView`中都包含一个根`CALayer`，在`UIView`上的所有视觉效果都是在这个`Layer`上进行的。
>![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-03-29%2013.11.53.png)

*ViewController.m*

```objective-c
#import "ViewController.h"

#define kScreenWidth [UIScreen mainScreen].bounds.size.width
#define kScreenHeight [UIScreen mainScreen].bounds.size.height

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
	...
    [self initImageView];
}

/**
 *  设置原生控件的CALayer（以 UIImageView 为例）
 */
- (void)initImageView
{
    UIImageView *imgView = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"1.jpg"]];
    imgView.frame = CGRectMake((kScreenWidth - 200) / 2, (kScreenHeight - 200) / 2, 200, 200);// 设置frame
    [self.view addSubview:imgView];// 将 UIImageView 添加到视图中
    
    // 设置 UIImageView 的根 CGLayer
    // 1. 设置阴影
    imgView.layer.shadowColor = [UIColor yellowColor].CGColor;// 设置阴影颜色
    imgView.layer.shadowOffset = CGSizeMake(10, 10);// 设置阴影的偏移
    imgView.layer.shadowOpacity = 0.5;// 设置阴影的不透明
    // 2. 设置圆角
    imgView.layer.cornerRadius = 10;// 设置圆角半径
    imgView.layer.masksToBounds = YES;// 强制内部的所有子层支持圆角效果，少了这个设置，UIImageView是不会有圆角效果的。设置之后，没有阴影效果。
    // 3. 设置边框
    imgView.layer.borderWidth = 5;
    imgView.layer.borderColor = [UIColor grayColor].CGColor;
    // 4. 设置旋转：利用 transform 属性可以设置旋转、缩放等效果
    imgView.layer.transform = CATransform3DMakeRotation(M_PI_4, 1, 1, 0);// 顺时针旋转45度
    imgView.layer.transform = CATransform3DMakeScale(0.5, 1, 0);// 缩小0.5倍
    
    // [imgView.layer setValue:@(2) forKey:@"transform.scale.x"];// 使用KVC方式
    
}
@end
```

#### 2.15.1.2	自定义CALayer
>**说明：**两种方式
>+ 建子类继承`CALayer`，实现 `drawInContext：`方法
>+ 在控制器中设置代理，实现代理方法来画图层

##### 方式一：继承CALayer
![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-03-29%2013.26.12.png)

*MyCALayer.h*
>**说明：**继承`CALayer`
>**注意：**需要在项目的`info.plist`中导入`QuartzCore`库

```objective-c
#import <QuartzCore/QuartzCore.h>

@interface MyCALyer : CALayer

@end
```
*MyCALayer.m*
>**说明：**需要重写`drawInContext`方法，该方法在视图变动时通过`setNeededDisplay`被自动调用。

```objective-c
#import "MyCALyer.h"

@implementation MyCALyer
/**
 *  @override
 *  该方法中完成对图层的绘制
 *
 *  @param ctx 图形上下文
 */
-(void)drawInContext:(CGContextRef)ctx
{
    CGContextSetRGBFillColor(ctx, 0, 0, 1, 1);// 设置颜色
    CGContextAddEllipseInRect(ctx, CGRectMake(10, 10, 100, 100));// 椭圆
    CGContextFillPath(ctx);// 实心绘制
}
@end
```
*ViewController.m*
>**说明：**在控制器中使用这个自定义的`MyLayer`，将图层实例添加到视图中。

```objective-c
#import "ViewController.h"
#import "MyCALyer.h"
@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
	...
    [self myLayerExample];
}
...
/**
 *  示例自定义 CALayer 的使用
 */
- (void)myLayerExample
{
    // 创建自定义 layer 实例
    MyCALyer *layer = [MyCALyer layer];
    // 设置该 layer 实例
    layer.bounds = CGRectMake(0, 0, 300, 300);
    layer.anchorPoint = CGPointMake(0, 0);
    layer.delegate = self;
    // 绘制该layer
    [layer setNeedsDisplay];// 调用该方法，layer 的 drawInContext 方法才会被调用
    // 添加到视图中
    [self.view.layer addSublayer:layer];// 添加到视图
}
@end
```

##### 方式二：实现代理当法
>**说明：**和方式一一样要创建`CALayer`的子类，但不用实现`drawInContext`方法，而是设置代理对象（可以是任何类的实例），绘制的过程由代理对象重写`drawInContext`方法来实现。
>*JKLayer.h*

```objective-c
#import <QuartzCore/QuartzCore.h>

@interface JKLayer : CALayer
@end
```
*JKLayer.m*

```objective-c
#import "JKLayer.h"

@implementation JKLayer
@end
```
*ViewController.m*

```objective-c
#import "ViewController.h"
#import "JKLayer.h"
@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    JKLayer *layer = [JKLayer layer];
    layer.bounds = CGRectMake(0, 0, 300, 300);
    layer.anchorPoint = CGPointMake(0, 1);
    layer.delegate = self;// 不用采纳额外协议，任何对象可以作为代理对象
    [layer setNeedsDisplay];// 必须调用这个方法，代理对象的 drawLayer方法 才会显被调用
    [self.view.layer addSublayer:layer];// 添加到父图层
}

#pragma mark - 代理方法
/**
 *  @override
 *  修改当前ViewController的根Layer
 *  @param layer 图层
 *  @param ctx   绘制上下文
 */
- (void)drawLayer:(CALayer *)layer inContext:(CGContextRef)ctx
{
    // 设置图层
    CGContextSetRGBFillColor(ctx, 0, 0, 1, 1);
    CGContextAddEllipseInRect(ctx, CGRectMake(10,10, 100, 100));
    CGContextFillPath(ctx);
}
@end
```

### 2.15.2	CAAnimation 动画
>**说明：**基本动画、关键帧动画、组动画

| 基本动画类型                | 说明    | 父类            | 用途              |
| --------------------- | ----- | ------------- | --------------- |
| `CABasicAnimation`    | 基础动画  | 属性动画          | 平移、旋转、缩放        |
| `CAKeyframeAnimation` | 关键帧动画 | 属性动画          | 按照某种自定义路径移动     |
| `CATransition`        | 转场动画  | `CAAnimation` | 不同layer之间的切换    |
| `CAAnimationGroup`    | 组动画   | `CAAnimation` | 将几个不同的动画放在同一个组里 |

*ViewController.m*

```objective-c
#import "ViewController.h"

@interface ViewController ()

@property (nonatomic, strong) CALayer *layer;// 用于演示动画的图层

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    // 创建图层
    CALayer *layer = [CALayer layer];
    // 设置图层
    layer.bounds = CGRectMake(0, 0, 100, 100);
    layer.position = CGPointMake(100, 100);
    layer.backgroundColor = [UIColor yellowColor].CGColor;
    // 添加图层
    [self.view.layer addSublayer:layer];
    self.layer = layer;
}

- (void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event {
    // [self animationScale];
    // [self animationTranslate];
    // [self animationRotation];
    [self keyFrameAnimation];
}

#pragma mark - 基本动画(CABasicAnimation)
// 缩放
- (void)animationScale
{
    // 1. 创建动画对象
    CABasicAnimation *animation = [CABasicAnimation animation];
    
    // 2. 设置 动画
    // keyPath ：决定了基本动画的类型
    animation.keyPath = @"bounds";
    // toValue 到达哪个点，byValue 增加多少值, fromValue 从哪个点开始移动
    animation.toValue = [NSValue valueWithCGRect:CGRectMake(0, 0, 50, 50)];// toValue ：到达哪个点
    animation.duration = 2;// 动画持续时间
    animation.removedOnCompletion = NO;// 动画完毕之后不删除动画（即，可以再次触发）
    animation.fillMode = @"forwords";
    
    // 3. 添加动画到图层
    [self.layer addAnimation:animation forKey:nil];
}

// 平移
- (void)animationTranslate
{
    // 1. 创建动画对象
    CABasicAnimation *animation = [CABasicAnimation animation];
    
    // 2. 设置动画
    animation.keyPath = @"position";
    animation.toValue = [NSValue valueWithCGPoint:CGPointMake(200, 200)];
    animation.duration = 2;
    animation.removedOnCompletion = NO;
    animation.fillMode = @"forwards";
    
    // 3. 添加动画
    [self.layer addAnimation:animation forKey:nil];
}

// 旋转
- (void)animationRotation
{
    // 1. 创建动画对象
    CABasicAnimation *animation = [CABasicAnimation animation];
    
    // 2. 设置动画
    animation.keyPath = @"transform";
    animation.toValue = [NSValue valueWithCATransform3D:CATransform3DMakeRotation(M_PI_4, 1, 1, 0)];
    animation.duration = 2;
    animation.removedOnCompletion = NO;
    animation.fillMode = @"forward";
    
    // 3. 添加动画
    [self.layer addAnimation:animation forKey:nil];
}

#pragma mark - 关键帧动画
// 让图层做一个圆形移动
- (void)keyFrameAnimation
{
    // 1. 创建动画对象
    CAKeyframeAnimation *animation = [CAKeyframeAnimation animationWithKeyPath:@"position"];
    
    // 2. 设置动画
    animation.removedOnCompletion = NO;
    animation.fillMode = kCAFillModeForwards;// 保持最新的状态
    animation.duration = 2;
    
    CGMutablePathRef path = CGPathCreateMutable();// 创建一个可变路径
    CGPathAddEllipseInRect(path, NULL, CGRectMake(100, 100, 200, 200));// 画一个圆
    animation.path = path;// 设置动画路径
    // CGPathRelease(path);
    
    // 3. 设置动画的执行节奏
    animation.timingFunction = [CAMediaTimingFunction functionWithName:kCAMediaTimingFunctionEaseInEaseOut];
    animation.delegate = self;// 也可以将动画设置工作交给代理对象
    
    //4. 添加动画
    [self.layer addAnimation:animation forKey:nil];
}

#pragma mark - 组动画
// 组动画
- (void)animationGroup
{
    // 1. 创建组动画对象
    // CAAnimationGroup *animationGroup = [CAAnimationGroup animation];
    
    // 2. 创建多个动画，添加到组动画（数组）中
    // animationGroup.animations = @[];
    
    // 3. 添加动画
    // [self.layer addAnimation:animationGroup forKey:nil];
}
@end
```

### 2.15.3	转场动画
>**说明：**本课时讲解核心动画的两个子类即`转场动画`和`组动画`，并介绍了转场动画的私有 API ，全面理解 `CAAnimation`。
>![Alt text|200x200](http://cdn.mengqingshen.com/img/JK_IOS_S2_animation.gif)

*ViewController.m*

```objective-c
...

#pragma mark - 转场动画
- (IBAction)exchangeView {
    // 1. 创建转场动画对象
    CATransition *animation = [CATransition animation];
    
    // 2. 设置转场动画
    animation.duration = 1;
    animation.timingFunction = [CAMediaTimingFunction functionWithName:kCAMediaTimingFunctionEaseInEaseOut];
    animation.type = @"pageCurl";// 翻页效果：私有API的动画类型
    animation.subtype = kCATransitionFromRight;// 翻页方向
    
    // 3. 实施动画
    [_animView exchangeSubviewAtIndex:0 withSubviewAtIndex:1];
    [_animView.layer addAnimation:animation forKey:@"myAnimation"];
    
}

- (IBAction)pushAction {
    // 1. 创建转场动画对象
    CATransition *animation = [CATransition animation];
    
    // 2. 设置转场动画
    animation.duration = 1;
    animation.timingFunction = [CAMediaTimingFunction functionWithName:kCAMediaTimingFunctionEaseInEaseOut];
    animation.type = @"cube";// 立体翻转
    
    // 3. 将动画添加到导航控制器视图图层
    [self.navigationController.view.layer addAnimation:animation forKey:@"navAnimation"];
    // 4. 实施动画
    DetailViewController *detailVC = [[DetailViewController alloc] init];// 创建要导航到的视图控制器
    [self.navigationController showViewController:detailVC sender:nil];// 导航到目标视图控制器
}

...
```

### 2.15.4	实例动画按钮布局
>**说明：**本课时讲解转盘动画实例，进行效果展示并完成 `UI` 布局，介绍了裁剪图片的新方法。
>1. 导入资源
>2. 创建轮盘类（`WheelView`，继承`UIView`）
>3. 创建轮盘类对应的`xib`文件

>**要点：** 使用`CGImageCreateWithImageInRect`裁剪图片


### 2.15.5	CADisplayLink实现动画效果
>**说明：**本课时讲解通过 `CADisplayLink` 实现动画效果，完善实例动画功能，复习了 `CABasicAnimation` 的属性和方法。

>**要点：**使用`CADisplayLink`通过刷新实现动画，
>**注意：**这里没有使用核心动画，因为它们在动画过程中响应点击的位置并没有真的发生变化。`CADisplayLink`就可以做到。
>![Alt text](http://cdn.mengqingshen.com/img/JK_IOS_S2_wheel.gif)
