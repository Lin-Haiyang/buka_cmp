const { Controller } = require("egg");

class StaffController extends Controller {
  //增加用户
  async staffAdd() {
    //生成一个账户
    var staff = {
      login_name: "admin",
      login_pwd: "e10adc3949ba59abbe56e057f20f883e",
      staff_name: "Less",
    };
    var result = await this.ctx.service.staff.insert(staff);
    if (result) {
      this.ctx.redirect("/admin/staff/list");
    } else {
      this.ctx.body("用户添加失败")
    }
    
  }

  //显示用户列表
  async staffList() {
    var staff = [
      {
        login_name: "admin1",
       
      },
      {
        login_name: "admin2",
       
      },
    ];
    await this.ctx.render("admin/stafflist", { staff });
  }
}
module.exports = StaffController;
