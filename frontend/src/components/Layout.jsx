import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

function Layout() {
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Navbar />}
      <Outlet />
    </>
  );
}

export default Layout;