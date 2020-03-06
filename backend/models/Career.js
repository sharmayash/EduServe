const mongoose = require("mongoose")

const TYPE = (type, maxlength) => {
  return {
    type,
    maxlength,
    required: true,
    trim: true,
    unique: true
  }
}

const CareerSchema = new mongoose.Schema({
  name: TYPE(String, 25)
})

module.exports = mongoose.model("career", CareerSchema)
