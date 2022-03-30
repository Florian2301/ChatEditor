import './Message.css';
import React, { useRef, useState } from 'react';
import { deleteDraftMessage, editDraft, updateDraft, } from '../../../redux/actions/draft/draft';
import { selectNewNumberAndSortMessages } from "./Functions";
import { updateChat } from '../../../redux/actions/chat/chat';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../redux/hooks/useTypeSelector';
import { v4 as uuidv4 } from 'uuid';
const Message = (props) => {
    // state
    const dispatch = useDispatch();
    const draft = useTypedSelector((state) => state.draft);
    const chat = useTypedSelector((state) => state.chat);
    const user = useTypedSelector((state) => state.user);
    // refs
    const messageRef = useRef(null);
    const numberRef = useRef(null);
    const editRef = useRef(null);
    // useState
    const [editmode, setEditmode] = useState(false);
    // editmode variable
    const draftEditMode = draft.draftEditmode;
    const chatEditmode = chat.chatEditmode;
    // sets editmode to edit message and scrolls message into view
    function clickEdit() {
        setEditmode(!editmode);
        setTimeout(() => {
            editRef.current ?
                editRef.current.scrollIntoView({
                    block: 'end',
                    behavior: 'smooth',
                }) : null;
        }, 500);
    }
    // catches key-event (esc/enter)
    function keyEventMessage(event) {
        if (event.code === 'Escape') {
            // clear data
            messageRef.current ? messageRef.current.value = '' : null;
            if (draft.draftEditmode) {
                numberRef.current ? numberRef.current.value = '' : null;
            }
            setEditmode(!editmode);
        }
    }
    // function save changes of message
    function editMessage() {
        const message = messageRef.current ? messageRef.current.value : null;
        const number = props.number;
        const chatId = props.chatid;
        let selectedNumber = 0;
        // check if draftmode then get number select element
        if (draftEditMode) {
            selectedNumber = parseInt(numberRef.current ? numberRef.current.value : '0');
        }
        // check: message must have a content
        if (!message || message === null) {
            alert('Message cannot be blank');
            return;
        }
        // check if draftmode and update only text if messagenumber has not been changed
        if (draft.draftEditmode && selectedNumber === number) {
            dispatch(editDraft(chatId, number, message));
            props.scrollTo(number);
        }
        // check if draftmode and update message if a new messagenumber has been selected
        if (draft.draftEditmode && selectedNumber !== number) {
            const newMessageNumber = selectedNumber;
            const oldMessageNumber = props.number;
            let messages = draft.messages;
            let shiftMessage = draft.messages[0]; // variable has to be implemented
            let changeMessage = draft.messages[0]; // variable has to be implemented
            let findIndexShift = draft.messages[0]; // variable has to be implemented
            let findIndexChange = draft.messages[0]; // variable has to be implemented
            // function to set a new number to a message and change text if text has been changed
            // and sort messages in new order
            const newMessages = selectNewNumberAndSortMessages(message, newMessageNumber, oldMessageNumber, shiftMessage, changeMessage, messages, findIndexShift, findIndexChange);
            // update draft in database
            dispatch(updateDraft(draft.draftId, draft.title, draft.author, draft.published, draft.date, draft.language, draft.tags, draft.description, draft.philosopher, newMessages, draft.admin));
            // to scroll to message with new number
            setTimeout(() => {
                props.scrollTo(newMessageNumber);
            }, 1000);
            // clear data
            messageRef.current ? messageRef.current.value = '' : null;
            numberRef.current ? numberRef.current.value = '' : null;
            setEditmode(!editmode);
        }
        // check if chatmode and update only text of message
        if (chatEditmode) {
            dispatch(updateChat(chatId, number, message));
            props.scrollTo(number);
        }
    }
    //delete a single message
    function deleteMessage() {
        let answer = window.confirm('Delete this message?');
        if (answer) {
            const chatId = props.chatid;
            const messageId = props.messageId;
            let messages = draft.messages;
            let messageNewNumber;
            let newMessages = [];
            let messagenumber = 1;
            // find the message to be deleted and filter out
            messages.map((message) => {
                if (message._id !== messageId) {
                    // set a new messagenumber to all messages
                    messageNewNumber = {
                        _id: message._id,
                        messagenumber: messagenumber++,
                        name: message.name,
                        text: message.text,
                        time: message.time,
                        color: message.color,
                        tags: message.tags,
                        position: message.position,
                        repliedmessage: message.repliedmessage,
                    };
                    // array with all messages except deleted one
                    newMessages.push(messageNewNumber);
                }
                return newMessages;
            });
            dispatch(deleteDraftMessage(chatId, newMessages));
        }
        else {
            return;
        }
    }
    //---------------- RENDER ------------------------------------------
    return (React.createElement("div", { className: `message ${user.loggedIn ? props.positionedit : props.position}`, id: props.messageId, ref: props.scroll },
        props.repliedmessage[0] ? ( // check if there is a replied message connected with the current message
        React.createElement("div", { className: "repliedmessage" },
            React.createElement("p", { className: "replydetails" },
                React.createElement("span", { className: "replyspan", id: "replyspan-number", onClick: () => props.replyTo(props.repliedmessage[0]) },
                    "# ",
                    props.repliedmessage[0],
                    " "),
                ' ',
                "from",
                ' ',
                React.createElement("span", { className: `replyspan color-${props.repliedmessage[1]}` },
                    props.repliedmessage[2],
                    " "),
                ":"),
            React.createElement("p", { className: "replytext" }, props.repliedmessage[3]))) : null,
        React.createElement("div", { className: 'message-header' },
            React.createElement("p", { className: `message-name ${props.color}` },
                props.name,
                ":"),
            user.userId === props.userid ? (!editmode ? (React.createElement("p", { className: `edit-message-dropdown ${editmode ? 'edit-message-dropdown-active' : null}`, onClick: () => clickEdit() }, "Edit")) : (React.createElement("p", { className: `edit-message-dropdown ${editmode ? 'edit-message-dropdown-active' : null}`, onClick: () => editMessage() }, "Save"))) : null,
            user.userId === props.userid && draft.draftEditmode ? (React.createElement("p", { className: "edit-message-delete", onClick: deleteMessage }, "Delete")) : null,
            React.createElement("div", { className: "message-number" },
                "# ",
                props.number)),
        editmode ? (React.createElement("div", { className: "edit-message" },
            draft.draftEditmode ? (React.createElement("div", { className: "edit-number" },
                React.createElement("label", { className: "label-edit-number" }, "change to #"),
                React.createElement("select", { className: "select-edit-number", ref: numberRef, defaultValue: props.number, onKeyDown: keyEventMessage }, draft.messages.map((message) => {
                    return (React.createElement("option", { value: message.messagenumber, key: uuidv4() }, message.messagenumber));
                })))) : null,
            React.createElement("textarea", { className: "edit-message-textarea", ref: messageRef, onKeyDown: keyEventMessage, defaultValue: props.text }))) : null,
        React.createElement("div", null,
            React.createElement("div", { ref: editRef, className: "message-text" /* editRef to scroll message into view when editting*/ }, props.text))));
};
export default Message;
//# sourceMappingURL=Message.js.map