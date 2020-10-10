module.exports = options =>{
    return async(ctx,next) => {
        // console.log("middleware");
        var userinfo = ctx.session.userinfo;
        var pathname = ctx.request.path;
        // 配置全局变量
        ctx.locals.csrf = ctx.csrf;
        if(userinfo!=null){
            await next();
        }else{
            if( pathname == "/admin/login"|| pathname == "/admin/doLogin" || pathname == "/admin/verify"){
                await next()
            }else{
                ctx.redirect("/admin/login")
            }
        }
    }
}