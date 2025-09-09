const mongoose=require("mongoose")

const postSchema=new mongoose.Schema({
    title:{type:String,required:true,trim:true},
    description:{type:String,required:true,trim:true},
    email:{type:String,required:true,lowercase:true},
    imagePath:String,
    likes:{type:Number,default:0},
    comments:[
        {
            userEmail:String,
            comment:String,
            createdAt:{type:Date,default:Date.now()}
        }
    ]
},{timestamps:true})

const Post=mongoose.model("Post",postSchema)
module.exports={Post}

