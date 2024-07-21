const Mongoose=require("mongoose")
const userSchema= Mongoose.Schema(
    {
        "name" : { type:String,requied:true},
        "email":{ type:String,requied:true },
        "phoneno":{type:String,requied:true},
        "password":{type:String,requied:true}
    }
)

var userModel=Mongoose.model("users",userSchema)
module.exports=userModel

