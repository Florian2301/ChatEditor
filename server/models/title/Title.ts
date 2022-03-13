import mongoose, { Types, Model } from 'mongoose'

const {Schema} = mongoose
const { model } = mongoose

interface Title {
  chatId: string,
  admin: boolean,
  userId: string,
  user: string,
  chatnumber: number,
  title: string,
  author: string,
  date: string,
  language: string,
  tags: Types.Array<string>,
  description: string
}

//Create Schema
const TitleSchema = new Schema<Title, Model<Title>>({
  chatId: {
    type: String,
    required: true,
  },
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
  chatnumber: {
    type: Number,
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
  date: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  tags: [{
    type: Array,
    required: true,
  }],
  description: {
    type: String,
    required: true,
  },
})

export default model('title', TitleSchema)