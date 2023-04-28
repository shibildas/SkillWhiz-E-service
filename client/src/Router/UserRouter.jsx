import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "../Pages/User/MainPage";
const Profile =lazy(()=>import ("../Pages/User/Profile"));
const Detail = lazy(()=>  import("../Pages/User/Detail"));
const ScheduleJob =lazy(()=> import("../Pages/User/ScheduleJob"));
const BookingDetail=lazy(()=> import ("../Pages/User/BookingDetail"));
const BookingList=lazy(()=> import ("../Pages/User/BookingList"));
import { ErrorPage, UserLayout } from "../import";
import PrivateRoutes from "../ProtectedRoutes/PrivateRoutes";
import ShimmerList from "../Components/Admin/Shimmer/ShimmerList";

function UserRouter() {
  return (
    <>
      <Routes>
        <Route element={<UserLayout />}>
          <Route exact path="/" element={<MainPage />} />
          <Route element={<PrivateRoutes role={"user"} route={"/"} />}>
            <Route path="/profile" element={<Suspense fallback={<ShimmerList/>}><Profile /></Suspense>} />
            <Route path="/job/:jobId" element={<Suspense fallback={<ShimmerList/>}><Detail /></Suspense>} />
            <Route path="/job/schedule/:id" element={<Suspense fallback={<ShimmerList/>}><ScheduleJob /></Suspense>} />
            <Route path="/bookings/:id" element={<Suspense fallback={<ShimmerList/>}><BookingDetail /></Suspense>} />
            <Route path="/bookings" element={<Suspense fallback={<ShimmerList/>}><BookingList /></Suspense>} />
            <Route path="/*" element={<ErrorPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default UserRouter;
