import mongoose, { Types } from 'mongoose';
interface Title {
    chatId: string;
    admin: boolean;
    userId: string;
    user: string;
    chatnumber: number;
    title: string;
    author: string;
    date: string;
    language: string;
    tags: Types.Array<string>;
    description: string;
}
declare const _default: mongoose.Model<Title, {}, {}, {}>;
export default _default;
