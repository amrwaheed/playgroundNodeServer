const availableHoursRouter = require("express").Router();
const verify =require("../Validations/verifyToken");
mongoose=require("mongoose");
require("../Models/availableHours");
let availableHoursSchema=mongoose.model("availablehours");

availableHoursRouter.use(verify,(request,response,next)=>{
    if(request.user.type == 'user'){
        next()
    }else{
        response.status(401).json({
            data : "you are not allow to see page"
        })
    }
});

//bookings --> get --> find all
availableHoursRouter.route("/availablehours/:id?")
        .get((request,response)=>{
            if(request.params.id){
                availableHoursSchema.find({_id:request.params.id})
            //.populate({path:"user_id","playground_id"})
            .then(data=>{response.send(data)})
            .catch((err)=>{
                response.send({err:err.errmsg});
                })
            }
            else{
                availableHoursSchema.find({})
                //.populate({path:"user_id","playground_id"})
                .then(data=>{response.send(data)})
                .catch((err)=>{
                response.send({err:err.errmsg});
                })
            }
        })

        .post((request,response)=>{
         
            let availableHours=new availableHoursSchema({
           
                time:request.body.time,
             
            });
          
            availableHours.save()
            .then(data=>{
                response.send(data);
            })
            .catch(err=>{
                response.send({err:err.errmsg});
            });        
        })

        // .put((request,response)=>{
        //     availableHoursSchema.updateOne({_id:this.report.body.id},{
        //         "$set":{
        //         hour:request.body.hour,
        //         day:request.body.day,
        //         user_id:request.body.user_id,
        //         playground_id:request.body.playground_id
        //         }
            
        //     }).then((data)=>{
        //         response.send(data);
        //    
        //     }).catch((err)=>{
        //         response.send({err:err.errmsg})
        //     })
        // })

        // .delete((request,response)=>{
        //     availableHoursSchema.deleteOne({_id:request.body.id})
        //     .then((data)=>{
        //       response.send(data)
        //     })
        //     .catch((err)=>{
        //         response.send({err:err.errmsg})
        //     })
        // })

module.exports = availableHoursRouter;
