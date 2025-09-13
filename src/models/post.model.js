const mongoose=require("mongoose")

const postSchema=new mongoose.Schema({
    title:{type:String,required:true,trim:true},
    description:{type:String,required:true,trim:true},
    email:{type:String,required:true,lowercase:true},
    imagePath:String,
    likes:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    comments:[
        {
            userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
            username:{type:String,required:true},
            comment:{type:String,required:true,trim:true},
            createdAt:{type:Date,default:Date.now()}
        }
    ]
},{timestamps:true})

const Post=mongoose.model("Post",postSchema)
module.exports={Post}

