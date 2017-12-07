---
title: 4 设计模式
categories:
  - 极客学院_ios高级
toc: true
---

## 4.1	iOS设计模式简介


### 4.1.1	编码是门艺术

### 4.1.2	设计模式的基本原则
+ **开闭原则**：一个模块的修改应该对扩展开发，对修改关闭
+ **里氏代换原则**：子类、父类可以替换使用
+ **依赖倒转原则**：抽象比依赖细节，细节依赖抽象
+ **接口隔离原则**：只做和接口相关的必要的事情，不做和接口不相关的事情
+ **合成／聚合复用**：从一个类扩展出新的方法时，尽量不要通过继承实现，而是在新的类中的方法中将原来的类作为一个组件调用


### 4.1.3	设计模式的类型

## 4.2	适配器


### 4.2.1	何为适配器模式
>**课程说明：**本课时通过现实生活中遇到的电源适配问题，来讲解何为适配器模式。
>**说明：**苹果的电源适配器，可以将各种输入电压频率转为一致的电压频率为设备供电，从而解决国家电压频率不一致问题
>+ **类适配器：**比之于一般的电源适配器，在不同国家要购买相应的电源适配器
>+ **对象适配器：**比之于苹果的电源适配器，能自动适应各个国家的情况

### 4.2.2	数据直接适配带来的困境
>**课程说明：**本课时讲解开发过程中遇到的最常见的几种数据适配问题的弊端，并配以代码示例，来引申出为何要用适配器模式。
>+ 直接赋值的弊端
>+ 用对象赋值的灵活性问题
>+ 如何降低数据层与视图层的耦合度

### 4.2.3	使用适配器模式
>**课程说明：**本课时讲解用适配器模式来优化名片视图加载数据的问题。
>+ 创建抽象适配器模式
>+ 适配器与视图层建立输出联系
>+ 类适配器与对象适配器
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-05-01%20%E4%B8%8A%E5%8D%8811.48.25.png)![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1462074739914.png)


#### 4.2.3.1	类适配器
>**说明：**为每种数据模型都创建相应的适配器，用到哪种数据就使用相应的适配器。
>![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-05-01%20%E4%B8%8A%E5%8D%8811.30.25.png)
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1462073700393.png)

```objective-c
// 1. 创建商务名片实例
BusinessCardUIView *cardView = [[BusinessCardUIView alloc] initWithFrame:BUSINESS_FRAME];
cardView.center = self.view.center;

// 2. 初始化要数据
// 第一种数据
Model *model = [[Model alloc] init];
model.name = @"TZM";
model.lineColor = [UIColor redColor];
model.phoneNumber = @"101 - 5687 -000";

// 第二种数据
/*
NewCardModel *newCardModel = [[NewCardModel alloc] init];
newCardModel.name = @"JikeXueYuan";
newCardModel.colorHexString = @"black";
newCardModel.phoneNumber = @"13671208074";
// 3. 将数据连接到适配器
BusinessCardAdapter *modelAdapter = [[NewCardModelAdapter alloc] initWithData:newCardModel];
*/

// 3. 将数据连接到适配器
BusinessCardAdapter *modelAdapter = [[ModelAdapter alloc] initWithData:model];

// 4. 将适配器连接到视图
[cardView loadData:modelAdapter];

[self.view addSubview:cardView];
```

#### 4.2.3.2		对象适配器
>**说明：**每种数据模型都使用同一个适配器，适配器中承担为每种数据模型都提供适配的任务。
>![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-05-01%20%E4%B8%8A%E5%8D%8811.31.00.png)
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-05-01%20%E4%B8%8A%E5%8D%8811.38.40.png)

```objective-c
// 1. 创建商务名片实例
BusinessCardUIView *cardView = [[BusinessCardUIView alloc] initWithFrame:BUSINESS_FRAME];
cardView.center = self.view.center;

// 2. 初始化要数据
// 第一种数据
Model *model = [[Model alloc] init];
model.name = @"TZM";
model.lineColor = [UIColor redColor];
model.phoneNumber = @"101 - 5687 -000";

// 第二种数据
/*
NewCardModel *newCardModel = [[NewCardModel alloc] init];
newCardModel.name = @"JikeXueYuan";
newCardModel.colorHexString = @"black";
newCardModel.phoneNumber = @"13671208074";
*/

// 3. 将数据连接到适配器
BusinessCardAdapter *modelAdapter = [[CardAdapter alloc] initWithData:model];

// 4. 将适配器连接到视图
[cardView loadData:modelAdapter];

[self.view addSubview:cardView];
```

### 4.2.4	适配器模式的优缺点
**优点：**降低数据层和视图层之间的耦合度
**缺点：**对不理解适配器模式的人可读性不好


## 4.3	策略


### 4.3.1	if - else 的问题
>**课程说明：**程序中出现了大量 if - else 之后，出现的阅读障碍以及维护的困境。

### 4.3.2	策略模式的原理
>**课程说明：**策略模式的基本原理以及定义的条件。
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1462093482279.png)


### 4.3.3	策略模式的使用
>**课程说明：**怎样将策略模式用到 `UITextField` 的验证逻辑上。
>+ 如何抽象出策略
>+ 制定协议来维护输出信息
![Alt text|200x100](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-05-01%20%E4%B8%8B%E5%8D%889.41.29.png)
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1462113251890.png)

*ViewController.m*

```objective-c
#import "ViewController.h"
#import "UIButton+inits.h"
#import "UIView+SetRect.h"
#import "UIInfomationView.h"

#import "CustomUITextField.h"
#import "EmailValidator.h"
#import "PhoneNumberValidator.h"

@interface ViewController () <UITextFieldDelegate>

@property (nonatomic, strong) CustomUITextField *emailField;
@property (nonatomic, strong) CustomUITextField *phoneNumberField;

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    // 初始化按钮
    [self initButton];
    
    // 初始化输入框
    [self initCustonFields];
}

#pragma mark - 采纳 UITextFieldDelegate
- (void)textFieldDidEndEditing:(UITextField *)textField {
    CustomUITextField *customField = (CustomUITextField *)textField;
    if ([customField validate] == NO) {
        // 弹出错误提示窗
        [UIInfomationView showAlertViewWithTitle:nil
                                         message:customField
                                                .validator
                                                .errorMessage
                               cancelButtonTitle:nil
                               otherButtonTitles:@[@"确定"]
                                    clickAtIndex:^(NSInteger buttonIndex) {
                                        
                                    }];
    }
}

/**
 *  初始化输入框
 */
- (void)initCustonFields {
    // 邮箱输入框
    self.emailField = [[CustomUITextField alloc] initWithFrame:CGRectMake(30, 80, Width - 60, 30)];
    self.emailField.placeholder = @"请输入邮箱";
    self.emailField.delegate =  self;
    self.emailField.validator = [EmailValidator new];
    [self.view addSubview:self.emailField];
    
    // 手机号输入框
    self.phoneNumberField = [[CustomUITextField alloc] initWithFrame:CGRectMake(30, 80 + 40, Width - 60, 30)];
    self.phoneNumberField.placeholder = @"请输入电话号码";
    self.phoneNumberField.delegate = self;
    self.phoneNumberField.validator = [PhoneNumberValidator new];
    [self.view addSubview:self.phoneNumberField];
}

/**
 *  初始化返回按钮
 */
- (void)initButton {
    UIButton *button = [UIButton createButtonWithFrame:CGRectMake(30, 30, 90, 30)
                                            buttonType:0
                                                 title:@"Back"
                                                   tag:0
                                                target:self
                                                action:@selector(buttonEvent:)];
    [self.view addSubview:button];
}

/**
 *  结束编辑
 */
- (void)buttonEvent:(UIButton *)button {
    [self.view endEditing:YES];
}

@end
```

### 4.3.4	策略模式的优缺点
**优点：**避免大量`if-else`的使用，精简逻辑，可维护性高
**缺点：**使用场景受限，使用之前就需要确定对应的策略。

## 4.4	观察者


### 4.4.1	如何订阅一本杂志
>**课程说明：**本课时通过讲解如何订阅杂志的生活实例，来讲解何为观察者模式。

#### 4.4.1.1	如何订阅一本杂志
>1. 通过邮局或网络查询刊物的编号
>2. 找到后，提供个人住址等相关信息
>3. 发行商在一般每月的固定时间发送刊物

![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-05-01%20%E4%B8%8B%E5%8D%8811.30.22.png)

### 4.4.2	通知中心的抽象设计
>**课程说明：**本课时根据订阅杂志的实例，讲解如何将抽象的模型转换成代码。
>+ 如何抽象接口
>+ 对订阅对象的约束：订阅对象必须采纳相应的协议
>+ 针对接口编程：先根据目标功能定好接口，然后再具体实现

*SubscriptionServiceCenter.h*

```objective-c
#import <Foundation/Foundation.h>
#import "SubscriptionServiceCenterProtocol.h"

@interface SubscriptionServiceCenter : NSObject

#pragma mark - 维护订阅信息
/**
 *  创建订阅号
 *
 *  @param subscriptionNumber 订阅号码
 */
+ (void)createSubscriptionNumber:(NSString *)subscriptionNumber;

/**
 *  移除订阅号
 *
 *  @param subscriptionNumber 订阅号码
 */
+ (void)removeSubscriptionNumber:(NSString *)subscriptionNumber;

#pragma mark - 维护客户信息
/**
 *  添加客户到具体的订阅号当中
 *
 *  @param customer           客户
 *  @param subscriptionNumber 订阅号码
 */
+ (void)addCustomer:(id <SubscriptionServiceCenterProtocol>)customer withSubscriptionNumber:(NSString *)subscriptionNumber;

/**
 *  从具体的订阅号中移除客户
 *
 *  @param customer           <#customer description#>
 *  @param subscriptionNumber <#subscriptionNumber description#>
 */
+ (void)removeCustomer:(id <SubscriptionServiceCenterProtocol>)customer withSubscriptionNumber:(NSString *)subscriptionNumber;

#pragma mark - 发送消息
+ (void)sendMessage:(id)message toSubscriptionNumber:(NSString *)subscriptionNumber;

@end
```


### 4.4.3	实现通知中心
>**课程说明：**本课时将实现通知中心，并讲解`NSHashTable` 与` NSParameterAssert` 的使用。
>**注意：**`NSHashTable`和`NSSet`类似，但前者可以不会强引用集合中的元素。

+ 对象持有的问题
*描述*：书刊和用户之间的联系导致用户实例无法被释放
*解决*：用`NSHashTable`实现`weak`引用
+ 参数的严格验证
*描述*：比如参数值不允许值为`nil`

![Alt text](./屏幕快照 2016-05-02 下午2.57.40.png)


#### 4.4.3.1	实现通知中心类
*SubscriptionServiceCenter.m*

```objective-c
#import "SubscriptionServiceCenter.h"
// 存储订阅号的字典
static NSMutableDictionary *_subscriptionDictionary = nil;

@implementation SubscriptionServiceCenter

// 初始化存储订阅号的字典
+ (void)initialize {
    if (self == [SubscriptionServiceCenter class]) {
        _subscriptionDictionary = [NSMutableDictionary dictionary];
    }
}

// 获取具体的订阅号
+ (NSHashTable *)existSubscriptionNumber:(NSString *)subscriptionNumber {
    return [_subscriptionDictionary objectForKey:subscriptionNumber];
}

+ (void)createSubscriptionNumber:(NSString *)subscriptionNumber {
    NSParameterAssert(subscriptionNumber);// 确保订阅号不为nil
    NSHashTable *hashTable = [self existSubscriptionNumber:subscriptionNumber];
    if (hashTable == nil) {
        hashTable = [NSHashTable weakObjectsHashTable];
        [_subscriptionDictionary setObject:hashTable forKey:subscriptionNumber];
    }
}

+ (void)removeSubscriptionNumber:(NSString *)subscriptionNumber {
    NSParameterAssert(subscriptionNumber);// 确保订阅号不为nil
    NSHashTable *hashTable = [self existSubscriptionNumber:subscriptionNumber];
    if (hashTable) {
        [_subscriptionDictionary removeObjectForKey:subscriptionNumber];
    }
}

+ (void)addCustomer:(id<SubscriptionServiceCenterProtocol>)customer withSubscriptionNumber:(NSString *)subscriptionNumber {
    NSParameterAssert(customer);
    NSParameterAssert(subscriptionNumber);
    
    NSHashTable *hashTable = [self existSubscriptionNumber:subscriptionNumber];
    [hashTable addObject:customer];
}

+ (void)removeCustomer:(id<SubscriptionServiceCenterProtocol>)customer withSubscriptionNumber:(NSString *)subscriptionNumber {
    NSParameterAssert(subscriptionNumber);
    NSHashTable *hashTable = [self existSubscriptionNumber:subscriptionNumber];
    [hashTable removeObject:customer];
}

+ (void)sendMessage:(id)message toSubscriptionNumber:(NSString *)subscriptionNumber {
    NSParameterAssert(subscriptionNumber);// 确保订阅号不为nil
    NSHashTable *hashTable = [self existSubscriptionNumber:subscriptionNumber];// 存储订阅号的字典
    if (hashTable) {
        // 遍历订阅号
        NSEnumerator *enumerator = [hashTable objectEnumerator];
        id <SubscriptionServiceCenterProtocol>object = nil;
        while (object = [enumerator nextObject]) {
            // 向每个订阅用户发送订阅订阅内容
            if ([object respondsToSelector:@selector(subscriptionMessage:subscriptionNumber:)]) {
                [object subscriptionMessage:message subscriptionNumber:subscriptionNumber];
            }
        }
    }
}

@end
```

#### 4.4.3.2	使用通知中心
*SubscriptionServiceCenterProtocol.h*

```objective-c
#import <Foundation/Foundation.h>

@protocol SubscriptionServiceCenterProtocol <NSObject>

@required
- (void)subscriptionMessage:(id)message subscriptionNumber:(NSString *)subscriptionNumber;

@end
```
*ViewController.m*

```objective-c
#import "ViewController.h"
#import "SubscriptionServiceCenter.h"

static NSString *SCIENCE = @"SCIENCE";

@interface ViewController () <SubscriptionServiceCenterProtocol>

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    // 创建订阅号
    [SubscriptionServiceCenter createSubscriptionNumber:SCIENCE];
    
    // 添加订阅的用户到指定的刊物
    [SubscriptionServiceCenter addCustomer:self
                    withSubscriptionNumber:SCIENCE];
    
    // 发型机构发送刊物
    [SubscriptionServiceCenter sendMessage:@"V1.0"
                      toSubscriptionNumber:SCIENCE];
}

#pragma mark - 采纳协议 SubscriptionServiceCenterProtocol
// 发行机构发送刊物时触发该方法的调用
- (void)subscriptionMessage:(id)message subscriptionNumber:(NSString *)subscriptionNumber {
    NSLog(@"%@ %@", message, subscriptionNumber);
}

@end
```

### 4.4.4	KVO与通知中心
>**课程说明：**本课时简单介绍下 Cocoa 框架中的 KVO 与通知中心的使用。

#### 4.4.4.1	Cocoa框架的通知中心
>**说明：**`Cocoa`框架提供了自己的通知中心`API`，该通知中心就是通过观察者模式实现的。
>**注意：**观察者被释放时需要手动将观察者从订阅号中移除，否则会存在内存泄漏（通知中心会继续持有对观察者的引用）。

*ViewController.m*

```objective-c
#import "ViewController.h"

#define SCIENCE @"SCIENCE"// 订阅号名

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    // 添加客户到指定的订阅号中
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(notificationCenterEvent:)
                                                 name:SCIENCE
                                               object:@"v1.0"];
    
    // 发送消息到指定的订阅号中
    [[NSNotificationCenter defaultCenter] postNotificationName:SCIENCE
                                                        object:@"V1.0"];
}

/**
 *  当客户收到消息时被调用的方法
 *
 */
- (void)notificationCenterEvent:(id)sender {
    NSLog(@"%@", sender);
}

#pragma mark - 释放资源
- (void)dealloc {
    // 从通知中心移除
    [[NSNotificationCenter defaultCenter] removeObserver:self
                                              forKeyPath:SCIENCE];
}
@end
```

#### 4.4.4.2	KVO机制的观察者模式
>**说明：**`KVO`机制本身就是一种观察者模式。
>**注意：**观察者被释放时需要手动将观察者从订阅号中移除，否则会存在内存泄漏（通知中心会继续持有对观察者的引用）。


##### 通知中心

*Model.h*

```objective-c
#import <Foundation/Foundation.h>

@interface Model : NSObject

@property (nonatomic, strong) NSString *name;

@end
```
*Model.m*

```objective-c
#import "Model.h"

@implementation Model

@end
```

##### 演示

*ViewController.m*

```objective-c
#import "ViewController.h"
#import "Model.h"

#define SCIENCE @"SCIENCE"// 订阅号名

@interface ViewController ()
@property (nonatomic, strong)Model *model;
@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    // 创建订阅中心
    self.model = [Model new];
    
    // 客户添加订阅中心的"name"服务：当name属性被修改时会发送消息给观察者
    [self.model addObserver:self
                 forKeyPath:@"name"
                    options:NSKeyValueObservingOptionNew
                    context:nil];
    // 订阅中心发送消息（通过修改 name 属性值）
    self.model.name = @"V1.0";
}

#pragma mark - 通过KVO该表属性时调用的方法
- (void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary<NSString *,id> *)change context:(void *)context {
    NSLog(@"%@", change);
}

#pragma mark - 释放资源
- (void)dealloc {
	// 移除 KVO
    [self.model removeObserver:self forKeyPath:@"name"];
}
@end
```

## 4.5	原型模式和外观模式


### 4.5.1	原型模式

#### 4.5.1.1	模版的用处
>**用途：**当要创建的对象有很多相似的细节的时候，就可以通过制作模版简化工作。


#### 4.5.1.2	原型模式的原理
>**说明：**定义一个协议，采纳该协议个类要实现`clone`方法，也就是具备拷贝自身的能力。
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1462191691369.png)

##### 案例

![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1462192387967.png)

*PrototypeCopyProtocol.h*

```objective-c
 #import <Foundation/Foundation.h>
@protocol PrototypeCopyProtocol <NSObject>

@required
/**
 *  复制自己
 *
 *  @return 返回一个拷贝
 */
- (id)clone;

@end
```	
*StudentModel.h*

```objective-c
#import <Foundation/Foundation.h>
#import "PrototypeCopyProtocol.h"
@interface StudentModel : NSObject <PrototypeCopyProtocol>

@property (nonatomic, strong) NSString *name;
@property (nonatomic, strong) NSNumber *age;
@property (nonatomic, strong) NSString *address;
@property (nonatomic, strong) NSNumber *totalScore;

@end
```
*StudentModel.m*

```objective-c
#import "StudentModel.h"

@implementation StudentModel

- (id)clone {
    // 创建一个新的实例
    StudentModel *student = [[[self class] alloc] init];
    // 按照当前实例初始化新的实例
    student.name = self.name;
    student.age = self.age;
    student.address = self.address;
    student.totalScore = self.totalScore;
    
    return student;
}

@end
```
*ViewController.m*

```objective-c
#import "ViewController.h"
#import "StudentModel.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    // 学生1
    StudentModel *stu1 = [[StudentModel alloc] init];
    stu1.name = @"mengxiang";
    stu1.age = @(1);
    stu1.address = @"海淀区";
    stu1.totalScore = @(100);
    
    // 学生2
    StudentModel *stu2 = [stu1 clone];// 应用原型模式
    stu2.name = @"Viking";
    stu2.address = @"Northern Europe";
}

@end
```

#### 4.5.1.3	NSCoping协议的使用细节
>**说明：**`Cocoa`通过`NSCoping`协议为原型模式提供了支持。
>**注意：**
>+ 深拷贝与浅拷贝
>+ 不支持`NSCopying`协议的对象
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1462199219485.png)



### 4.5.2	外观模式

#### 4.5.2.1	如何去一个指定的地方
>**说明：**用来说明外观模式的一个显示场景
>+ 自驾：自己负责路线相关的各种事务
>+ 坐火车：将细节交给黑盒


#### 4.5.2.2	外观模式的原理
>**说明：**就是将细节封装了起来，使用时不需要了解细节
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1462186013642.png)


#### 4.5.2.3	如何绘制复杂的图形
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1462201625961.png)


## 4.6	装饰

`不改变原类，动态地扩展原类的功能`

### 4.6.1	照片与相框
>**课程说明：**通过照片与相框之间的联系，来讲解何为装饰模式。


### 4.6.2	装饰模式的原理

> 基本原理
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1463410189425.png)

> 装饰起模式的优点
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1463410420677.png)

>  装饰模式的使用场景

不知道一个类的实现细节，只知道相关的接口，又需要扩展这个类的功能。

### 4.6.3	实现装饰模式
>**课程说明：**通过一个扩展游戏机手柄行为的事例，来实现装饰模式。
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1463490224877.png)
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1463495040772.png)


### 4.6.4	category的使用
>**课程说明：**讲解 `Cocoa` 框架已经实现的装饰模式，并延伸讲解下如何给 `category` 添加属性。
>**说明：**利用`Objective-C`的动态运行时分配机制，你可以为现有的类添加方法或计算属性，这种机制称为类别(`category`)。
>**注意：**和装饰模式不同，这种扩展方式会导致原类型的改变。

1. 原类型

*GamePad.h*

```objective-c
#import <Foundation/Foundation.h>

@interface GamePad : NSObject

/**
*  上下左右的操作
*/
- (void)up;
- (void)down;
- (void)left;
- (void)right;

/**
 *  选择与开始的操作
 */
- (void)select;
- (void)start;

/**
 *  按钮 A + B + X + Y
 */
- (void)commandA;
- (void)commandB;
- (void)commandX;
- (void)commandY;

@end
```

*GamePod.m*

```objective-c
#import "GamePad.h"

@implementation GamePad
- (void)up {
    
    NSLog(@"up");
}

- (void)down {
    
    NSLog(@"down");
}

- (void)left {
    
    NSLog(@"left");
}

- (void)right {
    
    NSLog(@"right");
}

- (void)select {
    
    NSLog(@"select");
}

- (void)start {
    
    NSLog(@"start");
}

- (void)commandA {
    
    NSLog(@"commandA");
}

- (void)commandB {
    
    NSLog(@"commandB");
}

- (void)commandX {
    
    NSLog(@"commandX");
}

- (void)commandY {
    
    NSLog(@"commandY");
}

@end
```

2. 扩展

*GamePad+Coin.h*

```objective-c
#import "GamePad.h"

@interface GamePad (Coin)

/**
 *  游戏币
 */
@property (nonatomic) NSInteger  coin;

@end
```
*GamePad+Coin.m*

```objective-c
#import "GamePad+Coin.h"
#import <objc/runtime.h>
#import <Foundation/Foundation.h>

@implementation GamePad (Coin)

// 作为类和属性之间的关联key
static const NSString *_coinStr = @"_coinStr";

- (void)setCoin:(NSInteger)coin {
    // 将当前类（GamePad）和 coin 属性关联在一起
    // 也就是额外添加了一个属性
    objc_setAssociatedObject(self, (__bridge const void *)_coinStr, @(coin), OBJC_ASSOCIATION_ASSIGN);
}

- (NSInteger)coin {
    // 通过key扩区绑定到当前类的属性的值
    NSNumber *number = objc_getAssociatedObject(self, (__bridge const void *)_coinStr);
    
    return number.integerValue;
}

@end
```

3. 使用扩展后的GamePod

*ViewController.m*

```objective-c
#import "ViewController.h"
#import "GamePad.h"
#import "GamePad+Coin.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
  
    GamePad *gamePad = [[GamePad alloc] init];
    [gamePad up];
    
    gamePad.coin = 10;
    NSLog(@"coin %ld", (long)gamePad.coin);
}
@end
```

## 4.7	工厂


### 4.7.1	制造手机与使用手机

![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1463587653123.png)


### 4.7.2	简单工厂
> **说明：**将“产品”的生产任务封装在“工厂中”
> 1. 简化生产流程
> 2. 隔离生产产品的细节
> 3. 不同类型产品之间有着一些共同的功能
> 4. 一个具体的工厂
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1463799288205.png)


#### 案例：通过简单工厂获取手机实例
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1463798863229.png)

>源码结构
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1463743818102.png)

>类图：通过

![Alt text|500x500](http://o6ul1xz4z.bkt.clouddn.com/img/1463715567130.png)

>使用

*ViewController.m*

```objective-c
#import "ViewController.h"
#import "DeviceFactory.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    // 通过工厂创建手机
    iPhoneDevice *iPhone = (iPhoneDevice *)[DeviceFactory deviceFactoryWithDeviceType:kiPhone];
    
    // 调用手机功能
    [iPhone fingerprintIndentification];
}

@end
```


### 4.7.3	抽象工厂
>**说明：**`客户端`通过`抽象工厂`创建具体的`工厂`，然后通过具体的`工厂`获取产品。相比简单工厂，抽象工厂多了一层抽象，在很多场景中可以比简单工厂更好地解耦。
>+ 抽象工厂原理
>+ 抽象工厂抽象在哪里
>+ 抽象工厂使用场景


#### 案例：通过工厂管理器获取定制的具体工厂，并通过具体的工厂获取产品
> 源码结构
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1463816866737.png)

> 类图
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1463816799001.png)

> 使用

```objective-c
// 获取工厂
BaseFactory *factory = [FactoryManager factoryWithBrand:kGoogle];

// 创建商品
BasePhone *phone = [factory createPhone];
BaseWatch *watch = [factory createWatch];

NSLog(@"%@ %@", phone, watch);
```


### 4.7.4	Cocoa 框架中的 NSNumber
>**说明：**`NSNumber`本身是一个抽象工厂类，直接通过该类`init`一个实例会获得一个`nil`。`NSNumber`提供了一系列工厂方法来获取针对具体数值类型的工厂。
>**注意：**`NSNumber`是针对`数值`的抽象工厂，产品是各种`数值`类型，而且这些`数值`之间可以进行类型转换。

```objective-c
// 由于NSNumber是一个抽象工厂，这里只会返回一个 nil
NSLog(@"%@", [[NSNumber alloc] init]);

// 创建具体的工厂实例
NSNumber *number = [NSNumber numberWithInt:100];// 通过Int类型的100获取一个工厂实例
NSNumber *floatValue = [NSNumber numberWithFloat:100.f];// 通过浮点数100.f获取一个工厂实例

// 使用工厂实例生产具体的产品（具体类型的数字）
NSLog(@"%c", [number charValue]);
NSLog(@"%c", [floatValue charValue]);
```


## 4.8	桥接
>**说明：**两类存在通信的实体，其实例实现各自的协议，两类实体的实例就可以正确通信。这种设计方式解耦了通信协议的定义和具体实例的实现。


### 4.8.1 遥控器与电视机
>**例子：**为遥控器和电视机分别定义了协议，采纳了协议的具体的遥控器和电视机之间只需完成各自的实现。
![Alt text|400x250](http://o6ul1xz4z.bkt.clouddn.com/img/1463818469080.png)


### 4.8.2 桥接模式原理
>**目的：** 把抽象层次结构从具体的实现分离出来，使其能够独立变更。
>**抽象层：**定义了共客户端使用的上层抽象接口。
>**实现层：**定义了供抽象层使用的底层接口。
>**桥接：**实现类的引用被封装到抽象层的实例中，桥接就形成了。

![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1463839147515.png)


### 4.8.3 设计游戏机模拟器
+ 游戏机模拟器的功能定义
+ 按钮协议的制定
+ 游戏机模拟器的实现
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1463839248044.png)


#### 案例
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1463845234221.png)

```objective-c
/* GBA系统 ＋ GBA执行器 */
// 创建GBA系统
AbstractSystem *gbaSystem = [[GBASystem alloc] init];
// 设置GBA执行器
gbaSystem.implementor = [[GBAImplementor alloc] init];
// 启动系统
[gbaSystem loadSystem];


/* PSP系统 ＋ PSP执行器 */
// 创建PSP系统
AbstractSystem *pspSystem = [[PSPSystem alloc] init];
// 设置PSP执行器
pspSystem.implementor = [[PSPImplementor alloc] init];
// 启动系统
[pspSystem loadSystem];
```


## 4.9	代理

### 4.9.1 代理模式
>**说明：**当一个对象和另一个对象必然耦合的时候，为了降低这种耦合，可以选择和代理对象耦和。代理对象可以是实现了代理协议的任意对象，由于采纳代理协议的对象相比具体对象更灵活且可配置，从而降低了耦和度。
>**注意：**代理对象建议修饰为`weak`，从而有助于减低消耗。

![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1464019108656.png)


#### 案例：顾客和经销商
>顾客的购买行为代理给经销商

![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1463899846934.png)

*Customer.h*

```objective-c
#import <Foundation/Foundation.h>

@class Customer;
// 代理协议
@protocol CustomerDelegate <NSObject>

@required
- (void)customer:(Customer *)customer buyItemCount:(NSInteger)count;

@end


@interface Customer : NSObject

// 代理对象(经销商)
@property (nonatomic, weak) id <CustomerDelegate> delegate;

// 购买
- (void)buyItemCount:(NSInteger)count;

@end
```

*Cosutomer.m*

```objective-c
#import "Customer.h"

@implementation Customer

- (void)buyItemCount:(NSInteger)count {
    // 确保设置了代理对象，且代理对象正确采纳了协议
    if (self.delegate && [self.delegate respondsToSelector:@selector(customer:buyItemCount:)]) {
        [self.delegate customer:self
                   buyItemCount:count];
    }
}
@end
```

*Dealer.h*

```objective-c
#import <Foundation/Foundation.h>
#import "Customer.h"

@interface Dealer : NSObject <CustomerDelegate>

@end
```

*Dealer.m*

```objective-c
#import "Dealer.h"

@implementation Dealer

// 采纳协议，实现方法
- (void)customer:(Customer *)customer buyItemCount:(NSInteger)count {
    NSLog(@"%ld", (long)count);
}

@end
```


#### 使用
*ViewController.m*

```objective-c
#import "ViewController.h"
#import "Customer.h"
#import "Dealer.h"

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    // 顾客
    Customer *customer = [[Customer alloc] init];
    // 经销商
    Dealer *dealer = [[Dealer alloc] init];
    
    // 将经销商实例做为代理对象
    customer.delegate = dealer;
    
    // 客户购买（会代理到dealer的相应方法去处理）
    [customer buyItemCount:5];
}

@end
```


### 4.9.2 代理与协议
> `代理对象`本质上是`让对象采纳协议`的一种特殊情况。和单纯要求对象采纳某种协议相比，代理对象承担者完成代理任务的同时降低与被调用者之间的耦和度的职能。


#### 案例：单纯使用协议
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1463922342138.png)

*TCPProtocol.h*
> **说明：**定义协议

```objective-c
#import <Foundation/Foundation.h>

@protocol TCPProtocol <NSObject>
@required
// 获取源端口号
- (NSInteger)sourcePort;
// 获取目的地端口号
- (NSInteger)destinationPort;

@end
```

*Model.h*
> **说明：**采纳协议

```objective-c
#import <Foundation/Foundation.h>
#import "TCPProtocol.h"
@interface Model : NSObject <TCPProtocol>

@end
```

*Model.m*
>**说明：**实现协议

```objective-c
#import "Model.h"

@implementation Model

- (NSInteger)sourcePort {
    return 10;
}

- (NSInteger)destinationPort {
    return 20;
}

@end
```

*ViewCnotroller.m*

```objective-c
#import "ViewController.h"
#import "TCPProtocol.h"
#import "Model.h"

@interface ViewController ()

@property (nonatomic) NSInteger sourcePort;
@property (nonatomic) NSInteger destinationPort;

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    // 获取 tcp 数据源
    Model *tcpData = [[Model alloc] init];
    // 通过 tcp 数据源获取 tcp 数据
    [self accessTCPData:tcpData];
}

/**
 *  获取 tcp 数据
 *
 *  @param data 采纳了 TCP 协议的数据
 */
- (void)accessTCPData:(id <TCPProtocol>)data {
    self.sourcePort = [data sourcePort];
    self.destinationPort = [data destinationPort];
}

@end

```

### 4.9.3 用NSProxy 实现的代理模式
> `NSProxy`：没有父类，和`NSObject`是一个级别的
> **用途：**可以方便地向代理对象发送一系列消息。


#### 案例

![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1464018921308.png)

```objective-c
// 创建代理
ConcreteProxy *proxy = [ConcreteProxy alloc];
// 设置代理对象
proxy.delegate = self;

// 派发消息
[proxy helloWorld];
[proxy goodBye];
```

## 4.10	单例

### 4.10.1 单例模式

#### 单例模式的基本原理
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1464186654392.png)

#### 单例模式用以解决何种问题
> 保证某个类只会存在一个全局的实例，全局共享


#### 单例模式的优缺点
+ 优点：共享实例
+ 缺点：使使用到单例实例的类之间耦和在一起


#### 案例：存储用户信息的单例类

*UserInfoManagerCenter.h*

```objective-c
#import <Foundation/Foundation.h>

@interface UserInfoManagerCenter : NSObject

@property (nonatomic, strong) NSString *name;
@property (nonatomic, strong) NSNumber *age;

+ (instancetype)managerCenter;

@end
```

*UserInfoManagerCenter.m*

```objective-c
#import "UserInfoManagerCenter.h"

@implementation UserInfoManagerCenter

/**
 *  获取单例
 *
 *  @return 单例实例
 */
+ (instancetype)managerCenter {
    // 使用全局变量保存单例实例
    static UserInfoManagerCenter *center = nil;
    static dispatch_once_t predict;
    
    // 只执行一次
    dispatch_once(&predict, ^{
        center = [[UserInfoManagerCenter alloc] init];
    });
    
    return center;
}

@end
```

*使用*

```objective-c
UserInfoManagerCenter *center = [UserInfoManagerCenter managerCenter];
NSLog(@"%@", center.name);
```


### 4.10.2 编写严格的单例
> **要点**
> + 防止继承：在`init`构造器中判断当前类名，当子类调用`init`或工厂方法创建实例时中断程序
> + 确保实例对象只出现一个：限制`init`构造器只能在获取实例的工厂方法中调用，而且只调用一次

*UserInfoManagerCenter.h*

```objective-c
#import <Foundation/Foundation.h>

@interface UserInfoManagerCenter : NSObject
@property (nonatomic, strong) NSString *name;
@property (nonatomic, strong) NSNumber *age;
+ (instancetype)managerCenter;
@end
```

*UserInfoManagerCenter.m*

```objective-c
#import "UserInfoManagerCenter.h"
static UserInfoManagerCenter *center = nil;
@implementation UserInfoManagerCenter

+ (instancetype)managerCenter {
    static dispatch_once_t predicate;
    
    // 只执行一次
    dispatch_once(&predicate, ^{
        center = (UserInfoManagerCenter *)@"UserInfoManagerCenter";
        center = [[UserInfoManagerCenter alloc] init];
    });
    
    /* 防止子类使用 */
    // 获取当前实例的类名
    NSString *classString = NSStringFromClass([self class]);
    // 是子类调用该方法则中断程序
    if ([classString isEqualToString:@"UserInfoManagerCenter"] == NO) {
        NSParameterAssert(nil);
    }
    return center;
}

- (instancetype)init {
    NSString *string = (NSString *)center;
    if ([string isKindOfClass:[NSString class]] == YES && [string isEqualToString:@"UserInfoManagerCenter"]) {
        
        if (self = [super init]) {
            /* 防止子类使用 */
            NSString *classString = NSStringFromClass([self class]);
            if ([classString isEqualToString:@"UserInfoManagerCenter"] == NO) {
                NSParameterAssert(nil);
            }
        }
        return self;
    }
    else {
        return nil;
    }
}
@end
```

```objective-c
/* 正确获取单例的方法 */
UserInfoManagerCenter *center = [UserInfoManagerCenter managerCenter];

/* 无效的方式:会引起程序崩溃 */
NSLog(@"%@", [NewManagerCenter managerCenter]);// 试图创建子类实例
NSLog(@"%@", [[UserInfoManagerCenter alloc] init]);// 试图直接调用构造器
```


### 4.10.3 优化本地存储
>**要点**
>+ 用单例设计存储数据接口
>+ 用单例接口隔离实现细节
>+ 在单例提供接口的基础上进行上层封装

> **扩展：**使用[ FastCoding ](https://github.com/nicklockwood/FastCoding)替代`NSCoding`存储数据
> **注意：**启用`ARC`时`FastCoding`运行会比较慢，建议关闭
> + 文件启用了`ARC`是代码给出了警告
> ![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1464361708327.png)
> + 通过关闭`FastCoder`对应的文件的`ARC`清除警告
> ![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1464362026510.png)


![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1464364328834.png)

```objective-c
// 将相对复杂的对象数据存储到用户首选项（借由对象的扩展）
StudentModel *student = [[StudentModel alloc] init];
student.name = @"A";
NSArray *array = @[[InfoModel new], [InfoModel new], [InfoModel new]];
student.datas = array;
[student storeValueWithKey:@"FastCoding"];

// 从用户首选项中取出数据
StudentModel *tmpStudent = [StudentModel valueByKey:@"FastCoding"];
NSLog(@"%@", tmpStudent.name);
NSLog(@"%@", tmpStudent.datas);
```


## 4.11	备忘录

### 4.11.1	如何存储记录
> **课程说明：**用几个简单的示例来说明如何存储纪录，并引申出什么是备忘录模式。

+ 存储记录的必要性
+ 记录的唯一标识符
+ 存储纪录和取出记录
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1464447294270.png)


### 4.11.2 备忘录模式
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1464417280472.png)
+ 设计存储中心
+ 制定存储接口
+ 实现存储机制


### 4.11.3	优化存储方案
+ 统一存储规范
+ 实现灵活多变的存储机制

![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1464445381861.png)

```objective-c
// 创建对象
Apple *apple = [[Apple alloc] init];
apple.name = @"laputa-er";
apple.age = @(30);

// 存储此时的状态
[apple saveStateWithKey:@"birth"];

// 恢复到指定的状态
[apple recoverFromStateWithKey:@"birth"];
```

### 4.11.4	恢复 UIView 的状态
>**摘要：**可以借助上面实现的备忘录模式存储／恢复`UIView`的状态。


#### 存储UIView的问题
1. `UIView`实现了`NSCoding`协议，但没有实现`NSCopy`协议。所以，`UIView`可以被存储下来，但无法拷贝副本
2. `NSCoding`协议只能存储对象的所有数据，不能仅存储特定的状态数据（比如`frame`值）


#### 使用备忘录模式

```objective-c
// 创建 UIView
DemoView *demoView = [[DemoView alloc] init];
demoView.frame = CGRectMake(100, 100, 100, 100);

// 存储此时的状态
[demoView saveStateWithKey:@"A"];

// 恢复状态
[demoView recoverFromStateWithKey:@"A"];
```


## 4.12	生成器
>**说明：**有时，构建某些对象有多种不同的方式。如果这些逻辑包含在构建这些对象的类的单一方法中，构建的逻辑会非常的荒唐（例如，针对各种构建需求的一大片 `if-else` 或者 `switch-case` 语句）。如果能够把构建过程分解为`客户-指导者-生成器`的关系，那么过程将更容易管理与复用。针对此类关系的设计模式称为`生成器`。

### 4.12.1 建造房子的承包商 
>**课程说明：**本课时用一个生活中建造房子例子说明并引申出何为生成器模式
>+ 如何建造房子
>+ 建造过程的模块化处理 
>+ 不同模块找不同的承包商

>**使用生成器模式的优点：**
>+ 不需要知道细节
>+ 模块化处理
>+ 很好的组合特性
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1464934489331%E7%94%9F%E6%88%90%E5%99%A8%E6%A8%A1%E5%BC%8F.png)


### 4.12.2 生成器模式
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1464447882554.png)


### 4.12.3 制造汽车的流程
>**说明：**使用生成器模式来制造一辆汽车。
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1464500610532.png)
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1464500840393.png)

```objective-c
// 创建组装着（指挥者）
self.builder = [[Builder alloc] init];

// 指定承包商
self.builder.engine = [[YEngine alloc] init];
self.builder.wheels = [[Wheels alloc] init];
self.builder.door = [[Door alloc] init];

// 构件所有部件
[self.builder buildAllParts];

// 获取产品信息
NSLog(@"%@", self.builder.productsInfo);
```

## 4.13	命令
>**命令模式：**在软件系统中，`行为请求者`与`行为执行者`通常呈现一种“紧耦合”。但在某些场合，比如要对行为进行`记录、撤销/重做、事务`等处理，这种无法抵御变化的紧耦合是不合适的。在这种情况下，如何将`行为请求者`与`行为执行者`解耦，将行为抽象成对象，实现两者之间的松耦合，这就是我们这门课程所要讲的`命令模式`。 

### 4.13.1 电视机、遥控器与接收器之间的关系
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1464934489331%E5%85%B3%E7%B3%BB%E5%9B%BE.png)


+ 遥控器与接收器并非必要的设备
+ 接收器转换遥控器的信号
 

### 4.13.2 命令模式
+ 命令的发送者和命令的执行者之间完全解耦
+ 命令可以回退（撤销）

![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1464515129490.png)



### 4.13.3 改变一个视图的明暗程度
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1464934489331xcode.gif)
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1464531258992.png)

```objective-c
#import "ViewController.h"
#import "Receiver.h"
#import "Invoker.h"
#import "DarkerCommand.h"
#import "LighterCommand.h"

/**
 按钮的tag
 */
typedef enum : NSInteger {
    kAddButtonTag = 10, // 增加按钮tag枚举值
    kDelButtonTag, // 减少按钮tag枚举值
    kRolButtonTag, // 回退按钮tag枚举值
} ViewControllerEnumValue;

@interface ViewController ()
@property (nonatomic, strong) UIButton *addButton;// 增加亮度按钮
@property (nonatomic, strong) UIButton *delButton;// 减少亮度按钮
@property (nonatomic, strong) UIButton *rolButton;// 退回按钮

@property (nonatomic, strong) Receiver *receiver;

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
 
    // 初始化接收器
    self.receiver = [[Receiver alloc] init];
    self.receiver.clientView = self.view;// 关联客户端视图（遥控器）
    
    // 初始化按钮
    [self initButtons];
}

/**
 *  初始化按钮
 */
- (void)initButtons {
    /*1. 初始化按钮*/
    // 减少亮度按钮
    self.delButton = [[UIButton alloc] initWithFrame:CGRectMake(10, 25, 30, 30)];
    self.delButton.tag = kDelButtonTag;
    self.delButton.layer.borderWidth = 1.f;
    
    [self.delButton setTitle:@"-"
                    forState:UIControlStateNormal];
    [self.delButton setTitleColor:[UIColor redColor]
                         forState:UIControlStateNormal];
    
    // 增加亮度按钮
    self.addButton = [[UIButton alloc] initWithFrame:CGRectMake(10 + 40, 25, 30, 30)];
    self.addButton.tag = kAddButtonTag;
    self.addButton.layer.borderWidth = 1.f;
    
    [self.addButton setTitle:@"+"
                    forState:UIControlStateNormal];
    [self.addButton setTitleColor:[UIColor redColor]
                         forState:UIControlStateNormal];
    // 回退按钮
    self.rolButton = [[UIButton alloc] initWithFrame:CGRectMake(10 + 80, 25, 90, 30)];
    self.rolButton.tag = kRolButtonTag;
    self.rolButton.layer.borderWidth = 1.f;
    
    [self.rolButton setTitle:@"回退"
                    forState:UIControlStateNormal];
    [self.rolButton setTitleColor:[UIColor redColor]
                         forState:UIControlStateNormal];
    
    /*2. 注册事件*/
    [self.delButton addTarget:self
                       action:@selector(buttonEvent:)
             forControlEvents:UIControlEventTouchUpInside];
    [self.addButton addTarget:self
                       action:@selector(buttonEvent:)
             forControlEvents:UIControlEventTouchUpInside];
    [self.rolButton addTarget:self
                       action:@selector(buttonEvent:)
             forControlEvents:UIControlEventTouchUpInside];
    
    
    /*3. 添加到视图*/
    [self.view addSubview:self.delButton];
    [self.view addSubview:self.addButton];
    [self.view addSubview:self.rolButton];
}

/**
 *  为按钮绑定事件
 *
 *  @param button 需要绑定事件的按钮
 */
- (void)buttonEvent:(UIButton *)button {
    if (button.tag == kAddButtonTag) {
        NSLog(@"增加亮度");
        LighterCommand *command = [[LighterCommand alloc] initWithReceiver:self.receiver
                                                                 parameter:0.1];
        [[Invoker shareInstance] addAndExcute:command];// 添加并执行命令
    }
    else if (button.tag == kDelButtonTag) {
        NSLog(@"减少亮度");
        DarkerCommand *command = [[DarkerCommand alloc] initWithReceiver:self.receiver
                                                                paramter:0.1];
        [[Invoker shareInstance] addAndExcute:command];
    }
    else if (button.tag == kRolButtonTag) {
        NSLog(@"回退操作");
        [[Invoker shareInstance] rollBack];
    }
}
@end
```

## 4.14	组合
>**说明：**将对象组合成树形结构以表示`部分-整体`的层次结构，组合模式使得用户对单个对象和组合对象的使用具有一致性。组合设计模式可以解决某些线性结构无法解决的难题（如编写文件夹目录结构等类似问题），掌握它具有很实用的意义。 


### 4.14.1	树形结构
>**课程说明：**讲解树形结构，并实现一个简易的二叉树，对于后续的组合设计模式的理解很有帮助。
+ 树形结构原理
+ 简易的二叉树
+ 用递归遍历树形结构节点

![Alt text|200x300](http://o6ul1xz4z.bkt.clouddn.com/img/1464533251952.png)

*Node.h*

```objective-c
#import <Foundation/Foundation.h>

@interface Node : NSObject
/**
 *  当前节点名
 */
@property (nonatomic, strong) NSString *nodeName;

/**
 *  左节点
 */
@property (nonatomic, strong) Node *leftNode;

/**
 *  右节点
 */
@property (nonatomic, strong) Node *rightNode;

/**
 *  便利构造器
 *
 *  @param nodeName 节点名字
 *
 *  @return 节点
 */
+ (instancetype)nodeWithName:(NSString *)nodeName;
@end
```

*Node.m*

```objective-c
#import "Node.h"

@implementation Node

+ (instancetype)nodeWithName:(NSString *)nodeName {
    // 创建节点实例（考虑子类的情况，使用 self class 创建实例）
    Node *node = [[[self class] alloc] init];
    node.nodeName = nodeName;
    
    return node;
}

@end
```

*ViewController.m*

```objective-c
#import "ViewController.h"
#import "Node.h"

@interface ViewController ()

/**
 *  根节点
 */
@property (nonatomic, strong) Node *rootNode;

@end

@implementation ViewController

- (void)viewDidLoad {
    
    [super viewDidLoad];
    
    // 创建根节点
    self.rootNode = [Node nodeWithName:@"A"];
    
    // 插入节点
    [self insertNodeTree:self.rootNode node:[Node nodeWithName:@"B"]];
    [self insertNodeTree:self.rootNode node:[Node nodeWithName:@"C"]];
    [self insertNodeTree:self.rootNode node:[Node nodeWithName:@"D"]];
    [self insertNodeTree:self.rootNode node:[Node nodeWithName:@"E"]];
    [self insertNodeTree:self.rootNode node:[Node nodeWithName:@"F"]];
    
    // 遍历二叉树
    [self treeInfomationWithNode:self.rootNode];
}

/**
 *  往根节点上插入节点
 *
 *  @param tree 根节点
 *  @param node 被插入的节点
 */
- (void)insertNodeTree:(Node *)tree node:(Node *)node {

    if (tree.leftNode == nil) {
        
        tree.leftNode = node;
        return;
    }
    
    if (tree.rightNode == nil) {
        
        tree.rightNode = node;
        return;
    }
    
    [self insertNodeTree:tree.leftNode node:node];
}

/**
 *  遍历二叉树
 *
 *  @param node 根节点
 */
- (void)treeInfomationWithNode:(Node *)node {

    if (node.leftNode) {
        
        [self treeInfomationWithNode:node.leftNode];
    }
    
    NSLog(@"%@", node.nodeName);
    
    if (node.rightNode) {
        
        [self treeInfomationWithNode:node.rightNode];
    }
}

@end
```

### 4.14.2	组合模式
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1464611058484.png)

*Node.h*

```objective-c
#import <Foundation/Foundation.h>

@interface Node : NSObject
/**
 *  节点名字
 */
@property (nonatomic, strong) NSString *nodeName;

/**
 *  便利构造器
 *
 *  @param nodeName 节点名字
 *
 *  @return 节点
 */
+ (instancetype)nodeWithNodeName:(NSString *)nodeName;

@property (nonatomic, strong, readonly) NSMutableArray <Node *>*childNodes;

/**
 *  添加子节点
 *
 *  @param nodes 节点
 */
- (void)addNode:(Node *)nodes;

/**
 *  删除字节点
 *
 *  @param node 节点
 */
- (void)removeNode:(Node *)node;

- (Node *)nodeAtIndex:(NSInteger)index;

/**
 *  打印 Node
 */
- (void)operation;

@end
```

*Node.m*

```objective-c
#import "Node.h"
@interface Node ()
/**
 *  子节点集合
 */
@property (nonatomic, strong) NSMutableArray <Node *>*childNodes;

@end

@implementation Node

- (instancetype)init {
    if (self = [super init]) {
        self.childNodes = [NSMutableArray array];
    }
    return self;
}

+ (instancetype)nodeWithNodeName:(NSString *)nodeName {
    Node *node = [[[self class] alloc] init];
    node.nodeName = nodeName;
    return node;
}

- (void)addNode:(Node *)node {
    [self.childNodes addObject:node];
}

- (void)removeNode:(Node *)node {
    [self.childNodes removeObject:node];
}

- (Node *)nodeAtIndex:(NSInteger)index {
    if (index >= self.childNodes.count) {
        return nil;
    }
    else {
        return self.childNodes[index];
    }
}
- (void)operation {
    NSLog(@"nodeName --> %@", self.nodeName);
}

- (NSString *)description {
    return [NSString stringWithFormat:@"[Node] - %@", self.nodeName];
}

@end
```

*ViewController.m*

```objective-c
#import "Node.h"
@interface Node ()
/**
 *  子节点集合
 */
@property (nonatomic, strong) NSMutableArray <Node *>*childNodes;

@end

@implementation Node

- (instancetype)init {
    if (self = [super init]) {
        self.childNodes = [NSMutableArray array];
    }
    return self;
}

+ (instancetype)nodeWithNodeName:(NSString *)nodeName {
    Node *node = [[[self class] alloc] init];
    node.nodeName = nodeName;
    return node;
}

- (void)addNode:(Node *)node {
    [self.childNodes addObject:node];
}

- (void)removeNode:(Node *)node {
    [self.childNodes removeObject:node];
}

- (Node *)nodeAtIndex:(NSInteger)index {
    if (index >= self.childNodes.count) {
        return nil;
    }
    else {
        return self.childNodes[index];
    }
}
- (void)operation {
    NSLog(@"nodeName --> %@", self.nodeName);
}

- (NSString *)description {
    return [NSString stringWithFormat:@"[Node] - %@", self.nodeName];
}

@end
```

### 4.14.3 编写文件夹系统
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1464616045947.png)
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1464676034326.png)


## 4.15	迭代器
> 提供一种方法顺序访问一个聚合对象中的各种元素，而又不暴露该对象的内部表示，这种模式叫迭代器模式，`Cocoa` 框架中的 `NSEnumerator` 就是迭代器模式的具体实现。学习迭代器模式有助于理解线性表结构的常规使用，对于优化具备线性表结构的类有实际意义。 


### 4.15.1 线性表
> **课程说明：**讲解常用线性表基本原理，对于理解何为迭代器模式很有帮助。
> **线性表：**线性表中数据元素之间的关系是一对一的关系，即除了第一个和最后一个数据元素之外，其它数据元素都是首尾相接的（注意，这句话只适用大部分线性表，而不是全部。比如，循环链表逻辑层次上也是一种线性表（存储层次上属于链式存储），但是把最后一个数据元素的尾指针指向了哨位结点）。

![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1464700648380.png)

> 栈和队列就是典型的线性表
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1464700681237.png)



### 4.15.2 迭代器模式
> **课程说明：**讲解迭代器模式基本原理，并简单介绍下 `Cocoa` 框架已经实现的迭代器。

![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1464708309582.png)

```objective-c
/* 系统自身的集合和迭代器 */
// 创建集合对象
NSArray *datas = @[@"A", @"B", @"C", @"D"];

// 从集合对象创建迭代器
NSEnumerator *iterator = [datas objectEnumerator];

// 通过迭代器访问元素
id arrObj = nil;
while (arrObj = [iterator nextObject]) {
   NSLog(@"%@", arrObj);
}

/* 自定义的集合和迭代器 */
self.list = [[LinkedList alloc] init];
[self.list addItem:@"A"];
[self.list addItem:@"B"];
[self.list addItem:@"C"];
[self.list addItem:@"D"];

// 从集合对象创建迭代器
LinkedListIterator *linkedIterator = [LinkedListIterator linkedListIteratorWithLinkedList:self.list];

// 通过迭代器遍历元素
Node *node = nil;
while (node = [linkedIterator nextObject]) {
   NSLog(@"%@", node.item);
}
```

### 4.15.3 实现组合对象的迭代器
> **课程说明：**实现一个组合对象的迭代器，并遍历出该组合对象中我们需要关心的元素。
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1464751736763.png)

```objective-c
CustomUIView *customUIView = [[CustomUIView alloc] initWithFrame:self.view.bounds];
Node *node = nil;

[customUIView resetIterator];
while (node = [customUIView nextObject]) {
    NSLog(@"%@", node.item);
}
```

