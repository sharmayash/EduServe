const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

try{
  var graphqlDBConn = mongoose.createConnection(
    process.env.MONGO_URI || "mongodb://localhost:27017/eduserve",
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }
  );
}
catch(err){
  console.log('DB error' + err);
}
module.exports = {
  graphqlDBConn
};
