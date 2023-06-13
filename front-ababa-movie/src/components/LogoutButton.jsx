import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/LogoutButton.css";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return <button className="button" onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;