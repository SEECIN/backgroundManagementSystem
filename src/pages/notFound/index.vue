<template>
  <div class="notFound">
    <el-empty description="404 NotFound"></el-empty>
    <p class="goHome">{{time}}秒后
      <a href="">跳转到首页</a>
    </p>
  </div>
</template>

<script>
export default {
  name: 'index',
  components: {

  },
  data() {
    return {
      time: 5
    }
  },
  created() {
    const countDown = setInterval(() => {
      if (this.time > 0) {
        this.time--
      } else {
        this.$router.push({ path: "home" })
        clearInterval(countDown)
      }
    }, 1000)
  },
  methods: {

  }
}
</script>

<style lang="stylus" scoped>
.notFound 
  >>>.el-empty .el-empty__description >p
    font-size: 28px
    font-weight: 600
  .goHome
    text-align center
    a
      text-decoration: none
      color: #409EFF

</style>
