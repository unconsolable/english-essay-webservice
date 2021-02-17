exports.route = {
  async get() {
    if (this.user.role === 'stu') {
      let result = await this.db.query(`
        SELECT CLASS_ID
        FROM ESSAY_USER_TO_CLASS
        WHERE USER_ID = ?
      `, [this.user.userid])
      let classInfo = []
      for (let curClassId of result[0]) {
        let curClassInfo = await this.db.query(`
          SELECT ID, CLASS_NAME, CLASS_TEACHERID, CLASS_CODE
          FROM ESSAY_CLASS
          WHERE ID = ?
        `, [curClassId["CLASS_ID"]])
        let teacherInfo = await this.db.query(`
          SELECT NAME
          FROM ESSAY_USER
          WHERE ID = ?
        `, curClassInfo[0][0]["CLASS_TEACHERID"])
        classInfo.push({
          classId: curClassInfo[0][0]["ID"],
          className: curClassInfo[0][0]["CLASS_NAME"],
          classTeacherName: teacherInfo[0][0]["NAME"],
          classCode: curClassInfo[0][0]["CLASS_CODE"]
        })
      }
      return classInfo
    } else if (this.user.role == 'tea') {
      let result = await this.db.query(`
        SELECT ID, CLASS_NAME, CLASS_CODE
        FROM ESSAY_CLASS
        WHERE CLASS_TEACHERID = ?
      `, [this.user.userid])
      let classInfo = []
      result[0].forEach(curClassInfo => {
        classInfo.push({
          classId: curClassInfo["ID"],
          className: curClassInfo["CLASS_NAME"],
          classCode: curClassInfo["CLASS_CODE"],
          classTeacherName: this.user.name
        })
      })
      return classInfo
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
  async put({classId, className, classCode}) {
    if (this.user.role !== 'tea') {
      throw '非教师权限'
    }
    if (!classId || !className || !classCode) {
      throw '参数不全'
    }
    if (classCode.length > 30) {
      throw '班级码过长'
    }
    try {
      await this.db.query(`
        UPDATE ESSAY_CLASS
        SET CLASS_NAME = ?, CLASS_CODE = ?
        WHERE ID = ?
      `, [className, classCode, classId])
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