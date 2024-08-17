import React, { useState } from "react";
import api from "../api";
import axios from "axios";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submit, setSubmit] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    console.log("Form submitted");
    try {
      const response = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      onLogin(response.data.user);
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      setError("Invalid credentials or server error");
    } finally {
      setSubmit(true);
    }
  };

  return (
    !submit && (
      <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    )
  );
};

export default Login;
