import Vue from 'vue'
import Vuex from 'vuex'
import modal from './modules/modal'
import permission from './modules/permission'
import store from "store"
import http from "@/api/http"
import { resetRouter } from "@/util/resetRouter"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: store.get(process.env.VUE_APP_USER_INFO)?.token,
    userInfo: {}
  },
  getters: {
    userInfo(state) {
      const localUserInfo = store.get(process.env.VUE_APP_USER_INFO)
      if (state.token) {
        return localUserInfo || state.userInfo
      }
    }
  },
  mutations: {
    SET_USERINFO(state, { userInfo }) {
      store.set(process.env.VUE_APP_USER_INFO, userInfo)
      state.token = store.get(process.env.VUE_APP_USER_INFO)?.token
      state.userInfo = userInfo
    },
    DELETE_INFO(state) {
      state.token = ''
      state.userInfo = {}
      store.remove(process.env.VUE_APP_USER_INFO)
    }
  },
  actions: {
    async logOut({ commit }) {
      resetRouter()
      commit('DELETE_INFO')
      this.commit("permission/DELETE_PERMISSION_ROUTES")
    },
    async login({ commit }, formData) {
      try {
        let result = await http("login", formData)
        let userInfo = result.data.result
        let roleAuth = userInfo.roleAuth
        commit('SET_USERINFO', { userInfo })
        this.dispatch('permission/comparisonAndSetUpRoutes', roleAuth)
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    }
  },
  modules: {
    modal, permission
  }
})
