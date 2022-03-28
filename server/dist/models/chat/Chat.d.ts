import mongoose, { Types } from 'mongoose';
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
    philosopher: {
        name: string;
        color: string;
    }[];
    messages: {
        messagenumber: number;
        name: string;
        text: string;
        time?: string;
        tags?: string[];
        color: string;
        position: number;
        repliedmessage?: string[];
    }[];
    comments: {
        name: string;
        date: string;
        text: string;
        author: boolean;
    }[];
}
declare const _default: mongoose.Model<Chat, {}, {}, {}>;
export default _default;
