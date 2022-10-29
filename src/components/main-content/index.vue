<template>
  <div class="content">
    <ContentHead :contentHead="datas.contentHead"
                 v-if="datas.contentHead" />
    <Table :tableData="tableData" />
    <Pagination v-if="datas.needPagination"
                :handleSizeChange="handleSizeChange"
                :handleCurrentChange="handleCurrentChange"
                :paginationData="paginationData" />
  </div>
</template>

<script>
import ContentHead from "components/main-content/component/ContentHead"
import Table from "components/main-content/component/Table"
import Pagination from "components/main-content/component/Pagination"
export default {
  name: 'index',
  components: {
    ContentHead, Table, Pagination
  },
  props: {
    datas: {
      type: Object
    }
  },
  data() {
    return {
      isSearch: false,
      searchData: [],
      tableData: [],
      paginationData: {
        total: 0,
        currentPage: 1,
        pageSize: 5
      }
    }
  },
  created() {
    this.init()
    this.$bus.$on('changeData', (data, type) => {
      let idx = this.datas.tableContentData.findIndex(item => item.id === data.id)
      if (idx !== -1) {
        if (type && type.includes('delete')) {
          if (type === "deleteProductsCategory" && !data.empty) {
            this.datas.tableContentData.splice(idx, 1, data)
          } else {
            this.datas.tableContentData.splice(idx, 1)
          }
          let len = this.datas.tableContentData.length
          if (len % 5 === 0 && this.paginationData.currentPage !== 1) {
            this.paginationData.currentPage--
          }
        } else {
          this.datas.tableContentData.splice(idx, 1, data)
        }
      } else {
        this.datas.tableContentData.push(data)
      }
      this.init()
    })
  },
  mounted() {
    this.$bus.$on("search", (val) => {
      this.isSearch = true
      this.searchData = this.datas.tableContentData.filter(item => {
        for (let curr of Object.values(item)) {
          if (String(curr).search(val) !== -1) {
            return item
          }
        }
      })
      this.paginationData.total = this.searchData?.length
      this.handleSizeChange(this.paginationData.pageSize)
    })
  },
  methods: {
    init() {
      this.tableData = this.datas.tableContentData
      this.paginationData.total = this.datas.tableContentData?.length
      this.handleCurrentChange(this.paginationData.currentPage)
    },
    handleSizeChange(size) {
      if (this.datas.needPagination) {
        this.paginationData.pageSize = size
        let start = (this.paginationData.currentPage - 1) * size
        let end = this.paginationData.currentPage * size
        this.tableData = this.isSearch ? this.searchData.slice(start, end) : this.datas.tableContentData.slice(start, end)
      }
    },
    handleCurrentChange(current) {
      if (this.datas.needPagination) {
        this.paginationData.currentPage = current
        this.handleSizeChange(this.paginationData.pageSize)
      }
    }
  },
  beforeDestroy() {
    this.$bus.$off('changeData')
  }
}
</script>

<style lang="stylus" scoped>
</style>
