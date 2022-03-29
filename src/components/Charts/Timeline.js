import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Filter from '../../components/Charts/Filter';
import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const ChartContainer = styled.div`
    padding: 2em;
    grid-area: cell4;
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
const Timeline = () => {
    const [timelineFilter, setTimelineFilter] = useState('Monthly');
    const [data, setData] = useState([
        {
            'name': 'Jan',
            'Abscence': 4000,
            'Attendance': 2400,
            'amt': 2400
        },
        {
            'name': 'Feb',
            'Abscence': 45,
            'Attendance': 1398,
            'amt': 2210
        },
        {
            'name': 'Mar',
            'Abscence': 2000,
            'Attendance': 9800,
            'amt': 2290
        },
        {
            'name': 'Apr',
            'Abscence': 2780,
            'Attendance': 3908,
            'amt': 2000
        },
        {
            'name': 'May',
            'Abscence': 1890,
            'Attendance': 4800,
            'amt': 2181
        },
        {
            'name': 'Jun',
            'Abscence': 2390,
            'Attendance': 3800,
            'amt': 2500
        },
        {
            'name': 'Jul',
            'Abscence': 3490,
            'Attendance': 4300,
            'amt': 2100
        },
        {
            'name': 'Aug',
            'Abscence': 3490,
            'Attendance': 4300,
            'amt': 2100
        },
        {
            'name': 'Sep',
            'Abscence': 3490,
            'Attendance': 4300,
            'amt': 2100
        },
        {
            'name': 'Oct',
            'Abscence': 3490,
            'Attendance': 4300,
            'amt': 2100
        },
        {
            'name': 'Nov',
            'Abscence': 3490,
            'Attendance': 4300,
            'amt': 2100
        },
        {
            'name': 'Dec',
            'Abscence': 3490,
            'Attendance': 4300,
            'amt': 2100
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
            'name': 'Jan',
            'Abscence': 4000,
            'Attendance': 2400,
            'amt': 2400
        },
        {
            'name': 'Feb',
            'Abscence': 45,
            'Attendance': 1398,
            'amt': 2210
        },
        {
            'name': 'Mar',
            'Abscence': 2000,
            'Attendance': 9800,
            'amt': 2290
        },
        {
            'name': 'Apr',
            'Abscence': 2780,
            'Attendance': 3908,
            'amt': 2000
        },
        {
            'name': 'May',
            'Abscence': 1890,
            'Attendance': 4800,
            'amt': 2181
        },
        {
            'name': 'Jun',
            'Abscence': 2390,
            'Attendance': 3800,
            'amt': 2500
        },
        {
            'name': 'Jul',
            'Abscence': 3490,
            'Attendance': 4300,
            'amt': 2100
        },
        {
            'name': 'Aug',
            'Abscence': 3490,
            'Attendance': 4300,
            'amt': 2100
        },
        {
            'name': 'Sep',
            'Abscence': 3490,
            'Attendance': 4300,
            'amt': 2100
        },
        {
            'name': 'Oct',
            'Abscence': 3490,
            'Attendance': 4300,
            'amt': 2100
        },
        {
            'name': 'Nov',
            'Abscence': 3490,
            'Attendance': 4300,
            'amt': 2100
        },
        {
            'name': 'Dec',
            'Abscence': 3490,
            'Attendance': 4300,
            'amt': 2100
        }
    ]

    const monthlyData = [
        {
            'name': 'Jan',
            'Abscence': 4000,
            'Attendance': 2400,
            'amt': 2400
        },
        {
            'name': 'Feb',
            'Abscence': 3000,
            'Attendance': 1398,
            'amt': 2210
        },
        {
            'name': 'Mar',
            'Abscence': 2000,
            'Attendance': 9800,
            'amt': 2290
        },
        {
            'name': 'Apr',
            'Abscence': 2780,
            'Attendance': 3908,
            'amt': 2000
        },
        {
            'name': 'May',
            'Abscence': 1890,
            'Attendance': 4800,
            'amt': 2181
        },
        {
            'name': 'Jun',
            'Abscence': 2390,
            'Attendance': 3800,
            'amt': 2500
        },
        {
            'name': 'Jul',
            'Abscence': 3490,
            'Attendance': 4300,
            'amt': 2100
        },
        {
            'name': 'Aug',
            'Abscence': 3490,
            'Attendance': 4300,
            'amt': 2100
        },
        {
            'name': 'Sep',
            'Abscence': 3490,
            'Attendance': 4300,
            'amt': 2100
        },
        {
            'name': 'Oct',
            'Abscence': 3490,
            'Attendance': 4300,
            'amt': 2100
        },
        {
            'name': 'Nov',
            'Abscence': 3490,
            'Attendance': 4300,
            'amt': 2100
        },
        {
            'name': 'Dec',
            'Abscence': 3490,
            'Attendance': 4300,
            'amt': 2100
        }
    ]

    const filters = [
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
                <ChartTitle>Timeline</ChartTitle>
                <Filter filters={filters} label='attendance' id='attendance' val={timelineFilter} handleChange={handleChange} />
            </FilterWrapper>
            <ResponsiveContainer width='100%' >
                <LineChart data={data}
                    margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                    <CartesianGrid
                        vertical={false}
                        strokeDasharray='3 3' />
                    <XAxis dataKey='name' tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} width={30} />
                    <Tooltip />
                    <Legend
                        iconSize={12}
                        verticalAlign='top'
                        align='left'
                        wrapperStyle={{ fontSize: '12px', paddingBottom: '20px' }}
                        margin={{ top: 0, left: 0, right: 0, bottom: 10 }} />
                    <Line dataKey='Attendance' stroke='#28B7EB' />
                    <Line dataKey='Abscence' stroke='#F65786' />
                </LineChart>
            </ResponsiveContainer>

        </ChartContainer>
    );
};

export default Timeline;