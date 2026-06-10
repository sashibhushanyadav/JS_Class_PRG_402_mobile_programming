// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBE1nwmout4hfcuvoywXnv4fnIaCdIdrsk",
  authDomain: "quickhire-74382.firebaseapp.com",
  projectId: "quickhire-74382",
  storageBucket: "quickhire-74382.firebasestorage.app",
  messagingSenderId: "365491987772",
  appId: "1:365491987772:web:5a5f2f8980c0f687086a39",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

console.log(db);
