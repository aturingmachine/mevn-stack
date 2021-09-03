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
    <div class="form-footer">
      <v-btn color="success" @click="submit()">Submit</v-btn>
    </div>
  </v-form>
</template>

<script>
import { UsersService } from '../services/users-service'
export default {
  name: 'NewUserForm',

  data: () => ({
    name: '',
    age: 20,
    email: '',
  }),

  methods: {
    async submit() {
      try {
        await UsersService.post({
          name: this.name,
          age: this.age,
          email: this.email,
        })
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
