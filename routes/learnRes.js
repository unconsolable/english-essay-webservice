const resource = require('../sdk/resource.json')

exports.route = {
  async get() {
    return resource.learnResources
  }
}