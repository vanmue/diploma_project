import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Router from './Components/Router.jsx';
import { Provider } from 'react-redux';
import initStore from './store/store.js'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
  <Provider store={initStore()}>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);

reportWebVitals();
