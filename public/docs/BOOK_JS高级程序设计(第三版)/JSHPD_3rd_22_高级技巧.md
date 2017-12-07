---
title: 22 高级技巧
categories: [JS高级程序设计(第三版)]
toc: true
tag:
    - js
date:  2015-06-30 16:09
---

## 22.1	高级函数
**不可靠的js内置类型检测机制：**

+ typeof：有一些无法预知的行为，经常会导致检测数据类型时得到不靠谱的结果。
**举例：**`safari`(直至第4版)在对正则表达式应用`typeof`操作符时回返回`function`，而不是`object`。

+  instanceof：在存在多个作用域的情况下无法正确判断变量的值的类型 。
**举例：**`var isArray = arr instanceof Array;`,如果arr时另一个框架中定义的数组，那么以上代码会返回false。

+	 区分原生对象和自定义对象
**举例：**浏览器开始原生支持JSON对象了，使用JSON库的开发人员很难确定页面中的JSON对象是不是原生的。

**健壮的类型检测方法：**在任何值上调用`Object`原生的`toString()`方法，都会返回一个`[object NativeConstructorName]`格式的字符串。
**原理：**每个类在内部都有一个`[[Class]]`属性，这个属性中就制定了上述字符串中的构造函数名。
**优点：**由于原生数组的构造函数名域全局作用域无关，因此使用`toString()`就能保证返回一致的值。
**不适用：**不适用于IE中以COM对象形式实现的任何函数，因为他们并非原生的js函数。
**局限性：**上面的技巧假定Object,prototype.toString本身是未被修改过的原生版本。

```js
//检测构造函数
function isFunction(value){
	return Object.prototype.toString.call(value) == '[object Function]';
}
//检测数组
function isFunction(value){
	return Object.prototype.toString.call(value) == '[object Array]';
}

//检测正则表达式
function isRegExp(value){
	return Object.prototype.toString.call(value) == '[object RegExp]';
}
```
### 22.1.2	作用域安全的构造函数
**this对象的晚绑定：**当没有使用`new`操作符来调用作用域不安全的构造函数时，由于this对象是在运行时绑定的，所以直接调用Person()，this会映射到全局对象window上，导致对象属性的意外增加。

```js
function Person(name, age, job){
	this.name = name;
	this.age = age;
	this.job = job;
}

//使用new调用构造函数没有问题
var person1 = new Person("Nicolas", 20, "Software Engineer");

//偶然的情况下没有使用new调用
var person2 = Person("Nicolas", 20, "Software Engineer");
console.log(window.name);
console.log(window.age);
console.log(window.job);
```
**作用域安全的方式：**在进行任何更改前，首先确认this对象是正确的实例，如果不是那么回创建新的实例并返回。

```js
function Person(name, age, job){
	if(this instanceof Person){
		this.name = name;
		this.age = age;
		this.job = job;	
	}else{
		return new Person(name, age, job);
	}
}

//使用new调用构造函数没有问题
var person1 = new Person("Nicolas", 20, "Software Engineer");

//偶然的情况下没有使用new调用
var person2 = Person("Nicolas", 20, "Software Engineer");
console.log(window.name);//''
console.log(person2.name);//Nocolas
```
**构造函数窃取模式实现继承：**试图窃取作用域安全的构造函数的属性会因为`this`不是其实例而达不到想要的结果。

```js

/**
 * 多边形：是作用域安全的
 * @param {int} 边的数量
 */
function Polygon(sides){
	if(this instanceof Polygon){
		this.sides = sides;
		this.getArea = function(){
			return 0;
		};
	}else{
		return new Polygon(sides);
	}
}
/**
 * 三角形：作用域不安全
 * @param {int} width 宽
 * @param {int} height 高
 */
function Rectangle(width, height){
	//尝试使用自己的this将父类构造函数当作普通函数调用，结果返回一个父类的实例
	Polygon.call(this, 2);
	this.width = width;
	this.height = height;
	this.getArea = function(){
		return this.width * this.height;
	}
}

var rect = new Rectangle(5, 10);
console.log(sides);//undefined
```
**解决上面的问题：**构造函数窃取结合使用原型链或者寄生组合

```js
/**
 * 多边形：是作用域安全的
 * @param {int} 边的数量
 */
function Polygon(sides){
	if(this instanceof Polygon){
		this.sides = sides;
		this.getArea = function(){
			return 0;
		};
	}else{
		return new Polygon(sides);
	}
}
/**
 * 三角形：作用域不安全
 * @param {int} width 宽
 * @param {int} height 高
 */
function Rectangle(width, height){
	//此时这段代码能够正常运行
	Polygon.call(this, 2);
	this.width = width;
	this.height = height;
	this.getArea = function(){
		return this.width * this.height;
	}
}
/*将子类的prototype赋值为父类的实例从而实现继承*/
Rectangle.prototype = new Polygon();//此时，一个Rectangle实例同时也是一个Polygon实例

var rect = new Rectangle(5, 10);
console.log(sides);//2
```
### 22.1.3	惰性载入函数
**用途：**在包含多重分支且在不同浏览器环境下只会执行其中一个分支的函数中，如果多次调用，会重复执行if的判断。惰性函数便用于解决这种性能损失。
####方式一：在函数被调用时在处理函数
**说明：**第一次调用的过程中，改函数会覆盖为另外一个按合适方式执行的函数，这样任何对原函数的调用都不会再经过执行的分支了。
**特点：**第一次调用时损失性能。

```js
function createXHR(){
	if(typeof XMLHttpRequest != "undefined"){
		createXHR = function(){
			return new XMLHttpRequest();
		};
	}else if(typeof ActiveXObject != "undefined"){
		createXHR = function(){
			if(typeof arguments.callee.activeXString != "string"){
				var versions = ["MASXML2.XMLHttp.6.0", "MASXML2.XMLHttp.3.0", "MASXML2.XMLHttp"], i, len;
			}
			for(i = 0, len = versions.length; i < len; i++){
				try{
					new ActiveXObject(versions[i]);
					arguments.callee.activeXString = versions[i];
					break;
				}catch(ex){
					//skip
				}
			}
			return new ActiveXObject(arguments.callee.activeXString);
		};
	}else{
		createXHR = function(){
			throw new Error("No XHR object available.");
		};
	}
	return createXHR();
}
```
####方式二：通过立即执行函数，在函数声明时就指定合适的函数
**说明：**技巧是创建一个匿名、自执行的函数，用以确定应该使用哪一种函数实现。
**特点：**在代码首次加载时有一定性能损失

```js
var createXHR = (function(){
	if(typeof XMLHttpRequest != "undefined"){
		return function(){
			return new XMLHttpRequest();
		};
	}else if(typeof ActiveXObject != "undefined"){
		return function(){
			if(typeof arguments.callee.activeXString != "string"){
				var versions = ["MASXML2.XMLHttp.6.0", "MASXML2.XMLHttp.3.0", "MASXML2.XMLHttp"], i, len;
			}
			for(i = 0, len = versions.length; i < len; i++){
				try{
					new ActiveXObject(versions[i]);
					arguments.callee.activeXString = versions[i];
					break;
				}catch(ex){
					//skip
				}
			}
			return new ActiveXObject(arguments.callee.activeXString);
		};
		
	}else{
		return function(){
			throw new Error("No XHR object available.");
		};
	}
})();
```
### 22.1.4	函数绑定
**说明：**函数要创建一个函数，可以在特定的this环境中以制定参数调用另一个函数。
**常用场景：**常常和回调函数和事件处理程序一起使用，以便在将函数作为变量传递的同时保留代码执行环境。
#### 22.1.4.1	引入
#####特定环境失败案例
**说明：**没有保存`handler.handlerClick`的环境，所以`this`对象最后是指向了DOM按钮而非handler(在IE8中`this`指向`window`)。

```js
var handler = {
	message:"Event handled",
	handleClick:function(){
		alert(this.message);
	}
};

var btn = document.getElementById('my-btn');
EventUtil.addHandler(btn, "click", handler.handlerClick);
```
#####使用闭包来修正

```js
var handler = {
	message:"Event handled",
	handleClick:function(){
		alert(this.message);
	}
};

var btn = document.getElementById('my-btn');
EventUtil.addHandler(btn, "click", function(event){
	handler.handleClick(event);
});
```
#### 22.1.4.2	自定义bind()函数
**说明：**创建多个闭包可能会使代码难于理解和调试。很多js库实现了一个可以将函数绑定到指定环境的函数。

```js

/**
 * 自定义的bind函数
 * @param  {Function} fn 需要保持环境的函数
 * @param  {object} context 需要保持的环境
 * @return {Fruntion} 闭包
 */
function bind(fn, context){
	return function(){
		return fn.apply(context, arguments);
	}
}

var handler = {
	message:"Event handled",
	handleClick:function(){
		alert(this.message);
	}
};

var btn = document.getElementById('my-btn');
//下面对执行环境进行绑定
EventUtil.addHandler(btn, "click", bind(handler.handlerClick, handler));
```
### 22.1.4.3	H5提供的原生bind()
**应用场景：**事件处理程序以及`setTimeout` `setInterval`
**缺点：**被绑定的函数相比普通函数有更多的开销，它们需要更多内存。
**技巧：**也因为多重函数稍微慢一点，所以最好只在必要时使用。
**兼容性：**

|IE9+|Firefox4+|Chrome|
|---|---|---|

```js
var handler = {
	message:"Event handled",
	handleClick:function(){
		alert(this.message);
	}
};

var btn = document.getElementById('my-btn');
//下面对执行环境进行绑定
EventUtil.addHandler(btn, "click", handler.handlerClick.bind(handler));
```
### 22.1.5	函数柯里化
**用途：**用于创建已经设置好了一个或多个参数的函数。
**柯里化原理：**函数柯里化的基本方法和函数绑定是一样的：使用一个闭包返回一个函数。区别在于，当函数呗调用时，返回的函数还需要设置一些传入的参数。
#### 22.1.5.1	引入

```js
function add(num1, num2){
	return num1 + num2;
}

/**
 * 在任何情况下第一个参数为5的add()版本
 * 技术上来说，本函数并非柯里化函数，但可以展示柯里化的用途。
 * @param  {int} num2 数字
 * @return {int} 计算结果
 */
function curriedAdd(num2){
	return add(5, num2);
}
```
### 22.1.5.2	创建柯里化函数
**通用方式：**调用另一个函数并为你它传入要柯里化的函数和必要参数。
**注意：**下面的例子没有考虑执行环境。

```js
/**
 * 将函数柯里化：通过闭包的方式为函数的调用添加额外的固定参数
 * @param  {Function} fn 被柯里化的函数
 * @param {...} 要传入的值
 * @return {Function} 柯里化后的函数
 */
function curry(fn){
	//将fn之后的其它所有参数放在一个临时的数组中
	var args = Array.prototype.slice.call(arguments, 1);
	return function(){
		//将调用柯里化后的函数时传递的参数封装到另一个数组中
		var innerArgs = Array.prototype.slice.call(arguments);
		//将两个数组合并
		var finalArgs = args.concat(innerArgs);

		//执行fn函数，并将合并后的参数传递给该函数
		return fn.apply(null, finalArgs);
	};
}

function add(num1, num2){
	return num1 + num2;
}

/*对函数进行柯里化*/
var curriedAdd = curry(add, 5);
alert(curriedAdd(3));//8
```
#### 22.5.1.3	自定义具备柯里化能力的bind函数

```js
/**
 * 将函数柯里化：通过闭包的方式为函数的调用添加额外的固定参数，并绑定执行环境
 * @param  {Function} fn 被柯里化的函数
 * @param {object} content 要绑定的执行环境
 * @param {...} 要传入的值
 * @return {Function} 柯里化后的函数
 */
function curry(fn, content){
	//将fn和content之后的其它所有参数放在一个临时的数组中
	var args = Array.prototype.slice.call(arguments, 2);
	return function(){
		//将调用柯里化后的函数时传递的参数封装到另一个数组中
		var innerArgs = Array.prototype.slice.call(arguments);
		//将两个数组合并
		var finalArgs = args.concat(innerArgs);

		//使用绑定的执行环境，执行fn函数，并将合并后的参数传递给该函数
		return fn.apply(content, finalArgs);
	};
}

var handler = {
	message:"Event handled",
	handleClick:function(name, event){
		alert(this.message + ":" + name + ":" +event.type);
	}
}
var btn = document.getElementById('my-btn');

//将执行环境以及参数name绑定给handler.handleClick
Event.addHandler(btn, "click", bind(handler.handleClick, handler, "my-btn"));
```
#### 22.5.1.4	h5原生提供的具备柯里化能力的bind函数

```js
var handler = {
	message:"Event handled",
	handleClick:function(name, event){
		alert(this.message + ":" + name + ":" +event.type);
	}
}
var btn = document.getElementById('my-btn');

//将执行环境以及参数name绑定给handler.handleClick
Event.addHandler(btn, "click", handler.handleClick.bind(handler, "my-btn"));
```
## 22.2	防篡改对象
### 22.2.1	不可扩展对象
**说明：**默认情况下，所有对象都是可扩展的。也就是说，任何时候都可以向对象中添加属性和方法。

```js
var person = {name:"Nicholas"};
person.age = 29;
```
**使对象不可扩展：**

|Object提供的相关方法|说明|兼容性|
|---|---|---|
|`preventExtensions()`|对已有的对象添加限制，阻止其属性和方法被修改|es5|
|`isExtensible()`|确定对象是否可以扩展|es5|
**注意：**

+ 在非严格模式下,尝试扩展不可扩展的对象会导致静默失败；而在严格模式下，尝试给不可扩展的对象添加新成员会导致抛出错误。
+ 一旦把对象定义为防篡改，就无法撤销了。

```js
var person = {name:"Nicholas"};
//防篡改前
Object.isExtensible(person);//false

//防篡改
Object.preventExtensions(person);//true

//防篡改后
Object.isExtensible(person);//false
```
### 22.2.2	密封的对象
**密封对象(sealed object)：**

+ 密封对象不可扩展
+ 已有成员的`[[Configurable]]`特性将被设置为`false`
+ 且不能使用`Object.defineProperty()`把数据属性修改为访问器属性，或者相反（所以无法删除属性和方法）
+ 属性值可以修改

|Object提供的方法|说明|兼容性|
|---|---|---|
|`seal()`|密封对象|es5|
|`isSealed()`|确定对象是否被密封了|es5|

**注意：**使用`Object.isExtensible()`检测密封的对象也会返回`false`。

```js
var person  = {name:"Nicolas"};
//密封前
alert(Object.isExtensible(person));//true
alert(Object.isSealed(person));//false

//密封
Object.seal(person);

//密封后
alert(Object.isExtensible(person));//false
alert(Object.isSealed(person));//true
```

### 22.2.3	冻结的对象
**防篡改级别：**最高
**用途：**对JavaScript库的作者而言，冻结对象是很有用的，因为JS库最怕有人意外（或有意）地修改了库中的核心对象。冻结（或密封）主要的库对象能够防止这些问题的发生。
**冻结对象（frozen object）：**

+ 冻结的对象既不可扩展，又是密封的
+ 对象数据属性的`[[Writable]]`特性会被设置为`false`
+ 如果定义了`[[Set]]`函数，访问属性仍然是可写的

|Object提供的方法|说明|兼容性|
|---|---|---|
|`freeze()`|冻结对象|es5|
|`isFrozen()`|检测冻结对象|es5|
**表现：**对冻结的对象执行非法操作在非严格模式下会被忽略，而在严格模式下回抛出错误。

```js
//冻结前
alert(Object.isExtensible(person));//true
alert(Object.isSealed(person));//false
alert(Object.isFrozen(person));//false

//冻结
Object.freeze(person);

//冻结后
alert(Object.isExtensible(person));//false
alert(Object.isSealed(person));//true
alert(Object.isFrozen(person));//true
```
### 22.3	高级定时器

|定时器函数|说明|
|---|---|
|setTimeout|延时执行（一次）|
|setInterval|定时执行（多次）|
####运行机制
**js运行环境：**单线程
**时间线：**以事件处理程序为例
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/屏幕快照 2015-07-01 下午3.32.44.png)
**任务队列：**除了主JavaScript执行进程外，还有一个需要在进程下一次空闲时执行的代码队列。随着页面生命周期的推移，代码会按照执行顺序加入队列。例如，当某个按钮被按下时，它的时间处理函数代码就会被添加进队列，并在下一个可能的时间里执行。
**任务执行时间：**在JS中没有任何代码是立刻执行的，单衣单进程空闲则尽快执行。
**定时器工作方式：**当特定时间过去后将代码插入任务队列。
### 22.3.1	重复的定时器
**背景：**如果不JS引擎不做额外的处理，定时器代码可能在代码再次被添加到队列之前还没有完成执行，结果导致定时处理器代码连续远行好几次。
**js引擎处理`setInterVal()`：**每次到了需要将代码插入队列的时候，会判断有没有定时器的其它任何代码实例。没有才将定时器代码添加到队列。这确保了定时器代码加入到队列中的最小时间间隔为指定时间。不过会带来两个问题：

+ 某些间隔会被跳过
+ 多个定时器的代码执行之间的间隔可能会比预期的小

**使用链式`setTimeout()`替代`setInterval()`:**

+ 在前一个定时器代码执行完之前，不会向队列插入新的定时器代码，确保不会有任何缺失的间隔
+ 可以保证在下一次定时器代码执行之前，至少要等待指定的间隔，避免连续的运行

```js
setTimeout(function(){
	//内容

	setTimeout(arguments.callee, interval);
}, interval);
```
**注意：**每个浏览器窗口、标签页、或者框架都有其各自的代码执行队列。这意味着，进行跨框架活着跨窗口的定时调用，当代码同时执行的时候可能会导致竞争条件。

```js
//向右移动一个<div>元素，当左坐标在200像素的时候停止
setTimeout(function(){
	var div = document.getElementById("myDiv");
	left = parseInt(div.style.left) + 5;
	div.style.left = left + "px";
	if(left < 200){
		setTimeout(arguments.callee, 50);
	}
});
```
### 22.3.2	Yielding Processes
**背景：**为了方式恶意的web成序把用户的计算机搞挂，运行在浏览器中的JavaScript都被分配了一个确定数量的资源（内存大小和处理器时间）。
**长时间运行脚本的制约：**如果代码运行查过特定的时间或者特定语句的数量就不让它继续执行。此时会弹出浏览器错误的对话框，告诉用户某个脚本会用过长的时间执行，询问是允许其继续执行还是停止它。

+ 过长的、过深嵌套的函数调用
+ 进行大量处理的循环

**目标：**确保用户永远不会再浏览器中看到这个令人费解的对话框。
#### 22.3.2.1	使用定时器避免限制
**数组分块（array chunking）：**为要处理地项目创建一个队列，然后使用定时器取出下一个要处理的项目进行处理，接着再设置一个定时器。
**条件：**
1. 不需要同步完成
2. 不需要按顺序完成

```js
/**
 * 实现数组分块，使js进程有时间再处理项目的时间之间转入空闲
 * @param  {array} array “代办事宜”列表，包含要处理的项目
 * @param  {Function} process 处理项目的函数
 * @param  {object} context 合适的执行环境
 */
function chunk(array, process, context){
	setTimeout(function(){
		//取出下一个条目并处理
		var item = array.shift();
		process.call(context, item);

		//若还有条目，再设置另一个定时器
		if(array.length > 0){
			setTimeout(arguments.callee, 100);
		}
	}, 100);	
}

var data = [12, 123, 453, 67, 4365, 54325, 4343, 4324, 54254];

function printValue(item){
	var div = document.getElementById("myDiv");
	div.innerHTML += item + "<br>";
}

/**
 * 由于函数处在全局作用域，因此无需给chunk()传递一个context对象
 * 为了保持原数组不变，传递给chunk()的数组是副本
 */
chunk(data.concat(), printValue);
```
### 22.3.3	函数节流
**背景：**高频率的DOM操作可能会使浏览器崩溃。
**原理：**第一次调用函数，创建一个定时器，在指定的时间间隔之后运行代码。第二次调用该函数时，它会清楚前一次的定时器并设置另一个。目的是在执行函数的请求停止了一段时间之后才执行。

```js
/**
 * 一个比较麻烦的实现
 * @type {Object}
 */
var processor = {
	timeoutId:null,

	//实际进行处理的方法
	performProcessing:function(){
		//实际执行的代码
	},
	//初始处理调用的方法
	process:function(){
		//如果前一个任务还没有执行，那就不让它执行了
		clearTimeout(this.timeoutId);

		var that = this;
		this.timeoutId = setTimeout(function(){
			that.performProcessing();
		}, 100);
	}
};

/**
 * 更简洁的方式实现节流
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
function throttle(method, context){
	clearTimeout(method.tId);
	method.tId = setTimeout(function(){
		method.call(context);
	}, 100)
}

/**
 * 重置元素的大小
 */
function resizeDiv(){
	var div = document.getElementById("myDiv");
	div.style.height = div.offSetWidth + "px";
}

/*注册监听窗口大小变化*/
window.onresize = function(){
	throttle(resizeDiv);
}
```
## 22.4	自定义事件
### 22.4.1	观察者模式
**主体：**主体负责发布事件，可以独自存在并正确运行计时观察者并不存在。
**观察者：**观察者通过订阅这些事件来观察该主体。
**自定义事件：**事件是与DOM交互的最常见的方式，但它们也可以用于非DOM代码中－通过自定义时间。自定义时间背后的概念是创建一个管理事件的对象，让其他对象监听那些事件。

```js
function EventTrget(){
	this.handlers = [];
}
EventTrget.prototype = {
	constructor:EventTrget,
	/**
	 * 注册给定类型时间的时间处理程序
	 * @param {string} type 事件类型
	 * @param {Function} type 用于处理该事件的函数
	 */
	addHandler:function(type, handler){
		if(typeof this.handlers[type] == 'undefined'){
			this.handlers[type] = [];
		}
		this.handlers[type].push(handler);
	},
	/**
	 * 触发一个事件
	 * @param  {object} event 事件对象
	 */
	fire:function(event){
		if(!event.target){
			event.target = this;
		}
		if(this.handlers[event.type] instanceof Array){
			var handlers  = this.handlers[event.type];
			for(var i = 0, len = handlers.length; i < len; i++){
				handlers[i](event);
			}
		}
	},
	/**
	 * 注销某个事件类型的处理程序
	 * @param  {string} type 事件类型
	 * @param  {Function} handler 事件处理程序
	 */
	removeHandler:function(type, handler){
		if(this.handlers[type] instanceof Array){
			var handlers = this.handlers[type];
			for(var i = 0, len = handlers.length; i < len; i++){
				if(handlers[i] === handler){
					break;
				}
			}
			handlers.splice(i, 1);
		}
	}
}

/**
 * 事件处理程序
 * @param  {[type]}
 * @return {[type]}
 */
function handleMessage(event){
	alert("Message received:" + event.message);
}

//创建一个新对象
var target = new EventTrget();

//添加一个事件处理程序
target.addHandler("message", handleMessage);

//触发事件
target.addHandler("message", handleMessage);

//删除时间处理程序
target.fire({type:"message", message:"Hello World"});

//再次，应没有处理程序
target.fire({type:"message", message:"Hello world"});
```
#### 22.4.2	继承自定义的EventTarget类型

```js
/*
*使用寄生式继承来继承超类型的原型
*@param {function} subType 子类型的构造函数
*@param {function} superType 超类型的构造函数
*/
function inheritPrototype(subType, superType){
    //第一步：创建超类型原型的一个副本
    var prototype = object(superType.prototype);    //创建对象
    
    //第二步：添加constructor属性
    portotype.constructor = subType;    //增强对象
    
    //第三步：将创建的对象（副本）赋值给子类型的原型
    subType.prototype = prototype;    //指定对象
}

//使用寄生组合的方式继承EventTarget
function Person(name, age){
	EventTarget.call(this);
	this.name = name;
	this.age = age;
}

inheritPrototype(Person, EventTarget);

Person.prototype.say = function(message){
	this.fire({type:"message", message:message});
}

function handleMessage(event){
	alert(event.target.name + " says: " + event.message);
}

//创建新person
var person = new Person("Nicolas", 29);

//添加一个事件处理程序
person.addHandler("message", handleMessage);

//在该对象上调用一个方法，它触发消息事件
person.say("Hi,here");
```












