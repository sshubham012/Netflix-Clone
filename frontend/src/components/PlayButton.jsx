import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
export const PlayButton = ({ movieId }) => {
  return (
    <button onClick={()=>{alert("Movie Played")}} className="bg-white rounded-md py-1 md:py-2 px-2 md:px-4 text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-neutral-300 cursor-pointer transition">
      <BsFillPlayFill size={25} className="mr-1"/>Play
    </button>
  );
};
