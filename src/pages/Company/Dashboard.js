import { format } from 'date-fns';
import React from 'react';
import styled from 'styled-components';
import Filter from '../../components/Charts/Filter';
import Total from '../../components/Charts/Total';
import Weekly from '../../components/Charts/Weekly';

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
    padding: 3em 4rem;
    grid-template-columns: 30% 30% 30%;
    grid-template-rows: 10em 20em 20em 10em;
    display: grid;
    grid-template-areas:'cell1 cell2 cell3' 
                        'cell4 cell4 cell3' 
                        'cell5 cell6 cell7' 
                        'cell8 cell9 cell10';
    grid-gap: 2em;
`
const Timeline = styled.div`
    grid-area: cell4;
    background: linear-gradient(165deg, #FFFFFF 70%, #F6F6F6 100%);
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.1);
    border-radius: 1em;
`
const Overtime = styled.div`
    grid-area: cell5;
    background: linear-gradient(165deg, #FFFFFF 70%, #F6F6F6 100%);
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.1);
    border-radius: 1em;
`
const Worked = styled.div`
    grid-area: cell6;
    background: linear-gradient(165deg, #FFFFFF 70%, #F6F6F6 100%);
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.1);
    border-radius: 1em;
`
const CheckIn = styled.div`
    grid-area: cell7;
    background: linear-gradient(165deg, #FFFFFF 70%, #F6F6F6 100%);
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.1);
    border-radius: 1em;
`
const LateMinutes = styled.div`
    grid-area: cell8;
    background: linear-gradient(165deg, #FFFFFF 70%, #F6F6F6 100%);
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.1);
    border-radius: 1em;
`
const Departure = styled.div`
    grid-area: cell9;
    background: linear-gradient(165deg, #FFFFFF 70%, #F6F6F6 100%);
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.1);
    border-radius: 1em;
`
const Arrival = styled.div`
    grid-area: cell10;
    background: linear-gradient(165deg, #FFFFFF 70%, #F6F6F6 100%);
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.1);
    border-radius: 1em;
`



const Dashboard = () => {
    const today = format(new Date(), 'MMMM dd, yyyy');

    // const [attendanceFilter, setAttendanceFilter] = useState(10);
    const handleChange = (event) => {
        console.log(event.target.value)
        // setAge(event.target.value);
    };

    const filters = [
        { value: 'Monthly' },
        { value: 'Yearly' },
    ]

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
            <Filter filters={filters} label='attendance' id='attendance' val='Monthly' handleChange={handleChange} />
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
                <Overtime />
                <Worked />
                <CheckIn />
                <LateMinutes />
                <Departure />
                <Arrival />
            </Container>
        </Wrapper>

    );
};

export default Dashboard;