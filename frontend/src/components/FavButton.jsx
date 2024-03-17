import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
export const FavButton = ({ movieId }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;
  const toggleFavorites = () => {
    setIsFavorite(!isFavorite);
  };
  return (
    <div
      onClick={toggleFavorites}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transtion hover:boder-neutral-300"
    >
      <Icon className="text-white transition delay-500" size={25} />
    </div>
  );
};
