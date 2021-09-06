<template>
  <div>
    <v-progress-linear
      fixed
      v-if="loading"
      color="white"
      indeterminate
      class="elevation-25"
      style="z-index: 6"
    />

    <v-app-bar app clipped-left color="primary" class="bright--text">
      <v-btn icon @click="$emit('toggle-drawer')">
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
  </div>
</template>

<script>
export default {
  name: 'AppBar',

  computed: {
    loading() {
      return this.$store.getters.loading
    },
  },
}
</script>
