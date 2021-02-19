exports.route = {
  async post({userId, taskId, mark}) {
    if (!userId && !taskId) {
      throw '参数不全'
    }
    await this.db.query(`
      UPDATE ESSAY_WORK
      SET MARK = ?
      WHERE USER_ID = ? AND TASK_ID = ?
    `, [mark, userId, taskId])
    return '登分成功'
  }
}