import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

export const Watch = () => {
  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <AiOutlineArrowLeft
          onClick={() => {
            alert("back to normal");
          }}
          className="text-white cursor-pointer"
          size={48}
        />
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">Watching</span>Something
        </p>
      </nav>
      <video
        autoPlay
        controls
        className="h-full w-full"
        //   src={}
      ></video>
    </div>
  );
};
