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
		"SECRETKEY",
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
		}
	}
}

module.exports = resolvers
