
import { Outlet, Navigate } from "react-router-dom";
import NavbarAdmin from "../Components/Admin/Navbar/NavbarAdmin";
import Sidebar from "../Components/Admin/Navbar/Sidebar";

import { useSelector } from "react-redux";
import useAuthAdmin from "../hooks/useAuthAdmin";


const AdminLayout = () => {
  useAuthAdmin()
  const isAdminAuth = useSelector((state)=>state.admin.value.isAdminAuth)
  return (
    <>
      <NavbarAdmin />
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content border p-2 bg-slate-200">
          <div className="max-w-fit mx-auto">
            {isAdminAuth ? <Outlet/>: <Navigate to="/admin/login"/>}
        </div>
        </div>
        <Sidebar />
      </div>
    </>
  );
};

export default AdminLayout;
