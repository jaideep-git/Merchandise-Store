import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar/Navbar";
import Footer from "./components/layout/Footer/Footer";
import Home from "./pages/Home/Home";
import ProductDetails from "./pages/Product/ProductDetail";
import Products from "./pages/Product/Products";
import ProductsMobile from "./pages/Product/ProductsMobile";
import { useDispatch } from "react-redux";
import LoginSignUp from "./pages/User/LoginSignUp";
import { getUserDetails } from "./store/actions/userAction";
import Profile from "./pages/User/Profile";
import EditProfile from "./pages/User/EditProfile";
import PrivateRoutes from "./components/Route/PrivateRoutes";
import ForgetPassword from "./pages/User/ForgetPassword";
import ResetPassword from "./pages/User/ResetPassword";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Shipping/Checkout";
import Payment from "./pages/Shipping/Payment";

function App() {
  const mobile = window.innerWidth <= 768;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserDetails)
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route element={<PrivateRoutes/>}>
          <Route path="/profile" element={<Profile/>} />
          <Route path="/profile/edit" element={<EditProfile/>} />
        </Route>
        <Route path="/password/forgot" element={<ForgetPassword/>} />
        <Route path="/password/reset/:token" element={<ResetPassword/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/payment" element={<Payment/>} />
        <Route
          path="/products"
          element={mobile ? <ProductsMobile /> : <Products />}
        />
        <Route
          path="/products/:search"
          element={mobile ? <ProductsMobile /> : <Products />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
