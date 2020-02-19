// let express = require("express");
const playgroundRouter = require('express').Router(); // run router 
let mongoose = require("mongoose");
require("../Models/playgroundCategories"); // get schema from model 
const playgroundschema = mongoose.model('playgroundCategories');
const verify = require("../Validations/verifyToken");



playgroundRouter.route('/playgroundCategories/:id?')


    .get((request, response) => {
        if (request.params.id == undefined) {
            playgroundschema.find({  })
                .then((data) => {
                    response.send(data)
                })
                .catch((error) => {
                    response.send(error)
                })

        } else {
            playgroundschema.find({})
                .then((data) => {
                    response.send(data)
                })
                .catch((error) => {
                    response.send(error)
                })

        }

    })


    .post((request, response) => {

        playgroundObject = new playgroundschema({
            _id: request.body.id,
            name: request.body.name,
        });

        playgroundObject.save()

            .then((data) => {
                response.send(data)
            })
            .catch((error) => {
                response.send(error)
            })
    })

    .put((request, response) => {

        playgroundschema.updateOne({ _id: request.body._id }, {
            $set: {
                name: request.body.name,
            }
        })

            .then((data) => {
                response.send(data)
            })
            .catch((error) => {
                response.send(error)
            })
    }) //updata 

    .delete((request, response) => {

        playgroundschema.deleteOne({ _id: request.body._id })
            .then((data) => {
                response.send(data)
            })
            .catch((error) => {
                response.send(error)
            })

    }) // delete 



module.exports = playgroundRouter;


