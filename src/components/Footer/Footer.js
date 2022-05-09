import React from 'react';
import styled from 'styled-components';
import ChecklyLogo from '../../assets/images/logo.svg';

const Container = styled.div`
    background-color: rgba(196, 196, 196, 0.1);
    width: 80%;
    border-radius: 3em 3em 0 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2em;
    margin: 3em 0 0 0;
`
const App = styled.div`
    background-color: white;
    height: 5em;
    width: 5em;
    border-radius: 1.5em;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
`
const Logo = styled.img`
    height: 2.5em;
    width: auto;
`
const Details = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row ;
    justify-content: center;
    align-items: center;
    color: #A3A3A1;
    margin-top: 2em;
`
const Detail = styled.a`
    color: #A3A3A1;
`
const Seperator = styled.p`
    margin: 0 1em;
    padding: 0;
    color: #A3A3A1;
`
const Footer = () => {
    return (
        <Container>
            <App>
                <Logo src={ChecklyLogo} alt='logo' />
            </App>
            <Details>
                <Detail href='mailto:checkly.services@gmail.com'> checkly.services@gmail.com </Detail>
                <Seperator> — </Seperator>
                <Detail href='https://github.com/Checkly-App'> Github </Detail>
            </Details>
        </Container>
    );
};

export default Footer;