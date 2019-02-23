---
title: React Native 快速入门
categories:
  - 极客学院_ReactNative
---

**视频地址：**http://www.jikexueyuan.com/course/1504.html

**练习 DEMO：**https://coding.net/u/eli01/p/REACT_NATIVE_PRACTICE/git/tree/master/RN_FOR_JK_HelloWorld

## 1	React Native介绍
`Learn Once, Write Anywhere.`
**介绍：**`React Native`是facebook在2015 React开发者大会上公开的应用开发框架，一个可以用`React`开发原生应用的框架。

**意义：**Web和Native的结合是未来，目前对于这种跨端开发方式而言，React Native应该是首选方案。

**案例：**
1. Facebook Group
2. 天猫ipad
3. Chinese Flashcards

**优点：**为什么我们需要关心React Native?
1. 真正意义的跨端应用开发
2. 基于React的组件化开发模式
3. 拥有web的发布能力和原生应用的性能
4. 国内大型互联网公司已经开始投入大量资源到React Native中
5. Web和Native结合的模式是未来

**能力：**
1. 机遇原生UI组件
2. 手势识别
3. 基于FlexBox的css布局模式
4. 跨平台开发（Android预计10月后才能支持）
5. 基于React, jsx的组件化开发模式
6. 可使用npm中的模块
7. Chrome Dev Tool的集成

**同类框架：**
+ Goole的sky
+ Titanium
+ NativeScript
+ 鸟巢
+ Bee Framework

### 1.1	React
**说明：**是一套前端JacaScript框架，由Facebook开源。

**特点：**JSX语法，组件化模式，Virtual DOM，单向数据流。

**基本模式：**每个React应用可视为组件的组合，而每个React组件由属性（property）和状态（state）来配置，当状态发生变化时更新UI，组件的结构是由虚拟的DOM来维护的，确保了实际更新的DOM只包括真正产生了状态变化的部分。
```js
var Hello = React.createClass({
	render:function(){
		return <TextHello React Native</Text;
	}
});
```
## 2	React Native环境搭建
**环境依赖：**`OSX、Xcode、Node`
+ osx系统，目前还不支持 `Android`系统
+ Xcode,在 App Store 上下载最新版本的 Xcode，目前应该是 3.6.1


### 2.1 相关依赖
（1）Homebrew
http://brew.sh/

（2）watchman
https://www.watchmanmonitoring.com/
```bash
$ brew install watchman # 检查文件变动的工具
```

（3）flow
https://github.com/facebook/flow
```bash
$ brew install flow # jsx 语法检查工具
```

#### 2.2 命令行工具
（1）react native cli
```bash
## 安装
$ npm i -g react-native-cli # reactive native 的命令行工具

## 项目初始化
$ react-native init RN_FOR_JK_HelloWorld # 项目取名为 RN_FOR_JK_HelloWorld

```
（2）使用 xcode 预览
虚拟机快捷键|说明
-|-
Cmd + R|重载 JS
Cmd + D|打开 开发菜单


```bash
## 使用 xcode 打开
$ open RN_FOR_JK_HelloWorld/ios/RN_FOR_JK_HelloWorld.xcodeproj
```

##### 常见的问题
+  **npm i -g react-native-cli 无法安装？**
添加`sudo`权限安装

+ **Xcode 点击 run 过后报 clang 语法错误**
Xcode 版本更新到最新


## 3	Movie List示例程序
```bash
RN_FOR_JK_HelloWorld
├── android
├── index.android.js
├── index.ios.js # 示例代码（以 ios 为例）
├── ios
├── node_modules
└── package.json
```

```javascript
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView
} from 'react-native';

const REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

class RN_FOR_JK_HelloWorld extends Component {
  // 组件渲染
  render() {
    if (this.state.loaded) {
      return this.renderList();
    }
    else {
      return this.renderLoadingView();
    }
  }

  // 构造器
  constructor(props) {
    super(props);

    // 初始化 state
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      loaded: false
    }
  }


  // 组件挂载后
  componentDidMount () {
    fetch(REQUEST_URL)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
        loaded: true
      });
    })
    .done();
  }

  renderList () {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderItem} />
      )
  }

  renderItem (movie) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: movie.posters.thumbnail}}
          style={styles.thumbnail}/>
        <View
          style={styles.rightContainer}>
            <Text>{movie.title}</Text>
            <Text>{movie.year}</Text>
          </View>
      </View>
    )
  }

  renderLoadingView () {
    return (
      <View
        style={styles.container}>
        <Text>Loading, please wait!</Text>
      </View>
    );
  }
}

/* 定义样式 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5fcff'
  },
  rightContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  thumbnail: {
    backgroundColor: '#676767',
    width: 53,
    height: 81
  }
});

AppRegistry.registerComponent('RN_FOR_JK_HelloWorld', () => RN_FOR_JK_HelloWorld);

```
![Alt text](http://cdn.mengqingshen.com/img/1473688744773.png)
