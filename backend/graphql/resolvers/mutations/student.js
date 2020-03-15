const Student = require("models/Student")

module.exports = {
  async createStudentProfile(
    parent,
    { user, username, age, mobileNo, state, bio, education },
    req
  ) {
    try {
      let newProfile = new Student({
        user,
        username,
        age,
        mobileNo,
        state,
        bio,
        education
      })
      const result = await newProfile.save()
      return result
    } catch (error) {
      throw error
    }
  },
}