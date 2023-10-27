// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB8MlGq8tm1ro6mInDathJPa3tOAysWDWg",
  authDomain: "custom-forms-a4aed.firebaseapp.com",
  projectId: "custom-forms-a4aed",
  storageBucket: "custom-forms-a4aed.appspot.com",
  messagingSenderId: "815794371371",
  appId: "1:815794371371:web:d844ac31da7d57304ca36e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;