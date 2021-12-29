const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Create Schema
const DraftSchema = new Schema({
  admin: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
    default: false,
  },
  date: {
    type: String,
    required: false,
  },
  language: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  philosopher: [
    {
      name: {
        type: String,
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
    },
  ],
  messages: [
    {
      messagenumber: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      time: {
        type: String,
        required: false,
      },
      color: {
        type: String,
        required: true,
      },
      position: {
        type: Number,
        required: true,
      },
      tags: {
        type: Array,
        required: false,
      },
      repliedmessage: {
        type: Array,
        required: false,
      },
    },
  ],
})

module.exports = Draft = mongoose.model('drafts', DraftSchema)
