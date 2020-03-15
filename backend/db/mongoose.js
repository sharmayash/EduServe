const mongoose = require("mongoose")

mongoose
	.connect(
		process.env.MONGO_URI ||
			"mongodb://localhost:27017/eduserve",
		{
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		}
	)
	.then(() => console.log("connected to DB"))
	.catch(err => console.log(err.message + "\n" + err.reason))
