import useAuthExpert from "../hooks/useAuthExpert";
import { Route, Routes } from "react-router-dom";
import ExpertHome from "../Pages/Expert/ExpertHome";
import ExpertNav from "../Components/ExpertNav/ExpertNav";
import Footer from "../Components/Footer/Footer";
import ErrorPage from "../Pages/Error/Error";
import Verify from "../Components/Verify/Verify";
import { useSelector } from "react-redux";
import { Suspense, lazy } from "react";
import ShimmerList from "../Components/Admin/Shimmer/ShimmerList";
const ExpertProfile = lazy(() => import("../Pages/Expert/ExpertProfile"));

const ExpertLayout = () => {
  useAuthExpert();
  const isExpertAuth = useSelector((state) => state.expert.value.isExpertAuth);
  return (
    <>
      <ExpertNav />
      <Verify />
      <div
        className="max-w-screen-lg mx-auto bg-cover"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dpfnxwvps/image/upload/v1681639490/pxfuel_fjsdag.jpg)",
        }}
      >
        {isExpertAuth && (
          <Routes>
            <Route path="/" element={<ExpertHome />} />
            <Route
              path="/profile"
              element={
                <Suspense fallback={<ShimmerList />}>
                  <ExpertProfile />
                </Suspense>
              }
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        )}
      </div>
      <Footer />
    </>
  );
};
export default ExpertLayout;
