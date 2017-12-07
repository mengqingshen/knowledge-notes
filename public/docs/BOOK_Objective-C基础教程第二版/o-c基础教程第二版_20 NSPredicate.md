---
title: 20 NSpredicate
categories:
  - Objective-C基础教程第二版
toc: true
---

>**说明：**`Cocoa`提供了一个名为`NSPredicate`的类，用于指定过滤器的条件。
>**原理：**可以创建`NSPredicate`对象，通过它准确描述所需的条件，通过`谓词`(计算真值和假值的函数)筛选每个对象，判断它们是否与条件相匹配。


## 20.1	创建谓词
>**说明：**使用`谓词`有两种方式

|方式|适用|
|-|-|
|创建许多`NSPredicate`对象，组合使用|构建通用用户界面来指定查询的场景|
|谓词字符串|适用于初学者使用，比较简单|

>**建议：**通常将以使用`面向字符串`的`API`，尤其是在缺少编译器的错误检查和奇怪的运行时错误的时候。

### predicateWithFormat工厂方法
>**说明：**基于`谓词字符串`在后台构建`对象数`，创建`谓词`。
>**谓词字符串：**用途类似`sql`，语法类似标准c语言表达式
>**原型：**`NSPredicate`

```objective-c
/**
* @param {NSString *} predicateFormat 谓词字符串（地位类似格式串）
* @param {...} 对应为此字符串中的占位符
*/
+ (NSPredicate *)predicateWithFormat:(NSString *)predicateFormat, ...;
```

```objective-c
// 汽车集合
Garage *garage = [[Garage alloc] init];
garage.name = @"Joe's Garage";

// 存入汽车实例
Car *car;
car = makeCar(@"Herbie", @"Honda", @"CRX", 1984, 2, 34000, 58);
[garage addCar:car];

// 创建谓词：过滤 name 属性值为 Herbie 的车
NSPredicate *predicate;
predicate = [NSPredicate predicateWithFormat:@"name == 'Herbie'"];
```

## 20.2	计算谓词

### evaluateWithObject实例方法
>**说明：**通知接收对象（即`谓词`）根据`指定的对象`计算自身的值。
>**用途：**计算`某个对象`是否符合某个`谓词`中的判断逻辑。
>**原型：**``

```objective-c
/**
* @param {id} object 谓词的主语
* @return {BOOL} YES 判断为真， NO 判断为假
*/
- (BOOL)evaluateWithObject:(nullable id)object;
```

```objective-c
// 谓词1：过滤 name 属性值为 Herbie 的车
NSPredicate *predicate;
predicate = [NSPredicate predicateWithFormat:@"name == 'Herbie'"];
// 搭配主语进行判断
BOOL match = [predicate evaluateWithObject:car];
NSLog(@"%s", (match) ? "YES" : "NO");

// 谓词2：引擎马力大于150
predicate = [NSPredicate predicateWithFormat:@"engine.horsepower > 150"];
match = [predicate evaluateWithObject:car];
NSLog(@"%s", (match) ? "YES" : "NO");

// 谓词3：和谓词1等价
predicate = [NSPredicate predicateWithFormat:@"name == %@", @"Herbie"];
match = [predicate evaluateWithObject:car];
NSLog(@"%s", (match) ? "YES" : "NO");
```

## 20.3	数组过滤器
>**说明：**某些`类别`将`谓词过滤方法`添加到了`Cocoa`集合类（比如`NSArray`）中。

### filteredArrayUsingPredicate实例方法
>**说明：**循环过滤数组内容，根据`谓词`计算每个对象的值，并将值为`YES`的对象累计到将被放回的新数组中。

```objective-c
/* 数组过滤 */
// 创建汽车集合
Garage *garage = [[Garage alloc] init];
garage.name = @"Joe's Garage";
// 添加汽车实例
car = makeCar (@"Badger", @"Acura", @"Integra", 1987, 5, 217036.7, 130);
[garage addCar: car];

car = makeCar (@"Elvis", @"Acura", @"Legend", 1989, 4, 28123.4, 151);
[garage addCar: car];

car = makeCar (@"Phoenix", @"Pontiac", @"Firebird", 1969, 2, 85128.3, 345);
[garage addCar: car];

car = makeCar (@"Streaker", @"Pontiac", @"Silver Streak", 1950, 2, 39100.0, 36);
[garage addCar: car];

car = makeCar (@"Judge", @"Pontiac", @"GTO", 1969, 2, 45132.2, 370);
[garage addCar: car];

car = makeCar (@"Paper Car", @"Plymouth", @"Valiant", 1965, 2, 76800, 105);
[garage addCar: car];
// 创建谓词
predicate = [NSPredicate predicateWithFormat:@"engine.horsepower > 150"];
// 获取汽车实例组成的数组
NSArray *cars = [garage cars];
// 遍历数组
for (Car *car in cars) {
    if ([predicate evaluateWithObject:car]) {
        NSLog(@"%@", car.name);
    }
}
// 创建谓词
predicate = [NSPredicate predicateWithFormat:@"engine.horsepower > %d", 50];
// 过滤数组：引擎马力大于50的
NSArray *results = [cars filteredArrayUsingPredicate:predicate];
```

### filterUsingPredicate实例方法
>**说明：**通过`谓词`剔除可变数组中计算结果不为真的对象。
>**原型：**`NSMutableArray`

```objective-c
/**
* @param {NSPredicate *} predicate 谓词
*/
- (void)filterUsingPredicate:(NSPredicate *)predicate;
```

```objective-c
//------------------可变数组过滤
NSMutableArray *carsCopy = [cars mutableCopy];
// 过滤（有副作用的过滤）
[carsCopy filterUsingPredicate:predicate];
NSLog(@"%@", results);
```


## 20.4	格式说明符
>**说明：**硬编码并非好事，可以通过两种方式将不同的内同放入`谓词格式字符串`中
>+ 格式说明符：`%格式说明符`
>+ 变量名：`$变量名`

### 20.4.1	格式说明符
>**说明：**分3种

|分类|说明|备注|
|-|-|-|
|printf说明符|`c`语言使用的格式说明符|`%d`、`%f`等|
|`%@`|插入`O-C`字符串值||
|`%K`|插入键路径||

```objective-c
// 使用printf式格式字符串
predicate = [NSPredicate predicateWithFormat:@"engine.horsepower > %d", 50];
results = [cars filteredArrayUsingPredicate:predicate];
// 使用%@插入字符串值
predicate = [NSPredicate predicateWithFormat:@"name == %@", @"Herbie"];
// 使用%K指定键路径
predicate = [NSPredicate predicateWithFormat:@"%K == %@", @"name", @"Herbie"];
```

### 20.4.2	插入变量名
>**说明：**需要配合`字典`和`predicateWithSubstitutionVariables`实例方法一起使用。

#### predicateWithSubstitutionVariables
>**说明：**通过已有的`谓词`（`谓词字符串`中包含插入的变量名）创建更加具体的`专用谓词`。
>**原型：**`NSPredicate`

```objective-c
/**
* @param {NSDictionary<NSString *, id> *} variables 用于具体化谓词的字典
* @return {NSPredicate} 专用谓词
*/
- (instancetype)predicateWithSubstitutionVariables:(NSDictionary<NSString *, id> *)variables;
```

```objective-c
// 将字典的键名插入到谓词字符串中
NSPredicate *predicateTemplate = [NSPredicate predicateWithFormat:@"name == $NAME"];// 创建谓词模版
NSDictionary *varDict;
// 变量名为NSString类型
varDict = [NSDictionary dictionaryWithObjectsAndKeys:@"Heribie", @"NAME", nil];// 用来为上述谓词模版的$NAME赋值的字典
predicate = [predicateTemplate predicateWithSubstitutionVariables:varDict];// 通过谓词模版创建谓词
NSLog(@"SNORGLE：%@", predicate);
match = [predicate evaluateWithObject:car];// 主语结合谓词进行计算
NSLog(@"%s", (match) ? "YES" : "NO");
```

```objective-c
predicateTemplate = [NSPredicate predicateWithFormat:@"engine.horsepower > $POWER"];
// 变量名为NSNumber类型
varDict = [NSDictionary dictionaryWithObjectsAndKeys:[NSNumber numberWithInt:150], @"POWER", nil];
predicate = [predicateTemplate predicateWithSubstitutionVariables:varDict];
results = [cars filteredArrayUsingPredicate:predicate];
NSLog(@"OOP %@", results);
```

## 20.5	运算符
>**说明：**`NSPredicate`的格式串中包含大量不同的运算符。
>**注意：**本章将介绍大多数运算符，其余的可以通过苹果公司的`在线文档`进行查询。

### 20.5.1	比较和逻辑运算符
>**说明：**`谓词字符串`语法支持`C`语言中一些常用的运算符
>+ 等号运算符：`==`
>+ 不等号运算符：`>`、`<=`、`!=`等
>+ 赋值运算符：`=`
>+ 逻辑运算符：`AND(&&)`、`OR(||)`、`NOT(!)`

#### 20.5.1.1	比较运算符
>**说明：**包括`等号运算符`和`不等号运算符`。

|运算符|说明|
|-|-|
|`==`(`<>`)|等于|
|`!=`|不等于|
|`<`|小于|
|`>`|大于|
|`<=`(`=<`)|小于或等于|
|`>=`(`=>`)|大于或等于|

```objective-c
// 比较运算符：过滤出数组中name属性小于"Newton"的对象组成的新数组
predicate = [NSPredicate predicateWithFormat:@"name < 'Newton'"];
results = [cars filteredArrayUsingPredicate:predicate];
NSLog(@"%@", [results valueForKey:@"name"]);
```

#### 20.5.1.2	逻辑运算符
>**说明：**共3个

|逻辑运算符|`O-C`形式|c语言形式|
|-|-|-|
|与|`AND`|`&&`|
|或|`OR`|`||`|
|非|`NOT`|`!`|

>**注意：**`谓词字符串`中的运算符不区分大小写

```objective-c
// 逻辑运算符
predicate = [NSPredicate predicateWithFormat:@"(engine.horsepower > 50) AND (engine.horsepower < 200)"];
results = [cars filteredArrayUsingPredicate:predicate];
NSLog(@"oop %@", results);
```

### 20.5.2	数组运算符
>**说明：**有2个

|数组运算符|说明|
|`BETWEEN`|判断是否介于两个值之间|
|`IN`|判断数组中是否包含某个值|

```objective-c
// 数组运算符 BETWEEN：使用数组字面量
predicate = [NSPredicate predicateWithFormat:
             @"engine.horsepower BETWEEN { 50, 200 }"];
results = [cars filteredArrayUsingPredicate: predicate];
NSLog (@"%@", results);

// 数组运算符 BETWEEN：使用数组变量
NSArray *betweens = [NSArray arrayWithObjects:
                     [NSNumber numberWithInt: 50], [NSNumber numberWithInt: 200], nil];
predicate = [NSPredicate predicateWithFormat: @"engine.horsepower BETWEEN %@", betweens];
results = [cars filteredArrayUsingPredicate: predicate];
NSLog (@"%@", results);
// 数组运算符 BETWEEN：使用数组变量＋谓词模版
predicateTemplate = [NSPredicate predicateWithFormat: @"engine.horsepower BETWEEN $POWERS"];
varDict = [NSDictionary dictionaryWithObjectsAndKeys: betweens, @"POWERS", nil];
predicate = [predicateTemplate predicateWithSubstitutionVariables: varDict];
results = [cars filteredArrayUsingPredicate: predicate];
NSLog (@"%@", results);

// 数组运算符 IN：使用数组字面量
predicate = [NSPredicate predicateWithFormat: @"name IN { 'Herbie', 'Snugs', 'Badger', 'Flap' }"];
results = [cars filteredArrayUsingPredicate: predicate];
NSLog (@"%@", [results valueForKey: @"name"]);
```

## 20.6	有 SELF 就足够了
>**说明：**在谓词字符串的`键路径`部分，除了可以使用对象的属性名外，还可以通过`SELF`引用自身。
>**用途：**`SELF`表示的是响应谓词计算的对象本身，适用于将谓词应用于简单的值（例如纯文本字符串），而非哪些可以通过键路径进行操作的复杂对象。
>**技巧：**可以使用`谓词`计算两个数组的交集，其中一个数组作为`主语`，另一个在`谓词`中，使用`IN`运算符。

```objective-c
//------------ SELF ：应用于复杂对象
// 判断 name 属性是不是在指定 字符串数组中
predicate = [NSPredicate predicateWithFormat:@"SELF.name IN {'Herbie', 'Snugs', 'Badger', 'Flap'}"];
// 使用谓词过滤汽车数组，获取子数组
results = [cars filteredArrayUsingPredicate:predicate];
NSLog(@"%@", results);

//------------ SELF：应用于简单对象
// 字符串数组
names = [cars valueForKey:@"name"];
// 判断字符串自身是不是在指定 字符串数组中
predicate = [NSPredicate predicateWithFormat:@"SELF IN {'Herbie', 'Snugs', 'Bager', 'Flap'}"];
// 主语＋谓词
results = [cars filteredArrayUsingPredicate:predicate];
NSLog(@"%@", results);

//-------- 使用 IN 运算符计算两个数组的交集
NSArray *names1 = [NSArray arrayWithObjects: @"Herbie", @"Badger", @"Judge", @"Elvis", nil];
NSArray *names2 = [NSArray arrayWithObjects: @"Judge", @"Paper Car", @"Badger", @"Phoenix", nil];

predicate = [NSPredicate predicateWithFormat: @"SELF IN %@", names1];
results = [names2 filteredArrayUsingPredicate: predicate];
```

## 20.7	字符串运算符
>**说明：**3个专门针对字符串的运算符

|运算符|说明|
|-|-|
|`BEGINSWITH`|前缀是否是某一个字符串|
|`ENDSWITH`|后缀是某一个字符串|
|`CONTAINS`|是否包含某一个子串|

>**运算符修饰符：**

|修饰符|说明|
|-|-|
|`c`|不区分大小写|
|`d`|不区分发音符号|
|`cd`|不区分大小写和发音符号|

>**建议：**处分是需要区分大小写或重音符号的特殊原因，否则请尽力使用`cd`修饰符。

```objective-c
//----------- 字符串运算符
predicate = [NSPredicate predicateWithFormat: @"name BEGINSWITH 'Bad'"];
results = [cars filteredArrayUsingPredicate: predicate];
NSLog (@"%@", results);

predicate = [NSPredicate predicateWithFormat: @"name BEGINSWITH 'HERB'"];
results = [cars filteredArrayUsingPredicate: predicate];
NSLog (@"%@", results);

predicate = [NSPredicate predicateWithFormat: @"name BEGINSWITH[cd] 'HERB'"];
results = [cars filteredArrayUsingPredicate: predicate];
NSLog (@"%@", results);
```

## 20.8	LIKE 运算符
>**说明：**`LIKE`运算符包含2个通配符

|通配符|说明|
|-|-|
|`*`|与任意个任意字符匹配|
|`?`|与一个任意字符匹配|

>**扩展：**如果热衷于正则表达式，可以使用`MATCHES`运算符。
>**技巧：**由于正则表达式计算开销比较大，因此可以在使用`MATCH`之前先使用其它运算符做初步过滤，从而提高运算速度。

```objective-c
//------------- like 运算符
predicate = [NSPredicate predicateWithFormat: @"name LIKE[cd] '*er*'"];
results = [cars filteredArrayUsingPredicate: predicate];
NSLog (@"%@", results);

predicate = [NSPredicate predicateWithFormat: @"name LIKE[cd] '???er*'"];
results = [cars filteredArrayUsingPredicate: predicate];
NSLog (@"%@", results);
```

## 20.9	结语
