<template>
  <v-app>
    <app-bar @toggle-drawer="showDrawer = !showDrawer"></app-bar>

    <nav-menu :value="showDrawer" />

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
import AppBar from './components/Application/AppBar.vue'
import NavMenu from './components/Application/NavMenu.vue'

export default {
  name: 'App',

  components: { AppBar, Modal, NavMenu },

  data: () => ({
    showDrawer: true,
  }),

  computed: {
    loading() {
      return this.$store.getters.loading
    },
  },
}
</script>
