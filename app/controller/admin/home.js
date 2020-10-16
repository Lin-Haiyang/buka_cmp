const BaseController = require("./base");
 
class LoginController extends BaseController {
  //显示主页面
  async index() {
    //  var userinfo = this.ctx.session.userinfo;
    //  if(userinfo!=null){
    //      this.ctx.body = "home main page === username:"+userinfo.staff_name;
    //  }else{
    //      this.ctx.redirect("/admin/login");
    //  }
    await this.ctx.render("admin/home/home");
  }

    //显示weclome
    async welcome() {
      await this.ctx.render("admin/home/welcome");
    }
  
}
module.exports = LoginController;
