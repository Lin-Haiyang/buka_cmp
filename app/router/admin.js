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
    router.get("/admin/staff/showAdd",controller.admin.staff.showAdd)
    router.post("/admin/staff/doAdd",controller.admin.staff.doAdd)
    router.get("/admin/staff/list",controller.admin.staff.staffList)
    router.get("/admin/staff/edit",controller.admin.staff.edit)
    router.post("/admin/staff/doEdit",controller.admin.staff.doEdit)
    router.get("/admin/staff/delete",controller.admin.staff.delete)

    //role
    router.get("/admin/role/add",controller.admin.role.add)
    router.post("/admin/role/doAdd",controller.admin.role.roleAdd)
    router.get("/admin/role/list",controller.admin.role.roleList)
    router.get("/admin/role/edit",controller.admin.role.edit)
    router.get("/admin/role/delete",controller.admin.role.delete)
    router.post("/admin/role/doEdit",controller.admin.role.doEdit)

    //access(权限)
    router.get("/admin/access/add",controller.admin.access.add)
    router.post("/admin/access/doAdd",controller.admin.access.doAdd)
    router.get("/admin/access/list",controller.admin.access.list)
    router.get("/admin/access/edit",controller.admin.access.edit)
    router.post("/admin/access/doEdit",controller.admin.access.doEdit)
    router.get("/admin/access/delete",controller.admin.access.delete)





}