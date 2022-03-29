import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import 'react-clock/dist/Clock.css';
import Clock from 'react-clock/dist/umd/Clock';
import '../../Styles/ReactClock.css';

const ChartContainer = styled.div`
    padding: 2em;
    grid-area: cell9;
    background: linear-gradient(165deg, #FFFFFF 70%, #F6F6F6 100%);
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.1);
    border-radius: 1em;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    justify-items: stretch;
    padding: 2em;
`
const Details = styled.div`
    display: flex;
    flex: 1.5;
    height: 100%;
    margin-left: 1.5em;
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

const Arrival = () => {
    const [value, setValue] = useState(new Date(1776, 6, 4, 12, 30, 0, 0));

    useEffect(() => {
        setValue(new Date(1776, 6, 4, 12, 30, 0, 0))
    }, []);

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
                <ChartTitle> Arrival Time </ChartTitle>
                <ChartValue>
                    <h1>8:31</h1>
                    <Unit>am</Unit>
                </ChartValue>
            </Details>
        </ChartContainer>
    );
};

export default Arrival;