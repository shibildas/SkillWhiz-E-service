import { lazy, Suspense } from "react";
const ExpertLayout = lazy(() => import("./Layout/ExpertLayout"));
const AdminLayout = lazy(() => import("./Layout/AdminLayout"));
import { UserLayout, ErrorPage, AdminLogin, LoginExpert,AdminPrivate,AdminPublic,ExpertPrivate,ExpertPublic, BrowserRouter, Routes, Route  } from "./import";
import ShimmerList from "./Components/Admin/Shimmer/ShimmerList";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/*" element={<UserLayout />} />

        <Route
          exact
          path="/expert/*"
          element={
            <ExpertPrivate>
              <Suspense fallback={<ShimmerList />}>
                <ExpertLayout />
              </Suspense>
            </ExpertPrivate>
          }
        />

        <Route
          path="/expertlogin"
          element={
            <ExpertPublic>
              <LoginExpert />
            </ExpertPublic>
          }
        />

        <Route
          exact
          path="/admin/*"
          element={
            <AdminPrivate>
              <Suspense fallback={<ShimmerList />}>
                <AdminLayout />
              </Suspense>
            </AdminPrivate>
          }
        />

        <Route
          path="/adminlogin"
          element={
            <AdminPublic>
              <AdminLogin />
            </AdminPublic>
          }
        />

        <Route path="*" Component={ErrorPage} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
