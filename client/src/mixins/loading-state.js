export const usersLoadingState = {
  computed: {
    userStateLoading() {
      return this.$root.store.users.state.loading
    },

    isLoading() {
      return this.userStateLoading
    },
  },
}
