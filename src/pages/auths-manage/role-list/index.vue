<template>
  <div class="">
    <MainContent v-if="roleList.data"
                 :datas="roleListData" />
  </div>
</template>

<script>
import MainContent from "components/main-content"
export default {
  name: 'index',
  components: {
    MainContent
  },
  data() {
    return {
      roleList: {},
      roleListData: {}
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      try {
        this.roleList = await this.$axios("getRoleList")
        this.roleListData = {
          tableContentData: this.roleList.data.roleList,
          needPagination: true,
          contentHead: {
            modalType: "addRole",
            keywords: "角色",
            assembly: [
              "input", "button"
            ]
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
