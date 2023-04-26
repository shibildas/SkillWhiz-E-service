import useAuthExpert from "../hooks/useAuthExpert";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import ExpertHome from "../Pages/Expert/ExpertHome";
import ExpertNav from "../Components/ExpertNav/ExpertNav";
import Footer from "../Components/Footer/Footer";
import ErrorPage from "../Pages/Error/Error";
import Verify from "../Components/Verify/Verify";
import { useSelector } from "react-redux";
import { Suspense, lazy } from "react";
import ShimmerList from "../Components/Admin/Shimmer/ShimmerList";
import { LoginExpert } from "../import";
const ExpertProfile = lazy(() => import("../Pages/Expert/ExpertProfile"));
const Schedules = lazy(() => import("../Pages/Expert/Schedules"));
const MyAppointments= lazy(()=> import("../Pages/Expert/MyAppointments") );
const AppointmentDetail= lazy(()=> import("../Pages/Expert/AppointmentDetail") );

const ExpertLayout = () => {
  const isExpertAuth = useSelector((state) => state.expert.value.isExpertAuth);
  
  useAuthExpert()
  return (
    <>

     <ExpertNav />
      <Verify />
      <div
        className="max-w-screen-lg mx-auto bg-cover">
          {isExpertAuth ? <Outlet/>: <Navigate to="/expert/login"/>}
      </div>
      <Footer />
    </>
  );
};
function ExpertRouter() {
  const isVerified = useSelector((state) => state.expert.value.verified);
  return (
   <Routes>
    <Route path='/login' element={<LoginExpert/>}/>
     <Route element={<ExpertLayout/>}>
    <Route path="/home" element={<ExpertHome />}/>
            <Route
              path="/profile"
              element={
                <Suspense fallback={<ShimmerList />}>
                  <ExpertProfile />
                </Suspense>
              }
            />
            {isVerified&& <Route
              path="/schedule"
              element={
                <Suspense fallback={<ShimmerList />}>
                  <Schedules />
                </Suspense>
              }
            />}
            {isVerified&& <Route
              path="/myappointments"
              element={
                <Suspense fallback={<ShimmerList />}>
                  <MyAppointments />
                </Suspense>
              }
            />}
            {isVerified&& <Route
              path="/myappointments/:id"
              element={
                <Suspense fallback={<ShimmerList />}>
                  <AppointmentDetail />
                </Suspense>
              }
            />}

            <Route path="*" element={<ErrorPage />} />
      </Route>

    
   </Routes>
  )
}

export default ExpertRouter
