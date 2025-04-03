import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register, clearError } from "../redux/authSlice";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearError());
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated, navigate, dispatch]);

  useEffect(() => {
    if (error) setFormError(error);
  }, [error]);

  const validateForm = () => {
    setFormError("");

    if (!fullName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setFormError("All fields are required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setFormError("Please enter a valid email address");
      return false;
    }
    if (password.length < 6) {
      setFormError("Password must be at least 6 characters long");
      return false;
    }
    if (password !== confirmPassword) {
      setFormError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await dispatch(register({ email, password, displayName: fullName }));
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h2 style={styles.title}>Create your account</h2>

        {formError && <div style={styles.errorBox}>{formError}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="fullName" style={styles.label}>Full Name</label>
            <input
              id="fullName"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>Email address</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="confirmPassword" style={styles.label}>Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          <button type="submit" disabled={loading} style={loading ? styles.disabledButton : styles.submitButton}>
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p style={styles.loginLink}>
          Already have an account? <Link to="/login" style={styles.link}>Sign in</Link>
        </p>
      </div>
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f7f9fc",
    padding: "20px",
  },
  formWrapper: {
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "30px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  errorBox: {
    backgroundColor: "#ffebee",
    color: "#d32f2f",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "15px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
  label: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "5px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "14px",
    outline: "none",
    transition: "border 0.3s ease",
  },
  inputFocus: {
    border: "1px solid #42a5f5",
  },
  submitButton: {
    backgroundColor: "#42a5f5",
    color: "#fff",
    padding: "12px",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    border: "none",
    transition: "background 0.3s ease",
  },
  disabledButton: {
    backgroundColor: "#90caf9",
    color: "#fff",
    padding: "12px",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    cursor: "not-allowed",
    opacity: "0.7",
  },
  loginLink: {
    fontSize: "14px",
    marginTop: "15px",
    color: "#333",
  },
  link: {
    color: "#42a5f5",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Register;
