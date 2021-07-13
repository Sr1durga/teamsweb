import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ToastProvider } from 'react-toast-notifications';
import { ContextProvider} from './VideoChat/VideoContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ContextProvider >
      <ToastProvider >
        
        <App />
        
      </ToastProvider>
      </ContextProvider>
      
      
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
