const mongoose = require('mongoose')

mongoose.Promise = global.Promise;
var graphqlDBConn = mongoose.createConnection(process.env.MONGO_URI || "mongodb://localhost:27017/eduserver", {
  useCreateIndex: true,
  useNewUrlParser: true
})

module.exports = {
  graphqlDBConn
}