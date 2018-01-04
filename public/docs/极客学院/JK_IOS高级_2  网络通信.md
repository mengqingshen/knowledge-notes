---
title: 2 网络通信
categories:
  - 极客学院_ios高级

---


## 2.1	iOS-HTTP通信

### 2.1.1	同步加载网络数据
>**说明：**介绍两种方式
>+ `NSString`提供的构造器
>+ `NSURLConnection.sendSynchronousRequest`方法（iOS 9中已过时）

```swift
import UIKit

class ViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        loadJKPageByNSString()
    }
    
    /**
     同步方式请求极客学院首页（通过 NSString）
     */
    func loadJKPageByNSString() -> () {
        do {
            let str = try NSString(contentsOfURL: NSURL(string: "http://jikexueyuan.com")!, encoding: NSUTF8StringEncoding)
            
            let data = NSData(contentsOfURL: NSURL(string: "http://jikexueyuan.com")!)

            print(str)
            print(data)
        }
        catch {
            print("无法连接网络")
        }
    }
    
    /**
     同步方式请求极客学院首页（通过 NSURLConnection）
     */
    func loadJKPageByNSURLConnection() -> () {
        do {
            var resp:NSURLResponse?
            let data = try NSURLConnection.sendSynchronousRequest(NSURLRequest(URL: NSURL(string: "http://hikexueyuan.com")!), returningResponse: &resp)

            print(resp)
            print(data)
        }
        catch {
            print("无法连接网络")
        }
    }
}
```


### 2.2.2	异步加载网络数据
>**说明：**`NSURLConnection.sendAsynchronousRequest`（在`iOS9 中过时`）

```swift
import UIKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        loadJKPage()
    }

    func loadJKPage() -> () {
        NSURLConnection.sendAsynchronousRequest(NSURLRequest(URL: NSURL(string: "http://jikexueyuan.com")!), queue: NSOperationQueue()) {(resp:NSURLResponse?, data:NSData?, error:NSError?) -> Void in
            if let e = error {
                print("请求失败:\(e)")
            }
            else {
                print(NSString(data: data!, encoding: NSUTF8StringEncoding))
            }
        }
    }
}
```


### 2.2.3 搭建J2E集成开发环境

#### 2.2.3.1	安装 Apache Tomcat
>**下载 Apache Tomcat：**http://tomcat.apache.org/download-80.cgi

![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-04-21%20%E4%B8%8A%E5%8D%8812.30.32.png)

```bash
$ sudo mkdir -p /usr/local
$ mv ~/Downloads/apache-tomcat-8.0.33 /usr/local
$ sudo ln -s /usr/local/apache-tomcat-8.0.33 /Library/Tomcat8
$ chown -R  tonyearth /Library/Tomcat8
$ sudo chown -R  tonyearth /Library/Tomcat8/bin/*.sh
```

#### 2.2.3.2	安装 Tomcat Controller
>**下载 Tomcat Controller：**http://tomcat-controller.en.softonic.com/mac/download#downloading

#### 2.2.3.3	安装 eclispe
>**下载eclipse：**http://www.eclipse.org/downloads/


##### 创建Dynamic Web Project
1. 开始创建新项目
![Alt text|300x150](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-04-21%20%E4%B8%8A%E5%8D%8812.35.45.png)
2. New Runtime
![Alt text|300x200](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-04-21%20%E4%B8%8A%E5%8D%8812.35.56.png)
3. 选择前面安装好的 Tomecat8 的安装目录
![Alt text|300x120](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-04-21%20%E4%B8%8A%E5%8D%8812.35.17.png)
4. 创建 JSP文件 测试
![Alt text|300x200](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-04-21%20%E4%B8%8A%E5%8D%8812.39.14.png)


### 2.2.4	通过GET/POST方式与服务器通信

#### 2.2.4.1	后端
![Alt text|200x200](http://o6ul1xz4z.bkt.clouddn.com/img/1461253557430.png)

*returnParas.jsp*

```jsp
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
String name = request.getParameter("name");
if (name != null) {
	out.print("Hello " + name);
}
else {
	out.print("No Args");
}
%>
```


#### 2.2.4.2	客户端
>**注意：**下面请求使用的`API`在`iOS9`中已过时
>**技巧：**网络请求交给子线程而不是主线程处理，不占用主线程的资源，从而不带来界面卡顿的问题
![Alt text|300x200](http://o6ul1xz4z.bkt.clouddn.com/img/1462710986603_get.gif)

```swift
import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var textInput: UITextField!// 输入请求参数
    @IBOutlet weak var textShow: UITextView!// 展示请求会的结果
    // 发送请求
    @IBAction func btnRequestPressed(sender: AnyObject) {
        testGet()
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }
    
    /**
     发送 get 请求
     */
    func testGet()-> () {
        let name = textInput.text!
        // 创建一个线程发起请求，不占用主线程的资源
        NSURLConnection.sendAsynchronousRequest(NSURLRequest(URL: NSURL(string: "http://localhost:8080/MyServer/returnParas.jsp?name=\(name)")!), queue: NSOperationQueue(), completionHandler: {
            (resp:NSURLResponse?, data:NSData?, error:NSError?) -> () in
            if let d = data {
                // 交给主线程处理
                dispatch_sync(dispatch_get_main_queue(), {
                    () -> Void in
                    // self.textShow 是主线程的控件，因此必须在主线程中处理
                    self.textShow.text = NSString(data: d, encoding: NSUTF8StringEncoding)! as String
                })
            }
        })
    }
    
    /**
     发送post请求
     */
    func testPost()->() {
        let name = textInput.text!
        // 创建并设置请求
        let req = NSMutableURLRequest(URL: NSURL(string: "http://localhost:8080/MyServer/returnParas.jsp")!)
        req.HTTPMethod = "POST"
        req.HTTPBody = NSString(string: "name=\(name)").dataUsingEncoding(NSUTF8StringEncoding)
        
        // 发起请求
        NSURLConnection.sendAsynchronousRequest(req, queue: NSOperationQueue(), completionHandler: {
            (resp:NSURLResponse?, data:NSData?, error:NSError?) -> () in
            if let d = data {
                dispatch_sync(dispatch_get_main_queue(), {
                    self.textShow.text = NSString(data: d, encoding: NSUTF8StringEncoding)! as String
                })
            }
        })
    }
}
```


