import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Filter from '../../components/Charts/Filter';
import { CartesianGrid, XAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { groupBy } from 'lodash';
import moment from 'moment';

const ChartTitle = styled.h1`
    font-size: 1em;
    font-weight: 500;
`
const ChartContainer = styled.div`
    padding: 2em 1em 1em 1em;
    grid-area: cell6;
    background: white;   
    box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
    border-radius: 1.5rem;
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
const CheckIn = (props) => {
    const [checkInFilter, setCheckInFilter] = useState('Monthly');
    const [data, setData] = useState();
    const filters = [
        { value: 'Daily' },
        { value: 'Weekly' },
        { value: 'Monthly' },
        { value: 'Yearly' },
    ]

    useEffect(() => {
        function calculateCheckIn(companyAttendance, formatString, type) {
            let attendance = groupBy(companyAttendance, (dt) => moment(dt['date']).format(formatString));

            let keys = Object.keys(attendance);
            let data = [];

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
            if (type === 'monthly' && keys.length > 6)
                keys = keys.slice(-6)
            if (type === 'weekly' && keys.length > 8)
                keys = keys.slice(-8)
            if (type === 'yearly' && keys.length > 5)
                keys = keys.slice(-5)

            for (let i = 0; i < keys.length; i++) {
                const group = keys[i];

                const average = getAverageDates(attendance[group]);

                const object = {
                    name: `${group}`,
                    'Average Check-in': group in attendance ? average : 0,
                }

                data.push(object);
            }

            setData(data)
        }

        function getAverageDates(groupData) {
            var count = groupData.length;
            var hours = 0;
            var minutes = 0;

            for (let i = 0; i < groupData.length; i++) {
                const time = groupData[i]['check-in'];
                hours += (time.getHours() * 3600);
                minutes += (time.getMinutes() * 60);
            }

            var totalSeconds = (hours + minutes) / count;

            let avgHours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let avgMinutes = Math.floor(totalSeconds / 60);

            return avgHours + (avgMinutes / 100);

        }

        if (checkInFilter === 'Daily')
            calculateCheckIn(props.attendanceData, 'DD MMM', 'daily');
        if (checkInFilter === 'Weekly')
            calculateCheckIn(props.attendanceData, 'ww YYYY', 'weekly');
        if (checkInFilter === 'Monthly')
            calculateCheckIn(props.attendanceData, 'MMM YYYY', 'monthly');
        if (checkInFilter === 'Yearly')
            calculateCheckIn(props.attendanceData, 'YYYY', 'yearly');

    }, [checkInFilter, props.attendanceData]);

    return (
        <ChartContainer>
            <FilterWrapper>
                <ChartTitle>Check-in hours</ChartTitle>
                <Filter
                    filters={filters}
                    label='check-in'
                    id='check-in'
                    val={checkInFilter}
                    handleChange={(event) => { setCheckInFilter(event.target.value) }} />
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
                        dataKey='name' />
                    <Tooltip />
                    <Bar dataKey="Average Check-in" fill="#3DD2BB" />
                </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
};

export default CheckIn;