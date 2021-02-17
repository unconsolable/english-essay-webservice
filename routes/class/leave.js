exports.route = {
  async delete({classId}) {
    console.log(this.user.userid, classId)
    if (this.user.role !== 'stu') {
      throw '角色错误'
    }
    try {
      await this.db.query(`
        DELETE FROM ESSAY_USER_TO_CLASS
        WHERE USER_ID = ? AND CLASS_ID = ?
      `, [this.user.userid, parseInt(classId)])
    } catch (e) {
      throw '班级号无效'
    }
    return '删除成功'
  }
}