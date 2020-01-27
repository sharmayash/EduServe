const jwt = require('jsonwebtoken')

var authenticate = (req, res, next) => {

  const authHeader = req.get('Authorization')

  if (!authHeader) {
    req.isAuth = false
    return next()
  }
  const token = authHeader.split(' ')[1] // ? Bearer 4sa45da6s4

  if (!token || token === '') {
    req.isAuth = false
    return next()
  }
  let decoded;
  var VerifyOptions = {
    // issuer: i,
    // subject: s,
    // audience: a,
    expiresIn: "1h",
    // algorithm: "RS256"
  };
  try {
    decoded = jwt.verify(token, 'SECRETKEY', VerifyOptions)
  } catch (error) {
    console.log(error);
    req.isAuth = false
    return next()
  }
  if (!decoded) {
    req.isAuth = false
    return next()
  }
  req.isAuth = true
  req.userId = decoded.userId
  req.userEmail = decoded.userEmail
  next()
}

module.exports = {
  authenticate
}