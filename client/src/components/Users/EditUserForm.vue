<template>
  <v-card>
    <v-card-title>Editing {{ user.name }}</v-card-title>

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
        <v-layout flex justify-space-between>
          <v-btn color="error" @click="$emit('close')" :loading="usersLoading">
            Cancel
          </v-btn>
          <v-btn color="success" @click="submit()" :loading="usersLoading">
            Submit
          </v-btn>
        </v-layout>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { loadingStates } from '../../mixins/loading-state'

export default {
  name: 'EditUserForm',
  mixins: [loadingStates],

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
          ...this.user,
          name: this.name,
          age: this.age,
          email: this.email,
        }

        await this.$store.dispatch('users/Update', {
          id: this.user._id,
          data: userUpdate,
        })

        this.$emit('success', userUpdate)
      } catch (error) {
        console.error(error)
        this.$emit('error', { error })
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
