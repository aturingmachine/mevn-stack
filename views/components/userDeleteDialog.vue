<template>
  <v-card>
     <v-toolbar >
      <div class="headline">Delete User Record {{tempUser.name}}</div>
    </v-toolbar>

    <v-card-text>
      <p>This action will remove {{tempUser.name}} from the application. This is
      <strong>irreversible.</strong>
      </p>
      <br>
      <h6> Are You Sure? </h6>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="$emit('deleted', tempUser)" class="red darken-2 white--text">Confirm</v-btn>
      <v-spacer></v-spacer>
      <v-btn @click="$emit('closeDelete')" class="green lighten-1 white--text">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    tempUser: {}
  }),

  props: {
    user: {
      type: Object
    }
  },

  mounted() {
    this.tempUser = this.user
  }

}
</script>

<style>

</style>
