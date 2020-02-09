const fs = require("fs")
const path = require("path")
const cors = require("cors")
const express = require("express")
const bodyParser = require("body-parser")
const compression = require("compression")
const { ApolloServer } = require("apollo-server-express")
const rateLimit = require('express-rate-limit')

require('./db/mongoose')    // DB connection initialize

const resolvers = require("./graphql/resolvers/index")

const app = express()

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message:
    "Too many accounts created from this IP, please try again after 15 minutes"
});

app.use(limiter)  // apply to all requests

app.use(cors())

app.use(compression())

const port = process.env.PORT || 4000

app.use(bodyParser.json({ limit: "1mb" }))
app.use(bodyParser.urlencoded({ extended: false, limit: "1mb" }))

let schemas = fs.readdirSync(path.join(__dirname, "graphql/schemas"))
let typeDefs = []
schemas.forEach(schema => {
	typeDefs.push(
		fs.readFileSync(path.join(__dirname, `graphql/schemas/${schema}`), "utf8")
	)
})

const graphServer = new ApolloServer({
	typeDefs,
	resolvers
})

graphServer.applyMiddleware({ app })

d = new Date()
app.listen(port, () =>
	console.log(
		`Server started on ${port} --time<${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}>`
	)
)
