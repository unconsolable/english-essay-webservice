const crypto = require('crypto')

// 哈希算法，用于对 token 进行摘要
const hash = value => {
  return Buffer.from(crypto.createHash('sha256').update(value).digest()).toString('hex')
}

const tokenHashPool = {} // 用于缓存tokenHash，防止高峰期数据库爆炸💥

module.exports = async (ctx, next) => {
  if (ctx.path === '/auth') {
    // 拦截auth请求
    if (ctx.method.toUpperCase() !== 'POST') {
      throw 405
    }
    let { username, password } = ctx.params
    if (typeof username !== 'string'
      || typeof password !== 'string') {
      throw '缺少认证参数'
    }

    let userid, role, name, xuehao
    const [rows, field] = await ctx.db.query(`
      SELECT ID, ROLE, NAME, XUEHAO
      FROM ESSAY_USER
      WHERE USERNAME = ? AND PASSWORD = ?
    `, [username, password])
    if (rows && field && rows.length === 1) {
      userid = rows[0]['ID']
      role = rows[0]['ROLE']
      name = rows[0]['NAME']
      xuehao = rows[0]['XUEHAO']
    } else {
      throw '认证失败'
    }
    // 生成 32 字节 token 转为十六进制，及其哈希值
    let token = Buffer.from(crypto.randomBytes(20)).toString('hex')
    let tokenHash = hash(token)
    console.log(token, tokenHash)
    // 记录token
    await ctx.db.execute(`
      INSERT INTO ESSAY_AUTH
      (TOKEN_HASH, USERNAME, ROLE, NAME, XUEHAO, USERID)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [tokenHash, username, role, name, xuehao, userid])
    ctx.body = token
    ctx.logMsg = `${username} [${name}]-身份认证成功`
    return
  } else if (ctx.request.headers['x-api-token']) {
    // 根据token获取用户信息, 完成鉴权
    let token = ctx.request.headers['x-api-token']
    let tokenHash = hash(token)
    let record = tokenHashPool[tokenHash]
    if (!record) {
      // 缓存不命中
      const [rows, field] = await ctx.db.query(`
        SELECT USERNAME, ROLE, NAME, XUEHAO, USERID
        FROM ESSAY_AUTH
        WHERE TOKEN_HASH = ?
      `, [tokenHash])
      if (rows && field && rows.length > 0) {
        record = {
          username: rows[0]['USERNAME'],
          role: rows[0]['ROLE'],
          name: rows[0]['NAME'],
          xuehao: rows[0]['XUEHAO'],
          userid: rows[0]['USERID']
        }
        tokenHashPool[tokenHash] = record
      } else {
        record = null
      }
    }

    let { username, role, name, xuehao, userid } = record

    ctx.user = {
      isLogin: true,
      token: tokenHash,
      username, role, name, xuehao, userid
    }

    await next()
  } else {
    if (ctx.path !== '/signup') {
      throw '未登录'
    }
    await next()
  }
}
