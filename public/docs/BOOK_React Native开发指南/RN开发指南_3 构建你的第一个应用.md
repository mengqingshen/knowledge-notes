### 14.1.
---
title: 3 构建你的第一个应用(React Native开发指南)
categories:
  - React Native开发指南
      tag:
  - ReactNative
      
---
## 3.1 搭建环境

**说明：**使用 [HomeBrew](http://brew.sh/) 安装
```bash
$ brew install node

$ brew install watchman # Watchman 是 facebook 的一个开源项目，它开源用来监视文件并且记录文件的改动情况，当文件变更它可以触发一些操作
$ brew install flow # Facebook 公司出品的一个类型检查库(如果你想让 React Native 项目支持类型检查,可以使用 flow)
```

**安装中出现问题**
**说明：**如果出现问题，需要更新 brew 和相关依赖包
```bash
$ brew update # 更新用 homebrew 安装的软件
$ brew upgrade # 更新 homebrew 自身
```

**安装中出现错误**
```bash
$ brew doctor # 找到问题所在
```

### 3.1.1 安装 React Native
```bash
$ npm install -g react-native-cli # 命令行工具

```

### 3.1.2 iOS依赖
+ 一个 iOS 开发者账号(申请这个账号是免费的)
+ 获得一个许可（如果需要部署到 iOS 应用商店）
+ Xcode（Xcode 集成开发环境、iOS模拟器、iOS SDK）
1. 应用商店下载
2. 网站下载[https:// developer.apple.com/xcode/download/](https:// developer.apple.com/xcode/download/)

### 3.1.3 Android依赖
(1) 安装最新版本的 JDK：http://www.oracle.com/technetwork/java/javase/downloads/index.html
****
(2) 安装 Android SDK

```bash
# 安装 Android SDK
$ brew install android-sdk

# 设置环境变量
$ vim ~/.zshrc
	export ANDROID_HOME=/usr/local/opt/android-sdk

# 立即生效
$ source ~/.zshrc
```

****
3. 打开 Android SDK 管理器，选择开发包进行安装

（1）打开 Android SDK 管理器
```bash
$ android # 下载完成后有可能需要关闭窗口，然后重新打开
```
（2）需要安装的包
+ Android SDK Tools
+ Android SDK Platform-tools
+ Android SDK Build-tools
+ Android 7.0-> *
+ Extras->Android Support Repository 
+ Extras->Intel x86 Emulator Accelerator (HAXM installer)

![Alt text](http://cdn.mengqingshen.com/img/1474104519915.png)
![Alt text](http://cdn.mengqingshen.com/img/1474104584355.png)

****
4. 通过 AVD(Android Virtual Device) 管理器创建和运行模拟器
   **说明：**由于Android设备种类繁多,有不同的屏幕尺寸、 分辨率和功能,因此使用不同的模拟器通常能为测试带来帮助。当然,出于学习的目的, 我们只需要安装一个即可。
   **注意：**保勾选了 `Use Host GPU`,否则模拟器会非常慢

（1）启动  AVD
```bash
$ android avd
```
（2）创建一个模拟器
![Alt text](http://cdn.mengqingshen.com/img/1474035887787.png)

## 3.2 创建一个新的应用
**随书源码：**[https://github.com/bonniee/learning- react-native](https://github.com/bonniee/learning- react-native)

```bash
$ react-native init RN_FOR_BOOK_FIRST_PROJECT # 创建  React Native 项目

$ tree -L 2 RN_FOR_BOOK_FIRST_PROJECT -I node_modules # 观察目录结构
RN_FOR_BOOK_FIRST_PROJECT
├── android
│   ├── app
│   ├── build.gradle
│   ├── gradle
│   ├── gradle.properties
│   ├── gradlew
│   ├── gradlew.bat
│   ├── keystores
│   └── settings.gradle
├── index.android.js
├── index.ios.js
├── ios
│   ├── RN_FOR_BOOK_FIRST_PROJECT
│   ├── RN_FOR_BOOK_FIRST_PROJECT.xcodeproj
│   └── RN_FOR_BOOK_FIRST_PROJECTTests
└── package.json
```

### 3.2.1 在 iOS 平台运行 React Native 应用
| 虚拟机快捷键  | 说明      |
| ------- | ------- |
| Cmd + R | 重载 JS   |
| Cmd + D | 打开 开发菜单 |

```bash
# 使用 Xcode 打开
$ open RN_FOR_BOOK_FIRST_PROJECT/ios/RN_FOR_BOOK_FIRST_PROJECT.xcodeproj 

# 或者在项目根目录运行
$ cd RN_FOR_BOOK_FIRST_PROJECT
$ react-native run-ios
```

### 3.2.2 部署到 iOS 设备
**注意：**如果遇到 `not found the kernel library or the...`问题，说明  Xcode 不支持当前的iOS版本，升级 Xcode 到最新版。

1. 打开 Xcode，进入Xcode->Preference->Accounts，添加 Apple ID
2. 在 Xcode 中打开通用面板，点击 Fix Issue，按照引导获取证书
3. 登录到 Apple 开发者中心[http:// developer.apple.com](http:// developer.apple.com),然后注册你的设备
4. 在 `AppDelegate.m` 文件中将 `localhost` 改成你的 Mac 的 IP 地址
```objective-c
...
// 例如 IP为：10.10.12.345
jsCodeLocation =
     [NSURL URLWithString:@"http://10.10.12.345:8081/index.ios.bundle"];
     ...
```
5. xcode 打开项目
6. iOS设备通过数据线连接到 mac
7. 设备切换为 实体iOS设备 并运行项目

### 3.2.3 在 Android 平台运行 React Native 应用
| 快捷键           | 说明       |
| ------------- | -------- |
| 双击R           | 重新加载应用   |
| `甩动`手机或`按菜单键` | 调出开发相关菜单 |

#### 3.2.3.1 手动搭建集成环境

**第一步：启动虚拟机**

*方式1：部分命令行*
（1）启动AVD管理器
```bash
$ android avd
```
（2）选中目标虚拟机，点击`start`

*方式2：全部命令行*
（1）查看虚拟机列表
```bash
$ emulator -list-avds
```
（2）通过名字和 @ 前缀来运行它们
```bash
$ emulator @虚拟机设备名
```

**第二步：加载 React native 项目**

```bash
# 在工程的根目录运行如下命令
$ cd RN_FOR_BOOK_FIRST_PROJECT
$ react-native run-android # 如果出现类似 mac react emulator: ERROR: Failed to open /etc/resolv.conf, cannot retrieve DNS server 的错误，则添加 sudo 权限
```

#### FAQ
****
**（1）启动时遇到问题**
+ `CPU acceleration status: HAXM is not installed on this machine`
  **解决：**手动安装这个文件：/usr/local/Cellar/android-sdk/24.4.1_1/extras/intel/Hardware_Accelerated_Execution_Manager/IntelHAXM_6.0.3.dmg

****
**（2）加载项目时出现错误**
+ `failed to find target with hash string 'android-23' in: /usr/local/opt/android-sdk`
  **解决：**编辑`android/app/build.grdle`
```bash
...
android {
    compileSdkVersion 24 # sdk 版本和运行的虚拟 sdk 版本保持一致
    buildToolsVersion "24.0.2" # build tool 版本也要保持一致
    ...
}
...
```

#### 3.2.3.2 Android Studio

### 3.2.4 小结：创建并运行项目

## 3.3 探索示例代码
**说明：**深入到默认应用的源代码中去探索 `React Native` 项目的结构

### 3.3.1 添加组件到视图中 

### 3.3.2 React Native 中的模块导入

### 3.3.3 FirstProjext组件

## 3.4 开发天气应用
**说明：**书中给的代码不是纯粹的`es6`，随书源码给的是`es6`版本的，但运行不了。因此我会跟随书重新编写一遍代码，但会使用`es6`版本的。
（1）创建项目
```bash
$ reac-native init RN_FOR_BOOK_WEATHER
```
（2）修改默认设置
$ vim android/app/build.gradle
```bash
...
android {
    compileSdkVersion 24 # sdk 版本和运行的虚拟 sdk 版本保持一致
    buildToolsVersion "24.0.2" # build tool 版本也要保持一致
    ...
}
...
```
（3）将初始组件的代码移动到 `Weather.js` 中，精简 `index.ios.js` 和 `index.android.js` 代码

### 3.4.1 处理用户输入

#### 3.4.1.1 效果预览
**iOS 效果**
![Alt text|205x341](http://cdn.mengqingshen.com/img/1474174611287.png)

**Android 效果**
![Alt text|205x341](http://cdn.mengqingshen.com/img/1474174641467.png)

### 3.4.2 展现数据

### 3.4.3 添加背景图片
**说明：**书上讲的内容是`0.14`之前的，过时了，具体看这里：https://facebook.github.io/react-native/docs/images.html
### 3.4.4 从 Web 获取数据

#### FAQ
1. `App Transport Security has blocked a cleartext HTTP (http://) resource load since it is insecure...`
   ![Alt text](http://cdn.mengqingshen.com/img/1474212609333.png)

2. 天气接口返回 401
   http://openweathermap.org/faq

### 3.4.5 整合
## 3.5 小结
