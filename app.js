const fs = require("fs")
const path = require("path")
const cors = require("cors")
const express = require("express")
const bodyParser = require("body-parser")
const compression = require("compression")
const { ApolloServer } = require("apollo-server-express")
// const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
require('dotenv').config()    // For .env files

require('./db/mongoose')    // DB connection initialize
const { authenticate } = require('./middleware/authenticate')

const resolvers = require("./graphql/resolvers/index")

const app = express()

// SECURE HEADERS
app.use(helmet({
  frameguard: true, //  clickjacking  (embedding things on site)
  xssFilter: true,  // cross site scripting
  noSniff: true,  // no data pack sniffing
  hidePoweredBy: true // to hide our tech stack
}))

// TODO: have to use mongo store for this
// const loginLimiter = rateLimit({
//   max: 5,   // 5 tries
//   windowMs: 30 * 60 * 1000,   // 30 min
//   message:
//     "Too many login tries, please try again after 30 minutes"
// })

// app.use('/login', loginLimiter)

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
//   message:
//     "Too many requests created from this IP, please try again after 15 minutes"
// });

// app.use(limiter)  // apply to all requests

app.use(cors())

app.use(compression())


const port = process.env.PORT || 4000

app.use(bodyParser.json({ limit: "1mb" }))
app.use(bodyParser.urlencoded({ extended: false, limit: "1mb" }))

app.use(authenticate)

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
    `Backend Server started on ${port} --time<${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}>`
  )
)
