---
title: 09 客户端检测
categories: [JS高级程序设计(第三版)]
tag:
    - js
date: 2017-04-09
---



**注意**：不到万不得已，就不要使用客户端检测，应优先采用更通用的方法。

**技巧**：现设计最通用的方案，再使用特定于浏览器的技术增强该方案。



## 1 能力检测

能力检测的目标不是识别特定的浏览器，而是识别浏览器的功能。

```js
/**
* 返回具有给定 ID 的元素
* param {string} id 元素的 ID
* return {ElementNode} 具备给定 ID 的元素
*/
function getElement(id) {
  if (document.getElementById) {
    return document.getElementById(id)
  }
  // IE5 之前不支持 document.getElementsById()
  else if (document.all) {
    return document.all(id)
  }
  else {
    throw new Error('No way to retrivr element!')
  }
}
```



### 1.1 更可靠的能力检测

尽量使用 typeof 进行能力检测，而不仅仅是检测某个属性存不存在。

**为什么要使用 typeof ?**

```
☑︎ 很多时候，只检测某个属性或变量是否存在不能保证就能投入使用。
☑︎ IE 中的 ActiveX 对象的方法当作属性访问会报错。
```
**typeof 的行为并不标准**

```
☑︎ IE8- 的宿主对象(DOM 对象)是通过 COM 而非 JScript 实现的，因此"type 宿祖对象.方法" 返回 "object"。
```

#### 举例：测试任何对象是否包含某个方法

```js
/**
* 作者： Peter Michaux
* 判断某个对象是否包含特定的方法
* @param {object} object 被检测对象
* @param {string} property 被检测的方法名
* @return {boolean} true 存在，false 不存在
*/
function isHostMethod(object, property) {
 	var t = typeof object[property]
 	return t == 'function' || // 大部分浏览器
    	(!!(t == 'object' && object(ptoperty)))|| // ie8- 的 DOM ,,,
    	t == 'unknow' // 在 ie 中，"typeof xhr.open" 返回 "unknow"
}


// 应用
var result;
	xhr = new ActiveXObject('Microsoft.XMLHttp')
result = isHostMethod(xhr, 'open') // true
result = isHostMethod(xhr, 'foo') // false
```



### 1.2 能力检测，不是浏览器检测

在实际开发中，应该将能力检测作为确定下一步解决方案的依据，而不是用它来判断用户使用的是什么浏览器。

**为什么不应该检测浏览器？**

```
☑︎ 根据客户端的能力确定是否是某种浏览器其实是比较麻烦的，需要考虑的情况比较多。
☑︎ 根据客户端的能力来判断浏览器类型不能保证总是可靠，比如，有时需要假设某个特性某种浏览器支持，其它不支持，但这种假设是不完全成立的，因为你无法知道浏览器后续版本的变化。
```

#### 浏览器检测（错误）

```js
// 错误！还不够具体（Safari 也实现了这两个属性）
var isFirefox = !!(navigator.vendor && navigator.vendorSub)

// 错误！假设过头了（IE 将来的版本未必会仍然有这两个属性）
var isIE = !!(document.all && document.uniqueID)
```

#### 能力检测

```js
// 确定浏览器是否支持 Netscape 风格的插件
var basNSPlugins = !!(navigator.plugins && navigator.plugins.length)

// 确定浏览器是否具有 DOM1 级规定的能力
var hasDOM1 = !!(document.getElementById && document.createElement && document.getElementsByTagName)
```

## 2 怪癖检测

与能力检测确认浏览器支持什么能力不同，怪癖检测是想要知道浏览器存在什么缺陷。通常需要运行一小段代码，以确定某一特性能否正常工作。

```
由于检测“怪癖”设计运行代码，因此我们建议仅检测那些对你有直接影响的“怪癖”，而且最好在脚本一开始就执行此类检测，以便尽早解决问题。
```

### 案例1：和原型上属性同名的实例属性不可被 for-in 遍历的问题

在 `IE8-` 中，如果某个实例属性与标记为 `[[DontEnum]]` 的某个非原型属性同名，那么该实例属性将不会出现在 `for-in` 循环中。

```js
/*****************************************************************
* 和不可遍历的原型属性同名的实例属性是否存在不可被 for-in 遍历(true 存在问题，false 没问题)
*****************************************************************/
var hasDontEnumQuirk = function () {
  var o = { toString: function () {} }
  for (var prop in 0) {
    if (prop === 'toString') {
      return false
    }
  }
  return true
}()

```

### 案例2：隐藏的属性可被 for-in 遍历的问题

在`Safari2-`中，`for-in` 会枚举被隐藏的属性。

```js
/*****************************************************************
* 不可枚举的属性是否存在可被 for-in 遍历的问题(true 存在问题，false 没问题)
*****************************************************************/
var hasEnumShadowsQuirk = function () {
  var o = { toString: function () {} }
  var count = 0
  for (var prop in o) {
    if (prop == "toString") {
      count++
    }
  }
  return (count > 1)
}()
```



## 3 用户代理检测

通过检测用户代理字符串来确定实际使用的浏览器。

**用户代理字符串**

```
☑︎ 每次 HTTP 请求过程中，用户代理字符串是作为相应首部发送的。
☑︎ 该字符串可以通过 JavaScript 的 navigator.userAgent 属性访问。
```

**使用场景**

```
☑︎ 在服务端，通过检测用户代理字符串确定用户使用的浏览器是一种常用而且广为接受的做法。
☑︎ 在客户端，用户代理检测一般被当作一种万不得已才用的做法，其优先级排在“能力检测”和“怪癖检测”之后。
```

**电子欺骗**

浏览器通过在自己的用户代理字符串中加入一些错误或误导性信息，来达到欺骗服务器的目的。



### 3.1 用户代理字符串的历史

HTTP(1.0 和 1.1) 规范明确规定，浏览器应该发送间断的用户代理字符串，指明浏览器的名称和版本号。用户代理字符串应该以一组产品的行医给出，字符串格式为：`标识符/产品版本号`。

#### 3.1.1 早期的浏览器

**Mosaic/1993**

`产品名称/产品版本号`

```js
Mosaic/0.9
```

**Netscape Navigator 2**

`产品名称/产品版本号 [语言] (平台;加密类型)`

```js
Mozilla/2.02 [fr] (winNT;I)
```



#### 3.1.2 Netscape Navigator3 和 Internet Explorer 3

**Netscape Navigator 3/1996**

`Mozilla/版本号 (平台; 加密类型 [; 操作系统或CPU说明])`

```js
Mozilla/3.0 (Win95; U)
```

**Internet Explorer 3**

`Mozilla/2.0 (compatible; MSIE 版本号; 操作系统)`

☑︎ 将自己表示为 Mozilla， 伪装成 Netscape Nacigator，违反了浏览器标识的惯例；
☑︎ 更不规范的是，将真正的浏览器版本号插入到了字符串的中间。
☑︎ 可能由于失误，伪装成了 Mozilla 2.0 位不是主流的 Mozilla 3.0。

```js
Mozilla/2.0 (compatible; MSIE 3.02; Windows 95)
```

#### 3.1.3 Netscape Communicator 4 和 IE4~IE8

**Netscape Communicator 4**

`Mozilla/版本号 (平台; 加密类型 [; 操作系统或CPU说明])`

```js
Mozilla/4.0 (win98; I)
```

**Internet Explorer 4**

`Mozilla/4.0 (compatible; MSIE 版本号; 操作系统)`

```js
Mozilla/4.0 (compatible; MSIE 4.0; Windows 98)
```

**Internet Explorer 4.5 ~ Internet Explorer 7**

`Mozilla/4.0 (compatiable; MSIE 版本号; 操作系统)`

```js
Mozilla/4.0 (compatiable; MSIE 4.5; Mac_PowerPC)
Mozilla/4.0 (compatiable; MSIE 7.0; Windows NT 5.1)
```

**Internet Explorer 8**

`Mozilla/4.0 (compatiable; MSIE 版本号; 操作系统; Trident/Trident版本号)`

```js
Mozilla/4.0 (compatiable; MSIE 8.0; Windows NT 5.1; Trident/4.0) // IE8 非兼容模式
Mozilla/4.0 (compatiable; MSIE 7.0; Windows NT 5.1; Trident/4.0) // IE8 运行 IE7 兼容模式
```

**Internet Explorer 9**

```js
Mozilla/4.0 (compatiable; MSIE 9.0; Windows NT 5.1; Trident/5.0) // IE9 非兼容模式
Mozilla/4.0 (compatiable; MSIE 7.0; Windows NT 5.1; Trident/5.0) // IE9 运行 IE7 兼容模式
```



#### 3.1.4 Gecko

Firefox 的呈现引擎。第一个使用 Gecko 引擎的是 Netscape 6。



**Netscape 6 ~ Firefox 3**

`Mozilla/Mozilla版本号 (平台; 加密类型; 操作系统或CPU; 语言; 预先发行版本) Gecko/Gecko版本号 应用程序或产品/应用程序或产品版本号`

```js
// WindowsXP下的 Netscape 6.21
Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:0.9.4) Gecko/20011128 Netscape6/6.2.1 

// Linux 下的 Sea monkey 1.1a
Mozilla/5.0 (X11; U; Linux i685; en-US; rv:1.8.1b2) Gecko/20060823 SeaMonkey/1.1a

// Windows XP 下的 Firefox 2.0.0.11
Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.11) Gecko/20071127 Firefox/2.0.0.11

// Mac OS X 下的 Camino 1.5.1
Mozilla/5.0 (Macintosh; U; Intel Mac OS X; en; rv:1.8.1.6) Gecko/20070809 Camino/1.5.1
```

**Firefox 4**

`Mozilla/Mozilla版本号 (加密类型; 操作系统或CPU; 预先发行版本) Gecko/Gecko版本号 应用程序或产品 应用程序或产品版本号`

```js
Mozilla/5.0 (Windows NT 6.1; en; rv:2.0.1) Gecko/20100101 Firefox 4.0.1
```



#### 3.1.5 WebKit

Linux 平台中 Konqueror 浏览器的呈现引擎 KHTML 的一个分支。

**Safari beta 1.0/2003**

`Mozillla/5.0 (平台; 加密类型; 操作系统或CPU; 语言) AppleWebkit/AppleWebkit版本号 (KHTML, like Gecko) Safari/Safari版本号`

```js
Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebkit/124 (KHTML, like Gecko) Safari/123.1
```

**Safari 3.0**

`Mozillla/5.0 (平台; 加密类型; 操作系统或CPU; 语言) AppleWebkit/AppleWebkit版本号 (KHTML, like Gecko) Version/Webkit版本号 Safari/Safari版本号`

```js
Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebkit/124 (KHTML, like Gecko) Version/3.0.3 Safari/522.15.5
```

#### 3.1.6 Konqueror

**Konqueror 3.2之前**

`Mozilla/5.0 (compatible; Konqueror/ 版本号; 操作系统或CPU)`

**Konqueror 3.2+**

`Mozilla/5.0 (compatible; Konqueror/ 版本号; 操作系统或CPU)`

```js
Mozilla/5.0 (compatible; Konqueror/3.5; SunOS) KHTML/3.5.0 (like Gecko)
```



#### 3.1.7 Chrome

**chrome 0.2**

`Mozilla/5.0 (平台; 加密类型; 操作系统或CPU; 语言) AppleWebkit/AppleWebkit版本号 (KHTML, like Gecko) Chrome/Chrome版本号 Safari/Safari版本号`

```js
Mozilla/5.0 (windows; U; Windows NT 5.1; en-US) AppleWebkit/534.7 (KHTML, like Gecko) Chrome/7.0.517.44 Safari/534.7
```

#### 3.1.8 Opera

**opera 8 之前**

`Opera/版本号 (操作系统或CPU; 加密类型) [语言]`

```js
Opera/7.5.4 (Windows NT 5.1; U) [en] // Windows XP 中的 Opera7.54
```

**opera 8 之后**

`opera/版本号 (操作系统或CPU; 加密类型; 语言)`

```js
Opera/8.0 (Windws NT 5.1; U; en) // Windows XP 中的 Opera8
```

**opera 9**

```js
// Opera 9.5 表示为 Firefox 2, 同时带有 Opera 版本信息
Mozilla/5.0 (Windows NT 5.1; U; en; rm:1.8.1) Gecko/20061208 Firefox/2.0.0 Opera 9.50

// Opera 9.5 表示为 IE6, 也包含了 Opera 版本信息
Mozilla/5.0 (compatible; MSIE 6.0; Windows NT 5.1; en) Opera 9.50
```

**opera 10+**

`opera/9.80 (操作系统或CPU; 加密类型; 语言) Presto/Presto版本号 Version/版本号`

```js
// Window7 中 Opera 10.63 的用户代理字符串
Opera/9.80 (Windows NT 6.1; U; en) Presto/2.6.30 Version/10.63
```



#### 3.1.9 iOS 和 Android

**iOS**

`Mozillla/5.0 (平台; 加密类型; 操作系统或CPU like Mac OS X; 语言) AppleWebkit/AppleWebkit版本号 (KHTML, like Gecko) Version/浏览器版本号 Mobile/移动版本号 Safari/Safari版本号`

```js
Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_0 like Mac OS X; en-us) AppleWebkit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7A341 Safari/528.16
```

**Android**

`Mozillla/5.0 (平台; 加密类型; 操作系统或CPU; 语言; Nexus One Build/FRF91) AppleWebkit/AppleWebkit版本号 (KHTML, like Gecko) Version/浏览器版本号 Mobile Safari/Safari版本号`

```js
Mozilla/5.0 (Linux; U; Android 2.2; en-us; Nexus One Build/FRF91) AppleWebkit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1
```



### 3.2 用户代理字符串检测技术



### 3.3 完整的代码

```js
var client = function () {
  // 呈现引擎
  var engine = {
    ie: 0,
    gecko: 0,
    webkit: 0,
    khtml: 0,
    opera: 0,
    
    // 完整的版本号
    ver: null
  }
  
  // 浏览器
  var browser = {
    // 主要浏览器
    ie: 0,
    firefox: 0,
    safari: 0,
    konq: 0,
    opera: 0,
    chrome: 0,
    // 具体的版本号
    ver: null
  }
  
  // 平台、设备和操作系统
  var system = {
    win: false,    
    mac: false,
    x11: false,
    
    // 移动设备
    iphone: false,
    ipod: false,
    ipad: false,
    ios: false,
    android: false,
    nokiaN: false,
    winMobile: false,
    
    // 游戏系统
    wii: false,
    ps: false
  }
  
  // 检测呈现引擎和浏览器
  var ua = navigator.userAgent
  if (window.opera) {
    engine.ver = browser.ver = window.opera.version()
    engine.opera = browser.opera = parseFloat(engine.ver)
  }
  else if (/AppleWebkit\/(\S+)/.test(ua)/) {
    engine.ver = RegExp['$1']
    engine.webkit = parseFloat(engine.ver)
    
    // 确定是 Chrome 还是 Safari
    if (/Chrome\/(\S+)/.test(ua)) {
      browser.ver = RgeExp['$1']
      browser.chrome = parseFloat(browser.ver)
    }
  	else if (/Version\/(\S+)/.test(ua)) {
      browser.ver = RegExp['$1']
      browser.safari = parseFloat(browser.ver)
  	}
	else {
      // 近似地确定版本号
      var safariVersion = 1
      if (engine.webkit < 100) {
        safariVersion = 1
      }
      else if (engine.webkit < 312) {
        safariVersion = 1.2
      }
      else if (engine.webkit < 412) {
        safariVersion = 1.3
      }
      else {
        safariVersion = 2
      }
      browser.safari = browser.ver = safariVersion
	}
  }
  else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {
    engine.ver = browser.ver = RegExp['$1']
    engine.khtml = browser.kong = parsefloat(engine.ver)
  }
  else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua) {
    engine.ver = RegExp['$1']
    engine.gecko = parseFloat(engine.ver)

    // 确定是不是 Firefox
    if (/Firefox\/(\S+)/.test(ua)) {
      browser.ver = RegExp['$1']
      browser.firefox = parseFloat(browser.ver)
    }
  }
  else if (/MSIE ([^;]+)/.test(ua)) {
    engine.ver = browser.ver = RegExp['$1']
    engine.ie = browser.ie = parseFloat(engine.ver)
  }

  // 检测浏览器
  browser.ie = engine.ie
  browser.opera = engine.opera

  // 检测平台
  var p = navigator.platform
  system.win = p.indexOf('Win') == 0
  system.mac = p.indexOf('Mac') == 0
  system.x11 = (p == 'X11') || (p.indexOf('Linux') == 0)

  // 检测 Windows 操作系统
  if (system.win) {
    if (/Win(?:dows )?([^do][2])\s?(\d+\.\d+)?/.test(ua)) {
      if (RegExp['$1'] == 'NT') {
        switch(RegExp['$2']) {
          case '5.0':
            system.win = '2000'
            break
          case '5.1':
            system.win = 'XP'  
            break
          case '6.0':
            system.win = 'Vista'
            break
          case '6.1':
            system.win = '7'
            break
          default:
            system.win = 'NT'
            break
        }
      }
      else if (RegExp['$1'] == '9x') {
        system.win = 'ME'
      }
      else {
        system.win = RegExp['$1']
      }
    }
  }

  // 移动设备
  system.iphone = ua.indexOf('iPhone') > -1
  system.ipod = ua.indexOf('ipod') > -1
  system.ipad = ua.indexOf('iPad') > -1
  system.nokiaN = us.indexOf('NokiaN') > -1

  // windows mobile
  if (system.win == 'CE') {
    system.winMobile = system.win
  } 
  else if (system.win == 'Ph') {
    if (/Windows Phone OS (\d+.\d+)/.test(ua)) {
      system.win = 'Phone'
      system.winMobile = parseFloat(RegExp['$1'])
    }
  }

  // 检测 iOS 版本
  if (system.mac && ua.indexOf('Mobile') > -1) {
    if (/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)) {
      system.ios = parseFloat(RegExp.$1.replace('_', '.'))
    }
    else {
      system.ios = 2// 不能真正检测出来，所以只能猜测
    }
  }

  // 检测 Android 版本
  if (/Android (\d+\.\d+)/.test(ua)) {
    system.android = parseFloat(RegExp.$1)
  }

  // 游戏系统
  system.wii = ua.indexOf('wii') > -1
  system.ps = /playstation/i.test(ua)

  // 返回这些对象
  return {
    engine: engine,
    browser: browser,
    system: system
  }
}()
```



### 3.4 使用方法

**适用场景**

```
☑︎ 不能直接准确地使用能力检测或怪癖检测。例如某些浏览器实现了为将来功能预留的存根函数。在这种情况下，仅测试相应的函数是否存在还得不到足够的信息。
☑︎ 同一款浏览器在不同平台下具备不同的能力。这时候，可能就有必要确定浏览器位于哪个平台下。
☑︎ 为了跟踪分析等目的需要知道确切的浏览器
```

