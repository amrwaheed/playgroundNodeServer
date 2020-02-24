const governorateRouter = require("express").Router();
let mongoose = require("mongoose");
const verify =require("../Validations/verifyToken")
require('../Models/Governorate')
let governorateSchema = mongoose.model('governorates');

// governorateRouter.use(verify,(request,response,next)=>{
//     if(request.user.type == 'owner'){
//         next()
//     }else{
//         response.status(401).json({
//             data : "you are not allow to see page"
//         })
//     }
// })
governorateRouter.route('/governorate/:id?')
            .get((request, response)=>{
               if(request.params.id){
                governorateSchema.findOne({_id:request.params.id})
                .then(result => response.status(200).send(result))
                .catch(err => response.status(401).send(err))
               }else{
                governorateSchema.find({})
                .then(result => response.status(200).send(result))
                .catch(err => response.status(401).send(err))
               }
            })

            .post((request, response)=>{
                    let governorateObject = new governorateSchema({
                    name: request.body.name

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
                governorateSchema.updateOne({_id:request.body.id},{
                    $set:{
                        name: request.body.name,
                    }
                })
                .then(result => response.status(200).send(result))
                .catch(err => response.status(401).send(err))
            })

            .delete((request, response)=>{
                governorateSchema.deleteOne({_id:request.body.id})
                .then(result => response.status(200).send(result))
                .catch(err => response.status(401).send(err))
            })

governorateRouter.get('/profile',(request,response)=>{

        response.status(200).json({
            owner:{
                title:"Hello  ",
                data : "private user data "
                
            }
        })
   
})


module.exports = governorateRouter