const mongoose = require("mongoose")
const { compareSync } = require('bcryptjs')

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    password: {
      type: String,
      trim: true
    },
    googleLogin: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

UserSchema.pre('validate', function (next) {
  const { password, googleLogin } = this
  if (!googleLogin && compareSync("", password)) {
    next(new Error("password is required."))
  } else {
    next()
  }
})

module.exports = mongoose.model("User", UserSchema)
