// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB8MlGq8tm1ro6mInDathJPa3tOAysWDWg",
  authDomain: "custom-forms-a4aed.firebaseapp.com",
  projectId: "custom-forms-a4aed",
  storageBucket: "custom-forms-a4aed.appspot.com",
  messagingSenderId: "815794371371",
  appId: "1:815794371371:web:0be6809bb88e5baf4ca36e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;