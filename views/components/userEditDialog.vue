<template>
  <v-card>
    <v-toolbar>
      <div class="headline"> Edit User: {{editName}} </div>
    </v-toolbar>
    <v-container fluid>
      <v-card-text>

        <!-- Begin Input Row -->
        <v-form ref="form">
          <v-text-field label="Name" v-model="changedUser.name"> </v-text-field>
          <v-slider label="Age" v-model="changedUser.age" thumb-label step="1"></v-slider>
          <v-text-field label="Email" v-model="changedUser.email" :rules="[rules.email]"> </v-text-field>

          <v-btn @click="edit()" :loading="!editDone" :disabled="checkForm()" class="green lighten-1 white--text">Submit</v-btn>
          <v-btn @click="close()" class="red white--text">Close</v-btn>
        </v-form>
      </v-card-text>
    </v-container>
  </v-card>
</template>

<script>
import { http } from '../config/http'

export default {
  data: () => ({
    changedUser: {
      name: '',
      email: '',
      age: 0
    },
    editDone: true
  }),

  props: {
    user: {
      type: Object
    },
    rules: {
      type: Object
    },
    editName: {
      type: String,
      default: ''
    }
  },

  methods: {
    edit() {
      this.editDone = false
      http
        .put("/users/" + this.user._id, this.changedUser)
        .then(response => {
          this.alert(true, 'Edit', 'User')
          this.editDone = true
        })
        .catch(e => {
          this.alert(false, 'Edit', 'User')
          this.editDone = true
        });
        
    },

    close() {
      this.$emit('closeEdit')
    },

    alert(success, callName, resource) {
      this.$emit('alert', success, callName, resource)
      this.close()
    },

    checkForm() {
      if (this.changedUser.age <= 0 || this.changedUser.name == '' || this.changedUser.email == '') {
        return true
      } else {
        return false
      }
    }
  },

  mounted() {
    this.changedUser = this.user
  }

}
</script>

<style>

</style>
