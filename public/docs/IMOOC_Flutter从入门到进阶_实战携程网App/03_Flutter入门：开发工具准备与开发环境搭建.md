---
title: 第三章 Flutter入门：开发工具准备与开发环境搭建
categories:
    - Flutter从入门到进阶_实战携程网App
tag:
    - Flutter
---

## 1 自测小作业

>  [《Flutter 中文网》](https://flutterchina.club/get-started/install/)



作业1：请列举Flutter不同版本（Stable、Beta、Dev、Master）的特点？

作业2：Flutter doctor命令是做什么用的？

作业3：配置Android Studio还需要额外下载JDK吗？  为什么？

作业4：如何在Mac上配置Flutter与Android环境变量？

作业5：如何在Windows上配置Flutter与Android的环境变量？

作业6：如何通过命令行启动Android模拟器？

作业7：请列举你看过Android官方提供的 [Android Studio文档](https://developer.android.com/studio/intro)都有哪些收获？

作业8：你觉得Flutter开发工具都有哪些吐槽点？

## 2 开发系统与工具选择

> 推荐 Mac + Android Studio

![image-20191201005727578](/Users/threewood/Library/Application Support/typora-user-images/image-20191201005727578.png)

![image-20191201005832009](/Users/threewood/Library/Application Support/typora-user-images/image-20191201005832009.png)



## 3 Flutter 开发环境与 iOS 开发环境设置（Mac）

1. 下载 SDK：[Mac OS stable channel 1.9.1+hotfix.6](https://flutter.dev/docs/development/tools/sdk/releases?tab=macos#macos)
2. 安装 SDK

```bash
# 解压&安装
$  mkdir -p ~/Programs
$  cd ~/Program && ➜  unzip ~/Downloads/flutter_macos_v1.9.1+hotfix.6-stable.zip
$  echo export PATH=`pwd`/flutter/bin:\$PATH >> ~/.zshrc
$  source ~/.zshrc

# 检查依赖项
$  flutter doctor
  ╔════════════════════════════════════════════════════════════════════════════╗
  ║                 Welcome to Flutter! - https://flutter.dev                  ║
  ║                                                                            ║
  ║ The Flutter tool anonymously reports feature usage statistics and crash    ║
  ║ reports to Google in order to help Google contribute improvements to       ║
  ║ Flutter over time.                                                         ║
  ║                                                                            ║
  ║ Read about data we send with crash reports:                                ║
  ║ https://github.com/flutter/flutter/wiki/Flutter-CLI-crash-reporting        ║
  ║                                                                            ║
  ║ See Google's privacy policy:                                               ║
  ║ https://www.google.com/intl/en/policies/privacy/                           ║
  ║                                                                            ║
  ║ Use "flutter config --no-analytics" to disable analytics and crash         ║
  ║ reporting.                                                                 ║
  ╚════════════════════════════════════════════════════════════════════════════╝
  Doctor summary (to see all details, run flutter doctor -v):
  Doctor summary (to see all details, run flutter doctor -v):
[✓] Flutter (Channel stable, v1.9.1+hotfix.6, on Mac OS X 10.15.1 19B88, locale zh-Hans-CN)
[✗] Android toolchain - develop for Android devices
    ✗ Unable to locate Android SDK.
      Install Android Studio from: https://developer.android.com/studio/index.html
      On first launch it will assist you in installing the Android SDK components.
      (or visit https://flutter.dev/setup/#android-setup for detailed instructions).
      If the Android SDK has been installed to a custom location, set ANDROID_HOME to that location.
      You may also want to add it to your PATH environment variable.

[!] Xcode - develop for iOS and macOS (Xcode 11.2.1)
    ✗ Xcode requires additional components to be installed in order to run.
      Launch Xcode and install additional required components when prompted.
    ✗ CocoaPods not installed.
        CocoaPods is used to retrieve the iOS and macOS platform side's plugin code that responds to
        your plugin usage on the Dart side.
        Without CocoaPods, plugins will not work on iOS or macOS.
        For more info, see https://flutter.dev/platform-plugins
      To install:
        sudo gem install cocoapods
[!] Android Studio (not installed)
[!] VS Code (version 1.40.2)
    ✗ Flutter extension not installed; install from
      https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter
[!] Connected device
    ! No devices available

! Doctor found issues in 5 categories.
```

3. 安装 xcode
4. 安装 Xcode 命令行工具

```bash
# 已安装
$  sudo xcode-select # --switch /Applications/Xcode.app/Contents/Developer

# 同意协议
$  sudo xcodebuild -license
```

5. 开启模拟器

```bash
$  open -a Simulator # 64 && > iphone 5s
```

6. 创建项目

```bash
$ cd ~/Code && flutter create demo_flutter_from_imooc
$  cd demo_flutter_from_imooc
$  flutter run
```

<img src="/Users/threewood/Library/Application Support/typora-user-images/image-20191211073758284.png" alt="image-20191211073758284" style="zoom:25%;" />

7. 安装到真机

```bash
# 1. 准备需要的工具
$ brew install --HEAD usbmuxd
$ brew link usbmuxd
$ brew install --HEAD libimobiledevice
$ brew install ideviceinstaller ios-deploy cocoapods
$ pod setup

# 2. 安装到 iOS 真机
$ open ios/Runner.xcworkspace # 可能需要解决 build 的问题
$ flutter run
```



## 4 Android 开发环境与 Flutter 插件安装（Mac）

1. Android Studio

   https://developer.android.com/studio

   ![image-20191217021406025](/Users/threewood/Library/Application Support/typora-user-images/image-20191217021406025.png)

注意：这是因为还没安装 Android SDK，没有配置 Android SDK 的环境变量，点击 cacel（直接跳过）

2. Android SDK

1) 启动 SDK Manager

![image-20191225073854525](/Users/threewood/Library/Application Support/typora-user-images/image-20191225073854525.png)

2) 配置路径&安装

![image-20191225074857105](/Users/threewood/Library/Application Support/typora-user-images/image-20191225074857105.png)

3. Flutter 插件安装

![image-20191225075800117](/Users/threewood/Library/Application Support/typora-user-images/image-20191225075800117.png)

4. 配置虚拟机加速
   + 安装 Itel x86 Emulator Accelerator（HAXM insteller）

![image-20200130012746923](https://tva1.sinaimg.cn/large/006tNbRwgy1gbdy43mavjj30sa0i3adm.jpg)

```bash
$ kextstat | grep intel
  324    0 0xffffff7f83d5f000 0x29000    0x29000    com.intel.kext.intelhaxm (7.5.1) D0CC7B8F-1F62-33B1-BE6B-B5573D2A607B <8 6 5 3 1> # 表明已加载内核扩展
```

5. 设置环境变量

```bash
# Android SDK 路径
$ echo export ANDROID_HOME=`echo ~/Library/Android/sdk` >> ~/.zshrc

# Android 模拟器路径
$ echo export PATH=\${PATH}:\${ANDROID_HOME}/emulator >> ~/.zshrc

# Android tools 路径
$ echo export PATH=\${PATH}:\${ANDROID_HOME}/tools >> ~/.zshrc

# Android 平台工具路径
$ echo export PATH=\${PATH}:\${ANDROID_HOME}/platform-tools >> ~/.zshrc

# Android NDK 路径
$ echo export ANDROID_NDK_HOME=\${ANDROID_HOME}/ndk >> ~/.zshrc

# Andorid 镜像（如果不能科学上网）
# $ echo export PUB_HOSTED_URL=https://pub.flutter-io.cn >> .zshrc
# $ echo export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn >> .zshrc

# Flutter 路径（前面配置过了）
# $ echo export PATH=`echo ~/Programs/flutter/bin`:\$PATH >> .zshrc
```



## 5 Flutter 开发环境与 Android 开发环境设置详解（Windows）

（不用 windows）

## 6 Flutter 开发环境与开发环境设置实操（Windows）【边学边做】

（不用 windows）

## 7 Flutter 开发工具使用指南

### IDE 选择

+ 方案一：android studio + 【plugin】flutter+【plugin】dart
  + 同时支持 iOS 版和 android 版

+ 方案二：Xcode
  + 只支持 iOS 版

## 8 本章小结-环境、工具、版本等问题【避坑指南】

### Flutter

+ Flutter 环境变量（通过 flutter doctor 验证环境变量是否存在问题）
+ stable, beta, dev, master（如无必要，优先使用 stable 版本）

