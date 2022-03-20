import React ,{useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './auth';

import {  useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth();
const user = "12";

const PrivateRoute = () => {
   
    // determine if authorized, from context or however you're doing it
    const { userinfo } = useContext(AuthContext);
    console.log(user)
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return user ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute