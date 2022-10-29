<template>
  <div class="">
    <MainContent :datas="orderListData" />
  </div>
</template>

<script>
import { logistics } from "@/mock/mockData"
import MainContent from "components/main-content"
export default {
  name: 'index',
  components: {
    MainContent
  },
  data() {
    return {
      orderListData: {}
    }
  },
  computed: {

  },
  created() {
    this.orderListData = {
      tableContentData: logistics.logistics,
      needPagination: true,
      contentHead: {
        assembly: [
          "input"
        ]
      }
    }
  },
}
</script>

<style lang="stylus" scoped>

</style>
