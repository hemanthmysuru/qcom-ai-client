import { Navigate, Outlet, Route, RouteProps } from "react-router-dom";

interface IPublicRouteProps {
    isAuthenticated: boolean;
    redirectTo?: string;
}

const PublicRoute: React.FC<IPublicRouteProps> = ({ isAuthenticated, redirectTo = '/' }) => {
    console.log('isAuthenticated:: ', isAuthenticated);
    return !isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
}

export default PublicRoute;