import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Private_Routes } from "./Private_Routes.jsx";
import { Public_Routes } from "./PublicRoutes.jsx";
import { mainRoutes } from "../../utils/routeList.jsx";
import { useDispatch, useSelector } from "react-redux";
import { asyncStatus } from "../../utils/asyncStatus.js";
import { LinearProgress, Stack } from "@mui/material";

export const AppRouter = () => {
  const { userAuth, check_auth_status, current_user } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  
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
