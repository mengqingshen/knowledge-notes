---
title: Velocity.js 实现弹出式相框
categories:
    - 慕课网学习笔记
tag:
    - js
toc: true
---

[Velocity.js实现弹出式相框-慕课网](http://www.imooc.com/learn/471)

[个人练习代码](https://coding.net/u/eli01/p/imooc_velocity.js_photoFrame/git)

本课程将使用 velocity.js 开发一个弹出式相框。首先和大家一起去认识和了解 velocity.js 强大的动画制作功能，然后通过一些小案例由浅入深地掌握它的的用法，最后通过一个真实案例来体会 velocity.js 在项目开发中的威力。让我们武装上 velocity.js ，从此网页变得生动起来。  


# 1 课程介绍（略）
# 2 Velocity.js 基础
[Velocity.js官网](http://velocityjs.org)

## 2.1 Velocity.js 简介
+ 比 css3动画兼容性更好（支持到 IE8 和 Android 2.3）

## 2.2 Velocity.js 基本用法
*index.html*

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Velocity.js Demo</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div id="div1" class="box"></div>
    <div id="div2" class="box"></div>
</body>
<script src="js/jquery-3.1.1.min.js"></script>
<script src="js/velocity.min.js"></script>
<script src="js/velocity.ui.js"></script>
<script src="js/script.js"></script>
</html>
```

*script.js*

```javascript
/**
 * Created by tonyearth on 2016/12/13.
 */
(function ($) {
    $('#div1').velocity({
        width: '300px'
    }, {
        duration: 3000
    })

})(jQuery)
```

## 2.3 制作动画序列的三种方法
 动画序列（顺序执行的一系列动画）可以有三种实现方式：

+ 方式一：通过 delay  让后面的动画延迟到前面的动画完成后执行


```javascript
$('#div1').velocity({
        width: '300px'
    }, {
        duration: 3000
    })
$('#div2').velocity({
        width: '300px'
    }, {
        duration: 3000
		  delay: 3000
    })

```

+ 方式二：将后一个动画嵌套进前一个动画的 complete 回调中执行


```javascript
$('#div1').velocity({
        width: '300px'
    }, {
        duration: 3000,
		  complete: function () {
			$('#div2').velocity({
		        width: '300px'
    		}, {
        		duration: 3000
    		})
		   }
    })
```

+ 方式三(推荐)：$.Velocity.RunSequence


```javascript
var seq = [
    {
        elements: $('#div1'),
        properties: {
            width: '300px'
        },
        options: {
            duration: 3000
        }
    },
    {
        elements: $('#div2'),
        properties: {
            width: '300px'
        },
        options: {
            duration: 3000
        }
    },
    {
        elements: $('#div3'),
        properties: {
            width: '300px'
        },
        options: {
            duration: 3000
        }
    }
]

$.Velocity.RunSequence(seq)
```

## 2.4 预定义动画和自定义动画
### 预定义动画（pre-registered effects）
**说明：** `Velocity.js` 预定义的动画，可以在官网查看预定义动画的效果

![](http://o7m5xjmtl.bkt.clouddn.com/930EE28C-87CC-4D25-826C-862F5797D1ED.png)
![](http://o7m5xjmtl.bkt.clouddn.com/359BE07D-C3AB-4394-83DF-2F6C876C5840.png)

```javascript
$('div1').on('mouseover', function () {
    $(this).velocity('callout.shake')// 预定义动画
})
```

### 自定义动画效果
定义自定义动画效果，有两个方式，用法完全一样:
1. $.Velocity.RegisterEffect
2. $.Velocity.RegisterUI

```javascript
// 定义动画效果
$.Velocity.RegisterUI('lixin.pulse', {
    defaultDuration: 300,
    calls: [
        // 前 50% 的时间段,水平方向伸缩 1.1 倍
        [{scaleX: 1.1}, 0.5],
        // 后 50% 的时间段,水平方向伸缩 1 倍（复原）
        [{scaleX: 1}, 0.5]
    ]
})
// 应用动画效果
$('#div2').on('mouseover', function () {
    $(this).velocity('lixin.pulse')
})
```

# 3 弹出式相框案例实现
## 3.1 卡片正面
![](http://o7m5xjmtl.bkt.clouddn.com/93B77F5C-4CB9-45E7-977A-8547EC87D031.png)


## 3.2 卡片背面
![](http://o7m5xjmtl.bkt.clouddn.com/F7D10F55-D46A-462B-BC35-1877DD81A96C.png)

## 3.3 入场动画和按钮点击后的动画
![](http://o7m5xjmtl.bkt.clouddn.com/imooc_velocityJS_photoframe.gif)

*index.html*

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Velocity.js Demo</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <div class="box">
            <img src="img/back.jpg" alt="">
            <img class="buddy" src="img/head.jpg" alt="">
            <div class="inner">
                <h3>慕课网</h3>
                <span>慕课网，只学有用的</span>
                <div class="btn">查看课程</div>
            </div>
        </div>
        <div class="pop">
            <div class="close">&times;</div>
            <h3>慕课网</h3>
            <span>慕课网，只学有用的</span>
            <img src="img/pic1.jpg" alt="">
            <img src="img/pic2.jpg" alt="">
            <img src="img/pic3.jpg" alt="">
            <img src="img/pic4.jpg" alt="">
        </div>
    </div>
</body>
<script src="js/jquery-3.1.1.min.js"></script>
<script src="js/velocity.min.js"></script>
<script src="js/velocity.ui.js"></script>
<script src="js/script.js"></script>
</html>
```

*script.js*

```javascript
/**
 * Created by tonyearth on 2016/12/13.
 */
(function ($) {
    var container = $('.container')
    var box = $('.box')
    var buddy = $('.buddy')
    var pop = $('.pop')
    var open = $('.btn')
    var close = $('.close')
    var imgs = pop.find('img')

    // 从下往上滑动并淡入
    $.Velocity.RegisterUI('mqs.slideUpIn', {
        defaultDuration: 500,
        calls: [
            // 数组中，第一个数字是结束时的值，第二个数字是开始时的值
            [{opacity: [1, 0], translateY: [0, 100]}]
        ]
    })

    // 从上往下滑动并淡出
    $.Velocity.RegisterUI('mqs.slideDownOut', {
        defaultDuration: 300,
        calls: [
            // 数组中，第一个数字是结束时的值，第二个数字是开始时的值
            [{opacity: [0, 1], translateY: [100, 0]}]
        ]
    })

    // 放大淡出
    $.Velocity.RegisterUI('mqs.scaleIn', {
        defaultDuration: 300,
        calls: [
            [{opacity: [1, 0], scale: [1, 0.3]}]
        ]
    })

    // 缩小淡出
    $.Velocity.RegisterUI('mqs.scaleOut', {
        defaultDuration: 300,
        calls: [
            [{opacity: [0, 1], scale: [0.3, 1]}]
        ]
    })

    // 入场动画序列
    // 1. 容器延迟 300 ms 后先出现
    // 2. 其它部分
    var seqInit = [{
        elements: container,
        properties: 'mqs.slideUpIn',
        options: {
            delay: 300
        }
    }, {
        elements: box,
        properties: 'mqs.slideUpIn',
        options: {
            // 值为 false，表示和序列中上一个动画同时开始。默认为 true， 表示在上一个动画完成之后才开始。
            sequenceQueue: false
        }
    }, {
        elements: buddy,
        properties: 'mqs.slideUpIn',
        options: {
            sequenceQueue: false,
            delay: 60
        }
    }]

    // 点击"查看课程"后触发的转场动画序列
    // 1. 卡片正面出场
    // 2. 开片背面入场
    var seqClick = [{
        elements: container,
        properties: 'mqs.slideDownOut'
    }, {
        elements: box,
        properties: 'mqs.slideDownOut',
        options: {
            sequenceQueue: false
        }
    }, {
        elements: container,
        properties: 'mqs.slideUpIn'
    }, {
        elements: pop,
        properties: 'mqs.slideUpIn',
        options: {
            sequenceQueue: false
        }
    }, {
        elements: imgs,
        properties: 'mqs.scaleIn'
    }]

    // 关闭卡片背面后触发的转场动画序列
    // 1. 卡片背面出场
    // 2. 开片正面面入场
    var seqClose = [{
        elements: imgs,
        properties: 'mqs.scaleOut'
    }, {
        elements: container,
        properties: 'mqs.slideDownOut'
    }, {
        elements: pop,
        properties: 'mqs.slideDownOut',
        options: {
            sequenceQueue: false
        }
    }, {
        elements: container,
        properties: 'mqs.slideUpIn'
    }, {
        elements: box,
        properties: 'mqs.slideUpIn',
        options: {
            sequenceQueue: false
        }
    }]

    $.Velocity.RunSequence(seqInit)
    open.on('click', function () {
        $.Velocity.RunSequence(seqClick)
    })
    close.on('click', function () {
        $.Velocity.RunSequence(seqClose)
    })
})(jQuery)
```

