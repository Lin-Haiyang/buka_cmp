const { Controller } = require("egg");

class UserController extends Controller {
  //增加用户
  async userAdd() {
    //生成一个账户
    var user = {
      login_name: "admin1",
      login_pwd: "e10adc3949ba59abbe56e057f20f883e",
      staff_name: "Less1",
    };
    this.ctx.service.user.insert(user);
    this.ctx.redirect("/user/list");
  }

  //显示用户列表
  async userList() {
    var user = [
      {
        login_name: "admin1",
       
      },
      {
        login_name: "admin2",
       
      },
    ];
    await this.ctx.render("admin/userlist", { user });
  }
}
module.exports = UserController;
