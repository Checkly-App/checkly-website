import React, { useState } from 'react';
import styled from 'styled-components';
import Filter from '../../components/Charts/Filter';
import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const ChartTitle = styled.h1`
    font-size: 1em;
    font-weight: 500;
`
const ChartContainer = styled.div`
    padding: 2em 1em 1em 1em;
    grid-area: cell6;
    background: linear-gradient(165deg, #FFFFFF 70%, #F6F6F6 100%);
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.1);
    border-radius: 1em;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
const FilterWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
const CheckIn = () => {
    const [timelineFilter, setTimelineFilter] = useState('Monthly');
    const data = [
        {
            name: 'Jan',
            pv: 90,
        },
        {
            name: 'Feb',
            pv: 138,
        },
        {
            name: 'Mar',
            pv: 80,
        },
        {
            name: 'Apr',
            pv: 38,
        },
        {
            name: 'May',
            pv: 40,
        },
        {
            name: 'Jun',
            pv: 38,
        }
    ];


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
                <ChartTitle>Overtime Hours</ChartTitle>
                <Filter filters={filters} label='attendance' id='attendance' val={timelineFilter} handleChange={handleChange} />
            </FilterWrapper>
            <ResponsiveContainer width="100%" height="90%">
                <BarChart
                    barSize={15}
                    margin={{ top: 15, right: 5, left: 5, bottom: 0 }}
                    data={data}>
                    <CartesianGrid
                        vertical={false}
                        strokeDasharray="3 3" />
                    <XAxis
                        tick={{ fontSize: 10 }}
                        dataKey='name'
                    />
                    <Tooltip />
                    <Bar dataKey="pv" fill="#3DD2BB" />
                </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
};

export default CheckIn;