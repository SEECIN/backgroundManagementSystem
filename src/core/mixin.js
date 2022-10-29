export default {
  methods: {
    openModal(type) {
      this.$store.dispatch('modal/open', type)
    }
  },
}
