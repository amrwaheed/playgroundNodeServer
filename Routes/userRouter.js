const userRouter = require("express").Router();
const verify =require("../Validations/verifyToken")






userRouter.use(verify,(request,response,next)=>{
   
    if(request.user.type == 'users'){
        next()
    }else{
        response.status(401).json({
            data : "you are not allow to see page"
        })
    }
})

userRouter.get('/profile',verify,(request,response)=>{
 
        response.status(200).json({
            User:{
                title:"Hello  ",
                data : "private user data "
                
            }
        })
    
})

userRouter.get('/department',verify,(request,response)=>{
    
         response.status(200).json({
            department:{
                name:"Mean stack",
                data : "private department data "
                
            }
        })
    
   
})
module.exports = userRouter