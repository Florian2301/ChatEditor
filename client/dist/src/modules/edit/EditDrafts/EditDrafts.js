import './EditDrafts.css';
import { Alert, Col, Form, Row, Spinner } from 'react-bootstrap';
import React, { useEffect, useRef, useState } from 'react';
import { addPhil, deleteDraft, getDrafts, selectColor, updateDraft, } from '../../../redux/actions/draft/draft';
import { getUserChats, saveChat } from '../../../redux/actions/chat/chat';
import Button from '../../../elements/Button/Button';
import PDF from '../../../elements/PDF/PDF';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Panel from '../../../elements/Panel/Panel';
import { clearDisplay } from '../../../redux/actions/user/user';
import { publishTitle } from '../../../redux/actions/title/title';
import { setNewName } from './Functions';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../redux/hooks/useTypeSelector';
import { v4 as uuidv4 } from 'uuid';
const EditDrafts = () => {
    // state
    const dispatch = useDispatch();
    const draft = useTypedSelector((state) => state.draft);
    const chat = useTypedSelector((state) => state.chat);
    const user = useTypedSelector((state) => state.user);
    // date variable
    const date = new Date();
    // Names for Philosophers
    const phil1 = draft.philosopher[0];
    const phil2 = draft.philosopher[1];
    const phil3 = draft.philosopher[2];
    const phil4 = draft.philosopher[3];
    const phil5 = draft.philosopher[4];
    const phil6 = draft.philosopher[5];
    // useState
    const [error, setError] = useState('');
    const [spinner, setSpinner] = useState(false);
    const [edit, setEdit] = useState(false);
    const [save, setSave] = useState(false);
    const [draftLanguage, setDraftLanguage] = useState(draft.language);
    const [toggleAdmin, setToggleAdmin] = useState(true);
    const [download, setDownload] = useState(false);
    // Refs
    const titleRef = useRef(null);
    const addPhilRef = useRef(null);
    const colorRef = useRef(null);
    const editPhilRef1 = useRef(null);
    const editPhilRef2 = useRef(null);
    const editPhilRef3 = useRef(null);
    const editPhilRef4 = useRef(null);
    const editPhilRef5 = useRef(null);
    const editPhilRef6 = useRef(null);
    const tagsRef = useRef(null);
    const descriptionRef = useRef(null);
    const authorRef = useRef(null);
    // catches key-event (esc/enter)
    function addPhilEvent(event) {
        if (event.code === 'Enter') {
            event.preventDefault();
            // check if new name is set
            const newPhil = addPhilRef.current ? addPhilRef.current.value : false;
            if (newPhil === '') {
                return;
            }
            else {
                //add new name
                addName();
            }
        }
        else if (event.code === 'Escape') {
            // clear input add name
            addPhilRef.current ? addPhilRef.current.value = '' : null;
        }
    }
    // for select language
    function changeLanguage(event) {
        setDraftLanguage(event.target.value);
    }
    // if user = admin then he can save draft as "admin" or "user"
    function toggleAdminDraft() {
        setToggleAdmin(!toggleAdmin);
    }
    // prepare download as pdf and get drafts with last changes (messages)
    function pdfdownload(id) {
        setDownload(id);
        dispatch(getDrafts(draft.userId));
        // spinner
        setSpinner(true);
        setTimeout(() => {
            setSpinner(false);
        }, 1000);
    }
    // for updating list of colors to select for new name
    useEffect(() => {
        if (edit) {
            draft.colors.map((color) => {
                if (phil1 && phil1.color === color) {
                    dispatch(selectColor(color));
                }
                if (phil2 && phil2.color === color) {
                    dispatch(selectColor(color));
                }
                if (phil3 && phil3.color === color) {
                    dispatch(selectColor(color));
                }
                if (phil4 && phil4.color === color) {
                    dispatch(selectColor(color));
                }
                if (phil5 && phil5.color === color) {
                    dispatch(selectColor(color));
                }
                if (phil6 && phil6.color === color) {
                    dispatch(selectColor(color));
                }
                return draft.colors;
            });
        }
    }, [edit, draft.colors]);
    // add new name
    function addName() {
        // delete color from list of colors
        const color = colorRef.current ? colorRef.current.value : draft.colors[0];
        dispatch(selectColor(color));
        // set new name
        let names = draft.philosopher;
        const newName = addPhilRef.current ? addPhilRef.current.value : 'no name';
        names.push({ name: newName, color: color });
        dispatch(addPhil(names));
        // clear input
        addPhilRef.current ? addPhilRef.current.value = '' : null;
    }
    function handleSubmit(e) {
        e.preventDefault();
        // only save if "save" is clicked
        if (save) {
            // save title, title must be set
            const title = titleRef.current ? titleRef.current.value : false;
            if (!title) {
                return setError('Please insert a title');
            }
            // all messages to set new name / change existing name
            const messages = draft.messages;
            // 1. change name in messages
            // 2. save name and color of philosophers
            let philosopher = [];
            // philosopher 1
            if (phil1) {
                const editPhil1 = editPhilRef1.current ? editPhilRef1.current.value : 'no name';
                if (phil1.name !== editPhil1) {
                    setNewName(messages, phil1, editPhil1);
                }
                philosopher.push({
                    id: editPhil1,
                    name: editPhil1,
                    color: phil1.color,
                });
            }
            // philosopher 2
            if (phil2) {
                const editPhil2 = editPhilRef2.current ? editPhilRef2.current.value : 'no name';
                if (phil2.name !== editPhil2) {
                    setNewName(messages, phil2, editPhil2);
                }
                philosopher.push({
                    id: editPhil2,
                    name: editPhil2,
                    color: phil2.color,
                });
            }
            // philosopher 3
            if (phil3) {
                const editPhil3 = editPhilRef3.current ? editPhilRef3.current.value : 'no name';
                if (phil3.name !== editPhil3) {
                    setNewName(messages, phil3, editPhil3);
                }
                philosopher.push({
                    id: editPhil3,
                    name: editPhil3,
                    color: phil3.color,
                });
            }
            // philosopher 4
            if (phil4) {
                const editPhil4 = editPhilRef4.current ? editPhilRef4.current.value : 'no name';
                if (phil4.name !== editPhil4) {
                    setNewName(messages, phil4, editPhil4);
                }
                philosopher.push({
                    id: editPhil4,
                    name: editPhil4,
                    color: phil4.color,
                });
            }
            // philosopher 5
            if (phil5) {
                const editPhil5 = editPhilRef5.current ? editPhilRef5.current.value : 'no name';
                if (phil5.name !== editPhil5) {
                    setNewName(messages, phil5, editPhil5);
                }
                philosopher.push({
                    id: editPhil5,
                    name: editPhil5,
                    color: phil5.color,
                });
            }
            // philosopher 6
            if (phil6) {
                const editPhil6 = editPhilRef6.current ? editPhilRef6.current.value : 'no name';
                if (phil6.name !== editPhil6) {
                    setNewName(messages, phil6, editPhil6);
                }
                philosopher.push({
                    id: editPhil6,
                    name: editPhil6,
                    color: phil6.color,
                });
            }
            // save tags
            let tags = [];
            const tagsRefValue = tagsRef.current ? tagsRef.current.value : '';
            if (tagsRefValue !== '') {
                tags = tagsRefValue.split(',');
            }
            // save description
            let description = '';
            const descriptionRefValue = descriptionRef.current ? descriptionRef.current.value : '';
            if (descriptionRefValue !== '') {
                description = descriptionRefValue;
            }
            // save author
            let author = user.username;
            const authorRefValue = authorRef.current ? authorRef.current.value : '';
            if (user.admin) {
                if (authorRefValue !== '') {
                    author = authorRefValue;
                }
            }
            // check if user is admin and if draft should be saved as "admin" or "user"
            let admin = draft.admin;
            if (user.admin) {
                admin = toggleAdmin;
            }
            // save (new) date
            let updateDateOfDraft = draft.date;
            if (save) {
                updateDateOfDraft = date.toLocaleDateString('en-CA', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                });
            }
            //update draft
            const draftId = draft.draftId;
            const userId = user.userId;
            const published = draft.published;
            dispatch(updateDraft(draftId, title, author, published, updateDateOfDraft, draftLanguage, tags, description, philosopher, messages, admin));
            // clear data and get saved drafts
            setTimeout(() => {
                dispatch(getDrafts(userId));
            }, 500);
            setError('');
            setEdit(false);
            setSave(false);
            // spinner
            setSpinner(true);
            setTimeout(() => {
                setSpinner(false);
            }, 1000);
        }
    }
    // screen and set data back
    function clear() {
        dispatch(clearDisplay());
        setError('');
        setEdit(false);
        setSave(false);
        setDownload(false);
    }
    // publish draft as chat
    function publish() {
        const tags = draft.tags;
        const description = draft.description;
        const chatLanguage = draft.language;
        // tags and description must be set before publish (save as chat)
        if (!tags.length) {
            setError('Please insert tags before publishing');
            return;
        }
        if (!description) {
            setError('Please insert a description before publishing');
            return;
        }
        // set new chatnumber
        let chatnumber;
        let numberOfChats = [];
        chat.userChats.map((chat) => {
            if (chat.language === chatLanguage) {
                numberOfChats.push(chat);
            }
            return numberOfChats;
        });
        chatnumber = numberOfChats.length + 1;
        // date of publish
        let publishdate = date.toLocaleDateString('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
        const comments = [];
        //save as chat
        dispatch(saveChat(user.userId, user.username, chatnumber, draft.title, draft.author, publishdate, draft.language, draft.tags, draft.description, draft.philosopher, draft.messages, draft.admin, comments));
        // set draft as "published = true"
        dispatch(updateDraft(draft.draftId, draft.title, draft.author, true, publishdate, chatLanguage, draft.tags, draft.description, draft.philosopher, draft.messages, draft.admin));
        // update chatlist and set boolean for update new title in ChatboxBackend
        setTimeout(() => {
            dispatch(getUserChats(user.userId));
        }, 500);
        dispatch(publishTitle(chat.userChats.length));
        // spinner
        setSpinner(true);
        setTimeout(() => {
            setSpinner(false);
        }, 1000);
    }
    // delete draft, get all drafts after one draft is deleted and clear display
    function deleteThisDraft() {
        let answer = window.confirm('Delete this message?');
        if (answer) {
            dispatch(deleteDraft(draft.draftId));
            setTimeout(() => {
                dispatch(getDrafts(user.userId));
            }, 500);
            clear();
        }
        else {
            return;
        }
    }
    // ----------------------------------- RETURN --------------------------------------------------------------------------
    return (React.createElement(Panel, { id: "edit-draft-panel", title: "Edit your draft" },
        React.createElement("div", { className: "text-center mb-4" }, error && React.createElement(Alert, { variant: "danger" }, error)),
        React.createElement(Form, { onSubmit: handleSubmit },
            edit ? (React.createElement("div", { className: window.innerWidth <= 1000
                    ? 'edit-draft-scroll-mobile'
                    : 'edit-draft-scroll' },
                React.createElement(Form.Group, { as: Row, className: "edit-draft-top" },
                    React.createElement(Form.Label, { className: "edit-draft-title", column: true, sm: "3" }, "Title:"),
                    React.createElement(Col, null,
                        React.createElement(Form.Control, { className: "edit-draft-title-input", type: "name", ref: titleRef, as: "textarea", autoFocus: true, placeholder: "Choose a title for your chat", defaultValue: draft.title, rows: 2 }))),
                phil1 ? (React.createElement(Form.Group, { as: Row, className: "edit-draft-top" },
                    React.createElement(Form.Label, { className: "edit-draft-name", column: true, sm: "3" }, "Protagonists:"),
                    React.createElement(Col, null,
                        React.createElement(Form.Control, { className: "edit-draft-input-name", type: "name", ref: editPhilRef1, defaultValue: phil1.name })))) : null,
                phil2 ? (React.createElement(Form.Group, { as: Row, className: "edit-draft-top" },
                    React.createElement(Form.Label, { className: "edit-draft-name", column: true, sm: "3" }, ''),
                    React.createElement(Col, null,
                        React.createElement(Form.Control, { className: "edit-draft-input-name", type: "name", ref: editPhilRef2, defaultValue: phil2.name })))) : null,
                phil3 ? (React.createElement(Form.Group, { as: Row, className: "edit-draft-top-2" },
                    React.createElement(Form.Label, { className: "edit-draft-name", column: true, sm: "3" }, ''),
                    React.createElement(Col, null,
                        React.createElement(Form.Control, { className: "edit-draft-input-name", type: "name", ref: editPhilRef3, defaultValue: phil3.name })))) : null,
                phil4 ? (React.createElement(Form.Group, { as: Row, className: "edit-draft-top-2" },
                    React.createElement(Form.Label, { className: "edit-draft-name", column: true, sm: "3" }, ''),
                    React.createElement(Col, null,
                        React.createElement(Form.Control, { className: "edit-draft-input-name", type: "name", ref: editPhilRef4, defaultValue: phil4.name })))) : null,
                phil5 ? (React.createElement(Form.Group, { as: Row, className: "edit-draft-top-2" },
                    React.createElement(Form.Label, { className: "edit-draft-name", column: true, sm: "3" }, ''),
                    React.createElement(Col, null,
                        React.createElement(Form.Control, { className: "edit-draft-input-name", type: "name", ref: editPhilRef5, defaultValue: phil5.name })))) : null,
                phil6 ? (React.createElement(Form.Group, { as: Row, className: "edit-draft-top-2" },
                    React.createElement(Form.Label, { className: "edit-draft-name", column: true, sm: "3" }, ''),
                    React.createElement(Col, null,
                        React.createElement(Form.Control, { className: "edit-draft-input-name", type: "name", ref: editPhilRef6, defaultValue: phil6.name })))) : null,
                phil6 ? null : (React.createElement(Form.Group, { as: Row, className: "edit-draft-top-2" },
                    React.createElement(Form.Label, { className: "edit-draft-add-name", column: true, sm: "3" },
                        ' ',
                        "Add name:"),
                    React.createElement(Col, null,
                        React.createElement(Form.Control, { className: "edit-draft-add-name-input", type: "name", ref: addPhilRef, onKeyDown: addPhilEvent })))),
                phil6 ? null : (React.createElement(Form.Group, { as: Row, className: "edit-draft-top" },
                    React.createElement(Col, null,
                        React.createElement("select", { className: "edit-draft-name-color-select", defaultValue: draft.colors[0], ref: colorRef }, draft.colors.map((col) => {
                            return (React.createElement("option", { value: col, key: uuidv4() }, col));
                        }))),
                    React.createElement(Col, null,
                        React.createElement("p", { className: "edit-draft-add-name-link", onClick: () => addName() }, "+add name")))),
                React.createElement(Form.Group, { as: Row, className: "edit-draft-top-2" },
                    React.createElement(Form.Label, { className: "edit-draft-description", column: true, sm: "3" }, "Description:"),
                    React.createElement(Col, null,
                        React.createElement(Form.Control, { className: "edit-draft-description-input", type: "text", as: "textarea", ref: descriptionRef, placeholder: "Take notes for your chat", defaultValue: draft.description, rows: 5 }))),
                React.createElement(Form.Group, { as: Row, className: "edit-draft-top-2" },
                    React.createElement(Form.Label, { className: "edit-draft-tags", column: true, sm: "3" },
                        "Tags:",
                        ' '),
                    React.createElement(Col, null,
                        React.createElement(Form.Control, { className: "edit-draft-tags-input", type: "text", ref: tagsRef, as: "textarea", placeholder: "E.g. philosophy, theory of mind etc.", defaultValue: draft.tags, rows: 2 }))),
                user.admin ? (React.createElement(Form.Group, { as: Row, className: "edit-draft-top" },
                    React.createElement(Form.Label, { className: "edit-draft-author", column: true, sm: "3" }, "Author:"),
                    React.createElement(Col, null,
                        React.createElement(Form.Control, { className: "edit-draft-author-input", type: "text", ref: authorRef, defaultValue: draft.author })))) : null,
                user.admin ? (React.createElement(Form.Group, { as: Row },
                    React.createElement(Form.Label, { className: "edit-draft-admin", column: true, sm: "3" },
                        toggleAdmin ? 'Admin' : 'User',
                        ":"),
                    React.createElement(Col, null,
                        React.createElement("div", { className: toggleAdmin
                                ? 'edit-draft-admin-toggle'
                                : 'edit-draft-user-toggle' },
                            React.createElement(Form.Check, { type: "switch", id: "draft-details-toggle", onChange: () => toggleAdminDraft(), checked: toggleAdmin ? true : false }))))) : null,
                React.createElement(Form.Group, { as: Row, className: "edit-draft-top-3" },
                    React.createElement(Form.Label, { className: "edit-draft-language", column: true, sm: "3" }, "Language:"),
                    React.createElement(Col, null,
                        React.createElement("select", { className: "edit-draft-language-select", value: draftLanguage, onChange: changeLanguage }, user.selectLanguage.map((lang) => {
                            return (React.createElement("option", { value: lang, key: uuidv4() }, lang));
                        })))))) : (
            /* readonly draft details */
            React.createElement("div", { className: window.innerWidth <= 1000
                    ? 'edit-draft-scroll-mobile'
                    : 'edit-draft-scroll' },
                React.createElement("div", { className: "draft-details" },
                    React.createElement("p", null, "Title:"),
                    React.createElement("p", { className: "draft-info" }, draft.title)),
                React.createElement("div", { className: "draft-details" },
                    React.createElement("p", null, "Description:"),
                    React.createElement("p", { className: "draft-info", id: "draft-info-description" }, draft.description)),
                React.createElement("div", { className: "draft-details", id: "draft-details-tags" },
                    React.createElement("p", null, "Tags:"),
                    React.createElement("p", { className: "draft-info", id: "draft-info-tags" }, draft.tags)),
                React.createElement("div", { className: "draft-details" },
                    React.createElement("p", null, "Protagonists:"),
                    React.createElement("div", { className: "draft-info" }, draft.philosopher.map((phil) => {
                        return (React.createElement("p", { key: uuidv4(), id: "draft-info-phil" }, phil.name));
                    }))),
                React.createElement("div", { className: "draft-details", id: "draft-info-description-margin" },
                    React.createElement("p", null, "Author:"),
                    React.createElement("p", { className: "draft-info", id: "draft-author" }, draft.author)),
                user.admin ? (React.createElement("div", { className: "draft-details" },
                    React.createElement("p", null, "Status:"),
                    React.createElement("p", { className: "draft-info", id: "draft-admin" }, draft.admin ? 'Admin' : 'User'))) : null,
                React.createElement("div", { className: "draft-details" },
                    React.createElement("p", null, "Language:"),
                    React.createElement("p", { className: "draft-info", id: "draft-author" }, draft.language)),
                React.createElement("div", { className: "draft-details" },
                    React.createElement("p", null, "Messages:"),
                    React.createElement("p", { className: "draft-info", id: "draft-messages" }, draft.messages.length)),
                React.createElement("div", { className: "draft-details" },
                    React.createElement("p", null, "Published:"),
                    React.createElement("p", { className: "draft-info", id: "draft-date" }, draft.published ? 'Yes' : 'Nope')),
                React.createElement("div", { className: "draft-details" },
                    React.createElement("p", null, "Updated:"),
                    React.createElement("p", { className: "draft-info", id: "draft-date" }, draft.date)),
                React.createElement("div", { className: "draft-details", id: "draft-details-download" },
                    React.createElement("p", null, "Download:"),
                    React.createElement("div", { className: "draft-info" }, download ? (React.createElement(PDFDownloadLink, { document: React.createElement(PDF, { title: draft.title, data: draft.messages, author: draft.author, date: draft.date }), fileName: draft.title + '.pdf', className: "link-download-draft" }, ({ blob, url, loading, error }) => loading ? 'loading...' : 'download')) : (React.createElement("p", { className: 'link-download-draft', onClick: () => pdfdownload(draft.draftId) }, draft.title + '.pdf')))))),
            React.createElement("div", { className: "draft-details-border" }, ''),
            React.createElement("div", { className: "draft-details-spinner" }, spinner ? (React.createElement(Spinner, { animation: "border", role: "status" })) : null),
            React.createElement("div", { className: "draft-details-actions" },
                !edit ? (React.createElement(Button, { label: "Edit Details", className: "draft-details-btn", handleClick: () => setEdit(true) })) : (React.createElement(Button, { label: "Save changes", className: "draft-details-btn", type: "submit", handleClick: () => setSave(true) })),
                !edit ? (React.createElement(Button, { label: "Publish", className: "draft-details-btn", handleClick: () => publish() })) : null,
                !edit ? (React.createElement(Button, { label: "Clear", className: "draft-details-btn-clear", handleClick: () => clear() })) : (React.createElement(Button, { label: "Back", className: "draft-details-btn-clear", handleClick: () => setEdit(false) })),
                !edit ? (React.createElement(Button, { label: "Delete", className: "draft-details-btn-delete", handleClick: () => deleteThisDraft() })) : null))));
};
export default EditDrafts;
//# sourceMappingURL=EditDrafts.js.map