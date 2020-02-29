const userQueries  = require('./user')
const collegeQueries = require('./college')

module.exports = {
  Queries: {
    ...userQueries,
    ...collegeQueries
  }
}