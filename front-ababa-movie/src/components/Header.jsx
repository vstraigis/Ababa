import React from "react";
import logo from "../../public/movie.png";
import LogoutButton from "./LogoutButton";
import "./css/Header.css";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const Header = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleLogout = () => {

    localStorage.removeItem("token");
    toast.success("Logout successfully");
    handleNavigate("/login"); 
  };
  return (
    <header className="headerWrapper">
      <div id="1" className="header">
        <div className="container">
          <div className="navbar">
            <div className="logo">
              <a onClick={() => handleNavigate("/favorites")}>
                <img className="logoimg" src={logo} alt="logo" />
              </a>
              <a className="title" onClick={() => handleNavigate("/favorites")}>
                Ababa Movies
              </a>
            </div>
            <nav>
              <ul className="menu">
                <li className="menu__item">
                  <a
                    className="menu__item-link"
                    data-scroll
                    onClick={() => handleNavigate("/favorites")}
                  >
                    Favorites
                  </a>
                </li>
                <li className="menu__item">
                  <a
                    className="menu__item-link"
                    data-scroll
                    onClick={() => handleNavigate("/movies")}
                  >
                    Movies
                  </a>
                </li>
                <li className="menu__item">
                  <a
                    className="menu__item-link"
                    data-scroll
                    onClick={() => handleLogout()}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
