import React from 'react';
import AccessDenied from './AccessDenied';

interface PrivateRouteProps {
    element: React.ReactElement;
    isAuthenticated: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, isAuthenticated }) => {
    return isAuthenticated ? element : <AccessDenied />
};

export default PrivateRoute;