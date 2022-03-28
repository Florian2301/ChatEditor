import mongoose, { Types } from 'mongoose';
interface Draft {
    admin: boolean;
    userId: string;
    user: string;
    title: string;
    author: string;
    published: boolean;
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
        color: string;
        position: number;
        tags?: string[];
        repliedmessage?: string[];
    }[];
}
declare const _default: mongoose.Model<Draft, {}, {}, {}>;
export default _default;
