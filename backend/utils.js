const jwt = require('jsonwebtoken')

const generateAuthToken = user => {
  let token = jwt.sign(
    {
      userId: user.id,
      userEmail: user.email
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "1h"
    }
  )
  return {
    userId: user.id,
    userEmail: user.email,
    token,
    tokenExpiration: 1
  }
}

module.exports = {
  generateAuthToken
}