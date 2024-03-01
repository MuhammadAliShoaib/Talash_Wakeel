import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { LinearProgress, Stack, Typography } from "@mui/material";
import { Private_Routes } from "./Private_Routes";
import { Public_Routes } from "./PublicRoutes";
import { mainRoutes } from "../../utils/routeList.js";
import { getCurrentUser, getLawyerCurrentUser } from "../firebase/FirebaseMethods.js";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncStatus } from "../../utils/asyncStatus.js";
import { LinearProgress, Stack } from "@mui/material";
import Appbar from "../../components/Appbar.js";

export const RouterApp = () => {
  const { userAuth, check_auth_status, current_user } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (current_user?.userType !== "lawyer") {
      getCurrentUser(dispatch);
    }
    // else if(current_user?.userType === "lawyer"){
    //   getLawyerCurrentUser(dispatch)
    // }
  }, []);
  console.log("current_user", current_user);

  if (
    check_auth_status === asyncStatus.IDLE ||
    check_auth_status === asyncStatus.LOADING
  ) {
    return (
      <Stack>
        <LinearProgress />
      </Stack>
    );
  }
  return (
    <Router>
      {/* {userAuth && <Appbar />} */}
      <Routes>
        <Route element={<Public_Routes />}>
          {React.Children.toArray(
            mainRoutes.map((route, i) => {
              const { caption, linkTo, element, authRequired } = route;
              return (
                !authRequired && (
                  <Route key={i} element={element} path={linkTo} />
                )
              );
            })
          )}
        </Route>
        <Route element={<Private_Routes />}>
          {React.Children.toArray(
            mainRoutes.map((route, i) => {
              const { caption, linkTo, element, authRequired } = route;
              return (
                authRequired && (
                  <Route key={i} element={element} path={linkTo} />
                )
              );
            })
          )}
        </Route>
      </Routes>
    </Router>
  );
};
