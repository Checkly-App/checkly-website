import React from 'react';
import styled from 'styled-components';
import { ReactComponent as MeetingDesign } from '../../assets/images/MeetingsDesign.svg';
import { ReactComponent as TabletFrame } from '../../assets/images/TabletFrameSample.svg';

const Section = styled.div`
    display: flex;
    flex-direction: ${props => props.reverse ? 'row-reverse' : 'row'};
    justify-content: center;
    align-items: center;
    margin-top: 1em;

    @media (max-width: 768px) {
        width: 100vw;
        padding: 1em;
    }
`
const Content = styled.div`
    display: flex;
    flex-direction: column;
    width: 30vw;
    padding-right: 2em;

    @media (max-width: 768px) {
        padding-right: 1em;
        width: 80vw;
    }
`
const Title = styled.h1`
    flex: 1;
    font-weight: bold;
    font-size: 1.5em;
`
const Details = styled.p`
    flex: 3;
    text-align: justify;
`
const Design1 = styled(MeetingDesign)`
    padding-right: 2em;
    height: 50vh;
    width: auto;

    @media (max-width: 768px) {
        display: none;
    }
`
const Design2 = styled(TabletFrame)`
    padding-left: 2em;
    height: 50vh;
    width: auto;
    @media (max-width: 768px) {
        display: none;
    }
`

const Service = () => {
    return (
        <>
            <Section>
                <Design1 />
                <Content>
                    <Title> Meetings </Title>
                    <Details>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet tortor nibh quam condimentum sed. Eget egestas consectetur tempor neque facilisis. </Details>
                </Content>
            </Section>
            <Section reverse>
                <Design2 />
                <Content >
                    <Title> Meetings </Title>
                    <Details>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet tortor nibh quam condimentum sed. Eget egestas consectetur tempor neque facilisis. </Details>
                </Content>
            </Section>
            <Section>
                <Design1 />
                <Content>
                    <Title> Meetings </Title>
                    <Details>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet tortor nibh quam condimentum sed. Eget egestas consectetur tempor neque facilisis. </Details>
                </Content>
            </Section>
        </>
    );
};

export default Service;