---
title: 第4章 Flutter必备Dart基础：Dart快速入门
categories:
    - Flutter从入门到进阶_实战携程网App
tag:
    - Flutter
---



## 概述

+ 强类型语言，静态类型 （比如 Java、C# 等）
+ 面向对象的语言，OOP（比如 Python、C++、Objective-C、Java、Kotlin、Swift、C#、Ruby 与 PHP 等）
+ JIT（即时编译，开发期间，更快编译，更快的重载） & AOT（事前编译，release 期间，更快更流畅）

![Dart知识体系图](http://assets.processon.com/chart_image/5ec4048e0791290fe072a39c.png)



## 数字、类型转换

```dart
// int 和 float 的父类
num num1 = -1.0;
num num2 = 2;

// 整数
int int1 = 3;

// 双精度
double d1 = 1.68;
print('num: $num1 num: $num2 int: int:$int1 double:$d1'); // num: -1.0 num: 2 int: int:3 double:1.68

// 求绝对值
print(num1.abs()); // 1.0

// 转换成 int
print(num1.toInt()); // -1

// 转换成 double
print(num1.toDouble()); // -1.0
```

## 字符串

```dart
// 定义
String str1 = '单引号', str2 = "双引号";

// 拼接 1
String str3 = 'str1:$str1 str2:$str2';

// 拼接 2
String str4 = 'str1:' + str1 + ' str2' + str2;
String str5 = '常用数据类型，请控制台输出';
print(str3); // 用数据类
print(str4); // str1:单引号 str2双引号

// 常用方法
print(str5.substring(1, 5)); // 用数据类
print(str5.indexOf('类型')); // 4
```

## 布尔

```dart
bool success = true, fail = false;
print(success); // true
print(fail); // false
print(success || fail); // true
print(success && fail); // false
```

## List

```dart
// 初始化
List list = [1, 2, 3, '集合']; // (不指定元素类型，此时 list1 是 List<dynamic>，即元素为动态数据类型)
print(list); // [1, 2, 3, 集合]
List<int> list2 = []; // (通过范型指定元素类型)

// 类型转换
// list2 = list; // 出错: type 'List<dynamic>' is not a subtype of type 'List<int>'

// 添加元素
List list3 = [];
list3.add('list3'); // (添加单个元素)
list3.addAll(list); // (添加集合的所有元素)
print(list3); // [list3, 1, 2, 3, 集合]

// 生成函数
List list4 = List.generate(3, (index) => index * 2);
print(list4); // [0, 2, 4]

// 遍历
for(int i = 0; i < list.length; i++) {
  print(list[i]); // 1 2 3 集合
}
for(var o in list) {
  print(o); // 1 2 3 集合
}
list.forEach((val){
  print(val); // 1 2 3 集合
});
```



## Map

```dart
/* 初始化（方式一）*/
Map names = {
  'xiaoming': '小明',
  'xiaohong': '小红'
};
print(names);

/* 初始化（方式二）*/
Map ages = {};
ages['xiaoming'] = 16;
ages['xiaohong'] = 18;
print(ages);

// 遍历（方式一）
ages.forEach((k, v){
  print('$k, $v');
});

// 遍历（方式二）
Map ages2 = ages.map((k, v){
  return MapEntry(v, k);
});
print(ages2);

// 遍历（方式三）
for(var key in ages.keys) {
  print('$key ${$ages[key]}'); // 需要通过 ${} 来调用方法
}
```

## 科普小知识

> 变量声明: dynamic、var、object 三者的区别

```dart
/* 1. dynamic */
dynamic x = 'hal'; // 动态类型：可以定义任何数据类型，但不会进行静态类型检查
print(x.runtimeType);
print(x);
x.foo(); // 运行时才会报错

x = 123;
print(x.runtimeType); // 运行类型变了

/* 2. var */
var a = 'var'; // 一旦被赋值，类型就推断并确认好了，后面不能再修改
print(a.runtimeType);

/* 3. object */
Object o1 = '111'; // 可以调用 Object 相关的实例方法
print(o1.runtimeType);
```

## 标准构造方法、初始化列表

```dart
/* 父类（默认继承 Object）*/
class Persion {
  /* 变量 */
	String name;
  int age;
  
  /* 构造方法（标准的构造方法） */
  Persion(this.name, this.age);
  
  /* 方法 */
 // 重写父类方法
  @override
  String toString() {
		return 'name: $name, age: $age';
  }
}

/* 子类 */
class Student extends Persion {
	/* 变量（通过下划线来标识私有变量）*/
  String _school;
  
	String city;
  
  String country;
  
  String name;
  
  @override
  toString() {
    return 'city: $city country: $country name: $name';
  }
  
  /*
  * 构造方法
  * 1. 初始化列表：冒号后面的内容叫做类的初始化列表，如果有父类，需要通过 super 调用父类构造函数，在调用 super 之前可以初始化成员变量，多个变量初始化操作之间用‘,’分隔
  * 2. 可选参数：通过 {} 来定义可选参数，可选参数可以有默认值
  * 3. 如果父类没有默认构造方法（无参的构造方法），则需要在初始化列表中调用父类的构造方法
  */
  Student(this._scholl, String name, int age, { this.city, this.country = 'China' })
    : name = '$country,$city',
  		super(name, age) {
        print('这里的构造方法体不是必须的');
      };
}
```



## 命名构造方法

```dart
class Student extends Persion {
  // 类.方法名(多为实现多个构造方法)
  Student.cover(Student stu): super(stu.name, stu.age);
}
```

## 工厂构造方法

说明：不仅仅是构造方法，更是一种模式，有时候为了返回一个之前已经创建的缓存对象，原始的构造方法已经不能满足要求，那么可以使用工厂模式来定义构造方法。

```dart
class Logger {
  static Logger _cache;
  factory Logger() {
    if (_cache === null) {
      cache = Logger;
    }
  }
  Logger._internal();
  
  void log(String msg) {
    print(msg);
  }
}
```



```dart
Logger log1 = Logger();
Logger log2 = Logger();
print(log1 === log2); // true（实现了单例的效果）
```

## get和set、静态方法

```dart
class Logger {
  String _school;
  
  /*
  * get 方法
  * 可以为私有字段设置 getter 方法来让外界访问
  */
  String get school => _school;
  
  /* set 方法 */
  set school(String cal) {
    _school = value;
  }
  
  /* 静态方法 */
  static doPrint(String str) {
    print('doPrint: $str');
  }
}
```

```dart
// 调用静态方法
Logger.doPrint('_oopLearn'); // doPrint: _oopLearn

Student stu1 = Student('清华', 'Jack', 18);
stu1.school = '985';
print(stu1.toString());

Student stu2 = Sutdent('北大', 'Tom', 16, city: '上海', ountry: '中国');
print(stu2.toString());
```

## 抽象类和方法

```dart
/*
*	抽象类
* 1. 使用 abstract 修饰符定义一个抽象类，该类不能被实力化
* 2. 抽象类在定义接口的时候非常有用
*/
abstract Study {
  void study();
}

/*
* 继承抽象类
* 要实现抽象类的方法
*/
class StudyFlutter extends Study {
  @override
  String toString(){
    return 'name:$name, age: $age';
  }
}
```

## mixin

用途：为类添加特征，是类在多个层次结构中重用代码的一种方法

用法：在 with 关键字后，跟上一个或多个 mixin  的名字（用逗号分隔），如果有 extends 关键字，要放在 with 之前

条件：作为 mixin 的类需要具备以下条件

1. 直接继承 Object 类，包括抽象类（不能继承其它类）
2. 不声明任何构造方法
3. 不调用 super

```dart
/*
* 使用 Study 作为 mixin
*/
class Test extends Person with Study {
  Test(String name, nt age): super(name, age);
  
  @override
  void study() {
    // TODO: implement study
  }
}
```



## 带你解锁Flutter中常用的Dart方法类型

结构：([返回值类型]) [方法名] ([参数]) {}

说明：

1. 返回值类型：返回值类型可缺省，也可为 void 或具体的类型
2. 方法名：匿名方法不需要方法名，如果以 _ 作为前缀则属于私有方法
3. 参数：包括参数类型和参数名，支持可选参数，可选参数支持默认参数

```dart
class FunctionLearn {
  // 普通方法
  int sum(int val1, int val2) {
    return val1 + val2;
  }
  
  // 私有方法
  _learn() {
    print('私有方法');
  }
  
  anonymousFunction() {
    var list = ['私有方法', '匿名方法'];
    
    // 循环中的回调函数采用匿名函数
    list.forEach((i) {
      print(list.indexOf(i).toSteing() + ':' + i);
    });
  }
}

class TestFunction {
  FunctionLearn functionLearn = FunctionLearn();

  void start() {
    // 调用在其它类中定义的 sum 方法
    print(functionLearn.sum(1, 2));
    funtionLearn.anonymousFunction();
  }
}
```



## 带你了解Dart范型在Flutter中的应用

用途：范型主要是解决类、接口、方法的复用性、以及对不支持数据类型的支持

说明：

1. 有时候需要实现类似通用接口的范型中，期望的类型是某种特定类型时，这时可以使用类型约束

```dart
class TestGeneric {
  void start() {
    /* 调用使用了范型的类 */
    Cache<String> cache1 = Cache();
    cache.setItem('cache1', 'cache1');
    String str1 = cache1.getItem('cache1');
    print(str1); // cache1
    
    Cache<int> cache2 = Cache();
    cache2.setItem('cahce2', 1008);
    int int1 = cache2.getItem('cache2'); // 1008
    
    // Student 类继承了 Person
    Member<Student> member = Member(Student('', '', 16));
  }
}

/*
* 缓存类
*/
class Cache<T> {
  static final Map<String, Object> _cached = Map();
  
  // 范型方法
  void setItem(String key, T value) {
    _cached[key] = value;
  }
  
  // 范型方法
  T getItem(String key) {
    return _cached[key];
  }
}

/*
* 成员类
* （范型 T 中应用类型约束，要求 T 必须是 Person 的子类）
*/
class Member<T extends Person> {
  // 范型属性
  T _person;
  
  Member(this._person);
  
  String fixedName() {
    return 'fixed: ${_person.name}';
  }
}
```



## 有哪些可以用在 Flutter 上的编程技巧

面向对象的编程技巧

1. 封装：善于封装，大到功能模块、类与抽象，小到方法，封装的目的在于复用和易于扩展和维护（方法代码行尽量 < 100）
2. 继承
3. 多态（重写）

点点点的技巧

1. 查看对象有哪些方法和属性
2. 查看远吗
3. 点探究竟

其它

1. 安全调用：防止空异常
2. 为表达式设置默认值
3. 简化判断

```dart

void main() {
  /* 1. 安全调用 */
  List list;
  print(list?.length);
  
  /* 2. 设置默认值 */
  print(list?.length ?? -1); // 设置默认值为 -1
  
  /* 3. 简化判断 */
  list = [];
  list.add(0);
  list.add('');
  list.add(null);
  
  // 劣
  if (list[0] === null || list[0] === 0) {
    print('list[0] is empty');
  }
  
  // 优
  if ([null, '', 0].contains(list[0])) {
    print('list[0] is empty');
  }
}
```



## 小节

学习资料

1. https://dartlang.org/
2. https://dart.dev/guides/language/language-tour
3. https://dart.goodev.org/guides/language/language-tour