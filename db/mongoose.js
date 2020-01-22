const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

var graphqlDBConn = mongoose.connect(
	process.env.MONGO_URI || "mongodb://localhost/eduserve",
	{
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	}
);

var onConn = mongoose.connection.once("open", () => {
	console.log("connected to database");
});

module.exports = {
	graphqlDBConn,
	onConn
};
