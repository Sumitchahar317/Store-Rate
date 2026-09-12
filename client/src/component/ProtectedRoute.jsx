import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ROLE_REDIRECTS = {
  ADMIN: "/admin",
  STORE_OWNER: "/owner",
};

export default function ProtectedRoute({ allowedRoles, children }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles?.length && !allowedRoles.includes(user.role)) {
    const fallbackPath = ROLE_REDIRECTS[user.role] || "/stores";
    return <Navigate to={fallbackPath} replace />;
  }

  return children || <Outlet />;
}