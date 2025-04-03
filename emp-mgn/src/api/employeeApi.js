// src/api/employeeApi.js
import { database, storage } from './firebaseConfig';
import { ref, set, get, remove, update, push, child, query, orderByChild } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const dbRef = ref(database, 'employee-management-system/employees');

// Create a new employee
export const addEmployee = async (employee) => {
  try {
    const newEmployeeRef = push(dbRef);
    const employeeId = newEmployeeRef.key;
    await set(newEmployeeRef, {
      ...employee,
      id: employeeId,
      createdAt: new Date().toISOString()
    });
    return employeeId;
  } catch (error) {
    throw error;
  }
};

// Get all employees
export const getAllEmployees = async () => {
  try {
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  } catch (error) {
    throw error;
  }
};

// Get employee by ID
export const getEmployeeById = async (employeeId) => {
  try {
    const employeeRef = ref(database, `employee-management-system/employees/${employeeId}`);
    const snapshot = await get(employeeRef);
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return null;
  } catch (error) {
    throw error;
  }
};

// Update employee details
export const updateEmployee = async (employeeId, updates) => {
  try {
    const employeeRef = ref(database, `employee-management-system/employees/${employeeId}`);
    await update(employeeRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    throw error;
  }
};

// Delete employee
export const deleteEmployee = async (employeeId) => {
  try {
    const employeeRef = ref(database, `employee-management-system/employees/${employeeId}`);
    await remove(employeeRef);
    return true;
  } catch (error) {
    throw error;
  }
};

// Upload employee profile picture
export const uploadProfilePicture = async (employeeId, file) => {
  try {
    const imageRef = storageRef(storage, `profile-pictures/${employeeId}`);
    await uploadBytes(imageRef, file);
    const downloadURL = await getDownloadURL(imageRef);
    
    // Update employee record with the profile picture URL
    const employeeRef = ref(database, `employee-management-system/employees/${employeeId}`);
    await update(employeeRef, { 
      profilePicture: downloadURL,
      updatedAt: new Date().toISOString()
    });
    
    return downloadURL;
  } catch (error) {
    throw error;
  }
};

// Delete employee profile picture
export const deleteProfilePicture = async (employeeId) => {
  try {
    const imageRef = storageRef(storage, `profile-pictures/${employeeId}`);
    await deleteObject(imageRef);
    
    // Update employee record to remove profile picture URL
    const employeeRef = ref(database, `employee-management-system/employees/${employeeId}`);
    await update(employeeRef, { 
      profilePicture: null,
      updatedAt: new Date().toISOString()
    });
    
    return true;
  } catch (error) {
    throw error;
  }
};

// Search employees by name
export const searchEmployeesByName = async (name) => {
  try {
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const employees = Object.values(snapshot.val());
      return employees.filter(employee => 
        employee.firstName.toLowerCase().includes(name.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(name.toLowerCase())
      );
    }
    return [];
  } catch (error) {
    throw error;
  }
};