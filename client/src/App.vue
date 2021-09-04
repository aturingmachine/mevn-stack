<template>
  <v-app>
    <v-progress-linear
      fixed
      v-if="loading"
      color="white"
      indeterminate
      class="elevation-25"
      style="z-index: 6"
    />

    <v-app-bar app clipped-left color="primary" class="bright--text">
      <v-btn icon @click="showDrawer = !showDrawer">
        <v-icon class="bright--text">mdi-menu</v-icon>
      </v-btn>
      <div class="d-flex align-center">
        <h1>MEVN Stack</h1>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        class="bright--text mr-3"
        @click="$vuetify.theme.dark = !$vuetify.theme.dark"
        icon
        depressed
      >
        <v-icon>
          {{
            !$vuetify.theme.dark
              ? 'mdi-weather-sunny'
              : 'mdi-moon-waxing-crescent'
          }}
        </v-icon>
      </v-btn>
      <v-btn
        icon
        depressed
        tag="a"
        class="bright--text"
        href="https://github.com/aturingmachine/mevn-stack"
        target="blank"
      >
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app clipped color="primary" v-model="showDrawer">
      <v-list nav>
        <v-list-item
          class="bright--text"
          v-for="navLink in navLinks"
          :key="navLink.route"
          :to="navLink.route"
          link
        >
          <v-list-item-icon>
            <v-icon color="bright">{{ navLink.icon }}</v-icon>
          </v-list-item-icon>
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
        icon: 'mdi-home',
      },
      {
        text: 'Users',
        route: '/users',
        icon: 'mdi-account-group',
      },
      {
        text: 'About',
        route: '/about',
        icon: 'mdi-information-variant',
      },
    ],
  }),

  computed: {
    loading() {
      return this.$store.getters.loading
    },
  },
}
</script>
