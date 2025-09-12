const express=require("express")
const router=express.Router();
const {authMiddleware}=require("../middlewares/auth.middleware.js")
const {logout}=require("../controllers/user.controllers.js")
const {Post}=require("../models/post.model.js")


router.route('/home').get(authMiddleware,async(req,res)=>{const posts=await Post.find().lean();res.render("home",{user:req.user,posts})})
router.route('/logout').get(authMiddleware,logout)


module.exports=router