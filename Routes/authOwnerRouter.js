const coreOwnerRouter = require("express").Router();
const verify =require("../Validations/verifyToken")
coreOwnerRouter.get('/',(request,response)=>{
    response.status(200).json({
        page:{
            title:"home "
            
        }
    })
})

coreOwnerRouter.get('/about',(request,response)=>{
    response.status(200).json({
        page:{
            title:"about "
            
        }
    })
})
coreOwnerRouter.get('/contact',(request,response)=>{
    response.status(200).json({
        page:{
            title:"contact "
            
        }
    })
})

coreOwnerRouter.use(verify,(request,response,next)=>{
   
    if(request.user.type == 'administration'){
        next()
    }else{
        response.status(401).json({
            data : "you are not allow to see page"
        })
    }
})

coreOwnerRouter.get('/profile',(request,response)=>{

        response.status(200).json({
            owner:{
                title:"Hello  ",
                data : "private user data "
                
            }
        })
   
})

coreOwnerRouter.get('/department',(request,response)=>{
    if(request.user.type == 'administration'){
         response.status(200).json({
            department:{
                name:"Mean stack",
                data : "private department data "
                
            }
        })
    }
   
})
module.exports = coreOwnerRouter