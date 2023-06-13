import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/Button.css";

const Button = ({ text, isLogout = false }) => {
  const navigate = useNavigate();


  const handleLogout = () => {
    if (isLogout) {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  return (
    <button
      className="button"
      onClick={handleLogout}
      type={isLogout ? "button" : "submit"}
    >
      {text}
    </button>
  );
};

export default Button;