import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createEmployee, clearError } from "../redux/employeeSlice";

const AddEmployee = () => {
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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setFormError(error);
    }
  }, [error]);

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
      await dispatch(createEmployee(formData));
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to add employee:", error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h1 style={styles.title}>Add New Employee</h1>

        {formError && <div style={styles.errorBox}>{formError}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.grid}>
            {[
              { label: "First Name *", name: "firstName", type: "text" },
              { label: "Last Name *", name: "lastName", type: "text" },
              { label: "Email *", name: "email", type: "email" },
              { label: "Phone *", name: "phone", type: "tel" },
              { label: "Position *", name: "position", type: "text" },
              { label: "Department *", name: "department", type: "text" },
              { label: "Hire Date", name: "hireDate", type: "date" },
              { label: "Salary", name: "salary", type: "number" },
            ].map((field, index) => (
              <div key={index} style={styles.inputGroup}>
                <label style={styles.label}>{field.label}</label>
                <input
                  style={styles.input}
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                />
              </div>
            ))}

            <div style={{ ...styles.inputGroup, gridColumn: "span 2" }}>
              <label style={styles.label}>Address</label>
              <textarea
                style={{ ...styles.input, height: "80px" }}
                name="address"
                value={formData.address}
                onChange={handleChange}
              ></textarea>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Status</label>
              <select style={styles.input} name="status" value={formData.status} onChange={handleChange}>
                <option value="active">Active</option>
                <option value="on-leave">On Leave</option>
                <option value="terminated">Terminated</option>
              </select>
            </div>
          </div>

          <div style={styles.buttonContainer}>
            <button type="button" onClick={() => navigate("/dashboard")} style={styles.cancelButton}>
              Cancel
            </button>
            <button type="submit" disabled={loading} style={{ ...styles.submitButton, opacity: loading ? 0.6 : 1 }}>
              {loading ? "Adding..." : "Add Employee"}
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
    padding: "40px",
    backgroundColor: "#f7f9fc",
  },
  formWrapper: {
    maxWidth: "600px",
    width: "100%",
    background: "#ffffff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
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
  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "5px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  previewImage: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    marginTop: "10px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  cancelButton: {
    backgroundColor: "#b0bec5",
    color: "white",
    padding: "10px 15px",
    borderRadius: "5px",
  },
  submitButton: {
    backgroundColor: "#42a5f5",
    color: "white",
    padding: "10px 15px",
    borderRadius: "5px",
  },
};

export default AddEmployee;