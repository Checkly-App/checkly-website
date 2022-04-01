import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Filter from '../../components/Charts/Filter';
import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { groupBy } from 'lodash';
import moment from 'moment';

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
const Timeline = (props) => {
    const [timelineFilter, setTimelineFilter] = useState('Monthly');
    const [data, setData] = useState([]);
    const filters = [
        { value: 'Weekly' },
        { value: 'Monthly' },
        { value: 'Yearly' },
    ]

    useEffect(() => {
        if (timelineFilter === 'Weekly')
            calculateTimeline(props.abscenceData, props.attendanceData, 'ww YYYY');
        if (timelineFilter === 'Monthly')
            calculateTimeline(props.abscenceData, props.attendanceData, 'MMM YYYY');
        if (timelineFilter === 'Yearly')
            calculateTimeline(props.abscenceData, props.attendanceData, 'YYYY');

    }, [timelineFilter]);

    const calculateTimeline = (companyAbscences, companyAttendance, formatString) => {
        let abscences = groupBy(companyAbscences, (dt) => moment(dt).format(formatString));
        let attendance = groupBy(companyAttendance, (dt) => moment(dt['date']).format(formatString));

        let keys = Object.keys(attendance);
        let data = [];


        for (let i = 0; i < keys.length; i++) {
            const group = keys[i];
            const object = {
                name: `${group}`,
                Abscence: group in abscences ? abscences[group].length : 0,
                Attendance: group in attendance ? attendance[group].length : 0,
            }
            console.log(object)
            data.push(object);
        }

        setData(data)
    }

    return (
        <ChartContainer>
            <FilterWrapper>
                <ChartTitle>Timeline</ChartTitle>
                <Filter
                    filters={filters}
                    label='attendance'
                    id='attendance'
                    val={timelineFilter}
                    handleChange={(event) => { setTimelineFilter(event.target.value) }} />
            </FilterWrapper>
            <ResponsiveContainer width='100%' height='100%'>
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