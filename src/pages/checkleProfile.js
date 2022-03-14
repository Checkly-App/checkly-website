import { React, useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom"
import { getAuth, signOut } from "firebase/auth";
import EmplyeeAdd from './AddEmployee'
const chechlyProfile = () => {

 
 // const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;
  

  const logout = () =>{

    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }
  return (
   
  <>
    <h1 style={{color:"green"}}>Welcome in 2 {user.email}</h1>
     
    <button onClick={()=>logout()}>Log out</button> 
  </>
  )
};
  
export default chechlyProfile;