import './WriteMessage.css';
import React, { Suspense, useRef, useState } from 'react';
import { insertToNewPosition, repliedMessage } from './Functions';
import { updateDraft, writeMessage } from '../../../redux/actions/draft/draft';
import Button from '../../../elements/Button/Button';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../redux/hooks/useTypeSelector';
import { v4 as uuidv4 } from 'uuid';
//React.lazy
const EmojiPicker = React.lazy(() => import('../../../elements/Emoji/EmojiPicker'));
const WriteMessage = (props) => {
    // state
    const dispatch = useDispatch();
    const draft = useTypedSelector((state) => state.draft);
    const user = useTypedSelector((state) => state.user);
    // Refs
    const messageRef = useRef(null);
    const numberRef = useRef(null);
    // UseState
    const [write, setWrite] = useState(false);
    const [reply, setReply] = useState(false);
    // dropdown box to write a message
    function newMessage() {
        dispatch(writeMessage(!write));
        setWrite(!write);
    }
    // get the name from click on button of philosopher
    function getPhil(name, color) {
        // message must be written
        const messageRefValue = messageRef.current !== null ? messageRef.current.value : null;
        if (!messageRefValue) {
            alert('Write a message and then send it');
            return;
        }
        //reply to a message
        if (reply) {
            replyToMessage(name, color);
        }
        else {
            //send the new message
            sendMessage(name, color);
        }
    }
    // catches key-event (escape)
    function keyEventTextarea(event) {
        if (event.code === 'Escape') {
            // clear data
            messageRef.current !== null ? messageRef.current.value = '' : null;
            numberRef.current !== null ? numberRef.current.value = '' : null;
            setReply(false);
            setWrite(false);
            dispatch(writeMessage(false));
        }
    }
    // function to send a new message (with new number or insert in between other messages)
    function sendMessage(name, color) {
        // for numbers
        let number = draft.messages.length;
        number++;
        const numberRefValue = numberRef.current !== null ? numberRef.current.value : '0';
        const replaceMessageNumber = parseInt(numberRefValue); // string into number
        let sortMessage = replaceMessageNumber + 1;
        //for message content
        const allMessages = draft.messages;
        const sendMessage = messageRef.current !== null ? messageRef.current.value : '';
        const newMessage = messageRef.current !== null ? messageRef.current.value : '';
        let newMessagesArray;
        //for message position
        const philosopher = draft.philosopher;
        let positionPhil;
        if (name === philosopher[0].name) {
            positionPhil = 1;
        }
        else {
            positionPhil = 2;
        }
        // check if user selected a different number or set default number for message
        if (draft.messages.length < replaceMessageNumber) {
            // set default number
            // save new message at the end of the messages array
            newMessagesArray = draft.messages;
            newMessagesArray.push({
                messagenumber: number,
                name: name,
                text: sendMessage,
                color: color,
                position: positionPhil,
                repliedmessage: [],
            });
            props.scrollTo(false);
        }
        else if (draft.messages.length === 1) {
            // prevents second message replaces first message, because numberRef is still "1" after sending first message
            newMessagesArray = draft.messages;
            newMessagesArray.push({
                messagenumber: 2,
                name: name,
                text: sendMessage,
                color: color,
                position: positionPhil,
                repliedmessage: [],
            });
            props.scrollTo(false);
        }
        else {
            // function to insert message to a new position in chatflow
            const Insert = insertToNewPosition(allMessages, newMessage, sortMessage, replaceMessageNumber, positionPhil, name, color);
            newMessagesArray = Insert;
            props.scrollTo(replaceMessageNumber);
        }
        // update draft with default number/new numbers and new message
        dispatch(updateDraft(draft.draftId, draft.title, draft.author, draft.published, draft.date, draft.language, draft.tags, draft.description, draft.philosopher, newMessagesArray, draft.admin));
        // clear data
        messageRef.current !== null ? messageRef.current.value = '' : null;
        number + 1;
        numberRef.current !== null ? numberRef.current.value = number.toString() : null; // prevents second message replaces first message, because numberRef is still "1" after sending first message
        setReply(false);
    }
    // function to reply to a message
    function replyToMessage(name, color) {
        // for number
        let number = draft.messages.length;
        number++;
        //for message position
        const philosopher = draft.philosopher;
        let positionPhil;
        if (name === philosopher[0].name) {
            positionPhil = 1;
        }
        else {
            positionPhil = 2;
        }
        // find message to reply to and save as repliedmessage
        const numberRefValue = numberRef.current !== null ? numberRef.current.value : '0';
        const messagenumber = parseInt(numberRefValue);
        const allMessages = draft.messages;
        const sendMessage = messageRef.current !== null ? messageRef.current.value : '';
        const messagesWithReply = repliedMessage(allMessages, messagenumber, sendMessage, number, positionPhil, name, color);
        // update draft with new message and replied message
        dispatch(updateDraft(draft.draftId, draft.title, draft.author, draft.published, draft.date, draft.language, draft.tags, draft.description, draft.philosopher, messagesWithReply, user.admin));
        // to scroll to message with new number
        props.defaultScroll();
        // clear data
        messageRef.current !== null ? messageRef.current.value = '' : null;
        numberRef.current !== null ? numberRef.current.value = '' : null;
        setReply(false);
    }
    function addEmoji(emoji) {
        messageRef.current !== null ? messageRef.current.value += emoji : null;
    }
    // ----------------------------------- RETURN --------------------------------------------------------------------------
    return (React.createElement("div", { className: window.innerWidth <= 1000 ? 'write-message-mobile' : 'write-message' },
        React.createElement("div", null,
            React.createElement("p", { id: "write-message-collapse", onClick: () => newMessage() }, write ? 'view full chatbox' : 'write a message')),
        React.createElement("div", null, write ? (React.createElement("div", { className: "number-textarea" },
            reply ? (React.createElement("label", { className: "label-select-number" },
                React.createElement("span", { id: "replytomessage", onClick: () => setReply(!reply) }, "insert as #"),
                "reply to #",
                React.createElement("select", { className: "write-message-select-number", defaultValue: draft.messages.length, ref: numberRef }, draft.messages.map((message) => {
                    return (React.createElement("option", { value: message.messagenumber, key: uuidv4() }, message.messagenumber));
                })))) : (
            /* either send as latest message or insert to a new position in the chatflow */
            React.createElement("label", { className: "label-select-number" },
                React.createElement("span", { id: "replytomessage", onClick: () => setReply(!reply) }, "reply to #"),
                "insert as #",
                React.createElement("select", { ref: numberRef, className: "write-message-select-number", defaultValue: draft.messages.length + 1 },
                    draft.messages.map((message) => {
                        return (React.createElement("option", { value: message.messagenumber, key: uuidv4() }, message.messagenumber));
                    }),
                    React.createElement("option", { value: draft.messages.length + 1 }, draft.messages.length + 1)))),
            React.createElement("textarea", { className: "textarea-write-message", ref: messageRef, placeholder: 'write your message here', onKeyDown: keyEventTextarea, rows: window.innerWidth <= 1000 ? 4 : 5 }),
            React.createElement(Suspense, { fallback: React.createElement("div", null, "Loading...") },
                React.createElement(EmojiPicker, { getEmoji: addEmoji })),
            React.createElement("div", { className: "writemessage-btn" }, draft.philosopher.map((phil) => {
                return (React.createElement(Button, { key: uuidv4(), className: "button-chat-Phil", id: phil.name, label: phil.name, handleClick: () => getPhil(phil.name, phil.color) }));
            })))) : null)));
};
export default WriteMessage;
//# sourceMappingURL=WriteMessage.js.map