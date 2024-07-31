import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../../util/localStorage";

const PrivateRoute = () => {
  const token = getToken();

  if (!token) {
    return <Navigate to="sign-in" replace />;
  } else {
    return <Outlet />;
  }
};

export default PrivateRoute;
