
import { lazy,Suspense} from "react";
import { Routes, Route } from "react-router-dom";
import NavbarAdmin from "../Components/Admin/Navbar/NavbarAdmin";
import Sidebar from "../Components/Admin/Navbar/Sidebar";
import Dashboard from "../Pages/Admin/Dashboard";

import ShimmerList from "../Components/Admin/Shimmer/ShimmerList";
import ErrorPage from "../Pages/Error/Error";

import { useSelector } from "react-redux";
import useAuthAdmin from "../hooks/useAuthAdmin";
const ExpertList = lazy(() => import("../Pages/Admin/ExpertList"));
const UserList = lazy(() => import("../Pages/Admin/UserList"));
const Jobs = lazy(() => import("../Pages/Admin/Jobs"));

const AdminLayout = () => {
  useAuthAdmin()
  const isAdminAuth = useSelector((state)=>state.admin.value.isAdminAuth)
  return (
    <>
      <NavbarAdmin />
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content border p-2 bg-gradient-to-br from-purple-400 to-slate-500 ">
          <div className="max-w-fit mx-auto">
          {isAdminAuth && (
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route
                path="/experts"
                element={
                  <Suspense fallback={<ShimmerList />}>
                    <ExpertList />
                  </Suspense>
                }
              />
              <Route
                path="/users"
                element={
                  <Suspense fallback={<ShimmerList />}>
                    <UserList />
                  </Suspense>
                }
              />
              <Route
                path="/jobs"
                element={
                  <Suspense fallback={<ShimmerList />}>
                    <Jobs />
                  </Suspense>
                }
              />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          )}
        </div></div>
        <Sidebar />
      </div>
    </>
  );
};

export default AdminLayout;
