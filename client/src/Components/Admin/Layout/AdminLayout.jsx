import { Routes, Route } from "react-router-dom";
import NavbarAdmin from "../Navbar/NavbarAdmin";
import Sidebar from "../Navbar/Sidebar";
import Dashboard from "../Dashboard/Dashboard";
import ExpertList from "../ExpertList/ExpertList";
import UserList from "../UserList/UserList";
import { useContext } from "react";
import { AppContext } from "../../../import";

const AdminLayout = () => {
  const {admin} = useContext(AppContext)
  return (
    <>
      <NavbarAdmin />
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
          {admin && <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/experts" element={<ExpertList />} />
            <Route path="/users" element={<UserList/>} />
          </Routes>}
        </div>
        <Sidebar />
      </div>
    </>
  );
};

export default AdminLayout;
