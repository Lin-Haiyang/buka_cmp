const {Service} = require("egg");
var svgCaptcha = require("svg-captcha");

class ToolService extends Service{
     async captcha(width,height,fontSize){
        let w = width?width:100;
        let h = height?height:30;
        let f = fontSize?fontSize:40;
        var captcha = svgCaptcha.create({
            size: 4,
            width: 100,
            height: 30,
            fontSize: 40,
          });
        
        return captcha;
    }
}
module.exports = ToolService