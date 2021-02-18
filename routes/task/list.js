exports.route = {
  async get() {
    if (this.user.role === 'stu') {
      // 获取班级信息
      let result = await this.db.query(`
        SELECT CLASS_ID
        FROM ESSAY_USER_TO_CLASS
        WHERE USER_ID = ?
      `, [this.user.userid])
      let taskInfo = []
      for (let curClassId of result[0]) {
        let curTaskInfo = await this.db.query(`
          SELECT ID, CLASS_ID, TASK_TITLE, TASK_DESC
          FROM ESSAY_TASK
          WHERE CLASS_ID = ?
        `, [curClassId["CLASS_ID"]])
        for (let t of curTaskInfo[0]) 
        {
          let isSubmit = await this.db.query(`
            SELECT COUNT(*) AS CNT
            FROM ESSAY_WORK
            WHERE USER_ID = ? AND TASK_ID = ?
          `, [this.user.userid, t["ID"]])
          if (isSubmit[0][0]['CNT'] > 0) {
            isSubmit = true
          } else {
            isSubmit = false
          }
          taskInfo.push({
            taskId: t["ID"],
            classId: t["CLASS_ID"],
            taskTitle: t["TASK_TITLE"],
            taskDesc: t["TASK_DESC"],
            isSubmit
          })
        }
      }
      return taskInfo
    } else if (this.user.role === 'tea') {
      let result = await this.db.query(`
        SELECT ID
        FROM ESSAY_CLASS
        WHERE CLASS_TEACHERID = ?
      `, [this.user.userid])
      let taskInfo = []
      for (let curClassId of result[0]) {
        let curClassTasks = await this.db.query(`
          SELECT ID, CLASS_ID, TASK_TITLE, TASK_DESC
          FROM ESSAY_TASK
          WHERE CLASS_ID = ?
        `, [curClassId["ID"]])
        curClassTasks[0].forEach(t => {
          taskInfo.push({
            taskId: t["ID"],
            classId: t["CLASS_ID"],
            taskTitle: t["TASK_TITLE"],
            taskDesc: t["TASK_DESC"]
          })
        })
      }
      return taskInfo
    } else {
      throw '权限错误'
    }
  },
  async post({classId, taskTitle, taskDesc}) {
    if (this.user.role !== 'tea') {
      throw '非教师权限'
    }
    if (!classId || !taskTitle || !taskDesc) {
      throw '参数不全'
    }
    // 检验班级是否为老师下属
    let results = await this.db.query(`
      SELECT ID
      FROM ESSAY_CLASS
      WHERE CLASS_TEACHERID = ? AND ID = ?
    `, [this.user.userid, classId])
    if (results[0].length === 0) {
      throw '班级非老师下属'
    }
    await this.db.query(`
      INSERT INTO ESSAY_TASK
      (CLASS_ID, TASK_TITLE, TASK_DESC)
      VALUES (?, ?, ?)
    `, [classId, taskTitle, taskDesc])
    return '添加任务成功'
  },
  async put ({taskId, classId, taskTitle, taskDesc}) {
    if (this.user.role !== 'tea') {
      throw '非教师权限'
    }
    if (!taskId || !classId || !taskTitle || !taskDesc) {
      throw '参数不全'
    }
    // 检验班级是否为老师下属
    let results = await this.db.query(`
      SELECT ID
      FROM ESSAY_CLASS
      WHERE CLASS_TEACHERID = ? AND ID = ?
    `, [this.user.userid, classId])
    if (results[0].length === 0) {
      throw '班级非老师下属'
    }
    await this.db.query(`
      UPDATE ESSAY_TASK
      SET CLASS_ID = ?, TASK_TITLE = ?, TASK_DESC = ?
      WHERE ID = ?
    `, [classId, taskTitle, taskDesc, taskId])
    return '修改任务成功'
  },
  async delete ({taskId}) {
    if (this.user.role !== 'tea') {
      throw '非教师权限'
    }
    if (!taskId) {
      throw '参数不全'
    }
    // 检验班级是否为老师下属
    let results = await this.db.query(`
      SELECT ID
      FROM ESSAY_CLASS
      WHERE CLASS_TEACHERID = ?
    `, [this.user.userid])
    if (results[0].length === 0) {
      throw '班级非老师下属'
    }
    await this.db.query(`
      DELETE FROM ESSAY_TASK
      WHERE ID = ?
    `, [taskId])
    return '删除任务成功'
  }
}