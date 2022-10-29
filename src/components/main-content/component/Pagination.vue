<template>
  <div class="pagination">
    <el-pagination :current-page="paginationData.currentPage"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :page-sizes="[2, 5, 10]"
                   :page-size="paginationData.pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="paginationData.total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  components: {

  },
  data() {
    return {

    }
  },
  props: {
    handleSizeChange: {
      type: Function
    },
    handleCurrentChange: {
      type: Function
    },
    paginationData: {
      type: Object
    }
  },
  methods: {

  }
}
</script>

<style lang="stylus" scoped>

</style>
