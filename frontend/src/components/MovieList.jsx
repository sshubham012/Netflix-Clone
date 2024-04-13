import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { MovieCard } from "./MovieCard";
import { useDispatch } from "react-redux";
import { getallmovies } from "../state_manager/movies/movieSlice";
import "./styles/scrollbar.css"
export const MovieList = ({ title }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getallmovies());
  }, []);
  const data = useSelector((state) => state?.movie.allMovies);
  return (
    <div className="px-4 md:px-12 mt-4 space-y-8 pb-10">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
          {title}
        </p>
        <div className="flex space-x-4 overflow-x-auto hide-scroll-bar">
          {data.map((movie) => (
            <div className="flex-shrink-0 w-auto">
              <MovieCard key={movie.id} movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
