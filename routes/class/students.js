exports.route = {
  async get({classId}) {
    if (!classId) {
      throw '参数不全'
    }
    try {
      let results = await this.db.query(`
        SELECT EU.USERNAME AS USERNAME,
        EU.ROLE AS ROLE,
        EU.NAME AS NAME,
        EU.XUEHAO AS XUEHAO
        FROM ESSAY_USER EU
        INNER JOIN ESSAY_USER_TO_CLASS EUTC on EU.ID = EUTC.USER_ID
        WHERE EUTC.CLASS_ID = ?;
      `, [classId])
      let ret = []
      results[0].forEach(result => {
        ret.push({
          username: result['USERNAME'],
          role: result['ROLE'],
          name: result['NAME'],
          xuehao: result['XUEHAO'],
        })
      })
      return ret
    } catch(e) {
      throw '数据库错误'
    }
  }
}