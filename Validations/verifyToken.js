const jwt = require("jsonwebtoken") ;

module.exports  = function (request,response,next) {

        let isAuthorization = request.headers.authorization ? true : false;

        //  
        //  
    // if (!request.headers.authorization.includes('Bearer ') ) {
    //     response.status(403).send('Unauthorized');
    // }
    if(!isAuthorization || !request.headers ){
        response.status(401).send('Unauthorized You Don\'t have token');
    }
    const token = request.header('Authorization').split(' ')[1] ;
    

    if(!token) { return response.status(401).send('access denied ..!')}

    try {
        const verified = jwt.verify(token ,process.env.TOKEN_SECRET);
        //  
        request.user = verified
      /**
       * {
       * us
       * }
       */

        
        next()
    } catch (error) {

        response.status(400).send('invalid token ')
    }

    
        
    
}