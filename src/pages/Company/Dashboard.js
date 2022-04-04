import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { BsPeople, BsCalendar4Event } from 'react-icons/bs';
import { VscTypeHierarchy } from 'react-icons/vsc';
import { CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Line, Area } from 'recharts';

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
    justify-content: space-between;
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
    justify-content: space-between;
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
    justify-content: space-between;
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
const Value = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    color: white;
`
const Number = styled.h6`
    font-weight: bold;
    font-size: 2.5em;
    margin: 0;
`
const Unit = styled.h6`
    font-weight: 400;
    font-size: 1em;
    margin-left: 0.25em;
`
const Circle = styled.div`
    width: 3em;
    height: 3em;
    background-color: rgba(255,255,255, 0.3);
    color: white;
    fill: white;
    border-radius: 3em;
    display: flex;
    align-self: start;
    justify-content: center;
    align-items: center;
`;
const Dashboard = () => {
    const [greeting, setGreeting] = useState('Good Evening');
    const data = [
        {
            'name': 'Jan',
            'Late': 103
        },
        {
            'name': 'Feb',
            'Late': 283
        },
        {
            'name': 'Mar',
            'Late': 402
        },
        {
            'name': 'Apr',
            'Late': 103
        },
        {
            'name': 'May',
            'Late': 293
        },
        {
            'name': 'Jun',
            'Late': 203
        },
        {
            'name': 'Jul',
            'Late': 283
        },
        {
            'name': 'Aug',
            'Late': 103
        },
        {
            'name': 'Sep',
            'Late': 302
        },
        {
            'name': 'Oct',
            'Late': 836
        },
        {
            'name': 'Nov',
            'Late': 320
        },
        {
            'name': 'Dec',
            'Late': 100
        }
    ]

    useEffect(() => {
        const hour = moment().hour();

        if (hour > 16)
            setGreeting("Good Evening");
        else if (hour > 11)
            setGreeting("Good Afternoon");
        else
            setGreeting('Good Morning');
    }, []);

    return (
        <Wrapper>
            <Title>{greeting}</Title>
            <Subtitle>Acme Corporations</Subtitle>
            <Container>
                <Employees>
                    <Value>
                        <Number>1524</Number>
                        <Unit> Total employees</Unit>
                    </Value>
                    <Circle>
                        <BsPeople size={22} />
                    </Circle>
                </Employees>
                <Departments>
                    <Value>
                        <Number>15</Number>
                        <Unit> Total departments</Unit>
                    </Value>
                    <Circle>
                        <VscTypeHierarchy size={22} />
                    </Circle>
                </Departments>
                <Meetings>
                    <Value>
                        <Number>265</Number>
                        <Unit> Conducted meetings</Unit>
                    </Value>
                    <Circle>
                        <BsCalendar4Event size={22} />
                    </Circle>
                </Meetings>
                <ChartContainer>
                    <ResponsiveContainer width='100%' height='100%'>
                        <AreaChart data={data}
                            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                            <XAxis dataKey='name' tick={{ fontSize: 12 }} />
                            <Tooltip />
                            <Area type="monotone" dataKey='Late' stroke='#F65786' fill='#F65786' />
                        </AreaChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </Container>
        </Wrapper>
    );
}

export default Dashboard;