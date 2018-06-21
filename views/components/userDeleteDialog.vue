<template>
  <v-card>
     <v-toolbar >
      <div class="headline">Delete User Record {{user.name}}</div>
    </v-toolbar>

    <v-card-text>
      <p>This action will remove {{user.name}} from the application. This is
      <strong>irreversible.</strong>
      </p>
      <br>
      <h6> Are You Sure? </h6>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="confirmDelete()" :loading="!deleteDone" class="red darken-2 white--text">Confirm</v-btn>
      <v-spacer></v-spacer>
      <v-btn @click="close()" class="green lighten-1 white--text">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { http } from '../config/http'

export default {
  data: () => ({
    deleteDone: true,
  }),

  props: {
    user: {
      type: Object
    }
  },

  methods: {
    confirmDelete() {
      this.deleteDone = false
      http
        .delete("/users/" + this.user._id)
        .then(response => {
          this.deleteDone = true
          this.alert(true, 'Delete', 'User')
          this.close()
        })
        .catch(e => {
          this.deleteDone = true
          this.alert(false, 'Delete', 'User')
          this.close()
        });
    },

    close() {
      this.$emit('closeDelete')
    },

    alert(success, callName, resource) {
      this.$emit('alert', success, callName, resource)
    }
  },

  mounted() {
  }

}
</script>

<style>

</style>
