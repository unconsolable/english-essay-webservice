exports.route = {
  // return basic user info
  async get() {
    return {
      username: this.user.username,
      role: this.user.role,
      name: this.user.name,
      xuehao: this.user.xuehao,
      userid: this.user.userid
    }
  }
}