import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100vw;
    height: 80vh;  
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20%;
`
const Section = styled.div`
    display: flex;
    flex-direction: column;
`
export const SectionTitle = styled.h1`
    font-weight: 700;
    text-align: center;
    letter-spacing: 0.465672px;
    color: #35435E;
    position: relative;
    margin-bottom: 1em;

    &:before {
        content: '';
        position: absolute;
        width: 0.75em;
        height: 5px;
        border-radius: 2em;
        background-color: #01BDB2;
        bottom: -5px;
        left: 50%;
        transform: translate(-50%);
    }

    @media (max-width: 768px) {
        font-size: 2em;
        margin-bottom: 1em;
    }
`
const SectionParagraph = styled.p`
    width: 50vw;
    color: #35435E;
    font-size: large;
    text-align: center;
    margin-top: 0.75em;
`

const About = () => {
    return (
        <Wrapper id='about'>
            <Section>
                <SectionTitle>
                    About us
                </SectionTitle>
                <SectionParagraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Lacinia quisque congue suspendisse.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Lacinia quisque congue suspendisse.
                </SectionParagraph>
            </Section>
        </Wrapper>
    );
};

export default About;