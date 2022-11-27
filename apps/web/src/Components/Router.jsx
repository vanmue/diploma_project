import React from 'react';
import { Routes, Route } from 'react-router-dom'
import App from '../App';
import MastersPage from '../pages/masters';
import SalonsPage from '../pages/SalonsPage';
import SalonPage from '../pages/salonPage';
import MainPage from '../pages/Main';
import Error from './Error';
import Master from './Masters';
import UserOffice from './UserOffiсe';
import SalonAdminOffice from '../pages/salonAdminOffice';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<MainPage />} />
        <Route path="salons" element={<SalonsPage />} />
        <Route path="salon" element={<SalonPage />} />
        <Route path="masters" element={<MastersPage />} />
        <Route path="master" element={<Master />} />
        <Route path="user-office" element={<UserOffice />} />
        <Route path="salon-admine-office" element={<SalonAdminOffice />} />
        <Route path="*" element={< Error />} />
      </Route>
    </Routes>
  );
}

export default Router;