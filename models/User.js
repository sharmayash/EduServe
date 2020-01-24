const mongoose = require("mongoose");

const { graphqlDBConn } = require('../db/mongoose')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  name: {
    type: String,
    trim: true,
    required: true
  },
  age: {
    type: Number,
    trim: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    required: true
  },
}, {
  timestamps: true
});

module.exports = graphqlDBConn.model("User", UserSchema);
