const mongoose = require("mongoose")

const { graphqlDBConn } = require("../db/mongoose")

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true
		},
		email: {
			type: String,
			unique: true,
			required: true,
			trim: true
		},
		password: {
			type: String,
			trim: true,
			required: true
		},
	},
	{
		timestamps: true
	}
)

module.exports = graphqlDBConn.model("User", UserSchema)
