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
      return this.$store.getters['users/Users'] || []
    },
  },

  methods: {
    fetchUsers() {
      this.$store.dispatch('users/GetAll')
    },
  },

  mounted() {
    this.fetchUsers()
  },
}
</script>
