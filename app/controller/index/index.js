const {Controller} = require("egg");

class IndexController extends Controller{
    async index(){
        await this.ctx.render("index/index");
    }
}
module.exports = IndexController;