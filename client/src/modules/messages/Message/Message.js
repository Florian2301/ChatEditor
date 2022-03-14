import React, { useRef, useState } from 'react';
import './Message.css';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../redux/hooks/useTypeSelector.js';
import { updateChat } from '../../../redux/actions/chat/chat.js';
import { editDraft, deleteDraftMessage, updateDraft, } from '../../../redux/actions/draft/draft.js';
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
        if (draftEditMode) {
            selectedNumber = parseInt(numberRef.current ? numberRef.current.value : '0');
        }
        // message must have a content
        if (!message || message === null) {
            alert('Message cannot be blank');
            return;
        }
        // check if draft and update only text
        if (draft.draftEditmode && selectedNumber === number) {
            dispatch(editDraft(chatId, number, message));
            props.scrollTo(number);
        }
        // check if draft and update message and selected number
        if (draft.draftEditmode && selectedNumber !== number) {
            setNewNumberAndEditDraft(selectedNumber, message);
        }
        if (chat.chatEditmode) {
            // check if chat and update only text
            dispatch(updateChat(chatId, number, message));
            props.scrollTo(number);
        }
    }
    // find messages and change the messagenumber
    function setNewNumberAndEditDraft(selectednumber, editedMessage) {
        const newMessageNumber = selectednumber;
        const oldMessageNumber = props.number;
        let shiftMessage = draft.messages[0]; // variable has te be implemented
        let changeMessage = draft.messages[0]; // variable has te be implemented
        let messages = draft.messages;
        let indexShift = 0;
        let indexChange = 0;
        let findIndexShift = draft.messages[0]; // variable has te be implemented
        let findIndexChange = draft.messages[0]; // variable has te be implemented
        //changing messagenumber descending
        if (oldMessageNumber > newMessageNumber) {
            messages.map((message) => {
                //find old message, which will be shifted
                if (message.messagenumber === newMessageNumber) {
                    findIndexShift = message;
                    shiftMessage = {
                        _id: message._id,
                        messagenumber: newMessageNumber + 1,
                        name: message.name,
                        text: message.text,
                        time: message.time,
                        color: message.color,
                        tags: message.tags,
                        position: message.position,
                        repliedmessage: message.repliedmessage,
                    };
                }
                // find message to be changed and set new number
                if (message.messagenumber === oldMessageNumber) {
                    findIndexChange = message;
                    changeMessage = {
                        _id: message._id,
                        messagenumber: newMessageNumber,
                        name: message.name,
                        text: editedMessage,
                        time: message.time,
                        color: message.color,
                        tags: message.tags,
                        position: message.position,
                        repliedmessage: message.repliedmessage,
                    };
                }
                return { findIndexShift, findIndexChange, shiftMessage, changeMessage };
            });
        }
        //changing messagenumber ascending
        if (oldMessageNumber < newMessageNumber) {
            messages.map((message) => {
                //find old message, which will be shifted
                if (message.messagenumber === newMessageNumber) {
                    findIndexShift = message;
                    shiftMessage = {
                        _id: message._id,
                        messagenumber: newMessageNumber - 1,
                        name: message.name,
                        text: message.text,
                        time: message.time,
                        color: message.color,
                        tags: message.tags,
                        position: message.position,
                        repliedmessage: message.repliedmessage,
                    };
                }
                // find message to be changed and set new number
                if (message.messagenumber === oldMessageNumber) {
                    findIndexChange = message;
                    changeMessage = {
                        _id: message._id,
                        messagenumber: newMessageNumber,
                        name: message.name,
                        text: editedMessage,
                        time: message.time,
                        color: message.color,
                        tags: message.tags,
                        position: message.position,
                        repliedmessage: message.repliedmessage,
                    };
                }
                return { findIndexShift, findIndexChange, shiftMessage, changeMessage };
            });
        }
        // find index of shifted and changed message
        indexShift = messages.indexOf(findIndexShift);
        indexChange = messages.indexOf(findIndexChange);
        // replace shifted and changed message
        messages.splice(indexShift, 1, shiftMessage);
        messages.splice(indexChange, 1, changeMessage);
        // function to sort the messages by number and set back input "change number"
        sortMessagesNewNumber(messages, newMessageNumber);
    }
    //function to sort all message and give them a new number in order
    function sortMessagesNewNumber(messages, newMessageNumber) {
        let number = 1;
        let newNumbers;
        let newMessages = [];
        // function to compare messagenumbers
        function compare(a, b) {
            if (a.messagenumber < b.messagenumber) {
                return -1;
            }
            if (a.messagenumber > b.messagenumber) {
                return 1;
            }
            return 0;
        }
        //sort result from "setNewNumber()"
        messages.sort(compare);
        //set new number ascending to all messages
        messages.map((message) => {
            newNumbers = {
                _id: message._id,
                messagenumber: number++,
                name: message.name,
                text: message.text,
                time: message.time,
                color: message.color,
                tags: message.tags,
                position: message.position,
                repliedmessage: message.repliedmessage,
            };
            newMessages.push(newNumbers);
            return newMessages;
        });
        //update draft in database
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
        props.repliedmessage[0] ? (React.createElement("div", { className: "repliedmessage" },
            React.createElement("p", { className: "replydetails" },
                React.createElement("span", { className: "replyspan", id: "replyspan-number", onClick: () => props.replyTo(props.repliedmessage[0]) },
                    "# ",
                    props.repliedmessage[0]),
                ' ',
                "from",
                ' ',
                React.createElement("span", { className: `replyspan color-${props.repliedmessage[1]}` }, props.repliedmessage[2]),
                ":"),
            React.createElement("p", { className: "replytext" }, props.repliedmessage[3]))) : null,
        React.createElement("div", { className: 'message-header' },
            React.createElement("p", { className: `message-name ${user.loggedIn ? props.coloredit : props.color}` },
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
            React.createElement("div", { ref: editRef, className: "message-text" }, props.text))));
};
export default Message;
//# sourceMappingURL=Message.js.map