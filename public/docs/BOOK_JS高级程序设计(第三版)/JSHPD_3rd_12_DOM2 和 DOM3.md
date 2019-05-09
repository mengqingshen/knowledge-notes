---
title: 12 Dom扩展
categories: [JS高级程序设计(第三版)]
tag:
    - js
date: 2017-04-13
---



## 1 DOM 变化

| DOM 规范      | 主要内容                                   |
| ----------- | -------------------------------------- |
| DOM1        | 主要定义的是 `HTML` 和 `XML` 文档的底层结构。         |
| DOM2 和 DOM3 | 在 DOM1 的基础上引入了更多的交互能力，也支持了更高级的 XML 特性。 |

**DOM 变化**

| DOM 2 模块            | 说明                           |
| ------------------- | ---------------------------- |
| core                | 在 DOM1 的基础上构建，为节点添加了更多属性与方法。 |
| views               | 为文档定义了基于央视信息的不同视图。           |
| events              | 说明了如何使用时间与 DOM 文档交互。         |
| style               | 定义了如何以编程方式来访问和改变 CSS 样式信息。   |
| Traversal and Range | 引入了遍历 DOM 文档和选择其特定部分的新接口。    |
| HTML                | 在 DOM1 的基础上，添加了更多属性、方法和新接口。  |

| DOM 3 模块      | 说明      |
| ------------- | ------- |
| XPath         | 见[18]() |
| Load and Save | 见[18]() |

**检测浏览器对 DOM 的支持情况**

```js
// DOM 2 模块检测
var isDOM2CoreSupported = document.implementation.hasFeature('Core', '2.0')
var isDOM2HTMLSupported = document.implementation.hasFeature('HTML', '2.0')
var isDOM2ViewsSupported = document.implementation.hasFeature('Views', '2.0')
var isDOM2XMLSupported = document.implementation.hasFeature('XML', '2.0')

// DOM 3 模块检测
var isDOM3CoreSupported = document.implementation.hasFeature('Core', '2.0')
```

### 1.1 针对 XML 命名空间的变化

**XML 也有命名空间？**

是的，命名空间使得不同的 XML 文档的元素可以混合在一起，共同构成格式良好的文档，而不发生明明冲突。

**HTML 有命名空间吗？**

严格说来， `HTML` 不支持 XML 命名空间，但 `XHTML` 支持。

**如何在 XHTML 中指定命名空间？**

```html
<html xmlns[:可选前缀]="文档说明地址">
	...
</html>
```

**前缀有啥用？**

如果为命名空间定义了一个名为 `x` 的前缀，则所有 XHTML 的元素都以需要以 `x` 前缀开头。

```html
<x:html xmlns:x="http://www.w3.org/1999/xhtml">
  <x:head></x:head>
  <x:body x:class="home">Hello World!</x:body>
</x:html>
```

**指定命名空间有啥用？**

在只基于一种语言编写 XML 文档的情况下，命名空间实际上也没有什么用。不过，在混合使用两种语言的情况下，命名空间的用处就非常大了。

例如：混合 `XHTML` 和 `SVG` 语言

```html
<html xmlns="httpdea://www.w3.org/1999/xhtml">
  <head>
    <title>Example XHTML page</title>
  </head>
  <body>
    <!-- 该文档是一个 XHTML 文档（不允许有 svg 相关标签），但因为有了命名空间，这里的 svg 代码仍然有效 -->
    <s:svg xmlns:s="http://www.w3.org/2000/svg"
         version="1.1"
         viewBox="0 0 100 100"
         style="width:100%; height: 100%;">
   	  <s:rect x="0"
            y="0"
            width="100"
            height="100"
            style="fill:red"/>
    </svg>
  </body>
</html>
```

**多个命名空间的问题？**

```
在混合和其它非 `XHTML` 语言的 `XHTML ` 中，存在不止一个命名空间，带来的问题就是:
☑︎ 在创建一个元素时，这个元素属于哪个命名空间呢？
☑︎ 在查询一个特殊标签名时，应该将结果包含在哪个命名空间中呢？
```

`DOM2 Core` 通过大多数 `DOM1` 级方法提供特定与命名空间的版本解决了这些问题。

#### Node 类型

| DOM2 Core 提供的特定与命名空间的属性 | 说明                           |
| ----------------------- | ---------------------------- |
| localName               | 不带命名空间前缀的节点名称。               |
| namespaceURI            | 命名空间 URI 或者（在未指定的情况下是） null。 |
| prefix                  | 命名空间前缀或者（在未指定的情况下是）null。     |

```js
/* 以前面的 demo 为例 */
// html
var html = document.documentElement
html.tagName // 'html'
html.localName // 'html'
html.namespaceURI // 'http://www.w3.org/1999/xhtml'

// s:svg
var svg = document.getElementsByTagName('s:svg')[0]
svg.tagName // 's:svg'
svg.localName // 'svg'
svg.namespaceURI // 'http://www.w3.org/2000/svg'
```

| DOM3 core 提供的与命名空间有关的办法       | 说明                                       |
| ----------------------------- | ---------------------------------------- |
| isDefaultNamespaceURI(prefix) | 在指定的 namespaceURI 是当前节点的默认命名空间的情况下返回 true |
| lookupNamespaceURI(prefix)    | 返回给定 prefix 的命名空间                        |
| lookupPrefix(namespaceURI)    | 返回给定 namespaceURI 的前缀                    |

```js
alert(document.body.isDefaultNamespace('http://www.w3.org/1999/xhtml')) // true

// 假设 svg 中包含着对 <s:svg> 的引用
alert(svg.lookupPrefix('http://www.w3.org/2000/svg')) // 's'
alert(svg.lookupNamespaceURI('s')) // http://www.w3.org/2000/svg
```

#### Document 类型
| DOM2 core 提供的与命名空间有关的新方法                 | 说明                                       |
| ---------------------------------------- | ---------------------------------------- |
| createElementNS(namespaceURI, tagName)   | 使用给定的 tagName 创建一个属于命名空间 namespaceURI 的新元素 |
| createAttributeNS(namespaceURI, attributeName) | 使用给定的 attributeName 创建一个属于命名空间 namespaceURI 的新特性 |
| getElementsByTagNameNS(namespaceURI, tagName) | 返回属于命名空间 namespaceURI 的 tagName 元素的 NodeList。 |

```js
// 创建一个新的 svg 元素
var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')

// 创建一个属于某个命名空间的新特性
var att = document.createAttributeNS('http://www.somewhere.com', 'random')

// 取得所有 XHTML 元素
var elems = document.getElementsByTagNameNS('http://www.w3.org/1999/xhtml', '*')
```

#### Element 类型

| DOM2 core 提供的与命名空间相关的新方法                 | 说明                                       |
| ---------------------------------------- | ---------------------------------------- |
| getAttributeNS(namespaceURI, localName)  | 取得属于命名空间 namespaceURI 且名为 localName 的特性  |
| getAttributeNodeNS(namespaceURI, tagName) | 返回属于命名空间 namespaceURI 的 tagName 元素的 NodeList。 |
| hasAttributeNS(namespaceURI, localName)  | 确定当前元素是否有一个名为 localName 的特性，而且该特性的命名空间是 namespaceURI。 |
| hasAttribute(attrName)                   | 同上，当不区分命名空间。                             |
| removeAttributeNS(namespaceURI, localName) | 删除属于命名空间 namespaceURI 且名为 localName 的特性。 |
| setAttributeNS(namespaceURI, qualifiedName, value) | 设置属于命名空间 namespaceURI 且名为 qualifiedName 的特性的值为 value。 |
| setAttributeNodeNS(attNode)              | 设置属于命名空间 namespaceURI 的特性节点              |

#### NamedNodeMap 类型
| DOM2 core 提供的与命名空间相关新方法                  | 说明                                      |
| ---------------------------------------- | --------------------------------------- |
| getNamedItemNS(namespaceURI, localName)  | 取出命名空间 namespaceURI 且名为 localName 的项。   |
| removeNamedItemNS(namespaceURI, localName) | 移除属于命名空间 namespaceURI 且名为 localName 的项。 |
setNamedItemNS(node):添加 node，这个节点已经实现制定了命名空间信息。

### 1.2 其它方面的变化

`DOM2 Core` 对 DOM 的其他部分的变化，和 XML 无关，而是更倾向于确保 API 的可靠性及完整性。

#### DocumentType 类型
`DOM2 Core`
| 新增成员           | 说明              |
| -------------- | --------------- |
| publicId       | 文档类型声明信息段之一     |
| systemId       | 文档类型声明信息段之一     |
| internalSubset | 包含在文档类型声明中的额外定义 |

```html
<!DOCTYPE HTML PUBLIC
  "-//W3C//DTD HTML 4.01//EN"
  "http://www.w3.org/TR/html4/strict.dtd"
  [<!ELEMENT name (#PCDATA)>] >
```

```js
document.doctype.publicId // '-//W3C//DTD HTML 4.01//EN'
document.doctype.systemId // 'http://www.w3.org/TR/html4/strict.dtd'
document.doctype // [<!ELEMENT name (#PCDATA)>]
```

#### Document 类型
`DOM2 Core`
| 新增成员                  | 说明                                       |
| --------------------- | ---------------------------------------- |
| document.importNode() | 从一个文档中取得一个节点，探究将导入到另一个文档，时期成为这个文档结构的一部分。 |
| document.defaultView  | 指向拥有给定文档的窗口（或框架）                         |

##### importNode()
`DOM2 Core`
☑︎ 说明：每个节点都有一个 `ownerDocument` 属性，表示所属的文档。如果调用 `appendChild()` 时传入的节点属于不同的文档会导致报错。而 `importNode()` 会返回一个新节点，这个节点的 `ownerDocument` 是当前文档，因此不会报错。

| 参数   | 类型          | 说明      |
| ---- | ----------- | ------- |
| 1    | HTMLElement | 要复制的节点  |
| 2    | Boolean     | 是否复制子节点 |

☑︎ 返回值：原节点的副本，但能够在当前文档中使用。

```js
var newNode = document.importNode(oldValue, true) // 导入节点及其所有子节点
document.body.appendChild(newNode)
```

##### document.defaultView
☑︎ 兼容性：`IE` 之外的所有浏览器

**扩展**
----

在 IE 中有一个等价的属性 `document.parentWindow`，因此，要确定文档的归属窗口，可以使用以下代码。

```js
var parentWindow = document.defaultView || document.parentWindow
```

##### document.implementation.createDocumentType()
`DOM2 Core`
☑︎ 功能：创建一个新的 `DocumentType` 节点
参数|说明
---—|---|---
1|文档类型名称
2|publicId
3|systemId

☑︎ 用途：由于即有文档类型不能改变，因此 createDocumentType() 只能在创建新文档时有用

```js
// 创建一个新的 HTML 4.01 Strict 文档类型
var doctype = document.implementation.createDocumentType('html',
                                                         '-//W#C//DTD HTML 4.01//EN',
                                                         'http://www.w3.org/TR/html4/strict.dtd')
```

##### document.implementation.createDocument()
`DOM2 Core`
☑︎ 功能：创建新文档

| 参数   | 说明                    |
| ---- | --------------------- |
| 1    | 针对文档中元素的 namespaceURI |
| 2    | 文档元素的标签名              |
| 3    | 新文档的文档类型              |

```js
// 创建一个没有命名空间的新 XML 文档，文档元素为 <root> ，而且没有指定文档类型
var doc = document.implementation.createDocumet('', 'root', null)
```

```js
var doctype = document.implementation.createDocumentType('html',
  ' -//W#C//DTD XHTML 1.0 Strict//EN',
  'http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd')

// 创建一个带有适当命名空间和文档类型的心 XHTML 文档
var doc = document.implementation.createDocument('http://www.w3.org/1999/xhtml',
  'html',
  doctype)
```

##### document.implementation.createHTMLDocument()
`DOM2 HTML`
☑︎ 功能：创建一个完整的 HTML 文档。
☑︎ 参数：创建文档的标题（放在 `<title>` 元素中的字符串）
☑︎ 返回：新的 HTML 文档(`HTMLDocument` 实例，因而具有所有该类型的所有属性和方法，包括 `title` 和 `body` 属性)
☑︎ 兼容性：`Safari` `Opera` `Chrome`

```js
var htmlDoc = document.implementation.createHTMLDocument('New Doc')
htmlDoc.title // 'New Doc'
typeof htmlDoc.body // 'object'
```

#### Node 类型
##### document.body.isSupported()
`DOM2`
☑ ︎说明：类似 Dom1 的`document.implementation.hasFeature()`，用于确定当前节点具有什么能力。
| 参数   | 说明    |
| ---- | ----- |
| 1    | 特性名   |
| 2    | 特性版本号 |

☑ 返回：`true` 如果浏览器实现了相应特性，`false` 没有实现该特性。
☑ 注意：由于不同实现在决定什么特性返回 true 或 false 时并不一致，这个方法同样也存在于 `hasFeature()` 方法相同的问题。为此，在确定某个特性是否可用时，最好还是使用能力检测。

```js
if (document.body.isSupported('HTML', '2.0')) {
  // 执行只有 DOM2 HTML 才支持的操作
}
```

##### element.isSameNode()
☑ 用途：比较是否引用同一个节点。
☑ 参数：节点对象。
☑ 返回：true 引用同一个节点，false 不是同一个节点

```js
var div1 = document.createElement('div')
div1.setAttribute('class', 'box')

var div2 = document.createElement('div')
div2.setAttribute('class', 'box')

div1.isSameNode(div1) // true
div1.isSameNode(div2) // false
```

##### element.isEqualNode()
☑ 用途：判断两个节点是否相同。

```
☑ 节点类型相同；
☑ 节点属性相同；
☑ 如果有子节点，子节点也要一一对应相同。
```
☑ 参数：节点对象。

```js
var div1 = document.createElement('div')
div1.setAttribute('class', 'box')

var div2 = document.createElement('div')
div2.setAttribute('class', 'box')

div1.isEqualNode(div2) // true
```
☑ 返回：true 引用同一个节点，false 不是同一个节点

##### element.setUserData()
`DOM3`
☑ 说明：将数据指定给节点。

| 参数   | 类型                               | 说明    |
| ---- | -------------------------------- | ----- |
| 1    | string                           | 要设置的键 |
| 2    | any                              | 实际的数据 |
| 3    | 处理函数, 会在节点被复制、删除、重命名活着引入一个文档是调用。 |       |


| 处理函数(参数3)接受5个参数 | 说明                                 |
| --------------- | ---------------------------------- |
| 1               | 表示操作类型的数值(1 复制, 2 导入, 3 删除, 4 重命名) |
| 2               | 数据键                                |
| 3               | 数据值                                |
| 4               | 源节点(删除节点时为 null)                   |
| 5               | 目标节点(复制节点时为 null)                  |

```js
document.body.setUserData('name', 'Nichoalas', function () {})
```

##### element.getUserData()
☑ 参数：键
☑ 返回：键对应的值。

```js
var div = document.createElement('div')
div.setUserData('name', 'Nicholas', function (operation, key, value, src, dest) {
  // 节点被复制时，连同节点的 user data 一起复制过去
  if (operation == 1) {
    dest.setUserData(key, value, function () {})
  }
})

var newDiv = div.cloneNode(true)
newDiv.getUserData('name')
```
#### 框架
框架有两种
☑ 框架: `HTMLFrameElement`
☑ 内嵌框架：`HTMLIFrameElement`

##### iframe.contentDocument
☑ 类型：`Document`
☑ 说明：因为该属性是 Document 类型的实例，因此可以像使用其他 HTML 文档一样使用它，包括所有属性和方法。

☑ 限制：该属性的访问收到跨源泉策略的限制。如果某个框架中的页面来自其他域活着不同子域，那么妖访问这个框架中的文档对象就会导致错误。

☑ 兼容性：`Opera` `Firefox` `Safari` `Chrome` `IE8+`

**扩展**
----
IE8 之前不支持框架中的 `contentDocument` 属性，但有一个名叫 `contentWindow` 的属性，该属性返回框架的 `window` 对象，因此可以通过 `window.document` 来替代 `contentWindow`。

因此，兼容性更好的用法如下：

```js
var iframe = document.getElementById('myIframe')
var iframeDoc = iframe.contentDocument || iframe.contentWindow.document
```

## 2 样式

在 HTML 中定义样式的 3 种方式：

1. 通过`<link/>` 元素包含外部样式表文件；
2. 使用`<style/>`元素定义嵌入式样式；
3. 使用`style`特性定义针对特定元素的样式。


```js
// 浏览器是否支持 DOM2 css 对 css 的支持
var supportsDOM2CSS = document.implementation.hasFeature('CSS', '2.0')

// 浏览器是否支持 DOM2 css 对 css2 的支持
var supportsDOM2CSS2 = document.implementation.hasFeature('CSS2', '2.0')
```

### 2.1 访问元素的样式

#### element.style

`DOM2 css`

☑ 说明：包含通过 HTML 的 style 特性指定的所有样式相关信息。

☑ 类型：`CSSStyleDeclaration`

☑ 注意：但不包含与`外部样式表`或`嵌入样式表`层叠而来的样式。

##### element.style.[css样式名]

☑ 读：在 style 特性中指定的所有样式。

```
☑ 对于使用'-'分割的 CSS 属性名，必须将其转换成驼峰大小写形式。
☑ 由于float 是 JS 的保留子，其对应的属性名为 cssFloat(Firefox、Safari、Opera、Chrome) 或 styleFloat(IE)
```

☑ 写：标准模式下所有度量值都必须指定一个度量单位（推荐），否则样式不会生效；混杂模式下有些单位可以省略。

☑ 注意：如果没有为元素设置 `style` 特性，那么`style`对象中可能会包含一些默认的值，但这些值并不能准确地反映该元素的样式信息。

```html
<div id="myDiv" style="background-color: blue; width: 10px; height: 25px"></div>
```

```js
var myDiv = document.getElementById('myDiv')

// 读
myDiv.style.backgroundColor // 'blue'
myDiv.style.widht // '10px'
myDiv.style.height // '25px'

// 写
myDiv.style.backgroundColor = 'red'
myDiv.style.width = '100px'
myDiv.style.height = '200px'
myDiv.style.border = '1px solid black'
```

##### element.style.[属性和方法]
☑ 兼容性：`IE9+` `Firefox` `Safari` `Opera9+` `Chrome`

| 属性或方法                                    | 说明                                       |
| ---------------------------------------- | ---------------------------------------- |
| cssText                                  | 如前所述，通过它能够访问到 style 特性中的 css 代码。         |
| length                                   | 应用给元素的 css 属性的数量。                        |
| parentRule                               | 表示 css 信息的 CSSRule 对象。                   |
| getPropertyCSSValue(propertyName)        | 返回包给定属性值的 CSSValue 对象。                   |
| getPropertyPriority(propertyName)        | 如果给定的属性使用了`!important`设置，则返回 `important`; 否则，返回空字符串。 |
| getPropertyValue(propertyName)           | 返回给定属性的字符串值。                             |
| item(index)                              | 返回给定位置的 css 属性的名称。                       |
| removeProperty(propertyName)             | 从样式中删除给定属性。                              |
| setProperty(propertyName, value, priority) | 将给定属性设置为相应的值，并加上优先权标志(`important` 或者一个空字符串)。 |

**element.style.cssText**
☑ 读：返回浏览器对 `style` 特性中 css 代码的内部表示。
☑ 写：赋给 cssText 的值回重写整个 style 特性的值，以前通过 style 特性指定的样式信息都将丢失。

```js
myDiv.style.cssText = 'width: 25px; height: 100px; background-color: green'
myDiv.style.cssText // 'width: 25px; height: 100px; background-color: green'
```

**element.style.length**
☑ 用途：与 `item()` 方法配套使用，以便迭代在元素中定义的 css 属性。

```js
for (var i = 0, len = myDiv.style.length; i < len; i++) {
  alert(myDiv.style[i]) // 或者 myDiv.style.item(i)
}
```
**element.style[index]**
☑ 用途：替代 `element.style.item()`

```js
var prop, value, i, len
for (i = 0, len = myDiv.style.length; i < len; i++) {
  prop = myDiv.style[i] // 或者 myDiv.style.item[i]
  value = myDiv.style.getPropertyValue(prop)
  alert(prop + ':' + value)
}
```

**getPropertyCSSValue**
☑ 参数：属性名.
☑ 返回：包含另个属性的一个对象。
☑ 兼容性： `IE9+` `Safari3+` `Chrome`
1. cssText: 与 `getPropertyValye()` 返回的值相同；
2. cssValueType: 一个数值常量，表示值的类型

| cssValueType | 代表    |
| ------------ | ----- |
| 0            | 继承的值  |
| 1            | 基本的值  |
| 2            | 值列表   |
| 3            | 自定义的值 |

```js
var prop, value, i, len
for (i = 0, len = myDiv.style.length; i < len; i++) {
  prop = myDiv.style[i]
  value = myDiv.style.getPropertyCSSValue(prop)

  value.cssText
  value.cssValueType
}
```

**removeProperty(property)**
☑ 功能：使用这个方法移除一个属性，意味着将会为该属性应用默认的样式（从其它样式表经层叠而来）。
☑ 用途：在不确定某个给丁的 css 属性拥有什么默认值的情况下，就可以使用这个方法。只要一出相应的属性，就可以为元素应用默认值。

#### 计算的样式
`DOM2 style`
☑ 计算的样式都是只读的，不能修改计算后样式对象中的 css 属性。
☑ 计算后的样式也包含属于浏览器内部样式表的样式信息，因此任何具有默认值的 css 属性都会表现在计算后的样式中。

##### document.defaultView.getComputedStyle()
☑ 功能：获取指定元素的所有 css 样式信息，包括那些从其他样式表层叠而来并影响到当前元素的样式信息。

| 参数   | 说明                                       |
| ---- | ---------------------------------------- |
| 1    | 要取得计算样式的元素                               |
| 2    | 一个为元素字符串（比如 ':after'，设置为 null 则不区分状态，返回所有） |

☑ 返回：一个 `CSSStyleDeclaration`  对象(与 style 属性的类型相同)，其中包含当前元素的所有计算的样式。
☑ 限制

+ 浏览器在处理综合属性(比如 border)的方式不同，不会所有浏览器都有返回值。

☑ 兼容性：`Firefox` `chrome` `Safari` `Opera`

+ IE 不支持，但有个 `element.style.currentStyle` 属性(`CSSStyleDeclaration` 的实例)，包含当前元素全部计算后的样式。
+ Firefox 和 Safari 会将所有颜色转换成 RGB 格式。

☑ 建议：不要试图获取综合属性。

```html
<!DOCTYPE html>
<html>
  <head>
      <title>Computed Styles Example</title>
      <style type="text/css">
          #myDiv {
            background-color: blue;
            width: 100px;
            height: 200px;
          }
      </style>
  </head>
  <body>
	<div id="myDiv" style="background-color: red; border: 1px solid black"></div>
  </body>
</html>
```

```js
var myDiv = document.getElementById('myDiv')
var getComputedStyle = document.defaultView.getComputedStyle(myDiv, null)
computedStyle.backgroundColor // red
computedStyle.width // 100px
computedStyle.height // 200px
computedStyle.border // Opera 浏览器中是 '1px solid black'，其它浏览器不一定
computedStyle.borderWidth // 1px
```

### 2.2 操作样式表
#### CSSStyleSheet 类型
☑ 说明：除了 `CSSStyleSheet` ，还有两种类型的对象可以操作样式表
1. HTMLLinkElement 类型对象 (`<link>`元素包含的样式表)；
2. HTMLStyleElement 类型对象(`<style>`元素中定义的样式表)。

`CSSStyleSheet` 类型相对更加通用一些，它只表示样式表，而不管这些样式表在 HTML 中是如何定义的。上述两个针对元素的类型允许修改 HTML 特性，但 CSSStyleSheet 对象则是一套只读的接口（有一个属性例外）。

☑ 父类：`StyleSheet`

| 继承自 StyleSheet 的接口 | 读写   | 说明                                       |
| ------------------ | ---- | ---------------------------------------- |
| disabled           | 读／写  | 表示样式表是否被禁用的布尔值。将这个值设置为 true 可以禁用样式表。     |
| href               | 读    | 如果样式表是通过 link 标签包含的，则是样式表的 URL；否则，是 null。 |
| media              | 读    | 当前样式表支持的所有媒体类型的集合。                       |
| ownerNode          | 读    | 指向拥有当前样式表的节点的指针。                         |
