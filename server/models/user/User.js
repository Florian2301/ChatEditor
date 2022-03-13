import mongoose from 'mongoose';
const { Schema } = mongoose;
const { model } = mongoose;
//Create Schema
const UserSchema = new Schema({
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
});
export default model('user', UserSchema);
//# sourceMappingURL=User.js.map