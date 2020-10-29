const { Service } = require("egg");

class LoginService extends Service {
  async find(username, password,code) {
    let captchaCode = this.ctx.session.code;
    if (code.toUpperCase() == captchaCode.toUpperCase()) {
      var result = await this.ctx.service.staff.find(username, password);
      if (result.flag) {
        this.ctx.session.staffinfo = result.data;
        console.log("result.data.staff_status==="+result.data.staff_status);
        if (result.data.staff_status == 1) {
          return { flag: true, msg: "登陆成功" };
        } else {
          return { flag: false, msg: "该用户状态异常，请联系管理员" };
        }
      } else {
        return { flag: false, msg: "用户名或密码错误，登陆失败" };
      }
    } else {
      return { flag: false, msg: "验证码错误请重新输入" };
    }
  }
}
module.exports = LoginService;
