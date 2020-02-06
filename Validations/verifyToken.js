const jwt = require("jsonwebtoken") ;

module.exports  = function (request,response,next) {

    
    const token = request.header('Authorization').split(' ')[1] ;

    if(!token) { return response.status(401).send('access denied ..!')}

    try {
        const verified = jwt.verify(token ,process.env.TOKEN_SECRET);
        request.user = verified
        next()
    } catch (error) {

        response.status(400).send('invalid token ')
    }


}