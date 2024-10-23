import React, { useState } from "react";
import "./LoginForm.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("token", data.token);
        console.log("Success:", data);
        const currentUser = [data.userId, data.name];
        console.log(data.token)
        dispatch(setUser({ user: currentUser, token: data.token }));

        console.log("working")
        navigate("/");
      })
      .catch((error) => {
        alert("Error:", error);
      });
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1 className="login-title">Weather App Login</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Log In
          </button>
          <button type="submit" className="Sign-Up-button">
            <Link to="/signup"> Don't have an Account ? Sign-Up</Link>
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
