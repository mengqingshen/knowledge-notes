---
title: 11 Dom扩展
categories: [JS高级程序设计(第三版)]
toc: true
tag:
    - js
date: 2014-11-08 21:20:29
---

# 1 选择符API
**Selectors API**
☑︎ 官方API：www.w3.org/TR/selectors-api
☑︎ 用途：通过CSS选择符查询DOM文档取得元素的引用
☑︎ 兼容性：`IE8+` ` Firefox3.5+` `Safari3.1+` ` Chrome` ` Opera10+`

## 1.1 querySelector()方法
**querySelector(cssSelector)**：通过css选择符查询DOM节点
☑︎ 参数：CSS选择符
☑︎ 返回值：返回与该模式匹配的第一个元素，如果没有匹配的元素，返回null

```js
//取得body元素
var body = document.querySelector("body");
//取得ID为"myDiv"的元素
var myDiv = document.querySelector("#myDiv");
//取得类为"button"的第一个图像元素
var img = document.body.querySelector("img.button");
```

## 1.2 querySelectorAll()方法
**querySelectorAll(cssSelector)**：通过css选择符查询包含所有匹配的DOM节点的NodeList对象
☑︎ 参数：CSS选择符
☑︎ 返回值：NodeList对象（快照而非动态查询），如果没有匹配的元素，NodeList就是空的

```js
//取得某<div>中的所有<em>元素（类似于getElementByTagName("em")）
var ems = document.getElementById('myDiv').querySelectorAll("em");
//取得类为"selected"的所有元素
var selecteds = document.querySelectorAll(".selected");
//取得所有<p>元素中的所有<strong>元素
var strongs = document.querySelectorAll(".p strong");
var i, len, strong;
for(i=0,len=strongs.length; i < len; i++){
  strong = strong[i]; //或者strings.item[i]
  strong.className = "important";
}
```

## 1.3 matchesSelector()方法
**matchsSelector(cssSelector)**：检测调用元素与指定css选择符是否匹配
☑︎ 参数：css选择符
☑︎ 返回值：如果匹配返回true；否则返回false
☑︎ 来源：Selector API Level 2
☑︎ 兼容性：2011年中还没有浏览器实现，但有一些实验性实现


| 浏览器             | 实现                      |
| --------------- | ----------------------- |
| IE9+            | msMatchesSelector()     |
| Firefox3.6+     | mozMatchesSelector()    |
| Chrome、Safari5+ | webkitMatchesSelector() |

```js
function matchesSelector(element, selector) {
  if (element.matchesSelector) {
    return element.matchesSelector(selector)
  }
  else if (element.msMatchesSelector) {
    return element.msMatchesSelector(selector)
  }
  else if (element.mozMatchesSelector) {
    return element.mozMatchesSelector(selector)
  }
  else if (element.webkitMatchesSelector) {
    return element.webkitMatchesSelector(selector)
  }
  else {
    throw new Error('Not supported.')
  }
}

if (matchesSelector(document.body, 'body.page1')) {
  // 执行操作
}
```



## 2 元素遍历

```
背景：浏览器旧的 API 处理元素间的空格存在差异
☑︎ IE9- 不会将元素间的空格作为文本节点返回；
☑︎ 其它所有浏览器都会将空格作为返回文本节点。
```

Element Traversal API 为 DOM 元素添加了以下 5 个属性

| 属性                     | 说明                   | 对应的旧属性          |
| ---------------------- | -------------------- | --------------- |
| childElementCount      | 返回子元素（不包括文本节点和注释）的个数 | 无               |
| firstElementChild      | 指向第一个子元素             | firstChild      |
| lastElementChild       | 指向最后一个子元素            | lastChild       |
| previousElementSibling | 指向前一个同辈元素            | previousSibling |
| nextElementSibling     | 指向后一个同辈元素            | nextSibling     |

☑︎ 兼容性: `IE 9+` `Firefox 3.5+` `Safari 4+` `Chrome` `Opera 10+` 

**遍历子元素（使用旧 API）**

```js
var i,
    len,
    child = element.firstChild
while (child != element.lastChild) {
  // 检查是不是元素
  if (child.nodeType == 1) {
    processChild(child)
  }
  child = child.nextSibling
}
```

**遍历子元素（使用新增 API）**

```js
var i,
    len,
    child = element.firstElementChild

while (child != element.lastElementChild) {
  processChild(child) // 已知其是元素
  child = child.nextElementSibling
}
```


# 3 HTML 5

## 3.1 与类相关的扩展

### getElementsByClassName() 方法

☑︎ 调用：包括 document 对象在内的所有 HTML 元素都可以调用。

☑︎ 参数：一个包含一或多个 class 名的字符串，传入多个类名时，类型的先后顺序不重要。

☑︎ 返回：带有指定  class 名的所有元素的 NodeList。

☑︎ 兼容性：`IE9+` `Firefox3+` `Safari3.1+` `Chrome` `Opera9.5+`

☑︎ 价值：可以更方便地为带有某些类的元素添加事件处理程序，不在局限于使用 ID 或标签名。

```
// 取得所有类中包含 'username' 和 'current' 的元素，类名的先后顺序无所谓
var allCurrentUsernames = document.getElementsByClassName('username current')

// 取得 ID 为 'myDiv' 的元素中带有类名 'selected' 的所有元素
var selected = document.getElementById('myDiv').getElementsByClassName('selected')
```

### classList 属性

该属性是新集合类型 `DOMTokenList` 的实例。

| DOMTokenList 实例的属性和方法 | 说明                                     |
| --------------------- | -------------------------------------- |
| length                | 包含元素的个数                                |
| add(value)            | 将给定的字符串值添加到列表中。如果值已经存在了，就不添加了。         |
| contains(value)       | 表示列表中是否存在给定的值，如果存在则返回 true，否则返回 false。 |
| remove(value)         | 从列表中删除给定的字符串                           |
| toggle(value)         | 如果列表中已经存在给定的值，删除它；否则，添加它。              |


```js
// 删除 'disabled' 类
div.classList.remove('disabled')

// 添加 'current' 类
div.classList.add('current')

// 切换 'user' 类
div.classList.toggle('user')

// 确定元素中是否包含既定的类名
if (div.classList.contains('bd') && !div.classList.contains('disabled')) {
  // 执行操作
}

// 迭代类名
for (var i = 0, len = div.classList.length; i < len; i++) {
  doSomething(div.classList[i])
}
```

**删除类名**

```html
<div class="bd user disabled">...</div>
```

旧的方式

```js
// 删除 'user' 类
// 首先，取得类名字符串并拆成数组
var classNames = div.className.split(/\s+/)

// 找到要删除的类名
var pos = -1,
    i,
    len
for (i = 0, len = classNames.length; i < len; i++) {
  if (classNames[i] == 'user') {
    pos = 1
    break
  }
}

// 删除类名
classNames.splice(i, 1)

// 把剩下的类名拼成字符串并重新设置
div.className = classNames.join(' ')
	
```

新的方式

```js
div.classList,remove('user')
```

## 3.2 焦点管理

### document.activeElement 属性

☑︎ 读：这个属性始终会引用 DOM 中当前获得了焦点的元素。

☑︎ 用途：查询文档是否获得了焦点，以及确定文档是否获得了焦点，这两个功能是最重要的用途是提供 Web 应用的无障碍性。

```
元素获得焦点的方式
☑︎ 页面加载（文档加载期间，document.activeElement 为 null；文档加载完成时，document.activeElement 中保存的是 document.body）
☑︎ 用户输入（通常是通过按 Tab 键）
☑︎ 在代码中调用 focus() 方法
```

☑︎ 兼容性：`IE4+` `Firefox3+` `Safari4+` `Chrome` 和 `Opera8+`

## 3.3 HTMLDocument 的变化

### document.readState

☑︎ 读： `loading`  正在加载文档，`complete` 已经加载完文档

☑︎ 用途：通过它来实现一个指示文档已经加载完成的指示器。

☑︎ 价值：在这个属性得到广泛支持之前，要实现这样一个指示器，必须借助 `onload` 时间处理程序设置一个标签，表明文档已经加载完毕。

☑︎ 兼容性：`IE4+` `Firefox3.6+` `Safari` `Chrome` `Opera9+`

```js
if (document.readyState == 'complete') {
  // 执行操作
}
```



### document.compatMode

☑︎ 读：`CSS1Compat` 标准模式，`BackCompat` 混杂模式。

☑︎ 用途：自从 IE6 开始区分渲染页面的模式是标准还是混杂的，检测页面的兼容模式就称为浏览器的必要功能。

☑︎ 兼容性：`IE6+` `Firefox` `Safari3.1+` `Opera` `Chrome`

```js
if (document.compatMode == 'CSS1Compat') {
  alert('Standards mode')
}
else {
  alert('Quirks mode')
}
```



### document.head

☑︎ 读：引用文档的 `<head>` 元素

☑︎ 兼容性：`Chrome` `Safari5`

```js
var head = document.head || document.getElementsByTagName('head')[0]
```



## 3.4 字符集属性

#### document.charset

☑︎ 读：文档中实际使用的字符集，默认 `UTF-16`

☑︎ 写：指定新字符集。

☑︎ 兼容性：`IE` `Firefox` `Safari` `Opera` `Chrome`

```js
alert(document.charset) // 'UTF-16'
document.charset = 'UTF-8'
```

#### document.defaultCharset

`只读`

☑︎ 读：根据默认浏览器及操作系统的设置，当前文档默认的字符集应该是什么。

☑︎ 兼容性：`IE` `Safari` `Chrome`

```js
// 检查是否没有使用默认字符集
if (document.charset != document.defaultCharset) {
  alert('Custom character set being used.')
}
```

## 3.5 自定义数据属性

### element.dataset

☑︎ 类型： `DOMStringMap`

☑︎ 读：保存着元素上每个 `data-自定义属性名` 键值对的映射。

☑︎ 用途：如果需要给元素添加一些已不见的数据以便进行其他处理，那就咬用到自定义属性。

☑︎ 兼容性：`Firefox6+` `Chrome`

```html
<div id="myDiv" data-appId = "12345" data-myname="sean"></div>div>
```

```js
// 本例中使用的方法仅用于演示
var div = document.getElementById('myDiv')

// 取得自定义属性的值
var appId = div.dataset.appId
var myName = div.dataset.myname

// 设置值
div.dataset.appId = 23456
div.dataset.myname = 'Michael'

// 有没有 'myname' 值呢？
if (div.dataset.myname) {
  alert('Hello, ' + div.dataset.myname)
}
```



## 3.6 插入标记

一般来说，在插入大量新 HTML 标记时，用 `inserHTML`、`outerHTML`、`insertAdjacentHTML()` 比通过多次 DOM 操作先创建节点再插入的方式效率要高很多。

### 3.6.1 element.innerHTML

☑︎ 读：与调用元素的所有子节点（包括元素、注释和文本节点）对应的 HTML 标记。

☑︎ 写：根据指定的值创建新的 DOM 树，然后用这个 DOM 树完全替换调用元素原先的所有子节点。如果设置的值仅仅是文本而没有 HTML 标签，那么结果就是设置纯文本。
☑︎ 行为差异：不要指望所有浏览器返回的 innerHTML 值完全相同

| 浏览器                   | innerHTML                    |
| --------------------- | ---------------------------- |
| IE、Opera              | 将所有标签转换为大写形式                 |
| Safari、Chrome、Firefox | 原原本本地按照文档中的格式返回 HTML，包括空格和缩进 |
**读**

```html
<div id="content"> 
  <p>This is <strong>paragragph</strong> with a list following it.</p>
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </ul>
</div>
```

```js
var content = document.getElementById('content')
content.innerHTML
// <p>This is <strong>paragragph</strong> with a list following it.</p>
// <ul>
//  <li>Item 1</li>
//  <li>Item 2</li>
//  <li>Item 3</li>
// </ul>
```
**写**

```js
div.innerHTML = 'Hello & welcome, <b>\"reader\"!</b>'
```

```html
<div id="content">Hello &amp; welcome, <b>&quot;reader&quot;!</b></div>
```

#### (1) 限制

**插入 script 标签**

这时，除了 IE8- 在一些条件下会执行 `<script>`中的脚本外，其它浏览器并不会。

```
iE8- 执行通过 innerHTML 插入的 script 标签中的脚本的条件：
☑︎ 必须为 script 标签指定 defer 属性
☑︎ script 元素必须位于 scoped element 之后(如果不满足该条件，却存在 script 标签，全部字符串都将无效，替代以插入一个空字符串)
```



```js
/* IE8- 中需要特殊处理*/ 
// 不满足条件的情况
div.innerHTML = '<script defer>alert('hi');</script>' // 插入 ''

// 满足条件的情况(脚本执行后需要删除前面的 scoped element)
div.innerHTML = '_<script defer>alert('hi');</script>'
div.innerHTML = '<div>&nbsp;</div><script defer>alert('hi');</script>' // 空 div 无法生成 element scoped，因此需要加点儿内容
div.innerHTML = '<input type="hidden"><script defer>alert('hi');</script>' // 推荐
```



**插入 style 标签**

和 script 不同的是，除了 IE8- ，所有浏览器都能正确插入 style 标签且正常工作。

```
IE8- 中插入 style 标签生效的必要条件和插入 script 标签的需要满足的第二个条件类似，即
☑︎ style 元素必须位于 scoped element 之后(如果不满足该条件，却存在 style 标签，全部字符串都将无效，替代以插入一个空字符串)
```

```js
/* IE8- 中需要特殊处理*/
// 错误的情况
div.innerHTML = '<style type="text/css">body { background-color: red; }</style>'

// 正确的情况
div.innerHTML = '_<style type="text/css">body { background-color: red; }</style>'
div.removeChild(div.firstChild)
```

**不支持 innerHTML 属性的标签**

```
☑︎ col
☑︎ colgroup
☑︎ frameset
☑︎ head
☑︎ html
☑︎ style
☑︎ table
☑︎ tbody
☑︎ thead
☑︎ tfoot
☑︎ tr
☑︎ title(IE8-)
```

**在 XHTML 文档中 Firefox 的限制**

Firefox 对在内容类型为`application/xhtml+xml` 的 XHTML 文档中设置 `innerHTML`有严格的限制。在 XHTML 文档中使用 innerHTML 时，XHTML 代码必须完全符合要求。如果代码格式不正确，设置 innerHTML 将会静默的失败。

#### (2) window.toStaticHTML()

☑︎ 用途：对字符串进行无害化处理。

☑︎ 参数：一个 HTML 字符串。

☑︎ 返回值：一个经过无害化处理的字符串，即从源 HTML 中删除所有脚本节点(`<script>` 和 `<style>`)和事件处理程序属性。

☑︎ 兼容性：`IE8`

```js
var text = '<a href="#" onclick="alert(\'hi\')">Click Me</a>'
var sanitized = window.toStaticHTML(text) // IE8 only
alert(sanitized) // <a href="#">Click Me</a>
```

### 3.6.2 element.outerHTML

☑︎ 读：调用它的元素及所有子节点的 HTML 标签。

☑︎ 写：根据指定的 HTML 字符串创建新的 DOM 子树，然后用这个 DOM 子树完全替换调用元素。

☑︎ 兼容性：`IE4+` `Safari4+` `Chrome` `Opera8+` `Firefox8+`

☑︎ 行为差异：和 innerHTML 性质一样。

```js
div.outerHTML = '<p>This is a paragraph.</p>'
```

等价于

```js
var p = document.createElement('p')
p.appendChild(document.createTextNode('This is a paragraph.'))
div.parentNode.replaceChild(p, div)
```

### 3.6.3 element.insertAdjacentHTML()

☑︎ 用途：在特定的位置插入 HTML 字串儿。

☑︎ 参数1: 表示插入位置的字符串

| 参数1值        | 说明                                  |
| ----------- | ----------------------------------- |
| beforebegin | 在当前元素之前插入一个紧邻的同辈元素                  |
| afterbegin  | 在当前元素之前插入一个紧邻的同辈元素                  |
| beforeend   | 在当前元素之下插入一个新的子元素或在最后一个子元素之后再插入新的子元素 |
| afterend    | 在当前元素之后掺入一个紧邻的同辈元素                  |

☑︎ 参数2: 要插入的 HTML 文本（如果无法解析会抛出错误）

```js
// 作为前一个同辈元素插入
element.insertAdjacentHTML('beforebegin', "<p>Hello World!</p>")

// 作为第一个子元素插入
element.insertAdjacentHTML('afterbegin', "<p>Hello World!</p>")

// 作为最后一个子元素插入
element.insertAdjacentHTML('beforeend', "<p>Hello World!</p>")

// 作为后一个同辈元素插入
element.insertAdjacentHTML('afterend', "<p>Hello World!</p>")
```

☑︎ 兼容性：`IE` `Firefox8+` `Safari` `Opera` `Chrome`

### 3.6.4 内存与性能问题

说明：假设某个元素有一个事件处理程序或者引用了一个 JavaScript 对象作为属性，在使用 `innerHTML`、 `outerHTMl`、 `inserAdjacentHTML()` 方式将该元素从文档树中删除后，元素与时间处理程序或 JavaScript 对象之间的绑定关系在内存中并不一定会被删除。

**建议**

☑︎ 在使用 `innerHTML`、`outerHTML`、`insertAdjacentHTML()` 时，最好先收工删除要被替换的元素的所有时间处理程序和 JavaScript 对象属性。

☑︎ 虽然使用前面提到的方式会创建 HTML 解析器，相比直接操作 DOM 效率更高。但创建和销毁 HTML 解析器也会带来性能损失，因此最好的做法是单独构建字符串，然后再一次性地将结果字符串赋值给 innerHTML。



```js
var itemsHTML = ''
for (var i = 0, len = values.length; i < len; i++) {
  itemsHtml += '<li>' + values[i] + '</i>'
}
ul.innerHTML = itemsHtml
```

## 3.7 element.scrollIntoView()

☑︎ 用途：通过滚动浏览器窗口或某个容器元素，调用元素就可以出现在视口中。

☑︎ 参数：true(默认) 窗口滚动之后会让调用元素的顶部与视口顶部尽可能平齐，false 调用元素会尽可能全部出现在视口中（可能的话会与适口顶部平齐）。

☑︎ 兼容性：`IE` `Firefox` `Safari` `Opera`

```
document.forms[0].scrollIntoView()
```



# 4 专用扩展

## 4.1 文档模式

**说明**：`文档模式` 决定了可以使用什么功能

```
☑︎ 可以使用哪个级别的 CSS
☑︎ 可以在 JavaScript 中使用哪些 API
☑︎ 如何对待文档类型(doctype)
```

| 4种文档模式 | 说明       | 备注                                       |
| ------ | -------- | ---------------------------------------- |
| IE5    | 混杂模式     | IE8+ 中的新功能都无法使用。                         |
| IE7    | IE7 标准模型 | IE8+ 的新功能无法使用。                           |
| IE8    | IE8 标准模式 | IE8+ 中的新功能(Selectors API、更多 CSS2 级选择符和某些 CSS3 功能，还有一些 HTML5 的功能)可以使用；IE9 中的新功能无法使用。 |
| IE9    | IE9 标准模式 | IE9 中的新功能(ECMAScript5、完整的 CSS3、更多 HTML5 功能)都可以使用。 |

☑︎ 兼容性：`IE8+`

☑︎ 默认文档模式：浏览器会通过文档类型声明来确定是使用最佳的可用文档模式，还是使用混杂模式。

### 设置浏览器的渲染模式

**有两种方式：**

☑︎ 使用 HTTP 头部信息 `X-UA-Compatible` 

☑︎ 设置 `<meta>` 标签: `<meta http-equiv="X_UA_Compatible" content="IE=IEVersion">`

| IEVersion  | 文档模式    | 文档模式（如果有文档类型声明） |
| ---------- | ------- | --------------- |
| Edge       | 最新的文档模式 | 忽略              |
| EmulateIE9 | IE5     | IE9             |
| EmulateIE8 | IE5     | IE8             |
| EmulateIE7 | IE5     | IE7             |
| 9          | IE9     | 忽略              |
| 8          | IE8     | 忽略              |
| 7          | IE7     | 忽略              |
| 5          | IE5     | 忽略              |

```html
<!-- 让文档模式像在 IE7 中一样 -->
<meta http-equiv="X_UA_Compatible" content="IE=EmulateIE7">

<!-- 不打算考虑文档类型声明，直接使用 IE7 标准模式 -->
<meta http-equiv="X_UA_Compatible" content="IE=EmulateIE7">
```



### 读取当前页面的文档模式

**document.documentMode**

`只读`

☑︎ 读：当前页面使用的是什么文档模式(IE8 返回文档模式字串，IE9 返回 5、7、8、9)。

☑︎ 兼容性：`IE8+`

☑︎ 价值：知道页面采用的是什么文档模式，有助于理解页面的行为方式。

```js
var mode = document.documentMode
```

## 4.2 element.children

`只读`

**说明：**由于 IE8- 与其它浏览器在处理文本节点中的空白符时有差异，因此就出现了 children 属性。除了只包含 `Element` 类型的子节点外，和 `element.childNodes` 没有区别。

☑︎ 类型：`HTMLCollection`

☑︎ 读：所有 `Element` 类型的子节点

☑︎ 兼容性：`IE8-(会包含注释节点)` `IE9`  `Firefox3.5` `Safari2(有 BUG)` `Safari3` `Opera8` `Chrome`

```js
var childCount = element.children.length
var firstChild = element.children[0]
```

## 4.3 element.contains()

☑︎ 参数：要检测的后代节点。

☑︎ 返回值：true 被检测的节点是后代节点，false 被检测的节点不是后代节点

☑︎ 价值：不通过早 DOM 文档树中查找即可获得这个信息。

☑︎ 兼容性：`IE` `Firefox9+` `Safari` `Opera` `Chrome`

```js
// 测试 body 是不是 html 的后代
alert(document.documentElement.contains(document.body)) // true
```

**扩展**

----

### element.compareDocumentPosition()

`DOM Level 3`

☑︎ 用途：确定节点之间的关系。

☑︎ 参数：要检测的节点

☑︎ 返回：一个表示该关系的位掩码(bitmask)

| 掩码   | 节点关系                      |
| ---- | ------------------------- |
| 1    | 无关（给定的节点不在当前文档中）          |
| 2    | 居前（给定的节点在 DOM 树中位于参考节点之前） |
| 4    | 居后（给定的节点在 DOM 树中位于参考节点之后） |
| 8    | 包含（给定的节点是参考节点的祖先）         |
| 16   | 被包含（给定的节点是参考节点的后代）        |

☑︎ 兼容性：`IE9+` `Firefox` `Safari` `Opera9.5+` `Chrome`

```js
var result = document.documentElement.compareDocumentPosition(document.body)
alert(!!(result & 16))
```

**一个通用的 contains 函数**

```js
/**
* 检测  otherNode 是不是 refNode 的子节点
* @param {Element} refNode 参考节点
* @param {Element} otherNode 被检测的节点
* @param {booleam} true 是子节点，false 不是子节点
*/
function contains (refNode, otherNode)
{
  // 对 contains() 进行能力检测
  if (typeof refNode.contains == 'Function' &&
      // 如果是 webkit ，那么 webkit 的版本号不能小于 522，因为 webkit 小于 522 的 safari 中 contains() 有 bug
     (!client.engine.webkit || client.engine.webkit >= 522)) {
       return refNode.contains(otherNode)
  }
  // 对 compareDocumentPosition() 进行能力检测
  else if (typeof refNode.compareDocumentPosition == 'function') {
	return !!(refNode.compareDocumentPosition(otherNode) & 16)
  }
  // 往上层节点递归，如果能找到 refNode ，则说明 otherNode 时其子节点
  else {
    var node = otherNode.parentNode
    do {
      if (node === refNode) {
        return true
      }
      else {
        node = node.parentNode
      }
    } while (node !=== null)
    return false
  }
}
```



## 4.4 插入文本

`innerText` 和 `outerText` 没有被纳入 HTML 5 规范。

### innerText

☑︎ 读：节点包含的所有文本拼接成的字符串。

☑︎ 写：将所有子节点替换为一个文本节点，会对文本中存在的 HTML 语法字符进行编码。

☑︎ 兼容性：`IE4+` `Safari3+` `Opera8+` `Chrome`

☑︎ 技巧：可以利用 `innerText` 属性过滤掉 HTML 标签

**读**

```html
<div id="content">
  <p>This is a <strong>paragragh</strong> with a list following it.</p>  
  <ul>
  	<li>Item 1</li>  
  	<li>Item 2</li>  
  	<li>Item 3</li>  
  </ul>
</div>
```

```js
// 不同浏览器处理空白符的方式不同，因此输出的文本不一定会包含原始 HTMl 代码中的缩进。
This is a paragragh with a list following it.
Item 1
Item 2
Item 3
```

**写**

```js
div.innerText = 'Hello & welcome, <b>"reader"</b>!'
```

```html
<div id="content">Hello &amp; welcome, &lt;b&gt;&quot;reader&quot;!&lt;/b&gt;</div>
```

**过滤 HTML 标签**

```js
// 指定这行代码后，就用原来的文本内容替换了容器元素中的所有内容（包括子节点，因而也就去掉了 HTML 标签）。
div.innerText = div.innerText
```

**扩展**

----

### element.textContent

`DOM Level 3`

**说明：** 类似 innerText 属性，区别在于是否 script 和 style 标签中的文本。

```
☑︎ textContent: 会像返回其它文本一样返回行内的样式和脚本的代码。
☑︎ innerText: 会忽略行内的样式和脚本。
```

☑︎ 兼容性：`IE9+` `Safari3+` `Opera10+` `Chrome`

**封装一个通用的函数**

```js
// 读取元素的文本
function getInnerText (element) {
  return (typeof element.textContent == 'string') ? element.textContent : element.innerText;
}

// 向元素中写入文本
function setInnerText (element, text) {
  if (typeof element.textContent == 'string') {
    element.textContent = text
  }
  else {
    element.innerText = text
  }
}

setInnerText(div, 'Hello world!')
alert(getInnerText(div)) // 'Hello world!'
```

### outerText 属性

**说明：**除了作用范围扩大到了包含调用它的节点之外，`outerText` 与 `innerText` 基本上没有多大区别。

☑︎ 读：和 `innerText` 完全一样，因为返回的是节点內的所有文本，包不包括最外层的节点没有区别。

☑︎ 写：不只是替换他的子节点，而是会替换整个元素。本质上，新的文本节点会完全取代调用 `outerText` 的元素。此后，该元素就从文档中被删除，无法访问。

☑︎ 兼容性：`IE4+` `Safari3+` `Opera8+` `Chrome`

☑︎ 建议：由于这个属性导致元素不存在，因此并不常用。



```js
div.outerText = 'Hello world!'
```

等价于

```js
var text = document.createTextNode('Hello world!')
div.parentNode.replaceChild(text, div)
```



## 4.5 滚动

几个对 `HTMLElement` 类型扩展的专有方法，只有`Safari` `Chrome`支持。

### element.scrollIntoViewNeeded(alignCenter)

**说明**：只有当前元素在视口中不可兼得情况下，才滚动浏览器窗口或容器元素，最终让它可见。如果当前元素在视口中可见，这个方法什么也不做。

☑︎ 功能：滚动到指定元素。

☑︎ 参数：boolean,  是否尽量将元素先是在视口中部（垂直方向）。

### element.scrollByLines(lineCount)

☑︎ 功能：将元素的内容滚动指定的行高。

☑︎ 参数：number, 滚动几行。可正（向下滚）可负（向上滚）。

### element.scrollByPages(pageCount)

☑︎ 功能：将元素的内容滚动 pageCount 页，也就是说具体高速有元素的高度和 pageCount 共同决定。

☑︎ 参数：滚动多少页。

```js
// 将页面主体滚动 5 行
document.body.scrollByLines(5)

// 在当前元素不可见的时候，让它进入浏览器的视口
document.images[0].scrollIntoViewIfNeeded()

// 将页面主题往回滚动 1 页
document.body.scrollByPages(-1)
```

