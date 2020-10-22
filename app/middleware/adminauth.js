module.exports = options =>{
    return async(ctx,next) => {
        // console.log("middleware");
        var staffinfo = ctx.session.staffinfo;
        var pathname = ctx.request.path;
        // 配置全局变量
        ctx.locals.csrf = ctx.csrf;
        ctx.locals.lastPage = ctx.request.header.referer;
        ctx.locals.staffinfo = staffinfo;
        if(staffinfo!=null){
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