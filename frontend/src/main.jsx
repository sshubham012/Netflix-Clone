import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Auth from "./pages/Auth.jsx";
import Profiles from "./pages/Profiles.jsx";
import Navbar from "./components/Navbar.jsx";
import Billboard from "./components/Billboard.jsx";
import { MovieList } from "./components/MovieList.jsx";
import movieData from "../movies.json";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <Auth /> */}
    {/* <Profiles /> */}
    <Navbar />
    <Billboard />
    <MovieList title="Trending Now" data={movieData} />
    <MovieList title="My List" data={movieData} />
  </React.StrictMode>
);
