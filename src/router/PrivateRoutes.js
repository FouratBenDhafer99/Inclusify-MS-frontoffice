import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({isAuth, redirectPath, children,}) => {
    if (!isAuth) {
        return (
            <Navigate to={redirectPath} replace/>
        );
    }
    return children ? children : <Outlet/>;
};
export default ProtectedRoute;