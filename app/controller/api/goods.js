const {Controller} = require("egg");

class GoodsController extends Controller{
    async goodsList(){
        let goodsList = [
            {goods_name:"aaa",price:12.5},
            {goods_name:"aaa",price:12.5},
            {goods_name:"aaa",price:12.5},
            {goods_name:"aaa",price:12.5},
        ]
        this.ctx.body = goodsList;
    }
}
module.exports = GoodsController;