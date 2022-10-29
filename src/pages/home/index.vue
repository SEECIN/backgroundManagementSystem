<template>
  <div class="welcome">
    <p class="welcome-text">Welcome administrator</p>
    <img src="../../assets/images/welcome.png"
         class="welcome-img">
  </div>
</template>

<script>
export default {
  name: 'index',
  components: {

  },
  data() {
    return {

    }
  },
  computed: {

  },
  methods: {

  }
}
</script>

<style lang="stylus" scoped>
  @font-face {
    font-family: magicFont;
    src: url("../../assets/fonts/MagicOwl.otf");
  }
  .welcome {
    display: flex
    justify-content: center
    align-items: center
    flex-direction: column
    width 100%
    background-color #cbdee1
  }
  .welcome-text {
    font-family: magicFont;
    font-size: 70px;
    margin: 0;
  }
  .welcome-img {
    width: 450px;
  }
</style>
