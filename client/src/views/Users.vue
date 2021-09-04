<template>
  <div class="page-content">
    <v-layout justify-space-between align-content-center column>
      <v-layout justify-space-between align-content-center>
        <h2>Users</h2>
        <v-btn
          color="success"
          @click="toggleAddModal(true)"
          :loading="userStateLoading"
        >
          Add User
        </v-btn>
      </v-layout>
      <the-users-list class="mt-5" />
    </v-layout>
    <!-- 
    <modal :show="showAddModal" @close="toggleAddModal">
      <template v-slot:modal-header>Add New User</template>
      <template v-slot:modal-body>
        <new-user-form
          @add-user-success="toggleAddModal(false)"
          @add-user-error="toggleAddModal(false)"
          @close="toggleAddModal"
        />
      </template>
    </modal> -->
  </div>
</template>

<script>
import TheUsersList from '../components/Users/TheUsersList/TheUsersList.vue'
// import Modal from '../components/Modals/Modal.vue'
// import NewUserForm from '../components/Users/NewUserForm.vue'
import { usersLoadingState } from '../mixins/loading-state'

export default {
  name: 'UsersPage',
  mixins: [usersLoadingState],

  components: {
    // Modal,
    // NewUserForm,
    TheUsersList,
  },

  data: () => ({
    showAddModal: false,
  }),

  methods: {
    toggleAddModal(show) {
      this.showAddModal = !!show
    },
  },
}
</script>

<style></style>
