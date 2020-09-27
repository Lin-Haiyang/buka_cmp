module.exports = app => {
    const {router,controller} = app;
    router.get("/admin/login",controller.admin.login.index)
    router.post("/admin/doLogin",controller.admin.login.doLogin)
    router.get("/admin",controller.admin.home.index)
}
