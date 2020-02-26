const contactusRouter = require("express").Router();
let mongoose = require("mongoose");
const verify =require("../Validations/verifyToken")
require('../Models/contactUs')
let contactusSchema = mongoose.model('contactus');



contactusRouter.route('/contactus')
            .post((request, response)=>{
                let contactusObject = new contactusSchema({
                name: request.body.name,
                email: request.body.email,
                subject:request.body.subject,
                message:request.body.message

            });
          
            contactusObject.save()
                    .then((result) => {
                        response.send(result);
                    })
                    .catch((error) => {
                        response.send(error);
                    })
            })

            



module.exports = contactusRouter