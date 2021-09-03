import axios from 'axios'

export const UsersService = {
  http: axios.create({
    baseURL: 'http://localhost:3000/api/users',
  }),
  get() {
    return this.http.get()
  },
  post(userData) {
    return this.http.post('', userData)
  },
}
