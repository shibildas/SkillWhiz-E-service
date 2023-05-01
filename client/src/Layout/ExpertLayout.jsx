
import { Outlet} from "react-router-dom";
import ExpertNav from "../Components/ExpertNav/ExpertNav";
import Footer from "../Components/Footer/Footer";
import Verify from "../Components/Verify/Verify";
const ExpertLayout = () => {
  return (
    <>

     <ExpertNav />
      <Verify />
      <div
        className="max-w-screen-lg mx-auto">
           <Outlet/>
      </div>
      <Footer teal={"text-teal-800"} />
    </>
  );
};

export default ExpertLayout
