import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Billboard from "../components/Billboard";
import { MovieList } from "../components/MovieList";
import movieData from "../../movies.json";
import { useSelector } from "react-redux";
import { store } from "../state_manager/store";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const isValidUser = useSelector((store) => store.user.isValidUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isValidUser) {
      navigate("/");
    }
  });
  return (
    <>
      <Navbar />
      <Billboard />
      <MovieList title="Trending Now" data={movieData} />
    </>
  );
}
