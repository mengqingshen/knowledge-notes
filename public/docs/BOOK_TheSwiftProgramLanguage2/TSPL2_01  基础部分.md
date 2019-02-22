---
title: 1 基础部分
categories:
  - The Swift Program Language 2
tag:
  - swift语言
---

## 1.1 常量和变量

>**描述：**常量和变量把一个名字和一个指定类型的值关联起来。
>**说明：**两者的区别在于设定后是否还能修改
>+ 常量：设定后不可能修改
>+ 变量：可以随意更改

### 1.1.1 声明常量和变量

>**共同规则：**
>+ 可以在一行中声明多个，用`,`分隔

>**关键字：**
>+ `let`：常量
>+ `var`：变量

```swift
// 常量声明
let maximunNumberOfLoginAttemts = 10

// 变量声明
var currentLoginAttempts = 0
var x = 0.0, y = 0.0, z = 0.0
```

### 1.1.2 类型标注

>**用途：**说明常量或者变量中要存储的值的类型
>**注意：**
>+ 如果没有类型标注，声明时都必须设置一个值作为初始值，否则报错
>+ 类型标注可以省略，此时Swift可以通过赋的初始值推断其类型

>**语法：**`var welcomeMessage: String`

| var        | welcomeMessage: |      | String |
| ---------- | --------------- | ---- | ------ |
| `let(var)` | 常量(变量)名         | `:`  | `空格`   |

>**说明：**可以在一行中定义多个同样类型的变量，`,`分隔，并在最后一个比变量名之后添加`类型标注`

```swift
// 声明
var welcomeMessage: String

// 赋值
welcomeMessage = "Hello"

// 声明多个具有相同类型标注的变量的略写方式
var red, green, blue:Double
```

### 1.1.3 常量和变量的命名

>**说明：**声明完成后，一些特性将不能再次修改
>+ 已经声明的名字不能再次用来声明
>+ 声明时确定的类型不能更改
>+ 常量与变量不能相互转换

| 不允许的字符              |
| ------------------- |
| 数学符号                |
| 箭头                  |
| 保留的（非法的）`Univode`码位 |
| 连线                  |
| 制表符                 |
| 数字（仅开头不能使用）         |

```swift
// 常量和变量的命名
let π = 3.141592654
let 你好 = "Hello"
let ？？ = "dog"// 中文全角的
```

### 1.1.4 输出常量和变量

#### print函数
>**描述：**一个用来输出一个或多个值到适当输出区的全局函数。
>**说明：**可以直接通过`\(表达式)`的方式在字符串中插值（`String interprolation`）
>**原型：**`全局函数`

```swift
>/**
>* @param {Any...} items 可变个任意类型的参数
>* @param {String=} separator 连接符（默认为空格，可省略）
>* @param {String=} terminator 自动追加再末尾的字串（默认为换行符，可省略）
>* @param {&Target=} toStream 输出流（默认为标准输出流，可省略）
>*/
>void print(items: Any..., separator: String, terminator: String, toStream: &Target)
```

```swift
let str1 = "hello"
var str2 = "world"
// hello,world!
print(str1, str2, separator:",", terminator:"!")

// hello world\n
print(str1, str2)
```

## 1.2 注释

>**说明：**和C语言的注释非常相似
>+ 单行注释：`// 这是一个注释`
>+ 多行注释：`/* 多行注释 */`

 >**注意：**和C语言不同的是，swift支持嵌套的多行注释。便于在原先多行注释的基础上扩大注释范围。



## 1.3 分号

>**说明：**和大部分语句有所不同
>+ 单独占一行的语句的结尾处的分号可以省略
>+ 一行代码存在多个语句，则语句之间的`;`不能省略

```swift
let cat = "?"; print(cat)
```

## 1.3 整数

>**说明：**一共有`10`种整数类型（`(U)Int(4种宽度)`）
>**注意：**其中8种类型是指定的宽度的，`Int`和`UInt`类型比较特殊，其宽度依赖于处理器架构。

| 长度(bit) | 有符号   | 无符号    |
| ------- | ----- | ------ |
| 8       | Int8  | UInt8  |
| 16      | Int16 | UInt16 |
| 32      | Int32 | UInt32 |
| 64      | Int64 | UInt64 |
| 依赖平台    | Int   | UInt   |

### 1.3.1 整数范围

>**说明：**可以通过`mix`和`max`属性获得相应类型的最大值和最小值。

```swift
let minValue = UInt8.min// 0
let maxValue = UInt8.max// 255
```

### 1.3.2 Int

>**技巧：**大多数时候使用`Int`类型
>+ 可以提高代码的一致性和可复用性
>+ 即使在32位机器上，也足够大了（`-2,147,483,648~2,147,483,647`）

### 1.3.3 UInt

>**技巧：**尽可能使用`Int`而不是`UInt`，即使已知值是非负的
>+ 一致型和可复用性
>+ 避免不同类型数字之间的转换(默认的对整数类型的表达式的推断类型为`Int`)

## 1.4 浮点数

>**定义：**有小数部分的数字
>**说明：**有两种有符号浮点数类型

| 浮点类型   | 解释     | 最大精度（整数部分和小数部分数字位数之和） | 适用               |      |
| ------ | ------ | --------------------- | ---------------- | ---- |
| Double | 64位浮点数 | 7                     | 需要存储很大或很高精度的浮点数时 |      |
| Float  | 32位浮点数 | 16                    | 精度要求不高时          |      |

```swift
var f:Float = 0.123456789// 0.1234568
var d:Double = 0.12345678901234567// 0.1234567890123457
```

## 1.5 类型安全和类型推断

>**说明：**
>+ **类型安全：**编译器会在编译阶段进行类型检查，并把不匹配的类型标记为错误
>+ **类型推断：**如果在声明阶段没有显示指定类型，编译器回通过赋的值自动推断出表达式的类型

>**注意：**
>+ 当推断浮点数的类型时，Swift 总是会选择`Double`而不是`Float`
>+ 如果表达式中同时出现整数和浮点数，则计算结果被推断为`Double`

```swift
// meaningOfLife 会被推测为 Int 类型
let meaningOfLife = 42

// pi 会被推测为 Double 类型
let pi = 3.14159

// 表达式种出现了一个浮点字面量，所以表达式被推断为 Double 类型
let anotherPi = 3 + 0.14159
```

## 1.6 数值型字面量

### 整数字面量
>**说明：**根据进制划分有`4`种

| 进制   | 前缀   |
| ---- | ---- |
| 十进制  | 无    |
| 二进制  | `0b` |
| 八进制  | `0o` |
| 十六进制 | `0x` |

```swift
// 17
let decimalInteger = 17// 十进制
let binaryInter = 0b10001// 二进制
let octalInteger = 0o21// 八进制
let hexadecimalInteger = 0x11// 十六进制
```

### 浮点数字面量
>**说明：**根据进制划分有`2`种

| 进制   | 前缀   | 小数点两边      | 可选的指数         |
| ---- | ---- | ---------- | ------------- |
| 十进制  | 无    | 至少有一个十进制数  | `(E)e`， 基数为10 |
| 十六进制 | `0x` | 至少有一个十六进制数 | `(P)p`        |

```swift
// 10进制
let a = 1.25e2// 1.25 x 10^2

// 16进制
let b = 0xFp-2// 15 x 2^-2

// 12.1875
let decimalDouble = 12.1875
let exponentDouble = 1.21876e1
let hexadecimalDouble = 0xC.3p0
```

### 增强可读性
>**说明：**整数和浮点数都可以添加额外的零并且包含下划线来增强可读性

```swift
// 额外的零
let paddedDouble = 000123.456
// 额外的下划线
let oneMillon = 1_000_000
let justOverOneMillion = 1_000_000.000_000_1
```

## 1.7 数值型类型转换

>**使用`Int`：**即使代码中的整数常量或变量已知非负，也尽量使用`Int`
>+ 保证整数变量或常量可以直接被复用
>+ 可以匹配整数类字面量的类型推断（整数字面量只会被推断为`Int`，赋值给其它类型的整数需要类型转换）

>**使用其它整数类型：**
>+ 处理外部的长度明确的数据时，为了优化性能、内存占用等
>+ 可以及时发现溢出
>+ 可以暗示正在处理特殊数据

### 1.7.1 整数转换

#### 1.7.1.1 必要性

>+ 如果数字超过了常量或变量可存储的范围，编译的时候会报错
>+ 两种类型（`Int`除外）的整数不能直接相加

```swift
// 会报错，因为 UInt8 不能存储负数
let cannotBeNegative:UInt8 = -1

// 会报错，因为超过了最大值
let tooBig:Int8 = Int8.max + 1
```

#### 1.7.1.2 使用类型对应的构造器进行转换

>**注意：**不能传入任意类型的值给构造器，只能是有对应构造器的值
>**扩展：**可以通过扩展现有的类型让它可以接受其它类型的值

```swift
let twoThousand: UInt16 = 2_000
let one: UInt8 = 1

// 将 one 由 UInt8 转换为 UInt16，最终 twoThousandAndOne 被推断为 UInt16
let twoThousandAndOne = twoThousand + UInt16(one)
```

### 1.7.2 整数和浮点数转换

#### 1.7.2.1 整数->浮点数

>**说明：**
>+ **强制转换：**对与所有类型的整数常量或变量，可以强制转换为`Double`或`Float`
>+ **隐式转换：**声明时指定`Double`或`Float`，则用来初始化的整数字面量会被自动转换

>**注意：**数值类常量或变量不同于数值类字面量，后者可以不同类型可以一起运算，因为字面量本身没有明确的类型

```swift
// 隐式转换
let d:Double = 4

// 强制转换
let three = 3
let pointOneFourOneFineNine = 0.14159
let pi = Double(three) + pointOneFourOneFineNine
```

#### 1.7.2.2 浮点数->整数

>**说明：**声明变量或常量时指定任何一种整数类型，则用来初始化字面量只能是整数。

```swift
// 强制转换
let pi = 3.14
let integerPi = Int(pi)
```

## 1.8 类型别名

>**语法：**`typealias 别名 = 原始类型名`
>**用途：**给现有类型起一个更有意义的名字。
>**说明：**定义了类型别名之后，可以在任何使用原始类型名的地方使用。

```swift
// 定义类型别名
typealias AudioSample = UInt16
// 调用类型别名
var maxAmolitudeFound = AudioSample.min
```

## 1.9 布尔值

>**类型：**`Bool`
>**字面量：**
>+ true
>+ false

```swift
// 橙子是橙子，true
let orangesAreOrange = true
// 萝卜很好吃，false
let turnipsAreDelicious = false

if turnipsAreDelicious {
    print("Mmm, tasty turnips")
}
else {
    print("Eww, turnips are horrible.")
}
```

## 1.10 元组

>**用途：**元组把多个值组合成一个复合值
>**说明：**
>+ 元组内的值可以是任意类型，并不要求是相同类型。
>+ 可以作为函数的返回值
>+ 可以为元组中的每个元素命名
>+ 可以通过下标访问元组中的每个元素

>**语法：**`(字面量1, 字面量2, ...)`
>
>**限制：**元组在临时组织值的时候很有用，但不适合创建复杂的数据结构。
>**扩展：**如果数据结构不是临时使用，请使用类或者结构体而不是元组。

```swift
// 声明：一个类型为 (Int, String) 的元组
let http404Error = (404, "Not found")

// 分解
let (statusCode, statusMessage) = http404Error
print("The status code is \(statusCode)")

print("The status message is \(statusMessage)")

// 分解时用_忽略
let (justTheStatusCode, _) = http404Error

// 通过下标访问元组中的元素
print("The status code is \(http404Error.1))")

// 定义元组时为单个元素命名
let http200Status = (statusCode: 200, description: "OK")
print("The status code is \(http200Status.statusCode)")
```

## 1.11 可选类型

>**用途：**值可能缺失的情况
>**应用：**任何类型

### 1.11.1 nil

>**语法：**`var(let) 标识符: 类型? = 表达式`
>**相关字面量：**`nil`
>+ `nil`不能用于非可选的常量或变量
>+ 如果声明一个可选常量或者变量但是没有赋值，他们会自动被设置为`nil`
>+ 任何类型的可选状态都可以被设置为`nil`
>

```swift
var serverResponseCode: Int? = 404

// nil是一类可选类型字面量，表示没有值
serverResponseCode = nil
```

### 1.11.2 if 语句以及强制解析

>1. 通过判断可选型是否`!= nil`,判断可选型是否存在值
>2. 如果存在(否则会报错)通过`可选型变量或常量!`强制解析

```swift
let possibleNumber = "123"
// 强制类型转换返回的是一个可选型
let convertedNumber = Int(possibleNumber)

// 通过 !强制解析
if convertedNumber != nil {
    print("convertedNumber has an integer value of \(convertedNumber!)")
}
```

### 1.11.3 可选绑定

>**用途：**更加便捷地解包可选型值。
>**限制：**只能结合`if`或`while`使用
>**说明：**如果包含值就把值赋给一个临时`常量`或者`变量`。

#### 绑定一个

```swift
var possibleNumber = "abc";
if let actualNumber = Int(possibleNumber) {
    // 如果确实包含一个值
    print("\'\(possibleNumber)\' has an integer value of \(actualNumber)")
}
else {
    // 可选值为nil
    print("\'\(possibleNumber)\' could not be converted to an integer")// 'abc' could not be converted to an intege
}
```

#### 批量绑定

```swift
if let firstNumber = Int("4"), secondNumber = Int("42") where firstNumber < secondNumber {
    // 4 < 42
    print("\(firstNumber) < \(secondNumber)")
}
```

### 1.11.4 隐式解析可选类型

>**说明：**相当于声明可选型(`类型?`)和强制解包(`可选型!`)两个过程的结合。
>+ 被赋值后，值要么是解包后的值，要么是`nil`
>+ 在可选绑定中仍然可以作为普通可选类型使用

>**限制：**右边表达式的返回值必须是可选型，否则将报错。

```swift
// 声明可选型并强制解析
let possibleString: String? = "An optional string."
let forcedString: String = possibleString!

// 隐式解析(一步到位)
let assumedString: String! = "An implicitly unwrapped optional string."
if assumedString != nil {
    print(assumedString)
}

// 在可选绑定中使用隐式解析可选类型
if let definiteString = assumedString {
    print(definiteString)
}
```

## 1.12 错误处理

>**说明：**分位两步
>1. 定义函数时，使用`throws`标记可能抛出错误的函数
>2. 用`do-try-catch`包含函数的调用过程和错误处理方式

```swift
func makeASandwich() throws {
    // ...
}
do {
    // 可能报错的函数的调用前必须加关键字 try
    try makeASandwich()
    // 如果没有报错则执行
    eatASandwich()
}
catch Error.OutOfCleanDishes {
    // 捕获错误类型1
}
catch Error.MissingIngredients(let ingredients) {
    // 捕获错误类型2
}
```

## 1.13 断言

>**用途：**当满足一定条件时结束代码运行通过调试来找到值缺失的原因。
>**适用场景：**
>+ 整数类型的下标索引被传入一个自定义下标脚本实现，但是下标索引值可能太小或者太大
>+ 需要给函数传入一个值，但是非法的值可能导致函数不能正常执行
>+ 一个可选值现在是`nil`，但是后面的代码运行需要一个非`nil`的值

### assert函数
>**说明：**在运行时判断一个逻辑条件是否为`true`
+ 如果为`true`，代码继续运行
+ 如果为`false`，代码执行结束
+ 可以附加一条调试信息

>**注意：**在Xcode 中使用`target Release`配置为`build`时，断言会被禁用。
>**原型：**`全局`

```swift
>/**
>* @param {Bool} condition 结果为true或false的表达式
>* @param {String=} message 调试信息
>*/
>Void assert(condition: Bool,  message: String)
```

```swift
let age = -3
assert(age >= 0, "Aperson's age cannot be less than zero");
```