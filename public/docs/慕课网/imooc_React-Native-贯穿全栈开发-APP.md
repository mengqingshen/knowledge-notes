---
title: React Native 贯穿全栈开发 APP
categories:
    - 慕课网学习笔记
tag:
  - nodejs
  - MongoDB
  - ReactNative

date: 2017-05-01 19:40
typora-copy-images-to: ipic
---

[课程网址](http://coding.imooc.com/class/56.html)

# 0 课程介绍

## 0.1 谁需要这门课程？

**课程价值**

即将工作，需要一个足够打动面试官的求职作品。

职业发展遇到瓶颈，需要一个打通前后端任督二脉的超车技术栈。

想独立创业，但公司技术人员有限，需要一种能力通吃前后端开发。

![882D0CDB-DB4D-4AC5-B1A1-92C80B1CFB19](http://o6ul1xz4z.bkt.clouddn.com/2017-05-01-882D0CDB-DB4D-4AC5-B1A1-92C80B1CFB19.png)



**适用人群**

![AED8B097-DB89-4C53-8CB2-E3139B18D44A](http://o6ul1xz4z.bkt.clouddn.com/2017-05-01-AED8B097-DB89-4C53-8CB2-E3139B18D44A.png)

## 0.2 实战项目介绍

**完整的 APP 开发流程**

![570D9EFE-A0CC-469F-BCA4-91C211CA3979](http://o6ul1xz4z.bkt.clouddn.com/2017-05-01-570D9EFE-A0CC-469F-BCA4-91C211CA3979.png)

## 0.3 APP 功能介绍

### 桌面图标和启动画面

![2F3BB186-3327-4570-9A2E-E5A045F7B577](http://o6ul1xz4z.bkt.clouddn.com/2017-05-01-2F3BB186-3327-4570-9A2E-E5A045F7B577.png)

### 过度页面和轮播效果

![18A3986C-D085-4AB6-9ADF-840A6F430F78](http://o6ul1xz4z.bkt.clouddn.com/2017-05-01-18A3986C-D085-4AB6-9ADF-840A6F430F78.png)

### 注册登录和账户管理

![130F9764-04B8-4F04-9ED5-AF3AB490607C](http://o6ul1xz4z.bkt.clouddn.com/2017-05-01-130F9764-04B8-4F04-9ED5-AF3AB490607C.png)![52A268EC-E64E-4474-9165-F49A79918AAD](http://o6ul1xz4z.bkt.clouddn.com/2017-05-01-52A268EC-E64E-4474-9165-F49A79918AAD.png)![F9E03C12-AB29-4BC0-85DD-39C1CD318FCD](http://o6ul1xz4z.bkt.clouddn.com/2017-05-01-F9E03C12-AB29-4BC0-85DD-39C1CD318FCD.png)  

### 视频的配音制作页面

![FB55C162-8EEB-4D53-BFBF-84D8088EB6D5](http://o6ul1xz4z.bkt.clouddn.com/2017-05-01-D01D4730-8B82-4239-BBE2-36F344EC6C70.png)![673134D8-1109-491F-8847-F350D1C15D21](http://o6ul1xz4z.bkt.clouddn.com/2017-05-01-673134D8-1109-491F-8847-F350D1C15D21.png)



​    ![DDB6085D-A10F-4F77-B3DD-88CA39E4B307](http://o6ul1xz4z.bkt.clouddn.com/2017-05-01-DDB6085D-A10F-4F77-B3DD-88CA39E4B307.png)  ![1AC37DB1-5952-4F98-948A-652E76AA26F1](http://o6ul1xz4z.bkt.clouddn.com/2017-05-01-1AC37DB1-5952-4F98-948A-652E76AA26F1.png) 



### 展现所有制作完毕的创意视频列表

![9D5AE200-A2A3-493F-98F7-E556D9A0E7F6](http://o6ul1xz4z.bkt.clouddn.com/2017-05-01-9D5AE200-A2A3-493F-98F7-E556D9A0E7F6.png)![F5A2E11D-8BCE-41F9-910B-ED6ED175665A](http://o6ul1xz4z.bkt.clouddn.com/2017-05-01-F5A2E11D-8BCE-41F9-910B-ED6ED175665A.png)![CAE44957-D7E2-49C9-9AFF-C62A01C947BD](http://o6ul1xz4z.bkt.clouddn.com/2017-05-01-CAE44957-D7E2-49C9-9AFF-C62A01C947BD.png)

## 0.4 APP 后台

![A91AFC02-5CD0-4503-9F50-0D7FD254E490](http://o6ul1xz4z.bkt.clouddn.com/2017-05-01-A91AFC02-5CD0-4503-9F50-0D7FD254E490.png)  



## 0.5 要点

### 环境搭建

![557CE284-84C8-48C0-912E-B785D565264F](http://o6ul1xz4z.bkt.clouddn.com/2017-05-01-557CE284-84C8-48C0-912E-B785D565264F.png)

### 服务器端



![17B2329A-63D9-4F63-B913-719BD59CFE20](http://o6ul1xz4z.bkt.clouddn.com/2017-05-01-17B2329A-63D9-4F63-B913-719BD59CFE20.png)

### 前后端连调

![5B6CDA95-0E79-4BA9-923F-71673D97C9F9](http://o6ul1xz4z.bkt.clouddn.com/2017-05-01-5B6CDA95-0E79-4BA9-923F-71673D97C9F9.png)





# 1 课程预热

## 1.1 React 与 React Native

React 是 Facebook 推出的一种解决页面组建的抽象和形态的技术方案。它有两个工程上的实现

☑ [Reactjs](https://github.com/facebook/react), 也就是我们通常说的 React，用在 Web 网页端，也就是用在浏览器中。

☑ [React Native](https://github.com/facebook/react-native), 我们俗称 RN， React Native 用在移动客户端，也就是 iOS 或者 android 手机 APP。看看市面上使用了 React Native 的 [showcase](http://facebook.github.io/react-native/showcase.html)。



### React Native 的性能

![B37DFE6F-B67F-4087-B827-0BD00621E4EA](http://o6ul1xz4z.bkt.clouddn.com/2017-05-01-B37DFE6F-B67F-4087-B827-0BD00621E4EA.png)

**Hybrid 混合应用**

原生的应用中利用 webview 装入一些 HTML 界面。



**codava “包皮” 应用**

原生的部分只是一个壳子，开发用的全是 WEB 技术，比如 PhoneGap ，一次编写，到处使用。相比原生应用，一些复杂的页面有明显的性能问题。

![5A927112-FBB2-4237-87DA-552ED6984037](http://o6ul1xz4z.bkt.clouddn.com/2017-05-01-5A927112-FBB2-4237-87DA-552ED6984037.png)

**React Native**

RN 可以看作是基于 React 之上的一种针对特定平台的技术开发方案，其内在依然是 React。用开发WEB的方式开发 APP，利用原生 API 渲染界面，从而获得接近原生 APP 的性能。



## 1.2 为何选择 React Native

☑ 职业发展

![535E8284-335C-4DB4-9652-BDA122A9F6EB](http://o6ul1xz4z.bkt.clouddn.com/2017-05-01-535E8284-335C-4DB4-9652-BDA122A9F6EB.png)



☑ 优秀的核心思想

![FFAA5529-FE25-4BD1-AC20-0A77ECD232E4](http://o6ul1xz4z.bkt.clouddn.com/2017-05-01-FFAA5529-FE25-4BD1-AC20-0A77ECD232E4.png)

☑ 刚毕业或刚入行的新人，会感觉跟不上市场对前端技术的需求。因为你们可能没有兼容过 IE6、7、8、火狐那个年代，每一行代码都断点调试，对 JS 的内部机制，DOM 的性能等细小的技术点没有那么多时间实践和研究，也没有经历过打包、组件抽象和构建，各种异步加载起的折腾，如果现在花时间重新走一遍，反而跟不上市场的脚步。预期为这个历史买单，到不如投资未来，直接切入到 React 和 React Native 的中，反而没有历史包袱。利用这个机会可以弯道超车，直接进入前端开发或者 APP 开发这个职业。职业发展是阶段性的，技术学习是终身的，现在市场上活下来，再沉淀，直到切入到更细分的技术选型。

![9598C18F-AC6B-4711-BD81-CE085B720691](http://o6ul1xz4z.bkt.clouddn.com/2017-05-01-9598C18F-AC6B-4711-BD81-CE085B720691.png)



☑ 在语法这个技术层面 RN 的优势

+ RN 是纯的 JavaScript 组件化，不掺和不同的语言形态。
+ RN 的技术框架，允许你很方便的介入和调用到各个平台下的 API。
+ RN 的布局用到的是 flex 布局，上手成本很小。
+ 渲染原生视图的能力，性能有保障。
+ 组件化开发，快速开发原型，在交互上混，唯快不破！



**总而言之，学会 React 的基本语法以后，可以去开发网页，可以去开发 iOS APP ,可以去开发 Android APP，一招走遍天下。**

## 1.3 RN 适合你吗？

![DBAAAD84-B012-49AD-A19A-D3CE9237EEE3](http://o6ul1xz4z.bkt.clouddn.com/2017-05-01-DBAAAD84-B012-49AD-A19A-D3CE9237EEE3.png)

# 2 初识 React Native

## 2.1 本地环境搭建

**参考**

[Facebook React Native](http://facebook.github.io/react-native/docs/getting-started.html#content)

[中文文档（持续跟进新版本）](http://reactnative.cn)



**环境准本**

(1) MAC OS X 系统

(2) 系统升级到最新

(3) 下载最新版的 Xcode

```bash
$ xcode-select --install
```

(4) 安装 [homebrew](https://brew.sh/)

```bash
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

(5) 安装 watchman 和 flow

+ watchman 是 faceboook 的一个开源项目，它用来监视文件并且记录文件的改动情况。
+ Flow 是一个 JavaScript 的静态类型检查器，用于找出 JavaScript 代码中的类型错误。

```bash
$ brew install watchman flow git gcc pkg-config cairo libpng jpeg gitlib mongodb
```

(6) 安装 Nodejs，建议用 [nvm](https://github.com/creationix/nvm) 来装

```bash
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
$ nvm install v7.9.0
$ nvm use v7.9.0
$ nvm alias default v7.9.0
$ npm install cnpm -g
```

(7) 确保 8081 端口没有被占用

+ 确保没有本地服务占用 8081 端口。
+ chrome 的一些本地插件有可能使用了 websocket 占用了 8081，有的话关闭。



## 2.2 忍不住尝尝鲜

```bash
$ cnpm install -g react-native-cli -g
$ react-native -v
  react-native-cli: 2.0.1

$ react-native init imoocApp
```

![ADD36C2F-99A1-4216-95F8-48D2BB0F210A](http://o6ul1xz4z.bkt.clouddn.com/2017-05-01-ADD36C2F-99A1-4216-95F8-48D2BB0F210A.png)



```bash
# 使用在 iOS 模拟器中启动的第一种运行方式
$ cd imoocApp && react-native run-ios
```

![BA5FE45C-6DD0-49FE-9737-3E22901464AF](http://o6ul1xz4z.bkt.clouddn.com/2017-05-01-BA5FE45C-6DD0-49FE-9737-3E22901464AF.png)



## 2.3 了解 RN 项目代码结构

### 准备

**sublime text 代码高亮**

(1) 安装[package control](https://packagecontrol.io)

(2) command + shift + p 

+ Babel Snippets
+ SublimeLinter(对 js 语法进行检查)
+ SublimeLinter-contrib-eslint
+ Sublimelinter-jsxhint

(3) JS 代码风格检查

```bash
$ npm install -g eslint babel-eslint --registry=http://registry.npm.taobao.org
```



### 目录

```bash
.
├── __tests__
├── android
├── ios
├── app.json # 应用相关配置
├── index.android.js # android 入口
├── index.ios.js # ios 入口
├── node_modules
└── package.json
```



# 3 RN 入门知识学习

## 3.1 如何选择 RN 版本

RN 版本升级很频繁，好的一面是，社区狂热的氛围保障了 RN 未来的影响力，坏的一面是，一旦跟定某个版本进行开发，可能某些问题只有这些版本才会有，同时有些组件没有来得及更新或者升级，你就不敢升级，导致自己动手修改或者规避，会有一个维护的成本，因此选择本本确实是一个非常头疼的问题。



另一个话题是，真正在项目中如何选择版本？对一个 APP 开发的负责人来说，要跟进官方的迭代速度，即要保持跟官方一致的版本升级，很可能掉进一个泥潭，版本之间的差异性可以摧毁你或者你的团队。因为每个版本都会增加新的特性，或者删除老特性，而这些在文档中可能不会充分体现，那对一个稍微复杂的 APP ，升级可能会引发大面积报错。



我的建议是，只要当前的版本是稳定的，性能上没有明显的问题，功能上也能够满足当下的需求，那就不要着急去升级，尤其是线上环境。本地可能等版本至少发布两个月后再尝试，因为这个时候就算遇到一些坑，前人也已经踩得差不多了。所以，在 Github 或 Stackoverflow 或 Google 会比较容易找到解决方案。



## 3.2 React 的组件生命周期

### 3.2.1 传统的 web  开发中的组件

**基本生命周期**

1. 下载 JS 组件模块(如果是同步组件组件，则没有这一步)；
2. 初始化请求参数；
3. 请求组件数据；
4. 拼装组件结构；
5. 绑定事件监听；



**分析**

CSS 的部分需要全局先加载好，JS 也要提前加载好，因为如果都异步会导致网络延迟。但这个不是主要问题，问题是，如果全局提前加载，就需要将 CSS 打包到 CSS 文件，JS 打包到 JS 文件，从开发到上线是两套分离的逻辑，不存在组件生命周期这回事儿。到了准备数据、拼装结构、安装组件，一共三步，那么绑定事件监听就比较恶心。组件安装后，通过触发事件，在  JS 中找到 DOM 结构，再到 DOM 结构中改变样式或复原样式，要有一个操作样式和复原样式的过程。这带来两个问题:

1. 组件的开发和上线形态要分为两套逻辑，组件安装后的事件触发需要显式地借助 JS 来操作 DOM 节点，这个操作会让数据和行为、行为和展现耦合在一起，界限是模糊的。
2. 组件的状态是无序的、不直接的，包含在了 CSS 的交互里面，包含在了用户的鼠标事件中，包含在组件内外部的通信过程中，如果在组件的里面或外面管理组件固有的数据和状态，如何传递就成了传统 WEB 开发所面临的问题。对组件生命周期的抽象和数据状态的管理非常考察一个工程师的设计能力。



### 3.2.2 React 的组件

传统的 WEB 组件， WEB 中交互以及交互带来的变化要通过 JS 明确操作 DOM 结构来完成，而 RN 中都需要通过状态来控制组件。

React 的思想主要是通过构建可复用组件来构建用户界面。可以粗暴来比喻，在 React 中，一切皆组件。对组件来说，什么最重要？有人说是事件封装，有人说是界面的实现，有人说是交互状态和数据重新渲染的管理，也有人说是组件间的耦合和接口，还有人说是生命周期。对 RN 来说，可以把组件理解成有限状态机，渲染什么样的界面，由状态来决定，而每个组件是有自己的生命周期的。生命周期规定了组件的状态和方法，分别是在哪个阶段改变和执行的。也就是说，组件是有生命的，在生命周期的不同阶段要做不同的事情，这些不同的事情就是有限状态集。少年的时候就是要身体发育和早恋逃课；30岁就要成家生娃；50岁就会白了头发，退休在家。

需要注意的是，有限状态机可以理解成几个有限的状态，这个状态可以进行跳转和切换，甚至是可逆的，但人过了30岁就不能回到少年了。

什么是组件的生命周期呢？就是一个对象从开始到初始化，到证实创建，中间历经各种更新，直到最终卸载所经历的全部的状态。



#### React 生命周期图示

先不管父亲儿子孙子这种多层嵌套的组件，先来看一下一个单一组件的生命周期。如下

![39579D57-7B5C-49D2-B860-0C852E5DC9E6](http://o6ul1xz4z.bkt.clouddn.com/2017-05-10-39579D57-7B5C-49D2-B860-0C852E5DC9E6.png)

**1 初始化: 渲染 > 装载**

| 钩子函数               | 说明                                       | 备注                                       |
| ------------------ | ---------------------------------------- | ---------------------------------------- |
| getDefaultProps    | 获取初始的配置参数，全局只调用一次。也就是说，组件被重新装载也不会再调用该方法。 | 严格说来不算组件生命周期的一部分，属性往往是在预先在组件中设置好的或者直接通过副组件传递过来。 |
| getInitialState    | 获取组件初始状态值，会在组件挂载前调用一次。                   | 一般会把只在这个组件中使用的而且会发生变化的数据放置在状态中，          |
| componentWillMount | 通知组件的调用者，组件即将被渲染和装载。                     |                                          |
| render             | 进行 diff 算法后，对组件进行渲染。                     |                                          |
| componentDidMount  | 通知组件已经挂载。                                | 这时通常可以发送一些异步请求来进一步获取组件其它的数据。             |

**2 运行时: state 变化 > 重新渲染**

| 钩子函数                  | 说明                                   | 备注                                       |
| --------------------- | ------------------------------------ | ---------------------------------------- |
| shouldComponentUpdate | 通知 state 发生变化，询问要不要更新组件。默认 都返回 true。 | 常常为了性能，需要在这个方法中，为状态的变化的幅度和数量来做比对，从而判断是否马上更新，是否等积累到一定量才进行更新。注意，不要在该方法中调用 setState ，否则会导致死循环。 |
| componentWillUpdate   | 组件即将开始渲染。                            | 一旦 shouldComponentUpdate 返回 true ，该方法将会被调用。 |
| render                | 重新进行 diff 算法后，对组件进行渲染。               |                                          |
| componentDidUpdate    | 组件重新渲染后。                             |                                          |

**2 运行时: props 变化 > 重新渲染**

还有一种会使组件更新的方式是外部属性的变化，这种通常来自于父组件的属性变化，是常见的组件之间相互传递数据，和同步状态的手段。在 React 中非常实用。比如父组件中登录了，子组件也需要同步这个变化。同步就是通过外层组件传入 props 来通知变化。

| 钩子函数                      | 说明                     | 备注                                       |
| ------------------------- | ---------------------- | ---------------------------------------- |
| componentWillReceiveProps | 通知外层传入的 props 属性发生了改变。 | 可以通过对老属性和新属性的比对，判断是否需要更新状态，需要的话，就在该函数中通过 setState 修改 state。这个修改是安全的，不会导致重复 render。注意，该方法在初始化渲染的时候是不会被调用的，只有在组件接收到 props 变化的时候才会被调用。使用该方法的时机是，在外部传入的 props 发生了变化之后，在组件更新之前，在该方法通过更新 state 引发组件重新渲染。这是在组件渲染之前最后一次可以更新 state 的机会。 |



**3 卸载**

| 钩子函数                | 说明         | 备注   |
| ------------------- | ---------- | ---- |
| componentWillUmount | 通知组件即将被卸载。 |      |



### 3.2.3 RN 示例

统计屏幕点击次数。

**imoocApp/index.ios.js**

```js

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class imoocApp extends Component {
  constructor(props) {
    super(props)
    this.state = { times: 0 }
  }
  timesPlus() {
    let times = this.state.times
    times++
    this.setState({ times })
  }
  componentWillMount() {
    console.log('componentWillMount')
  }
  componentDidMount() {
    console.log('componentDidMount')
  }
  shouldComponentUpdate() {
    console.log('shouldComponentUpdate')
    return true
  }
  componentWillUpdate() {
    console.log('componentWillUpdate')
  }
  componentDidUpdate() {
    console.log('componentDidUpdate')
  }
  render() {
    console.log('render')
    return (
      <View style={styles.container}>
        <Text style={styles.welcome} onPress={this.timesPlus.bind(this)}>
          有本事点我一下
        </Text>
        <Text style={styles.instructions}>
          你点了我 {this.state.times} 次
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('imoocApp', () => imoocApp);
```

![0B4E47F3-1143-419B-8205-1D7AC00E4C8D](http://o6ul1xz4z.bkt.clouddn.com/2017-05-10-0B4E47F3-1143-419B-8205-1D7AC00E4C8D.png)



## 3.3 父子组件撕逼大战

对于嵌套的组件的生命周期, 下面借助一个例子分析。

### 3.3.1 代码

**index.ios.js**

```bash
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

var React = require('react')
var {
  AppRegistry,
  StyleSheet,
  Text,
  View
} = require('react-native')

var Son = React.createClass({
  getDefaultProps() {
    console.log('son', 'getDefaultProps')
  },
  getInitialState() {
    console.log('son', 'getInitialState')
    return {
      times: this.props.times
    }
  },
  timesPlus() {
    let times = this.state.times
    times++
    this.setState({ times })
  },
  timesReset() {
    this.props.timesReset()
  },
  
  componentWillMount() {
    console.log('son', 'componentWillMount')
  },
  componentDidMount() {
    console.log('son', 'componentDidMount')
  },
  componentWillReceiveProps(props) {
    console.log('son', 'componentWillReceiveProps')
    this.setState({
      times: props.times
    })
  },
  shouldComponentUpdate() {
    console.log('son', 'shouldComponentUpdate')
    return true
  },
  componentWillUpdate() {
    console.log('son', 'componentWillUpdate')
  },
  componentDidUpdate() {
    console.log('son', 'componentDidUpdate')
  },
  componentWillUmount() {
    console.log('son', 'componentWillUmount')
  },
  render() {
    console.log('son', 'render')
    return (
      <View style={styles.container}>
        <Text style={styles.welcome} onPress={this.timesPlus}>
          有本事揍我啊
        </Text>
        <Text style={styles.instructions}>
          你居然揍了我 {this.state.times} 次
        </Text>
        <Text style={styles.instructions} onPress={this.timesReset}>
          信不信我亲亲你
        </Text>
      </View>
    )
  }
})

var imoocApp = React.createClass({
  getDefaultProps() {
    console.log('father', 'getDefaultProps')
  },
  getInitialState() {
    console.log('father', 'getInitialState')
    return {
      hit: false,
      times: 2
    }
  },
  timesPlus() {
    let times = this.state.times
    times += 3
    this.setState({ times })
  },
  timesReset() {
    this.setState({ times: 0 })
  },
  willHit() {
    this.setState({
      hit: !this.state.hit
    })
  },
  componentWillMount() {
    console.log('father', 'componentWillMount')
  },
  componentDidMount() {
    console.log('father', 'componentDidMount')
  },
  shouldComponentUpdate() {
    console.log('father', 'shouldComponentUpdate')
    return true
  },
  componentWillUpdate() {
    console.log('father', 'componentWillUpdate')
  },
  componentDidUpdate() {
    console.log('father', 'componentDidUpdate')
  },
  render() {
    console.log('father', 'render')
    return (
      <View style={styles.container}>
        {
          this.state.hit
          ? <Son times={this.state.times} timesReset={this.timesReset}/>
          : null
        }
        <Text style={styles.welcome} onPress={this.timesReset}>
          老子说: 心情好就放你一马
        </Text>
        <Text style={styles.instructions} onPress={this.willHit}>
          到底揍不揍
        </Text>
        <Text style={styles.instructions}>
          就揍了你 {this.state.times} 次而已
        </Text>
        <Text style={styles.instructions} onPress={this.timesPlus}>
          不听话再揍你 3 次
        </Text>
      </View>
    )
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
})

AppRegistry.registerComponent('imoocApp', () => imoocApp)
```

### 3.3.2 分析

**(1) 父组件初始化渲染和加载**



![4DCEEEE1-4B7D-44BB-8E04-8A5FFEFE3F64](http://o6ul1xz4z.bkt.clouddn.com/2017-05-11-4DCEEEE1-4B7D-44BB-8E04-8A5FFEFE3F64.png)

![25C37AA9-39B8-4473-98DA-53673A993F2C](http://o6ul1xz4z.bkt.clouddn.com/2017-05-11-25C37AA9-39B8-4473-98DA-53673A993F2C.png)

**(2) 子组件的初始渲染和加载**

![7581DC8D-FC75-4CE0-9A7F-03A0576598E5](http://o6ul1xz4z.bkt.clouddn.com/2017-05-11-7581DC8D-FC75-4CE0-9A7F-03A0576598E5.png)

![FB3C5ECD-85BE-4DE6-9D1C-1CEEEFE66648](http://o6ul1xz4z.bkt.clouddn.com/2017-05-11-FB3C5ECD-85BE-4DE6-9D1C-1CEEEFE66648.png)

![5EE7ACF3-2FDB-491C-AA39-A981B0FADF9E](http://o6ul1xz4z.bkt.clouddn.com/2017-05-11-5EE7ACF3-2FDB-491C-AA39-A981B0FADF9E.png)

**(3) 子组件 state 变化**

![88901F07-9679-4B04-ABB9-8367DCF60E4D](http://o6ul1xz4z.bkt.clouddn.com/2017-05-11-88901F07-9679-4B04-ABB9-8367DCF60E4D.png)

![62E6F933-DEDF-4B80-8D65-823FA7569057](http://o6ul1xz4z.bkt.clouddn.com/2017-05-11-62E6F933-DEDF-4B80-8D65-823FA7569057.png)

**(4) 父组件 state 变化 > 组件件 props 变化**

![9FC5DD40-F8B2-4DCA-A225-09BA3F63AAFC](http://o6ul1xz4z.bkt.clouddn.com/2017-05-11-9FC5DD40-F8B2-4DCA-A225-09BA3F63AAFC.png)

![EC2B84EF-FDA1-4C15-8066-760CA1D96BE3](http://o6ul1xz4z.bkt.clouddn.com/2017-05-11-EC2B84EF-FDA1-4C15-8066-760CA1D96BE3.png)



## 3.4 ES5 和 ES6 两种组件形态

### 3.4.1 ECMAScript 历史

ECMAScript 规范的历史就是浏览器厂商、规范制订者和开发者的撕逼史。

+ 1997 ECMAScript 1.0
+ 1998 ECMAScript 2.0
+ 1999 ECMAScript 3.0
+ 2007 ECMAScript 4.0    草案，受到抵制
+ 2008 ECMAScript 3.1
+ 2009 ECMASCript 5.0
+ 2015 ECMASCript 6.0    ECMASCript 2015(ES6)
+ 2016 ECMASCript    2016(ES7)





### 3.4.2 ES5 和 ES6 两种组件实现方式的对比

#### 要点

| 要点                    | ES5 方式            | ES6 方式                                   |
| --------------------- | ----------------- | ---------------------------------------- |
| 事件绑定需要通过 bind 绑定 this | 否                 | 是                                        |
| 组件的声明                 | React.create()    | class(继承 Component)                      |
| state 获取初始值           | getInitialState() | 在构造器中给 this.state 赋值                     |
| props 获取默认值           | getDefaultProps() | props 作为构造器的参数传入，因此可以通过 ES6 的形式参数默认值来实现。 |
| 是否支持mixin             | 支持                | 不支持                                      |



#### 案例

前面父子组件撕逼大战的例子`index.ios.js`。

ES5版

```js
var React = require('react')
var ReactNative = require('react-native')
var AppRegistry = ReactNative.AppRegistry
var StyleSheet = ReactNative.StyleSheet
var Text = ReactNative.Text
var View = ReactNative.View

var Son = React.createClass({
  getDefaultProps() {
    console.log('son', 'getDefaultProps')
  },
  getInitialState() {
    console.log('son', 'getInitialState')
    return {
      times: this.props.times
    }
  },
  timesPlus() {
    var times = this.state.times
    times++
    this.setState({ times })
  },
  timesReset() {
    this.props.timesReset()
  },
  
  componentWillMount() {
    console.log('son', 'componentWillMount')
  },
  componentDidMount() {
    console.log('son', 'componentDidMount')
  },
  componentWillReceiveProps(props) {
    console.log('son', 'componentWillReceiveProps')
    this.setState({
      times: props.times
    })
  },
  shouldComponentUpdate() {
    console.log('son', 'shouldComponentUpdate')
    return true
  },
  componentWillUpdate() {
    console.log('son', 'componentWillUpdate')
  },
  componentDidUpdate() {
    console.log('son', 'componentDidUpdate')
  },
  componentWillUmount() {
    console.log('son', 'componentWillUmount')
  },
  render() {
    console.log('son', 'render')
    return (
      <View style={styles.container}>
        <Text style={styles.welcome} onPress={this.timesPlus}>
          有本事揍我啊
        </Text>
        <Text style={styles.instructions}>
          你居然揍了我 {this.state.times} 次
        </Text>
        <Text style={styles.instructions} onPress={this.timesReset}>
          信不信我亲亲你
        </Text>
      </View>
    )
  }
})

var imoocApp = React.createClass({
  getDefaultProps() {
    console.log('father', 'getDefaultProps')
  },
  getInitialState() {
    console.log('father', 'getInitialState')
    return {
      hit: false,
      times: 2
    }
  },
  timesPlus() {
    let times = this.state.times
    times += 3
    this.setState({ times })
  },
  timesReset() {
    this.setState({ times: 0 })
  },
  willHit() {
    this.setState({
      hit: !this.state.hit
    })
  },
  componentWillMount() {
    console.log('father', 'componentWillMount')
  },
  componentDidMount() {
    console.log('father', 'componentDidMount')
  },
  shouldComponentUpdate() {
    console.log('father', 'shouldComponentUpdate')
    return true
  },
  componentWillUpdate() {
    console.log('father', 'componentWillUpdate')
  },
  componentDidUpdate() {
    console.log('father', 'componentDidUpdate')
  },
  render() {
    console.log('father', 'render')
    return (
      <View style={styles.container}>
        {
          this.state.hit
          ? <Son times={this.state.times} timesReset={this.timesReset}/>
          : null
        }
        <Text style={styles.welcome} onPress={this.timesReset}>
          老子说: 心情好就放你一马
        </Text>
        <Text style={styles.instructions} onPress={this.willHit}>
          到底揍不揍
        </Text>
        <Text style={styles.instructions}>
          就揍了你 {this.state.times} 次而已
        </Text>
        <Text style={styles.instructions} onPress={this.timesPlus}>
          不听话再揍你 3 次
        </Text>
      </View>
    )
  }
})

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
})

AppRegistry.registerComponent('imoocApp', function(){ return imoocApp })
```

ES6 版

```js
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native' 

class Son extends Component{
  constructor(props) {
    super(props)
    this.state = {
      times: this.props.times
    }
  }
  timesPlus() {
    let times = this.state.times
    times++
    this.setState({ times })
  }
  timesReset() {
    this.props.timesReset()
  }
  
  componentWillMount() {
    console.log('son', 'componentWillMount')
  }
  componentDidMount() {
    console.log('son', 'componentDidMount')
  }
  componentWillReceiveProps(props) {
    console.log('son', 'componentWillReceiveProps')
    this.setState({
      times: props.times
    })
  }
  shouldComponentUpdate() {
    console.log('son', 'shouldComponentUpdate')
    return true
  }
  componentWillUpdate() {
    console.log('son', 'componentWillUpdate')
  }
  componentDidUpdate() {
    console.log('son', 'componentDidUpdate')
  }
  componentWillUmount() {
    console.log('son', 'componentWillUmount')
  }
  render() {
    console.log('son', 'render')
    return (
      <View style={styles.container}>
        <Text style={styles.welcome} onPress={this.timesPlus.bind(this)}>
          有本事揍我啊
        </Text>
        <Text style={styles.instructions}>
          你居然揍了我 {this.state.times} 次
        </Text>
        <Text style={styles.instructions} onPress={this.timesReset.bind(this)}>
          信不信我亲亲你
        </Text>
      </View>
    )
  }
}

class imoocApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hit: false,
      times: 2
    }
  }
  
  timesPlus() {
    let times = this.state.times
    times += 3
    this.setState({ times })
  }
  timesReset() {
    this.setState({ times: 0 })
  }
  willHit() {
    this.setState({
      hit: !this.state.hit
    })
  }
  componentWillMount() {
    console.log('father', 'componentWillMount')
  }
  componentDidMount() {
    console.log('father', 'componentDidMount')
  }
  shouldComponentUpdate() {
    console.log('father', 'shouldComponentUpdate')
    return true
  }
  componentWillUpdate() {
    console.log('father', 'componentWillUpdate')
  }
  componentDidUpdate() {
    console.log('father', 'componentDidUpdate')
  }
  render() {
    console.log('father', 'render')
    return (
      <View style={styles.container}>
        {
          this.state.hit
          ? <Son times={this.state.times} timesReset={this.timesReset.bind(this)}/>
          : null
        }
        <Text style={styles.welcome} onPress={this.timesReset.bind(this)}>
          老子说: 心情好就放你一马
        </Text>
        <Text style={styles.instructions} onPress={this.willHit.bind(this)}>
          到底揍不揍
        </Text>
        <Text style={styles.instructions}>
          就揍了你 {this.state.times} 次而已
        </Text>
        <Text style={styles.instructions} onPress={this.timesPlus.bind(this)}>
          不听话再揍你 3 次
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
})

AppRegistry.registerComponent('imoocApp', () => imoocApp)
```



# 4 升级 React Native 的重要补录

## 4.1 一期答疑总结

### 好习惯

+ 培养自己选找答案的功能

+ 经常去问答区看看

  ​

### 常见问题

**xcode 升级导致的问题**

+ 新版本的 RN 多了一些对协议的限制，比如升级到 iOS 10 默认不支持 HTTP 请求，但支持 HTTPS 请求，如果需要支持前者，需要[从 Xcode 中配置](http://coding.imooc.com/learn/questiondetail/1841.html)。
+ [ios10 中 react-native-image-picker 调用本地相册出错](http://coding.imooc.com/learn/questiondetail/2192.html)
+ [xcode 命令行工具导致的一个问题](http://coding.imooc.com/learn/questiondetail/1756.html)。

**代码粗心**

+ 使用排除法锁定出错的代码。



## 4.2 Run 起来课程源代码

### 4.2.1 检查环境
```bash
$ node -v
$ react-native -v
```

| 环境               | 讲师     | 我              |
| ---------------- | ------ | -------------- |
| Nodejs           | v6.9.1 | v7.9.0         |
| rnpm             | 1.9.0  | 1.9.0          |
| react            | 未知     | 16.0.0-alpha.6 |
| react-native-cli | 0.1.10 | 2.0.1          |
| react-native     | 0.22.2 | 0.44.0         |

### 4.2.2 升级项目
```bash
$ cd imoocApp

# 依赖的包可能过时了，替换为最新的
$ rm -rf node_modules && npm install
```

### 4.2.3 保持环境干净
+ 关闭全局的翻墙
+ 关闭已有的 RN 服务进程(如果有的话)
+ 关闭模拟器

### 4.2.4 跑起来

```bash
$ react-native run-ios
```

### 4.2.5 错误修复
**技巧**: 如果报错且没有头绪，可以用 xcode 编译运行项目, 一般报错信息更丰富些。

**(1) Semantic Issue**

![F507C0C1-45D1-4027-BE25-C364B8125CE5](http://o6ul1xz4z.bkt.clouddn.com/2017-05-11-F507C0C1-45D1-4027-BE25-C364B8125CE5.png)

删除`-Werror`和`-Wall`。

**(2) 'RTCBundleURLProvider.h' file not found**

```bash
$ cd imoocApp
# 在项目中建立和第三方模块的链接
$ rnpm link
```

## 4.3 暴力升级到 0.36 (上)
```bash
# 升级 nodejs
$ nvm install v7.9.0
$ nvm alias default v7.9.0

# 升级 react-native、react-native-cli、rnpm
$ npm i react-native-cli@2.0.1 -g
$ npm i rnpm@1.9.0 -g
```

**项目小升级**

```bash
# 升级项目
$ cd imoocApp
$ rnpm unlink
$ rm -rf node_modules
$ npm install
$ npm install react-native@0.44.0 -S
$ npm install react@16.0.0-alpha.6 -S
$ rnpm link
```


## 4.4 暴力升级到 0.36(下)
**项目大升级(脱胎换骨)**

+ 优点: 能抹平环境差异带来的问题。
+ 缺点: 给代码的带来非常大的变更量，不变易历史版本比对和代码版本跟踪。

(1) 在本地新建一个 RN 项目
```bash
$ react-native init newRNProject
$ cd newRNProject
$ react-native run-ios # 测试下通过官方脚手架搭建的项目是否正常
```

(2) 用新的配置文件覆盖旧的

```bash
$ mv newRNProject/.babelrc imoocApp/
$ mv newRNProject/.buckconfig imoocApp/
$ mv newRNProject/.flowconfig imoocApp/
$ mv newRNProject/.gitignore imoocApp/
$ mv newRNProject/.watchmanconfig imoocApp/
$ mv newRNProject/package.json imoocApp/
$ mv newRNProject/__test__ imoocApp/
$ mv newRNProject/android imoocApp/
$ mv newRNProject/index.android.js imoocApp/
$ mv newRNProject/ios/imoocApp.xcodeprog imoocApp/ios/
$ mv newRNProject/ios/imoocAppTests imoocApp/ios/
$ mv newRNProject/ios/AppDelegate.h imoocApp/ios/
$ mv newRNProject/ios/AppDelegate.m imoocApp/ios/
$ mv newRNProject/ios/main.m imoocApp/ios/
$ mv newRNProject/ios/ imoocApp/ios/
```

(3) 删除多余的文件

```bash
$ rm -rf imoocApp/ios/build
```

(4) 安装依赖包

```bash
$ npm i react react-native lodash query-string react-native-audio@2.2.0 react-native-button@1.7.1 react-native-image-picker@0.22.12 react-native-progress@3.1.0 react-native-sk-countdown@1.0.1 react-native-swiper@1.5.2 react-native-vector-icons@2.1.0 react-native-video@0.9.0 react-addons-update@15.3.0 sha1 --save
$ rnpm link
```

(5) imoocApp/ios/imoocApp/Info.plist

```html
<key>NSAllowsArbitraryLoads</key>
<true/>
```

## 4.4 课程进阶拥抱 ES6(上)

+ 模块引入使用 import
+ 组件声明换成 class 方式(记得 export 出去)
+ 事件绑定加上 bind

## 4.5 课程进阶拥抱 ES6(下)

**一些第三方组件通过 import 引入方式需要使用包名**

+ react-native-image-picker

**node_modules/react-native-sk-countdown/CountDownText.js**
```js
import React, { Component } from 'react'
import {
  StyleSheet,
  Text
} from 'react-native'
import update from 'react-addons-update'
import countDown from './countDown'
```

**ActivityIndicatorIOS is deprecated. Use ActivityIndicator instead.**
将文件夹 `imoocApp/app` 下的 ActicityIndicatorIOS 全局替换为 ActicityIndicator。

**`animated` supplied to `Modal` has been deprecated.Use the `animationType` prop instead.**

```jsx
<Modal
	animationType={'slide'}
	...>
```

**imoocApp/app/edit/index.js**

```css
...
uploadContainer: {
  ...
  height: 210,
  ...
}
...
```

**轮播去掉容器样式**
**轮播按钮有些丑**
**imoocApp/app/creation/index.js**

```js
...
<RefreshControl
	refreshing={this.state.isRefreshing}
	onRefresh={this._onRefresh.bind(this)}
/>
...
```

# 5 项目初始准备
## 5.1 狗狗说 App 功能介绍

### 狗狗说功能分析

+ 启动画面
+ 轮播图
+ 短信登录
+ 制作页
+ 列表页
+ 账户主页




![D49EBA1A-7626-49FF-9346-83D5A5B8D8D1](http://o6ul1xz4z.bkt.clouddn.com/2017-05-11-D49EBA1A-7626-49FF-9346-83D5A5B8D8D1.png)

![2E271031-FFC4-40B9-9D0B-DB01613B85E8](http://o6ul1xz4z.bkt.clouddn.com/2017-05-11-2E271031-FFC4-40B9-9D0B-DB01613B85E8.png)

![8F9195B0-DF0D-43DB-8D1E-7C0B7D336ACC](http://o6ul1xz4z.bkt.clouddn.com/2017-05-11-8F9195B0-DF0D-43DB-8D1E-7C0B7D336ACC.png)

![3501449C-9A19-49EA-B726-D6FAEB9CF951](http://o6ul1xz4z.bkt.clouddn.com/2017-05-11-3501449C-9A19-49EA-B726-D6FAEB9CF951.png)

![0F99F927-3486-4087-9003-EDB6D5E67F8E](http://o6ul1xz4z.bkt.clouddn.com/2017-05-11-0F99F927-3486-4087-9003-EDB6D5E67F8E.png)

## 5.2 TabBarIOS 开启 App 首页

![D49EBA1A-7626-49FF-9346-83D5A5B8D8D1](http://o6ul1xz4z.bkt.clouddn.com/2017-05-11-D49EBA1A-7626-49FF-9346-83D5A5B8D8D1.png)

从大往小作，一开始不要纠结样式、功能等琐碎的小细节，先把大框架描出来。放眼整个 APP，先把几个主要的视图界面狑出来 ，然后组合一下，再对着这个大的结构进行更加详细的功能模块的拆解和具体方案的架构。

### RN 插件: 图标工具
[react-native-vector-icons@4.1.1](https://github.com/oblador/react-native-vector-icons): 一个流行的图标库管理工具

### RN 插件包管理器: rnpm

作用是把模块链接到 iOS 工程中，把必要的资源文件比如图标字体也拷贝到工程中，方便 RN 调用。

[Github 地址](https://github.com/rnpm/rnpm)

![614E0AEB-15F3-484F-8BBE-14D57E2A54A8](http://o6ul1xz4z.bkt.clouddn.com/2017-05-12-614E0AEB-15F3-484F-8BBE-14D57E2A54A8.png)


显然 rnpm 已经被合并到了 react-native core ，用法和 rnpm 类似，[以 react-native-vector-icons 为例](http://www.jianshu.com/p/188c19387853)

```bash
# rnpm link react-native-vector-icons
$ react-native link react-native-vector-icons
```

### RN 升级

```bash
# 本地环境升级，除了升级 RN 核心库外，配置文件也会相应进行升级到最新。
$ react-native upgrade
```

## 5.3 TabBarIOS 开启 APP 首页(2)

### 5.3.1 使用 react-native-vector-icons
![9B23DCB1-CE53-45DF-BF53-95F3640FAF02](http://o6ul1xz4z.bkt.clouddn.com/2017-05-12-9B23DCB1-CE53-45DF-BF53-95F3640FAF02.png)

项目中具体使用的是 [Ionicons](http://ionicons.com)图标库。

```js
import Icon from 'react-native-vector-icons/Ionicons'
```
**注意**: 链接后需要重新编译才能生效。

### 5.3.2 使用 Icon.TabBarItem 取代 TabBarIOS.Item
Icon.TabBarItem是对TabBarIOS.Item的封装，用来生成图标列表项。

## 5.4 APP 流程结构及开发计划
下面先开发哪个页面？理论上选择哪个都可以，只不过如果先对项目有一个功能的拆解和梳理之后，在选择项目的开发顺序，心里更有底。在前期的开发中，能有一些适当的扩展和接口，给到后面的页面，真个开发顺序会更加自然。
为了让大家印象更加深刻，先来对 APP 的功能进行一下细化，过一下用户的交互流程。


![8ED42960-E255-4E4F-B77D-AF81B3DAC6F6](http://o6ul1xz4z.bkt.clouddn.com/2017-05-12-8ED42960-E255-4E4F-B77D-AF81B3DAC6F6.png)

## 5.5 页面重构
将 Tab 对应的视图分别放在单独文件中。

![B1F170F2-BD34-4B34-ACB2-D18C948BCBCF](http://o6ul1xz4z.bkt.clouddn.com/2017-05-12-B1F170F2-BD34-4B34-ACB2-D18C948BCBCF.png)

## 5.6 飞速创建后台和 Mock 假数据
### 5.6.1 传统 Mock 假数据
一般开发网页的时候伪造数据，包括

+ 在代码中写死一个 JS 对象或数组存放假数据。
+ 本地用一个 JSON 文件存放假数据，然后请求这个文件就好了。
+ 本地开一个 python 或者 Nodejs 静态服务，简单写一下响应规则。

**缺点**
+ 请求不够真实，比如都是基于内网环境，没有真实环境可能的网络延迟,因此看不出应用在地网络环境下的表现。
+ 如果本地开发后台，比较辛苦，需求如果频繁变化，本地后台的规则也需要频繁变化，造成开发成本过高。
+ 不能满足定制化的需求，比如随机返回数据的个数，返回不同的图片地址或者返回变化的数据，包括无法验证传参的正确性。

### 5.6.2 Rap 和 Mockjs

**Rap**: 处理网络请求和输入数据规则。
**Mockjs**: 本地解析数据规则来生成更佳个性化的具体数据，避免大量数据传输的体积。



(1) 在 [Rap官网](http://rapapi.org) 配置好某个请求的Mock规则。

![708E7778-BACE-4086-99C5-D2175D23BFEF](http://o6ul1xz4z.bkt.clouddn.com/2017-05-12-708E7778-BACE-4086-99C5-D2175D23BFEF.png)

(2) 产看请求的 Mock 数据

![C4A2C36C-4E7A-43C4-BF47-6902EB43028F](http://o6ul1xz4z.bkt.clouddn.com/2017-05-12-C4A2C36C-4E7A-43C4-BF47-6902EB43028F.png)

其实也可以在 [Mockjs 官网](http://mockjs.com/)可以试下规则的解析结果，如下



![FDD9C85D-6D12-4D46-AA2D-4140F3E22ADB](http://o6ul1xz4z.bkt.clouddn.com/2017-05-12-FDD9C85D-6D12-4D46-AA2D-4140F3E22ADB.png)



# 6 开发视频配音界面

## 6.1 视频列表挖坑开发(1)



![9E15FAF0-4397-418C-BE0E-D177ABB003BA](http://o6ul1xz4z.bkt.clouddn.com/2017-05-12-9E15FAF0-4397-418C-BE0E-D177ABB003BA.png)

## 6.2 视频列表挖坑开发(2)

完成视频列表的基本雏形，这个雏形远远没有完成，留下许多问题需要解决:
1. resizeMode 是啥？(图片的显示模式)
2. fontSize 的单位是什么？
3. 如果通过请求获取线上数据？

![C88BC6E4-8DDC-4492-9101-0FA459384A9F](http://o6ul1xz4z.bkt.clouddn.com/2017-05-12-C88BC6E4-8DDC-4492-9101-0FA459384A9F.png)

## 6.3 RN 的异步请求与封装
### 6.3.1 RN 的 3 种异步请求方式
![B6D9792B-84CC-4A93-8B3E-AA17DA78ABDB](http://o6ul1xz4z.bkt.clouddn.com/2017-05-12-B6D9792B-84CC-4A93-8B3E-AA17DA78ABDB.png)

在 RN 中获取网络数据常见的有上面[3种方式](http://facebook.github.io/react-native/docs/network.html)，分别说明下。

(1) Fetch
**说明**: 标准委员会制定的网络 API 的一个标准，在 RN 中直接可用，非常简洁。

| 参数    | 说明               |
| ----- | ---------------- |
| 1     | 请求地址             |
| 2(可选) | 配置项，比如请求方法、请求头设置 |

(2) WebSocket
通过 TCP 连接建立的一个双工模式的数据传输通道，非常强大。

(3) XMLHttpRequest
就是我们常说的异步请求接口，是对 iOS 网络层 API 的一个上层封装，类似浏览器提供的 XMLHttpRequest。两者用法差不多，最大的区别是，在浏览器呦同源策略，请求会受到安全限制，不能发起跨域的请求，在 RN 中就没有这个限制。因此可以通过 XHR 实现无后台的 APP，请求第三方开发的接口。如果是在浏览器中的话，往往要借助 JSONP，或者服务端设置，或者通过服务端发送异步请求，在来转发这个数据，最后给到浏览器。

### 6.3.2 列表页使用 fetch 请求数据
**异步请求的时机**:  一般会在组件挂载之后(componentDidMount)发起异步请求来获取数据。

(1) 使用 [mockjs](https://www.npmjs.com/package/mockjs) 将来自 Rap 的规则转换为数据。

```bash
$ npm i mockjs -S
```

**注意**: 由于 `/node_modules/mockjs/dist/mock.js` 的 `dataImage` 方法使用了 canvas API ，在 RN 中会出问题，需要安装 node-canvas，而后者可能带来更多问题，因此干脆就把这个方法删掉。

(2) 在程序中使用  mockjs 将通过 fetch 的列表数据规则生成数据。

+ 通过封装 fetch 抽象出 get 和 post 工具方法；
+ 将请求相关的请求 URL 和请求头等放在配置文件中；
+ 使用上面封装的 get 方法完成对列表数据的请求。

## 6.4-6.5 列表页上滑预加载和下拉刷新效果

![dig_talk_list](http://o6ul1xz4z.bkt.clouddn.com/2017-05-13-dig_talk_list.gif)

## 6.6 iOS 屏幕尺寸及分辨率知识点解析

### 6.6.1 基础知识

**显示单元**

![8F5A96B4-7D69-407D-836F-448F87C2040F](http://o6ul1xz4z.bkt.clouddn.com/2017-05-13-8F5A96B4-7D69-407D-836F-448F87C2040F.png)

**英寸(inch)和厘米(cm)**

![E6892C1C-FDCF-4C0B-A10B-F0F83F4186C6](http://o6ul1xz4z.bkt.clouddn.com/2017-05-13-E6892C1C-FDCF-4C0B-A10B-F0F83F4186C6.png)

### 6.6.2 iphone 6

**屏幕尺寸**

![CC8BA961-F966-4B0C-BBCC-59E454E9794F](http://o6ul1xz4z.bkt.clouddn.com/2017-05-13-CC8BA961-F966-4B0C-BBCC-59E454E9794F.png)

**逻辑分辨率 & 设备分辨率 & 设备像素比 & PPI**

![3FB67D4A-A0ED-49AD-9873-209D0C05FA0B](http://o6ul1xz4z.bkt.clouddn.com/2017-05-13-3FB67D4A-A0ED-49AD-9873-209D0C05FA0B.png)

### 6.6.3 iphone 6 plus

![3297081A-DCD1-4CB1-85B2-AE09391D60D0](http://o6ul1xz4z.bkt.clouddn.com/2017-05-13-3297081A-DCD1-4CB1-85B2-AE09391D60D0.png)

**down sampled**

实际上，对于 Retina 屏，屏幕上实际的采样会低于真实的设备分辨率，比如 iphone 6 plus 的采样率为 87%，所以 1242 x 2208 的分辨率实际能渲染的像素点为 1080 x 1920。密度有所下降，但肉眼无法分辨。这种把高分辨率以倍数的方式缩小到一个特定分辨率的做法，也就是我们通常所说的视网膜技术。

### 6.6.4 iPhone 尺寸分布

市面上有很多中高清屏，像素密度不同，像素比也不同，有1倍的、1.5倍的、4倍的。相关的概念有很多，这里不一一涉及。关于苹果设备的分辨率，下面提供一个像素表。基本包括所有我们需要关心的参数。

![CA41CECC-BD8C-44B4-A089-0C1FDD807CF3](http://o6ul1xz4z.bkt.clouddn.com/2017-05-13-CA41CECC-BD8C-44B4-A089-0C1FDD807CF3.png)

对开发者带来了一些苦恼，好在用户对苹果设备的更新换代速度比较快，所以放在 2016 的当下，我们可以以 iPhone 6 作为基本设备，可以不考虑 iPhone 4 ，向上兼容到 iPhone6 P，向下兼容到 iPhone 5。

**宽度自适应**
在 RN 中，没有百分比这种单位，可以获取屏幕的宽度值，乘一定的比例，从而得到能能够适应不同宽度屏幕的值，动态获取长度值。

**图片自适应**
按照 iPhone 6 P 的分辨率设计图片，然后分别压缩到 750 和 640这两种规格，然后在 RN 中分别动态判断一下，分别引入不同规格的图片。

**设计和工程方面的更多话题**

+ iPhone 4 到 iPhone 5 为什么宽度不变，高度增加了 88 个点？
+ iPhone 5 及之后，屏幕的宽高比为什么维持在 0.56 附近，依据是什么？

## 6.7 列表页点赞功能
(1) 在 Rap 增加点赞的接口
(2) 在 Item 组件中实现点赞功能

## 6.8 RN 导航器 Navigator 的用法
利用 [Navigator](http://reactnative.cn/docs/0.44/navigation.html#content) 实现从列表页跳转到详情页的功能。

![navigate_from_list_to_detail](http://o6ul1xz4z.bkt.clouddn.com/2017-05-13-navigate_from_list_to_detail.gif)

## 6.9 详情页视频播放控制

```bash
$ npm i -S react-native-video
$ react-native link react-native-video
```

![1B3A7CAD-DBEC-4669-95AD-DDC92206FB03](http://o6ul1xz4z.bkt.clouddn.com/2017-05-13-1B3A7CAD-DBEC-4669-95AD-DDC92206FB03.png)

## 6.10 详情页视频播放控制 loading-进度条 -重播功能
(1) 视频载入前显示 loading 图标
(2) 视频播放中显示进度条
(3) 视频播放到最后时，显示重播按钮

## 6.11 详情页视频播放控制--暂停、播放控制
(1) 视频播放时，点击播放器会暂停播放，并显示继续播放按钮；
(2) 点击继续播放，会隐藏暂停播放的按钮并让视频继续播放。

## 6.12 详情页视频播放控制--容错处理、返回导航

![1EBF2D97-BC73-44B1-8603-6AFD12601ED7](http://o6ul1xz4z.bkt.clouddn.com/2017-05-13-1EBF2D97-BC73-44B1-8603-6AFD12601ED7.png)

## 6.13 详情页视频信息补全

![C302B147-4C39-4B10-B7B1-470758992807](http://o6ul1xz4z.bkt.clouddn.com/2017-05-13-C302B147-4C39-4B10-B7B1-470758992807.png)

## 6.14 获取视频评论列表(1)
详情页
(1) 在 componentDidMount 时异步加载数据评论；
(2) 使用 ListView 外实现评论列表。

![9EE0C411-9DAE-422B-A349-9309C8CBE507](http://o6ul1xz4z.bkt.clouddn.com/2017-05-13-9EE0C411-9DAE-422B-A349-9309C8CBE507.png)

## 6.15 获取视频评论列表(2)
详情页
(1) 用 ListView 的 renderHeader 方案取代 ScrollView 嵌套 ListView 的方案；
(2) 实现评论列表的分页加载。

## 6.16 RN 里面提交评论表单(1)
(1) 评论列表顶部添加评论框；

![EA055CC9-F6FF-4047-A891-A41A76302A0A](http://o6ul1xz4z.bkt.clouddn.com/2017-05-13-EA055CC9-F6FF-4047-A891-A41A76302A0A.png)

(2) 获得焦点时，用 RN 的 Modal 组件实现在浮层中显示评论编辑；

![6CF1C956-66FF-4347-AE7F-1F99D564D36D](http://o6ul1xz4z.bkt.clouddn.com/2017-05-13-6CF1C956-66FF-4347-AE7F-1F99D564D36D.png)

## 6.17 RN 里面提交评论表单
(1) 使用 react-native-button 组件创建评论提交按钮

```bash
# 注意:  不需要 react-native link ，可以直接使用！
$ npm i -S react-native-button
```

![D6A29161-9413-438F-81D7-5E6FDA5AEC50](http://o6ul1xz4z.bkt.clouddn.com/2017-05-13-D6A29161-9413-438F-81D7-5E6FDA5AEC50.png)

(2) 添加提交评论的接口，并在提交完成后关闭评论浮层。
遇到一个诡异的问题，如果先设置 state 中的 content 为空字符串，再关闭浮层，就会崩溃；反过来顺序就没事儿。

![D58D76CE-3E13-4090-95F1-ABC1799EDD95](http://o6ul1xz4z.bkt.clouddn.com/2017-05-13-D58D76CE-3E13-4090-95F1-ABC1799EDD95.png)

# 7 RN 知识进阶串讲

## 7.1 React 与 MVC

![BB444226-6690-4063-AA7C-D31047EAB84F](http://o6ul1xz4z.bkt.clouddn.com/2017-05-14-BB444226-6690-4063-AA7C-D31047EAB84F.png)

React 革新了传统的 MVC 架构模式。

**MVC 架构模式**

![84E70B6A-82A4-4E05-A8E2-E9E6E16B2C3C](http://o6ul1xz4z.bkt.clouddn.com/2017-05-14-84E70B6A-82A4-4E05-A8E2-E9E6E16B2C3C.png)

![834EA6C8-DEF9-41D0-BAC7-8EB7DF02A54B](http://o6ul1xz4z.bkt.clouddn.com/2017-05-14-834EA6C8-DEF9-41D0-BAC7-8EB7DF02A54B.png)

**React 架构模式**

![C901DF12-E053-400D-B314-7B500473706B](http://o6ul1xz4z.bkt.clouddn.com/2017-05-14-C901DF12-E053-400D-B314-7B500473706B.png)

React 并不是清清白白的 View，因为每一个组件的内部都可以自行控制数据的变化，也就是 C 的作用。

![B3B9A8EB-0651-4C97-A7A5-4647B4EAAD70](http://o6ul1xz4z.bkt.clouddn.com/2017-05-14-B3B9A8EB-0651-4C97-A7A5-4647B4EAAD70.png)

也就是说，React 组件充当了 View 和 Controller 两种角色。而且组件之间是独立的，组件内部是耦合的，因此组件可以看成 VC 而不是一个简单的 V 。

![2954407D-CC97-40AF-AB7F-58EF436BA678](http://o6ul1xz4z.bkt.clouddn.com/2017-05-14-2954407D-CC97-40AF-AB7F-58EF436BA678.png)

**React 组件数据传递**

![520EFCE0-6500-4B8A-8487-672A09457A84](http://o6ul1xz4z.bkt.clouddn.com/2017-05-14-520EFCE0-6500-4B8A-8487-672A09457A84.png)

## 7.2 RN 的 30+ 组件
### 7.2.1 组件

| 序号   | v0.45.0-rc.0 版本控件         | 说明   |
| ---- | ------------------------- | ---- |
| 1    | ActivityIndicator         |      |
| 2    | Button                    |      |
| 3    | DatePickerIOS             |      |
| 4    | FlatList                  |      |
| 5    | Image                     |      |
| 6    | KeyboardAvoidingView      |      |
| 7    | Layout                    |      |
| 8    | ListView                  |      |
| 9    | Modal                     |      |
| 10   | FlatList                  |      |
| 11   | NavigatorIOS              |      |
| 12   | Picker                    |      |
| 13   | PickerIOS                 |      |
| 14   | ProgressViewIOS           |      |
| 15   | RegreshControl            |      |
| 16   | ScrollView                |      |
| 17   | SectionList               |      |
| 18   | SegmentedControlIOS       |      |
| 19   | Slider                    |      |
| 20   | StatusBar                 |      |
| 21   | SwipeableListView         |      |
| 22   | Switch                    |      |
| 23   | TabBarIOS                 |      |
| 24   | Text                      |      |
| 25   | TextInput                 |      |
| 26   | Touchable\*               |      |
| 27   | TrabsparentHitTestExample |      |
| 28   | View                      |      |
| 29   | WebView                   |      |


### 7.2.2 运行官方 RN 示例

[react-native GitHub](https://github.com/facebook/react-native)，当下的最新版本为 `v0.45.0-rc.0`。官方提供了 RN 使用的 demos ，路径为[react-native/RNTester](https://github.com/facebook/react-native/tree/master/RNTester)。


```bash
$ git clone https://github.com/facebook/react-native.git
$ cd react-native && npm install
$ cd RNTester && open .
```

![2B9F739E-2C27-4FEB-A5DD-6EEEB6D818BA](http://o6ul1xz4z.bkt.clouddn.com/2017-05-14-2B9F739E-2C27-4FEB-A5DD-6EEEB6D818BA.png)

![93C08351-31F6-40C4-B208-A87255889259](http://o6ul1xz4z.bkt.clouddn.com/2017-05-14-93C08351-31F6-40C4-B208-A87255889259.png)

![B6539CF5-B6AA-4F64-B64C-D562B1401E9C](http://o6ul1xz4z.bkt.clouddn.com/2017-05-14-B6539CF5-B6AA-4F64-B64C-D562B1401E9C.png)

![F948F4E2-D122-4224-A4BC-01D55FB84763](http://o6ul1xz4z.bkt.clouddn.com/2017-05-14-F948F4E2-D122-4224-A4BC-01D55FB84763.png)

![CEBB97A5-3C64-4EAF-A1AB-E9A96DC31F79](http://o6ul1xz4z.bkt.clouddn.com/2017-05-14-CEBB97A5-3C64-4EAF-A1AB-E9A96DC31F79.png)

![D758664D-50B0-4D05-9FAC-F0ED2AF61EBA](http://o6ul1xz4z.bkt.clouddn.com/2017-05-14-D758664D-50B0-4D05-9FAC-F0ED2AF61EBA.png)

示例程序中有每种组件的各种用法演示，比图  View

![2A2EE967-F031-4983-AA3A-4BA8129F529E](http://o6ul1xz4z.bkt.clouddn.com/2017-05-14-2A2EE967-F031-4983-AA3A-4BA8129F529E.png)

![752FD120-9182-456E-9803-A7651ADF4DB7](http://o6ul1xz4z.bkt.clouddn.com/2017-05-14-752FD120-9182-456E-9803-A7651ADF4DB7.png)



## 7.3 Flexbox 弹性布局的魔法属性

RN 使用的是 flexbox (弹性盒子伸缩布局，或者叫伸缩容器布局)。当页面适配不同屏幕不同宽度的时候，让所有元素能够以一种合适的方式来呈现。有两点需要注意：
1. RN 的 flexbox 跟 css3 的 flexbox 属性名称写法不同， RN 里面全部是驼峰标示；
2. RN 的 flexbox 支持的属性很有限，它是 Flexbox 的一个子集。

**要把子项目放进去到父容器，一共分几步？**
3 步
(1) 父容器定义对齐方式
(2) 子项目扔到父容器
(3) 子项目定义个性对齐样式

### flexDirection

| 值          | 说明                    |
| ---------- | --------------------- |
| row        | 子项目一律从左往右，一个挨一个地排列到右侧 |
| column(默认) | 子项目竖着排列，从上往下一个一个挨着排   |

### flexWrap

| 值          | 说明               |
| ---------- | ---------------- |
| wrap       | 主轴上排不下，就折行继续排    |
| nowrap(默认) | 主轴上排不下也不折行，溢出父容器 |

### justifyContent
沿主轴方向的排列方式。

| 值              | 说明       |
| -------------- | -------- |
| flex-start(默认) | 沿主轴居前    |
| flex-end       | 沿主轴居后    |
| space-between  | 沿主轴向两边对齐 |
| space-around   | 沿主轴平分空间  |
| center         | 沿主轴居中排列  |

### alignItems
沿侧轴方向的空间利用（排列）方式。在父元素上定义，作用在子元素。

| 值              | 说明                    |
| -------------- | --------------------- |
| center         | 沿侧轴垂直                 |
| flex-start(默认) | 沿侧轴居前                 |
| flex-end       | 沿侧轴居后                 |
| stretch        | 沿侧轴方向拉伸子元素，直到填充完父容器边界 |

## 7.4 Flex 弹性布局的魔法属性

### alignSelf
类似 alignItems，不同的地方在于它声明在子元素上也作用在子元素。覆盖在父元素上设置的 alignItems 对子元素的作用。

![7DEE610A-EEC2-4962-A55A-DC69C9A4E8F3](http://o6ul1xz4z.bkt.clouddn.com/2017-05-14-7DEE610A-EEC2-4962-A55A-DC69C9A4E8F3.png)

```jsx
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native' 

export default class Account extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.item, styles.item1]}>1111111111111</Text>
        <View style={[styles.item, styles.item2]}>
          <Text>22222222222222</Text>
        </View>
        <View style={[styles.item, styles.item3]}>
          <Text>33333333333333</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    paddingTop: 30,
    paddingBottom: 70,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: '#ff6600'
  },
  item1: {
    backgroundColor: '#ccc',
    alignSelf: 'flex-start'
  },
  item2: {
    backgroundColor: '#999',
    alignSelf: 'center'
  },
  item3: {
    backgroundColor: '#666',
    alignSelf: 'flex-end'
  }
})
```

### flex
控制元素沿主轴方向所占空间的多少。

## 7.5 如何甄选第三方组件

### 搜索
+ [Github Search](https://github.com/search.html)
+ [react.parts Search](https://react.parts/native)

### 比较

+ 在 GitHub 比较

比较依据:

（1） star 数量: 值越大，反应组件越受欢迎
（2） Fork 数量:值越大， 反映了参与这个组件开发的人数越多，同时也说明该组件不能满足用户的情况也多。
（3） Pull requests: 值越大，尤其是 closed 的数量越多，反应组件越活跃，完善的可能性越大。
（4） Issues: 值越大，反应问题越多，其中 closed 的越多代表作者越积极地在完善组件。
（5） 最近的更新时间
（6） 兼容性

+ stackoverflow 相关问题数量
+ 文档是否规范，最好有效果示意图
+ 示例代码是否丰富

## 7.6 RN 的 AsyncStorage 异步存储
**说明**: RN 官方为我们提供了 AsyncStorage 这个异步持久化方案，它采用键值对存储系统，跟浏览器的 localStorage 本地存储有相似之处。
**注意**: 官方是建议我们对 AsyncStorage 进行抽象封装之后再使用，而不是直接使用它，因为 AsyncStorage 是全局操作的。


这节先演示下原生的 AsyncStorage 是如何存储和取值的，等到实际项目的时候再来使用 AsyncStorage 的封装模块。

```bash
	AsyncStorage
      .getItem('user')
      // 如果能拿到 user 这个数据，则将本地的这个数据同步到 state，然后再修改后存储到本地
      .then(data => {
        if (data) {
          console.log(data)
          data = JSON.parse(data)
          this.setState({
            user: data
          }, () => {
            data.times++
            const userData = JSON.stringify(data)

            AsyncStorage
              .setItem('user', userData)
              .then(() => {
                console.log('save ok')
              })
              .catch(err => {
                console.log(err)
                console.log('save failes')
              })
          })
        }
        // 如果 user 这个这个数据不存在，就从 state 拿出来，编辑后存到本地
        else {
          const user = this.state.user
          user.times++
          const userData = JSON.stringify(user)
          AsyncStorage
            .setItem('user', userData)
            .catch(err => {
              console.log(err)
              console.log('save fails')
            })
            .then(() => {
              console.log('save ok')
            })
        }
      })
```

## 7.7 如何在手机上安装演示 RN 原型项目
(1) 数据线连接 Mac
(2) 清理 Mac 上的 RN 环境
(3)  localhost 改为 Wi-Fi 环境下的 IP 地址

以 imoocApp 这个项目为例:
**imoocApp/ios/imoocApp/AppDelegate.m**

![06A34D33-B556-43A7-B417-EBA2B557B443](http://o6ul1xz4z.bkt.clouddn.com/2017-05-14-06A34D33-B556-43A7-B417-EBA2B557B443.png) 

(4) Xcode 选择 iphone 真机来启动

# 8 App 內注册登录

## 8.1 伪造 Rap 注册登录接口

![92F80514-7EE1-439A-BA4C-77F915B1BF8D](http://o6ul1xz4z.bkt.clouddn.com/2017-05-16-92F80514-7EE1-439A-BA4C-77F915B1BF8D.png)



## 8.2 实现注册登录页面1(输入验证码)

(1) 伪造发送验证码接口;
(2) 完成登录界面基本 UI 部分；

## 8.3 实现注册登录页面2(倒计时)

(1) 伪造登录接口；

(2) 使用 [react-native-sk-countdown](https://github.com/laputa-er/react-native-sk-countdown)实现倒计时重新获取验证码功能;
由于[第三方的react-native-sk-countdown](https://github.com/shigebeyond/react-native-sk-countdown)似乎已经停止维护，对 RN 0.44 不兼容，因此我[Fork 了一个新项目](https://github.com/laputa-er/react-native-sk-countdown)，修复了部分兼容问题。

## 8.4 本地管理应用登录状态

登录流程

![C9BDDE9C-DAB5-4939-B7F5-31E8B337C5BB](http://o6ul1xz4z.bkt.clouddn.com/2017-05-21-C9BDDE9C-DAB5-4939-B7F5-31E8B337C5BB.png)



# 9 用户账户页面

## 9.1-9.3 头像展示与相册选取

- 使用 react-native-image-native 从本地选择图片作为头像

**选择图片崩溃的问题**
要在 iOS 10 中正常使用 react-native-image-native，需要设置 `info.plist`：

- [参考1](https://github.com/react-community/react-native-image-picker/issues/562)
- [参考2](http://www.jianshu.com/p/c212cde86877)

## 9.4-9.5 XHR 异步上传图片到 cloudinary 图床

[cloudinary.com](https://cloudinary.com/console/settings/account)

(1) 在 cloudinary.com [配置好空间信息]( https://cloudinary.com/console/settings/account)

![7EE44700-7980-4222-8195-FF44685DE6B2](http://o6ul1xz4z.bkt.clouddn.com/2017-05-25-7EE44700-7980-4222-8195-FF44685DE6B2.png)

(2) 在 RAP 创建假的签名验证接口，然后在项目中中模拟签名验证过程
(3) 项目中实现上传逻辑

- 读取本地相册
- 构建上传的表单
- 发起异步请求
- 针对图床个性化的签名

## 9.6-9.7 饼状图显示图片上传进度

### 1  安装 react-native-progress

安装 [react-native-progress](https://github.com/oblador/react-native-progress) 组件，并通过 xcode 手动添加到工程中（ART 不支持通过 `react-native link` 引入）

![F6CF9482-1C97-4EB8-B747-587D15CBEF39](http://o6ul1xz4z.bkt.clouddn.com/2017-05-26-F6CF9482-1C97-4EB8-B747-587D15CBEF39.png)

(1) 在 xcode 中手动添加 ART 到 iOS 工程中

![B11C2C42-8E91-4B50-8190-79806B7CC84C](http://o6ul1xz4z.bkt.clouddn.com/2017-05-26-B11C2C42-8E91-4B50-8190-79806B7CC84C.png)

![A07E9217-B50D-4030-953B-A5AF0D1585A4](http://o6ul1xz4z.bkt.clouddn.com/2017-05-26-A07E9217-B50D-4030-953B-A5AF0D1585A4.png)
(2) 配置引入的 ART 库
![CFAEDF54-24C6-493A-9EF3-505795880056](http://o6ul1xz4z.bkt.clouddn.com/2017-05-26-CFAEDF54-24C6-493A-9EF3-505795880056.png)

![5DEF9FE5-504B-4222-86F4-A21A02DF8E16](http://o6ul1xz4z.bkt.clouddn.com/2017-05-26-5DEF9FE5-504B-4222-86F4-A21A02DF8E16.png)

(3) 重启调试环境，包括 `run-ios`、模拟器

### 2 完成上传进度

### 3 完成图像上传成功后的后续处理

- 更新服务器上用户的头像数据
- 将更新的数据留一份在本地(AsyncStorage)，从而每次打开都是最新上传的那个头像

## 9.8-9.9 编辑和保存用户资料

(1) 丰富“用户资料更新”接口的字段
(2) 实现在弹出 Modal 编辑用户资料界面功能
(3) 实现保存资料和退出登录

# 10 用 Koa 开发本地 API 后台

## 10.1 本地安装 Mongodb 数据库

**注意**： 因为之前在虚拟机(Arch Linux)上装过一个 MongoDB 数据库(参见[《NodeJS线上服务器部署与发布-2.2.2》](http://laputa-er.github.io/2017/04/22/%E6%85%95%E8%AF%BE%E7%BD%91/imooc_NodeJS%20%E7%BA%BF%E4%B8%8A%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%83%A8%E7%BD%B2%E4%B8%8E%E5%8F%91%E5%B8%83/))，所以后面实际的练习是在用的虚拟机上的数据库。如果没有特别的原因，并不推荐在 OS X 上装一个数据库，因为污染开发环境。

**安装和使用**
(1) [Homebrew](https://brew.sh/)

(2) [Install MongoDB Community Edition on OS X](https://docs.mongodb.com/master/tutorial/install-mongodb-on-os-x/)

如果下载有问题，可以这样做

```bash
$ cd /Users/<你的用户名>/Library/Caches/Homebrew
$ brew prune # 清理下
$ brew install mongodb
```

(3) 启动

```bash
$ sudo mongod
```

(4) 登录数据库

```bash
$ sudo mongo
```

**扩展**: 如果需要卸载 OS X 上的 MongoDB

```bash
$ brew unlink mongodb && brew uninstall mongodb
```

## 10.2 搭建 Koa 初始项目架构

**注意**： 课程中使用的是 koa1 ，我实践中使用的是 koa2，两者 api 还有有不少差异的，主要是 koa2 全面使用了 async/await 这种 ES2017 语法。

### 目录和 package.json

```bash
$ mkdir dogtalk-server
$ cd dogtalk-server
$ npm init
$ npm i -S koa koa-logger koa-session koa-bodyparser koa-router mongoose sha1 lodash uuid xss bluebird speakeasy
```

### 依赖的第三方库

- [koa](https://www.npmjs.com/package/koa)
- [koa-logger](https://www.npmjs.com/package/koa-logger): 开发环境下的日志中间件，作用于请求的最先和最后环节，建议放到应用的最开始部分。
- [koa-session](https://www.npmjs.com/package/koa-session): 基于 cookie 的会话中间件，保持用户会话状态。可以在 seesion 中存储一些会话中的数据。
- [koa-bodyparser](https://www.npmjs.com/package/koa-bodyparser): 解析表单数据等等来生成对象结构数据的中间件
- [koa-router](https://www.npmjs.com/package/koa-router): 路由中间件，为不同的 url 地址分配不同的规则。
- [mongoose](https://www.npmjs.com/package/mongoose): Mongodb 数据库的对象建模工具。
- [sha1](https://www.npmjs.com/package/sha1): 哈希算法库，加密一些数据用。
- [lodash](https://www.npmjs.com/package/lodash): js 编程的一把瑞士军刀，提供许多好用的工具函数。
- [uuid](https://www.npmjs.com/package/uuid): 用来生成唯一的不会重复的 ID。
- [xss](https://www.npmjs.com/package/xss): 一个对用户数据的内容进行过滤，避免 XSS 恶意攻击的模块。
- [bluebird](https://www.npmjs.com/package/bluebird): 对于 promise 规范实现封装后的 promise 库，有更优雅的 API 和更好的性能。
- [speakeasy](https://www.npmjs.com/package/speakeasy): 基于一系列安全算法，能生成随机数字的工具库，比如短信验证码。

## 10.3 Koa 中配置使用 Mondodb

### 10.3.1 增加需要的数据库用户

```bash
# 创建超级用户
> use admin
> db.createUser({user: 'imooc_cases_owner', pwd: 'Safe1*24$', roles: [{role: 'userAdminAnyDatabase', db: 'admin'}]})
> db.auth('imooc_cases_owner', 'Safe1*24$')
# 创建 dogtalk 数据库用户
> use dogtalk
> db.createUser({user: 'dogtalk_runner', pwd: 'F**k9001$', roles: [{role: 'readWrite', db: 'dogtalk'}]})
```

### 10.3.2 mongoose model

**技巧**: 由于 Model 可能会很多，因此推荐动态递归遍历加载需要的数据库对应的 Model。

## 10.5-10.6 用螺丝帽在 Koa 中发送短信

[螺丝帽](https://luosimao.com/)可以为开发者提供一系列服务，包括

- 短信服务
- 语音验证
- 邮件服务
- 人机验证

### 螺丝帽短信服务

使用螺丝帽配置短信服务：
(1) 注册账号

(2) 在管理台中添加签名

(3) 在管理台中添加短信模版

![6C92A268-6A76-487C-A70F-D221F743E5B8](http://o6ul1xz4z.bkt.clouddn.com/2017-05-30-6C92A268-6A76-487C-A70F-D221F743E5B8.png)

(4) 查看接口文档的[示例](https://luosimao.com/docs/api/30)

### 实现短信发送

(1) 在官方示例代码的基础上进行修改

- [API KEY](https://sms-my.luosimao.com/api)
- [API 错误代码码](https://sms-my.luosimao.com/api)

(2) 实现`发送短信验证码`-`校验短信验证码`逻辑

## 10.7 用 DHC 插件(Restlet Client)快速测试本地 API 服务

**说明**: DHC 看样子改名为 Restlet Client 了。
(1) 根据从 RAP 到处的接口文档实现后台接口，然后通过 Restlet Client  测试接口能否正常工作。以 `用户资料更新`接口为例：

![60254477-FCA7-4E96-945C-FAB63847C73C](http://o6ul1xz4z.bkt.clouddn.com/2017-05-31-60254477-FCA7-4E96-945C-FAB63847C73C.png)

(2) 通过定义中间件实现对请求的统一校验
(3) 注意看看是否都进行了xss 处理

**知识点**: 用户提交的需要持久化到数据库或用于查询数据库的字段都需要经过 trim 和 xss 处理。

## 10.8 服务器端实现图床签名接口

(1) 原先的签名信息是由客户端生成的，这种方式不够安全，现在改为在服务器端生成。
(2) 发现原来 koa-router 中间件写法有错误，修正了下。
(3) 至此，打通了以下接口

- 注册并获取验证码(`/api/u/signup`)
- 验证用户提交的验证码是否正确(`/api/u/verify`)
- 更具上传的头像相关信息，从服务器获取签名信息(`/api/signature`)
- 上传用户头像到 cloudinary.com，然后更新用户头像信息(`/api/u/update`)

## 10.9-10.10 用七牛上传图片资源

(1) 在七牛的对象存储中新建一个空间，拿到测试域名

![FB49560C-6477-40C9-81FF-91EF7FE3C44E](http://o6ul1xz4z.bkt.clouddn.com/2017-06-06-FB49560C-6477-40C9-81FF-91EF7FE3C44E.png)

(2) 在七牛[个人中心->秘钥管理](https://portal.qiniu.com/user/key)拿到其 AccessKey 和 SecretKey, 配置到后端代码中。

(3) 安装[七牛官方的 nodejs SDK](https://developer.qiniu.com/kodo/sdk/1289/nodejs)

```bash
$ npm i qiniu -S
```

(4) 重构服务端签名接口代码，增加对七牛对象存储服务的签名支持。
(5) 重构客户端上传图片的代码，将图片上传到七牛。参考[七牛提供的 upload 接口文档](https://developer.qiniu.com/kodo/api/1312/upload)。

# 11 开发视频配音页面

![FB63992D-F55C-496E-A9EE-D158F2654E19](http://o6ul1xz4z.bkt.clouddn.com/2017-06-08-FB63992D-F55C-496E-A9EE-D158F2654E19.png)

![3D9347CA-8904-4E17-8972-F47DD2278486](http://o6ul1xz4z.bkt.clouddn.com/2017-06-08-3D9347CA-8904-4E17-8972-F47DD2278486.png)

## 11.1-11.2 视频选择器与视频预览

`华龙先画骨，盖房子先画图😊。`

- [ ] 遇到了通过 Image 加载的应用中的图片没显示出来的问题（也没有报错）

```bash
首先这个问题，不是必现的，用 xcode 启动项目，图片显示出来了。猜测是通过 react-native run-ios 启动项目有一定问题。
```



## 11.3-11.4 用七牛上传视频资源

(1) 重新规划七牛对象存储，创建三个新的存储空间 `dogtalkavatar`、`dogtalkvideo`、`dogtalkaudio`

(2) 视频上传到七牛的 `dogtalkvideo` 存储空间中，返回的接口类如下

```json
{
  hash: "FqzqKrAA25Sj4apuKmmryPdnU4RA"
  key: "13953a64-2583-480a-9350-ca5490afa346.mp4"
  persistentId: "z1.593edb8f8a3c0c3794e3b6ea"
}
```

| 字段           | 用途                                       | 测试                                       |
| ------------ | ---------------------------------------- | ---------------------------------------- |
| key          | 可以通过该字段访问到存储在七牛上的文件                      | http://org5nla9w.bkt.clouddn.com/13953a64-2583-480a-9350-ca5490afa346.mp4 |
| persistentId | 查阅[数据处理-持久化处理状态查询](https://developer.qiniu.com/dora/manual/1294/persistent-processing-status-query-prefop)可以知道，可以通过这个字段查询到文件的元信息 | http://api.qiniu.com/status/get/prefop?id=z1.593edb8f8a3c0c3794e3b6ea |

(3) 查询元信息

```json
{ 
  "code": 0, // 请求是否成功
  "desc": "The fop was completed successfully", 
  "id": "z1.593edb8f8a3c0c3794e3b6ea", // 持久化 id
  "inputBucket": "dogtalkvideo", 
  "inputKey": "13953a64-2583-480a-9350-ca5490afa346.mp4", // 上传到存储空间的原始文件名
  // 对文件进行操作后的结果(可以连续进行多个操作，返回每个操作的结果组成的数组)
  "items": [
    {
      "cmd": "avthumb/mp4/an/1", // 操作对应的规则
      "code": 0, 
      "desc": "The fop was completed successfully", 
      "hash": "FgbIXe0cIKVEoeIaRRGvn6y-sKjT", 
      "key": "tif2A2xwqtgaelwOgLOIfPiOteo=/FqzqKrAA25Sj4apuKmmryPdnU4RA", // 操作后生成的新资源的名字
      "returnOld": 0
    }
  ], 
  "pipeline": "0.default", 
  "reqid": "exkAAL-Nob3VcscU"
}
```

(4) 利用上一步得到的元信息中的操作后新资源的 key，得到处理后资源的链接
http://org5nla9w.bkt.clouddn.com/tif2A2xwqtgaelwOgLOIfPiOteo=/FqzqKrAA25Sj4apuKmmryPdnU4RA

## 11.5-11.6 服务端存储视频信息

(1) 视频信息存储到 MongoDB

(2) 由于七牛没有提供合并视频和音频的服务，因此后面需要曲线救国，把视频和音频同步到 cloudinary 进行合并。最后同步回七牛。

![E2D3F0B3-C389-477D-AAAF-34276FDFFE86](http://o6ul1xz4z.bkt.clouddn.com/2017-06-13-E2D3F0B3-C389-477D-AAAF-34276FDFFE86.png)



## 11.7 控制录音倒计时

(1) [react-native-sk-countdown](https://github.com/shigebeyond/react-native-sk-countdown) 这个组件在倒计时组件有 BUG，作者一年没维护了，所以就 copy 一份改吧改吧算了。

(2) 上传视频 -> 点击开始录音->录音准备倒计时->Go->生成静音视频文件->完成录音。

## 11.8-11.9 实现视频录音功能

**注意**：课程适用的版本比较老，老版本支持声音的回放，新版本移除了相关 API ，回放声音需要使用另外一个库 react-native-sound。

(1) 安装 [react-native-audio](https://github.com/jsierles/react-native-audio) 和 [react-native-sound](https://github.com/zmxv/react-native-sound)

```bash
$ npm i react-native-audio -S
$ npm i react-native-sound -S
$ react-native link react-native-audio react-native-sound
```

(2) 在上一节的基础上加入真正的录音功能(录制好的音频文件保存在了本地)

(3) 增加预览功能(视频和录制的音频同步播放)

(4) 更换视频时，重置整个页面的 state

## 11.10-11.11 上传音频到云空间

![EA6EFEC3-4747-4689-9AD0-994FAC892318](http://o6ul1xz4z.bkt.clouddn.com/2017-06-25-EA6EFEC3-4747-4689-9AD0-994FAC892318.png)

(1) 重构客户端上传逻辑，兼容视频和音频的上传

(2) 重构服务端处理 token 请求的代码，兼容视频和音频

(3) 实现将录制好的音频上传到云端。上传后的音频文件可以像下面这样访问到:

- 原始音频（URL中有时间戳）

http://res.cloudinary.com/dox3udxny/video/upload/v1498586300/audio/ehzacj6smav4yfawfyxo.aac

- 原始音频（URL中去掉时间戳信息）

http://res.cloudinary.com/dox3udxny/video/upload/audio/ehzacj6smav4yfawfyxo.aac

- 处理后的（增大音量）

http://res.cloudinary.com/dox3udxny/video/upload/e_volume:400/audio/ehzacj6smav4yfawfyxo.aac



## 11.12 服务器端存储音频数据

(1) 服务端添加对应音频数据表的 schema

(2) 客户端在将音频上传到 cloudinary 后，将相关信息存储到服务器

## 11.13-11.14 合并音频视频并同步封面图到七牛

为什么不在自己的服务器上合并音频和视频？

答：技术上是可行的。但成本过高，具体来说

1. 音频视频的编码格式很多，处理起来需要考虑很多细节；
2. 音视频的处理，是一个耗 CPU 、耗带宽的事情。自己实现的话，不仅要解决音频、视频上传到服务器，命名、资源文件的划分等，音频视频的转码问题，还要对磁盘的读写速度进行一个读写的优化，包括服务器的资源、任务的自动化、视频流的推送。开发成本高，对服务器要求高。对于个人开发者，没有足够的资金、技术储备，因此很难部署一个像样的服务。

(1) 服务器端实现将合成的视频上传到七牛的逻辑；

(2) 将 qiniu sdk 升级到 7.0.4，并将服务器端和七牛相关的代码按照[当下最新的文档](https://developer.qiniu.com/kodo/sdk/1289/nodejs#5)进行升级（不然七牛的服务端会报错…）。



## 11.15-11.16 发布整个视频音频创意

先实现交互逻辑，一个以假乱真的效果

(1) 实现点击“发布视频”后的弹窗;

(2) 弹窗中填写表单，提交后关闭弹窗。

## 11.17 服务器端保存创意视频

在后端真正实现保存视频创意的逻辑

(1) 创建创意视频对应的 Model

(2) 实现保存创意视频相关信息的逻辑



## 11.18 视频列表页对接后台数据

(1) 后端增加创意列表页和详情页接口以及相关配置

(2) 封装对网址进行处理的工具函数

(3) 根据数据库的中返回数据的实际结构调整代码

(4) 通过 AsyncStorage 获取 user 信息

(5) 防止 defaultState 覆盖掉状态中的 user

## 11.19 完善评论和点赞后台

(1) 后端增加 /api/up 的处理函数和路由

(2) 前端完善点赞功能



# 12 APP 上线准备工作

## 12.1 制作并导出 APP 各中尺寸的图标

介绍 APP 图表制作方面的一些简单途径。

**为什么单独要讲一下图标制作？**

- 对于 APP 来说，图标是非常重要的元素，不仅提高品牌的曝光量和识别度，也同时传递 APP 的功能设定和类型，让用户对 APP 有一个比较深的第一印象。
- 对于 iOS 平台来说，对于图标有一套更佳严格的规范。

**为 APP 配置图标？（以方式一导出的图标为例）**

1. 将图标资源（包括 `Content.json`）拷贝到`ios/imoocApp/Images.xcassets/AppIcon.appiconset`下

![9694804C-49E6-4483-BCDB-036C7F4CCF26](http://o6ul1xz4z.bkt.clouddn.com/2017-07-02-9694804C-49E6-4483-BCDB-036C7F4CCF26.png)

1. 在 xcode 中打开项目，配置 App Icons Source

![E35CE2CE-9F2E-4E07-9D16-EFF412E19DB4](http://o6ul1xz4z.bkt.clouddn.com/2017-07-02-E35CE2CE-9F2E-4E07-9D16-EFF412E19DB4.png)

![100EECC1-9A3D-44A4-BD4C-0DDBD3D2171B](http://o6ul1xz4z.bkt.clouddn.com/2017-07-02-100EECC1-9A3D-44A4-BD4C-0DDBD3D2171B.png)



1. 补齐其它图标

拷贝一个通用的图标（比如83.5x83.5）到所有图标所在的文件夹下。修改 `Contents.json`

![D3E9648F-D5D2-4BB6-9561-CE5BE70E62E8](http://o6ul1xz4z.bkt.clouddn.com/2017-07-02-D3E9648F-D5D2-4BB6-9561-CE5BE70E62E8.png)



### 12.1.1 方式一：基于图标模版（PS）

**网址:** https://appicontemplate.com/

**说明:** 这个网站是一个非常热心的老外设计师提供的，导出 icon 图标的网站。满足 watch、iOS、android、pc 等不同设备不同尺寸对图标的需求。

**注意:** 这个网站已经迁移到了新网址 https://applypixels.com/，新网址需要注册为会员(付费)。



(1) [下载](https://applypixels.com/template/ios-app-icon/)图标模版并解压

(2) PS 打开自己 APP 图标的设计稿

(3) PS 打开解压好的 `App Icon Template/App Icon Template.atn` 文件（会加载与定义的动作）

(4) PS 打开解压好的 `App Icon Template/App Icon Template.psd`文件（保留图层）

![446E7DC2-A13A-4A43-B825-3E3970817B13](http://o6ul1xz4z.bkt.clouddn.com/2017-07-02-446E7DC2-A13A-4A43-B825-3E3970817B13.png)

(5) 进入需要编辑的图层

1. 选中需要编辑的图层`Rounded Mask > 1024 App Icon for the A… > Edit me and Save`
2. 右键-> 编辑内容 -> 确定 -> 保留图层
3. 选择合适的 `iOS Colors` 、`iOSGradients`(不需要的置为不可见)

(6) 替换图层中的图标

1. 切换到自己的设计稿
2. `v + 鼠标左键拖动`自己的设计稿，到(5)中编辑的 tab 下
3. 隐藏默认的图标
4. 调整图标位置和大小（可以打开 Grid 图层来作为辅助参照，之后记得隐藏掉）

(7) 预览效果

1. 保存(6) tab，关闭窗口，回到模版
2. 发现改动已经同步过来了

![5040465E-61E0-4746-A3F8-F577D83E52C6](http://o6ul1xz4z.bkt.clouddn.com/2017-07-02-5040465E-61E0-4746-A3F8-F577D83E52C6.png)

(8) 导出

1. 打开动作窗口(窗口>动作)

   ![013EA8C6-E145-47BC-B844-845F0279A1BE](http://o6ul1xz4z.bkt.clouddn.com/2017-07-02-013EA8C6-E145-47BC-B844-845F0279A1BE.png)

2. 选中需要的图标对应的动作，然后点击底部播放按钮

![0D7B19EF-AA65-41B1-A00E-27D1B878AC16](http://o6ul1xz4z.bkt.clouddn.com/2017-07-02-0D7B19EF-AA65-41B1-A00E-27D1B878AC16.png)

1. 存储到指定文件夹

![E4102DA6-84C6-46F7-A418-46B98F9D371E](http://o6ul1xz4z.bkt.clouddn.com/2017-07-02-E4102DA6-84C6-46F7-A418-46B98F9D371E.png)

### 12.1.2 方式二：在线傻瓜式导出

**网址**：http://makeappicon.com/



(1) 上传设计稿（像素不要太低，比如 1356 x 1356）

(2) 将生成的文件发送到邮箱

(3) 在邮箱中下载并解压

![C91AA2DF-1852-4167-BA61-3D1FDB5C3528](http://o6ul1xz4z.bkt.clouddn.com/2017-07-02-C91AA2DF-1852-4167-BA61-3D1FDB5C3528.png)



## 12.2 配置启动画面和 App 名字

### 12.2.1 App 名字

(1) 修改 `ios/imoocApp/Info.plist`

![5C899A02-00F3-4F2D-BCB3-03BECB754D85](http://o6ul1xz4z.bkt.clouddn.com/2017-07-06-5C899A02-00F3-4F2D-BCB3-03BECB754D85.png)

(2) 重新 build

![F7E182E5-AA7C-436D-9A79-47BBC4D88CC6](http://o6ul1xz4z.bkt.clouddn.com/2017-07-06-F7E182E5-AA7C-436D-9A79-47BBC4D88CC6.png)

### 12.2.2 启动画面

(1) 修改文案

在 `ios/imoocApp/Base.lproj/LaunchScreen.xib`修改启动画面的文案。

```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<document type="com.apple.InterfaceBuilder3.CocoaTouch.XIB" version="3.0" toolsVersion="7702" systemVersion="14D136" targetRuntime="iOS.CocoaTouch" propertyAccessControl="none" useAutolayout="YES" launchScreen="YES" useTraitCollections="YES">
    <dependencies>
        <deployment identifier="iOS"/>
        <plugIn identifier="com.apple.InterfaceBuilder.IBCocoaTouchPlugin" version="7701"/>
        <capability name="Constraints with non-1.0 multipliers" minToolsVersion="5.1"/>
    </dependencies>
    <objects>
        <placeholder placeholderIdentifier="IBFilesOwner" id="-1" userLabel="File's Owner"/>
        <placeholder placeholderIdentifier="IBFirstResponder" id="-2" customClass="UIResponder"/>
        <view contentMode="scaleToFill" id="iN0-l3-epB">
            <rect key="frame" x="0.0" y="0.0" width="480" height="480"/>
            <autoresizingMask key="autoresizingMask" widthSizable="YES" heightSizable="YES"/>
            <subviews>
                <label opaque="NO" clipsSubviews="YES" userInteractionEnabled="NO" contentMode="left" horizontalHuggingPriority="251" verticalHuggingPriority="251" text="狗狗说" textAlignment="center" lineBreakMode="tailTruncation" baselineAdjustment="alignBaselines" minimumFontSize="9" translatesAutoresizingMaskIntoConstraints="NO" id="8ie-xW-0ye">
                    <rect key="frame" x="20" y="439" width="441" height="21"/>
                    <fontDescription key="fontDescription" type="system" pointSize="17"/>
                    <color key="textColor" cocoaTouchSystemColor="darkTextColor"/>
                    <nil key="highlightedColor"/>
                </label>
                <label opaque="NO" clipsSubviews="YES" userInteractionEnabled="NO" contentMode="left" horizontalHuggingPriority="251" verticalHuggingPriority="251" text="了解我，从配音开始" textAlignment="center" lineBreakMode="middleTruncation" baselineAdjustment="alignBaselines" minimumFontSize="18" translatesAutoresizingMaskIntoConstraints="NO" id="kId-c2-rCX">
                    <rect key="frame" x="20" y="140" width="441" height="43"/>
                    <fontDescription key="fontDescription" type="boldSystem" pointSize="36"/>
                    <color key="textColor" cocoaTouchSystemColor="darkTextColor"/>
                    <nil key="highlightedColor"/>
                </label>
            </subviews>
            <color key="backgroundColor" white="1" alpha="1" colorSpace="custom" customColorSpace="calibratedWhite"/>
            <constraints>
                <constraint firstItem="kId-c2-rCX" firstAttribute="centerY" secondItem="iN0-l3-epB" secondAttribute="bottom" multiplier="1/3" constant="1" id="5cJ-9S-tgC"/>
                <constraint firstAttribute="centerX" secondItem="kId-c2-rCX" secondAttribute="centerX" id="Koa-jz-hwk"/>
                <constraint firstAttribute="bottom" secondItem="8ie-xW-0ye" secondAttribute="bottom" constant="20" id="Kzo-t9-V3l"/>
                <constraint firstItem="8ie-xW-0ye" firstAttribute="leading" secondItem="iN0-l3-epB" secondAttribute="leading" constant="20" symbolic="YES" id="MfP-vx-nX0"/>
                <constraint firstAttribute="centerX" secondItem="8ie-xW-0ye" secondAttribute="centerX" id="ZEH-qu-HZ9"/>
                <constraint firstItem="kId-c2-rCX" firstAttribute="leading" secondItem="iN0-l3-epB" secondAttribute="leading" constant="20" symbolic="YES" id="fvb-Df-36g"/>
            </constraints>
            <nil key="simulatedStatusBarMetrics"/>
            <freeformSimulatedSizeMetrics key="simulatedDestinationMetrics"/>
            <point key="canvasLocation" x="548" y="455"/>
        </view>
    </objects>
</document>
```

(2) 启动画面之后修复出现登录页闪烁的问题（获取用户信息前先显示一个 loading 浮层）

## 12.3 为 App 开发轮播图功能

(1) 安装 react-native-swiper

(2) 开发轮播图界面

(3) 只在安装后第一次进入应用显示轮播图

## 12.4 打包 App 安装文件并借助蒲公英分发测试



**为什么选择[蒲公英](https://www.pgyer.com/)来分发测试？**

- 服务优秀
- [文档](https://www.pgyer.com/doc)丰富

![4D016D45-7C2E-4408-B89D-B981621DDC29](http://o6ul1xz4z.bkt.clouddn.com/2017-07-13-4D016D45-7C2E-4408-B89D-B981621DDC29.png)



（1）注册蒲公英账号

（2）购买 [Apple 开发者账号](https://developer.apple.com/)

![902E3686-7C95-4556-A598-FFD7274C7C13](http://o6ul1xz4z.bkt.clouddn.com/2017-07-13-902E3686-7C95-4556-A598-FFD7274C7C13.png)



（3）为任意 Apple 设备生成证书（最多为100个设备的生成证书）

- 获取 iOS 设备的 [UDID](https://www.pgyer.com/udid)
- 添加设备（Apple 开发者中心 > Account > Program Resources > Cerficates, IDs & Profiles > Devices > All）

![3324DB26-BFEC-4B61-89A1-14AE6011C674](http://o6ul1xz4z.bkt.clouddn.com/2017-07-13-3324DB26-BFEC-4B61-89A1-14AE6011C674.png)



![08711E65-0FF3-4548-974F-8C57D73E3715](http://o6ul1xz4z.bkt.clouddn.com/2017-07-13-08711E65-0FF3-4548-974F-8C57D73E3715.png)

- 创建需要的证书（如果还没创建的话。注意，至少有一个 Distribution  类型的证书，比如）

![4B6D4454-D186-418B-9630-3C55C2C23E70](http://o6ul1xz4z.bkt.clouddn.com/2017-07-16-4B6D4454-D186-418B-9630-3C55C2C23E70.png)

- 为设备生成证书（Provisioning Profiles > Distribution）

![D3D419C8-4EF1-4BDB-9734-208C8DC9B293](http://o6ul1xz4z.bkt.clouddn.com/2017-07-13-D3D419C8-4EF1-4BDB-9734-208C8DC9B293.png)

除非是企业账号或者要正式发布到 Apple Store ，否则选择 `Ad Hoc`那一项。

- 下载证书

![C171A52D-4A3A-476E-8BBC-4A0B005A3DCF](http://o6ul1xz4z.bkt.clouddn.com/2017-07-13-C171A52D-4A3A-476E-8BBC-4A0B005A3DCF.png)

（4）项目准备

- 修改`imoocApp/ios/imoocApp/AppDelegate.m`（注意！这个方式只针对 RN 0.29.0 ，之后的[看这里](http://www.jianshu.com/p/330eb37a71c3)）

![3D184B93-2265-425F-9297-74F354FC08EF](http://o6ul1xz4z.bkt.clouddn.com/2017-07-13-3D184B93-2265-425F-9297-74F354FC08EF.png)

![FC2ED94F-8FEA-4457-B78E-223F1BF067B6](http://o6ul1xz4z.bkt.clouddn.com/2017-07-13-FC2ED94F-8FEA-4457-B78E-223F1BF067B6.png)



（5）配置证书到项目中

- 在 xcode 打开项目
- 双击下载好的证书（会被 xcode 打开的项目自动加载）
- 在 xcode 中配置该项目使用这个证书（注意！该方式已过期， xcode 8 可以自动根据 Team 生成证书,见[这里](http://www.cocoachina.com/ios/20160616/16718.html)）

*过去的方式*

![C1B53361-3C71-448B-A8B5-0A481E44C155](http://o6ul1xz4z.bkt.clouddn.com/2017-07-13-C1B53361-3C71-448B-A8B5-0A481E44C155.png)

*新的方式*

![33C1EBF0-0241-4366-BF38-6BB0D65991BF](http://o6ul1xz4z.bkt.clouddn.com/2017-07-16-33C1EBF0-0241-4366-BF38-6BB0D65991BF.png)

（6）打包

- 重新编译项目（`command + b`)，如果又必要重启一下 xcode 
- 打包（设备选择 Generic iOS Device）

![77D31FB3-66A5-4930-AE58-84D6597E3DC2](http://o6ul1xz4z.bkt.clouddn.com/2017-07-13-77D31FB3-66A5-4930-AE58-84D6597E3DC2.png)

- 有弹窗的话，点击“允许”

（7）导出可安装文件(.ipa)到本地

![394E3DEC-26EC-4FCB-8D52-43BD432F5467](http://o6ul1xz4z.bkt.clouddn.com/2017-07-16-394E3DEC-26EC-4FCB-8D52-43BD432F5467.png)

如果遇到[Your account already has a valid Developer ID Application certificate，按照该链接给出的方法修复。](https://stackoverflow.com/questions/33651758/your-account-already-has-a-valid-developer-id-application-certificate)

![C5367DB3-D40F-4BF3-9464-3F645FF1DCAA](http://o6ul1xz4z.bkt.clouddn.com/2017-07-16-C5367DB3-D40F-4BF3-9464-3F645FF1DCAA.png)

![76F93A8C-714F-4C91-9D2B-FCC82A9A89A2](http://o6ul1xz4z.bkt.clouddn.com/2017-07-16-76F93A8C-714F-4C91-9D2B-FCC82A9A89A2.png)

![C6A49E48-C530-4D6C-A026-CE141C9A8E5A](http://o6ul1xz4z.bkt.clouddn.com/2017-07-16-C6A49E48-C530-4D6C-A026-CE141C9A8E5A.png)



![FE68F4DA-5362-4EB0-BC80-7FE0855280A3](http://o6ul1xz4z.bkt.clouddn.com/2017-07-16-FE68F4DA-5362-4EB0-BC80-7FE0855280A3.png)

（8）上传到蒲公英

![6AA191CD-F623-4BD5-9603-4E2ED58CEAF3](http://o6ul1xz4z.bkt.clouddn.com/2017-07-13-6AA191CD-F623-4BD5-9603-4E2ED58CEAF3.png)



![6B3AFB60-9636-4D00-99AD-7C6C02B30BC4](http://o6ul1xz4z.bkt.clouddn.com/2017-07-13-6B3AFB60-9636-4D00-99AD-7C6C02B30BC4.png)

（9）将可下载安装包的网页链接发送给测试者



![B420B1A9-B0D3-4104-9697-81DF74533406](http://o6ul1xz4z.bkt.clouddn.com/2017-07-13-B420B1A9-B0D3-4104-9697-81DF74533406.png)

## 12.5 利用蒲公英做 BUG 探索测试

- 测试覆盖率高
- 测试报告很详尽

![EAD302AA-631B-447B-BF1B-D49D02707514](http://o6ul1xz4z.bkt.clouddn.com/2017-07-16-EAD302AA-631B-447B-BF1B-D49D02707514.png)

# 13 二期课程-初识 Redux 框架

**Redux 和 React 什么关系？**

- Redux 出现在 React 之后，但并不是 React 的“家臣”。事实上， Redux 可以用在任何 JS 技术栈，只不过和 React 结合使用会很舒服。

**什么时候使用 Redux？**

- 在 React 技术架构中，并不是非用 Redux 不可，而是遇到 React 自身很难搞定的场景时，才有可能需要用 Redux。

- 如果没有复杂的交互，对于技术水平不太一致的团队，使用 Redux 带来的问题以及学习和协作成本可能比带来的收益更多。

- 简单的 APP 使用了 Redux 会瞬间让应用变得很复杂，这意味着 Redux 上手门槛比较高。

  ​

## 13.1 先了解下 Immutable Data

**可变数据的副作用**

对象往往比较占内存， JS 中，引用类型其实是一种“指针”，因此下面的代码中 a 和 b 引用的是同一个对象。好处是节省了内存。但在复杂的项目中，可以一不小心就会修改掉或者说污染掉某个数据。

```javascript
const a = {
  name: 'scott'
}

const b = a
b.name = 'imooc'
a.name // imooc
```

**通过浅拷贝能解决问题吗？**

可以通过 `Object.assign()` 或者 lodash 的 `_.extend` 等来实现相对安全的操作。

```javascript
const a = {
  name: 'scott'
}

const b = Object.assign({}, a)
b.name = 'imooc'
a.name // scott
```

但上面对属性的拷贝是前拷贝，如果属性是引用类型，仍然存在隐患。

**那么深拷贝不就可以解决了吗？**

确实可以解决，但又会引入性能（内存和 CPU 占用过高）问题。

**祭出终极方案！**[Immutable](https://facebook.github.io/immutable-js/)!

和 React 师出同门，历经多年开发，一直很低调，知道最近才大放异彩。它的内部实现了一套独特的数据持久化的方案。可以更好地解决上面的问题。（注意！讲师没提 immutable 的体积大的问题！）

```javascript
$ npm i immutable
$ node
> .editor

import Immutable from 'immutable'

const a = Immutable.fromJS({a: { name: 'scott' }})
const b = a.setIn(['a', 'name'], 'imooc')
a.geIn(['a', 'name']) // scott
a === b // false
```

通过 `fromJS` 返回的其实是一个结构树，通过节点共享（没有更改过的节点共享，更改后就拉出来分支）保证了性能的同时，保证每次返回不同的对象。甚至可以进行回溯，得到历史的状态。

## 13.2 React 蛋疼的数据通信

重新回顾下 React 的几个点

### 生命周期

![895B60EC-1169-4555-A9C1-649E6A045070](http://o6ul1xz4z.bkt.clouddn.com/2017-07-05-895B60EC-1169-4555-A9C1-649E6A045070.png)

### state(状态) 和 props(属性)

- state，往往是内含的、封闭的，只和自身有关；
- props，往往和外界有关联，可能会影响到内部的状态。

### 数据流

![71CDB834-A9EB-442B-B5AA-48217B0AE5FE](http://o6ul1xz4z.bkt.clouddn.com/2017-07-05-71CDB834-A9EB-442B-B5AA-48217B0AE5FE.png)

如果子组件需要修改父组件的状态，可以通过 props 从父组件传递函数引用来达到目的。更进一步，如果兄弟组件之间要同步状态，也可以利用这个办法，只需要父组件和两个子组件都通过 props 传递状态进去，结合回调函数就可以实现。不过，仍然是很麻烦。



```javascript
// 兄弟组件之间传递状态
import React from 'react'
import {
  AppRegistry,
  Text,
  View
} from 'react-native'

class Child1 extends React.Component {
  render() {
    return (
    	<Text onPress={() => this.props.setA(1)}>
      		Child1: {this.props.a}
      	</Text>
    )
  }
}

class Child2 extends React.Component {
  render() {
    return (
    	<Text onPress={() => this.props.setA(2)}>
      		Child1: {this.props.a}
      	</Text>
    )
  }
}

class App extends React.Component {
  state = { a: 0 }

  _setA(a) {
    this.setState({ a })
  }

  render() {
    return (
    	<Text onPress={() => this.props.setA(2)}>
			<Child1 a={this.state.a} />
            <Child2 a={this.state.a} />
      	</Text>
    )
  }
}

AppRegistry.registerComponent('App', () => App)
```



### 总结

上面的办法逻辑会比较绕，当项目比较复杂时，可能会不知道回调函数被多少组件使用。如果状态这样一层层往上提，在子组件的代码中并不容易看出来到底它有哪些状态或属性。导致这样子写代码非常辛苦。

## 13.3 理解 Redux 工作原理和基本用法

![EB0B0649-445B-4B89-9D53-34D37F951A12](http://o6ul1xz4z.bkt.clouddn.com/2017-07-05-EB0B0649-445B-4B89-9D53-34D37F951A12.png)

Redux 通过 Actions 监听所有动作，发送动作所携带的信息。然后 Reducers 来匹配到动作，内部消化并生成新的数据对象，再给 Store，Store 通过 Provider 这个虚拟容器分发给所有有关系的组件。



```javascript
import { applyMiddleware, combineReducers, createStore } from 'redux'

// define reducer
const user = (state = {
    name: 'Scott',
    age: 28
  }, action) {
  switch (action.type) {
    case: 'CHNAGE_NAME': {
      return {
        ...state,
        name: action.payload
      }
    }
    case 'CHANGE_AGE': {
      ...state,
      age: action.payload
    }
  }
  return state
}

const friends = (state=[], action) {
  switch (action.type) {
    case: 'CHNAGE_FRIENDS': {
      return {
        ...state,
        friends: action.payload
      }
      break
    }
  }
  reutrn state
}

const reducers = combineReducers({ user, friends })

// define middleware
const logger = store => next => action => {
  console.log('action fired', action)
  action.type = 'CHNAGE_NAME'
  next(action)
}

// create store
const store = createStore(reducer, {}, applyMiddleware(logger))

// subscribe
store.subscribe(() => {
  console.log('store change to ', store.getState())
})

// dispatch
store.dispatch({ type: 'CHANGE_NAME', payload: 'Bill'})
store.dispatch({ type: 'CHANGE_AGE', payload: 29})
```



# 14 二期课程-React Native 升级到 0.42.3

## 14.1 获取一期源码进行升级降级

### 软升级

在老项目源码上升级。

（1）锁定版本

```bash
$ nvm use v6.10.0 && npm alias default v6.10.0
$ npm i react-native@2.0.1 -g
```

（2）重装依赖

```bash
$ rm -rf node_modules && npm i
```

（3）升级模块

```bash
$ react-native upgrade
```



### 硬升级（课程实战是用的这种方式）

新加一个项目，将老项目的部分源码迁移过来。

（1）锁定版本

```bash
$ nvm use v6.10.0 && npm alias default v6.10.0
$ npm i react-native@2.0.1 -g
```

（2）新建项目

```bash
# 新建 0.42.3 的 RN 项目
$ react-native init imoocApp --version 0.42.3
```

（3）转移文件（把可以直接复制过来的直接复制）

```bash
.
├── app
├── app.json
├── index.android.js
├── index.ios.js
├── ios
│   ├── build
│   ├── imoocApp
│   │   ├── Base.lproj
│   │   ├── Images.xcassets
│   │   ├── Info.plist
```



## 14.2 依赖模块升级与Link

（4）安装依赖

- 可以直接安装的依赖

```
$ npm i 												\
immutable@3.8.1 										\
lodash@4.16.4 											\
react-native-audio@3.2.2 								\
react-native-navigation-redux-helpers@0.5.0 			\
react-native-sound@0.9.1								\
react-native-vector-icons@4.0.0							\
react-navigation@1.0.0-beta.9							\
react-redux@4.4.6										\
redux@3.3.1												\
react-immutable@3.0.8									\
redux-logger@2.7.4										\
redux-actions@0.13.0									\
redux-promise@0.5.3										\
redux-thunk@2.0.1										\
--save													
```

- 需要通过源码安装的依赖

react-native-video 需要安装最新的还没有发布的版本，所以可以通过 github 地址来安装：

-![2A62A3BB-898B-4AB7-918E-8E7ACEC044DB](http://o6ul1xz4z.bkt.clouddn.com/2017-07-17-2A62A3BB-898B-4AB7-918E-8E7ACEC044DB.png)

- 需要手动加载的依赖(ART)

1> 装载到 xcode（xcode 打开 `node_modules/react-native/Libraries/ART/ART.xcodeproj`）

2> 添加

![D193A546-8AF4-4F0C-B417-E6CBFD418398](http://o6ul1xz4z.bkt.clouddn.com/2017-07-17-D193A546-8AF4-4F0C-B417-E6CBFD418398.png)

![F006EB6D-F028-4D1A-8CC3-84C2C691B160](http://o6ul1xz4z.bkt.clouddn.com/2017-07-17-F006EB6D-F028-4D1A-8CC3-84C2C691B160.png)

- 需要修改源码才能通过编译的依赖(react-native-sk-countdown，这货代码台老旧了)

（5）链接

```bash
$ npm i # 防止有遗漏的
$ react-native link
```

（6）运行

```
$ react-native run-ios
```



## 14.3 重新划分项目目录结构

```bash
├── app
│   ├── actions
│   ├── assets
│   ├── common
│   │   ├── config.js
│   │   ├── request.js
│   │   └── util.js
│   ├── components
│   │   ├── CountDownText.js
│   │   └── countDown.js
│   ├── containers
│   │   └── index.js
│   ├── index.js
│   ├── pages
│   │   ├── account
│   │   ├── creation
│   │   └── edit
│   ├── reducers
│   ├── static
│   │   └── images
│   └── store.js
├── app.json
├── index.android.js
├── index.ios.js
└── package.json
```



## 14.4 利用 Redux 组装 store

```bash
$ npm i redux react-redux redux-immutable immutable redux-thunk redux-logger redux-promise -S
```



```js
import { createStore, applyMiddleware } from 'redux'
import { fromJS } from 'immutable'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import promiseMiddleware from 'redux-promise'
import reducers from './reducers'

const logger = createLogger()

const middlewares = [
	thunk,// 让 action 可以返回函数，从而便于异步处理
	promiseMiddleware,// 让 store 的 dispatch 方法可以接受 Promise 对象作为参数
	logger
]

export default function configureStore(initialState = fromJS({})) {
	const enhancer = applyMiddleware(...middlewares)
	const store = createStore(reducers(), initialState, enhancer)

	// 热重载
	// RN 继承了 JS 的模块系统，引入了一个 hot 对象。通过该对象可以实现局部刷新，但不会丢失应用的状态。
	// 这个特性在 RN 中称为 MH2。这个特性是基于 webpack 来实现的，
	if (module.hot) {
		module.hot.accept(() => {
			store.replaceReducer(require('./reducers'.default))
		})
	}
	return store
}
```



## 14.5 重构主控页面引入 connect 连接组件

## 14.6 dispatch 异步请求控制 App 加载次序

## 14.7 引入 React Navigation 解决导航及嵌套路由跳转

（1）给配置 ESlint

- 安装相关的包

```bash
$ npm i eslint eslint-plugin-react babel-eslint --save-dev
```

- 创建 .eslintrc.js

```bash
$ eslint --init
```

![22B52F15-CB24-4194-9378-D16CE8DF80AC](http://o6ul1xz4z.bkt.clouddn.com/2017-08-05-22B52F15-CB24-4194-9378-D16CE8DF80AC.png)

```js
module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "parser": "babel-eslint",
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    "parserOptions": {
        "ecmaVersion": 2017,
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true,
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "no-console": ["error", { allow: ["warn", "error", "log"] }],
        "space-before-function-paren": ["error", {
            "anonymous": "always",
            "named": "always",
            "asyncArrow": "always"
        }],
        "require-await": "error"
    }
};
```



- 设置 VSCode

```json
"eslint.validate": [
  "javascript",
  "javascriptreact"
],
"eslint.options": {
  "configFile": "/Users/tonyearth/demos/RN_demos/imoocApp/.eslintrc.js"
}
```

![F0E8CE23-D686-4701-AD9C-441FD7A4CC4D](http://o6ul1xz4z.bkt.clouddn.com/2017-08-05-F0E8CE23-D686-4701-AD9C-441FD7A4CC4D.png)

（2）使用 react-navigation 重构 Tab

## 14.8 抽象列表页容器组件重构数据流

`app/containers/creation.js`

- 容器组件没有具体的页面组件，只负责业务逻辑的跳转、属性的传递和一些 action 的分发。

## 14.9 完善列表页功能成功运行 Redux 集成效果

1. 用 redux 重构创意列表页下拉列表；

2. 用 react-navigation 重构 Tab；

   ​

## 14.10 重构详情页进行代码减肥

用 redux 重构创意视频详情页。

## 14.11 抽象主要页面的容器组件

![B993348E-F26A-4B43-B946-2EE3252F5DD1](http://o6ul1xz4z.bkt.clouddn.com/2017-10-15-B993348E-F26A-4B43-B946-2EE3252F5DD1.png)

## 14.12 实现评论与详情页的跳转和数据更新

1. RN 0.45 有一个 BUG，由于默认开启了滚动性能的优化，导致布局不正常，需要将 removeClippedSubviews 设置为 false 来关闭滚动性能的提升。

## 14.13 重新配置注册登录的数据状态同步

## 14.14 抽离信息提示组件状态到全局完善评论

## 14.15 抽象升级配音页面及导航容器

## 14.16 重新组织账户页面

## 14.17 升级账户更新页同步新数据

# 15 二期课程-兼容开发 Android App

## 15.1 配置 Android 本地开发环境

文档（中文翻译）：https://reactnative.cn/docs/0.49/getting-started.html

目标平台：Android

开发平台：macOS

（1） 保证环境干净（如果有旧的环境，先删除）

```bash
rm -rf /Applications/Android\ Studio.app
rm -rf ~/Library/Preferences/AndroidStudio*
rm -rf ~/Library/Application\ Support/AndroidStudio*
rm -rf ~/Library/Logs/AndroidStudio*
rm -rf ~/Library/Caches/AndroidStudio*
rm -rf ~/.AndroidStudio*
rm -rf ~/.android
rm -rf ~/AndroidStudioProjects
rm -rf ~/AndroidStudio*
rm -rf ~/.gradle
rm -rf ~/.android
rm -rf ~/Library/Android*
rm -rf /usr/local/opt/android-sdk
```

（2）安装 JDK(1.8+)

（3）Homebrew

（4）nodejs(nvm)、watchman

（5）Android Studio

![606AFCED-4B44-4AAE-A095-3EF0ABAF7326](http://o6ul1xz4z.bkt.clouddn.com/2017-11-06-606AFCED-4B44-4AAE-A095-3EF0ABAF7326.png)

![44142CD3-8957-429A-9A74-B6796BECB678](http://o6ul1xz4z.bkt.clouddn.com/2017-11-06-44142CD3-8957-429A-9A74-B6796BECB678.png)

![44C44FC0-4AE9-4693-9343-3CD291A18054](http://o6ul1xz4z.bkt.clouddn.com/2017-11-06-44C44FC0-4AE9-4693-9343-3CD291A18054.png)



（6）环境变量

```bash
$ vim ~/.bash_Profile
export ANDROID_HOME=~/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools

# 确保使用 on-my-zsh 终端也能正确使用 sdkmanager 和 avdmanager 等工具
$ vim ~/.zshrc
export ANDROID_HOME=~/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```



## 15.2 第一次尝试运行 Android RN 项目

### 1. 启动 Android Studio

有因为 GFW 需要设置代理的情况。以我的情况为例，自建的 SS 服务，客户端用 [ShadowsocksX-NG](https://github.com/shadowsocks/ShadowsocksX-NG/releases/)（mac），本地 Sock5 情况如下：

![64046913-3407-4605-B5A4-4329D30BD93C](http://o6ul1xz4z.bkt.clouddn.com/2017-11-05-64046913-3407-4605-B5A4-4329D30BD93C.png)

因此代理配置如下：

![542244D0-3A48-4316-A243-D4EC8D73FBB4](http://o6ul1xz4z.bkt.clouddn.com/2017-11-05-542244D0-3A48-4316-A243-D4EC8D73FBB4.png)





### 2. Configure | SDK Manager

### 3. 创建一个新的项目（为了进入编辑器开启 AVD Maneger）

**注意：**创建一个新 Android 项目，项目打开后，初始化时如果有提示错误，根据提示安装缺少的 SDK 和工具即可。

### 4. 开启 AVD Maneger

**注意：**务必确保 `ANDROID_HOME` 环境变量设置正确，否则AVD Manager 图标会被禁用。

### 5. 启动模拟器

**注意：**可能会遇到 HAXM 问题，如下：

![9F50865F-B4A1-4877-94DD-C80FD752DA32](http://o6ul1xz4z.bkt.clouddn.com/2017-11-06-9F50865F-B4A1-4877-94DD-C80FD752DA32.png)



**解决方法**：去如下路径找到必须的安装包安装即可。

```bash
$ cd ~/Library/Android/sdk/extras/intel/Hardware_Accelerated_Execution_Manager
$ open .
```

![AA72B00B-9522-4D35-84AB-BF44D7AA62A5](http://o6ul1xz4z.bkt.clouddn.com/2017-11-06-AA72B00B-9522-4D35-84AB-BF44D7AA62A5.png)

![7C59FDD1-4A03-413E-8DB3-0EF9FE5E97CE](http://o6ul1xz4z.bkt.clouddn.com/2017-11-06-7C59FDD1-4A03-413E-8DB3-0EF9FE5E97CE.png)



### 6. 启动 RN 项目

（1）编辑 `android/local.properties`

```bash
# 如果用 Android Studio 打开过这个项目，会自动生成这个文件，则不需要编辑
sdk.dir=/Users/tonyearth/Library/Android/sdk
```

（2）手动下载某些文件（如果有必要）

**注意**：启动过程中会首先下载一些文件，其中如果某些文件下载特别慢，可以自己手动下载下来。以我的为例

![C1D87B4D-C6AA-4D83-91ED-7E2A2E7784B5](http://o6ul1xz4z.bkt.clouddn.com/2017-11-07-C1D87B4D-C6AA-4D83-91ED-7E2A2E7784B5.png)

下载 `gradle-2.14.1-all.zip `虽然很慢，但最后还是下载成功了，因为代理的问题最后还是启动失败了，为了第二次启动不要浪费太多时间，直接通过迅雷下载，然后

```bash
$ cd ~/.gradle/wrapper/dists/gradle-2.14.1-all/8bnwg5hd3w55iofp58khbp6yv
$ rm -rf *
$ mv ~/downloads/gradle-2.14.1-all.zip ./
```

（3）启动

**注意**：如果开了代理，需要先关闭掉。

```bash
$ react-native run-android
```



### 7. 运行应用程序

**注意：**如果程序需要联网，需要对请求进行代理，例如

```bash
$ adb reverse tcp:1234 tcp:1234
```



### 8. 调试

- 呼出启动 debug menu: `command + m`

![DE81535F-227A-482C-A0E0-31E078CB7D85](http://o6ul1xz4z.bkt.clouddn.com/2017-11-07-DE81535F-227A-482C-A0E0-31E078CB7D85.png)



## 15.3 兼容 Android 平台样式

（1）轮播图中的按钮样式

（2）Tab 拦样式

## 15.4 兼容 Android 录制功能

### 15.4.1 [react-native-image-picker](https://github.com/react-community/react-native-image-picker)

（1）权限配置`android/app/src/main/AndroidManifes.xml`

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
```

（2）确保依赖已配置`android/app/build.gradle`

```bash
dependencies {
    compile project(':react-native-image-picker')
}
```

（3）确保被引入`android/app/src/main/java/com/imoocapp/MainApplication.java`

### 15.4.2 Android Device Monitor

`Tools>Android>Android Device Monitor`

![](http://o6ul1xz4z.bkt.clouddn.com/2017-11-13-190730.png)

# 总结

简单说几个 Scott 的代码存在以下几个可以优化的地方：

1. 没有采用 ESLint，页面普遍引入了一些没有用到的模块
2. 文件顶部都有 `use strict` ，没必要，因为 babel 默认会给加上
3. 箭头函数中使用 that 来暂存 this。箭头函数中其实没必要做这种闭包，可以直接使用 this
4. 没有做 PropTypes 校验