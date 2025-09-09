const express=require("express")
const router=express.Router();
const {authMiddleware}=require("../middlewares/auth.middleware.js")
const {newPost}=require("../controllers/post.controllers.js")
const upload = require("../config/multer.cfg.js");
const {Post}=require('../models/post.model.js')
const {myPosts}=require("../controllers/post.controllers.js")


router.route('/new').get(authMiddleware,(req,res)=>{res.render("newPost")}).post(authMiddleware,upload.single("postImage"),newPost)
router.route('/mine').get(authMiddleware,myPosts)


module.exports=router