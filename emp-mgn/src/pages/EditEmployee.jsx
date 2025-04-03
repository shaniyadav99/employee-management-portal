import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchEmployees, editEmployee, clearError } from "../redux/employeeSlice";

const EditEmployee = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { employees, loading, error } = useSelector((state) => state.employees);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    hireDate: "",
    salary: "",
    address: "",
    status: "active",
  });

  const [formError, setFormError] = useState("");

  useEffect(() => {
    dispatch(clearError());
    if (employees.length === 0) {
      dispatch(fetchEmployees());
    }
  }, [dispatch, employees.length]);

  useEffect(() => {
    const employee = employees.find((emp) => emp.id === id);
    if (employee) {
      setFormData(employee);
    }
  }, [employees, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    setFormError("");
    const { firstName, lastName, email, phone, position, department } = formData;
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim() || !position.trim() || !department.trim()) {
      setFormError("Please fill in all required fields");
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
      await dispatch(editEmployee({ employeeId: id, updates: formData }));
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to update employee:", error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h1 style={styles.title}>Edit Employee</h1>
        {formError && <div style={styles.errorBox}>{formError}</div>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.grid}>
            {Object.keys(formData).map(
              (key) =>
                key !== "id" && (
                  <div key={key} style={styles.inputGroup}>
                    <label htmlFor={key} style={styles.label}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                    <input
                      id={key}
                      name={key}
                      type={key === "hireDate" ? "date" : key === "salary" ? "number" : "text"}
                      placeholder={key}
                      value={formData[key]}
                      onChange={handleChange}
                      required
                      style={styles.input}
                    />
                  </div>
                )
            )}
          </div>
          <div style={styles.buttonGroup}>
            <button type="button" onClick={() => navigate("/dashboard")} style={styles.cancelButton}>
              Cancel
            </button>
            <button type="submit" disabled={loading} style={loading ? styles.disabledButton : styles.submitButton}>
              {loading ? "Updating..." : "Update Employee"}
            </button>
          </div>
        </form>
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
    minHeight: "100vh",
    backgroundColor: "#f7f9fc",
    padding: "40px",
  },
  formWrapper: {
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "25px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
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
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "15px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
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
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  cancelButton: {
    backgroundColor: "#aaa",
    color: "#fff",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background 0.3s ease",
    border: "none",
  },
  submitButton: {
    backgroundColor: "#42a5f5",
    color: "#fff",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background 0.3s ease",
    border: "none",
  },
  disabledButton: {
    backgroundColor: "#90caf9",
    color: "#fff",
    padding: "10px 15px",
    borderRadius: "5px",
    border: "none",
    cursor: "not-allowed",
    opacity: "0.7",
  },
};

export default EditEmployee;
