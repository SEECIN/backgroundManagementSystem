<template>
  <div class="header">
    <h3>
      <i class="el-icon-platform-eleme"></i>
      电商后台管理系统
    </h3>
    <div class="userstate">
      <i>当前用户状态：</i>
      <i class="state"
         :style="{backgroundColor: status? 'springgreen':'#ff004c'}"></i>
      <i>{{status?'可用': '已被禁用'}}</i>
    </div>
    <div class="right-info">
      <div class="user-info">
        <img src="../../../assets/images/welcome.png" />
        <span>{{username}}</span>
      </div>
      <div class="role-info">
        <i class="el-icon-user"></i>
        <span>{{roleName}}</span>
      </div>
      <div class="logout">
        <i class="el-icon-switch-button"
           @click="handleLogOut"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { MessageBox, Message } from 'element-ui'
import { mapActions } from 'vuex'
import store from "store"
export default {
  name: 'Header',
  data() {
    return {
      userInfo: store.get(process.env.VUE_APP_USER_INFO)
    }
  },
  computed: {
    status() {
      return this.userInfo?.status
    },
    username() {
      return this.userInfo?.username
    },
    roleName() {
      return this.userInfo?.roleName
    }
  },
  methods: {
    handleLogOut() {
      MessageBox.confirm('确定要退出登录吗', {
        showClose: false,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.logOut()
        this.$router.push('/login')
      }).catch(() => {
        Message({
          type: 'info',
          message: '已取消此操作'
        })
      })
    },
    ...mapActions(['logOut'])
  }
}
</script>

<style lang="stylus" scoped>
.header
  display: flex
  align-items: center
  justify-content: space-between
  width 100vw
  height 60px
  padding-left 30px
  background-color: #373d42
  color #dcdfe6
  box-sizing: border-box
  h3
    font-size: 30px
  .userstate
    display: flex
    align-items: center
    font-size: 14px
    i
      font-style normal
    .state
      display: block
      width 10px
      height 10px
      margin-right 10px
      border-radius: 50%
  .right-info
    display: flex
    .user-info img
      width 40px
      height 40px
      margin-right: 10px
      border-radius: 50%
    >div
      padding: 0 50px
      display: flex
      align-items: center
      border-right: 2px solid #dcdfe6
      span
        font-size: 14px
      .el-icon-user, .el-icon-switch-button
        margin-right: 10px
        font-size: 26px
    .logout
      border: 0
    .logout:hover .el-icon-switch-button
      color: #f00
</style>
