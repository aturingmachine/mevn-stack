<template>
  <v-card :loading="loading">
    <v-card-title class="secondary lightText--text">
      {{ heading }}
    </v-card-title>

    <v-card-text class="text-body-1 mt-4">
      {{ body }}
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn :loading="isLoading" :color="cancelColor" @click="close()">
        Cancel
      </v-btn>

      <v-spacer />

      <v-btn
        :loading="isLoading"
        :color="confirmColor"
        @click="confirmDelete()"
      >
        Confirm
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'ConfirmModal',

  components: {},

  props: {
    id: {
      type: String,
      required: true,
    },
    loading: {
      type: String,
      required: true,
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
      return this.destructive ? 'accent' : 'error'
    },

    confirmColor() {
      return this.destructive ? 'error' : 'success'
    },

    isLoading() {
      return this.$root.store[this.loading]?.state.loading || false
    },
  },

  watch: {
    loading(newVal) {
      if (newVal) {
        console.log('loading came in new', newVal)
      }
    },
  },

  methods: {
    close() {
      this.$root.store.modal.closeModal()
    },

    confirmDelete() {
      this.$root.store.users.delete(this.id, this.close)
    },
  },
}
</script>

<style></style>
