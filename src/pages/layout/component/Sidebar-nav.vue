<template>
  <div class="sidebar">
    <el-menu class="el-menu-vertical-demo"
             menu-trigger="click"
             :router="true"
             :default-active="defaultActive"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b">
      <DynamicRouteNavMenu v-for="item in permissionRoutes"
                           :key="item.name"
                           :item="item" />

    </el-menu>
  </div>

</template>

<script>
import DynamicRouteNavMenu from "components/DynamicRouteNavMenu"
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('permission')
export default {
  name: 'Sidebar-nav',
  components: {
    DynamicRouteNavMenu
  },
  data() {
    return {
      navRoutes: []
    }
  },
  computed: {
    defaultActive() {
      return this.$route.path.split("/")[1]
    },
    ...mapGetters(["permissionRoutes"])
  },
  created() {

  },
  methods: {

  }
}
</script>
<style lang="stylus" scoped>
.sidebar
  width: 200px
  height: calc(100vh - 60px)

  >.el-menu-vertical-demo
    width: 200px
    height: 100%
    border: 0

</style>
