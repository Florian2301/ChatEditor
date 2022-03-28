import React from 'react';
import './Textarea.css';
/**
 * textarea for writing the message in chat
 */
export default function Textarea(props) {
    return (React.createElement("div", null,
        React.createElement("textarea", { className: "textarea-write", placeholder: props.placeholder, onChange: props.onChange, autoFocus: true, onKeyDown: props.onKeyDown })));
}
//# sourceMappingURL=Textarea.js.map