const citiesRouter = require("express").Router();
let mongoose = require("mongoose");
const verify =require("../Validations/verifyToken")
require('../Models/Governorate')
let citiesSchema = mongoose.model('governorates');

citiesRouter.use(verify,(request,response,next)=>{
    if(request.user.type == 'owner'){
        next()
    }else{
        response.status(401).json({
            data : "you are not allow to see page"
        })
    }
})
citiesRouter.route('/cities/:id?')
            .get((request, response)=>{
               if(request.params.id){
                citiesSchema.findOne({_id:request.params.id})
                .then(result => response.status(200).send(result))
                .catch(err => response.status(401).send(err))
               }else{
                citiesSchema.find({})
                .then(result => response.status(200).send(result))
                .catch(err => response.status(401).send(err))
               }
            })

            .post((request, response)=>{
                let governorateObject = new citiesSchema({
                name: request.body.name,
                governorateId: request.body.governorateId,

            });
          
                governorateObject.save()
                    .then((result) => {
                        response.send(result);
                    })
                    .catch((error) => {
                        response.send(error);
                    })
            })

            .put((request, response)=>{
                citiesSchema.updateOne({_id:request.body.id},{
                    $set:{
                        name: request.body.name,
                        governorateId: request.body.governorateId,
                    }
                })
                .then(result => response.status(200).send(result))
                .catch(err => response.status(401).send(err))
            })

            .delete((request, response)=>{
                citiesSchema.deleteOne({_id:request.body.id})
                .then(result => response.status(200).send(result))
                .catch(err => response.status(401).send(err))
            })

citiesRouter.get('/profile',(request,response)=>{

        response.status(200).json({
            owner:{
                title:"Hello  ",
                data : "private user data "
                
            }
        })
   
})


module.exports = citiesRouter