import { lazy } from "react";
import {
  ErrorPage,
  Suspense,
  Routes,
  Route,
  NavbarAdmin,
  Sidebar,
  Dashboard,
  ShimmerList,
} from "./import";
import { useSelector } from "react-redux";
import useAuthAdmin from "../../../hooks/useAuthAdmin";
const ExpertList = lazy(() => import("../Experts/ExpertList"));
const UserList = lazy(() => import("../Users/UserList"));
const Jobs = lazy(() => import("../Jobs/Jobs"));

const AdminLayout = () => {
  useAuthAdmin()
  const isAdminAuth = useSelector((state)=>state.admin.value.isAdminAuth)
  return (
    <>
      <NavbarAdmin />
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content bg-gradient-to-br from-purple-400 to-slate-500 ">
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
        </div>
        <Sidebar />
      </div>
    </>
  );
};

export default AdminLayout;
