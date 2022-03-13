import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../redux/hooks/useTypeSelector.js';
import './ChatList.css';
import { v4 as uuidv4 } from 'uuid';
import { getUserChats, getOneChat } from '../../../redux/actions/chat/chat.js';
import { getUserTitles, getOneTitle } from '../../../redux/actions/title/title.js';
import { clearDisplay, setKeyL, setKeyR } from '../../../redux/actions/user/user.js';
const ChatList = () => {
    // state
    const dispatch = useDispatch();
    const title = useTypedSelector((state) => state.title);
    const chat = useTypedSelector((state) => state.chat);
    const user = useTypedSelector((state) => state.user);
    // useState
    const [list, setList] = useState(false);
    // const
    const userId = user.userId;
    const userChats = chat.userChats;
    useEffect(() => {
        if (!list) {
            // get all chats
            if (!userChats[0]) {
                dispatch(getUserChats(userId));
                dispatch(getUserTitles(userId));
            }
            setList(true);
        }
    }, [userChats, userId, list]);
    // show one chat
    function getChat(chatId) {
        dispatch(clearDisplay());
        dispatch(setKeyL('chatbox')); // for mobile/tablet navigation
        dispatch(setKeyR('chats')); // for tablet navigation
        let titleId = '';
        dispatch(getOneChat(chatId)); // get one chat
        title.userTitles.map((title) => {
            // get one title
            if (title.chatId === chatId) {
                titleId = title._id;
            }
            return titleId;
        });
        dispatch(getOneTitle(titleId));
    }
    // -------------------- return --------------------------------------------------
    // empty variable for return statement
    let chats;
    return (React.createElement("div", { className: "table-chats" },
        React.createElement("div", { className: "data-rows-chats-1" },
            React.createElement("div", { className: "thead-chats", id: "thead-chats-number" }, "#"),
            React.createElement("div", { className: "thead-chats" }, "Your published chats"),
            React.createElement("div", { className: "thead-chats" }, "Date")),
        React.createElement("div", { className: window.innerWidth <= 1000
                ? 'chatlist-scroll-mobile'
                : 'chatlist-scroll' }, (chats = userChats.map((chat) => {
            if (chat.language === user.language) {
                return (React.createElement("div", { key: uuidv4(), className: "data-rows-chats-2", onClick: () => getChat(chat._id) },
                    React.createElement("div", { className: "data-columns-chats", id: "data-columns-chats-number" }, chat.chatnumber),
                    React.createElement("div", { className: "data-columns-chats", id: "data-columns-chats-title" }, chat.title),
                    React.createElement("div", { className: "data-columns-chats", id: "data-columns-chats-date" }, chat.date)));
            }
            return chats;
        })))));
};
export default ChatList;
//# sourceMappingURL=ChatList.js.map