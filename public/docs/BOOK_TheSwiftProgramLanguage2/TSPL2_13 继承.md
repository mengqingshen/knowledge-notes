---
title: 13 继承
categories:
  - The Swift Program Language 2
tag:
  - swift语言

---

>**说明**：一个类可以继承另一个类的方法,属性和其它特性

|能力|相关成员|价值|
|-|-|-|
|调用|超类的方法、属性、下标脚本|代码重用|
|重写|超类的方法、属性、下标脚本|优化或修改它们的行为|
|监视|继承来的属性（通过添加属性(存储属性或计算属性)观察器）|当值改变时，类就会被通知到|
>**注意：**只有类能够继承

## 13.1	定义一个基类
>**基类：**不继承其它类的类（swift的类并不是从一个通用的基类继承而来）

```swift
//定义一个基类
class Vehicle {
    var currentSpeed = 0.0
    var description:String{
        return "traveling at \(currentSpeed) miles per hour"
    }
    func makeNoise(){
        //什么也不做－因为车辆不一定有噪音
    }
}

let someVehicle = Vehicle()
println("Vehicle:\(someVehicle.description)")
```

## 13.2	子类生成
>**说明**：`class 子类:超类 ｛｝`

```swift
//继承Vehicle
class Bicycle:Vehicle {
    var hasBasket = false
}
let bicycle = Bicycle()

//设置子类自己的实例属性
bicycle.hasBasket = true

//修改继承来的属性
bicycle.currentSpeed = 15.0
```

## 13.3	重写
>**关键字：**`override`(会提醒编译器检查该类是否有匹配重写版本的声明)

>**说明：**子类可以为继承来的实例方法、类方法、实例属性、下标脚本提供自己定制的实现。


### 13.3.1	访问超类的方法、属性及下标脚本

|成员|访问方式|
|-----|------------|
|方法|`super.someMethod()`|
|属性|`super.someProperty`|
|下标脚本|`super[someIndex]`|

### 13.3.2	重写方法
>**关键字**：`override`

```swift
class Train:Vechicle {
    override func makeNoise(){
        println("Choo Choo")
    }
}
let train = Train()
train.makeNoise()
```

### 13.3.3	 重写属性
>**说明**：重写什么？
>1. 重写继承来的`实例属性`或`类属性`
>2. 提供自己定制的`getter`和`setter`
>3. 重写属性观察器观察被重写的属性的变化（非只读属性不可以设置）

>**注意**
>1. 存储型或计算型属性都可以被重写（包括`getters`和`setters`）
>2. 计算机会根据属性的名字和类型检查重写的属性是否与超累中同名同类型的属性相匹配
>2. 可以将继承来的只读属性重写为一个读写属性（通过重写属性的`getters`和`setters`）
>+  如果重写属性提供了`setter`,也一定要提供`getter`
>+  `setter`中可以通过`super.someProperty`来返回继承来的值

```swift
class Car:Vehicle {
    var gear = 1
    override var description:String{
        return super.description + " in gear \(gear)"
    }
}

let car = Car()
car.currentSpeed = 25.0
car.gear = 3
println("Car:\(car.description)")
+ 重写属性观察器
1. 不可重写属性观察器的继承来的属性：常量存储属性、只读计算属性

class AutomaticCar:Car {
    //重写属性及其属性观察器
    override var currentSpeed:Double{
        didSet{
            gear = Int(currentSpeed / 10.0) + 1
        }
    }
}
let automatic = AutomaticCar()
automatic.currentSpeed = 35.0
println("AutomaticCar:\(automatic.description)")
```

## 13.4	防止重写
>**关键字：**`final`
>**说明：**可以通过把方法,属性或下标脚本标记为 `final` 来防止它们被重写,只需要在声明关键字前加上 `final` 特性即
可

|类型|`final`声明方式|用途|
|-----|-----------|------|
|属性|`final var`|不可被重写|
|实例方法|`final func`|不可被重写|
|下标脚本|`final subscript`|不可被重写|
|类方法|`final class func`|不可被重写|
|类|`final class`|不可被继承|