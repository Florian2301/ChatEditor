import '../ChatboxComments.css';
import { Container, ListGroup } from 'react-bootstrap';
import React, { useEffect, useRef } from 'react';
import Comments from '../../comments/Comments/Comments';
import Panel from '../../../elements/Panel/Panel';
import WriteComments from '../../comments/WriteComments/WriteComments';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../redux/hooks/useTypeSelector';
import { v4 as uuidv4 } from 'uuid';
import { writeMessage } from '../../../redux/actions/draft/draft';
const ChatboxComments = () => {
    // state
    const dispatch = useDispatch();
    const draft = useTypedSelector((state) => state.draft);
    const chat = useTypedSelector((state) => state.chat);
    const user = useTypedSelector((state) => state.user);
    // ref
    const scrollToCommentRef = useRef(null);
    // after sending a comment, new comment will be scrolled into view
    // props.draft.write (boolean), sets true, when comment is sent
    useEffect(() => {
        if (chat.messages[0] && draft.write && !user.loggedIn) {
            if (scrollToCommentRef.current !== null) {
                scrollToCommentRef.current.scrollIntoView({
                    block: 'end',
                    behavior: 'smooth',
                });
            }
            dispatch(writeMessage(false));
        }
    }, [chat.messages, draft.write, user.loggedIn]);
    // show title
    let title = draft.title;
    if (chat.chatEditmode) {
        title = chat.title;
    }
    //---- return ---------------------------------------------------------------------------------------------------
    return (React.createElement(Panel, { title: title, id: "chatbox-comments-mobile" },
        React.createElement(Container, { className: user.writeComment ? 'commentchatbox-tablet' : 'chatbox-comments-tablet' },
            chat.chatEditmode ? (React.createElement(ListGroup, null, chat.comments.map((c) => {
                return (React.createElement(ListGroup.Item, { className: "listgroup-chat-comments", key: uuidv4() },
                    React.createElement(Comments, { key: uuidv4(), name: c.name, date: c.date, text: c.text, author: c.author, id: c._id, commentRef: scrollToCommentRef })));
            }))) : (React.createElement("div", { className: "comments-info-tablet" }, "~ chose a chat and write a comment ~")),
            chat.chatEditmode && !chat.comments[0] ? (React.createElement("div", { className: "comments-info" }, "~ write a comment here ~")) : null),
        chat.chatEditmode ? React.createElement(WriteComments, null) : null));
};
export default ChatboxComments;
//# sourceMappingURL=ChatboxCommentsTablet.js.map