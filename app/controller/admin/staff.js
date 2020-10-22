const BaseController = require("./base");

class StaffController extends BaseController {
  //展示增加页面
  async showAdd() {
    var objcect = await this.ctx.service.role.findAll();
    if (objcect.flag) {
      var roles = objcect.data;
      await this.ctx.render("admin/staff/add", { roles });
    }
  }

  //增加用户
  async doAdd() {
    var staff = this.ctx.request.body;
    staff.login_pwd = await this.ctx.service.tools.md5(staff.login_pwd);
    //校验账户名称是否重复
    var login_name = staff.login_name;

    var user_result = await this.ctx.service.staff.findByLoginName(login_name);

    if (user_result) {
      var result = await this.ctx.service.staff.insert(staff);
      if (result) {
        await this.success("/admin/staff/list", "用户添加成功");
      } else {
        await this.fail("/admin/staff/showAdd", "用户添加失败！");
      }
    } else {
      await this.fail(
        "/admin/staff/showAdd",
        "用户名已存在请更换用户名称（用户添加失败）！"
      );
    }
  }

  //显示编辑用户
  async edit(){
    var _id = this.ctx.request.query._id;
    var staff_result = await this.ctx.service.staff.findById(_id);
    var role_result = await this.ctx.service.role.findAll();
    if(staff_result.flag&&role_result.flag){
      var staff = staff_result.data;
      var roles = role_result.data;
      await this.ctx.render("admin/staff/edit",{staff,roles});
    }else{
      await this.fail("/admin/staff/list","数据获取异常！");
    }
  }

  //编辑用户
  async doEdit(){
    var body = this.ctx.request.body;
    var _id = body._id;
    var pwd = body.login_pwd;
    if(pwd){
      var staff={
        login_name:body.login_name,
        login_pwd:await this.ctx.service.tools.md5(pwd),
        staff_name:body.staff_name,
        staff_no:body.staff_no,
        staff_phone:body.staff_phone,
        role_id:body.role_id
      }
    }else{
      var staff={
        login_name:body.login_name,
        staff_name:body.staff_name,
        staff_no:body.staff_no,
        staff_phone:body.staff_phone,
        role_id:body.role_id
      }
    }

    var result = await this.ctx.service.staff.updateById(_id,staff);

    if (result) {
      await this.success("/admin/staff/list","更新用户成功")
    } else {
      await this.fail(this.ctx.locals.lastPage,"更新用户失败")
      
    }

  }

  //显示用户列表
  async staffList() {
    var result = await this.ctx.service.staff.findAll();
    if (result.flag) {
      var staffs = result.data;
      await this.ctx.render("admin/staff/list", { staffs });
    }else{
      await this.fail("/admin", "数据异常！");

    }
  }

  //删除角色
  async delete(){
    var _id = this.ctx.request.query._id;
    var result = await this.ctx.service.staff.deleteById(_id);

    if(result){
      await this.success(this.ctx.locals.lastPage,"删除角色成功")
    }else{
      await this.fail(this.ctx.locals.lastPage,"删除角色失败")
    }
  }
}
module.exports = StaffController;
