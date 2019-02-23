---
title: 02 Nginx 虚拟主机和相关配置
categories: [Nginx网站架构]
tag:
  - nginx
date: 2015-02-04 09:59:39
typora-copy-images-to: ipic
---

# location匹配规则

**语法**：`location [=|~|~*|^~] /uri/ {...}`

**默认值**:no

**使用字段**：server

**注意**：如果匹配多个location，将选择最精确的location

**说明**：这个参数根据URI的不同需求来进行配置，可以使用字符串与正则表达式匹配，如果要使用正则表达式，必需指定下列前缀

| 前缀   | 说明                       |
| ---- | ------------------------ |
| ~    | 区分大小写                    |
| ~*   | 不区分大小写                   |
| ^~   | 禁止表达式匹配（不再匹配后面的location） |
| =    | 精确匹配                     |

**案例**

```
location = / {
  #只匹配/的查询
  [configuration A]
}
location  / {
  #匹配irenhe以/开始的查询，但是正则表达式与一些较长的字符串将首先匹配。
  [configuration B]
}
location ^~ /images/{
  #匹配任何以/images/开始的查询并且停止搜索，不检查正则表达式
  [configuratuin C]
}
location ~*\.(gif|jpg|jpeg)${
  #匹配任何以gif,jpg,or jpeg结尾的文件，但是所有/images/目录的请求将在Configuratuin C中处理
  [configuration D]
}
```

**各请求的处理如下例：**

`./` -> `configuration A`
`./documents/document.html` -> `configuration B`
`./images/1.gif` -> `configuration C`
`./documents/1.jpg` -> `configuration D`


# 自定义错误页面

```
server{
  listen	80 default_server;
  server_name	www8.example.com;
  root	/var/www/web2;
  index	index.html;
  access_log	/var/log/nginx/www8.example.com-access.log main;
  error_log	/var/log/nginx/www8.example.com-err.log warn;
  error_page	403 404 /40x.html;#自定义错误页面
  location = /40x.html {
    root	/var/www/error;
  }
}
```

# 自动索引及别名功能

**自动索引**：列出文件目录

```
server{
  ...
  location /redhat{
    root /web/html;
    index index.html index.htm;
    autoindex on;#启用自动索引
  }
}
```

**别名功能**:uri替换

```
server{
  ...
  location /i/{
    alias /data/w3/images/; # 访问/i/top.gif <=/data/w3/images/top.gif
}}
```

# 控制站点访问

```
server{
  ...
  location /redhat{
    ...
    # 按照顺序检查ip地址，一旦匹配就不在往下检查
    deny 192.168.0.32;
    allow 192.168.0.0/24;	
    allow 192.168.1.1;
    deny all;
  }
  ...
}
```

# 目录身份验证

```
server{
  ...
  location /redhat{
    ...
    # htpasswd -cm /etc/nginx/.htpasswd alice
    # htpasswd -m /etc/nginx/.htpasswd bob
    auth_basic "AwstatAuth";
    auth_basic_user_file /etc/nginx/.htpasswd;
    ...
  }
  ...
}
```



# Nginx状态检查

```
server{
  ...
  location /nginx_status{
    ...
    # 不需要指定文件
    stub_status on;
    access_log off;
  }
  ...
}
```