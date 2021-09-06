<template>
  <v-card>
    <v-card-title class="primary bright--text">Add New User</v-card-title>

    <v-card-text>
      <v-form>
        <v-text-field v-model="name" label="Name" />
        <v-text-field v-model="email" label="Email" />
        <v-slider
          v-model="age"
          min="18"
          max="99"
          :label="`Age: ${age}`"
          thumb-label
        />
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-btn color="error" @click="$emit('close')" :loading="usersLoading">
        Cancel
      </v-btn>

      <v-spacer />

      <v-btn color="success" @click="submit()" :loading="usersLoading">
        Submit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { loadingStates } from '../../mixins/loading-state'

export default {
  name: 'NewUserForm',
  mixins: [loadingStates],

  data: () => ({
    name: '',
    age: 20,
    email: '',
  }),

  methods: {
    async submit() {
      try {
        const newUser = { name: this.name, age: this.age, email: this.email }

        await this.$store.dispatch('users/Add', newUser)

        this.$emit('success', newUser)
      } catch (error) {
        console.error(error)
        this.$emit('error', { error })
      }
    },
  },
}
</script>
