import { lazy, useContext,Suspense} from "react";
import { Routes, Route } from "react-router-dom";
import NavbarAdmin from "../Navbar/NavbarAdmin";
import Sidebar from "../Navbar/Sidebar";
import Dashboard from "../Dashboard/Dashboard";
const ExpertList = lazy(()=> import ("../ExpertList/ExpertList"));
const UserList =lazy(()=> import ("../UserList/UserList"));
import { AppContext, ErrorPage } from "../../../import";
import ShimmerList from "../Shimmer/ShimmerList";
import Jobs from "../Jobs/Jobs";

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
            <Route path="/experts" element={<Suspense fallback={<ShimmerList/>}><ExpertList /></Suspense>} />
            <Route path="/users" element={<Suspense fallback={<ShimmerList/>}><UserList/></Suspense>} />
            <Route path="/jobs" element={<Suspense fallback={<ShimmerList/>}><Jobs/></Suspense>} />
            <Route path="*" element={<ShimmerList/>} />
          </Routes>}
        </div>
        <Sidebar />
      </div>
    </>
  );
};

export default AdminLayout;
