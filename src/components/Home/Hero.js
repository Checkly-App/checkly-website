import React from 'react';
import styled from 'styled-components';
import { ReactComponent as LineShapeA } from '../../assets/images/LineShapeA.svg';
import { ReactComponent as LineShapeB } from '../../assets/images/LineShapeB.svg';
import { ReactComponent as CircleShapeA } from '../../assets/images/CircleShapeA.svg';

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    top: 0;
    background: radial-gradient(121.95% 137.23% at 50.01% 100%, #1675FE 16.8%, #5388F5 43.17%, #2AB2EF 88.7%, #25D0D0 100%);
`
const LineA = styled(LineShapeA)`
    position: absolute;
    left: 9%;
    top: 0;
    height: 100vh;

    @media (max-width: 768px) {
        left: 0;
    }
`
const LineB = styled(LineShapeB)`
    position: absolute;
    right: 10%;
    top: 0;
    height: 100vh;

    @media (max-width: 768px) {
        right: 5%;
    }
`
const CircleA = styled(CircleShapeA)`
    position: absolute;
    right: 0;
    top: 0;
    width: 10em;
    height: auto;
    
`
const HeadLine = styled.h1`
    color: white;
    padding: 0;
    font-size: 4em;
    font-weight:bold;
    text-align: center;
    margin: 2em 0 1em 0;
    
    @media (max-width: 768px) {
        margin: 2em 0 0.5em 0;
        font-size: 12vw;
    }
`
const Paragraph = styled.p`
    width: 50vw;
    color: white;
    font-size: x-large;
    text-align: center;

     @media (max-width: 768px) {
        font-size: 1.25em;
    }
`
const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
`

const Hero = () => {
    return (
        <Wrapper id='home'>
            <LineA />
            <LineB />
            <CircleA />
            <Content>
                <HeadLine >
                    Employee Managemnt <br />Software
                </HeadLine>
                <Paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Lacinia quisque congue suspendisse.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Lacinia quisque congue suspendisse.
                </Paragraph>
            </Content>
        </Wrapper>
    );
};

export default Hero;