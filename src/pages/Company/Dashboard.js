import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';

export const Construction = styled.div`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    margin: 1em 4em;
    @media (max-width: 768px) {
            margin: 0;
            padding: 0;
    }
`
const Title = styled.h1`
    font-size: 2em;
    font-weight: 500;
    color: #2CB1EF;
    margin: 2em 0 0.25em 4rem;
`
const Subtitle = styled.h1`
    font-size: 1em;
    font-weight: 300;
    margin: 0 0 0 4rem;
`
const Container = styled.div`
    overflow-y: hidden;
    overflow-x: hidden;
    min-height: 100vh;
    padding: 3em 3rem;
    grid-template-columns: 30% 30% 30%;
    grid-template-rows: 10em 20em 20em 10em 10em;
    display: grid;
    grid-template-areas:'cell1 cell2 cell3' 
                        'cell4 cell4 cell3' 
                        'cell5 cell6 cell7' 
                        'cell8 cell8 cell9'
                        'cell8 cell8 cell10';
    grid-gap: 2em;
    justify-content: center;
    @media (max-width: 768px) {
            padding: 1rem;
            grid-gap: 1em;
            grid-template-columns: 100%; 
            grid-template-rows: repeat(2, 5%) 15% repeat(5, 10%) repeat(2, 5%);
            grid-template-areas:'cell1' 'cell2' 'cell3' 
                                'cell4' 'cell5' 'cell6' 
                                'cell7' 'cell8' 'cell9' 
                                'cell10';
    }
`

const Dashboard = () => {
    const [greeting, setGreeting] = useState('Good evening');

    useEffect(() => {
        const hour = moment().hour();

        if (hour > 16) {
            setGreeting("Good evening");
        }

        if (hour > 11) {
            return setGreeting("Good afternoon");
        }

        setGreeting('Good morning');
    }, []);

    return (
        <Wrapper>
            <Title>{greeting}</Title>
            <Subtitle>Acme Corporations</Subtitle>
            <Container>
            </Container>
        </Wrapper>
    );
}

export default Dashboard;