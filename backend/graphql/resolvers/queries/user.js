const bcrypt = require("bcryptjs")
const { OAuth2Client } = require("google-auth-library")
const { generateAuthToken } = require('utils')
const User = require("models/User")

module.exports = {

  async loginUser(parent, { email, password }, req) {
    try {
      const user = await User.findOne({ email })
      if (!user) throw new Error("No such user exists")
      if (!bcrypt.compareSync(password, user.password)) {
        throw new Error("Invalid password")
      } else {
        let auth_data = generateAuthToken(user)
        return auth_data
      }
    } catch (error) {
      console.log(error)
      return error
    }
  },

  async googleSignIn(_, { id_token }, req) {
    const client = new OAuth2Client(process.env.CLIENT_ID)
    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: process.env.CLIENT_ID
      })
      const payload = ticket.getPayload() // this returns a Promise
      const userid = payload["sub"] // unique for each user
      return payload // look at return type of verify
    }
    return verify()
      .then(async ({ name, email }) => {
        // check if the user is already in the database
        const user = await User.findOne({ email })
        if (!user) {
          // create user
          // user created from google sign in
          const googleUser = new User({
            email,
            name,
            googleLogin: true
          })
          const newUser = await googleUser.save()
          const token = generateAuthToken(newUser)
          return token
        } else {
          const token = generateAuthToken(user)
          return token
        }
      })
      .catch(console.error)
  },

  loadUser: async (_, args, { req }) => {
    if (!req.isAuth) throw new Error("Not Authorized") // For private routes

    const token = req.get('Authorization').split(" ")[1]
    const { userEmail, userId, username } = req
    try {
      return {
        token,
        tokenExpiration: 1,
        userEmail,
        username,
        userId
      }
    } catch (error) {
      return error
    }
  },

}