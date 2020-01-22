const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
	date: Date
});

module.exports = mongoose.model("User", UserSchema);
