import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const ExpertLayout = lazy(() => import("./Components/ExpertLayout/ExpertLayout"));
const AdminLayout = lazy(() => import("./Components/Admin/Layout/AdminLayout"));
import {useAuthentication,
        AppContext,
        UserLayout,
        ErrorPage,
        AdminLogin,
        LoginExpert,
          } from "./import";
import ShimmerList from "./Components/Admin/Shimmer/ShimmerList";

function App() {
  const [user, setUser, admin, setAdmin, expert, setExpert] = useAuthentication();

  return (
    <AppContext.Provider
      value={{
        user: user,
        setUser: setUser,
        admin: admin,
        setAdmin: setAdmin,
        expert: expert,
        setExpert: setExpert,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route exact path="/*" Component={UserLayout} />
          {expert ? (
            <Route
              exact
              path="/expert"
              element={
                <Suspense fallback={<ShimmerList />}>
                  <ExpertLayout />
                </Suspense>
              }
            />
          ) : (
            <Route path="/expert" Component={LoginExpert} />
          )}
          {admin ? (
            <Route
              exact
              path="/admin/*"
              element={
                <Suspense fallback={<ShimmerList />}>
                  <AdminLayout />
                </Suspense>
              }
            />
          ) : (
            <Route path="/admin" Component={AdminLogin} />
          )}
          <Route path="*" Component={ErrorPage} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
