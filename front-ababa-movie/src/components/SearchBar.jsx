import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm, onSearch }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="buttonSearch" type="submit" onClick={onSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;