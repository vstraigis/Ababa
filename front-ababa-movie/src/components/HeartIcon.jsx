import React, { useState } from "react";
import heart from "../assets/heart.svg";
import check from "../assets/redheart.svg";
import "./css/HeartIcon.css";

const HeartIcon = ({ onClick }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleClick = () => {
    onClick();
    !isFavorite && setIsFavorite(!isFavorite);
   // setIsFavorite(!isFavorite);
  };

  return (
    <div className="heartIcon" onClick={handleClick}>
      <img
        src={isFavorite ? check : heart}
        alt="Favorite"
      />
    </div>
  );
};

export default HeartIcon;