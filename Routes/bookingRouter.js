const bookingRouter = require("express").Router();
const verify =require("../Validations/verifyToken");
mongoose=require("mongoose");
require("../Models/Booking");
let bookingSchema=mongoose.model("bookings");

// bookingRouter.use(verify,(request,response,next)=>{
//     if(request.user.type == 'users'){
//         next()
//     }else{
//         response.status(401).json({
//             data : "you are not allow to see page"
//         })
//     }
// });

//bookings --> get --> find all
bookingRouter.route("/booking/:id?",verify)
        .get((request,response)=>{
            if(request.params.id){
                bookingSchema.find({_id:request.params.id})
            //.populate({path:"user_id","playground_id"})
            .then(data=>{response.send(data)})
            .catch((err)=>{
                response.send({err:err.errmsg});
                })
            }
            else{
                bookingSchema.find({})
                //.populate({path:"user_id","playground_id"})
                .then(data=>{response.send(data)})
                .catch((err)=>{
                response.send({err:err.errmsg});
                })
            }
        })

        .post((request,response)=>{
            let booking=new bookingSchema({
                day:request.body.day,
                hour:request.body.hour,
                user_id:request.body.user_id,
                playground_id:request.body.playground_id
            });
            console.log("Add ==== new ==== Booking" +booking);
            booking.save()
            .then(data=>{
                response.send(data);
            })
            .catch(err=>{
                response.send({err:err.errmsg});
            });        
        })

        .put((request,response)=>{
            bookingSchema.updateOne({_id:this.report.body.id},{
                "$set":{
                hour:request.body.hour,
                day:request.body.day,
                user_id:request.body.user_id,
                playground_id:request.body.playground_id
                }
            
            }).then((data)=>{
                response.send(data);
                console.log(data);
            }).catch((err)=>{
                response.send({err:err.errmsg})
            })
        })

        .delete((request,response)=>{
            bookingSchema.deleteOne({_id:request.body.id})
            .then((data)=>{
              response.send(data)
            })
            .catch((err)=>{
                response.send({err:err.errmsg})
            })
        })

module.exports = bookingRouter;
