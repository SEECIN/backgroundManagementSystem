# backgroundManagementSystem

# back-manage

电商后台管理系统



# 1. 功能

![](/src/assets/mdImages/image-20221029151731183.png)

### 开发模式

> 电商后台管理系统整体采用前后端分离的开发模式,其中前端项目是基于Vue技术栈的SPA项目

![](/src/assets/mdImages/image-20221029151842605.png)

### 技术选型

- Vue
- Vue-router
- Element-UI
- Axios
- 后端API接口源码  [跳转](https://github.com/SEECIN/backgroundmanagementServer.git)

### 登录

- 项目默认登录名：admin，密码：123456
- 在登录页面输入用户名和密码
- 调用后台接口进行验证
- 通过验证之后,根据后台的响应状态跳转到项目主页

### 用户管理

系统用户列表

![](/src/assets/mdImages/image-20221029152311633.png)

### 权限管理

通过权限管理模块控制不同的用户可以进行哪些操作，具体可以通过角色的方式进行控制，即每个用户分配一个特定的角色，角色包括不同的功能权限。

#### 角色列表

系统中角色列表。可以新增、编辑、删除、为角色分配权限。

![](/src/assets/mdImages/image-20221029152514352.png)

![](/src/assets/mdImages/image-20221029152548144.png)

#### 权限列表

当前系统可以操作的权限。

![](/src/assets/mdImages/image-20221029152604215.png)

### 商品管理

#### 商品列表

所有商品的列表。可以添加、编辑、删除商品。

![](/src/assets/mdImages/image-20221029152634309.png)

#### 商品分类

商品分类用于在购物时，快速找到需要购买的商品，进行直观显示。

![](/src/assets/mdImages/image-20221029152702919.png)

### 订单管理

订单管理均为mockjs模拟的数据

![](/src/assets/mdImages/image-20221029152721261.png)

# 2. 技术问题

## 登录功能
### 保存token

将登录成功之后的 token，保存到客户端的localStorage中。当退出登录或者手动清除本地存储数据会被清空
### 路由导航守卫控制访问权限
如果用户没有登录，但是直接通过URL访问特定页面，需要重新导航到登录页面。

```js
// 在配置路由的文件中配置

router.beforeEach((to, from, next) => {
  //获取本地token
  const token = store.get(process.env.VUE_APP_USER_INFO)?.token
  //获取角色权限
  const roleAuth = store.get(process.env.VUE_APP_USER_INFO)?.roleAuth
  //已登录
  if (token) {
    if (to.path === "/login") {
      next('/')
    } else {
      //刷新页面时路由会重置，所以要重新匹配路由
      if (Store.state.permission.permissionRoutes.length === 0) {
        Store.dispatch("permission/comparisonAndSetUpRoutes", roleAuth)
        next({ path: to.path })
      } else {
        next()
      }
    }
  } else {
    //未登录
    if (to.path !== "/login") next("/login")
    next()
  }
})
```

## 退出功能

基于token的方式实现退出比较简单，只需要销毁本地的token即可。这样，后续的请求就不会携带token ，必须重新登录生成一个新的token之后才可以访问页面。

## axios 请求拦截器

```js
//request 拦截器
instance.interceptors.request.use(async config => {
  //获取本地token
  const token = store.get(process.env.VUE_APP_USER_INFO)?.token
  //获取当前用户状态
  const status = store.get(process.env.VUE_APP_USER_INFO)?.status
  //获取当前用户的角色名
  const roleName = store.get(process.env.VUE_APP_USER_INFO)?.roleName
  if (token) {
    //添加token
    config.headers['Authorization'] = `Bearer ${token}`
  }
  //如果当前用户(除超级管理员外)被禁用，那么所有增删改操作无法进行
  if (["delete", "put", "post"].includes(config.method) && status === 0 && roleName !== "超级管理员") {
    Message({
      type: 'warning',
      message: '当前用户已被禁用，无法进行操作'
    })
    //中断请求
    return Promise.reject("当前用户已被禁用，无法进行操作")
  }
  NProgress.start()
  return config
}, err => {
  return Promise.reject(err)
})
```

## axios 响应拦截器

```js
//response 拦截器
instance.interceptors.response.use(response => {
  // 如果是修改当前角色或者用户信息，需要进行对应的视图更新（不刷新页面更新组件）
  if (["user", "role"].includes(response.config.url) && response.config.method === "put") {
    const userInfo = store.get(process.env.VUE_APP_USER_INFO)
    const resultData = response.data.data.result
    if (userInfo.id === resultData.id || userInfo.role === resultData.id) {
      //需要在视图上展示的信息的字段
      const modifyInfoFeild = ["username", "status", "roleName", "roleAuth"]
      //修改的信息字段与localstorage的信息字段比对，字段数据改变的一项拿出来
      Object.entries(resultData).filter(item => {
        if (modifyInfoFeild.includes(item[0]) && userInfo[item[0]] !== item[1]) {
          //将userInfo中被修改的数据字段替换
          userInfo[item[0]] = item[1]
        }
      })
      //本地存储userInfo
      Store.commit("SET_USERINFO", { userInfo })
      if (response.config.url === "role") {
        //如果修改的是当前角色信息则需要更新路由
        resetRouter()
        const { roleAuth } = store.get(process.env.VUE_APP_USER_INFO)
        Store.dispatch('permission/comparisonAndSetUpRoutes', roleAuth)
      } else {
        //如果修改的是当前用户信息则需要更新Header展示的数据
        Vue.prototype.$bus.$emit("headerCmponentUpdate")
      }
    }
  }
  NProgress.done()
  //剥离最外层
  return response?.data
}, err => {
  return Promise.reject(err)
})
```



## 其它

- 进度条使用第三方库：[nprogress](https://github.com/rstacruz/nprogress) 在axios拦截请求时展示进度条，拦截响应时隐藏进度条
