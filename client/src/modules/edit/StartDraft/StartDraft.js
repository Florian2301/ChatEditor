import React, { useRef, useState } from 'react';
import './StartDraft.css';
import { v4 as uuidv4 } from 'uuid';
import { Form, Alert, Col, Row, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../redux/hooks/useTypeSelector.js';
import { addPhil, saveDraft, getDrafts, selectColor, addColor, } from '../../../redux/actions/draft/draft.js';
import { clearDisplay } from '../../../redux/actions/user/user.js';
import Button from '../../../elements/Button/Button.js';
import Panel from '../../../elements/Panel/Panel.js';
const StartDraft = () => {
    // state
    const dispatch = useDispatch();
    const draft = useTypedSelector((state) => state.draft);
    const user = useTypedSelector((state) => state.user);
    // date variable
    const date = new Date();
    // Refs
    const titleRef = useRef(null);
    const philRef = useRef(null);
    const colorRef = useRef(null);
    // useState
    const [error, setError] = useState('');
    const [spinner, setSpinner] = useState(false);
    const [reset, setReset] = useState(false);
    // catches key-event (esc/enter)
    function keyEventInputTitle(event) {
        if (event.code === 'Enter' || event.code === 'NumpadEnter') {
            event.preventDefault();
        }
        else if (event.code === 'Escape') {
            // clear input add name and color
            titleRef.current ? titleRef.current.value = '' : null;
        }
    }
    // catches key-event (esc/enter)
    function keyEventInput(event) {
        if (event.code === 'Enter' || event.code === 'NumpadEnter') {
            event.preventDefault();
            //add new name
            addName();
        }
        else if (event.code === 'Escape') {
            // clear input add name and color
            philRef.current ? philRef.current.value = '' : null;
        }
    }
    function addName() {
        // delete color from list of colors
        const color = colorRef.current ? colorRef.current.value : draft.colors[0];
        dispatch(selectColor(color));
        // set new name
        let names = [];
        if (draft.philosopher) {
            names = draft.philosopher;
        }
        const newName = philRef.current ? philRef.current.value : '';
        if (newName === '') {
            return;
        }
        if (newName && names.length <= 5) {
            names.push({ name: newName, color: color });
            dispatch(addPhil(names));
            philRef.current ? philRef.current.value = '' : null;
        }
        else {
            setError('You can only add up to 6 names to your chat');
            philRef.current ? philRef.current.value = '' : null;
            setTimeout(() => {
                setError('');
            }, 5000);
        }
        // spinner
        setSpinner(true);
        setTimeout(() => {
            setSpinner(false);
        }, 500);
    }
    function removeName(name) {
        // remove name from array
        let names = draft.philosopher;
        names.splice(names.indexOf(name), 1);
        dispatch(addPhil(names));
        // add removed color to array
        let colors = draft.colors;
        colors.push(name.color);
        dispatch(addColor(colors));
        // spinner
        setSpinner(true);
        setTimeout(() => {
            setSpinner(false);
        }, 500);
    }
    function handleSubmit(e) {
        e.preventDefault();
        if (!reset) {
            const title = titleRef.current ? titleRef.current.value : 'no title';
            const updateDraft = date.toLocaleDateString('en-CA', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            });
            if (!title) {
                return setError('Please insert a title');
            }
            dispatch(saveDraft(user.userId, user.username, title, user.username, updateDraft, user.language, draft.tags, draft.description, draft.philosopher, draft.messages, user.admin));
            // clear data and get updated draftlist
            dispatch(clearDisplay());
            setTimeout(() => {
                dispatch(getDrafts(user.userId));
            }, 500);
        }
        else {
            // clear button
            dispatch(clearDisplay());
            titleRef.current ? titleRef.current.value = '' : null;
            philRef.current ? philRef.current.value = '' : null;
        }
        setReset(false);
        setError('');
    }
    // ----------------------------------- RETURN --------------------------------------------------------------------------
    return (React.createElement(Panel, { id: "startDraft", title: "Start a draft for a new chat" },
        React.createElement("div", { className: "text-center mb-4" }, error && React.createElement(Alert, { variant: "danger" }, error)),
        React.createElement(Form, { onSubmit: handleSubmit },
            React.createElement(Form.Group, { as: Row },
                React.createElement(Form.Label, { id: "start-title", column: true, sm: "3" }, "Title:*"),
                React.createElement(Col, null,
                    React.createElement(Form.Control, { id: "start-input-title", type: "name", ref: titleRef, autoFocus: true, placeholder: "Set a title for your chat", onKeyDown: keyEventInputTitle }))),
            React.createElement(Form.Group, { as: Row },
                React.createElement(Form.Label, { id: "start-add-name", column: true, sm: "3" },
                    ' ',
                    "Protagonist:*"),
                React.createElement(Col, null,
                    React.createElement(Form.Control, { id: "start-add-input-name", type: "name", ref: philRef, placeholder: "Name of philosopher", onKeyDown: keyEventInput }))),
            React.createElement(Form.Group, { as: Row },
                React.createElement(Col, null,
                    React.createElement("select", { className: "start-name-color-select", defaultValue: draft.colors[0], ref: colorRef }, draft.colors.map((col) => {
                        return (React.createElement("option", { value: col, key: uuidv4() }, col));
                    }))),
                React.createElement(Col, null,
                    React.createElement("p", { className: "start-add-name-link", onClick: () => addName() }, "+add name"))),
            React.createElement("div", { className: "start-spinner" }, spinner ? (React.createElement(Spinner, { animation: "border", role: "status" })) : null),
            draft.philosopher[0] ? (React.createElement("div", { className: "start-border1" }, '')) : null,
            draft.philosopher.map((phil) => {
                return (React.createElement(Form.Group, { as: Row, key: uuidv4() },
                    React.createElement(Col, null,
                        React.createElement("p", { id: "start-input-name" }, phil.name)),
                    React.createElement(Col, null,
                        React.createElement("p", { className: "start-name-remove", onClick: () => removeName(phil) }, "remove"))));
            }),
            React.createElement("div", { className: "start-border2" }, ''),
            React.createElement("div", { className: "start-actions" },
                React.createElement(Button, { label: "New chat", id: "start-btn", type: "submit" }),
                React.createElement(Button, { label: "Clear", id: "start-btn-clear", type: "submit", handleClick: () => setReset(true) })))));
};
export default StartDraft;
//# sourceMappingURL=StartDraft.js.map