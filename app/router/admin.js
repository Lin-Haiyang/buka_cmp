module.exports = app => {
    const {router,controller} = app;
    //login
    router.get("/admin/login",controller.admin.login.index)
    router.post("/admin/doLogin",controller.admin.login.doLogin)
    router.get("/admin/verify",controller.admin.login.verify)
    router.get("/admin/logout",controller.admin.login.logout)
    //home
    router.get("/admin",controller.admin.home.index)
    router.get("/admin/welcome",controller.admin.home.welcome)

    //staff
    router.get("/admin/staff/add",controller.admin.staff.staffAdd)
    router.get("/admin/staff/list",controller.admin.staff.staffList)

    //role
    router.get("/admin/role/add",controller.admin.role.add)
    router.post("/admin/role/doAdd",controller.admin.role.roleAdd)
    router.get("/admin/role/list",controller.admin.role.roleList)
    router.get("/admin/role/edit",controller.admin.role.edit)
    router.post("/admin/role/doEdit",controller.admin.role.doEdit)

}