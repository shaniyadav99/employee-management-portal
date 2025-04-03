import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { searchEmployees, clearSearchResults } from "../redux/employeeSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(searchEmployees(searchTerm));
      navigate("/dashboard");
    } else {
      dispatch(clearSearchResults());
    }
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        {/* Logo */}
        <div>
          <Link to="/" style={styles.logo}>
            Employee Management System
          </Link>
        </div>

        {/* Authenticated User Menu */}
        {isAuthenticated && (
          <div style={styles.menu}>
            {/* Search Bar */}
            <form onSubmit={handleSearch} style={styles.searchForm}>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search employees..."
                style={styles.searchInput}
              />
              <button type="submit" style={styles.searchButton}>
                🔍
              </button>
            </form>

            {/* Navigation Links */}
            <div style={styles.navLinks}>
              <Link to="/dashboard" style={styles.link}>
                Dashboard
              </Link>
              <Link to="/add-employee" style={styles.link}>
                Add Employee
              </Link>

              {/* User Dropdown */}
              <div
                style={styles.userContainer}
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <button style={styles.userButton}>
                  {user?.displayName || user?.email}
                </button>

                {showDropdown && (
                  <div style={styles.dropdown}>
                    <button onClick={handleLogout} style={styles.logoutButton}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Login & Register for Unauthenticated Users */}
        {!isAuthenticated && (
          <div style={styles.authLinks}>
            <Link to="/login" style={styles.link}>
              Login
            </Link>
            <Link to="/register" style={styles.link}>
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

// Inline Styles
const styles = {
  navbar: {
    backgroundColor: "#f8f9fa", // Light and attractive color
    padding: "15px 20px",
    width: "100vw", // Full width on all screens
    color: "#333",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    position: "sticky",
    top: "0",
    zIndex: "1000",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  logo: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
    textDecoration: "none",
  },
  menu: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    flexWrap: "wrap",
  },
  searchForm: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
  },
  searchInput: {
    border: "none",
    outline: "none",
    padding: "8px 10px",
    fontSize: "14px",
    width: "180px",
  },
  searchButton: {
    backgroundColor: "#6c63ff", // Light purple shade
    color: "#fff",
    border: "none",
    padding: "8px 10px",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  searchButtonHover: {
    backgroundColor: "#574bff",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  link: {
    color: "#333",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
    transition: "color 0.3s ease",
    padding: "8px",
    borderRadius: "5px",
  },
  linkHover: {
    color: "#6c63ff",
  },
  userContainer: {
    position: "relative",
    cursor: "pointer",
  },
  userButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "#333",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
  },
  dropdown: {
    position: "absolute",
    right: "0",
    top: "30px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "6px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
  },
  logoutButton: {
    backgroundColor: "transparent",
    border: "none",
    fontSize: "14px",
    color: "#6c63ff",
    cursor: "pointer",
    padding: "5px",
    textAlign: "left",
  },
  authLinks: {
    display: "flex",
    gap: "15px",
  },
};

export default Navbar;
