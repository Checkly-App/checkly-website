import React from 'react';
import styled from 'styled-components';
import { Title, Wrapper } from './Dashboard';

const Header = styled.div`
    margin: 2em 2em 0 2em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2em;
`
const SaveButton = styled.button`
    background-color: rgba(60,180,255,0.25);
    color: #3CB4FF;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    padding: 0.6em 1.5em;
    border-radius: 0.75em;
    font-weight: 600;
`
const Section = styled.div`
    background-color: white;
    border-radius: 0;
    padding: 1em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1em;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;

    &:first-of-type{
        border-radius: 0.5em 0.5em 0 0;
    }

    &:last-of-type{
        border-radius: 0 0 0.5em 0.5em;
    }
   
    @media (max-width: 768px) {
    }
`
const Detail = styled.p`
    padding: 0;
    margin: 0;
    color: ${props => props.active ? '#000' : '#A3A3A1'};
    font-weight: ${props => props.active ? '500' : '400'};;
    font-size: 1.05em;
`
const Info = styled.p`
    padding: 0;
    margin: 0;
    color: #A3A3A1;
    font-weight: normal;
`
const SectionTitle = styled.h1`
    font-size: 1.05em;
    font-weight: 450;
    margin-top: 0.75em;

    @media (max-width: 768px) {

    }
`
const SectionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 2em;
    color: #35435E;
    padding-bottom: 1em;


     @media (max-width: 768px) {

     }
`


const Subtitle = styled.h1`
    width: 85%;
    font-size: 0.9em;
    font-weight: 400;
    color: #A3A3A1;
`

const Settings = () => {
    const arr = [{ title: 'Name', Name: 'Acme Corporations' }, { title: 'Age', Age: '+10years' }];
    const att = [{ title: 'Name', Name: 'Acme Corporations', active: 'active' }, { title: 'Age', Age: '+10years' }];


    return (
        <Wrapper>
            <Header>
                <Title>Settings</Title>
                <SaveButton>Save</SaveButton>
            </Header>
            <SectionWrapper>
                <SectionTitle>Company Information</SectionTitle>
                {arr.map((info, key) => (
                    <Section id={key}>
                        <Detail>{info.title}</Detail>
                        <Info> {info[info.title]}</Info>
                    </Section>
                ))}

            </SectionWrapper>

            <SectionWrapper>
                <SectionTitle>Attendance Statistic</SectionTitle>
                <Subtitle>Changing the following settings will result in updating the dashboard’s calculations and employees attendance marking protocols.
                    Work hours are calculated by the system.</Subtitle>
                {att.map((info, key) => (
                    <Section id={key}>
                        {info.active === 'active' ? <Detail active>{info.title}</Detail> : <Detail >{info.title}</Detail>}
                        <Info> {info[info.title]}</Info>
                    </Section>
                ))}

            </SectionWrapper>

        </Wrapper>
    );
};

export default Settings;