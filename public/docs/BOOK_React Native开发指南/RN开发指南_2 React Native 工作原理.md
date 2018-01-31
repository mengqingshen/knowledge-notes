---
title: 2 React Native 工作原理(React Native开发指南)
categories:
  - React Native开发指南
tag:
  - ReactNative

---


## 2.1 React Native 是如何工作的？
### 2.1.1 React 的一个特 点:Virtual DOM
**用途：**执行 Virtual DOM 的计算,减少浏览器 DOM 的重复渲染
**潜力：**潜力在于提供了强大的抽象能力。在开 发者的代码与实际的渲染之间加入一个抽象层,这带来了很多可能性。
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1473752946136.png)

### 2.1.2 React Native 工作原理
+ 调用 Objective-C 的 API 去渲染 iOS 组件
+ 调用 Java 接口去渲染 Android 组件

![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1473753026098.png)

## 2.2 渲染周期
**说明：** `React`的
**注意：**至于 `React Native`,生命周期与 `React` 基本相同,但渲染过程有一些区别
**React 组件挂载过程**
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1473753275389.png)

**React 组件重新渲染过程**
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1473753282710.png)

## 2.3 在React Native中创建组件

###  2.3.1 编写视图
**DEMO：**[https://github.com/facebook/react- native#examples](https://github.com/facebook/react- native#examples)
**web与React Native 基础元素比较**

React| React Native
-|-
`<div>`|`<View>`
`<span>`|`<Text>`
`<li>,<ul>`|`<ListView>`
`<img>`|`<Image>`

**其他组件则是平台特定的**
```javascript
 <DatePickerIOS
       date={this.state.date}
       mode="date"
       timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
/>
```

### 2.3.2 使用 JSX
`JSX 认为减少心智负担比文件分离更有用`
**说明：**与 `React` 中相一致,`React Native` 也是通过编写 `JSX` 来设计视图,并将视图标记和控制逻辑 组合在一起成为一个文件

```javascript
 var HelloMessage = React.createClass({
       displayName: "HelloMessage",
       render: function render() {
         return React.createElement(
"div", null,
   React Native工作原理
| 9
"Hello ",
           this.props.name
         );
} });
React.render(React.createElement(HelloMessage, { name: "Bonnie" }), mountNode);
```

### 2.3.3 原生组件的样式
**DEMO：**[https:// github.com/facebook/react-native/tree/master/Examples/UIExplorer](https:// github.com/facebook/react-native/tree/master/Examples/UIExplorer)
**说明：**`React` 和宿主平台之间的“桥接”包含了一 个`缩减版 CSS 子集`的实现。这个 `CSS `子集主要通过 `flexbox`进行布局,做到了尽量简单 化,而不是去实现所有的 `CSS` 规则。

```javascript
// 定义一个样式。 
var style = {
	backgroundColor: 'white',
    fontSize: '16px'
};
// 然后使用它。 var tv = (
<Text style={style}>
  A styled Text
</Text>);
```

## 2.4 宿主平台接口
**注意：**`React Native` 的“桥接”不可能暴露宿主平台全部的接口。如果你需要使用一 个未支持的特性,完全可以自己动手添加到 `React Native` 中
## 2.5 小结
**说明：**使用 React Native 为移动应用编写组件与 Web 环境的 React 相比有一些不同
+ JSX 是强制使 用的
+ 通过创建组件的方式来开发基本模块
+ 通过使用 CSS 的子集编写内联语句的方式来编写样式