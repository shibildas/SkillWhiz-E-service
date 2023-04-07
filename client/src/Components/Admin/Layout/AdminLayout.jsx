import NavbarAdmin from "../Navbar/NavbarAdmin";
import Sidebar from "../Navbar/Sidebar";

const AdminLayout = () => {
  return (
    <>
      <NavbarAdmin />
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content "></div>
        <Sidebar />
      </div>
    </>
  );
};
export default AdminLayout;
