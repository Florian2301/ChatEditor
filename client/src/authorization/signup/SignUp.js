var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Alert, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import React, { useRef, useState } from 'react';
import Button from '../../elements/Button/Button';
import Panel from '../../elements/Panel/Panel';
import { addUserToDB } from '../../redux/actions/user/user';
import { useAuth } from '../authcontext/AuthContext';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../redux/hooks/useTypeSelector.js';
export function SignUp() {
    // state
    const dispatch = useDispatch();
    const user = useTypedSelector((state) => state.user);
    // ref
    const usernameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const passwordConfirmRef = useRef(null);
    // firebase
    const { signup } = useAuth();
    // useState
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    // router dom
    const history = useNavigate();
    // check if username or useremail already exist in database
    let checkName;
    let checkMail;
    function inputName(e) {
        checkName = e.currentTarget.value; // get user input
        return checkName;
    }
    function inputMail(e) {
        checkMail = e.currentTarget.value; // get user input
        return checkMail;
    }
    // submit data to create profile in firebase + database
    function handleSubmit(e) {
        return __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            let newName = usernameRef.current ? usernameRef.current.value : null;
            user.allUsers.map((u) => {
                // get username from all users in database
                if (u.username === checkName) {
                    // check if username already exists
                    newName = null;
                    return newName;
                }
                return newName;
            });
            if (!newName) {
                return setError(newName + ' does already exists');
            }
            let newEmail = emailRef.current ? emailRef.current.value : null;
            user.allUsers.map((u) => {
                // get useremail from all users in database
                if (u.email === checkMail) {
                    // check if useremail already exists
                    newEmail = null;
                    return newEmail;
                }
                return newEmail;
            });
            if (!newEmail) {
                return setError(newEmail + ' does already exists');
            }
            const password = passwordRef.current ? passwordRef.current.value : null;
            const passwordConfirm = passwordConfirmRef.current ? passwordConfirmRef.current.value : null;
            if (password !== passwordConfirm) {
                // check if passwords match
                return setError('Passwords do not match');
            }
            if (!error) {
                // check if error is set by check username/email/password
                try {
                    setError('');
                    setLoading(true);
                    yield signup(newName, newEmail, password); // create profile in firebase
                    dispatch(addUserToDB(newName, newEmail)); // create profile in database
                    history('/');
                }
                catch (_a) {
                    setError('Failed to create an account');
                }
            }
            else {
                history('/');
            }
            setLoading(false);
        });
    }
    // ---------------------------------- RETURN ------------------------------------------------------------------------------------
    return (React.createElement(Panel, { id: "auth", title: "Sign up" },
        React.createElement("div", { className: "text-center mb-4" }, error && (React.createElement(Alert, { className: "auth-alert", variant: "danger" }, error))),
        React.createElement(Form, { onSubmit: handleSubmit },
            React.createElement(Form.Group, { id: "signup", as: Row },
                React.createElement(Form.Label, { column: true, sm: "3" }, "Username:"),
                React.createElement(Col, null,
                    React.createElement(Form.Control, { id: "auth-input", type: "name", ref: usernameRef, required: true, autoFocus: true, onChange: inputName, placeholder: "Username" }))),
            React.createElement(Form.Group, { as: Row },
                React.createElement(Form.Label, { column: true, sm: "3" }, "Email:"),
                React.createElement(Col, null,
                    React.createElement(Form.Control, { id: "auth-input", type: "email", ref: emailRef, required: true, onChange: inputMail, placeholder: "Email" }))),
            React.createElement(Form.Group, { as: Row },
                React.createElement(Form.Label, { column: true, sm: "3" }, "Password:"),
                React.createElement(Col, null,
                    React.createElement(Form.Control, { id: "auth-input", type: "password", ref: passwordRef, required: true, placeholder: "Password" }))),
            React.createElement(Form.Group, { as: Row },
                React.createElement(Form.Label, { column: true, sm: "3" }, "Confirm:"),
                React.createElement(Col, null,
                    React.createElement(Form.Control, { id: "auth-input", type: "password", ref: passwordConfirmRef, required: true, placeholder: "Confirm password" }))),
            React.createElement("div", { className: "auth-actions-signup" },
                React.createElement(Button, { disabled: loading, label: "Sign up", className: "auth-btn", type: "submit" })),
            React.createElement("div", { className: "auth-actions", id: "login-link" },
                React.createElement(Link, { className: "auth-link", to: "/" }, "Log in")))));
}
export default SignUp;
//# sourceMappingURL=SignUp.js.map