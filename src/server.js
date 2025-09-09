const dotenv=require("dotenv")
dotenv.config({path:'./.env'});
const express=require("express")
const path=require("path")
const {app}=require("./app.js")
const {connectDb}=require("./config/db.cfg.js")

app.set("view engine","ejs")
app.set("views",path.join(__dirname,'views'))



connectDb()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server started at port ${process.env.PORT}...`)
    })
})
.catch((err)=>{
    console.log("MongoDB connect failed: ",err)
})