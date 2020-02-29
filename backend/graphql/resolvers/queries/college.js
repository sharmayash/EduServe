const College = require("models/College")

module.exports = {

  async colleges(parent, args, req) {
    return College.find({})
  },

  async getAllCategories(_, args, req) {
    let categoryArr = []

    let tempArr = []

    const allcolleges = await College.find({}, "collegename coursesOffered")

    await allcolleges.map(cllg => {
      cllg.coursesOffered.map(course => {
        tempArr.push({
          cllgName: cllg.collegename,
          category: course.category
        })
      })
    })

    tempArr.map(x => {
      if (!categoryArr.some(item => item.catName === x.category)) {
        // if stream not exist in category array
        categoryArr.push({ catName: x.category, noOfColleges: 1 })
        // console.log(x.cllgName, x.category)
      } else {
        // console.log(x.cllgName, x.category, "ELSE PART")
        // FIXME: College count krne ka logic
      }
    })

    return categoryArr
  }
}