import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAbpsxhUe3aGgN1DjVA5d1lD1FN3uhNxO8",
  authDomain: "expense-tracker-39f90.firebaseapp.com",
  projectId: "expense-tracker-39f90",
  storageBucket: "expense-tracker-39f90.firebasestorage.app",
  messagingSenderId: "235119290969",
  appId: "1:235119290969:web:c6d74ddb5d53a07a325f48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Auth instance
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

export default app; 