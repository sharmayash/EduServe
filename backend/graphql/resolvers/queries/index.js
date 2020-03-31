const userQueries  = require('./user')
const collegeQueries = require('./college')
const chatQueries = require('./chat')

module.exports = {
  Queries: {
    ...userQueries,
    ...collegeQueries,
    ...chatQueries
  }
}