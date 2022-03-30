import '../Authorization.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider } from '../authcontext/AuthContext';
import { Container } from 'react-bootstrap';
import Dashboard from '../dashboard/Dashboard';
import ForgotPassword from '../forgotpassword/ForgotPassword';
import Login from '../login/Login';
import PrivateRoute from '../privateroute/PrivateRoute';
import React from 'react';
import SignUp from '../signup/SignUp';
import UpdateProfile from '../updateprofile/UpdateProfile';
import { useTypedSelector } from '../../redux/hooks/useTypeSelector';
export default function Authorization(props) {
    const user = useTypedSelector((state) => state.user);
    return (React.createElement(Container, { className: "d-flex" },
        React.createElement("div", { className: "w-100" },
            React.createElement(Router, null,
                React.createElement(AuthProvider, null,
                    React.createElement(Routes, null,
                        React.createElement(Route, { path: "/", element: React.createElement(Login, null) }),
                        React.createElement(Route, { path: "/dashboard", element: React.createElement(PrivateRoute, null,
                                React.createElement(Dashboard, { auto: props.auto, desktop: props.desktop, tablet: props.tablet, mobile: props.mobile, id: props.id })) }),
                        React.createElement(Route, { path: "/update-profile", element: React.createElement(PrivateRoute, null,
                                React.createElement(UpdateProfile, null)) }),
                        React.createElement(Route, { path: "/signup", element: React.createElement(SignUp, null) }),
                        React.createElement(Route, { path: "/forgot-password", element: React.createElement(ForgotPassword, null) })))))));
}
//# sourceMappingURL=Authorization.js.map