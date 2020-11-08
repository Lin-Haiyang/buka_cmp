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
    try {
      var result = await this.ctx.model.Staff.findOne(
        { login_name: username, login_pwd: password },
        { staff_name: 1,staff_status:1,role_id:1,is_super:1, _id: 0 }
      );
      if(result){
        return {flag:true,data:result,msg:"查找成功"};
      }else{
        return {flag:false,msg:"查找失败"};
      }
    } catch (error) {
      return {flag:false,msg:"数据异常"};
      
    }
   
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

  //检查当前用户的访问权限
  async checkAuth(role_id,path){

    var ignoreUrls = ["/admin/login","/admin/doLogin","/admin/verify",
    "/admin/logout","/admin","/admin/welcome"];
    var is_super = this.ctx.locals.staffinfo.is_super;
    if(ignoreUrls.indexOf(path)!=-1 || is_super==1){
      return {flag:true,msg:"拥有访问权限"}
    }
    var result1 = await this.ctx.service.access.findRoleId(role_id);
    var result2 = await this.ctx.service.access.findByUrl(path);
    if(result1.flag&&result2.flag){
        var accessArray = result1.data;
        var access = result2.data;
        var accessAll = [];
        accessArray.forEach(element => {
          accessAll.push(element.access_id.toString());
        });
        if(accessAll.indexOf(access._id.toString())!=-1){
          return {flag:true,msg:"拥有访问权限"}
        }else{
          return {flag:false,msg:"没有访问权限"}
        }
    }else{
      return {flag:false,msg:"数据异常，访问权限检查失败！"}
    }

  }
}
module.exports = StaffService;
