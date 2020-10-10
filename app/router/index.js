module.exports = app => {
    //首页
    app.router.get("/",app.controller.index.index.index)
    //路由内部重定向到首页
    app.router.get("/index",app.controller.index.index.index)
    //用户界面
    app.router.get("/user",app.controller.index.user.index)
}