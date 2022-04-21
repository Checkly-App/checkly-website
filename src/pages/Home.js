import React, { useState } from 'react';
import styled from 'styled-components';
import HeaderMain from '../components/Header/HeaderMain';
import Hero from '../components/Home/Hero';
import About from '../components/Home/About';
import Services from '../components/Home/Services';
import { ReactComponent as TabletFrame } from '../assets/images/TabletFrameSample.svg';
import { HiOutlineMenuAlt2, HiX } from "react-icons/hi";
import { IconButton } from '@mui/material';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-x: hidden;
`
const Icon = styled(IconButton)`
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
            <Wrapper>
                <HeaderMain open={open} updateOpen={updateOpen} />
                <Hero />
                <Tablet />
                <About />
                <Services />
            </Wrapper>
        </>
    );
};
export default Home;