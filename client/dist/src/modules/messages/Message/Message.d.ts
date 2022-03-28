/// <reference types="react" />
import './Message.css';
declare const Message: (props: {
    position?: string;
    positionedit?: string;
    color?: string;
    coloredit?: string;
    number: number;
    name: string;
    text: string;
    chatid: string;
    chatnumber: number | string;
    messageId: string;
    userid: string;
    scroll: any;
    repliedmessage: string[];
    replyTo: any;
    scrollTo: any;
}) => JSX.Element;
export default Message;
