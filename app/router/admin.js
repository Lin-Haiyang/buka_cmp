module.exports = app => {
    //login
    app.router.get("/admin/login",app.controller.admin.login.index)
    app.router.post("/admin/doLogin",app.controller.admin.login.doLogin)
    app.router.get("/admin/verify",app.controller.admin.login.verify)
    app.router.get("/admin/logout",app.controller.admin.login.logout)
    //home
    app.router.get("/admin",app.controller.admin.home.index)

    //staff
    app.router.get("/admin/staff/add",app.controller.admin.staff.staffAdd)
    app.router.get("/admin/staff/list",app.controller.admin.staff.staffList)

}