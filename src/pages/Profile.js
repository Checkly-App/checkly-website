import { React, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { getAuth, signOut } from "firebase/auth";
import EmplyeeAdd from './AddEmployee';
import AdminProfile from './AdminProfile';
import ChecklyProfile from './ChecklyProfile'


const Profile = () => {
  const [userRole, setuserRole] = useState(false);

  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const emailValid = () => {
    const email = user.email;

    const index = email.indexOf("@")
    const subst = email.substring(index)

    if (subst == "@checkly.org") {
      setuserRole(true)

    }
    else {
      setuserRole(false)


    }
  }

  useEffect(() => {
    emailValid()
  }, [])
  const logout = () => {

    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }
  return (

    <>
      {userRole ? <ChecklyProfile /> : <AdminProfile />}
    </>
  )
};

export default Profile;