import mongoose, { Model } from 'mongoose'

const {Schema} = mongoose
const { model } = mongoose

interface User {
  username: string;
  email: string;
  admin: boolean;
  date: Date
}

//Create Schema
const UserSchema = new Schema<User, Model<User>>({
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

export default model('user', UserSchema)