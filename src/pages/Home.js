import React, { useState } from 'react';
import styled from 'styled-components';
import HeaderMain from '../components/Header/HeaderMain';
import Hero from '../components/Home/Hero';
import About from '../components/Home/About';
import Services from '../components/Home/Services';
import { ReactComponent as TabletFrame } from '../assets/images/TabletFrame.svg';
import { HiOutlineMenuAlt2, HiX } from 'react-icons/hi';
import { IconButton } from '@mui/material';
import { ReactComponent as SemiCircleA } from '../assets/images/SemiCircleA.svg';
import { ReactComponent as SemiCircleB } from '../assets/images/SemiCircleB.svg';
import Footer from '../components/Footer/Footer';

const SemiCircle = styled(SemiCircleA)`
    position: absolute;
    padding: 0;
    margin: 0;
    left: 0;
    top: 150%;
    width: 15vw;
    height: auto;
`
const CircleB = styled(SemiCircleB)`
    position: absolute;
    padding: 0;
    margin: 0;
    right: 0;
    top: 300%;
    width: 7vw;
    height: auto;
    z-index: -1;
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-x: hidden;
    width: 100vw;
`
export const Icon = styled(IconButton)`
    display: none !important;
    @media  (max-width: 768px) {
        display: block !important;
        position: fixed !important;
        top: 0;
        left: 0;
        color: red;
        z-index: 1000;
    }
`
const Tablet = styled(TabletFrame)`
    position: absolute; 
    width: 50vw;
    height: auto;
    top: 100%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    padding: 0 0 2em 0;
     @media  (max-width: 768px) {
        display: none;
    }
`
const Home = () => {
    const [open, setOpen] = useState(false); // controls toggling the menu in mobiles

    // Function to set open from child components
    const updateOpen = (val) => setOpen(val);

    return (
        <>
            <Icon onClick={() => setOpen(!open)}>
                {open ? <HiX /> : <HiOutlineMenuAlt2 />}
            </Icon>
            <SemiCircle />
            <CircleB />
            <Wrapper>
                <HeaderMain open={open} updateOpen={updateOpen} />
                <Hero />
                <Tablet />
                <About />
                <Services />
                <Footer />
            </Wrapper>
        </>

    );
};
export default Home;