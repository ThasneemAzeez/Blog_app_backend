const Express = require("express")
const Mongoose = require("mongoose")
const Bcrypt = require("bcrypt")
const Cors = require("cors")
const jwt = require("jsonwebtoken")
const userModel=require("./models/users")

let app= Express()
app.use(Express.json())
app.use(Cors())
Mongoose.connect("mongodb+srv://thasneemazeez:thasneem38@cluster0.uk9okno.mongodb.net/BlogAppdb?retryWrites=true&w=majority&appName=Cluster0")

//signIn
app.post("/signIn",async(req,res)=>{
    let input=req.body
    let result=userModel.find({email:req.body.email}).then((items)=>{
        if (items.length>0) {

            const passwordValidator=Bcrypt.compareSync(req.body.password,items[0].password)
            if (passwordValidator) {
                jwt.sign({email:req.body.email},"blogApp",{expiresIn:"1d"},
                    (error,token)=>{
                        if (error) {
                            res.json({"status":"Error","error":error})
                        } 
                        else {
                         
                            res.json({"status":"Success","token":token,"userId":items[0]._id})
                        }
                       
                    })
                
                
            } else {
                
            }
            
        } else {
            res.json({"status":"Incorrect password"})
        }
    })
})



//singUP
app.post("/signUp",async(req,res)=>{
    
    let input=req.body
    let hashedPassword = Bcrypt.hashSync(req.body.password,10)
    console.log(hashedPassword)
    req.body.password=hashedPassword
    

    userModel.find({email:req.body.email}).then(
        (items)=>{

            if (items.length>0) {

                res.json({"status":"email already exist"})
                
            } else {
                
                let result= new userModel(input)
                 result.save()
                res.json({"status":"success"})
            }

        }
    )
       
    
    
    
    
})

app.listen(3030,()=>{
    console.log("server started")
})