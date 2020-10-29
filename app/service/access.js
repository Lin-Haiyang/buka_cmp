const { Service } = require("egg");

class AccessService extends Service {
  //查询模块
  async findModules() {
    try {
      var accessModules = await this.ctx.model.Access.find({
        access_module_id: "0",
      });
      return { flag: true, data: accessModules, msg: "权限模块查询成功" };
    } catch (error) {
      return { flag: false, msg: "数据异常，权限模块查询失败！" };
    }
  }

  //增加权限
  async insert(access) {
    var accessModel = new this.ctx.model.Access(access);
    try {
      await accessModel.save();
      return { flag: true, msg: "增加权限成功" };
    } catch (error) {
      return { flag: false, msg: "数据异常，增加权限失败" };
    }
  }

  //查询所有权限
  async findAll() {
    try {
      var accesses = await this.ctx.model.Access.aggregate([
        {
          $lookup: {
            from: "accesses",
            localField: "_id",
            foreignField: "access_module_id",
            as: "subAccess",
          },
        },
        {
          $match: {
            access_module_id: "0",
          },
        },
        {
          $sort: {
            data_sort: 1,
          },
        },
      ]);

      if (accesses) {
        return { flag: true, data: accesses, msg: "查询所有权限成功" };
      }
    } catch (error) {
      return { flag: false, msg: "数据异常，查询权限失败" };
    }
  }

  //依据_id查询权限
  async findById(_id) {
    try {
      var access = await this.ctx.model.Access.findById(_id);
      if (access) {
        return { flag: true, data: access, msg: "依据_id查询权限成功" };
      }
    } catch (error) {
      return { flag: false, msg: "数据异常,查询失败" };
    }
  }

  //更新权限
  async updateOne(_id, access) {
    try {
      await this.ctx.model.Access.updateOne({ _id: _id }, access);
      return { flag: true, msg: "更新权限成功" };
    } catch (error) {
      return { flag: false, msg: "数据异常，更新权限失败" };
    }
  }

  //通过id删除
  async deleteById(_id) {
    try {
      await this.ctx.model.Access.deleteOne({ _id: _id });
      return {flag:true,msg:"删除权限成功"};
    } catch (error) {
      return {flag:false,msg:"数据异常，删除权限失败"};
    }
  }
}
module.exports = AccessService;
