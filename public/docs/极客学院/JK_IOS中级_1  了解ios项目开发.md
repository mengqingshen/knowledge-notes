---
title: 1 了解ios项目开发
categories:
  - 极客学院_ios中级
toc: true
---


## 1.1	ios开发前准备

### 1.1​    苹果公司介绍
>**重要事件**
1976年创立
1976年推出Apple 1
1977年推出Apple 2
1980年推出Apple 3
1983年推出Apple Lisa
1984年推出Macintosh
1991年推出PowerBook，2006年被MacBook系列取代
1993年推出Apple Newton掌上电脑（已死）

>**苹果电脑**
1998年推出iMac
2005年推出Mac mini
2006年推出Mac Pro
2006年推出MacBook（已死）
2008年推出MacBook air

>**苹果音乐播放器**
2001年推出ipod
2004年推出iPod Mini
2005年推出iPod nano、iPod Shuffle
2007年推出iPod Classic、iPod Touch

>**苹果手机产品**
2007年推出iPhone
2008年推出iPhone 3G
2009年推出iPhone 3GS
2010年推出iPhone 4
2011年推出iPhone 4s
2012年推出iPhone 5
2013年推出iPhone 5s、iPhone 5c

>**苹果公司平板电脑**
2010年推出iPad
2011年推出iPad2
2012年推出iPad Mini

>**苹果电视**
2006年发布Apple TV


### 1.1.2  苹果Mac OX 操作系统介绍
>**历史版本**
2001年从Macintosh电脑上分离出来成为OS X10.0
2001年推出OS X 10.1
2002年推出OS X 10.2、10.3
2005年推出OS X 10.4
2006年推出OS X 10.5
2008年推出OS X 10.6
2010年推出OS X 10.7(App Store)
2012年推出OS X 10.8
2013年推出OS X 10.9(后台程序省电优化、内存压缩技术)
2014年推出OS X 10.10

>**OS X系统结构**
>![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1451260954919.png)


### 1.1.3    苹果ios操作系统
>**历史版本**
2007年发布iPhone Runs OS X
2008年改名为iPhone OS
2010年改名为ios，发布ios4（多任务）
2011年发布ios5
2012年发布ios6
2013年发布ios7(扁平化)
2014年发布ios8

>**ios系统结构**
>![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1451260989517.png)

        

### 1.1.4    软硬件开发环境要求
>**硬件环境**
CPU双核
内存8G
最好选择Macbook Pro,也可以使用Macbook Air
测试手机iPhone 5+(发布)

>**环境要求**
OS X 10.9.3+
Xcode 6.0+


## 1.2	Xcode继承开发环境的安装使用与项目建立流程

### 1.2.1    xcode的下载和安装
>**说明：**两种方式
>+ AppStore
>+ 开发者中心下载链接：https://developer.apple.com/xcode/downloads


### 1.2.2    xcode创建ios single view项目

### 1.2.3    工作空间创建和使用

### 1.2.4    xcode快捷键及常用功能
>**常用**


|快捷键|说明|
|-|-|
|option + cmd + 向上箭头 |m/h文件切换|
|ctrl + a |光标移动到行头|
|ctrl + e |光标移动到行末|
|command + G|查找下一个|
|command + w|关闭一个文件|
|option + command + m |窗口最小化|
|command + /  |注释|

>**调试**

|快捷键|说明|
|-|-|
|alt + command + y| degug 调试|
|alt + command + R |Run运行|
|alt + command + p|到下一个断点|
|shift + cmd + o |执行下一步(step over)|
|shift + cmd + i| 执行进入函数(step into)|
|shift + cmd + t |step out|
|command + / |取消断点|
|command + shift + F| 查找|
|command + enter |等于bulid and debug|

>**移动**

|快捷键|说明|
|-|-|
|control＋F  | 在同一行上将光标向右移动|
|control＋B |在同一行上将光标向左移动|
|control＋P |  将光标移动到前一行|
|control＋N | 将光标移动到后一行|
|control＋A |将光标移动到本行的行首|
|control＋N |将光标移动到本行的行尾|
|control＋T |将光标两边的字符对调|
|control＋D |删除光标右边的字符|
|control＋k 删除光标所在行 光标后面的代码，便于你重写行尾代码|
|control + L |将光标插点置于窗口正中|

>**缩进**
>+ 第一种方法：选中需要缩进的代码，按住control键后单击光标，出现pop菜单，然后选择Re-indent selection。
>+ 第二种方法：选择需要调整的代码，同时按下`command＋［ （左移动代码）`或 `command＋］（右移动代码）`。


### 1.2.5    xcode中创建os x命令行控制台项目

### 1.2.6    xcode中创建os x窗体程序项目

### 1.2.7    xcode中创建os x游戏项目

### 1.2.8    xcode中创建ios游戏项目

## 1.3	Xcode常用项目模版
>**说明：**`5`种
>+ Master-Detail Application：`列表页-详情页`类型
>+ Page-Based Application：`电子书`类型
>+ Single View Application：
>+ Tabbed Application
>+ Game

### 1.3.1	Master-Detail Application
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202015-12-28%20%E4%B8%8A%E5%8D%888.26.53.png)


### 1.3.2	Page-Based Application
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202015-12-28%20%E4%B8%8A%E5%8D%888.38.45.png)


### 1.3.3	Tabbed Application
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202015-12-28%20%E4%B8%8A%E5%8D%888.56.30.png)


## 1.4	ios用户界面开发基本流程

### 1.4.1	StoryBoard的基本使用方法
>**说明：**`Storybiard(故事版)`是`Xcode4.2`才开始支持的，为了使设计`View`更加容易。

+ 可以在`Info.plist`文件中设置应用启动时首次加载的`storyboard`
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-02-04%20%E4%B8%8B%E5%8D%885.08.53.png)
+ 一个应用中可以有多个`storyboard`
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-02-06%20%E4%B8%8B%E5%8D%8810.48.12.png)
+ `storyboard`中指出了首先会被加载的`view`
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-02-06%20%E4%B8%8B%E5%8D%8811.42.10.png)
+ 查看视图控制器绑定的类
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-02-06%20%E4%B8%8B%E5%8D%8811.48.33.png)
+ 在多个视图之间建立动作关联
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/JK_IOS_S1_xcode-storyboard-1.gif)


### 1.4.2	图片控件
>**说明：**在`xcode`中图片控件的创建和使用

1. 将本地的图片拖入到项目中
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/JK_IOS_S1_xcode-img.gif)
2. 创建`Image View`
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/JK_IOS_S1_xcode-img-02.gif)

### 1.4.3	ios UI界面设计中传统方法和Assistant editor绑定代码
>**说明：**`程序`和`控件`的绑定，有两种方式

#### 方式1：ios UI界面设计中传统方法
>**说明：**步骤如下
>1. 在`Controller`中定义`@IBOutlet`修饰的引用控件的属性
>2. 通过拖动建立`@IBOutlet`引用的控件和属性所在类文件之间的关联
>3. 在`Controller`中通过`@IBOutlet`属性使用控件
>
>![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/JK_IOS_S1_xcode-bind.gif)

#### 方式2：借助`Assistant editor`绑定代码
>**说明：**步骤如下
>1. 打开辅助窗口
>2. 拖线
>3. 设置关联
>4. connect
>
>![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/JK_IOS_S1_xcode-bond2.gif)


### 1.4.4	ios Story Board控制事件绑定
>**说明：**步骤如下
>1. 编写`@IBAction`
>2. 在`storyboard`中通过拖动在控件与`controller`中相应的`IBAction`之间建立关联
>
>![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/JK_IOS_S1_xcode-event.gif)

```objective-c
import UIKit

class ViewController: UIViewController {
	// 和按钮建立关联的点击事件响应函数
    @IBAction func btnClicked(sender:AnyObject) {
        print("clicked")
    }
    ...
}
```

### 1.4.5	iOS Storyboard控件与Swift类绑定
>**说明：**新添加的`Storyboard`控件默认并没有和自定义的类绑定，和自定义的类绑定就可以通过代码自定义该控件
>1. 设置绑定的类的类名
>![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-02-09%20%E4%B8%8B%E5%8D%8811.53.07.png)
>2. 对应的自定义类中要实现父类的必要构造器（如果有的话）

```objective-c
import UIKit
class MyViewController: UIViewController {
    // 必须重写该 必要构造器
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }
	...
}
```

### 1.4.6	ios源代码添加控件

```objective-c
import UIKit

class MyViewController: UIViewController {
	...
    override func viewDidLoad() {
        super.viewDidLoad()

        // 创建一个控件
        var label = UILabel(frame: CGRect(x: 50, y: 50, width: 200, height: 100))
        // 设置控件
        label.text = "Hello jikexueyuan"
        // 将控件添加到视图
        view.addSubview(label)
    }
	...
```

### 1.4.7	ios浏览器开发制作
>**说明：**需要解决`http`请求受限的问题
>![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-02-10%20%E4%B8%8A%E5%8D%881.55.08.png)

![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-02-10%20%E4%B8%8A%E5%8D%881.54.48.png)
![Alt text](./屏幕快照 2016-02-10 上午1.59.15.png)

## 1.5	ios自定义控件实例

### 1.5.1	配置iOS自定义控件属性
>**说明：**`Xcode`提供的所有控件都可以在`Storyboard`中进行一系列的配置。
>![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-02-10%20%E4%B8%8B%E5%8D%886.02.15.png)


![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/JK_IOS_S1_xcode-button.gif)

### 1.5.2	自定义原型进度指示控件实例
>**说明：**使用绘图`API`编写自定义一个进度条控件
>![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-02-10%20%E4%B8%8B%E5%8D%8811.38.03.png)![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/JK_IOS_S1_xcode-progress.gif)

`ProgressBar.swift`

```objective-c
import UIKit

class ProgressBar: UIView {
    override init(frame: CGRect) {
        super.init(frame: frame)
        // 设置背景透明
        self.backgroundColor = UIColor(white: 1, alpha: 0)
    }

    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }
    
    // 进度值
    private var _progressValue: CGFloat = 0
    
    // 注意：不可以在某个实体中定义访问级别更高的实体
    internal func getProgressValue() -> CGFloat {
        return _progressValue
    }
    
    internal func setProgressValue (value: CGFloat) {
        _progressValue = value
        
        // 改变值后需要重绘
        setNeedsDisplay()
    }
    
    // 控件绘制函数
    // Only override drawRect: if you perform custom drawing.
    // An empty implementation adversely affects performance during animation.
    override func drawRect(rect: CGRect) {
        // Drawing code
        // 获得当前图形绘制的上下文
        let ctx = UIGraphicsGetCurrentContext()
        // 半径
        let r = rect.width / 2
    
        // 绘制圆
        CGContextAddArc(ctx, r, r, r, 0, 3.141592654 * 2, 0)
        // 设置圆的填充色：灰色、不透明
        CGContextSetRGBFillColor(ctx, 0.7, 0.7, 0.7, 1)
        CGContextFillPath(ctx)
        
        // 添加一段弧形弧形
        CGContextAddArc(ctx, r, r, r, 0, 3.141592654 * 2 * _progressValue , 0)
        // 添加一条线
        CGContextAddLineToPoint(ctx, r, r)
        // 设置扇形的填充色
        CGContextSetRGBFillColor(ctx, 0, 0, 1, 1)
        // 绘制
        CGContextFillPath(ctx)
    }
}
```
*ViewController.swift*

```objective-c
import UIKit

class ViewController: UIViewController {
    private var pc: ProgressBar!
    // 响应AddProgress点击
    @IBAction func addProgressBtnPressed(sender: AnyObject) {
        pc.setProgressValue(pc.getProgressValue() + 0.1)
    }
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        // 创建进度条
        pc = ProgressBar(frame: CGRect(x: 100, y: 100, width: 100, height: 100))
        pc.setProgressValue(0.2)
        // 将该进度条添加到所在控制器绑定的视图中
        self.view.addSubview(pc)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}
```

### 1.5.3	实时预览自定义控件效果
>**说明：**`自定义控件`也可以使用`Storyboard`设置。步骤如下
>**意义：**开发人员通过代码开发的`自定义控件`，也可以交给设计人员通过`Storyboard`进行设计了
>**相关指令：**用来和`Storyboard`建立关联


|指令|修饰目标|说明|
|-|-|-|
|`@IBDesignable`|`class`|使被修饰的类可以通过`Storyboard`设置|
|`@IBInspectable`|属性|使被修饰的属性可以在`Storyboard`中设置|

1. 在`Project`中创建新`target`（自定义需要在单独的`target`中才能被`Storyboard`管理）
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/JK_IOS_S1_xcode-custom.gif)
2. 在新创建的`target`中创建自定义控件的类（`@IBDesignable`），类中可以设置一些可在`Storyboard`设置的属性（`@IBInspectable`）
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-02-12%20%E4%B8%8A%E5%8D%8812.13.21.png)

*MyView.swift*

```objective-c
import UIKit

@IBDesignable class MyView: UIView {
    
    // 重写必要构造器（否则不会被Storyboard初始化）
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }

    override init(frame: CGRect) {
        super.init(frame: frame)
    }
    
    // 自定义一些可以在Storyboard中设置的项
    @IBInspectable var str: String = "Hello"// 字符串
    @IBInspectable var borderWidth: CGFloat = 0 {// 边框宽度
        didSet {
            layer.borderWidth = borderWidth
        }
    }
    @IBInspectable var borderColor: UIColor = UIColor.clearColor() {// 边框颜色
        didSet {
            layer.borderColor = borderColor.CGColor
        }
    }
    @IBInspectable var cornerRadius: CGFloat = 0 {// 边框圆角
        didSet {
            layer.cornerRadius = cornerRadius
        }
    }
	...
}
```
3. 在`Storyboard`中添加一个`View`（控件），并设置关联的类
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-02-12%20%E4%B8%8A%E5%8D%8812.04.07.png)



## 1.6	使用StoryBoard做ios UI界面跳转

### 1.6.1	用iOS Storyboard做界面跳转
>**说明：**跳转到下一个`view`并且能够返回
>![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/JK_IOS_S1_switch.gif)

#### 1.6.1.2	跳转到下一页
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/JK_IOS_S1_next.gif)

#### 1.6.1.3	返回
>**说明：**使用`IBAction`结合`dismissViewControllerAnimated`方法，步骤如下
1.	新建一个和第二个`view`关联的类（`UIViewController`子类）
2.	结合`辅助窗口`在第二个`view controller`做`IBAction`并在响应方法中调用`dismissViewControllerAnimated`
*ImgViewController.swift*

```objective-c
import UIKit

class ImgViewController: UIViewController {

    // 返回上一个view
    @IBAction func backBtnClicked(sender: AnyObject) {
        self.dismissViewControllerAnimated(true, completion: {() -> Void in
            print("return")
        })
    }
    // storyboard载入时调用的初始化方法
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }
	...
}
```

### 1.6.2	使用nib文件做iOS界面设计
>**说明：**`Xcode4`之后`IB(Interface Builder)`和`Xcode`才集成在一起。使用方式如下
>1. 创建`Cocoa class`时勾选`Alse create XIB File`
>![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-02-12%20%E4%B8%8B%E5%8D%885.22.14.png) ![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-02-13%20%E4%B8%8B%E5%8D%8810.47.13.png)

>2. 使用`presentModalViewController方法`从`Storyboard`管理的`view`跳转到`nib`管理的`view`
>
>**注意：**传统使用的是`nib`（而不是`Storyboard`）进行界面设计的。`nib`的操作方式和`Storyboard`中单个`view`类似。

***
*ViewControllew.swift*
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-02-13%20%E4%B8%8B%E5%8D%8810.58.26.png)

```objective-c
import UIKit

class ViewController: UIViewController {
	// 下一个view
    @IBAction func goToNextPage(sender: AnyObject) {
        let vc = MyViewController(nibName: "MyViewController", bundle: nil)
        self.presentViewController(vc, animated: true, completion: {})
    }
	...
}
```

***
*MyViewController.swift*
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-02-13%20%E4%B8%8B%E5%8D%8810.59.55.png)

```objective-c
import UIKit

class MyViewController: UIViewController {
    // 返回上一个view
    @IBAction func returnPrevPage(sender: AnyObject) {
        self.dismissViewControllerAnimated(true, completion: {})
    }
    ...
}
```


### 1.6.3	在iOS界面间传递数据
>**说明：**本质上只是为和下一个`view`绑定的`controller`设置一个属性。
>**扩展：**也可以在后一个`view`通过`parentViewController`访问前一个`view`

![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-02-13%20%E4%B8%8B%E5%8D%8811.16.29.png)

*ViewControllew.swift：设置信息*

```objective-c
import UIKit

class ViewController: UIViewController {

    // 输入框
    @IBOutlet var input: UITextField!
    // 下一页
    @IBAction func goToNextPage(sender: AnyObject) {
        let vc = MyViewController(nibName: "MyViewController", bundle: nil)
        // 设置信息
        vc.labelContent = input.text!
        self.presentViewController(vc, animated: true, completion: {})
    }
	...
}
```
*MyViewControllew.swift：展示信息*

```objective-c
import UIKit

class MyViewController: UIViewController {

    var labelContent: String = ""
    
    @IBOutlet var myLabel: UILabel!
    // 返回上一个view
    @IBAction func returnPrevPage(sender: AnyObject) {
        self.dismissViewControllerAnimated(true, completion: {})
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        myLabel.text = labelContent// 展示信息
    }
	...
}
```

## 1.7	屏幕适配
>**变动：**在`Xcode 7`中，`Editor(menu)->Pin`消失了，该菜单项中原本有一些样式设计功能。

### 1.7.1	匹配父级容器
>**说明：**就是让`目标容器`以他的`父级容器`为参照系进行设置
>![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-02-13%20%E4%B8%8B%E5%8D%8811.56.36.png)
>**扩展：**控件`UIImageVIew`可以设置其中图片的铺排模式
>![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-02-14%20%E4%B8%8A%E5%8D%8812.00.37.png)


### 1.7.2	分割父级容器
>**说明：**指的是多个兄弟`view`使用父级`view`的方式。
>**扩展：**`Xcode 7`推出了一种新的方式`stack view`，来进行布局管理，可以将多个`view`作为一个组合进行操作。
>**技巧：**`stack view`可以取代之前需要`Horizontal Space`（连个`view`之间的水平间距）的场景

#### 1.7.2.1	左边固定，右边自适应
>**约束：**设置以下约束
>+ 两个`View`之间：`Horizontal Spacing`
>+ 左边`View`：`leading`、`top`
>+ 右边`View`：`tailing`、`top`

>![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-02-20%20%E4%B8%8B%E5%8D%887.47.12.png)

![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-02-20%20%E4%B8%8B%E5%8D%888.00.01.png)

#### 1.7.2.2	多个`View`按比例
>**说明：**2个或更多个`View`的宽度（或高度）按一定比例分割父级容器的剩余空间
>![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-02-22%20%E4%B8%8A%E5%8D%889.51.01.png)

![Alt text](./http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-02-20%20%E4%B8%8B%E5%8D%887.47.27.png)


### 1.7.3	复杂布局适配
>**说明：**上部左右均分，下部占用剩余部分
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-02-22%20%E4%B8%8B%E5%8D%888.53.19.png) ![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-02-22%20%E4%B8%8B%E5%8D%886.05.43.png) 

*底层*
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-02-22%20%E4%B8%8B%E5%8D%888.58.22.png)

*顶层*
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-02-22%20%E4%B8%8B%E5%8D%889.41.32.png)



## 1.8	iOS平台常用传感器

#### CMMotionManager类
>**说明：**管理传感器的类。
>**库：**`CoreMotion`

### 1.8.1	iOS平台加速度传感器的使用方式
>**说明：**可以获得三个方向上的加速度。


|CMMotionManager相关实例成员|类型|说明|
|-|-|-|
|accelerometerAvailable|Bool|加速器是否可用|
|accelerometerUpdateInterval|NSTimeInterval|每秒获取数据数（获取频率）|
|startAccelerometerUpdatesToQueue|func|启动加速器|
|stopAccelerometerUpdates|func|停止加速器|
>**注意：**加速度传感器`启动`后，应当在适当的时候`停掉`。

```swift
import UIKit
import CoreMotion
class ViewController: UIViewController {
    // 1. 声明传感器控制器
    var cmm: CMMotionManager!
    var q: NSOperationQueue!
    // 2. 载入视图时初始化加速度传感器
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        cmm = CMMotionManager()
        q = NSOperationQueue()
    }

	...
	
    /**
    * 开始获取减速器数据的任务
    */
    func startAccelerateremoterUpdate() {
        /* 加速度 */
        cmm.accelerometerUpdateInterval = 1// 每秒获取的次数
        if cmm.accelerometerAvailable && !cmm.accelerometerActive {
            // start后一定要stop
            cmm.startAccelerometerUpdatesToQueue(q, withHandler: {
                (data:CMAccelerometerData?, err:NSError?) in
                print("AccesslateData: \(data)")
            })
        }
        else {
            print("加速器传感器不可用！")
        }
    }
   
    /**
    * 停止侦测加速度
    */
    func stopAccelerateremoterUpdate() {
        if cmm.accelerometerActive && cmm.accelerometerActive {
            cmm.stopAccelerometerUpdates()
        }
    }
    
    // 3. 页面展现时开始侦测
    override func viewWillAppear(animated: Bool) {
        startAccelerateremoterUpdate()
    }
    // 4. 页面退出时停止侦测
    override func viewWillDisappear(animated: Bool) {
        stopAccelerateremoterUpdate()
    }
}
```

### 1.8.2	iOS平台陀螺仪的使用方式


|CMMotionManager相关实例成员|类型|说明|
|-|-|-|
|gyroAvailable|Bool|陀螺仪是否可用|
|gyroUpdateInterval|NSTimeInterval|每秒获取数据数（获取频率）|
|startGyroUpdatesToQueue|func|开始读区陀螺仪数据|
|stopGyroUpdates|func|停止读取陀螺仪数据|

```swift
import UIKit
import CoreMotion
class ViewController: UIViewController {
    // 1. 声明传感器控制器
    var cmm: CMMotionManager!
    var q: NSOperationQueue!
    // 2. 载入视图时初始化加速度传感器
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        cmm = CMMotionManager()
        q = NSOperationQueue()
    }

	...
   
    /**
    * 开始获取陀螺仪数据的任务
    */
    func startGyroUpdate() {
        /* 陀螺仪 */
        cmm.gyroUpdateInterval = 1
        if cmm.gyroAvailable && !cmm.gyroActive {
            cmm.startGyroUpdatesToQueue(q, withHandler: {
                (data:CMGyroData?, err: NSError?) in
                print("Gyno data: \(data)")
            })
        }
        else {
            print("陀螺仪传感器不可用！")
        }
    }

    /**
     * 停止侦测陀螺仪
     */
    func stopGyroUpdate() {
        /* 陀螺仪 */
        if cmm.gyroActive && cmm.gyroActive {
            cmm.stopGyroUpdates()
        }
    }
    
    // 3. 页面展现时开始侦测
    override func viewWillAppear(animated: Bool) {
        startGyroUpdate()
    }
    // 4. 页面退出时停止侦测
    override func viewWillDisappear(animated: Bool) {
        stopGyroUpdate()
    }
}

```

### 1.8.3	iOS平台距离传感器的使用方式
>**说明：**相关类
>+ `UIDevice`
>+ `NSNotificationCenter`
>+ `UIDeviceProximityStateDidChangeNotification`

```swift
import UIKit
class ViewController: UIViewController {
	
	...
	
     /**
     * 开始侦听距离传感器
     */
    func startListenProximity() {
        UIDevice.currentDevice().proximityMonitoringEnabled = true// 是否侦听距离传感器
        NSNotificationCenter.defaultCenter().addObserver(self, selector: Selector("proximityChanged"), name: UIDeviceProximityStateDidChangeNotification, object: nil)// 将距离传感器侦测到的变化通知到proximityChanged方法
    }
    
    /**
     * 距离变化被侦测到时调用的方法
     */
    func proximityChanged() {
        print("\(UIDevice.currentDevice().proximityState)")// 距离传感器前是否有障碍物
    }
    
    /**
     * 停止侦测距离传感器
     */
    func stopListenProximity() {
        NSNotificationCenter.defaultCenter().removeObserver(self)
    }
    
    // 3. 页面展现时开始侦测
    override func viewWillAppear(animated: Bool) {
        startAccelerateremoterUpdate()
        startGyroUpdate()
    }
    // 4. 页面退出时停止侦测
    override func viewWillDisappear(animated: Bool) {
        stopAccelerateremoterUpdate()
        stopGyroUpdate()
    }
}
```

### 1.8.4	iOS平台电源传感器的使用方式
>**说明：**相关类
>+ `UIDevice`
>+ `NSNotificationCenter`
>+ `UIDeviceProximityStateDidChangeNotification`

```swift
import UIKit
class ViewController: UIViewController {
	...
	
    /**
    * 开始侦听电量
    */
    func startListenLevel() {
        UIDevice.currentDevice().batteryMonitoringEnabled = true// 是否侦听电量
        NSNotificationCenter.defaultCenter().addObserver(self, selector: "levelChanged", name: UIDeviceBatteryLevelDidChangeNotification, object: nil)// 将距离传感器侦测到的变化通知到levelChanged方法
    }
    
    /**
     * 电量变化被侦测到时调用的方法
     */
    func levelChanged() {
        print("\(UIDevice.currentDevice().batteryLevel)")// 0～1

    }
    /**
    * 停止侦听电量
    */
    func stopListenLevel() {
        NSNotificationCenter.defaultCenter().removeObserver(self, name: UIDeviceBatteryLevelDidChangeNotification, object: nil)// 移除当前view中的所有电量侦听任务
    }
  
    // 3. 页面展现时开始侦测
    override func viewWillAppear(animated: Bool) {
        startListenLevel()
    }
    // 4. 页面退出时停止侦测
    override func viewWillDisappear(animated: Bool) {
	    stopListenLevel()
    }
}
```

### 1.8.5	iOS平台磁场传感器的使用方式

#### CLLocationManager类


|相关实例成员|类型|说明|
|-|-|-|
|delegate|Class(采纳CLLocationManagerDelegate协议)|委托对象|
|startUpdatingHeading|func|开始侦测方位数据|

```swift
import UIKit
import CoreLocation
class ViewController: UIViewController, CLLocationManagerDelegate {
    /* 1. 声明方位管理器 */
    var lm:CLLocationManager!
    override func viewDidLoad() {
		...
        /* 2. 初始化方位管理器 */
        lm = CLLocationManager()
        lm.delegate = self// 指定 delegate（需要采纳CLLocationManagerDelegate协议）
    }
    
    /* 3. view渲染时启动侦测 */
    override func viewWillAppear(animated: Bool) {
        // 启动任务：不断获取指南针数据
        lm.startUpdatingHeading()
    }
    
    /**
    * 采纳协议（CLLocationManagerDelegate）
    * 当方位发生变化时调用该方法
    */
    func locationManager(manager: CLLocationManager, didUpdateHeading newHeading: CLHeading) {
        print(newHeading)
    }
}
```

### 1.8.6	使用磁场传感器制作指南针实例

## 1.9	多点触控

### 1.9.1	触摸事件处理
>**说明：**触摸事件分4种，分别对应四种方法（`ViewController`的成员方法）


|方法|说明|
|-|-|
|touchesBegin|手指接触屏幕|
|touchesCancel|系统事件打断了触摸事件时|
|touchesEnded|手指离开屏幕|
|touchesMoved|手指在屏幕上滑动|

```swift
import UIKit

class ViewController: UIViewController {
	...
    override func touchesBegan(touches: Set<UITouch>, withEvent event: UIEvent?) {
        print("touchesBegin")
        
    }
    override func touchesMoved(touches: Set<UITouch>, withEvent event: UIEvent?) {
        print("touchesMoved")
        // 获得在滑动屏幕时手指所在的区域的坐标（只获得了其中一个手指的）
        touches.first?.locationInView(self.view)
    }
    override func touchesEnded(touches: Set<UITouch>, withEvent event: UIEvent?) {
        print("touchesEnded")
    }
    override func touchesCancelled(touches: Set<UITouch>?, withEvent event: UIEvent?) {
        print("touchesCancelled")
    }
}
```

### 1.9.2	处理多个触摸点
>**技巧：**可以在模拟器中模拟多点触控，方式是鼠标在模拟器上滑动式按住`alt(option)`键。
>**注意：**程序默认不启动对多点触控的支持，需要在代码中设置开启多点触控。

```swift
import UIKit

class ViewController: UIViewController {

    override func viewDidLoad() {
		...
        self.view.multipleTouchEnabled = true// 启动多点触摸
    }

    override func touchesMoved(touches: Set<UITouch>, withEvent event: UIEvent?) {
        print("touchesMoved")
        
        // 获得触摸点数量
        print(touches.count)
        
        // 获得每个触摸点在滑动屏幕时所在的区域的坐标
        for touch in touches {
            print("\(touch.locationInView(self.view))")
        }
    }
}
```

### 1.9.3	缩放图片实例
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/JK_IOS_S1_touch.gif)
*ViewController.swift*

```objective-c
import UIKit

class ViewController: UIViewController {
    private var lastDistance: Float = 0.0// 两个触摸点之间的距离
    
    @IBOutlet var iv: UIImageView!// 图片控件
    override func viewDidLoad() {
        ...
        self.view.multipleTouchEnabled = true// 启动多点触摸
    }
    override func touchesBegan(touches: Set<UITouch>, withEvent event: UIEvent?) {
        lastDistance = 0.0// 用户开始触摸屏幕时设置初始值
    }
    override func touchesMoved(touches: Set<UITouch>, withEvent event: UIEvent?) {
        // 判断是不是两点触控
        if touches.count == 2 {
            // 对 Set 排序，才能通过下标进行索引
            var touchesSorted = touches.sort({s1, s2 in s1.tapCount.bigEndian > s1.tapCount.bigEndian})
            // 通过勾股定理计算两点之间的距离
            let p1 = touchesSorted[0].locationInView(self.view)
            let p2 = touchesSorted[1].locationInView(self.view)
            let xx = p1.x - p2.x
            let yy = p1.y - p2.y
            
            let curDistance = Float(sqrt(xx * xx + yy * yy))
            
            // 首次缩放触摸操作
            if lastDistance == 0.0 {
                lastDistance = curDistance
            }
            else {
                // 缩小
                if lastDistance - curDistance > 5 {
                    print("缩小")
                    lastDistance = curDistance
                    iv.transform = CGAffineTransformScale(iv.transform, 0.9, 0.9)
                }
                // 放大
                else if lastDistance - curDistance < -5{
                    print("放大")
                    lastDistance = curDistance
                    iv.transform = CGAffineTransformScale(iv.transform, 1.1, 1.1)
                }
            }
        }
    }
}
```

## 1.10	常用其它功能

### 1.10.1	打开网页
>**说明：**在`Safari`中打开指定连接
>![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/JK_IOS_S_call.gif)
>**相关类：**`UIApplication`

*ViewController.swift*

```swift
import UIKit

class ViewController: UIViewController {
    @IBAction func openJikexueyuanPressed(sender: AnyObject) {
        UIApplication.sharedApplication().openURL(NSURL(string: "http://jikexueyuan.com")!)
    }
	...
}
```

### 1.10.2	常用打开操作（发邮件、打电话、发短信）
>**说明：**和打开网页类似，只是使用的`URL`协议不同

*ViewController.swift* 

```swift
import UIKit

class ViewController: UIViewController {
    // 发短信
    @IBAction func sendSMSBtnPressed(sender: AnyObject) {
        UIApplication.sharedApplication().openURL(NSURL(string: "sms://10086")!)
    }
    
    // 打电话
    @IBAction func makeCallBtnPressed(sender: AnyObject) {
        UIApplication.sharedApplication().openURL(NSURL(string: "tel://10086")!)
    }

    // 发邮件
    @IBAction func sendMailBtnPressed(sender: AnyObject) {
        UIApplication.sharedApplication().openURL(NSURL(string: "mailto://xx@jikexueyuan.com")!)
    }
    ... 
}
```

### 1.10.3	自定义打开协议
>**说明：**可以通过自定一些`URL`协议
>**案例：**通过自定义的`URL`协议`ime`打开另一个`App`
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/JK_IOS_S1_handler.gif)

#### 1.10.3.1	注册协议的app
1. 在`Info.list`中设置一个`URL Schemes`
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-02-25%20%E4%B8%8B%E5%8D%889.42.43.png)

2. 创建要被协议打开的`View`（带有`xib`）
*LabelViewController.swift*

```swift
import UIKit

class LabelViewController: UIViewController {
    @IBOutlet var myLabel: UILabel!
	...
}
```
*LabelViewController.xib*
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-02-26%20%E4%B8%8A%E5%8D%889.55.25.png)

3. `AppDelegate.swift`：实现通过URL打开该`App`的构造函数

```swift
import UIKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
	...
	// 为自定义的URL协议注册实现
    func application(application: UIApplication, handleOpenURL url: NSURL) -> Bool {
        // 从应用的LabelViewController.xib指定的view启动
        let vc = LabelViewController(nibName: "LabelViewController", bundle: nil)
        window?.addSubview(vc.view)
        // 设置view
        vc.myLabel.text = "\(url)"

        return true
    }
}
```

#### 1.10.3.2	通过协议打开app
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-02-26%20%E4%B8%8A%E5%8D%889.58.00.png)

*viewcontroller.swift*

```swift
import UIKit

class ViewController: UIViewController {
    // ime
    @IBAction func callImePressed(sender: AnyObject) {
        UIApplication.sharedApplication().openURL(NSURL(string: "ime://i.loce.you?h=Hello&b=world")!)
    }
    ...
}
```


### 1.10.4	获取photo
*ViewController.swift*

```swift

```