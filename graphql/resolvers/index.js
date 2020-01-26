const User = require("../../models/User")
const bcrypt = require("bcryptjs")

const resolvers = {
  Query: {
    hello: (parent, args, req) => "Hello World!!"
  },
  Mutation: {
    createUser: async (parent, { name, email, age, password }, req) => {
      try {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt)

        let user = new User({
          email,
          password: hash,
          age,
          name
        })
        const result = await user.save()
        // the user object is in _doc
        return {
          ...result._doc,
          password: null
        };

      } catch (error) {
        console.log(error)
        throw error
      }

    }
  }
};

module.exports = resolvers