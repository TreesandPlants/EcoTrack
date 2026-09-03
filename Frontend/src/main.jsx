import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import "./styles/globals.css";
import { Toaster } from "react-hot-toast";
import App from './App.jsx'
import { GoogleOAuthProvider } from "@react-oauth/google";
import { applyTheme } from './utils/theme.js';
import { Buffer } from "buffer";
import { AuthProvider } from "./context/AuthContext";
import "./i18n/i18n.js";

window.Buffer = Buffer;

const savedTheme =
  localStorage.getItem("theme") || "light";

applyTheme(savedTheme);

createRoot(document.getElementById("root")).render(

    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
    >

      <AuthProvider>

        <App />

        <Toaster position="top-right" />

      </AuthProvider>

    </GoogleOAuthProvider>

);