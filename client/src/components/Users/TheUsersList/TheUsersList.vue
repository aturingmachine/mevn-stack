<template>
  <div>
    <v-list rounded flat two-line class="transparent">
      <users-list-row v-for="user in users" :key="user.email" :user="user" />
    </v-list>
  </div>
</template>

<script>
import UsersListRow from './UsersListRow.vue'

export default {
  name: 'TheUsersList',

  components: {
    UsersListRow,
  },

  data: () => ({
    // users: [],
  }),

  computed: {
    users() {
      console.log(this.$root.store.users.state.records)
      return this.$root.store.users.state.records || []
    },
  },

  methods: {
    fetchUsers() {
      this.$root.store.users.fetch()
    },
  },

  mounted() {
    this.fetchUsers()
  },
}
</script>
