export const modalMutationTypes = {
  open: 'Open',
  forceOpen: 'ForceOpen',
  close: 'Close',
}

const state = () => ({
  type: undefined,
  show: false,
  props: undefined,
})

const mutations = {
  [modalMutationTypes.open](state, { type, props }) {
    if (!state.show) {
      state.type = type
      state.props = props
      state.show = true
    }
  },

  [modalMutationTypes.forceOpen](state, { type, props }) {
    state.type = type
    state.props = props
    state.show = true
  },

  [modalMutationTypes.close](state) {
    state.show = false
    state.type = undefined
    state.props = undefined
  },
}

export const modalStoreModule = {
  namespaced: true,
  state,
  mutations,
}
