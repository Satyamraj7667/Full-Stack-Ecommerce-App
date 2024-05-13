import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../Auth";
function PrivateRoutes() {
  return (
   isLoggedIn() ? <Outlet/>  : <Navigate to={"/login"} />
  )
}

export default PrivateRoutes;