const { Queries } = require('./queries')
const { Mutations } = require('./mutations')

const resolvers = {
  Query: { ...Queries },
  Mutation: { ...Mutations }
}

module.exports = resolvers
