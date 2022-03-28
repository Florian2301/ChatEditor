import '../Main.css';
import { Container, Tab, Tabs } from 'react-bootstrap';
import React, { useEffect } from 'react';
import ChatList from '../../tables/ChatList/ChatList';
import ChatboxCommentsTablet from '../../chatbox/TabletComments/ChatboxCommentsTablet';
import ChatboxTablet from '../../chatbox/Tablet/ChatboxTablet';
import DraftList from '../../tables/DraftList/DraftList';
import UserChats from '../../tables/UserChats/UserChats';
import { getAllTitles } from '../../../redux/actions/title/title';
import { setKeyL } from '../../../redux/actions/user/user';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../redux/hooks/useTypeSelector';
const MainTabletLeft = () => {
    // State
    const dispatch = useDispatch();
    const title = useTypedSelector((state) => state.title);
    const chat = useTypedSelector((state) => state.chat);
    const draft = useTypedSelector((state) => state.draft);
    const user = useTypedSelector((state) => state.user);
    // sets key for active tabs
    function handleSelect(key) {
        key !== null ? dispatch(setKeyL(key)) : null;
    }
    // get all titles when page is loading for the first time
    useEffect(() => {
        if (!user.loggedIn && (title.allTitles.length === 0)) {
            setTimeout(() => {
                dispatch(getAllTitles());
            }, 2000);
        }
    }, [title.allTitles, user.loggedIn]);
    // filter number of drafts by language
    let draftList = [];
    draft.userDrafts.map((draft) => {
        if (draft.language === user.language) {
            draftList.push(draft);
        }
        return draftList;
    });
    // filter number of chats by language
    let chatList = [];
    chat.userChats.map((chat) => {
        if (chat.language === user.language) {
            chatList.push(chat);
        }
        return chatList;
    });
    // filter chats by language
    let userTitle = [];
    title.allTitles.map((title) => {
        if (title.language === user.language) {
            userTitle.push(title);
        }
        return userTitle;
    });
    //------------------------------------------------------- return ------------------------------------------------------------
    return (React.createElement(Container, { fluid: true, id: "responsive-container-tablet" },
        React.createElement(Tabs, { activeKey: user.keyL, id: "uncontrolled", style: { borderBottom: 0 }, onSelect: handleSelect },
            !user.loggedIn ? null : (React.createElement(Tab, { eventKey: "userchats", title: `Draftlist (${draftList.length})` },
                React.createElement(DraftList, null))),
            !user.loggedIn ? (React.createElement(Tab, { eventKey: "userchats", title: `Chats (${userTitle.length})` },
                React.createElement("div", { className: "table-border-color" },
                    React.createElement(UserChats, null)))) : (React.createElement(Tab, { eventKey: "chatlist", title: `Chatlist (${chatList.length})` },
                React.createElement(ChatList, null))),
            React.createElement(Tab, { eventKey: "chatbox", title: !user.loggedIn
                    ? 'Chatbox'
                    : `Chatbox (${draft.draftEditmode
                        ? draft.messages.length
                        : chat.messages.length})` },
                React.createElement(ChatboxTablet, null)),
            chat.chatEditmode ? (React.createElement(Tab, { eventKey: "comments", title: `Comments (${chat.comments.length})` },
                React.createElement(ChatboxCommentsTablet, null))) : null)));
};
export default MainTabletLeft;
//# sourceMappingURL=MainTabletLeft.js.map