import { filterRoutes } from "@/util/filterRoutes"
import router, { dynamicRoutes } from "@/router/index"
import store from "store"
export default {
  namespaced: true,
  state: {
    permissionRoutes: []
  },
  getters: {
    permissionRoutes(state) {
      return state.permissionRoutes
    }
  },
  mutations: {
    SET_PERMISSION_ROUTES(state, routes) {
      state.permissionRoutes = routes
      store.set(process.env.VUE_APP_PERMISSION_ROUTES, routes)
    },
    DELETE_PERMISSION_ROUTES(state) {
      state.permissionRoutes = []
      store.remove(process.env.VUE_APP_PERMISSION_ROUTES)
    }
  },
  actions: {
    comparisonAndSetUpRoutes({ commit }, roleAuth) {
      const permissionRoutes = filterRoutes(dynamicRoutes, roleAuth)
      router.options.routes[1].children.push(...permissionRoutes)
      permissionRoutes.forEach(item => {
        router.addRoute("layout", item)
      })
      permissionRoutes.unshift(router.options.routes[1].children[0])
      commit('SET_PERMISSION_ROUTES', permissionRoutes)
    }
  }
}
