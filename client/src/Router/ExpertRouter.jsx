import React from "react";
import { Route, Routes } from "react-router-dom";
import { ErrorPage, LoginExpert } from "../import";
import { useSelector } from "react-redux";
import { Suspense, lazy } from "react";
import ShimmerList from "../Components/Admin/Shimmer/ShimmerList";
import PrivateRoutes from "../ProtectedRoutes/PrivateRoutes";
import ExpertLayout from "../Layout/ExpertLayout";
import ExpertHome from "../Pages/Expert/ExpertHome";
const Chat =lazy(()=>import ("../Pages/common/Chat"));
const ExpertProfile = lazy(() => import("../Pages/Expert/ExpertProfile"));
const Schedules = lazy(() => import("../Pages/Expert/Schedules"));
const MyAppointments = lazy(() => import("../Pages/Expert/MyAppointments"));
const AppointmentDetail = lazy(() =>
  import("../Pages/Expert/AppointmentDetail")
);
const AboutUs = lazy(()=> import('../Pages/common/AboutUs'))

function ExpertRouter() {
  const expert=useSelector((state) => state.expert.value)
  const isVerified = useSelector((state) => state.expert.value.verified);
  return (
    <Routes>
      <Route path="/login" element={<LoginExpert />} />
      <Route
        element={<PrivateRoutes role={"expert"} route={"/expert/login"} />}
      >
        <Route element={<ExpertLayout />}>
          <Route path="/home" element={<ExpertHome />} />
          <Route exact path="/aboutus" element={<Suspense fallback={<ShimmerList/>}><AboutUs /></Suspense>} />

          <Route
            path="/profile"
            element={
              <Suspense fallback={<ShimmerList />}>
                <ExpertProfile />
              </Suspense>
            }
          />
          {isVerified && (
            <Route
              path="/schedule"
              element={
                <Suspense fallback={<ShimmerList />}>
                  <Schedules />
                </Suspense>
              }
            />
          )}
          {isVerified && (
            <Route
              path="/myappointments"
              element={
                <Suspense fallback={<ShimmerList />}>
                  <MyAppointments />
                </Suspense>
              }
            />
          )}
          {isVerified && (
            <Route
              path="/myappointments/:id"
              element={
                <Suspense fallback={<ShimmerList />}>
                  <AppointmentDetail />
                </Suspense>
              }
            />
          )}
          {isVerified && (
            <Route
              path="/chat"
              element={
                <Suspense fallback={<ShimmerList />}>
                  <Chat currentUser={expert} user={false} />
                </Suspense>
              }
            />
          )}

          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default ExpertRouter;
