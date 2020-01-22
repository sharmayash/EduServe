const cors = require("cors")
const express = require("express")
const { graphqlDBConn } = require("./db/mongoose")
// schema = require("./graphql/schema/schema")
const graphqlHttp = require("express-graphql")
const compression = require("compression")
const importSchema = require('graphql-import').importSchema
const makeExecutableSchema = require('graphql-tools').makeExecutableSchema
const bodyParser = require("body-parser")

const graphQlResolver = require('./graphql/resolvers/index')

const app = express();

app.use(cors());
app.use(compression());

const port = process.env.PORT || 4000;

app.use(bodyParser.json({ limit: "1mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "1mb" }));

const start = async () => {
  try {
    const typeDefs = await importSchema('./graphql/schema/schema.graphql');
    const schema = makeExecutableSchema({ typeDefs, graphQlResolver })
    app.use(
      "/graphql",
      graphqlHttp({
        schema,
        graphiql: true
      })
    );
  } catch (error) {
    console.log('something')
  }
}

start();
d = new Date();
app.listen(port, () => console.log(`Server started on ${port} --time<${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}>`));
