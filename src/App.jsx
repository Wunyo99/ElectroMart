import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import SignIn from "./pages/SignIn";
import Shop from "./pages/Shop";
import Profile from "./pages/Profile";
import ProductDetails from "./pages/ProductDetails";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ErrorPage from "./pages/ErrorPage";
import "react-toastify/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Spinner from "./components/Spinner";
import GlobalLoader from "./components/GlobalLoader";

const Checkout = lazy(() => import("./pages/Checkout"));
function App() {
  useEffect(() => {
    const loader = document.getElementById("global-loader");
    if (loader) {
      // Fade out smoothly
      loader.style.opacity = "0";
      setTimeout(() => loader.remove(), 300); // remove after fade
    }
  }, []);
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <GlobalLoader>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoutes>
                    {" "}
                    <Suspense fallback={<Spinner />}>
                      <Checkout />
                    </Suspense>
                  </ProtectedRoutes>
                }
              />
              <Route path="/products/:id" element={<ProductDetails />} />
            </Route>
            <Route path="/profile" element={<Profile />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </GlobalLoader>
      </BrowserRouter>
    </>
  );
}

export default App;
