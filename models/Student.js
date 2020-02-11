const mongoose = require("mongoose")

const StudentSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users"
	},
	username: {
		type: String,
		required: true,
		max: 40
	},
	age: {
		type: Number,
		trim: true,
		required: true
	},
	mobileNo: {
		type: Number,
		required: true
	},
	state: {
		type: String,
		trim: true,
		required: true
	},
	bio: {
		type: String,
		required: true
	},
	education: [
		{
			institute: {
				type: String,
				required: true
			},
			degree: {
				type: String,
				required: true
			},
			fieldOfStudy: {
				type: String
			},
			from: {
				type: Date,
				required: true
			},
			to: {
				type: Date
			},
			current: {
				// check if user currently enrolled in institute
				type: Boolean,
				default: false
			},
			description: {
				type: String
			}
		}
	]
})

module.exports = mongoose.model("student", StudentSchema)
