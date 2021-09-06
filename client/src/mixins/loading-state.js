export const loadingStates = {
  computed: {
    usersLoading() {
      return this.$store.getters['users/Loading']
    },
  },
}
