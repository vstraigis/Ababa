import React from "react";
import Header from "../components/Header";
import MovieSearch from "../components/MovieSearch";
import "./css/MoviesPage.css";

const MoviesPage = () => {
  return (
    <div className="moviesWrapper">
      <Header />
      <div className="moviesContent">
        <div className="moviesGreeting">Search for the movies you love!</div>
        <MovieSearch />
      </div>
    </div>
  );
};

export default MoviesPage;