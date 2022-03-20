import './App.css';
import { React, useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import styled from 'styled-components';
import Sidebar from './components/Sidebar/Sidebar';
import Departments from './pages/Departments';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Services from './pages/Services';
import AddEmployee from './pages/AddEmployee';
import Login from './pages/Login';
import AdminProfile from './pages/AdminProfile';
import ChecklyProfile from './pages/ChecklyProfile';
import ResetPassword from './pages/ResetPassword';

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

const AdminContainer = styled.div`
  height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 5fr;
  grid-template-areas: 'bar main';
  justify-items: stretch;
  justify-content: center;
`
const Content = styled.div`
  overflow-y: scroll;
  grid-area: main;
  display: subgrid;
  align-items: center;
  background-color: #F5F5F5;
`

function App() {
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
      });
    return unsubscribe;
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Routes>
            {userinfo ? <Route component={() => (<div>404 Not found </div>)} /> : <Route exact path="/login" element={<Login />} />}
            <Route exact path="/ResetPassword" element={<ResetPassword />} />
            <Route exact path="/admin/AdminCheckly" element={<ChecklyProfile />} />
          </Routes>
          <AdminContainer>
            <Sidebar />
            <Content>
              <Routes>
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/departments" element={<Departments />} />
                <Route path="/admin/employees" element={<AddEmployee />} />
                <Route path="/admin/analytics" element={<Analytics />} />
                <Route path="/admin/services" element={<Services />} />
              </Routes>
            </Content>
          </AdminContainer>
        </Router>
      </div >
    </ThemeProvider>
  );
}

export default App;
