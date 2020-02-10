const userRouter = require("express").Router();
const verify =require("../Validations/verifyToken")


userRouter.use(verify,(request,response,next)=>{
   
    if(request.user.type == 'user'){
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


module.exports = userRouter