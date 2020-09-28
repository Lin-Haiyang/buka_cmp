module.exports = (option,app)=>{
    return async (ctx,next)=>{
        var startTime = Date.now();
        app.logger.info("开始时间"+endTime)

        await next();
        var endTime = Date.now();
        app.logger.info("结束时间"+endTime)
        app.logger.info("经历事件"+(endTime-startTime))
    }
}