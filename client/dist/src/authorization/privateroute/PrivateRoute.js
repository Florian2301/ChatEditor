import { Navigate } from 'react-router-dom';
import React from 'react';
import { useAuth } from '../authcontext/AuthContext';
export default function PrivateRoute({ children }) {
    const { currentUser } = useAuth();
    return currentUser ? children : React.createElement(Navigate, { to: "/" });
}
//# sourceMappingURL=PrivateRoute.js.map