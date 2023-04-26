import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { AdminLogin, ErrorPage } from "../import";
import AdminLayout from "../Layout/AdminLayout";
import ShimmerList from "../Components/Admin/Shimmer/ShimmerList";
import Dashboard from "../Pages/Admin/Dashboard";
const ExpertList = lazy(() => import("../Pages/Admin/ExpertList"));
const UserList = lazy(() => import("../Pages/Admin/UserList"));
const Jobs = lazy(() => import("../Pages/Admin/Jobs"));
function AdminRouter() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
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
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default AdminRouter;
