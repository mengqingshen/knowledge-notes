---
title: 16 自动引用计数（ARC）
categories:
  - The Swift Program Language 2
tag:
  - swift语言
toc: true
---

>**说明：**`Swift` 使用自动引用计数`（ARC）`机制来跟踪和管理你的应用程序的内存。
>**适用类型：**类(结构体和枚举是值类型)

## 16.1		自动引用计数的工作机制
>**说明：**当你每次创建一个类的新的实例的时候，`ARC` 会分配一大块内存用来储存实例的信息。内存中会包含实例的类型信息，以及这个实例所有相关属性的值。
>
>**强引用：**无论将实例赋值给`属性`、`常量`还是`变量`，都会对此实例创建`强引用`。当一个实例的引用计数为0时，实例将被`ARC`销毁。

## 16.2		自动引用计数实践

```swift
//1.创建类
class Person {
    let name:String
    init(name:String){
        self.name = name
        println("\(name) is being initialized")
    }
    deinit{
        println("\(name) is being deinitialized")
    }
}

//2.创建实例
var reference1:Person?
var reference2:Person?
var reference3:Person?

//reference1和Person类的新实例之间建立了一个强引用
reference1 = Person(name: "Join Appleseed")

//为该实例再增加两个强引用
reference2 = reference1
reference3 = reference1

//3.断开所有强引用，之后ARC销毁实例的内存
reference1 = nil
reference2 = nil
reference3 = nil
```

## 16.3		类实例之间的循环强引用
>**循环强引用：**两个类实例互相保持对方的`强引用`，并让对方不被销毁。
>**解决思路：**通过定义类之间的关系为`弱引用`或`无主引用`，以此替代强引用。

|细分情况|分析（两个实例各自引用对方的属性）|解决思路|
|-|-|-|
|情况1|都允许为`nil`|其中一个属性使用`弱引用`|
|情况2|一个允许为`nil`，另一个不允许|不允许为`nil`的属性使用`无主引用`|
|情况3|都不允许为`nil`|一个使用`无主引用`，一个使用`隐式解析可选属性`|

## 16.4		解决实例之间的循环强引用
>**解决方法：**用弱引用或无主导引用替代强引用
>1. **弱引用（weak reference）适用：**生命周期中会变为`nil`的实例
>2. **无主引用（unowned reference）适用：**初始化赋值后再也不会被赋值为nil的实例

### 16.4.1		弱引用
>**关键字：**`weak`
>**说明：**弱引用不会对其引用的实例保持强引用，因而不会阻止 `ARC` 销毁被引用的实例
>+ 因为弱引用可以没有值，你必须将每一个弱引用声明为可选类型
>+ 弱引用必须被声明为变量（`var`），表明需要在运行时修改
>+ `ARC`在引用的实例被销毁之后自动将弱引用关联的变量或属性赋值为`nil`

>**语法：**声明`属性`或者`变量`时，在前面加上`weak`关键字

```swift
class Person {
    let name:String
    init(name:String){
        self.name = name
    }
    var apartment:Apartment?
    deinit{
        println("Apartment #\(name) is being dinitialized")
    }
}

//旅馆可以没有客人，客人声明为弱引用类型
class Apartment {
    let number:Int
    init(number:Int){
        self.number = number
    }
    weak var tenant:Person?
    deinit{
        println("Apartment #\(number) is being deinitialized")
    }
}

//创建实例
var john:Person?
var number73:Apartment?
john = Person(name: "John Appleseed")
number73 = Apartment(number: 73)

//引用
john!.apartment = number73//强引用
number73!.tenant = john//弱引用

//断开两个实例和变量之间的引用（引用计数降为0）
john = nil//因为另一个指向Person实例的引用是弱引用，因此Person实例被销毁
number73 = nil//另一个指向Apartment实例的引用所在的实例已经被销毁，因此Apartment此时讲呗销毁
```

### 16.4.2		无主引用
>**关键字：**`unowned`
>**说明：**在声明属性或者变量时，在前面加上关键字unowned表示这是一个无主引用。
>+ 不会牢牢保持住引用的实例
>+ 总是被定义为非可选型（永远是有值的），总是可以被直接访问
>+ `ARC`无法在实例被销毁后将无主引用设为`nil`（因为非可选类型的变量不允许被赋值为`nil`）

>**注意：**使用无主引用，必须确保引用始终指向一个未销毁的实例。

```swift
//用户
class Customer {
    let name:String
    var card:CreditCard?
    init(name:String){
        self.name = name
    }
    deinit{
        println("\(name) is being deinitialized")
    }
}

//信用卡
class CreditCard {
    let number:Int
    unowned let customer:Customer
    init(number:Int, customer:Customer){
        self.number = number
        self.customer = customer
    }
    deinit{
        println("Card #\(number) is being deinitialized")
    }
}
var john:Customer?
john = Customer(name: "John Appleseed")

//给john一张信用卡（同时给信用卡关联一个用户）
john!.card = CreditCard(number:1234_5678_9021_3456, customer:john!)

//Customer实例的引用被断开后，实例被销毁，同时断开了对信用卡实例的引用，因此信用卡实例也被销毁
john = nil
```

### 16.4.3		 无主引用以及隐式可选属性
>**说明：**两个属性都必须有值，并且初始化完成后永远不会为`nil`。在这种场景中，需要一个类使用`无主属性`，而另外一个类使用`隐式解析可选属性`。

```swift
//国家
class Country {
    let name:String
    //首都：声明为隐式解析可选类型的属性，默认值为nil，但是不需要展开值就能够访问。
    let capitality:City!
    init(name:String, capitalName:String){
        self.name = name//给name属性赋值后，构造过程第一阶段就结束了（完成初始化）
        self.capitality = City(name:capitalName, country:self)
    }
}

//城市
class City {
    let name:String
    unowned let country:Country
    init(name:String, country:Country){
        self.name = name
        self.country = country
    }
}

var country = Country(name: "Canada", capitalName: "Ottawa")
```

## 16.5		闭包引起的循环强引用
>**原理：**实例内部的闭包捕获`self`，从而在实例和闭包之间产生循环强引用。
>**情景：**
>1. 闭包中访问实例的属性（`self.someproperty`）
>2. 闭包中访问实例的方法（`self.someMethod`）

```swift
class HTMLElement {
    //元素名称
    let name:String
    
    //元素文本
    let text:String?
    
    //闭包:根据text是否存在值，该闭包返回带文本的标签或仅仅是标签
    //声明为lazy:意味着使用该闭包时，实例的初始化一定已经完成，因此在闭包中可以访问`self`
    lazy var asHTML:()->String={
        if let text = self.text {
            return "<\(self.name)\(text)</\(self.name)>"
        }else{
            return "<\(self.name)>"
        }
    }
    
    //构造器
    init(name:String, text:String? = nil){
        self.name = name
        self.text = text
    }
    
    //析构函数
    deinit{
        println("\(name) is being deinitialized")
    }
}

var paragraph:HTMLElement? = HTMLElement(name: "p", text: "hello, world")//该类实例和其中的闭包之间产生了循环强引用
println(paragraph!.asHTML())

paragraph = nil//实例并没有被销毁
```

## 16.6		解决闭包引起的循环强引用
>**捕获列表：**定义了闭包体内捕获一个或多个引用类型的规则（`弱引用`或`无主引用`）。
>**解决方式：**在定义`闭包`时同时定义`捕获列表`作为闭包的一部分
>**注意：**只要在闭包中使用`self`的成员，就要用`self.someProperty`或`self.someMethod`

### 16.6.1		定义捕获列表
>**捕获列表：**[{`weak`|`unknowed`} {实例}, {`weak`|`unknowed`} {实例}, ...] 
>**说明：**捕获列表中的每一项都由一对元素组成，一个元素是`weak`或`unowned`关键字，另一个元素是类实例的引用
>1. 捕获列表放在闭包参数和返回值之前（需要指出闭包的参数和返回值类型）：有参数列表和返回类型

```swift
//类或结构体中定义一个闭包
lazy var someClosure:(Int, String) -> String = {
    // 闭包定义一个捕获列表
    [unowned self, weak delegate = self.delegate] (index:Int, stringToProcess:String) -> String in
    // 下面时闭包函数体
}
```
>2. 通过上下文推断（省略类型说明）：闭包没有定义参数列表或返回值时

```swift
lazy var someClosure:()->String = {
	// 定义捕获列表
    [unknowed self, weak delegate = self.delegate] in
    // 下面时闭包函数体
}
```

### 16.6.2		弱引用和无主引用
>**说明：**`捕获列表`中引用的引用类型可以是`weak`或`unowned`，选择的依据是
>+ 捕获的引用绝对不会为`nil`：将闭包内的捕获定义为`无主引用`
>+ 捕获引用有可能为`nil`：将闭包内的捕获定义为`弱引用`（可选型）

```swift
class HTMLElement {
    // 元素名称
    let name:String
    
    // 元素文本
    let text:String?
    
    // 闭包:根据text是否存在值，该闭包返回带文本的标签或仅仅是标签
    // 声明为lazy:意味着使用该闭包时，实例的初始化一定已经完成，因此在必报中可以访问`self`
    lazy var asHTML:Void > String = {
        [unowned self] in// 用无助引用而不是强引用捕获`self`
        if let text = self.text {
            return "<\(self.name)\(text)</\(self.name)>"
        }else{
            return "<\(self.name)>"
        }
    }
    
    // 构造器
    init(name:String, text:String? = nil){
        self.name = name
        self.text = text
    }
    
    // 析构函数
    deinit{
        println("\(name) is being deinitialized")
    }
}

var paragraph:HTMLElement? = HTMLElement(name: "p", text: "hello, world")// 该类实例和其中的闭包之间产生了循环强引用
println(paragraph!.asHTML())

paragraph = nil// 实例被销毁
```