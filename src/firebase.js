import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBi23GNV2QkwNCl97ZecjNQYIowgYE-ods",
  authDomain: "electromart-auth-a0893.firebaseapp.com",
  projectId: "electromart-auth-a0893",
  storageBucket: "electromart-auth-a0893.firebasestorage.app",
  messagingSenderId: "139307378698",
  appId: "1:139307378698:web:2c5fd3fe1a96224a8157f3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app)