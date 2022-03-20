// import logo from './assets/images/logo.svg';
import './App.css';
import Login from './pages/Login';
import AdminProfile from './pages/AdminProfile';
import ChecklyProfile from './pages/ChecklyProfile';
import ResetPassword from './pages/ResetPassword';
import { React, useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Navigate, Outlet } from 'react-router-dom';


const theme = createTheme({
  palette: {
    primary: {
      main: '#2CB1EF'
    },
    grey: {
      main: '#A3A1A1',
      secondary: '#A3A1A1',
      disabled: '#A3A1A1',
      hint: '#A3A1A1'
    },
    error: {
      main: '#F65786'
    }
  }
});

function App() {
  //const [User,SetUser] = useState[null]
  const [userinfo, setuserinfo] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged
      (auth, userAuth => {
        const user = {
          Uid: userAuth?.Uid,
          email: userAuth?.email
        }

        if (userAuth) {

          setuserinfo(userAuth)
        } else {
          setuserinfo(null)
        }
      })
    return unsubscribe
  }, [])

  return (

    <div >


      <Router>

        <Routes>

       
         {userinfo? <Route component={() => (<div>404 Not found </div>)} /> : <Route exact path="/login" element={<Login />} />}
          <Route exact path="/ResetPassword" element={<ResetPassword />} />
          <Route exact path="/admin/AdminCheckly" element={<ChecklyProfile />} />
          <Route exact path="/admin/AdminEmployee" element={<AdminProfile />} />
        </Routes>
      </Router>
    </div >


  );
}

export default App;
