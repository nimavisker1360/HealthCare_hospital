import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAVRNxcAI7NVBoIP5LdcFejiK02V77emvw",
  authDomain: "carepulse-540d9.firebaseapp.com",
  projectId: "carepulse-540d9",
  storageBucket: "carepulse-540d9.firebasestorage.app",
  messagingSenderId: "583563154235",
  appId: "1:583563154235:web:1cf9341700a0192f65dd1e",
  measurementId: "G-4PWX4HMVWX",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
