const { Service } = require("egg");

class LoginService extends Service {
  async find(username,password) {
    var result = await this.ctx.service.staff.find(username,password)
      if(result.length>0){
        this.ctx.session.staffinfo = result[0];
        return true;
      }else{
        return false;
      }
  }
}
module.exports = LoginService;
