---
title: 10 属性
categories:
  - The Swift Program Language 2
tag:
  - swift语言
---

>**按从属区分**

|**属性类型**|**特点**|
|----|----|
|类型属性|类型本身的属性|
|实例属性|特定类型的实例的属性|
>**按存储数据的方式区分**

|**属性类型**|**特点**|**限制**|**定义方式**|
|----|----|----|
|存储属性|存储常量或变量作为实例的一部分|类、结构体|`let`、`var`|
|计算属性|通过计算获取值的，值是不固定的|类、结构体、枚举|`var`|
>**计算属性分类**

|**计算属性**|**特点**|**定义方式**|
|---------------------|----------|---------------|
|读写计算属性|既可以获取值，也可以设置值|只提供getter没有setter|
|只读计算属性|总是返回一个值，可以通过点运算符访问，但不能设置新的值。|同时设置getter和setter|


## 10.1	存储属性(Stored Properties)

|**存储属性类型**|**定义方式**|**特点**|
|--------------|----------|--------|
|变量存储属性|使用`var`定义|可以修改|
|常量存储属性|使用`let`定义|初始化后不可修改|

```swift
//1.声明一个结构体
struct FixedLengthRange {
    var firstValue:Int
    let length:Int
}
//2.创建结构体实例
var rangeOfThreeItems = FixedLengthRange(firstValue: 0, length: 3)
//3.修改结构体实例的变量存储属性
rangeOfThreeItems.firstValue = 6
```

### 10.1.1	常量结构体实例和常量类实例的存储属性
>**说明：**创建了一个结构体的实例并将其赋值给一个常量，则无法修改该实例的任何属性，即使定义了变量存储属性

|**特指**|**被赋值给常量**|
|--------|------------|
|结构体(struct)实例|它的所有属性（包括`var`声明的）也就成了常量。|
|类(class)实例|仍然可以修改实例的变量属性（`var`）|


### 10.1.2	延迟存储属性
>**关键字：**`lazy`
>**说明：**第一次被调用的时候才会计算其初始值的属性
>**注意：**必须将延迟存储属性声明为变量(`var`)，因为常量属性在构造完成之前必须要有初始值，延迟属性不能保证这一点。
>**应用**：
>1.	当属性的值依赖于在实例的构造过程结束前无法知道具体值的外部因素时
>2.	当属性的值需要复杂或大量计算时

	class DataImporter {
	    /*
	    DataImporter是一个将外部文件中的数据导入的类。这个类的初始化会消耗不少时间。
	    */
	    var fileName = "data.txt";
	}
	
	class DataManager {
	    lazy var impoter = DataImporter()
	    var data = [String]()
	    //这里提供数据管理功能
	}
	let manager = DataManager()
	manager.data.append("Some data")
	manager.data.append("Some more data")
	//DataImporter实例的importer属性还没有被创建
	
	println(manager.impoter.fileName)//DataImporter的实例现在被创建了，输出"data.txt"

### 10.1.3	存储属性和实例变量
>说明：`swift`的属性没有对应的实例变量，属性的后端存储也无法直接访问。


## 10.2	计算属性
>**说明：**计算属性不直接存储值，而是提供一个 `getter` 和一个可选的 `setter`，来间接获取和设置其他属性或变量的值。
>+ 定义`getter`计算并返回属性值
>+ 定义可选的`setter`间接设置其它属性或变量的值。

>**注意**:创建实例时可以不必为计算属性赋值，因为计算属性并不存储值，而是通过计算动态得出的。

```swift	
struct Point {
    var x = 0.0,y = 0.0
}

struct Size {
    var width = 0.0, height = 0.0
}

struct Rect {
    var origin = Point()
    var size = Size()
	
	//计算属性
    var center:Point{
        get{
            let centerX = origin.x + (size.width / 2)
            let centerY = origin.y + (size.height / 2)
            return Point(x:centerX, y:centerY)
        }
        set(newCenter){
            origin.x = newCenter.x - (size.width / 2)
            origin.y = newCenter.y - (size.height / 2)
        }
    }
}
var square = Rect(origin: Point(x:15.0,y:0.0), size: Size(width: 10.0, height: 10.0))
let initialSquareCenter = Point(x:15.0, y:15.0)
println("Square.origin is now at (\(square.origin.x),\(square.origin.y))")
```

### 10.2.1	便捷setter声明
>**说明**:如果计算属性的`setter`没有定义标识新值的参数名，则可以使用默认名称`newValue`。

```swift
//不使用便捷setter声明
struct Rect {
    var origin = Point()
    var size = Size()
    var center:Point{
        get{
            let centerX = origin.x + (size.width / 2)
            let centerY = origin.y + (size.height / 2)
            return Point(x:centerX, y:centerY)
        }
        set(newCenter){
            origin.x = newCenter.x - (size.width / 2)
            origin.y = newCenter.y - (size.height / 2)
        }
    }
}

//使用便捷setter声明
struct AlternativeRect {
    var origin = Point()
    var size = Size()
    var center:Point{
        get{
            let centerX = origin.x + (size.width / 2)
            let centerY = origin.y + (size.height / 2)
            return Point(x:centerX, y:centerY)
        }
        set{
            origin.x = newValue.x - (size.width / 2)
            origin.y = newValue.y - (size.height / 2)
        }
    }
}

```	

### 10.2.2 只读计算属性
>**说明：**只有 `getter` 没有 `setter` 的计算属性就是只读计算属性
>**用途**：当一个属性的值完全只需要计算得出而不需要设置值时。

```swift
struct Cuboid {
    var width = 0.0, height = 0.0, depth = 0.0
    var volume:Double{
        return width * height * depth
    }
}
let fourByFiveByTwo = Cuboid(width: 4.0, height: 5.0, depth: 2.0)
println("the volume of fourByFiveByTwo is 40.0")
```

## 10.3	属性观察器
>**说明：**属性观察器监控和响应属性值的变化，每次属性被设置值的时候都会调用属性观察器，甚至新值和当前值相同的时候也不例外。

### 10.3.1	哪些属性可以定义属性观察器？

|**可以设置属性观察器**|**不可以设置属性观察器**|
|-|-|
|结构体、类的静态(类型)属性和实例属性|类无法重载的计算属性|
|类继承的属性|延迟存储属性|
>**注意**：不需要为无法重载的计算属性添加属性观察器，因为可以通过`setter`直接监控和响应值的变化。


### 10.3.2	属性观察器有哪几种？

|属性观察器|调用时机|参数|参数默认名|
|-|-|-|-|
|`willSet`|在设置新的值之前调用|新的属性的值|newValue|
|`didSet`|在新的值被设置之后被调用|旧的属性值|oldValue|
>**注意**：`willSet`和`didSet`观察器只会当属性的值在初始化之外的地方被设置时调用。

```swift
class StepCounter {
	    //定义一个属性及其属性观察器
    var totalSteps:Int = 0{
        //在设置新值之前调用
        willSet(newTotalSteps){
            println("About to set totalSteps to \(newTotalSteps)")
        }
        //在新值被设置之后调用
        didSet{
            if totalSteps > oldValue{
                println("aDDED \(totalSteps - oldValue) steps")
            }
        }
    }
}
let stepCounter = StepCounter()
stepCounter.totalSteps = 200
//About to set totalSteps to 200
//Added 200 steps
```

## 10.4 全局变量和局部变量

|****|全局变量|局部变量|
|-----|---------|---------|
|**定义**|函数、方法、闭包或任何类型之外定义的变量|函数、方法或必包内部定义的变量|
|**默认是否延迟计算**|是|否（除非使用`lazy`）|
|**是否可以定义计算属性**|是|是|
|**是否可以为存储型变量定义观察器**|是|是|


## 10.5	类型属性
>**用途**：用于定义特定类型所有实例共享的数据。
>**注意**：必须给存储类型属性设置默认值，因为类型本身无法在初始化过程中使用构造函器给类型属性赋值。
>**说明：**无论创建了多少个该类型的实例，这些属性都只有唯一一份。这种属性就是类型属性。

|分类|存储型类型属性|计算型类型属性|
|-|-|-|
|可以定义该类型属性的类型|`struct`、`enum`|`struct`、`enum`、`class`|
|可以为变量或常量|变量、常量|变量|
|是否需要指定默认值|是|否|


### 10.5.1  类型属性语法
>**说明：**使用关键字static来定义类型属性。在为类定义计算型类型属性时，可以改用关键字class来支持子类对父类的实现进行重写

|定义类型属性的关键字|使用类型|
|-|-|
|`static`|值类型（结构体、枚举）|
|`class`|类|	

```swift
//结构体
struct SomeStructure {
    //存储型类型属性
    static var storedTypeProperty = "Some value"
    
    //计算型类型属性（只读）
    static var computedTypeProperty:Int{
        //这里返回一个int值
        return 0
    }
}

//枚举类型
enum SomeEnumeration{
    static var storedTypeProperty = "Some value"  
}

//类
class SomeClass{
    class var computedTypeProperty:Int {
        return 0
    }
}
```

### 10.5.2  获取和设置类型属性的值
>**说明：**`类型名.类型属性`

```swift
struct AudioChannel {
    static let thresholdLevel = 10
    static var maxInputLevelForAllChannels = 0
    var currentLevel:Int = 0 {
        didSet{
            if currentLevel > AudioChannel.thresholdLevel{
                //将新电平值设置为阀值
                currentLevel = AudioChannel.thresholdLevel
            }
            if currentLevel > AudioChannel.maxInputLevelForAllChannels{
                //存储当前电平值作为新的最大输入电平
                AudioChannel.maxInputLevelForAllChannels = currentLevel
            }
        }
    }
}

var leftChannel = AudioChannel()
var rightChannel = AudioChannel()

leftChannel.currentLevel = 7
println(leftChannel.currentLevel)//7
println(AudioChannel.maxInputLevelForAllChannels)//7
```