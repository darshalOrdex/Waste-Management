var jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET

const fetchuser = (req,res,next) => {
    //Get The User From JWT token and add id to req object
    const token = req.header('authtoken')
    if(!token)
    {
        res.status(401).send({error: "Please Authenticate Using Valid Token"})
    }
    try
    {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    }
    catch(err)
    {
        res.status(401).send({error: "Please Authenticate Using Valid Token"})
    }
}
module.exports = fetchuser;