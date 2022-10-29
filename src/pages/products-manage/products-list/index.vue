<template>
  <div class="">
    <MainContent v-if="productsList.data"
                 :datas="productsListData" />
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
      productsListData: {},
      productsList: {}
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      this.productsList = await this.$axios("getProductList")
      this.productsListData = {
        tableContentData: this.productsList.data.result,
        needPagination: true,
        contentHead: {
          modalType: "addProduct",
          keywords: "商品",
          assembly: [
            "button", "input"
          ]
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
