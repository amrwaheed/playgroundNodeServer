const ownerRouter = require("express").Router();
const verify =require("../Validations/verifyToken")

ownerRouter.use(verify,(request,response,next)=>{
    if(request.user.type == 'owner'){
        next()
    }else{
        response.status(401).json({
            data : "you are not allow to see page"
        })
    }
})

ownerRouter.get('/profile',(request,response)=>{
        response.status(200).json({
            owner:{
                title:"Hello  ",
                data : "private user data "
                
            }
        }) 
})


module.exports = ownerRouter