const mongoose = require('mongoose')

var ObjectId = (id) => mongoose.Types.ObjectId(id);

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  chats: [{
    type: ObjectId,
    ref: "chat"
  }],
  members: [{
    type: ObjectId, ref: "user"
  }]
}, {
  timestamps: true
})

module.exports = mongoose.model("Room", RoomSchema)