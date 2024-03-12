import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
export const Private_Routes_Client = () => {
  const { userAuth,current_user } = useSelector((state) => state.auth);
  return userAuth && current_user?.userType==="client" ? <Outlet /> : <Navigate to="/login" />;
};
