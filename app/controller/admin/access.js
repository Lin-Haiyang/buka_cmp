const BaseController = require("./base");

class AccessController extends BaseController {
  //增加权限显示页面
  async add() {
    var result = await this.ctx.service.access.findModules();

    if (result.flag) {
      var modules = result.data;
      await this.ctx.render("admin/access/add", { modules });
    } else {
      await this.fail("/admin/access/add", result.msg);
    }
  }

  //增加权限
  async doAdd() {
    const body = this.ctx.request.body;
    if (body.access_module_id != "0") {
      body.access_module_id = this.app.mongoose.Types.ObjectId(
        body.access_module_id
      );
    }
    const result = await this.ctx.service.access.insert(body);

    if (result.flag) {
      await this.success("/admin/access/list", result.msg);
    } else {
      await this.fail("/admin/access/add", result.msg);
    }
  }

  //显示权限列表
  async list() {
    const result = await this.ctx.service.access.findAll();
    if (result.flag) {
      var modules = result.data;
      await this.ctx.render("admin/access/list", { modules });
    } else {
      await this.fail("/admin/access/list", "获取角色列表数据出错！");
    }
  }
  //显示编辑权限页面
  async edit() {
    var id = this.ctx.request.query._id;
    const result1 = await this.ctx.service.access.findById(id);
    const result2 = await this.ctx.service.access.findModules();

    if (result1.flag && result2.flag) {
      var access = result1.data;
      var modules = result2.data;
      await this.ctx.render("admin/access/edit", { access, modules });
    } else {
      if (!result1.flag) {
        await this.fail("/admin/access/list", result1.msg);
      }
      if (!result2.flag) {
        await this.fail("/admin/access/list", result2.msg);
      }
    }
  }
  //删除权限
  async delete() {
    var _id = this.ctx.request.query._id;
    var result = await this.ctx.service.access.deleteById(_id);

    if (result.flag) {
      await this.success(this.ctx.locals.lastPage,result.msg);
    } else {
      await this.fail(this.ctx.locals.lastPage, result.msg);
    }
  }

  //编辑权限
  async doEdit() {
    var body = this.ctx.request.body;
    var _id = body._id;

    if (body.access_module_id != "0") {
      body.access_module_id = this.app.mongoose.Types.ObjectId(
        body.access_module_id
      );
    }
    console.log("body==="+JSON.stringify(body));

    var result = await this.ctx.service.access.updateOne(_id, body);

    if (result.flag) {
      await this.success("/admin/access/list", result.msg);
    } else {
      await this.fail("/admin/access/list", result.msg);
    }
  }
}
module.exports = AccessController;
