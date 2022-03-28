import { changeModus, setKeyL, setKeyR } from '../../../redux/actions/user/user';
import { Form } from 'react-bootstrap';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../redux/hooks/useTypeSelector';
const SelectView = (props) => {
    // state
    const dispatch = useDispatch();
    const user = useTypedSelector((state) => state.user);
    function handleChange(e) {
        const modus = e.currentTarget.id;
        dispatch(changeModus(modus));
        if (modus === 'auto') {
            props.auto();
            dispatch(setKeyR(!user.loggedIn ? 'settings' : 'login'));
            dispatch(setKeyL('userchats'));
        }
        if (modus === 'desktop') {
            props.desktop();
            dispatch(setKeyR(!user.loggedIn ? 'settings' : 'login'));
        }
        if (modus === 'tablet') {
            props.tablet();
            dispatch(setKeyL('userchats'));
            dispatch(setKeyR(!user.loggedIn ? 'settings' : 'login'));
        }
        if (modus === 'mobile') {
            props.mobile();
            dispatch(setKeyL(!user.loggedIn ? 'settings' : 'login'));
        }
    }
    // ----------------------------------------------------------------------------------------------------------
    return (React.createElement(Form, { id: props.id },
        React.createElement(Form.Check, { style: { fontSize: '12px' }, inline: true, label: "auto", name: "modi", type: "radio", id: "auto", onChange: (e) => handleChange(e), checked: user.modus === 'auto' ? true : false }),
        React.createElement(Form.Check, { style: { fontSize: '12px' }, inline: true, label: "desktop", name: "modi", type: "radio", id: "desktop", onChange: (e) => handleChange(e), checked: user.modus === 'desktop' ? true : false, disabled: window.innerWidth <= 1400 ? true : false }),
        React.createElement(Form.Check, { style: { fontSize: '12px' }, inline: true, label: "tablet", name: "modi", type: "radio", id: "tablet", onChange: (e) => handleChange(e), checked: user.modus === 'tablet' ? true : false, disabled: window.innerWidth <= 1000 ? true : false }),
        React.createElement(Form.Check, { style: { fontSize: '12px' }, inline: true, label: "mobile", name: "modi", type: "radio", id: "mobile", onChange: (e) => handleChange(e), checked: user.modus === 'mobile' ? true : false })));
};
export default SelectView;
//# sourceMappingURL=SelectView.js.map