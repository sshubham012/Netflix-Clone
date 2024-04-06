import React, { useState, useEffect } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useSelector } from "react-redux";
export const Watch = ({ movie }) => {
  console.log(movie);
  const goBack = () => {
    window.history.back();
  };
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    let timeoutId;

    const handleMouseMove = () => {
      // Show controls when the mouse moves
      setShowControls(true);

      // Reset the timeout to hide controls if the mouse stops moving
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setShowControls(false);
      }, 3000); // Hide controls after 5 seconds of mouse inactivity
    };

    // Attach mousemove event listener
    document.addEventListener("mousemove", handleMouseMove);

    // Clean up function to remove event listener
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);
  return (
    <div className="h-screen w-screen relative">
      {/* Navigation */}
      <nav
        className={`fixed w-full p-4 z-10 flex flex-row items-center justify-between gap-8 bg-pink bg-opacity-70 ${
          showControls ? "" : "opacity-0 pointer-events-none"
        } transition-opacity`}
      >
        <AiOutlineArrowLeft
          onClick={goBack}
          className="w-4 md:w-10 text-white cursor-pointer hover:opacity-80 transition"
        />
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">Watching:</span>
          {movie?.title}
        </p>
      </nav>

      {/* Video Player */}
      <video
        autoPlay
        controls
        className={`h-full w-full ${
          showControls ? "" : "opacity-0 pointer-events-none"
        } transition-opacity`}
        src={movie?.videoUrl}
      ></video>
    </div>
  );
};
