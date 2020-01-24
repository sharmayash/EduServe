const cors = require("cors")
const fs = require('fs')
const path = require('path')
const express = require("express")
const compression = require("compression")
const bodyParser = require("body-parser")
const { ApolloServer } = require('apollo-server-express')

const resolvers = require('./graphql/resolvers/index')

const app = express();

app.use(cors());
app.use(compression());

const port = process.env.PORT || 4000;

app.use(bodyParser.json({ limit: "1mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "1mb" }));

let schemas = fs.readdirSync(path.join(__dirname, 'graphql/schemas'))
let typeDefs = [];
schemas.forEach(schema => {
  typeDefs.push(fs.readFileSync(path.join(__dirname, `graphql/schemas/${schema}`), 'utf8'))
})

const graphServer = new ApolloServer({
  typeDefs,
  resolvers
})

graphServer.applyMiddleware({ app });

d = new Date();
app.listen(port, () => console.log(`Server started on ${port} --time<${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}>`));
