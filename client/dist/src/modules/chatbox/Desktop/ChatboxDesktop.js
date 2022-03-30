import '../Chatbox.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Container, ListGroup } from 'react-bootstrap';
import React, { useEffect, useRef, useState } from 'react';
import { publishTitle, saveTitle } from '../../../redux/actions/title/title';
import Message from '../../messages/Message/Message';
import Panel from '../../../elements/Panel/Panel';
import WriteMessage from '../../messages/WriteMessage/WriteMessage';
import { useDispatch } from 'react-redux';
import useDynamicRefs from 'use-dynamic-refs';
import { useTypedSelector } from '../../../redux/hooks/useTypeSelector';
import { v4 as uuidv4 } from 'uuid';
const ChatboxDesktop = () => {
    // state
    const dispatch = useDispatch();
    const draft = useTypedSelector((state) => state.draft);
    const chat = useTypedSelector((state) => state.chat);
    const title = useTypedSelector((state) => state.title);
    const user = useTypedSelector((state) => state.user);
    // refs
    const scrollRef = useRef(null);
    const [getRef, setRef] = useDynamicRefs(); // not sure which type to use here
    // useState
    const [scroll, setScroll] = useState(false);
    // scrollTo a certain message, either a replied message or when a message gets a number set by user
    function scrollTo(replynumber) {
        let numberOfMessage = parseInt(replynumber);
        let messages = draft.draftEditmode
            ? draft.messages
            : chat.messages;
        let scrollToReply; // type useDynamicRef not clear yet
        messages.map((message) => {
            if (message.messagenumber === numberOfMessage) {
                scrollToReply = getRef(message._id);
                scrollToReply.current.scrollIntoView({
                    block: 'start',
                    behavior: 'smooth',
                });
            }
            return scrollToReply;
        });
    }
    // function to get messagenumber from WriteMessage component, when a message gets a number set by user
    function scrollToReplace(number) {
        setScroll(number);
        scrollTo(number.toString());
    }
    useEffect(() => {
        // after sending a message, new message will be scrolled into view or when chat is loaded
        // check if draft/chat is active, "scroll" is for scrolling to a replied message (set in component writeMessage)
        if (draft.messages[0] && !scroll) {
            setTimeout(() => {
                if (scrollRef.current !== null) {
                    scrollRef.current.scrollIntoView({
                        block: 'end',
                        behavior: 'smooth',
                    });
                }
            }, 500);
        }
        // when a draft is saved as chat, then "publish" is set to length of chatsarray (EditDraft)
        // check if a new chat is added, then save new title with chat-id from new chat
        if (title.publish &&
            title.publish < chat.userChats.length) {
            setTimeout(() => {
                dispatch(saveTitle(chat.chatId, chat.userId, user.username, chat.chatnumber, chat.title, chat.author, chat.date, chat.language, chat.tags, chat.description, chat.admin));
                // clear
                title.publish = false;
                dispatch(publishTitle(false));
            }, 500);
        }
    }, [
        draft.messages,
        chat.messages,
        scroll,
        chat.userChats,
        title.publish,
    ]);
    // get data for display saved draft
    let currentMessages = draft.messages;
    let chatId = draft.draftId;
    let chatnumber = '';
    let userId = draft.userId;
    let chatTitle = draft.title;
    // get data for display saved chat
    if (chat.chatEditmode) {
        currentMessages = chat.messages;
        chatId = chat.chatId;
        chatnumber = chat.chatnumber;
        userId = chat.userId;
        chatTitle = chat.title;
    }
    //---- return ---------------------------------------------------------------------------------------------------
    return (React.createElement(Panel, { title: chatTitle, id: "chatbox" },
        React.createElement(Container, { className: draft.write && draft.draftEditmode
                ? 'editchatbox'
                : 'chatbox' }, !user.loggedIn ? (React.createElement(ListGroup, null,
            React.createElement(TransitionGroup, null, currentMessages.map((m) => {
                return (React.createElement(CSSTransition, { key: uuidv4(), timeout: 1, classNames: "transition-message" },
                    React.createElement(ListGroup.Item, { className: "listgroup-chat" },
                        React.createElement("div", { ref: setRef(m._id), key: uuidv4() },
                            React.createElement(Message, { position: 'position-' + m.position, color: 'color-' + m.color, key: uuidv4(), number: m.messagenumber, name: m.name, text: m.text, chatid: chatId, chatnumber: chatnumber, messageId: m._id, userid: userId, scroll: scrollRef, repliedmessage: m.repliedmessage, replyTo: scrollTo, scrollTo: scrollToReplace })))));
            })))) : (React.createElement("ul", { className: "listgroup-edit" }, currentMessages.map((m) => {
            return (React.createElement("div", { ref: setRef(m._id), key: uuidv4() },
                React.createElement(Message, { positionedit: 'position-' + m.position + '-edit', color: 'color-' + m.color, key: uuidv4(), number: m.messagenumber, name: m.name, text: m.text, chatid: chatId, chatnumber: chatnumber, messageId: m._id, userid: userId, scroll: scrollRef, repliedmessage: m.repliedmessage, replyTo: scrollTo, scrollTo: scrollToReplace })));
        })))),
        draft.draftEditmode ? (React.createElement(WriteMessage, { scrollTo: scrollToReplace, defaultScroll: () => setScroll(false) })) : null));
};
export default ChatboxDesktop;
//# sourceMappingURL=ChatboxDesktop.js.map