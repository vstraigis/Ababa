import React, { useState } from "react";
import axios from "axios";
import MovieList from "./MovieList";
import "./css/MovieSearch.css";
import { toast } from "react-toastify";
import SearchBar from "./SearchBar";
import SortButton from "./SortButton";

const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [isButtonSortVisible, setIsButtonSortVisible] = useState(false);

  const handleFavoriteClick = async (movie) => {
    try {
      const movieData = {
        title: movie.title,
        imageUrl: movie.image ? movie.image.url : "",
        releaseDate: movie.year,
        rating: 0,
        overview: movie.overview || "N/A",
      };

      await axios.post("http://localhost:5000/api/favorite", movieData, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      toast.success("Movie succesfully added to favorites.");
    } catch (error) {
      console.error(error);
      toast.error("Movie already added to favorites.");
    }
  };

  const searchMovies = async (e) => {
    e.preventDefault();
    if (searchTerm === "") {
      toast.error("Please enter a search term.");
      return;
    }

    toast.promise(
      async () => {
        const response = await axios.post(
          "http://localhost:5000/api/search-movies",
          { searchTerm },
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        console.log(response.data);
        setIsButtonSortVisible(true);
        if (response.data.length === 0) {
          toast.error("No movies found.");
        }
        setMovies(response.data);
      },
      {
        pending: "Searching for movies...",
        success: "Movies found!",
        error: "Error while searching for movies",
      }
    );
  };

  const sortMovies = (order) => {
    if (order === "asc") {
      setMovies(
        movies.slice().sort((a, b) => {
          if (a.year === null || a.year === undefined) return 1;
          if (b.year === null || b.year === undefined) return -1;
          return a.year - b.year;
        })
      );
      setSortOrder("desc");
    } else {
      setMovies(
        movies.slice().sort((a, b) => {
          if (a.year === null || a.year === undefined) return -1;
          if (b.year === null || b.year === undefined) return 1;
          return b.year - a.year;
        })
      );
      setSortOrder("asc");
    }
  };

  return (
    <div className="movieSearch">
      <form onSubmit={searchMovies}>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={searchMovies}
        />
      </form>
      {isButtonSortVisible && (
        <SortButton
          sortOrder={sortOrder}
          onClick={() => sortMovies(sortOrder)}
        />
      )}
      <MovieList movies={movies} onFavoriteClick={handleFavoriteClick} />
    </div>
  );
};

export default MovieSearch;
