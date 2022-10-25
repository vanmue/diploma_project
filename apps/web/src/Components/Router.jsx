import React from 'react';
import { Routes, Route } from 'react-router-dom'
import App from '../App';
import SalonsPage from '../pages/SalonsPage';
import MainPage from '../pages/main';
import Error from './Error';
import Master from './Masters';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<MainPage />} />
        <Route path="salons" element={<SalonsPage />} />
        <Route path="master" element={<Master />} />
        <Route path="*" element={< Error />} />
      </Route>
    </Routes>
  );
}

export default Router;