<template>
  <div class="">
    <MainContent v-if="productsCategoryList.data"
                 :datas="productsClassifyData" />
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
      productsClassifyData: {},
      productsCategoryList: {}
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      try {
        this.productsCategoryList = await this.$axios("getProductsCategory")
        this.productsClassifyData = {
          tableContentData: this.productsCategoryList.data.result,
          needPagination: true,
          contentHead: {
            modalType: "addProductsCategory",
            keywords: "商品分类",
            assembly: [
              "button"
            ]
          }
        }
        this.$bus.$emit("formatSelectOptions", this.productsCategoryList.data.result)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
