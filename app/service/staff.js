const { Service } = require("egg");

class StaffService extends Service {

  //添加staff
  async insert(staff) {
    var staffModel = new this.ctx.model.Staff(staff);
    try {
      await staffModel.save();
      return true
    } catch (error) {
      return false
    }
    
  }

  //查询staff
  async find(username,password) {
    var result = await this.ctx.model.Staff.find(
      { login_name: username, login_pwd: password },
      { staff_name: 1, _id: 0 }
    );
    return result;
    
  }
}
module.exports = StaffService;
