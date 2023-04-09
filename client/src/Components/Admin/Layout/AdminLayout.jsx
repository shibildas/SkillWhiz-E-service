
import {lazy, useContext,Suspense,Routes, Route,NavbarAdmin,Sidebar,Dashboard,AppContext,ShimmerList} from "./import"
const ExpertList = lazy(()=> import ("../ExpertList/ExpertList"));
const UserList =lazy(()=> import ("../UserList/UserList"));
const Jobs=lazy(()=> import ("../Jobs/Jobs"));

const AdminLayout = () => {
  const {admin} = useContext(AppContext)
  return (
    <>
      <NavbarAdmin />
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
          {admin && <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/experts" element={<Suspense fallback={<ShimmerList/>}><ExpertList /></Suspense>} />
            <Route path="/users" element={<Suspense fallback={<ShimmerList/>}><UserList/></Suspense>} />
            <Route path="/jobs" element={<Suspense fallback={<ShimmerList/>}><Jobs/></Suspense>} />
            <Route path="*" element={<ShimmerList/>} />
          </Routes>}
        </div>
        <Sidebar />
      </div>
    </>
  );
};

export default AdminLayout;
