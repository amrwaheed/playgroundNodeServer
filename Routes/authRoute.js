const coreRouter = require("express").Router();
const verify =require("../Validations/verifyToken")
coreRouter.get('/',(request,response)=>{
    response.status(200).json({
        page:{
            title:"home "
            
        }
    })
})

coreRouter.get('/about',(request,response)=>{
    response.status(200).json({
        page:{
            title:"about "
            
        }
    })
})
coreRouter.get('/contact',(request,response)=>{
    response.status(200).json({
        page:{
            title:"contact "
            
        }
    })
})

coreRouter.get('/profile',verify,(request,response)=>{
    if(request.user.type == 'administration'){
        response.status(200).json({
            User:{
                title:"Hello  ",
                data : "private user data "
                
            }
        })
    }else{
        response.status(401).json({
            data : "you are not allow to see page"
        })
    }
})

coreRouter.get('/department',verify,(request,response)=>{
    if(request.user.type == 'administration'){
         response.status(200).json({
            department:{
                name:"Mean stack",
                data : "private department data "
                
            }
        })
    }
   
})
module.exports = coreRouter