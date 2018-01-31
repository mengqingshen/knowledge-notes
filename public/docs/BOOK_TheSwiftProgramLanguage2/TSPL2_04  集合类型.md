---
title: 4 集合类型
categories:
  - The Swift Program Language 2
tag:
  - swift语言

---

>**说明：**`Array、Sets、Dictionary`(Swift将这3中类型使纤维范型集合)

|集合类型|说明|
|-|-|
|数组（Array）|有序数据集合|
|集合（Sets）|无序无重复数据的集|
|字典（Dictionaries）|无序的键值对的值|

![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202015-11-25%20%E4%B8%8B%E5%8D%8811.16.16.png)

## 4.1	集合的可变性
>**说明：**集合的可变性依赖于声明为常量或变量。

|声明|可变性|
|-|-|
|常量（`let`）|大小不可改变|
|变量（`var`）|可以添加或移除集合中的项|

>**技巧：**不可变的集合性能更好。

## 4.2 数组
>**扩展：**Swift中的`Array`可以桥接到Foundation中的`NSArray`。

### 4.2.1 创建数组
>**说明：**有3种声明数组的形式

|形式|说明|备注|
|-|-|-|
|`Array<ElementType>(count: Int, repeatedValue)`|调用数组的`构造器`|如果不提供参数，则会调用另一个构造器（创建空数组）

|`[ElementType]（count: Int, repeatedValue）`|调用`构造器`的方式|另一种调用构造器的方式，和上面等价，更常用|
|`[Element, ...]`|数组字面量|`[]`表示空数组|

```swift
// 声明数组：形式一（构造器，不常用）
var anotherInts = Array<Int>(count: 3, repeatedValue: 5)
var anotherInts2 = Array(count: 3, repeatedValue: 5);
print("someInts is of type [Int] with \(someInts.count) items.")
// 声明数组：形式二（构造器）
var someInts = [Int]()
// 声明数组：形式三（数组字面量）
var shoppingList1: [String] = ["Eggs", "Milk"]// 指定类型
var shoppingList2 = ["Eggs", "Milk"]// 类型推断
```

### 4.2.2 空数组
>**说明：**3种方式（对应数组声明的3种方式）
>1. `Array[ElementType]（）`
>2. `[ElementType] ()`
>3. `[]`(空数组字面量无法推断类型，声明常量或变量时需指定类型)

```swift
// 空数组
var emptyArray1 = Array<Int>()
var emptyArray2 = [Int]()
var emptyArray3: [Int] = []
```

### 4.2.3 数组相加
>**说明：**`+`、`+=`在数组之间起到拼接的作用。

```swift
let threeDoubles = [Double](count:3, repeatedValue: 0)// [0.0, 0.0, 0.0]
let anotherThreeDoubles = Array(count: 3, repeatedValue: 2.5)// [2.5, 2.5, 2.5]

// +
var sixDouble = threeDoubles + anotherThreeDoubles

// +=
sixDouble += [3, 3]// [0, 0, 0, 2.5, 2.5, 2.5, 3, 3]
```

### 4.2.4 数组字面量
>**语法：**一系列由`,`分割并由`[]`包含的数值。
>+ 只能拥有相同类型值
>+ 当数组不为`[]`的时候，不必把数组的类型定义清楚

```swift
var shoppingList = ["Eggs", "Milk"]
```

### 4.2.5 属性和方法（访问和修改数组）

#### 下标
>**说明：**`arr[下标或下标区间]`
>+ 可以通过`下标`(`下标区间`)改变某个(些)已有索引值对应的数据项（`下标`或`下标区间`不能超过数组的下标范围）
>+ `下标区间`中`下标`的数量可以和用来替换其对应的数据项的新数据项数量不同

```swift
var shoppingList = ["Eggs", "Milk", "Maple Syrup", "Flour"]// 0...3

// 将前3项（0, 1, 2）替换为 ["Bananas", "Apples"]
shoppingList[0...2] = ["Bananas", "Apples"]// ["Bananas", "Apples", "Flour"]
```

#### count属性
>**类型：**`Int`
>**说明：**只读属性，用来获取数组中的数据项数量。

```swift
var shoppingList = ["Eggs", "Milk"]
// count
print("The shopping list contains \(shoppingList.count) items.")
```

#### isEmpty属性
>**类型：**`Bool`
>**说明：**用来判断数组是否为空。
>**技巧：**可以作为检查`count`属性的值是否为0的捷径。

```swift
// 字面量
var shoppingList = ["Eggs", "Milk"]
if shoppingList.isEmpty {
    print("The shopping list is empty.")
}
else {
    print("The shopping list is not empty.")
}
```

#### append方法
>**说明：**在数组后面添加新的数据项。
>**原型：**`String类型的实例方法`

```swift
>/**
>* @param {ElementType} newElement 要被添加的数据项
>*/
>func append(newElement: ElementType) -> Void
```

```swift
var shoppingList = ["Eggs", "Milk"]
shoppingList.append("Flour")// ["Eggs", "Milk", "Flour"]
```


#### insert方法
>**说明：**在某个具体索引项之前添加数据项。
>**原型：**`String类型的实例方法`

```swift
>/**
>* @param {ElementType} newElement 要插入的数据项
>* @param {Int} atIndex 下标（插入的位置）
>*/
>func insert(newElement: String, atIndex: Int) -> Void
```

```swift
shoppingList.insert("Flour", atIndex: 0)
```

#### removeAtIndex方法
>**说明：**移除数组中的某一项。
>**原型：**`String类型的实例方法`

```swift
>/**
>* @param {Int} index 要删除的数据项的下标
>* @return {ElementType} 要删除的数据项的类型
>*/
>func removeAtIndex(index: Int) ->ElementType
```

```swift
var shoppingList = ["Eggs", "Milk", "Maple Syrup"]
// 删除第一项
shoppingList.removeAtIndex(0)// "flour"
```

#### removeFirst函数
>**说明：**删除第一项
>**原型：**`String类型的实例方法`

```swift
>/**
>* @return {ElementType} 删除的数组项
>*/
>func removeFirst() -> ElementType
```

```swift
var shoppingList = ["Eggs", "Milk", "Maple Syrup"]
// 删除第一项
shoppingList.removeFirst()// "Eggs"
```

#### removeLast函数
>**说明：**删除最后一项
>**原型：**`String类型的实例方法`

```swift
>/**
>* @return {ElementType} 删除的数组项
>*/
>func removeLast() -> ElementType
```

```swift
var shoppingList = ["Eggs", "Milk", "Maple Syrup"]
// 删除第一项
shoppingList.removeLast()// "Maple Syrup"
```

### 4.2.6 数组遍历
>**说明：**有两种方式
>+ `for-in`：只在遍历时获得元素项
>+ `for-in`配合`enumerate`：遍历时获得元素项和对应下标

#### enumerate方法
>**说明：**配合`for-in`使用，返回一个由每一个数据项索引和数据值组成的元组。

```swift
// for-in
var shoppingList = ["Eggs", "Milk", "Maple Syrup"]
for item in shoppingList {
    print(item)
}

// enumerate属性
for (index, value) in shoppingList.enumerate() {
    print("Item \(String(index + 1)): \(value)")
}
```

## 4.3	集合
>**关键字：**`Set`
>+ 元素类型相同
>+ 没有确定顺序
>+ 每个元素只出现一次

>**扩展：**Swift中的`Set`类型被桥接到`Foundation`中的`NSSet`类。

### 4.3.1	集合类型的哈希值
>**说明：**存储在`Set`中的类型必须是可`哈希化`的。

|值类型（可哈细化）|条件|备注|
|-|-|-|
|`String`、`Int`、`Double`、`Bool`|无|所有基本类型（既可以作为值，也可以作为键）|
|`enum`类型值|没有关联值|
|自定义类型|实现`Hashable`协议（符合`Equatable`协议）|`1.`需要提供一个类型为`Int`的可读属性`hashValue`；`2.`提供一个是否相等运算符`==`的实现|
>**注意：**Hashable协议的`==`实现必须满足三种情况
>+ 自反性：`a == a`
>+ 对称性：`a == b`意味着`b == a`
>+ 传递性：`a == b` && `b == c`意味着`a == c`

### 4.3.2	声明集合类型
>**说明：**有2种类型

|形式|说明|备注|
|-|-|-|
|`Set<ElementType>()`|调用构造器|没有类似`[ElementType] ()`的简化形式|
|`Set()`|调用构造器|必要条件是声明的变量或常量不仅制定了`Set`，而且明确了`<ElementType>`|
|`[Element, ...]`|字面量|需要明确指定`标记名:Set<ElementType>`，其中`<ElementType>`在集合字面量不是`[]`的情况下可以省略（类型推断）|

```swift
// 创建空Set（形式1）
var letters = Set<Character>()
print("letters is of type Set<Character> with \(letters.count) items.")

// 字面量（形式2）
var favoriteGenres: Set<String> = ["Rock", "Classical", "Hip hop"]
```

### 4.3.3	创建和构造一个空的集合
>**说明：**2种形式（对应两种声明方式）
>+ `Set<ElementType>()`
>+ `Set()`
>+ `[]`(无法进行类型推断，需要指定`ElementType`)

```swift
// 形式1
var emptySet1: Set<String> = []
// 形式2
var emptySet2: Set<String> = Set()
// 形式3
var emptySet3: Set = Set<String>()
```

### 4.3.4	用数组字面量创建集合
>**注意：**对应的常量或变量必须指定了`Set`类型，否则会被默认为`Array`。

### 4.3.5	属性和方法（访问和修改一个集合）

#### count属性
>**类型：**`Int`
>**说明：**只读属性，用来获取`Set`中的数据项数量。

#### isEmpty属性
>**类型：**`Bool`
>**说明：**用来判断数组是否为空。
>**技巧：**可以作为检查`count`属性的值是否为0的捷径。

#### insert方法
>**说明：**在`Set`中插入一个元素。
>**原型：**`Set类型的实例方法`

```swift
>/**
>* @param {Hashable} member 新数据项
>*/
>func insert(member: Hashable) -> Void
```

#### remove方法
>**说明：**移除一个数据项
>**原型：**`Set类型的实例方法`

```swift
>/**
>* @param {Hashable} member 要移除的数据项的键
>* @return {Hashable?} 移除的数据项
>*/
>func remove(member: Hashable) -> Hashable?
```

#### contain方法
>**说明：**检查`Set`中是否包含一个特定的值。
>**原型：**`Set类型的实例方法`

```swift
>/**
>* @param {Hashable} member 数据项值
>* @return {Bool} 是否包含 
>*/
>func contains(member: Hashable) -> Bool
```

```swift
// 创建空Set（形式1）
var letters = Set<Character>()
print("letters is of type Set<Character> with \(letters.count) items.")

// 空Set
// 形式1
var emptySet1: Set<String> = []
// 形式2
var emptySet2: Set<String> = Set()
// 形式3
var emptySet3: Set = Set<String>()
// 清空Set
letters = []

// 字面量（形式2）
var favoriteGenres: Set<String> = ["Rock", "Classical", "Hip hop"]
// count
print("I have \(favoriteGenres.count) favorite music genres.")

// isEmpty
if favoriteGenres.isEmpty {
    print("As far as music goes, I'm not picky.")
}
else {
    print("I have particular music preferences.")
}

// insert
favoriteGenres.insert("Jazz")

// remove
if let removedGenre = favoriteGenres.remove("Rock") {
    print("\(removedGenre) ? I'm over it.")
}
else {
    print("I never much cared for thar.")
}

// contains
if favoriteGenres.contains("Funk") {
    print("I get up on the good foot.")
}
else {
    print("It's too funky here.")
}
```

### 4.3.6	遍历一个集合
>**说明：**如果不做任何处理，使用`for-in`遍历时`Set`时并没有确定的顺序。

#### sort方法
>**说明：**根据提供的序列返回一个有序`Set`。
>**原型：**`Set类型的实例方法`

```swift
>/**
>* @return {Set} 带顺序的Set
>*/
>func sort() -> Set
```

```swift
var favoriteGenres: Set<String> = ["Rock", "Classical", "Hip hop"]
// 遍历
for genre in favoriteGenres {
    print("\(genre)")
}
// sort
for genre in favoriteGenres.sort() {
    print("\(genre)")
}
```

### 4.3.7	完成集合操作

#### 4.3.7.1	基本集合操作
>**说明：**交、差、并、补

|集合操作|方法|
|-|-|
|交|intersect|
|差|exclusive|
|并|union|
|补|subtract|
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202015-11-29%20%E4%B8%8B%E5%8D%884.04.29.png)

```swift
// 奇数
let oddDigits: Set = [1, 3, 5, 7, 9]
// 偶数
let evenDigits: Set = [0 ,2 ,4 ,6, 8]
// 素数
let singleDigitPrimeNumbers: Set = [2, 3, 5, 7]

// 并
oddDigits.union(evenDigits).sort()// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// 交
oddDigits.intersect(evenDigits).sort()// []

// 差
oddDigits.subtract(singleDigitPrimeNumbers)// [9, 1]

// 补
oddDigits.exclusiveOr(singleDigitPrimeNumbers).sort()// [1, 2, 9]
```

#### 4.3.7.2	集合成员关系和相等
>**说明：**集合之间的关系可以分为6中情况

|关系|判定方式|说明|
|-|-|-|
|相等|`==`|判断两个集合是否包含全部相同的值|
|被包含|`isSubsetOf`|判断一个集合中的值是否也被包含在另外一个集合中|
|包含|`isSupersetOf`|判断一个集合中包含另一个集合的所有值|
|被包含且不想等|`isStrucxtSubsetOf`|判定一个集合是另外一个集合的真子集|
|包含且不想等|`isStructSupersetOf`|判定一个集合是另外一个集合的父集且不想等|
|不相交|`isDisjoinWith`|判断两个集合不包含相同的值|

```swift
let houseAnimals: Set = ["dog", "cat"]
let farmAnimals: Set = ["pig", "chicken", "sheep", "dog", "cat"]
let cityAnimal: Set = ["Dove", "Mouse"]

// 被包含
houseAnimals.isSubsetOf(farmAnimals)// true
// 包含
farmAnimals.isSupersetOf(houseAnimals)// true
// 不相交
farmAnimals.isDisjointWith(cityAnimal)// true
```

## 4.4	字典
>**类型关键字：**`Dictionary`
>**说明：**其实就是键值对容器。
>+ 每个`value`都关联唯一的`key`
>+ `key`作为字典中的这个值数据的标示符
>+ 没有具体顺序

>**限制：**对`key`和`value`的类型要求有所不同
>+ `key`：其类型必须遵循`Hashable`协议
>+ `value`：所有数据类型

>**扩展：**Swift中的`Dictionary`

### 4.4.1	创建字典
>**说明：**可划分为`3`种方式

|创建形式|说明|是否只能创建空字典|备注|
|-|-|-|-|
|`[keyType: valueType] ()`|调用构造器的简化形式|是||
|`[key1: value1, ...]`|字面量|否，空字典字面量为`[:]`||
|`Dictionary<Int, String>()`|调用构造器|是|`<Int, String>`可省略（当变量或常量的键值对类型已指定过时）|

```swift
// 方式1：构造器的简化方式
// 指定键值对类型
var dictionary1 = [Int: String]()
// 方式2:字面量形式
var dictionary2: [Int: String] = ["YYZ": "Toronto", "DUB": "Dublin"];

// 方式3：构造器
// 指定键值对类型
var dictionary3 = Dictionary<Int, String>()
// 键值对类型已确定
var dictionary4: [Int: String] = Dictionary()
```

### 4.4.2	访问和修改字典

#### 下标
>**说明：**通过下标可以实现字典中`key-value`的增删改查。
>**注意：**当通过下标使用`key`访问字典中的`value`时，返回的是相应的可选型。

```swift
var airports: [String: String] = ["YYZ": "Toronto", "DUB": "Dublin"]
// 添加新key-value
airports["LHR"] = "London"
// 修改value
airports["LHR"] = "London Heathrow"
// 访问
if let airportName = airports["DUB"] {
    print("The name of the airport is \(airportName)")
}
else {
    print("The airport is not in the aitpoorts dictionary.")
}
// 移除
airports["LHR"] = nil
```

#### count属性
>**类型说明：**`Int`
>**说明：**记录着字典中着键值对的数量的只读属性。

#### isEmpty属性
>**类型说明：**`Bool`
>**说明：**判断字典是否为空字典。

#### keys属性
>**类型：**`[key1, key2, ...]`
>**说明：**字典中所有数据项的`key`构成的数组。

#### values属性
>**类型：**`[value1, value2, ...]`
>**说明：**字典中所有数据项的`value`构成的数组。

#### removeValueForKey方法
>**说明：**通过`key`移除键值对。
>**原型：**`Dictionary类型的实例方法`

```swift
>/**
>* @param {Hashable} key 要删除的键值对的键
>* @return {ValueType?} 对应value的可选型
>*/
>func removeValueForKey(key: Hashable) -> ValueType?
```

```swift
// count
print("The dictionary if airports contains \(airports.count) items.")
// isEmpty
if airports.isEmpty {
    print("The airports dictionary is empty.")
}
else {
    print("Tge airports dictionary is not empty.")
}
// removeValueForKey
if let removedValue = airports.removeValueForKey("DUB") {
    print("The airports dictionary does not contain a value for DUB.")
}
else {
    print("The airports dictionary does not contain a value fot DUB.")
}
```

### 4.4.3	字典遍历
>**说明：**通过`for-in`便利字典时，每一个数据项都以`(key, value)`元组形式返回。
>**技巧：**
>+ 可以通过临时常量或变量分解`(key, value)`
>+ 可以使用`keys`或`values`属性获取相应的数组单独进行遍历
>+ 字典是无序的，可以通过对`keys`或`values`属性使用`sort方法`获得特定顺序

```swift
// 遍历字典
for (airportCode, airportName) in airports {
    print("\(airportCode): \(airportName)")
}
// 遍历字典的key
for airportCode in airports.keys {
    print("Airport code: \(airportCode)")
}
// 遍历字典的value
for airportName in airports.values {
    print("Airport name: \(airportName)")
}
// 提取key或value构成的数组
let airportCodes = [String](airports.keys)
let airportNames = [String](airports.values)
```