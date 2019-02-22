---
title: 23 范型
categories:
  - The Swift Program Language 2
tag:
  - swift语言
---

>**说明：**泛型代码可以让你编写`适用自定义需求以及任意类型`的`灵活可重用`的`函数`和`类型`。
>**意义：**它的可以让你`避免重复的代码`，用一种清晰和抽象的方式来表达代码的意图。

## 23.1	泛型所解决的问题
>**说明：**有了泛型，就不必为各种不同类型重复创建类似的`函数`或`类型`。

## 23.2	泛型函数
>**说明：**`泛型函数`可以适用于`任何类型`
>**语法：**`func 函数名<T>(){...}`
>+ 函数名后面跟着`<占位类型名>`（比如字母 `T `）来代替实际类型名
>+ 函数被调用时，`T` 所代表的类型都会`由传入的值的类型推断出来`

```swift
/***************** 不使用泛型的方法 ****************/
/**
* 交换两个值
* @param {String} inout a 第一个值
* @param {String} inout b 第二个值
*/
func swapTwStrings(inout a: String, inout _ b: String) {
    let temporaryA = a
    a = b
    b = temporaryA
}

/**
 * 交换两个值
 * @param {Double} inout a 第一个值
 * @param {Double} inout b 第二个值
 */
func swapTwoDoubles(inout a: Double, inout _ b: Double) {
    let temporaryA = a
    a = b
    b = temporaryA
}

/****************** 使用泛型的方法 ******************/
func swapTwoValues<T>(inout a: T, inout _ b: T) {
    let temporaryA = a
    a = b
    b = temporaryA
}

// 使用泛型（自动推断 T 占位符的类型）
var someInt = 3
var anotherInt = 107
swapTwoValues(&someInt, &anotherInt)
```

## 23.3	类型参数
>**说明：**类型参数指定并命名一个`占位类型`，并且紧随在函数名后面，使用一对尖括号括起来（例如 `<T>`）。`类型参数`会在函数调用时被实际类型所替换。在`泛型函数体`中可以用来
>+ 定义一个函数的`参数类型`
>+ 作为函数的`返回类型`
>+ 用作函数主体中的`注释类型`

## 23.4	命名类型参数
>**说明：**下面是一些指导性的意见。
>+ 在大多数情况下，类型参数具有一个`描述性名字`
>+ 当它们之间的关系没有意义时，通常使用`单一的字母`来命名

>**注意：**始终使用`大写字母开头的驼峰式命名法`来为类型参数命名，以表明它们是占位类型，而不是一个值。

## 23.5	泛型类型
>**说明：**除了泛型函数，`Swift` 还允许你定义泛型类型。这些自定义`类`、`结构体`和`枚举`可以适用于`任何类型`。

```swift
/****************** 不使用泛型的结构体 ******************/
struct IntStack {
    var items = [Int]()
    // 入栈：变异方法,需要修改自身的属性
    mutating func push(item: Int) {
        items.append(item)
    }
    // 出栈：变异方法，需要修改自身的属性
    mutating func pop() -> Int {
        return items.removeLast()
    }
}

/****************** 使用泛型的机构体 ******************/
struct Stack<Element> {
    var items = [Element]()
    // 入栈：变异方法,需要修改自身的属性
    mutating func push(item: Element) {
        items.append(item)
    }
    // 出栈：变异方法，需要修改自身的属性
    mutating func pop() -> Element {
        return items.removeLast()
    }
}

// 字符串栈实例
var stackOfStrings = Stack<String>()

// 入栈
stackOfStrings.push("uno")
stackOfStrings.push("dos")
stackOfStrings.push("tres")
stackOfStrings.push("cuatro")

// 出栈
let fromTheTop = stackOfStrings.pop()
```

## 23.6	扩展一个泛型类型
>**说明：**扩展泛型类型和扩展普通类型类似，特别的地方在于
>+ `不需要`在扩展的定义中提供`类型参数列表`
>+ 原始类型定义中声明的类型参数列表在扩展中可以直接使用
>+ 这些来自原始类型中的参数名称会被用作`原始定义中类型参数的引用`

```swift
// 泛型结构体：栈
struct Stack<Element> {
    var items = [Element]()
    // 入栈：变异方法,需要修改自身的属性
    mutating func push(item: Element) {
        items.append(item)
    }
    // 出栈：变异方法，需要修改自身的属性
    mutating func pop() -> Element {
        return items.removeLast()
    }
}

// 扩展泛型类型(原始类型定义中声明的类型参数列表在扩展中可以直接使用)
extension Stack {
    var topItem: Element? {
        return items.isEmpty ? nil : items[items.count - 1]
    }
}
// 字符串栈实例
var stackOfStrings = Stack<String>()

// 入栈
stackOfStrings.push("uno")
stackOfStrings.push("dos")
stackOfStrings.push("tres")
stackOfStrings.push("cuatro")

// 出栈
let fromTheTop = stackOfStrings.pop()
```

## 23.6	类型约束
>**说明：**类型约束可以指定一个`类型参数`必须继承自指定类，或者符合一个特定的协议或协议组合。

### 23.6.1	类型约束语法
>**说明：**在一个`类型参数名`后面放置一个`类名`或者`协议名`，通过`:`分隔，从而定义类型约束，它们将作为类型参数列表的一部分。
>**语法：**以`泛型函数`为例（`泛型类型`与此类似）

```swift
func someFunction<T: SomeClass, U: SomeProtocol>(someT: T, someU: U) {
    // 这里是泛型函数的函数体部分
}
```

### 23.6.2	类型约束实践
>**注意：**不是所有的 `Swift` 类型都可以用等式符`==`进行比较。Swift 标准库中定义了一个 `Equatable` 协议，该协议要求任何符合该协议的类型必须实现等式符`==`。
>**扩展：**所有的 `Swift 标准类型`自动支持 `Equatable` 协议

```swift
/************  非泛型   ************/
func findStringIndex(array: [String], _ valueToFind: String) -> Int? {
    for (index, value) in array.enumerate() {
        if value == valueToFind {
            return index
        }
    }
    return nil
}
// 数组
let strings = ["cat", "dog", "llama", "parakeet", "terrapin"]
// 调用函数
if let foundIndex = findStringIndex(strings, "llama") {
    print("The index of llama is \(foundIndex)")
}

/**********  泛型（带有约束）  *********/
/**
* 获得相应值在数组中的位置
* @desc 为了保证证支持等式操作符，T 必需实现 Equatable 协议
* @param {[T]} 目标数组
* @param {T} 目标值
* @reutrn {Int?} 下标
*/
func findIndex<T: Equatable>(array: [T], _ valueToFind: T) -> Int? {
    for (index, value) in array.enumerate() {
        if value == valueToFind {
            return index
        }
    }
    return nil
}
```

## 23.7	关联类型
>**用途：**`定义一个协议时`，有的时候声明`一个或多个`关联类型作为协议定义的一部分将会，作为一种用来`占位`的类型，实现协议是会推断出`实际类型`。
>**说明：**关联类型作为协议的一部分，为某个类型提供了一个`占位名`（或者说别名），其代表的`实际类型在协议被采纳时才会被指定`。
>**语法：**你可以通过 `typealias` 关键字来指定关联类型。

### 23.7.1	关联类型实践

```swift
// 协议
protocol Container {
    // 定义关联类型
    typealias ItemType
    // 必须可以通过 append(_:) 方法添加一个新元素到容器里
    mutating func append(item: ItemType)
    // 必须可以通过 count 属性获取容器中元素的数量，并返回一个 Int 值
    var count: Int { get }
    // 必须可以通过接受 Int 索引值的下标检索到每一个元素。
    subscript(i: Int) -> ItemType { get }
}

// 实现协议（非泛型）
struct IntStack: Container {
    // 自身部分
    var items = [Int]()
    mutating func push(item: Int) {
        items.append(item)
    }
    mutating func pop() -> Int {
        return items.removeLast()
    }
    // Container 协议的实现部分
    typealias ItemType = Int// 可以省略（因为类型推断）
    mutating func append(item: Int) {
        self.push(item)
    }
    var count: Int {
        return items.count
    }
    subscript(i: Int) -> Int {
        return items[i]
    }
}

// 实现协议（泛型）
struct Stack<Element>: Container {
    // Stack<Element> 的原始实现部分
    var items = [Element]()
    mutating func push(item: Element) {
        items.append(item)
    }
    mutating func pop() -> Element {
        return items.removeLast()
    }
    // Container 协议的实现部分
    mutating func append(item: Element) {
        self.push(item)
    }
    var count: Int {
        return items.count
    }
    subscript(i: Int) -> Element {
        return items[i]
    }
}
```

### 23.7.2	通过扩展一个存在的类型来指定关联类型
>**说明：**扩展让一个已存在的类型符合一个协议，其中就包括使用了关联类型的协议。

```swift
// 协议：容器
protocol Container {
    // 定义关联类型
    typealias ItemType
    // 必须可以通过 append(_:) 方法添加一个新元素到容器里
    mutating func append(item: ItemType)
    // 必须可以通过 count 属性获取容器中元素的数量，并返回一个 Int 值
    var count: Int { get }
    // 必须可以通过接受 Int 索引值的下标检索到每一个元素。
    subscript(i: Int) -> ItemType { get }
}

// Array 本身就具备 Container 指定的实现
extension Array: Container {}
```

## 23.8	where字句
>**说明：**可以在`参数列表`中通过 `where` 子句为`关联类型`定义约束
>+ 使一个`关联类型`符合某个特定的协议
>+ 使某个特定的类型参数和`关联类型`必须类型相同

>**语法：**将 `where` 关键字紧跟在类型参数列表后面来定义 `where` 子句
>+ `where` 子句后跟`一个或者多个`针对关联类型的约束
>+ 以及`一个或多个`类型参数和关联类型间的相等关系

```swift
// 协议：容器
protocol Container {
    // 定义关联类型
    typealias ItemType
    // 必须可以通过 append(_:) 方法添加一个新元素到容器里
    mutating func append(item: ItemType)
    // 必须可以通过 count 属性获取容器中元素的数量，并返回一个 Int 值
    var count: Int { get }
    // 必须可以通过接受 Int 索引值的下标检索到每一个元素。
    subscript(i: Int) -> ItemType { get }
}

/**
* 检查两个 Container 实例是否包含相同顺序的相同元素
* @param {C1} someContainer
* @param {C2} anotherContainer
* @return {Bool} true 匹配，false 不匹配
*/
func allItemsMatch<
    C1: Container, C2: Container
    where C1.ItemType == C2.ItemType, C1.ItemType: Equatable>
    (someContainer: C1, _ anotherContainer: C2) -> Bool {
        
        // 检查两个容器含有相同数量的元素
        if someContainer.count != anotherContainer.count {
            return false
        }
        
        // 检查每一对元素是否相等
        for i in 0..<someContainer.count {
            if someContainer[i] != anotherContainer[i] {
                return false
            }
        }       
        // 所有元素都匹配，返回 true
        return true
}
```