import React from "react";
import Navbar from "../components/Navbar";
import Billboard from "../components/Billboard";
import { MovieList } from "../components/MovieList";
import movieData from "../../movies.json";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <Billboard />
      <MovieList title="Trending Now" data={movieData} />
    </>
  );
}
