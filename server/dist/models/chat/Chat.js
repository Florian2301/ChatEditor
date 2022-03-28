import mongoose from 'mongoose';
const { Schema } = mongoose;
const { model } = mongoose;
//Create Schema
const ChatSchema = new Schema({
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
});
export default model('chats', ChatSchema);
//# sourceMappingURL=Chat.js.map