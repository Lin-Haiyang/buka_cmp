const { Controller } = require("egg");
const md5 = require("md5");
class LoginController extends Controller {
  //显示登陆页面
  async index() {
    await this.ctx.render("login", { _csrf: this.ctx.csrf });
  }
  //表单数据处理
  async doLogin() {
    //获取数据
    //密码加密
    //数据验证
    //账号 密码进行数据库查询
    // 没有 提示用户或密码错误
    // 登录成功 存储session
    // 如果session  有userinfo  直接登录
    // 入股session  跳转登录  （超时  手动退出）
    let username = this.ctx.request.body.username;
    let password = md5(this.ctx.request.body.password);

    // var userModel = new this.ctx.model.User({
    //   login_name: "admin",
    //   login_pwd: "e10adc3949ba59abbe56e057f20f883e",
    //   staff_name: "Less",
    // });
    // userModel.save();
    // console.log("保存成功");

    var result = await this.ctx.model.User.find(
      { login_name: username, login_pwd: password },
      { staff_name: 1, _id: 0 }
    );
    if(result.length>0){
        this.ctx.session.userinfo = result[0];
        this.ctx.body = "登陆成功"
    }else{
        this.ctx.body = "用户名或密码错误"
    }
  }
}
module.exports = LoginController;
