const mongoose = require("mongoose");
const playgroundListRouter  = require("express").Router();
const verify = require("../Validations/verifyToken");
const multer = require('multer');
require("../Models/Playground");

let playgroundSchema = mongoose.model("playgrounds");


// Multer File upload settings
const DIR = './public/playgrounds/';
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



  playgroundListRouter.route('/playgroundlist/owner/:id?')
    .get(verify,(request, response) => {
      // console.log(+request.params.id)
      if(request.params.id){
        playgroundSchema.findOne({_id:+request.params.id})
      // .populate(["owner_id","category_id", "address.governorate_id","address.city_id"])
      .then((result) => {
          response.send(result);
      })
      .catch((error) => { response.send(error) })
    }else{
      playgroundSchema.find({owner_id:request.user.id})
      .populate(["owner_id","category_id", "address.governorate_id","address.city_id"])
      .then((result) => {
          response.send(result);
      })
      .catch((error) => { response.send(error) })
    }

    })  //end
    .put(verify,upload.single('uploadImages'),(request, response)=>{
      // console.log(request)
      const url = request.protocol + '://' + request.get('host')
      playgroundSchema.updateOne({_id:+request.params.id},{
          $set:{
            name:request.body.playgroundName,
            address:{
                governorate_id:request.body.governorate_id,
                city_id:request.body.city_id
            },
            // location:request.body.location,
            dayPrice:request.body.dayprice,
            nightPrice:request.body.nightprice,
            covered:request.body.covered,
            category_id:request.body.category_id,
            owner_id:request.user.id,
            details:request.body.details,
      
            uploadImages: url + '/public/playgrounds/' + request.file.filename
          }
      }).then(result =>{
        response.status(200).send(result)
      })
      .catch(error =>{
        response.status(403).send(error)
        
      })



    })
  

module.exports = playgroundListRouter
