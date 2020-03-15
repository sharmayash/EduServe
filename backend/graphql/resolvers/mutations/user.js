const bcrypt = require("bcryptjs")
const User = require("models/User")

module.exports = {
  async createUser(parent, { name, email, password, username }, req) {
    try {
      let salt = bcrypt.genSaltSync(10)
      let hash = bcrypt.hashSync(password, salt)

      let user = new User({
        email,
        password: hash,
        name,
        username
      })
      const result = await user.save()
      // the user object is in _doc
      const token = generateAuthToken(user)
      return token
    } catch (error) {
      console.log(error)
      throw error
    }
  },
}