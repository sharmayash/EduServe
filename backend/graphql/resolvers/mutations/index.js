const collegeMutations = require('./college')
const studentMutations = require('./student')
const userMutations = require('./user')

module.exports = {
  Mutations: {
    ...collegeMutations,
    ...studentMutations,
    ...userMutations
  }
}