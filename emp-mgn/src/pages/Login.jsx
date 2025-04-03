import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, clearError } from "../redux/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearError());
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate, dispatch]);

  useEffect(() => {
    if (error) {
      setFormError(error);
    }
  }, [error]);

  const validateForm = () => {
    setFormError("");
    if (!email.trim() || !password.trim()) {
      setFormError("All fields are required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setFormError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await dispatch(login({ email, password }));
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Sign in to your account</h2>
        
        <p><strong>Test Credentials:</strong> Email: shani123@gmail.com | Password: shani123</p>

        {formError && <div style={styles.errorMessage}>{formError}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          <button type="submit" disabled={loading} style={loading ? styles.buttonDisabled : styles.button}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div style={styles.footer}>
          <p>
            Don't have an account?{" "}
            <Link to="/register" style={styles.link}>
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#333",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginBottom: "15px",
    textAlign: "left",
  },
  label: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#333",
    display: "block",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    fontWeight: "600",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  buttonDisabled: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    fontWeight: "600",
    backgroundColor: "#93c5fd",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "not-allowed",
  },
  footer: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#555",
  },
  link: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "600",
  },
  errorMessage: {
    backgroundColor: "#fde8e8",
    color: "#d32f2f",
    padding: "10px",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "15px",
  },
};

export default Login;
