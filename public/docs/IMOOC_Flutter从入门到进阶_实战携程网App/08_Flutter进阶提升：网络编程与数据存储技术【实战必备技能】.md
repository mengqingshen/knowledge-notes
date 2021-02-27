---
title: 第 8 章 Flutter进阶提升：网络编程与数据存储技术【实战必备技能】
categories:
    - Flutter从入门到进阶_实战携程网App
tag:
    - Flutter
---

## 1 自测小作业（带着7个问题去学习）

作业1：你常使用http的哪些类型的请求？

作业2： 如何解决http请求中 中文乱码问题？

作业3：请对比Future与ES6的Promise有哪些异同？

作业4：FutureBuilder都可以用来做什么？

作业5：JSON解析都有哪些实用方式？

作业6：shared_preferences在Android和iOS中分别基于什么实现的？

作业7：在复杂json转模型上你都有哪些心得体会？

## 2 基于Http实现网络操作

[基于Http实现网络操作](https://coding.imooc.com/learn/questiondetail/134644.html)

<img src="http://cdn.mengqingshen.com/2021-02-19-051031.png" alt="image-20210219131030500" style="zoom:25%;" />



1. 使用 [http 插件](https://pub.dev/packages/http/install)获取发送请求
2. 使用 json.decode 解析 json 数据
3. 构建对象 CommonModel，并利用工厂方法将 json 数据对象映射为 CommonModel 数据实例

```dart
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;


class MyPage extends StatefulWidget {
  @override
  _MyPageState createState() => _MyPageState();
}

class _MyPageState extends State<MyPage> {
  String showResult = '';

  Future<CommonModel> fetchPost() async {
    final response = await http.get('http://www.devio.org/io/flutter_app/json/test_common_model.json');
    final result = json.decode(response.body);
    return CommonModel.fromJson(result);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Http'),
      ),
      body: Column(
        children: <Widget>[
          InkWell(
            onTap: () {
              fetchPost().then((CommonModel value) {
                setState(() {
                  showResult =
                  '请求结果：\n hideAppBar：${value.hideAppBar} \n icon：${value.icon}';
                });
              });
            },
            child: Text(
              '点我',
              style: TextStyle(fontSize: 26),
            ),
          ),
          Text(showResult)
        ],
      ),
    );
  }
}

class CommonModel {
  final String icon;
  final String title;
  final String url;
  final String statusBarColor;
  final bool hideAppBar;

  CommonModel({ this.icon, this.title, this.url, this.statusBarColor, this.hideAppBar});

  factory CommonModel.fromJson(Map<String, dynamic> json) {
    return CommonModel(
      icon: json['icon'],
      title: json['title'],
      url: json['url'],
      statusBarColor: json['statusBarColor'],
      hideAppBar: json['hideAppBar']
    );
  }
}

```

## 3 异步：Future与FutureBuilder实用技巧【好好学，实战经常用】

[Future与FutureBuilder实用技巧](https://coding.imooc.com/learn/questiondetail/134645.html)

+ `async` `await`

```dart
import 'dart:async';

test() async {
  int result = await Future.delayed(Duration(milliseconds: 2000), () {
    return Future.value(123);
  });
  
  print('t3:' + DateTime.now().toString());
  print(result);
}

main() {
  print('t1:' + DateTime.now().toString());
  test(); /// aysnc await 确保函数内部的 Future 同步执行
  print('t2:' + DateTime.now().toString());
}

/*
t1:2021-02-24 00:31:06.496
t2:2021-02-24 00:31:06.499
t3:2021-02-24 00:31:08.504
123
*/
```

+ future.whenComplete

```dart
import 'dart:async';
import 'dart:math';

void main() {
  var random = Random();
  Future.delayed(Duration(seconds: 3), () {
    if (random.nextBool()) {
      return 100;
    } else {
      throw 'boom!';
    }
  }).then(print).catchError(print).whenComplete(() {
    /// 这里无论如何都会执行
    print('done!');
  });
}
```

+ future.timeout

```dart
import 'dart:async';

void main() {
  new Future.delayed(new Duration(seconds: 3), () {
    return 1;
  })
  /// 超时进去 catchError，没超时进去 then
  .timeout(new Duration(seconds: 2)).then(print)
  .catchError(print); // TimeoutException after 0:00:02.000000: Future not completed
}
```

+ FutureBuilder

  <img src="http://cdn.mengqingshen.com/2021-02-24-132334.png" alt="image-20210224212332939" style="zoom:25%;" />
```dart
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;


class MyPage extends StatefulWidget {
  @override
  _MyPageState createState() => _MyPageState();
}

class _MyPageState extends State<MyPage> {
  String showResult = '';

  Future<CommonModel> fetchPost() async {
    final response = await http.get('http://www.devio.org/io/flutter_app/json/test_common_model.json');
    Utf8Decoder utf8decoder = Utf8Decoder();
    final result = json.decode(utf8decoder.convert(response.bodyBytes)); /// fix 中文乱码
    return CommonModel.fromJson(result);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Future 与 FutureBuilder 实用技巧'),
      ),
      /// 利用 FutureBuilder 方便地完成数据的请求和渲染
      body: FutureBuilder<CommonModel>(
        future: fetchPost(),
        builder: (BuildContext context, AsyncSnapshot<CommonModel> snapshot) {
          switch (snapshot.connectionState) {
            case ConnectionState.none:
              return Text('Input a URL to start');
            case ConnectionState.waiting:
              return Center(
                child: CircularProgressIndicator(),
              );
            case ConnectionState.active:
              return Text('');
            case ConnectionState.done:
              if (snapshot.hasError) {
                return Text(
                  '${snapshot.error}',
                  style: TextStyle(color: Colors.red),
                );
              } else {
                return Column(
                  children: <Widget>[
                    Text('icon:${snapshot.data.icon}'),
                    Text('statusBarColor:${snapshot.data.statusBarColor}'),
                    Text('title:${snapshot.data.title}'),
                    Text('url:${snapshot.data.url}'),
                  ],
                );
              }
              break;
            default:
              return Text('');
          }
      },)
    );
  }
}

class CommonModel {
  final String icon;
  final String title;
  final String url;
  final String statusBarColor;
  final bool hideAppBar;

  CommonModel({ this.icon, this.title, this.url, this.statusBarColor, this.hideAppBar});

  factory CommonModel.fromJson(Map<String, dynamic> json) {
    return CommonModel(
      icon: json['icon'],
      title: json['title'],
      url: json['url'],
      statusBarColor: json['statusBarColor'],
      hideAppBar: json['hideAppBar']
    );
  }
}
```
## 4 JSON解析与复杂模型转换实用技巧【网络请求离不开它】

[JSON解析与复杂模型转换实用技巧](https://coding.imooc.com/learn/questiondetail/134649.html])

JSON to Dart 工具：https://javiercbk.github.io/json_to_dart/

JSON 格式化工具：http://www.json.cn/

## 5 基于shared_preferences本地存储操作【本地存储】

[基于shared_preferences本地存储操作](https://coding.imooc.com/learn/questiondetail/134650.html)

<img src="http://cdn.mengqingshen.com/2021-02-24-132553.png" alt="image-20210224212553206" style="zoom:25%;" />

```yaml
dependencies:
  shared_preferences: ^0.5.12+4
```

```dart
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';


class SearchPage extends StatefulWidget {
  @override
  _SearchPageState createState() => _SearchPageState();
}

class _SearchPageState extends State<SearchPage> {
  String countString = '';
  String localCount = '';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('基于shared_preferences本地存储操作'),
      ),
      body: Column(
        children: [
          RaisedButton(
            onPressed: _incrementCounter,
            child: Text('Increment Count'),
          ),
          RaisedButton(
            onPressed: _getCounter,
            child: Text('Get Count'),
          ),
          Text(
            countString,
            style: TextStyle(fontSize: 20),
          )
        ],
      )
    );
  }

  _incrementCounter() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    setState(() {
      countString = countString + " 1";
    });
    int counter = (prefs.getInt('counter') ?? 0) + 1;
    await prefs.setInt('counter', counter);
  }

  _getCounter() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    setState(() {
      localCount = prefs.getInt('counter').toString();
    });
  }
}
```



## 6 本章小结（略）

