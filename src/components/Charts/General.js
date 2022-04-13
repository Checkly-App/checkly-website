import React from 'react';
import styled from 'styled-components';
import { BsPeople, BsCalendar4Event } from 'react-icons/bs';
import { VscTypeHierarchy } from 'react-icons/vsc';

const Container = styled.div`
    grid-area: ${props => props.cell ? props.cell : 'cell0'};
    background: ${props => props.background ? props.background : 'linear-gradient(160deg, #D980FF 70%, #B86AD9 100%)'};
    box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
    border-radius: 1.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    justify-items: stretch;
    padding: 2em;
`;
const Value = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    color: white;
`;
const Number = styled.h6`
    font-weight: bold;
    font-size: 2.5em;
    margin: 0;
`;
const Unit = styled.h6`
    font-weight: 400;
    font-size: 1em;
    margin-left: 0.25em;
`;
const Circle = styled.div`
    width: 3em;
    height: 3em;
    background-color: rgba(255,255,255, 0.3);
    color: white;
    fill: white;
    border-radius: 3em;
    display: flex;
    align-self: start;
    justify-content: center;
    align-items: center;
`;

const General = (props) => {
    return (
        <Container cell={props.cell} background={props.background}>
            <Value>
                <Number>{props.val}</Number>
                <Unit> {props.title}</Unit>
            </Value>
            <Circle>
                {props.cell === 'cell0' ? <BsPeople size={22} /> :
                    props.cell === 'cell01' ? <VscTypeHierarchy size={22} /> :
                        <BsCalendar4Event size={22} />}
            </Circle>
        </Container>
    );
};

export default General;