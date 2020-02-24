const ownerBookingRouter = require("express").Router();
const verify =require("../Validations/verifyToken");
const _ = require('lodash')


mongoose=require("mongoose");
require("../Models/Booking");
let bookingSchema=mongoose.model("bookings");

ownerBookingRouter.use(verify,(request,response,next)=>{
    if(request.user.type == 'owner'){
        next()
    }else{
        response.status(401).json({
            data : "you are not allow to see page"
        })
    }
});





//bookings --> get --> find all
ownerBookingRouter.route("/booking/:id?")
        .get((request,response)=>{ // booking id 
            
                bookingSchema.find({playground_id:request.params.id})
                    .populate({path:"user_id playground_id time"})
                    .then(h=>{  response.status(200).send(h) })
                    .catch((err)=>{
                        response.send({err:err.errmsg});
                        })
           
        })

        .post((request,response)=>{ // playgroundID 
        
            let booking=new bookingSchema({
                date:request.body.date,
                time:request.body.time,
                user_id:request.user.id,
                playground_id:request.params.id
            });
            booking.save()
            .then(data=>{
                response.send(data);
            })
            .catch(err=>{
                response.send({err:err.errmsg});
            });        
        })

        .put((request,response)=>{ // update booking by booking ID
            bookingSchema.updateOne({_id:request.params.id},{
                "$set":{
                    time:request.body.time,
                    date:request.body.date
                
                }
            
            }).then((data)=>{
                response.send(data);
              
            }).catch((err)=>{
                response.send({err:err.errmsg})
            })
        })

        .delete((request,response)=>{
            bookingSchema.deleteOne({_id:request.params.id})
            .then((data)=>{
              response.send(data)
            })
            .catch((err)=>{
                response.send({err:err.errmsg})
            })
        })

module.exports = ownerBookingRouter;
