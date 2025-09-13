const express=require("express")
const router=express.Router();
const {authMiddleware}=require("../middlewares/auth.middleware.js")
const upload = require("../config/multer.cfg.js");
const {Post}=require('../models/post.model.js')
const {newPost,myPosts,toggleLike,addComment}=require("../controllers/post.controllers.js")


router.route('/new').get(authMiddleware,(req,res)=>{res.render("newPost")}).post(authMiddleware,upload.single("postImage"),newPost)
router.route('/mine').get(authMiddleware,myPosts)
router.route('/:id/like').post(authMiddleware,toggleLike)
router.route("/:id/comment").post(authMiddleware,addComment)


module.exports=router