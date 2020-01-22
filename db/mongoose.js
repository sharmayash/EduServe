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
).then(() => console.log('DB connected'))
.catch(e => console.log('DB error ' + e))

module.exports = {
	graphqlDBConn
};
