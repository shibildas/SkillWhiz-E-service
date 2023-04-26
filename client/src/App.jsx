import { lazy, Suspense } from "react";
const ExpertRouter = lazy(() => import("./Layout/ExpertLayout"));
const AdminRouter = lazy(() => import("./Router/AdminRouter"));
import { UserLayout, BrowserRouter, Routes, Route} from "./import";
import ShimmerList from "./Components/Admin/Shimmer/ShimmerList";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/*" element={<UserLayout />} />
        <Route exact path="/expert/*"
          element={
              <Suspense fallback={<ShimmerList />}>
                <ExpertRouter />
              </Suspense>}/>
        <Route
          exact path="/admin/*"
          element={
              <Suspense fallback={<ShimmerList />}>
                <AdminRouter />
              </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
