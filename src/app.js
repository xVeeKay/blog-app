const express=require("express")
const app=express()
const cookieParser=require("cookie-parser")
const authRoutes=require("./routes/auth.routes.js")
const userRoutes=require("./routes/user.routes.js")
const postRoutes=require("./routes/post.routes.js")
const {authMiddleware}=require("./middlewares/auth.middleware.js")


app.use(express.urlencoded())
app.use(cookieParser())


app.get('/',authMiddleware,(req,res)=>{res.redirect('/user/home')})

app.use('/auth',authRoutes)
app.use("/user",userRoutes)
app.use("/posts",postRoutes)






module.exports={app}