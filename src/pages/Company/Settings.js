import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Title, Wrapper } from './Dashboard';
import { ref, onValue, set } from 'firebase/database';
import { database, auth } from '../../utilities/firebase';
import ChecklyLogo from '../ChecklyLogo';

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
    font-weight: 350;
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
    const [company, setCompany] = useState([{}]);
    const [settings, setSettings] = useState([{}]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get the company's general information
        const companyListener = onValue(ref(database, `Company/${auth.currentUser.uid}`), (snapshot) => {
            const data = snapshot.val();
            console.log(data)

            const company = [
                { title: 'Name', Name: data['name'] },
                { title: 'Abbreviation', Abbreviation: data['abbreviation'] },
                { title: 'Age', Age: data['age'] },
                { title: 'Email', Email: data['email'] },
                { title: 'Industry', Industry: data['industry'] },
            ];

            setCompany(company);
        });

        const settingsListener = onValue(ref(database, `Settings/${auth.currentUser.uid}`), (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();

                const settings = [
                    { title: 'Check-in', 'Check-in': data['check_in'], active: 'active' },
                    { title: 'Check-out', 'Check-out': data['check_out'], active: 'active' },
                    { title: 'Working Hours', 'Working Hours': data['working_hours'] },
                ];
                console.log(settings);
                setSettings(settings);
                setLoading(false);
            }
            else {
                set(ref(database, `Settings/${auth.currentUser.uid}`), {
                    check_in: '8:00',
                    check_out: '16:00',
                    working_hours: '8'
                });

                setLoading(false);
            }


        });

        return () => {
            companyListener();
            settingsListener();
        }

    }, []);

    return (
        loading ? <ChecklyLogo /> :
            <Wrapper>
                <Header>
                    <Title>Settings</Title>
                    <SaveButton>Save</SaveButton>
                </Header>
                <SectionWrapper>
                    <SectionTitle>Company Information</SectionTitle>
                    {company.map((info, key) => (
                        <Section id={key}>
                            <Detail>{info.title}</Detail>
                            <Info> {info[info.title]}</Info>
                        </Section>
                    ))}

                </SectionWrapper>

                <SectionWrapper>
                    <SectionTitle>Attendance Settings</SectionTitle>
                    <Subtitle>Changing the following settings will result in updating the dashboard’s calculations and employees attendance marking protocols.
                        Work hours are calculated by the system.</Subtitle>
                    {settings.map((info, key) => (
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