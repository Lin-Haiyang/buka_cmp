module.exports = (app)=>{
    //schema
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const RoleAccessSchema = new  Schema({
        role_id:{type:mongoose.ObjectId}, //角色id
        access_id:{type:mongoose.ObjectId},  //权限id
    })

   return  mongoose.model('RoleAccess',RoleAccessSchema,'role_access')
}