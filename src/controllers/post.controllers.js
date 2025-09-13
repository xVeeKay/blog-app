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
    const newPost=new Post({title,description,email:req.user.email,imagePath});
    await newPost.save();
    res.redirect('/posts/mine')
})

const myPosts=asyncHandler(async(req,res)=>{
    const posts=await Post.find({email:req.user.email})
    res.render("myPosts",{user:req.user,posts})
})

const toggleLike=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    const user=req.user;

    const post=await Post.findById(id);
    if(!post) return new Error("Post not found!");

    const isLiked=post.likes.includes(user._id);
    if(isLiked){
        post.likes.pull(user._id);
    }
    else{
        post.likes.push(user._id);
    }
    await post.save();
    res.redirect(req.get("Referrer") || "/");
})

const addComment=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    const user=req.user;
    const {comment}=req.body;

    const post=await Post.findById(id);
    if(!post) return res.status(404).send("Post not found!")
    
    post.comments.push({userId:user._id,username:user.name,comment});
    await post.save();
    res.redirect(req.get("Referrer") || "/");
})

module.exports={
    newPost,
    myPosts,
    toggleLike,
    addComment,
}