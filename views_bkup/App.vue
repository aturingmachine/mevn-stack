<template>
  <v-app :dark="isDarkMode">
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      app
      width="200"
      class="primary"
    >
      <v-list>
        <v-list-tile 
          v-for="(item, i) in items"
          :key="i"
          value="true"
          :href="item.href"
          :class="getNavClass(item.href)"
        >
          <v-list-tile-action>
            <v-icon class="primaryText--text" v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="primaryText--text" v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar class="primary primaryText--text" fixed app :clipped-left="clipped">
      <v-toolbar-side-icon class="primaryText--text" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn 
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon class="primaryText--text" v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      
      <v-toolbar-title> {{ title }} </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="isDarkMode = !isDarkMode" icon>
        <v-icon class="primaryText--text" v-if="!isDarkMode" > brightness_5 </v-icon>
        <v-icon class="primaryText--text" v-else > brightness_3 </v-icon>
      </v-btn>
    </v-toolbar>

    
    <main>
      <v-content>
        <v-container fluid >
            <v-layout column align-center>
              <v-fade-transition mode="out-in">
              <router-view @alert="alert" ></router-view>
            </v-fade-transition>
            </v-layout>
        </v-container>
      </v-content>
    </main>
    
    <v-footer :fixed="fixed" app>
      <span> Template created by <a class="lightText--text" href="http://github.com/aturingmachine">Vincent Blom</a></span>
    </v-footer>

    <v-snackbar
    bottom
    :value="alertOpen"
    :color="alertSuccess ? 'success' : 'error'"
     >
     {{ alertString }}
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  data: () => {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: "home",
          title: "Home",
          href: "/#/home",
          router: true
        },
        {
          icon: "account_circle",
          title: "Users",
          href: "/#/users",
          router: true
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "MEVN Stack Client",
      alertOpen: false,
      alertString: '',
      alertSuccess: false,
      isDarkMode: false,
    };
  },

  watch: {
    isDarkMode() {
      if (!this.isDarkMode) { //NOT dark mode
        this.$vuetify.theme = {
          primary: '#0D47A1', //Main color
          primaryText: '#FFFFFF', //Color for text on primary
          secondary: '#90CAF9', //Color for active nav
          lightText: '#000000'
        }
      } else { //Dark mode
        this.$vuetify.theme = {
          primary: '#424242', //Main color
          primaryText: '#FFFFFF', //Color for text on primary
          secondary: '#90CAF9', //Color for active nav
          lightText: '#FFFFFF'
        }
      }
    }
  },

  methods: {
    alert(success, callName, resource) {
      this.alertOpen = false
      this.alertString = callName + ' ' + resource
      if (success) {
        this.alertSuccess = true
        this.alertString += ' was successful.'
      } else {
        this.alertSuccess = false
        this.alertString += ' has failed.'
      }
      this.alertOpen = true
    },

    getNavClass(href) {
      if (this.$route.fullPath == href.substring(2)) {
        return 'secondary primaryText--text'
      } else {
        return 'primary primaryText--text'
      }
    }
  }

  
};
</script>
