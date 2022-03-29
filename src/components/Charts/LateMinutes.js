import React, { useState } from 'react';
import styled from 'styled-components';
import Filter from '../../components/Charts/Filter';
import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const ChartContainer = styled.div`
    padding: 2em;
    grid-area: cell8;
    background: linear-gradient(165deg, #FFFFFF 70%, #F6F6F6 100%);
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.1);
    border-radius: 1em;
`
const ChartTitle = styled.h1`
    font-size: 1em;
    font-weight: 500;
`
const FilterWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
const LateMinutes = () => {
    const [timelineFilter, setTimelineFilter] = useState('Monthly');
    const data = [
        {
            'name': 'Jan',
            'Late': 316,
        },
        {
            'name': 'Feb',
            'Late': 483,
        },
        {
            'name': 'Mar',
            'Late': 452,
        },
        {
            'name': 'Apr',
            'Late': 420,
        },
        {
            'name': 'May',
            'Late': 921,
        },
        {
            'name': 'Jun',
            'Late': 394,
        },
        {
            'name': 'Jul',
            'Late': 567,
        },
        {
            'name': 'Aug',
            'Late': 746,
        },
        {
            'name': 'Sep',
            'Late': 475,
        },
        {
            'name': 'Oct',
            'Late': 928,
        },
        {
            'name': 'Nov',
            'Late': 834,
        },
        {
            'name': 'Dec',
            'Late': 123,
        }
    ]

    const filters = [
        { value: 'Monthly' },
        { value: 'Yearly' },
    ]

    const handleChange = (event) => {
        console.log(event.target.value)
        setTimelineFilter(event.target.value);
    };

    return (
        <ChartContainer>
            <FilterWrapper>
                <ChartTitle>Weekly distrubtion</ChartTitle>
                <Filter filters={filters} label='attendance' id='attendance' val={timelineFilter} handleChange={handleChange} />
            </FilterWrapper>
            <ResponsiveContainer width='100%' >
                <LineChart data={data}
                    margin={{ top: 15, right: 10, left: 10, bottom: 15 }}>
                    <CartesianGrid
                        vertical={false}
                        strokeDasharray='3 3' />
                    <XAxis dataKey='name' tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} width={30} />
                    <Tooltip />
                    <Line type="monotone" dataKey='Late' stroke='#F7AC68' />
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
};

export default LateMinutes;