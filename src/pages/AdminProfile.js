import { React, useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom"
import {  signOut } from "firebase/auth";
import {  getAuth,onAuthStateChanged } from "firebase/auth";

const AdminProfile = () => {
  
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged
      (auth, userAuth => {

        if (userAuth) {
          const index =  userAuth?.email.indexOf("@")
          const subst =  userAuth?.email.substring(index)
      
          if (subst == "@checkly.org") {
            navigate("/admin/AdminCheckly")
        }
          else{
            navigate("/admin/AdminEmployee")
          }
         
        } else {
          navigate("/login")

        }
      })
    return unsubscribe
  }, [])
  
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate()


  const logout = () =>{

    const auth = getAuth();
    signOut(auth).then(() => {
      window.history.replaceState(null, null, "/login");
      navigate("/login")
      window.location.reload(false);
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }
  return (
   
  <>
    <h1 style={{color:"green"}}>Welcome in 1 {user?.email}</h1>
     
    <button onClick={()=>logout()}>Log out</button> 
  </>
  )
};
  
export default AdminProfile;