exports.route = {
  async get() {
    this.db.query(`
      SELECT * 
      FROM ESSAY_USER`
    , function (error, results){
      if (error) throw error
    })
    return "success"
  }
}