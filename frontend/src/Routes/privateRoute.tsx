import { useAppSelector } from "../Redux/store";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
    const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
export const PublicRoute = () => {
    const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};