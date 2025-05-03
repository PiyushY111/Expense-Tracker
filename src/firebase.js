import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBiuGE_0jnKVCcYX68i_B7740h2XRjlsN0",
  authDomain: "expense-tracker-ccd62.firebaseapp.com",
  projectId: "expense-tracker-ccd62",
  storageBucket: "expense-tracker-ccd62.appspot.com",
  messagingSenderId: "501140658641",
  appId: "1:501140658641:web:395a95e880e726977be8f0",
  measurementId: "G-5KTK9VVVKK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics
const analytics = getAnalytics(app);

// Get Auth and Firestore instances
export const auth = getAuth(app);
export const db = getFirestore(app);

export { analytics };
export default app; 