import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./config/routing/Layout.jsx";
import SignUp from "./screens/SignUp";
import Login from "./screens/Login";
import ClientDashboardMain from "./screens/Client/ClientDashboardMain";
import FirmDashboardMain from "./screens/Firm/FirmDashboardMain";
import { FirmLawyers } from "./screens/Client/FirmLawyers";
import RequireAuth from "./config/routing/RequireAuth.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Login />} />

        {/* Protected */}
        <Route element={<RequireAuth />}>
          <Route path="firm/*" element={<FirmDashboardMain />} />
          <Route path="client/*" element={<ClientDashboardMain />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
