import Vue from 'vue'
import Vuex from 'vuex'
import { modalStoreModule } from './modal.store'
import { usersStoreModule } from './users.store'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {},
  getters: {
    loading(_state, _getters, rootState) {
      return Object.keys(rootState).some((stateName) => {
        return rootState[stateName].loading
      })
    },
  },
  mutations: {},
  actions: {},
  modules: {
    users: { ...usersStoreModule },
    modal: { ...modalStoreModule },
  },
})
