
import { Outlet} from "react-router-dom";
import ExpertNav from "../Components/ExpertNav/ExpertNav";
import Footer from "../Components/Footer/Footer";
import Verify from "../Components/Verify/Verify";
import Alert from "../Components/Alert/Alert";
const ExpertLayout = () => {
  return (
    <>
     <ExpertNav />
      <Verify />
      <div
        className="max-w-screen-lg mx-auto">
          <Alert/>
           <Outlet/>
      </div>
      <Footer teal={"text-blue-900"} />
    </>
  );
};

export default ExpertLayout
