import React from "react";
// import { isEmpty } from "lodash";

import { MovieCard } from "./MovieCard";
import { BsFillPlayFill } from "react-icons/bs";
export const MovieList = ({ data, title }) => {
  //   if (isEmpty) {
  //     return null;
  //   }
  const categories = ["Movies", "Movies", "Movies", "Movies"];
  return (
    <div className="px-4 md:px-12 mt-4 space-y-8 pb-10">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
          {title}
        </p>
        <div
          className="grid grid-cols-4 gap-2 "
         
        >
          {data.map((movie) => (
            <MovieCard key={movie.id} data={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};
