import React, { useRef, useState } from 'react';
import './EditChats.css';
import { v4 as uuidv4 } from 'uuid';
import { Form, Alert, Col, Row, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../redux/hooks/useTypeSelector.js';
import { saveDraft, getDrafts } from '../../../redux/actions/draft/draft.js';
import { updateTitle, getUserTitles, deleteTitle, } from '../../../redux/actions/title/title.js';
import { getOneChat, updateChatDetails, getUserChats, deleteChat, } from '../../../redux/actions/chat/chat.js';
import { clearDisplay } from '../../../redux/actions/user/user.js';
import Button from '../../../elements/Button/Button.js';
import Panel from '../../../elements/Panel/Panel.js';
import PDF from '../../../elements/PDF/PDF.js';
import { PDFDownloadLink } from '@react-pdf/renderer';
const EditChats = () => {
    // state
    const dispatch = useDispatch();
    const chat = useTypedSelector((state) => state.chat);
    const title = useTypedSelector((state) => state.title);
    const user = useTypedSelector((state) => state.user);
    // Refs
    const numberRef = useRef(null);
    const titleRef = useRef(null);
    const authorRef = useRef(null);
    const dateRef = useRef(null);
    const tagsRef = useRef(null);
    const descriptionRef = useRef(null);
    // useState
    const [error, setError] = useState('');
    const [spinner, setSpinner] = useState(false);
    const [edit, setEdit] = useState(false);
    const [save, setSave] = useState(false);
    const [chatLanguage, setChatLanguage] = useState('');
    const [toggleAdmin, setToggleAdmin] = useState(true); // only for admin to switch between "admin" and "user" functions
    const [download, setDownload] = useState(false);
    // for select language
    function changeLanguage(event) {
        setChatLanguage(event.target.value);
    }
    // if user = admin then he can save chat as "admin" or "user"
    function toggleAdminChat() {
        setToggleAdmin(!toggleAdmin);
    }
    // prepare download as pdf and get drafts with last changes (messages)
    function pdfdownload(id) {
        setDownload(id);
        dispatch(getOneChat(id));
        // spinner
        setSpinner(true);
        setTimeout(() => {
            setSpinner(false);
        }, 1000);
    }
    // function for form
    function handleSubmit(event) {
        event.preventDefault();
        // if no chat is active, the function is inactive
        if (!chat.chatEditmode) {
            setEdit(false);
            setSave(false);
            return;
        }
        // check if save-button is clicked
        if (save) {
            // check if user is admin, if user is admin he can switch between "admin" and "user" publishing
            let admin = chat.admin;
            if (user.admin) {
                admin = toggleAdmin;
            }
            // check if language setting has been changed and set new language
            let language = chat.language;
            if (chatLanguage !== language && chatLanguage !== '') {
                language = chatLanguage;
            }
            // save comments
            const comments = chat.comments;
            // check if Refs are not null and assign the value of the Ref to a const variable, otherwise ste error and interrupt action
            const chatnumber = numberRef.current !== null ? parseInt(numberRef.current.value) : false;
            if (!chatnumber) {
                return setError('Please insert a chatnumber');
            }
            const chatTitle = titleRef.current !== null ? titleRef.current.value : false;
            if (!chatTitle) {
                return setError('Please insert a title');
            }
            const author = authorRef.current !== null && user.admin ? authorRef.current.value : user.username;
            if (!author) {
                return setError('Please name an author');
            }
            const date = dateRef.current !== null ? dateRef.current.value : false;
            if (!date) {
                return setError('Please insert a date');
            }
            const tagsValue = tagsRef.current !== null ? tagsRef.current.value : false;
            if (!tagsValue) {
                return setError('Please insert some tags');
            }
            const tags = tagsValue ? tagsValue.split(',') : ['']; // tags will be saved as array of strings devided by comma
            const description = descriptionRef.current !== null ? descriptionRef.current.value : false;
            if (!description) {
                return setError('Please insert a description');
            }
            // set id's
            const userId = chat.userId;
            const titleId = title.titleId;
            const chatId = chat.chatId;
            // save title
            dispatch(updateTitle(titleId, chatnumber, chatTitle, author, date, language, tags, description, admin));
            // save chat details
            dispatch(updateChatDetails(chatId, chatnumber, chatTitle, author, date, language, tags, description, admin, comments));
            // clear data and load chat/title
            setTimeout(() => {
                dispatch(getOneChat(chatId));
                dispatch(getUserTitles(userId));
            }, 500);
            setError('');
            setEdit(false);
            setSave(false);
            // activate spinner
            setSpinner(true);
            setTimeout(() => {
                setSpinner(false);
            }, 1000);
        }
    }
    // function clear data
    function clear() {
        dispatch(clearDisplay());
        setError('');
        setEdit(false);
        setSave(false);
        setDownload(false);
    }
    // delete one title + chat
    function deleteThisChat(chatId) {
        let answer = window.confirm('Delete this message?');
        if (answer) {
            let titleId = '';
            dispatch(deleteChat(chatId));
            title.allTitles.map((mapTitle) => {
                if (mapTitle.chatId === chatId) {
                    titleId = mapTitle._id;
                }
                return titleId;
            });
            dispatch(deleteTitle(titleId));
            setTimeout(() => {
                dispatch(getUserChats(user.userId));
                dispatch(getUserTitles(user.userId));
            }, 500);
            clear();
        }
        else {
            return;
        }
    }
    // save chat as draft
    function saveAsDraft() {
        if (!chat.chatEditmode) {
            setEdit(false);
            setSave(false);
            return;
        }
        dispatch(saveDraft(chat.userId, user.username, chat.title, chat.author, chat.date, chat.language, chat.tags, chat.description, chat.philosopher, chat.messages, chat.admin));
        // clear data and get drafts
        clear();
        setTimeout(() => {
            dispatch(getDrafts(chat.userId));
        }, 500);
        // spinner
        setSpinner(true);
        setTimeout(() => {
            setSpinner(false);
        }, 1000);
    }
    // ------------------------------------- RETURN --------------------------------------------------------
    return (React.createElement(Panel, { id: "panel-edit-chat", title: "Edit your chat" },
        React.createElement("div", { className: "text-center mb-4" }, error && React.createElement(Alert, { variant: "danger" }, error)),
        React.createElement(Form, { onSubmit: handleSubmit },
            edit ? (React.createElement("div", { className: window.innerWidth <= 1000
                    ? 'edit-chat-scroll-mobile'
                    : 'edit-chat-scroll' },
                React.createElement(Form.Group, { as: Row },
                    React.createElement(Form.Label, { className: "edit-chat-number", column: true, sm: "3" }, "Chatnumber:"),
                    React.createElement(Col, null,
                        React.createElement(Form.Control, { className: "edit-chat-input-number", type: "text", ref: numberRef, autoFocus: true, placeholder: "0-99", defaultValue: chat.chatnumber }))),
                React.createElement(Form.Group, { as: Row },
                    React.createElement(Form.Label, { className: "edit-chat-title", column: true, sm: "3" }, "Title:"),
                    React.createElement(Col, null,
                        React.createElement(Form.Control, { className: "edit-chat-input-title", type: "text", ref: titleRef, as: "textarea", placeholder: "Insert a title", defaultValue: chat.title, rows: 2 }))),
                React.createElement(Form.Group, { className: "edit-chat-top", as: Row },
                    React.createElement(Form.Label, { className: "edit-chat-description", column: true, sm: "3" }, "Description:"),
                    React.createElement(Col, null,
                        React.createElement(Form.Control, { className: "edit-chat-input-description", type: "text", as: "textarea", ref: descriptionRef, placeholder: "Give a brief summary or description of your chat", defaultValue: chat.description, rows: 5 }))),
                React.createElement(Form.Group, { className: "edit-chat-top", as: Row },
                    React.createElement(Form.Label, { className: "edit-chat-tags", column: true, sm: "3" },
                        "Tags:",
                        ' '),
                    React.createElement(Col, null,
                        React.createElement(Form.Control, { className: "edit-chat-input-tags", type: "text", ref: tagsRef, as: "textarea", rows: 4, placeholder: "E.g. philosophy, theory of mind etc.", defaultValue: chat.tags }))),
                user.admin ? (React.createElement(Form.Group, { className: "edit-chat-top", as: Row },
                    React.createElement(Form.Label, { className: "edit-chat-author", column: true, sm: "3" }, "Author:"),
                    React.createElement(Col, null,
                        React.createElement(Form.Control, { className: "edit-chat-input-author", type: "text", ref: authorRef, defaultValue: chat.author })))) : null,
                user.admin ? (React.createElement(Form.Group, { as: Row },
                    React.createElement(Form.Label, { className: "edit-chat-admin", column: true, sm: "3" },
                        toggleAdmin ? 'Admin' : 'User',
                        ":"),
                    React.createElement(Col, null,
                        React.createElement("div", { className: toggleAdmin
                                ? 'edit-chat-toggle-admin'
                                : 'edit-chat-toggle-user' },
                            React.createElement(Form.Check, { type: "switch", id: "edit-chat-toggle", onChange: () => toggleAdminChat(), checked: toggleAdmin ? true : false }))))) : null,
                React.createElement(Form.Group, { as: Row },
                    React.createElement(Form.Label, { className: "edit-chat-language", column: true, sm: "3" }, "Language:"),
                    React.createElement(Col, null,
                        React.createElement("select", { className: "edit-chat-language-select", value: chat.language, onChange: changeLanguage }, user.selectLanguage.map((lang) => {
                            return (React.createElement("option", { value: lang, key: uuidv4() }, lang));
                        })))),
                React.createElement(Form.Group, { as: Row },
                    React.createElement(Form.Label, { className: "edit-chat-date", column: true, sm: "3" }, "Published:"),
                    React.createElement(Col, null,
                        React.createElement(Form.Control, { className: "edit-chat-input-date", type: "text", ref: dateRef, placeholder: "yyyy-mm-dd", defaultValue: chat.date }))),
                React.createElement("br", null))) : (React.createElement("div", { className: window.innerWidth <= 1000
                    ? 'edit-chat-scroll-mobile'
                    : 'edit-chat-scroll' },
                React.createElement("div", { className: "chat-details" },
                    React.createElement("p", null, "Chatnumber:"),
                    React.createElement("p", { className: "chat-info", id: "chat-number" }, chat.chatnumber === 0 ? '' : chat.chatnumber)),
                React.createElement("div", { className: "chat-details" },
                    React.createElement("p", null, "Title:"),
                    React.createElement("p", { className: "chat-info" }, chat.title)),
                React.createElement("div", { className: "chat-details" },
                    React.createElement("p", null, "Description:"),
                    React.createElement("p", { className: "chat-info", id: "chat-info-description" }, chat.description)),
                React.createElement("div", { className: "chat-details" },
                    React.createElement("p", null, "Tags:"),
                    React.createElement("p", { className: "chat-info", id: "chat-info-tags" }, chat.tags)),
                React.createElement("div", { className: "chat-details" },
                    React.createElement("p", null, "Protagonists:"),
                    React.createElement("div", { className: "chat-info" }, chat.philosopher.map((phil) => {
                        return (React.createElement("p", { key: uuidv4(), id: "chat-info-phil" }, phil.name));
                    }))),
                React.createElement("div", { className: "chat-details", id: "chat-info-description-margin" },
                    React.createElement("p", null, "Author:"),
                    React.createElement("p", { className: "chat-info" }, chat.author)),
                user.admin ? (React.createElement("div", { className: "chat-details" },
                    React.createElement("p", null, "Status:"),
                    React.createElement("p", { className: "chat-info" }, chat.chatEditmode
                        ? chat.admin
                            ? 'Admin'
                            : 'User'
                        : null))) : null,
                React.createElement("div", { className: "chat-details" },
                    React.createElement("p", null, "Language:"),
                    React.createElement("p", { className: "chat-info" }, chat.language)),
                React.createElement("div", { className: "chat-details" },
                    React.createElement("p", null, "Messages:"),
                    React.createElement("p", { className: "chat-info", id: "chat-messages" }, chat.messages.length !== 0
                        ? chat.messages.length
                        : null)),
                React.createElement("div", { className: "chat-details" },
                    React.createElement("p", null, "Published:"),
                    React.createElement("p", { className: "chat-info", id: "chat-messages" }, chat.messages.length !== 0 ? chat.date : null)),
                React.createElement("div", { className: "chat-details", id: "chat-details-download" },
                    React.createElement("p", null, "Download:"),
                    React.createElement("div", { className: "chat-info" }, download ? (React.createElement(PDFDownloadLink, { document: React.createElement(PDF, { title: chat.title, data: chat.messages, author: chat.author, date: chat.date }), fileName: chat.title + '.pdf', className: "link-download-chat" }, ({ blob, url, loading, error }) => loading ? 'loading...' : 'download')) : (React.createElement("p", { className: 'link-download-chat', onClick: () => pdfdownload(chat.chatId) }, chat.title ? chat.title + '.pdf' : null)))))),
            React.createElement("div", { className: "edit-chat-border" }, ''),
            React.createElement("div", { className: "edit-chat-spinner" }, spinner ? (React.createElement(Spinner, { animation: "border", role: "status" })) : null),
            React.createElement("div", { className: "edit-chat-actions" },
                !edit ? (React.createElement(Button, { label: "Edit details", className: "edit-chat-btn", handleClick: () => setEdit(true) })) : (React.createElement(Button, { label: "Save changes", className: "edit-chat-btn", type: "submit", handleClick: () => setSave(true) })),
                !edit ? (React.createElement(Button, { label: "Save as draft", className: "edit-chat-btn", handleClick: () => saveAsDraft() })) : null,
                !edit ? (React.createElement(Button, { label: "Clear", className: "edit-chat-btn-clear", handleClick: () => clear() })) : (React.createElement(Button, { label: "Back", className: "edit-chat-btn-clear", handleClick: () => setEdit(false) })),
                !edit ? (React.createElement(Button, { label: "Delete", className: "edit-chat-btn-delete", handleClick: () => deleteThisChat(chat.chatId) })) : null))));
};
export default EditChats;
//# sourceMappingURL=EditChats.js.map