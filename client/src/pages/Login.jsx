import React, { useState } from "react";

import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    if (
      username.trim() === process.env.REACT_APP_USERNAME &&
      password === process.env.REACT_APP_PASSWORD
    )
      localStorage.setItem("user", "connected");
    else {
      setError("Incorrect credentials.");
      e.preventDefault();
    }
  };

  return (
    <div className="login__wrapper">
      <div className="login__form">
        <h1>Smart Jail System 1.0.0</h1>
        <form className="login__box" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Log In</button>
        </form>
        <div className="login__error">{error}</div>
      </div>
    </div>
  );
};

export default Login;
