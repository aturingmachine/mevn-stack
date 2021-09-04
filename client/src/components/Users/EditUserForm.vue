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
// import { usersLoadingState } from '../../mixins/loading-state'

export default {
  name: 'EditUserForm',
  // mixins: [usersLoadingState],

  props: {
    user: {
      type: Object,
      require: true,
    },
  },

  data: () => ({
    name: '',
    age: 0,
    email: '',
  }),

  methods: {
    async submit() {
      try {
        const userUpdate = {
          name: this.name,
          age: this.age,
          email: this.email,
          ...this.user,
        }

        this.$root.store.users.post(userUpdate)

        this.$emit('edit-user-success', userUpdate)
      } catch (error) {
        console.error(error)
        this.$emit('edit-user-error', { error })
      }
    },
  },

  mounted() {
    this.name = this.user.name
    this.age = this.user.age
    this.email = this.user.email
  },

  beforeDestroy() {
    this.name = ''
    this.age = 0
    this.email = ''
  },
}
</script>
