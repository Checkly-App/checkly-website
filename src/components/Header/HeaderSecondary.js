import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ChecklyLogo } from '../../assets/images/logo.svg';
import { PrimaryButton, SecondaryButton } from './HeaderMain';
import { HashLink } from 'react-router-hash-link';

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    width: 100vw;
    padding: 1em 2em;
    background: transparent;
    position: fixed;
    top: 0;
    z-index: 101;
    transition: all .3s ease-in-out;
    box-shadow: none;

    @media  (max-width: 768px) {
        padding: 1em 3em;
        height: 100vh;
        background-color: white;
        flex-direction: column;
        color: #35435E ;
        display: ${props => props.open ? 'flex' : 'none'};
    }
`
const Checkly = styled.div`
    padding: 0;
    margin: 0;
    font-size: 1.5em;
    font-weight: 500;
    color: white;
    display: flex;
    flex-flow: row;
    color: #35435E;
    justify-content: center;
    align-items: center;

    @media  (max-width: 768px) {
            display: none;
    }
`
const Logo = styled(ChecklyLogo)`
    display: 'block';
    width: 4rem;
    height: auto;
    padding-right: 0.5em;
`
const Navigation = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: auto;

    @media (max-width: 768px) {
        justify-content: space-around;
        flex-flow: column nowrap;
        color: #35435E ;
        font-size: 1.5em;
        margin-top: 1em;
        flex: 1;
        margin-left: 0;
    }
`
const NavigationItem = styled(HashLink)`
    color:white;
    margin: 0 2vw;
    text-decoration: none;
    position: relative;

    @media  (max-width: 768px) {
        margin: 0 0.5em;
        color: #35435E ;
    }

     &:hover {
        color: white;
        cursor: pointer;

        @media  (max-width: 768px) {
            color: #35435E ;
            cursor: pointer;
        }
    }

    &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        border-radius: 2px;
        background-color: white;
        bottom: 0;
        left: 0;
        transform-origin: right;
        transform: scaleX(0);
        transition: transform .3s ease-in-out;

        @media  (max-width: 768px) {
            background-color: #35435E ;
        }
    }

    &:hover:before {
        transform-origin: left;
        transform: scaleX(1);
    }

`
const Actions = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;

    @media  (max-width: 768px) {
        flex-direction: column;
        flex: 1;
        justify-content: flex-start;
    }
`
const Login = styled(SecondaryButton)`
    margin: 0 2vw 0 2vw;
`

const HeaderSecondary = ({ open, updateOpen }) => {
    return (
        <Wrapper open={open}>
            <Checkly>
                <Logo />
                Checkly
            </Checkly>
            <Navigation>
                <NavigationItem onClick={() => updateOpen(false)} to="/" >Home</NavigationItem>
                <NavigationItem onClick={() => updateOpen(false)} to="/#about">About</NavigationItem>
                <NavigationItem onClick={() => updateOpen(false)} to="/#services">Services</NavigationItem>
            </Navigation>
            <Actions >
                <Login to='/login'> Login </Login>
                <PrimaryButton to='/contact'> Sign up</PrimaryButton>
            </Actions>
        </Wrapper>
    );
};


export default HeaderSecondary;