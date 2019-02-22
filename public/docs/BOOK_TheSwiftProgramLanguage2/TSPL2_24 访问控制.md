---
title: 24 访问控制
categories:
  - The Swift Program Language 2
tag:
  - swift语言
---

>**说明：**访问控制可以限定其他源文件或模块中的代码对你的代码的访问级别。
>**用途：**这个特性可以让我们`隐藏代码的一些实现细节`，并且可以为其他人可以访问和使用的代码`提供接口`。
>**约定：**为了简单起见，对于代码中可以设置访问级别的特性（属性、基本类型、函数等），在下面的章节中我们会称之为`实体`。

## 24.1	模块和源代码
>**说明：**`Swift` 中的访问控制模型基于`模块`和`源文件`这两个概念。
>**模块：**模块指的是独立的`代码单元`，`框架`或`应用程序`
>+ 作为一个独立的模块来构建和发布
>+ 一个模块可以使用 `import` 关键字导入另外一个模块
>+ `Xcode` 的每个 `target`（例如框架或应用程序）都被当作独立的模块处理

>**源文件：**源文件就是 `Swift` 中的源代码文件
>+ 通常属于一个模块，即一个应用程序或者框架
>+ 同一个源文件也可以包含多个类型、函数之类的定义(一般会将不同的类型分别定义在不同的源文件中)

## 24.2	访问级别
>**说明：**`3`种

|访问级别|说明|用途|
|-|-|-|
|`public`|可以访问同一模块源文件中的任何实体，在模块外也可以通过导入该模块来访问源文件里的所有实体|框架中的某个接口可以被任何人使用时|
|`internal`|可以访问同一模块源文件中的任何实体，但是不能从模块外访问该模块源文件中的实体|某个接口只在应用程序或框架内部使用时|
|`private`|限制实体只能在所在的源文件内部使用|需要隐藏某些功能的实现细节时|
>**注意：**`Swift` 中的 `private` 访问级别不同于其他语言，它的范围限于源文件，而不是声明范围内。这就意味着，一个类型可以访问其所在源文件中的所有 `private` 实体，但是如果它的扩展定义在其他源文件中，那么它的扩展就不能访问它在这个源文件中定义的 `private` 实体。

### 24.2.1	访问级别基本原则
>**说明：**不可以在某个实体中定义访问级别更高的实体。
>+ 一个 `public` 访问级别的变量，其类型的访问级别不能是 `internal` 或 `private`。
>+ `函数`的访问级别不能高于它的`参数类型`和`返回类型`的访问级别

### 24.2.2	默认访问级别
>**说明：**代码默认的访问级别为`internal`

### 24.2.3	单target应用程序的访问级别
>**单target应用程序：**应用的所有功能都是为该应用服务，而`不需要提供给其他应用或者模块使用`，所以我们不需要明确设置访问级别
>**说明：**建议访问级别设置
>+ 通常使用默认的访问级别 `internal` 即可
>+ 也可以使用 `private` 级别，用于隐藏一些功能的实现细节

### 24.2.4	框架的访问级别
>**框架：**主要是被其它模块导入使用
>**说明：**把一些对外的接口定义为 `public` 级别
>+ 框架依然会使用默认的 `internal` 级别，也可以指定为 `private` 级别
>+ 当你想把某个实体作为框架的 `API` 的时候，需显式为其指定 `public` 级别

### 24.2.5	单元测试target的访问级别
>**单元测试target：**当你的应用程序包含`单元测试 target` 时，为了测试，测试模块需要访问应用程序模块中的代码。
>**说明：**默认情况下只有 `public` 级别的实体才可以被其他模块访问。然而，如果在`导入应用程序模块的语句`前使用 `@testable` 特性，然后在允许测试的编译设置`（Build Options -> Enable Testability）`下编译这个应用程序模块，`单元测试 target` 就可以访问应用程序模块中`所有 internal 级别`的实体。

## 24.3	访问控制语法
>**说明：**通过修饰符 `public`、`internal`、`private` 来声明实体的访问级别

```swift
/**** 声明类 ****/
// public
public class SomePublicClass {}
// internal(默认的，可省略)
internal class SomeInternalClass {}
// private
private class SomePrivateClass {}

/****** 声明变量 ******/
// public
public var somePublicVariable = 0
/****** 声明常量 ******/
// internal(可以省略)
internal let someInternalConstant = 0
/****** 声明方法 *********/
// private
private func somePrivateFunction() {}
```

## 24.4	自定义类型
>**说明：**一个类型的访问级别也会影响到类型成员（`属性`、`方法`、`构造器`、`下标`）的默认访问级别

|类型的访问级别|类型成员的默认访问级别|
|-|-|
|`public`|`internal`|
|`internal`（或不指定）|`internal`|
|`private`|`private`|

>**为什么：**一个 `public` 类型的所有成员的访问级别默认为 `internal` 级别，而不是 `public` 级别？
>>好处是，在你定义公共接口的时候，可以明确地选择哪些接口是需要公开的，哪些是内部使用的，避免不小心将内部使用的接口公开。

```swift
// public
public class SomePublicClass {
    // public
    public var somePublicProperty = 0
    // internal
    var someInternalProperty = 0
    // private
    private func somePrivateMethod() {}
}

// internal
class SomeInternalClass {
    // internal
    var someInternalProperty = 0
    // private
    private func somePrivateMethod() {}
}

// private
private class SomePrivateClass {
    // private
    var somePrivateProperty = 0
    // private
    func somePrivateMethod() {}
}
```

### 24.4.1	元组类型
>**说明：**元组不同于类、结构体、枚举、函数那样有单独的定义。元组的访问级别是在它被使用时`自动推断`出的，而无法明确指定。
>**访问级别：**元组的访问级别将由元组中`访问级别最严格的类型`来决定。


### 24.4.2	函数类型
>**访问级别：**函数的访问级别根据访问级别最严格的`参数`类型或`返回`类型的访问级别来决定
>**说明：**如果这种访问级别不符合函数定义所在环境的默认访问级别，那么就需要`明确地指定该函数的访问级别`

```swift
// internal
class SomeInternalClass {
    // internal
    var someInternalProperty = 0
    // private
    private func somePrivateMethod() {}
}

// private
private class SomePrivateClass {
    // private
    var somePrivateProperty = 0
    // private
    func somePrivateMethod() {}
}

// 因为该函数返回类型的访问级别是 private，所以你必须使用 private 修饰符
private func someFunction() -> (SomeInternalClass, SomePrivateClass) {
    // 此处是函数实现部分
}
```

### 24.4.3	枚举类型
>**访问级别：**`枚举成员`的访问级别和该`枚举类型`相同
>**说明：**你不能为`枚举成员`单独指定不同的访问级别

```swift
// public
public enum CompassPoint {
    case North// public
    case South
    case East
    case West
}
```

#### 原始值和关联值
>**说明：**`枚举定义`中的任何`原始值`或`关联值`的类型的访问级别至少不能低于`枚举类型`的访问级别


### 24.4.4	嵌套类型

|环境类型|嵌套类型默认|备注|
|-|-|-|
|`private`|`private`|
|`internal`|`internal`|
|`public`|`internal`|如果想让嵌套类型拥有 `public` 访问级别，那么需要明确指定该嵌套类型的访问级别|

## 24.5	子类
>**说明：**
>+ 子类的访问级别`不得高于`父类的访问级别
>+ 可以通过`重写`为继承来的`类成员`提供`更高的访问级别`
>+ 用`子类成员`去访问访问级别更低的`父类成员`，只要这一操作在相应访问级别的限制范围内
>1. **同一源文件：**可以访问访问父类 `private` 级别的成员
>2. **同一模块：**访问父类 `internal` 级别的成员

```swift
// 父类
public class A {
    // private
    private func someMethod() {}
}

// 子类（访问级别不能高于父类）
internal class B: A {
    // 重写父类方法，提高访问级别
    override internal func someMethod() {
        // 调用父类 private 方法（同一源文件）
        super.someMethod()
    }
}
```

## 24.6	常量、变量、属性、下标
>**说明：**`常量`、`变量`、`属性`不能拥有比它们`所在的类型`更高的访问级别；`下标`也不能拥有比`索引类型`或`返回类型`更高的访问级别。

### 24.6.1	Getter 和 Setter
 >**说明：**`常量`、`变量`、`属性（包括计算属性 和 存储型属性）`、`下标`的 `Getters` 和 `Setters` 的访问级别和它们`所在类型`的访问级别相同。
 >**改变访问级别：**只能改变`Setter`
 |改变`Setter`访问权限的关键字|访问级别|
 |-|-|
 |`private(set)` |`private`|
 |`internal(set)`|`internal`|
 >**注意：**存储属性也有`Getter`和`Setter`，`Swift`会隐式地为其创建 `Getter` 和 `Setter`，用于访问该属性的`后备存储`

```swift
// 结构体(internal)
struct TrackedString {
    // 存储属性：setter 为 private（该属性只有在当前的源文件中是可读写的，而在当前源文件所属的模块中只是一个可读的属性）
    private(set) var numberOfEdits = 0
    // 计算属性: internal
    var value: String = "" {
        didSet {
            numberOfEdits++
        }
    }
}
// 结构体实例
var stringToEdit = TrackedString()
// 写（在同一源文件中）
stringToEdit.value = "This string will be tracked."
stringToEdit.value += " This edit will increment numberOfEdits."
stringToEdit.value += " So will this one."
print("The number of edits is \(stringToEdit.numberOfEdits)")
```

## 24.7	构造器
>**说明：**构造器的访问级别

|构造器|访问级别|
|-|-|
|自定义构造器|可以`低于或等于`其`所属类型`的访问级别|
|必要构造器|必须和所属类型的访问级别`相同`|
>**构造器参数的访问级别：**如同函数或方法的参数，`构造器参数`的访问级别也不能低于`构造器本身`的访问级别。

### 24.7.1	默认构造器
>**默认构造器存在条件：**为所有存储型属性设置了默认初始值，并且未提供自定义的构造器。
>**说明：**默认构造器的访问级别`与所属类型的访问级别相同`，除非类型的访问级别是 `public`

|所在类型访问级别|默认构造器访问级别|
|-|-|
|`private`或`internal`|和所在类型相同|
|`public`|`internal`|
>**技巧：**如果你希望一个 `public` 级别的类型也能在其他模块中使用这种`无参数的默认构造器`，你只能`自己提供一个 public 访问级别的无参数构造器`。

### 24.7.2	`结构体`默认的成员逐一构造器
>**说明：**和结构体中的`存储属性成员`的访问级别有关。

|所有存储型属性的访问级别都为`private`|逐一成员构造器的访问级别|
|-|-|
|是|`private`|
|否|`internal`|
>**技巧：**如果希望一个 `public` 级别的结构体也能在其他模块中使用`其默认的成员逐一构造器`，依然只能`自己提供一个 public 访问级别的成员逐一构造器`。

## 24.8	协议
>**说明：**可以在`定义协议`时明确指定协议的访问级别。
>+ 协议中的每一个`要求`都具有和`该协议`相同的访问级别

### 24.8.1	协议继承
>**说明：**如果定义了一个继承自其他协议的新协议，那么`新协议`拥有的访问级别最高也只能和`被继承协议`的访问级别相同

### 24.8.2	协议一致性
>**说明：**一个`类型`可以采纳比自身访问级别低的`协议`
>**采纳协议的类型的访问级别：**采纳了协议的类型的访问级别取它本身和所采纳协议`两者间最低的访问级别`

## 24.9	扩展
>**说明：**你可以在访问级别允许的情况下对`类`、`结构体`、`枚举`进行扩展。

|是否给扩展指定访问级别|扩展的成员的访问级别|
|-|-|
|是|扩展的访问级别下成员获得的默认访问级别（规则同`自定义类型`）|
|否|和原始类型成员一致|
>**注意：**用于采纳协议的扩展不能指定扩展的访问级别。

### 24.9.1	通过扩展添加协议一致性
>**说明：**如果你通过扩展来采纳协议，那么你就`不能显式指定`该扩展的访问级别了
>扩展的访问级别
>**扩展中提供的实现协议要求的成员的访问级别：**协议拥有相应的访问级别，并会为该扩展中所有协议要求的实现提供默认的访问级别。

## 24.10	泛型
>**说明：**泛型函数和泛型类型放在一起讨论。
>**访问级别：**取`自身`访问级别和`类型参数`访问级别中最低的访问级别

## 24.11	类型别名
>**说明：**你定义的任何`类型别名`都会被当作不同的类型，以便于进行访问控制。
>**访问级别限制：**`类型别名`的访问级别不可高于`其表示的类型`的访问级别。