---
title: 14 构造过程
categories:
  - The Swift Program Language 2
tag:
  - swift语言
---

>**构造过程：**为某个类、结构体或枚举的实例中的每个属性设置初始值和为其执行必要准备和初始化任务。
>**构造器：**用来创建特定类型实例的特殊方法，保证实例在第一次使用前完成正确的初始化。

## 14.1	存储型属性的初始赋值
>**背景：**类和结构体在创建实例时，必须为所有`存储型属性`设置合适的初始值。存储型属性的值不能处于一个未知的状态。
>**说明：**可以在`构造器中`为存储型属性赋初值，也可以在`定义属性时`为其设置默认值

|初始化时机|初始化方式|是否触发属性观察器|是否自动推导类型|
|-------|-------|--------|-------|
|定义属性时|设置默认值|否|是|
|构造器中	|为存储型属性赋初始值|否|否|

### 14.1.1	构造器
>**说明：**构造器在创建某个特定类型的新实例时被调用，以`init`关键字声明构造函数

```swift
struct Fahrenheit {
    var temperature:Double
    init(){
        temperature = 32.0//在构造其中为存储型属性赋初值
    }
}
var f = Fahrenheit()
println("The default temperature is \(f.temperature) Fahrenheit")
```

### 14.1.2		默认属性值
>**说明：**相比`在构造器中设置初始值`有如下优点
>1. 将属性的声明和初始化结合得更紧密
>2. 使构造器更加简洁、清晰
>3. 能够自动推导出属性的类型（不需要声明属性的类型）
>4. 充分利用默认构造器、构造器继承

```swift
struct Fahrenheit {
    var temperature = 32.0//在构造其中为存储型属性赋初值
}
```

## 14.2	自定义构造过程

### 14.2.1	构造参数
>**说明：**构造器参数的功能和语法跟函数和方法参数相同。

```swift
struct Celsius {
    var temperatureInCelsius:Double = 0.0
    /**
    *第一个构造器：带有一个构造参数
    *外部名：fromFahrenheit;内部名：fahreheit
    */
    init(fromFshreheit fahreheit:Double){
        temperatureInCelsius = (fahreheit - 32.0) / 1.8
    }
    /**
    *第二个构造器：带有一个构造参数
    *外部名：fromKelvin;内部名：kelvin
    */
    init(fromKelvin kelvin:Double){
        temperatureInCelsius = kelvin - 273.15
    }
}

let boilingPointOfWater = Celsius(fromFshreheit: 212.0)
let freezingPointOfWater = Celsius(fromFshreheit: 273.15)
```

### 14.2.2	内部和外部参数名
>**说明：**和`函数（方法）`不同点在于第一个参数也会有外部参数名（同后面的其它参数一样）。
>**注意：**如果构造起定义了某个外部参数名，就必须使用它。

```swift
struct Color {
    let red, green, blue: Double
    // 外部参数名默认同内部参数名
    init(red: Double, green: Double, blue: Double) {
        self.red   = red
        self.green = green
        self.blue  = blue
    }
    // 取消外部参数名
    init(_ white: Double) {
        red   = white
        green = white
        blue  = white
    }
}

// 如果你在定义构造器时没有提供参数的外部名字，Swift 会为每个构造器的参数自动生成一个跟内部名字相同的外部名。
let magenta = Color(red: 1.0, green: 0.0, blue: 1.0)

let halfGray = Color(0.5)
```

### 14.2.3	可选属性类型
>**说明：**如果你定制的类型包含一个逻辑上允许取值为空的存储型属性，需要将它定义为可选类型。
>+ 可选类型的属性将自动初始化为`nil`

>**使用场景**：
>1. 无法在初始化时赋值
>2. 在之后某个时间点可以赋值为空

```swift
// 问题调查
class SurveryQuestion {
    var text:String
    // 回答可以为空
    var response:String?// nil
    init(text:String){
        self.text = text
    }
    func ask(){
        println(text)
    }
}
let cheeseQuestion = SurveryQuestion(text: "Do you like cheese?")
cheeseQuestion.ask()
cheeseQuestion.response = "Yes, I do like cheese."
```

### 14.2.4	构造过程中常量属性的修改
>**说明：**可以在构造过程中的任意时间点修改常量属性的值

|实例属性类型|可修改时机|是否可在子类中修改|
|----------|--------|---------------|
|常量属性|构造过程结束前|否|
|变量属性|实例的整个生命周期|是|

```swift
class SurveyQuestion {
	// 常量属性
    let text: String
    var response: String?
    init(text: String) {
	    // 在构造过程中修改常量
        self.text = text
    }
    func ask() {
        print(text)
    }
}
let beetsQuestion = SurveyQuestion(text: "How about beets?")
beetsQuestion.ask()
// 输出 "How about beets?"
beetsQuestion.response = "I also like beets. (But not with cheese.)"
```

## 14.3	默认构造器
>**说明：**满足以下条件的`结构体`或`类`会拥有一个默认的构造器。
>1. 所有属性已提供默认值
>2. 自身没有定义任何构造器

>**注意：**类必须要没有父类的基类

```swift
//1:所有属性都有默认值；2:基类；3:没有定义构造器
class ShoppingListItem {
    var name:String?
    var quantity = 1
    var purchased = false
}
var item = ShoppingListItem()
```


### 14.3.1	结构体的逐一成员构造器
>**说明：**满足了以下条件的`结构体`将自动获得一个`逐一成员构造器`。
>+ 没有自定义构造器

>**用途**：用来初始化结构体新实例里成员属性的快捷方法
>**语法**：在调用逐一成员构造器时，通过与成员属性名相同的参数名进行传值来完成对成员属性的初始赋值。

```swift
struct Size {
    var width = 0.0, height = 0.0
}
// 通过逐一成员构造器创建结构体实例
let twoByTwo = Size(width: 2.0, height: 2.0)
```

## 14.4	值类型的构造器代理
>**说明**：`构造器代理`指在构造器中调用其它构造器完成构造过程

|类型||说明|
|-|-|-|
|值类型|结构体、枚举|只能代理给本身提供的其它构造器，可以在构造器内部使用`self.init`调用其它构造器|
|类类型|类|代理给本身的构造器或父类的构造器（完成父类的初始化）|
>**注意：**一旦在类型的原始定义中定义了构造器
>+ **结构体：**无法访问`默认构造器`和`逐一成员构造器`
>+ **类：**无法访问`默认构造器`

>**引伸：**假如你希望`默认构造器`、`逐一成员构造器`以及你自己的`自定义构造器`都能用来创建实例，可以将自定义的构造器写到`扩展`中。

```swift
struct Size {
    var width = 0.0, height = 0.0
}
struct Point {
    var x = 0.0, y = 0.0
}
struct Rect {
    var origin = Point()
    var size = Size()
    //充当默认构造器（原本的默认构造器不符合存在条件）:没有执行任何定制的构造过程，将返回一个Rect实例
    init(){}
    
    //充当逐一成员构造器（原本的默认成员逐一构造器不符合存在条件）
    init(origin:Point, size:Size){
        self.origin = origin
        self.size = size
    }
    //该构造器将部分构造过程代理给上面的第二个构造器
    init(center:Point, size:Size){
        let originX = center.x - (size.width / 2)
        let originY = center.y - (size.height / 2)
        self.init(origin:Point(x:originX, y:originY), size:size)
    }
}

//使用第一个构造器
let basicRect = Rect()//basicRect的原点(0.0, 0.0)，尺寸是(5.0, 5.0)

//使用第二个构造器
let originRect = Rect(origin: Point(x: 2.0, y: 2.0), size:Size(width: 3.0, height: 3.0))//originRect的原点是（2.0, 2.0）,尺寸是(5.0, 5.0)

//使用第三个构造器
let centerRect = Rect(center: Point(x:4.0, y:4.0), size: Size(width: 3.0, height: 3.0))//centerRect的原点是（2.5, 2.5）,尺寸是(3.0, 3.0)
```

## 14.5	类的继承和构造过程
>**说明：**`类`里面的所有`存储型属性`（包括所有继承自父类的属性）都必须在构造过程中设置初始值。`Swift` 为类提供了两种构造器来确保实例中所有存储型属性都能获得初始值
>+ 指定构造器
>+ 便利构造器

### 14.5.1	指定构造器和便利构造器
>**说明：**`指定构造器`是类中最主要的构造器，`便利构造器`是类中比较次要的、辅助型的构造器。

|特性|指定构造器|便利构造器|
|-|-|-|
|**使用场景**|必需|必要时（快捷调用某个指定构造器来使类更加清晰）|
|**数量**|至少一个(可以从父类继承)|至少零个|
|**用途**|初始化类中所有属性，初始化父类|次要、辅助型构造器|
|**使用**|根据父类链往上调用父类的构造器|调用同一个类中的指定构造器|
|**构造器链规则**|总是向上代理|总是横向代理|
	>**语法：**`指定构造器`和`便利构造器`

```swift
// 指定构造器
init(parameters) {
    statements
}
// 便利构造器：init关键字之前放置convenience关键字
convenience init(parameters) {
    statements
}
```

### 14.5.2	构造器链
+ **指定构造器**
1. 必须调用直接父类的指定构造器
+ **便利构造器**
1. 必须调用同一类中的其它构造器
2. 必须最终以调用一个指定构造器结束

### 14.5.3	两段式构造过程

#### 14.5.3.1	 两个阶段
>**阶段一：**通过构造器设置初始值

|成员|状态|
|-----|------|
|实例方法|不能调用|
|实例属性|不能读取|
|`self`|不能引用|

```flow
st=>start: 开始
e=>end: 结束
op1=>operation: 构造器被调用（某个指定构造器或便利构造器）
op2=>operation: 完成新实例内存的分配（内存并没有真的被初始化）
op3=>operation: 由指定构造器确保所在类中的所有存储属性完成赋值（内存完成初始化）
op4=>operation: 指定构造器沿着构造器链依次调用父类构造器（完成父类属性初始化）
cond=>condition: 是否有父类?

st->op1->op2->op3->cond
cond(yes)->op4->e
cond(no)->e

```
>**阶段二：**在新实例准备使用之前进一步定制它们的存储型属性(可以访问`self`，修改属性、调用实例方法)
> **特点：**沿构造器链从上往下

```flow
st=>start: 开始
e=>end: 结束
op1=>operation: 构造器链上的每个类的指定构造器完成对父类的构造（代理方式）之后，进一步定制实例
 
st->op1->e
```

#### 14.5.3.2		安全检查
+ 指定构造器中的安全检查

```flow
st=>start: 调用指定构造器
e=>end: 结束
op1=>operation: 所在类所有属性初始化完成
op2=>operation: 将其它构造任务向上代理给父类的构造器
op3=>operation: 为继承的属性设置新值
op5=>operation: 指定构造器赋予的新值将被父类中的构造器覆盖
op4=>operation: 对象内存初始化失败
cond1=>condition: 检查1：上一步是否完成？
cond2=>condition: 检查2：上一步是否执行？
st->op1->cond1
cond1(yes)->op2->cond2
cond1(no)->op4->op2
cond2(yes)->op3->e
cond2(no)->op5->op3
```
+ 便利构造器中的安全检查

```flow
st=>start: 调用便利构造器
e=>end: 结束
op1=>operation: 代理调用所在类中的其它构造器
op2=>operation: 为继承的属性设置新值
op3=>operation: 便利构造器赋予的新值将被所在类中的其它指定构造器覆盖
op4=>operation: 不能调用方法、访问属性的值、调用self
cond1=>condition: 检查3：上一步是否完成？
cond2=>condition: 检查4：第一阶段是否构造完成？

st->op1->cond1
cond1(yes)->op2->cond2
cond1(no)->op3->op2
cond2(yes)->e
cond2(no)->op4->e
```

### 14.5.4	构造器的继承和重写
>**说明：**编写一个和父类中指定构造器相匹配的子类构造器时，你实际上是在重写父类的这个指定构造器。
>+ 子类不会默认继承父类的构造器(除非满足一定条件)
>+ 子类可以重载父类的构造器
>+ 子类可以在初始化时修改继承来的`变量属性`，但是不能修改继承来的`常量属性`
>+ 重载构造器一定需要使用`override`（即使将父类的指定构造器重写为了便利构造器）

>**注意：**子类中“重写”一个父类`便利构造器`时，不需要加`override`前缀（子类不能直接调用父类的`便利构造器`，因此并没有真的`重写`）

```swift
// 基类（超类、父类）
class Vehicle {
    var numberOfWheels = 0
    var description: String {
        return "\(numberOfWheels) wheel(s)"
    }
}
let vehicle = Vehicle()
print("Vehicle:\(vehicle.description)")

// 子类
class Bicycle: Vehicle {
    // 重写父类的默认构造器
    override init() {
        // 代理到父类的默认构造器
        super.init()
        numberOfWheels = 2
    }
}

let bicycle = Bicycle()
print("Bicycle:\(bicycle.description)")

```

### 14.5.5	自动构造器的继承
>**说明：**子类在默认情况下不会继承父类的构造器。但是如果满足特定条件，父类构造器是可以被自动继承的。

|特定条件|说明|
|-|-|
|子类没有定义任何指定构造器|自动继承父类所有的指定构造器|
|子类提供了所有父类构造器的实现（继承过来的也算）|自动继承所有父类的便利构造器|

#### 14.5.5.1		指定构造器和便利构造器语法
>+ **指定构造器**

```swift
init(parameters){
	//构造过程
}
```
>+ **便利构造器**

```swift
convenience init(paramaters){
	//构造过程
}
```

#### 14.5.5.2		指定构造器和便利构造器实战
>第一层：食品类

```swift
/**
*父类
*/
class Food {
    var name:String
    //指定构造器
    init(name:String){
        self.name = name
    }
    //便利构造器
    convenience init(){
        //代理给指定构造器
        self.init(name:"[Unnamed]")
    }
}

//使用指定构造器
let namedMeat = Food(name:"Bacon")

//使用便利构造器
let mysteryMeat = Food();
```
>第二层：调味剂类

```swift
/**
*子类(继承了父类的构造器)
*/
class RecipeIngredient:Food{
    var quantity:Int
    //子类特制的构造器
    init(name:String, quantity:Int){
        self.quantity = quantity
        super.init(name:name)
    }
    //重写父类的便利构造器
    override convenience init(name:String){
        self.init(name:name, quantity:1)
    }
}

//使用父类的便利构造器
let oneMysteryItem = RecipeIngredient()

//使用子类的便利构造器（重写了父类的指定构造器）
let oneBacon = RecipeIngredient(name:"Bacon")

//使用子类自己的指定构造器
let sixEggs = RecipeIngredient(name: "Eggs", quantity: 6)
```
>第三层：购物清单类

```swift
/**
*子类的子类
*继承父类所有指定构造器和便利构造器（1.所有属性提供了默认值；2.自己没有定义任何构造器；）
*/
class ShoppingListItem:RecipeIngredient {
    var purchased = false
    var description:String{
        var output = "\(quantity) x \(name)"
        output += purchased ? "√" : "x"
        return output
    }
}

var breakfastList = [
    ShoppingListItem(),
    ShoppingListItem(name: "Bacon"),
    ShoppingListItem(name: "Eggs", quantity: 6)
]
breakfastList[0].name = "Orange juice"
breakfastList[0].purchased = true
for item in breakfastList{
    println(item.description)
}
```

## 14.6	可失败构造器
>**支持：**类、结构体、枚举
>**说明：**在构造自身的过程中有可能失败的情况，可以定义一个（或多个）可失败的构造器，“失败”是指
>1. 构造器传入无效的参数
>2. 缺少某种需要的外部资源
>3. 不满足某种必要条件等
>
>**语法：**`init?`

```swift
init? (...) {
	...
	return nil
}
```
>**注意：**严格说来构造器并不支持返回值（失败构造器表明失败的`return`是个特例）

```swift
struct Animal {
    let species:String
    init?(species:String){
        if species.isEmpty {
            return nil
        }
        self.species = species
    }
}
//构造成功案例
let someCreature = Animal(species: "Giraffe")//Animal?类型
if let giraffe = someCreature{
    println("An animal was initialzed with a species of \(giraffe.species)")
}

//构造失败案例
let anonymousCreature = Animal(species: "")

if anonymousCreature == nil {
    println("The anonymous creature could not be initialized")
}
```

### 14.6.1		枚举类型的可失败构造器

```swift
enum TemperatureUnit{
    case Kelvin, Celsius, Fahrenheit
    //可失败构造器：当没有匹配的项时构造失败
    init?(symbol:Character){
        switch symbol {
            case "K":
                self = .Kelvin
            case "C":
                self = .Celsius
            case "F":
                self = .Fahrenheit
            default:
                return nil
        }
    }
}
//构造成功例子
let fahrenheitUnit = TemperatureUnit(symbol: "F")
if fahrenheitUnit != nil {
    println("This is a defined temperature unit , so initialization succeeded.")
}

//构造失败例子
let unknowUnit = TemperatureUnit(symbol:"F")
if unknowUnit == nil {
    println("This is a defined temperature unit, so initialization succeeded.")
}
```

### 14.6.2		带原始值的枚举类型的可失败构造器
>**说明：**带原始值的枚举类型会自带一个可失败构造器
>+ 该可失败构造器有一个名为`rawValue`的参数，其类型和枚举类型的原始值类型一致
>+ 如果该参数的值能够和某个枚举成员的原始值匹配，则该构造器会构造相应的枚举成员，否则构造失败

>**语法：**`init?(rawValue:)`

|组成|说明|
|------|-------|
|参数名|`rawValue`|
|参数类型|和case的原始值（绑定的值）类型一致|
|返回值|参数和某个成员的原始值匹配则返回该值；否则构造失败，返回`nil`|

```swift
enum TemperatureUnit:Character{
    case Kelvin = "K", Celsius = "C", Fahrenheit = "F"
}
//构造成功例子
let fahrenheitUnit = TemperatureUnit(rawValue: "F")
if fahrenheitUnit != nil {
    println("This is a defined temperature unit , so initialization succeeded.")
}

//构造失败例子
let unknowUnit = TemperatureUnit(rawValue:"F")
if unknowUnit == nil {
    println("This is a defined temperature unit, so initialization succeeded.")
}
```

### 14.6.3		类的可失败构造器
>**说明：**类的所有属性被初始化完毕，以及构造器之间的代理调用都结束后才能触发败行为。

```swift
class Product {
    //隐式解析可选类型
    let name:String!//默认为nil
    init?(name:String){
        if name.isEmpty {
            return nil
        }
        self.name = name
    }
}
```

### 14.6.4		构造失败的传递
>**传递方式：**`横向代理`和`向上代理`

|传递方式|支持|说明|
|-|-|-|
|横向代理|结构体、枚举、类|可失败构造器可以横向代理其它构造器（包括可失败构造器）|
|向上代理|类|子类的可失败构造器可以向上代理父类的构造器（包括可失败构造器）|
>**注意：**
>1. 当代理可失败构造器触发构造失败时，整个构造过程将终止（无论横向代理还是向上代理）
>2. 非可失败构造器不能代理失败构造器 (`init!`声明的除外，但会触发断言)

```swift
class Product {
    //隐式解析可选类型
    let name:String!//默认为nil
    init?(name:String){
        if name.isEmpty {
            return nil
        }
        self.name = name
    }
}

class CartItem:Product {
    let quantity:Int!//确保构造失败仍完成初始化
    
    //可失败构造器
    init?(name:String, quantity:Int){
        //在可能触发构造失败的代理之前完成代理构造过程
        super.init(name: name)
        if quantity < 1{
            return nil
        }
        self.quantity = quantity
    }
}

//1.构造成功案例
if let twoSocks = CartItem(name: "sock", quantity: 2){
    println("Item:\(twoSocks.name), quantity:\(twoSocks.quantity)")
}

//2.子类自身构造失败
if let zeroShirts = CartItem(name: "shirt", quantity: 0){
    println("Item:\(zeroShirts.name), quantity:\(zeroShirts.quantity)")
}else{
    println("Unable to initialize zero shirt")
}

//3.代理父类构造过程失败
if let oneUnnamed = CartItem(name: "", quantity: 1){
    println("Item:\(oneUnnamed.name),quantity:\(oneUnnamed.quantity)")
}else{
    println("Unable to initialize one unnamed product")
}
```

### 14.6.5		重写一个可失败构造器
>**说明：**可以在子类中重写父类的`可失败构造器`（通过定义一个`可失败构造器`或`非可失败构造器`）
>**用途：**即使父类的构造器为可失败构造器，但当子类的构造器在构造过程不可能失败时，我们也可以把它修改过来。
>**情景：**
>1. 子类的`可失败构造器`覆盖父类的可失败构造器
>2. 子类的`非可失败构造器`覆盖父类的可失败构造器

>**注意：**
>+ 当你用子类的`非可失败构造器`重写父类的可失败构造器时，向上代理到父类的可失败构造器的唯一方式是对父类的可失败构造器的返回值进行`强制解包`。
>+ 你可以用`非可失败构造器`重写可失败构造器，但反过来却不行

```swift
// 父类
class Document {
    // 该构造器创建了一个 name 属性的值为 nil 的 document 实例
    var name: String?

    // 非可失败构造器
    init() {}
    
    // 可失败构造器
    init?(name: String) {
        self.name = name
        if name.isEmpty { return nil }
    }
}

// 子类
class AutomaticallyNamedDocument: Document {
    // 重写非可失败构造器
    override init() {
        // 代理到父类的可失败构造器
        super.init()
        self.name = "[Untitled]"
    }
    // 重写失败构造器
    override init(name: String) {
        // 代理到父类的非可失败构造器
        super.init()
        if name.isEmpty {
            self.name = "[Untitled]"
        } else {
            self.name = name
        }
    }
}

// 子类
class UntitledDocument: Document {
    // 重写父类的非可失败构造器
    override init() {
        // 使用强制解包来调用父类的可失败构造器
        super.init(name: "[Untitled]")!
    }
}
```

### 14.6.6		可失败构造器`init!`
>**说明：**构造`可失败构造器`其实有两种方式，两种方式创建的构造器可以相互`代理调用`，也可以相互`重写`对方。
>+ `init?`
>+ `init!`：会构建一个相应类型的隐式解包可选类型的对象。
>
>**描述：**用`init!`声明的`可失败构造器`
>**注意：**还可以用`init`代理到`init!`，不过，一旦`init!`构造失败，则会触发一个断言。


## 14.7	必要构造器
>**说明：**在类的构造器前添加`required`修饰符，称为`必要构造器`。所有该类的子类都必须实现该构造器。在子类重写父类的`必要构造器时`，必须在子类的构造器前也添加`required`修饰符。

```swift
// 父类
class SomeClass {
    required init(){
        //
    }
}
// 子类
class SomeSubClass:SomeClass {
    required init() {
        //
    }
}
```


## 14.8	通过闭包和函数来设置属性的默认值
>**说明：**如果某个`存储型属性的默认值`需要一些`定制或设置`，你可以使用`闭包`或`全局函数`为其提供定制的默认值。
>**限制：**`立即执行闭包`执行时，实例的其他部分还没有初始化，因此
>1. 不能够在闭包中访问其它属性
>2. 不能使用`self`属性
>3. 不能调用其它实例方法
>

```swift
>class SomeClass:SomeType {
    let someProperty:SomeType = {
        //在这个必包中给someProperty创建一个默认值
        //someValue必须和SomeType类型相同
        return someValue
    }()//立即执行此闭包（否则将会将必包本身赋值给属性）
}
```

```swift
struct Checkedboard {
    let boardColors:[Bool] = {
        var temporaryBoard = [Bool]()
        var isBlack = false
        for i in 1...10{
            for j in 1...10{
                temporaryBoard.append(isBlack)
                isBlack = !isBlack
            }
        }
        return temporaryBoard
    }()
    func squareIsBlackAtRow(row:Int, column:Int)->Bool{
        return boardColors[(row * 10) + column]
    }
}
let board = Checkedboard()
println(board.squareIsBlackAtRow(0, column: 1))
println(board.squareIsBlackAtRow(9, column: 9))
```