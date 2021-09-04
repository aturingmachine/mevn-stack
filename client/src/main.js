import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { simpleStore } from './state'

Vue.config.productionTip = false

new Vue({
  data: {
    store: simpleStore,
  },
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
