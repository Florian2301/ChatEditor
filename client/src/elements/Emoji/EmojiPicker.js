import React from 'react';
import './EmojiPicker.css';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
const EmojiPicker = (props) => {
    function addEmoji(e) {
        let emoji = e.native;
        props.getEmoji(emoji);
    }
    const popover = (React.createElement(Popover, { className: "fade-in-picker", id: "emoji-picker" },
        React.createElement(Popover.Body, null,
            React.createElement(Picker, { onSelect: addEmoji, showPreview: false, showSkinTones: false }))));
    const InfoPopover = () => (React.createElement(OverlayTrigger, { trigger: ['click'], placement: window.innerWidth <= 767 ? 'top' : 'right', overlay: popover },
        React.createElement("p", { className: "emojipicker" }, "Add emoji")));
    return (React.createElement("div", null,
        React.createElement(InfoPopover, null)));
};
export default EmojiPicker;
//# sourceMappingURL=EmojiPicker.js.map