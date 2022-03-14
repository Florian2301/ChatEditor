import React from 'react';
import './Comments.css';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../redux/hooks/useTypeSelector.js';
import { updateChatDetails } from '../../../redux/actions/chat/chat.js';
const Comments = (props) => {
    // state
    const dispatch = useDispatch();
    const chat = useTypedSelector((state) => state.chat);
    const user = useTypedSelector((state) => state.user);
    function deleteComment(id) {
        let answer = window.confirm('Delete this comment?');
        if (answer) {
            let comments = [];
            chat.comments.map((c) => {
                if (c._id !== id) {
                    comments.push(c);
                }
                return comments;
            });
            dispatch(updateChatDetails(chat.chatId, chat.chatnumber, chat.title, chat.author, chat.date, chat.language, chat.tags, chat.description, chat.admin, comments));
        }
    }
    // ----------------------------------- RETURN --------------------------------------------------------------------------
    return (React.createElement("div", { className: props.author ? 'comments-author' : 'comments-user', ref: props.commentRef },
        React.createElement("div", { className: "comments-header" },
            React.createElement("p", { className: "comments-name" }, props.author ? props.name + ' (author)' : props.name),
            React.createElement("p", { className: "comments-date" }, props.date)),
        React.createElement("div", { className: "comments-body" },
            React.createElement("p", { className: "comments-text" }, props.text)),
        user.loggedIn ? (React.createElement("p", { className: "comments-delete", onClick: () => deleteComment(props.id) }, "delete")) : null));
};
export default Comments;
//# sourceMappingURL=Comments.js.map