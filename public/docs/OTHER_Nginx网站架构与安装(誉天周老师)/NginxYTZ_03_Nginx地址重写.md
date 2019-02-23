---
title: 03 Nginx 虚拟主机和相关配置
categories: [Nginx网站架构]
tag:
  - nginx
date: 2015-02-06 10:16:22
typora-copy-images-to: ipic
---

## 1 Nginx rewrite基础
功能: 实现URL或URI的重写

**PCRE**

```
☑ Nginx 的 Rewrite 规则采用 PCRE(Perl Compatible Regular Expressions)Perl兼容正则表达式的语法进行规则匹配.
☑ 如果需要 Nginx 的 Rwrite 功能，在编译 Nginx 之前，需要编译安装 PCRE 库
```

**URL**
Uniform Resource Location: 统一资源定位符

**URI**
Uniform Resouce Location: 通用资源标志符

## 指令

#### 语法规则

##### 变量和运算符
| 变量     | 说明      |
| ------ | ------- |
| $host  | 请求的host |
| $[1-9] | 位置化参数   |

| 运算符  | 含义           | 对应的否运算 |
| ---- | ------------ | ------ |
| =    | 判等           | !=     |
| ~    | 区分大小写字符的匹配   | !~     |
| -f   | 判断文件是否存在     | !-f    |
| -d   | 判断目录是否存在     | !-d    |
| -e   | 判断文件或者目录是否存在 | !-e    |
| -x   | 判断文件是否可执行    | !-x    |

##### if指令

```
if($http_user_agent ~MSIE){    # 如果用户浏览器的user_agent指明自己使用的是IE(~:不区分大小写)
    rewrite ^(.*)$  /msie/$1 break;    # 则将任意路径重写为/msie/[原始路径]
}
if（!-f $request_filename）{    # 如果请求的文件不存在
    rewrite ^/img/(.*)$  /site/$host/images/$1 last;  
}
```

##### return指令
☑ 用途：返回状态码（如果为状态码设置了替换页面，则会进入替换的页面）

案例：如果访问的URL以".sh"或"*.bash"结尾，则返回状态码403

```
location ~ .*\.(sh|bash)?${
    return 403;
}
```

##### set、write指令

**set**
☑ 用途: 为变量赋值

**rewrite**
☑ 用途: DNS重定向

| rewrite指令的最后一项参数（flag标记） | 说明                            | 功能                          |
| ------------------------ | ----------------------------- | --------------------------- |
| last                     | 相当于Apache里的[L]标记，表示完成rewrite  | 用来实现URI重写，浏览器地址栏URI地址不变     |
| break                    | 本条规则匹配完成后，终止匹配，不再匹配后面的规则      | 用来实现URI重写，浏览器地址栏URI地址不变     |
| redirect                 | 返回302临时重定向，浏览器地址栏会显示跳转后的URL地址 | 用来实现URL跳转，浏览器地址栏显示跳转后的URL地址 |
| permanent                | 返回301永久重定向，浏览器地址栏会显示跳转后的URL地址 | 用来实现URL跳转，浏览器地址栏显示跳转后的URL地址 |

案例1(指令):对来自内网和外网的请求进行不同处理

```
locationc *{
    if($host ~* ^(.*?)\.aaa\.com){    # 如果请求来自域名.aaa.com或其子域名
        set $var_tz '1';
        if($host ~* ^192\.168\.1\.(.*?)$){    # 如果请求的域名以192.168.1开头
            set $var_tz '1';
        }
        if($host ~* ^localhost){
            set $var_tz '1';
        }
        if($var_tz !~ '1'){    # 如果不是var_tz没有被设置为1
            rewrite ^/(.*)$  http://www.aaa.com/ redirect;    # 重写地址并重定向
        }
    }
}
```

案例2（Nginx配置文件）：应用负载均衡

```
location /cms/{
    proxy_pass http://test.yourdomain.com;
    rewrite "^/cms/(.*)\.html$" /cms/index.html  break;
}
```

**建议**：一般在`根`location 中(即location /{...})或直接在server标签中编写rewrite规则，推荐使用`last`标记，在`非根`location中（`location /cms/{...}`）,则使用 `break` 标记

案例3:将原来要访问的`/data`目录重写为`/bbs`

```
rewrite ^/data/?$  /bbs/  permanent;
```

案例4：根据不同的浏览器得到不同的结果

```
if($http_user_agent ~MSIE){
    rewrite ^(.*)$ /msie/$1 break;
}
```

案例5：防止盗链

```
location ~* \.(gif|jpg|png|swf|flv)${
   valid_referers none blocked www.test.com *.test.com;
   if($invalid_referer){
        rewrite ^/(.*) http://www.test.com/block.html;
    }
}
```

案例6（域名跳转）：所有对www.abc.com的访问，redirect到www.test.com

```
server{
    listen 80;
    server_name www.test.com;
    index index.html index.php;
    root /export/home/www
    if($host="www.abc.com"){
        rewrite ^/(.*)$ http://www.test.com/$1 permanent;
    }
}
```

案例3-5：整合

```
server{
    listen 80 default_server;
    server_name www8.example.com;
    root /var/www/web2;
    rewrite ^/data/(\.*)$ /bbs last;
    if($http_user_agent ~MSIE){
        rewrite ^(.*)$ /msie/$1 break;
    }
    if($http_user_agent ~ Firefox){
        rewrite ^(.*)$ /firefox/$1 break;
    }
    location ~* \.(gif|jpg|png|swf|flv)${
       valid_referers none blocked www.test.com *.test.com;
       if($invalid_referer){
            rewrite ^/(.*) http://www.test.com/block.html;
        }
    }
}
```