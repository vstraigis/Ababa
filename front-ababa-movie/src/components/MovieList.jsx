import React from "react";
import HeartIcon from "./HeartIcon";
import notfound from "../assets/search.png";
import "./css/MovieList.css";

const MovieList = ({ movies, onFavoriteClick }) => {
  return (
    <div className="movieList">
      {movies.map((movie) => (
        <div key={movie.id} className="movieItem">
          <img className="movieItemImg" src={movie.image ? movie.image.url : notfound} alt={movie.title} />
          <p className="movieTitle">{movie.title}</p>
          <p>Year: {movie.year || "N/A"}</p>
          <HeartIcon className="hearIcon" onClick={() => onFavoriteClick(movie)} />
        </div>
      ))}
    </div>
  );
};

export default MovieList;

