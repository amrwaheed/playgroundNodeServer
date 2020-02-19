const ownerRouter = require("express").Router();
const verify =require("../Validations/verifyToken")
const multer = require('multer');
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

// Multer File upload settings
const DIR = './public/owners/';
const storage = multer.diskStorage({
    destination: (request, file, cb) => {
      cb(null, DIR);
    },
    filename: (request, file, cb) => {
   
      const filename = Date.now()+file.originalname.toLowerCase().split(' ').join('-');
      cb(null, filename)
    }
  });

// Multer Mime Type Validation
var upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: (request, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
    }
  });
  /**
   * 
   */
ownerRouter.route('/profile/:p?')
            .get((request,response)=>{
             
               if(request.params.p == undefined){
                OwnerSchema.findOne({email:request.user.email})
                .then((data)=>{
                    response.status(200).send(data)
                })
                .catch((err)=>{
                    response.status(403).send(err)
                })
               }else{
                // .get((request,response)=>{
                  //_.pick(data,["firstName","lastName","username","phone","email","address.governorate_id.name","address.city_id.name"])
                   OwnerSchema.findOne({email:request.user.email}).populate({path:"address.governorate_id address.city_id"})
                           .then((data)=>{
                               response.status(200).send(data)
                           })
                           .catch((err)=>{
                               response.status(403).send(err)
                           })
                                       
                    //  })
               }
            })
    
            .put( upload.single('imageProfile'),(request,response)=>{
                const url = request.protocol + '://' + request.get('host')
                OwnerSchema.updateOne({email:request.user.email},{
                    $set:{
                        firstName: request.body.firstName,
                        lastName: request.body.lastName,
                        username: request.body.username,
                        phone: request.body.phone,
                        address:{
                            governorate_id:request.body.governorate_id,
                            city_id:request.body.city_id
                        },
                        imageProfile: url + '/public/owners/' + request.file.filename
                    }
                })
                .then(result => response.status(200).send(result))
                .catch(err => response.status(401).send(err))
            })


module.exports = ownerRouter