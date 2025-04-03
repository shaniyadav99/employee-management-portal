import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchEmployees, clearError, clearSearchResults } from "../redux/employeeSlice";
import EmployeeCard from "../components/EmployeeCard";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { employees, searchResults, loading, error } = useSelector((state) => state.employees);
  const [displayedEmployees, setDisplayedEmployees] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    dispatch(fetchEmployees());

    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  useEffect(() => {
    if (searchResults.length > 0) {
      setDisplayedEmployees(searchResults);
      setIsSearching(true);
    } else {
      setDisplayedEmployees(employees);
      setIsSearching(false);
    }
  }, [employees, searchResults]);

  const handleClearSearch = () => {
    dispatch(clearSearchResults());
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Employee Dashboard</h1>
        <Link to="/add-employee" style={styles.addButton}>
          Add New Employee
        </Link>
      </div>

      {error && <div style={styles.errorBox}>{error}</div>}

      {isSearching && (
        <div style={styles.searchInfo}>
          <p>
            Showing search results: <span style={styles.bold}>{displayedEmployees.length}</span> employees found
          </p>
          <button onClick={handleClearSearch} style={styles.clearSearchButton}>
            Clear Search
          </button>
        </div>
      )}

      {loading ? (
        <div style={styles.loader}>
          <div style={styles.spinner}></div>
        </div>
      ) : displayedEmployees.length > 0 ? (
        <div style={styles.grid}>
          {displayedEmployees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>
      ) : (
        <div style={styles.emptyState}>
          <h3 style={styles.noEmployeesText}>No employees found</h3>
          <p>
            {isSearching ? "No employees match your search criteria" : "Get started by adding your first employee"}
          </p>
          {!isSearching && (
            <Link to="/add-employee" style={styles.addEmployeeLink}>
              Add Employee
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    padding: "40px",
    backgroundColor: "#f7f9fc",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#42a5f5",
    color: "white",
    padding: "10px 15px",
    borderRadius: "5px",
    textDecoration: "none",
    transition: "background 0.3s ease",
    fontSize: "14px",
  },
  errorBox: {
    backgroundColor: "#ffebee",
    color: "#d32f2f",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "15px",
    textAlign: "center",
  },
  searchInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#e3f2fd",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "15px",
  },
  bold: {
    fontWeight: "600",
  },
  clearSearchButton: {
    background: "none",
    border: "none",
    color: "#1e88e5",
    cursor: "pointer",
    fontSize: "14px",
    transition: "color 0.3s ease",
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "200px",
  },
  spinner: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "4px solid transparent",
    borderTopColor: "#42a5f5",
    animation: "spin 1s linear infinite",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "15px",
  },
  emptyState: {
    textAlign: "center",
    padding: "40px",
  },
  noEmployeesText: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#555",
  },
  addEmployeeLink: {
    display: "inline-block",
    backgroundColor: "#42a5f5",
    color: "white",
    padding: "10px 15px",
    borderRadius: "5px",
    textDecoration: "none",
    marginTop: "10px",
    transition: "background 0.3s ease",
  },
};

export default Dashboard;
