import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ToastProvider } from 'react-toast-notifications';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ToastProvider >
      <App />
      </ToastProvider>
      
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
