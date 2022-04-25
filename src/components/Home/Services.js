import React from 'react';
import styled from 'styled-components';
import { SectionTitle } from './About';
import Service from './Service';

const Wrapper = styled.div`
    width: 100vw;
    height: auto;  
    display: flex;
    justify-content: center;
    margin-top: 20vh;
`
const Section = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 1em;
`

const Services = () => {
    return (
        <Wrapper id='services'>
            <Section>
                <SectionTitle>Services</SectionTitle>
                <Service />
            </Section>
        </Wrapper>
    );
};

export default Services;