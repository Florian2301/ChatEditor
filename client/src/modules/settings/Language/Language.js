import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../redux/hooks/useTypeSelector.js';
import { selectLanguage } from '../../../redux/actions/user/user.js';
const Language = () => {
    // useState
    const [select, setSelect] = useState('deutsch');
    // state
    const dispatch = useDispatch();
    const user = useTypedSelector((state) => state.user);
    function handleChange(event) {
        setSelect(event.target.value);
        dispatch(selectLanguage(event.target.value));
    }
    // -----------------------------------------------------------------------------------
    return (React.createElement("div", { className: "switch" },
        React.createElement(Form, null,
            React.createElement(Form.Group, { as: Row },
                React.createElement("select", { className: "options-language-select", value: select, onChange: handleChange }, user.selectLanguage.map((lang) => {
                    return (React.createElement("option", { value: lang, key: uuidv4() }, lang));
                }))))));
};
export default Language;
//# sourceMappingURL=Language.js.map