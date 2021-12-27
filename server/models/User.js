const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Create Schema
const UsersSchema = new Schema({
  username: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = Users = mongoose.model('users', UsersSchema)
