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
			required: false  // in case of google sign in
      // TODO: VERY IMPORTANT
      /*
        add validation here if googleLogin is false 
        then password cannot be null
      */
		},
    googleLogin: {
      type: Boolean,
      default: false
    }
	},
	{
		timestamps: true
	}
)

module.exports = mongoose.model("User", UserSchema)
