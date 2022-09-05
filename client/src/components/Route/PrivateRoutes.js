import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  return isAuthenticated === false ? <Navigate to="/login" /> : <Outlet /> ;
};

export default PrivateRoutes;
