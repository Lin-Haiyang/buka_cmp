const { Controller } = require("egg");
 
class LoginController extends Controller {
  //显示主页面
  async index() {
     var userinfo = this.ctx.session.userinfo;
     if(userinfo!=null){
         this.ctx.body = "home main page === username:"+userinfo.staff_name;
     }else{
         this.ctx.redirect("/admin/login")
     }
  }
  
}
module.exports = LoginController;
