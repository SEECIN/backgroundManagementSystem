import axios from "axios"
import store from "store"
import Store from "@/store"
import Vue from 'vue'
import { Message } from 'element-ui'
import { resetRouter } from "@/util/resetRouter"
import NProgress from 'nprogress'
//axios默认值
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: process.env.VUE_APP_TIME_OUT
})

//request 拦截器
instance.interceptors.request.use(async config => {
  const token = store.get(process.env.VUE_APP_USER_INFO)?.token
  const status = store.get(process.env.VUE_APP_USER_INFO)?.status
  const roleName = store.get(process.env.VUE_APP_USER_INFO)?.roleName
  if (token) {
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
export default instance
