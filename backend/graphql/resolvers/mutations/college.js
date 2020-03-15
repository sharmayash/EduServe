const College = require("models/College")

module.exports = {
  async newCollege(
    parent,
    {
      admin,
      collegename,
      establishedYear,
      contactNo,
      state,
      bio,
      coursesOffered
    },
    req
  ) {
    try {
      let newCollege = new College({
        admin,
        collegename,
        establishedYear,
        contactNo,
        state,
        bio,
        coursesOffered
      })
      const result = await newCollege.save()
      return result
    } catch (error) {
      throw error
    }
  }
}