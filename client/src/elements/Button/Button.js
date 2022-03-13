import React from 'react';
export default function Button(props) {
    return (React.createElement("button", { className: props.className, id: props.id, onClick: props.handleClick }, props.label));
}
//# sourceMappingURL=Button.js.map