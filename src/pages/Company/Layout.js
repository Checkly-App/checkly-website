import React, { useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../../components/Sidebar/Sidebar';
import { HiOutlineMenuAlt2, HiX } from 'react-icons/hi';
import { Icon } from '../Home';
import ChecklyLogo from '../ChecklyLogo';

const Container = styled.div`
    height: 100vh;
    width: 100%;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: 1.5fr 10.5fr;
    grid-template-areas: 'bar main';
    justify-items: stretch;
    justify-content: center;
    background-color: #F5F5F5;

    @media  (max-width: 768px) {
        grid-template-columns: 1fr ;
        grid-template-areas: 'main';
    }
`
const Content = styled.div`
    overflow-y: scroll;
    grid-area: main;
    display: flex;
    flex-direction:column;
    align-items: stretch;
    background-color: #F5F5F5;
`

const Layout = ({ children, user }) => {
    const [open, setOpen] = useState(false); // controls toggling the menu in mobiles

    // Function to set open from child components
    const updateOpen = (val) => setOpen(val);

    return (
        <>
            <Icon onClick={() => setOpen(!open)}>
                {open ? <HiX /> : <HiOutlineMenuAlt2 />}
            </Icon>
            <Container>
                <Sidebar open={open} updateOpen={updateOpen} />
                <Content>
                    {user ? children : <ChecklyLogo />}
                </Content>
            </Container >
        </>
    );
};

export default Layout;