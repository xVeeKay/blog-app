const path=require("path")
const {asyncHandler}=require("../utils/asyncHandler.js")
const {User}=require("../models/user.model.js")
const {Post}=require("../models/post.model.js")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {uploadToCloudinary}=require("../utils/cloudinary.js")



const newPost=asyncHandler(async(req,res)=>{
    const {title,description}=req.body;
    let imagePath=null;
    if(req.file &&req.file.buffer){
        const result=await uploadToCloudinary(req.file.buffer,"blog-app/postImages");
        imagePath=result.secure_url;
    }
    console.log(imagePath)
    const newPost=new Post({title,description,email:req.user.email,imagePath});
    await newPost.save();
    res.redirect('/posts/mine')
})

const myPosts=asyncHandler(async(req,res)=>{
    const posts=await Post.find({email:req.user.email})
    res.render("myPosts",{user:req.user,posts})
})

module.exports={
    newPost,
    myPosts
}