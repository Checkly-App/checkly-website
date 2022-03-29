import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CheckIn from '../../components/Charts/CheckIn';
import Overtime from '../../components/Charts/Overtime';
import Timeline from '../../components/Charts/Timeline';
import Total from '../../components/Charts/Total';
import Weekly from '../../components/Charts/Weekly';
import Worked from '../../components/Charts/Worked';
import LateMinutes from '../../components/Charts/LateMinutes';
import Arrival from '../../components/Charts/Arrival';
import Departure from '../../components/Charts/Departure';

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
            margin: 2em 3em;
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
    overflow-y: scroll;
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
`

const Dashboard = () => {
    const today = format(new Date(), 'MMMM dd, yyyy');

    const weeklyData = [
        {
            name: 'Sun',
            Abscence: 400,
            Attendance: 240,
            Late: 200,
        },
        {
            name: 'Mon',
            Abscence: 300,
            Attendance: 138,
            Late: 220,
        },
        {
            name: 'Tue',
            Abscence: 200,
            Attendance: 580,
            Late: 229,
        },
        {
            name: 'Wed',
            Abscence: 270,
            Attendance: 308,
            Late: 200,
        },
        {
            name: 'Thu',
            Abscence: 190,
            Attendance: 480,
            Late: 281,
        }
    ];


    return (
        <Wrapper>
            <Title>Acme Corporations</Title>
            <Subtitle>{today}</Subtitle>
            <Container>
                <Total
                    cell='cell1'
                    title='Total attendance'
                    labels={['Attendance', 'Abscence']}
                    data={[1524, 273]}
                    background={['#2CB1EF', '#C4C4C4']} />
                <Total
                    cell='cell2'
                    title='Total abscence'
                    labels={['Abscence', 'Attendance']}
                    data={[273, 1524]}
                    background={['#F65786', '#C4C4C4']} />
                <Weekly data={weeklyData} />
                <Timeline />
                <Worked />
                <CheckIn />
                <Overtime />
                <LateMinutes />
                <Arrival />
                <Departure />
            </Container>
        </Wrapper>

    );
};

export default Dashboard;