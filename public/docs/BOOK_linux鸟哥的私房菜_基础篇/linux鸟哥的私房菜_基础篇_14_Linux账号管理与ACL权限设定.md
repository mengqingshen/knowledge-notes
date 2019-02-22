---
title: 14 Linux 账号管理与 ACL 权限设定
categories: [linux鸟哥的私房菜_基础篇]
tag:
 - linux
 - shell

date: 2013-11-13 19:21:59
typora-copy-images-to: ipic
---

```bash
/etc/passwd
/etc/group
/etc/shadow
/etc/gshadow
/etc/default/useradd
/etc/login.defs
/etc/kel/*
/etc/pam.d/passwd  # PAM密码管理机制所在的位置
/etc/skel          # home目录基准参考目录
/etc/sudoers        # 该档案中记录着可以执行sudo命令的帐号
/var/spool/mail/       # 用户邮箱位置
/etc/default/useradd
```

# 1 /etc/passwd 和 /etc/shadow
☑ 注意: 修改`/etc/passwd`中的帐号信息会导致文档属性无法显示拥有者的姓名，取而代之的是UID。

## 1.1 /etc/passwd

![0C2B36EE-892B-4015-9C48-94CC8B3B0F96](http://cdn.mengqingshen.com/2017-04-21-0C2B36EE-892B-4015-9C48-94CC8B3B0F96.png)

![B3B403F4-B85D-4F01-B3F8-A744B904FF97](http://cdn.mengqingshen.com/2017-04-21-B3B403F4-B85D-4F01-B3F8-A744B904FF97.png)

![C187449A-BD80-42BE-B19A-CC015189480C](http://cdn.mengqingshen.com/2017-04-21-C187449A-BD80-42BE-B19A-CC015189480C.png)

## 1.2 /etc/shadow

![4AF8EA21-281D-4410-8122-4E7C95FD0A27](http://cdn.mengqingshen.com/2017-04-21-4AF8EA21-281D-4410-8122-4E7C95FD0A27.png)

![41ADC233-E4D6-4FE1-BAAA-66AA46E59734](http://cdn.mengqingshen.com/2017-04-21-41ADC233-E4D6-4FE1-BAAA-66AA46E59734.png)

## 1.3  找回丢失的密码

![4D06D232-DC7E-442A-9BE3-4EB790C03732](http://cdn.mengqingshen.com/2017-04-21-4D06D232-DC7E-442A-9BE3-4EB790C03732.png)

# 2 改变默认 home 目录

通过修改`/etc/passwd`第7栏的信息来改变默认home目录(usermod)，对我个人很实用;或者通过修改第8栏给用户一个登录后的默认sheel。

# 3 /sbin/nologin

`/sbin/nologin`这个sheel可以让用户在不获得sheel环境，可以用来做为纯pop邮件帐号
![C2355F13-6CFA-4600-8209-793FC5E5C02F](http://cdn.mengqingshen.com/2017-04-21-C2355F13-6CFA-4600-8209-793FC5E5C02F.png)

![1C1DEC0B-A048-48E8-A8F1-BBDAA1D50781](http://cdn.mengqingshen.com/2017-04-21-1C1DEC0B-A048-48E8-A8F1-BBDAA1D50781.png)

![BE41DC14-1FF2-4227-9E74-79EB5B2E80F8](http://cdn.mengqingshen.com/2017-04-21-BE41DC14-1FF2-4227-9E74-79EB5B2E80F8.png)

# 4 关于群组

有效群组，与初始群组，groups,newgrp

## 4.1 /etc/group

![62A6A107-D3C8-433F-9BCF-D06991BBF9E0](http://cdn.mengqingshen.com/2017-04-21-62A6A107-D3C8-433F-9BCF-D06991BBF9E0.png)


```bash
$ useradd -m  yxl   # 创建行用户yxl并自动生成主目录/home/yxl(普通用户)
$ sudo passwd yxl truman# 创建帐号密码
$ sudo usermod -s /bin/bash yxl # 修改yxl的登录sheel为/bin/bash(默认是/bin/sh)   
$ sudo grep yxl /etc/passwd /etc/group /etc/shadow
     /etc/passwd:yxl:x:999:999::/home/yxl:/bin/bash
     /etc/group:yxl:x:999:
     /etc/shadow:yxl:$6$oVhKiz3G$AWIETaQnyPd4pKME/XYfOBWlHJSBDJLjFLCc.01Jd8zx4xreNnlYTkvK8
     B.OJHx6QdItzTis1p/4LYhx7EhFx.:16023::::::
$ sudo  usermod -G  anderson yxl # 将yxl加到anderson组中
$ sudo  usermod -G  sudo yxl  # 将yxl附加到sudo组中 
$ groups # 查看当前用户支持的群组（第一个是有效群组）
$ newgrp  adm # 切换到adm这个群组为有效群组(现在创建的新文档将属于当前用户，并属于当前有效群组)
```

## 4.2 实战

**默认方式建立用户**

```bash
$ useradd vbird1
$ sudo passwd vbird1 # 设置密码
```

![1F45EE06-677C-4702-A678-20B75DA9AD73](http://cdn.mengqingshen.com/2017-04-21-1F45EE06-677C-4702-A678-20B75DA9AD73.png)

**-u /-g**

```bash
$ useradd -u 700 -g users vbird2    # 初始群组为users，初始UID为700,建立用户vird2
```

**-c，-r**

```bash
$ useadd -r bird3   # 创建系统账号，不会主动建立家目录
```

**4.useradd参考档**
查看useradd的默认情况

![E37231C6-1C72-4300-B1D8-8501D3AA5E7B](http://cdn.mengqingshen.com/2017-04-21-E37231C6-1C72-4300-B1D8-8501D3AA5E7B.png)

```bash
GROUP=100
HOME=/home
INACTIVE=-1
EXPIRE=
SHELL=/bin/sh
SKEL=/etc/skel
CREATE_MAIL_SPOOL=no     # ==no时不会在/var/spool/mail下建立文档
```

**5.UID/GID默认参考档:/etc/login.defs**

![00C22494-F641-4F8A-8759-93F11BA4D8D9](http://cdn.mengqingshen.com/2017-04-21-00C22494-F641-4F8A-8759-93F11BA4D8D9.png)

![6B065755-B4F5-4B7A-9C4D-BCC9D1295CD3](http://cdn.mengqingshen.com/2017-04-21-6B065755-B4F5-4B7A-9C4D-BCC9D1295CD3.png)

![D9F62C51-2C09-4342-A448-2794D3AAE392](http://cdn.mengqingshen.com/2017-04-21-D9F62C51-2C09-4342-A448-2794D3AAE392.png)


# 5.使用standard input建立用户的密码

```bash
$ sudo echo "truman"  | passwd --stdin vbird1
```

![83479858-21B6-4F64-A157-733AD7BF70DD](http://cdn.mengqingshen.com/2017-04-21-83479858-21B6-4F64-A157-733AD7BF70DD.png)

# 6. passwd命令

```
/etc/passwd
/etc/pam.d/passwd
/etc/shadow
```

```bash
$ sudo passwd -S yxl       # 查看yxl的帐号情况
$ sudo passwd -x 60  -i 10 yxl# 60天变更，10天失效密码过期设置
$ sudo passwd -l yxl # 将yxl这个账户锁定(会因为系统无法正确读取shadow中的密码字段而无法登录)        
$ sudo grep yxl /etc/shadow     # 查看什么发生了变化
    yxl:!$6$oVhKiz3G$AWIETaQnyPd4pKME/XYfOBWlHJSBDJLjFLCc.01Jd8zx4xreNnlYTkvK
    8B.OJHx6QdItzTis1p/4LYhx7EhFx.:16023::60::10::
$ sudo passwd -u yxl    
    passwd：密码过期信息已更改。
$ sudo grep yxl /etc/shadow
    yxl:$6$oVhKiz3G$AWIETaQnyPd4pKME/XYfOBWlHJSBDJLjFLCc.01Jd8zx4xreNnlYTkvK
    8B.OJHx6QdItzTis1p/4LYhx7EhFx.:16023::60::10::
```

# 7.chage命令

```bash
$ sudo chage -l yxl # 查看yxl的详细密码属性信息（比passwd -S好用多了）
```

![0E372DCD-3F35-46C4-80BF-9F67F1A4D2F7](http://cdn.mengqingshen.com/2017-04-21-0E372DCD-3F35-46C4-80BF-9F67F1A4D2F7.png)


## 案例1
给别人一个初始密码，当该用户登录时必须修改密码，否则无法登录

```bash
$ sudo useradd nemo
$ sudo echo "yxl694852" | passwd --stdin nemo(ubuntu不支持)    or $ sudo passwd nemo
$ sudo sudo chage -d 0 nemo 
```
# 8.usermod

![1AC96545-A23D-4D96-AC7F-9625F4D221BC](http://cdn.mengqingshen.com/2017-04-21-1AC96545-A23D-4D96-AC7F-9625F4D221BC.png)

**案例一: 修改yxl的说明栏**

```bash
$ sudo usermod -c "MyGirl" yxl
$ grep yxl /etc/passwd
```

**案例二：设置yxl的密码在2100年失效**

```bash
$ sudo usermod -e "2100-01-01" yxl
```

**案例三：给已经创建的nemo账户一个home目录**

```bash
$ ll -d ~nemo
$ sudo cp -a /etc/skel/  /home/nemo # 将/etc/skel复制过来作为/home/nemo
$ sudo chown -R nemo:nemo  /home/nemo # 改变其拥有者和所属组
$ sudo chmod 700 /home/nemo    # 改变目录的权限
```

# 9 userdel

![3AF64043-2EC7-4163-8828-AF924FD4358C](http://cdn.mengqingshen.com/2017-04-21-3AF64043-2EC7-4163-8828-AF924FD4358C.png)

☑ 注意：如果只是暂时不想让该用户存在，可以考虑将密码帐号有效剩余天数（`/etc/shadow`）设为0或者`passwd -d username`删掉密码。只有确定可以完全清楚哦某个账户时 才考虑userdel.

```bash
$ find / -user vbird1 # 全盘查找属于vbird1的档案
$ sudo userdel -r vbird1 # 连同vbird1的home目录一起清除
```

# 10 finger

![64C5B158-6C77-4981-961F-E3058C9595DA](http://cdn.mengqingshen.com/2017-04-21-64C5B158-6C77-4981-961F-E3058C9595DA.png)

## 案例一

```bash
$ finger anderson  # 观察anderson帐号相关属性
 Login: anderson      Name: anderson
  Directory: /home/anderson          Shell: /bin/bash
  On since Fri Nov 15 00:54 (CST) on tty7 from :0
      1 hour 4 minutes idle
  On since Fri Nov 15 00:54 (CST) on pts/1 from :0
     1 second idle
  No mail.
  No Plan.
```

## 案例二
建立自己的计划档

```bash
$ echo   "I will go to BeiJIng the day after tomorrow." > ~.plan # 不知道为什么我的机器上没有~/.plan   ~./project   ~/.pgpkey
```

## 案例三
目前登录的用户与登录时间

```bash
$ finger 
```

# 11 chfn: 修改/添加个人属性信息

# 12 chsh :change sheel
## 案例一
用anderson的身份列出系统上所有合法的sheel,并制定/bin/sh为自己的sheel       

```bash
$ chsh -l        <==>     $ cat /etc/shells  # ubuntu上没有-l 参数
```

## 案例二
修改当前用户的shell

```bash
$ chsh -s /bin/rbash;grep anderson /etc/passwd                
# <==> 
# $ sudo usermod -s /bin/rbash anderson
```

# 13 id
查看某人或自己的UID/GID等信息，还可以用来判断有没有某个用户

```bash
$ id      <==>    $ who am i | id # 查看当前用户的信息
$ id yxl # 查看yxl的UID/GID等信息
```

# 14.groupadd, groupmod, groupdel, gpaasswd
## groupadd  
**案例一: 新建一个群组**

```bash
$sudo  groupadd webteam
$sudo  grep webteam /etc/group  /etc/shadow
            /etc/group:webteam:x:1002:
            /etc/gshadow:webteam:!::
```

## groupmod
☑ 注意：不要随便更改GID

**案例二：将案例一新建的webeam组名改为myteam,GID改为**

```bash
$ sudo groupmod -g 139 -n myteam webteam 
$ sudo grep myteam /etc/group  /etc/gshadow
            /etc/group:myteam:x:139:
            /etc/gshadow:myteam:!::
```
## groupdel
☑ 注意：如果该组中还有其他帐号则无法顺利删除（可以先更改帐号的GID或者删除那个帐号）


**案例三：删除刚刚建立的群组**

```bash
$ sudo groupdel myteam
```
## gpasswd

**案例四：建立一个新的群组myteam，交给yxl管理（群组管理员）**

```bash
$ sudo groupadd -g 139 myteam    # 建立群组myteam,GID为139（勤人坡）
$ sudo gpasswd myteam        # 设置群组密码（truman）
$ sudo gpasswd -A yxl myteam     # 将yxl添加为myteam的群组管理员
$ su yxl      # 却换到yxl
$ gpasswd -a anderson myteam       # 用易小丽的身份将anderson加为myteam的群组组员
$ grep myteam /etc/group    # 查看
```

## 帐号管理实战

### 案例一
新建一个群组mathwebteam,然后提供一个项目的开发目录，帐号信息如下

| 帐号   | 帐号备注     | 支援次要群组      | 是否可以登录主机 | passwd |
| ---- | -------- | ----------- | -------- | ------ |
| neo  | the boss | mathwebteam | yes      | truman |
| xk   | the crew | mathwebteam | yes      | truman |
| yl   | the crew | no          | no       | truman |
一：建立群组

```bash
$ sudo groupadd mathwebteam 
```

二：建立帐号

```bash
$  sudo useradd -G mathwebteam -c "the caption" neo
$  sudo useradd -G mathwebteam -c "the crew" xk
$  sudo useradd -c "the crew" -s /sbin/nologin yl
```

三：给帐号设置密码

```bash
$  sudo passwd neo
$  sudo passwd yxl
$  sudo passwd xk
```

四：建立项目目录

```bash
$ sudo mkdir /srv/project
$ sudo chgrp mathwebteam /srv/project
$ sudo chmod  2770 /srv/project
$ ll -d /srv/project
```

五：让anderson具备对/srv/project rx的权限（acl应用）
测试yl能否进入/srv/project

```bash
$ su anderson    # 切换
$ cd  /srv/project     # 不行
         bash: cd: /srv/project/: 权限不够
$ sudo setfacl -m u:anderson:rx   /srv/project     # 让anderson对/srv/project具备rx的权限
$ sudo setfacl -m d:u:anderson:rx   /srv/project     # 让anderson对/srv/project及其地下的所有文件都具备rx的权限
$ cd /srv/priject             # 现在anderson已经可以进入/srv/project中了
$ touch te  # anderson仍然不具备w的权限
$ getfacl /srv/project
        # file: srv/project/
        # owner: root
        # group: mathwebteam
        # flags: -s-
        user::rwx
        user:anderson:r-x    # 增加了anderson的权限
        group::rwx
        mask::rwx
        other::---
```

# 15 acl(access control list)

## 15.1 查看我的机器是否支持acl

```bash
$ mount | grep acl # 我的ubuntu没有查到任何信息
$ sudo dumpe2fs -h /dev/sda9 | grep acl # 通过产看根目录（我的ubuntu的根目录在/dev/sda9）的超级块来看看有没有acl的信息
             dumpe2fs 1.42.8 (20-Jun-2013)
             Default mount options:    user_xattr acl # 看来我的ubuntu默认支持acl
```

如果不支持可以执行以下命令使系统的文件系统支持：

```
$ sudo mount -o remount,acl /
[sudo] password for anderson: 
$ mount |grep acl
  /dev/sda9 on / type ext4 (rw,errors=remount-ro,acl)
```

## 15.2 acl的使用技巧

![4C0A45BA-615E-4B83-910C-A0A7D311908A](http://cdn.mengqingshen.com/2017-04-21-4C0A45BA-615E-4B83-910C-A0A7D311908A.png)

### 案例一
在 test 中创建一个文档 acl_test1 并使用 setfacl对acl_test1 的权限进行设置

```bash
$ mkdir /home/anderson/test
$ touch /home/anderson/test/acl_test1
$ setfacl -m u:yxl:rwx acl_test1 # 使yxl具备rwx权限
$ ll -d acl_test1 
    -rw-rwxr--+ 1 anderson anderson 0 11月 16 14:14 acl_test1*
$ setfacl -m u::rwx acl_test1 
$ ll -d acl_test1 
    -rwxrwxr--+ 1 anderson anderson 0 11月 16 14:14 acl_test1*

$ getfacl acl_test1 # 查看acl_test1档案的acl属性
            # file: acl_test1
            # owner: anderson
            # group: anderson
            user::rwx
            user:yxl:rwx
            group::r--
            mask::rwx
            other::r--
$ setfacl -m g:myteam:rx acl_tes # 给myteam这个群组rx权限
$ getfacl acl_test1                       # 查看acl_text1这个的档案的acl权限设置
            # file: acl_test1
            # owner: anderson
            # group: anderson
            user::rwx
            user:yxl:rwx
            group::r--
            group:myteam:r-x            # 多了这个群组的权限设定
            mask::rwx
            other::r--
```

**针对有效权限mask的设置**

```bash
$ setf -m m:r  acl_test1 # 针对acl_test1设置mask（权限上限）为r,这样acl设置最高权限只有r
```

## 15.3 帐号的切换
### 15.3.1 su

```bash
$ su     # 切换为root账户，变量设定方式为no-login shell，环境变量不会改变(还是原来的用户的变量环境)
$ su -  # 以login shell的方式切换为root（变量环境是root的）
$ su -c "head -n 3 /etc/shadow"     # 切换为root执行一条命令，执行完毕后马上切换回来
$ su -l yxl
# or
# $ su yxl  # 切换到yxl这个普通用户
```

### 15.3.2 sudo

```bash
$ sudo -u yxl touch /home/yxl/sudotest  # 使用yxl帐号建立sudotest
$ sudo -u yxl sh -c "mkdir ~yxl/www;cd ~yxl/www; echo 'This is index.html file' "  # 一串指令
```

### 15.3.3 visudo和/etc/sudoers

![EDB11C6A-7F64-4570-970C-E9EA30B93AD7](http://cdn.mengqingshen.com/2017-04-21-EDB11C6A-7F64-4570-970C-E9EA30B93AD7.png)

**案例一**：让 yxl 可以通过 sudo 切换为 root ，限制仅可以使用 passwd 帮助 anderson 修改帐号的密码，但不能修改 anderson 的密码

```bash
$ sudo visudo 

        yxl ALL=(root) !/usr/bin/passwd,/usr/bin/passwd [a-zA-Z]*,!/usr/bin/passwd anderson,!/usr/bin/passwd root
```

**案例二**：针对案例一优化，以一种更加有弹性更易扩展维护的方式设置[1-23]

```bash
$ sudo visudo
        #User_Alias and Cmnd_Alias
        User_Alias ADMPW =yxl,yl   #这次添加两个助手
        Cmnd_Alias ADMPWCOM=!/usr/bin/passwd,/usr/bin/passwd [a-zA-Z]*,!/usr/bin/passwd anderson,!/usr/bin/passwd root 
        ADMPW  ALL=(root) ADMPWCOM
```

**案例三**：sudo 搭配 su 实现普通帐号在不知道 root 密码的情况下使用 root 身份进行工作(sudo su -)

☑ 注意：仅在这些帐号您都十分信任的情况下

```bash
$ sudo visudo
  User_Alias ADMINS=user1,user2,user3
  ADMINS ALL=(root) /bin/su -
```

## 15.4  用户的特殊shell与PAM模块
### 15.4.1 nologin shell
   我的 ubuntu 的 nologin shell 为 /usr/sbin/nologin，而且我没在 /etc/下找到 nologin.txt ，新建了一个也不起作用。

### 15.4.2  passwd呼叫PAM接口的过程

   ![A1D7EE37-F0CA-4094-AEA1-E0B7B8630812](http://cdn.mengqingshen.com/2017-04-21-A1D7EE37-F0CA-4094-AEA1-E0B7B8630812.png)
----
**以下的学习平台更换为centos 6.4 on vmware 10.0.1**
----
### 15.4.3 PAM控制旗标所造成的回报流程
### 15.4.4 centos 6的PAM预设档案（相关配置文件）

```bash
/etc/pam.d/login       # 登入系统执行的pam验证流程
/etc/pam.d/ststem-auth  # 被多次呼叫
/etc/pam.d/*                    # 各个程序的pam配置文件
/etc/security/*           # 其它环境的pam配置文件
/usr/share/doc/pam-*/# 详细的pam说明文档，可能有多个版本
/lib/security/            # 模块实际位置
```

### 15.4.5 pam模块

```bash
$ ll /usr/share/doc/pam-1.1.1/txts/  # txts底下每个README文件对应一个模块
```

**常用模块介绍**

pam_security.so
pam_nologin.so
pam_selinux.so
pam_console.so
pam_loginuid.so
pam_env.so
pam_unix.so
pam_cracklib.so
pam_limits.so



![2E16B4A0-AD06-43D9-B9A5-7251C76D33DA](http://cdn.mengqingshen.com/2017-04-21-2E16B4A0-AD06-43D9-B9A5-7251C76D33DA.png)

![AAE51217-F441-4A91-825D-6E4DAC4B1C5B](http://cdn.mengqingshen.com/2017-04-21-AAE51217-F441-4A91-825D-6E4DAC4B1C5B.png)

#### 案例

为什么root无法以telnet远程登录系统，但是却可以使用ssh直接登入？
![0E1903FC-C609-4615-8FF1-AEE5735024C5](http://cdn.mengqingshen.com/2017-04-21-0E1903FC-C609-4615-8FF1-AEE5735024C5.png)

### 15.4.5 pam验证机制流程

   ![FC4B8898-2421-489B-9E08-AD9641CD4C62](http://cdn.mengqingshen.com/2017-04-21-FC4B8898-2421-489B-9E08-AD9641CD4C62.png)

### 15.4.6 其它pam相关档案及其设定
**/etc/security/limits.conf**

通过对该档案的设置实现对用户的限制（ulimit）

案例一：用户user1只能建立的档案总大小100m以内，而且大于90时会警告[1-30]

```
$ sudo vim  /etc/security/limits.conf
user1   soft  fsize   90000
user1   hard fsize   100000
测试：
$ su user1
$ dd if=/dev/zero of =test bs =1m count=110  # 将/dev/zero复制到当前目录的test下，分割成110个个小 档案，每个1M 
$ ulimit -a # 查看当前用户收到的限制
```

案例二：限制pro1这个群组，每次仅能有一个用户登入系统(maxlogins)

```bash
$ sudo vim /etc/security/limits.conf
           @pro1  hard maxlogins 1 # 只有对初始群组才有效，第二个用户试图登录会使/var/log/secure档案出现如下信息......
```

☑ 注意
1. 设定完成即生效
2. 程序呼叫pam是才会设定，因此对已经登录的用户无效

**/var/log/secure**
无法登陆等错误会被记录在这个档案，当发生各种登陆错误时可以到这里看看问题点。

## 以下的学习平台更换为ubuntu13.10

## 15.5 linux主机上的用户信息传递
### 15.5.1 查询使用者  w,who,last,laslog

```bash
$ w     # 查看已经登入系统的用户(信息更加详细，可读性稍差)
$ who # 同w,当信息简洁，可读性好
$ last  # 查最近一个月的登录记录
$ lastlog # 查看所有账号最近一次的登陆
```

![9AAF82B7-4E27-41FF-AFF4-5BCED362A3A7](http://cdn.mengqingshen.com/2017-04-21-9AAF82B7-4E27-41FF-AFF4-5BCED362A3A7.png)

### 15.5.2 不同账号之间对话 write,mesg,wall
案例一：打开两个终端，向另一个终端上的自己发送信息：hi,don't do anything stuipid!

```bash
$ who # 查看当前所在登录的用户及其登录的终端    
# or
# $ finger
$ write anderson pts/3     # 想anderson所在的pts/3发送信息
hi,dong/t do anything stupid!  # ^d结束输入
（此时在另一个终端立即收到了这个信息）
$ mesg n   # 这样可以拒绝收到其帐号（终端）发来的消息，但对root除外
$ mesg y   # 解除上面的锁定
$ wall "I will shutdown linux later......"  # 向所有账户广播
```

### 15.5.3 邮件信箱 mail
☑ 注意：理论上应该有/home/anderson/mbox(阅读后q退出的邮件的位置)

```bash
$ user -D      # 发现我的系统建立用户帐号时不会自动创建邮箱   
​```

**案例一**：向yxl发邮件信息，主题：nice to meet you
第一种方式：终端输入stdin

​```bash
$ mail yxl -s "nice to meet you"
    Hello,Ms Yi.Nice to meet you.YOu are so nice.
    .                # 最后一行输入小数点代表结束输入
    Cc:       # 抄送    不需要的话直接Enter
```

第二种方式：数据流重导向

```bash
$ mail yxl     -s "nice to meet you" < ~.bashrc      ----将~.bashrc发给yxl
```

**案例二**：写一封邮件~/mailtest重导向发给自己并查阅后离开

```bash
$ mail -s "what's up"   anderson  <  ~.bashrc
$ mail    <==>  $ mail -f /var/mail/anderson     
  ??       # 查看命令选项
  ?t5 # 查看第5封信的信息
  ？x    # 不做任何改变离开
```

几个常见的指令：h d s x q

![DC216841-F268-4F11-A36B-D98E875054E6](http://cdn.mengqingshen.com/2017-04-21-DC216841-F268-4F11-A36B-D98E875054E6.png)

## 15.6 手动建立帐号
### 15.6.1 帐号检查工具

```bash
$ sudo pwck      # 检查/etc/passwd ，/etc/shadow的字段错误以及帐号家目录是否存在等
$ sudo pwconv  # 检查/etc/passwd对应的/etc/shadow中的密码，如果缺少对应密码，则想shadow添加信息（login.defs），                                                        若/etc/passwd中有passwd字段在则转移到/etc/shadow中，将/etc/passwd中的密码字段置为x
$ sudo pwunconv   # 会删除/etc/shadow，最好别用
$ echo "yxl:truman"  | chpasswd  -m # 将“truman”加密并添加到/etc/shadow中 （为已经存在的账户yxl设置密码）
# <==>
# $ sudo echo "truman"| passwd  --stdin   yxl
```

### 15.6.2 帐号建立
以下的学习平台更换为centos 6 on vmware10.0.1
**案例一：手动建立帐号nobody,所在群组nobodyteam**

```bash
# 一：建立群组并同步
$ sudo vim /etc/group
 nobodygroup:x:520:
$ grpconv
$grep "nobodyteam"  /etc/group /etc/gshadow
# 二：建立帐号并同步
$ sudo vim /etc/passwd
  nobody:x:700:520::/home/nobodyteam:/bin/bash
$ sudo pwconv
$ grep 'nobody'  /etc/passwd /etc/gshadow
$ passwd nobody
# 三：建立家目录，修订权限
$ cp -a  /etc/skel   /home/nobody
$ sudo chown -R nobody:nobodyteam   /home/nobody
$ sudo chmod 700 /home/nobody 
```

![47ABA6C2-B19A-4EF9-8B5B-EF5E539F69E0](http://cdn.mengqingshen.com/2017-04-21-47ABA6C2-B19A-4EF9-8B5B-EF5E539F69E0.png)

案例二：大量建立账号脚本

第一种：通过编辑好的记录账号名文件结合脚本创建（适合没有规律的账户名）   

第二种：通过脚本自动生成账号内容并建立 （适合有规律的账号名）

```bash
#/bin/bash
#Program:这只程序主要帮助建立大量帐号
#History:
# 2013/11/22  anderson  1th release
export PATH=/sbin:/usr/sbin:/bin:/usr/bin
accountfile="user.passwd"

# 1.先进行帐号相关的输入先！
echo ""
echo "例如我们昆山四技的学好为：4960c001到4960c060，那么："
echo "帐号开头代码为 ：4"
echo "帐号层级或年级为  ：960c"
echo "号码数字位为（001～060） ：3"
echo "帐号开始帐号为 ：1"
echo "帐号数量为 ：60"
echo ""
read -p "帐号开头代码（Input title name,ex>std）=====>"
username_start
read -p "帐号层级或年级（Input degree,ex>1 or enter）=>"
username_degree
read -p "号码起始部位的数字位（Input\# of digital）=====>" nu_nu
read -p "起始号码（Input start number,ex>520）=====>" nu_start
read -p "帐号数量（Input the amount of users,ex>100)=====>" nu_amount
read -p "密码标准:1）与帐号相同;2）随机数自定义===========>" pwm
if [ "$username_start" == "" ];then
  echo "没有输入开头的代码，终止程序！"; exit 1
fi

#判断数字系统
testing0=$(echo $nu_nu | grep '[^0-9]')
testing1=$(echo $nu_amount| grep '[^0-9]')
testing2=$(echo $nu_start | grep '[^0-9]')
if [ "$tesing0" != "" -o "$testing1" != "" -o "$testing2" !="" ];then
  echo "输入的号码不对！有非数字的内容！" 
  exit 1
fi
if [ "$pwm" != "1" ];then
  pwm="2"
fi

# 2.开始输出帐号和密码档案！
[ -f "$accountfile"] $$ mv "$accountfile" "$accountfile"$(date +%Y%m%d)    #如果指定的user.passwd存在,修改名称为"user.passwd日期"
nu_end=$(($nu_start+$nu_amount-1))       #号码数字位最大值
for ((i=$nu_start;i<=nu_end;i++))
do
  nu_len=${#i}  #$i是nu_len位数（如果i是个位数，nu_len=1,如果是十位数，nu_len=2...）
  if [$nu_nu -lt $nu_len ];then
    echo "数值的位数($i->$nu_len已经比你设定的位数还要大！)"
    echo "程序无法继续"
    exit 1
  fi
  nu_diff=$(($nu_nu-$$nu_len))
  if [ "$nu_diff" != 0];then
    nu_nn=0000000000
    nu_nn=${nu_nn:1:$nu_diff}
  fi
  account=${username_start}${username_degree}${nu_nn}${i}
  if [ "pwm" == "1"];then
    password="$account"
  else
    password=$(openssl rand -base64 6)    #系统随机生成密码并用openssl加密
  fi
  echo "$account":"$password"| tee -a "accountfile"
done

# 3.开始建立帐号
cat "$accountfile" | cut -d ':' -f1| xargs -n 1 useradd -m   #useradd -m 执行时每次只用一个参数
chpasswd < "$accountfile"   #从$accountfile文件中读入键值对（username:passwd）,加密后写入/etc/shadow
pwconv    #将/etc/passwd张的密码字段移动到/etc/shadow(这里实际上是比对后对没有对应账号的/etc/shadow进行初始添加操作)
echo "OK!建立完成！"
```

案例三：将服务器账号分开管理，分为单纯邮件使用与可登入系统账号两种。其中若为纯邮件使用者，将该账号加入mail为初始群组，切此账号不可使用bash等sheel登入系统。若为可登入账号，将该账号加入youcan这个次要群组。
第一步：查看群组是否已经存在

```bash
$ grep mail /etc/group
$ grep youcan /etc/group
$ grepadd youcan    ----发现youcan没有被建立
```

第二步：简历三个纯邮件账号

```bash
$ vim popuser.sh
    #!/bin/bash
    for username in pro1 pro2 pro3 
    do
        useradd -g mail -s /sbin/nologin -M $username
        echo $username| passwd --stdin $username
    done
```

第三步：建立一般登陆账号

```bash
$ vim loginuser.sh
    #！/bin/bash
    for username in youlog1 youlog2 youlog3
    do
        useradd -G youcan -s -m $username
        echo $username | passwd --stdin $username
    done
```

第四步：执行

```bash
$ sh popuser.sh;sh loginuser.sh
```
