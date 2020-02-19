const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../Models/User")
const { registerValidation, loginValidation } = require("../Validations/validations")
const jwt = require("jsonwebtoken");
const _ = require("lodash")

router.post('/register', async (request, response) => {

    // validating the data in the request body 
    const { error } = registerValidation(request.body);

    if (error) {
        return response.status(400).send(error.details[0].message)
    };

    // checking if the user's email already exists in the DB
    const emailExists = await User.findOne({ email: request.body.email });

    if (emailExists) {
        return response.status(400).send(`email already exists ${emailExists.email}`)
    }

    //Hasing the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(request.body.password, salt)

    //creating new user
    const newUser = new User({
        _id: request.body._id,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        username: request.body.username,
        email: request.body.email,
        phone: request.body.phone,
        password: hashedPassword,
        address:{
            governorate_id:request.body.address.governorate_id,
            city_id:request.body.address.city_id
        },
        
        type: "user"
    });

    try {
        //saving in the DB
        const savedUser = await newUser.save()
        response.send(_.pick(savedUser,['name','email','type']));

    } catch (err) {
        //bad req
        response.status(400).send(err)
    }

})
router.post('/login', async (request, response) => {
        
    // validating the data in the request body 
    const { error } = loginValidation(request.body);

    if (error) {
        response.status(400).send(error.details[0].message)
    };

    // checking if the email exists in the DB
    const user = await User.findOne({ email: request.body.email });

    if (!user) {
        return response.status(400).send(`email doen't  exists `)
    }

    //checking if the password is correct 
    const validPassword = await bcrypt.compare(request.body.password, user.password)
    if (!validPassword) {
        response.status(400).send('invalid password')
    }

    const token = jwt.sign({ type: user.type ,email:user.email , id:user._id}, process.env.TOKEN_SECRET, {
        expiresIn: process.env.JWT_EXP
    })
    response.header('Authorization',  "Bearer " +  token).status(200).send({ token })
})



module.exports = router;