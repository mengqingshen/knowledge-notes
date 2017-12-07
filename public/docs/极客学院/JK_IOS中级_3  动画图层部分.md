---
title: 3 动画图层部分
categories:
  - 极客学院_ios中级
toc: true
---


## 3.1	设计复杂的iOS动画效果

### 3.1.1	制定统一的动画接口
>**说明：**制定统一的动画接口有如下优点
>+ 便于实现后续复杂的动画组合
>+ 对于后续的代码维护极为方便
>+ 需要优先考虑里氏代换原则

### 3.1.2	动画中的高内聚低耦合原理
>**说明：**将视图的动画效果的实现和视图本身封装到另一个`UIView`中。
>**技巧：**
>+ 不要把实现动画的细节暴露在外
>+ 设计动画类尽力那个要符合`单一职能原则`，以便后续方便组合成复杂的动画效果

>**单一职能原则：**如果一个类承担的只能过多，就等于把这些功能耦合在一起，一个职能的变化可能会削弱或者抑制其他职能的能力，这种耦合会导致脆弱的设计，当发生变化时，设计会遭到意想不到的破坏。如果想要避免这种现象发生，就要尽可能的遵守`单一职能原则`。

*LineView.h*

```objective-c
#import <UIKit/UIKit.h>

@(中级ios开发工程师)interface LineView : UIView

@property (nonatomic) CGFloat  offsetX;

// 显示动画
- (void)show;

// 隐藏动画
- (void)hide;

@end
```
*LineView.m*

```objective-c
#import "LineView.h"

@interface LineView ()
@property (nonatomic) CGRect rect;
@end

@implementation LineView

- (instancetype)initWithFrame:(CGRect)frame {
    if (self = [super initWithFrame:frame]) {
        self.rect = frame;
    }
    return self;
}

- (void)show {
    
    CGRect newRect = CGRectMake(self.rect.origin.x + self.offsetX,
                                self.rect.origin.y,
                                self.rect.size.width,
                                self.rect.size.height);
    
    [UIView animateWithDuration:1 animations:^{
        self.frame = newRect;
    }];
}

- (void)hide {
    CGRect newRect = CGRectMake(self.rect.origin.x + self.offsetX + self.offsetX,
                                self.rect.origin.y,
                                self.rect.size.width,
                                self.rect.size.height);
    
    [UIView animateWithDuration:1 animations:^{
        self.frame = newRect;
        self.alpha = 0.f;
    }];
}

@end
```
*viewcntroller.m*

```objective-c
#import "ViewController.h"
#import "LineUIView.h"
@interface ViewController ()
@property (nonatomic, strong) LineUIView *lineUIView;
@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    [self testLineAnimate];
    
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/**
 *  使用封装在LineUIView中的动画效果
 */
- (void)testLineAnimate
{
    // 创建封装着动画效果的视图实例
    self.lineUIView = [[LineUIView alloc] initWithFrame:CGRectMake(10, 200, 100, 3)];
    // 设置初始状态
    self.lineUIView.offsetX = 50.f;
    self.lineUIView.backgroundColor = [UIColor blackColor];
    // 添加到当前视图中
    [self.view addSubview:self.lineUIView];
    // 展现带有动画的视图（展现带有动画）
    [self.lineUIView show];
    // 3秒中后隐藏视图（带消失有动画）
    [self performSelector:@selector(excuteAfterDelay) withObject:nil afterDelay:3];
}

- (void)excuteAfterDelay
{
    [self.lineUIView hide];
}
@end
```

### 3.1.3	设计动画函数的注意事项
+ 动画方法的命名统一：封装在不同的`view`的同类动画方法命名要一致
+ 预留非动画情形的设计：避免`TableView`或者其它存在重用问题的场景下的性能问题
+ 用百分比来表示动画的执行程度
+ 懒加载的使用

#### 案例
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/JK_IOS_S3_anime.gif)

*LineUIView.h*

```objective-c
#import <UIKit/UIKit.h>

@interface LineUIView : UIView

@property (nonatomic) CGFloat offSetX;// 对应动画进度的偏移量
// 显示动画
- (void)showWithDuration:(CGFloat)duration animated:(BOOL)animated;

// 隐藏动画
- (void)hideWithDuration:(CGFloat)duration animated:(BOOL)animated;

// 创建view（懒加载方式）
- (void)buildView;

// 动画百分比（动画进行程度）
- (void)percent:(CGFloat)percent;

@end
```
*LineUIView.m*

```objective-c
#import "LineUIView.h"

@interface LineUIView ()
@property (nonatomic) CGRect startRect;// 开始区域
@property (nonatomic) CGRect midRect;// 动画进行到中间时的区域
@property (nonatomic) CGRect endRect;// 结束区域
@end

@implementation LineUIView
// 构造函数
- (instancetype)initWithFrame:(CGRect)frame {
    if (self = [super initWithFrame:frame]) {
        self.alpha = 0.f;// 视图创建时是不可见的
    }
    return self;
}

/**
 *  显示视图
 *  预留了非动画情形
 *
 *  @param duration 持续时长
 *  @param animated 是否展现动画
 */
- (void)showWithDuration:(CGFloat)duration animated:(BOOL)animated
{
    if (animated == YES) {
        [UIView animateWithDuration:duration animations:^{
            self.frame = self.midRect;
            self.alpha = 1.f;
        }];
    }
    else {
        self.frame = self.midRect;
        self.alpha = 1.f;
    }
}

/**
 *  隐藏视图
 *  预留了非动画情形
 *
 *  @param duration 持续时长
 *  @param animated 是否展现动画
 */
- (void)hideWithDuration:(CGFloat)duration animated:(BOOL)animated
{
    if (animated == YES) {
        [UIView animateWithDuration:duration animations:^{
            self.frame = self.endRect;
            self.alpha = 0.f;
        } completion:^(BOOL finished){
            // 视图隐藏后将视图复原到初始位置
            self.frame = self.startRect;
            self.alpha = 0.f;
        }];
    }
    else {
        self.frame = self.startRect;
        self.alpha = 0.f;
    }
}

/**
 *  创建view（懒加载方式）
 */
- (void)buildView
{
    self.startRect = self.frame;
    self.midRect = CGRectMake(self.startRect.origin.x + self.offSetX,
                              self.startRect.origin.y,
                              self.startRect.size.width,
                              self.startRect.size.height);
    self.endRect = CGRectMake(self.startRect.origin.x + self.offSetX * 2,
                              self.startRect.origin.y,
                              self.startRect.size.width,
                              self.startRect.size.height);
}

/**
 *  动画百分比（动画进行程度）
 *
 *  @param percent 动画进度
 */
- (void)percent:(CGFloat)percent
{
    CGFloat tmpOffsetX = 0;
    if (percent <= 0) {
        tmpOffsetX = 0;
    }
    else if (percent >= 1) {
        tmpOffsetX = self.offSetX;
    }
    else {
        tmpOffsetX = percent * self.offSetX;
    }
    self.frame = CGRectMake(self.startRect.origin.x + tmpOffsetX,
                            self.startRect.origin.y,
                            self.startRect.size.width,
                            self.startRect.size.height);
}

@end
```
*ViewController.m*

```objective-c
#import "ViewController.h"
#import "LineUIView.h"

@interface ViewController ()
@property (nonatomic, strong) LineUIView *lineView;
@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // 创建动画视图
    self.lineView = [[LineUIView alloc] initWithFrame:CGRectMake(10, 100, 100, 3)];
    // 设置动画视图
    self.lineView.backgroundColor = [UIColor redColor];
    self.lineView.offSetX = self.view.frame.size.width / 2;
    [self.lineView buildView];// 初始化视图成员
    
    // 将动画视图添加到当前视图
    [self.view addSubview:self.lineView];
    // 显示
    [self delayShow];
    // 隐藏
    [self delayHide];
}

- (void)delayShow
{
    [self.lineView showWithDuration:3.f animated:YES];
}

- (void)delayHide
{
    [self.lineView hideWithDuration:3.f animated:YES];
}

@end
```

### 3.1.4	用里氏代换原则来处理动画类的继承问题
>**说明：**其实就是利用对象的`多态性`，父类变量动态调用子类对象的方法。
>**要点：**
>+ 里氏代换原则的基本原理
>+ 设计中要确保父类可以直接调用子类的方法
>+ 将父类设计成虚类（需要时，父类也可以提供实现）

#### 3.1.4.1	父类
*SuperUIView.h*

```objective-c`
#import <UIKit/UIKit.h>

@interface SuperUIView : UIView

- (void)show;
- (void)hide;

@end
```
*SuperUIView.m*

```objective-c
#import "SuperUIView.h"

@implementation SuperUIView

- (void)show
{
    NSLog(@"SuperUIView show");
}

- (void)hide
{
    NSLog(@"SuperUIView hide");
}
@end
```

#### 3.1.4.2	子类
>**说明：**在子类中重写集成来的`show`的`hide`方法。

*SubUIView1.m*

```objective-c
#import "SubUIView1.h"

@implementation SubUIView1

/**
 *  @override
 */
- (void)show {
    NSLog(@"SubUIView1 show");
}

/**
 *  @override
 */
- (void)hide {
    NSLog(@"SubUIView1 hide");
}

@end
```
*SubUIView2.m*

```objective-c
#import "SubUIView2.h"

@implementation SubUIView2

/**
 *  @override
 */
- (void)show {
    NSLog(@"SubUIView2 show");
}

/**
 *  @override
 */
- (void)hide {
    NSLog(@"SubUIView2 hide");
}


@end
```

#### 3.1.4.3	演示
*ViewController.m*

```objective-c
// 演示类的多态性
SuperUIView *tmpView = [[SubUIView1 alloc]init];
[tmpView show];
[tmpView hide];

tmpView = [[SubUIView2 alloc] init];
[tmpView show];
[tmpView hide];
```

### 3.1.5	动画中的模块化设计
>**说明：**模块化设计在开发中非常重要，拆分成小颗粒的模块非常便于代码的维护
>**要点：**
+ 动画效果实现难度的判断
+ 将看到的动画效果查分成小模块
+ 将写好的小模块组合成你所需要的动画效果


#### 3.1.5.1	子模块
*LineUIView.h、CircleUIView.h、RectUIView.h*

```objective-c
...
- (void)show;
- (void)hide;
- (void)buildView;
...
```
*LineUIView.m、CircleUIView.m、RectUIView.m*

```objective-c
...
- (void)show {}
- (void)hide {}
- (void)buildView {}
...
```

#### 3.1.5.2	组合使用
*BaseAnimationView.h*

```objective-c
#import <UIKit/UIKit.h>

@interface BaseAnimationView : UIView

- (void)show;
- (void)hide;
- (void)buildView;

@end
```
*BaseAnimationView.m*

```objective-c
#import "BaseAnimationView.h"
#import "CircleUIView.h"
#import "LineUIView.h"
#import "RectUIView.h"

@interface BaseAnimationView ()

@property (nonatomic, strong) CircleUIView *circleView;
@property (nonatomic, strong) LineUIView *lineView;

@end

@implementation BaseAnimationView

- (void)show {
    [self.circleView show];
    [self.lineView show];
}
- (void)hide {
    [self.circleView hide];
    [self.lineView hide];
}
- (void)buildView {
    self.circleView = [[CircleUIView alloc] initWithFrame:CGRectZero];
    [self addSubview: self.circleView];
    
    self.lineView = [[LineUIView alloc] initWithFrame:CGRectZero];
    [self addSubview: self.lineView];
}

@end
```

## 3.2	iOS模糊效果的使用
>**背景：**在项目开发中，使用模糊效果或许是很多开发者并不愿意接触的东西，因为大部分都是从开源代码里获取到的代码片段，并不一定理解别人的设计思路，此时要最大程度的修改来符合自己的项目需求并不容易。本课程我将会带领大家来定制出自己需要的模糊效果，理解设计的原理，并根据不同的需求设计出符合我们期望的效果。
>**要点：**
1. CoreImage 中的模糊滤镜
2. UIImage+ImageEffects 的 category 模糊效果
3. iOS8 中 UIVisualEffectView 模糊效果的使用
4. 设计下载图片后自动模糊的控件

### 3.2.1	CoreImage中的模糊滤镜
>**要点：**
>+ `CoreImage`是苹果用来简化图片处理的框架
>+ `CIImage`、`CIFilter`与`CIContext`三者之间的联系
>+ `CIGaussianBlur`中可以设置的参数
![Alt text|200x400](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-04-04%20%E4%B8%8B%E5%8D%881.08.34.png)

```objective-c
 // 1. 原始图片
UIImage *image = [UIImage imageNamed:@"sourceImage"];

// 2. coreImage部分
/*------- coreImage 部分 ------*/

// CIImage - 将 UIImage 包装为 CIImage 才可以用于滤镜
CIImage *ciImage = [[CIImage alloc]initWithImage:image];

// CIFilter － 滤镜
CIFilter *blurFilter = [CIFilter filterWithName:@"CIGaussianBlur"];

// 查看滤镜可以设置的参数以及一些相关的信息
NSLog(@"%@", [blurFilter attributes]);

// 将图片输入到滤镜中
[blurFilter setValue:ciImage forKey:kCIInputImageKey];//  KVC方式

// 设置模糊程度(0-100)
[blurFilter setValue:@(3) forKey:@"inputRadius"];

// 将处理好的图片输出为 CIImage
CIImage *outCiImage = [blurFilter valueForKey:kCIOutputImageKey];

// CIContext
CIContext *context = [CIContext contextWithOptions:nil];

// 获取 CGImage 句柄
CGImageRef outCGImage = [context createCGImage:outCiImage fromRect:[outCiImage extent]];

// 最终获取的图片
UIImage *blurImage = [UIImage imageWithCGImage:outCGImage];

// 释放 CGImage 句柄
CGImageRelease(outCGImage);
/*-----------------------------*/

// 3. 初始化UIImageView
UIImageView *imageView = [[UIImageView alloc] initWithFrame:CGRectMake(0, 0, 590 / 2.f, 988 / 2.f)];
imageView.image = blurImage;
imageView.center = self.view.center;

// 4. 添加到当前视图
[self.view addSubview:imageView];
```

### 3.2.2	UIImage + ImageEffects的category模糊效果
>**说明：**苹果官方提供了一段无论是性能还是效果都更优的实现图片模糊效果的代码。在此基础上封装的库在以下地址可以拿到
>[https://github.com/YouXianMing/UIImageBlur](https://github.com/YouXianMing/UIImageBlur)
+ 性能更好
+ 可以局部模糊
+ 更加易用
![Alt text|200x350](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-04-04%20%E4%B8%8B%E5%8D%8810.02.55.png)

```objective-c
#import "ViewController.h"
#import "UIImage+ImageEffects.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    // 原始图片
    UIImage *sourceImage = [UIImage imageNamed:@"normal"];
    
    // 对图片进行模糊
    UIImage *blurImage = [sourceImage blurImageAtFrame:CGRectMake(0, 100, sourceImage.size.width, sourceImage.size.height / 2.f)];
    
    // 加载图片
    UIImageView *imageView = [[UIImageView alloc] initWithImage:blurImage];
    imageView.frame = CGRectMake(0, 0, self.view.frame.size.width, self.view.frame.size.height);
    
    // 添加到当前视图
    [self.view addSubview:imageView];
}

@end
```

### 3.2.3	iOS8种UIVisualEffectView模糊效果的使用
>**说明：**`UIVisyalEffectView`的模糊效果是即时渲染的，效率非常高
>**注意：**在`UIVisualEffectView`之上的文本显示需要特殊处理
>**兼容性：**`iOS8+`
>**案例：**![Alt text|100x100](http://o6ul1xz4z.bkt.clouddn.com/img/JK_IOS_S3_effective.gif)

```objective-c
/*--- 1. 环境 ----*/
// 1.1 图片
UIImageView *imageView = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"normal"]];

// 1.2 展示视图（UIScrollView）：用以显示动态模糊
self.scrollView = [[UIScrollView alloc] initWithFrame:self.view.bounds];
self.scrollView.contentSize = imageView.image.size;// 展现视图和图片大小一致
self.scrollView.bounces = NO;// 无边缘反弹效果

// 1.3 将图片添加到展示视图
[self.scrollView addSubview:imageView];
// 1.4 将展示视图添加到当前视图
[self.view addSubview:self.scrollView];

/*--- 2. 添加模糊视图 ---*/
// 2.1 创建模糊 view
UIVisualEffectView *effecView = [[UIVisualEffectView alloc] initWithEffect:[UIBlurEffect effectWithStyle:UIBlurEffectStyleLight]];
// 2.2 设置尺寸（动态模糊区域）
effecView.frame = CGRectMake(0, 100, self.view.bounds.size.width, 200);
// 2.3 添加到 view
[self.view addSubview:effecView];
/*------ 3. 子模糊视图（文本） ------*/
// 3.1  添加显示文本
UILabel *label = [[UILabel alloc] initWithFrame:effecView.bounds];
label.text = @"时代精神";
label.textColor = [UIColor blackColor];
label.font = [UIFont systemFontOfSize:50.f];
label.textAlignment = NSTextAlignmentCenter;
// 3.2  创建子模糊 view
UIVisualEffectView *subEffectView = [[UIVisualEffectView alloc] initWithEffect:[UIVibrancyEffect effectForBlurEffect:(UIBlurEffect *)effecView.effect]];
// 3.3  尺寸
subEffectView.frame = effecView.bounds;

// 3.4  将子模糊view添加到effectView的contentView才能够生效
[effecView.contentView addSubview:subEffectView];

// 3.5  添加文本（此时文本会个模糊视图融合得比较好）
[subEffectView.contentView addSubview:label];
```

### 3.2.4	设计下载图片后自动模糊的控件
>**说明：**将下载下来的图片自动模糊的控件。
>**要点：**
>+ KVO监听下载完成后的事件
>+ 在子线程中进行渲染，主线程中进行图片的下载 （提升性能）

>**GDC：**https://github.com/YouXianMing/GCD-Program


#### 3.2.4.1	控件实现
>**依赖:**`GDC`和`UIImage+ImageEffects`

*BlurDownloadPicView.h*

```objective-c
#import <UIKit/UIKit.h>

@interface BlurDownloadPicView : UIView

@property (nonatomic, strong) NSString *pictureUrlString;// 图片下载地址
@property (nonatomic) UIViewContentMode contentMode;// 图片显示的方式

// 开始执行
- (void)startProgress;
@end
```
*BlurDownloadPicView.m*

```objective-c
#import "BlurDownloadPicView.h"
#import "GCD.h"
#import "UIImage+ImageEffects.h"

@interface BlurDownloadPicView ()

@property (nonatomic, strong) UIImageView *imageView;

@end
@implementation BlurDownloadPicView

- (instancetype)initWithFrame:(CGRect)frame {
    if (self = [super initWithFrame:frame]) {
        // 初始化控件
        self.imageView = [[UIImageView alloc] initWithFrame:self.bounds];
        self.imageView.alpha = 0.f;
        [self addSubview:self.imageView];
    }
    return self;
}

- (void)startProgress
{
    if (self.pictureUrlString) {
        
        
        // 在子线程中执行下载图片的过程
        [GCDQueue executeInGlobalQueue:^{
            // 创建请求
            NSURLRequest *request = [NSURLRequest requestWithURL:[NSURL URLWithString:self.pictureUrlString]];
            // 获取数据(因为是同步请求，会阻塞主线程)
            NSData *data = [NSURLConnection sendSynchronousRequest:request
                                                 returningResponse:nil
                                                             error:nil];
            UIImage *image = [[UIImage alloc] initWithData:data];
            
            UIImage *blurImage = [image blurImage];
            
            [GCDQueue executeInMainQueue:^{
                // 在主线程中加载图片
                self.imageView.image = blurImage;
                // 动画效果：淡出
                [UIView animateWithDuration:1.f animations:^{
                    self.imageView.alpha = 1.f;
                }];
            }];
        }];
    }
}

@synthesize contentMode = _contentMode;
- (void)setContentMode:(UIViewContentMode)contentMode {
    _contentMode = contentMode;
    self.imageView.contentMode = contentMode;
}
- (UIViewContentMode)contentMode {
    return _contentMode;
}
@end
```

#### 3.2.4.2	使用
*ViewController.m*

```objective-c
#import "ViewController.h"
#import "BlurDownloadPicView.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    NSString *picUrlString = @"http://img.zcool.cn/community/0207a4570363fc6ac7257948ec0f00.jpg@800w_1l_2o";// 下载地址
    
    // 创建模糊视图
    BlurDownloadPicView *blurDownloadView = [[BlurDownloadPicView alloc] initWithFrame:CGRectMake(0, 0, self.view.bounds.size.width, 400)];
    blurDownloadView.center = self.view.center;
    blurDownloadView.pictureUrlString = picUrlString;
    blurDownloadView.contentMode = UIViewContentModeScaleAspectFill;
    // 添加到视图
    [self.view addSubview:blurDownloadView];
    // 下载图片 模糊图片 呈现
    [blurDownloadView startProgress];
}

@end
```

## 3.3	使用 maskView 设计动画

### 3.3.1	maskView(maskLayer)的基本原理
>**说明：**本课时主要讲解 `maskView(maskLayer)`的基本原理，并用示例演示。
![Alt text|100x200](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-04-06%20%E4%B8%8B%E5%8D%883.14.40.png)

```objective-c
CGFloat width = 120;
// 情形1. 只有底图的情形
self.baseImageView = [[UIImageView alloc] initWithFrame:CGRectMake(20, 20, width, width)];
self.baseImageView.image = [UIImage imageNamed:@"base"];

// 情形2. 只有mask（png图片）
self.maskImageView = [[UIImageView alloc] initWithFrame:CGRectMake(20, 20 + width + 20, width, width)];
self.maskImageView.image = [UIImage imageNamed:@"mask"];

// 情形3. 底图通过maskView组合mask
// 底图
self.addImageView = [[UIImageView alloc] initWithFrame:CGRectMake(20, 20 + (width + 20) * 2, width, width)];
self.addImageView.image = [UIImage imageNamed:@"base"];

// mask
UIImageView *mask = [[UIImageView alloc] initWithFrame:CGRectMake(0, 0, width, width)];
mask.image = [UIImage imageNamed:@"mask"];
// 在底图上设置maskView
self.addImageView.maskView = mask;

[self.view addSubview:self.baseImageView];
[self.view addSubview:self.maskImageView];
[self.view addSubview:self.addImageView];
```

### 3.3.2	maskView配合 CAGradientLayer的使用
>**说明：**本课时讲解如何在 maskView 中加载 `CAGradientLayer`。
>![Alt text|100x100](http://o6ul1xz4z.bkt.clouddn.com/img/JK_IOS_S3_ga.gif)

>**要点：**
+ 用`CAGradientLayer`直接产生带透明像素通道的`layer`
+ 用`maskView`直接加载带`CAGradientLayer`的`View`
+ 可以通过`CAGradientLayer`进行动画的操作实现动画效果

```objective-c
// 1. 底图
UIImageView *imageView = [[UIImageView alloc] initWithFrame:CGRectMake(0, 20, self.view.bounds.size.width, 200)];
imageView.image = [UIImage imageNamed:@"base"];
[self.view addSubview:imageView];

// 2. mask (使用 CAGradientLayer 替代 png 图片)
CAGradientLayer *gradientLayer = [CAGradientLayer layer];
gradientLayer.frame = imageView.bounds;
gradientLayer.colors = @[(__bridge id)[UIColor clearColor].CGColor,
                         (__bridge id)[UIColor blackColor].CGColor,
                         (__bridge id)[UIColor clearColor].CGColor];
gradientLayer.locations = @[@(0.25), @(0.5), @(0.75)];
gradientLayer.startPoint = CGPointMake(0, 0);
gradientLayer.endPoint = CGPointMake(1, 0);

UIView *containerView = [[UIView alloc] initWithFrame:imageView.bounds];
[containerView.layer addSublayer:gradientLayer];

// 3. set maskView
imageView.maskView = containerView;

// 给 maskView 做动画效果
[UIView animateWithDuration:3.f animations:^{
    // 新位置
    CGRect frame = containerView.frame;
    frame.origin.x += 400;
    containerView.frame = frame;
}];
```

### 3.3.3	maskView 配合带 alpha 通道图片的使用
>**说明：**本课时讲解 `maskView` 加载 `png` 图片的原理。
>+ 直接使用带`alpha`通道的`png`图片比用`CAGradientLayer`的方式更加高效
>+ 可以使用技巧在`maskView`上添加多张图片
>+ 在`maskView`中做简单的动画

![Alt text|100x100](http://o6ul1xz4z.bkt.clouddn.com/img/JK_IOS_S3_mask.gif)

```objective-c
// 遮罩图片1
UIImageView *picOne = [[UIImageView alloc] initWithFrame:CGRectMake(0, 0, 100, 400)];
picOne.image = [UIImage imageNamed:@"1"];

// 遮罩图片2
UIImageView *picTwo = [[UIImageView alloc] initWithFrame:CGRectMake(100, -200, 100, 400)];

picTwo.image = [UIImage imageNamed:@"2"];

// 原始背景图
UIImageView *backgroundView = [[UIImageView alloc] initWithFrame:CGRectMake(0, 0, 200, 200)];
backgroundView.image = [UIImage imageNamed:@"background"];
backgroundView.center = self.view.center;

// 待切换目标背景图
UIImageView *baseView = [[UIImageView alloc] initWithFrame:backgroundView.frame];
baseView.image = [UIImage imageNamed:@"base"];

// 为带切换图 set maskView
UIView *mask = [[UIImageView alloc] initWithFrame:baseView.bounds];
// 两个png图片合成新遮罩
[mask addSubview:picOne];
[mask addSubview:picTwo];
baseView.maskView = mask;


[self.view addSubview:backgroundView];
[self.view addSubview:baseView];

// 动画
[UIView animateWithDuration:2.f animations:^{
    // 偏移左半边的遮罩
    CGRect oneFrame = picOne.frame;
    oneFrame.origin.y -= 400;
    picOne.frame = oneFrame;
    
    // 偏移右半边遮罩
    CGRect twoFrame = picTwo.frame;
    twoFrame.origin.y += 400;
    picTwo.frame = twoFrame;
}];

```

### 3.3.4	设计文本横向渐变消失的控件
>**说明：**本课时将综合前面所学内容设计一个效果不错的文本渐变消失的控件，并做简易的扩展设计。
>+ 接口的设计
>+ 封装`CAGradientLayer`用以提供`mask`遮罩
>+ 动画样式的分析与设计

![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/JK_IOS_S3_text.gif)


#### 3.3.4.1	文本横向渐变消失的控件
*FadeStrinUIView.h*

```objective-c
#import <UIKit/UIKit.h>

@interface FadeStringUIView : UIView

/**
 *  显示的文本
 */
@property (nonatomic, strong) NSString *text;

/**
 *  从左到右渐变消失
 *
 *  @param duration 动画持续时间
 *  @param animated 是否显示动画
 */
- (void)fadeRightWithDuration:(CGFloat)duration animated:(BOOL)animated;
@end
```
*FadeStringUIView.m*

```objective-c
#import "FadeStringUIView.h"

@interface FadeStringUIView ()
@property (nonatomic, strong) UILabel *label;
@property (nonatomic, strong) UIView *mask;
@end

@implementation FadeStringUIView

- (instancetype)initWithFrame:(CGRect)frame {
    if (self = [super initWithFrame:frame]) {
        // 创建文本
        [self createLabel:self.bounds];
        // 创建mask
        [self createMask:self.bounds];
    }
    return  self;
}

- (void)fadeRightWithDuration:(CGFloat)duration animated:(BOOL)animated
{
    CGRect frame = self.mask.frame;
    frame.origin.x += frame.size.width;
    if (animated) {

        [UIView animateWithDuration:3.f animations:^{
            self.mask.frame = frame;
        }];
    }
    else {
        self.mask.frame = frame;
    }

}

- (void)createLabel:(CGRect)frame {
    self.label = [[UILabel alloc] initWithFrame:frame];
    self.label.font = [UIFont systemFontOfSize:20.f];
    self.label.textAlignment = NSTextAlignmentCenter;
    self.label.textColor = [UIColor whiteColor];
    [self addSubview:self.label];
}

- (void)createMask:(CGRect)frame {
    // 创建出渐变的layer
    CAGradientLayer *gradientLayer = [CAGradientLayer layer];
    gradientLayer.frame = frame;
    gradientLayer.colors = @[(__bridge id)[UIColor clearColor].CGColor,
                             (__bridge id)[UIColor blackColor].CGColor,
                             (__bridge id)[UIColor blackColor].CGColor,
                             (__bridge id)[UIColor clearColor].CGColor];
    gradientLayer.locations = @[@(0.01), @(0.1), @(0.9), @(0.99)];
    gradientLayer.startPoint = CGPointMake(0, 0);
    gradientLayer.endPoint = CGPointMake(1, 0);
    
    self.mask = [[UIView alloc] initWithFrame:frame];
    [self.mask.layer addSublayer:gradientLayer];
    self.maskView = self.mask;
}

#pragma mark - 重写 text 的set和get， 该值被修改时同时更新到 label
@synthesize text = _text;
- (void)setText:(NSString *)text {
    _text = text;
    self.label.text = text;
}
- (NSString *)text {
    return _text;
}
@end
```

#### 3.3.4.2	使用该控件
*ViewController.m*

```objective-c
#import "ViewController.h"
#import "FadeStringUIView.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.view.backgroundColor = [UIColor blackColor];
    // 创建 FadeStringUIView 实例
    FadeStringUIView *fadeString = [[FadeStringUIView alloc] initWithFrame:CGRectMake(0, 0, 300, 100)];
    fadeString.text = @"如果一个人不按照他想的方式活，那么很快就会按照他活的方式想。";
    fadeString.center = self.view.center;
    [self.view addSubview:fadeString];
    
    // 执行动画效果
    [fadeString fadeRightWithDuration:3.f animated:YES];
}

@end
```

## 3.4	使用 Facebook 开源动画库 POP 实现
>**课程说明：**`POP` 动画库是 `Facebook` 在 2014 年开源出来的一个高效的动画引擎，它与 `CoreAnimation` 的实现机制有着巨大区别，但使用方式极为相似，其动画效果逼真而优美，虽无法完全替换 `CoreAnimation`，但掌握它，将会使你的应用的交互效果惊艳而脱颖而出。
>**Github地址：**https://github.com/facebook/pop

### 3.4.1	`POP`动画引擎简介
>**课程说明：**本课时示例演示 `POP` 动画的强大之处，讲解 `CADisplayLink` 的作用，以及 `POP` 动画引擎与 `CoreAnimation` 之间的联系。
1. pop动画引擎是Facebook公司开源的
2. pop动画引擎主要实现了真实物理系的动画效果（弹簧效果与衰减效果）
3. pop动画引擎的动画效果非常流畅，因为它是用了`CADisplayLink`来刷新画面（帧）
4. pop动画引擎自成体系，与系统的`CoreAnimation`有很大的区别，但使用非常类似


#### 3.4.1.1	POP效果展示

#### 3.4.1.2	CADisplayLink
>**说明：**`POP`通过`CADisplayLink`刷新动画的（60帧/秒，同iOS系统本身的刷新频率）。

*ViewController.m*
>**说明：**演示`CADisplayLink`使用方式，在中端1秒输出60次。

```objective-c
#import "ViewController.h"

@interface ViewController ()
@property (nonatomic, strong) CADisplayLink *displayLink;
@property (nonatomic) NSInteger count;
@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    // 创建 displayLink
    self.displayLink = [CADisplayLink displayLinkWithTarget:self selector:@selector(displayLinkEvent:)];
    // 1秒钟后开始刷新
    [self performSelector:@selector(eventOne) withObject:nil afterDelay:1];
    // 2秒中后停止刷新
    [self performSelector:@selector(eventTwo) withObject:nil afterDelay:2];
}

/**
 *  每次刷新调用该方法
 *
 *  @param object 对象
 */
- (void)displayLinkEvent:(id)object
{
    self.count ++;
    NSLog(@"count = %ld", (long)self.count);
}

/**
 *  开始刷新
 */
- (void)eventOne
{
    [self.displayLink addToRunLoop:[NSRunLoop currentRunLoop] forMode:NSDefaultRunLoopMode];
}

/**
 *  停止刷新
 */
- (void)eventTwo
{
    [self.displayLink invalidate];
}
@end
```

### 3.4.2	`POP`动画引擎中`Layer`与`CALayer`的联系与区别
>**课程说明：**本课时讲解 `POP` 动画中的 Layer 与 `CALayer` 的一些共性与区别。
>**比较：**
>1. 使用`POP`动画与使用`CALayer`动画非常相似
>2. `POP`动画的执行没有中间状态：相比POP动画，`CALayer`动画有中间状态：实际动画角色是立即到达结束时的位置的，中间状态指的是是“虚拟”的动画
>![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-04-07%2018.44.12.png)

>3. `POP`动画是对`CALayer`动画的扩充，但不能实现所有的`CALayer`的动画效果
>4. `POP`动画可以作用在任何对象上，不仅仅是`CALayer`

>**其它参考：**
>+ http://www.cocoachina.com/industry/20140527/8565.html

>**实例：**
>1. 导入`POP`框架(https://github.com/facebook/pop)
>>**方式1：**使用[cocoapods](http://www.jianshu.com/p/071d30a3af02)安装
>>**方式2：**直接导入源码（可以配合`pch`文件）
>>教程：http://www.jianshu.com/p/67ce72c4ad6c
>>![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-04-07%2018.53.54.png)
>>**方式3：**二进制文件`.framework`


#### 3.4.2.1	导入`POP`框架
>**说明：**使用`CocoaPods`
>**可能的出错：**http://www.tuicool.com/articles/InIBbaf
>**注意：**安装好依赖后，需要从`项目名.xcworkspace`重启项目。

```bash
$ pod search pop# 搜索版本号
$ cd /Users/tonyearth/Documents/My Study/Animation/L04POP动画引擎中Layer与CALayer的联系与区别 #到项目目录下
$ pod init# 初始化环境
$ vim Podfile# 依赖配置
	platform :ios, '7.0'
	pod 'pop', '~> 1.0'
$ pod install# 安装依赖
```

#### 3.4.2.1	比较CALayer和POP CAlayer
![Alt text|150x200](http://o6ul1xz4z.bkt.clouddn.com/img/JK_IOS_S3_pop.gif)

*ViewController.m*

```objective-c
#import "ViewController.h"
#import <POP.h>

@interface ViewController ()
@property (nonatomic, strong) CALayer *normalCALayer;
@property (nonatomic, strong) CALayer *popCALayer;
@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    // 处理 normalCALayer
    [self accessNormalCALayer];
    // 处理 POP 动画
    [self accessPOPCALayer];
}

#pragma mark - pop CALayer 动画
/**
 *  pop CALyer 动画
 */
- (void)accessPOPCALayer{
    // 初始化 layer
    self.popCALayer = [CALayer layer];
    self.popCALayer.frame = CGRectMake(100, 100, 100, 100);
    self.popCALayer.backgroundColor = [UIColor redColor].CGColor;
    [self.view.layer addSublayer:self.popCALayer];
    
    // 初始化 POP 动画
    POPBasicAnimation *popAnimation = \
    [POPBasicAnimation animationWithPropertyNamed:kPOPLayerPosition];
    popAnimation.toValue = [NSValue valueWithCGPoint:CGPointMake(100 + 50, 400)];// pop 动画不需要 fromValue
    popAnimation.duration = 4.f;
    popAnimation.timingFunction = \
    [CAMediaTimingFunction functionWithName:kCAMediaTimingFunctionLinear];
    
    // 添加动画
    [self.popCALayer pop_addAnimation:popAnimation forKey:nil];
    
    // 1.5s后移除动画：在哪儿移除就停在哪儿
    [self performSelector:@selector(removePopAnimation) withObject:nil afterDelay:1.5];
}

- (void)removePopAnimation
{
    [self.popCALayer pop_removeAllAnimations];// 移除所有 pop 动画
}

#pragma mark - CALayer 动画
/**
 *  CALyer 动画
 */
- (void)accessNormalCALayer{
    // 初始化 layer
    self.normalCALayer = [CALayer layer];
    self.normalCALayer.frame = CGRectMake(250, 100, 100, 100);
    self.normalCALayer.backgroundColor = [UIColor redColor].CGColor;
    [self.view.layer addSublayer:self.normalCALayer];
    
    // 初始化动画
    CABasicAnimation *baseAnimation = [CABasicAnimation animationWithKeyPath:@"position"];
    baseAnimation.fromValue = [NSValue valueWithCGPoint:self.normalCALayer.position];
    baseAnimation.toValue = [NSValue valueWithCGPoint:CGPointMake(250 + 50, 400)];
        baseAnimation.duration = 4.f;
    baseAnimation.timingFunction = \
    [CAMediaTimingFunction functionWithName:kCAMediaTimingFunctionLinear];
    
    // 设置结束位置的值
    self.normalCALayer.position = CGPointMake(250 + 50, 400);
    // 开始动画
    [self.normalCALayer addAnimation:baseAnimation forKey:nil];
    
    // 1.5s后移除动画：无论在哪儿停止，都会出现在最后设置的位置（非常突兀）
    [self performSelector:@selector(removeNormalAnimation) withObject:nil afterDelay:2];
}

/**
 *  移除动画
 */
- (void)removeNormalAnimation
{
    CALayer *layer = self.normalCALayer.presentationLayer;
    NSLog(@"%@", NSStringFromCGRect(layer.frame));
    NSLog(@"%@", NSStringFromCGRect(self.normalCALayer.frame));
    
    [self.normalCALayer removeAllAnimations];// 移除掉所有动画
}

@end
```


### 3.4.3	用`POP`动画引擎实现衰减动画
>**课程说明：**本课时用 `POP` 动画引擎实现移动`View` 并停止时衰减的动画效果。
>**要点：**
>1. 衰减动画由`POPDecayAnimation`来实现
>2. 需要精确计算停止运动瞬间的加速度才能用衰减动画做出真实的效果

>![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/JK_IOS_S3_decay.gif)

*ViewController.m*

```objective-c
#import "ViewController.h"
#import <POP.h>

@interface ViewController ()
@property (nonatomic, strong) UIButton *button;
@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    // 初始化button
    self.button = [[UIButton alloc] initWithFrame:CGRectMake(0, 0, 100, 100)];
    self.button.backgroundColor = [UIColor redColor];
    self.button.layer.cornerRadius = 50;
    self.button.layer.masksToBounds = YES;
    self.button.center = self.view.center;
    
    // 添加到视图
    [self.view addSubview:self.button];
    
    // 注册事件
    [self.button addTarget:self
                    action:@selector(buttonEvent:)
          forControlEvents:UIControlEventTouchUpInside];
    // 初始化手势
    UIPanGestureRecognizer *panGesture = [[UIPanGestureRecognizer alloc] initWithTarget:self action:@selector(handlePanGesture:)];
    // 添加手势
    [self.button addGestureRecognizer:panGesture];
}

/**
 *  点击按钮取消按钮
 *
 *  @param button 按钮控件
 */
- (void)buttonEvent:(UIButton *)button
{
    [button.layer pop_removeAllAnimations];
}

/**
 *  手势操作的响应函数
 *
 *  @param recognizer 事件目标控件
 */
- (void)handlePanGesture:(UIPanGestureRecognizer *)recognizer
{
    CGPoint translation = [recognizer translationInView:self.view];
    recognizer.view.center = CGPointMake(recognizer.view.center.x + translation.x,
                                         recognizer.view.center.y + translation.y);
    [recognizer setTranslation:CGPointMake(0, 0) inView:self.view];
    
    // 拖动停止
    if (recognizer.state == UIGestureRecognizerStateEnded) {
        //1. 创建动画
        // 获取加速度
        CGPoint velocity = [recognizer velocityInView:self.view];
        
        // 初始化POP的decay(衰减)动画
        POPDecayAnimation *decayAnimation = \
            [POPDecayAnimation animationWithPropertyNamed:kPOPLayerPosition];
        // 设置加速度
        decayAnimation.velocity = [NSValue valueWithCGPoint:velocity];
        
        //2. 执行动画
        [recognizer.view.layer pop_addAnimation:decayAnimation forKey:nil];
    }
}
@end
```

### 3.4.4	用`POP`动画引擎实现弹簧动画
>**课程说明：**本课时用 `POP` 动画引擎实现 View 的放大缩小等的弹簧效果。
>**扩展：**`Shimmer`
>**要点：**
>1. 弹簧动画由`POPSpringAnimation`
>2. 弹簧的质量、速度、时间等值都是可以设置的
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/JK_IOS_S3_spring.gif)

```objective-c
#import "ViewController.h"
#import <POP.h>

@interface ViewController ()
@property (nonatomic, strong) UIView *showView;
@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    // 设置背景色
    self.view.backgroundColor = [UIColor blackColor];
    
    // 初始化view
    self.showView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, 50, 50)];
    self.showView.backgroundColor = [UIColor cyanColor];
    self.showView.center = self.view.center;
    [self.view addSubview:self.showView];
    
    // 延时3秒执行动画
    [self performSelector:@selector(startSpringAnimation)
               withObject:nil
               afterDelay:3.f];
}

/**
 *  示例弹簧动画
 */
- (void)startSpringAnimation
{
    // 初始化spring动画
    POPSpringAnimation *sizeAnimation = \
    [POPSpringAnimation animationWithPropertyNamed:kPOPLayerBounds];// 缩放型动画
    sizeAnimation.springSpeed = 0.f;
    sizeAnimation.toValue = [NSValue valueWithCGRect:CGRectMake(0, 0, 200, 200)];
    
    // 添加动画
    [self.showView pop_addAnimation:sizeAnimation forKey:nil];

}
@end
```

## 3.5	用缓动函数模拟物理动画

### 3.5.1	缓动函数简介
>**课程说明：**本课时将演示缓动函数能做出来的效果，然后讲解它的基本原理。
>1. 缓动函数的动画效果是建立在`CALayer`层级的关键帧动画基础之上
>2. 缓动函数是一系列模拟物理效果（如抛物线）方程式的统称，用以计算给定亮点之间的插值
>3. 两点之间插的值越多，效果越好，但是会耗费更多的性能
>4. 只有理解了缓动函数的原理才有可能写出自己想要的效果

>**缓动函数源码：**https://github.com/YouXianMing/EasingAnimation


#### 3.5.1.1	缓动函数类型
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-04-09%20%E4%B8%8B%E5%8D%8810.52.45.png)

#### 3.5.1.2	缓动效果示例
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/JK_IOS_S3_easing.gif)


### 3.5.2	缓动函数与关键帧动画的联系
>**课程说明：**本课时将讲解关键帧动画的原理，并分析关键帧动画与缓动函数之间的联系。
>1. 关键帧动画需要提供很多的帧来完善动画效果
>2. 关键帧动画的帧可以通过一定的数学计算来提供需要的帧数
>3. `关键帧动画只需要提供起始点、结束点，就可以通过缓动函数来计算中间“缺失”的帧`
>![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-04-10%20%E4%B8%8B%E5%8D%8812.00.12.png)
>4. 缓动函数可以指定计算出多少帧
>5. 帧数越多，动画越流畅，但同时耗费更多GPU性能

>**注意：**
>+ 缓动动画只是缓动函数在关键帧动画中的一种应用
>+ 当只插值只有起点和终点时，关键帧动画和基本动画效果一致

```objective-c
#import "ViewController.h"
#import "YXEasing.h"

@interface ViewController ()
@property (nonatomic, strong) UIView *showView;
@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    
    // 初始化显示用的view
    self.showView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, 100, 100)];
    self.showView.layer.cornerRadius = 50;
    self.showView.layer.masksToBounds = YES;
    self.showView.backgroundColor = [UIColor redColor];

    // 添加到当前视图中
    [self.view addSubview:self.showView];
    
    // 基本动画
    // [self baseAnimation];
    
    // 关键帧动画
    [self keyFrameAnimation];
}

/**
 *  基本动画
 */
- (void)baseAnimation
{
    CABasicAnimation *basicAnimation = [CABasicAnimation animation];
    basicAnimation.keyPath = @"position";
    basicAnimation.duration = 2.f;
    // fromValue = A, toValue = B
    basicAnimation.fromValue = [NSValue valueWithCGPoint:self.showView.center];
    basicAnimation.toValue = [NSValue valueWithCGPoint:CGPointMake(300, 200)];

    self.showView.center = CGPointMake(300, 200);// 真正目标位置
    [self.showView.layer addAnimation:basicAnimation forKey:nil];
}

/**
 *  关键帧动画
 */
- (void)keyFrameAnimation
{
    // 1. 创建关键帧动画
    CAKeyframeAnimation *keyFrameAnimation = [CAKeyframeAnimation animation];
    keyFrameAnimation.keyPath = @"position";
    keyFrameAnimation.duration = 1.f;
    // 插值（通过缓动函数创建一些列插值点）
    keyFrameAnimation.values = [YXEasing calculateFrameFromPoint:self.showView.center// 起点
                                                         toPoint:CGPointMake(300, 200)//终点
                                                            func:BounceEaseIn// 动画进度
                                                      frameCount:60 * 2];// 帧数
    // 2. 实际目标位置
    self.showView.center = CGPointMake(300, 200);// 真正目标位置

    // 3. 添加动画到视图
    [self.showView.layer addAnimation:keyFrameAnimation forKey:nil];
}

@end
```

### 3.5.3	用缓动函数模拟弹簧效果
>**课程说明：**本课时用缓动函数结合关键帧动画实现弹簧效果，并模拟秒表摆动效果。
>![Alt text|100x90](http://o6ul1xz4z.bkt.clouddn.com/img/JK_IOS_S3_time.gif)

```objective-c
#import "ViewController.h"
#import "YXEasing.h"

@interface ViewController ()
@property (nonatomic, strong) CALayer *secLayer;// 秒针
@property (nonatomic, strong) NSTimer *timer;// 定时器
@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    // 创建一个表盘 UIView
    UIView *showView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, 300, 300)];
    showView.center = self.view.center;
    showView.layer.borderWidth = 1.f;
    showView.layer.cornerRadius = 150;
    showView.layer.borderColor = [UIColor redColor].CGColor;
    [self.view addSubview:showView];
    
    // 创建出秒针 CALayer
    self.secLayer = [CALayer layer];
    self.secLayer.anchorPoint = CGPointMake(0, 0);
    self.secLayer.frame = CGRectMake(150, 150, 1, 150);
    self.secLayer.backgroundColor = [UIColor blackColor].CGColor;
    [showView.layer addSublayer:self.secLayer];
    
    // 创建定时器
    self.timer = [NSTimer scheduledTimerWithTimeInterval:1.f// 1秒钟调用一次
                                                  target:self// 目标控制器
                                                selector:@selector(timerEvent) // 目标方法
                                                userInfo:nil
                                                 repeats:YES];
}

/**
 *  指针变化动画
 */
- (void)timerEvent
{
    static int i = 1;// 时间点
    CGFloat oldValue = DEGREES_TO_RADIANS((360 / 60.f) * i++);// 旧弧度
    CGFloat newValue = DEGREES_TO_RADIANS((360 / 60.f) * i);// 新弧度
    
    // 创建关键帧动画
    CAKeyframeAnimation *keyFrameAnimation = [CAKeyframeAnimation animation];
    keyFrameAnimation.keyPath = @"transform.rotation.z";
    keyFrameAnimation.duration = 0.5;
    keyFrameAnimation.values = [YXEasing calculateFrameFromValue:oldValue// 起始弧度
                                                         toValue:newValue// 结束弧度
                                                            func:ElasticEaseOut // 动画效果
                                                      frameCount:0.5 * 30];// 帧数
    self.secLayer.transform = CATransform3DMakeRotation(newValue,
                                                        0,
                                                        0,
                                                        1);
    [self.secLayer addAnimation:keyFrameAnimation forKey:nil];
}
@end
```

### 3.5.4	用缓动函数模拟碰撞效果
>**课程说明：**本课时用缓动函数实现碰撞动画效果，并分析用途。
>1. 使用`easeOutBounce`函数来创建碰撞效果
>2. 将`easeOutBounce`创建出来的帧数组添加到关键帧动画中
>3. 碰撞效果用途

>![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/JK_IOS_S3_bounce.gif)

```objective-c
#import "ViewController.h"
#import "YXEasing.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
 
    // 创建图 view
    UIImageView *imageView = [[UIImageView alloc] initWithFrame:CGRectMake(0, 0, 320, 100)];
    imageView.image = [UIImage imageNamed:@"pic"];
    imageView.contentMode = UIViewContentModeScaleAspectFill;
    [self.view addSubview:imageView];
    
    // 创建关键帧动画（移动距离的动画）
    CAKeyframeAnimation *keyFrameAnimation = [CAKeyframeAnimation animation];
    keyFrameAnimation.keyPath = @"position";
    keyFrameAnimation.duration = 2.f;
    keyFrameAnimation.values = \
        [YXEasing calculateFrameFromPoint:imageView.center
                                  toPoint:CGPointMake(320 / 2.f, 320 / 2.f + 240)
                                     func:BounceEaseOut// 碰撞动画
                               frameCount:2 * 30];
    
    // 添加动画
    imageView.center = CGPointMake(320 / 2.f, 320 / 2.f + 240);
    [imageView.layer addAnimation:keyFrameAnimation
                           forKey:nil];
}

@end
```

### 3.5.5	用缓动函数模拟衰减效果
>**课程说明：**本课时用缓动函数实现衰减动画效果，并分析用途。
>1. 使用`easeOutCubic`函数来创建弹簧效果
>2. 将`easeOutCubic`创建出来的的帧数组添加到关键帧动画中
>3. 衰减效果用途

![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/JK_IOS_S3_cubic.gif)

```objective-c
#import "ViewController.h"
#import "YXEasing.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
 
    // 动画1:背景变暗
    UIView  *backView = [[UIView alloc] initWithFrame:self.view.bounds];
    backView.backgroundColor = [UIColor blackColor];
    [UIView animateWithDuration:1.f animations:^{
        backView.alpha = 0.3;
    }];
    [self.view addSubview:backView];
    
    // 动画2:衰减滑出
    // 创建图片
    UIImageView *imageView = [[UIImageView alloc] initWithFrame:CGRectMake(320, 0, 320, 568)];
    imageView.image = [UIImage imageNamed:@"pic"];
    [self.view addSubview:imageView];
    
    // 创建关键帧动画
    CAKeyframeAnimation *keyFrameAnimation = [CAKeyframeAnimation animation];
    keyFrameAnimation.keyPath = @"position";
    keyFrameAnimation.duration = 1.f;
    keyFrameAnimation.values = \
        [YXEasing calculateFrameFromPoint:imageView.center
                                  toPoint:CGPointMake(self.view.center.x + 100, self.view.center.y)
                                     func:CubicEaseOut
                               frameCount:1 * 30];
    // 添加动画
    imageView.center = CGPointMake(self.view.center.x + 100, self.view.center.y);
    [imageView.layer addAnimation:keyFrameAnimation forKey:nil];
}

@end
```

## 3.6	使用带粒子效果的 CAEmitterLayer

### 3.6.1	用 CAEmitterLayer 产生粒子效果
>**课程说明：**本课时讲解 `CAEmitterLayer` 的一些基本属性，以及基本的用法。
>+ `CAEmitterLayer`的用途：实现粒子效果
>+ `CAEmitterLayer`参数
>+ `CAEmitterLayer`优点：使用`GPU`渲染，不占用`CPU`资源，远优于使用大量的随机`View`来实现。
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/JK_IOS_S3_emitter.gif)

```objective-c
// 1. CAEmitterLayer
// 创建出粒子发射图层
CAEmitterLayer *emitterLayer = [CAEmitterLayer layer];
emitterLayer.borderWidth = 2.f;// 边框宽度（显示边框）
emitterLayer.frame = CGRectMake(100, 100, 200, 300);// 设置尺寸
emitterLayer.masksToBounds = YES;// 隐藏溢出的粒子
emitterLayer.emitterPosition = CGPointMake(50, 50);// 发射点
emitterLayer.emitterMode = kCAEmitterLayerSurface;// 发射模式
emitterLayer.emitterShape = kCAEmitterLayerLine;// 发射形状

// 添加图层到当前视图图层
[self.view.layer addSublayer:emitterLayer];

// 2. CAEmitterCell（粒子）
CAEmitterCell *cell = [CAEmitterCell emitterCell];
cell.birthRate = 10.f;// 粒子产生率
cell.lifetime = 120.f;// 粒子声明周期
cell.velocity = 30;// 加速度
cell.velocityRange = 10.f;// 加速度微调
cell.yAcceleration = 2.f;// y 轴加速度
cell.emissionRange = 0.5 * M_1_PI;// 发射角度
cell.color = [UIColor blackColor].CGColor;// 设置粒子颜色
cell.contents = (__bridge id)([UIImage imageNamed:@"snow"].CGImage);// 设置图片

// 3. 将 CAEmitterCell(粒子)关联到CAEmitterLayer
emitterLayer.emitterCells = @[cell];
```

### 3.6.2	封装 CAEmitterLayerUIVIew
>**课程说明：**本课时讲解了为了避免繁琐的设置而将 `CAEmitterLayer` 封装成一个较为通用的父类供子类使用。
>+ 替换`CAEmitterLayer`成`UIView`子类的`backedLayer`
>+ 将`CAEmitterLayer`封装的类作为“抽象“父类
>
>**说明：**封装一个父类(`CAEmitterLayerUIView`)，其它类型的粒子图层继承该类，将设置封装到子类的`show`和`hide`实现中。

*CAEmitterLayerUIView.h*

```objective-c
#import <UIKit/UIKit.h>

@interface CAEmitterLayerUIView : UIView
// set
- (void)setEmitterLayer:(CAEmitterLayer *)layer;

// get
- (CAEmitterLayer *)emitterLayer;

// 显示view
- (void)show;

// 隐藏view
- (void)hide;
@end
```
*CAEmitterLayerUIView.m*

```objective-c
#import "CAEmitterLayerUIView.h"

@interface CAEmitterLayerUIView () {
    CAEmitterLayer *_emitterLayer;// 粒子图层
}
@end

@implementation CAEmitterLayerUIView

// 构造函数
- (instancetype)initWithFrame:(CGRect)frame {
    if (self = [super initWithFrame:frame]) {
        _emitterLayer = (CAEmitterLayer *)self.layer;
    }
    return self;
}

// 获取类本身
+ (Class)layerClass
{
    return [CAEmitterLayer class];
}

// set
- (void)setEmitterLayer:(CAEmitterLayer *)layer
{
    _emitterLayer = layer;
}

// get
- (CAEmitterLayer *)emitterLayer
{
    return _emitterLayer;
}

- (void)show {}
- (void)hide {}
@end
```

### 3.6.3	封装下雪、下雨的粒子效果控件
>**课程说明：**本课时在封装 `CAEmitterLayer` 基础上进一步从“抽象”父类派生出下雪、下雨的子类控件。
>+ 从封装`CAEmitterLayer`的“抽象”父类继承的原因
>+ 下雪、下雨效果参数的设置

![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/JK_IOS_S3_rain.gif)

*ViewController.m*
>**说明：**使用控件

```objective-c
// 1. 初始化粒子效果图层
// 下雪效果图层
CAEmitterLayerView *snowView = [[SnowView alloc] initWithFrame:CGRectMake(100, 100, 100, 100)];
// 下雨效果图层
CAEmitterLayerView *rainView = [[RainView alloc] initWithFrame:CGRectMake(100, 210, 100, 100)];
[self.view addSubview:snowView];

// 2. 模糊化粒子视图边界
UIImageView *alphaView1 = [[UIImageView alloc] initWithFrame:CGRectMake(0, 0, 100, 100)];
alphaView1.image = [UIImage imageNamed:@"alpha"];
UIImageView *alphaView2 = [[UIImageView alloc] initWithFrame:CGRectMake(0, 0, 100, 100)];
alphaView2.image = [UIImage imageNamed:@"alpha"];

snowView.maskView = alphaView1;
rainView.maskView = alphaView2;

// 3. 添加到当前图层
[self.view addSubview:snowView];
[self.view addSubview:rainView];

// 4. 展现
[snowView show];
[rainView show];
```

## 3.7	iOS 中 CAGradientLaueyer 的使用

### 3.7.1	CAGradientLayer 简介
>**课程说明：**本课演示 `CAGradientLayer` 能做的一些动画效果，以及 `CAGradientLayer` 与 `CAShapeLayer` 配合使用的实例。
>1. `CAGradientLayer`是用于处理渐变色的层结构
>2. `CAGradientLayer`的渐变色可以做隐式动画
>3. 大部分情况下，`CAGradientLayer`都是与`CAShapeLayer`配合使用的
>4. `CAGradientLayer`可以用作`png`遮罩效果

![Alt text|100x100](http://o6ul1xz4z.bkt.clouddn.com/img/JK_IOS_S3_exam1.gif) `CAShapeLayer`作为`CAGradientLayer`的遮罩实现的效果

![Alt text|100x100](http://o6ul1xz4z.bkt.clouddn.com/img/JK_IOS_S3_exam2.gif)旋转`CAGradientLayer`实现的效果

![Alt text|100x160](http://o6ul1xz4z.bkt.clouddn.com/img/JK_IOS_S3_exam3.gif) 色差动画效果

![Alt text|100x160](http://o6ul1xz4z.bkt.clouddn.com/img/JK_IOS_S3_exam4.gif)作为`png`图片遮罩动画效果


### 3.7.2	CAGradientLayer 坐标系统
>**课程说明：**本课讲解 CAGradientLayer 的坐标系统，并延伸讲解了坐标系统影响如何颜色分配、动画效果。
>1. `CAGradientLayer`的坐标系统是从坐标（0, 0）到（1, 1）绘制的矩形
>![Alt text|200x180](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-04-11%20%E4%B8%8B%E5%8D%8811.44.12.png)
>2. `CAGradientLayer`的`frame`值的`size`不为正方形的话，坐标系统会被拉伸
>3. `CAGradientLayer`的`startPoint`与`endPoint`会直接影响颜色的绘制方向
>4. `CAGradientLayer`的颜色分割线是以0到1的比例来计算的
>![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-04-11%20%E4%B8%8B%E5%8D%8811.45.28.png)


![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/JK_IOS_S3_gra.gif)

```objective-c
#import "ViewController.h"

@interface ViewController ()
@property (nonatomic, strong) CAGradientLayer *gradientLayer;
@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
   
    // 1. 创建并初始化 CAGradientLayer 实例
    self.gradientLayer = [CAGradientLayer layer];
    self.gradientLayer.frame = CGRectMake(0, 0, 200, 200);
    self.gradientLayer.position = self.view.center;
    self.gradientLayer.borderWidth = 1.f;
    [self.view.layer addSublayer:self.gradientLayer];// 添加到视图
    
    // 2. 渐变效果相关设置
    // 颜色
    self.gradientLayer.colors = @[(__bridge id)[UIColor redColor].CGColor,
                                (__bridge id)[UIColor greenColor].CGColor,
                                (__bridge id)[UIColor blueColor].CGColor];
    // 渐变方向
    self.gradientLayer.startPoint = CGPointMake(0, 0);
    self.gradientLayer.endPoint = CGPointMake(1, 0);
    
    // 分割点
    self.gradientLayer.locations = @[@(0.25), @(0.5), @(0.75)];
    
    // 3. 动画:3秒后修改分割点
    [self performSelector:@selector(gradientLayerLocationLocationAnimation)
               withObject:nil
               afterDelay:3.f];
}

/**
 *  修改分割点
 */
- (void)gradientLayerLocationLocationAnimation
{
    // 颜色分割点效果
    self.gradientLayer.locations = @[@(0.01), @(0.5), @(0.99)];
}

@end
```


### 3.7.3	色差动画的实现
>**课程说明：**本课用 CAGradientLayer 实现色差动画效果。
>1. 确定渐变色渐变方向
>2. 设定两种颜色，其中一种是透明色，另外一种是自定义颜色
>3. 设定好`location`颜色分割点
>4. `CAGradientLayer`的颜色分割点是0到1的比例来计算的
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/JK_IOS_S3_colors.gif)

```objective-c
#import "ViewController.h"

@interface ViewController ()
@property (nonatomic, strong) CAGradientLayer *gradientLayer;// 渐变图层
@property (nonatomic, strong) NSTimer *timer;// 定时器
@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
 
    // 1. 创建 UIImage 实例（作为背景）
    UIImageView *imageView = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"bg"]];
    imageView.center = self.view.center;
    
    // 2. 初始化渐变图层
    self.gradientLayer = [CAGradientLayer layer];
    self.gradientLayer.frame = imageView.bounds;
    // 渐变方向
    self.gradientLayer.startPoint = CGPointMake(0, 0);
    self.gradientLayer.endPoint = CGPointMake(0, 1);
    // 颜色组
    self.gradientLayer.colors = @[(__bridge id)[UIColor clearColor].CGColor,
                                  (__bridge id)[UIColor redColor].CGColor];
    self.gradientLayer.locations = @[@(0.5f), @(1.f)];
    
    // 3. 组合背景和渐变图层
    [self.view addSubview:imageView];
    [imageView.layer addSublayer:self.gradientLayer];
    
    // 4. 初始化定时器
    self.timer = [NSTimer scheduledTimerWithTimeInterval:1.f
                                                  target:self
                                                selector:@selector(timerEvent)
                                                userInfo:nil
                                                 repeats:YES];
}

/**
 *  刷新颜色组合分割点，从而制造动画效果
 */
- (void)timerEvent
{
    // 获取一组随机产生的颜色组
    self.gradientLayer.colors = @[(__bridge id)[UIColor clearColor].CGColor,
                                  (__bridge id)[UIColor colorWithRed:arc4random() % 255 / 255.f
                                                               green:arc4random() % 255 /  255.f
                                                                blue:arc4random() % 255 / 255.f
                                                               alpha:1].CGColor];
    // 获取随机产生的分割点
    self.gradientLayer.locations = @[@(arc4random() % 10 / 10.f), @(1.f)];
}
@end
```

### 3.7.4	用 CAGradientLayer 封装带色差动画的 View
>**课程说明：**本课讲解将色差动画效果封装到 View 当中。
>1. 确定几个属性值
>2. 去定意义做动画的参数
>3. 重写`setter`做动画

![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/JK_IOS_S3_last.gif)

#### 3.7.4.1	封装好的视图
>**说明：**将对视图的渐变层的设置工作整合到`setter`中。

*ColorUIImageView.h*

```objective-c
#import <UIKit/UIKit.h>

/**
 渐变方向
 */
typedef enum : NSUInteger {
    UP,// 从上至下
    DOWN,// 从下往上
    RIGHT,// 从左到右
    LEFT// 从右往左
} EColorDirection;

@interface ColorUIImageView : UIImageView
@property (nonatomic, assign) EColorDirection direction;// 渐变方向(可以做动画)
@property (nonatomic, strong) UIColor *color;// 颜色(可以做动画)
@property (nonatomic, assign) CGFloat percent;// 百分比(可以做动画)
@end
```
*ColorUIImageView.m*

```objective-c
#import "ColorUIImageView.h"

@interface ColorUIImageView ()

@property (nonatomic, strong) CAGradientLayer *gradientLayer;// 渐变图层

@end
@implementation ColorUIImageView

// 构造函数
- (instancetype)initWithFrame:(CGRect)frame {
    if (self = [super initWithFrame:frame]) {
        // 初始化 CAGradientLayer 实例
        self.gradientLayer = [CAGradientLayer layer];
        self.gradientLayer.frame = self.bounds;
        self.gradientLayer.colors = @[(__bridge id)[UIColor clearColor].CGColor,
                                      (__bridge id)[UIColor redColor].CGColor];
        self.gradientLayer.locations = @[@(1), @(1)];
        [self.layer addSublayer:self.gradientLayer];
    }
    return self;
}

// 颜色组 color
@synthesize color = _color;
- (void)setColor:(UIColor *)color
{
    _color = color;
    self.gradientLayer.colors = @[(__bridge id)[UIColor clearColor].CGColor,
                                  (__bridge id)color.CGColor];
}
- (UIColor *)color
{
    return _color;
}
// 渐变方向 direction

@synthesize direction = _direction;
- (void)setDirection:(EColorDirection)direction
{
    _direction = direction;
    if (direction == UP) {
        self.gradientLayer.startPoint = CGPointMake(0, 0);
        self.gradientLayer.endPoint   = CGPointMake(0, 1);
    } else if (direction == DOWN) {
        self.gradientLayer.startPoint = CGPointMake(0, 1);
        self.gradientLayer.endPoint   = CGPointMake(0, 0);
    } else if (direction == RIGHT) {
        self.gradientLayer.startPoint = CGPointMake(1, 0);
        self.gradientLayer.endPoint   = CGPointMake(0, 0);
    } else if (direction == LEFT) {
        self.gradientLayer.startPoint = CGPointMake(0, 0);
        self.gradientLayer.endPoint   = CGPointMake(1, 0);
    } else {
        self.gradientLayer.startPoint = CGPointMake(0, 0);
        self.gradientLayer.endPoint   = CGPointMake(0, 1);
    }
}
- (EColorDirection)direction
{
    return _direction;
}
// 分割点 percent
@synthesize percent = _percent;
- (void)setPercent:(CGFloat)percent {
    _percent = percent;
    self.gradientLayer.locations = @[@(percent), @(1)];
}
- (CGFloat)percent
{
    return _percent;
}
@end
```

#### 3.7.4.2	使用
*ViewController.m*

```objective-c
#import "ViewController.h"
#import "ColorUIImageView.h"

@interface ViewController ()
@property (nonatomic, strong) ColorUIImageView *colorView;// 渐变图层
@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    // 1. 初始化封装了渐变图层的自定义视图
    self.colorView        = [[ColorUIImageView alloc] initWithFrame:CGRectMake(0, 0, 198, 253)];
    self.colorView.center = self.view.center;
    self.colorView.image  = [UIImage imageNamed:@"bg"];
    
    // 2. 添加到当前视图
    [self.view addSubview:self.colorView];
    
    // 3. 1秒钟后改变视图
    [self performSelector:@selector(event)
               withObject:nil
               afterDelay:1.f];
}

/**
 *  改变渐变颜色组、渐变方向和分割点
 */
- (void)event {
    self.colorView.direction = DOWN;
    self.colorView.color     = [UIColor cyanColor];
    self.colorView.percent   = 0.5;
}

@end
```

## 3.8	iOS中 CAShapeLayer 的使用

### 3.8.1	CAShapeLayer 简介
>**课程说明：**本课介绍 `CAShapeLayer` 与 `CALayer`、贝塞尔曲线之间的简单联系，并通过一个 demo 演示 `CAShapeLayer` 实现的路径动画效果。
>1. `CAShapeLayer`继承自`CALayer`，可以使用`CALayer`的所有属性值
>2. `CAShapeLayer`需要与贝塞尔曲线配合使用才有意义
>3. 使用`CAShapeLayer`与贝塞尔曲线可以实现不在`view`的`drawRect`方法中画出一些想要的图形
>4. `CAShapeLayer`属于`CoreAnimation`框架，其动画渲染直接提交到手机的`GPU`当中，相较于`view`的`srawRect`方法使用`CPU`渲染而言，其效率极高，能大大优化内存使用情况。

![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/JK_IOS_S3_path.gif)


### 3.8.2	贝塞尔曲线与 CAShapeLayer 的关系
>**课程说明：**本课介绍多阶贝塞尔曲线的用途，并详细讲解贝塞尔曲线与 `CAShapeLayer` 之间的关系，以及使用贝塞尔曲线的一些注意事项。
>1. `CAShapeLayer`中有`Shape`这个单词，顾名思义，它需要一个形状才能生效
>2. 贝赛尔曲线可以创建基于矢量的路径
>![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/JK_IOS_S3_beisaier.gif)
>3. 贝塞尔曲线给`CAShaperLayer`提供路径，`CAShpaeLayer`在提供的路径中进行渲染，路径会闭环，所以路径绘制出了`Shape`
>4. 用于`CAShapeLayer`的贝赛尔曲线作为`path`，其中`path`是一个首尾相接的闭环的曲线，即使该贝赛尔曲线不是一个闭环的曲线。

![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-04-12%2019.14.35.png)

*ViewCnotroller.m*

```objective-c
#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
 
    // 1. 贝塞尔曲线
    // UIBezierPath *oval = [UIBezierPath bezierPathWithOvalInRect:CGRectMake(0, 0, 200, 100)];// 椭圆形
    // UIBezierPath *rect = [UIBezierPath bezierPathWithRect:CGRectMake(0, 0, 200, 100)];// 矩形
    UIBezierPath *circle = [UIBezierPath bezierPathWithOvalInRect:CGRectMake(0, 0, 100, 100)];// 圆形
    
    
    // 2. CAShapeLayer
    CAShapeLayer *shape = [CAShapeLayer layer];
    shape.frame = CGRectMake(0, 0, 200, 50);
    shape.position = self.view.center;
    shape.borderWidth = 1.f;// 显示 CAShapeLayer 的边界
    shape.masksToBounds = YES;// 隐藏益处的贝塞尔曲线围住的区域
    shape.fillColor = [UIColor redColor].CGColor;
    
    // 3. 建立关联
    shape.path = circle.CGPath;// 看下圆形的效果
    
    // 4. 添加并显示
    [self.view.layer addSublayer:shape];
}
@end
```

### 3.8.3	StrokeStart 与 StrokeEnd 动画
>**课程说明：**本课讲解如何设置 `CAShapeLayer` 的属性值来显示出圆环并用 `CAShapeLayer` 的 `StrokeStart` 与 `StrokeEnd` 属性做动画。
>1. 将`ShapeLayer`的`fillColor`设置成透明背景
>2. 设置线条的宽度(`lineWidth`)的值
>3. 设置线条的颜色
>4. 将`strokeStart`的值设定成0，然后让`strokeEnd`的值变化触发隐式动画
>
>**注意：**同时设置`strokeStart`和`strokeEnd`时，前者不能大于后者。
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/JK_IOS_S3_animeTwo.gif)

```objective-c
#import "ViewController.h"

@interface ViewController ()
@property (nonatomic, strong) NSTimer *timer;// 定时器
@property (nonatomic, strong) CAShapeLayer *shapeLayer;
@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
 
    // 1. 背景设置
    self.view.backgroundColor = [UIColor colorWithRed:0.878 green:0.878 blue:0.878 alpha:1];
    
    // 2. 贝塞尔曲线
    UIBezierPath *oval = [UIBezierPath bezierPathWithOvalInRect:CGRectMake(0, 0, 100, 100)];
    
    // 3. CAShapeLayer
    _shapeLayer = [CAShapeLayer layer];
    _shapeLayer.frame = CGRectMake(0, 0, 100, 100);
    _shapeLayer.position = self.view.center;
    _shapeLayer.fillColor = [UIColor clearColor].CGColor;
    _shapeLayer.strokeColor = [UIColor redColor].CGColor;
    _shapeLayer.lineWidth = 2.f;
    _shapeLayer.strokeStart = 0.f;
    _shapeLayer.strokeEnd = 0.f;
    
    // 4. 建立贝塞尔曲线与CAShapeLayer之间的关联
    _shapeLayer.path = oval.CGPath;

    // 5. 添加并显示
    [self.view.layer addSublayer:_shapeLayer];
    
    // 6. 定时器
    _timer = [NSTimer scheduledTimerWithTimeInterval:1.f
                                              target:self
                                            selector:@selector(animationEventTypeTwo)
                                            userInfo:nil
                                             repeats:YES];
}

/**
 *  只改变 strokeEnd
 */
- (void)animationEventTypeOne
{
    _shapeLayer.strokeEnd = arc4random() % 100 / 100;
}

/**
 *  同时改变 strokeStart 和 strokeEnd
 */
- (void)animationEventTypeTwo
{
    CGFloat valueOne = arc4random() % 100 / 100.f;
    CGFloat valueTwo = arc4random() % 100 / 100.f;
    
    _shapeLayer.strokeStart = valueOne < valueTwo ? valueOne : valueTwo;// 取小的
    _shapeLayer.strokeEnd = valueOne > valueTwo ? valueOne : valueTwo;// 取大的
}
@end
```

### 3.8.4	用 CAShapeLayer 实现圆形进度条效果
>**课程说明：**本课在课时 3 的基础上将动画效果封装到控件当中。
>1. 确定需要设定的参数
>2. 实现细节
>3. 进行测试

![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/JK_IOS_S3_circle.gif)

#### 3.8.4.1	圆形进度条控件
*CircleUIView.h*

```objective-c
#import <UIKit/UIKit.h>

@interface CircleUIView : UIView
@property (nonatomic, assign) CGFloat startValue;// 起始值（0～1）
@property (nonatomic, assign) CGFloat lineWidth;// 线宽（>0）
@property (nonatomic, assign) CGFloat value;// 变化的值
@property (nonatomic, strong) UIColor *lineColor;// 线条颜色
@end
```
*CircleUIView.m*

```objective-c
#import "CircleUIView.h"

@interface CircleUIView ()
@property (nonatomic, strong) CAShapeLayer *shapeLayer;
@end

@implementation CircleUIView

// 构造器
- (instancetype)initWithFrame:(CGRect)frame {
    if (self = [super initWithFrame:frame]) {
        // 1. 贝塞尔曲线
        UIBezierPath *path = [UIBezierPath bezierPathWithOvalInRect:self.bounds];
        
        // 2. CAShapeLayer
        _shapeLayer = [CAShapeLayer layer];
        _shapeLayer.frame = self.bounds;
        _shapeLayer.fillColor = [UIColor clearColor].CGColor;
        _shapeLayer.lineWidth=  1.f;
        _shapeLayer.strokeColor = [UIColor redColor].CGColor;
        _shapeLayer.strokeEnd = 0.f;// 一开使进度为0
        
        // 3. 关联
        _shapeLayer.path = path.CGPath;
        
        // 4. 添加并显示
        [self.layer addSublayer:_shapeLayer];
    }
    return self;
}

// strokeStart
@synthesize startValue = _startValue;
- (void)setStartValue:(CGFloat)startValue {
    _startValue = startValue;
    _shapeLayer.strokeStart = startValue;
}
- (CGFloat)startValue {
    return _startValue;
}

// strokeEnd
@synthesize value = _value;
- (void)setValue:(CGFloat)value {
    _value = value;
    _shapeLayer.strokeEnd = value;
}
- (CGFloat)value {
    return _value;
}

// lineWidth
@synthesize lineWidth = _lineWidth;
- (void)setLineWidth:(CGFloat)lineWidth {
    _lineWidth = lineWidth;
    _shapeLayer.lineWidth = lineWidth;
}
- (CGFloat)lineWidth {
    return _lineWidth;
}

// strokeColor
@synthesize lineColor = _lineColor;
- (void)setLineColor:(UIColor *)lineColor {
    _lineColor = lineColor;
    _shapeLayer.strokeColor = lineColor.CGColor;
}
- (UIColor *)lineColor {
    return _lineColor;
}



@end
```

#### 3.8.4.2	使用
*ViewController.m*

```objective-c
#import "ViewController.h"
#import "CircleUIView.h"

@interface ViewController ()
{
    CircleUIView *circle;
}
@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
 
    // 1. 创建并设置圆型进度条
    circle = [[CircleUIView alloc] initWithFrame:CGRectMake(0, 0, 200, 200)];
    circle.center = self.view.center;
    circle.startValue = 0.f;
    circle.lineWidth = 3.f;
    circle.lineColor = [UIColor grayColor];
    
    // 2. 添加并显示
    [self.view addSubview:circle];
    
    // 3. 延迟3秒后动画
    [self performSelector:@selector(delayAnimation)
               withObject:nil
               afterDelay:3.f];
}

/**
 *  设置圆型进度
 */
- (void)delayAnimation
{
    // 使进度达到100%
    circle.value = 1.f;
}
@end
```

## 3.9	iOS中 CALayer 的使用

### 3.9.1	用 CALayer 定制下载进度条控件
>**课程说明：**本课在通过对 `CALayer` 的基本原理讲解后用 `CALayer` 基本知识定制下载进度条控件。
>1. 单独创建出`CALayer`
>2. 直接修改`CALayer`的`frame`值执行隐式动画，实现进度条效果
>3. 用定时器（`NSTimer`）模拟网络下载时提供的百分比数据
>4. 将`CALayer`封装进`UIView`子类中定制进度条控件

>**CALayer简介：**
>1. `CALayer`一般作为`UIView`的容器使用
>2. `CALayer`是一个管理着图片载体（image-based content）的 层结构
>3. 直接修改单独创建出的`CALayer`的属性可以触发隐式动画（不需要其它设置，修改属性直接触发动画）
>4. `UIView`中的`CALayer`动画必须显式触发才能生效


#### 3.9.2.1	原理
>**说明：**直接修改`CALayer`的`frame`值执行隐式动画，实现进度条效果。

```objective-c
// 创建layer并添加layer
CALayer *layer = [CALayer layer];
layer.frame = CGRectMake(0, 0, 100, 5);
[self.view.layer addSubLayer:layer];

// 触发隐式动画
layer.frame = CGRectMake(0,0, 200, 5);
```
![Alt text|200x120](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-04-13%2010.29.42.png)


#### 3.9.1.2	实战
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/JK_IOS_S1_xcode-progress.gif)


### 3.9.2	用 CALayer 定制 UIImageView 淡入淡出切换图片效果
>**课程说明：**本课将利用动画组 `CAAnimationGroup` 将 `bounds` 动画与 `contents` 动画组合起来实现切换图片时的淡入淡出效果。
>1. 操作`UIImageView`的`CALayer`修改其`bounds`值进行显示动画
>2. 修改`UIImageView`的`CALayer`中的`contents`属性实现切换图片的动画
>3. 用`CAAnimationGroup`将`bounds`动画与`contents`动画组合起来
>4. 将上述效果封装进`UIView`的子类中生成控件
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/JK_IOS_S3_fade.gif)


#### 3.9.2.1	封装动画效果
*FadeUIView.h*

```objective-c
#import <UIKit/UIKit.h>

@interface FadeUIView : UIView
@property (nonatomic, strong) UIImage *image;// 当前图片
@end
```
*FadeUIView.m*

```objective-c
#import "FadeUIView.h"

@implementation FadeUIView

// 重写 setter, getter
@synthesize image = _image;
- (void)setImage:(UIImage *)image
{
    _image = image;
    // 除了第一次设置图片，都加入淡如淡出的效果
    if (self.layer.contents != nil) {
        // 创建淡入/淡出的切换动画
        CABasicAnimation *contentsAnimation = [CABasicAnimation animationWithKeyPath:@"contents"];
        contentsAnimation.fromValue = self.layer.contents;
        contentsAnimation.toValue = (__bridge id)(image.CGImage);
        contentsAnimation.duration = 3.f;
        
        // 将动画添加到图层
        [self.layer addAnimation:contentsAnimation forKey:nil];
    }
    // 修改 contents，触发动画
    self.layer.contents = (__bridge id)(image.CGImage);
}

- (UIImage *)image
{
    return _image;
}
@end
```

#### 3.9.2.2	使用控件
*ViewController.m*

```objective-c
#import "ViewController.h"
#import "FadeUIView.h"

@interface ViewController ()
@property (nonatomic, strong)FadeUIView *fadeView;
@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
 
    // 初始化呈现动画的视图
    self.fadeView = [[FadeUIView alloc] initWithFrame:self.view.bounds];
    [self.view addSubview:self.fadeView];
    
    // 设置第一张图片
    self.fadeView.image = [UIImage imageNamed:@"起始图片"];
    
    // 2秒钟后设置下一张图片
    [self performSelector:@selector(layerAnimation)
               withObject:nil
               afterDelay:3.f];
}

/**
 *  设置下一张图片
 */
- (void)layerAnimation
{
    self.fadeView.image = [UIImage imageNamed:@"结束图片"];
}
@end
```

### 3.9.3	用 CALayer 实现复杂遮罩效果
>**课程说明：**本课将利用 CALayer 的 mask 属性作为遮罩 Layer，通过移动该遮罩 Layer 的 frame 值实现复杂的遮罩效果。
>1. 遮罩原理分析
>2. 用`png`图片作为`CALayer`中`mask`属性的遮罩`Layer`
>3. 移动该`CALayer`的`mask`的`frame`值实现遮罩`Layer`
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-04-14%20%E4%B8%8A%E5%8D%8812.01.58.png)
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/JK_IOS_S3_mask.gif)

```objective-c
#import "ViewController.h"

@interface ViewController ()
@property (nonatomic, strong) CALayer *imageLayer;
@property (nonatomic, strong) CALayer *maskLayer;
@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    self.view.backgroundColor = [UIColor blackColor];
    
    UIImage *imageForContents = [UIImage imageNamed:@"原始图片"];// 底图
    UIImage *imageForMask = [UIImage imageNamed:@"maskLayerContents"];// 作为遮罩的图片
    
    // 图片 layer
    self.imageLayer = [CALayer layer];
    self.imageLayer.frame = CGRectMake(50, 50, 200, 200);
    self.imageLayer.contents = (__bridge id)(imageForContents.CGImage);
    [self.view.layer addSublayer:self.imageLayer];
    
    // 遮罩 layer
    self.maskLayer = [CALayer layer];
    self.maskLayer.frame = CGRectMake(0, 0, 100, 100);
    self.maskLayer.contents = (__bridge id)(imageForMask.CGImage);
    // self.maskLayer.backgroundColor = [UIColor whiteColor].CGColor;
    
    // 给图片 layer 提供遮罩的 layer
    self.imageLayer.mask = self.maskLayer;
    
    // 3秒中中后做 maskLayer 动画
    [self performSelector:@selector(maskLayerAnimation)
               withObject:nil
               afterDelay:3.f];
}

- (void)maskLayerAnimation
{
    self.maskLayer.frame = CGRectMake(50, 50, 100, 100);
}
@end
```

## 3.10	iOS绘图 API 绘制线条／文字／几何图形

### 3.10.1	绘制线条
![Alt text|100x150](http://o6ul1xz4z.bkt.clouddn.com/img/1460642543336.png)
*DrawLines.swift*

```swift
import UIKit

class DrawLinesView: UIView {

    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }
    
    override func drawRect(rect: CGRect) {
        // 1. 获取绘图上下文
        let context = UIGraphicsGetCurrentContext()
        
        // 2. 描绘线条
        CGContextMoveToPoint(context, 100, 100)
        CGContextAddLineToPoint(context, 100, 200)
        CGContextAddLineToPoint(context, 200, 200)
        
        CGContextMoveToPoint(context, 100, 300)
        CGContextAddLineToPoint(context, 100, 400)
        CGContextAddLineToPoint(context, 200, 500)
        
        // 3. 设置上下文
        CGContextSetRGBStrokeColor(context, 1, 0, 1, 1)
        CGContextSetLineWidth(context, 5)
        
        // 4. 绘制出来
        CGContextStrokePath(context)
    }
}
```

### 3.10.2	绘制矩形

![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-04-14%20%E4%B8%8B%E5%8D%8810.36.09.png)
*DrawRectView.swift*

```swift
import UIKit

class DrawRectView: UIView {

    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }
    override func drawRect(rect: CGRect) {
        // 1. 获取绘图上下文
        let context = UIGraphicsGetCurrentContext()
        
        // 2. 矩形
        CGContextAddRect(context, CGRectMake(100, 100, 100, 100))
        
        // 3. 设置绘图上下文
        CGContextSetRGBFillColor(context, 1, 0, 0, 1)
        CGContextFillPath(context)
        CGContextSetLineWidth(context, 5)
        CGContextSetRGBStrokeColor(context, 0, 1, 0, 1)
        
        // 4. 绘制出矩形
        CGContextStrokeRect(context, CGRectMake(100, 100, 100, 100))
    }
}
```


### 3.10.3	绘制圆形
![Alt text|100x150](http://o6ul1xz4z.bkt.clouddn.com/img/1460644510040.png)
*DrawCircleView.swift*

```swift
import UIKit

class DrawCircleView: UIView {

    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }
    override func drawRect(rect: CGRect) {
        // 1. 获取上下文
        let context = UIGraphicsGetCurrentContext()
        
        // 2. 画圆
        /*-- 方案一 --*/
        // 内部用来填充的圆
        CGContextAddArc(context, 150, 200, 100, 0, 3.141592653 * 2, 0)
        CGContextSetRGBFillColor(context, 1, 0, 0, 1)
        CGContextFillPath(context)
        // 外部作为边的圆
        CGContextAddArc(context, 150, 200, 100, 0, 3.141592653 * 2, 0)
        CGContextSetLineWidth(context, 10)
        CGContextStrokePath(context)
        
        /*-- 方案二 --*/
        CGContextAddEllipseInRect(context, CGRectMake(50, 400, 200, 100))
        CGContextStrokePath(context)

        CGContextStrokePath(context)
    }

}
```

### 3.10.4	绘制图片
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-04-14%20%E4%B8%8B%E5%8D%8811.43.57.png)

```swift
import UIKit

class DrawImageView: UIView {
    var uiImage:CGImageRef?
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        uiImage = UIImage(named: "walle.jpg")?.CGImage
    }
    override func drawRect(rect: CGRect) {
        // 获取上下文
        let context = UIGraphicsGetCurrentContext()
        
        /* 绘制图片 */
        // 1. 保留之前的上下文信息（设置暂存点）
        CGContextSaveGState(context)
        
        // 2. 设置当前上下文
        CGContextTranslateCTM(context, 10, 400)// 移动
        CGContextScaleCTM(context, 1, -1)// 缩放（翻转坐标系）
        // 3. 呈现图片
        CGContextDrawImage(context, CGRectMake(0, 0, 200, 200), uiImage)
        
        
        /* 绘制矩形 */
        CGContextRestoreGState(context)// 恢复暂存点之前的上下文
        CGContextStrokeRect(context, CGRectMake(50, 80, 100, 100))
    }
}
```

### 3.10.5	画板实例
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/JK_IOS_S3_panel.gif)
*DrawBoardView.swift*

```swift
import UIKit

class DrawBoardView: UIView {
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }
    let path = CGPathCreateMutable()
    
    override func touchesBegan(touches: Set<UITouch>, withEvent event: UIEvent?) {
        let p = touches.first?.locationInView(self)
        CGPathMoveToPoint(path, nil, p!.x, p!.y)
    }
    override func touchesMoved(touches: Set<UITouch>, withEvent event: UIEvent?) {
        let p = touches.first?.locationInView(self)
        CGPathAddLineToPoint(path, nil, p!.x, p!.y)
        
        setNeedsDisplay()// 重绘当前view（触发drawRect）
    }
    override func drawRect(rect: CGRect) {
        
        let context = UIGraphicsGetCurrentContext()
        CGContextAddPath(context, path)
        CGContextStrokePath(context)
    }
}
```

