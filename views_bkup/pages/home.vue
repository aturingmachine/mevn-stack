<template>
  <v-container class="pa-0">
    <v-container>
      <template>
        <v-layout row>
          <v-flex>
            <v-card>
              <v-toolbar class="primary primaryText--text">
              <v-toolbar-title> Welcome to a Home Page component </v-toolbar-title>
              </v-toolbar>
              <v-container fluid>
                <v-card-text>
                  This is a simple layout for a page. The entire application is simply swapping out components in
                  this center area. Generally I make them look like cards, which I then fill with the proper
                  vuetify components to best present data.
                  <br>
                  <br>
                  <hr>
                  <br>
                  The next page is a User Management page with a template
                  for displaying data, as well as modals for doing basic CRUD operations on that data. I suggest you look
                  over the layout as well as the code to understand how it works.
                  <br>
                  <br>
                  <hr>
                  <br>
                  It should be noted that for the User Management page to make sense and appear properly the
                  REST API part of this project should be started as well (including the Mongo Daemon). The README on 
                  the GitHub page for this project should help walk you through the necessary steps to install it.
                </v-card-text>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </template>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    value: "",
    num1: 0,
    num2: 0
  })

}
</script>

<style>

</style>
