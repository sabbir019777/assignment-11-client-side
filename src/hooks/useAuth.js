// src/hooks/useAuth.js
import { useState, useEffect } from "react";
import { auth } from "../Firebase/Firebase.config";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { axiosInstance } from "../utils/api";


export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  const getUserProfile = async () => {
    try {
      const res = await axiosInstance.get(`/users/status`);
      return res.data; 
    } catch (err) {
      console.error("DB Profile Fetch Error:", err);
      return null;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser) {
      
        const dbData = await getUserProfile();
        
      
        const fullUser = {
          ...currentUser,
          role: dbData?.role || "user", 
          isPremium: dbData?.isPremium || false,
          dbId: dbData?._id
        };

        setUser(fullUser);
        setIsPremium(fullUser.isPremium);
      } else {
        setUser(null);
        setIsPremium(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

 
  const logout = () => signOut(auth);

  return { user, isPremium, loading, logout };
};

export default useAuth;