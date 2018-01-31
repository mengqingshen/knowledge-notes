---
title: 11 方法
categories:
  - The Swift Program Language 2
tag:
  - swift语言

---

>**定义**：与某些特定类型相关联的函数。

|方法|支持类型|关联对象|
|-|-|-|
|实例方法|类、结构体、枚举|实例|
|类型方法|类、结构体、枚举|类型|


## 11.1	实例方法
>**说明：**写在它所属的类型的前后`{}`之间
>+ 能够隐式访问它所属类型的所有的其他实例方法和属性
>+ 只能被它所属的类的某个特定实例调用


|调用位置|调用方式|
|-|-|
|内部|能够隐式访问它所属类型的所有其它实例方法和属性|
|外部|只能被它所属的类的某个特定实例调用|

```swift
class Counter {
    //实例属性
    var count = 0
    //实例方法1
    func increment(){
        count++
    }
    //实例方法2
    func incrementBy(amount:Int){
        count += amount
    }
    //实例方法3
    func reset(){
        count = 0
    }
}

let counter = Counter()
counter.increment()
counter.incrementBy(5)
counter.reset()
```

### 11.1.1	方法的内部参数名和外部参数名
>**说明：**同函数。

```swift	
class Counter {
    //实例属性
    var count = 0
    func incrementBy(amount:Int, numberOfTime:Int){
        count += amount * numberOfTime
    }
}

let counter = Counter()

//第一个参数：不必为再定义一个外部变量名，因为通过incrementBy已经很清楚地看出它的作用
//其它参数：需要被一个外部参数名所限制，以便在方法呗调用时明确它的作用
counter.incrementBy(5, numberOfTime:3)
```

### 11.1.2  修改方法的外部参数名称
>**说明：**同函数。
>+ 可以为第一个参数添加一个显式的外部名称
>+ 不想为方法的第二个及后续的参数提供一个外部名称，可以通过使用下划线`_`作为该参数的显式外部名称

```swift	
/**
*覆盖参数的默认行为
*/
class Counter {
    //实例属性
    var count = 0
    //其它参数：使用_作为前缀，参数不在具有外部名称
    func incrementBy(amount:Int, _ numberOfTime:Int){
        count += amount * numberOfTime
    }
}

let counter = Counter()
counter.incrementBy(amount:5, 3)
```

### 11.1.3  self属性
>**说明：**类型的每一个实例都有一个隐含属性叫做`self`，`self`完全等同于该实例本身。
>+ 在方法中调用实例的其它方法和属性时可以省略`self`（除非需要区分参数名和属性名）

>**用途：**在一个实例的实例方法中使用这个隐含的self属性来引用当前实例

```swift
struct Point {
    var x = 0.0, y = 0.0
    func isToTheRightOfX(x:Double) -> Bool {
        return self.x > x//使用self.x指明使用属性x而不是参数x
    }
}

let somePoint = Point(x:4.0, y:5.0)
if somePoint.isToTheRightOfX(1.0){
    println("This point to the right of the line where x == 1.0")
}
```

### 11.1.4  在实例方法中修改值类型
>**背景**：值类型（结构体和枚举）的属性不能在普通实例方法中被修改
>**说明**：关键字`mutating` 放到方法的`func`关键字之前，使变量实例属性的方法具备修改实例中的属性（包括`self`）的能力。
>**注意**：不能在结构体类型的常量上调用可变方法，因为此时所有属性都无法修改。

```swift
struct Point {
    var x = 0.0, y = 0.0
    mutating func moveByX(deltaX:Double,y deltaY:Double){
        x += deltaX
        y += deltaY
    }
}

var somePoint = Point(x:4.0, y:5.0)//声明为let再调用mutating方法将报错
somePoint.moveByX(2.0, y: 3.0)
```

### 11.1.5  在变异方法中给self赋值(通过`mutating`)
>**说明：**可变方法能够赋给隐含属性self一个全新的实例
#### 结构体中使用

```swift
struct Point {
    var x = 0.0, y = 0.0
    mutating func moveByX(deltaX:Double,y deltaY:Double){
        self = Point(x: x + deltaX, y: y + deltaY)
    }
}
var somePoint = Point(x:4.0, y:5.0)//声明为let再调用mutating方法将报错
somePoint.moveByX(2.0, y: 3.0)
```

#### 枚举中使用

```swift
//定义一个三态开关的枚举，具备循环切换状态的能力
enum TriStateSwitch{
    case Off, Low, High
    //该方法的每次调用都会导致值的改变（通过修改self）
    mutating func next(){
        switch self{
        case Off:
            self = Low
        case Low:
            self = High
        case High:
            self = Off
        }
    }
}
var ovenLight = TriStateSwitch.Low
ovenLight.next()//.High
ovenLight.next()//.Off
```

## 11.2	类型（静态）方法
>**关键字：**使用的关键字同类型（静态）属性。

|类型|关键字|
|------|----------|
|类|`class`|
|结构体、枚举|`static`|
>**说明：**类型方法和实例方法一样用`点语法`调用
>1. `self`属性指向类型本身
>2. 静态(类型)方法法中`能也只能`直接（不需要类型名称前缀）访问其它静态方法和属性

```swift
struct LevelTracker{
    static var highestUnlocked = 1
    static func unlockLevel(level:Int){
        if level > highestUnlocked{
            highestUnlocked = level
        }
    }
    //静态方法中访问静态变量
    static func levelIsUnlocked(level:Int)->Bool{
        return level <= highestUnlocked
    }
    var currentLevel = 1
    
    //变异实例方法中修改实例属性的值（只有当实例赋值为变量时）
    mutating func advanceToLevel(level:Int)->Bool{
        if LevelTracker.levelIsUnlocked(level){
            currentLevel = level
            return true
        }else{
            return false
        }
    }
}

class SomeClass {
    class func someMethod(){
        //type method implementation goes here
    }
}
SomeClass.someMethod()
```