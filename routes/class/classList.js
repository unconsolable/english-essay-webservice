exports.route = {
  async get() {
    if (this.user.role === 'stu') {
      // TO-DO
      return []
    } else if (this.user.role == 'tea') {
      // TO-DO
      return []
    } else {
      throw '权限错误'
    }
  },
  async post({className, classCode, classTeacherId}) {
    if (this.user.role !== 'tea') {
      throw '非教师权限'
    }
    if (!className || !classTeacherId || !classCode) {
      throw '参数不全'
    }
    if (classCode.length > 30) {
      throw '班级码过长'
    }
    try {
      await this.db.query(`
        INSERT INTO ESSAY_CLASS
        (CLASS_NAME, CLASS_CODE, CLASS_TEACHERID)
        VALUES (?, ?, ?)
      `,[className, classCode, classTeacherId])
    } catch (e) {
      throw '课堂码已被占用, 请再换一个'
    }
    return '添加成功'
  },
  async put({classId, className, classCode, classTeacherId}) {
    if (this.user.role !== 'tea') {
      throw '非教师权限'
    }
    if (!classId || !className || !classTeacherId || !classCode) {
      throw '参数不全'
    }
    if (classCode.length > 30) {
      throw '班级码过长'
    }
    try {
      await this.db.query(`
        UPDATE ESSAY_CLASS
        SET CLASS_NAME = ?, CLASS_CODE = ?, CLASS_TEACHERID = ?
        WHERE ID = ?
      `, [className, classCode, classTeacherId, classId])
    } catch (e) {
      throw '课堂码已被占用, 请再换一个'
    }
    return '修改成功'
  },
  async delete({classId}) {
    if (this.user.role !== 'tea') {
      throw '非教师权限'
    }
    if (!classId) {
      throw '参数不全'
    }
    try {
      await this.db.query(`
        DELETE FROM ESSAY_CLASS
        WHERE ID = ?
      `, [classId])
    } catch(e) {
      throw '数据库异常'
    }
    return '删除成功'
  }
}