---
title: 6 函数
categories:
  - The Swift Program Language 2
tag:
  - swift语言

---

>**说明：**用来完成特定任务的独立的代码。
>+ **从简单到复杂：**既可以定义最简单的没有参数名字的 C 风格函数，也可以定义复杂的带局部和外部参数名的 Objective-C 风格函数
>+ **默认参数值：**参数可以提供默认值，以简化函数调用
>+ **In-out参数：**参数前加 `&` 符,表示这个值可以被函数修改（只能针对变量参数，类似传引用）
>+ **当作普通变量：**可以把函数类型当做任何其他普通变量类型一样处理
>+ **嵌套：**函数的定义可以写在在其他函数定义中

## 6.1	定义
>**定义：**使用`func`关键字
>+ **函数名：**描述函数执行的任务
>+ **参数：**可以定义一个或多个有名字和类型的值，作为函数的输入
>+ **返回值：**可以定义某种类型的值作为函数执行结束的输出

```swift
func sayHelloAgain(personName: String) -> String {
    return "Hello again, " + personName + "!"
}
print(sayHelloAgain("Anna"))
```

### 6.1.1	参数
>**说明：**特点总结
>+ **参数数量：**参数可以没有、1个或多个（用`,`分隔）
>+ **参数名：**包括外部参数名（为了调用时的可读性）和内部参数名（内部调用）
>+ **默认参数值：**当默认值被定义后,调用这个函数时可以忽略这个 参数
>+ **定义可变参数：**可以用可变参数来传入不确定数 量的输入参数
>+ **常量参数：**函数参数默认是常量，在函数体中不能修改
>+ **变量参数：**可以在函数中把它当做新的可修改副本来使
用

#### 6.1.1.1	参数数量和类型
>**说明：**参数具有以下特点
>+ **数量：**可以有0个或多个输入参数
>+ **类型：**可以有多种类型的输入参数

|类型|参数数量|参数类型|
|-|-|-|
|无参函数|0||
|多参量函数|大于1|多种类型|

```swift
// 无参函数
func sayHelloWorld() -> String {
    return "hello, world"
}

// 1个参数
func sayHello(personName: String) -> String {
    let greeting = "Hello, " + personName + "!"
    return greeting
}

func sayHelloAgain(personName: String) -> String {
    return "Hello again, " + personName + "!"
}

// 多参量函数
func sayHello(personName: String, alreadyGreeted: Bool) -> String {
    if alreadyGreeted {
        return sayHelloAgain(personName)
    } else {
        return sayHello(personName)
    }
}
print(sayHello("Tim", alreadyGreeted: true))
```

#### 6.1.1.2	参数名
>**说明：**包括`内部参数名`和`外部参数名`

|特点|说明|备注|
|-|-|-|
|内部参数名|在函数被调用时，函数内部用来访问参数相应副本|所有参数都必须有|
|外部参数名|往函数的调用语句中传递参数时使用|第一个参数可以指定，其它参数要么指定一个外部参数名，要么就默认和内部参数名相同（除非使用`_`声明不指定外部参数名）|

```swift
// 指定外部参数名
func sayHello(to person: String, and anotherPerson: String) -> String {
    return "Hello \(person) and \(anotherPerson)!"
}
print(sayHello(to: "Bill", and: "Ted"))

// 使用_忽略外部参数名
func someFunction(firstParameterName: Int, _ secondParameterName: Int) {
    // 函数体
}
someFunction(1, 2)
```

#### 6.1.1.2	默认参数值
>**语法：**`部参数名: 参数类型 = 默认值`

```swift
func someFunction(parameterWithDefault: Int = 12) {
	// ...
}
```
>**技巧：**将带有默认值的参数放在函数参数列表的最后。这样可以保证在函数调用时，非默认参数的顺序是一致的，同时使得相同的函数在不同情况下调用时显得更为清晰。

#### 6.1.1.3	可变参数
>**说明：**可以用可变参数来指定函数参数可以被传入不确定数量的输入值。
>+ 可变参数的传入值在函数体中变为此类型的一个数组
>+ 一个函数`最多只能有一个`可变参数
>+ 如果函数有一个或多个带默认值的参数，而且还有一个可变参数，那么把可变参数放在参数表的最后

>**语法：**`部参数名: 参数类型 ...`

```swift
func arithmeticMean(numbers: Double...) -> Double {
    var total: Double = 0
    for number in numbers {
        total += number
    }
    return total / Double(numbers.count)
}
// 调用
arithmeticMean(1, 2, 3, 4, 5)
arithmeticMean(3, 8.25, 18.75)
```

#### 6.1.1.4	常量参数和变量参数
>**说明：**对于`值类型`(`class`之外的所有类型)，无论`常量参数`还是`变量参数`，函数使用的都是副本。

|分类|副本是否可以修改|语法|备注|
|-|-|-|-|
|常量参数|否|默认||
|变量参数|是|`var 参数名: 参数类型`|仅存在于函数调用的声明周期中，调用结速后修改便消失了|

```swift
/**
* @param {String|var} string 字符串
* @param {Int} totalLength 输出总长度
* @param {Character} pad 填充使用的字符
*/
func alignRight (var string: String, totalLength: Int, pad: Character) -> String {
    // 要在前面填充的字符总数
    let amountToPad = totalLength - string.characters.count;
    if amountToPad < 1 {
        return string
    }
    let padString = String(pad)
    // 补上填充字符
    for _ in 1...amountToPad {
        string = padString + string
    }
    // 返回填充后的字符串
    return string
}


```

#### 6.1.2.5	输入输出参数
>**关键字：**`inout`(声明函数时使用)
>**操作符：**`&`（调用函数时使用）
>**说明：**相当于将原本针对值类型默认的`传值`转变为`传引用`。
> + 只能传递`变量`给`输入输出参数`（不能传入`常量`或者`字面量`）
> + 不能用于`带默认值的参数`和`可变参数`
> + 参数被`inout`标记后就不能再被`let`或`var`标记

>**扩展：**函数对函数体外进行影响的两个方式
>+ 返回值
>+ 输入输出参数

```swift
/**
* 对调两个整数的值
* @param {Int|input} a 第一个整数
* @param {Int|input} b 第二个整数
*/
func swapTwoInts(inout a: Int, inout _ b: Int) {
    let temporaryA = a
    a = b
    b = temporaryA
}

var someInt = 3
var anotherInt = 107
// &
swap(&someInt, &anotherInt)
print("someInt is now \(someInt), and anotherInt is now \(anotherInt)")
```

### 6.1.2	返回值
>**声明返回值语法：**`func 函数名 () -> 返回值类型 {...}`
>**说明：**分为3种情况

|返回值|说明|备注|
|-|-|-|
|无|严格说来函数依然返回了值`Void`（空元组）||
|一个返回值|任意类型||
|多个返回值|用元组让多个值作为一个符合值返回|也可以是可选型元组|
>**注意：**函数一旦设置了返回值，则必须通过`return`返回相应类型的返回值。

#### 无返回值函数
>**说明：**声明方式有3种
>+ 省略`-> 返回值类型`
>+ `-> Void`
>+ `-> ()`

```swift
// 无返回值
// 1. 不使用 ->
func sayGoodbye(personName: String) {
    print("Bye, \(personName)")
}

// 2. -> Void
func sayGoodbye2(personName: String) -> Void {
    print("Bye, \(personName)")
}

// 3. -> ()
func sayGoodsbye3(personName: String) -> () {
    print("Bye, \(personName)")
}
```

#### 返回元组
>**技巧：**声明返回的元组时，为每一项设置名字，以便通过名字访问每一项。

```swift
/**
* 返回数组种的最大值和最小值
* @param {Array<Int>} array 数组
* @return {(min: Int, max: Int)} 元组
*
*/
func minMax(array: [Int]) -> (min: Int, max: Int) {
    var currentMin = array[0]
    var currentMax = array[0]
    for value in array[1..<array.count] {
        if value < currentMin {
            currentMin = value
        }
        else if value > currentMax {
            currentMax = value
        }
    }
    return (currentMin, currentMin)
}
let bounds = minMax([8, -6, 2, 109, 3, 71])
print("min is \(bounds.min) and max is \(bounds.max)")
```

#### 返回可选型元组
>**语法：**`-> (...)?`
>**应用：**当返回的元组可能是一个`nil`值时必须将返回的元组定义为可选型

```swift
/**
* 返回数组种的最大值和最小值
* @param {Array<Int>} array 数组
* @return {(min: Int, max: Int)?} 元组
*
*/
func minMax(array: [Int]) -> (min: Int, max: Int)? {
    // 如果数组为空，返回nil
    if array.isEmpty {
        return nil
    }
    var currentMin = array[0]
    var currentMax = array[0]
    for value in array[1..<array.count] {
        if value < currentMin {
            currentMin = value
        }
        else if value > currentMax {
            currentMax = value
        }
    }
    return (currentMin, currentMin)
}
if let bounds = minMax([8, -6, 2, 109, 3, 71]) {
    print("min is \(bounds.min) and max is \(bounds.max)")
}
```

## 6.2	函数类型
>**说明：**函数的类型由函数的`参数类型`和`返回值类型`决定。项其它类型一样：
>+ **常量或变量：**可以定义一个类型为函数的常量或变量，并将函数赋值给它
>+ **赋值：**如果变量或常量是某种函数类型，那么只有匹配的函数才能进行赋值
>+ **类型推断：**当赋值一个函数给常量或变量时，Swift可以推断其函数类型
>+ **作为参数**
>+ **作为返回值类型**

### 6.2.1	基本使用

```swift
// 函数类型：(Int, Int) -> Int
func addTwoInts(a: Int, _ b: Int) -> Int {
    return a + b
}

func multiplyTwoInts(a: Int, _ b: Int) -> Int {
    return a * b
}

// 函数类型：() -> Void
func printHelloWorld() {
    print("hello, world")
}

// 使用函数类型变量
var mathFunction: (Int, Int) -> Int = addTwoInts
print("Result: \(mathFunction(2, 3))")// 声明并赋值

mathFunction = multiplyTwoInts// 重新赋值
print("Result: \(mathFunction(2, 3))")

let anotherMathFunction = addTwoInts// 自动类型推断

```

### 6.2.2	作为参数

```swift
// 作为参数
func printMathResult(mathFunction: (Int, Int) -> Int, _ a: Int, _ b: Int) {

    print("Result: \(mathFunction(a, b))")
}
printMathResult(addTwoInts, 3, 5)

```

### 6.2.3	作为返回值

```swift
// 作为返回值
func stepForward(input: Int) -> Int {
    return input + 1
}
func stepBackward(input: Int) -> Int {
    return input - 1
}

/**
* 选择相应步骤的函数
* @param {Bool} backwards 返回哪个函数的依据
* @return {(Int) -> Int} 函数类型返回值
*/
func chooseStepFunction(backwards: Bool) -> (Int) -> Int {
    return backwards ? stepBackward : stepBackward
}
var currentValue = 3
let moveNearerToZero = chooseStepFunction(currentValue > 0)
```

## 6.3	嵌套函数
>**说明：**定义在其他函数中的函数。
>+ 对外界不可见
>+ 可以通过被函数返回使其对外界可见

```swift

```