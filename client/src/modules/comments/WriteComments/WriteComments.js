import './WriteComments.css';
import React, { Suspense, useRef, useState } from 'react';
import Button from '../../../elements/Button/Button.js';
import { updateChatDetails } from '../../../redux/actions/chat/chat.js';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../redux/hooks/useTypeSelector.js';
import { writeComment } from '../../../redux/actions/user/user.js';
import { writeMessage } from '../../../redux/actions/draft/draft.js';
//import EmojiPicker from '../../../elements/Emoji/EmojiPicker.js'
// React.lazy
const EmojiPicker = React.lazy(() => import('../../../elements/Emoji/EmojiPicker.js'));
const WriteComments = () => {
    // state
    const dispatch = useDispatch();
    const chat = useTypedSelector((state) => state.chat);
    const user = useTypedSelector((state) => state.user);
    // date
    const date = new Date();
    // refs
    const commentRef = useRef(null);
    const nameRef = useRef(null);
    // useState
    const [write, setWrite] = useState(false);
    // dropdown box to write a comment
    function newComment() {
        dispatch(writeComment(!write));
        setWrite(!write);
    }
    // catches key-event (esc/enter)
    function keyEventInput(event) {
        if (event.code === 'Enter') {
        }
        if (event.code === 'Escape') {
            nameRef.current !== null ? nameRef.current.value = '' : null;
        }
    }
    function keyEventTextarea(event) {
        if (event.code === 'Escape') {
            commentRef.current !== null ? commentRef.current.value = '' : null;
        }
    }
    // send the comment
    function sendComment() {
        const name = nameRef.current !== null ? nameRef.current.value : null;
        const comment = commentRef.current !== null ? commentRef.current.value : null;
        let authorOfChat;
        //check if name or comment is set
        if (!name) {
            alert('set a name and then send it');
            return;
        }
        if (!comment) {
            alert('Write a comment and then send it');
            return;
        }
        if (!user.loggedIn) {
            authorOfChat = false;
        }
        else {
            authorOfChat = true;
        }
        // save comment as new object with date
        const dateOfComment = date.toLocaleDateString('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
        const comments = chat.comments;
        comments.push({
            name: name,
            date: dateOfComment,
            text: comment,
            author: authorOfChat,
        });
        // save comments in chat
        dispatch(updateChatDetails(chat.chatId, chat.chatnumber, chat.title, chat.author, chat.date, chat.language, chat.tags, chat.description, chat.admin, comments));
        dispatch(writeMessage(true));
        // clear data
        commentRef.current !== null ? commentRef.current.value = '' : null;
    }
    function addEmoji(emoji) {
        commentRef.current !== null ? commentRef.current.value += emoji : null;
    }
    // ----------------------------------- RETURN --------------------------------------------------------------------------
    return (React.createElement("div", { className: window.innerWidth <= 1000 ? 'write-comments-mobile' : 'write-comments' },
        React.createElement("div", null,
            React.createElement("p", { id: "write-comments-collapse", onClick: () => newComment() }, write ? 'view full chatbox' : 'write a comment')),
        React.createElement("div", null, write ? (React.createElement("div", { className: "section-write-comment" },
            React.createElement("div", { className: "send-write-comment" },
                React.createElement("input", { className: "input-write-comment", type: "text", ref: nameRef, placeholder: user.loggedIn ? chat.author : 'name', defaultValue: user.loggedIn ? chat.author : 'name', onKeyDown: keyEventInput }),
                React.createElement(Button, { className: "btn-write-comment", label: "send", handleClick: () => sendComment() })),
            React.createElement("div", { className: "column-write-comment" },
                React.createElement("textarea", { className: "textarea-write-comment", ref: commentRef, placeholder: 'write your comment here', onKeyDown: keyEventTextarea, rows: window.innerWidth <= 1000 ? 4 : 5 }),
                React.createElement(Suspense, { fallback: React.createElement("div", null, "Loading...") },
                    React.createElement(EmojiPicker, { getEmoji: addEmoji }))))) : null)));
};
export default WriteComments;
//# sourceMappingURL=WriteComments.js.map