---
title: 原生 JS 实现帧动画库
categories:
    - 慕课网学习笔记
tag:
  - js
---

[原生 JS 实现帧动画库视频教程-慕课网](http://www.imooc.com/learn/659)

[课程资料](https://github.com/ustbhuangyi/animation)

[个人练习](https://coding.net/u/eli01/p/imooc_frame_animation/git)

# 1 认识帧动画
## 1.1 认识帧动画
### 什么是帧动画？
所谓帧动画就是在“连续的关键帧”中分解动画动作，在时间轴的每帧上逐帧绘制不同的内容，使其连续播放而成动画。

由于是一帧一帧地画，所以帧动画具有非常大的灵活性，几乎可以表现任何想表现的内容。

[动画库演示](http://ustbhuangyi.github.io/animation/demo/)

### 常见帧动画方式
+ GIF
* CSS3 animation
* JavaScript

### GIF 和 CSS3 animation 实现帧动画的不足
1. (GIF 、 CSS3 animation)不能灵活地控制动画的 `暂停` 和 `播放`
2. (GIF)不能 `捕捉` 到动画完成的 `事件`
3. (GIF 、 CSS3 animation)不能对帧动画做更加灵活的扩展

### JS 实现帧动画的原理
1. 如果有多张帧图片，用一个  image 标签承载图片，`定时改变 image 的 src 属性`（不推荐）
2. 把所有动画关键帧 `绘制在一张图片` 里，把图片作为元素的 background-image，定时改变元素的 background-position 属性（推荐）

**Demo: 第二种方式简单实现**


![](http://o7m5xjmtl.bkt.clouddn.com/imooc_rabbit_run.gif)

demo.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>动画 demo</title>
    <link rel="stylesheet" href="demo.css">
</head>
<body>
    <div id="rabbit"></div>
    <script src="demo.js"></script>
</body>
</html>
```

demo.css
```css
#rabbit {
    width: 102px;
    height: 80px;
}
```

demo.js
```javascript
/**
 * Created by tonyearth on 2016/12/10.
 */
var imgUrl = 'rabbit-big.png'
var positions = [
    '0 -854',
    '-174 -852',
    '-349 -852',
    '-524 -852',
    '-698 -852',
    '-873 -848'
]
var ele = document.getElementById('rabbit')
animation(ele, positions, imgUrl)

function animation(ele, positions, imgUrl) {
    ele.style.backgroundImage = 'url( ' + imgUrl + ')'
    ele.style.backgroundRepeat = 'no-repeat'
    var index = 0
    function run() {
        var pos = positions[index].split(' ')
        ele.style.backgroundPosition = pos[0] + 'px ' + pos[1] + 'px'
        index++
        if (index >= positions.length) {
            index = 0
        }
        setTimeout(run, 80)
    }
    run()
}
```

```bash
$ python -m SimpleHTTPServer 8080 # 启动一个 python 自带的简单的静态服务器 
```

## 1.2 设计通用帧动画库
![](http://o7m5xjmtl.bkt.clouddn.com/BEBCEE9F-9F4B-42B8-9EBB-B4E9EBB62B2A.png)

### 01 需求分析
1. 支持图片 `预加载`。
2. 支持 `两种` 动画播放方式（img src、backgroundPosition），及自定义每帧动画。
3. 支持单组动画控制`循环次数`（可支持无限次）。
4. 支持一组动画完成，进行`下一组`动画。
5. 支持每个动画完成后有`等待时间`。
6. 支持动画`暂停`和`继续`播放。
7. 支持`动画完成后`执行回调函数。

### 02 编程接口
```javascript
loadImage(imglist) // 预加载图片

changePosition(ele, positions, imageUrl) // 通过改变元素的 background-position 实现动画

changeSrc(ele, imglist) // 通过改变 image 元素的 src

enterFrame(callback) // 每一帧动画执行的函数，相当于用户可以自定义每一帧动画的 callback

repeat(times) // 动画重复执行的次数，times 为空表示无限次

repeatForver() // 无限重复上一次动画，相当于 repeat()， 更友好的一个接口吧

wait(time) // 每个动画执行完后等待的时间

then(callback) // 动画执行完成后的回调函数

start(interval) // 动画开始执行， interval 表示动画执行的间隔

pause() // 动画暂停

restart() // 动画从上一次暂停处重新执行

dispose() // 释放资源
```

### 03 调用方式
+ 支持链式调用
+ 期望用`动词的方式`描述接口

```javascript
var animation = require('animation')
var demoAnimation = animation()
	.loadImage(images)
	.changePosition(ele, positions)
	.repeat(2)
	.then(function () {
		// 动画执行完成后调用次函数
	})
	
demoAnimation.start(80)
```

### 04 代码设计
1. 我们把 “图片与加载->动画执行->动画结束”等一系列操作看成一条 `任务链（数组）`。
   任务链有两种类型的任务：
   a. 同步执行完毕的。
   b. 异步定时执行的（通过计时器或者 raf `requestAnimationFrame`）

2. 记录当前任务链的索引。
3. 每个任务执行完毕后，通过调用 `next` 方法，执行下一个任务，同时更新任务链索引值。

![](http://o7m5xjmtl.bkt.clouddn.com/B6CBEEF6-D283-4FFE-B4A7-F3D4713ACA45.png)


# 2 设计帧动画库
## 2.1 接口定义
```javascript
'use strict'
/**
 * 帧动画库类
 * @constructor
 */
function Animation() {}

/**
 * 添加一个同步任务，去预加载图片
 * @param imglist 图片数组
 */
Animation.prototype.loadImage = function (imglist) {}

/**
 * 添加一个异步定时任务，通过定时改变图片的背景位置，实现帧动画
 * @param ele dom 对象
 * @param positions 背景位置数组
 * @param imageUrl 图片地址
 */
Animation.prototype.changePosition = function (ele, positions, imageUrl) {}

/**
 * 添加一个异步定时任务，通过定时改变 image 标签的 src 属性，实现帧动画
 * @param ele image 标签
 * @param imglist 图片数组
 */
Animation.prototype.changeSrc = function (ele, imglist) {}

/**
 * 高级用法，添加一个异步定时执行的任务，
 * 该任务自定义动画每帧执行的任务函数
 * @param taskFu 自定义每帧执行的任务函数
 */
Animaton.prototype.enterFrame = function (taskFu) {}

/**
 * 添加一个同步任务，可以在上一个任务完成后执行回调函数
 * @param callback 回调函数
 */
Animation.prototype.then = function (callback) {}

/**
 * 开始执行任务
 * @param interval 异步定时任务执行的间隔
 */
Animation.prototype.start = function (interval) {}

/**
 * 添加一个同步任务，该任务就是回退到上一个任务中，
 * 实现重复上一个任务的效果，可定义重复的次数
 * @param times 重复次数
 */
Animation.prototype.repeat = function (times) {}

/**
 * 添加一个同步任务，相当于 repeat() 更友好的接口，无限循环上一次任务
 */
Animation.prototype.repeatForever = function () {}

/**
 * 设置当前任务执行结束后到下一个任务执行开始前的等待时间
 * @param time 等待时长
 */
Animation.prototype.wait = function (time) {}

/**
 * 暂停当前异步定时任务
 */
Animation.prototype.pause = function () {}

/**
 * 重新执行上一次暂停的异步任务
 */
Animation.prototype.restart = function () {}

/**
 * 释放资源
 */
Animation.prototype.dispose = function () {}
```

## 2.2 图片预加载实现
>  封装图片预加载功能为独立的 cmd 模块。  

+ 图片信息数据格式检查
* 加载超时处理
* 判断全部加载成功技巧：& 操作
* 任务完成后清除资源

*imageLoader.js*

```javascript
'use stract'

/**
 * 预加载图片函数
 * @param images 加载图片的数组或者对象
 * @param callback 全部图片加载完毕后调用的回调函数
 * @param timeout 加载超时的时长
 */
function loadImage(images, callback, timeout) {
    // 加载完成图片的计数器
    var count = 9
    // 全部图片加载成功的一个标志位
    var success = true
    // 超时 timer 的 id
    var timeoutId = 0
    // 是否加载超时的标志位
    var isTimeout = false

    // 对图片数组（或对象）进行遍历
    for (var key in images) {
        // 过滤掉 prototype 上的属性
        if (!images.hasOwnProperty(key)) {
            continue
        }
        // 获取每个图片元素
        // 期望格式是个 object: {src:xxx}
        var item = images[key]
        if (typeof  item === 'string') {
            item = images[key] = {
                src: item
            }
        }
        // 如果格式不满足期望，则丢弃此条数据进行下一次遍历
        if (!item || !item.src) {
            continue
        }
        // 计数+1
        count++
        // 设置图片元素的 id
        item.id = '_img_' + key + getId()
        // 设置图片元素的 img, 它是一个 Image 对象
        item.img = window[item.id] = new Image()
        doLoad(item)
    }
    // 遍历完成如果计数为0， 则直接调用 callback
    if (!count) {
        callback(success)
    } else if (timeout) {
        timeoutId = setTimeout(onTimeout, timeout)
    }
    /**
     * 真正进行图片加载的函数
     * @param item 图片元素对象
     */
    function doLoad(item) {
        item.status = 'loading'
        var img = item.img
        // 定义图片加载成功的回调函数
        img.onload = function () {
            success = success & true
            item.status = 'loaded'
            done()
        }
        // 定义图片加载失败的回调函数
        img.onerror = function () {
            success = false
            item.status = 'error'
            done()
        }

        // 发起一个 http(s) 的请求
        img.src = item.src
        /**
         * 每张图片加载完成的回调函数（无论成功或失败）
         */
        function done() {
            img.onload = img.onerror = null
            try {
                delete window[item.id]
            } catch (e) {

            }
            // 每张图片加载完成，计数器减一，当所有图片加载完成且没有超时的情况，
            // 清除超时计时器，且执行回调函数
            if(!--count && !isTimeout) {
                clearTimeout(timeoutId)
                callback(success)
            }
        }
    }

    /**
     * 超时函数
     */
    function onTimeout() {
        isTimeout = true
        callback(false)
    }
}

var _id = 0
function getId() {
    return ++_id
}
module.exports = loadImage
```

## 2.3 图片预加载的应用
+ 导入与图片预加载模块（cmd）
* 作为一个同步任务加入到任务链

*关键代码片段(animation.js)*

```javascript
var loadImage = require('./imageLoader')
...

/**
 * 添加一个同步任务，去预加载图片
 * @param imglist 图片数组
 */
Animation.prototype.loadImage = function (imglist) {
    var taskFn = function (next) {
        // 使用 slice ，目的是获得 imglist 的深拷贝，避免对引用的原 imglist 产生影响
        loadImage(imglist.slice(), next)
    }
    var type = TASK_SYNC
    return this._add(taskFn, type)
}

...

```

## 2.4 从入口函数开始
+ 任务对象
* 同步任务和异步任务
* 任务链实现

*关键代码(animation.js)*
```javascript
/**
 * 执行任务
 * @private
 */
Animation.prototype._runTask = function () {
    // 没有任务或任务没有开始，则什么也不做
    if (!this.taskQueue || this.state !== STATE_START) {
        return
    }
    // 任务链已经全部执行完毕，则什么也不做
    if (this.index === this.taskQueue.length) {
        this.dispose()
        return
    }
    // 获得任务链上的当前任务
    var task = this.taskQueue[this.index]
    if (task.type === TASK_SYNC) {
        this._syncTask(task)
    } else {
        this._asyncTask(task)
    }
}

/**
 * 同步任务
 * @param task 执行的任务对象
 * @private
 */
Animation.prototype._syncTask = function (task) {
    var me = this
    var next = function () {
        // 切换到下一个任务
        me._next()
    }
    var taskFn = task.taskFn
    taskFn(next)
}

/**
 * 异步任务
 * @param task 执行的任务对象
 * @private
 */
Animation.prototype._asyncTask = function (task) {

}
/**
 * 切换到下一个任务
 * @private
 */
Animation.prototype._next = function () {
    this.next++
    this._runTask()
}
```

## 2.5 timeline 的实现
**说明：** timeline 作为一个模块，用来实现平滑的帧动画。
+ 使用 requestAnimationFrame  API 避免丢帧
* 包装 requestAnimationFrame  API，兼容低版本浏览器
* +new Date() 替代 Date.now() 性能更好
* 记录动画执行的时长，帧与帧之间的间隔，保证帧动画的频率

```javascript
/**
 * Created by tonyearth on 2016/12/11.
 */
'use strict'
var DEFAULT_INTERVAL = 1000 / 60
// 初始化状态
var STATE_INTERVAL = 0
// 开始状态
var STATE_START = 1
// 停止状态
var STATE_STOP = 2

var requestAnimationFrame = (function () {
    return window.requestAnimationFrame
        || window.webkitRequestAnimationFrame
        || window.mozRequestAnimationFrame
        || window.oRequestAnimationFrame
        || function (callback) {
            return window.setTimeout(callback, callback.interval) || DEFAULT_INTERVAL
        }
})()

var cancelAnimationFrame = (function() {
    return window.cancelAnimationFrame
        || window.webkitCancelAnimationFrame
        || window.mozCancelAnimationFrame
        || window.oCancelAnimationFrame
        || function (id) {
            return window.clearTimeout(id)
        }
})()

/**
 * Timeline 时间轴类
 * @constructor
 */
function Timeline() {
    this.animationHandler = 0
    this.state = STATE_INTERVAL
}

/**
 * 时间轴上每一次回调执行的函数
 * @param time 从动画开始到当前执行的时间
 */
Timeline.prototype.onenterframe = function (time) {

}

/**
 * 动画开始
 * @param interval 每一次回调的间隔时间
 */
Timeline.prototype.start = function (interval) {
    if (this.state === STATE_START) {
        return
    }
    this.state = STATE_START
    this.interval = interval || DEFAULT_INTERVAL
    startTimeline(this, +new Date())
}

/**
 * 动画停止
 */
Timeline.prototype.stop = function () {
    if (this.start !== STATE_START) {
        return
    }
    this.state = STATE_STOP
    // 如果动画开始过，则记录动画从开始到现在所经历的时间
    if (this.startTime) {
        this.dur = +new Date() - this.startTime
    }
    cancelAnimationFrame(this.animationHandler)
}

/**
 * 重新开始动画
 */
Timeline.prototype.restart = function () {
    if (this.state === STATE_START) {
        return
    }
    if (!this.dur || !this.interval) {
        return
    }
    this.start = STATE_START
    // 无缝链接动画
    startTimeline(this, +new Date() - this.dur)
}

/**
 * 时间轴动画启动函数
 * @param timeline 时间轴的实例
 * @param startTime 动画开始的时间戳
 */
function startTimeline(timeline, startTime) {
    timeline.startTime = startTime
    nextTick.interval = timeline.interval
    // 记录上一次回调的时间戳
    var lastTick = +new Date()
    nextTick()
    /**
     * 定义每一帧执行的函数
     */
    function nextTick() {
        var now = +new Date()
        timeline.animationHandler = requestAnimationFrame(nextTick)
        // 如果当前时间与上一次回调的时间戳大于设置的时间间隔，
        // 表示这一次可以执行回调函数
        if (now - lastTick >= timeline.interval) {
            timeline.onenterframe(now - startTime)
            lastTick = now
        }
    }
}
module.exports = Timeline
```

## 2.6 剩余接口实现
+ changePosition
* changeSrc
* then
* reStart
* repeat
* repeatForever
* wait
* pause
* dispose

# 3 webpack打包及帧动画库演示
## 3.1 webpack打包和 demo 编写
### 环境
(1) 全局安装 webpack
```bash
$ npm i webpack -g
$ npm i webpack-dev-server -g
```

(2) package.json
```javascript
{
  "name": "application-name",
  "version": "0.0.1",
  "devDependencies": {
    "webpack": "^1.12.11"
  }
}
```

(3) webpack.config.js
```javascript
/**
 * Created by tonyearth on 2016/12/11.
 */
module.exports = {
    entry: {
        animation: './src/animation.js'
    },
    output: {
        path: __dirname + '/build',// ./build
        filename: '[name].js',// animation.js
        library: 'animation',// 在全局注册一个 window.animation 对象
        libraryTarget: 'umd'// 兼容 amd、 cmd 或挂载到 window
    }
}
```

### 简单的 DEMO
*demo.html*
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>动画 demo</title>
    <link rel="stylesheet" href="demo.css">
</head>
<body>
    <div id="rabbit"></div>
    <script src="../build/animation.js"></script>
    <script src="demo.js"></script>
</body>
</html>
```

*demo.js*
```javascript
/**
 * Created by tonyearth on 2016/12/10.
 */
var imgUrl = 'rabbit-big.png'
var positions = [
    '0 -854',
    '-174 -852',
    '-349 -852',
    '-524 -852',
    '-698 -852',
    '-873 -848'
]
var ele = document.getElementById('rabbit')
var animation = window.animation
var repeatAnimation = animation() // 获取实例
    .loadImage([imgUrl]) // 任务1：预加载图片
    .changePosition(ele, positions, imgUrl) // 任务2： 帧动画
    .repeatForever() // 任务3：无限重复上面的动画
repeatAnimation.start(80)
```

## 3.2 demo 的完整实现

*demo.html*
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>动画 demo</title>
    <link rel="stylesheet" href="demo.css">
</head>
<body>
    <div id="rabbit1" class="rabbit"></div>
    <div id="rabbit2" class="rabbit"></div>
    <div id="rabbit3" class="rabbit"></div>
    <div id="rabbit4" class="rabbit"></div>
    <script src="../build/animation.js"></script>
    <script src="demo.js"></script>
</body>
</html>
```

*demo.js*
```javascript
/**
 * Created by tonyearth on 2016/12/10.
 */
function $(id) {
    return document.getElementById(id)
}

$rabbit1 = $('rabbit1')
$rabbit2 = $('rabbit2')
$rabbit3 = $('rabbit3')
$rabbit4 = $('rabbit4')

var images = ['rabbit-big.png', 'rabbit-lose.png', 'rabbit-win.png']
var rightRunningMap = ['0 -854', '-174 -852', '-349 -852', '-524 -852', '-698 -852', '-873 -848']
var leftRunningMap = ["0 -373", "-175 -376", "-350 -377", "-524 -377", "-699 -377", "-873 -379"]
var rabbitWinMap = ["0 0", "-198 0", "-401 0", "-609 0", "-816 0", "0 -96", "-208 -97", "-415 -97", "-623 -97", "-831 -97", "0 -203", "-207 -203", "-415 -203", "-623 -203", "-831 -203", "0 -307", "-206 -307", "-414 -307", "-623 -307"]
var rabbitLoseMap = ["0 0", "-163 0", "-327 0", "-491 0", "-655 0", "-819 0", "0 -135", "-166 -135", "-333 -135", "-500 -135", "-668 -135", "-835 -135", "0 -262"]

/* 动画1 */
function repeat () {
    var repeatAnimation = animation()
        .loadImage(images) // 任务1：预加载图片
        .changePosition($rabbit1, rightRunningMap, images[0]) // 任务2： 帧动画
        .repeatForever() // 任务3：无限重复上面的动画
    repeatAnimation.start(80)
}

repeat()

/* 动画2 */
function win() {
    var winAnimation = animation()
        .loadImage(images)
        .changePosition($rabbit3, rabbitWinMap, images[2])
        .repeat(3)
        .then(function () {
            console.log('win animation repeat 3 times and finished!')
        })
    winAnimation.start(200)
}
win()

/* 动画3 */
function lose() {
    var loseAnimation = animation()
        .loadImage(images)
        .changePosition($rabbit2, rabbitLoseMap, images[1])
        .wait(1000)
        .repeat(1)
        .then(function () {
            console.log('lose animation repeat 1 times and finished')
        })
    loseAnimation.start(200)
}

lose()

/* 动画4 */
function run() {
    var speed = 6
    var initLeft = 0
    var finalLeft = 400
    var frameLength = 6
    var frame = 4
    var right = true
    var interval = 50
    var runAnimation = animation()
        .loadImage(images)
        .enterFrame(function (success, time) {
            var radio = time / interval
            var position
            var left
            if (right) {
                position = rightRunningMap[frame].split(' ')
                left = Math.min(initLeft + speed * radio, finalLeft)

                if (left === finalLeft) {
                    right = false
                    frame = 4
                     success()
                    return
                }
            }
            else {
                position = leftRunningMap[frame].split(' ')
                left = Math.max(initLeft, finalLeft - speed * radio)
                if (left === initLeft) {
                    right = true
                    frame = 4
                    success()
                    return
                }
            }
            $rabbit4.style.backgroundImage = 'url(' + images[0] + ')'
            $rabbit4.style.backgroundPosition = position[0] + 'px ' + position[1] + 'px'
            $rabbit4.style.left = left + 'px'
            frame++
            if (frame === frameLength) {
                frame = 0
            }
        })
        .repeat(2)
        .wait(1000)
        .changePosition($rabbit4, rabbitWinMap, images[2])
        .then(function () {
            console.log('finished!')
        })
    runAnimation.start(interval)
}

run()

```

