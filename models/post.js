const Mongoose=require("mongoose")
const PostSchema=Mongoose.Schema({

    userId:{
        type:Mongoose.Schema.Types.ObjectId
    },
    Message :String,
    postedDate : {type:Date,
    default:Date.now}
}

)

var PostModel=Mongoose.model("posts",PostSchema)
module.exports=PostModel