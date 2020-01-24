const User = require("../../models/User")
const bcrypt = require("bcryptjs")

const resolvers = {
  Query: {
    hello: (parent, args, req) => "Hello World!!"
  },
  Mutation: {
    createUser: (parent, { name, email, age, password }, req) => {
      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(password, salt)

      let user = new User({
        email: email,
        password: hash,
        age,
        name
      })

      return user.save()
        .then(doc => {
          return {
            ...doc,
            password: null
          }
        })
        .catch(error => {
          console.log(error)
          throw error
        })

    }
  }
};

module.exports = resolvers