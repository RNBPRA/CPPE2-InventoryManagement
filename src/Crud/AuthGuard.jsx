import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
    const isAuthenticated = localStorage.getItem('authToken'); // Replace with your auth check logic

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AuthGuard;
