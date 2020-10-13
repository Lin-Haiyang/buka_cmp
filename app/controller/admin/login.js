const BaseController = require("./base");
const md5 = require("md5");
class LoginController extends BaseController {
  //显示登陆页面
  async index() {
    // await this.ctx.render("login", { _csrf: this.ctx.csrf });
    await this.ctx.render("admin/login");
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
    let code = this.ctx.request.body.code;

   
    let captchaCode = this.ctx.session.code;
 
    if (code.toUpperCase()==captchaCode.toUpperCase()) {
        var result = await this.ctx.service.login.find(username,password)
        if (result) {
          await this.success("/admin",'登录成功');
        } else {
          await this.fail("/admin/login",'用户名或密码错误');
        }
    }else{
      await this.fail("/admin/login","验证码输入错误！")
    }



  }

  //验证码
  async verify() {
    //生成验证码
    var captcha = await this.ctx.service.tools.captcha();
    this.ctx.session.code = captcha.text;
    this.ctx.response.type = "image/svg+xml";
    this.ctx.body = captcha.data;
  }

  //退出登录

    async logout(){
      this.ctx.session = null;
      this.ctx.redirect("/admin/login");
  }
}
module.exports = LoginController;
