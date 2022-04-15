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
    border-radius: 1.25rem;
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
                    <defs>
                        <linearGradient
                            id="firstGradient"
                            x1="0"
                            y1="0"
                            x2="0%"
                            y2="100%"
                            spreadMethod="reflect">
                            <stop offset="25%" stopColor="#3CB4FF" />
                            <stop offset="75%" stopColor="#3DA3F0" />
                            <stop offset="125%" stopColor="#5A82F9" />
                        </linearGradient>
                        <linearGradient
                            id="secondGradient"
                            x1="0"
                            y1="0"
                            x2="0%"
                            y2="100%"
                            spreadMethod="reflect">
                            <stop offset="25%" stopColor="#F7AC68" />
                            <stop offset="75%" stopColor="#FFA338" />
                            <stop offset="125%" stopColor="#ED8103" />
                        </linearGradient>
                        <linearGradient
                            id="thirdGradient"
                            x1="0"
                            y1="0"
                            x2="0%"
                            y2="100%"
                            spreadMethod="reflect">
                            <stop offset="25%" stopColor="#FC6E98" />
                            <stop offset="125%" stopColor="#F65786" />
                            <stop offset="125%" stopColor="#FC2D6A" />
                        </linearGradient>
                    </defs>
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
                    <Tooltip cursor={{ fill: 'rgba(206, 206, 206, 0.2)' }} />
                    <Bar
                        dataKey='Attendance'
                        fill='url(#firstGradient)'
                        radius={[0, 5, 5, 0]} />
                    <Bar dataKey='Late'
                        fill='url(#secondGradient)'
                        radius={[0, 5, 5, 0]} />
                    <Bar
                        dataKey='Abscence'
                        fill='url(#thirdGradient)'
                        radius={[0, 5, 5, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
};

export default Weekly;