import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'store'
import Store from "@/store"
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import("pages/login/Login")
  },
  {
    path: '/',
    name: "layout",
    redirect: "home",
    component: () => import("pages/layout/index"),
    children: [
      {
        path: "home",
        name: "首页",
        component: () => import("pages/home"),
        meta: {
          icon: "el-icon-menu"
        }
      }
    ]
  },
  {
    path: '*',
    name: 'notFound',
    component: () => import("pages/notFound")
  },
]

export const dynamicRoutes = [
  {
    path: '',
    name: '用户管理',
    component: () => import("pages/users-manage/index"),
    meta: {
      id: 101,
      icon: "el-icon-user-solid"
    },
    children: [
      {
        path: "userslist",
        name: "用户列表",
        component: () => import("pages/users-manage/users-list/index"),
        meta: {
          id: 10101,
          icon: "el-icon-menu"
        }
      },
    ]
  },
  {
    path: '',
    name: '权限管理',
    component: () => import("pages/auths-manage/index"),
    meta: {
      id: 102,
      icon: "el-icon-s-tools"
    },
    children: [
      {
        path: "rolelist",
        name: "角色列表",
        component: () => import("pages/auths-manage/role-list/index"),
        meta: {
          id: 10201,
          icon: "el-icon-menu"
        }
      },
      {
        path: "permissiolist",
        name: "权限列表",
        component: () => import("pages/auths-manage/permisson-list/index"),
        meta: {
          id: 10202,
          icon: "el-icon-menu"
        }
      },
    ]
  },
  {
    path: '',
    name: '商品管理',
    component: () => import("pages/products-manage/index"),
    meta: {
      id: 103,
      icon: "el-icon-s-goods"
    },
    children: [
      {
        path: "productslist",
        name: "商品列表",
        component: () => import("pages/products-manage/products-list/index"),
        meta: {
          id: 10301,
          icon: "el-icon-menu"
        }
      },
      {
        path: "productsclassify",
        name: "商品分类",
        component: () => import("pages/products-manage/products-classify/index"),
        meta: {
          id: 10302,
          icon: "el-icon-menu"
        }
      },
    ]
  },
  {
    path: 'ordersmanage',
    name: '订单管理',
    component: () => import("pages/orders-manage/index"),
    meta: {
      id: 104,
      icon: "el-icon-s-order"
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const token = store.get(process.env.VUE_APP_USER_INFO)?.token
  const roleAuth = store.get(process.env.VUE_APP_USER_INFO)?.roleAuth
  if (token) {
    if (to.path === "/login") {
      next('/')
    } else {
      if (Store.state.permission.permissionRoutes.length === 0) {
        Store.dispatch("permission/comparisonAndSetUpRoutes", roleAuth)
        next({ path: to.path })
      } else {
        next()
      }
    }
  } else {
    if (to.path !== "/login") next("/login")
    next()
  }
})

export default router
