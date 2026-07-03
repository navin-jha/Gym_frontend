import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");

  // User not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Role not allowed
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  // Authorized
  return children;
};

export default ProtectedRoute;
