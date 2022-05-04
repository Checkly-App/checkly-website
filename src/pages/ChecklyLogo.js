import React from 'react';
import logo from '../assets/images/logo.svg';
import '../Styles/LogoAnimation.css';

const ChecklyLogo = () => {

    return (
        <div className="App-logo-container">
            <img src={logo} className="App-logo" alt="logo" />
        </div>
    );
};

export default ChecklyLogo;