---
title: 18 错误处理
categories:
  - The Swift Program Language 2
tag:
  - swift语言
toc: true
---

>**说明：**`错误处理`是响应错误以及从错误中恢复的过程。`可选类型`可用来表示值缺失，但是当某个操作失败时，最好能得知失败的原因，从而可以作出相应的应对。
>**扩展：**`Swift` 中的错误处理涉及到错误处理模式，这会用到 `Cocoa` 和 `Objective-C` 中的`NSError`

## 18.1	表示并抛出错误
>**说明：**错误用符合`ErrorType`协议的类型的值来表示。这个空协议表明该类型可以用于错误处理。
>**技巧：**Swift 的`枚举`类型尤为适合构建一组相关的错误状态，枚举的关联值还可以提供错误状态的额外信息。

```swift
// 自动贩卖机错误
enum VendingMachineError: ErrorType {
    case InvalidSelection// 选择无效
    case InsufficientFunds(coinsNeeded: Int)// 金额不足
    case OutOfStock// 缺货
}
// 抛出“金额不足”的错误
throw VendingMachineError.InsufficientFunds(coinsNeeded: 5)
```

## 18.2	处理错误
>**说明：**某个错误被抛出时，附近的某部分代码必须负责处理这个错误。有`4`中给处理错误的方式
>+ 把函数`抛出`的错误传递给调用此函数的代码
>+ 用`do-catch`语句处理错误
>+ 将错误作为`可选类型`处理
>+ `断言`此错误根本不会发生

>**标识可能出错的地方：**在调用一个能抛出错误的`函数`、`方法`或者`构造器`之前，加上`try`关键字，或者`try?`或`try!`这种变体

>**引伸：**和其他语言中的异常处理不同的是，Swift 中的错误处理并不涉及解除调用栈，就此而言，`throw语句`的性能特性是可以和`return语句`相媲美的。

### 18.2.1	用throwing函数传递错误
>**说明：**一个标有`throws`关键字的函数被称作`throwing 函数`。
>+ 调用`throwing函数`必须使用`try`
>+ 调用`throwing函数`必须要么直接处理这些错误（使用`do-catch`语句，`try?`或`try!`）；要么继续将这些错误传递下去

>**用途：**可以在其内部抛出错误，并将错误传递到函数`被调用时的作用域`。
>**语法：**在函数声明的`参数列表`和`->`之间加上`throws`关键字。

```swift
func canThrowErrors() throws -> String
```

>**注意：**只有 `throwing函数`可以传递错误。任何在某个`非 throwing 函数`内部抛出的错误只能在函数内部处理。

```swift
// 自动贩卖机错误
enum VendingMachineError: ErrorType {
    case InvalidSelection// 选择无效
    case InsufficientFunds(coinsNeeded: Int)// 金额不足
    case OutOfStock// 缺货
}

// 商品
struct Item {
    var price: Int
    var count: Int
}

// 自动贩卖机
class VendingMachine {
    // 食品清单
    var inventory = [
        "Candy Bar": Item(price: 12, count: 7),
        "Chips": Item(price: 10, count: 4),
        "Pretzels": Item(price: 7, count: 11)
    ]
    // 投币数量
    var coinsDeposited = 0
    // 发放食品
    func dispenseSnack(snack: String) {
        print("Dispensing \(snack)")
    }

    /*
    * 出售
    * throwing方法：会抛出相应错误（如果有的话）
    */
    func vend(itemNamed name: String) throws {
        // 是否有对应商品
        guard var item = inventory[name] else {
            throw VendingMachineError.InvalidSelection
        }
        
        // 是否还有剩余
        guard item.count > 0 else {
            throw VendingMachineError.OutOfStock
        }
        
        // 投币是否足够
        guard item.price <= coinsDeposited else {
            throw VendingMachineError.InsufficientFunds(coinsNeeded: item.price - coinsDeposited)
        }
        
        // 没问题，进行交易
        coinsDeposited -= item.price
        --item.count
        inventory[name] = item
        dispenseSnack(name)
    }
}

let favoriteSnacks = [
    "Alice": "Chips",
    "Bob": "Licorice",
    "Eve": "Pretzels",
]

/*
* 买小吃
*/
func buyFavoriteSnack(person: String, vendingMachine: VendingMachine) throws {
    let snackName = favoriteSnacks[person] ?? "Candy Bar"
    // 调用throwing方法必须使用try关键字
    try vendingMachine.vend(itemNamed: snackName)
}
```

### 18.2.2	用Do-Catch处理错误
>**说明：**可以使用一个`do-catch`语句运行一段闭包代码来处理错误。如果在`do`子句中的代码抛出了一个错误，这个错误会与`catch`子句做匹配，从而决定哪条子句能处理它。
>+ 在`catch`后面写一个匹配模式来表明这个子句能处理什么样的错误
>+ 如果一条`catch`子句没有指定匹配模式，那么这条子句可以匹配任何错误，并且把错误绑定到一个名字为`error`的局部常量
>+ `catch`子句不必将`do`子句中的代码所抛出的每一个可能的错误都作处理
>+ 如果所有`catch`子句都未处理错误，错误就会传递到周围的作用域（要么是一个外围的`do-catch`错误处理语句，要么是一个`throwing` 函数的内部）

```swift
// 创建一个售卖机实例
var vendingMachine = VendingMachine()
// 投币
vendingMachine.coinsDeposited = 8

do {
    // 买最喜欢的零食
    try buyFavoriteSnack("Alice", vendingMachine: vendingMachine)
}
// 没有该商品
catch VendingMachineError.InvalidSelection {
    print("Invalid Selection")
}
// 卖完了
catch VendingMachineError.OutOfStock {
    print("Out of Stock.")
}
// 投币不足
catch VendingMachineError.InsufficientFunds(let coinsNeeded) {
    print("Insufficent funds. Please insert an additional \(coinsNeeded)")
}
```

### 18.2.3	将错误转换成可选值
>**语法：**`try?`
>**说明：**使用`try?`调用表达式，返回相应表达式返回值的`可选类型`（如果表达式抛出错误，则表达式`nil`）
>**技巧：**如果你想对所有的错误都采用同样的方式来处理，用`try?`就可以让你写出简洁的错误处理代码

```swift
// throwing 函数
func someThrowingFunction() throws -> Int {
    // ...
    return 0
}

/* 调用 throwing 函数 */
// 方式一：使用 try? 调用
let x = try? someThrowingFunction()

// 方式二：方式一的等价形式
let y: Int?
do {
    y = try someThrowingFunction()
} catch {
    y = nil
}
```

```swift
// 从磁盘获取
func fetchDataFromDisk() -> String? {
    // ...
    return nil
}

// 从服务器获取
func fetchDataFromServer() -> String? {
    // ...
    return nil
}

/**
* 获取数据
*/
func fetchData() -> String? {
    if let data = try? fetchDataFromDisk() {
        return data
    }
    if let data = try? fetchDataFromServer() {
        return data
    }
    return nil
}
```

### 18.2.4		禁用错误传递
>**语法：**`try!`
>**说明：**其实就是把`抛出错误`转变为`运行时断言`
>**应用：**确定`throwing` 函数实际上在运行时`不会抛出错误`的才能使用。
>**注意：**如果实际上抛出了错误，你会得到一个运行时错误（而不会传递错误）

```swift
// 确定图片资源是存在的
let photo = try! loadImage("./Resources/John Appleseed.jpg")
```

## 18.3	指定清理操作
>**说明：**使用`defer`语句指定在即将离开`当前代码块`时执行一系列语句。
>**支持情景：**不管是以何种方式离开当前代码块的
>+ 由于抛出错误而离开
>+ 诸如`return`或者`break`的语句

>**语法：**由`defer`关键字和要被延迟执行的语句组成
>+ 延迟执行的语句不能包含任何`控制转移语句`（`break`或是`return`语句，或是抛出一个错误）
>+ 延迟执行的操作会按照它们被指定时的顺序的`相反顺序`执行

```swift
// 处理文件
func processFile(filename: String) throws {
    // 如果文件存在
    if exists(filename) {
        // 打开文件
        let file = open(filename)
        
        // 当前代码块结束时执行
        defer {
            close(file)
        }
        
        // 处理打开的文件
        while let line = try file.readline() {
            // 处理文件。
        }
        // 根据 defer 语句的指定，close(file) 会在这里被隐式调用，即作用域的最后。
    }
}
```