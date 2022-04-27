import { React, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AddCompany from '../../pages/Checkly Admin/AddCompany';
import styled from "styled-components";
import Sidebar from '../../components/Sidebar/AdminSideBar';


const Container = styled.div`
    height: 100vh;
    width: 100%;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: 2fr 10.5fr;
    grid-template-areas: 'bar main';
    justify-items: stretch;
    justify-content: center;
    background-color: #FFFFFF;

    @media  (max-width: 768px) {
        grid-template-columns: 1fr ;
        grid-template-areas: 'main';
    }
`

const ChecklyProfile = () => {

  
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, userAuth => {
      if (userAuth) {
        const index = userAuth?.email.indexOf("@")
        const subst = userAuth?.email.substring(index)

        if (subst == "@checkly.org") {
          navigate("/checkly")
        }
        else {
          navigate("/admin/dashboard")
        }

      } else {
        navigate("/login")

      }
    })
    return unsubscribe
  }, [])


  // const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const navigate = useNavigate()

  const logout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      window.history.replaceState(null, null, "/login");
      navigate("/login")
      window.location.reload(false);
    });
  }

  return (

    <>
    <Container>
     <Sidebar/>  
   </Container>
    <AddCompany />
    </>
    
  )
};

export default ChecklyProfile;