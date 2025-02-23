import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AuthPage({ setIsAuthenticated }) {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login/signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Prevents multiple clicks

  const navigate = useNavigate();

  // Use environment variable for API URL
  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const endpoint = isLogin ? "/api/login" : "/api/signup";

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Disable button during request

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong. Please try again.");
      }

      if (isLogin) {
        localStorage.setItem("token", data.token);
        setIsAuthenticated(true);
        navigate("/dashboard"); // Redirect to Dashboard
      } else {
        alert("Signup successful! You can now log in.");
        setIsLogin(true); // Switch to login after signup
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // Re-enable button
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Signup"}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleAuth}>
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
        <button type="submit" disabled={!email || !password || loading}>
          {loading ? "Processing..." : isLogin ? "Login" : "Signup"}
        </button>
      </form>
      <p>
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button onClick={() => setIsLogin(!isLogin)} disabled={loading}>
          {isLogin ? "Signup" : "Login"}
        </button>
      </p>
    </div>
  );
}

export default AuthPage;
