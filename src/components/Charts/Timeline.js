import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Filter from '../../components/Charts/Filter';
import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { groupBy } from 'lodash';
import moment from 'moment';

const ChartContainer = styled.div`
    padding: 2em;
    grid-area: cell4;
    background: white;   
    box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
    border-radius: 1.25rem;
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
    const [data, setData] = useState();
    const filters = [
        { value: 'Daily' },
        { value: 'Weekly' },
        { value: 'Monthly' },
        { value: 'Yearly' },
    ]

    useEffect(() => {
        function calculateTimeline(companyAbscences, companyAttendance, formatString, type) {
            let abscences = groupBy(companyAbscences, (dt) => moment(dt).format(formatString));
            let attendance = groupBy(companyAttendance, (dt) => moment(dt['date']).format(formatString));

            let keysAttendance = Object.keys(attendance);
            let keysAbscence = Object.keys(abscences);

            let data = [];

            let keys = keysAttendance.concat(keysAbscence);
            keys = keys.filter((item, index) => {
                return (keys.indexOf(item) === index)
            });

            keys.sort((a, b) => {
                var start = new Date(a),
                    end = new Date(b);

                if (start !== end) {
                    if (start > end) { return 1; }
                    if (start < end) { return -1; }
                }
                return start - end;
            });

            if (type === 'daily' && keys.length > 7)
                keys = keys.slice(-7)
            if (type === 'monthly' && keys.length > 12)
                keys = keys.slice(-12)
            if (type === 'weekly' && keys.length > 8)
                keys = keys.slice(-8)
            if (type === 'yearly' && keys.length > 5)
                keys = keys.slice(-5)

            for (let i = 0; i < keys.length; i++) {
                const group = keys[i];
                const object = {
                    name: `${group}`,
                    Abscence: group in abscences ? abscences[group].length : 0,
                    Attendance: group in attendance ? attendance[group].length : 0,
                }

                data.push(object);
            }

            setData(data)
        }

        if (timelineFilter === 'Daily')
            calculateTimeline(props.abscenceData, props.attendanceData, 'DD MMM', 'daily');
        if (timelineFilter === 'Weekly')
            calculateTimeline(props.abscenceData, props.attendanceData, 'ww YYYY', 'weekly');
        if (timelineFilter === 'Monthly')
            calculateTimeline(props.abscenceData, props.attendanceData, 'MMM YYYY', 'monthly');
        if (timelineFilter === 'Yearly')
            calculateTimeline(props.abscenceData, props.attendanceData, 'YYYY', 'yearly');

    }, [timelineFilter, props.abscenceData, props.attendanceData]);



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
                    <Tooltip cursor={{ fill: 'rgba(206, 206, 206, 0.2)' }} />
                    <Legend
                        iconSize={12}
                        verticalAlign='top'
                        align='left'
                        wrapperStyle={{ fontSize: '12px', paddingBottom: '20px' }}
                        margin={{ top: 0, left: 0, right: 0, bottom: 10 }} />
                    <Line
                        dataKey='Attendance'
                        stroke='#28B7EB'
                        strokeWidth={2} />
                    <Line
                        dataKey='Abscence'
                        stroke='#F65786'
                        strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>

        </ChartContainer>
    );
};

export default Timeline;