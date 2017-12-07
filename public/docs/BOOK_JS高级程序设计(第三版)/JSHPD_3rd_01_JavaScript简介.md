---
title: 01 JavaScript简介
categories: [JS高级程序设计(第三版)]
toc: true
tag:
    - js
date: 2014-08-26 14:31:52
---


## 1.1    JavaScript简史

**1995.02-**

公司：Netscape

主要人物：就职于Netscape的Brendan Eich(布兰登.艾奇)

事件：为Netscape Navigator 2开发一种名为LiveScript的脚本语言

**1995.02-前夕**

公司：Netscape


事件：临时将LiveScript改名为JavaScript

**1995.02+**

JavaScript1.0获得巨大成功

**1996.08**

公司：微软

IE3加入名为JScript的JavaScript实现

**1997**

组织：ECMA

事件：以JavaScript1.1为蓝本的建议被提交给欧洲计算机制造商协会（ECMA），ECMA-262诞生。

**1998**

组织：国家标准化组织和国际电工委员会（ISO/IEC）

事件：ISO/IEC采用ECMAScript作为标准，即ISO/IEC-16262

## 1.2    JavaScript实现

说明：JavaScript的含义比ECMAScript包含的要多。

- 核心（ECMAScript）

- 文档对象模型（DOM）

- 浏览器对象模型（BOM）

![Alt text](http://o6ul1xz4z.bkt.clouddn.com/1450418191884.png)

###  1.2.1    ECMAScript

说明：ECMAScript-262没有参照WEB浏览器

- 语法

- 类型

- 语句

- 关键字

- 保留字

- 操作符

- 对象
#### 1、版本

-  **ECMAScript第一版**：本质上与Netscape JavaScript1.1相同（针对浏览器的部分除外）

-  **ECMAScript第二版**：主要是班级加工的结果，没有任何增删改。

-  **ECMAScript第三版**：标志着ECMAScript成为一门真正的语言

字符串处理
错误定义
数值输出
正则表达式
新控制语句
try-catch
国际化


-  **ECMAScript第四版**：正式发布前被废弃

强类型变量
新语句
新数据结构
真正的类
经典继承
数据交互新方式   

-  **ECMAScript第五版**：ECMAScript3.1，在第三版的基础上进行小幅修改   

澄清第三版中已知的歧义
增添新的功能
原生JSON对象（用于解析和序列化JSON数据）
继承的方法
高级属性定义
严格模式
对引擎解释和执行代码进行补充说明

#### 2、什么是ECMAScript兼容

**基本定义：**
- 支持ECMA-262
- 支持Unicode字符标准

**扩展定义：**

- 标准中没有规定的新对象和对象的心新属性
- 修改扩展内置的正则表达式语法

#### 3、WEB浏览器对ECMAScript的支持

![Alt text](http://o6ul1xz4z.bkt.clouddn.com/1450418168335.png)

### 1.2.2    文档对象模型（DOM）

#### 1、为什么要使用DOM

**问题：**IE4和Navigator4支持不同形式的DHTML，需要加以控制。
**解决：**负责制定Web通信标准的W3C开始着手规划DOM.

#### 2、DOM级别
**注意：**DOM0级表准不存在，只是一种参照说法，指IE4和Na4最初支持的DHTML
DOM1:    映射文档的结构

- DOM Core:    如何映射基于XML的文档结构
- DOM HTML：    扩展添加针对HTML的对象和方法


DOM2:    扩充鼠标用户界面事件、范围、遍历等，增加对CSS的支持

- DOM视图：    定义跟踪不同文档视图的接口；
- DOM事件:    定义事件和事件处理的接口；
- DOM样式：    定义基于CSS应用样式接口
- DOM遍历和范围：    定义遍历和操作文档树的接口


DOM3:    引入以统一方式加载和保存文档的方法，开始支持XML1.0规范

#### 3、其他DOM标准 （W3C推荐）

- SVG1.0(可伸缩矢量图)   
- MathML1.0(数学标记语言)
- SMIL(同步多媒体集成语言)

#### 4、WEB浏览器对DOM的支持
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/1450418504322.png)

### 1.2.3    浏览器对象模型（BOM）
**基本：**

- 处理浏览器和框架；

**扩展：**

- 弹出新浏览器窗口的功能；
- 移动、缩放和关闭浏览器窗口的功能；
- 提供浏览器详细信息的navigator对象；
- 提供浏览器所加载页面的详细信息的location对象；
- 提供用户分辨率详细信息的screen对象；
- 对cookies的支持；
- 像XMLHttpRequest和ActiveXObject这样的自定义对象；


## 1.3    JavaScript版本（Netscape/Mozilla）
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/1450426145664.png)


























