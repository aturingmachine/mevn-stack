<template>
  <v-card :loading="loading">
    <v-card-title class="primary bright--text">
      {{ heading }}
    </v-card-title>

    <v-card-text class="text-body-1 mt-4">
      {{ body }}
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn :loading="loading" :color="cancelColor" @click="close()">
        Cancel
      </v-btn>

      <v-spacer />

      <v-btn :loading="loading" :color="confirmColor" @click="confirmDelete()">
        Confirm
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { ModalService } from '../../services/modal-service'
export default {
  name: 'ConfirmModal',

  components: {},

  props: {
    id: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      required: false,
    },
    destructive: {
      type: Boolean,
      required: false,
    },
    heading: {
      type: String,
      required: false,
    },
    body: {
      type: String,
      required: true,
    },
  },

  computed: {
    cancelColor() {
      return this.destructive ? 'info' : 'error'
    },

    confirmColor() {
      return this.destructive ? 'error' : 'success'
    },
  },

  methods: {
    close() {
      ModalService.close()
    },

    async confirmDelete() {
      await this.$store.dispatch('users/Delete')
      console.log('Confirm Modal Post Delete')
      this.close()
    },
  },
}
</script>

<style></style>
