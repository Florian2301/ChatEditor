import React from 'react';
import './Settings.css';
import { useDispatch } from 'react-redux';
import { clearDisplay } from '../../../redux/actions/user/user.js';
import Panel from '../../../elements/Panel/Panel.js';
import SelectView from '../SelectView/SelectView.js';
import Language from '../Language/Language.js';
import { setKeyR, setKeyL } from '../../../redux/actions/user/user.js';
const Settings = (props) => {
    const dispatch = useDispatch();
    // clear screen
    function clear() {
        dispatch(clearDisplay());
        dispatch(setKeyL('userchats'));
        dispatch(setKeyR('about'));
    }
    //----------------------RETURN------------------------------------------
    return (React.createElement(Panel, { title: "Settings", id: "settings" },
        React.createElement("div", { className: "options" },
            React.createElement("p", null, "I. Select a view for your device"),
            React.createElement(SelectView, { auto: props.auto, desktop: props.desktop, tablet: props.tablet, mobile: props.mobile, id: props.id })),
        React.createElement("div", { className: "options" },
            React.createElement("p", null, "II. Select language of chats"),
            React.createElement(Language, null)),
        React.createElement("div", { className: "options" },
            React.createElement("p", null, "III. Go back to startpage"),
            React.createElement("p", { id: "options-link-clear", onClick: clear }, "Startpage")),
        React.createElement("br", null)));
};
export default Settings;
//# sourceMappingURL=Settings.js.map