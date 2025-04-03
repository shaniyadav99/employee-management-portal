// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import employeeReducer from './employeeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    employees: employeeReducer
  }
});

export default store;