import { UsersService } from '../services/users-service'

export const usersState = {
  state: {
    loading: false,
    records: undefined,
  },

  setUsers(newRecord) {
    this.state.records = newRecord
  },

  errorUsers(error) {
    console.error(error) // TODO wrap logging up
    this.state.records = []
  },

  async fetch(force) {
    if (this.state.records && !force) {
      return
    }

    this.state.loading = true

    try {
      const response = await UsersService.get()
      this.setUsers(response.data.users)
      this.state.loading = false
    } catch (error) {
      this.errorUsers(error)
      this.state.loading = false
    }
  },

  async add(userData) {
    this.state.loading = true
    try {
      await UsersService.post(userData)
      await this.fetch(true)
    } catch (error) {
      this.state.loading = false
      console.error(error)
    }
  },

  async update(id, userData) {
    this.state.loading = true
    try {
      const response = await UsersService.put(id, userData)
      this.state.records.push(response.data)
      this.state.records.slice()
    } catch (error) {
      console.error(error)
      this.state.loading = false
    }
  },

  async delete(id, cb = () => {}) {
    this.state.loading = true
    console.log('Should be Loading')
    try {
      console.log('Deleting')
      await UsersService.delete(id)
      console.log('Fetching')
      await this.fetch(true)
      console.log('Done Loading')
      this.state.loading = false
      cb()
    } catch (error) {
      console.error(error)
      this.state.loading = false
      cb()
    }
  },

  clearCache() {
    this.state.records = undefined
  },
}
