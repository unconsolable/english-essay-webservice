// 修改为使用MongoDB数据库保存log
module.exports = async (ctx, next) => {
  let begin = moment()
  await next()
  let end = moment()
  let duration = end - begin
  let time = end.format('H:mm:ss')
  
  // let num = ctx.params.num? ctx.params.num:'未登录'
  // let QQ = ctx.params.QQ? ctx.params.QQ:'未登录'
  // let name = ctx.params.name? ctx.params.name:'未登录'

  // 考虑到某些情况（如重定向）时，返回中没有 JSON 格式的 body，只有 status
  let status = ctx.body && ctx.body.code || ctx.status

  // 可读性log，用于美观和增加可读性
  let logMsg = ctx.logMsg
  console.log(
    '  ' + time +
    ' | ' + (status < 400 ? chalkColored.green(status) : chalkColored.red(status)) +
    ' ' + ctx.method +
    ' ' + chalkColored.blue(ctx.path) +
    ' ' + duration + 'ms' +
    // ' ' + (num ? chalkColored.yellow(num + ' ' + name) : ' ') +
    // ' ' + ((QQ) ? chalkColored.cyan(QQ) : ' ') +
    (logMsg ? ' | ' + chalkColored.yellow(logMsg) : '')
  )
}
