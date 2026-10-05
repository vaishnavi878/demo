import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Login failed"
        );
      }

      // Save logged-in user
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      alert("Login successful!");

      navigate("/dashboard");

    } catch (error) {

      console.error(
        "Login error:",
        error
      );

      setError(error.message);

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        {/* Brand */}

        <div className="brand">

          <div className="brand-icon">
            S
          </div>

          <div>
            <h2>SmartBank</h2>
            <span>Digital Banking</span>
          </div>

        </div>


        {/* Heading */}

        <div className="login-heading">

          <h1>Welcome back</h1>

          <p>
            Login to manage your account
            and finances securely.
          </p>

        </div>


        {/* Error */}

        {error && (

          <div
            style={{
              color: "#dc2626",
              background: "#fee2e2",
              padding: "10px 14px",
              borderRadius: "8px",
              marginBottom: "16px",
            }}
          >
            {error}
          </div>

        )}


        {/* Login Form */}

        <form onSubmit={handleLogin}>

          <div className="input-group">

            <label>
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
            />

          </div>


          <div className="input-group">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
            />

          </div>


          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>


        {/* Register */}

        <div className="register-section">

          <span>
            Don't have an account?
          </span>

          <Link to="/register">
            Create Account
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;