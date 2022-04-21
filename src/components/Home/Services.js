import React from 'react';
import styled from 'styled-components';
import { SectionTitle } from './About';

const Wrapper = styled.div`
    width: 100vw;
    height: auto;  
    display: flex;
    justify-content: center;
    margin-top: 20vh;
`
const Section = styled.div`
    display: flex;
   `

const Services = () => {
    return (
        <Wrapper id='services'>
            <Section>
                <SectionTitle>Services</SectionTitle>
            </Section>
        </Wrapper>
    );
};

export default Services;