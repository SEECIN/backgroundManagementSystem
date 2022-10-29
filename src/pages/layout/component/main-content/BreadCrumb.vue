<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-if="!isHome"
                          :to="{path:'home'}">首页</el-breadcrumb-item>
      <template v-for="item in routesName">
        <el-breadcrumb-item :key="item.path">{{item.name}}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'BreadCrumb',
  components: {

  },
  data() {
    return {
      routesName: []
    }
  },
  computed: {
    isHome() {
      return this.$route.path === "/home"
    }
  },
  created() {
    this.routesName.push(this.$route)
  },
  watch: {
    $route() {
      this.routesName = this.$route.matched.slice(1)
    }
  },
  methods: {

  },
}
</script>
<style lang="stylus" scoped>
.breadcrumb
  margin-bottom 30px
</style>
