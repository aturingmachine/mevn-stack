<template>
  <v-container class="pa-0">
    <v-container>
      <template>
        <v-layout row>
          <v-flex>
            <v-card>

              <v-alert
                color="success"
                dismissible
                icon="check_circle"
                v-model="success"
                transition="scale-transition"
              >
                {{ callName }} successful.
              </v-alert>

              <v-alert
                color="error"
                dismissible
                icon="warning"
                v-model="fail"
                transition="scale-transition"
              >
                {{ callName }} failed.
              </v-alert>
            </v-card>

            <v-card>
              <!-- Begin Toolbar -->
              <v-toolbar>
                <v-toolbar-title> Users </v-toolbar-title>
                <v-spacer></v-spacer>

                <v-dialog v-model="addDialog" lazy absolute max-width="50%">
                  <v-btn icon slot="activator">
                    <v-icon> control_point </v-icon>
                  </v-btn>
                  <v-card>
                    <v-toolbar>
                      <div class="headline"> Add A User </div>
                    </v-toolbar>
                    <v-container fluid>
                      <v-card-text>

                        <!-- Begin Input Row -->
                        <v-form ref="form">
                          <v-text-field label="Name" v-model="newUser.name"> </v-text-field>
                          <v-slider label="Age" v-model="newUser.age" thumb-label step="1"></v-slider>
                          <v-text-field label="Email" v-model="newUser.email" :rules="[rules.email]"> </v-text-field>



                          <v-btn @click="submit()" class="green lighten-1 white--text">Submit</v-btn>
                          <v-btn @click="addDialog = false" class="red white--text">Close</v-btn>
                        </v-form>
                      </v-card-text>
                    </v-container>
                  </v-card>
                </v-dialog>


              </v-toolbar>
              <v-list>
                <v-list-group v-for="user in users" :key="user._id">
                <v-list-tile slot="item" :id="user._id">
                  <v-list-tile-content>
                    {{ user.name }}
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-icon>keyboard_arrow_down</v-icon>
                  </v-list-tile-action>
                </v-list-tile>

                <v-list three-line>
                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>Age: {{ user.age }}</v-list-tile-title>
                        <v-list-tile-title>Email: {{ user.email }}</v-list-tile-title>
                      </v-list-tile-content>

                      <v-btn class="red darken-2" @click="setupDelete(user)">
                        <v-icon dark>remove_circle_outline</v-icon>
                      </v-btn>

                      <v-btn class="blue darken-2" @click="setupEdit(user)">
                        <v-icon dark>mode_edit</v-icon>
                      </v-btn>

                    </v-list-tile>
                  </v-list>
                </v-list-group>
              </v-list>

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
                  <v-card>
                    <v-toolbar>
                      <div class="headline"> Edit User: {{editName}} </div>
                    </v-toolbar>
                    <v-container fluid>
                      <v-card-text>

                        <!-- Begin Input Row -->
                        <v-form ref="form">
                          <v-text-field label="Name" v-model="userToEdit.name"> </v-text-field>
                          <v-slider label="Age" v-model="userToEdit.age" thumb-label step="1"></v-slider>
                          <v-text-field label="Email" v-model="userToEdit.email" :rules="[rules.email]"> </v-text-field>



                          <v-btn @click="edit()" class="green lighten-1 white--text">Submit</v-btn>
                          <v-btn @click="editDialog = false" class="red white--text">Close</v-btn>
                        </v-form>
                      </v-card-text>
                    </v-container>
                  </v-card>
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

export default {
  data: () => ({
    errors: [],
    users: [],
    userToDelete: {},
    success: false,
    fail: false,
    callName: "",
    userToEdit: {},
    newUser: {},
    addDialog: false,
    deleteDialog: false,
    editDialog: false,
    editName: "",
    rules: {
      number: value => {
        const numPattern = /^[0-9]+$/
        numPattern.test(value) || "Numbers only"
      },
      email: value => {
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail."
      }
    }
  }),

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
      this.editName = user.name
      this.editDialog = true
    },

    deleteUser() {
      this.callName = "Delete";
      http
        .delete("/users/" + this.userToDelete._id)
        .then(response => {
          if (response.status == 204) {
            console.log(response)
            this.success = true;
            let index = this.users.indexOf(this.userToDelete)
            this.users.splice(index, 1)
            this.deleteDialog = false
          } else {
            console.log(response)
            this.fail = true;
            this.deleteDialog = false
          }
        })
        .catch(e => {
          console.log(e)
          this.fail = true;
          this.errors.push(e);
          this.deleteDialog = false
        });
    },

    submit() {
      this.callName = "Creation"
      http
        .post("/users", this.newUser)
        .then(response => {
          this.success = true
          console.log(response);
          this.users.push(response.data.data)
          this.newUser = {}
          this.addDialog = false
        })
        .catch(e => {
          this.fail = true
          this.errors.push(e);
          this.addDialog = false
        });
    },

    edit() {
      this.callName = "Edit"
      http
        .put('/users', this.userToEdit)
        .then(response => {
          console.log(response)
          this.success = true
          this.userToEdit = {}
          this.editDialog = false
          this.reload()
        })
        .catch(e => {
          console.log(e)
          this.errors.push(e)
        })
    }
  },

  mounted() {
    this.load();
  }
};
</script>