---
title: svg 入门
categories: [慕课网学习笔记]

tag:
    - svg
    - html
date: 2015-03-16 08:51:22
---

## 1.1 SVG简介
**用途：**使用XML描述的矢量文件
**规范：**W3C标准（1.1）（http://www.w3.org/TR/SVG11/）
**支持情况：**
IE9+、	Chrome33.0+、	Firefox28.0、Safari7.0+
**使用方式：**

+ 浏览器直接打开
+ 在HTML中使用img标签

```html
<img src="simple.svg" width="400" height="400">
```

+ 直接在HTML中使用SVG标签

```html
    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
        <!--Face-->
        <circle cx="100" cy="100" r="90" fill="#39f" />
        <!-- Eyes -->
        <circle cx="70" cy="80" r="20" fill="white" />
        <circle cx="130" cy="80" r="20" fill="white" />
        <circle cx="65" cy="75" r="10" fill="black" />
        <circle cx="125" cy="75" r="10" fill="black" />
        <!-- Smile -->
        <path d="M 50 140 A 60 60 0 0 0 150 140" stroke="white" stroke-width="3" fill="none"/>
    </svg>
```

+ 作为CSS背景

```css
body {
    background: #EFEFEF;
}
#bg {
    width: 400px;
    height: 400px;
    background: white url(simple.svg) repeat;
    box-shadow: rgba(0,0,0,.5) 2px 3px 10px;
    border-radius: 10px;
}
<body>
    <h1>Hello SVG with CSS</h1>
    <div id="bg">
 
    </div>
</body>
```

## 1.2    基本图形和属性

基本图形(6)|说明
---|---
`<rect>`|矩形(包括圆角的)
`<circle>`|圆形
`<ellipse>`|椭圆
`<line>`|直线
`<polyline>`|折线
`<polygon>`|多边形

基本属性|说明
---|---
fill|图形填充颜色
stroke|图形描边颜色
stroke-width|描边宽度
transform|变形

### 1.2.1 rect
![](http://o7m5xjmtl.bkt.clouddn.com/14889883158068.jpg)

### 1.2.2 circle
![](http://o7m5xjmtl.bkt.clouddn.com/14889883331331.jpg)

### 1.2.3 ellipse

![](http://o7m5xjmtl.bkt.clouddn.com/14889883446334.jpg)

               
### 1.2.4 line
![](http://o7m5xjmtl.bkt.clouddn.com/14889883551922.jpg)

### 1.2.5 polyline
![](http://o7m5xjmtl.bkt.clouddn.com/14889883680671.jpg)
        
### 1.2.6 polygon
![](http://o7m5xjmtl.bkt.clouddn.com/14889883767032.jpg)

        
### 1.2.7 填充、描边和变换

## 1.3 基本操作API
```html
<svg xmlns="http://www.w3.org/2000/svg">
    <rect 
        x="10" 
        y="10" 
        rx="5" 
        ry="5" 
        width="150" 
        height="100" 
        stroke="red" 
        fill="none">
    </rect>
    <circle 
        cx="250" 
        cy="60" 
        r="50" 
        stroke="red" 
        fill="none">
    </circle>
    <ellipse 
        cx="400" 
        cy="60" 
        rx="70" 
        ry="50" 
        stroke="red" 
        fill="none">
    </ellipse>
    <line 
        x1="10" 
        y1="120" 
        x2="160" 
        y2="220" 
        stroke="red">
    </line>
    <polyline 
        points="250 120 
                300 220
                200 220"
        stroke="red"
        fill="none">
    </polyline>
    <polygon 
        points="250 120 
                300 220
                200 220"
        stroke="red"
        stroke-width="5"
        fill="yellow"
        transform="translate(150 0)">
    </polygon>
</svg>

```

JS API|用途
---|---
document.createElementNS(ns, tagName)|创建图形
element.appendChild(childElement)|添加图形
element.setAttribute(name, value)|设置属性
element.getAttribute(name)|获得属性

## 1.4 综合例子：简单SVG编辑器

```html
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>SVG 编辑器</title>
    <style>
        #toolbox {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            width: 250px;
            border-right: 1px solid #CCC;
        }
 
        #toolbox h2 {
            margin: 0;
            padding: 0;
            background: #EEE;
            font-size: 16px;
            height: 24px;
            line-height: 24px;
            padding: 5px 10px;
        }
 
        #toolbox form {
            padding: 10px;
        }
 
        #canvas {
            position: absolute;
            left: 260px;
            top: 10px;
            bottom: 10px;
            right: 10px;
            box-shadow: 2px 2px 10px rgba(0,0,0,.4);
            border-radius: 5px;
        }
 
        label {
            display: inline-block;
            width: 80px;
            text-align: right;
        }
    </style>
</head>
<body>
    <div id="toolbox">
        <h2>创建</h2>
        <form id="create-shape">
            <button type="button" create="rect">Rect</button>
            <button type="button" create="circle">Circle</button>
            <button type="button" create="ellipse">Ellipse</button>
            <button type="button" create="line">Line</button>
        </form>
        <h2>形状</h2>
        <form id="shape-attrs">
            请先创建图形
        </form>
        <h2>外观和变换</h2>
        <form id="look-and-transform" disabled="disabled">
            <p>
                <label style="display: inline;">填充</label>
                <input id="fill" type="color" value="#ffffff" />
            </p>
            <p>
                <label style="display: inline;">描边</label>
                <input id="stroke" type="color" value="#ff0000" />
                <input id="strokeWidth" type="range" value="1" />
            </p>
            <p>
                <label>translateX</label>
                <input id="translateX" type="range" min="-400" max="400" value="0" />
 
                <label>translateY</label>
                <input id="translateY" type="range" min="-400" max="400" value="0" />
 
                <label>rotate</label>
                <input id="rotate" type="range" min="-180" max="180" value="0" />
 
                <label>scale</label>
                <input id="scale" type="range" min="-1" max="2" step="0.01" value="1" />
            </p>
        </form>
    </div>
    <div id="canvas"></div>
</body>
<script>
    var SVG_NS = 'http://www.w3.org/2000/svg';
 
    // 图形及对应默认属性
    var shapeInfo = {
        rect: 'x:10,y:10,width:200,height:100,rx:0,ry:0',
        circle: 'cx:200,cy:200,r:50',
        ellipse: 'cx:200,cy:200,rx:80,ry:30',
        line: 'x1:10,y1:10,x2:100,y2:100'
    };
 
    // 默认公共属性
    var defaultAttrs = {
        fill: '#ffffff',
        stroke: '#ff0000'
    };
 
    var createForm = document.getElementById('create-shape');
    var attrForm = document.getElementById('shape-attrs');
    var lookForm = document.getElementById('look-and-transform');
 
    var svg = createSVG();
    var selected = null;
 
    createForm.addEventListener('click', function(e) {
        if (e.target.tagName.toLowerCase() == 'button') {
            create(e.target.getAttribute('create'));
        }
    });
 
    attrForm.addEventListener('input', function(e) {
        if (e.target.tagName.toLowerCase() != 'input') return;
        var handle = e.target;
        selected.setAttribute(handle.name, handle.value);
    });
 
    lookForm.addEventListener('input', function(e) {
        if (e.target.tagName.toLowerCase() != 'input') return;
        if (!selected) return;
        selected.setAttribute('fill', fill.value);
        selected.setAttribute('stroke', stroke.value);
        selected.setAttribute('stroke-width', strokeWidth.value);
        selected.setAttribute('transform', encodeTranform({
            tx: translateX.value,
            ty: translateY.value,
            scale: scale.value,
            rotate: rotate.value
        }));
    });
 
    function createSVG() {
        var svg = document.createElementNS(SVG_NS, 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        canvas.appendChild(svg);
 
        svg.addEventListener('click', function(e) {
            if (e.target.tagName.toLowerCase() in shapeInfo) {
                select(e.target);
            }
        });
        return svg;
    }
 
    function create(name) {
        var shape = document.createElementNS(SVG_NS, name);
        svg.appendChild(shape);
        select(shape);
    }
 
    function select(shape) {
        var attrs = shapeInfo[shape.tagName].split(',');
        var attr, name, value;
 
        attrForm.innerHTML = "";
 
        while(attrs.length) {
            attr = attrs.shift().split(':');
            name = attr[0];
            value = shape.getAttribute(name) || attr[1];
            createHandle(shape, name, value);
            shape.setAttribute(name, value);
        }
 
        for (name in defaultAttrs) {
            value = shape.getAttribute(name) || defaultAttrs[name];
            shape.setAttribute(name, value);
        }
        selected = shape;
 
        updateLookHandle();
    }
 
    function createHandle(shape, name, value) {
 
 
        var label = document.createElement('label');
        label.textContent = name;
 
        var handle = document.createElement('input');
        handle.setAttribute('name', name);
        handle.setAttribute('type', 'range');
        handle.setAttribute('value', value);
        handle.setAttribute('min', 0);
        handle.setAttribute('max', 800);
 
        attrForm.appendChild(label);
        attrForm.appendChild(handle);
    }
 
    function updateLookHandle() {
        fill.value = selected.getAttribute('fill');
        stroke.value = selected.getAttribute('stroke');
        var t = decodeTransform(selected.getAttribute('transform'));
        translateX.value = t ? t.tx : 0;
        translateY.value = t ? t.ty : 0;
        rotate.value = t ? t.rotate : 0;
        scale.value = t ? t.scale : 1;
    }
 
    function decodeTransform(transString) {
        var match = /translate\((\d+),(\d+)\)\srotate\((\d+)\)\sscale\((\d+)\)/.exec(transString);
        return match ? {
            tx: +match[1],
            ty: +match[2],
            rotate: +match[3],
            scale: +match[4]
        } : null;
    }
 
    function encodeTranform(transObject) {
        return ['translate(', transObject.tx, ',', transObject.ty, ') ',
            'rotate(', transObject.rotate, ') ',
            'scale(', transObject.scale, ')'].join('');
    }
 
</script>
</html>

```

# 2 svg 中的世界、视野、视窗的概念
## 2.1 SVG中的世界、视野、视窗的概念

1. 世界是无穷大的
2. 视野是观察世界的一个矩形区域

要点|说明
---|---
viewbox|控制视野的属性
width, heigth|控制视窗
SVG代码|定义世界
viewBox, preserveAspectRadio|控制视野

```html
<svg xmlns="..."width="800" height="600"viewBox="0 0 400 300"preserveAspectRatio="xMidYMid meet"><!-- SVG content --></svg>
```

## 2.2 SVG中的图形分组
![](http://o7m5xjmtl.bkt.clouddn.com/14889886196521.jpg)

+ `<g>`标签创建分组
+ 属性集成
+ transform属性定义坐标变换
+ 可以嵌套使用


## 2.3 坐标系统概述
![](http://o7m5xjmtl.bkt.clouddn.com/14889886572509.jpg)

**特点：**

+ 笛卡尔直角坐标系
+ 原点
+ 互相垂直的两条数轴
+ 角度定义

## 2.4 四个坐标系

### 用户坐标系（User Coordinate）
“世界”的坐标系
**说明：**SVG标签的坐标，其它坐标系统的基础参照
![](http://o7m5xjmtl.bkt.clouddn.com/14889886982183.jpg)

### 自身坐标系（Current Coordinate）
每个图形元素或分组独立与生俱来

**说明：**每个分组或图形都会产生自身坐标系，其前驱坐标系为用户坐标系
            
### 前驱坐标系（Previous Coordinate）
父容器的坐标系
**说明：**transform属性设置当前坐标系与前驱坐标系的偏移，默认原点和前驱坐标系重合

### 参考坐标系（Reference Coordinate）
使用其他坐标系来研究自身的情况时使用

## 2.5 坐标变换

+ 定义
+ 线性变换
+ 线性变换列表
+ transform属性

### 2.5.1    坐标变换定义
数学上，"坐标变换"是采用一定的数学方法将一个坐标系的坐标变换为另一个坐标系的坐标的过程。
SVG中，“坐标变换”是对一个坐标系到另一个坐标系的变换的描述

### 2.5.2    线性变换
    
![](http://o7m5xjmtl.bkt.clouddn.com/14889887984487.jpg)


（1）旋转
![](http://o7m5xjmtl.bkt.clouddn.com/14889888072598.jpg)

（2）缩放
![](http://o7m5xjmtl.bkt.clouddn.com/14889888203042.jpg)

（3）线性变换列表
            
![](http://o7m5xjmtl.bkt.clouddn.com/14889888336593.jpg)

单个线性变换矩阵，可以表示所有的线性变换，但是，一般我们去描述一个线性变换可能更愿意分开一步步来描述。比如说，先旋转30度，在平移（10，10），那么每一步变换列表的乘积就是这个线性变换列表的结果。需要注意的是，后面的变换要乘在前面，这是线性变换的一个结论。

### 2.5.4 transform属性
![](http://o7m5xjmtl.bkt.clouddn.com/14889888601660.jpg)

## 2.6 坐标观察
![](http://o7m5xjmtl.bkt.clouddn.com/14889888687140.jpg)

# 3 颜色、渐变和笔刷
## 3.1 认识RGB和HSL
+ 都是CSS3支持的颜色表示方法
+ 互相转换的原理

### 3.1.1 RGB：红、绿、蓝
**格式：**

+ `rgb(r,g,b)`:例如 `rgb(255, 0, 0)`
+ `#rrggbb`:例如`#ff0000`

**优势：**显示器容易解析
**劣势：**不符合人类描述颜色的习惯

### 3.1.2 HSL:颜色、饱和度、亮度
**格式**：`hsl(h, s%, l%)`
**取值范围**：`hsl([0,359], [0,100]%, [0,100]%)`
**优势**：符合人类描述颜色的习惯

## 3.2 线性渐变和径向渐变
**stop标签**：定义渐变的颜色和位置

### 3.2.1 线性渐变

#### linerGradient：定义线性渐变

相关属性|说明
---|---
gradientUnits|定义渐变参照的坐标系
x1,y1	|渐变发生的起点
x2,y2|渐变发生的重点

```html
<svg xmlns="http://www.w3.org/2000/svg">
    <defs>
        <!--x1="0"代表图形最左端,x2="1"代表图形最右端-->
        <!---gradientUNITS="objectboundingbox"表示采用目标图形自身作为坐标系，"userSpaceOnUse"表示采用世界坐标系-->
        <linearGradient id="grad1" gradientUNITS="objectboundingbox" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#1497fc"/>
            <stop offset="0.5" stop-color="#a469be"/>
            <stop offset="1" stop-color="#ff8c00"/>
        </linearGradient>
    </defs>
    <rect x="100" y="100" fill="url(#grad1)" width="200" height="150" />
</svg>
```        

### 3.2.2 径向渐变

#### radialGradient：定义径向渐变
相关属性|说明
---|---
cx,cy|定义扩散的方向
fx,fy	|定义光源的坐标
r|定义光线扩散半径
gradientUnits|定义渐变参照的坐标系

```html
<svg xmlns="http://www.w3.org/2000/svg">
    <defs>
        <radialGradient id="grad2" cx="0.5" cy="0.5" fx="0.8" fy="0.2" r="0.5" >
            <stop offset="0" stop-color="rgb(20,151,252)"/>
            <stop offset="0.5" stop-color="rgb(164,105,190)"/>
            <stop offset="1" stop-color="rgb(255,140,0)"/>
        </radialGradient>
    </defs>
    <rect x="100" y="100" width="200" height="150" fill="url(#grad2)"></rect>
</svg>
```

## 3.3 使用笔刷
**说明：**绘制纹理

### pattern标签：定义笔刷
相关属性|说明
---|---
x,y|pattern自身内部坐标系中的原点的位置
width,height|pattern自身的宽度和高度
patternUnits|pattern自身的属性单位的意义
patternContentUnit|pattern内部元素的属性的单位的意义

```html
<svg xmlns="http://www.w3.org/2000/svg">
    	<defs>
        	 <pattern id="p1" x="0" y="0" width="0.2" height="0.2">
            	 <circle cx="10" cy="10" r="5" fill="red"></circle>
            	 <polygon points="30 10 60 50 0 50" fill="green"></polygon>
        	 </pattern>
    	</defs>
    	<rect x="100" y="100" width="800" height="300" fill="url(#p1)" stroke="blue"></rect>
</svg>
```

# 4 path 高级教程

## 4.1 Path概述
[规范](http://www.w3.org/TR/SVG11/paths.html)

```html
<path d="M0,0L10,20C30-10,40,20,100,100" stroke=""red>
```
`M0,0`：M是命令，之后的0,0是参数，参数之间可以用空格或者逗号隔开，不过下一个数值是负数例外。

**三种写法：**

+ 命令之间不分割，参数之间使用逗号

```html
<path d="M0,0L10,20C30-10,40,20,100,100" stroke=""red>
```

+ 命令和参数都使用空格

```html
<path d="M 0 0 L 10 20 C 30 -10 40 20 100 100" stroke=""red>
```

+ 命令之间使用逗号，命令和参数以及参数之间使用空格

```html
<path d="M 0 0,L 10 20,C 30 -10 40 20 100 100" stroke=""red>
```
**命令汇总：**

命令|定义
---|---
M/m(x,y)+|移动当前位置
L/l(x,y)+|从当前位置绘制线段到指定位置
H/h(x)+|从当前位置绘制水平线到达指定的x坐标
V/v(x)+|从当前位置绘制竖直线到达指定的y坐标
Z/z|闭合当前路径
C/c(x1,y1,x2,y2,x,y)+|从当前位置绘制3次贝赛尔曲线到指定位置
S/s(x2,y2,x,y)+|从当前位置光滑绘制3次贝赛尔曲线到指定位置
Q/q(x1,y1,x,y)+|从当前位置绘制2次贝赛尔曲线到指定位置
T/t(x,y)+|从当前位置光滑绘制2次贝赛尔曲线到指定位置
A/a(rx,ry,xr,laf,sf,x,y)|从当前位置绘制弧线到指定位置

**命令基本规律**

+ 区分大小写：大写表示坐标参数为绝对位置，小写则为相对位置（参数不在是坐标，而是从当前位置开始绘制多长）
+ 最后的参数表示最终要到达的位置
+ 上一个命令结束的位置就是下一个命令开始的位置
+ 命令可以重复参数：表示重复执行同一条命令

## 4.2 移动和直线命令

命令|说明
---|---
M(x,y)+|移动画笔，后面如果有重复参数，则会当做是L命令处理
L(x,y)+|绘制线段到指定位置
H(x)+|绘制水平线到指定的x位置
V(y)+|绘制竖直线到达指定的y坐标
m、l、h、v|使用相对位置绘制

## 4.3 弧线命令(最复杂的命令)

`A/a(rx,ry,xr,laf,sf,x,y)`: 从当前位置绘制弧线到指定位置
参数|说明
---|---
rx(radius-x)|弧线所在椭圆的x半轴长
ry(radius-y)|弧线所在椭圆的y半轴长
xr(xAxis-rotation)|弧线所在椭圆的长轴角度
laf(large-arc-flag)|是否选择弧长较长的那一段弧
sf(sweep-flag)|是否选择逆时针方向的那一段弧
x,y:弧的终点位置

### 案例1
从(200,200)绘制到(300,300)，x半轴长为200,y半轴长为100,椭圆的旋转角度为0,选择较短的逆时针方向的那一条弧

`M 200 200 A 200 100 0 0 1 300 300`

![](http://o7m5xjmtl.bkt.clouddn.com/14889895057397.jpg)

### 案例2
绘制圆弧
`M 200 200 h 100 l -100 100 v -100 M 300 200 A 100 100 0 0 1 200 300`
![](http://o7m5xjmtl.bkt.clouddn.com/14889895279772.jpg)

## 4.4 贝赛尔曲线命令

### 贝赛尔曲线介绍
![](http://o7m5xjmtl.bkt.clouddn.com/14889895518610.jpg)

### 二次贝赛尔曲线命令
`Q/q(x1,y1,x,y)+`: 从当前位置绘制2次贝赛尔曲线到指定位置

`M x0 y0 Q x1 y1 x y`
![](http://o7m5xjmtl.bkt.clouddn.com/14889895876529.jpg)

起始点：(x0, y0)
结束点：(x, y)
控制点：(x1, y1)

### 三次贝赛尔曲线命令
`C/c(x1,y1,x2,y2,x,y)+`:从当前位置绘制3次贝赛尔曲线到指定位置

`M x0 y0 C x1 y1 x2 y2 x y`
![](http://o7m5xjmtl.bkt.clouddn.com/14889896304334.jpg)

起始点：(x0, y0)
结束点：(x, y)
控制点1：(x1, y1)
控制点2：(x2, y2)

## 4.5 光滑赛贝尔曲线命令
**注意：**如果当前绘制的光滑贝赛尔曲线之前的线不是贝赛尔曲线，则当前绘制的曲线会退化一次，成为直线（T）或者二次贝赛尔曲线(S)，因为镜像对应的点不存在了

### 二次光滑贝赛尔曲线命令
`T/t(x,y)+`: 从当前位置光滑绘制2次贝赛尔曲线到指定位置(c1是上一段曲线的控制点关于当前曲线起始点的镜像位置)

### 三次光滑贝赛尔曲线命令
`S/s(x2,y2,x,y)+`: 从当前位置光滑绘制3次贝赛尔曲线到指定位置((x1,y1)是上一段曲线的控制点2关于当前曲线起始点的镜像位置)

#### 案例：两段三次贝赛尔曲线

![](http://o7m5xjmtl.bkt.clouddn.com/14889896863781.jpg)


## 4.6    回顾与思考
+ Path命令的作用是什么，Path字符串的格式是什么？
+ 一共有多少各path命令，它们分别的参数是什么？
+ 如何求贝赛尔曲线的长度，如何求整个Path的长度？
+ 如何求一个Path的子路径？
+ 如何求两个Path的补间？

# 5 svg 文本

## 5.1 text、tspan 以及其属性

### text标签：绘制文本
相关属性|说明
---|---
x,y|绘制的起点（相对所在的svg）
dx,dy|相对基线的偏移量(如果有一组值则会对每个子分别处理)
style|设置字体的css样式
fill|设置字体的填充颜色
stroke|设置字体的描边颜色
stroke-width|设置字体的宽度

```html
<svg xmlns="http://www.w3.org/2000/svg">
	<defs>
		<pattern id="grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
			<path stroke="#f0f0f0" fill="none" d="M0,0H20V20"></path>
		</pattern>
	</defs>
	<rect width="1200" height="1000" fill="url(#grid)"></rect>
	<text x="100" y="100" dx="10 20 30 40 50" dy="20 20 20 20 20" style="font-size:50px; font-family:'Arial';">ABCDE</text>
	<path d="M100,0V200M0,100H200" stroke="red" />
</svg>
```
![](http://o7m5xjmtl.bkt.clouddn.com/14889898637463.jpg)

### tspan标签
text的子标签，用来对局部文本单独进行一些设置
**相关属性**：(同text)


## 5.2 利用dy属性实现波浪文字效果

![](http://o7m5xjmtl.bkt.clouddn.com/14889898934722.jpg)

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Docuvament</title>
</head>
<body>
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="400px">
        <defs>
            <pattern id="grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <path stroke="#f0f0f0" fill="none" d="M0,0H20V20"></path>
            </pattern>
        </defs>
        <rect width="1200" height="1000" fill="url(#grid)"></rect>
        <text id="sintext" x="160" y="100"  style="font-size:10px; font-family:'Arial';"></text>
        <path d="M100,0V200M0,100H200" transform="translate(0,60)" stroke="red" />
    </svg>
</body>
<script>
    //y=s * sin(w*x+t)
    //x=[20,20,20...]
    var NS = 'http://www.w3.org/2000/svg';
    var text = 'ABCDEFGHIGKLMNOPQRSTUVWXYZ';
    var n = 26;
    var x = [];
    var y = null;
    var i = n;
    var s = 100;
    var w= 0.02;
    var t = 0;
    while(i--){
        x.push(20);
        var tspan = document.createElementNS(NS, 'tspan')
        tspan.textContent = text[n - i -1];
        sintext.appendChild(tspan);
        var h = Math.round(360 / 26 * i);
        tspan.setAttribute('fill', 'hsl('+ h +', 100%, 80%)');
        }
    function arrange(){
        y = [];
        var ly = 0, cy;
        var ly = 0, cy;
        for(i = 0; i < n; ++i){
            cy = -s * Math.sin(w * i * 20 + t);
            y.push(cy - ly);
            ly = cy;
        }
    }
    function render(){
        sintext.setAttribute('dx', x.join(' '));
        sintext.setAttribute('dy', y.join(' '));
    }
    function frame(){
        t += 0.01;
        arrange(t);
        render();
        requestAnimationFrame(frame);
     }
    frame();
</script>
</html>
```

             
## 5.3 垂直居中问题

+ text-anchor-水平居中属性
+ [dominant-baseline属性](http://w3.org/TR/SVGtext.html#DominantBaselineProperty)
+ 自己模拟

## 5.4 路径文本
## 5.5 使用脚本控制路径文件
## 5.6 使用超链接


        



