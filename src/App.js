import './App.css';
import { React, useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Departments from './pages/Company/Departments';
import Dashboard from './pages/Company/Dashboard';
import AddEmployee from './pages/Company/AddEmployee';
import Login from './pages/Authentication/Login';
import ChecklyProfile from './pages/Checkly Admin/ChecklyProfile';
import ResetPassword from './pages/Authentication/ResetPassword';
import Layout from './pages/Company/Layout';
import Home from './pages/Home';
import ChecklyLogo from './pages/ChecklyLogo';
import TimeSheet from './pages/Company/TimeSheet';
import Contact from './pages/Contact';

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
    },
    success: {
      main: '#7EC900'
    }
  }
});

function App() {
  const [userinfo, setuserinfo] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, userAuth => {
      if (userAuth) {
        setuserinfo(userAuth)
      } else {
        setuserinfo(null)
      }
    });
    return unsubscribe;
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/reset" element={<ResetPassword />} />
            <Route exact path="/checkly" element={<ChecklyProfile />} />
            <Route exact path="/admin/dashboard" element={<Layout user={userinfo} children={<Dashboard />} />} />
            <Route exact path="/admin/departments" element={<Layout user={userinfo} children={<Departments />} />} />
            <Route exact path="/admin/employees" element={<Layout user={userinfo} children={<AddEmployee />} />} />
            <Route exact path="/admin/timesheets" element={<Layout user={userinfo} children={<TimeSheet />} />} />
            <Route exact path="*" element={<ChecklyLogo />} />
          </Routes>
        </Router>
      </div >
    </ThemeProvider>
  );
}

export default App;
