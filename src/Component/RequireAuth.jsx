import Cookies from "js-cookie";
import { Navigate, Outlet, useLocation } from "react-router-dom";

/**
 * Checks for the `adminToken` cookie.
 * If present → render nested routes; otherwise redirect to /admin.
 */
const RequireAuth = () => {
  const token = Cookies.get("adminToken");
  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/admin" replace state={{ from: location }} />
  );
};

export default RequireAuth;
