const axios = require('axios')

exports.route = {
  async get() {
    let response = await axios.get("http://open.iciba.com/dsapi/")
    return response.data
  }
}