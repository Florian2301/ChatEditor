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
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { clearDisplay, getUser, logOut, setKeyL, setKeyR, } from '../../redux/actions/user/user';
import { Alert } from 'react-bootstrap';
import Button from '../../elements/Button/Button';
import Language from '../../modules/settings/Language/Language';
import Panel from '../../elements/Panel/Panel';
import SelectView from '../../modules/settings/SelectView/SelectView';
import firebase from 'firebase/compat/app';
import { useAuth } from '../authcontext/AuthContext';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../redux/hooks/useTypeSelector';
export function Dashboard(props) {
    // state
    const dispatch = useDispatch();
    const user = useTypedSelector((state) => state.user);
    // useState
    const [error, setError] = useState('');
    const [welcome, setWelcome] = useState(true);
    const [updateProfile, setUpdateProfile] = useState(true);
    const [userLoggedOut, setUserLoggedOut] = useState(false);
    // firebase
    const { currentUser, logout } = useAuth();
    const history = useNavigate();
    // variables
    const update = 'Your profile has been updated successfully!';
    let welcomeMessage = '';
    // get all Users for further actions (when update Profile is clicked)
    function getUsers() {
        dispatch(getUser());
    }
    // go to startpage
    function clear() {
        dispatch(clearDisplay());
        dispatch(setKeyL('userchats'));
        dispatch(setKeyR('about'));
    }
    // log out via firebase
    function handleLogout() {
        return __awaiter(this, void 0, void 0, function* () {
            dispatch(clearDisplay());
            dispatch(logOut()); // reset state.user
            setUserLoggedOut(true);
            setError('');
            try {
                yield logout();
                history('/');
                dispatch(setKeyL('userchats'));
                dispatch(setKeyR('about'));
            }
            catch (_a) {
                setError('Log out failed');
            }
        });
    }
    // get currentUser for welcome message
    let userFirebase = firebase.auth().currentUser;
    if (userFirebase) {
        welcomeMessage = 'Welcome ' + userFirebase.displayName + '!';
    }
    // if page reloads, user still logged in
    firebase.auth().onAuthStateChanged((userFirebase) => {
        if (userFirebase && !user.loggedIn && !userLoggedOut) {
            dispatch(getUser(userFirebase.displayName !== null ? userFirebase.displayName : ''));
        }
    });
    // set welcome message and timout after 10 sec
    useEffect(() => {
        const timer = setTimeout(() => {
            setWelcome(false);
        }, 10000);
        return () => {
            clearTimeout(timer);
        };
    }, []);
    // set update message and timout after 10 sec
    useEffect(() => {
        const timer = setTimeout(() => {
            setUpdateProfile(false);
        }, 10000);
        return () => {
            clearTimeout(timer);
        };
    }, []);
    // ----------------------------- RETURN ----------------------------------------------------------------------
    return (React.createElement(Panel, { id: "auth", title: "Your profile" },
        React.createElement("div", { className: "options" },
            React.createElement("h3", { className: "dashboard-settings" }, "Settings"),
            React.createElement("br", null),
            React.createElement("p", null, "I. Select a view for your device"),
            React.createElement(SelectView, { auto: props.auto, desktop: props.desktop, tablet: props.tablet, mobile: props.mobile, id: props.id })),
        React.createElement("div", { className: "options" },
            React.createElement("p", null, "II. Select language of chats"),
            React.createElement(Language, null)),
        React.createElement("div", { className: "options" },
            React.createElement("p", null, "III. Go back to startpage"),
            React.createElement("p", { id: "options-link-clear", onClick: clear }, "Startpage")),
        React.createElement("div", { className: "dasboard-border" }, ''),
        React.createElement("div", { className: "text-center mb-4" },
            error && (React.createElement(Alert, { className: "auth-alert", variant: "danger" }, error)),
            welcome && user.welcome ? (React.createElement("p", { className: "auth-alert" }, welcomeMessage)) : null,
            updateProfile && user.update ? (React.createElement("p", { className: "auth-alert" }, update)) : null),
        React.createElement("div", { className: "auth-user" },
            React.createElement("strong", { id: "auth-strong-username" }, "User:"),
            currentUser.displayName),
        React.createElement("div", { className: "auth-user" },
            React.createElement("strong", { id: "auth-strong-email" }, "Email:"),
            currentUser.email),
        React.createElement("div", { className: "dasboard-border" }, ''),
        React.createElement("div", { className: "auth-actions", id: "auth-actions-logout" },
            React.createElement(Button, { handleClick: handleLogout, className: "auth-btn", label: "Log out" })),
        React.createElement("div", { className: "auth-actions", id: "update-link" },
            React.createElement(Link, { to: "/update-profile", className: "auth-link", onClick: getUsers }, "Update Profile"))));
}
export default Dashboard;
//# sourceMappingURL=Dashboard.js.map