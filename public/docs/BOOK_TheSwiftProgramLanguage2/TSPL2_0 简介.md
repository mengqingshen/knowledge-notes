---
title: 简介
categories:
  - The Swift Program Language 2
tag:
  - swift语言
---
## 0.1 关于Swift(About Swift)
**用途：**编写`IOS`、`OS X`、`watchOS`应用程序

**特点归纳：**

+ 基于`Cocoa`和`Cocoa Touch`框架
+ 自动垃圾回收（自动引用计数）
+ 采用了`Object-C`的命名参数和动态对象模型，兼容`Object-C`，可以无缝对接到现有的`Cocoa`框架
+ 支持`过程式编程`和`面向对象编程`
+ 支持代码预览（像脚本语言一样，可以实时查看结果）


## 0.2 Swift初见（A Swift Tour）

### 0.2.1 简单值（Simple Values）

#### 0.2.1.1 自动推断类型
**说明：**声明的同时赋值的话，如果不指定类型，编译器会自动推断其类型。

```swift
// 自动推断类型为integer
let implicitInteger = 70
// 自动推断类型为double
let implicitDouble = 70.0
```

#### 0.2.1.2 指定类型
**说明：**指定类型会导致强制类型转换

```swift
// 指定类型为double
let explicitDouble:Double = 70
```

#### 0.2.1.3 显示转换（在表达式中）
**说明：**表达式中的值任何时候都不会发生隐式转化。需要转换为其它类型必须进行显示转换。

**特别：**`\(变量或表达式)`（转换成字符串类型）

```swift
// string
let label = "The width is"

// integer
let width = 94

// integer显示转换为string
let widthLabel = label + String(width)
```
*`\(变量或表达式)`*

```swift
let apples = 3
let oranges = 5
let appleSummary = "I have \(apples) apples."
let fruitSummary = "I have \(apples + oranges) pices of fruit."
```

#### 0.2.1.4 数组和字典
*声明并初始化（自动推断类型）*

```swift
// 数组
var shoppingList = ["catfish", "water", "tulips", "blue paint"]
shoppingList[1] = "bottle of water"

// 字典
var occupations = [
    "Malcolm": "Caption",
    "Kaylee": "Mechanic"
]
occupations["Jayne"] = "Public Relations"

// 清空（类型信息可以被推断出来）
shoppingList = []
occuations = [:]
```
*空数组和空字典*

```swift
// 空数组(指定每个元素的类型)
let emptyArry = [String]()

// 空字典（指定键的类型和值的类型）
let emptyDictionary = [String:Float]()
```


### 0.2.2 控制流（Control Flow）

#### 0.2.2.1 条件判断
**说明：**有两类

+ if
+ switch

**if语法：**

+ 包裹条件的`()`可以省略
+ 语句的`{}`不可以省略
+ `条件`必须是一个`布尔表达式`（其它数据类型会报错，因为不会隐式转换）

**switch语法：**

+ 支持任意类型（不仅仅是整数）
+ 支持各种比较操作（不仅仅是测试想等）
+ `case`后可以有多个数据
+ `case`后可以使用`where`字句
+ 匹配字句后程序会退出`switch`，不需要在每个字句结尾写break
+ ...


**技巧：**`if`和`let`组合起来使用可以来为可选值解包

*if(配合let解包可选值)*

```swift
var optionalString:String? = "Hello"
print(optionalString == nil)

var optionalName:String? = "Join Appleseed"
var greeting = "Hello"
// 将可选值optionalName解包后的值给name
if let name = optionalName {
    greeting = "Hello, \(name)"
}
else {
    greeting = "Hello"
}
```
*switch*

```swift
let vegetable = "red pepper"
switch vegetable {
    case "celery":
        print("Add some raisins and make ants on a log.")
    case "cucumber", "watercress":
        print("That would make a good tea sandwich.")
    case let x where x.hasSuffix("pepper"):
        print("Is it a spicy \(x)?")
    default:
        print("Everything tasts good in soup.")
}
```

#### 0.2.2.2 循环
**说明：**有4类

+ for-in
+ for
+ while
+ repeat-while

*for-in*

```c
// 寻找字典中的所有数组中的最大值
let interestingNumbers = [
    "Prime": [2, 3, 5, 7, 11, 13],
    "Fibonacci": [1, 1, 2, 3, 5, 8],
    "Square": [1, 4, 9, 16, 25]
]
var largest = 0
for (kind, numbers) in interestingNumbers {
    for number in numbers {
        if number > largest {
            largest = number
        }
    }
}
print(largest)// 25
```
*repeat-while*

```swift
var n = 2
while n < 100 {
    n = n * 2
}
print(n)

var m = 2
repeat {
    m = m * 2
} while m < 100
print(m)
```
*for*
**区间：**

+ 包含边界：`...`
+ 不包含上边界：`..<`

```swift
// 区间的方式
var firstForLoop = 0
for i in 0..<4 {
    firstForLoop += i
}
print(firstForLoop)

// 传统的方式
var secondForLoop = 0
for var i = 0; i < 4; ++i {
    secondForLoop += i
}
print(secondForLoop)
```

### 0.2.3 函数和闭包（Functions and Closures）

#### 0.2.3.1 简单函数

```swift
func greet(name: String, day: String) -> String {
    return "Hello \(name), today is \(day)."
}
greet("Bob", day: "Tuesday")// 第一个参数不用说明label
```

#### 0.2.3.2 返回元组

```swift
// 找到元组的最大值、最小值和总和
func calculateStatistics(scores: [Int]) -> (min: Int, max: Int, sum: Int) {
    var min = scores[0]
    var max = scores[0]
    var sum = 0
    for score in scores {
        if score > max {
            max = score
        }
        else if score < min {
            min = score
        }
        sum += score
    }
    return (min, max, sum)
}
// 调用
let statistics = calculateStatistics([5, 3, 100, 3, 9])
print(statistics.sum)
print(statistics.2)
```

#### 0.2.3.3 可变参数

```swift
// 可变参数函数
// 计算总和
func sumOf(numbers: Int...) -> Int {
    var sum = 0
    for number in numbers {
        sum += number
    }
    return sum
}
sumOf()
sumOf(42, 597, 12)
```

#### 0.2.3.4 函数嵌套
**说明：**如果嵌套的函数被返回，调用返回的函数就会出现闭包的效果。

```swift
// 函数嵌套
func returnFifteen() -> Int {
    var y = 10
    // 函数内部的函数
    func add() {
        y += 5
    }
    // 调用函数内部的函数
    add()
    return y
}
returnFifteen()
```

#### 0.2.3.5 返回函数
**说明：**返回的函数是闭包的一种

```swift
// 返回函数
func makeIncrementer() -> (Int -> Int) {
    func addOne(number: Int) -> Int {
        return 1 + number
    }
    return addOne
}
var increment = makeIncrementer()
increment(7)
```

#### 0.2.3.6 函数作为参数

```swift
// 使用函数作为参数
func hasAnyMatches(list: [Int], condition: Int -> Bool) -> Bool {
    for item in list {
        if condition(item) {
            return true
        }
    }
    return false
}
// 被作为参数的函数
func lessThanThen(number: Int) -> Bool {
    return number < 10
}

// 调用
var numbers = [20, 19, 7, 12]
hasAnyMatches(numbers, condition: lessThanThen)
```

#### 0.2.3.7 匿名函数（匿名闭包）
**说明：**匿名函数写法非常自由

+ 如果一个闭包的类型已知，比如作为一个回调函数，可以忽略参数的类型和返回值
+ 单个语句闭包会把它语句的值当作结果返回
+ 可以通过参数位置而不是参数名引用参数
+ 当一个闭包作为最后一个参数传给一个函数的时候，它可以直接跟在括号后面
+ 当一个闭包是传给函数的唯一参数，可以完全忽略`()`

```swift
// 匿名闭包1（包含参数类型和返回值类型）
numbers.map({
    (number:Int) -> Int in
    let result = 3 * number
    return result
})
// 匿名闭包2（可以推导出闭包的参数类型和返回值类型的话，两者都可以省略）
let mappedNumbers = numbers.map({number in 3 * number})
print(mappedNumbers)

// 匿名闭包3（函数体中通过参数位置而不是参数名访问参数）
let sortedNumbers = numbers.sort { $0 > $1 }
print(sortedNumbers)
```

### 0.2.4 对象和类（Object and Classes）
**语法：**

+ `class 类型名 {...}`
+ 使用`.`访问实例的属性和方法
+ 在成员方法中使用`self`引用当前实例对象
+ 使用构造函数`init`初始化类实例
+ 使用析构函数`deinit`在删除对象之前做一些清理工作
+ 没有标准的根类（不同于`java`）
+ 子类的定义：`class 子类名:父类名`
+ 重写父类的方法许必须用`override`标记

*简单类*

```swift
// 形状
class Shape {
    // 实例属性
    var numberOfSides = 0
    // 实例方法
    func simpleDescription() -> String {
        return "A shape with \(numberOfSides) sides."
    }
}

// 创建实例
var shape = Shape()

// 操作实例的成员
shape.numberOfSides = 7
var shapeDescription = shape.simpleDescription()
```
*构造函数和子类*

```swift
// 带名字的形状（基类）
class NamedShape {
    var numberOfSides: Int = 0
    var name: String
    // 构造函数
    init(name: String) {
        self.name = name
    }
    // 成员方法
    func simpleDescription() -> String {
        return "A shape with \(numberOfSides) sides."
    }
}


// 正方形（子类）
class Square: NamedShape {
    var sideLength: Double
    init(sideLength: Double, name: String) {
        self.sideLength = sideLength
        super.init(name: name)
        numberOfSides = 4
    }
    func area() ->  Double {
        return sideLength * sideLength
    }
    // 重写
    override func simpleDescription() -> String {
        return "A square with sides of length \(sideLength)."
    }
}
let test = Square(sideLength: 5.2, name: "my test square")
test.area()
test.simpleDescription()
```

#### 0.2.4.1 计算属性
**说明：**计算属性有getter和setter

+ get：读取属性时返回计算出的属性值
+ set：写入值时被调用，其中内置变量`newValue`存储新值

```swift
// 等腰三角形（子类）
class EquilateralTriangle: NamedShape {
    var sideLength: Double = 0.0
    // 构造函数
    init(sideLength: Double, name: String) {
        self.sideLength = sideLength
        super.init(name: name)
        numberOfSides = 3
    }
    // 计算属性：提供get和set
    var perimeter: Double {
        get {
            return 3.0 * sideLength
        }
        set {
            sideLength = newValue / 3.0
        }
    }
    // 重写
    override func simpleDescription() -> String {
        return "An equilateral triagle with sides of length \(sideLength)."
    }
}
var triangle = EquilateralTriangle(sideLength: 3.1, name: "a triangle")

// 访问计算属性（get被调用）
print(triangle.perimeter)
// 设置计算属性（set计算属性）
triangle.perimeter = 9.9
// 访问存储属性
print(triangle.sideLength)

```

#### 0.2.4.2 属性监控
**说明：**不需要计算属性，但是仍然需要在设置一个新值之前或者之后运行代码。可以使用`willset`和`didSet`。

+ willset：在设置之前调用
+ didSet：在设置后后调用

```swift
// 包含一个三角形实例和一个正方形实例作为成员，并确保边长相等
class TriangleAndSquare {
    var triangle: EquilateralTriangle {
        // 设置新值前调用
        willSet {
            square.sideLength = newValue.sideLength
        }
    }
    var square: Square {
        // 设置新值之前调用
        willSet {
            triangle.sideLength = newValue.sideLength
        }
    }
    init (size: Double, name: String) {
        square = Square(sideLength: size, name: name)
        triangle = EquilateralTriangle(sideLength: size, name: name)
    }
}

// 创建实例
var triangleAndSquare = TriangleAndSquare(size: 10, name: "another test shape")

// 设置前
print(triangleAndSquare.square.sideLength)
print(triangleAndSquare.triangle.sideLength)

// 设置其中一个成员（会触发willset）
triangleAndSquare.square = Square(sideLength: 50, name: "larger square")

// 设置之后
print(triangleAndSquare.triangle.sideLength)

```

#### 0.2.4.3 实例是可选值
**说明：**当实例是nil是，需要避免访问实例的成员导致报错。

```swift
// 声明可选型
let optionalSquare: Square? = Square(sideLength: 2.5, name: "optional square")
// 在操作（方法调用／属性访问／子脚本访问）前加?
let sideLength = optionalSquare?.sideLength
```

### 0.2.5 枚举和结构体（Enumerations and Structures）

#### 0.2.5.1 枚举
**关键字：**`enum`

**说明：**swift中的所有命名类型都可以包含方法（包括枚举）。

+ 可以不设置枚举值的原始值类型
+ 同一枚举类型的实例的成员（枚举值）的原始值（可以在创建实例的时候传入值）可以不同
+ 如果原始值类型为`Int`，可以只设置第一个原始值，剩下的原始值会按照顺序自动完成赋值
+ 也可以使用字符串或者浮点数作为枚举的原始值
+ 使用`rawValue`属性来访问一个枚举成员的原始值
+ 存在一个默认的初始化构造器`init?(rawValue:)`，这意味着可以通过原始值创建可选型美剧值（使用前需要解包）
+ 声明枚举类型常量或在`switch`中时，当指定了枚举类型时，可以使用`.枚举值`的方式

```swift
// 扑克牌级别
enum Rank: Int{
    case Ace = 1
    case Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten
    case Jack, Queen, King
    // 枚举类型可以声明方法
    func simpleDescription() -> String {
        switch self {
        case .Ace:
            return "ace"
        case .Jack:
            return "jack"
        case .Queen:
            return "queen"
        case .King:
            return "king"
        default:
            return String(self.rawValue)
        }
    }
}
// 枚举类型变量
let ace = Rank.Ace

// 调用枚举类型值的方法
ace.simpleDescription()

// 枚举类型变量的原始值
let aceRawValue = ace.rawValue// 1

// 解包通过init?(rawValue:)初始化构造器创建的枚举类型值
if let convertedRank = Rank(rawValue: 3) {
	let threeDescription = convertedRank.simpleDescription()
}
```
*不设置原始值类型*

```swift
// 扑克牌花色
enum Suit {
    case Spades, Hearts, Diamonds, Clubs
    func simpleDescription() -> String {
        switch self {
        case .Spades:
            return "spades"
        case .Hearts:
            return "hearts"
        case .Diamonds:
            return "diamonds"
        case .Clubs:
            return "clubs"
        }
    }
}
// 枚举值
let hearts = Suit.Hearts
// 调用枚举值的方法查看枚举值对应的说明
let heartsDescription = hearts.simpleDescription()
```
*枚举的每个case还可以包含一些值*

```swift
// 服务器响应
enum ServerResponse {
    // 正确响应
    case Result(String, String)
    // 请求失败
    case Error(String)
}
// 为实例传值
let success = ServerResponse.Result("6:00 am", "8:09 pm")
let failure = ServerResponse.Error("Out of cheese")

switch success {
case let .Result(sunrise, sunset):
    // 获取枚举实例的值
    let serverResponse = "sunset is at \(sunrise) and sunset is at \(sunset)."
case let .Error(error):
    let serverResponse = "Failure... \(error)"
}
```

#### 0.2.5.2 结构体
**说明：**结构体和类有很多相同的地方，比如方法和构造器。它们之间最大的区别就是结构体是传值，类是传引用。

```swift
// 扑克牌
struct Card {
    // 级别
    var rank: Rank
    // 花色
    var suit: Suit
    func simpleDescription() -> String {
        return "The \(rank.simpleDescription()) of \(suit.simpleDescription())"
    }
}
// 黑桃3
let threeOfSpades = Card(rank: .Three, suit: .Spades)
let threeOfSpandesDescription = threeOfSpades.simpleDescription()
```

### 0.2.6 协议和扩展（Protocols and Extensions）

#### 0.2.6.1 协议
**关键字：**`protocol`

**说明：**类似于接句，类、枚举、结构体都可以实现协议。

**注意：**

+ 使用结构体实现协议时，如果实现的方法会修改结构体，需要用`mutating`标记。
+ 可以直接使用协议声明变量或常量，但无法调用运行时类型实现的协议值完的方法或属性

```swift
// 定义一个协议
protocol ExampleProtocol {
    var simpleDescription: String {get}
    mutating func adjust()
}
```

```swift
// 通过类实现这个协议
class SimpleClass: ExampleProtocol {
    var simpleDescription: String = "A very simple class."
    var anotherProperty: Int = 69105
    func adjust() {
        simpleDescription += " Now 100% adjust."
    }
}
// 创建实例
var a = SimpleClass()
a.adjust()
let aDescription = a.simpleDescription
// 像使用其他命名类型一样使用协议名，用其声明一个变量，并将实现了该协议的类的实例赋值给它
let protocolValue: ExampleProtocol = a
// 使用协议本身声明的变量或常量不能访问协议外定义成员
// print(protocolValue.anotherProperty)

```

```swift
// 通过结构体实现这个协议
struct SimpleStructure: ExampleProtocol {
    var simpleDescription: String = "A simple structure"
    mutating func adjust() {
        simpleDescription += "(adjusted)"
    }
}
// 创建实例
var b = SimpleStructure()
// 调用方法
b.adjust()
let bDesctiption = b.simpleDescription
```

#### 0.2.6.2 扩展
**关键字：**`extension`

**描述：**为现有的类型添加功能，比如新的方法和计算属性。

**说明：**你可以使用扩展在别处修改定义，甚至是从外部库活着框架引入的一个类型，使得这个类型遵循某个协议。

```swift
// 扩展
extension Int: ExampleProtocol {
    var simpleDescription: String {
        return "The number \(self)"
    }
    mutating func adjust() {
        self += 42
    }
}
print(7.simpleDescription)
```

### 0.2.7 范型（Generics）
**描述：**在`<>`中写一个名字来创建一个范型函数或者类型。

**说明：**可以应用于

+ 函数
+ 方法
+ 类
+ 枚举
+ 结构体

**特点：**

+ 可以使用`where`来指定对类型的要求
+ `<T: Equatable>`和`<T where T: Equatable>`等价

```swift
func anyCommonElements <T: SequenceType, U: SequenceType where T.Generator.Element: Equatable, T.Generator.Element == U.Generator.Element> (lhs: T, _ rhs: U) -> Bool {
    for lhsItem in lhs {
        for rhsItem in rhs {
            if lhsItem == rhsItem {
                return true
            }
        }
    }
    return false
}
anyCommonElements([1, 2, 3], [3])
```

## 0.3 Swift版本历史记录

## 0.4 The Swift Programing language中文版


