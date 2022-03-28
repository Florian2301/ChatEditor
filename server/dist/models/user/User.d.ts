import mongoose from 'mongoose';
interface User {
    username: string;
    email: string;
    admin: boolean;
    date: Date;
}
declare const _default: mongoose.Model<User, {}, {}, {}>;
export default _default;
