import React from 'react';
import './Popover.css';
import { OverlayTrigger, Popover } from 'react-bootstrap';
export function PopoverChat(props) {
    const date = props.date;
    const tags = props.tags;
    const description = props.description;
    const popover = (React.createElement(Popover, { id: "popover", className: "fade-in-popover" },
        React.createElement(Popover.Header, { id: "popover-header" }, tags ? tags : null),
        React.createElement(Popover.Body, { id: "popover-body" }, description ? description : null)));
    const InfoPopover = () => (React.createElement(OverlayTrigger, { trigger: ['click', 'focus'], placement: window.innerWidth <= 1000 ? 'left' : 'right', overlay: popover },
        React.createElement("p", { id: "popover-title" }, date)));
    return (React.createElement("div", null,
        React.createElement(InfoPopover, null)));
}
export default PopoverChat;
//# sourceMappingURL=Popover.js.map