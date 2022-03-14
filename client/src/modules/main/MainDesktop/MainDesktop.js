import React, { useEffect, Suspense } from 'react';
import '../Main.css';
import { Container, Tab, Tabs } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../redux/hooks/useTypeSelector.js';
import { setKeyR, setKeyL } from '../../../redux/actions/user/user.js';
import { getAllTitles } from '../../../redux/actions/title/title.js';
import AboutEng from '../../about/Eng/AboutEng.js';
import AboutGer from '../../about/Ger/AboutGer.js';
import Authorization from '../../../authorization/Authorization.js';
import ChatboxCommentsDesktop from '../../chatbox/DesktopComments/ChatboxCommentsDesktop.js';
import ChatboxDesktop from '../../chatbox/Desktop/ChatboxDesktop.js';
import Settings from '../../settings/Settings/Settings.js';
import Title from '../../title/Title.js';
import UserChats from '../../tables/UserChats/UserChats.js';
//import StartDraft from '../../edit/StartDraft/StartDraft.js'
//import EditDrafts from '../../edit/EditDrafts/EditDrafts.js'
//import DraftList from '../../tables/DraftList/DraftList.js'
//import EditChats from '../../edit/EditChats/EditChats.js'
//import ChatList from '../../tables/ChatList/ChatList.js'
// Lazy Load
const ChatList = React.lazy(() => import('../../tables/ChatList/ChatList.js'));
const DraftList = React.lazy(() => import('../../tables/DraftList/DraftList.js'));
const EditChats = React.lazy(() => import('../../edit/EditChats/EditChats.js'));
const EditDrafts = React.lazy(() => import('../../edit/EditDrafts/EditDrafts.js'));
const StartDraft = React.lazy(() => import('../../edit/StartDraft/StartDraft.js'));
const MainDesktop = (props) => {
    //State
    const dispatch = useDispatch();
    const title = useTypedSelector((state) => state.title);
    const chat = useTypedSelector((state) => state.chat);
    const draft = useTypedSelector((state) => state.draft);
    const user = useTypedSelector((state) => state.user);
    // function to select menu (tablet/mobile)
    const handleSelectR = (key) => {
        key !== null ? dispatch(setKeyR(key)) : null;
    };
    const handleSelectL = (key) => {
        key !== null ? dispatch(setKeyL(key)) : null;
    };
    // get all titles when page is loading for the first time
    useEffect(() => {
        if (!user.loggedIn && title.allTitles.length === 0) {
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
    //---------------------- RETURN ------------------------------------------------------------------------------------
    return (React.createElement("section", { className: "flexContainer-main" },
        React.createElement("div", { id: "item-1" },
            React.createElement(Container, { fluid: true },
                React.createElement(Tabs, { defaultActiveKey: user.keyL, id: "uncontrolled", style: { borderBottom: 0 }, onSelect: handleSelectL },
                    !user.loggedIn ? null : (React.createElement(Tab, { eventKey: "userchats", title: `Draftlist (${draftList.length})` },
                        React.createElement(Suspense, { fallback: React.createElement("div", null, "Loading...") },
                            React.createElement(DraftList, null)))),
                    !user.loggedIn ? (React.createElement(Tab, { eventKey: "userchats", title: `Chats (${userTitle.length})` },
                        React.createElement(UserChats, null))) : (React.createElement(Tab, { eventKey: "chatlist", title: `Chatlist (${chatList.length})` },
                        React.createElement(Suspense, { fallback: React.createElement("div", null, "Loading...") },
                            React.createElement(ChatList, null))))))),
        React.createElement("div", { id: "item-2" },
            React.createElement(Container, { fluid: true },
                React.createElement(Tabs, { defaultActiveKey: 'chatbox', id: "uncontrolled", style: { borderBottom: 0 } },
                    React.createElement(Tab, { eventKey: "chatbox", title: !user.loggedIn
                            ? 'Chatbox'
                            : `Chatbox (${draft.draftEditmode
                                ? draft.messages.length
                                : chat.messages.length})` },
                        React.createElement(ChatboxDesktop, null)),
                    chat.chatEditmode ? (React.createElement(Tab, { eventKey: "comments", title: `Comments (${chat.comments.length})` },
                        React.createElement(ChatboxCommentsDesktop, null))) : null))),
        React.createElement("div", { id: "item-3" },
            React.createElement(Container, { fluid: true },
                React.createElement(Tabs, { activeKey: user.keyR, id: "uncontrolled", style: { borderBottom: 0 }, onSelect: handleSelectR },
                    user.loggedIn ? (
                    /* eventKey = about because initial state is "about", when page gets refreshed */
                    React.createElement(Tab, { eventKey: "about", title: draft.draftEditmode ? 'Edit Draft' : 'Start Draft' },
                        React.createElement(Suspense, { fallback: React.createElement("div", null, "Loading...") }, draft.draftEditmode ? React.createElement(EditDrafts, null) : React.createElement(StartDraft, null)))) : null,
                    user.loggedIn ? (React.createElement(Tab, { eventKey: "chats", title: "Edit Chat" },
                        React.createElement(Suspense, { fallback: React.createElement("div", null, "Loading...") },
                            React.createElement(EditChats, null)))) : (React.createElement(Tab, { eventKey: "about", title: "About" }, user.language === 'deutsch' ? (React.createElement(AboutGer, null)) : (React.createElement(AboutEng, null)))),
                    !user.loggedIn ? (React.createElement(Tab, { eventKey: "title", title: 'Title' },
                        React.createElement(Title, null))) : null,
                    React.createElement(Tab, { eventKey: "login", title: user.loggedIn ? 'Profile' : 'Login' },
                        React.createElement(Authorization, { auto: props.auto, desktop: props.desktop, tablet: props.tablet, mobile: props.mobile, id: "viewdestktop" })),
                    !user.loggedIn ? (React.createElement(Tab, { eventKey: "settings", title: "Settings" },
                        React.createElement(Settings, { auto: props.auto, desktop: props.desktop, tablet: props.tablet, mobile: props.mobile, id: "viewdestktop" }))) : null)))));
};
export default MainDesktop;
//# sourceMappingURL=MainDesktop.js.map