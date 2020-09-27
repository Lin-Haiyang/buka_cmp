module.exports = app=> {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const UserSchema = new Schema({
        login_name:{type:String,required:true},
        login_pwd:{type:String,required:true},
        staff_name:{type:String,required:true},
        staff_no:{type:String,default:''},
        staff_phone:{type:String,default:''},
        staff_status:{type:Number,default:1},
        data_status:{type:Number,default:1},
        create_time:{type:String,default:''},
        last_time:{type:String,default:''},
        last_ip:{type:String,default:''},
    });

    return mongoose.model("User",UserSchema,"users")
}