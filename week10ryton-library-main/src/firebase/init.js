// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEHPfIRgo1NP4OgPSOuTOrHth3n8tY-O4",
  authDomain: "week7-siyu.firebaseapp.com",
  projectId: "week7-siyu",
  storageBucket: "week7-siyu.appspot.com",
  messagingSenderId: "336026097576",
  appId: "1:336026097576:web:1a5d28efa8d786bb082f9d"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore()
export default db
