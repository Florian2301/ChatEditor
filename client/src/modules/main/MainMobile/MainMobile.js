import React, { useEffect, Suspense } from 'react';
import '../Main.css';
import { Container, Tab, Tabs } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../redux/hooks/useTypeSelector.js';
import { setKeyL } from '../../../redux/actions/user/user.js';
import { getAllTitles } from '../../../redux/actions/title/title.js';
import AboutEng from '../../about/Eng/AboutEng.js';
import AboutGer from '../../about/Ger/AboutGer.js';
import Authorization from '../../../authorization/Authorization.js';
import ChatboxCommentsMobile from '../../chatbox/MobileComments/ChatboxCommentsMobile.js';
import ChatboxMobile from '../../chatbox/Mobile/ChatboxMobile.js';
import Settings from '../../settings/Settings/Settings.js';
import Title from '../../title/Title.js';
import UserChats from '../../tables/UserChats/UserChats.js';
//import EditChats from '../../edit/EditChats/EditChats.js'
//import ChatList from '../../tables/ChatList/ChatList.js'
//import StartDraft from '../../edit/StartDraft/StartDraft.js'
//import EditDrafts from '../../edit/EditDrafts/EditDrafts.js'
//import DraftList from '../../tables/DraftList/DraftList.js'
// Lazy Load
const ChatList = React.lazy(() => import('../../tables/ChatList/ChatList.js'));
const DraftList = React.lazy(() => import('../../tables/DraftList/DraftList.js'));
const EditChats = React.lazy(() => import('../../edit/EditChats/EditChats.js'));
const EditDrafts = React.lazy(() => import('../../edit/EditDrafts/EditDrafts.js'));
const StartDraft = React.lazy(() => import('../../edit/StartDraft/StartDraft.js'));
// mobile version
const MainMobile = (props) => {
    // State
    const dispatch = useDispatch();
    const title = useTypedSelector((state) => state.title);
    const chat = useTypedSelector((state) => state.chat);
    const draft = useTypedSelector((state) => state.draft);
    const user = useTypedSelector((state) => state.user);
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
    function handleSelect(key) {
        key !== null ? dispatch(setKeyL(key)) : null;
    }
    // ------------------------------ RETURN -----------------------------------------------------------------------------
    return (React.createElement(Container, { id: "responsive-container-mobile" },
        React.createElement(Tabs, { id: "uncontrolled", style: { borderBottom: 0 }, activeKey: user.keyL, onSelect: handleSelect },
            !user.loggedIn ? (React.createElement(Tab, { eventKey: "userchats", title: `Chats (${userTitle.length})` },
                React.createElement(UserChats, null))) : null,
            user.loggedIn ? (React.createElement(Tab, { eventKey: "draftlist", title: `Draftlist (${draftList.length})` },
                React.createElement(Suspense, { fallback: React.createElement("div", null, "Loading...") },
                    React.createElement(DraftList, null)))) : null,
            user.loggedIn ? (React.createElement(Tab, { eventKey: "chatlist", title: `Chatlist (${chatList.length})` },
                React.createElement(Suspense, { fallback: React.createElement("div", null, "Loading...") },
                    React.createElement(ChatList, null)))) : null,
            user.loggedIn ? (
            /* eventKey = adminchats because initial state is adminchats when page is refreshed */
            React.createElement(Tab, { eventKey: "userchats", title: draft.draftEditmode ? 'Edit Draft' : 'Start Draft' },
                React.createElement(Suspense, { fallback: React.createElement("div", null, "Loading...") }, draft.draftEditmode ? React.createElement(EditDrafts, null) : React.createElement(StartDraft, null)))) : null,
            user.loggedIn ? (React.createElement(Tab, { eventKey: "editchats", title: "Edit chats" },
                React.createElement(Suspense, { fallback: React.createElement("div", null, "Loading...") },
                    React.createElement(EditChats, null)))) : null,
            React.createElement(Tab, { eventKey: "chatbox", title: !user.loggedIn
                    ? 'Chatbox'
                    : `Chatbox (${draft.draftEditmode
                        ? draft.messages.length
                        : chat.messages.length})` },
                React.createElement(ChatboxMobile, null)),
            chat.chatEditmode ? (React.createElement(Tab, { eventKey: "comments", title: `Comments (${chat.comments.length})` },
                React.createElement(ChatboxCommentsMobile, null))) : null,
            !user.loggedIn && chat.chatEditmode ? (React.createElement(Tab, { eventKey: "title", title: "Title" },
                React.createElement(Title, null))) : null,
            !user.loggedIn && !chat.chatEditmode ? (React.createElement(Tab, { eventKey: "about", title: "About" }, user.language === 'deutsch' ? React.createElement(AboutGer, null) : React.createElement(AboutEng, null))) : null,
            React.createElement(Tab, { eventKey: "login", title: user.loggedIn ? 'Profile' : 'Login' },
                React.createElement(Authorization, { auto: props.auto, desktop: props.desktop, tablet: props.tablet, mobile: props.mobile, id: "viewmobile" })),
            !user.loggedIn ? (React.createElement(Tab, { eventKey: "settings", title: "Settings" },
                React.createElement(Settings, { auto: props.auto, desktop: props.desktop, tablet: props.tablet, mobile: props.mobile, id: "viewmobile" }))) : null)));
};
export default MainMobile;
//# sourceMappingURL=MainMobile.js.map