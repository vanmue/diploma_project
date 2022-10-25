import React from 'react';
import { Routes, Route } from 'react-router-dom'
import App from '../App';
import MainPage from '../pages/main';
import SalonsPage from '../pages/SalonsPage';
import Error from './Error';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<MainPage />} />
        <Route path="salons" element={<SalonsPage />} />
        <Route path="*" element={< Error />} />
      </Route>
    </Routes>
  );
}

export default Router;
