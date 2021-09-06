import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { store } from './store'
import { createSimpleTransition } from 'vuetify/lib/components/transitions/createTransition'

const bounceTransition = createSimpleTransition('bounce-transition')

Vue.component('bounce-transition', bounceTransition)

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount('#app')
