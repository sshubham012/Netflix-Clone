import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Auth from "./pages/Auth.jsx";
import Profiles from "./pages/Profiles.jsx";
import Navbar from "./components/Navbar.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <Auth /> */}
    {/* <Profiles /> */}
    <Navbar/>
  </React.StrictMode>
);
