exports.route = {
  async post({classCode}) {
    if (this.user.role !== 'stu') {
      throw '角色错误'
    }
    if (!classCode) {
      throw '参数出错'
    }
    let results = await this.db.query(`
      SELECT ID FROM ESSAY_CLASS
      WHERE CLASS_CODE = ?
    `, [classCode])
    if (results[0].length === 0) {
      throw '班级码错误'
    }
    let curClass = await this.db.query(`
      SELECT ID FROM ESSAY_USER_TO_CLASS
      WHERE USER_ID = ? AND CLASS_ID = ?
    `, [this.user.userid, results[0][0]["ID"]])
    if (curClass[0].length > 0) {
      throw '班级已加入'
    }
    await this.db.query(`
      INSERT INTO ESSAY_USER_TO_CLASS
      (USER_ID, CLASS_ID)
      VALUES (?, ?)
    `,[this.user.userid, results[0][0]["ID"]])
    return '加入班级成功'
  }
}