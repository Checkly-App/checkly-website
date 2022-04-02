import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Filter from '../../components/Charts/Filter';
import { CartesianGrid, XAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import _, { groupBy } from 'lodash';
import moment from 'moment';

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
const Worked = (props) => {
    const [workedFilter, setWorkedFilter] = useState('Monthly');
    const [data, setData] = useState();
    const filters = [
        { value: 'Daily' },
        { value: 'Weekly' },
        { value: 'Monthly' },
        { value: 'Yearly' },
    ]

    useEffect(() => {
        if (workedFilter === 'Daily')
            calculateWorked(props.attendanceData, 'DD MMM', 'daily');
        if (workedFilter === 'Weekly')
            calculateWorked(props.attendanceData, 'ww YYYY', 'weekly');
        if (workedFilter === 'Monthly')
            calculateWorked(props.attendanceData, 'MMM YYYY', 'monthly');
        if (workedFilter === 'Yearly')
            calculateWorked(props.attendanceData, 'YYYY', 'yearly');

    }, [workedFilter]);

    const calculateWorked = (companyAttendance, formatString, type) => {
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

            const average = getAverageWorkingHours(attendance[group]);

            const object = {
                name: `${group}`,
                'Average Worked': group in attendance ? average : 0,
            }

            data.push(object);
        }

        setData(data)
    }

    const getAverageWorkingHours = (groupData) => {
        const count = groupData.length;
        var totalWorked = 0;

        for (let i = 0; i < groupData.length; i++) {
            const worked = groupData[i]['working-hours'];
            totalWorked += worked;
        }

        const average = totalWorked / count;

        return Math.round(average);
    }


    return (
        <ChartContainer>
            <FilterWrapper>
                <ChartTitle>Worked hours</ChartTitle>
                <Filter
                    filters={filters}
                    label='attendance'
                    id='attendance'
                    val={workedFilter}
                    handleChange={(event) => { setWorkedFilter(event.target.value) }} />
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
                    <Bar dataKey="Average Worked" fill="#B86AD9" />
                </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
};

export default Worked;