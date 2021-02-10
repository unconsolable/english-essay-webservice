const mysql = require('mysql2')
const secret = require('./mysql-secret.json')

let connectionPool = null

module.exports = {
  async getConnection() {
    if (!connectionPool) {
      connectionPool = mysql.createPool({
        host:secret.host,
        user:secret.user,
        password:secret.password,
        database:secret.database,
        multipleStatements:'true'
      }).promise()
    }
    return connectionPool
  }
}

