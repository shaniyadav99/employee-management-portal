import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeEmployee } from "../redux/employeeSlice";

const EmployeeCard = ({ employee }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`
      )
    ) {
      try {
        await dispatch(removeEmployee(employee.id));
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  return (
    <div style={styles.card}>
      {/* Employee Info */}
      <div style={styles.info}>
        <h3 style={styles.name}>
          {employee.firstName} {employee.lastName}
        </h3>
        <p style={styles.position}>{employee.position}</p>
        <p style={styles.department}>{employee.department}</p>

        {/* Contact Info */}
        <div style={styles.contact}>
          <p style={styles.text}>
            <strong>Email:</strong> {employee.email}
          </p>
          <p style={styles.text}>
            <strong>Phone:</strong> {employee.phone}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={styles.buttonContainer}>
        <Link to={`/edit-employee/${employee.id}`} style={styles.editButton}>
          Edit
        </Link>
        <button onClick={handleDelete} style={styles.deleteButton}>
          Delete
        </button>
      </div>
    </div>
  );
};

// Inline Styles
const styles = {
  card: {
    backgroundColor: "#fff",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: "320px",
    textAlign: "center",
    transition: "transform 0.2s ease-in-out",
    cursor: "pointer",
    margin: "10px",
  },
  cardHover: {
    transform: "scale(1.02)",
  },
  imageContainer: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    overflow: "hidden",
    marginBottom: "15px",
    border: "3px solid #ddd",
    cursor: "pointer",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  info: {
    flex: "1",
  },
  name: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
  },
  position: {
    fontSize: "14px",
    color: "#666",
    marginTop: "5px",
  },
  department: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "10px",
  },
  contact: {
    marginTop: "10px",
  },
  text: {
    fontSize: "13px",
    color: "#444",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginTop: "15px",
  },
  editButton: {
    backgroundColor: "#3498db",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: "5px",
    textDecoration: "none",
    transition: "background 0.3s ease",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
};

export default EmployeeCard;