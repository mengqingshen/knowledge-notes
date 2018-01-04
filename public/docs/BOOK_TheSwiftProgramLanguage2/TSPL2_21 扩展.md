---
title: 21 扩展
categories:
  - The Swift Program Language 2
tag:
  - swift语言

---

>**说明：**`扩展`就是为一个已有的`类`、`结构体`、`枚举类型`或者`协议类型`添加新功能(包括没有权限获取原始源代码的情况)。
>+ 添加`计算型属性`和`计算类型属性`
>+ 定义`实例方法`和`类型方法`
>+ 提供新的`构造器`
>+ 定义`下标`
>+ 定义和使用新的`嵌套类型`
>+ 是一个有类型符合某个`协议`

>**注意：**
>+ 扩展可以为一个类型添加新的功能，但是`不能重写已有的功能`。
>+ 如果你通过扩展为一个已有类型添加新功能，那么新功能对该类型的所有已有实例都是可用的，`即使它们是在这个扩展定义之前创建的`。

## 21.1	扩展语法
>**说明：**使用`extension`声明扩展

```swift
// 形式一：为SomeType添加功能
extension SomeType {
    // 为 SomeType 添加的新功能写到这里
}
// 形式二：使SomeType实现协议
extension SomeType: SomeProtocol, AnotherProctocol {
    // 协议实现写到这里
}
```

## 21.2	计算型属性
>**说明：**扩展可以为已有类型添加`计算型实例属性`和`计算型类型属性`。
>**注意：**不可以添加`存储型属性`，也不可以为已有属性`添加属性观察器`。

```swift
// 为Double添加一些只读计算属性
extension Double {
    // 千米
    var km: Double { return self * 1_000.0 }
    // 米
    var m : Double { return self }
    // 厘米
    var cm: Double { return self / 100.0 }
    // 毫米
    var mm: Double { return self / 1_000.0 }
    // 尺
    var ft: Double { return self / 3.28084 }
}

// 访问计算属性
let oneInch = 25.4.mm// 0.0254

let threeFeet = 3.ft// 0.914399970739201

let aMarathon = 42.km + 195.m// 42195.0
```

## 21.3	构造器
>**说明：**扩展可以为已有类型添加`新的构造器`(便利构造器)
>+ 在为值类型扩展的构造器中调用`逐一构造器`：值类型的原始实现中未定义任何定制的构造器时

```swift
// 大小
struct Size {
    var width = 0.0, height = 0.0
}

// 坐标
struct Point {
    var x = 0.0, y = 0.0
}

// 正方形
struct Rect {
    // 原点
    var origin = Point()
    // 大小
    var size = Size()
}

// 创建实例：默认构造器
let defaultRect = Rect()
// 创建实例：逐一成员构造器
let memberwiseRect = Rect(origin: Point(x: 2.0, y: 2.0),
    size: Size(width: 5.0, height: 5.0))

// 扩展 Rect
extension Rect {
    // 添加一个新的构造器
    init(center: Point, size: Size) {
        let originX = center.x - (size.width / 2)
        let originY = center.y - (size.height / 2)
        // 调用逐一成员构造器
        self.init(origin: Point(x: originX, y: originY), size: size)
    }
}
// 使用扩展的构造器创建 Rect 的实例
let centerRect = Rect(center: Point(x: 4.0, y: 4.0),
    size: Size(width: 3.0, height: 3.0))
```

## 21.4	方法
>**说明：**扩展可以为已有类型添加新的`实例方法`和`类型方法`。
>**注意：**`结构体`和`枚举`类型中修改 `self` 或`其属性`的方法必须将该实例方法标注为 `mutating`，正如来自原始实现的`变异方法`一样。

```swift
// 扩展 Int 类型
extension Int {
    /**
    * 添加一个实例方法
    * 按照自身数目重复执行一个任务
    * @param {() -> Void} task 函数
    */
    func repetitions(task: () -> Void) {
        for _ in 0..<self {
            task()
        }
    }
}

// 调用扩展的实例方法
3.repetitions({
    print("Hello!")
})

// 更简洁的方式（使用尾随闭包）
3.repetitions {
    print("Goodbye!")
}
```
*添加变异方法*

```swift
extension Int {
    // 结构体和枚举类型中修改 self 或其属性的方法必须将该实例方法标注为 mutating
    mutating func square() {
        self = self * self
    }
}
// 创建实例
var someInt = 3

// 调用扩展的实例方法
someInt.square()
```

## 21.5	下标
>**说明：**扩展可以为已有类型添加新`下标`

```swift
// 扩展 Int 类型
extension Int {
    /* 添加一个下标
     * 从右往左数
     */
    subscript(var digitIndex: Int) -> Int {
        var decimalBase = 1
        while digitIndex > 0 {
            decimalBase *= 10
            --digitIndex
        }
        return (self / decimalBase) % 10
    }
}
746381295[0]// 5

746381295[1]// 9

746381295[2]// 2

746381295[8]// 7
```

## 21.6	嵌套类型
>**说明：**扩展可以为已有的`类`、`结构体`和`枚举`添加新的`嵌套类型`

```swift
// 扩展 Int 类型
extension Int {
    // 数字类型（正、0、负）
    enum Kind {
        case Negative, Zero, Positive
    }
    // 计算属性：获取数字类型
    var kind: Kind {
        switch self {
        case 0:
            return .Zero
        case let x where x > 0:
            return .Positive
        default:
            return .Negative
        }
    }
}

/**
* 判断数组中 Int 的类型
* @param {[Int]} numbers Int数组
*/
func printIntegerKinds(numbers: [Int]) {
    for number in numbers {
        switch number.kind {
        case .Negative:
            print("- ", terminator: "")
        case .Zero:
            print("0 ", terminator: "")
        case .Positive:
            print("+ ", terminator: "")
        }
    }
    print("")
}
// 调用
printIntegerKinds([3, 19, -27, 0, -6, 0, 7])// + + - 0 - 0 +swift
```
