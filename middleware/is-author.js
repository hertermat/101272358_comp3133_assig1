const webToken = require('jsonwebtoken');



module.exports = (req,res,next) => {
    const authorHeader = req.get('Authorization');
    if(!authorHeader)
    {
        req.isAuthor = false;
        return next();
    }

    const token = authorHeader.split(' ')[1];
    if(!token || token ==='')
    {
        req.isAuthor = false;
        return next();
    }

    let decodedToken;
    try{
        decodedToken = webToken.verify(token, 'justHopeThisAuthenticationWorks');

    }catch (err){
        req.isAuthor = false;
        return next();
    }

    if(!decodedToken){
        req.isAuthor = false;
        return next();
    }
    req.isAuthor = true;
    req.userId = decodedToken.userId;
    next();

};