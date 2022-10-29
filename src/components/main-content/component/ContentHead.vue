<template>
  <div class="content-head">
    <template v-if="contentHead.assembly.includes('input')">
      <el-input class="content-head--input"
                placeholder="请输入内容"
                prefix-icon="el-icon-search"
                :clearable="true"
                @change="search"
                v-model="searchVal">
      </el-input>
    </template>
    <template v-if="contentHead.assembly.includes('button')">
      <el-button type="primary"
                 @click="handleButton(contentHead.modalType)">添加{{contentHead.keywords}}</el-button>
    </template>

  </div>
</template>

<script>
import MIXIN from '@/core/mixin'
export default {
  name: 'ContentHead',
  components: {
  },
  mixins: [MIXIN],
  data() {
    return {
      searchVal: ''
    }
  },
  props: {
    contentHead: {
      type: Object
    }
  },
  created() {
    this.searchVal = ''
  },
  methods: {
    search() {
      this.$bus.$emit("search", this.searchVal)
    },
    handleButton(modalType) {
      this.openModal(modalType)
    }
  }
}
</script>

<style lang="stylus" scoped>
.content-head--input
  width 20vw
  margin-right 100px
</style>
