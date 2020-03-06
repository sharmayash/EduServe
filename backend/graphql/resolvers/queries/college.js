const College = require("../../../models/College")
const Career = require("../../../models/Career")

module.exports = {

  async colleges(parent, args, req) {
    return College.find({})
  },

  async getAllCareers(_, args, req) {

    const ans = await Career.aggregate([
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
          _id: 1,
          n_colleges: { $size: "$colleges" }
        }
      }
    ])
    
    return ans
  }

}