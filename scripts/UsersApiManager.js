class UsersApiManager {
  static async getUsers() {
    return RequestManager.fetchData('/users')
  }

  static async getUserById(id) {
    return RequestManager.fetchData(`/users/${id}`)
  }

  static async addUser(data) {
    return RequestManager.doPostRequest('/users/register', data, '/', () => {})
  }

  static async editUser(id, data) {
    return RequestManager.doPostRequest(`/users/register/${id}`, data, '/', () => {})
  }

  static async deleteUser(id) {
    return RequestManager.deleteRequest('/users', id)
  }
}
