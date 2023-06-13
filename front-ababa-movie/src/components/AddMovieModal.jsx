import React from "react";
import Modal from "react-modal";

const AddMovieModal = ({
  isOpen,
  onRequestClose,
  addMovie,
  setAddMovie,
  handleAddMovieSubmit,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Movie Modal"
      className="modal"
      overlayClassName="modal-overlay"
    >
        <div className="modal-header">
          <h2 className="modal-title">Add Movie</h2>
          <button
            className="modal-close-button"
            onClick={onRequestClose}
          >
            &times;
          </button>
        </div>
        <form
          className="modal-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleAddMovieSubmit(addMovie);
          }}
        >
          <div className="modal-form-label">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={addMovie?.title || ""}
              onChange={(e) =>
                setAddMovie({ ...addMovie, title: e.target.value })
              }
            />
          </div>
          <div className="modal-form-label">
            <label htmlFor="imageUrl">Image URL:</label>
            <input
              type="text"
              id="imageUrl"
              value={addMovie?.imageUrl || ""}
              onChange={(e) =>
                setAddMovie({ ...addMovie, imageUrl: e.target.value })
              }
            />
          </div>
          <div className="modal-form-label">
            <label htmlFor="releaseDate">Release Date:</label>
            <input
              type="number"
              id="releaseDate"
              value={addMovie?.releaseDate || ""}
              onChange={(e) =>
                setAddMovie({ ...addMovie, releaseDate: e.target.value })
              }
            />
          </div>
          <div className="modal-form-label">
            <label htmlFor="rating">Rating 1-10:</label>
            <input
              type="number"
              id="rating"
              step="0.1"
              min="0"
              max="10"
              value={addMovie?.rating || ""}
              onChange={(e) =>
                setAddMovie({ ...addMovie, rating: e.target.value })
              }
            />
          </div>
          <div className="modal-form-label">
            <label htmlFor="overview">Overview:</label>
            <textarea
              id="overview"
              rows="5"
              value={addMovie?.overview || ""}
              onChange={(e) =>
                setAddMovie({ ...addMovie, overview: e.target.value })
              }
            />
          </div>
          <button className="modal-submit-button" type="submit">
            Add Movie
          </button>
        </form>
    </Modal>
  );
};

export default AddMovieModal;