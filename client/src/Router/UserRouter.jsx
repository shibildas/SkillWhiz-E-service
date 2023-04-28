import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "../Pages/User/MainPage";
import Profile from "../Pages/User/Profile";
import Detail from "../Pages/User/Detail";
import ScheduleJob from "../Pages/User/ScheduleJob";
import BookingDetail from "../Pages/User/BookingDetail";
import BookingList from "../Pages/User/BookingList";
import { ErrorPage, UserLayout } from "../import";
import PrivateRoutes from "../ProtectedRoutes/PrivateRoutes";

function UserRouter() {
  return (
    <>
      <Routes>
        <Route element={<UserLayout />}>
          <Route exact path="/" element={<MainPage />} />
          <Route element={<PrivateRoutes role={"user"} route={"/"} />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/job/:jobId" element={<Detail />} />
            <Route path="/job/schedule/:id" element={<ScheduleJob />} />
            <Route path="/bookings/:id" element={<BookingDetail />} />
            <Route path="/bookings" element={<BookingList />} />
            <Route path="/*" element={<ErrorPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default UserRouter;
