exports.route = {
  async get({taskId, userId = this.user.userid}) {
    // 学生从这里获取成绩
    if (!taskId) {
      throw '参数不全'
    }
    let record = await this.db.query(`
      SELECT USER_ID, TASK_ID, TITLE, BODY, MARK
      FROM ESSAY_WORK
      WHERE TASK_ID = ? AND USER_ID = ?
    `, [taskId, userId])
    return {
      userId: record[0][0]["USER_ID"],
      taskId: record[0][0]["TASK_ID"],
      title: record[0][0]["TITLE"],
      body: record[0][0]["BODY"],
      mark: record[0][0]["MARK"]
    }
  },
  async post({taskId, title, body}) {
    if (this.user.role !== 'stu') {
      throw '非学生权限'
    }
    if (!taskId || !title || !body) {
      throw '参数不全'
    }
    if (title.length > 30) {
      throw '标题过长'
    }
    if (body.length > 1500) {
      throw '正文过长'
    }
    try {
      await this.db.query(`
      INSERT INTO ESSAY_WORK
      (USER_ID, TITLE, BODY, TASK_ID)
      VALUES (?, ?, ?, ?)
      `, [this.user.userid, title, body, taskId])
    } catch (e) {
      throw '作文提交失败'
    }
    return '提交成功'
  },
  async put({taskId, title, body}) {
    if (this.user.role !== 'stu') {
      throw '非学生权限'
    }
    if (!taskId || !title || !body) {
      throw '参数不全'
    }
    if (title.length > 30) {
      throw '标题过长'
    }
    if (body.length > 1500) {
      throw '正文过长'
    }
    try {
      await this.db.query(`
        UPDATE ESSAY_WORK
        SET TITLE = ?, BODY = ?
        WHERE USER_ID = ? AND TASK_ID = ?
      `, [title, body, this.user.userid, taskId])
    } catch (e) {
      throw '作文修改失败'
    }
    return '修改成功'
  }
}