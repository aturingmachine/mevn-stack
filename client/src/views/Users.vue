<template>
  <div class="page-content">
    <h2>User</h2>
    <v-btn>Add User</v-btn>

    <the-users-list />
  </div>
</template>

<script>
import { UsersService } from '../services/users-service'
import TheUsersList from '../components/TheUsersList/TheUsersList.vue'

export default {
  name: 'UsersPage',

  components: {
    TheUsersList,
  },

  methods: {
    async getUsers() {
      const resp = await UsersService.get()

      console.log(resp?.data)
    },
  },
}
</script>

<style></style>
