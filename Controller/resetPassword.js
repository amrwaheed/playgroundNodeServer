const resetPasswordRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodeMailer = require('nodemailer')
const User = require("../Models/User")
const Owner = require("../Models/Owner")
const OwnerSchema = require("../Models/Owner")
const UserSchema = require("../Models/User")


// const { registerValidation, loginValidation } = require("../Validations/validations")
// const jwt = require("jsonwebtoken");
const _ = require("lodash")

resetPasswordRouter.route('/resetPassword/:type?')
        .post( async (request,response)=>{
           
            if(request.body.type == 'user'){
                    // checking if the user's email already exists in the DB
                const emailExists = await User.findOne({ email: request.body.email });

                if (emailExists) { // find email want to send email 
                   
                    let verificationCodeRandom =  Math.floor(100000 + Math.random() * 900000);
                    await User.updateOne({email:emailExists.email},{
                    $set:{
                        verificationCode:verificationCodeRandom
                    }
                    })
                    let transporter = nodeMailer.createTransport({
                            service:'gmail',
                            host: 'smtp.gmail.com',
                            port: 465,
                            secure: true,
                            connectionTimeout:5000,
                            auth: {
                                    type:"OAuth2",
                                    user:"m7md.sabry90@gmail.com",
                                    clientId:"155487456660-ulivi8233bl5l9ii54fvr7vt4lqb66q9.apps.googleusercontent.com",
                                    clientSecret:"uE1MKNPMipcXJ3wChbb6jj6m",
                                    refreshToken:"1//04YNQm8jvoOJaCgYIARAAGAQSNwF-L9Ir4Y8bpniJQTQhOnQsTXJeBJxlllZ_ac9LdBYKzPb7JeKtgFap_oFLj9dUOv53-F66kP8"
                                }
                        });

                      
                        let mailOptions = {
                                from: 'AbuHamza@playgroundteam.com', // sender address
                                to: request.body.email, // list of receivers
                                subject: "Reset your password", // Subject line
                                text: 'I hope this message gets through!',
                                html: `<b>This is from Playground Team mail service   ${verificationCodeRandom}</b>` // html body
                            };

                            transporter.sendMail(mailOptions, (error, info) => {
                                        if (error) {  response.send(error)  } 
                                        console.log(info)
                                })                               
                               




                    // User.findOne({email:emailExists.email}).then(sendMail=>{
                    // let transporter = nodeMailer.createTransport({
                    //     service:'gmail',
                    //     host: 'smtp.gmail.com',
                    //     port: 465,
                    //     secure: true,
                    //     connectionTimeout:5000,
                    //     auth: {
                    //             type:"OAuth2",
                    //             user:"m7md.sabry90@gmail.com",
                    //             clientId:"155487456660-ulivi8233bl5l9ii54fvr7vt4lqb66q9.apps.googleusercontent.com",
                    //             clientSecret:"uE1MKNPMipcXJ3wChbb6jj6m",
                    //             refreshToken:"1//04YNQm8jvoOJaCgYIARAAGAQSNwF-L9Ir4Y8bpniJQTQhOnQsTXJeBJxlllZ_ac9LdBYKzPb7JeKtgFap_oFLj9dUOv53-F66kP8"
                    //         }
                    // });
                    
                    // let mailOptions = {
                    //     from: 'AbuHamza@playgroundteam.com', // sender address
                    //     to: request.body.email, // list of receivers
                    //     subject: "Reset your password", // Subject line
                    //     text: 'I hope this message gets through!',
                    //     html: `<b>This is from Playground Team mail service   ${sendMail.verificationCode}</b>` // html body
                    // };
                    // transporter.sendMail(mailOptions, (error, info) => {
                    //         if (error) {  response.send(error)  } 
                    // });                               
                    // }).catch(error=>{
                    //     response.send(error)
                    // })
                    response.status(200).send({"message":"Message Sent Successfully"})
                }else{
                    return response.status(400).send(`email Not Founded `)

                }
            }else{
                
                    // checking if the Owner's email already exists in the DB
                    const emailExists = await Owner.findOne({ email: request.body.email });

                    if (emailExists) {
                    let verificationCodeRandom =  Math.floor(100000 + Math.random() * 900000);
                    await Owner.updateOne({email:emailExists.email},{
                    $set:{
                        verificationCode:verificationCodeRandom
                    }
                    })
                    Owner.findOne({email:emailExists.email}).then(sendMail=>{
                    let transporter = nodeMailer.createTransport({
                        service:'gmail',
                        host: 'smtp.gmail.com',
                        port: 465,
                        secure: true,
                        connectionTimeout:5000,
                        auth: {
                                type:"OAuth2",
                                user:"m7md.sabry90@gmail.com",
                                clientId:"155487456660-ulivi8233bl5l9ii54fvr7vt4lqb66q9.apps.googleusercontent.com",
                                clientSecret:"uE1MKNPMipcXJ3wChbb6jj6m",
                                refreshToken:"1//04YNQm8jvoOJaCgYIARAAGAQSNwF-L9Ir4Y8bpniJQTQhOnQsTXJeBJxlllZ_ac9LdBYKzPb7JeKtgFap_oFLj9dUOv53-F66kP8"
                            }
                    });
                    
                    let mailOptions = {
                        from: 'AbuHamza@playgroundteam.com', // sender address
                        to: request.body.email, // list of receivers
                        subject: "Reset your Account Password", // Subject line
                        text: 'I hope this message gets through!',
                        html: `<b>This is from Playground Team mail service<br>Your Verification Code is : ${sendMail.verificationCode}</b>` // html body
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {  response.send(error)  } 
                    });                               
                    })
                    response.status(200).send({"message":"Message Sent Successfully"})
                }else{
                    return response.status(404).send(`email Not Founded `)

                }
            }


        })
        .put(async (request,response)=>{
            if(request.params.type == 'user'){
                 let userData = await UserSchema.findOne({verificationCode:request.body.verificationCode})
                try{
                    if(userData){
                         
                        const salt = await bcrypt.genSalt(10);
                        const hashedPassword = await bcrypt.hash(request.body.newPassword, salt)
                         
                        await UserSchema.updateOne({email:userData.email},{
                                $set:{
                                    password: hashedPassword
                                }
                            })
                    }
                    response.send(userData)
                }
                catch(err){
                    response.send(err)
                }
            }else{
                let ownerData = await OwnerSchema.findOne({verificationCode:request.body.verificationCode})
                try{
                    if(ownerData){
                         
                        const salt = await bcrypt.genSalt(10);
                        const hashedPassword = await bcrypt.hash(request.body.newPassword, salt)
                         
                        await OwnerSchema.updateOne({email:ownerData.email},{
                                $set:{
                                    password: hashedPassword
                                }
                            })
                    }
                    response.send(ownerData)
                }
                catch(err){
                    response.send(err)
                }
            }
        });
module.exports = resetPasswordRouter;