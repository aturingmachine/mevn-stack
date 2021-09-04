<template>
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
    <v-layout flex justify-space-between>
      <v-btn color="error" @click="$emit('close')" :loading="userStateLoading">
        Cancel
      </v-btn>
      <v-btn color="success" @click="submit()" :loading="userStateLoading">
        Submit
      </v-btn>
    </v-layout>
  </v-form>
</template>

<script>
import { usersLoadingState } from '../../mixins/loading-state'

export default {
  name: 'NewUserForm',
  mixins: [usersLoadingState],

  data: () => ({
    name: '',
    age: 20,
    email: '',
  }),

  methods: {
    async submit() {
      try {
        const newUser = { name: this.name, age: this.age, email: this.email }

        this.$root.store.users.add(newUser)

        this.$emit('add-user-success', newUser)
      } catch (error) {
        console.error(error)
        this.$emit('add-user-error', { error })
      }
    },
  },
}
</script>
