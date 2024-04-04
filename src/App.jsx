import React from 'react'
import SignUp from './screens/SignUp';
import Login from './screens/Login';
import ClientDashboardMain from './screens/Client/ClientDashboardMain';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import FirmDashboardMain from './screens/Firm/FirmDashboardMain';
import { FirmLawyers } from './screens/Client/FirmLawyers';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Login />} />
        <Route path="firm/*" element={<FirmDashboardMain />} />
        <Route path="client/*" element={<ClientDashboardMain />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
