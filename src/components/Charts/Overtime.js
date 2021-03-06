import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Filter from '../../components/Charts/Filter';
import { XAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { groupBy } from 'lodash';
import moment from 'moment';
import { NoRecords } from './Timeline';

const ChartTitle = styled.h1`
    font-size: 1em;
    font-weight: 500;
`
const ChartContainer = styled.div`
    padding: 2em 1em 1em 1em;
    grid-area: cell5;
    background: white;   
    box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
    border-radius: 1.25rem;
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
const Overtime = (props) => {
    const [overTimeFilter, setOvertimeFilter] = useState('Monthly');
    const [data, setData] = useState();
    const filters = [
        { value: 'Daily' },
        { value: 'Weekly' },
        { value: 'Monthly' },
        { value: 'Yearly' },
    ]

    useEffect(() => {
        function calculateOverTime(companyAttendance, formatString, type) {
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

                const average = getAverageOvertimeHours(attendance[group]);

                const object = {
                    name: `${group}`,
                    'Average Overtime': group in attendance ? average : 0,
                }

                data.push(object);
            }

            setData(data)
        }

        if (overTimeFilter === 'Daily')
            calculateOverTime(props.attendanceData, 'DD MMM', 'daily');
        if (overTimeFilter === 'Weekly')
            calculateOverTime(props.attendanceData, 'ww YYYY', 'weekly');
        if (overTimeFilter === 'Monthly')
            calculateOverTime(props.attendanceData, 'MMM YYYY', 'monthly');
        if (overTimeFilter === 'Yearly')
            calculateOverTime(props.attendanceData, 'YYYY', 'yearly');
    }, [overTimeFilter, props.attendanceData]);

    const getAverageOvertimeHours = (groupData) => {
        const count = groupData.length;
        var totalOvertime = 0;

        for (let i = 0; i < groupData.length; i++) {
            const overtime = groupData[i]['overtime'];
            totalOvertime += overtime;
        }

        const average = totalOvertime / count;

        return Math.round(average);
    }

    return (
        <ChartContainer>
            <FilterWrapper>
                <ChartTitle>Overtime hours</ChartTitle>
                <Filter
                    filters={filters}
                    label='overtime'
                    id='overtime'
                    val={overTimeFilter}
                    handleChange={(event) => { setOvertimeFilter(event.target.value) }} />
            </FilterWrapper>
            {props.attendanceData.length === 0 ?
                <NoRecords> No records </NoRecords> :
                <ResponsiveContainer width="100%" height="90%">
                    <BarChart
                        barSize={20}
                        margin={{ top: 15, right: 5, left: 5, bottom: 0 }}
                        data={data}>
                        <defs>
                            <linearGradient
                                id="overTime"
                                x1="0"
                                y1="0"
                                x2="0%"
                                y2="100%"
                                spreadMethod="reflect">
                                <stop offset="25%" stopColor="#3CB4FF" />
                                <stop offset="75%" stopColor="#3DA3F0" />
                                <stop offset="125%" stopColor="#5A82F9" />
                            </linearGradient>
                        </defs>
                        <XAxis
                            tick={{ fontSize: 10 }}
                            dataKey='name' />
                        <Tooltip cursor={{ fill: 'rgba(206, 206, 206, 0.2)' }} />
                        <Bar
                            dataKey="Average Overtime"
                            fill="url(#overTime)"
                            radius={[5, 5, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            }
        </ChartContainer>
    );
};

export default Overtime;