import useAuthExpert from "../hooks/useAuthExpert";
import { Route, Routes } from "react-router-dom";
import ExpertHome from "../Pages/Expert/ExpertHome";
import ExpertNav from "../Components/ExpertNav/ExpertNav";
import Footer from "../Components/Footer/Footer";
import ErrorPage from "../Pages/Error/Error";

const ExpertLayout = () => {
  useAuthExpert();
  return (
    <>
      <ExpertNav />
      <div className="max-w-screen-lg mx-auto bg-gray-100">
        <Routes>
          <Route path="/" element={<ExpertHome />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};
export default ExpertLayout;
