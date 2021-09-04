const { usersState } = require('./users')

export const simpleStore = {
  users: usersState,
  modal: {
    state: {
      type: undefined,
      show: false,
      props: undefined,
    },
    openModal(type, props) {
      console.log('open', type, props)
      this.state.type = type
      this.state.props = props
      this.state.show = true
    },
    closeModal() {
      this.state.type = undefined
      this.state.props = undefined
      this.state.show = false
    },
  },
}
