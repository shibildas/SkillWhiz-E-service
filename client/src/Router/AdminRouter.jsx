import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { AdminLogin, ErrorPage } from "../import";
import AdminLayout from "../Layout/AdminLayout";
import ShimmerList from "../Components/Admin/Shimmer/ShimmerList";
import Dashboard from "../Pages/Admin/Dashboard";
import PrivateRoutes from "../ProtectedRoutes/PrivateRoutes";
const ExpertList = lazy(() => import("../Pages/Admin/ExpertList"));
const UserList = lazy(() => import("../Pages/Admin/UserList"));
const Jobs = lazy(() => import("../Pages/Admin/Jobs"));
const BookingList =lazy(()=> import ('../Pages/Admin/BookingList'))
function AdminRouter() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route element={<PrivateRoutes role={"admin"} route={'/admin/login'}/>}>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/experts"
            element={
              <Suspense fallback={<ShimmerList />}>
                <ExpertList/>
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
          <Route
            path="/bookings"
            element={
              <Suspense fallback={<ShimmerList />}>
                <BookingList />
              </Suspense>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Route>
        </Route>
      </Routes>
    </>
  );
}

export default AdminRouter;
