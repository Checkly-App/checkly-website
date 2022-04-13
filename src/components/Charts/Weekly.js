import React from 'react';
import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import styled from 'styled-components';

const ChartTitle = styled.h1`
    font-size: 1em;
    font-weight: 500;
`
const ChartContainer = styled.div`
    padding: 2em;
    grid-area: cell3;
    background: white;   
    box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
    border-radius: 1.5rem;
`
const Weekly = (props) => {
    return (
        <ChartContainer>
            <ChartTitle>Weekly distrubtion</ChartTitle>
            <ResponsiveContainer width='100%' height='100%' >
                <BarChart
                    margin={{ top: 5, right: 0, bottom: 5, left: 0 }}
                    barSize={10}
                    barCategoryGap='15%'
                    barGap={2}
                    layout='vertical'
                    data={props.data}>
                    <CartesianGrid
                        horizontal={false}
                        strokeDasharray='3 3' />
                    <Legend
                        iconSize={10}
                        verticalAlign='top'
                        wrapperStyle={{ fontSize: '10px', paddingBottom: '10px' }}
                        margin={{ top: 5, left: 0, right: 0, bottom: 15 }} />
                    <XAxis
                        tick={{ fontSize: 12 }}
                        type='number' />
                    <YAxis
                        tick={{ fontSize: 12 }}
                        width={30}
                        dataKey='name'
                        type='category'
                        angle={330} />
                    <Tooltip wrapperStyle={{ borderRadius: '10px' }} />
                    <Bar dataKey='Attendance' fill='#28B7EB' />
                    <Bar dataKey='Late' fill='#F7AC68' />
                    <Bar dataKey='Abscence' fill='#F65786' />
                </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
};

export default Weekly;