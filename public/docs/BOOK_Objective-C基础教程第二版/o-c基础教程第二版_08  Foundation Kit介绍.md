---
title: 8 Foundation Kit介绍
categories:
  - Objective-C基础教程第二版
---

>**说明：**`Cocoa`的几个重要框架

|框架|说明|兼容|备注|
|-|-|-|-|
|Foundation Kit|两类UI框架的基础，包含很多有用的、面向数据的简单类和数据类型|ios和OS X|基于CoreFoundation框架|
|Application Kit(Appkit)|包含所有用户界面对象和高级类|OS X|[16章]()|
|User Interface Kit(UIKit)|用户界面|ios|[15章]()|



## 8.1	稳固的 Foundation
>**说明：**两类UI框架的基础，包含很多有用的、面向数据的简单类和数据类型。包含`NSString`、`NSArray`、`NSEnumerator`、和`NSNumber`等100多个类。
>**扩展：**`Foundation`框架以`CoreFoundation`框架为（纯C编写）基础，`CoreFoundation`中的函数和变量的名称以`CF`开头。

## 8.2	使用项目样本代码

```objective-c
#import <Foundation/Foundation.h>

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        // insert code here...
        NSLog(@"Hello, World!");
    }
    return 0;
}
```

## 8.3	一些有用的数据类型

### 8.3.1	范围
>**类型：**`NSRange`
>**原型描述：**`Foundation.h`

```objective-c
>typedef struct _NSRange {
>    unsigned int location;
>    unsigned int length;
>} NSRange;
```
>**说明：**用来表示相关事物的范围，通常是字符串里字符范围或者数组里的元素范围。有`3`中创建方式

```objective-c
// 方式一：直接给字段赋值
NSRange range1;
range.location = 17;
range.length = 4;
// 方式二：利用c语言的聚合结构赋值机制
NSRange range2 = {17, 4};
// 方式三：Cocoa提供的一个快捷函数NSMakeRange，优点是能够在任何能够使用函数的地方使用
NSRange range3 = NSMakeRange(17, 4);
```

### 8.3.2	几何数据类型
>**源：**`Cocoa`（引用`C`语言编写的`Core Graphics`框架）
>**说明：**包括一些用来处理图形的`数据类型`和创建这些数据类型的`快捷方法`。
>**原型：**

```objective-c
struct CGPoint {
	float x;
	float y;
};
struct CGSize {
	float width;
	float height;
};
struct CGRect {
	CGPoint origin;
	CGSize size;
};
```
>**扩展：**所有的`O-C`对象都是动态分配的，而动态分配是一个代价较大的操作，会消耗大量的时间。所以为了性能，`GUI`程序更倾向使用结构体。

```objective-c
#import <Foundation/Foundation.h>

int main(int argc, const char * argv[]) {
    // 矩形原点
    CGPoint point = CGPointMake(0, 0);
    // 矩形大小
    CGSize size = CGSizeMake(8, 10);
    
    // 矩形
    CGRect rect = CGRectMake(0, 0, 8, 10);
    return 0;
}
```

## 8.4	字符串

### 8.4.1	创建字符串

#### stringWithFormat方法
>**说明：**通过格式字符串和参数来创建`NSString`
>**原型：**`NSString`

```objective-c
/**
* @param {NSString *} format 格式串
* @param {...} 对应参数
* @reuturn {id} NSString对象
*/
+ (id) stringWithFormat: (NSString *) format, ...;
```

```objective-c
NSString *height;
height = [NSString stringWithFormat:@"Your height is %d feet, %d inches", 5, 11];
```

### 8.4.2	类方法
>**说明：**如果在声明方法时添加了`+`，就是把这个方法定义为`类方法(class method)`。
>+ 通常用于工厂方法
>+ 也可以用来访问全局数据

>**原理：**`Objective-C`运行时生成一个类的时候，会创建一个代表该类的`类对象（class object）`，包含了指向超类、类名和类方法列表的指针，还包含一个`long`类型的数据，为新创建的实例对象指定大小（以字节为单位）。

>**扩展：**类方法和实例方法

|标识|方法|说明|
|-|-|-|
|+|类方法|属于类的方法|
|-|实例方法|将会在指定的对象实例中起作用|


```objective-c
// UIColor的类方法：redColor（访问全局数据）
NSColor *haveTheBlues = [NSColor blueColor];
UIColor *blueMan = [UIColor blueColor];
```

### 8.4.4	关于大小

#### length实例方法
>**说明：**返回字符串中字符的个数，能够准确无误地处理各种语言的字符串。
>**原型：**`NSString`

```objective-c
>/**
>* @return {NSUInter} 字符串中字符的数目
>*/
>- (NSUInter) length;
```
>**扩展：**在C语言中处理这些国际字符串很麻烦，因为一个字符占用的空间可能多于一个字节，使用`strlen`只能计算字节数的函数会返回错误的数值。

```objective-c
NSString height = @"Hello world!";
if ([height length] > 35) {
	NSLog(@"wow, you're really tail!");
}
```

### 8.4.4	字符串比较

#### isEqualToString实例方法
>**说明：**比较接收方和作为参数传递过来的字符串。
>**原型：**`NSString`

```objective-c
/**
* @param {NSString *} aString 字符串
* @return {BOOL} YES 内容相同，NO 内容不同
*/
- (BOOL) isEqualToString: (NSString *) aString
```
>**扩展：**`==`运算符用来检查两个对象是否为同一事物；`isEqualToString`用来检查两个字符串的内容是否相等。

```objective-c
// 字符串比较
NSString *thing1 = @"hello 5";
NSString *thing2 = [NSString stringWithFormat:@"hello %d", 5];

if ([thing1 isEqualToString:thing2]) {
    NSLog(@"They are the same.")
}
```

#### compare实例方法
>**说明：**将接收对象和传递过来的字符串逐个进行比较
>+ 区分大小写
>+ 返回一个显示比较结果的枚举类型

>**原型：**`NSString`

```objective-c
/**
* @param {NSString *} aString 字符串
* @return {NSComparisonResult} 包含比较结果的枚举类型
*/
- (NSComparisonResult) compare: (NSString *) aString;
```
>**返回值原型：**

```objective-c
enum {
    NSOrderedAscending = -1;// 左侧小于右侧
    NSOrderdSame,// 两侧字符串相同
    NSOrderdDescending// 左侧大于右侧
};
typedef NSInteger NSComparisonResult;
```

### 8.4.5	不区分大小写的比较

#### compare实例方法（2个参数）
>**说明：**比较字符串，有更多选择权，可以使用`位`或`bitwise-OR远端符（|）`来添加选项标记。

|选项标记|说明|
|-|-|
|NSCaseInsensitiveSearch|不区分大小写字符|
|NSLiteralSearch|进行完全比较，区分大小写|
|NSNumericSearch|比较字符串的字符个数，而不是字符串值|


>**原型：**`NSString`

```objective-c
/**
* @param {NSString *} aString 字符串
* @option {NSStringCompareOption} mask 比较选项
* @return {NSComparisonResult} 包含比较结果的枚举类型
*/
- (NSComparisonResult) compare: (NSString *) aString
options: (NSStringCompareOption) mask;
```

```objective-c
// 不区分大小写、比较字符串的字符个数（而不是值）
if ([thing1 compare:thing2 options:NSCaseInsensitiveSearch | NSNumericSearch] == NSOrderedSame) {
    NSLog(@"They match!")
}
```

### 8.4.6	字符串是否还包含别的字符串

### hasPrefix实例方法
>**说明：**检查字符串是否是以另一个字符串开头
>**原型：**`NSString`

```objective-c
/**
*@param {NSString *} aString 子字符串
*@return {BOOL} YES， NO
*/
- (BOOL) hasPrefix: (NSString *) aString;
```

### hasSuffix实例方法
>**说明：**检查字符串是否是以另一个字符串结尾
>**原型：**`NSString`

```objective-c
/**
*@param {NSString *} aString 子字符串
*@return {BOOL} YES ， NO
*/
- (BOOL) hasSuffix: (NSString *) aString;
```

```objective-c
NSString *fileName = @"draft-chapter.pages";
if ([fileName hasPrefix:@"draft"]) {
    NSLog(@"this is a draft.");
}
else ([fileName hasSuffix:@".mov"]) {
    NSLog(@"this is a movie");
}
```

#### rangeOfString实例方法
>**说明：**查看字符串的某处是否包含指定子字符串。
>**原型：**`NSString`

```objective-c
/**
* @param {NSString *} rangeOfString 子字符串
* @return {NSRange} 包含匹配的位置信息和能够匹配上的字符个数
*/
- (NSRange) rangeOfString: (NSString *) aString;
```

```objective-c
// 任意位置
NSRange range = [fileName rangeOfString:@"chapter"];
NSLog(@"range.location:%d, range.length: %d", range.location, range.length);
```

### 8.4.7	可变性
>**说明：**`NSString`是不可变（不能通过删除字符或添加字符的方式改变它）。的，`NSMutableString`是可变的。
>**注意：**`NSMutableString`是`NSString`的子类。

#### stringWithCapacity类方法
>**说明：**创建一个新的`NSMutableString`
>+ **参数：**字符串的大小并不限于所提供的容量，这个容量仅是最优值，用来预分配一块内存，这样后续操作的速度会快很多。

>**原型：**`NSString`

```objective-c
/**
* @param {NSInteger} 最优容量
* @return {id} NSMutable对象
*/
+ id stringWithCapacity: (NSUInteger) capacity;
```

```objective-c
// 创建可变字符串对象
NSMutableString *string = [NSMutableString stringWithCapacity: 42];
```

#### appendString实例方法
>**说明：**接收参数`aString`，然后将其复制到接收对象的末尾。
>**原型：**`NSString`

```objective-c
/**
* @param {NSString *} aString 子字符串
*/
- (void) appendString: (NSString *) aString;
```

#### appendFormat实例方法
>**说明：**将格式化的字符串附加在接收字符串的末尾
>**原型：**`NSString`

```objective-c
/**
* @param {NSString *} format 格式串
* @param {...} 格式串对应的值
*/
- (void) appendFormat: (NSString *) format, ...;
```

```objective-c
// 可变字符串方法
NSMutableString *mString = [NSMutableString stringWithCapacity:50];
[mString appendString:@"Hello there!"];
[mString appendFormat:@"human %d", 42];
```

#### deleteCharactersInRange实例方法
>**说明：**删除字符串中的字符。
>**原型：**`NSString`

```objective-c
/**
* @param {NSRange} aRange 指定删除的部分坐在的区域
*/
- (void) deleteCharactersInRange: (NSRange) aRange;
```

```objective-c
// 创建可变字符串对象
NSMutableString *friends = [NSMutableString stringWithCapacity: 50];
// 查找子串
NSRange jackRange = [friends tangeOfString: @"Jack"];
jackRange.length++;// eat the space that follows

// 删除"Jack"
[friends deleteCharactersInRange: jackRange];

// 使用继承自NSString的实例方法
NSMutableString *string = [NSMutableString strringWithFormat: @"jo%dy", 2];
```

## 8.5	集合大家族

### 8.5.1	NSArray
>**说明：**一个`Cocoa`类，用来存储对象的有序列表
>+ 通过`工厂方法`创建
>+ 通过`字面量`创建（不需要在结尾处不上`nil`）

>**限制：**有2个限制
>+ 只能存储`Object-C`对象，不能存储原始的C语言基础数据类型
>+ 不能使用`nil（对象的零值）`

>**技巧：**可以通过一些`NSArray`的方法避开这些限制
>**注意：**为什么不能在`NSArray`中存放`nil`？
>+ 使用工厂方法创建数组时，最后一个参数`nil`用来表示参数列表的末尾
>+ 没有办法判断`nil`是存储在数组中的数值还是代表循环结束的标志。

#### arrayWithObjects类方法
>**说明：**创建一个新的`NSArray`，可以发送一个以`,`分隔的对象列表，在列表结尾添加`nil`代表列表结束。
>**原型：**`NSArray`

```objective-c
/**
* @param {id ...} 对象列表
* @return {NSArray} 数组
*/
+ (NSArray) arrayWithObjects(id ...);
```

```objective-c
// 通过工厂方法创建数组
NSArray *array = [NSArray arrayWithObjects: @"one", @"two", @"three", nil];

// 通过字面量创建数组
NSArray *array2 = @[@"one", @"two", @"three"];
```

#### objectAtIndex实例方法
>**说明：**索引数组元素。

```objective-c
// 访问数组中的对象
id *myObject = array1[1];
for (NAInteger i = 0; i < [array count]; i++) {
    // 通过方法索引
    NSLog(@"index %d has %@.", i, [array1 objectAtIndex:i]);
    // 通过下标（字面量方式）索引
    NSLog(@"index %d has %@.", i, array1[i]);
}
```

### 切分数组

#### componentsSepartedByString实例方法
>**说明：**将字符串切分为数组。

#### componentsJoinedByString实例方法
>**说明：**合并`NSArray`中的元素并创建字符串。

```objective-c
NSString *string = @"oop:ack:bork:greeble:poines";
NSArray *chunks = [string componentsSeparatedByString:@":"];
string = [chunks componentsJoinedByString:@":-)"];
```

### 8.5.2	可变数组
>**说明：**`NSArray`是不可变对象的数组，`NSMutableArray`是可变数组。
>**注意：**没有可以用来创建`NSMutableArray`对象的字面量语法。

#### arrayWithCapacity类方法
>**说明：**创建新的可变数组。
>**原型：**`NSMutableString`

```objective-c
/**
* @param {NSInteger} 容量
* @return {id} 可变数组
*/
+ (id) arrayWithCapacity: (NSInteger) numItems;
```

#### removeObjectAtIndex实例方法
>**说明：**删除指定索引处的对象。
>**原型：**`NSArray`

```objective-c
/**
* @param {NSUInteger} index 下标
*/
- (void) removeObjectAtIndex: (NSUInteger) index;
```

### 8.5.3	遍历
>**说明：**有`4`种方式
>+ 从0到`[array count]`循环
>+ 使用迭代器：`NSEnumerator`
>+ 使用快速迭代：`for-in`（10.5+）
>+ 使用代码块（依赖苹果最新的编译器：基于`CLang`和`LLVM`项目）

#### NSEnumerator
>**说明：**迭代器，`Cocoa`用它来表示集合中迭代出的对象。

#### objectEnumerator实例方法
>**说明：**获取数组对应的迭代器(从前往后迭代)。
>**原型：**`NSArray`

```objective-c
/**
* @return {NSEnumerator *} 迭代器
*/
- (NSEnumerator *)objectEnumerator;
```

#### reverseObjectEnumerator实例方法
>**说明：**获取数组对应的迭代器(从后往前迭代)。
>**原型：**`NSArray`

```objective-c
/**
* @return {NSEnumerator *} 迭代器
*/
- (NSEnumerator *)reverseObjectEnumerator;
```

#### nextObject实例方法
>**说明：**请求迭代器的下一个对象，返回`nil`时迭代结束。
>**原型：**`NSEnumerator`

```objective-c
/**
* @return {id} 迭代器迭代的一个对象
*/
- (id) nextObject;
```
>**限制：**获取`可变数组`的迭代器后，如果再通过添加或删除对象`改变了数组的容量`，枚举起就会出现混乱。

```objective-c
// 通过字面量创建数组
NSArray *array = @[@"one", @"two", @"three"];
// 获取迭代器
NSEnumerator *enumerator = [array objectEnumerator];
// 使用迭代器遍历
while (id thingie = [enumerator nextObject]) {
	NSLog(@"I found %@", thingie);
}
```

### 8.5.4	快速迭代
>**说明：**在`Mac OS x 10.5`，`O-C`升级到`2.0`，引入了`快速枚举（迭代）`，类似一些脚本语言的`for-in`

```objective-c
for (NSString *string in array) {
	NSLog(@"I found %@", string);
}
```

#### enumerateObjectsUsingBlock实例方法
>**说明：**为了支持C语言的代码块功能，苹果公司添加了一个能在`NSArray`中通过`代码块`迭代对象的方法。
>**优点：**通过代码块可以让循环操作并发执行，而通过快速枚举，执行操作要一项项线性完成。
>**原型：**`NSArray`

```objective-c
/**
* @param {NSString *} string 迭代项
* @param {NSUInteger} index 下标
* @param {BOOL *} stop 
*/
- (void) enumerateObjectUsingBlock:^(NSString *string, NSUInteger index, BOOL *stop);
```

```objective-c
[array enumerateObjectsUsingBlock:^(NSString *string, NSUInteger index, BOOL *stop) {
	NSLog(@"I found %@", string);
}];
```

### 8.5.5	NSDictionary
>**说明：**字典是关键字及其定义的合集。
>**扩展：**字典使用的是键查询的优化方式，可以立即找到要查询的数据，而不需要遍历整个数组。

#### 字面量
>**说明：**创建字典最简单的方式就是用字典字面量。
>**语法：**`@{key: value, ...}`

#### dictionaryWithObjectsAndKeys类方法
>**说明：**创建字典对象
>**原型：**`NSDictionary`

```objective-c
/**
* @param {id ...} 键值对列表
* @return {id} 字典对象
*/
+ (id) dictionaryWithObjectsAndKeys: (id) firstObject, ...;
```

#### objectForKey实例方法
>**说明：**根据`关键字`访问字典中的`值`。
>**原型：**`NSDictionary`

```objective-c
/**
* @param {id} aKey 键
* @return {id} 值
*/
- (id) objectForKey: (id) aKey;
```

```objective-c
// 对象实例
Tire *t1 = [Tire new];
Tire *t2 = [Tire new];
Tire *t3 = [Tire new];
Tire *t4 = [Tire new];

// 使用对象实例构建字典（工厂方法）
NSDictionary *tires1 = [NSDictionary dictionaryWithObjectsAndKeys: t1, @"front-left", t2, @"front-right", t3, @"back-left", t3, @"back-left", t4, @"back-right", nil];
// 使用对象实例构建字典（字面量）
NSDictionary *tires2 = @{@"front-left": t1, @"front-right": t2, @"back-left": t3, @"back-right": t4};
// 通过方法索引
Tire *tire = [tires objectForKey: @"back-right"];
// 通过字面量索引
tire = tires[@"back-right"];
```

#### 可变字典
>**说明：**`NSDictionary`容量是不可变的，`NSMutableDictionary`是可变的。
>**注意：**没有适用于`NSMutableDictionary`的字面量初始化语法。

##### dictionary类方法
>**说明：**创建`NSMutableDictionary`实例。
>**原型：**`NSMutableDictionary`

```objective-c
/**
* @return {id} NSMutableDictionary实例
*/
+ (id) dictionary;
```

##### dictionaryWithCapacity类方法
>**说明：**创建新的可变字典并告诉`Cocoa`该字典的最优大小。
>**原型：**`NSMutableDictionary`

```objective-c
/**
* @param {NSUInteger} numItems 最优容量
*/
- (void) dictionaryWithCapacity: (NSUInteger) numItems;
```


##### setObject实例方法
>**说明：**为字典添加（设置）元素
>**原型：**`NSMutableDictionary`

```objective-c
/**
* @param {id} anObject 值
* @param {id} aKey  键
*/
- (void) setObject: (id)anObject forKey: (id)aKey;
```

##### removeObjectForKey实例方法
>**说明：**在可变字典中删除元素
>**原型：**`NSMutableDictionary`

```objective-c
/**
* @param {id} aKey 要删除的元素的键
*/
- (void) removeObjectForKey: (id) aKey;
```

```objective-c
// 创建可变字典
NSMutableDictionary *tires = [NSMutableDictionary dictionary];
// 对象实例
Tire *t1 = [Tire new];
Tire *t2 = [Tire new];
Tire *t3 = [Tire new];
Tire *t4 = [Tire new];
// 为字典添加元素
[tires setObject: t1 forKey: @"front-left"];
[tires setObject: t2 forKey: @"front-right"];
[tires setObject: t3 forKey: @"back-left"];
[tires setObject: t4 forKey: @"back-right"];

// 删除元素
[tires removeObjectForKey: @"back-left"];
```

### 8.5.6	请不要乱来
>**类蔟：**一群隐藏在通用接口之下与实现相关的类。
>**说明：**在`Cocoa`中，许多类实际上是以`类蔟`的方式实现。比如，创建`NSString`对象时，实际上获得的可能是`NSLiteralString`、`NSCFString`、`NSSimpleCString`、`NSBallOfString`或者其他未写入文档的与实现相关的对象。
>**技巧：**不要尝试给一个`类蔟`创建子类，可以将`NSString`或`NSArray`复合到某个类中或者使用别类。

## 8.6	其他数值
>**说明：**`NSArray`和`NSDictionary`只能存储对象，而不能直接存储任何基本类型的数据，如`int`、`float`和`struct`。
>**技巧：**可以用对象封装基本数据类型，然后再放入`NSArray`或`NSDictionary`。
>**注意：**`Objective-C`不支持`自动开箱`和`自动装箱`。

### 8.6.1	NSNumber
>**说明：**可以用来封装和数字相关的一些基本数据类型。
>**工厂方法：**以最常用的为例
>+ `+ (NSNumber *) numberWithChar: (char) value;`
>+ `+ (NSNumber *) numberWithInt: (int) value;`
>+ `+ (NSNumber *) numberWithFloat: (float) value;`
>+ `+ (NSNumber *) numberWithBool: (BOOL) value;`

>**实例方法：**从`NSNumber`中提取数值
>+ `- (char) charValue`
>+ `- (int) intValue`
>+ `- (float) floatValue`
>+ `- (BOOL) boolValue`
>+ `- (NSString *) stringValue`

>**字面量：**可以使用字面量语法创建`NSNumber`对象

```objective-c
// 封装几本类型
NSNumber *number;
number = @'X';// 字符型
number = @12345;// 整型
number = @12345ul;// 无符号长整数
number = @12345ll;// long long
number = @123,45f;// 浮点型
number = @123,45;// 双浮点型
number = @YES;// 布尔值

NSMutableArray *array = [NSMutableArray arrayWithCapacity];
// 存储到数组中
[array addObject number];
[dictionary setObject: number forKey: @:"Bork"];
```

### 8.6.2	NSValue
>**说明：**`NSValue`可以封装任意值。
>**扩展：**`NSNumber`是`NSValue`的子类。

#### valueWithBytes类方法
>**说明：**创建新的`NSValue`对象。
>**原型：**`NSValue`

```objective-c
/**
* @param {const void *} value 要存储的变量的地址
* @param {const char *} type 描述数据类的字符串
* @return {NSValue *} NSValue对象
*/
+ (NSValue *) valueWithBytes: (const void *) value objCType: (const char *) type;
```
>**工厂方法：**`NSValue`，举例
>+ `(NSValue *)valueWithPoint: (NSPoint) aPoint;`
>+ `(NSValue *)valueWithSize: (NSSize) size;`
>+ `(NSValue *)valueWithRect: (NSRect);`

>**实例方法：**`NSValue`, 会进行类型转换
>+ `(NSPoint)pointValue;`
>+ `(NSSize)sizeValue;`
>+ `(NSRect)rectValue;`

#### getValue实例方法
>**说明：**提取数值，返回一个`NSValue`型值。
>**注意：**方法名中使用了`get`，表明我们提供的是一个指针，而指针所指向的空间则用来存储该方法生成的数据。

```objective-c
// 创建一个对象（struct）
NSRect rect = NSMakeRect(1, 2, 30, 40);
// 包装包NSValue型值中
NSValue *value = [NSValue valueWithBytes:&rect objCType:@encode(NSRect)];
// 添加到数组中
[array addObject:value];
value = [array objectAtIndex:0];
// 提取数值
[value getValue:&rect];

// 疯转NSRect
value = [NSValue valueWithRect:rect];
// 添加到数组
[array addObject:value];
// 提取NSRect型值
NSRect anotherRect = [value rectValue];
```

### 8.6.3	NSNull
>**说明：**集合中不能放入`nil`，但可以放入`NSNull`。

#### null类方法
>**说明：**创建一个`NSNull`实例
>**原型：**`NSNull`

```objective-c
/**
* @return {NSNull *} NSNull实例
*/
+ (NSNull *) null;
```

```objective-c
// 想通讯录中加入一条信息（没有传真号）
[contact setObject: [NSNull null] forKey: @"home fax machine"];

// 索引这条信息
id homefax = [contact objectForKey: @"home fax machine"];
if (homefax == [NSNull null]) {
	// 确实没有传真机
}
```

## 8.7	示例：查找文件

### 8.7.1	使用迭代器的版本

```objective-c
#import <Foundation/Foundation.h>

int main(int argc, const char * argv[])
{
    @autoreleasepool 
    {
        // 创建文件管理器
        NSFileManager *manager;
        manager = [NSFileManager defaultManager];
        
        // 将~替换为相应的绝对目录
        NSString *home;
        home = [@"~" stringByExpandingTildeInPath];
        
        // 获取相应路径下文件集合的迭代器
        NSDirectoryEnumerator *direnum;
        direnum = [manager enumeratorAtPath:home];
        
        // 创建存放文件的可变数组
        NSMutableArray *files;
        files = [NSMutableArray arrayWithCapacity:42];
        
        // 通过迭代器遍历寻找目标文件
        NSString *filename;
        while (filename = [direnum nextObject])
        {
            // 查看扩展名是否匹配
            if ([[filename pathExtension] isEqualTo: @"jpg"]) {
                [files addObject: filename];
            }
        }
        
        // 通过迭代器遍历匹配到的文件的文件名
        NSEnumerator *fileenum;
        fileenum = [files objectEnumerator];
        
        while (filename = [fileenum nextObject])
        {
            NSLog (@"%@", filename);
        }
    }
    return 0;
}

```

### 8.7.2	使用快速迭代的版本
>**说明：**不支持`Leopard`之前的版本。

```objective-c

```

## 8.8	小结