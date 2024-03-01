import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
export const Private_Routes_Firm = () => {
  const { userAuth,current_user } = useSelector((state) => state.auth);
  return userAuth && current_user?.userType==="firm" ? <Outlet /> : <Navigate to="/login" />;
};
