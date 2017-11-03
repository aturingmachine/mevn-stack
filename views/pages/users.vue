<template>
  <v-container class="pa-0">
    <v-container>
      <template>
        <v-layout row>
          <v-flex>
            <v-card>              
              <!-- Begin Toolbar -->
              <v-toolbar>
                <v-toolbar-title> Users </v-toolbar-title>
                <v-spacer></v-spacer>
                <span v-if="alertSettings.success">
                  <v-alert v-model="alert" color="success" dismissible icon="check_circle" transition=scale-transition>
                    {{ alertSettings.callName }} was a Success. 
                  </v-alert>
                </span>
                <span v-else>
                  <v-alert v-model="alert" color="error" dismissible icon="warning" transition=scale-transition>
                    {{ alertSettings.callName }} Failed.
                  </v-alert>
                </span>

                  <!-- Add Dialog Button -->
                <v-dialog v-model="addDialog" lazy absolute max-width="50%">
                  <v-btn icon slot="activator">
                    <v-icon> control_point </v-icon>
                  </v-btn>

                  <!-- Add Dialog -->
                  <userAddDialog :rules="rules" 
                  @submission="submit" @closeAdd="addDialog = false">
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
                @deleted="deleteUser">

                </userDeleteDialog>
              </v-dialog>
              <!-- End Delete Dialog -->

              <!-- Begin Edit Form -->
              <v-dialog v-model="editDialog" lazy absolute max-width="50%">
                <userEditDialog :rules="rules" :user="userToEdit" :editName="editName"
                @edited="edit" @closeEdit="editDialog = false; userToEdit = {}">
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
    alert: false,
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
          this.users = response.data.data;
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

    //Delete A User
    deleteUser(tempUser) {
      this.alertSettings.callName = "Delete";
      console.log(tempUser._id);
      http
        .delete("/users/" + tempUser._id)
        .then(response => {
          if (response.status == 204) {
            this.alertProc(true, "Delete");
            console.log(response);
            //this removes the user from the list of users on the page
            let index = this.users.indexOf(tempUser);
            this.users.splice(index, 1);
            this.deleteDialog = false;
          } else {
            this.alertProc(fasle, "Delete");
            console.log(response);
            this.alert = true;
            this.deleteDialog = false;
          }
        })
        .catch(e => {
          this.alertProc(false, "Delete");
          console.log(e);
          this.errors.push(e);
          this.deleteDialog = false;
        });
    },

    //adds a user
    submit(user) {
      http
        .post("/users", user)
        .then(response => {
          console.log(response);
          this.load()
          this.addDialog = false;
          this.newUser = {};
          this.alertProc(true, "Submission");
        })
        .catch(e => {
          this.errors.push(e);
          this.addDialog = false;
          this.alertProc(false, "Submission");
        });
    },

    //edits a user
    edit(changedUser) {
      http
        .put("/users/" + changedUser._id, changedUser)
        .then(response => {
          console.log(response.data.data);
          this.userToEdit = {};
          this.editDialog = false;
          this.load();
          this.alertProc(true, "Edit");
        })
        .catch(e => {
          console.log(e);
          this.errors.push(e);
          this.editDialog = false
          this.alertProc(false, "Edit");
        });
    },

    //build the alert info for us
    //the first is a bool of whether or not the call was a success, the second the name of the call
    alertProc(success, callName) {
      this.alertSettings.callName = callName;
      this.alertSettings.success = success;
      this.alert = true;
      console.log(this.alert + "");
    }
  },

  //get those users
  mounted() {
    this.load();
  }
};
</script>