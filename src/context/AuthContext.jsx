import { createContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../firebase";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { toast } from "react-toastify";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const errorMessages = {
    "auth/invalid-credential": "Incorrect email or password",
    "auth/user-not-found": "User not found",
    "auth/invalid-email": "Invalid email format",
  };
  const handleSignup = async (name, email, phone, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        phone,
        createdAt: new Date(),
      });
      console.log(user);
      toast.success("Account created successfully");
    } catch (error) {
      console.log(error.message);
      toast.error(errorMessages[error.code] || "Sign Up Failed");
      throw error;
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log(userCredential.user);
      toast.success("Signed in");
    } catch (error) {
      console.log(error.code);
      toast.error(errorMessages[error.code] || "Login failed");
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        setUser(currentUser);

        if (currentUser) {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));

          if (userDoc.exists()) {
            setUserProfile(userDoc.data());
          }

          const q = query(
            collection(db, "orders"),
            where("userId", "==", currentUser.uid),
          );

          const snapshot = await getDocs(q);

          const orders = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setUserOrders(orders);
        }

        setLoading(false);
      });

      if (user) {
        console.log("User logged in:", user.email);
      } else {
        console.log("User logged out");
      }
    });

    return () => unsubscribe();
  }, []);

  const ctxValue = {
    user,
    userProfile,
    userOrders,
    handleLogin,
    handleSignup,
    logout,
  };

  return (
    <AuthContext.Provider value={ctxValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
