const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../Models/Users")
const { registerValidation, loginValidation } = require("../Validations/validations")
const jwt = require("jsonwebtoken")

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
        name: request.body.name,
        email: request.body.email,
        password: hashedPassword,
        type: request.body.type
    });

    try {
        //saving in the DB
        const savedUser = await newUser.save()
        response.send(savedUser);

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

    const token = jwt.sign({ type: user.type ,email:user.email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.JWT_EXP
    })
    response.header('Authorization',  "Bearer " +  token).status(200).send({ token })
})



module.exports = router;