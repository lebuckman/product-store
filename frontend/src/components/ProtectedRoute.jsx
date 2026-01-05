import { Navigate } from "react-router";
import useAuthReq from "../hooks/useAuthReq";

const ProtectedRoute = ({ children }) => {
    const { isSignedIn } = useAuthReq();
    return isSignedIn ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
