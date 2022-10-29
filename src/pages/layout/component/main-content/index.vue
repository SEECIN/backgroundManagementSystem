<template>
  <div class="main-content">
    <BreadCrumb />
    <Content />
    <BaseModal />
  </div>
</template>

<script>
import Content from 'pages/layout/component/main-content/Content'
import BreadCrumb from 'pages/layout/component/main-content/BreadCrumb'
import BaseModal from "components/base/BaseModal"
export default {
  name: 'index',
  components: { Content, BreadCrumb, BaseModal },
  props: {

  },
  data() {
    return {

    }
  },
  methods: {

  },
}
</script>

<style lang="stylus" scoped>
.main-content
  width calc(100vw - 200px)
  height: calc(100vh - 60px)
  padding: 30px
  background-color #cbdee1
  box-sizing: border-box
</style>
