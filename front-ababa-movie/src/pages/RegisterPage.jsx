import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/RegisterPage.css";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const validate = () => {
    let isError = false;
    const errors = {
      name: "",
      email: "",
      password: "",
    };

    if (name.length < 4) {
      isError = true;
      errors.name = "At least 4 characters required";
    }

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
        const response = await axios.post("http://localhost:5000/register", {
          name,
          email,
          password,
        });

        localStorage.setItem("token", response.data.token);
        navigate("/favorites");
      } catch (error) {
        toast.error("User already exists");
        console.log("Error registering", error);
      }
    }
  };

  return (
    <div className="loginWrapper">
      <div className="login-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="user-box">
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={isError.name.length > 0 ? "is-invalid" : ""}
            />
            <label>{isError.name.length > 0 ? isError.name : "Name"}</label>
          </div>
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
          <button className="button" type="submit">
            Register
          </button>
        </form>
        <button className="button" onClick={() => navigate("/login")}>
          Login instead
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
