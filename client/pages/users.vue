<template>
  <v-container class="pa-0">
    <v-container>
      <template>
        <v-layout row>
          <v-flex>
            <v-card>              
              <!-- Begin Toolbar -->
              <v-toolbar class="primary primaryText--text">
                <v-toolbar-title> Users </v-toolbar-title>
                <v-spacer></v-spacer>

                  <!-- Add Dialog Button -->
                <v-dialog v-model="addDialog" lazy absolute max-width="50%">
                  <v-btn class="primaryText--text" icon slot="activator">
                    <v-icon> control_point </v-icon>
                  </v-btn>

                  <!-- Add Dialog -->
                  <userAddDialog :rules="rules" @closeAdd="addDialog = false" @alert="alert">
                  </userAddDialog>
                </v-dialog>
              </v-toolbar>

                <!-- List of Users -->
              <span  v-if="users.length">
                <userItem v-for="user in users" :key="user._id"
                 :user="user" @setUpEdit="setupEdit(user)"
                 @setUpDelete="setupDelete(user)">
                 </userItem>
              </span>
              <v-card v-else class="headline text-xs-center">No Users to show</v-card>

              <!-- Begin Delete Dialog -->
              <v-dialog v-model="deleteDialog" lazy absolute max-width="40%">
                <userDeleteDialog :user="userToDelete" @closeDelete="deleteDialog = false"
                @alert="alert">

                </userDeleteDialog>
              </v-dialog>
              <!-- End Delete Dialog -->

              <!-- Begin Edit Form -->
              <v-dialog v-model="editDialog" lazy absolute max-width="50%">
                <userEditDialog :rules="rules" :user="userToEdit" :editName="editName"
                @closeEdit="editDialog = false; userToEdit = {}" @alert="alert">
                </userEditDialog>
              </v-dialog>
              <!-- End Edit Form -->
              
            </v-card>
          </v-flex>
        </v-layout>
      </template>
    </v-container>
  </v-container>
</template>

<script>
import { http } from "../config/http.js"
import userItem from "../components/user.vue"
import userAddDialog from "../components/userAddDialog.vue"
import userEditDialog from "../components/userEditDialog.vue"
import userDeleteDialog from "../components/userDeleteDialog.vue"

export default {
  //Variables
  data: () => ({
    errors: [],
    users: [],
    userToDelete: {},
    alertSettings: {}, //this is to abstract our our alerts to make them easier and stop repeating code
    userToEdit: {},
    newUser: {},
    addDialog: false,
    deleteDialog: false,
    editDialog: false,
    editName: "",
    rules: {
      email: value => {
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      }
    }
  }),

  //Components this page will need
  components: {
    userItem: userItem,
    userAddDialog: userAddDialog,
    userEditDialog: userEditDialog,
    userDeleteDialog: userDeleteDialog
  },

  //The methods we will need
  methods: {
    //load all users from DB, we call this often to make sure the data is up to date
    load() {
      http
        .get("users")
        .then(response => {
          this.users = response.data.users;
        })
        .catch(e => {
          this.errors.push(e);
        });
    },

    //opens delete dialog
    setupDelete(user) {
      this.userToDelete = user;
      this.deleteDialog = true;
    },

    //opens edit dialog
    setupEdit(user) {
      Object.keys(user).forEach(key => {
        this.userToEdit[key] = user[key];
      });
      this.editName = user.name;
      this.editDialog = true;
    },

    //build the alert info for us
    //Will emit an alert, followed by a boolean for success, the type of call made, and the name of the 
    //resource we are working on
    alert(success, callName, resource) {
      console.log('Page Alerting')
      this.$emit('alert', success, callName, resource)
      this.load()
    }
  },

  //get those users
  mounted() {
    this.load();
  }
};
</script>