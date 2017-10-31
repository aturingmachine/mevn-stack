<template>


    <v-card>
      <v-toolbar>
        <div class="headline"> Add A User </div>
      </v-toolbar>
      <v-container fluid>
        <v-card-text>

          <!-- Begin Input Row -->
          <v-form ref="form">
          <v-text-field label="Name" v-model="user.name"> </v-text-field>
          <v-slider label="Age" v-model="user.age" thumb-label step="1"></v-slider>
          <v-text-field label="Email" v-model="user.email" :rules="[rules.email]"> </v-text-field>

          <v-btn @click="$emit('submission', user); user={}" class="green lighten-1 white--text">Submit</v-btn>
          <v-btn @click="$emit('closeAdd')" class="red white--text">Close</v-btn>
          </v-form>
        </v-card-text>
      </v-container>
    </v-card>

</template>

<script>
export default {
  data: () => ({
    user: {
      age: 0,
      name: '',
      email: ''
    }
  }),

  props: {
    rules: {
      type: Object
    }
  }
}
</script>