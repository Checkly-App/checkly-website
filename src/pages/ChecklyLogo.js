import React from 'react';
import logo from '../assets/images/logo.svg';
import '../Styles/LogoAnimation.css';
import { useNavigate } from 'react-router-dom';

const ChecklyLogo = () => {
    const navigate = useNavigate();

    return (
        <div>
            <img onClick={() => navigate("/login")} role="button" src={logo} className="App-logo" alt="logo" />
        </div>
    );
};

export default ChecklyLogo;