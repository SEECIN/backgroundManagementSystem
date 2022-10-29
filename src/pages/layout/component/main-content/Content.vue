<template>
  <div class="content">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Content',
  components: {

  },
  computed: {

  },
  mounted() {

  },
}
</script>
<style lang="stylus" scoped>
.content
  margin 0 10px
  padding: 20px
  border-radius: 8px
  box-shadow: 0px 4px 20px #c0c4cc
  background-color #fff
  overflow hidden
</style>
