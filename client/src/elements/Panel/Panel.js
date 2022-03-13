import React from 'react';
import './Panel.css';
export default function Panel(props) {
    return (React.createElement("div", { className: "panel", id: props.id },
        React.createElement("h3", { className: "panel-title" }, props.title),
        React.createElement("div", { className: "panel-content" }, props.children)));
}
//# sourceMappingURL=Panel.js.map