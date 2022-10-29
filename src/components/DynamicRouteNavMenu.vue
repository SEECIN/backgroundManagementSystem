<template >
  <div>
    <el-menu-item v-if="!item.children"
                  :index="item.path">
      <i :class="item.meta.icon"></i>
      <span slot="title">{{item.name}}</span>
    </el-menu-item>
    <el-submenu v-else
                :index="item.name">
      <template slot="title">
        <i :class="item.meta.icon"></i>
        <span>{{item.name}}</span>
      </template>
      <template v-for="child in item.children">
        <el-menu-item v-if="!child.children"
                      :key="child.path"
                      :index="child.path">
          <i :class="child.meta.icon"></i>
          <span>{{child.name}}</span>
        </el-menu-item>
        <DynamicRouteNavMenu v-else
                             :item="child"
                             :key="child.path" />
      </template>
    </el-submenu>
  </div>
</template>

<script>

export default {
  name: 'DynamicRouteNavMenu',
  components: {

  },
  computed: {
    isArray() {
      return Array.isArray(this.item)
    }
  },
  props: {
    item: {

    }
  },
  created() {

  },
  methods: {

  }
}
</script>

<style lang="stylus" scoped>

</style>
