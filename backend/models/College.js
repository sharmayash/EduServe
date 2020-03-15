const mongoose = require("mongoose")

const TYPE = (type, maxlength) => {
  return {
    type,
    maxlength,
    required: true,
    trim: true
  }
}

const CollegeSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  careers: [{
    type: String,
  }],
  name: TYPE(String, 40),
  state: TYPE(String, 40),
  establishedYear: TYPE(Number, 4),
  contactNo: TYPE(Number, 10),
  coursesOffered: [
    {
      name: TYPE(String, 25),
      fees: TYPE(Number, 6),
      type: TYPE(String, 25),
      duration: TYPE(String, 15),
      streams: [
        {
          name: TYPE(String, 30)
        }
      ]
    }
  ]
  // TODO: bio: {}, ==> this will be markdown leaving it,
})

module.exports = mongoose.model("college", CollegeSchema)
