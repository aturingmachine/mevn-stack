<template>
  <v-list-item class="user-row elevation-2">
    <v-layout row align-content-center justify-space-between pa-3>
      <div class="d-flex flex-column align-start pl-1">
        {{ user.name }}: {{ user.age }}
        <div class="d-flex">
          {{ user.email }}
        </div>
      </div>
      <div class="d-flex align-center">
        <v-btn
          @click="openDeleteModal()"
          class="error lightText--text align-self-center mr-2"
          icon
          :loading="userStateLoading"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>

        <v-btn
          @click="toggleAddModal(true)"
          class="accent lightText--text align-self-center"
          icon
          :loading="userStateLoading"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </div>
    </v-layout>

    <!-- <modal :show="showAddModal" @close="toggleAddModal">
      <template v-slot:modal-header>Edit User</template>
      <template v-slot:modal-body>
        <edit-user-form
          :user="user"
          @add-user-success="toggleAddModal(false)"
          @add-user-error="toggleAddModal(false)"
          @close="toggleAddModal"
        />
      </template>
    </modal> -->
  </v-list-item>
</template>

<script>
import { usersLoadingState } from '../../../mixins/loading-state'

export default {
  name: 'UserListRow',
  mixins: [usersLoadingState],

  props: {
    user: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    showAddModal: false,
    showConfirmModal: false,
  }),

  methods: {
    toggleAddModal(show) {
      this.showAddModal = !!show
    },

    openDeleteModal() {
      console.log(this.user)
      this.$root.store.modal.openModal('confirm-modal', {
        loading: 'users',
        destructive: true,
        heading: `Delete User "${this.user.name}"?`,
        body: `"${this.user.name}" will be permanently deleted.`,
        id: this.user._id,
      })
    },
  },
}
</script>
