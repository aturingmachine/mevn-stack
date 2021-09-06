import { UsersService } from '../services/users.service'

const usersGetterTypes = {
  users: 'Users',
  loading: 'Loading',
}

const usersMutationTypes = {
  setLoading: 'SetLoading',
  setSuccess: 'SetSuccess',
  setError: 'SetError',
}

const usersActionTypes = {
  get: 'GetAll',
  add: 'Add',
  update: 'Update',
  delete: 'Delete',
}

const state = () => ({
  records: undefined,
  loading: false,
})

const getters = {
  [usersGetterTypes.users]: (state) => state.records,
  [usersGetterTypes.loading]: (state) => state.loading,
}

const mutations = {
  [usersMutationTypes.setLoading](state) {
    state.loading = true
  },

  [usersMutationTypes.setSuccess](state, userRecords) {
    state.records = userRecords
    state.loading = false
  },

  [usersMutationTypes.setError](state) {
    state.records = []
    state.loading = false
  },
}

const actions = {
  async [usersActionTypes.get]({ state, commit }, bustCache) {
    if (state.records && !bustCache) {
      return
    }

    commit(usersMutationTypes.setLoading)

    try {
      const response = await UsersService.get()
      commit(usersMutationTypes.setSuccess, response.data.users)
    } catch (error) {
      console.error(error)
      commit(usersMutationTypes.setError)
    }
  },

  async [usersActionTypes.add]({ dispatch, commit }, userData) {
    commit(usersMutationTypes.setLoading)

    try {
      await UsersService.post(userData)
      dispatch(usersActionTypes.get, true)
    } catch (error) {
      console.error(error)
      commit(usersMutationTypes.setError)
    }
  },

  async [usersActionTypes.update]({ dispatch, commit }, payload) {
    commit(usersMutationTypes.setLoading)

    try {
      await UsersService.put(payload.id, payload.data)
      await dispatch(usersActionTypes.get, true)
    } catch (error) {
      console.error(error)
      commit(usersMutationTypes.setError)
    }
  },

  async [usersActionTypes.delete]({ dispatch, commit }, id) {
    commit(usersMutationTypes.setLoading)

    try {
      await UsersService.delete(id)
      await dispatch(usersActionTypes.get, true)
    } catch (error) {
      console.error(error)
      await dispatch(usersActionTypes.get, true)
    }
  },
}

export const usersStoreModule = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
