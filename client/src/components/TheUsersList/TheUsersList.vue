<template>
  <div>
    <v-list elevation="2" flat>
      <v-list-item-group>
        <users-list-row v-for="user in users" :key="user.email" :user="user" />
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import { UsersService } from '../../services/users-service'
import UsersListRow from './UsersListRow.vue'

export default {
  name: 'TheUsersList',

  components: {
    UsersListRow,
  },

  data: () => ({
    users: [],
  }),

  methods: {
    async fetchUsers() {
      try {
        const response = await UsersService.get()
        this.users = response.data.users
        console.log(this.users)
      } catch (error) {
        console.error(error)
      }
    },
  },

  mounted() {
    this.fetchUsers()
  },
}
</script>
