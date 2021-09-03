<template>
  <v-app>
    <v-navigation-drawer app clipped v-if="showDrawer" color="primary">
    </v-navigation-drawer>
    <v-app-bar app clipped-left color="primary" dark>
      <v-btn icon @click="showDrawer = !showDrawer">
        <v-icon> mdi-menu </v-icon>
      </v-btn>
      <div class="d-flex align-center">
        <span> MEVN Stack </span>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    showDrawer: true,
    //
  }),
}
</script>

<style lang="scss">
.page-content {
  padding: 36px;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
</style>
