import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface IProtectedRouteProps {
    isAuthenticated: boolean;
    requiredPermission?: string;
    userPermissions?: string[];
    redirectTo?: string;
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({
    isAuthenticated,
    requiredPermission,
    userPermissions = [],
    redirectTo = '/login'
}) => {
    const hasPermission = requiredPermission ? userPermissions.includes(requiredPermission) : true;
    console.log(requiredPermission, userPermissions, hasPermission, isAuthenticated);

    return isAuthenticated && hasPermission ? <Outlet /> : <Navigate to={redirectTo} />;
}

export default ProtectedRoute;
