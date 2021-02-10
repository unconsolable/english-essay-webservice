const mysql = require('mysql')
const secret = require('./mysql-secret.json')

let connectionPool = null

module.exports = {
  async getConnection() {
    if (!connectionPool) {
      connectionPool = await mysql.createPool({
        host:secret.host,
        user:secret.user,
        password:secret.password,
        multipleStatements:'true'
      })
    }
    return await connectionPool.getConnection()
  }
}

