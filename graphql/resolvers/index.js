const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../../models/User")
const Student = require("../../models/Student")
const College = require("../../models/College")

var generateAuthToken = user => {
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
    token,
    tokenExpiration: 1
  }
}

const { OAuth2Client } = require('google-auth-library');

const resolvers = {
  Query: {
    users: (parent, args, req) => {
      return User.find({})
    },
    students: (parent, args, req) => {
      return Student.find({})
    },
    colleges: (parent, args, req) => {
      return College.find({})
    },
    loginUser: async (parent, { email, password }, req) => {
      try {
        const user = await User.findOne({ email })
        if (!user) throw new Error("No such user exists");
        if (!bcrypt.compareSync(password, user.password)) {
          throw new Error("Invalid password");
        }
        else {
          let token = generateAuthToken(user)
          return token
        }
      } catch (error) {
        console.log(error);
        return error
      }
    },
    googleSignIn: async (_, { id_token }, req) => {
      const client = new OAuth2Client(process.env.CLIENT_ID);
      async function verify() {
        const ticket = await client.verifyIdToken({
          idToken: id_token,
          audience: process.env.CLIENT_ID,
        });
        const payload = ticket.getPayload();  // this returns a Promise
        const userid = payload['sub'];        // unique for each user
      return payload                          // look at return type of verify
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
          }
          else {
            const token = generateAuthToken(user)
            return token
          }
        })
        .catch(console.error);
    }
  },
  Mutation: {
    createUser: async (parent, { name, email, password }, req) => {
      try {
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(password, salt)

        let user = new User({
          email,
          password: hash,
          name
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
    createStudentProfile: async (
      parent,
      { user, username, age, mobileNo, state, bio, education },
      req
    ) => {
      try {
        let newProfile = new Student({
          user,
          username,
          age,
          mobileNo,
          state,
          bio,
          education
        })
        const result = await newProfile.save()
        return result
      } catch (error) {
        throw error
      }
    },
    newCollege: async (
      parent,
      {
        user,
        collegename,
        establishedYear,
        contactNo,
        state,
        bio,
        coursesOffered
      },
      req
    ) => {
      try {
        let newCollege = new College({
          user,
          collegename,
          establishedYear,
          contactNo,
          state,
          bio,
          coursesOffered
        })
        const result = await newCollege.save()
        return result
      } catch (error) {
        throw error
      }
    },
  }
}

module.exports = resolvers
