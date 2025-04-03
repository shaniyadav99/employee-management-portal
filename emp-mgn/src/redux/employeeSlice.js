// src/redux/employeeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  addEmployee, 
  getAllEmployees, 
  getEmployeeById, 
  updateEmployee, 
  deleteEmployee, 
  uploadProfilePicture,
  searchEmployeesByName
} from '../api/employeeApi';

export const createEmployee = createAsyncThunk(
  'employees/createEmployee',
  async (employeeData, { rejectWithValue }) => {
    try {
      const employeeId = await addEmployee(employeeData);
      return { ...employeeData, id: employeeId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchEmployees = createAsyncThunk(
  'employees/fetchEmployees',
  async (_, { rejectWithValue }) => {
    try {
      const employees = await getAllEmployees();
      return employees;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchEmployeeDetails = createAsyncThunk(
  'employees/fetchEmployeeDetails',
  async (employeeId, { rejectWithValue }) => {
    try {
      const employee = await getEmployeeById(employeeId);
      return employee;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editEmployee = createAsyncThunk(
  'employees/editEmployee',
  async ({ employeeId, updates }, { rejectWithValue }) => {
    try {
      await updateEmployee(employeeId, updates);
      return { id: employeeId, ...updates };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeEmployee = createAsyncThunk(
  'employees/removeEmployee',
  async (employeeId, { rejectWithValue }) => {
    try {
      await deleteEmployee(employeeId);
      return employeeId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const uploadEmployeeProfilePicture = createAsyncThunk(
  'employees/uploadProfilePicture',
  async ({ employeeId, file }, { rejectWithValue }) => {
    try {
      const downloadURL = await uploadProfilePicture(employeeId, file);
      return { employeeId, profilePicture: downloadURL };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchEmployees = createAsyncThunk(
  'employees/searchEmployees',
  async (searchTerm, { rejectWithValue }) => {
    try {
      const employees = await searchEmployeesByName(searchTerm);
      return employees;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  employees: [],
  selectedEmployee: null,
  loading: false,
  error: null,
  searchResults: []
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    clearSelectedEmployee: (state) => {
      state.selectedEmployee = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Create Employee
      .addCase(createEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees.push(action.payload);
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Employees
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Employee Details
      .addCase(fetchEmployeeDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployeeDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedEmployee = action.payload;
      })
      .addCase(fetchEmployeeDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Edit Employee
      .addCase(editEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editEmployee.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.employees.findIndex(emp => emp.id === action.payload.id);
        if (index !== -1) {
          state.employees[index] = {
            ...state.employees[index],
            ...action.payload
          };
        }
        if (state.selectedEmployee && state.selectedEmployee.id === action.payload.id) {
          state.selectedEmployee = {
            ...state.selectedEmployee,
            ...action.payload
          };
        }
      })
      .addCase(editEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Remove Employee
      .addCase(removeEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = state.employees.filter(emp => emp.id !== action.payload);
        if (state.selectedEmployee && state.selectedEmployee.id === action.payload) {
          state.selectedEmployee = null;
        }
      })
      .addCase(removeEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Upload Profile Picture
      .addCase(uploadEmployeeProfilePicture.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadEmployeeProfilePicture.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.employees.findIndex(emp => emp.id === action.payload.employeeId);
        if (index !== -1) {
          state.employees[index].profilePicture = action.payload.profilePicture;
        }
        if (state.selectedEmployee && state.selectedEmployee.id === action.payload.employeeId) {
          state.selectedEmployee.profilePicture = action.payload.profilePicture;
        }
      })
      .addCase(uploadEmployeeProfilePicture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Search Employees
      .addCase(searchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearSelectedEmployee, clearError, clearSearchResults } = employeeSlice.actions;
export default employeeSlice.reducer;