import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateOutlet = () => {
  const auth = useSelector((state) => state.userReducer.userInfo._id);
  return <>{auth ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default PrivateOutlet;
