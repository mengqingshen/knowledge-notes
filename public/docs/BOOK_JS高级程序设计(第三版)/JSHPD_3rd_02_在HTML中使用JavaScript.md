---
title: 02 在HTML中使用JavaScript
categories: [JS高级程序设计(第三版)]
tag:
    - js
date: 2014-08-26 14
---

## 2.1  script元素

**历史：**   由Netscape创造并在Netscape Navigator 2中首先实现。之后被加入HTML规范。

**元素（HTML4.01）:**   6个，全部非必需

+ async：    异步方式下载脚本
- charset：    使用src属性指定的字符集，大多数浏览器会忽略这个值，很少用
- defer:   立即下载，但 延迟到文档被完全解析和显示之后（遇到</html>）执行。只对外部文件有效
- language:    使用的脚本语言，已废弃
- src：执行代码的外部文件
- type:    默认死type/javascript

**使用方式：**

- 直接嵌入：指定type属性，js代码中不能出现'</script>'
- 包含外部文件：src属性必需，可以跨域，不能混合嵌入代码，在xhtml中可以自闭合（不推荐）

### 2.1.1    标签的位置

**惯例：**<head>元素中（浏览器遇到<body>标签时才会开始呈现内容，因而会有延迟）

**推荐：**`<body>`元素中页面的内容后面


### 2.1.2    延迟脚本
**方式：**

- **HTML：**`<script type="text/javascript"defer></script>    `
- **XHTML：**`<script type="text/javascript"defer="defer"></script>`   

**规范行为（HTML5）：**

- 脚本会延迟到浏览器遇到</html>标签后再按照出现的顺序执行，但都先于DOMContentLoaded事件触发前执行；
- 只适用于外部脚本文件；

**现实行为：**

- 延迟的脚本不一定会在DOMContentLoaded事件触发前执行，也不一定按照顺序执行，为了避免加载顺序的混乱，建议只有一个defer脚本；
-  IE4-IE7支持对嵌入脚本的defer属性，IE8等支持HTML5实现的浏览器则会忽略这个属性。

### 2.1.3    异步脚本 (HTML5)

**方式：**

- **HTML：**`<script type="text/javascript" async></script> `   
- **XHTML：**`<script type="text/javascript" async="async"></script>` 

**行为：** 
只是用外部文件；

- 立即异步下载，页面不会等待下载完毕和执行；
- 不保证顺序，因此确保异步脚本之间彼此不依赖；
- 页面load事件前执行，DOMContentLoaded事件之前或之后；

支持情况：

### 2.1.4    在XHTML中的用法（可以跳过这一节，因为HTML5标准正快速占领市场）     

**错误方式：**<(小于号)在XHTML中被当作开始一个新标签来解析。                                                                                                      
![Alt text](http://cdn.mengqingshen.com/1450428411211.png)
                       

**正确方式**   

- 方式一：    使用HTML实体替代尖括号（比如&lt替换<）          
![Alt text](http://cdn.mengqingshen.com/1450428430947.png)

-  方式二：    CData片段+JavaScript注释
![Alt text](http://cdn.mengqingshen.com/1450428447412.png)

                                                                                                                                                                            
### 2.1.5    不推荐使用的语法（早期）     
![Alt text](http://cdn.mengqingshen.com/1450428543661.png)

                  
## 2.2    嵌入代码与外部文件

**外部文件优点：**

- 可维护性
- 可缓存（复用）
- 适应未来：    HTML和XHTML包含的外部文件的语法相同

## 2.3    文档模式（IE提出，其它效仿）

注意：主要影响css呈现，某些情况下也会影响js。

**类型：**

- 混杂模式：   不推荐，如果不适用hack技术，不同浏览器差异可能非常大 
![Alt text](http://cdn.mengqingshen.com/1450428919678.png)

- 标准模式：    行为相对一致
![Alt text](http://cdn.mengqingshen.com/1450428816811.png)

- 准标准模式：    有两种触发方式，和标准模式非常接近，行为符合标准（处理图片间隙除外）
![Alt text](http://cdn.mengqingshen.com/1450428869793.png)

## 2.4   noscript 元素：    不支持JS的浏览器平稳退化的方式


**用法：**    `<body>`中的任何标签中都可以使用

**行为：**    下列情况下浏览器才会显示其中的内容

- 浏览器不支持脚本；
- 浏览器支持脚本但脚本被禁用；


