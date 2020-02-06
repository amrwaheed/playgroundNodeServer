const joi = require("@hapi/joi")

//register validation before creating a user
const registerValidation = data => {
    const schema = joi.object({
        name: joi.string().required().min(6).max(255),
        email: joi.string().required().email().min(6).max(255),
        password: joi.string().required().min(6).max(1024),
        type: joi.string().required().min(3).max(50),
    });
    return schema.validate(data)

}

//login validation 
const loginValidation = data => {
    const schema = joi.object({
        email: joi.string().required().email().min(6).max(255),
        password: joi.string().required().min(6).max(1024)
    });
    return schema.validate(data)

}
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;