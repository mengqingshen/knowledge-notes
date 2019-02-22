---
title: 4 移动应用组件(React Native开发指南)
categories:
  - React Native开发指南
tag:
  - ReactNative
---

## 4.1 类比 HTML 元素与原生组件
**说明：**在React Native中,我们不使用HTML元素，但使用类似于它们的各种组件。
**注意：**虽然这些元素有相似的作用,但它们不可以相互替换

**类比 HTML 和原生组件**
HTML|React Native
-|-
div|View
img|Image
span,p|Text
ul/ol,li|ListView, child items

### 4.1.1 文本组件

标签|说明|备注
-|-|-
`<Text>`|文本组件|在 `React Native` 中,仅有 `<Text>` 组件可以将纯文本作为子节点

#### 为文本样式创建可复用组件
**说明：**`React Native`坚持自己的偏好,提倡样式组件的复用而不是样式的复用

```javascript
/**
 * 封装一些样式组件
 */
import React, { Component } from 'react';

import {
	StyleSheet,
	Text,
	View
} from 'react-native';

const styles = StyleSheet.create({
	bold: {
		fontWeight: 'bold'
	},
	italic: {
		fontStyle: 'italic'
	},
	title: {
		fontSize: 20,
	}
});

class Strong extends Component {
	render() {
		return (
			<Text style={styles.bold}>
				{this.props.children}
			</Text>
		);
	}
}

class Title extends Component {
	render() {
		return (
			<Text style={[styles.title, styles.bold]}>
				{this.props.children}
			</Text>
		)
	}
}

class Em extends Component {
	render() {
		return (
			<Text style={styles.italic}>
				{this.props.children}
			</Text>
		);
	}
}

export { Strong, Em, Title }
```

### 4.1.2 图片组件
**声明：**书中的做法还可以继续用，但0.14版本之后提供了更佳的方式，见[中文文档](http://reactnative.cn/docs/0.31/images.html#content)

## 4.2 处理触摸和手势
**说明：**`React Native`提供了许多`API`,你可以使用这些`API`开发可触摸的界面。

### 4.2.1 使用 TouchableHighlight
**说明：**任何能响应用户触摸事件的界面元素(按钮、控制元素等)通常都需要用 `<TouchableHighlight> `包装起来
+ 基础的用法就是用它将组件包装起来,之后按下它时就会产生 一个简单的叠层效果
+ 为像 `onPressIn`、`onPressOut`、 `onLongPress` 这样的事件提供了钩子

**用途：**无论哪里需要 一个类似 Web 平台上的按钮或者链接,你都可以使用 `<TouchableHighlight>`

```javascript
import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableHighlight
} from 'react-native';

import {
	Title
} from './common';

class Button extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pressing: false
		}
	}

	_onPressIn() {
		this.setState({
			pressing: true
		})
	}
	_onPressOut() {
		this.setState({
			pressing: false
		})
	}

	render() {
		return (
			<View>
				<Title>4.2.1 使用TouchableHighlight</Title>
				<View style={styles.container}>
					<TouchableHighlight
						onPressIn={this._onPressIn.bind(this)}
						onPressOut={this._onPressOut.bind(this)}
						style={styles.touchable}>

						<View style={styles.button}>
							<Text style={styles.welcome}>
								{this.state.pressing ? 'EEK' : 'PUSH ME'}
							</Text>
						</View>
					</TouchableHighlight>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
		color: '#FFFFFF',
	},
	touchable: {
		borderRadius: 100,
		height: 200,
		width: 200,
		justifyContent: 'center',
	},
	button: {
		backgroundColor: '#ff0000',
		borderRadius: 100,
		height: 200,
		width: 200,
		justifyContent: 'center'
	}
});
export default Button;
```

### 4.2.2 GestureResponder 系统
**说明：**`PanResponder` 接口的基础，一个低层的接口
**技巧：**这是相当低层的接口,如果你想使用这种方法进行手势的检测和响应,可能需要一些时间 来调整正确的参数,并弄懂哪些值是你应该关注的
****
**触摸响应器(touch responder)**
**说明：**处理特定触摸事件的视图。通过`GestureResponder`系统，可以指定自己的组件为`触摸响应器`。

****
**触摸事件有三个主要的生命周期阶段**
阶段|类比 web
-|-
开始|mouseDown
移动|mouseMove
释放|mouseUp

**申请`响应状态`流程**
控制响应状态的函数|说明
-|-
View.props.onStartShouldSetResponder|是否在`开始`阶段请求成为`触摸响应器`？
View.props.onMoveShouldSetResponder|是否在`移动`阶段请求成为`触摸响应器`？
View.props.onResponderGrant|图现在正在响应触摸事件。这个时候要高亮标明并显示给用户正在发生的事情
View.props.onResponderReject|其它的视图获得了响应并且不会释放
View.props.onStartShouldSetResponderCapture|是否防止子视图在触摸`开始`时成为应答器？
View.props.onMoveShouldSetResponderCapture|是否防止子视图在触摸`移动`时成为应答器？
![Alt text](http://cdn.mengqingshen.com/img/1474365554788.png)

****
**事件处理钩子**
钩子|说明
-|-
View.props.onResponderMove|用户正在移动手指
View.props.onResponderRelease|触摸结束被调用(也就是`touchUp`)
View.props.onResponderTerminationRequest|其他元素想成为响应器。当前视图应该释放吗?返回 `true` 则允许释放
View.props.onResponderTerminate|响应器被收回之后调用。它可能被其他视图通过调用 onResponderTerminationRequest|收回,或被操作系统强制收回(iOS 的控制中心或消息通知)

****
**触摸事件对象**
触摸事件属性|说明
-|-
changedTouches|在上一次事件之后,所有发生变化的触摸事件的数组集合
identifier|触摸点的标识符
locationX|触摸点相对于父元素的横坐标
locationY|触摸点相对于父元素的纵坐标
pageX|触摸点相对于屏幕的横坐标
pageY|触摸点相对于屏幕的纵坐标
target|接受触摸事件的元素节点的标识符
timestamp|触摸事件的时间戳,可用于移动速度的计算
touches|当前屏幕上所有触摸点的集合

### 4.2.3 PanResponder
**说明：**不像`<TouchableHighlight>`,`PanResponder`并不是一个组件,而是`React Native`的一个类, 它提供了处理原生事件相对高层的接口
gestureState的属性|说明
-|-
stateID|gestureState 的标识符(只要屏幕上至少有一个触摸点就会被保留)
moveX|最近一次触摸移动时的屏幕横坐标
moveY|最近一次触摸移动时的屏幕纵坐标
x0|当响应器产生时的屏幕坐标
y0|当响应器产生时的屏幕坐标
dx|从触摸操作开始时的累计横向路程
dy|从触摸操作开始时的累计纵向路程
vx|当前的横向移动速度
vy|当前的纵向移动速度
numberActiveTouches|当前屏幕上的有效触摸点数量

#### 实例

![Alt text](http://cdn.mengqingshen.com/img/panresponder.gif)

### 4.2.4 PK
PanResponder|PanResponder(基于GestureResponder)
-|-
为了给用户提供基础的反馈,指明一个按钮或其他元素是可触摸的|实现自己定制的触摸界面,你可以使用原始的`GestureResponder`或 `PanResponder`(更常用)

## 4.3 使用结构化组件
### 4.3.1 使用 ListView
**说明：**`<ListView> `其实就是一系列视图的集合,通过它可以选择性地添加一些 特殊视图,如分隔符、头部和尾部
**技巧：**`<ListView>` 的头 部和尾部不是固定不动的,它们也会跟随列表一起滚动。如果你需要一个固定不动的头部 和尾部,最简单的办法就是在 `<ListView> `组件之外单独渲染
**注意：**`<ListView> `元素通常都是被高度优化的,因此渲染可以流畅 无卡顿。但如果你打算在 `<ListView>` 中渲染大量的列表项,最好保证子视图相对简洁,来尝 试减少卡顿

两个 ListView 的 prop |说明
-|-
dataSource|一个数据源实例(通过`ListView.DataSource()`构造器创建)，包含需要被渲染的源数据信息
renderRow|一个函数，基于每一行的数据来返回一些 `JSX`

#### `cloneWithRows()`
**说明：**`dataSource` 的实例方法，参数为一个数组，返回一个包含了数组信息的`dataSource`实例。

### 4.3.2 使用 Navigator
**说明：**`<Navigator> `允许你的应用在不同屏幕之间切换(通常叫作“场景”)。它维护了一个`栈` 路由,因此可以推入(`push`)、弹出(`pop`)和替换(`replace`)场景。你可以将其类比为浏览器的 `history` 接口。一个“路由”就是场景的名称和索引。
**扩展：**实际上有两个 `Navigator` 可供选择:跨平台` <Navigator>` 组件和 `<NavigatorIOS>` 组 件。本书中,我们选择使用 `<Navigator>`。

### 4.3.3 其他结构化组件
**说明：**为特定平台的 UI元素封装的原生接口以特定平台的名称为后缀命名，比如
+ `<TabBarIOS>`
+ `<SegmentedControlIOS>`
+ ` <DrawerLayoutAndroid>` 
+  ` <ToolbarAndroid>`

## 4.4 平台特定组件

### 4.4.1 iOS 或 Android 特定组件
**说明：**平台特定的组件命名为`文件名.ios.js` 或 `文件名.android.js`,比如
+ SwitchIOS
+ SwitchAndroid

**注意：**如果你尝试在错误的平台引入组件,应用将会崩溃
**扩展：**组件也可以拥有平台特定的属性,这些都在文档中有专门的标注,还有它们的用法，比如`TextInput`

### 4.4.2 平台特定版本的组件
**说明：**任何文件都 可以使用`组件名.android.js`或`组件名.ios.js`命名规范针对 `Android` 或 `iOS` 进行不同的实现。`React` 包管理器将会自动基于平台选择正确的实现


### 4.4.3 何时使用平台特定组件
**Apple 和 Google 都为各自的平台提供了人机界面指南** 
+ iOS 人机界面指南(https://developer.apple.com/library/ios/documentation/UserExperience/ Conceptual/MobileHIG/)
+ Android设计参考(https://developer.android.com/design/index.html)

**建议：**通过创建平台特定版本的组件,可以更好地实现代码复用和平台定制之间的平衡。大部 分情况下,为了同时支持`iOS` 和 `Android` 平台,可能只需要用到少数分别支持特定平台 的组件

## 4.5 小结