/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken')


const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  const secret = process.env.JWT_SECRET || "Jokes Secret"

  if(token){
    jwt.verify(token,secret,(err, decodedToken) =>{
      err ?
      res.status(401).json({message: 'Not Authorized'})
      : req.jwt = decodedToken
    })
  }else{
    res.status(401).json({ message: 'shall not pass!' });
  }
};

module.exports = authenticate