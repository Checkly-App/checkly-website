import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import 'react-clock/dist/Clock.css';
import Clock from 'react-clock/dist/umd/Clock';
import '../../Styles/ReactClock.css';
import moment from 'moment';

const ChartContainer = styled.div`
    padding: 1.5em;
    grid-area: cell9;
    background: white;   
    box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
    border-radius: 1.25rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    justify-items: center;
`
const Details = styled.div`
    display: flex;
    height: 100%;
    margin-left: 1.25em;
    flex-direction: column;
    justify-content: flex-end;
`
const ChartValue = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
`
const Unit = styled.h6`
    font-weight: 400;
    font-size: 0.75em;
`
const ChartTitle = styled.h1`
    color: 'black';
    font-size: 1em;
    font-weight: 500;
    padding: 0;
    margin: 0;
`

const Arrival = (props) => {
    const [value, setValue] = useState(new Date(1776, 6, 4, 12, 30, 0, 0));
    const [hour, setHour] = useState(8);
    const [minute, setMinute] = useState(0);
    const [abbreviation, setAbbreviation] = useState('am');

    useEffect(() => {
        const data = props.attendanceData;
        const count = data.length;

        let hours = 0;
        let minutes = 0;

        for (let i = 0; i < count; i++) {
            const time = data[i]['check-in'];

            hours += (time.getHours() * 3600);
            minutes += (time.getMinutes() * 60);
        }

        let totalSeconds = (hours + minutes) / count;

        const avgHours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let avgMinutes = Math.floor(totalSeconds / 60);

        avgMinutes = avgMinutes.toString().length === 1 ? avgMinutes * 10 : avgMinutes;

        const date = new Date(1776, 6, 4, avgHours ? avgHours : 8, avgMinutes ? avgMinutes : 0);

        if (data.length <= 0) {
            setHour(8);
            setMinute('00');
            setAbbreviation("am");
            setValue(new Date(1776, 6, 4, 8, 0, 0, 0));
        }
        else {
            setHour(avgHours);
            setMinute(avgMinutes);
            setAbbreviation(moment(date).format("a"));
            setValue(date);
        }

    }, [props.attendanceData]);


    return (
        <ChartContainer>
            <Clock
                hourHandWidth={2}
                hourMarksWidth={1}
                hourMarksLength={12}
                hourHandLength={50}
                minuteHandWidth={2}
                minuteMarksLength={4}
                minuteHandLength={60}
                secondHandLength={70}
                size={100}
                value={value} />
            <Details>
                <ChartTitle> Arrival time </ChartTitle>
                <ChartValue>
                    <h1>{hour}:{minute}</h1>
                    <Unit>{abbreviation}</Unit>
                </ChartValue>
            </Details>
        </ChartContainer>
    );
};

export default Arrival;