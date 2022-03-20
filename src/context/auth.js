import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
  
  const [userinfo, setuserinfo] = useState();
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged
      (auth, user => {
      

       

          setuserinfo(user)
       
      })
    return unsubscribe
  }, [])


  return (
    <AuthContext.Provider value={{ userinfo}}>{children}</AuthContext.Provider>
  );
};