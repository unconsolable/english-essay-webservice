exports.route = {
  // test the connection of database 
  async get() {
    let record = await this.db.query(`
      SELECT ?
    `, ['1'])
    return record
  }
}