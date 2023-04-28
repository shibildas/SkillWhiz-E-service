import { Outlet } from "react-router-dom";
import NavbarAdmin from "../Components/Admin/Navbar/NavbarAdmin";
import Sidebar from "../Components/Admin/Navbar/Sidebar";
const AdminLayout = () => {
  return (
    <>
      <NavbarAdmin />
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content border p-2 bg-slate-200">
          <div className="max-w-fit mx-auto">
          <Outlet/>
        </div>
        </div>
        <Sidebar />
      </div>
    </>
  );
};

export default AdminLayout;
