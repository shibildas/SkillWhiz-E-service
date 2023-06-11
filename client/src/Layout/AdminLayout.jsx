import { Outlet } from "react-router-dom";
import NavbarAdmin from "../Components/Admin/Navbar/NavbarAdmin";
import Sidebar from "../Components/Admin/Navbar/Sidebar";
import Alert from "../Components/Alert/Alert";
const AdminLayout = () => {
  return (
    <>
      <NavbarAdmin />
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content border p-2 bg-slate-200">
          <div className="mx-auto">
            <Alert />
            <Outlet />
          </div>
        </div>
        <Sidebar />
      </div>
    </>
  );
};

export default AdminLayout;
