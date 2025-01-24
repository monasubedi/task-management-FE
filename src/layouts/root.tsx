import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Root = () => {
  const auth = useAuthContext();

  if (auth?.isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Root;
