exports.route = {
  // 教师从这里获得班级的成绩
  async get({taskId, classId}) {
    if (!taskId && !classId) {
      throw '参数不全'
    }
    let classWorks = []
    let classStudents = await this.db.query(`
      SELECT eutc.USER_ID AS USER_ID,
             eu.NAME AS NAME 
      FROM ESSAY_USER_TO_CLASS eutc
      INNER JOIN ESSAY_USER eu
      ON eutc.USER_ID = eu.ID
      WHERE eutc.CLASS_ID = ?
    `, [classId])
    for (let student of classStudents[0]) {
      let workInfo = await this.db.query(`
      SELECT TITLE, BODY, MARK 
      FROM ESSAY_WORK
      WHERE USER_ID = ? AND TASK_ID = ?
      `, [student['USER_ID'], taskId])
      if (workInfo[0].length === 0) {
        classWorks.push({
          isSubmited: false,
          userId: student['USER_ID'],
          name: student['NAME'],
          title: '',
          body: '',
          mark: null
        })
      } else {
        classWorks.push({
          isSubmited: true,
          userId: student['USER_ID'],
          name: student['NAME'],
          title: workInfo[0][0]['TITLE'],
          body: workInfo[0][0]['BODY'],
          mark: workInfo[0][0]['MARK']
        })
      }
    }
    return classWorks
  }
}