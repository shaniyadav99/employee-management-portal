// src/api/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCBCKx-30OciT3Ft-AkGe_5SeAYVUN9DfU",
  authDomain: "emp-mgn.firebaseapp.com",
  databaseURL: "https://emp-mgn-default-rtdb.firebaseio.com",
  projectId: "emp-mgn",
  storageBucket: "emp-mgn.firebasestorage.app",
  messagingSenderId: "1009440658873",
  appId: "1:1009440658873:web:127e0958e44fab30cb5268",
  measurementId: "G-9ZH77VCC58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);

export default app;