const resetPasswordRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../Models/User")
const Owner = require("../Models/Owner")
// const { registerValidation, loginValidation } = require("../Validations/validations")
// const jwt = require("jsonwebtoken");
const _ = require("lodash")



resetPasswordRouter.route('/resetPassword')
                .post( async (request,response)=>{
                    console.log(request.body)

                    if(request.body.type == 'user'){
                      
                            // checking if the user's email already exists in the DB
                        const emailExists = await User.findOne({ email: request.body.email });

                        if (emailExists) {
                            return response.status(200).send(`email already exists ${emailExists.email}`)
                        }else{
                            return response.status(400).send(`email Not Founded `)

                        }
                    }else{
                        
                          // checking if the user's email already exists in the DB
                          const emailExists = await Owner.findOne({ email: request.body.email });

                          if (emailExists) {
                              return response.status(200).send(`email already exists ${emailExists.email}`)
                          }else{
                              return response.status(400).send(`email Not Founded `)
  
                          }
                    }


                })




module.exports = resetPasswordRouter;