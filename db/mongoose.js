const mongoose = require("mongoose")

mongoose
	.connect(
		process.env.MONGO_URI ||
			"mongodb+srv://eduserveUser:qwertyuiop@cluster0-ftn3n.mongodb.net/test?retryWrites=true&w=majority",
		{
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		}
	)
	.then(() => console.log("connected"))
	.catch(err => console.log(err.message + "\n" + err.reason))
