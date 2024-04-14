import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Billboard from "../components/Billboard";
import { MovieList } from "../components/MovieList";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const isValidUser = localStorage.getItem("access_token");
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
      <MovieList title="Trending Now"/>
    </>
  );
}
