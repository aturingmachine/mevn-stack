<template>
  <v-app>
    <v-app-bar app clipped-left color="primary" class="lightText--text">
      <v-btn icon @click="showDrawer = !showDrawer">
        <v-icon class="lightText--text">mdi-menu</v-icon>
      </v-btn>
      <div class="d-flex align-center">
        <h1>MEVN Stack</h1>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        class="lightText--text"
        elevation="5"
        @click="$vuetify.theme.dark = !$vuetify.theme.dark"
        icon
        floating
      >
        <v-icon>
          {{
            !$vuetify.theme.dark
              ? 'mdi-weather-sunny'
              : 'mdi-moon-waxing-crescent'
          }}
        </v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app clipped absolute color="primary" v-if="showDrawer">
      <v-list nav>
        <v-list-item
          class="lightText--text"
          v-for="navLink in navLinks"
          :key="navLink.route"
          :to="navLink.route"
          link
        >
          <v-list-item-content>
            {{ navLink.text }}
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid class="pa-10">
        <router-view />
      </v-container>
    </v-main>

    <modal />
  </v-app>
</template>

<script>
import Modal from './components/Modals/Modal.vue'

export default {
  components: { Modal },
  name: 'App',

  data: () => ({
    showDrawer: true,
    navLinks: [
      {
        text: 'Home',
        route: '/',
        icon: '',
      },
      {
        text: 'About',
        route: '/about',
        icon: '',
      },
      {
        text: 'Users',
        route: '/users',
        icon: '',
      },
    ],
  }),

  computed: {
    darkMode() {
      return this.$vuetify.theme.isDark
    },
  },

  methods: {
    toggleDarkMode() {
      this.$vuetify.theme.isDark = !this.darkMode
      console.log(this.$vuetify.theme)
    },
  },

  mounted() {},
}
</script>
