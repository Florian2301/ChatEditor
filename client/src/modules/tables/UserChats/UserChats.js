import React from 'react';
import './UserChats.css';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../redux/hooks/useTypeSelector.js';
import { clearDisplay, setKeyL, setKeyR } from '../../../redux/actions/user/user.js';
import { getOneChat } from '../../../redux/actions/chat/chat.js';
import { getOneTitle } from '../../../redux/actions/title/title.js';
import { writeMessage } from '../../../redux/actions/draft/draft.js';
import Popover from '../../../elements/Popover/Popover.js';
const UserChats = () => {
    // state
    const dispatch = useDispatch();
    const title = useTypedSelector((state) => state.title);
    const user = useTypedSelector((state) => state.user);
    function displayChat(id, chatId) {
        dispatch(clearDisplay());
        dispatch(getOneTitle(id));
        dispatch(getOneChat(chatId));
        dispatch(setKeyL('chatbox')); // for navigation of mobile version
        dispatch(setKeyR('title')); // for navigation of Tablet version (right side)
        dispatch(writeMessage(false));
    }
    //--------------------- return -----------------------------------------------------------
    // empty variabel for return statement
    let usertitles;
    return (React.createElement("div", { className: "table-userchats" },
        React.createElement("div", { className: "data-columns-userchats-1" },
            React.createElement("div", { className: "thead-userchats-1" }, "User"),
            React.createElement("div", { className: "thead-userchats-2" }, "#"),
            React.createElement("div", { className: "thead-userchats-3" }, "Title"),
            React.createElement("div", { className: "thead-userchats-4" }, "Date / Info")),
        React.createElement("div", { className: window.innerWidth <= 1000
                ? 'userchats-scroll-mobile'
                : 'userchats-scroll' }, (usertitles = title.allTitles.map((t) => {
            if (user.language === t.language) {
                return (React.createElement("div", { key: uuidv4(), className: "data-columns-userchats-2" },
                    React.createElement("div", { className: "userchats-column-1" }, t.author),
                    React.createElement("div", { className: "userchats-column-2" }, t.chatnumber),
                    React.createElement("div", { className: "userchats-column-3", onClick: () => displayChat(t._id, t.chatId) }, t.title),
                    React.createElement("div", { className: "userchats-column-4" },
                        React.createElement(Popover, { date: t.date, tags: t.tags, description: t.description }))));
            }
            return usertitles;
        })))));
};
export default UserChats;
//# sourceMappingURL=UserChats.js.map