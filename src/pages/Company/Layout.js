import React from 'react';
import styled from 'styled-components';
import Sidebar from '../../components/Sidebar/Sidebar';

const Container = styled.div`
    height: 100vh;
    width: 100%;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 5fr;
    grid-template-areas: 'bar main';
    justify-items: stretch;
    justify-content: center;
`

const Content = styled.div`
    overflow-y: scroll;
    grid-area: main;
    display: subgrid;
    align-items: center;
    background-color: #F5F5F5;
`

const Layout = ({ children }) => {
    return (
        <Container>
            <Sidebar />
            <Content>
                {children}
            </Content>
        </Container>
    );
};

export default Layout;