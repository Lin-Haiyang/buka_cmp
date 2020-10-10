const { Service } = require("egg");

class UserService extends Service {
  async insert(user) {
    var userModel = new this.ctx.model.User(user);
    userModel.save(function (err) {
      if (err) {
        console.log("保存失败");
      }
      console.log("user 保存成功");
    });
  }
}
module.exports = UserService;
