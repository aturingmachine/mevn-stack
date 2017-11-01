<template>
  <v-container class="pa-0">
    <v-container>
      <template>
        <v-layout row>
          <v-flex>

            <v-card>
              <actionAlert v-model="alert" :alertSettings="alertSettings" />
              <!-- Begin Toolbar -->
              <v-toolbar>
                <v-toolbar-title> Users 
                  
                </v-toolbar-title>
                <v-spacer></v-spacer>

                

                  <!-- Add Dialog Button -->
                  <v-dialog v-model="addDialog" lazy absolute max-width="50%">
                <v-btn icon slot="activator">
                  <v-icon> control_point </v-icon>
                </v-btn>

                <!-- Add Dialog -->
                <userAddDialog :rules="rules" 
                @submission="prepSubmit" @closeAdd="addDialog = false">
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

            <v-card>
              <v-toolbar >
                <div class="headline">Delete User Record {{userToDelete.name}}</div>
              </v-toolbar>

              <v-card-text>
                <p>This action will remove {{userToDelete.name}} from the application. This is
                  <strong>irreversible.</strong>
                </p>
                <br>
                <h6> Are You Sure? </h6>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="deleteUser()" class="red darken-2 white--text">Confirm</v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="deleteDialog = false, deleteId = ''" class="green lighten-1 white--text">Cancel</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- End Delete Dialog -->

          <!-- Begin Edit Form -->
          <v-dialog v-model="editDialog" lazy absolute max-width="50%">
                  <userEditDialog :rules="rules" :user="userToEdit" :editName="editName"
                  @edited="prepEdit()" @closeEdit="editDialog = false">

                  </userEditDialog>
                </v-dialog>
                <!-- End Edit Form -->

            </v-card>
          </v-flex>
        </v-layout>
</template>

      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import { http } from "../config/http.js";
import userItem from "../components/user.vue";
import userAddDialog from "../components/userAddDialog.vue";
import actionAlert from "../components/actionAlert.vue"
import userEditDialog from "../components/userEditDialog.vue"

export default {
  //Variables
  data: () => ({
    errors: [],
    users: [],
    userToDelete: {},
    alertSettings: {},
    alert: true,
    userToEdit: {},
    newUser: {},
    addDialog: false,
    deleteDialog: false,
    editDialog: false,
    editName: "",
    rules: {
      number: value => {
        const numPattern = /^[0-9]+$/;
        numPattern.test(value) || "Numbers only";
      },
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
    actionAlert: actionAlert,
    userEditDialog: userEditDialog
  },

  //The methods we will need
  methods: {
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

    setupDelete(user) {
      this.userToDelete = user;
      this.deleteDialog = true;
    },

    setupEdit(user) {
      this.userToEdit = user;
      this.editName = user.name;
      this.editDialog = true;
    },

    deleteUser() {
      this.alertSettings.callName = "Delete";
      http
        .delete("/users/" + this.userToDelete._id)
        .then(response => {
          if (response.status == 204) {
            this.alertSettings.color="success"
            this.alertSettings.icon="check_circle"
            this.alert = true
            console.log(response);
            let index = this.users.indexOf(this.userToDelete);
            this.users.splice(index, 1);
            this.deleteDialog = false;
          } else {
            console.log(response);
            this.alert = true
            this.alertSettings.color = "error"
            this.alertSettings.icon = "warning"
            this.deleteDialog = false;
          }
        })
        .catch(e => {
          console.log(e);
          this.alertSettings.color = "error"
          this.alertSettings.icon = "warning"
          this.errors.push(e);
          this.deleteDialog = false;
          this.alert = true
        });
    },

    prepSubmit(user) {
      this.newUser = user
      console.log(user)
      console.log(this.newUser)
      this.submit()
    },

    prepEdit(user) {
      this.userToEdit = user
      console.log(user)
      console.log(this.userToEdit)
      this.edit
    },

    submit() {
      console.log(this.newUser)
      this.callName = "Creation";
      http
        .post("/users", this.newUser)
        .then(response => {
          this.success = true;
          console.log(response);
          this.users.push(response.data.data);
          this.addDialog = false;
          this.newUser = {}
        })
        .catch(e => {
          this.fail = true;
          this.errors.push(e);
          this.addDialog = false;
        });
    },

    edit() {
      this.callName = "Edit";
      http
        .put("/users", userToEdit)
        .then(response => {
          console.log(response);
          this.success = true;
          this.userToEdit = {};
          this.editDialog = false;
          this.load();
        })
        .catch(e => {
          console.log(e);
          this.errors.push(e);
        });
    }
  },

  mounted() {
    this.load();
  }
};
</script>