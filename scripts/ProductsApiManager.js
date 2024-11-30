class ProductsApiManager {
  static async getProducts() {
    return RequestManager.fetchData('/products')
  }

  static async getProductById(id) {
    return RequestManager.fetchData(`/products/${id}`)
  }

  static async addProduct(data) {
    try {
      return await RequestManager.doPostRequest('/products/register', data, '/', () => {})
    } catch (err) {
      console.error(err)
    }
  }

  static async editProduct(id, data) {
    try {
      return await RequestManager.doPostRequest(`/products/register/${id}`, data, '/', () => {})
    } catch (err) {
      console.error(err)
    }
  }

  static async deleteProduct(id) {
    try {
      return RequestManager.deleteRequest(`/products`, id)
    } catch (err) {
      console.error(err)
    }
  }
}
