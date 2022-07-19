import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from "react-redux";
import store from './store/Store';
import AlertProvider from "./components/Alerts/AlertProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AlertProvider>
      <App />
    </AlertProvider>
  </Provider>
);

