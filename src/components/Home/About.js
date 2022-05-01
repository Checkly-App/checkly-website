import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;  
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20%;
`
const Section = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1em;
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

     @media (max-width: 768px) {
        width: fit-content;
        padding: 0.5em;
    }
`
const Detail = styled.a`
    color: #A3A3A1;
`

const About = () => {
    return (
        <Wrapper id='about'>
            <Section>
                <SectionTitle>
                    About us
                </SectionTitle>
                <SectionParagraph>
                    Employees lining up in queues to mark their attendance is the contrary of productive.
                    <br />
                    It is well-known that one of the main factors influencing employees’ productivity is their job satisfaction.
                    <br /><br />
                    We wanted to create a solution that aims to facilitate the attendance recording process for employees. Specifically, to improve their every-day work experience by allowing more time for actual tasks and less time for tedious/repetitive tasks.
                    <br /><br />
                    Checkly is a graduation project, kindly check <Detail href='https://github.com/Checkly-App'> this link  </Detail> for more information about the project.
                </SectionParagraph>
            </Section>
        </Wrapper>
    );
};

export default About;