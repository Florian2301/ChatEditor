import React from 'react';
import './Title.css';
import { v4 as uuidv4 } from 'uuid';
import { useTypedSelector } from '../../redux/hooks/useTypeSelector.js';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Panel from '../../elements/Panel/Panel.js';
import PDF from '../../elements/PDF/PDF.js';
const Title = () => {
    const title = useTypedSelector((state) => state.title);
    const chat = useTypedSelector((state) => state.chat);
    //-------------------------------------- RETURN -------------------------------------------------------------------
    return (React.createElement(Panel, { title: "chat details", id: "title-panel" },
        React.createElement("div", { className: window.innerWidth <= 1000 ? 'title-scroll-mobile' : 'title-scroll' },
            React.createElement("div", { className: "title-details", id: "title-number" },
                React.createElement("p", null, "Chatnumber:"),
                React.createElement("p", { className: "title-info" }, title.chatnumber)),
            React.createElement("div", { className: "title-details" },
                React.createElement("p", null, "Title:"),
                React.createElement("p", { className: "title-info" }, title.title)),
            React.createElement("div", { className: "title-details" },
                React.createElement("p", null, "Description:"),
                React.createElement("p", { className: "title-info", id: "title-info-description" }, title.description)),
            React.createElement("div", { className: "title-details", id: "title-details-tags" },
                React.createElement("p", null, "Tags:"),
                React.createElement("p", { className: "title-info", id: "title-info-tags" }, title.tags)),
            React.createElement("div", { className: "title-details" },
                React.createElement("p", null, "Philosopher:"),
                React.createElement("div", { className: "title-info" }, chat.philosopher.map((phil) => {
                    return (React.createElement("p", { key: uuidv4(), id: "title-info-phil" }, phil.name));
                }))),
            React.createElement("div", { className: "title-details", id: "title-details-author" },
                React.createElement("p", null, "Author:"),
                React.createElement("p", { className: "title-info" }, title.author)),
            React.createElement("div", { className: "title-details" },
                React.createElement("p", null, "Language:"),
                React.createElement("p", { className: "title-info" }, title.language)),
            React.createElement("div", { className: "title-details" },
                React.createElement("p", null, "Messages:"),
                React.createElement("p", { className: "title-info", id: "title-messages" }, chat.messages.length !== 0
                    ? chat.messages.length
                    : null)),
            React.createElement("div", { className: "title-details" },
                React.createElement("p", null, "Published:"),
                React.createElement("p", { className: "title-info", id: "title-date" }, title.date)),
            React.createElement("div", { className: "title-details", id: "title-download" },
                React.createElement("p", null, "Download:"),
                React.createElement("div", { className: "title-info" }, title.title ? (React.createElement(PDFDownloadLink, { document: React.createElement(PDF, { title: title.title, data: chat.messages, author: title.author, date: title.date }), fileName: title.chatnumber + '. ' + title.title + '.pdf', className: "link-download-title" },
                    title.title,
                    ".pdf")) : null)))));
};
export default Title;
//# sourceMappingURL=Title.js.map