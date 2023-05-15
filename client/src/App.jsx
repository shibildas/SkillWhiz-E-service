import { lazy, Suspense } from "react";
const ExpertRouter = lazy(() => import("./Router/ExpertRouter"));
const AdminRouter = lazy(() => import("./Router/AdminRouter"));
import { BrowserRouter, Routes, Route} from "./import";
import ShimmerList from "./Components/Admin/Shimmer/ShimmerList";
import UserRouter from "./Router/UserRouter";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/*" element={<UserRouter />} />
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
