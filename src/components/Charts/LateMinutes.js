import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Filter from '../../components/Charts/Filter';
import { CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { groupBy } from 'lodash';
import moment from 'moment';
import { NoRecords } from './Timeline';

const ChartContainer = styled.div`
    padding: 2em;
    grid-area: cell8;
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
const LateMinutes = (props) => {
    const [lateMinutesFilter, setLateMinutesFilter] = useState('Monthly');
    const [data, setData] = useState();

    const filters = [
        { value: 'Daily' },
        { value: 'Weekly' },
        { value: 'Monthly' },
        { value: 'Yearly' },
    ]

    useEffect(() => {
        function calculateLateMinutes(companyLateAttendance, formatString, type) {
            let late = groupBy(companyLateAttendance, (dt) => moment(dt['date']).format(formatString));

            let keys = Object.keys(late);
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
            if (type === 'monthly' && keys.length > 12)
                keys = keys.slice(-12)
            if (type === 'weekly' && keys.length > 8)
                keys = keys.slice(-8)
            if (type === 'yearly' && keys.length > 5)
                keys = keys.slice(-5)

            for (let i = 0; i < keys.length; i++) {
                const group = keys[i];

                const average = getAverageLateMinutes(late[group]);

                const object = {
                    name: `${group}`,
                    'Average Late Minutes': group in late ? average : 0,
                }

                data.push(object);
            }

            setData(data)
        }

        function getAverageLateMinutes(groupData) {
            const count = groupData.length;
            const checkIn = moment(props.checkInRefrence);
            var totalLateMinutes = 0;


            for (let i = 0; i < groupData.length; i++) {
                const actualCheckIn = moment(groupData[i]['check-in']);
                const lateMinutes = actualCheckIn.diff(checkIn, 'minutes');
                totalLateMinutes += (lateMinutes >= 0 ? lateMinutes : 0);
            }

            const average = totalLateMinutes / count;

            return Math.round(average);
        }

        if (lateMinutesFilter === 'Daily')
            calculateLateMinutes(props.lateData, 'DD MMM', 'daily');
        if (lateMinutesFilter === 'Weekly')
            calculateLateMinutes(props.lateData, 'ww YYYY', 'weekly');
        if (lateMinutesFilter === 'Monthly')
            calculateLateMinutes(props.lateData, 'MMM YYYY', 'monthly');
        if (lateMinutesFilter === 'Yearly')
            calculateLateMinutes(props.lateData, 'YYYY', 'yearly');
    }, [lateMinutesFilter, props.lateData, props.checkInRefrence]);



    return (
        <ChartContainer>
            <FilterWrapper>
                <ChartTitle>Late minutes</ChartTitle>
                <Filter
                    filters={filters}
                    label='late-minutes'
                    id='late-minutes'
                    val={lateMinutesFilter}
                    handleChange={(event) => { setLateMinutesFilter(event.target.value) }} />
            </FilterWrapper>
            {props.lateData.length === 0 ?
                <NoRecords> No records </NoRecords>
                :
                <ResponsiveContainer width='100%' height='100%'>
                    <AreaChart
                        data={data}
                        margin={{ top: 15, right: 5, left: 15, bottom: 5 }}>
                        <defs>
                            <linearGradient
                                id="linearGradient"
                                x1="0"
                                y1="0"
                                x2="0%"
                                y2="100%"
                                spreadMethod="reflect">
                                <stop offset="25%" stopColor="#F7AC68" />
                                <stop offset="100%" stopColor="#F7AC6800" opacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            vertical={false}
                            strokeDasharray='3 3' />
                        <XAxis dataKey='name' tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} width={20} />
                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey='Average Late Minutes'
                            stroke='#F7AC68'
                            fill='#F7AC6865'
                            strokeWidth={2} />
                    </AreaChart>
                </ResponsiveContainer>
            }
        </ChartContainer>
    );
};

export default LateMinutes;