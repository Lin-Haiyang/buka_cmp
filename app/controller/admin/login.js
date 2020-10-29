const BaseController = require("./base");
class LoginController extends BaseController {
  //显示登陆页面
  async index() {
    // await this.ctx.render("login", { _csrf: this.ctx.csrf });
    await this.ctx.render("admin/login");
  }
  //表单数据处理
  async doLogin() {
    let username = this.ctx.request.body.username;
    let password = await this.ctx.service.tools.md5(
      this.ctx.request.body.password
    );
    let code = this.ctx.request.body.code;

    var result = await this.ctx.service.login.find(username, password, code);

    if (result.flag) {
      await this.success("/admin", result.msg);
    } else {
      await this.fail("/admin/login", result.msg);
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

  async logout() {
    this.ctx.session = null;
    this.ctx.redirect("/admin/login");
  }
}
module.exports = LoginController;
