# 英语作文平台-接口文档
## 说明
* 使用时请严格按照下面给出的规范
* POST和PUT数据放body中, 以JSON格式, GET和DELETE参数放URL后
* 除auth和signup之外的都需要在请求Header中加入`x-api-token: <token>`
## 返回值的一般情况
* 成功:result对应结果
```json
{
    "success": true,
    "code": 200,
    "result":
}
```
* 失败:reason对应失败原因
```json
{
    "success": false,
    "code": ,
    "reason": 
}
```
* 以下文档仅给出result和reason的返回结果
## 接口
* 登录
  * 路径:`/auth`
  * 需要参数
  ```json
  {
    "username":"abc",
    "password":"xyz"
  }
  ```
  * 返回值
  ```json
  "result":<token>
  ```
* 注册
  * 路径:`/signup`
  * 需要参数
  ```json
  {
    "username": "账户名",
    "password": "密码", 
    "role":"[stu|tea]",
    "name":"姓名",
    "xuehao":
  }
  ```
  * 返回值: 根据状态码判断是否成功
* 用户信息
  * 路径:`/user/basic`
  * 返回参数:
  ```json
  {
    "username": "uncon",
    "role": "stu",
    "name": "案版",
    "xuehao": "0000002"
  }
  ```
* 