import React from "react";
import "./css/SortButton.css";

const SortButton = ({ sortOrder, onClick }) => {
  return (
    <button className="buttonSort" onClick={onClick}>
      Sort by release year ({sortOrder})
    </button>
  );
};

export default SortButton;