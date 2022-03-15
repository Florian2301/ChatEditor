import '../Main.css';
import { Container, Tab, Tabs } from 'react-bootstrap';
import AboutEng from '../../about/Eng/AboutEng.js';
import AboutGer from '../../about/Ger/AboutGer.js';
import Authorization from '../../../authorization/Authorization.js';
import EditChats from '../../edit/EditChats/EditChats.js';
import EditDrafts from '../../edit/EditDrafts/EditDrafts.js';
import React from 'react';
import Settings from '../../settings/Settings/Settings.js';
import StartDraft from '../../edit/StartDraft/StartDraft.js';
import Title from '../../title/Title.js';
import { setKeyR } from '../../../redux/actions/user/user.js';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../redux/hooks/useTypeSelector.js';
// Lazy Load
/*
const EditChats = React.lazy(() => import ('../../edit/EditChats/EditChats.js'))
const EditDrafts = React.lazy(() => import ('../../edit/EditDrafts/EditDrafts.js'))
const StartDraft = React.lazy(() => import ('../../edit/StartDraft/StartDraft.js'))
*/
const MainTabletRight = (props) => {
    // state
    const dispatch = useDispatch();
    const chat = useTypedSelector((state) => state.chat);
    const draft = useTypedSelector((state) => state.draft);
    const user = useTypedSelector((state) => state.user);
    // sets key for tabs
    function handleSelect(key) {
        key !== null ? dispatch(setKeyR(key)) : null;
    }
    // ------------- Return --------------------------------------------------------------------
    return (React.createElement(Container, { fluid: true, id: "responsive-container-tablet" },
        React.createElement(Tabs, { activeKey: user.keyR === 'chatbox' ? 'about' : user.keyR, id: "uncontrolled", style: { borderBottom: 0 }, onSelect: handleSelect },
            user.loggedIn ? (
            /* eventKey = about because initial state is about when page is refreshed */
            React.createElement(Tab, { eventKey: "about", title: draft.draftEditmode ? 'Edit Draft' : 'Start Draft' }, draft.draftEditmode ? React.createElement(EditDrafts, null) : React.createElement(StartDraft, null))) : (React.createElement(Tab, { eventKey: "about", title: "About" }, user.language === 'deutsch' ? React.createElement(AboutGer, null) : React.createElement(AboutEng, null))),
            !user.loggedIn && chat.chatEditmode ? (React.createElement(Tab, { eventKey: "title", title: "Title" },
                React.createElement(Title, null))) : null,
            user.loggedIn ? (React.createElement(Tab, { eventKey: "chats", title: "Edit Chat" },
                React.createElement(EditChats, null))) : null,
            user.loggedIn ? (React.createElement(Tab, { eventKey: "login", title: user.loggedIn ? 'Profile' : 'Login' },
                React.createElement(Authorization, { auto: props.auto, desktop: props.desktop, tablet: props.tablet, mobile: props.mobile, id: "viewtablet" }))) : (React.createElement(Tab, { eventKey: "settings", title: "Settings" },
                React.createElement(Settings, { auto: props.auto, desktop: props.desktop, tablet: props.tablet, mobile: props.mobile, id: "viewtablet" }))))));
};
export default MainTabletRight;
//# sourceMappingURL=MainTabletRight.js.map