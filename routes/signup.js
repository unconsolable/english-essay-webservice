exports.route = {
  async post({ username, password, role, name, xuehao }) {
    if (!username || !password || !role || !name || !xuehao) {
      throw '参数缺失'
    }
    if (role !== 'stu' && role !== 'tea') {
      throw '角色数据异常'
    }
    await this.db.query(`
        INSERT INTO ESSAY_USER
        (USERNAME, PASSWORD, ROLE, NAME, XUEHAO)
        VALUES (?, ?, ?, ?, ? )
      `, [username, password, role, name, xuehao])
    return '新建成功'
  }
}