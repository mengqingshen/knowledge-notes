---
title: 8 枚举类型
categories:
  - The Swift Program Language 2
tag:
  - swift语言
---

>**说明：**枚举为一组相关的值定义了一个共同的类型，使你可以在你的代码中以类型安全的方式来使用这些值。
>**更加灵活：**
>+ **原始值不是必需的：**不必给每一个枚举成员提供一个值（原始值）
>+ **原始值类型：**原始值的类型可以是`字符串`、`字符`、`整型值`或`浮点数`
>+ **关联值：**枚举成员可以指定任意类型的关联值存储到枚举成员中

>**一等类型：**采用了很多在传统上只被类（class）所支持的特性
>+ **计算型属性：**用于提供枚举值的附加信息
>+ **实例方法：**用于提供和枚举值相关联的功能
>+ **构造函数：**来提供一个初始值
>+ **动态扩展：**可以在原始实现的基础上扩展它们的功能
>+ **实现协议：**还可以遵守协议（protocols）来提供标准的功能

## 8.1 枚举语法
>**语法：**使用`enum`关键词来创建枚举并且把它们的整个定义放在一对`{}`内，使用`case`关键字来定义一个新的枚举成员值。
>+ **没有默认原始值：**枚举成员在被创建时`不会被赋予`一个`默认的整型值`(与 C 和 Objective-C 不同)
>+ **`case`后多个成员值：**多个成员值可以出现在同一行上，用`,`隔开
>+ **枚举类型名：**每个枚举定义了一个全新的类型，它们的名字应该`以一个大写字母开头`（像 Swift 中其他类型一样）
>+ **省略类型名：**当变量或常量的类型已知是某种枚举类型时时，再次为其赋值可以省略相应枚举类型名。

```swift
enum SomeEnumeration{
    case 成员1
    case 成员2
    ...
}
```

```swift
// case后一个成员值的情况
enum CompassPoint {
    case North
    case South
    case East
    case West
}

// case后多个成员值的情况
enum Planet {
    case Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune
}
// 枚举值的声明和赋值
var directionToHead = CompassPoint.West

// 类型推断
directionToHead = .East
```

## 8.2 使用switch语句匹配枚举值
>**注意：**必须穷举所有枚举值的情况（`switch`的完备性）

```swift
directionToHead = .South
switch directionToHead {
    case .North:
        print("Lots of planets have a north")
    case .South:
        print("watch out for penguins")
    case .East:
        print("Where the sun rises")
    case .West:
        print("Where the skies are blue")
}
```

## 8.3 关联值
>**说明：**连同成员值一起存储额外的自定义信息。
>+ 每次在代码中使用该枚举成员时，还可以用不同的关联值
>+ 可以定义 Swift 枚举来存储任意类型的关联值

>**语法：**`case 成员名(关联值1类型, 关联值1类型, ...)`

```swift
// 码
enum Barcode {
    // 条形码
    case UPCA(Int, Int, Int, Int)
    // 二维码
    case QRCode(String)
}
// 条形码
var productBarcode = Barcode.UPCA(8, 85909, 51226, 3)

// 二维码
productBarcode = .QRCode("ABCDEFGHIJKLMNOP")
```

### 提取关联值
>**说明：**可以在`switch`语句中提取一个枚举值的关联值。
>**语法：**需要声明提取关联值到常量（`let`）还是变量（`var`）

```swift
switch 枚举值 {
    case .枚举成员1(let 关联值1, ...)
    ...
}
```
>**技巧：**当一个`enum`值关联的所有关联值都想提取为`let`或`var`时，为了简洁，可以只在成员名称前标注一个`let`或者`var`

```swift
// 通过switch提取关联值
switch productBarcode {
    case .UPCA(let numberSystem, let manufacturer, let product, let check):
        print("UPC-A:\(numberSystem), \(manufacturer), \(product), \(check)")
    case .QRCode(let productCode):
        print("QR code:\(productCode).")
}

// 简写（仅用于所有关联值都要提取为为常量或变量时）:在成员名前标注一个let或var
switch productBarcode {
    case let .UPCA(numberSystem, manufacturer, product, check):
        print("UPC-A: \(numberSystem), \(manufacturer), \(product), \(check).")
    case let .QRCode(productCode):
        print("QR code: \(productCode).")
}

```

## 8.4 原始值
>**说明：**枚举成员都可以有一个默认值，也叫原始值
>+ 原始值的类型必须相同
>+ 原始值可以是`字符串`，`字符`，或者`任意整型值`或`浮点型值`

>**注意：**`原始值`和`关联值`不要混淆

|区分对象|设置的时间|是否可以改变|
|-|-|-|
|关联值|创建一个基于枚举成员的常量或变量时|是|
|原始值|定义枚举类型时|否|

```swift
enum ASCIIControlCharacter: Character {
    case Tab = "\t"
    case LineFeed = "\n"
    case CarriageReturn = "\r"
}
```

### 8.4.1 原始值的隐式赋值
>**说明：**在使用原始值为`整数`或者`字符串类型`的枚举时，不需要显式地为每一个枚举成员设置原始值，Swift 将会自动为你赋值。

#### 原始值为整数
>+ 隐式赋值的值依次递增1
>+ 如果第一个枚举成员没有设置原始值，其原始值将为0

```swift
// 原始值的隐式赋值
// 星球（带有Int型原始值）
enum Planet: Int {
    case Mercury = 1, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune
}

// 访问原始值
let earthsOrder = Planet.Earth.rawValue
```


#### 原始值为字符串
>**说明：**每个枚举成员的隐式原始值为该枚举成员的名称

```swift
// 指南针（带有String类型）
enum CompassPoint: String {
    case North, South, East, West
}
let sunsetDirection = CompassPoint.West.rawValue
```

### 8.4.2 使用原始值初始化枚举实例
>**说明：**在定义枚举类型的时候使用了`原始值`，那么将会自动获得一个初始化方法
>**调用初始化方法：**`枚举类型名(rawValue: 原始值)`
>+ **参数：**接收一个叫做`rawValue`的参数，参数类型即为原始值类型
>+ **返回值（可选型）：**`枚举成员`或`nil`

```swift
// 星球（带有Int型原始值）
enum Planet: Int {
    case Mercury = 1, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune
}

// 使用原始值初始化枚举实例
let passiblePlanet = Planet(rawValue: 7)

// 枚举的可失败构造器
let positionToFind = 9
if let somePlanet = Planet(rawValue: positionToFind) {
    switch somePlanet {
    case .Earth:
        print("Mostly harmless")
    default:
        print("Not a safe place for humans")
    }
} else {
    print("There isn't a planet at position \(positionToFind)")
}
```

## 8.5 递归枚举
>**说明：**是一种特殊的枚举类型
>+ 有一个或多个枚举成员`使用该枚举类型的实例作为关联值`
>+ 使用递归枚举时，编译器会插入一个间接层
>+ 可以在枚举成员前加上`indirect`来表示该成员可递归

```swift
// 表达式
enum ArithmeticExpression {
    // 纯数字
    case Number(Int)
    // 两个表达式的和
    indirect case Addition(ArithmeticExpression, ArithmeticExpression)
    // 两个表达式的积
    indirect case Multiplication(ArithmeticExpression, ArithmeticExpression)
}

// 对表达式进行处理的函数
func evaluate(expression: ArithmeticExpression) -> Int {
    switch expression {
        case .Number(let value):
            return value
        case .Addition(let left, let right):
            return evaluate(left) + evaluate(right)
        case .Multiplication(let left, let right):
            return evaluate(left) * evaluate(right)
    }
}

// 计算 (5 + 4) * 2
let five = ArithmeticExpression.Number(5)
let four = ArithmeticExpression.Number(4)
let sum = ArithmeticExpression.Addition(five, four)
let product = ArithmeticExpression.Multiplication(sum, ArithmeticExpression.Number(2))
print(evaluate(product))
```