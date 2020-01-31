const mongoose = require("mongoose")

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
		}
	},
	{
		timestamps: true
	}
)

module.exports = mongoose.model("User", UserSchema)
