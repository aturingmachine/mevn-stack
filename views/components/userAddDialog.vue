<template>


    <v-card>
      <v-toolbar class="primary primaryText--text">
        <v-toolbar-title > Add A User </v-toolbar-title>
      </v-toolbar>
      <v-container fluid>
        <v-card-text>

          <!-- Begin Input Row -->
          <v-form ref="form">
          <v-text-field label="Name" v-model="user.name" required> </v-text-field>
          <v-slider label="Age" v-model="user.age" thumb-label step="1" required></v-slider>
          <v-text-field label="Email" v-model="user.email" :rules="[rules.email]" required> </v-text-field>
          </v-form>

          <v-card-actions>
            <v-btn @click="submit()" class="green lighten-1 white--text" :disabled="checkForm()" :loading="!submitDone">Submit</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="close()" class="red white--text">Close</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-container>
    </v-card>

</template>

<script>
import { http } from '../config/http'

export default {
  data: () => ({
    user: {
      age: 0,
      name: '',
      email: ''
    },
    submitDone: true,
  }),

  props: {
    rules: {
      type: Object
    }
  },

  methods: {
    submit() {
      this.submitDone = false
      http
        .post("/users", this.user)
        .then(response => {
          this.submit = true
          this.alert(true, 'Create', 'User')
          this.close()
        })
        .catch(e => {
          this.submit = true
          this.alert(false, 'Create', 'User')
        });
    },

    load() {
      this.user = {
        age: 0,
        email: '',
        name: ''
      }
      this.submitDone = true
    },

    close() {
      this.load()
      this.$emit('closeAdd')
    },

    checkForm() {
      if (this.user.age <= 0 || this.user.name == '' || this.user.email == '') {
        return true
      } else {
        return false
      }
    },

    alert(success, callName, resource) {
      console.log('Add Alerting')
      this.$emit('alert', success, callName, resource)
    }
  }
}
</script>