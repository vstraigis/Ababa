import React from "react";
import Modal from "react-modal";

const EditMovieModal = ({
  isOpen,
  onRequestClose,
  editMovie,
  setEditMovie,
  handleEditMovieSubmit,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Movie Modal"
      className="modal"
      overlayClassName="modal-overlay"
    >
     <div className="modal-header">
          <h2 className="modal-title">Edit Movie</h2>
          <button
            className="modal-close-button"
            onClick={() => setShowEditMovieModal(false)}
          >
            &times;
          </button>
        </div>
        <form
          className="modal-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleEditMovieSubmit(editMovie);
          }}
        >
          <div className="modal-form-label">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={editMovie?.title || ""}
              onChange={(e) =>
                setEditMovie({ ...editMovie, title: e.target.value })
              }
            />
          </div>
          <div className="modal-form-label">
            <label htmlFor="imageUrl">Image URL:</label>
            <input
              type="text"
              id="imageUrl"
              value={editMovie?.imageUrl || ""}
              onChange={(e) =>
                setEditMovie({ ...editMovie, imageUrl: e.target.value })
              }
            />
          </div>
          <div className="modal-form-label">
            <label htmlFor="releaseDate">Release Date:</label>
            <input
              type="number"
              id="releaseDate"
              value={editMovie?.releaseDate || ""}
              onChange={(e) =>
                setEditMovie({ ...editMovie, releaseDate: e.target.value })
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
              value={editMovie?.rating || ""}
              onChange={(e) =>
                setEditMovie({ ...editMovie, rating: e.target.value })
              }
            />
          </div>
          <div className="modal-form-label">
            <label htmlFor="overview">Overview:</label>
            <textarea
              id="overview"
              rows="5"
              value={editMovie?.overview || ""}
              onChange={(e) =>
                setEditMovie({ ...editMovie, overview: e.target.value })
              }
            />
          </div>
          <button className="modal-submit-button" type="submit">
            Save Changes
          </button>
        </form>
      </Modal>
  );
};

export default EditMovieModal;