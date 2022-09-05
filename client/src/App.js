import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar/Navbar";
import Footer from "./components/layout/Footer/Footer";
import Home from "./pages/Home/Home";
import ProductDetails from "./pages/Product/ProductDetail";
import Products from "./pages/Product/Products";
import ProductsMobile from "./pages/Product/ProductsMobile";
import { useDispatch, useSelector } from "react-redux";
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
import OrderConfirm from "./pages/Shipping/OrderConfirm";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSucess from "./pages/Shipping/OrderSucess";
import { myOrders } from "./store/actions/orderAction";
import OrderDetails from "./pages/Shipping/OrderDetails";
import ScrollToTop from "./components/layout/ScrollToTop";

function App() {
  const mobile = window.innerWidth <= 768;
  const dispatch = useDispatch();
  const [stripeApiKey, setStripeApiKey] = useState("");

  const getStripeApiKey = async () => {
    const { data } = await axios.get("/api/v1/api/key");
    setStripeApiKey(data.stripeApiKey);
  };

  const { isAuthenticated, error } = useSelector((state) => state.user);
  
  useEffect(() => {
    dispatch(getUserDetails());
    
    if(isAuthenticated){
      dispatch(myOrders());
      getStripeApiKey();
    }
  }, [isAuthenticated]);

  return (
    <Router>
      <ScrollToTop/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<LoginSignUp />} />
        {/* Protected Routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="/payment"
            element={
              stripeApiKey && (
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              )
            }
          />
          <Route path="/confirm" element={<OrderConfirm />} />
          <Route path="/order/:id" element={<OrderDetails/>} />
        </Route>
        <Route path="/password/forgot" element={<ForgetPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/products"
          element={mobile ? <ProductsMobile /> : <Products />}
        />
        <Route
          path="/products/:search"
          element={mobile ? <ProductsMobile /> : <Products />}
        />
        <Route path="/success" element={<OrderSucess />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
