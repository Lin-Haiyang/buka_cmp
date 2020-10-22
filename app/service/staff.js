const { Service } = require("egg");

class StaffService extends Service {
  //添加staff
  async insert(staff) {
    var staffModel = new this.ctx.model.Staff(staff);
    try {
      await staffModel.save();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  //查询staff
  async find(username, password) {
    var result = await this.ctx.model.Staff.find(
      { login_name: username, login_pwd: password },
      { staff_name: 1, _id: 0 }
    );
    return result;
  }

  //查询所有staff
  async findAll() {
    try {
      var staffs = await this.ctx.model.Staff.aggregate([
        {
          $lookup: {
            from: "roles",
            localField: "role_id",
            foreignField: "_id",
            as: "role",
          },
        },
      ]);

      return { flag: true, data: staffs };
    } catch (error) {
      return { flag: false };
    }
  }

  async findById(_id){
    try {
      var staff = await this.ctx.model.Staff.findById(_id);
      if (staff) {
        return { flag: true, data: staff };
      }
    } catch (error) {
      return { flag: false };
    }
  }

  //通过账户名称查询
  async findByLoginName(login_name) {
    var result = await this.ctx.model.Staff.findOne({ login_name: login_name });
    if (result) {
      return false;
    } else {
      return true;
    }
  }

  //通过_id跟新用户
  async updateById(_id,staff){
    try {
      await this.ctx.model.Staff.updateOne({ _id: _id }, staff);
      return true;
    } catch (error) {
      return false;
    }
  }

  //通过_id删除
  async deleteById(_id){
    try {
      await this.ctx.model.Staff.deleteOne({_id:_id});
      return true;
    } catch (error) {
      await false;
    }
  }
}
module.exports = StaffService;
