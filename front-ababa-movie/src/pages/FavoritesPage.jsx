import Header from "../components/Header";
import React, { useState, useEffect } from "react";
import axios from "axios";
import FavoriteList from "../components/FavoriteList";
import Modal from "react-modal";
import "./css/FavoritePage.css";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import ArrowForwardIosIcon from "./../assets/arrowForward.svg";
import ArrowBackIosIcon from "./../assets/arrowBack.svg";
import AddMovieModal from "../components/AddMovieModal";
import EditMovieModal from "../components/EditMovieModal";

Modal.setAppElement("#root");

const FavoritesPage = () => {
  const [movies, setMovies] = useState([]);
  const [editMovie, setEditMovie] = useState(null);
  const [showEditMovieModal, setShowEditMovieModal] = useState(false);
  const [showAddMovieModal, setShowAddMovieModal] = useState(false);
  const [addMovie, setAddMovie] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("releaseDate");
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchFavorites = async (
    page = 0,
    query = "",
    sort = "title",
    order = "asc"
  ) => {
    try {
      const response = await axios.get("http://localhost:5000/api/favorite", {
        headers: {
          token: localStorage.getItem("token"),
        },
        params: {
          page,
          query,
          sort,
          order,
        },
      });

      setMovies(response.data.movies);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    fetchFavorites(currentPage, e.target.value);
  };

  const handleFavoriteClick = async (movie) => {
    try {
      await axios.delete(`http://localhost:5000/api/favorite/${movie.id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setMovies(movies.filter((m) => m.id !== movie.id));
      toast.success("Movie removed from favorites");
    } catch (error) {
      console.error(error);
      toast.error("Error removing movie from favorites");
    }
  };

  const handleAddMovieClick = () => {
    setShowAddMovieModal(true);
  };

  const handleAddMovieSubmit = async (newMovie) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/favorite",
        newMovie,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      const addedMovie = { ...newMovie, id: response.data.id };
      setMovies([...movies, addedMovie]);
      setShowAddMovieModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditMovieClick = (movie) => {
    setEditMovie(movie);
    setShowEditMovieModal(true);
  };

  const handleEditMovieSubmit = async (updatedMovie) => {
    try {
      // Update the movie in the database (you'll need to create a new API endpoint for this)
      await axios.put(
        `http://localhost:5000/api/favorite/${updatedMovie.id}`,
        updatedMovie,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      // Update the movie in the state
      setMovies(
        movies.map((movie) =>
          movie.id === updatedMovie.id ? updatedMovie : movie
        )
      );

      // Close the modal
      setShowEditMovieModal(false);
      toast.success("Movie updated");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseAddMovieModal = () => {
    setShowAddMovieModal(false);
  };

  const handleSort = (newSortField) => {
    // If the sort field is the same, toggle the sort order
    let newSortOrder =
      newSortField === sortField && sortOrder === "asc" ? "desc" : "asc";

    // If the sort field has changed, set the default sort order based on the new sort field
    if (newSortField !== sortField) {
      newSortOrder = newSortField === "releaseDate" ? "desc" : "asc";
    }

    setSortField(newSortField);
    setSortOrder(newSortOrder);
    fetchFavorites(currentPage, searchQuery, newSortField, newSortOrder);
  };

  return (
    <div className="favoritePage">
      <Header />
      <div className="favoritePageGreeting">
        Take a look at your favorite movies!
      </div>
      <div className="favoritePageButtons">
        <button className="addMovieButton" onClick={handleAddMovieClick}>
          Add Movie
        </button>
        <input
          type="text"
          placeholder="Search movies"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button onClick={() => handleSort("releaseDate")}>Sort by Year</button>
        <button onClick={() => handleSort("rating")}>Sort by Rating</button>
      </div>
      <FavoriteList
        movies={movies}
        onFavoriteClick={handleFavoriteClick}
        onAddMovieClick={handleAddMovieClick}
        onEditMovieClick={handleEditMovieClick}
      />
      {totalPages > 0 && (
        <ReactPaginate
          activeClassName={"item active"}
          breakClassName={"item break-me"}
          breakLabel={"..."}
          containerClassName={"pagination"}
          disabledClassName={"disabled-page"}
          marginPagesDisplayed={2}
          nextClassName={"item next"}
          nextLabel={
            <img
              src={ArrowForwardIosIcon}
              alt="Next"
              style={{ fontSize: 18, width: 40 }}
            />
          }
          onPageChange={({ selected }) =>
            fetchFavorites(selected, searchQuery, sortField, sortOrder)
          }
          pageCount={totalPages}
          pageClassName={"item pagination-page"}
          pageRangeDisplayed={5}
          previousClassName={"item previous"}
          previousLabel={
            <img
              src={ArrowBackIosIcon}
              alt="Previous"
              style={{ fontSize: 18, width: 40 }}
            />
          }
          forcePage={currentPage}
        />
      )}
      <EditMovieModal
        isOpen={showEditMovieModal}
        onRequestClose={() => setShowEditMovieModal(false)}
        editMovie={editMovie}
        setEditMovie={setEditMovie}
        handleEditMovieSubmit={handleEditMovieSubmit}
      />
      <AddMovieModal
        isOpen={showAddMovieModal}
        onRequestClose={handleCloseAddMovieModal}
        addMovie={addMovie}
        setAddMovie={setAddMovie}
        handleAddMovieSubmit={handleAddMovieSubmit}
      />
    </div>
  );
};

export default FavoritesPage;
