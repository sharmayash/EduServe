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
const socketio = require('socket.io')
require('app-module-path').addPath(__dirname)   // For creating better require paths

require('./db/mongoose')    // DB connection initialize
const { authenticate } = require('./middleware/authenticate')

const resolvers = require("./graphql/resolvers/index")

const app = express()

// TODO: Whitelist flutter application for emulator / real device
// const whitelist = [
//   'http://localhost:8080',
//   'http://localhost:8081',
//   'http://localhost:1234',
//   'http://localhost:4000',
//   'http://192.168.1.7:8080',
// ];

// const corsOptions = {
//   credentials: true, // This is important.
//   origin: (origin, callback) => {
//     if (whitelist.includes(origin) || origin === undefined)
//       return callback(null, true)
//     callback(new Error('Not allowed by CORS'));
//   }
// }

// app.use(cors(corsOptions));
app.use(cors())

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
  resolvers,
  context: ({ req }) => { 
    return {
      req
    }
  }
})

graphServer.applyMiddleware({ app })

d = new Date()
const server = app.listen(port, () =>
  console.log(
    `Backend Server started on ${port} --time<${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}>`
  )
)

let io = socketio.listen(server)
const chatServer = require('./chat-server')
chatServer.init(io)

const Room = require('./models/Room')
const User = require('./models/User')
const Chat = require('./models/Chat')
const College = require('./models/College')
const Career = require('./models/Career')
const mongoose = require('mongoose')

app.get('/test', async (req, res) => {

  let ans = await Career.aggregate([
    {
      $lookup: {
        from: "colleges",
        localField: "name",
        foreignField: "careers",
        as: "colleges",
      }
    },
    {
      $project: {
        name: 1,
        n_colleges: { $size: "$colleges" }
      }
    }
  ])

  res.send(ans)

})
