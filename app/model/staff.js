module.exports = app=> {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const StaffSchema = new Schema({
        login_name:{type:String,required:true},
        login_pwd:{type:String,required:true},
        staff_name:{type:String,required:true},
        staff_no:{type:String,default:''},
        staff_phone:{type:String,default:''},
        staff_status:{type:Number,default:1},
        role_id:{type:Schema.Types.ObjectId,required:true},  //角色id 
        is_super:{type:Number,default:0},//1 超级管理管员  0 不是超级管理员
        data_status:{type:Number,default:1},
        create_time:{type:String,default:''},
        last_time:{type:String,default:''},
        last_ip:{type:String,default:''},
    });

    return mongoose.model("Staff",StaffSchema,"staffs")
}