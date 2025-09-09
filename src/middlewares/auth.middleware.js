const jwt=require("jsonwebtoken")
const {User}=require("../models/user.model.js")
const authMiddleware=async(req,res,next)=>{
    const accessToken=req.cookies.accessToken;
    const refreshToken=req.cookies.refreshToken;
    if(!accessToken&&!refreshToken) return res.status(400).redirect('/auth/login')
    try{
        const decoded=jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET)
        const user=await User.findOne({email:decoded.email});
        req.user=user
        return next();
    }catch(err){
        console.log("access token didnt match: ",err)
    }
    try {
        if(!refreshToken) return res.status(401).redirect("/auth/login")
        const rDecoded=jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET)
        const user=await User.findOne({email:rDecoded.email})
        if(!user||user.refreshToken!==refreshToken) return res.status(401).redirect("/auth/login")
        
        const newAccessToken=jwt.sign(
            {email:rDecoded.email},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:"15m"}
        )
        res.cookie("accessToken",newAccessToken,{
            httpOnly:true,
            maxAge:15 * 60 * 1000
        })
        req.user=user
        next()
    } catch (err) {
        console.log("error while checking refresh token: ",err);
        res.status(401).redirect("/auth/login")
    }
    
}

module.exports={authMiddleware}