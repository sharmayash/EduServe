const mongoose = require('mongoose')

var ObjectId = (id) => mongoose.Types.ObjectId(id);

const ChatSchema = new mongoose.Schema({
  sender: {
    type: ObjectId,
    ref: "user"
  },
  text: {
    type: String,
    trim: true
  },
  timestamp: {
    type: Date,
    trim: true
  }
})

module.exports = mongoose.model("Chat", ChatSchema)