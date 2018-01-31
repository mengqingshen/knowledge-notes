---
title: 01 引言(css secrets)
categories: [CSS揭秘]

tag:
  - css
date: 2017-04-19 09:10
typora-copy-images-to: ipic
---

# 1 web 标准

## 1.1 标准的制定过程

![A97AAF5F-6890-4239-9375-E57AE179EB3B](http://o6ul1xz4z.bkt.clouddn.com/2017-04-20-A97AAF5F-6890-4239-9375-E57AE179EB3B.png)

**相关链接**

邮件列表：http://lists.w3.org/Archives/Public/www-style/

电话会议：http://irc.w3.org/

## 1.2 CSS3、CSS4 以及其他传说

**css 版本**

| CSS 版本 | 说明                                       |
| ------ | ---------------------------------------- |
| CSS1   | 发表于 1996 年，它非常短，而且比较简单。                  |
| CSS2   | 发表于 1998 年，定义更加严格，囊括了更多的功能。从 CSS2.1 开始，CSS 规范被打散到不同的模块(规范)中，每个模块都可以独立更新版本。 |
| CSS3   | 实际上没有定义过 CSS3 这个定义，CSS3 指的是一个非正式的集合，它包括 CSS 规范第三版再加上一些版本号还是 1 的新规范。实际上，CSS 的各个模块在近些年里以不同的速度在推进。 |

** css3 规范的模块**

[css 语法](http://w3.org/TR/css-syntax-3)
[css 层叠与继承](http://w3.org/TR/css-values-3)
[css 颜色](http://w3.org/TR/css3-color)
[选择符](http://w3.org/TR/selectors)
[css 背景与边框](http://w3.org/TR/css3-background)
[css 值与单位](http://w3.org/TR/css-values-3)
[css 文本排版](http://w3.org/TR/css-text-3)
[css 文本装饰效果](http://w3.org/TR/css-text-decor-3)
[css 字体](http://w3.org/TR/css3-fonts)
[css 基本 UI 特性](http://w3.org/TR/css3-ui)
[css 变形](http://w3.org/TR/css-transforms-1)
[图像混合效果](http://w3.org/TR/compositing-1)
[css 遮罩](http://w3.org/TR/css-masking-1)
[css 伸缩盒布局](http://w3.org/TR/css-flexbox-1)
[css 网格布局](http://w3.org/TR/css-grid-1)

## 1.3 浏览器前缀
每个浏览器都可以实现这些实验性的（甚至是私有的、非标准的）特性，但要在名称前面加上自己特有的前缀。

**常见的浏览器前缀**
| 常见前缀          | 说明       |
| ------------- | -------- |
| Forefox       | -moz-    |
| IE            | -ms-     |
| Opera         | -o-      |
| Safari、Chrome | -webkit- |

### 开发者应对方式
先发制人地加上所有浏览器前缀。

**问题**

+ 有些有可能多余。
+ 重复 5 遍，相当枯燥，很难维护。

```
-moz-border-radius: 10px;
-ms-border-radius: 10px; /* 多余 */
-o-border-radius: 10px; /* 多余 */
-webkit-border-radius: 10px;
border-radius: 10px;
```

### 自动化添加浏览器前缀

+ [CSS3, Please](http://css3please.com)，在线粘贴代码生成前缀，已过时。
+ [pleeease](http://pleeease.io/playground.html)，在线粘贴代码生成前缀，已过时。
+ [Autoprefix](https://github.com/ai/autoprefixer)，本地预处理器，使用 [Can I Use](http://caniuse.com) 的数据库。
+ [-prefix-free](http://leaverou.github.io/prefixfree)，会在浏览器中进行特性检测，来决定哪些前缀是需要的。几乎不需要更新，因为所有信息都是用在真实的浏览器环境下。
+ [Stylus](http://stylus-lang.com/)、[LESS](http://lesscss.org)、[Sass](http://sass-lang.com)

### 不再以前缀的方式来实现新特性
最近，浏览器厂商已经很少以前缀的方式来实验性地实现新特性了。取而代之的是，这些实验性特性需要通过配置开关来启用，这可以有效防止开发者在生产环境中使用它们，因为你不能要求用户为了正确地浏览你的网站而去修改浏览器的设置。

# 2 CSS 编码技巧
## 2.1 尽量减少代码重复

**说明**: 在实践中，代码可维护性的最大要素是**尽量减少改动时要编辑的地方**。

这个一份十分糟糕的代码...

```css
button {
  padding: 6px 16px;
  border: 1px solid #446d88;
  background: #58a linear-gradient(#77a0bb, #58a);
  border-radius: 4px;
  box-shadow: 0 1px 5px gray;
  color: white;
  text-shadow: 0 -1px 1px #335166;
  font-size: 20px;
  line-height: 30px;
}
```

### 更优雅的尺寸

**问题描述**

![BE48F8F8-0E02-498F-A6DB-482CA9BED3DB](http://o6ul1xz4z.bkt.clouddn.com/2017-04-21-BE48F8F8-0E02-498F-A6DB-482CA9BED3DB.png)

**优化方案**

![2FB5A199-BE59-4512-87BA-1B5CD3A8971A](http://o6ul1xz4z.bkt.clouddn.com/2017-04-21-2FB5A199-BE59-4512-87BA-1B5CD3A8971A.png)



*注意：上面的长度单位采用了 em ，在某些情况下，计算比较复杂。需要的时候使用 rem。*

这里我们希望字号和其他此村能够跟父级的字号建立关联，因此采用了 em 单位。但在某些情况下可能希望这些尺寸是和根级字号(即 html 元素的字号)相关联的，此时使用 em 可能会导致更复杂的计算。在这种情况下，你可以使用 rem 单位。

### 更优雅的颜色

颜色是一个重要的变数，上面例子中涉及的属性包括:

```
☑ border-color
☑ background
☑ box-shadow
☑ text-shadow
```



**问题描述**

![93B25759-A1A5-4BB5-B072-0F8CA3C2768B](http://o6ul1xz4z.bkt.clouddn.com/2017-04-21-93B25759-A1A5-4BB5-B072-0F8CA3C2768B.png)

**优化方案**

![102EBCA5-AB3C-4B3D-8FB0-E5A13640D0F7](http://o6ul1xz4z.bkt.clouddn.com/2017-04-21-102EBCA5-AB3C-4B3D-8FB0-E5A13640D0F7.png)



### 代码易维护和代码量少不可兼得

**代码量少但维护不易**

![AB9E3725-8D7B-48F1-A778-979732C70E5F](http://o6ul1xz4z.bkt.clouddn.com/2017-04-21-AB9E3725-8D7B-48F1-A778-979732C70E5F.png)

**代码量多但维护容易**

![8404F651-9FDA-4014-AAA7-4C38A980AB3E](http://o6ul1xz4z.bkt.clouddn.com/2017-04-21-8404F651-9FDA-4014-AAA7-4C38A980AB3E.png)

### currentColor

`CSS Color 3`

☑ 功能: 这个关键字没有绑定到一个固定的颜色值，而是一直被解析为 color。

☑ 价值: CSS 中有史以来的第一个变量。

☑ 扩展: 未来，我们在原生 CSS 中拥有处理颜色的函数后， currentColor 就会变得更加有用，因为我们可以用这些函数来产生其各种深浅明暗的变体。

```css
hr {
  height: .5em;
  background: currentColor; /* 自动和文本的颜色保持一致 */
}
```



### inherit

☑ 值: inherit 可以用在任何 CSS 属性中，而且它总是绑定到父元素的计算值（对伪元素来说，则会取生成该伪元素的宿主元素）。

☑ 用途: 不需要重复指定字体属性，只需要利用 inherit 的特性即可。

```css
input, select, button {
  font: inherit; /* 继承父元素的字体 */
}
a {
  color: inherit; /* 继承父元素字体的颜色 */
}
.callout {
  position: relative;
}
.callout::before {
  content: '';
  position: absolute;
  top: -.4em;
  left: 1em;
  padding: .35em;
  background: inherit; /* 让小尖头自动继承背景和边框的样式 */
  border: inherit;
  border-right: 0;
  border-bottom: 0;
  transform: rotate(45deg);
}
```

## 2.2  相信你的眼睛，而不是数字

人的眼睛不适一台完美的输入设备，视觉上的错觉在任何形式的视觉设计中都普遍存在，需要我们针对性地进行调整。

☑ 物体从头几何学的中心点再稍微向上挪一点，才能取得理想的视觉效果。



![926D70D8-B127-405B-8FC7-C037689EBC2E](http://o6ul1xz4z.bkt.clouddn.com/2017-04-21-926D70D8-B127-405B-8FC7-C037689EBC2E.png)

☑ 圆形的字形与矩形字形相比，需要稍微放大一些，因为我们倾向于把圆形感知得比其实际尺寸更小一些。

![F69F5394-CE83-406B-906D-96E269D9615A](http://o6ul1xz4z.bkt.clouddn.com/2017-04-21-F69F5394-CE83-406B-906D-96E269D9615A.png)

☑ 字母的形状在两端都比较整齐，而顶部和底部则往往参差不齐，从而导致你的眼睛把这些参差不齐的空缺部分感知为多出来的內边距。

![E03DB7BE-B236-4EBD-B534-508A68412C26](http://o6ul1xz4z.bkt.clouddn.com/2017-04-21-E03DB7BE-B236-4EBD-B534-508A68412C26.png)

![8B54584C-7C1B-4F10-A572-C28DCB0DA1E4](http://o6ul1xz4z.bkt.clouddn.com/2017-04-21-8B54584C-7C1B-4F10-A572-C28DCB0DA1E4.png)

## 2.3 关于响应式网页设计

### 媒体查询

☑ 用途: 可以通过媒体查询(`Media Query`)规则来修补网站在这些分辨率下出现的问题，但每个媒体查询都会增加成本。只要用对了，它就是利器。

☑ 缺陷: 网站需要面向的设备太多(尤其考虑到未来的设备时)，还因为一个网站在桌面端可能会以任意尺寸的窗口来显示。

☑ 建议: 尽最大努力**实现弹性可伸缩的布局**，并在媒体查询的各个断点区间内制定相应的尺寸。当网页本身的设计足够灵活时，让它变为响应式**只需要用到一些简短的媒体查询代码**。



### 其他技巧

☑ **使用百分比长度来取代固定长度**。如果实在做不到这一点，也应该尝试使用与视口相关的单位(vm、vh、vmin、vmax)，它们的值解析为视口宽度或高度的百分比。

☑ 当你需要**较大分辨率下得到固定宽度**时，使用 `max-width`而不是 `width`，因为它可以适应较小的分辨率，而无需使用媒体查询。

☑ 不要忘记为**替换元素**(比如 `img`、`object`、`video`、`iframe` 等)设置一个 `max-width`，值为 100%。

☑ 假如背景图片需要完整地铺满一个容器，不管容器的尺寸如何变化，`background-size: colver`这个属性都可以做到。但是，我们也要时刻牢记——带宽并不是无限的，因此**在移动网页中通过 CSS 把一张大图缩小显示往往是不太明智的**。

☑ 当图片（或其他元素）以行列式进行布局时，**让视口的宽度来决定列的数量**。弹性盒布局(即 Flexbox) 或者 `display: inline-block`加上常规的文本折行行为，都可以实现这一点。

☑ 在使用多列文本时，**指定 `column-width`(列宽)而不是指定 `column-count`(列数)**，这样它就可以在较小的屏幕上自定显示为单列布局。

## 2.4 合理使用简写

### 展开式属性和简写属性

☑ 用途:  合理使用简写是一种良好的防卫性编码方式，可以抵御未来的风险。

**缺陷**

☑ 展开式写法并不会帮助你清空所有相关的其他属性，从而可能会干扰你想要达到的效果。

**建议**

☑ 我们要明确地去覆盖某个具体的展开式属性冰保留其他相关样式，那就需要用展开时属性。



简写属性

```css
/*
* background 能够覆盖 background-image 等展开式属性
*/
button {
  background: rebeccapurple;/* 简写属性 */
}
```

展开式属性

```css
/*
* background-color 等不能覆盖 background-image 等展开式属性
*/
button {
  background-color: rebeccapurple;/* 展开式属性 */
}
```

### 展开式属性的适合场景

**优化前**

```css
div {
  background: url(tr.png) no-repeat top right / 2em 2em,
    		  url(br.png) no-repeat bottom right / 2em 2em,
    		  url(bl.png) no-repeat top left / 2em 2em;
}
```

**优化后**

☑ 如果只为某个属性提供一个值，那它就会扩散并应用到列表中的每一项。

```css
div {
  background: url(tr.png) top right,
    		  url(br.png) bottom right,
    		  url(bl.png) bottom left;
  background-size: 2em 2em;
  background-repeat: no-repeat;
}
```

## 2.5 我应该使用与处理器吗？

### 2.5.1 CSS 预处理器

☑ 说明: 它们为 CSS 的编写提供了一些便利，比如变量、mixin、函数、规则嵌套、颜色处理等。

☑ 建议: 在每个项目开始时使用纯 CSS ，只有当代码开始变得无法保持 DRY 时，才切换到与处理器的方案。



**常用 CSS 预处理器**

☑ [Stylus](http://stylus-lang.com/)

☑ [Sass](http://sass-lang.com)

☑ [LESS](http://lesscss.org/)



**CSS 预处理器的缺点**

☑ CSS 的文件体积和复杂度可能会失控。

☑ 调试难度会增加(可以有 SourceMap)。

☑ 预处理器在开发过程中引入了一定程度的延时。

☑ 每次抽象都必然会带来更高的学习成本。

☑ 预处理器可能会有自己的 BUG。

☑ 网站开发者可能会不自觉地“依赖”和“滥用”。



### 2.5.2 原生 CSS 跟进 CSS 预处理器

☑ 说明: 很多受预处理器启发的特性都已经以各种方式融入到原生 CSS 中了。

☑ 注意: 这些原生特性通常比与处理器提供的版本要强大得多，因为它们是**动态**的。



+ 有一份关于(跟变量类似的)自定义属性的草案，叫做 [CSS 自定义属性暨层叠式变量](http://w3.org/TR/css-variables-1)。
+ CSS 值与单位(第三版)中的 `calc()`函数，不仅在处理运算时非常强大，而且已经得到了广泛的支持，当下可用。
+ [CSS 颜色(第四版)](http://dev.w3.org/csswg/css-color)引入的 `color()` 函数会提供颜色运算方法。
+ 关于嵌套， CSS 工作组内部正在进行一些正式的讨论，甚至以前还有过一份相关的草案(ED)。



```css
ul {
  /* 在有序列表中，列表项的背景颜色将是 rebeccapurple */
  --accent-color: purple;
}
ol {
  --accent-color: rebeccapurple;
}
li {
  /* 在无须列表中，列表项的背景色将是 purple */
  background: var(--accent-color);
}
```



### 2.5.3 CSS Polyfill

[Myth](http://myth.io) 是一款实验性预的与处理器，它只模拟上述原生的 CSS 新特性，而不是引用私有语法。它本质上扮演了 CSSPolyfill 的角色。



## 2.5 我们应该使用与预理器吗？

在每个项目开始时使用纯 CSS ，只有当代码开始变得无法保持 DRY 时，才切换到预处理器的方案。

### 常见的预处理器

+ [stylus](http://stylus-lang.com)
+ [sass](http://sass-lang.com)
+ [LESS](http://lesscss.org)



### 预处理器的优点

相比 css，预处理器往往能带来如下好处：

+ 代码健壮性
+ 灵活性
+ DRY

### 预处理器的缺点

+ css 的文件体积和复杂度可能会失控
+ 调试难度会增加（可以通过 SourceMap 来解决）
+ 给开发预览引入一定的延时
+ 学习成本
+ 抽象泄漏法则（预处理器也会存在潜伏的 BUG）



### 预处理器和原生 CSS 的融合

很多受预处理器启发的特性都已经以各种方式融入到原生 CSS 中了，而且原生的特性通常比预处理器提供的版本要强大得多，因为它们是动态的。比如：

+ CSS 变量：一个草案[CSS 自定义属性暨层叠式变量](http://w3.org/TR/css-variables-1)
+ CSS 值与单位（第三版）：`calc()`函数
+ [CSS 颜色（第四版）](http://dev.w3.org/csswg/css-color)：`color()` 函数
+ 嵌套特性：CSS 工作组内部正在进行一些正式的讨论



*css 原生变量*

```css
ul { --access-color: purple; }
ol { --access-color: rebeccapurple; }

/* 无需列表中使用 purple 颜色，有序列表中使用 rebeccapurple 颜色 */
li { background: var(--accent-color); }
```



