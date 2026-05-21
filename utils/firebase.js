// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5FRBGUipx9Pq0qrIQt0zjnBY2ENvSQ1o",
  authDomain: "netflix-cf98a.firebaseapp.com",
  projectId: "netflix-cf98a",
  storageBucket: "netflix-cf98a.firebasestorage.app",
  messagingSenderId: "860760919086",
  appId: "1:860760919086:web:de6310d071c68e914863bf",
  measurementId: "G-LDPKETBEYY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);