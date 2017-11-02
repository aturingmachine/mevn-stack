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
                  <actionAlert :alertSettings="alertSettings"></actionAlert>
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
import userDeleteDialog from "../components/userDeleteDialog.vue"

export default {
  //Variables
  data: () => ({
    errors: [],
    users: [],
    userToDelete: {},
    alertSettings: {},
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
    userEditDialog: userEditDialog,
    userDeleteDialog: userDeleteDialog
  },

  //The methods we will need
  methods: {
    //load all users from DB
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
      Object.keys(user).forEach( key => {
        this.userToEdit[key] = user[key]
      })
      this.editName = user.name;
      this.editDialog = true;
    },

    //Delete A User
    deleteUser(tempUser) {
      this.alertSettings.callName = "Delete";
      console.log(tempUser._id)
      http
        .delete("/users/" + tempUser._id)
        .then(response => {
          if (response.status == 204) {
            this.alertSettings.color="success"
            this.alertSettings.icon="check_circle"
            this.alert = true
            console.log(response);
            let index = this.users.indexOf(tempUser);
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

    submit(user) {
      this.callName = "Creation";
      http
        .post("/users", user)
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

    edit(changedUser) {
      http
        .put("/users/" + changedUser._id, changedUser)
        .then(response => {
          console.log(response.data.data);
          this.userToEdit = {};
          this.editDialog = false;
          this.load();
          this.alertProc(true, "Edit")
        })
        .catch(e => {
          console.log(e);
          this.errors.push(e);
          this.alertProc(false, "Edit")
        });
    },

    alertProc(success, callName) {
      this.alertSettings.callName = callName
      if (success) {
        this.alertSettings.icon = "check_circle"
        this.alertSettings.color = "success"
      } else {
        this.alertSettings.icon = "warning"
        this.alertSettings.color = "error"
      }
      this.alertSettings.bool = true
      console.log(this.alert + "")
    }
  },

  mounted() {
    this.load();
  }
};
</script>