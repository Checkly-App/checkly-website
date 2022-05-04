import React from 'react';
import styled from 'styled-components';
import MeetingMockup from '../../assets/images/MeetingsMockUp.png';
import TimesheetMockup from '../../assets/images/TimesheetsMockUp.png';
import AttendanceMockup from '../../assets/images/AttendanceHistoryMockUp.png'

const Section = styled.div`
    display: flex;
    flex-direction: ${props => props.reverse ? 'row-reverse' : 'row'};
    justify-content: center;
    align-items: center;
    margin-top: 1.75em;

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
const Meeting = styled.img`
    margin-right: 2em;
    height: 60vh;
    @media (max-width: 768px) {
        display: none;
    }
`
const Attendance = styled.img`
    margin-right: 2em;
    height: 60vh;
    @media (max-width: 768px) {
        display: none;
    }
`
const Timesheets = styled.img`
    margin: 0 2em;
    height: 50vh;
    @media (max-width: 768px) {
        display: none;
    }
`
const Service = () => {
    return (
        <>
            <Section>
                <Meeting src={MeetingMockup} alt='Meeting Mockup' />
                <Content>
                    <Title> Meetings Management </Title>
                    <Details> Easily schedule meetings, send and receive meeting invitations, track participants attendance and send an automated Minutes of Meeting (MoM) report. </Details>
                </Content>
            </Section>
            <Section reverse>
                <Timesheets src={TimesheetMockup} alt='Timesheets Mockup' />
                <Content >
                    <Title> Automated Timesheets </Title>
                    <Details>Automatically generate attendance sheets, filter them by date range or employee information, and export them.</Details>
                </Content>
            </Section>
            <Section>
                <Attendance src={AttendanceMockup} alt='Attendance History Mockup' />
                <Content>
                    <Title> Attendance History </Title>
                    <Details>Gain insight into your attendance information from your check-in/out times to your overtime hours.  </Details>
                </Content>
            </Section>
        </>
    );
};

export default Service;