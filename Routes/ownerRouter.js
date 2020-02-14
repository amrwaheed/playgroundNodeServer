const ownerRouter = require("express").Router();
const verify =require("../Validations/verifyToken")
const OwnerSchema = require("../Models/Owner")
const _ =require('lodash');
ownerRouter.use(verify,(request,response,next)=>{
    if(request.user.type == 'owner'){
        next()
    }else{
        response.status(401).json({
            data : "you are not allow to see page"
        })
    }
})
ownerRouter.route('/profile')
           .get((request,response)=>{
   //_.pick(data,["firstName","lastName","username","phone","email","address.governorate_id.name","address.city_id.name"])
    OwnerSchema.findOne({email:request.user.email}).populate({path:"address.governorate_id address.city_id"})
            .then((data)=>{
                response.status(200).send(data)
            })
            .catch((err)=>{
                response.status(403).send(err)
            })
                        
            })
            .put((request,response)=>{
                OwnerSchema.updateOne({email:request.user.email},{
                    $set:{
                        firstName: request.body.firstName,
                        lastName: request.body.lastName,
                        username: request.body.username,
                        phone: request.body.phone,
                        address:{
                            governorate_id:request.body.address.governorate_id,
                            city_id:request.body.address.city_id
                        },
                    }
                })
                .then(result => response.status(200).send(result))
                .catch(err => response.status(401).send(err))

            })


module.exports = ownerRouter