import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-scroll';
import { ReactComponent as ChecklyLogo } from '../../assets/images/logo.svg';
import { propsToClassKey } from '@mui/styles';

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    width: 100vw;
    padding:  ${props => props.shrink ? '1em 6em' : '2em 6em'};
    background: ${props => props.background ? props.background : 'transparent'};
    position: fixed;
    top: 0;
    z-index: 101;
    transition: all .3s ease-in-out;
    box-shadow: ${props => props.shadow ? 'rgba(0, 0, 0, 0.1) 0px 4px 12px' : 'none'};

    @media  (max-width: 768px) {
        padding: 1em 3em;
        height: 100vh;
        background-color: white;
        flex-direction: column;
        color: #35435E ;
        display: ${props => props.open ? 'flex' : 'none'};
    }
`
const Logo = styled(ChecklyLogo)`
    display: ${props => props.menu ? 'none' : 'block'};
    width: 4rem;
    height: auto;

`
const Navigation = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    flex: 2;

    @media (max-width: 768px) {
        justify-content: space-around;
        flex-flow: column nowrap;
        color: #35435E ;
        font-size: 1.5em;
        margin-top: 1em;
        flex: 1;
    }
`
const NavigationItem = styled(Link)`
    color: ${props => props.color ? props.color : 'white'};
    margin: 0 1.25em;
    text-decoration: none;
    position: relative;

    @media  (max-width: 768px) {
        margin: 0 0.5em;
        color: #35435E ;
    }

     &:hover {
        color: ${props => props.color ? props.color : 'white'};
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
        background-color: ${props => props.color ? props.color : 'white'};
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
const Checkly = styled.h1`
    padding: 0;
    margin: 0;
    font-size: 2em;
    font-weight: 600;
    color: ${props => props.color ? props.color : 'white'};
    letter-spacing: 0.035em;

    @media  (max-width: 768px) {
            display: none;
    }
`
const Actions = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    flex: 2;

    @media  (max-width: 768px) {
        flex-direction: column;
        flex: 1;
        justify-content: flex-start;
    }
`
const PrimaryButton = styled.button`
    background-color: white;
    border: none;
    border-radius: 5px;
    color:#35435E;
    padding: 0.75em 1.75em;
    font-weight: 450;
    box-shadow: 0px 40px 40px -2px rgba(10, 0, 125, 0.15);
    z-index: 10;
    
    @media  (max-width: 768px) {
        border: 1px solid #35435E ;
        margin-top: 1em;
    }
`
const SecondaryButton = styled(NavLink)`
    background-color: transparent;
    color: ${props => props.color ? props.color : 'white'};
    font-weight: 400;
    font-size: 0.8em;
    margin: 0 1em;
    z-index: 10;
    text-decoration: none;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: .25rem;
    box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
    padding: calc(.875rem - 1px) calc(1.5rem - 1px);
    transition: all 250ms;

     @media  (max-width: 768px) {
        color: #35435E;
    }

    &:hover, &:focus {
        border-color: rgba(255, 255, 255, 0.15);
        box-shadow: rgba(0, 0, 0, 0.05) 0 4px 12px;
        color: ${props => props.color ? props.color : 'white'};

        @media  (max-width: 768px) {
        border-color: #35435E;
        box-shadow: rgba(0, 0, 0, 0.05) 0 4px 12px;
        color: #35435E;
        }
    }

    &:hover {
        transform: translateY(-3px);
    }

    &:active {
        background-color: white;
        border: none;
        transform: translateY(0);
        box-shadow: 0px 40px 40px -2px rgba(10, 0, 125, 0.15);
        color: #35435E;
        font-weight: 450;
    }
`


const HeaderMain = ({ open, updateOpen }) => {
    const [scroll, setScroll] = useState({}); // State to control scrolling


    // Function to listen for scrolling events and applies styles accordingly
    const listenScrollEvent = () => {
        if (window.scrollY > 5)
            setScroll({ background: 'white', color: '#35435E', shrink: '1em', shadow: true, logo: true })
        else
            setScroll({})
    }

    // Mount the event listener once the screen loads
    useEffect(() => {
        window.addEventListener('scroll', listenScrollEvent)
    }, []);

    return (
        <Wrapper open={open} background={scroll.background} shrink={scroll.shrink} shadow={scroll.shadow}>
            <Navigation color={scroll.color}>
                <NavigationItem onClick={() => updateOpen(false)} color={scroll.color} to="home" spy={true} smooth={true} offset={0} duration={500}>Home</NavigationItem>
                <NavigationItem onClick={() => updateOpen(false)} color={scroll.color} to="about" spy={true} smooth={true} offset={-100} duration={500}>About</NavigationItem>
                <NavigationItem onClick={() => updateOpen(false)} color={scroll.color} to="services" spy={true} smooth={true} offset={100} duration={500}>Services</NavigationItem>
            </Navigation>
            {scroll.logo ? <Logo /> : <Checkly color={scroll.color}> Checkly </Checkly>}
            <Actions >
                <SecondaryButton color={scroll.color} to='/login'> Login </SecondaryButton>
                <PrimaryButton> Sign up</PrimaryButton>
            </Actions>
        </Wrapper>
    );
};


export default HeaderMain;