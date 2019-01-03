---
title: jQuery源码解析（架构与依赖模块）
categories: [慕课网学习笔记]

tag:
    - jQuery
date: 2017-04-07
---

# 1 理解架构
## 1.1	 课程简介
## 1.2	 课程安排
## 1.3	 jQuery设计理念
**起源：**早期jQuery的作者John Resig在2005年提议改进Prototype的“Behaviour”库
**核心理念：**`The Write Less,Do More`
**优点：**简洁的API、优雅的链式、强大的查询与便捷的操作
**特点：**
1. 它是轻量级的js库 ，它兼容CSS3
2. 兼容各种浏览器（IE 6.0+, FF 1.5+, Safari 2.0+, Opera 9.0+）（jQuery2.0及后续版本将不再支持IE6/7/8浏览器）
3. 文档说明很全，而且各种应用也说得很详细，同时还有许多成熟的插件可供选择

 ## 1.4 jQuery整体架构
### 1.4.1 最新jQuery2.1.1版本的结构

```js
(function(global, factory) {
    factory(global);
}(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
    var jQuery = function( selector, context ) {
		return new jQuery.fn.init( selector, context );
	};
	jQuery.fn = jQuery.prototype = {};
	// 核心方法
	// 回调系统
	// 异步队列
	// 数据缓存
	// 队列操作
	// 选择器引
	// 属性操作
	// 节点遍历
	// 文档处理
	// 样式操作
	// 属性操作
	// 事件体系
	// AJAX交互
	// 动画引擎
	return jQuery;
}));
```

### 1.4.2 模块依赖网

![Alt text](http://cdn.mengqingshen.com/1432773215952.png)

### 1.4.3	 重要变革
  ☑  1.2.3 版发布，引入数据缓存，解决循环引用与大数据保存的问题
  ☑  1.3 版发布，它使用了全新的选择符引擎Sizzle，在各个浏览器下全面超越其他同类型JavaScript框架的查询速度，程序库的性能也因此有了极大提升
  ☑  1.5 版发布，新增延缓对像(Deferred Objects)，并用deferred重写了Ajax模块
  ☑  1.7 版发布，抽象出回调对象，提供了强大的的方式来管理回调函数列表。
### 1.4.4 5大块，13个模块
**5大块：**选择器、DOM操作、事件、AJAX、动画
**为什么换分13个模块：**因为jQuery的设计中最喜欢的做的一件事，就是抽出共同的特性使之“模块化”，当然也是更贴近S.O.L.I.D五大原则的“单一职责SRP”了，遵守单一职责的好处是可以让我们很容易地来维护这个对象，比如，当一个对象封装了很多职责的时候，一旦一个职责需要修改，势必会影响该对象的其它职责代码。通过解耦可以让每个职责更加有弹性地变化。
### 1.4.5 jQuery接口的设计原理
**以ajax为例：**Ajax的高层方法其实都是统一调用了一个静态的jQuery.ajax方法
**jQuery.ajax：**在jQuery.ajax的内部实现是非常复杂的，首先ajax要考虑异步的处理与回调的统一性，所以就引入了异步队列模块（Deferred）与回调模块（Callbacks）, 所以要把这些模块方法在ajax方法内部再次封装成、构建出一个新的jQXHR对象，针对参数的默认处理，数据传输的格式化等等。

```js
jQuery.each( [ "get", "post" ], function( i, method ) {
    jQuery[ method ] = function( url, data, callback, type ) {
		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type     = type || callback;
			callback = data;
			data     = undefined;
		}
		// The url can be an options object (which then must have .url)
		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});
```

## 1.5	 立即调用表达式
**用途：**任何库与框架设计的第一个要点就是解决命名空间与变量污染的问题。jQuery就是利用了JavaScript函数作用域的特性，采用立即调用表达式包裹了自身的方法来解决这个问题。
**综述：**全局变量是魔鬼, 匿名函数可以有效的保证在页面上写入JavaScript，而不会造成全局变量的污染，通过小括号，让其加载的时候立即初始化，这样就形成了一个单例模式的效果从而只会执行一次。
### 1.5.1 匿名函数
**说明：**匿名函数，就是没有函数名的函数，也就是不存在外部引用。
**关键：**使用()将匿名函数括起来。
**用途：**

+ 作为回调函数
+ 用在立即调用表达式中

**小括号中的返回值：**小括号能把我们的表达式组合分块，并且每一块（也就是每一对小括号），都有一个返回值。这个返回值实际上也就是小括号中表达式的返回值。所以，当我们用一对小括号把匿名函数括起来的时候，实际上小括号返回的，就是一个匿名函数的Function对象。
**注意：**要调用一个函数，我们必须要有方法定位它、引用它。声明了它但是又不给名字又没有使用在语法上错误的。

```js
(function(){
	语句
})
```
### 1.5.2 自执行函数
**原理：**小括号对加上匿名函数就如同有名字的函数般被我们取得它的引用位置了。所以如果在这个引用变量后面再加上参数列表，就会实现普通函数的调用形式。
**语法：**

+ *格式一：*

```js
(function(形参列表){
    语句
})(实参列表)
```

+ *格式二：*

```js
var a = function(形参列表){
  语句
}(实参列表);
```

*自执行实例*

```js
(function(window, factory) {
    factory(window);
}(this, function() {
    return function() {
       //jQuery的调用
    }
}));
```
*等价非自执行形式*

```js
var factory = function(){
    return function(){
        //执行方法
    }
}
var jQuery = factory();
```
### 1.5.3 传递window和undefined
**优点：**
1. window和undefined都是为了减少变量查找所经过的scope作用域。当window通过传递给闭包内部之后，在闭包内部使用它的时候，可以把它当成一个局部变量，显然比原先在window scope下查找的时候要快一些。
2. undefined也是同样的道理，其实这个undefined并不是JavaScript数据类型的undefined，而是一个普普通通的变量名。只是因为没给它传递值，它的值就是undefined，undefined并不是JavaScript的保留字。

**注意：**Javascript 中的 undefined 并不是作为关键字，因此可以允许用户对其赋值。
### 1.5.4 兼容AMD和CommonJS
**说明：**主流的库一般都有对 AMD 和 CommonJS 的支持代码，看看jQuery的代码。

```js
if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = global.document ?
        factory(global, true) :
        function(w) {
            if (!w.document) {
                throw new Error("jQuery requires a window with a document");
            }
            return factory(w);
    };
} else {
    factory(global);
}
```
## 1.6	 jQuery的类数组对象结构
**说明：**jQuery就是为了获取DOM、操作DOM而存在的！所以为了更方便这些操作，让节点与实例对象通过一个桥梁给关联起来，jQuery内部就采用了一种叫“类数组对象”的方式作为存储结构。
**特点：**

+ 是对象：可以像对象一样处理jQuery操作
+ 也像数组：也能像数组一样可以使用push、pop、shift、unshift、sort、each、map等类数组的方法操作jQuery对象了。

### 1.6.1 jQuery对象的创建
**说明：**jQuery的入口都是统一的`$`, 通过传递参数的不同，实现了`9`种方法的重载，可以分为`3`大类：

+ 选择器
1. jQuery([selector,[context]])

+ dom加载
2. jQuery(element)
3. jQuery(elementArray)
4. jQuery(object)
5. jQuery(jQuery object)

+ dom处理
6. jQuery(html,[ownerDocument])
7. jQuery(html,[attributes])
8. jQuery()
9. jQuery(callback)

### 1.6.2 自己实现类似的对象数组
**jQuery类数组对象结构：**通过对象键值对的关系保存着属性，原型保存着方法。
![Alt text](http://cdn.mengqingshen.com/1436330348548.png)
**采用的设计模式：**是软件工程领域中的广为人知的设计模式-工厂方法。
**核心：**

+ 作用域安全的构造函数（无new构建）
  函数aQuery()内部首先保证了必须是通过new操作符构建。这样就能保证当前构建的是一个带有this的实例对象

+ 用数字下标作为键
  把所有的属性与方法作为对象的key与value的方式给映射到this上，所以如上结构就可以模拟出jQuery的这样的操作了，即可通过索引取值，也可以链式方法取值

**不完善的地方：**每次调用ajQuery方法等于是创建了一个新的实例，那么类似get方法就要在每一个实例上重新创建一遍，性能就大打折扣。
**JQuery的方案：**jQuery在结构上的优化不仅仅只是我们看到的，除了实现类数组结构、方法的原型共享，而且还实现方法的静态与实例的共存，这是之后将会重点分析的。

```js
var aQuery = function(selector) {
    //强制为对象
	if (!(this instanceof aQuery)) {
		return new aQuery(selector);
	}
	var elem = document.getElementById(/[^#].*/.exec(selector)[0]);
	this.length = 1;
	this[0] = elem;
	this.context = document;
	this.selector = selector;
	this.get = function(num) {
		return this[num];
	}
	return this;
}
```
## 1.7	 jQuery中ready与load事件
**执行顺序：**ready先执行，load后执行。
### 1.7.1 DOM文档加载的步骤
**read和load：**ready在第（4）步完成之后就执行了，但是load要在第（6）步完成之后才执行
1. 解析HTML结构。
2. 加载外部脚本和样式表文件。
3. 解析并执行脚本代码。
4. 构造HTML DOM模型。//`ready`
5. 加载图片等外部文件。
6. 页面加载完毕。//`load`

**最佳实践：**ready与load的区别就在于资源文件的加载，ready构建了基本的DOM结构，所以对于代码来说应该越快加载越好，不需要等到图片资源都加载后才去处理框架的加载，图片资源过多load事件就会迟迟不会触发。

### 1.7.2 针对IE的加载检测
**历史：**Diego Perini 在 2007 年的时候，报告了一种检测 IE 是否加载完成的方式，使用 doScroll 方法调用，详情可见http://javascript.nwbox.com/IEContentLoaded/。
**原理：**当页面 DOM 未加载完成时，调用 doScroll 方法时，会产生异常。那么我们反过来用，如果不异常，那么就是页面DOM加载完毕了。
**注意：**对于 IE 在非 iframe 内时，只有不断地通过能否执行 doScroll 判断 DOM 是否加载完毕。在上述中间隔 50 毫秒尝试去执行 doScroll，注意，由于页面没有加载完成的时候，调用 doScroll 会导致异常，所以使用了 try -catch 来捕获异常。
### 1.7.3 jQuery的处理方式
**方案：**

+ 针对高级的浏览器，用DOMContentLoaded事件了，省时省力。
+ 针对旧的IE浏览器，如果浏览器存在 `document.onreadystatechange` 事件，当该事件触发时，如果 `document.readyState=complete` 的时候，可视为 DOM 树已经载入。

**缺陷：**`document.onreadystatechange`事件不太可靠，比如当页面中存在图片的时候，可能反而在 `onload` 事件之后才能触发，换言之，它只能正确地执行于页面不包含二进制资源或非常少或者被缓存时作为一个备选吧。
**解决方案：**同时使用`doScroll`检查加载情况，如果ready在页面加载完毕后发生，jQuery就必须针对这样的情况跳过绑定了。

*高级浏览器*

```js
jQuery.ready.promise = function( obj ) {
    if ( !readyList ) {
        readyList = jQuery.Deferred();
        if ( document.readyState === "complete" ) {
            // Handle it asynchronously to allow scripts the opportunity to delay ready
            setTimeout( jQuery.ready );
        } else {
            document.addEventListener( "DOMContentLoaded", completed, false );
            window.addEventListener( "load", completed, false );
        }
    }
    return readyList.promise( obj );
};
```
*旧的ie浏览器*

```js
// Ensure firing before onload, maybe late but safe also for iframes
document.attachEvent( "onreadystatechange", completed );
// A fallback to window.onload, that will always work
window.attachEvent( "onload", completed );
// If IE and not a frame
// continually check to see if the document is ready
var top = false;
try {
    top = window.frameElement == null && document.documentElement;
} catch(e) {}
if ( top && top.doScroll ) {
    (function doScrollCheck() {
        if ( !jQuery.isReady ) {
            try {
                // Use the trick by Diego Perini
                // http://javascript.nwbox.com/IEContentLoaded/
                top.doScroll("left");
            } catch(e) {
                return setTimeout( doScrollCheck, 50 );
            }
            // detach all dom ready events
            detach();

            // and execute any waiting functions
            jQuery.ready();
        }
    })();
}
```
####跳过绑定
**说明：**如果ready在页面加载完毕后，jQuery就必须针对这样的情况跳过绑定。直接通过查看`readyState`的状态来确定页面的加载是否完成了。这里会给一个定时器的最小时间后去执行，主要保证执行的正确。

```js
if ( document.readyState === "complete" ) {
     // Handle it asynchronously to allow scripts the opportunity to delay ready
     setTimeout( jQuery.ready );
 }
```
## 1.8	 jQuery多库共存处理
**说明：**多库共存换句话说可以叫无冲突处理。冲突的可能原因：
1. `$`太火热，jQuery采用`$`作为命名空间，不免会与别的库框架或者插件相冲突。
2. jQuery版本更新太快，插件跟不上，导致不同版本对插件的支持度不一样。

**解决方案：**noConflict函数
**作用：**引入jQuery运行这个`noConflict`函数将变量`$`的控制权让给第一个实现它的那个库，确保jQuery不会与其他库的$对象发生冲突。在运行这个函数后，就只能使用`jQuery变量`访问jQuery对象
**使用时机：**这个函数必须在你导入jQuery文件之后，并且在导入另一个导致冲突的库之前使用。当然也应当在其他冲突的库被使用之前，除非jQuery是最后一个导入的。
### 1.8.1 解析
*noConfilict函数源码*
**解读：**通过类似swap交换的概念，先把之前的存在的命名空间给缓存起来，通过对比当前的命名空间达到交换的目的，首先，我们先判断下当前的的`$`空间是不是被jQuery接管了，如果是则让出控制权给之前的`_$`引用的库，如果传入`deep`为true的话等于是把`jQuery`的控制权也让出去了。

```js
/*通过类似swap交换的概念，先把之前的存在的命名空间给缓存起来*/
Var _jQuery = window.jQuery,//缓存jQuery库的命名空间
    _$ = window.$;

jQuery.noConflict = function( deep ) {
	//我们先判断下当前的的`$`空间是不是被jQuery接管了
    if ( window.$ === jQuery ) {
	    //让出控制权给之前的`_$`引用的库
        window.$ = _$;
        
    }
	if ( deep && window.jQuery === jQuery ) {
        window.jQuery = _jQuery;
    }
    return jQuery;
};
```
*DEMO*

```js
jQuery.noConflict();
// 使用 jQuery
jQuery("aaron").show();
// 使用其他库的 $()
$("aaron").style.display = ‘block’;
```
### 1.8.2 案例

```js
$("#aaron").click(function() {
    $.noConflict(); //让出控制权
	if (!$) { 
		show("使用noConflict后，$不存在")
	}
	if (jQuery) {
		show("使用noConflict后，jQuery存在")
	}

	//通过闭包隔离出$
	;(function($) {
		//在闭包中可以继续使用$作为jQquery的命名空间
		if ($) {
			show("通过闭包隔离后，转为局部变量$存在")
		}
		})(jQuery);
	})
	
	function show(data) {
	 	jQuery("body").append('<li>' + data + '</li>')
	}
```
# 2 核心模块
## 2.1 对象的构建
**说明：**从性能上考虑，`jQuery`采用了原型结构，特点如下

+ 实例化对象的构造函数定义在`prototype`中（避免无限递归）
+ 通过在调用的方法中`return`一个`new`出来的对象替代直接使用`new`实例化对象

```c
/**
* jQuery入口
* @param {string} selector css选择器
* @param {Object} context 上下文
* @return {Object} jQuery对象
*/
var $jQuery = function(selector, context) {
  // 调用“基引用”的init函数（构造函数）初始化jQuery对象并返回
  return new $jQuery.fn.init(selector, context);
}

// 定义“基引用”
$jQuery.fn = $jQuery.prototype = {
  // 直接调用init，其中this指向“基引用”这个对象本身，但通过new关键字，其中的this就指向了实例化后的对象
  init: function() {
    this.name = 'aaron'
    return this;
  },
  constructor: $jQuery
}

// 利用上面定义的入口创建实例化的对象
var $a = $jQuery();
```
## 2.2 分离构造器
解释下这里的"分离构造器"的意思。向上看上一节的代码，其中的 `ajQuery` 和 它的一个属性 `init` 是两个独立的构造器，但使用方式完全一样，都既可以作为一个函数调用，也可以用 new 来调用，结果都是返回一个构造好的实例。
## 2.3 静态与示例方法共享设计
### 笔记
总结下静态与实例方法的共享设计

+ 静态方法定义在 jQuery 构造器上
+ 实例方法定义在 `jQuery.prototype` 上，但实际调用的是相应的静态方法
+ `jQuery.prototype.init.prototype` 和 `jQuery.prototype` 是同一个对象，因此用 new 调用 `jQuery.prototype.init` 创建的对象可以访问到定义在 `jQuery.prototype` 上的实例成员。

### 课程讲义
保留上一节分割出2个构造器的疑问，我们先看看jQuery在接口的设计：

遍历方法：

```js
$(".aaron").each()   //作为实例方法存在
$.each()             //作为静态方法存在
```

这是最常见的遍历方法，第一条语句是给有指定的上下文调用的，就是(".aaron")获取的DOM合集，第二条语句$.each()函数可用于迭代任何集合，无论是“名/值”对象（JavaScript对象）或数组。在迭代数组的情况下，回调函数每次都会传递一个数组索引和相应的数组值作为参数。本质上来说2个都是遍历，那么我们是不是要写2个方法呢？

我们来看看jQuery的源码：

```js
jQuery.prototype = {
    each: function( callback, args ) {
        return jQuery.each( this, callback, args );
    }
}
```

实例方法取于静态方法，换句话来说这是静态与实例方法共享设计，静态方法挂在jQuery构造器上，原型方法挂在哪里呢？

我们上节不是讲了内部会划分一个新的构造器init吗？jQuery通过new原型prototype上的init方法当作构造器，那么init的原型链方法就是实例的方法了，所以jQuery通过2个构造器划分2种不同的调用方式一种是静态，一种是原型。

方法是共享的，并且实例方法取于静态方法，2个构造器是完全隔离的 ,这个要如何处理？

**看看jQuery给的方案：**

画龙点睛的一处 `init.prototype = jQuery.fn`，把`jQuery.prototype`原型的引用赋给`jQuery.fn.init.prototype`的原型，这样就把2个构造器的原型给关联起来了。

```js
ajQuery.fn = ajQuery.prototype = {
        name: 'aaron',
        init: function(selector) {
               this.selector = selector;
               return this;
        },
        constructor: ajQuery
}
ajQuery.fn.init.prototype = ajQuery.fn
```

这段代码就是整个结构设计的最核心的东西了，有这样的一个处理，整个结构就活了！不得不佩服作者的设计思路，别具匠心。

看看init的的构造图：

![](media/14915528372848.jpg)

通过原型传递解决问题，把jQuery的原型传递给`jQuery.prototype.init.prototype`。换句话说jQuery的原型对象覆盖了 init 构造器的原型对象，因为是引用传递所以不需要担心这个循环引用的性能问题。


## 2.4 方法链式调用的实现

### 笔记

jQuery 对象实例的成员方法通过返回自身对象实现链式调用。

### 课程讲义
jQuery的核心理念是`Write less,Do more(写的更少,做的更多)`，那么链式方法的设计与这个核心理念不谋而合。那么从深层次考虑这种设计其实就是一种Internal DSL。

`DSL`是指`Domain Specific Language`，也就是用于描述和解决特定领域问题的语言。

我们看一段链式代码：

```js
$('input[type="button"]')
    .eq(0).click(function() {
        alert('点击我!');
}).end().eq(1)
.click(function() {
    $('input[type="button"]:eq(0)').trigger('click');
}).end().eq(2)
.toggle(function() {
    $('.aa').hide('slow');
}, function() {
    $('.aa').show('slow');
});
```

看这个代码的结构，我们或多或少都能猜到其含义：

  ☑  找出 type 类型为 button 的 input 元素

  ☑  找到第一个按钮，并绑定 click 事件处理函数

  ☑  返回所有按钮，再找到第二个

  ☑  为第二个按钮绑定click事件处理函数

  ☑  为第三个按钮绑定toggle事件处理函数


那么可见 jQuery 的 Internal DSL 形式带来的好处——编写代码时，让代码更贴近作者的思维模式；阅读代码时，让读者更容易理解代码的含义；应用 DSL 可以有效的提高系统的可维护性（缩小了实现模型和领域模型的距离，提高了实现的可读性）和灵活性，并且提供开发的效率。

jQuery 的这种管道风格的 DSL 链式代码，总的来说：

  ☑  节约JS代码；

  ☑  所返回的都是同一个对象，可以提高代码的效率。

通过简单扩展原型方法并通过 `return this` 的形式来实现跨浏览器的链式调用。利用 JS 下的简单工厂方法模式，来将所有对于同一个 DOM 对象的操作指定同一个实例。

这个原理就超简单了,如下代码：

```js
aQuery().init().name()
```

分解：

```js
a = aQuery();
a.init()
a.name()
```

把代码分解一下，很明显实现链式的基本条件就是要实例对象先创建好，调用自己的方法。

```js
aQuery.prototype = {
    init: function() {
        return this;
    },
    name: function() {
        return this
    }
}
```

所以我们如果需要链式的处理，只需要在方法内部方法当前的这个实例对象 this就可以了，因为返回当前实例的 this，从而又可以访问自己的原型了，这样的就节省代码量，提高代码的效率，代码看起来更优雅。但是这种方法有一个问题是：所有对象的方法返回的都是对象本身，也就是说没有返回值，所以这种方法不一定在任何环境下都适合。

虽然 Javascript 是无阻塞语言，但是他并不是没阻塞，而是不能阻塞，所以他需要通过事件来驱动，异步来完成一些本需要阻塞进程的操作，这样处理只是同步链式，除了同步链式还有异步链式，异步链式 jQuery 从1.5开始就引入了`Promise`，`jQuery.Deferred` 后期再讨论。
## 2.5 插件接口的设计

### 笔记
+ 提供两种类型的插件

(1) 在 jQuery 命名空间下的静态方法： `$.entend()`
(2) 通过 jQuery 对象调用的方法: `$.fn.extend()`

+ 两种方式调用的是同一个方法，该方法根据调用者的不同判断插件的挂载位置

### 课程讲义
如果jQuery没有插件接口的设计，那么他就像个光杆司令没有兵，就是没有手下，只有自己一个封闭的城堡。因此 jQuery 城堡需要设计一个大门 - 插件接口，从而打开大门开始招兵买马。当然 jQuery 除了获得“开发者社区”的大力支持外，也有很多大公司纷纷对它投出了橄榄枝，这也是它成功的关键。

基于插件接口设计的好处也是颇多的，其中一个最重要的好处是把扩展的功能从主体框架中剥离出去，降低了框架的复杂度。接口的设计好比电脑上的配件如：CPU、内存、硬盘都是作为独立的模块分离出去了，但是主板提供模块的接口，例如支持串口的硬盘，我只要这个硬盘的接口能插上，甭管是500G还是1000G的容量的硬盘，都能使用。所以在软件设计中插件接口的提供把独立的功能与框架以一种很宽松的方式松耦合。

从之前的分析中我们可以知道 jQuery 对象的原理，所以一般来说，jQuery 插件的开发分为两种：

  ☑  一种是挂在 jQuery 命名空间下的全局函数，也可称为静态方法；

  ☑  另一种是 jQuery 对象级别的方法，即挂在 jQuery 原型下的方法，这样通过选择器获取的 jQuery 对象实例也能共享该方法。

提供的接口：

```js
$.extend(target, [object1], [objectN])
```

接口的使用：

```js
jQuery.extend({
    data:function(){},
    removeData:function(){}
})

jQuery.fn.extend({
    data:function(){},
    removeData:function(){}
})
```
jQuery 的主体框架就是之前提到的那样，通过工厂模式返回一个内部的 init 构造器生成的对象。但是根据一般设计者的习惯，如果要为 jQuery 添加静态方法或者实例方法从封装的角度讲是应该提供一个统一的接口才符合设计的。

jQuery 支持自己扩展属性，这个对外提供了一个接口，`jQuery.fn.extend()`来对对象增加方法，从 jQuery 的源码中可以看到，`jQuery.extend`和`jQuery.fn.extend`其实是同指向同一方法的不同引用。

这里有一个设计的重点，通过调用的上下文，我们来确定这个方法是作为静态还是实例处理，在 javascript 的世界中一共有四种上下文调用方式：方法调用模式、函数调用模式、构造器调用模式、apply调用模式


- [x] jQuery.extend调用的时候上下文指向的是jQuery构造器

- [x] jQuery.fn.extend调用的时候上下文指向的是jQuery构造器的实例对象了

通过 extend() 函数可以方便快速的扩展功能，不会破坏jQuery的原型结构，`jQuery.extend = jQuery.fn.extend = function(){...};` 这个是连等，也就是2个指向同一个函数，怎么会实现不同的功能呢？这就是this力量了！

fn与jQuery其实是2个不同的对象，在之前有讲解：`jQuery.extend` 调用的时候，this 是指向 jQuery 对象的( jQuery 是函数，也是对象！)，所以这里扩展在 jQuery 上。而 jQuery.fn.extend 调用的时候，this 指向 fn 对象，jQuery.fn 和jQuery.prototype指向同一对象，扩展fn就是扩展jQuery.prototype 原型对象。这里增加的是原型方法，也就是对象方法了。所以 jQuery 的 API 中提供了以上2个扩展函数。

jQuery 的 extend 代码实现比较长，我们简单说一下重点：

```js
aAron.extend = aAron.fn.extend = function() {
    var options, src, copy,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length;

    //只有一个参数，就是对jQuery自身的扩展处理
    //extend,fn.extend
    if (i === length) {
        target = this; //调用的上下文对象jQuery/或者实例
        i--;
    }
    for (; i < length; i++) {
        //从i开始取参数,不为空开始遍历
        if ((options = arguments[i]) != null) {
            for (name in options) {
                copy = options[name];
                //覆盖拷贝
                target[name] = copy;
            }
        }
    }
    return target;
}
```

我来讲解一下上面的代码：因为 extend 的核心功能就是通过扩展收集功能（类似于 mix 混入），所以就会存在收集对象（target）与被收集的数据，因为 `jQuery.extend` 并没有明确实参，而且是通过 `arguments` 来判断的，所以这样处理起来很灵活。`arguments`通过判断传递参数的数量可以实现函数重载。其中最重要的一段`target = this`，通过调用的方式我们就能确实当前的`this`的指向，所以这时候就能确定`target`了。最后就很简单了，通过`for`循环遍历把数据附加到这个`target`上了。当然在这个附加的过程中我们还可以做数据过滤、深拷贝等一系列的操作了。

## 2.6 回溯处理的设计
在这一小节我将会带领你们了解 jQuery 对 DOM 进行遍历背后的工作机制，这样可以在编写代码时有意识地避免一些不必要的重复操作，从而提升代码的性能。

关于 jQuery 对象的包装

```js
var $aaron = $("aaron");
```
通过对`sizzle`的分析，我们可以得知`jQuery`选择器最终都是通过`DOM`接口实现取值的, 但是通过`jQuery`处理后返回的不仅仅只有`DOM`对象，而是一个包装容器，返回`jQuery`对象：`$aaron`。

我们来看一下代码：

![](media/14915577854698.jpg)


在 jQuery 对象中有个 prevObject 对象，这个是干嘛用的呢？

如果你想知道 prevObject 是做什么的，咱们首先得先来了解一下 jQuery 对象栈，jQuery 内部维护着一个 jQuery 对象栈。每个遍历方法都会找到一组新元素（一个jQuery对象），然后jQuery会把这组元素推入到栈中。

而每个 jQuery 对象都有三个属性：context、selector 和 prevObject，其中的 prevObject 属性就指向这个对象栈中的前一个对象，而通过这个属性可以回溯到最初的 DOM 元素集中。

为了方便理解，我们做几个简单的测试：

下面有一个父元素 ul ,嵌套了一个li节点：

```html
<ul id="aaron">
    parent
    <li>child</li>
</ul>

```
我们现给 li 绑定一个事件，这个很简单，找到 ul 下面的 li ，绑定即可：

```js
var aaron = $("#aaron");
    aaron.find('li').click(function(){
        alert(1);     //1
    })
```
此时我又想给父元素绑定一个事件，我们是不是又要在 aaron 上绑定一次事件呢？是的，上面代码通过 find 处理后，此时的上下文是指向每一个 li 了,所以必须要重新引用 aaron 元素（ li 的父元素），然后再绑定 click 事件：

```js
aaron.click(function(){
      alert(2);     //1
 })
```

这样会不会很麻烦，所以 jQuery 引入一个简单的内部寻址的机制，可以回溯到之前的 Dom 元素集合，通过 `end()`方法可以实现：

```js
aaron.find('li').click(function() {
        alert(1);
}).end().click(function() {
        alert(2);
})
```

jQuery为我们操作这个内部对象栈提供个非常有用的2个方法

`.end()`

`.addBack()`

这里需要指出来可能有些 API上 是 andSelf，因为就 jQuery 的 api 是这样写的，andSelf 现在是`.addBack()`的一个别名。在 jQuery1.8 和更高版本中应使用`.addBack()`

源码其实也是这样的

```js
jQuery.fn.andSelf = jQuery.fn.addBack;
```

调用第一个方法只是简单地弹出一个对象（结果就是回到前一个 jQuery 对象）。第二个方法更有意思，调用它会在栈中回溯一个位置，然后把两个位置上的元素集组合起来，并把这个新的、组合之后的元素集推入栈的上方。

利用这个 DOM 元素栈可以减少重复的查询和遍历的操作，而减少重复操作也正是优化 jQuery 代码性能的关键所在。

## 2.7 end 和 addBack

大多数 jQueryDOM 遍历方法来操作 jQuery 对象实例，并创建一个新的对象，匹配一个不同的 DOM 元素集合。当发生这种情况时，实际上是新的元素集合被压入到对象内部维护的栈中。每次过滤方法都会被压入栈中。当我们需要返回到前一个状态时，我们可以使用 `end()` 进行出栈操作，来返回栈中的前一个状态。

假设页面上有几个列表项：右图所示

end()

方法主要用于 jQuery 的链式属性中。当没有使用链式用法时，我们通常只是调用变量名上的前一个对象，所以我们不需要操作栈。

使用 `end()` 时，我们可以一次性调用所有需要的方法：

```js
$('ul.first').find('.foo').css('background-color', 'red').end().find('.bar').css('background-color', 'green');
```

链式的原理就是要返回当前操作的上下文。

下面的代码是错误的：

```js
$('ul.first').find('.foo').css('background-color', 'red').find('.bar').css('background-color', 'green');
```

上面的代码因为上下文被切换了，所以执行`find(‘bar’)`时就出错了。

下面的代码是正确的写法：

```js
$('ul.first').find('.foo').css('background-color', 'red').end().find('.bar').css('background-color', 'green');
```

首先在链式用法中只在第一个列表中查找样式为 foo 的项目，并将其背景色变成红色。然后end()返回调用find()之前的状态。因此，第二次 `find()` 将只会查找 `<ul class="first"> `中的 `'.bar'`，而不是继续在`<li class="foo">`中进行查找，结果是将匹配到的元素的背景色变成绿色。上述代码的最终结果是：第一个列表中的第 1 和第 3 个列表项的背景色有颜色，而第二个列表中的任何项目都没有背景色。

总的来说：end 方法就是回溯到上一个 Dom 合集,因此对于链式操作与优化，这个方法还是很有意义的。

### 源码实现

既然是回溯到上一个 DOM 合集，那么肯定 end 方法中返回的就是一个 jQuery 对象了，所以我们看源码其实就是返回 prevObject 对象了，如下代码：

```js
end: function() {
     return this.prevObject || this.constructor(null);
}
```

### prevObject在什么情况下会产生？

在构建 jQuery 对象的时候，通过 pushStack 方法构建，如下代码：

```js
jQuery.fn.extend({
    find: function(selector) {

        //...........................省略................................

        // 通过sizzle选择器，返回结果集
        jQuery.find(selector, self[i], ret);

        // Needed because $( selector, context ) becomes $( context ).find( selector )
        ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
        ret.selector = this.selector ? this.selector + " " + selector : selector;
        return ret;
    }
})
```

可以看到通过 `jQuery.find` 后得到了结果 ret 这个就是通过纯的 DOM 节点，那么如果变成一个 jQuery 对象呢？

接着我们看 pushStack 对象，作用就通过新的 DOM 元素去创建一个新的 jQuery 对象


```js
pushStack: function( elems ) {
    // Build a new jQuery matched element set
    var ret = jQuery.merge( this.constructor(), elems );

    // Add the old object onto the stack (as a reference)
    ret.prevObject = this;
    ret.context = this.context;

    // Return the newly-formed element set
    return ret;
}
```

**流程解析：**

1. 首先构建一个新的 jQuery 对象，因为 constructor 是指向构造器的，所以这里就等同于调用jQuery()方法了，返回了一个新的 jQuery 对象；
2. 然后用 jQuery.merge 语句把 elems 节点合并到新的 jQuery 对象上；
3. 最后给返回的新 jQuery 对象添加 prevObject 属性，我们看到 prevObject 其实还是当前 jQuery 的一个引用罢了，所以也就是为什么通过 prevObject 能取到上一个合集的原因了。


## 2.8 仿栈和队列的操作

jQuery 既然是模仿的数组结构，那么肯定会实现一套类数组的处理方法，比如常见的栈与队列操作 push、 pop、 shift、 unshift、求和、遍历循环 each、 排序及筛选等一系的扩展方法。

jQuery 对象栈是一个便于 Dom 的查找，提供的一系列方法，jQuery 可以是集合元素，那么我们怎么快速的找到集合中对应的目标元素呢？

jQuery 提供了`.get()`、`:index()`、 `:lt()`、`:gt()`、`:even()`及 `:odd()`这类索引值相关的选择器，他们的作用可以过滤他们前面的匹配表达式的集合元素，筛选的依据就是这个元素在原先匹配集合中的顺序。

我们来分别看一下这几个选择器的实现原理:

get方法--是通过检索匹配jQuery对象得到对应的DOM元素，如下代码实现：

```js
get: function(num) {
    return num != null ?
    // Return just the one element from the set
    (num < 0 ? this[num + this.length] : this[num]) :
    // Return all the elements in a clean array
    slice.call(this);
}
```

原理很简单，因为 jQuery 查询出来的是一个数组的 DOM 集合，所以就可以按照数组的方法通过下标的索引取值，当然如果 num 的值超出范围，比如小于元素数量的负数或等于或大于元素的数量的数，那么它将返回 undefined。 假设我们页面上有一个简单的无序列表，如下代码：

```html
<ul>
  <li id="foo">foo</li>
  <li id="bar">bar</li>
</ul>
```

如果指定了 index 参数，`.get()` 则会获取单个元素，如下代码：

```js
console.log( $( "li" ).get( 0 ) );
```

由于索引 index 是以 0 开始计数的，所以上面代码返回了第一个列表项`<li id="foo">foo</li>`。

然而，这种语法缺少某些 `.get()` 所具有的附加功能，比如可以指定索引值为负值：

```js
console.log( $( "li" ).get(-1) );
```

负的索引值表示从匹配的集合中从末尾开始倒数，所以上面这个例子将会返回列表中最后一项：`<li id="bar">bar</li>`。

由于是数组的关系，所以我们有几个快速方法，比如头跟尾的取值：

```js
first: function() {
    return this.eq( 0 );
},

last: function() {
    return this.eq(-1);
},
```

## 2.9 get与eq的区别

```js
.eq()  减少匹配元素的集合，根据 index 索引值，精确指定索引对象。
.get() 通过检索匹配 jQuery 对象得到对应的 DOM 元素。
```

同样是返回元素，那么 eq 与 get 有什么区别呢？

eq 返回的是一个 jQuery 对象，get 返回的是一个 DOM 对象。举个例子：

```js
$( "li" ).get( 0 ).css("color", "red"); //错误
$( "li" ).eq( 0 ).css("color", "red"); //正确
```

get 方法本质上是把 jQuery 对象转换成 DOM 对象，但是 css 属于 jQuery 构造器的，DOM 是不存在这个方法的，如果需要用 jQuery 的方法，我们必须这样写：

```js
var li = $( "li" ).get( 0 );
$( li ).css("color", "red"); //用$包装
```

取出 DOM 对象 li，然后用 `$` 再次包装，使之转变成 jQuery 对象，才能调用 `css` 方法，这样要分2步写太麻烦了，所以 jQuery 给我们提供了一个便捷方法 `eq()`。

`eq()`的实现原理就是在上面代码中的把 eq 方法内部转成 jQuery 对象：

```js
eq: function( i ) {
    var len = this.length,
        j = +i + ( i < 0 ? len : 0 );
    return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
}
```

上面实现代码的逻辑就是跟 get 是一样的，区别就是通过了 pushStack 产生了一个新的 jQuery 对象。

jQuery 的考虑很周到，通过 eq 方法只能产生一个新的对象，但是如果需要的是一个合集对象要怎么处理？ 因此 jQuery 便提供了一个 `slice` 方法：

语法：

```js
.slice( start [, end ] )
```

作用：

根据指定的下标范围，过滤匹配的元素集合，并生成一个新的 jQuery 对象。

因为是数组对象，意味着我们可以用silce来直接取值了，所以针对合集对象我们可以这样写代码：

```js
var arr = []
arr.push( this.slice(start[,end]) )     
this.pushStack（arr）
```

这个 `this` 指的是 jQuery 对象，因为 jQuery 对象是数组集合，所以我们可以通过原生的 silce 方法直接取到集合数，然后通过包装处理即可了。

```js
slice: function() {
    return this.pushStack( slice.apply( this, arguments ) );
},
```

## 2.10 迭代器

迭代器是一个框架的重要设计。我们经常需要提供一种方法顺序用来处理聚合对象中各个元素，而又不暴露该对象的内部，这也是设计模式中的迭代器模式(`Iterator`)。

jQuery 中的`$.each`方法就是一个典型的迭代器，通过 each 我们可以传入额外的 function，然后来对所有的 item 项进行迭代操作，如下代码：

```js
$.each([52, 97], function(index, value) {
  alert(index + ': ' + value);
});
$( "li" ).each(function( index ) {
  console.log( index + ": " + $(this).text() );
});
```

针对迭代器，这里有几个特点：

☑ 访问一个聚合对象的内容而无需暴露它的内部。

☑ 为遍历不同的集合结构提供一个统一的接口，从而支持同样的算法在不同的集合结构上进行操作。

☑ 遍历的同时更改迭代器所在的集合结构可能会导致问题。

简单的说：封装实现，然后迭代器的聚合对象不用关心迭代的过程，从而符合 SRP 原则。

抛开 jQuery 的 each 方法，我们自己实现一个有简单的迭代器功能的代码：

1、简单回调

```js
function each(obj, callback) {
    var i = 0;
    var value;
    var length = obj.length;
    for (; i < length; i++) {
        callback(obj[i]);
    }
}
var arr = ['a', 'b', 'c'];
each(arr, function(name) {
    console.log(name); 
})
```

这样就满足了迭代模式的设计原则，对于集合内部结果常常变化各异，我们不想暴露其内部结构，但又想让客户代码透明地访问其中的元素，通过回调把逻辑给解耦出来。但是这样的处理其实太简单了，我们还要考虑至少四种情况：

☑ 聚合对象，可能是对象，字符串或者数组等类型

☑ 支持参数传递

☑ 支持上下文的传递

☑ 支持循环中退出

我们简单的修改一下上面的代码：

```js
function each(obj, callback, context, arg) {
    var i = 0;
    var value;
    var length = obj.length;
    for (; i < length; i++) {
        callback.call(context || null, obj[i], arg);
    }
}
var arr = ['a', 'b', 'c'];
each(arr, function(name, arg) {
    console.log(name, arg ,this);
}, this, 'aaa')
```

当然根据回调的处理，从而判断是否要立刻中断这个循环，从而节约性能，也是很简单的，我们可以通过获取处理的返回值来处理，如下代码：

```js
function each(obj, callback, context, arg) {
    var i = 0;
    var value;
    var length = obj.length;
    for (; i < length; i++) {
        value = callback.call(context || null, obj[i], arg);
        if (value === false) {
            break;
        }
    }
}
```
可见只要通过回调函数 callback 返回的 `ture/false` 的布尔值结果就可以来判断当前是否要强制退出循环。

## 2.11 jQuery的each迭代器

jQuery 的 each 方法从使用上就要分2种情况：

```js
☑ $.each()函数
☑ $(selector).each()
```

`$.each()`函数和`$(selector).each()`是不一样的，后者是专门用来遍历一个 jQuery 对象的，是为 jQuery 内部服务的。

`$.each()` 函数可用于迭代任何集合，无论是“名/值”对象（ JavaScript 对象）或数组。在迭代数组的情况下，回调函数每次传递一个数组索引和相应的数组值作为参数。（该值也可以通过访问 this 关键字得到，但是 JavaScript 始终将 this 值作为一个 Object，即使它是一个简单的字符串或数字值。）该方法返回其第一个参数，这是迭代的对象。

jQuery 的实例方法最终也是调用的静态方法，我们在之前就解释过 jQuery 的实例与原型方法共享的设计。

其中 each 的实例方法如下：

可见内部是直接调用的静态方法：

```js
each: function(callback, args) {
    return jQuery.each(this, callback, args);
},
```


jQuery.each 静态方法：

```js
each: function(obj, callback, args) {
    var value,
        i = 0,
        length = obj.length,
        isArray = isArraylike(obj);

    if (args) {
        if (isArray) {
            for (; i < length; i++) {
                value = callback.apply(obj[i], args);

                if (value === false) {
                    break;
                }
            }
        } else {
            for (i in obj) {
                value = callback.apply(obj[i], args);

                if (value === false) {
                    break;
                }
            }
        }
    }
}
```

实现原理几乎一致，只是增加了对于参数的判断。对象用`for in`遍历，数组用 `for` 遍历。

jQuery 可以是多个合集数组 DOM，所以在处理的时候经常就针对每一个 DOM 都要单独处理，所以一般都需要调用 `this.each`方法，如下代码：

```js
dequeue: function( type ) {
        return this.each(function() {
            jQuery.dequeue( this, type );
        });
    },
```

迭代器除了单纯的遍历，在 jQuery 内部的运用最多的就是接口的抽象合并，相同功能的代码功能合并处理：

例如一：

```js
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
    class2type[ "[object " + name + "]" ] = name.toLowerCase();
});
```

例如二：

```js
jQuery.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
}, function( orig, fix ) {
    //处理的代码
});
```

可以看出上面代码方法，针对相同的功能，节约了大量的代码空间。

# 3 回调函数
## 3.1 理解回调函数
本章主要讲解回调函数在 jQuery 中的使用技巧与实现原理，概念上的东西看似简单，但是在实际运用中要做到灵活自如却也不是那么容易的事，而且对于部分开发者来说它仍然是一个谜。在阅读本文之后你能深入理解这个“回调函数”。

函数是第一类对象，这是javascript中的一个重要的概念。意味着函数可以像对象一样按照第一类管理被使用，所以在javaScript中的函数：

```js

    ☑   能“存储”在变量中

    ☑   能作为函数的实参被传递

    ☑   能在函数中被创建

    ☑   能从函数中返回    
```

**百科里面是这么解释的：**

> 回调函数就是一个通过函数指针调用的函数。如果你把函数的指针（地址）作为参数传递给另一个函数，当这个指针调用它所指向的函数时，我们就说这是回调函数。回调函数不是由该函数的实现方直接调用，而是在特定的事件或条件发生时由另外的一方调用的，用于对该事件或条件进行响应。

因此从上面可以看出来，回调本质上是一种设计原则，并且 jQuery 的设计原则遵循了这个模式。

在后端的编程语言中，传统函数以参数形式输入数据，并且使用返回语句返回值。理论上，在函数结尾处有一个 `return` 返回语句，结构上就是：一个输入和一个输出。简单的理解函数本质上就是输入和输出之间实现过程的映射。

但是，当函数的实现过程非常漫长，你是选择等待函数完成处理，还是使用回调函数进行异步处理呢？这种情况下，使用回调函数变得至关重要，例如：AJAX 请求。若是使用回调函数进行处理，代码就可以继续进行其他任务，而无需空等。实际开发中，经常在 javascript 中使用异步调用。

jQuery 中遍地都是回调的设计：

### 异步回调

**事件句柄回调**

```js
$(document).ready(callback);

$(document).on(‘click’,callback)
```

Ajax异步请求成功失败回调

```js
$.ajax({

  url: "aaron.html",

  context: document

}).done(function() { 

        //成功执行

}).fail(function() {

        //失败执行

);
```

动画执行完毕回调



```js
$('#clickme').click(function() {

    $('#book').animate({
        opacity: 0.25,
        left: '+=50',
        height: 'toggle'
    }, 5000, function() {
        // Animation complete.
    });

});
```


以上都是jQuery的回调直接运用，运用基本都是将匿名函数作为参数传递给了另一个函数或方法。而且以上都有一个特点，执行的代码都是异步的。

### 同步回调

当然回调不仅仅只是处理异步，一般同步(很耗时的任务)的场景下也经常用到回调，比如要求执行某些操作后执行回调函数。

一个同步(阻塞)中使用回调的例子，目的是在test1代码执行完成后执行回调 callback

```js
var test1 = function(callback) {

    //执行长时间操作
    callback();

}

test1(function() {

    //执行回调中的方法

});
```

所以理解回调函数最重要的2点：

1、一个回调函数作为参数传递给另一个函数是，我们仅仅传递了函数定义。我们并没有在参数中执行函数。我们并不传递像我们平时执行函数一样带有一对执行小括号()的函数

2、回调函数并不会马上被执行，它会在包含它的函数内的某个特定时间点被“回调”。



### 3.2 回调的灵活运用

我们经常会这样使用函数回调：

   **☑**  事件触发通知

   **☑**  资源加载通知

   **☑**  定时器延时

   **☑**  ajax、动画通知等等。

以上都是很单一的事件监听回调的处理方式，但是jQuery把回调函数的用法设计成一个更高的抽像，用于解耦与分离变化。

如何理解这个设计？我们看下面的例子。

**例子一：**

jQuery针对Dom的处理提供了append、prepend、before、after等方法的处理，这几个方法的特征：

1、参数的传递可以是HTML字符串、DOM元素、元素数组或者jQuery对象

2、为了优化性能针对节点的处理需要生成文档碎片

可见几个方法都是需要实现这2个特性的，那么我们应该如何处理？

**高层接口：**

```js
before: function() {
    return this.domManip(arguments, function(elem) {
        if (this.parentNode) {
            this.parentNode.insertBefore(elem, this);
        }
    });
},

after: function() {
    return this.domManip(arguments, function(elem) {
        if (this.parentNode) {
            this.parentNode.insertBefore(elem, this.nextSibling);
        }
    });
},
```

**底层实现：**

```js
domManip: function(args, callback) {
    // Flatten any nested arrays
    args = concat.apply([], args);
    // We can't cloneNode fragments that contain checked, in WebKit
    if (isFunction ||
        //多参数处理
        self.domManip(args, callback);
    }

    if (l) {
        //生成文档碎片
        fragment = jQuery.buildFragment(args, this[0].ownerDocument, false, this);
        callback.call(this[i], node, i);
    }
    return this;
}
```

我们观察下jQuery的实现，通过抽象出一个domManip方法，然后在这个方法中处理共性，合并多个参数的处理与生成文档碎片的处理，然后最终把结果通过回调函数返回给每一个调用者。

**例子二：**

在很多时候需要控制一系列的函数顺序执行。那么一般就需要一个队列函数来处理这个问题。

我们看一段代码：

```js
function Aaron(List, callback) {
    setTimeout(function() {
        var task;
        if (task = List.shift()) {
            task(); //执行函数
        }
        if (List.length > 0) { //递归分解
            arguments.callee(List)
        } else {
            callback()
        }
    }, 25)
}

//调用
Aaron([
    function() {
        alert('a')
    },
    function() {
        alert('b')
    },
    function() {
        alert('c')
    }
], function() {
    alert('callback')
})

// 分别弹出 ‘a’ , ‘b’ ,'c',’callback
```

传入一组函数参数，靠递归解析，分个执行，其实就是靠setTimeout可以把函数加入到队列末尾才执行的原理，这样的写法就有点就事论事了，聚合对象完全是一个整体，无法再次细分出来，所以我们需要一种方案，用来管理分离每一个独立的对象。

**我们换成jQuery提供的方式:**

```js
var callbacks = $.Callbacks();
callbacks.add(function() {
    alert('a');
})
callbacks.add(function() {
    alert('b');
})
callbacks.fire(); //输出结果: 'a' 'b'
```

是不是便捷很多了，代码又很清晰，所以 Callbacks 它是一个多用途的回调函数列表对象，提供了一种强大的方法来管理回调函数队列。

那么我们使用回调函数，总的来说弱化耦合，让调用者与被调用者分开，调用者不关心谁是被调用者，所有它需知道的，只是存在一个具有某种特定原型、某些限制条件的被调用函数。



## 3.3 理解观察者模式

讲解jQuery回调对象之前，我们有必要先理解其背后的设计思想 - “观察者模式”。

观察者模式 (pub/sub) 的背后，总的想法是在应用程序中增强松耦合性。并非是在其它对象的方法上的单个对象调用。一个对象作为特定任务或是另一对象的活动的观察者，并且在这个任务或活动发生时，通知观察者。观察者也被叫作订阅者（Subscriber），它指向被观察的对象，既被观察者（Publisher 或 subject)。当事件发生时，被观察者（Publisher）就会通知观察者（subscriber）。

**观察者的使用场合**

观察者的使用场合就是：当一个对象的改变需要同时改变其它对象，并且它不知道具体有多少对象需要改变的时候，就应该考虑使用观察者模式。先看官网的demo这个例子，涉及到了 add 与 fire方法，熟悉设计模式的童鞋呢，一眼就能看出，其实又是基于发布订阅（Publish/Subscribe）的观察者模式的设计。

作为 `$.Callbacks()` 的创建组件的一个演示，只使用回调函数列表，就可以实现 Pub/Sub 系统，将 $.Callbacks 作为一个队列。

**我们来模拟常规下最简单的实现：**

JS里对观察者模式的实现是通过回调来实现的，我们来先定义一个Observable对象，其内部包含了2个方法：订阅add方法与发布fire方法，如下代码：

```js
var Observable = {
  callbacks: [],
  add: function(fn) {
    this.callbacks.push(fn);
  },
  fire: function() {
    this.callbacks.forEach(function(fn) {
      fn();
    })
  }
}
```

使用add开始订阅：

```js
Observable.add(function() {
  alert(1)
})

Observable.add(function() {
  alert(2)
})
```

使用fire开始发布：

```js
Observable.fire(); // 1, 2
```

**设计的原理：**

开始构建一个存放回调的数组，如`this.callbacks= [] `添加回调时，将回调 push 进 `this.callbacks`，执行则遍历`this.callbacks`执行回调，也弹出1跟2了。当然这只是简洁的设计，便于理解，整体来说设计的思路代码都是挺简单的，那么我们从简单的设计深度挖掘下这种模式的优势。

注意：如果没有做过复杂交互设计，或者大型应用的开发者，可能一开始无法理解这模式的好处，就简单的设计而言用模式来处理问题，有点把简单的问题复杂化。我们不是为了使用模式而使用的。

**组件开发为了保证组件可以在不同的项目中都适用，其必须是对其常用功能抽象出来加以实现，绝不会包含具体的业务逻辑而某一特定的项目使用者在其业务场景中使用组件时不可避免的要加入不同场景的业务逻辑。**



## 3.4 模式的实际运用

在进行组件开发中，为了保证组件可以在不同的类似项目场景中都能适用，那么就必须是对其常用功能抽象出来加以实现。

我们来看看具体的实际用处：

假设一段ajax的请求，成功后通过done返回结果数据：

```js
$.ajax({
  url: "test.html",
  context: document.body
}).done(function(data) {
  //data数据的处理
  $('aaron1').html(data.a)
  $('aaron2').html(data.b)
  $('aaron3').html(data.c)
  //其余处理
});
```

咋一看好像都挺好，没什么问题，但是仔细观察我们会发现所有的逻辑是不是都写在done方法里面，这样确实是无可厚非的，但是问题就是逻辑太复杂了。Done里面有数据处理、html渲染、还可能有其它不同场景的业务逻辑。这样如果是换做不同的人去维护代码，增加功能就会显得很混乱而且没有扩展性。那么观察者模式能很好的解决了这个的问题。

我们优化下代码:

```js
$.ajax({
  url: "test.html",
  context: document.body
}).done(function(data) {
    pocessData()
    pocessHtml()
    pocessOther()
  }

  function pocessData() {
    //处理数据
  }

  function pocessHtml() {
    $('aaron1').html(data.a)
    $('aaron2').html(data.b)
    $('aaron3').html(data.c)
  }

  function pocessOther() {
    //处理其他逻辑
  }
```

这种方式的好处是，分离出各种的业务函数，从而降低了代码之间的耦合度，但是这样代码写法几乎就是“就事论事”的处理，达不到抽象复用。

那么我们用之前的观察者模式加工一下上面的代码：（这只是伪代码，用于理解）

```js
Observable.add(function() {
  //pocessData
})

Observable.add(function() {
  $('aaron1').html(data.a)
  $('aaron2').html(data.b)
  $('aaron3').html(data.c)
})

Observable.add(function() {
  //pocessOther
})

$.ajax({
  url: "test.html",
  context: document.body
}).done(function(data) {
  Observable.fire(data)
})
```

设计该模式背后的主要动力是促进形成松散耦合。在这种模式中，并不是一个对象调用另一个对象的方法，而是一个对象订阅另一个对象的特定活动并在状态改变后获得通知。订阅者也称为观察者，而被观察的对象称为发布者或主题。当发生了一个重要的事件时，发布者将会通知（调用）所有订阅者并且可能经常以事件对象的形式传递消息。

总的来说，观察者模式所做的工作就是在解耦，让耦合的双方都依赖于抽象，而不是依赖于具体。从而使得各自的变化都不会影响到另一边的变化。

## 3.5 jQuery回调对象

`jQuery.Callbacks`一般开发者接触的很少，虽然jQuery向开发者提供了外部接口调用，但是`$.Callbacks()`模块的开发目的是为了给内部`$.ajax()` 和 `$.Deferred()`模块提供统一的基本功能组件。它可以用来作为类似基础定义的新组件的功能。

`jQuery.Callbacks`是jquery在1.7版本之后加入的，是从1.6版中的`_Deferred`对象中抽离的，主要用来进行函数队列的`add`、`remove`、`fire`、`lock`等操作，并提供`once`、`memory`、`unique`、`stopOnFalse`四个`option`进行一些特殊的控制。

这个函数常见的应用场景是事件触发机制，也就是设计模式中的观察者模式的发布、订阅机制，目前Callbacks对象用于queue、ajax、Deferred对象中，本小节主要是一些简单的例子去理解的使用。

我们看官网提供的demo：

```js
function fn1(value) {
  console.log(value);
}

function fn2(value) {
  fn1("fn2 says: " + value);
  return false;
}
```

可以将上述两个方法作为回调函数，并添加到 $.Callbacks 列表中，并按下面的顺序调用它们:

```js
var callbacks = $.Callbacks();
callbacks.add(fn1);
// outputs: foo!
callbacks.fire("foo!");
callbacks.add(fn2);
// outputs: bar!, fn2 says: bar!
callbacks.fire("bar!")
```

这样做的结果是，当构造复杂的回调函数列表时，将会变更很简单。可以根据需要，很方便地就可以向这些回调函数中传入所需的参数。

上面的例子中，我们使用了 `$.Callbacks()` 的两个方法: `.add()` 和 `.fire()`。` .add()` 支持添加新的回调列表, 而`.fire()` 提供了一种用于处理在同一列表中的回调方法的途径。

另一种方法是`$.Callbacks` 的`.remove()`方法，用于从回调列表中删除一个特定的回调。下面是`.remove()`使用的一个例子:

```js
var callbacks = $.Callbacks();
callbacks.add( fn1 );
// outputs: foo!
callbacks.fire( "foo!" );
callbacks.add( fn2 );
// outputs: bar!, fn2 says: bar!
callbacks.fire( "bar!" );
callbacks.remove( fn2 );
// only outputs foobar, as fn2 has been removed.
callbacks.fire( "foobar" );
```

这个运用内部就是观察者模式的一种设计实现，只是相对比较复杂。我们看看jQuery的回调函数到底为哪些模块服务？

异步队列模块：

```js
Deferred: function(func) {
  var tuples = [
    // action, add listener, listener list, final state
    ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
    ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
    ["notify", "progress", jQuery.Callbacks("memory")]
  ]，………….
```

队列模块

```js
_queueHooks: function(elem, type) {
  var key = type + "queueHooks";
  return data_priv.get(elem, key) || data_priv.access(elem, key, {
    empty: jQuery.Callbacks("once memory").add(function() {
      data_priv.remove(elem, [type + "queue", key]);
    })
  });
}
```

Ajax模块

```js
ajax: function(url, options) {
  //省略代码
  deferred = jQuery.Deferred(),
  completeDeferred = jQuery.Callbacks("once memory")
    ..............
}
```

不难发现`jQuery.Callbacks`还提供“once memory”等参数用来处理：

   ☑  once: 确保这个回调列表只执行（ .fire() ）一次(像一个递延 Deferred)。

   ☑  memory: 保持以前的值，将添加到这个列表的后面的最新的值立即执行调用任何回调 (像一个递延 Deferred)。

   ☑  unique: 确保一次只能添加一个回调(所以在列表中没有重复的回调)。

   ☑  stopOnFalse: 当一个回调返回false 时中断调用。

```js
var callbacks = $.Callbacks('once');

callbacks.add(function() {
  alert('a');
})

callbacks.add(function() {
  alert('b');
})

callbacks.fire(); //输出结果: 'a' 'b'
callbacks.fire(); //未执行
```

once的作用是使callback队列只执行一次。

OK，我们大概知道这个是干嘛用的了，可以开始上正菜了，（下一节开始噢！）



## 3.6 jQuery回调模块结构

整个`$.Callbacks`的源码很少，它是一个工厂函数，使用函数调用（非new，它不是一个类）创建对象，它有一个可选参数 flags 用来设置回调函数的行为，对外的接口也就是 self 的返回。

`jQuery.Callbacks()`的API列表如下：

```
callbacks.add()        ：回调列表中添加一个回调或回调的集合。
callbacks.disable()    ：禁用回调列表中的回调。
callbacks.disabled()   ：确定回调列表是否已被禁用。 
callbacks.empty()      ：从列表中删除所有的回调。
callbacks.fire()       ：用给定的参数调用所有的回调。
callbacks.fired()      ：访问给定的上下文和参数列表中的所有回调。 
callbacks.fireWith()   ：访问给定的上下文和参数列表中的所有回调。
callbacks.has()        ：确定列表中是否提供一个回调。
callbacks.lock()       ：锁定当前状态的回调列表。
callbacks.locked()     ：确定回调列表是否已被锁定。
callbacks.remove()     ：从回调列表中的删除一个回调或回调集合。
```

源码结构：

```js
jQuery.Callbacks = function(options) {
    options = typeof options === "string" ?
        (optionsCache[options] || createOptions(options)) :
        jQuery.extend({}, options);
    //实现代码
    fire = function() {}
    self = {
        add: function() {},
        remove: function() {},
        has: function(fn) {},
        empty: function() {},
        disable: function() {},
        disabled: function() {},
        lock: function() {},
        locked: function() {},
        fireWith: function(context, args) {},
        fire: function() {},
        fired: function() {}
    };
    return self;
};
```

整个结构要分三部分：

  ☑   Options参数缓存

  ☑   内部fire触发器的设计

  ☑   外部

**参数的缓存设计**

Callbacks是可以是接受的字符串的组合传参数，可以使用空格分割，代码如下：

```js
var opts = 'unique memory';
var object = {}
jQuery.each(opts.match(/\S+/g) || [], function(_, flag) {
  object[flag] = true;
});
```

这样的操作其实是不需要重复的，所以我们可以设计一个缓存池，用来储存重复的操作：

```js
var optionsCache = {};
function createOptions(options) {
  var object = optionsCache[options] = {};
  jQuery.each(options.match(rnotwhite) || [], function(_, flag) {
    object[flag] = true;
  });
  return object;
}
```

所以我们传递参数的时候，如果参数是字符串，我们可以直接从optionsCache缓存中去查找：

```js
options = typeof options === "string" ?
        ( optionsCache[ options ] || createOptions( options ) ) :
        jQuery.extend( {}, options );
```

**接口的设计：**

通过学习了观察者模式的思路，我们知道 callback 需要在内部维护着一个 list 的队列数组，用于保存订阅的对象数据。同时也需要提供了 add、remove、fire 等订阅、发布、删除类似的接口。

那么我们代码是不是很简单是就是把订阅对象给 push 给内部 list 列表？

实现思路就是: 构建一个存放回调的数组，如`var list = []`，通过闭包使这条回调数组保持存在。添加回调时，将回调 push 进 list，执行则遍历 list 执行回调。

后面几节我们会通过简单的模拟实现去剖析设计的思路。

## 3.7 默认回调对象设计

不传入任何参数，调用`add`的时候将函数`add`到内部的list中，调用`fire`的时候顺序触发list中的回调函数：

```js
function fn1(val) {
  console.log('fn1 says:' + val);
}

function fn2(val) {
  console.log('fn2 says ' + val);
}
var cbs = $.Callbacks();
cbs.add(fn1);
cbs.fire('foo');
console.log('........')
cbs.add(fn2);
cbs.fire('bar')
```

结果就是按照顺序叠加触发，如下列表：

```js
fn1 says:foo 
………………………
fn1 says:bar 
fn2 says bar
```

这种就是最简单的处理了，可以直接模拟，代码如下：

```js
function Callbacks() {
  var list = [];
  var self;
  self = {
    add: function(fn) {
      list.push(fn)
    },
    fire: function(args) {
      list.forEach(function(fn) {
        fn(args);
      })
    }
  }
  return self;
}
```

##  3.8 once的设计

这一小节我们来讲一下once。

once的作用确保回调列表只执行（`.fire()`）一次(像一个递延 `Deferred`)，如下代码：

```js
function fn1(val){
    console.log('fn1 says ' + val);
}
var cbs = $.Callbacks('once');
cbs.add(fn1);
cbs.fire('foo');
cbs.fire('foo');
```

结果你会发现`cbs.fire('foo')`只执行了一次。

```js
fn1 says foo  //只显示一次
```

once定义是很明确的，确保这个回调列表只执行(` .fire() `)一次(像一个递延 Deferred)，所以针对这种once的处理可以有多种不同的途径实现。

1、add的时候抛弃

2、在fire的时候抛弃多个。

但是jQuery是在执行第一个fire的时候直接给清空list列表了，然后在fire的地方给判断下list是否存在，从而达到这样的处理。

```js
function Callbacks(options) {
  var list = [];
  var self;
  self = {
    add: function(fn) {
      list.push(fn)
    },
    fire: function(args) {
      if (list) {
        list.forEach(function(fn) {
          fn(args);
        })
        if (options === 'once') {
          list = undefined;
        }
      }
    }
  }
  return self;
}
```

在fire之后，判断参数是否为once，直接把list给清理掉，所以之后的所有fire都被抛弃掉了，而从达到了once的效果。

**jQuery.Callbacks的处理**

在fire中调用了 `self.disable()` 方法

```js
// 禁用回调列表中的回调。
disable: function() {
    list = stack = memory = undefined;
    return this;
},
```



## 3.9 memory的设计

memory：保持以前的值，将添加到这个列表的后面的最新的值立即执行调用任何回调 (像一个递延 Deferred)。

回调函数是从异步队列Deferred分离出来的，所以很多的接口设计都是为了契合Deferred接口，memory用的很多，这个缓存的设计这里提及一下

主要是用来实现deferred的异步收集与pipe管道风格的数据传递的，具体在Deferred有详解，这里大概了解下作用范围。

memory 这个有点不好理解，我们还是通过例子说明下，看下面的代码：

```js
var cbs = Callbacks('once');
cbs.add(fn1);
cbs.fire('foo');
cbs.fire('foo');

function fn1(val) {
  console.log('fn1 says ' + val);
}
function fn2(val) {
  console.log('fn2 says ' + val);
}
function fn3(val) {
  console.log('fn3 says ' + val);
}

var cbs = $.Callbacks('memory');
cbs.add(fn1);
cbs.fire('foo');

console.log('..........')

cbs.add(fn2);
cbs.fire('bar');

console.log('..........')
cbs.add(fn3);
cbs.fire('aaron');
```

结果可以看出，我们在执行`cbs.add(fn2);`的时候，此时除了把 fn2 添加到了回调队列之外而且还立刻执行了这个方法，唯一的区别就是，参数是用的之前的。所以解释就叫“**保持以前的值**”。

```js
fn1 says foo 
.......... 
fn2 says foo 
fn1 says bar 
fn2 says bar 
.......... 
fn3 says bar 
fn1 says aaron 
fn2 says aaron 
fn3 says aaron
```

所以这个`memory`设计需要解决的问题就是：

1：如何取到上一个参数

2：add后如何执行

看看我们实现的代码：

```js
function Callbacks(options) {
  var list = [];
  var self;
  var firingStart;
  var memory;

  function _fire(data) {
    memory = options === 'memory' && data;
    firingIndex = firingStart || 0;
    firingStart = 0;
    firingLength = list.length;
    for (; list && firingIndex < firingLength; firingIndex++) {
      list[firingIndex](data)
    }
  }

  self = {
    add: function(fn) {
      var start = list.length;
      list.push(fn)
      if (memory) {
        firingStart = start; //获取最后一值
        _fire(memory);
      }
    },
    fire: function(args) {
      if (list) {
        _fire(args)
      }
    }
  }
  return self;
}
```

首先`add`之后要能触发`fire`的动作，所以我们把`fire`作为内部的一个私有方法实现`_fire`，比较合逻辑，这样外部的fire只是一个门面方法的调用。

私有变量`memory`缓存着上一个参数的属性，我们靠`firingStart`用来定位最后通过`add`增加的回调数据的索引。在遍历的时候直接通过`firingStart`的起始索引定位，然后传递`memory`的参数，而且实现这种“保持以前的值”的设计。



## 3.10 unique的设计

Unique：确保一次只能添加一个回调(所以在列表中没有重复的回调)

```js
function fn1(val) {
  console.log('fn1 says ' + val);
}
var callbacks = $.Callbacks( "unique" );
callbacks.add( fn1 );
callbacks.add( fn1 ); // repeat addition
callbacks.add( fn1 );
callbacks.fire( "foo" );
```

结果：过滤了相同的`add`操作

```
fn1 says foo 
```

过滤重复的比较简单，因为是数组的保存方式，我们可以在入口处通过`indexOf`判断即可

```js
function Callbacks(options) {
  var list = [];
  var self;
  var firingStart;
  var memory;

  function _fire(data) {
    memory = options === 'memory' && data;
    firingIndex = firingStart || 0;
    firingStart = 0;
    firingLength = list.length;
    for (; list && firingIndex < firingLength; firingIndex++) {
      list[firingIndex](data)
    }
  }

  self = {
    add: function(fn) {
      var start = list.length;
      if (options == 'unique') {
        if (-1 === list.indexOf(fn)) {
          list.push(fn)
        }
      } else {
        list.push(fn)
      }
      if (memory) {
        firingStart = start; //获取最后一值
        _fire(memory);
      }
    },
    fire: function(args) {
      if (list) {
        _fire(args)
      }
    }
  }
  return self;
}
```



## 3.11 stopOnFalse

stopOnFalse: 当一个回调返回false 时中断调用

```js
function fn1(value) {
  console.log(value);
  return false;
}

function fn2(value) {
  fn1("fn2 says: " + value);
  return false;
}

var callbacks = $.Callbacks("stopOnFalse");
callbacks.add(fn1);
callbacks.fire("foo");

callbacks.add(fn2);
callbacks.fire("bar");
```

结果虽然fn1被添加到了回调列表，但是因为 fn1 返回了 false，那么意思之后的回调都不会被调用了。如果还有fn3，在f2上返回 false，fn3也将不会被调用。

```
foo
bar
```

 

这个设计我们只要控制好函数返回的处理的布尔值，通过这个值用来判断是否需要下一个遍历

```js
if (list[firingIndex](data) === false && options === 'stopOnFalse') {
  break;
}
```

源码可以如下：

```js
function Callbacks(options) {
  var list = [];
  var self;
  var firingStart;
  var memory;

  function _fire(data) {
    memory = options === 'memory' && data;
    firingIndex =
      firingStart || 0;
    firingStart = 0;
    firingLength = list.length;
    for (; list && firingIndex < firingLength; firingIndex++) {
      if (list[firingIndex](data) === false && options === 'stopOnFalse') {
        break;
      }
    }
  }

  self = {
    add: function(fn) {
      var start = list.length;
      if (options == 'unique') {
        if (-1 === list.indexOf(fn)) {
          list.push(fn)
        }
      } else {
        list.push(fn)
      }
      if (memory) {
        firingStart = start; //获取最后一值
        _fire(memory);
      }
    },
    fire: function(args) {
      if (list) {
        _fire(args)
      }
    }
  }
  return self;
}
```

以上是几种单独的处理情况的用法，我们可以看到 jQuery 都是组合使用的，最常见的就是

`jQuery.Callbacks("once memory")`的组合了，其实以上的思路都讲解过了，无非就是组合起来的时候要考虑一些判断了。



# 4 数据缓存

## 4.1 内存泄露

**什么是内存泄露？**

内存泄露是指一块被分配的内存既不能使用，又不能回收，直到浏览器进程结束。在C++中，因为是手动管理内存，内存泄露是经常出现的事情。而现在流行的 C# 和 Java 等语言采用了自动垃圾回收方法管理内存，正常使用的情况下几乎不会发生内存泄露。浏览器中也是采用自动垃圾回收方法管理内存，但由于浏览器垃圾回收方法有bug，会产生内存泄露。

**常见内存泄露的几种情况**

```
1.循环引用
2.Javascript闭包
3.DOM插入
```

一个 DOM 对象被一个 Javascript 对象引用，与此同时又引用同一个或其它的 Javascript 对象，这个 DOM 对象可能会引发内存泄漏。这个 DOM 对象的引用将不会在脚本停止的时候被垃圾回收器回收。要想破坏循环引用，引用 DOM 元素的对象或 DOM 对象的引用需要被赋值为 `null`。

其实绝大部分内存泄漏都不是由 Javascript 引起的，浏览器的回收机制已经做的相当好了，多数的泄漏都是由于与 DOM 交互而产生的。

**含有 DOM 对象的循环引用将导致大部分当前主流浏览器内存泄露**

第一种：多个对象循环引用

```js
var a=new Object;
var b=new Object;

a.r=b;
b.r=a;
```

第二种：循环引用自己

```js
var a=new Object;
a.r=a;
```

循环引用很常见且大部分情况下是无害的，但当参与循环引用的对象中有 DOM 对象或者 ActiveX 对象时，循环引用将导致内存泄露。

我们把例子中的任何一个 `new Object` 替换成`document.getElementById`或者`document.createElement`就会发生内存泄露了。

**所以这里的总结：**

  ☑  JS的内存泄露，无怪乎就是从 DOM 中 remove 了元素，但是依然有变量或者对象引用了该 DOM 对象。然后内存中无法删除。使得浏览器的内存占用居高不下。这种内存占用，随着浏览器的刷新，会自动释放。

  ☑  而另外一种情况，就是循环引用，一个 DOM 对象和 JS 对象之间互相引用，这样造成的情况更严重一些，即使刷新，内存也不会减少。这就是严格意义上说的内存泄露了。

所以在平时实际应用中, 我们经常需要给元素缓存一些数据，并且这些数据往往和 DOM 元素紧密相关。由于 DOM 元素(节点)也是对象, 所以我们可以直接扩展 DOM 元素的属性，但是如果给 DOM 元素添加自定义的属性和过多的数据可能会引起内存泄漏，所以应该要尽量避免这样做。 因此更好的解决方法是使用一种低耦合的方式让 DOM 和缓存数据能够联系起来。

所以我们必须有一种机制，避免引用数据直接依附在 DOM 对象上，这样尽量避免内存泄漏的产生。jQuery 的缓存系统就很好的解决了这一问题。



## 4.2 jQuery的缓存系统

jQuery 从 1.2.3 版本引入数据缓存系统，主要的原因就是早期的事件系统 Dean Edwards 的 addEvent.js代码带来的问题：

```
1.没有一个系统的缓存机制，它把事件的回调都放到 EventTarget 之上，这会引发循环引用
2.如果 EventTarget 是 window 对象，又会引发全局污染不同模块之间用不同缓存变量
```

一般 jQuery 开发，我们都喜欢便捷式的把很多属性，比如状态标志都写到 dom 节点中,也就是 HTMLElement。

**好处 : **

```
直观，便捷。
```

**坏处 ：**

```
1.循环引用
2.直接暴露数据，安全性？
3.增加一堆的自定义属性标签，对浏览器来说是没意义的
4.取数据的时候要对 HTML 节点做操作
```

jQuery 缓存系统的真正魅力在于其内部应用中，动画、事件等都有用到这个缓存系统。试想如果动画的队列都存储到各 DOM 元素的自定义属性中，这样虽然可以方便的访问队列数据，但也同时带来了隐患。如果给 DOM 元素添加自定义的属性和过多的数据可能会引起内存泄漏，所以要尽量避免这么干。

```
A.允许我们在 DOM 元素上附加任意类型的数据,避免了循环引用的内存泄漏风险
B.用于存储跟 dom 节点相关的数据，包括事件，动画等
C.一种低耦合的方式让 DOM 和缓存数据能够联系起来
```

对于 jQuery 来说，数据缓存系统本来就是为事件系统服务而分化出来的，到后来，它的事件克隆乃至后来的动画列队实现数据的存储都是离不开缓存系统，所以数据缓存也算是 jQuery 的一个核心基础了。

jQuery 的数据缓存接口：

```
jQuery.data( element, key, value )
.data( )
```

对于`jQuery.data`方法，原文如下：

```
The jQuery.data() method allows us to attach data of any type to DOM elements in a way that is safe from circular references and therefore from memory leaks. We can set several distinct values for a single element and retrieve them later:
```

在 jQuery 的官方文档中，提示用户这`jQuery.data()`是一个低级的方法，应该用`.data()`方法来代替。`$.data( element, key, value )`可以对 DOM 元素附加任何类型的数据，但应避免循环引用而导致的内存泄漏问题。

二者都是用来在元素上存放数据也就平时所说的数据缓存,都返回 jQuery 对象，但是内部的处理确有本质的区别。

通过代码对比，参考下边代码：

```html
<!DOCTYPE html>
<html>
<head>
  <style>
div { margin:5px; background:yellow; }
button { margin:5px; font-size:14px; }
p { margin:5px; color:blue; }
span { color:red; }
  </style>
  <script src="http://code.jquery.com/jquery-latest.js"></script>
</head>
<body>
  <div>A div</div>
<button>Get "blah" from the div</button>
<button>Set "blah" to "hello"</button>
 
<button>Set "blah" to 86</button>
<button>Remove "blah" from the div</button>
<p>The "blah" value of this div is <span>?</span></p>
<script>
$("button").click(function(e) {
  var value, div = $("div")[0];
 
  switch ($("button").index(this)) {
    case 0 :
      value = jQuery.data(div, "blah");
      break;
    case 1 :
      jQuery.data(div, "blah", "hello");
      value = "Stored!";
      break;
    case 2 :
      jQuery.data(div, "blah", 86);
      value = "Stored!";
      break;
    case 3 :
      jQuery.removeData(div, "blah");
      value = "Removed!";
      break;
  }
 
  $("span").text("" + value);
});
 
</script>
 
</body>
</html>
```



## 4.3 静态与实例方法的区别

`jQuery.data(ele)` 与 `$(ele).data()`

这两个函数都是用来在元素上存放数据，也就平时所说的数据缓存,都返回 jQuery 对象，初学时很容易让人混淆，尤其是给 dom 元素添加缓存数据时。

简单的来说：

```
1.jQuery.data()可以实现为dom元素或js对象添加缓存
2.$("ele").data()实是对前者的扩展，其目的是可以方便的通过选择器为多个dom元素添加缓存数据
```

虽然大体的意思一样，但是2个接口在处理上却有差别，也是我们容易忽视的

我们看下边的代码块

```html
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script src="http://code.jquery.com/jquery-latest.js"></script>
<title></title>
</head>
<body>

<div id="aaron">缓存接口测试</div></br>

<script type="text/javascript">

var ele1 = $("#aaron");
var ele2 = $("#aaron");

ele1.data('a',1111);
ele2.data('a',2222);

show('第一组,通过$().data()的方式,只取到最后一个a值,之前的被覆盖')
show(ele1.data('a'))
show(ele2.data('a'))

show()
//=======第二组=========
show('第二组,通过$.data的方式,取到2组b值，未覆盖')
$.data(ele1,"b","1111")
$.data(ele2,"b","2222")

show($.data(ele1,"b"))
show($.data(ele2,"b") )

function show(data) {
    if (arguments.length == 2) {
		var info = arguments[0]
		var data = arguments[1];
		for (var key in data) {
			$("body").append('<li>' + info +'key->' + key + '; value->' + data[key] + '</li>')
		}
		return
	}

	if (!data) {
		return $("body").append('</br>')
	}
	if (typeof data === 'object') {
		for (var key in data) {
			$("body").append('<li>key->' + key + '; value->' + data[key] + '</li>')
		}
	} else {
		$("body").append('<li>' + data + '</li>')
	}
}
</script>
</body>
</html>
```



```
为什么通过.$("ele").data()原型方法会覆盖前面key相同的值呢？
```

留着这个疑问，我们在之后的源码会分析。

## 4.4 jQuery缓存的设计思路

jQuery 缓存设计接口对数据的处理有如下几种：

```
用name和value为对象附加数据
一个对象为对象附加数据
为 DOM Element 附加数据
```

设计的思路：（请参考下边代码）

```html

<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script src="http://code.jquery.com/jquery-latest.js"></script>
<script src="http://img.mukewang.com/down/541f6ff70001a0a500000000.js" type="text/javascript"></script>
<title></title>
</head>
<body>

<div>缓存支持的参数</div>
<script type="text/javascript">
//1
var obj = {};
$.data(obj, 'name', 'aaron');
show($.data(obj, 'name')) 

//2
var obj = {};
$.data(obj, {
  name1: 'aaron1'
});
show($.data(obj))

//3
var $body = $("body")
$body.data("foo", 52);
show($body.data('foo'))

</script>
</body>
</html>
```



常规的数据缓存，我们都大多为了方便直接就绑定到了dom对应的元素上了，最为常见的就是事件对象的回调函数了，还有一些DOM的属性。当然这也不是不可以，jQuery早期就是这么干的，但是容易引发循环引用，也会带来一定的全局污染的问题。那么jQuery在之后的改进就独立出了一个”数据缓存“的模块。

其核心的关键就是：

```
数据存放在内存中，通过一个映射关系与直接的DOM元素发生关联
```

数据缓存，jQuery现在支持两种：

```
1. dom元素，数据存储在jQuery.cache中。
2. 普通js对象，数据存储在该对象中。
```

首先要在内存中开辟一个区域，用来保存数据，jQuery 用 cache 对象`{}`,那么所有的数据就无法针对cache进行CURD操作了。

1:如果是DOM元素，通过分配一个唯一的关联id把DOM元素和该DOM元素的数据缓存对象关联起来，关联id被附加到以`jQuery.expando`的值命名的属性上，数据存储在全局缓存对象 jQuery.cache 中。在读取、设置、移除数据时，将通过关联 id 从全局缓存对象 jQuery.cache 中找到关联的数据缓存对象，然后在数据缓存对象上执行读取、设置、移除操作。

2:如果是 Javascript 对象，数据则直接存储在该 Javascript 对象的属性 jQuery.expando 上。在读取、设置、移除数据时，实际上是对 Javascript 对象的数据缓存对象执行读取、设置、移除操作。

3:为了避免 jQuery 内部使用的数据和用户自定义的数据发生冲突，数据缓存模块把内部数据存储在数据缓存对象上，把自定义数据存储在数据缓存对象的属性 data 上。

所以 jQuery 在数据缓存的处理抽出一个 Data 类出来，通过2组不同的实例，分别处理不同的处理类型：

```js
var data_priv = new Data();
var data_user = new Data();
```

一个是给 jQuery 内部使用，比如数据对象，queue，Deferred，事件，动画缓存

另一个对象 data_user 是提供给开发者使用的，比如 $.attr(),$.data等等.



## 4.5 Data类的设计

我们看看Data类是如何构建这个缓存池的：

（1）先在jQuery内部创建一个cache对象{}, 来保存缓存数据。 然后往需要进行缓存的DOM节点上扩展一个值为expando的属性

```js
function Data() {
    Object.defineProperty(this.cache = {}, 0, {
        get: function() {
            return {};
        }
    });
    this.expando = jQuery.expando + Math.random();
}
```

注：expando的值，用于把当前数据缓存的UUID值做一个节点的属性给写入到指定的元素上形成关联桥梁,所以，所以元素本身具有这种属性的可能性很少，所以可以忽略冲突。

（2）接着把每个节点的dom[expando]的值都设为一个自增的变量id，保持全局唯一性。 这个id的值就作为cache的key用来关联DOM节点和数据。也就是说cache[id]就取到了这个节点上的所有缓存，即id就好比是打开一个房间(DOM节点)的钥匙。 而每个元素的所有缓存都被放到了一个map映射里面，这样可以同时缓存多个数据。

```js
Data.uid = 1;
```

关联起dom对象与数据缓存对象的一个索引标记，换句话说，先在dom元素上找到expando对应值，也就uid，然后通过这个uid找到数据cache对象中的内。

（3）所以cache对象结构应该像下面这样：

```js
var cache = {
  "uid1": { // DOM节点1缓存数据，
    "name1": value1,
    "name2": value2
  },
  "uid2": { // DOM节点2缓存数据，
    "name1": value1,
    "name2": value2
  }
  // ......
};
```

每个uid对应一个elem缓存数据，每个缓存对象是可以由多个name value(名值对)对组成的，而value是可以是任何数据类型的。 

如图如示：

![595BBEE3-3675-49CB-A05A-8D0750CC0D35](http://cdn.mengqingshen.com/2017-04-08-595BBEE3-3675-49CB-A05A-8D0750CC0D35.png)

 

**流程分解：（复杂的过滤，找重的过程去掉）**

第一步：jQuery本身就是包装后的数组结构，这个不需要解析了

第二步：通过data存储数据

```
为了不把数据与dom直接关联，所以会把数据存储到一个cache对象上
产生一个 unlock = Data.uid++; unlock 标记号
把unlock标记号，作为一个属性值赋予$body节点
cache缓存对象中开辟一个新的空间用于存储foo数据，this.cache[ unlock ] = {};
最后把foo数据挂到cache上,cache[ data ] = value;
```

第三步：通过data获取数据

```
从$body节点中获取到unlock标记
通过unlock在cache中取到对应的数据
```

流程图：

![A1F993B9-1E96-46A3-9510-1BDF810981AB](http://cdn.mengqingshen.com/2017-04-08-A1F993B9-1E96-46A3-9510-1BDF810981AB.png)



## 4.6 实例方法的设计

前面的第三小节留下了一个疑问：`jQuery.data()` 与 `.data()`为什么会有区别？

jQuery的方法设计大都是多用的，可以根据传递参数的个数判断是set还是get处理，不仅如此jQuery还对参数的传递类型还抽出了一个处理的方法`jQuery.access`，我们可以传递字符串、数组、对象等等，根据这种类型自动分解成接口所有能接受的参数。

省略了部分，比如数据的过滤，HMLT5 data的处理之类，保留直接的处理，如下代码：

```js
jQuery.fn.extend({
    data: function(key, value) {
      return access(this, function(value) {
        // 通过access解析出参数 value的值
      }, null, value, arguments.length > 1, null, true)
    })
}
```

通过access解析后的参数就能让data_user接口所接收，此时我们可以调用数据对象接口开始对数据进行存储设置了。

```js
this.each(function() {
   var data = data_user.get( this, camelKey );
   data_user.set( this, camelKey, value );
});
```

因为 jQuery 可以是一个元素合集，所以内部需要通过 each 对每一个合集都遍历处理，

对数据的存储内部就是调用的 `data_user.get` 缓存类的接口。

```js
get: function(owner, key) {
  var cache = this.cache[this.key(owner)];
  return key === undefined ?
    cache : cache[key];
}
```

通过 get 方法通过 key 去 cache 中取得之前的值，如果没有则新开辟一个空间用来存储之后的新值，

通过`data_user.set`去设置这个新的值：

```js
set: function(owner, data, value) {
  var prop,
    unlock = this.key(owner),
    cache = this.cache[unlock];
  cache[data] = value;
  return cache;
}
```

取出cache中对应的存储空间，然后可见

```js
cache[ data ] = value;
```

数据直接就是通过对象的键值对的方式存储在内存中的。

当我们重复同一个key的时候，其实是反复操作同一个cache缓存区下的同一个key

所以当下面：

```js
cache[‘bar’] = {
     myType: "慕课网一",
});

cache[‘bar’] = {
     myType: "慕课网二",
});
```

这种情况下，肯定是被覆盖掉了。所以也就为什么通过实例的接口会覆盖数据了。



## 4.7 静态接口设计

通过源码可见，静态方法是直接操作数据类的 `data_user.access` 方法

```js
jQuery.extend({
    data: function(elem, name, data) {
      return data_user.access(elem, name, data)
    }
}
```

静态方法 data 的实现不像 attr 操作直接把数据作为属性捆绑到元素节点上，如果为 DOM Element 附加数据；DOM Element 也是一种 Object ，但 IE6、IE7 对直接附加在 DOM Element 上的对象的垃圾回收存在问题；因此我们将这些数据存放在全局缓存（我们称之为“globalCache”）中，即 “globalCache” 包含了多个 DOM Element 的 “cache”，并在 DOM Element 上添加一个属性，存放 “cache” 对应的 uid。

**最后可见：**

1：`jQuery.data(element,[key],[value])`，每一个element都会有自己的一个{key:value}对象保存着数据，所以新建的对象就算有key相同它也不会覆盖原来存在的对象key所对应的value，因为新对象保存是是在另一个{key:value}对象中

2：`$("div").data("a","aaaa")` 它是把数据绑定每一个匹配div节点的元素上

源码可以看出来，说到底，数据缓存就是在目标对象与缓存体间建立一对一的关系，整个Data类其实都是围绕着 `thia.cache` 内部的数据做增删改查的操作。



# 5 异步机制

## 5.1 理解异步

JavaScript 编程几乎总是伴随着异步操作，传统的异步操作会在操作完成之后，使用回调函数传回结果，而回调函数中则包含了后续的工作。这也是造成异步编程困难的主要原因：

**我们一直习惯于“线性”地编写代码逻辑，但是大量异步操作所带来的回调函数，会把我们的算法分解地支离破碎。**

此时我们不能用`if`来实现逻辑分支，也不能用`while/for/do`来实现循环，更不用说异步操作之间的组合、错误处理以及取消操作了。因此也就诞生了如`jQuery Deferred`这样的辅助类库。

我们常见的异步操作：

```
定时器setTimeout
postmessage
WebWorkor
CSS3 动画
XMLHttpRequest
HTML5的本地数据
等等…
```

JavaScript 要求在与服务器进行交互时要用异步通信，如同 AJAX 一样。因为是异步模型，所以在调用流览器提供的本地数据接口时候类似 AJAX （这里我是假设），浏览器自己有内部的 XHR 方法异步处理，但是此时的 JS 代码还是会同步往下执行，其实就是无阻塞的代码。

**问题：**因为无阻塞，代码在发送AJAX这个请求后会继续执行，那么后续的操作如果依赖这个数据的就会出错了，所以这里就需要等待AJAX返回，才能执行后续操作。

因为异步而导致流程不正确，或者说我们的应用在某个程度上依赖第三方API的数据，那么就会面临一个共同的问题：

```
我们无法获悉一个API响应的延迟时间，应用程序的其他部分可能会被阻塞，直到它返回结果。Deferreds 的引入对这个问题提供了一个更好的解决方案，它是非阻塞的，并且与代码完全解耦。
```

当然异步操作也可以提供一个类似于成功回调，失败回调的通知接口。

JS是单线程语言，就简单性而言，把每一件事情（包括GUI事件和渲染）都放在一个线程里来处理是一个很好的程序模型，因为这样就无需再考虑线程同步这些复杂问题。

另一方面，他也暴露了应用开发中的一个严重问题，单线程环境看起来对用户请求响应迅速，但是当线程忙于处理其它事情时，就不能对用户的鼠标点击和键盘操作做出响应。



## 5.2 Deferred是什么?

前端项目的开发，不仅仅涉及到同步的概念，而且还会经常穿插各种异步的处理。一些大的操作，比如远程获取数据，操作一个大数据处理，这时候是不能马上获取到数据的。假设我们发送一个 AJAX 请求到接受到数据需要10秒钟，那么从发送到接受数据这个时间段中，前端的处理时间其实是空闲，但是对于开发者来说这种时间是不能浪费了，所以我们可以在10秒钟做很多同步的处理，同时等待异步的数据返回。所以我们需要监听这个回调的数据在成功的时候能够获取到，或者设计一个返回后触发处理的机制，当然原生的JavaScript对这个机制几乎是没有的。为了优化这个形成统一的异步处理方案，jQuery就开始设计了一个Deferred异步模型。

```
Deferred 提供了一个抽象的非阻塞的解决方案（如异步请求的响应），它创建一个promise对象，其目的是在未来某个时间点返回一个响应。简单来说就是一个异步/同步回调函数的处理方案。
```

$.Deferred 在 jQuery 代码内部有四个模块被使用，分别是“**promise方法”、“DOM ready”、“Ajax模块”及“动画模块**”。

看看 jQuery 中的最常用的 AJAX 处理：

**一：****Ajax改造**

传统的 jQuery 的 AJAX 操作的传统写法(1.5版之前)：

```js
$.ajax({
  url: "aaron.html",
  success: function(){
     alert("成功！");
  },
  error:function(){
    alert("失败！");
  }
})
```

$.ajax()接受一个对象参数，这个对象包含两个方法：success方法指定操作成功后的回调函数，error方法指定操作失败后的回调函数。

在1.5版本后通过新的Deferred引入就改成了：

```js
$.ajax("aaron.html")
.done(function(){ alert("成功"); })
.fail(function(){ alert("出错"); });
```

把传参的回调，换成了链式的写法，这样可读性更高了。在jquery 1.5版后，通过$.ajax返回的不是XHR对象了，而是经过包装的Deferred对象，所以就具有promise的一些规范。当然这种写法到底是怎么做的，我们在后续的教程中会详细的讲解到。

**二：提供一种方法来执行一个或多个对象的回调函数**

在实际开发中，我们可能要发送多个异步的请求操作，我们需要等所有的异步都处理完毕后，才能继续下一个动作。如右边代码所示。

所以我们这里要涉及一个等待的处理。我们自己要做一个计时器，每一个任务执行完毕后，都要触发一次任务的检测。当最后一个调用完毕了，我们就可以执行后面的动作，当前这里的写法也会有些问题，比如错误的时候没有处理。同样的功能，我们换成Deferred就会很简单了。

```js
$.when($.ajax("a1.html"), $.ajax("a2.html"))
　　.done(function(){ alert('2次回调都正确返回了') })
　　.fail(function(){ alert('出错了'); });
```

这段代码的意思是：先执行两个操作$.ajax("a1.html")和$.ajax("a2.html")，如果都成功了，就运行done()指定的回调函数；如果有一个失败或都失败了，就执行fail()指定的回调函数。

**三：可以混入任意的对象接口中**

jQuery的Deferred最好用的地方，就是模块化程度非常高，可以任意配合使用。

```js
function task(name) {
  var dtd = $.Deferred();
  setTimeout(function() {
    dtd.resolve(name)
  }, 1000)
  return dtd;
}
$.when(task('任务一'), task('任务二')).done(function() {
  alert('成功')
})
```

把需要处理的异步操作，用Deferred对象给包装一下，然后通过when方法收集异步的操作，最后再返回出done的成功，这样的处理太赞了！

所以说，Deferred的引入，为处理事件回调提供了更加强大并且更灵活的编程模型。



## 5.3 认识$.Deferred的接口

大多情况下，promise 作为一个模型，提供了一个在软件工程中描述延时（或将来）概念的解决方案。它背后的思想我们已经介绍过：

```
不是执行一个方法，然后阻塞应用程序等待结果返回，而是返回一个promise对象来满足未来值。
```

这样看来，Promise/A只是一种规范，Deferred可以看作这种规范的具体实现，旨在提供通用的接口，用来简化异步编程难度，说白了就是:

```
一个可链式操作的对象，提供多个回调函数的注册，以及回调列队的回调，并转达任何异步操作成功或失败的消息。
```

jQuery.Deferred()背后的设计理念来自 [CommonJS Promises/A](http://wiki.commonjs.org/wiki/Promises/A) , jQuery.Deferred()基于这个理念实现，但并没有完全遵循其设计， 它代表了一种可能会长时间运行而且不一定必须完整的操作的结果，简单的描述下规范中定义的“Promise”。

promise模式在任何时刻都处于以下三种状态之一：

```
未完成（unfulfilled）
已完成（resolved）
拒绝（rejected）
```

CommonJS Promise/A 标准这样定义的，promise对象上的then方法负责添加针对已完成和拒绝状态下的处理函数。then方法会返回另一个promise对象，这样可以形成“管道”风格。

看看jQuery的Deferred源码中对动作接口的定义：

```
[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
[ "notify", "progress", jQuery.Callbacks("memory") ]
```

Deferred中定义的动作是非常多的，抽象的看其实可以类似一种观察者模式的实现。

观察者模式中的订阅方法：

```
  Done (操作完成)
  Fail (操作失败)
  Progress (操作进行中
```

观察中模式中的发布方法：

```
  resolve（解决）
  reject（拒绝）
  notify（通知）
```

而且还提供了可以定义运行时的this对象的fire，fireWith，所以扩展了3个可以定义上下文的的接口：

```
  resolveWith
  rejectWith
  notifyWith
```

所以按照这样的规范，我们的使用就应该是这样：见右边代码。



```js
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script src="http://code.jquery.com/jquery-latest.js"></script>
<title></title>
</head>
<body>
<button id="aaron1">例一:基本用法</button>
<button id="aaron2">例二:过滤器</button>
<button id="aaron3">例三:promise方法</button>
<script type="text/javascript">

//例一
$("#aaron1").on("click", function() {
  // 构建一个deferred对象
  var dtd = $.Deferred();
  // 给deferred注册一个成功后的回调通知
  dtd.done(function() {
    show('成功')
  })
  // 开始执行一段代码
  setTimeout(function() {
    dtd.resolve(); // 改变deferred对象的执行状态
  }, 2000);
})


//例二：过滤器
var filterResolve = function() {
  var defer = $.Deferred(),
    filtered = defer.then(function(value) {
      return value * 2;
    });
  defer.resolve(5);
  filtered.done(function(value) {
    show("Value is ( 2*5 = ) 10: " + value);
  });
};
$("#aaron2").on("click", filterResolve)


//例三：实现promise方法
$("#aaron3").on("click", function() {
  var obj = {
    hello: function(name) {
      show("你好 " + name);
    }
  },
    defer = $.Deferred();
  // 设置一个promise
  defer.promise(obj);
  //解决一个deferred
  defer.resolve("慕课网");
  obj.done(function(name) {
    obj.hello(name);
  }).hello("Aaron");
})


function show(data) {
  $("body").append('<li>' + data + '</li>')
}

</script>

</body>
</html>
```



## 5.4 $.Deferred的设计 

由于1.7版本后$.Callbacks从Deferred中抽离出去了，目前版本的Deferred.js代码不过150行，而真正$.Deferred的实现只有100行左右，实现的逻辑是相当犀利的。

因为Callback被剥离出去后，整个Deferred就显得非常的精简，代码直接通过extend扩展到静态接口上，对于extend的继承这个东东，在之前就提及过jQuery如何处理内部jQuery与init相互引用this的问题，所以当jQuery.extend只有一个参数的时候，其实就是对jQuery静态方法的一个扩展。

```js
jQuery.extend({
   Deferred:function(func){
        ...省略代码....
        return deferred
   },
   when:function(func){
      ...省略代码....
      return deferred.promise();
   }
})
```

我们来具体看看2个静态方法内部都干了些什么?

Deferred整体结构：右边代码所示。

Deferred就是一个简单的工厂方法，有两种方式使用：

```js
var a = $.Deferred（）
$.Deferred(function(){})
```

内部其实是严重依赖$.Callbacks对象，Callbacks就是用来储存deferred依赖的数据的。

因为done、fail、progress就是jQuery.Callbacks("once memory")所有对应的处理：

```js
var list = jQuery.Callbacks("once memory")
promise['done'] = list.add;
```

deferred定义了一系列的接口，堪称一绝，100多行的代码，精练的有些过分。

Deferred方法内部建议了2个对象，一个是deferred外部接口对象，一个是内部promise对象。

promise对象解释是一个受限的对象, 这就是所谓的受限制的deferred对象，因为相比之前， 返回的deferred不再拥有resolve(With), reject(With), notify(With)这些能改变deferred对象状态并且执行callbacklist的方法了,只能是then、done、fali等方法。

其内部通过tuples数组，存储了所有的接口API，通过遍历把所有的接口一次都挂到内部promise与deferred对象上。

其中定义了done、fail以及progress这几个方法，其实就是Callbacks回调函数中的add方法，用与push外部的的数据，保存在队列上。

我们通过resolve、reject以及notify其实也就是处理Callbacks中的队列列表。

```js
// jQuery. Deferred主要处理：
//     显而易见Deferred是个工厂类，返回的是内部构建的deferred对象
//     tuples 创建三个$.Callbacks对象，分别表示成功，失败，处理中三种状态
//     创建了一个promise对象，具有state、always、then、primise方法
//     扩展primise对象生成最终的Deferred对象，返回该对象
//     primise对象就是一个受限对象，只读
var Deferred = function(func) {
  var tuples = [
    //1 动作
    //2 侦听器
    //3 最终状态
    //后面的操作将是围绕这些接口处理
    ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
    ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
    ["notify", "progress", jQuery.Callbacks("memory")]
  ],
  state = "pending",
  //扩展的primise对象
  promise = {
    state: function() {},
    always: function() {},
    then: function( /* fnDone, fnFail, fnProgress */ ) {},
    promise: function(obj) {}
  },
  deferred = {};
  //定义管道风格的接口pipe
  promise.pipe = promise.then;
  //逐个添加所有的接口到deferred对象上
  jQuery.each(tuples, function(i, tuple) {
    deferred[tuple[0]] = function() {
      deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
      return this;
    };
    deferred[tuple[0] + "With"] = list.fireWith;
  });
  //转成成promise对象
  promise.promise(deferred);
  //如果传递的参数是函数，直接运行
  if (func) {
    func.call(deferred, deferred);
  }
  return deferred;
}

//when就是一个合集的处理
//可以收集多个异步操作，合并成功后处理
//同时也可以绑定Promise 对象的其它方法，如 defered.then
//所以when内部必须要创建一个deferred对象
var when = function(subordinate /* , ..., subordinateN */ ) {
  var i = 0,
    resolveValues = slice.call(arguments),
    length = resolveValues.length,
    deferred = remaining === 1 ? subordinate : jQuery.Deferred(),
    updateFunc = function(i, contexts, values) {
      return function(value) {};
    },
    progressValues, progressContexts, resolveContexts;
  if (length > 1) {
    progressValues = new Array(length);
    progressContexts = new Array(length);
    resolveContexts = new Array(length);
    for (; i < length; i++) {
      if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
        resolveValues[i].promise()
          .done(updateFunc(i, resolveContexts, resolveValues))
          .fail(deferred.reject)
          .progress(updateFunc(i, progressContexts, progressValues));
      } else {
        --remaining;
      }
    }
  }
  return deferred.promise();
}
// jQuery. Deferred主要处理：
//     显而易见Deferred是个工厂类，返回的是内部构建的deferred对象
//     tuples 创建三个$.Callbacks对象，分别表示成功，失败，处理中三种状态
//     创建了一个promise对象，具有state、always、then、primise方法
//     扩展primise对象生成最终的Deferred对象，返回该对象
//     primise对象就是一个受限对象，只读
var Deferred = function(func) {
  var tuples = [
    //1 动作
    //2 侦听器
    //3 最终状态
    //后面的操作将是围绕这些接口处理
    ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
    ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
    ["notify", "progress", jQuery.Callbacks("memory")]
  ],
  state = "pending",
  //扩展的primise对象
  promise = {
    state: function() {},
    always: function() {},
    then: function( /* fnDone, fnFail, fnProgress */ ) {},
    promise: function(obj) {}
  },
  deferred = {};
  //定义管道风格的接口pipe
  promise.pipe = promise.then;
  //逐个添加所有的接口到deferred对象上
  jQuery.each(tuples, function(i, tuple) {
    deferred[tuple[0]] = function() {
      deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
      return this;
    };
    deferred[tuple[0] + "With"] = list.fireWith;
  });
  //转成成promise对象
  promise.promise(deferred);
  //如果传递的参数是函数，直接运行
  if (func) {
    func.call(deferred, deferred);
  }
  return deferred;
}

//when就是一个合集的处理
//可以收集多个异步操作，合并成功后处理
//同时也可以绑定Promise 对象的其它方法，如 defered.then
//所以when内部必须要创建一个deferred对象
var when = function(subordinate /* , ..., subordinateN */ ) {
  var i = 0,
    resolveValues = slice.call(arguments),
    length = resolveValues.length,
    deferred = remaining === 1 ? subordinate : jQuery.Deferred(),
    updateFunc = function(i, contexts, values) {
      return function(value) {};
    },
    progressValues, progressContexts, resolveContexts;
  if (length > 1) {
    progressValues = new Array(length);
    progressContexts = new Array(length);
    resolveContexts = new Array(length);
    for (; i < length; i++) {
      if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
        resolveValues[i].promise()
          .done(updateFunc(i, resolveContexts, resolveValues))
          .fail(deferred.reject)
          .progress(updateFunc(i, progressContexts, progressValues));
      } else {
        --remaining;
      }
    }
  }
  return deferred.promise();
}
```



## 5.5 Deferred的执行流程

用下面的例子分析

```js
var defer = $.Deferred();
defer.resolve(5);
defer.done(function(value) {})
var filtered = defer.then(function(value) {
  return value * 2;
});
filtered.done(function(value) {});
```

这里有几个关键的问题：

1、defer 延时对象通过 resolved 触发 done 成功回调，调用在添加 done 之前，那么靠什么延时处理？

2、为什么 defer.then 对象返回的给 filtered.done 的数据可以类似管道风格的顺序叠加给后面的 done 处理？

一般来说，javascript 要实现异步的收集，就需要“等待”，比如 `defer.resolve(5)` 虽然触发了，但是 done 的处理还没添加，我们必须要等待 done、then 等方法先添加了后才能执行了resolve，那么常规的的用法就是在 resolve 内部用 `setTimeout 0`，`image.onerror` 行成一个异步的等待操作处理。

但是 jQuery 很巧妙的绕过了这个收集方式，

`defer.resolve(5)`方法实际就是触发了callback 回到函数的 fireWith 方法，这样可以接受一个上下文 deferred 与参数 5

```js
deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
```

之前 `done` 、`fail` 、`progress` 方法都是通过`jQuery.Callbacks("once memory")` 或 `jQuery.Callbacks("memory")`生成的。

实际上在Callback源码fire方法有一句 `memory = options.memory && data;`这样就很巧妙的缓存当前参数5的值，提供给下一个使用，这个就是`then，pipe`链式数据的一个基础了，此刻的操作，我们把`memory`保存了这个数据的值。

重点来了，下一个`defer.done`的操作也是走的`add`的处理，把`done`的回调函数加入到`list`队列中的之后，接着就会触发。

```js
 // With memory, if we're not firing then
 // we should call right away
} else if (memory) {
  firingStart = start;
  fire(memory);
}
```

因为 memory 在上一个 resolve 操作的时候，缓存了5了，所以 memory 的判断显示是为真的，所以立刻就触发了`fire(memory)`的代码了，所以就算触发的循序与添加的循序不一致，也不会导致错误。 而且 jquery 很巧妙的避免了异步收集的问题，这样处理更可靠了。可见回调函数模块就是为 Deferred 模块量身定做的了。

第二个问题，是关于 then，pipe 管道风格的处理，这样也是一个很复杂的设计，在后面一章就提到了。

```html
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script src="http://code.jquery.com/jquery-latest.js"></script>
<title></title>
</head>
<body>


<button>模拟的代码测试</button>

<script type="text/javascript">


var filterResolve = function() {

  var defer = $.Deferred();

  //先执行成功
  defer.resolve(5);

  //后添加
  defer.done(function(value) {
    $('body').append("<li>defer.done的值是：" + value + "</li>");
  })

  //实现一个管道方法
  var filtered = defer.then(function(value) {
    return value * 2;
  });

  //接受上一个值，叠加处理
  filtered.done(function(value) {
    $('body').append("<li>filtered.done ( 2*5 = ) 10: " + "</li>");
  });

};

$("button").on("click", filterResolve);
  

</script>

</body>
</html>
```



## 5.6 Deferred源码剖析(上) 

Deferred 对接口的设计别出心裁，不是常规的直接定义的，我们可以看 tuples 这个数组的定义。

**Deferred自身则围绕这三组数据进行更高层次的抽象**

  ☑ 触发回调函数列表执行(函数名)

  ☑ 添加回调函数（函数名）

  ☑ 回调函数列表（`jQuery.Callbacks`对象）

  ☑ Deferred 最终状态（第三组数据除外）

```js
var tuples = [
  // action, add listener, listener list, final state
  ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
  ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
  ["notify", "progress", jQuery.Callbacks("memory")]
]
```

这里抽象出2组阵营：

**1组：回调方法/事件订阅 **

```
done、fail、progress
```

**2组：通知方法/事件发布    **

```
resolve、reject、notify、resolveWith、rejectWith、notifyWith
```

Tuples 元素集，其实是把相同有共同特性的代码的给合并成一种结构，然后来一次处理。

```js
jQuery.each(tuples, function(i, tuple) {
  //代码请看右边代码区域
})
```

对于 Tuples 的3条数据集是分2部分处理的：

**第一部分将回调函数存入**

```js
promise[ tuple[1] ] = list.add;
```

其实就是给 promise 赋予3个回调函数。

```js
promise.done = $.Callbacks("once memory").add
promise.fail = $.Callbacks("once memory").add
promise.progressl = $.Callbacks("memory").add
```

如果存在 Deferred 最终状态，默认会预先向 doneList，failList 中的 list 添加三个回调函数。

```js
if (stateString) {
  list.add(function() {
    state = stateString;
  }, tuples[i ^ 1][2].disable, tuples[2][2].lock);
}
```

这里有个小技巧：

`i ^ 1` [按位异或运算符](https://developer.mozilla.org/zh-CN/docs/JavaScript/Reference/Operators/Bitwise_Operators)

所以实际上第二个传参数是1、0索引对调了，所以取值是 `failList.disable` 与`doneList.disable`。

**通过stateString有值这个条件，预先向doneList,failList中的list添加三个回调函数，分别是:**

```
doneList : [changeState, failList.disable, processList.lock]
failList : [changeState, doneList.disable, processList.lock]
```

  ☑ changeState 改变状态的匿名函数，deferred的状态，分为三种：pending(初始状态), resolved(解决状态), rejected(拒绝状态)；

  ☑ 不论deferred对象最终是resolve（还是reject），在首先改变对象状态之后，都会disable另一个函数列表failList(或者doneList)；

  ☑ 然后lock processList保持其状态，最后执行剩下的之前done（或者fail）进来的回调函数。

所以第一步最终都是围绕这add方法：

  ☑ done/fail/是list.add也就是[callbacks.add](http://www.cnblogs.com/snandy/archive/2012/11/15/2770237.html#add)，将回调函数存入回调对象中。

**第二部分很简单，给Deferred对象扩充6个方法：**

  ☑ resolve/reject/notify 是 [callbacks.fireWith](http://www.cnblogs.com/snandy/archive/2012/11/15/2770237.html#fireWith)，执行回调函数；

  ☑ resolveWith/rejectWith/notifyWith 是 [callbacks.fireWith](http://www.cnblogs.com/snandy/archive/2012/11/15/2770237.html#fireWith) 队列方法引用。

最后合并promise到Deferred。

```
promise.promise( deferred );
jQuery.extend( obj, promise );
```

所以最终通过工厂方法Deferred构建的异步对象带的所有的方法了，return内部的deferred对象了。

##