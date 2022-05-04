import { React, useState, useEffect, lazy, Suspense } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import ChecklyLogo from './pages/ChecklyLogo';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { auth } from './utilities/firebase';

const Layout = lazy(() => import('./pages/Company/Layout'));
const Departments = lazy(() => import('./pages/Company/Department/Departments'));
const AddDepartment = lazy(() => import('./pages/Company/Department/AddDepartment'));
const EditDepartment = lazy(() => import('./pages/Company/Department/EditDepartment'));

const AddLayout = lazy(() => import('./pages/Company/Employee/AddLayout'));
const ViewEmployees = lazy(() => import('./pages/Company/Employee/ViewEmployees'));
const EditEmployee = lazy(() => import('./pages/Company/Employee/EditEmployee'));
const ViewLayout = lazy(() => import('./pages/Company/Employee/ViewLayout'));

const Dashboard = lazy(() => import('./pages/Company/Dashboard'));
const TimeSheet = lazy(() => import('./pages/Company/TimeSheet'));
const Settings = lazy(() => import('./pages/Company/Settings'));
const CreateAnnouncement = lazy(() => import('./pages/Company/CreateAnnouncement'));


const Home = lazy(() => import('./pages/Home'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Authentication/Login'));
const ResetPassword = lazy(() => import('./pages/Authentication/ResetPassword'));
const ChecklyProfile = lazy(() => import('./pages/Checkly Admin/ChecklyProfile'));


const renderLoader = () => <ChecklyLogo />;


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
    const authInstance = auth;
    const unsubscribe = onAuthStateChanged(authInstance, userAuth => {
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
        <Suspense fallback={renderLoader()}>
          <Router>
            <Routes>
              <Route exact path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route exact path="/contact" element={<Contact />} />
              <Route exact path="/reset" element={<ResetPassword />} />
              <Route exact path="/checkly" element={<ChecklyProfile />} />
              <Route exact path="/admin/dashboard" element={<Layout user={userinfo} children={<Dashboard />} />} />
              <Route exact path="/admin/departments" element={<Layout user={userinfo} children={<Departments />} />} />
              <Route exact path="/admin/employees" element={<Layout user={userinfo} children={<ViewEmployees />} />} />
              <Route exact path="/admin/employees/add" element={<Layout user={userinfo} children={<AddLayout />} />} />
              <Route exact path="/admin/employees/edit" element={<Layout user={userinfo} children={<EditEmployee />} />} />
              <Route exact path="/admin/employees/view" element={<Layout user={userinfo} children={<ViewLayout />} />} />
              <Route exact path="/admin/timesheets" element={<Layout user={userinfo} children={<TimeSheet />} />} />
              <Route exact path="/admin/settings" element={<Layout user={userinfo} children={<Settings />} />} />
              <Route exact path="/admin/announcement" element={<Layout user={userinfo} children={<CreateAnnouncement />} />} />
              <Route exact path="/admin/departments/add" element={<Layout user={userinfo} children={<AddDepartment />} />} />
              <Route exact path="/admin/departments/edit" element={<Layout user={userinfo} children={<EditDepartment />} />} />
              <Route exact path="*" element={<ChecklyLogo />} />
            </Routes>
          </Router>
        </Suspense>
      </div >
    </ThemeProvider>
  );
}

export default App;
