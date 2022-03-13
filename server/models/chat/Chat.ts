import mongoose, { Types, Model } from 'mongoose'

const {Schema} = mongoose
const { model } = mongoose


interface Chat {
  admin: boolean;
  userId: string;
  user: string;
  chatnumber: number;
  title: string;
  titleId: string;
  author: string;
  date: string;
  language: string;
  tags: Types.Array<string>;
  description: string;
  philosopher: { name: string, color: string }[];
  messages: {
    messagenumber: number,
    name: string,
    text: string,
    time?: string,
    tags?: string[],
    color: string,
    position: number,
    repliedmessage?: string[],
  }[];
  comments: {
    name: string,
    date: string,
    text: string,
    author: boolean,
  }[];
}

//Create Schema
const ChatSchema = new Schema<Chat, Model<Chat>>({
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
  titleId: {
    type: String,
    required: false,
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
      tags: [{
        type: Array,
        required: false,
      }],
      color: {
        type: String,
        required: true,
      },
      position: {
        type: Number,
        required: true,
      },
      repliedmessage: [{
        type: Array,
        required: false,
      }],
    },
  ],
  comments: [
    {
      name: {
        type: String,
        required: false,
      },
      date: {
        type: String,
        required: false,
      },
      text: {
        type: String,
        required: false,
      },
      author: {
        type: Boolean,
        required: false,
      },
    },
  ],
})

export default model('chats', ChatSchema)
