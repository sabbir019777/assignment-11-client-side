// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../Firebase/Firebase.config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import toast from "react-hot-toast";
import { getUserStatus, registerOrSyncUser } from "../utils/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (u) => {
      if (u) {
        const token = await u.getIdToken();
      
        const baseUser = {
          uid: u.uid,
          email: u.email,
          displayName: u.displayName,
          photoURL: u.photoURL,
          token,
        };

        
        try {
      
          const status = await getUserStatus(u.email); 
          setUser({
            ...baseUser,
            isPremium: Boolean(status?.isPremium),
            role: status?.role || 'user', 
          });
        } catch (e) {
          setUser(baseUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);


  const refreshUserPlan = async () => {
   
    if (!user?.email) return; 
    try {
      const status = await getUserStatus(user.email); 
      if (status) {
        setUser((prev) => ({
          ...(prev || {}),
          isPremium: Boolean(status?.isPremium),
          role: status?.role,
        }));
      }
      return status;
    } catch (error) {
      console.warn("refreshUserPlan failed:", error);
      throw error;
    }
  };


  const login = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const token = await res.user.getIdToken();

      setUser({
        uid: res.user.uid,
        email: res.user.email,
        displayName: res.user.displayName,
        photoURL: res.user.photoURL,
        token,
      });

      localStorage.setItem("token", token);
      toast.success("Login successful");
      return res.user;
    } catch (err) {
      toast.error(err.message);
      throw err;
    }
  };

  // Google login

  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const u = res.user;
      const token = await u.getIdToken();

      setUser({
        uid: u.uid,
        email: u.email,
        displayName: u.displayName,
        photoURL: u.photoURL,
        token,
      });

      localStorage.setItem("token", token);
      toast.success("Google login successful");
      return u;
    } catch (err) {
      if (err.code !== "auth/popup-closed-by-user") {
        toast.error(err.message);
      }
      throw err;
    }
  };

  // Registration

  const register = async (name, email, password, photoURL) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res.user, { displayName: name, photoURL });

      const token = await res.user.getIdToken();
      setUser({
        uid: res.user.uid,
        email: res.user.email,
        displayName: name,
        photoURL,
        token,
      });

      localStorage.setItem("token", token);
      toast.success("Registration successful");
      return res.user;
    } catch (err) {
      toast.error(err.message);
      throw err;
    }
  };

  // Logout
  
  const logout = async () => {
    await signOut(auth);
    setUser(null);
    localStorage.removeItem("token");
    toast.success("Logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        signInWithGoogle,
        logout,
        setUser,
        refreshUserPlan,
        registerOrSyncUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};