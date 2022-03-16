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
import Button from '../elements/Button/Button';
import Panel from '../elements/Panel/Panel';
import { useAuth } from './AuthContext';
export default function ForgotPassword() {
    // ref
    const emailRef = useRef(null);
    // useState
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    // firebase
    const { resetPassword } = useAuth();
    // router-dom
    const history = useNavigate();
    function handleSubmit(e) {
        return __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            try {
                setMessage('');
                setError('');
                setLoading(true);
                yield resetPassword(emailRef.current ? emailRef.current.value : null);
                setMessage('Check your Inbox for further instructions');
            }
            catch (_a) {
                setError('Failed to reset password');
            }
            setLoading(false);
            setTimeout(() => {
                history('/');
            }, 5000);
        });
    }
    //------------------- RETURN --------------------------------------------------------------
    return (React.createElement(Panel, { id: "auth", title: "Reset your password" },
        React.createElement("div", { className: "text-center mb-4" },
            error && (React.createElement(Alert, { className: "auth-alert", variant: "danger" }, error)),
            message && React.createElement("p", { className: "auth-alert" }, message)),
        React.createElement(Form, { onSubmit: handleSubmit },
            React.createElement(Form.Group, { id: "email-forgot", as: Row },
                React.createElement(Form.Label, { column: true, sm: "2" }, "Email:"),
                React.createElement(Col, null,
                    React.createElement(Form.Control, { id: "auth-input", type: "email", ref: emailRef, required: true, placeholder: "Enter email" }))),
            React.createElement("div", { className: "auth-actions-forgot" },
                React.createElement(Button, { disabled: loading, label: "Reset Password", className: "auth-btn", id: "auth-btn-reset", type: "submit" })),
            React.createElement("div", { className: "auth-actions" },
                React.createElement(Link, { className: "auth-link", to: "/" }, "Log in")),
            React.createElement("div", { className: "auth-actions", id: "signup-link" },
                React.createElement(Link, { className: "auth-link", to: "/signup" }, "Sign up")))));
}
//# sourceMappingURL=ForgotPassword.js.map