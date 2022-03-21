import React from 'react';
import logo from '../assets/images/logo.svg';
import '../Styles/LogoAnimation.css';

const ChecklyLogo = () => {
    return (
        <div>
            <img src={logo} className="App-logo" alt="logo" />
        </div>
    );
};

export default ChecklyLogo;