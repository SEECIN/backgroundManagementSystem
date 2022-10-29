<template>
  <div class="">
    <MainContent v-if="userList.data"
                 :datas="userListData" />

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
      userListData: {},
      userList: {}
    }
  },
  created() {
    this.init()
  },
  mounted() {

  },
  methods: {
    async init() {
      try {
        this.userList = await this.$axios("getUserList")
        this.userListData = {
          tableContentData: this.userList.data.userList,
          needPagination: true,
          contentHead: {
            modalType: "addUser",
            keywords: "用户",
            assembly: [
              "input", "button"
            ]
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
}
</script>

<style lang="stylus" scoped>

</style>
