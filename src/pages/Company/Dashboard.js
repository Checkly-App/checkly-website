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
    padding: 3em 3rem 3em 3rem;
    grid-template-columns: 30% 30% 30%;
    grid-template-rows: 10em 20em;
    display: grid;
    grid-template-areas:'cell1 cell2 cell3' 'cell4 cell4 cell4';
    grid-gap: 2em;
    justify-content: center;
    @media (max-width: 768px) {
        height: 100vh;
            padding: 1rem;
            grid-gap: 2em;
            grid-template-columns: 100%; 
            grid-template-rows: 20% 20% 20% 40%;
            grid-template-areas:'cell1' 'cell2' 'cell3' 'cell4';
    }
`
const Employees = styled.div`
   grid-area: cell1;
    background: linear-gradient(160deg, #47CEFF 70%, #2CB1EF 100%);
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.1);
    border-radius: 1em;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    justify-items: stretch;
    padding: 2em;
`;
const Departments = styled.div`
   grid-area: cell2;
    background: linear-gradient(160deg, #D980FF 70%, #B86AD9 100%);
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.1);
    border-radius: 1em;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    justify-items: stretch;
    padding: 2em;
`;
const Meetings = styled.div`
   grid-area: cell3;
    background: linear-gradient(160deg, #3DD2BB 70%, #26BEA7 100%);
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.1);
    border-radius: 1em;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    justify-items: stretch;
    padding: 2em;
`;
const ChartContainer = styled.div`
    padding: 2em 1em 1em 1em;
    grid-area: cell4;
    background: linear-gradient(165deg, #FFFFFF 70%, #F6F6F6 100%);
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.1);
    border-radius: 1em;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

const Dashboard = () => {
    const [greeting, setGreeting] = useState('Good evening');

    useEffect(() => {
        const hour = moment().hour();

        if (hour > 16)
            setGreeting("Good evening");
        else if (hour > 11)
            setGreeting("Good afternoon");
        else
            setGreeting('Good morning');
    }, []);

    return (
        <Wrapper>
            <Title>{greeting}</Title>
            <Subtitle>Acme Corporations</Subtitle>
            <Container>
                <Employees>
                </Employees>
                <Departments>
                </Departments>
                <Meetings>

                </Meetings>
                <ChartContainer>

                </ChartContainer>
            </Container>
        </Wrapper>
    );
}

export default Dashboard;