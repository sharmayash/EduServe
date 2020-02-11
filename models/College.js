const mongoose = require("mongoose")

const CollegeSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users"
	},
	collegename: {
		type: String,
		required: true,
		max: 40
	},
	establishedYear: {
		type: Number,
		trim: true,
		required: true
	},
	contactNo: {
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
	coursesOffered: [
		{
			courseName: {
				type: String,
				required: true
			},
			totalSeats: {
				type: Number,
				required: true
			},
			streams: [
				{
					streamName: {
						type: String,
						required: true
					},
					fees: {
						type: Number,
						required: true
					},
					description: {
						type: String,
						required: true
					}
				}
			]
		}
	]
})

module.exports = mongoose.model("college", CollegeSchema)
