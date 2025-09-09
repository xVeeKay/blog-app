const express=require("express")
const router=express.Router();
const upload=require('../config/multer.cfg.js');
const { signup,login } = require("../controllers/user.controllers.js");
const path=require("path")


router.route('/signup').get((req,res)=>{res.render("signup")}).post(upload.single("avatar"),signup)
router.route('/login').get((req,res)=>{res.render("login")}).post(login)





module.exports=router