const BaseController = require("./base");

class RoleController extends BaseController {
  //增加角色显示页面
  async add() {
    await this.ctx.render("admin/role/add");
  }

  //增加角色
  async roleAdd() {
    const body = this.ctx.request.body;

    const role = {
      role_name: body.role_name,
      role_desc: body.role_desc,
    };
    const result = await this.ctx.service.role.insert(role);

    if (result) {
      await this.success("/admin/role/list", "添加角色成功");
    } else {
      await this.fail("/admin/role/add", "添加角色失败");
    }
  }


  async auth(){
    var role_id = this.ctx.request.query._id;
   
    var result = await this.ctx.service.access.findAllWithRoleId(role_id);
    
    if(result.flag){
      var accessArray = result.data;
      await this.ctx.render("admin/role/auth",{role_id,accessArray})
    }else{
      await this.fail("/admin/role/list",result.msg);
    }


  }

  async doAuth(){
    var body = this.ctx.request.body;
    var role_id = body.role_id;
    if(body.access_checked){
      var accessCheckedArray = body.access_checked;
    }else{
      var accessCheckedArray = [];
    }
    
    var insertRoleAccess = [];
    accessCheckedArray.forEach(access_id => {
      var roleAccess = {
        role_id:role_id,
        access_id:access_id
      }
      insertRoleAccess.push(roleAccess);
    });

    var result =await this.ctx.service.access.insertManyRoleAccess(role_id,insertRoleAccess);
    if(result.flag){
      await this.success("/admin/role/list","角色授权成功")
    }else{
      await this.fail("/admin/role/auth","角色授权失败")
    }
  }

  //显示编辑页面
  async edit() {
    var id = this.ctx.request.query._id;
    const result = await this.ctx.service.role.findById(id);

    if (result) {
      var role = result.data;
      await this.ctx.render("/admin/role/edit", { role });
    } else {
      await this.fail("/admin/role/list", "获取信息异常");
    }
  }


  async delete() {
    var _id = this.ctx.request.query._id;
    var result = await this.ctx.service.role.deleteById(_id);

    if (result) {
      await this.success(this.ctx.locals.lastPage, "删除角色成功");
    } else {
      await this.fail(this.ctx.locals.lastPage, "删除角色失败");
    }
  }

  //编辑
  async doEdit() {
    var body = this.ctx.request.body;
    var _id = body._id;
    console.log("body", JSON.stringify(body));
    if (body.role_status == "on") {
      body.role_status = 1;
    } else {
      body.role_status = 0;
    }
    var role = {
      role_name: body.role_name,
      role_desc: body.role_desc,
      role_status: body.role_status,
      create_time: Date.now(),
    };
    var result = await this.ctx.service.role.updateOne(_id, role);

    if (result) {
      await this.success("/admin/role/list", "修改角色成功");
    } else {
      await this.fail("/admin/role/list", "访问异常");
    }
  }

  //显示用户列表
  async roleList() {
    const result = await this.ctx.service.role.findAll();
    if (result.flag) {
      var roles = result.data;
      await this.ctx.render("admin/role/list", { roles });
    } else {
      await this.fail("/admin/role/list", "获取角色列表数据出错！");
    }
  }
}
module.exports = RoleController;
