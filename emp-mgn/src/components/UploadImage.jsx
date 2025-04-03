import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadEmployeeProfilePicture } from "../redux/employeeSlice";

const UploadImage = ({ employeeId, currentImageUrl }) => {
  const dispatch = useDispatch();
  const [previewUrl, setPreviewUrl] = useState(currentImageUrl || "");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);

      // Create preview URL
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    try {
      setUploading(true);
      setError(null);

      await dispatch(uploadEmployeeProfilePicture({ employeeId, file }));
      setUploading(false);
    } catch (error) {
      setError("Failed to upload image. Please try again.");
      setUploading(false);
      console.error("Upload error:", error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.imageContainer}>
        {previewUrl ? (
          <img src={previewUrl} alt="Profile Preview" style={styles.image} />
        ) : (
          <div style={styles.noImage}>
            <span style={styles.noImageText}>No Image</span>
          </div>
        )}
      </div>

      <input
        type="file"
        id="profile-picture"
        accept="image/*"
        onChange={handleFileChange}
        style={styles.hiddenInput}
      />

      <div style={styles.buttonsContainer}>
        <label htmlFor="profile-picture" style={styles.selectButton}>
          Select Image
        </label>

        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          style={{
            ...styles.uploadButton,
            backgroundColor: !file || uploading ? "#bdbdbd" : "#2ecc71",
            cursor: !file || uploading ? "not-allowed" : "pointer",
          }}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {error && <p style={styles.errorText}>{error}</p>}
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "350px",
    textAlign: "center",
    transition: "transform 0.2s ease-in-out",
    margin: "auto",
  },
  imageContainer: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    overflow: "hidden",
    border: "3px solid #ddd",
    marginBottom: "15px",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  noImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#e0e0e0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  noImageText: {
    color: "#757575",
    fontSize: "14px",
  },
  hiddenInput: {
    display: "none",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "100%",
  },
  selectButton: {
    backgroundColor: "#3498db",
    color: "#fff",
    padding: "10px 15px",
    borderRadius: "5px",
    textAlign: "center",
    cursor: "pointer",
    transition: "background 0.3s ease",
    display: "inline-block",
  },
  uploadButton: {
    padding: "10px 15px",
    borderRadius: "5px",
    border: "none",
    color: "#fff",
    fontSize: "14px",
    transition: "background 0.3s ease",
  },
  errorText: {
    color: "#e74c3c",
    marginTop: "10px",
    fontSize: "14px",
  },
};

export default UploadImage;
