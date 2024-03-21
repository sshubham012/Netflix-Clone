import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { router } from "../routes";
import Profiles from "./pages/Profiles";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import TestComponent from "./components/TestComponet";

const router = createBrowserRouter([
  { path: "/", element: 
  // <TestComponent/>
  <Auth /> 
},
  { path: "/profiles", element: <Profiles /> },
]);
function App() {
  // const [count, setCount] = useState(0);

  return (
    <div className="h-full w-full">
      <RouterProvider router={router} />

      {/* <Auth /> */}
      {/* <Profiles /> */}
      {/* <InfoModal
      visible
      onClose={() => {
        alert("onclosed");
      }}
    />
    <Navbar />
    <Billboard />
    <MovieList title="Trending Now" data={movieData} />
    <MovieList title="My List" data={movieData} /> */}
      {/* <Dashboard /> */}
    </div>
  );
}

export default App;
