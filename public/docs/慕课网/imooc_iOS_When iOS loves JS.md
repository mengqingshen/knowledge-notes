---
title: When iOS loves JS
categories:
    - 慕课网学习笔记
tag:
    - iOS
toc: true
---

# 1	JSBinding概述

>**说明：**`JSBinding`是`JS`和`native`之间的一个桥梁，通过这个桥梁，`JS`可以调用`Native`，`Native`可以调用`JS`。
>
>![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-02-04%20%E4%B8%8B%E5%8D%8811.35.27.png)

>**注意：**`JSBinding`不是什么
>+ not Hybrid
>+ not a new technology

>![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-02-04%20%E4%B8%8B%E5%8D%8811.38.56.png)

>**历史：**`cocos2D-X`使用`zynga`提出的一个方案(https://github.com/zynga/jsbindings)，`JS Engine`使用的是`SpiderMonkey`。
## 1.1	JS和Native

>**说明：**两者结合初衷如下

|原生静态语言|动态脚本语言|
|-|-|
|高性能|简单易用|
|更底层，更强大|免编译|
|平台特性|热部署|

## 1.2	iOS 7 and JavaScriptCore

>**说明：**在`iOS 7`之后，苹果公布了`JavaScriptCore`的`API`，在这之前一直是`iOS `系统私有的。
>**扩展：**`Mac`的`JavaScriptCore`一直是开放的。
>**要点：**包括以下部分
>+ `JavaScriptCore.h`头文件
>+ `JSContext`类：`JS`的运行环境
>+ `JSValue`类：
>+ `JSExport`类

### 1.2.1	Eval JavaScript Code

>**说明：**利用引擎执行`JS`代码

```objective-c
#import <JavaScriptCore/JavaScriptCore.h>
int main(int argc, char * argv[]) {
    // 创建 JS 运行的上下文
    JSContext *context = [[JSContext alloc] init];
    // 使用 JS 上下文执行 JS 语句 "1 + 2"，并返回计算结果
    JSValue *result = [context evaluateScript: @"1 + 2"];
    // 打印计算结果
    NSLog(@"1 + 2 = %f", [result toDouble]);
    
    return 0;
}
```

### 1.2.2	Call JavaScript Function

>**说明：**假设一个叫做`sum`的`JS`方法已经被加载

```objective-c
// a "sum" function was loaded in context
// 使用上下文获取函数 sum
JAValue *sum = context[@"sum"];
// 调用sum JS 方法,并传递两个参数
JSValue *result = [sum callWithArguments:@[@1, @2]];
// 打印计算结果
NSLog(@"sum(1, 2) = %f", [result toDouble]);
```

### 1.2.3	Create JavaScript Value

>**说明：**可以先创建`JS`的值，再赋值给相应变量。

```objective-c
// 在指定上下文中创建值 231
JSValue *intVar = [JSValue valueWithInt32: 231 inContext: context];
// 将值赋给变量 bar
context[@"bar"] = intVar;
// 
[context evaluateScript: @"bar++];
```

*another way*

```objective-c
[context evaluateScript: @"var bar = 231;bar++;"];
```

### 1.2.4	Type Conversion

>**说明：**`JS`和`O-C`之间对应类型的转换

|Objective-C type|JavaScript type|
|-|-|
|nil|undefined|
|NSNull|null|
|NSString|string|
|NSNumber|number, boolean|
|NSDictionary|Object object|
|NSArray|Array object|
|NSDate|Date object|
|NSBlock|Function object|
|id|Wrapper object|
|Class|Constructor object|

## 1.3	完整实例


```objective-c
#import <JavaScriptCore/JavaScriptCore.h>
int main(int argc, char * argv[]) {
    // 创建 JS 运行的上下文
    JSContext *context = [[JSContext alloc] init];
    // 为上下文指定JS异常处理代码块
    context.exceptionHandler = ^(JSContext *ctx, JSValue *exception) {
        NSLog(@"%@", exception);
    };
    NSString *script;
    JSValue *result;
    
    // 表达式
    script = @"1 + 2 + 3";
    result = [context evaluateScript:script];
    NSLog(@" %@ = %f", script, [result toDouble]);
    
    // 语句(创建一个全局变量)
    script = @"var globalVal = 2 * 3;";
    result = [context evaluateScript:script];
    NSLog(@" globalVar = %@", context[@"globalVar"]);
    
    // 函数
    script = @"function sum(a, b){return a + b;}";
    [context evaluateScript:script];
    JSValue *sum = context[@"sum"];
    result = [sum callWithArguments:@[@1, @2]];
    NSLog(@"Result of %@ is %f", @"sum(1,2)", [result toDouble]);
    
    // 创建值
    JSValue *foo = [JSValue valueWithDouble:123.45 inContext:context];
    context[@"foo"] = foo;
    [context evaluateScript:@"foo++"];
    NSLog(@"foo = %f", [context[@"foo"] toDouble]);
    return 0;
}
```

# 2	初始iOS7 JavaScriptCore API

## 2.1	Call Native Code via Block

>**说明：**`JS`调用`Native`

```objective-c
//------------ JS 调用 Native
// 为 JS 的上下文注入可以调用的本地 BLOCK
context[@"sum"] = ^(int a, int b) {
    return a + b;
};
// 在 JS 中调用 Native block
result = [context evaluateScript:@"sum(1, 2)"];
// 观察运行结果
NSLog(@"sum(1, 2) = %f", [result toDouble]);
```

## 2.2	Call Native Code via JSExport

>**说明：**通过`jsExport`调用`Native`
>+ Create a js export Class in Objective-C（创建`jsExport`类）
>+ the instance of this class can be accessed in js context（该类的实例可以在`js`的上下文中访问到）
>+ No Constructor in JS（无法在`JS`中访问到`JSExport`对象的构造函数）

###实例
>**说明：**需要做以下工作
>1. 定义一个`JSExport`的子协议：协议指定的成员才能够暴露给`JS`上下文
>2. 创建一个`O-C`类，并采纳协议

*Point3D.h*

```objective-c
#import <Foundation/Foundation.h>
// 协议：继承 JSExport
@protocol Point3DExport <JSExport>

@property float x;
@property float y;
@property float z;

- (double) length;

@end

// 采纳协议
@interface Point3D : NSObject <Point3DExport>
{
    JSContext *context;
}

- (id) initWithContext: (JSContext *) context;

@end
```

*Point3D.m*

```objective-c
#import <JavaScriptCore/JavaScriptCore.h>
#import "Point3D.h"
@implementation Point3D

@synthesize x;
@synthesize y;
@synthesize z;

- (id) initWithContext: (JSContext *) ctx
{
    if (self = [super init]) {
        context = ctx;
        context[@"Point3D"] = [Point3D class];
    }
    return self;
}

- (double)length {
    return sqrt(self.x * self.x + self.y * self.y + self.z * self.z);
}

@end
```

*main.m*

```objective-c
NSString *script;
JSValue *result;
// 创建实例
Point3D *point3D = [[Point3D alloc] initWithContext:context];
point3D.x = 1;
point3D.y = 2;
point3D.z = 3;
// 将实例注入到 JS 上下文
context[@"point3D"] = point3D;
// 待执行的 JS 脚本
script = @"point3D.x = 2; point3D.y = 2; point3D.length();";
// 在 JS 上下文中调用该实例
result = [context evaluateScript:script];
// 观察 JS 运行结果
NSLog(@"Result of %@ is %f", script, [result toDouble]);
```

## 2.3	载入js文件来执行

>**说明：**加入`js`文件比起在`Native`代码中创建`js`脚本子串要通用、易用的多。

```objective-c
// 创建文件路径
NSString *filePath = [NSString stringWithFormat:
                       @"%@/%@",
                       [[NSBundle mainBundle] resourcePath],
                       fileName];
// 载入 js 文件
NSString *script = [NSString stringWithContentsOfFile:filePath encoding:NSUTF8StringEncoding error:nil];
// 执行 js
[context evaluateScript:script];
```

# 3	JavaScriptCore API 进阶

## 3.1	Memory Leak

>**说明：**`js`中对象的`循环引用`和`o-c`中对象的`循环引用`都不会导致内存泄漏。但`js`对象和`Native`对象之间的循环引用会导致内存泄漏。
>+ `js`对象之间循环引用：不会内存泄漏
>![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1454685937810.png)
>+ `o-c`对象和`js`对象之间循环引用：会内存泄漏
>![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1454686063492.png)

>**解决：**`o-c`对象引用`js`对象时将后者包装为`JSManageredValue`
>![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1454686201162.png)
*JS Code*

```javascript
var girl = new Girl();
girl.boyFriend = boy;
boy.girlFriend = girl;
```

*Objective-C Code*

```objective-c
@implementation Boy
- (void)setGirlFriend: (JSValue *)girl
{
	// 使用 JSManageredValue 进行包装
	self.girlFriend = [JSManageredValue manageredValueWithValue: girl];
}
...
@end
```

## 3.2	Threding and parallelism

>**说明：**要点
>+ API is thread safe（API是线程安全的）
>+ Locking granularity is JSVirtualMachine（锁的最小粒度为是`JS`虚拟机）
>+ Use separate JSVirtualMachines for parallelism（并发时要使用不同的`JS`虚拟机）
###实例
>**说明：**创建了2个虚拟机实例
>+ jsvmA：运行了两个`js`上下文(`ctxA1`和`ctxA2`)
>+ jsvmB：运行了一个`js`上下文(`ctxB`)
>
>`ctxA1`和`ctxA2`能够在并发情形下正常通信，但他们`ctxB`在并发环境下不能通信。因为前两者在同一个虚拟机中运行，也就意味着运行在同一个线程中。

```objective-c
// 创建 js 虚拟机实例 jsvmA
JSVirtualMachine *jsvmA = [[JSVirtualMachine alloc] init];

// 在 jsvmA 虚拟机中创建两个js上下文
JSContext *ctxA1 = [[JSContext alloc] initWithVirtualMachine: jsvmA];
JSContext *ctxA2 = [[JSContext alloc] initWithVirtualMachine: jsvmA];

// 创建另一个 js 虚拟机实例 javmB
JSVirtualMachine *jsvmB = [[JSVirtualMachine alloc] init];
// // 在 jsvmB 虚拟机中创建一个js上下文
JSContext *ctxB = [[JSContext alloc] initWithVirtualMachine: jsvmB];
```

## 3.3	JSBinding in the Real World

>**说明：**`JSBinding`的一些实际应用。
>![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1454744485627.png)
>+ Cocos2D
>+ Ejecta
>+ CocoonJS
>![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1454744686882.png)
>+ node.app
### 3.3.1	JS Engines

>**说明：**2种`JS`引擎比较，`JavaScriptCore`和`SpiderMonkey`
>+ JavaScriptCore
>+ SpiderMonkey(Cocos2D-iPhone-2.1-bate3)
>+ SpiderMonkey(Cocos2D-x-2.1-bate3)
>+ SpiderMonkey(iMonkey)
>
>**注意：**`v8`引擎不受支持，因为其依赖于`JIT`，被苹果禁用。
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1454745052574.png)
### 3.3.2	JSBind VS LuaBinding

>**说明：**`JSBinding`和`LuaBinding`比较
>+ `LUA`为什么在游戏编程领域被广泛运用
>https://www.zhihu.com/question/21717567
>+ `Cocos2dx+LUA`合适还是`Cocos2dx+JS`合适
>https://www.zhihu.com/question/21130385
## 3.3.3	Which to Choose

+ Native
+ Web
+ Hybrid
+ ScriptBinding