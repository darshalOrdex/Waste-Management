import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAHb0eN0hpTi3P3hrfbAFcBx3G8izMGGy4",
  authDomain: "waste-management-3d955.firebaseapp.com",
  projectId: "waste-management-3d955",
  storageBucket: "waste-management-3d955.appspot.com",
  messagingSenderId: "147525965062",
  appId: "1:147525965062:web:9882dcbc15ac933d4afa87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);