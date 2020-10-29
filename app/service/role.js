const { Service } = require("egg");

class RoleService extends Service {
  //添加role
  async insert(role) {
    var roleModel = new this.ctx.model.Role(role);
    try {
      await roleModel.save();
      return true;
    } catch (error) {
      return false;
    }
  }


  //查询所有role
  async findAll() {
    try {
      var roles = await this.ctx.model.Role.find({});
      if (roles) {
        return { flag: true, data: roles };
      }
    } catch (error) {
      return { flag: false };
    }
  }


  //通过id查询
  async findById(_id) {
    try {
      var role = await this.ctx.model.Role.findById(_id);
      if (role) {
        return { flag: true, data: role };
      }
    } catch (error) {
      return { flag: false };
    }
  }


  //通过id删除
  async deleteById(_id){
    try {
      await this.ctx.model.Role.deleteOne({_id:_id});
      return true;
    } catch (error) {
      return false;
    }
  }


  //通过id更新数据
  async updateOne(_id, role) {
    try {
      await this.ctx.model.Role.updateOne({ _id: _id }, role);
      return true;
    } catch (error) {
      return false;
    }
  }
}
module.exports = RoleService;
