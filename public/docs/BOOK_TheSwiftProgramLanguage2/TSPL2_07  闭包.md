---
title: 7 闭包
categories:
  - The Swift Program Language 2
tag:
  - swift语言
toc: true
---

>**描述：**可以捕获和存储其所在上下文中任意常量或变量的引用的字包含的函数代码块。
>**说明：**由`3`种类型的闭包。

|分类|是否有名字|捕获内容|适用|
|-|-|-|-|
|全局函数|是|无|严格说来不是闭包|
|嵌套函数|是|其封闭函数域内的变量或常量的引用|在较复杂函数中，需要命名和定义自包含代码模块的场景|
|闭合表达式|否|其上下文中的变量或常量的引用|处理一些函数并需要将另外一些函数作为该函数的参数时|


## 7.1	闭包表达式
>**描述：**闭包表达式是一种利用简洁语法构建内联闭包的方式
>**说明：**和`全局函数`或`嵌套函数`相比有如下特点
>+ **类型推断：**利用上下文推断`参数`和`返回值`类型
>+ **隐式返回：**隐式返回单表达式闭包，即单表达式闭包可以省略`return`语句。
>+ **参数名称缩写**
>+ **尾随闭包语法**

>**语法：**一般形式

```swift
{ (parameters) -> returnType in
    statements
}
```
>+ 可以使用`常量`、`变量`和`inout`类型作为参数
>+ 参数不支持设置`默认值`
>+ 可以在参数列表的最后使用`可变参数`
>+ `元组`也可以作为参数和返回值

```swift
let names = ["Charis", "Alex", "Ewa", "Barry", "Daniella"]

// 创建一个比较函数（按照字典顺序逆序排序）
func backwards(s1: String, s2: String) -> Bool {
    return s1 > s2
}

// sort
var reversed = names.sort(backwards)// ["Ewa", "Daniella", "Chris", "Barry", "Alex"]

// 闭包表达式
reversed = names.sort({(s1: String, s2: String) -> Bool in
    return s1 > s2
})
// 闭包表达式：推断类型
reversed = names.sort({s1, s2 in return s1 > s2})

// 闭合表达式：推断类型、隐式返回
reversed = names.sort({s1, s2 in s1 > s2})

// 闭合表达式：推断类型、隐式返回、参数名缩写
reversed = names.sort({$0 > $1})

// 闭合表达式：>(一个字符串函数)
reversed = names.sort(>)
```

## 7.2	尾随闭包
>**条件：**当将闭包作为最后一个参数传递给函数时
>**用途：**增强函数的`可读性`（其实就是一种特殊条件下的简写）
>**语法：**书写在函数`()`之后，用`{}`括起来。

```swift
/* 案例1：基本案例 */
/**
* 用于展示尾随闭包的函数
* @param {() -> Void} closure 函数类型参数
*/
func someFunctionThatTakesAClosure(closure: () -> Void) {
    // 函数主体
}

// 调用：不使用尾随闭包
someFunctionThatTakesAClosure({
    // 闭包主体
})

// 调用：使用尾随闭包
someFunctionThatTakesAClosure() {
    // 闭包主体
}

/* 案例2：sort */
// sort使用尾随闭包
reversed = names.sort() {$0 > $1}

// sort使用尾随闭包：省略()

/* 案例3：map */
let digitNames = [
    0: "Zero",
    1: "One",
    2: "Two",
    3: "Three",
    4: "Four",
    5: "Five",
    6: "Six",
    7: "Seven",
    8: "Eight",
    9: "Nine"
]
let numbers = [16, 58, 510]

// 使用尾随闭包：["OneSix", "FiveEight", "FiveOneZero"]
let strings = numbers.map{
    (var number) -> String in
    var output = ""
    while number > 0 {
        output = digitNames[number % 10]! + output
        number /= 10
    }
    return output
}
```

## 7.3	捕获值
>**说明：**能够捕获值的闭包有`2`种
>+ **嵌套函数：**捕获其外部函数所有的参数以及定义的常量和变量
>+ **闭包表达式：**闭包可以在其被定义的上下文中捕获常量或变量

>**注意：**
>1. 如果一个值是不可变的，Swift 可能会改为捕获并保存一份对值的拷贝
>2. Swift 也会负责被捕获变量的所有内存管理工作，包括释放不再需要的变量

```swift
// 捕获值
func makeIncrementor(froIncrement amount: Int) -> () -> Int {
    var runningTotal = 0// 被捕获
    // 嵌套函数
    func incrementor() -> Int {
        runningTotal += amount
        return runningTotal
    }
    return incrementor
    
}

// 获得闭包1
let incrementByTen = makeIncrementor(froIncrement: 10)

// 调用闭包
incrementByTen()// 10
incrementByTen()// 20

// 获得闭包2
let incrementBySeven = makeIncrementor(froIncrement: 7)
incrementBySeven()// 7
```

## 7.4	闭包是引用类型
>**说明：**这意味着不同的变量或常量可以引用同一个闭包。

## 7.5	逃逸闭包和非逃逸闭包
>**逃逸：**当一个闭包作为参数传到一个函数中，但是这个闭包在函数执行过程中没有执行，函数返回之后才被执行或者从来没有执行过，我们称该闭包从函数中逃逸。
>**说明：**通过标注传入闭包的闭包为`@noescape`，让编译器对`非逃逸闭包`进行优化。


### @noescape
>**说明：**告诉编译器，闭包必须在被传入到的函数体中执行。
>+ 将闭包标注为`@noescape`使你能在闭包中隐式地引用`self`（因为`@noescape`保障了成员方法）

>**用途：**使编译器能够进行一些更加激进的优化。
>**注意：**如果被标注了`@noescape`的闭包没有在函数体中执行，编译器讲报错。

```swift

// 参数带有@noescape标注（闭包不可以逃逸）
func someFunctionWithNoescapeClosure(@noescape closure: () -> Void) {
    closure()
}
// 参数不带@noescape标注（闭包可以逃逸）
var completionHandlers: [() -> Void] = []
func someFunctionWithEscapingClosure(completionHandler: () -> Void) {
    completionHandlers.append(completionHandler)
}

/**
* 掩饰@noescape标注的闭包中隐式使用self
* 成员函数doSomething会调用上面两个函数
*/
class SomeClass {
    var x = 10
    func doSomething() {
        // 传入闭包：必须使用self
        someFunctionWithEscapingClosure {self.x = 100}
        // 传入闭包：self可以省略
        someFunctionWithNoescapeClosure {x = 200}
    }
}
let instance = SomeClass()
instance.doSomething()
print(instance.x)// 200(说明@noescape的闭包不使用self也成功调用了x)

// 调用前面通过someFunctionWithEscapingClosure逃逸的闭包
completionHandlers.first?()
print(instance.x)// 100
```

## 7.6	自动闭包
>**描述：**`自动闭包`是一种自动创建的闭包，用于包装传递给函数作为参数的表达式。
>**限制：**
>**用途：**这种便利语法让你能够用一个普通的表达式来代替显式的闭包，从而省略闭包的`{}`。
>**说明：**有`2`种方式
>+ 显式创建：`{语句}`
>+ 

>**技巧：**自动闭包让你能够`延迟求值`，因为代码段不会被执行直到你调用这个闭包。延迟求值对于那些有`副作用`和`代价昂贵`的代码来说是很有益处的，因为你能控制代码什么时候执行。


### 7.6.1	通过普通闭包实现延迟执行

*案例1：先创建闭包然后调用 *

```swift
var customersInLine = ["Chris", "Aelx", "Ewa", "Barry", "Daniella"]
print(customersInLine.count)
// 创建自动闭包
let customerProvider = {customersInLine.removeAtIndex(0)}
// 执行闭包
print("Now serving\(customerProvider())!")

```
*案例2：将闭包作为参数传递*

```swift
func serveCustomer(customerProvider: () -> String) {
    print("Now serving \(customerProvider())!")
}
serveCustomer( { customersInLine.removeAtIndex(0) } )
```

### 7.6.2	自动闭包实现延迟执行

#### @autoclosure和@autoclosure(escaping)
>**说明：**通过将参数标记为`@autoclosure`来接收一个自动闭包。

|分类|是否允许闭包逃逸|备注|
|-|-|-|
|@autoclosure|不|暗含了`@noescape`特性|
|@autoclosure(escaping)|是||

##### @autoclosure

```swift
/* 通过autoclosure标记，自动将传入的参数（语句）转换为闭包 */
var customersInLine = ["Barry", "Daniella"]
/**
* 包装（延迟执行）对顾客的服务
* @param {() -> String} @autoclosure customerProvider 将输参数（语句）自动转换为一个() -> String的闭包
*/
func serveCustomer(@autoclosure customerProvider: () -> String) {
    // customerProvider是一个被自动封装好的闭包
    print("Now serving \(customerProvider())")
}
// 调用：customersInLine.removeAtIndex(0)在serveCustomer中被调用（通过自动闭包）时才会执行

serveCustomer(customersInLine.removeAtIndex(0))
```

##### @autoclosure(escaping)

```swift
var customersInLine = ["Barry", "Daniella"]
// 存储() -> String类型闭包的数组
var customerProviders: [() -> String] = []

/**
* 将闭包存入集合的工具函数
* @param {() -> String} @autoclosure(escaping) customerProvider 为语句自动创建() -> String类型的封包
*/
func collectCustomerProvider(@autoclosure(escaping) customerProvider: () -> String) {
    customerProviders.append(customerProvider)
}

// 调用工具函数
collectCustomerProvider(customersInLine.removeAtIndex(0))
collectCustomerProvider(customersInLine.removeAtIndex(0))

print("Collected \(customersInLine.count)")

// 执行集合中的闭包
for customerProvider in customerProviders {
    print("Now serving \(customerProviders)")
}
```
