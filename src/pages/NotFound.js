import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ChecklyLogo from './ChecklyLogo';

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 2fr 2fr;
    grid-template-areas: 'logo content';
`
const Logo = styled.div`
    grid-area: logo;
    display: flex;
    align-items: center;
    justify-content: center;

`
const Content = styled.div`
    grid-area: content;
`
const Error = styled.h1`
    font-size: xx-large;
    font-weight: 500;
    color: #2F5B70;
    margin-bottom: 0.5em;
`
const Description = styled.h1`
    font-size: x-large;
    font-weight: 300;
    color: #2F5B70;
    margin-top: 0.5em;
`
const Divider = styled.div`
    width: 25%;
    height: 0.25em;
    border-radius: 10em;
    background: linear-gradient(90deg, #56BBEB 0%, #58AAF3 100%);
    margin-bottom: 1em;
`
const Button = styled.button`
    font-size: 1em;
    font-weight: 500;
    text-align :center;
    color: rgba(255,255,255,0.9);
    border-radius: 0.85em;
    border: none;
    background: linear-gradient(90deg, #56BBEB 0%, #58AAF3 100%);
    padding: 0.5em 1em;
    margin-top: 0.5em;
`
const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Wrapper>
            <Logo>
                <ChecklyLogo />
            </Logo>
            <Content>
                <Error>Error 404</Error>
                <Divider></Divider>
                <Description> Sorry, the page you are looking for <br /> could not be found</Description>
                <Button onClick={() => navigate("/login")}>Go to home</Button>
            </Content>
        </Wrapper>
    );
};

export default NotFound;