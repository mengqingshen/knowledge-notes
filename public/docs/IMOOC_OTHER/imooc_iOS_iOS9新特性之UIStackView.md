---
title: iOS9新特性之UIStackView
categories:
    - 慕课网学习笔记
tag:
    - iOS
---

>**视频：**http://www.imooc.com/learn/568
>**源码：**https://git.coding.net/eli01/imooc_UIStackView.git

## 1 学习指南
>**说明：**`iOS`设备屏幕尺寸日益多样化，随之而来的是屏幕适配日益复杂。为了解决这个问题，`iOS9`推出了`Stack View`。

## 2 UIStackView效果实现

### 2.1 UIStackView属性介绍
>**说明：**一些常用的属性
![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-02-18%20%E4%B8%8B%E5%8D%8810.47.51.png)


### 2.2 美团效果实现
![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-02-18%20%E4%B8%8B%E5%8D%8811.07.12.png)


### 2.3 大众点评子控件代码实现
>**说明：**通过代码（而不是`Storyboard`）创建并添加该组件。
![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-02-18%20%E4%B8%8B%E5%8D%8811.47.24.png)
>**注意：**向`UIStackView`中添加子控件的时候要使用`addArrangedSubview`而不是`addSubview`，因为前者会保留控件作为`Stack View`子控件的特性

*ViewController.m*

```objective-c
#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    /* 1. 最外部UIStackView */
    UIStackView *stackView = [[UIStackView alloc] initWithFrame:CGRectMake(50, 50, 200, 50)];// 创建Stack View
    stackView.axis = UILayoutConstraintAxisHorizontal;// 设置为水平排列
    
    /* 2. 左边图片 */
    UIImageView *imgView = [[UIImageView alloc] initWithFrame:CGRectMake(0, 0, 50, 50)];
    imgView.image = [UIImage imageNamed:@"img1.png"];
   
    /* 3. 右边子UIStackView */
    UIStackView *stackViewSub = [[UIStackView alloc] initWithFrame:CGRectMake(0, 0, 150, 50)];
    stackViewSub.axis = UILayoutConstraintAxisVertical;
    // 内部3个控件
    UIImageView *imgView2 = [[UIImageView alloc] initWithFrame:CGRectMake(0, 0, 38, 10)];
    imgView2.image = [UIImage imageNamed:@"img2.png"];
    UILabel *label1 = [[UILabel alloc] initWithFrame:CGRectMake(0, 0, 38, 10)];
    label1.text = @"人均¥18";
    label1.font = [UIFont systemFontOfSize:12.0];
    UILabel *label2 =[[UILabel alloc] initWithFrame:CGRectMake(0, 0, 150, 10)];
    label2.text = @"口味21环境21价格18";
    label2.font = [UIFont systemFontOfSize:10.0];
    
    /* 4. 组合 */
    // 3个控件添加到内部Stack View
    [stackViewSub addArrangedSubview:imgView2];
    [stackViewSub addArrangedSubview:label1];
    [stackViewSub addArrangedSubview:label2];
    // 添加左边的图片到外部的Stack View
    [stackView addArrangedSubview:imgView];
    // 添加内部的 Stack View到外部的 Stack View
    [stackView addArrangedSubview:stackViewSub];
    // 将最外层的stackView添加到View Controller
    [self.view addSubview:stackView]; 
}
...
@end
```

### 2.4 UIStackView使用要点
无干货

## 3 总结与预告
无干货
