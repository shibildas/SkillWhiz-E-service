import useAuthUser from "../../hooks/useAuthUser";
import {
  Route,
  Routes,
  React,
  Footer,
  MainPage,
  Navbar,
  ErrorPage,
} from "./import";

const UserLayout = () => {
  useAuthUser();
  return (
    <>
      <Navbar />
      <div className="lg:px-60 md:px-20 bg-gray-100 bg-texture texture-stripes">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};
export default UserLayout;
