const path=require("path")
const {asyncHandler}=require("../utils/asyncHandler.js")
const {User}=require("../models/user.model.js")
const {Post}=require("../models/post.model.js")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {uploadToCloudinary}=require("../utils/cloudinary.js")


const signup=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body
    const userExists=await User.findOne({email:email})
    if(userExists){
        return res.status(400).render("signup",{error:"User already exists!😔"})
    }else{
        let imagePath="https://avatar.iran.liara.run/public/19"
        if(req.file&&req.file.buffer){
            const result=await uploadToCloudinary(req.file.buffer,"blog-app/userImages")
            imagePath=result.secure_url
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const newUser=new User({name,email,password:hashedPassword,imagePath})
        await newUser.save()
        res.redirect('/auth/login')
    }
})

const login=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    const userExists=await User.findOne({email})
    if(!userExists) return res.status(400).render("login",{error:"Invalid email!❌"});
    if(!(await bcrypt.compare(password,userExists.password))) return res.status(400).render("login",{error:"Invalid password!❌"});
    const accessToken= jwt.sign(
        {email:userExists.email},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:'15m'}
    )
    const refreshToken= jwt.sign(
        {email:userExists.email},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:'7d'}
    )
    userExists.refreshToken=refreshToken;
    await userExists.save()
    res.cookie("accessToken",accessToken,{
        httpOnly:true,
        maxAge:15*60*1000
    })
    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        maxAge:7 * 24 * 60 * 60 * 1000
    })
    res.redirect('/user/home')
})

const logout=asyncHandler(async(req,res)=>{
    res.clearCookie("accessToken")
    res.clearCookie("refreshToken")
    const user=await User.findOne({email:req.user.email})
    if(user){
        user.refreshToken=null
        await user.save()
    }
    
    res.redirect('/auth/login')
})




module.exports={
    signup,
    login,
    logout,
    
}