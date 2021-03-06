import React from 'react';
import styled from 'styled-components';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Container = styled.div`
    grid-area: ${props => props.cell ? props.cell : 'cell1'};
    background: white;   
    box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
    border-radius: 1.25rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    justify-items: stretch;
    padding: 2em;
`
const ChartWrapper = styled.div`
    max-width: 5em;
    max-height: 5em;
    flex: 1;
`
const Details = styled.div`
    display: flex;
    flex: 1.5;
    height: 100%;
    margin-left: 0.5em;
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
    color: ${props => props.color ? props.color : 'white'};
    font-weight: 400;
    font-size: 1em;
    padding: 0;
    margin: 0;
`

const Total = (props) => {
    const data = {
        labels: props.labels,
        datasets: [
            {
                data: props.data,
                backgroundColor: props.background,
            }
        ]
    }

    const options = {
        cutout: 30,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false,
                display: false,
            },
            animation: {
                animateScale: true,
            },
        }
    }

    return (
        <Container cell={props.cell}>
            <ChartWrapper>
                <Doughnut data={data} options={options} />
            </ChartWrapper>
            <Details>
                <ChartTitle color={props.background[0]}> {props.title} </ChartTitle>
                <ChartValue>
                    <h1>{props.data[0]}</h1>
                    <Unit>days</Unit>
                </ChartValue>
            </Details>
        </Container>
    );
};

export default Total;