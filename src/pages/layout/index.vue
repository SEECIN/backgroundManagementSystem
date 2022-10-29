<template>
  <div>
    <Header v-if="headerUpdated" />
    <div class="layout">
      <SidebarNav />
      <MainContent v-if="this.$route.path !== '/home'" />
      <Home v-if="this.$route.path === '/home'" />
    </div>
  </div>
</template>

<script>
import Header from 'pages/layout/component/Header'
import Home from 'pages/home'
import SidebarNav from 'pages/layout/component/Sidebar-nav'
import MainContent from 'pages/layout/component/main-content/index'
export default {
  name: 'index',
  components: {
    Header,
    SidebarNav,
    MainContent,
    Home
  },
  data() {
    return {
      headerUpdated: true
    }
  },
  mounted() {
    this.$bus.$on("headerCmponentUpdate", () => {
      this.headerUpdated = false
      this.$nextTick(() => {
        this.headerUpdated = true
      })
    })
  }
}
</script>
<style lang="stylus" scoped>
.layout
  display: flex
  justify-content: space-between
  width: 100vw
</style>
