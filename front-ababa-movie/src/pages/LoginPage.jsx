import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import "./css/LoginPage.css";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const validate = () => {
    let isError = false;
    const errors = {
      email: "",
      password: "",
    };

    if (!/.+@.+\..+/.test(email)) {
      isError = true;
      errors.email = "Email address is invalid";
    }

    if (password.length < 6) {
      isError = true;
      errors.password = "At least 6 characters required";
    }

    setIsError(errors);

    return !isError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post("http://localhost:5000/login", {
          email,
          password,
        });

        localStorage.setItem("token", response.data.token);
        navigate("/favorites");
      } catch (error) {
        toast.error("Error logging in");
        console.log("Error logging in", error);
      }
    }
  };

  return (
    <div className="loginWrapper">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="user-box">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={isError.email.length > 0 ? "is-invalid" : ""}
            />
            <label>{isError.email.length > 0 ? isError.email : "Email"}</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={isError.password.length > 0 ? "is-invalid" : ""}
            />
            <label>
              {isError.password.length > 0 ? isError.password : "Password"}
            </label>
          </div>
          <Button text="Login" />
        </form>
        <button className="button" onClick={() => navigate("/register")}>
          Register instead
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
