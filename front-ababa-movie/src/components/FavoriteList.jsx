import React from "react";
import notfound from "../assets/search.png";
import "./css/FavoriteList.css";
import redheart from "./../assets/redheart.svg";

const FavoriteList = ({
  movies,
  onFavoriteClick,
  onEditMovieClick,
}) => {
  if (!movies) {
    return <div>Loading...</div>;
  }

  return (
    <div className="favoriteList">
      {movies.map((movie) => (
        <div key={movie.id} className="favoriteItem">
          <div className="favoriteWrapper">
            <img
              className="favoriteItemImg"
              src={movie.imageUrl ? movie.imageUrl : notfound}
              alt={movie.title}
            />
            <p className="favoriteTitle">{movie.title}</p>
            <p className="favoriteYear">
              Year: {movie.releaseDate ? movie.releaseDate.toString() : "N/A"}
            </p>
          </div>
          <p className="favoriteOverview">
            Overview: {movie.overview || "N/A"}
          </p>
          <p className="favoriteRating">Rating: {movie.rating || "N/A"}</p>
          <img className="heartIcon" src={redheart} alt="heart" onClick={() => onFavoriteClick(movie)} />
          <button
            className="editMovieButton"
            onClick={() => onEditMovieClick(movie)}
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
};

export default FavoriteList;
