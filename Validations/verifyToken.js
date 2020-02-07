const jwt = require("jsonwebtoken") ;

module.exports  = function (request,response,next) {
        let isAuthorization = request.headers.authorization ? true : false;

        // console.log(request.headers.authorization ? true : false)
        // console.log(head)
    // if (!request.headers.authorization.includes('Bearer ') ) {
    //     response.status(403).send('Unauthorized');
    // }
    if(!isAuthorization || !request.headers ){
        response.status(401).send('Unauthorized');
    }
    const token = request.header('Authorization').split(' ')[1] ;
    

    if(!token) { return response.status(401).send('access denied ..!')}

    try {
        const verified = jwt.verify(token ,process.env.TOKEN_SECRET);
        // console.log(verified) // data in payload
        request.user = verified
        // console.log(request)
        next()
    } catch (error) {

        response.status(400).send('invalid token ')
    }

    
        
    
}