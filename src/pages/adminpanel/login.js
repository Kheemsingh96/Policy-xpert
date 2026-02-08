import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin@policyxpert.com" && password === "admin123") {
      navigate("/admin/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-box">
        <h2>Admin Login</h2>
        <p>Welcome back! Please login to your account.</p>
        <form onSubmit={handleLogin}>
          <div className="admin-input-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="admin@policyxpert.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="admin-input-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="admin123" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="admin-error-text">{error}</p>}
          <button type="submit" className="admin-login-btn">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;