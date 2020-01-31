const mongoose = require("mongoose")

mongoose.Promise = global.Promise

try {
	var graphqlDBConn = mongoose.connect(
		process.env.MONGO_URI || "mongodb://localhost:27017/eduserve",
		{
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		}
	)

	var onConn = mongoose.connection.once("open", () => {
		console.log("connected to database")
	})
} catch (err) {
	console.log("DB error" + err)
}
module.exports = {
	graphqlDBConn,
	onConn
}
