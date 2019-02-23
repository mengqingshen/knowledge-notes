---
title: 9 类和结构体
categories:
  - The Swift Program Language 2
tag:
  - swift语言
---


## 9.1 类和结构体对比
>**背景:**
>1. 不需要为自定义类和结构创建独立的接口和实现文件，系统会自动生成面向其它代码的外部接口  
>2. 类和结构体的关系比其它语言更加紧密  
>3. 结构体总是通过被复制的方式在代码中传递，因此请不要使用引用计数

### 相同点  
1. 定义属性用于存储值
2. 定义方法用于提供功能
3. 定义附属脚本用于访问值
4. 定义构造器用于生成初始化值
5. 通过扩展增加默认实现的功能
6. 实现协议以提供某种标准功能

### 类比结构体多的附加功能
1. 继承允许一个类继承另一个类的特征
2. 类型转换允许在运行时检查和解释一个类实例的类型
3. 解构器允许一个类实例释放任何其所分配的资源
4. 引用计数允许对一个类的多次引用


### 9.1.1 定义
>**语法：**类和结构体

```swift
// 类
class SomeClass {
    // class definition goes here
}
// 结构体
struct SomeStructure {
    // structure definition goes here
}
```
>**命名风格**：为了将`Swift`类型和其它标记的命名区分开，命名最好遵从一定规范
>1. 类或结构体的命名必须符合Swift类型的大写命名风格（`UpperCamelCase`）
>2. 属性和方法命名要符合Swift类型的小写命名风格（`lowerCamelCase`）

```swift
//定义一个结构体
struct Resolution{
    //包含两个存储属性
    var width = 0
    var height = 0
}

//定义一个类
class VideoMode {
    var resolution = Resolution()
    var interlaced = false
    var frameRate = 0.0
    var name:String?
}
```

### 9.1.2 类和结构体实例
>**最简单形式**：`结构体或者类的类型名称()`
>+ 属性会被初始化为默认值

```swift
let someResolution = Resolution()//创建结构体实例
let someVideoMode = VideoMode()//创建类实例
```


### 9.1.3 属性访问
>**说明**：点语法（dot syntax）
>**注意**：Swift允许直接设置结构体属性的`子属性`（不同于o-c）

```swift
println("The width of someResolution is \(someResolution.width)")//访问结构体实例的属性
someVideoMode.resolution.width = 1280//为结构体的属性的字属性赋值
println("The width of someVideoMode is now \(someVideoMode.resolution.width)")//访问结构体属性的字属性
```

### 9.1.4 	结构体类型的成员逐一构造器
>**说明**：结构体自动生成（类实例没有默认的成员逐一构造器）
>**用途：**始化新结构体实例中成员的属性
>**调用**：将结构体实例中`各个属性的初始值`，通过`属性的名称`传递到`成员逐一构造器`之中

```swift
// 调用逐一成员构造器
let vga = Resolution(width: 640, height: 480);
```

## 9.2 结构体和枚举是值类型
>**值类型特点**：值类型被`赋给一个常量(变量)`或者被`传递给一个函数`的时候，实际上操作的是其`副本`。
>**扩展**：所有`基本数据类型`在都是通过`结构体`来实现的。
>

| 值类型 |引用类型 |
|-------|-------|
|整数(Integer)|类(Class)|
|浮点数(floating-point)||
|布尔值(Booleans)||
|字符串(string)||
|数组(array)||
|字典(directionaries)||
|结构体(struc)||
|枚举(enum)||
>

```swift
//结构体是值类型
let hd = Resolution(width: 1920, height: 1080)
var cinema = hd
cinema.width = 2048

println("cinema is now \(cinema.width) pixels wide")//2048
println("hd is still \(hd.width) pixels wide")//1920

//枚举类型也是值类型
enum CompassPoint{
    case North, South, East, West
}
var currentDirection = CompassPoint.West
let rememberedDirection = currentDirection
currentDirection = .East
if rememberedDirection == .West{//拷贝赋值并不影响原始值
    println("The remembered direction is still .West")
}
```

## 9.3 类是引用类型
>**说明：**被赋予到一个变量、常量或者被传递到一个函数时，引用的是已存在的实例本身而不是其拷贝。
>**注意**：用类型的实例即使被声明为常量，成员的值依然可以改变，因为改变实例的内容并没有改变引用用本身（因为引用不过是个地址）。

```swift
//创建类实例
let tenEighty = VideoMode()
tenEighty.resolution = hd
tenEighty.interlaced = true
tenEighty.name = "1080i"
tenEighty.frameRate = 25.0

let alseTenEighty = tenEighty
alseTenEighty.frameRate = 30.0

println("The frameRate property of tenEighty is now (tenEighty.frameRate)")

```	

### 9.3.1 恒等运算符
>**说明：**`!===`、`===`

|区分|含义|说明|
|-|-|-|
|`===`|恒等于|引用同一个类实例|
|`==`|等于|两个实例的值`相等`或`相同`（遵照设计者定义的评判标准） |


### 9.3.2 指针
>**说明：**引用类似c中的指针（swift没有指针），区别于指针，引用的特点如下
>1. 和其它常量或变量的定义方式相同
>2. 并不直接指向内存中的某个地址
>3. 不要求使用`*`来表明创建一个引用


## 9.4 类和结构体的选择
>**关键区别**：结构体实例总是通过值传递，类实例总是通过引用传递。
>**技巧**：除非是以下情况，绝大多数自定义数据结构都应该该是类，而非结构体。
+ 封装少量相关简单数据值
+ 封装的数据会被拷贝，而不是引用
+ 属性会被拷贝而不是引用
+ 不需要继承另一个已经存在的类型的属性或者行为

## 9.5 集合类型的赋值与拷贝行为
>**集合类型：**`String`，`Array`和`Dictionary`（均以结构体的形式实现）
>**说明**：所有以结构体方式实现的数据类型在被赋值给常量（或变量）以及传入函数（或方法）中时，它们的值就会发生拷贝行为。  
>**注意**：没必要避免拷贝来保证最有性能，因为在swift会进行相应优化：只有确有必要，实际的拷贝才会执行。
>**扩展：**`Objective-C` 中`NSString`，`NSArray`和`NSDictionary`类型均以类的形式实现，而并非结构体。


