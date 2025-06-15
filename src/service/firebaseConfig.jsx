// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIRHbyp9RNsCCG86XStqLwRzaHfmCASco",
  authDomain: "aitripplanner88.firebaseapp.com",
  projectId: "aitripplanner88",
  storageBucket: "aitripplanner88.firebasestorage.app",
  messagingSenderId: "549597147316",
  appId: "1:549597147316:web:e6bbc5bff945c59e8027e1",
  measurementId: "G-VNEFWP0KB1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
