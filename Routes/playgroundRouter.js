const mongoose = require("mongoose");
const playgroundRouter = require("express").Router();
const verify = require("../Validations/verifyToken");

require("../Models/Playground");

let playgroundSchema = mongoose.model("playgrounds");



playgroundRouter.route('/playground/:_id?')


.get((request, response) => {
    if(request.params._id){
        playgroundSchema.findOne({_id:request.params._id}).populate(["owner_id","category_id"])
    .then((result) => {
        // console.log( result)
        response.send(result);
    })
    .catch((error) => { response.send(error) })
    }else{
    playgroundSchema.find({})
    .then((result) => {
        response.send(result);
    })
    .catch((error) => { response.send(error) })
    }
})  //end


.post((request, response) => {
    let playgroundObject = new playgroundSchema({
        _id:request.body._id,
        name:request.body.name,
        image:request.body.image,
        address:request.body.address,
        location:request.body.location,
        dayPrice:request.body.dayPrice,
        nightPrice:request.body.nightPrice,
        covered:request.body.covered,
        category_id:request.body.category_id,
        owner_id:request.body.owner_id,
        details:request.body.details,

    });
    playgroundObject.save().then((result) => {
        response.send(result);
    }).catch((error) => {
        response.send(error);
    })
}) //end of post



.put((request, response) => {
    playgroundSchema.updateOne({ _id: request.body._id }, {
        $set: {
            name:request.body.name,
            image:request.body.image,
            address:request.body.address,
            location:request.body.location,
            dayPrice:request.body.dayPrice,
            nightPrice:request.body.nightPrice,
            covered:request.body.covered,
            category_id:request.body.category_id,
            owner_id:request.body.owner_id,
            details:request.body.details,
        }
    }).then((result) => {
        response.send(result);
    }).catch((error) => {
        response.send(error);
    })
})//end of put


  .delete((request, response) => {
    playgroundSchema.deleteOne({ _id: request.body._id })
    .then((result) => { response.send(result) })
    .catch(error => { response.send(error) })
});//end off delete 
module.exports = playgroundRouter
