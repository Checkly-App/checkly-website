import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Filter from '../../components/Charts/Filter';
import { CartesianGrid, XAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const ChartTitle = styled.h1`
    font-size: 1em;
    font-weight: 500;
`
const ChartContainer = styled.div`
    padding: 2em 1em 1em 1em;
    grid-area: cell7;
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
const Worked = () => {
    const [timelineFilter, setTimelineFilter] = useState('Monthly');
    const [data, setData] = useState([
        {
            name: 'Jan',
            uv: 400,
            pv: 240,
            amt: 240,
        },
        {
            name: 'Feb',
            uv: 300,
            pv: 138,
            amt: 220,
        },
        {
            name: 'Mar',
            uv: 200,
            pv: 480,
            amt: 220,
        },
        {
            name: 'Apr',
            uv: 270,
            pv: 398,
            amt: 200,
        },
        {
            name: 'May',
            uv: 180,
            pv: 400,
            amt: 211,
        },
        {
            name: 'Jun',
            uv: 230,
            pv: 380,
            amt: 250,
        }
    ]);

    useEffect(() => {
        if (timelineFilter === 'Weekly')
            setData(weeklyData)
        if (timelineFilter === 'Monthly')
            setData(monthlyData)
    }, [timelineFilter]);

    const weeklyData = [
        {
            name: 'Jan',
            uv: 400,
            pv: 240,
            amt: 240,
        },
        {
            name: 'Feb',
            uv: 300,
            pv: 138,
            amt: 220,
        },
        {
            name: 'Mar',
            uv: 200,
            pv: 480,
            amt: 220,
        },
        {
            name: 'Apr',
            uv: 270,
            pv: 398,
            amt: 200,
        },
        {
            name: 'May',
            uv: 180,
            pv: 400,
            amt: 211,
        },
        {
            name: 'Jun',
            uv: 230,
            pv: 380,
            amt: 250,
        }
    ];


    const monthlyData = [
        {
            name: 'Jan',
            uv: 400,
            pv: 240,
            amt: 240,
        },
        {
            name: 'Feb',
            uv: 300,
            pv: 138,
            amt: 220,
        },
        {
            name: 'Mar',
            uv: 200,
            pv: 480,
            amt: 220,
        },
        {
            name: 'Apr',
            uv: 270,
            pv: 398,
            amt: 200,
        },
        {
            name: 'May',
            uv: 180,
            pv: 400,
            amt: 211,
        },
        {
            name: 'Jun',
            uv: 230,
            pv: 380,
            amt: 250,
        }
    ];


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
                <ChartTitle>Worked hours</ChartTitle>
                <Filter filters={filters} label='attendance' id='attendance' val={timelineFilter} handleChange={handleChange} />
            </FilterWrapper>
            <ResponsiveContainer width="100%" height="90%">
                <BarChart
                    barSize={15}
                    margin={{ top: 15, right: 5, left: 5, bottom: 0 }} data={data}>
                    <CartesianGrid
                        vertical={false}
                        strokeDasharray="3 3" />
                    <XAxis
                        tick={{ fontSize: 10 }}
                        dataKey='name'
                    />
                    <Tooltip />
                    <Bar dataKey="pv" fill="#B86AD9" />
                </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
};

export default Worked;