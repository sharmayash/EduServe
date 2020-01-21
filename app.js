const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const schema = require("./schema/schema");
const graphqlHttp = require("express-graphql");

const app = express();

app.use(cors());

mongoose.connect("mongodb://localhost/eduserve", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

mongoose.connection.once("open", () => {
  console.log("connected to database");
});

app.use(
  "/graphql",
  graphqlHttp({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => console.log("server stated on port 4000"));
