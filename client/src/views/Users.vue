<template>
  <div class="page-content">
    <v-layout justify-space-between align-content-center column>
      <v-layout justify-space-between align-content-center>
        <h2>Users</h2>
        <v-btn color="success" @click="showAddModal()" :loading="usersLoading">
          Add User
        </v-btn>
      </v-layout>
      <the-users-list class="mt-5" />
    </v-layout>
  </div>
</template>

<script>
import TheUsersList from '../components/Users/TheUsersList/TheUsersList.vue'
import NewUserForm from '../components/Users/NewUserForm.vue'
import { loadingStates } from '../mixins/loading-state'
import { ModalService } from '../services/modal-service'

export default {
  name: 'UsersPage',
  mixins: [loadingStates],

  components: {
    TheUsersList,
  },

  data: () => ({
    // showAddModal: false,
  }),

  methods: {
    // toggleAddModal(show) {
    //   this.showAddModal = !!show
    // },

    showAddModal() {
      ModalService.openGenericModal(NewUserForm)
    },
  },
}
</script>

<style></style>
