import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { router } from "../routes";
import Profiles from "./pages/Profiles";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import TestComponent from "./components/TestComponet";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // <TestComponent/>
      <Auth />
    ),
  },
  { path: "/profiles", element: <Profiles /> },
  { path: "/netflix-and-chill", element: <Dashboard /> },

]);
function App() {

  return (
    <div className="h-full w-full">
      <RouterProvider router={router} />
      <ToastContainer autoClose={5000} position="bottom-right"/>
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
