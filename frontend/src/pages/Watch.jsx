import React, { useState, useEffect } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useLocation } from "react-router";
export const Watch = () => {
  const location = useLocation();

  const movie = location.state;
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    let timeoutId;

    const handleMouseMove = () => {
      setShowControls(true);

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);
  return (
    <div className="h-screen w-screen bg-black">
      {/* Navigation */}
      <nav
        className={`fixed w-full p-4 z-10 flex flex-row items-center justify-between gap-8 bg-pink bg-opacity-70 ${
          showControls ? "" : "opacity-0 pointer-events-none"
        } transition-opacity`}
      >
        <AiOutlineArrowLeft
          onClick={() => {
            window.history.back();
          }}
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
        className={`h-full w-full`}
        src={movie?.videoUrl}
      ></video>
    </div>
  );
};
