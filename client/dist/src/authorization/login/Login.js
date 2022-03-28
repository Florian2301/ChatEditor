var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import 'firebase/compat/auth';
import { Alert, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import React, { useRef, useState } from 'react';
import { getUser, welcome } from '../../redux/actions/user/user';
import Button from '../../elements/Button/Button';
import Panel from '../../elements/Panel/Panel';
import firebase from 'firebase/compat/app';
import { useAuth } from '../authcontext/AuthContext';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../redux/hooks/useTypeSelector';
export function Login() {
    // state
    const dispatch = useDispatch();
    const user = useTypedSelector((state) => state.user);
    // ref
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    // firebase
    const { login } = useAuth();
    // useState
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    // router-dom
    const history = useNavigate();
    // variables
    const verify = 'Please check your inbox to verify your email address';
    const goodbye = 'Your profile has been deleted successfully';
    const Email = require('../testuser/Testuser').TestuserEmail;
    const PW = require('../testuser/Testuser').TestuserPW;
    // submit data to login through firebase + get userdata from database
    function handleSubmit(e) {
        return __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            try {
                setError('');
                setLoading(true);
                yield login(emailRef.current ? emailRef.current.value : null, passwordRef.current ? passwordRef.current.value : null); // log in firebase
            }
            catch (_a) {
                setError('Failed to log in');
            }
            setLoading(false);
            dispatch(welcome()); // for welcome-message
            let userFirebase = firebase.auth().currentUser; // get currentUser from firebase
            if (userFirebase) {
                userFirebase.emailVerified ? history('/dashboard') : history('/'); // check if mailaddress is verified
                dispatch(getUser(userFirebase.displayName !== null ? userFirebase.displayName : '')); // get currentUser from database
            }
            else {
                history('/');
            }
        });
    }
    // submit data to login through firebase + get userdata from database
    function handleSubmitTestuser(e) {
        return __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            try {
                setError('');
                setLoading(true);
                yield login(Email, PW); // log in firebase as testuser
            }
            catch (_a) {
                setError('Failed to log in');
            }
            setLoading(false);
            dispatch(welcome()); // for welcome-message
            let userFirebase = firebase.auth().currentUser; // get currentUser from firebase
            if (userFirebase) {
                userFirebase.emailVerified ? history('/dashboard') : history('/'); // check if mailaddress is verified
                dispatch(getUser(userFirebase.displayName !== null ? userFirebase.displayName : '')); // get currentUser from database
            }
            else {
                history('/');
            }
        });
    }
    // get all users when "sign up" is clicked
    // to check during sign up process if username/email already exists
    function getUsers() {
        dispatch(getUser());
    }
    // ------------------------------------------ RETURN ---------------------------------------------------------------------
    return (React.createElement(Panel, { id: "auth", title: "Log in to your account" },
        React.createElement("div", { className: "text-center mb-4" },
            error && React.createElement(Alert, { variant: "danger" }, error),
            user.signUp ? (React.createElement(Alert, { className: "auth-alert", variant: "success" }, verify)) : null,
            user.delete ? (React.createElement(Alert, { className: "auth-alert", variant: "success" }, goodbye)) : null),
        React.createElement(Form, { onSubmit: handleSubmit },
            React.createElement(Form.Group, { id: "email-login", as: Row },
                React.createElement(Form.Label, { id: "auth-email", column: true, sm: "3" },
                    "Email:",
                    ' '),
                React.createElement(Col, null,
                    React.createElement(Form.Control, { id: "auth-input", type: "email", ref: emailRef, required: true, placeholder: "Enter email", defaultValue: "" }))),
            React.createElement(Form.Group, { as: Row },
                React.createElement(Form.Label, { column: true, sm: "3" }, "Password:"),
                React.createElement(Col, null,
                    React.createElement(Form.Control, { id: "auth-input", type: "password", ref: passwordRef, required: true, placeholder: "Enter password", defaultValue: "" }))),
            React.createElement("div", { className: "auth-actions" },
                React.createElement(Button, { disabled: loading, label: "Log in", className: "auth-btn", type: "submit" })),
            React.createElement("div", { className: "auth-actions" },
                React.createElement(Link, { className: "auth-link", to: "/signup", onClick: getUsers }, "Sign Up")),
            React.createElement("div", { className: "auth-actions", id: "forgotpassword-link" },
                React.createElement(Link, { className: "auth-link", to: "/forgot-password" }, "Forgot Password?"))),
        React.createElement("div", { className: "testuser-border" }, ''),
        React.createElement(Form, { onSubmit: handleSubmitTestuser },
            React.createElement("p", { className: "testuser-info" }, "You can also log in as a testuser and try out to write a chat!"),
            React.createElement("p", { className: "testuser-info" }, "Just click on the button below:"),
            React.createElement("div", { className: "auth-actions" },
                React.createElement(Button, { disabled: loading, label: "Testuser", className: "auth-btn", type: "submit" }))),
        React.createElement("br", null)));
}
export default Login;
//# sourceMappingURL=Login.js.map