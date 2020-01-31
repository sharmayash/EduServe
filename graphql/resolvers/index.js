const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../../models/User")
const Profile = require("../../models/Profile")

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
		hello: (parent, args, req) => "Hello World!!",
		users: (parent, args, req) => {
			return User.find({})
		},
		profiles: (parent, args, req) => {
			return Profile.find({})
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
		createProfile: async (
			parent,
			{ user, username, age, mobileNo, city, address, pincode, bio, education },
			req
		) => {
			try {
				let newProfile = new Profile({
					user,
					username,
					age,
					mobileNo,
					city,
					address,
					pincode,
					bio,
					education
				})
				const result = await newProfile.save()
				return result
			} catch (error) {
				throw error
			}
		}
	}
}

module.exports = resolvers
