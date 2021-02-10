const mysql = require('mysql2')
const secret = require('./database/mysql-secret.json')

let connectionPool = null

async function test() {
  if (!connectionPool) {
    connectionPool = mysql.createPool({
      host: secret.host,
      user: secret.user,
      database: secret.database,
      password: secret.password,
      multipleStatements: 'true'
    }).promise()
  }
  let conn = await connectionPool.getConnection()
  let result = await conn.query(`SELECT * FROM ESSAY_USER`)
  console.log(result)
  return 'ok'
}

test().then(x => console.log(x))

// let query = function (sql, values) {
//   // 返回一个 Promise
//   return new Promise((resolve, reject) => {
//     connectionPool.getConnection(function (err, connection) {
//       if (err) {
//         reject(err)
//       } else {
//         connection.query(sql, values, (err, rows) => {
//           if (err) {
//             reject(err)
//           } else {
//             resolve(rows)
//           }
//           // 结束会话
//           connection.release()
//         })
//       }
//     })
//   })
// }

// connectionPool.getConnection((err, connection) => {
//   if (err) throw err
//   connection.query(`SELECT * FROM ESSAY_USER`, (error, results) => {
//     // 如果有错误就抛出
//     if (error) throw error
//     console.log(results)
//   })
//   connection.query(`
//     INSERT INTO ESSAY_USER(USERNAME, PASSWORD, ROLE)
//     VALUES (?, ?, ?)
//   `, ['uncon', 'uncon', 'stu'], error => {
//     if (error) throw error
//   })
// })


// connectionPool.end()


