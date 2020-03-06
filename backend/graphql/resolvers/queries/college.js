const College = require("../../../models/College")

module.exports = {

  async colleges(parent, args, req) {
    return College.find({})
  },

  async getAllCareers(_, args, req) {

    const categories = await College
      .find({ coursesOffered: { elemMatch: { category: args.category } } })

  }
}