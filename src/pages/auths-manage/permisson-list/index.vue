<template>
  <div class="">
    <MainContent :datas="dynamicRoutesData" />
  </div>
</template>

<script>
import MainContent from "components/main-content"
import { dynamicRoutes } from "@/router/index"
export default {
  name: 'index',
  components: {
    MainContent
  },
  data() {
    return {
      dynamicRoutesData: {},
      tagDataMap: [
        {
          type: '',
          text: "一级"
        },
        {
          type: 'success',
          text: "二级"
        },
        {
          type: 'warning',
          text: "三级"
        }
      ],
      count: 0
    }
  },
  created() {
    this.dynamicRoutesData = {
      tableContentData: this.formatRoutesData(dynamicRoutes),
      needPagination: false
    }
  },
  methods: {
    formatRoutesData(data) {
      return data.reduce((acc, curr) => {
        curr.tagData = this.tagDataMap[this.count]
        if (!curr.children) {
          acc = acc.concat(curr)
        }
        if (curr.children) {
          this.count++
          acc = acc.concat(curr, this.formatRoutesData(curr.children))
          this.count--
        }
        return acc
      }, [])
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
