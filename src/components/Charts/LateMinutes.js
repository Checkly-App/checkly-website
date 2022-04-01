import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Filter from '../../components/Charts/Filter';
import { CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

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
    const monthlyData = [
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

    const weeklyData = [
        {
            'name': 'Jan 1',
            'Late': 83
        },
        {
            'name': 'Jan 7',
            'Late': 28
        },
        {
            'name': 'Jan 14',
            'Late': 49
        },
        {
            'name': 'Jan 21',
            'Late': 20
        },
        {
            'name': 'Jan 28',
            'Late': 21
        },
    ]

    const [data, setData] = useState(monthlyData);

    useEffect(() => {
        if (timelineFilter === 'Weekly')
            setData(weeklyData)
        if (timelineFilter === 'Monthly')
            setData(monthlyData)
    }, [timelineFilter]);

    const filters = [
        { value: 'Daily' },
        { value: 'Weekly' },
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
                <ChartTitle>Late minutes</ChartTitle>
                <Filter filters={filters} label='attendance' id='attendance' val={timelineFilter} handleChange={handleChange} />
            </FilterWrapper>
            <ResponsiveContainer width='100%' height='100%'>
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