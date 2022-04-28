import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Title, Wrapper } from './Dashboard';
import { ref, onValue, set } from 'firebase/database';
import { database, auth } from '../../utilities/firebase';
import ChecklyLogo from '../ChecklyLogo';
import FormModal from '../../components/Forms/FormModal';
import { format } from 'date-fns';
import moment from 'moment';
import { v4 } from 'uuid';

const Container = styled(Wrapper)`
    margin: 1em 5em;
`
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
    font-weight: 500;
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
    cursor:  ${props => props.active ? 'pointer' : 'auto'};;

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

    const [openCheckIn, setOpenCheckIn] = useState(false);
    const [openCheckOut, setOpenCheckOut] = useState(false);

    const [checkIn, setCheckIn] = useState(new Date());
    const [checkOut, setCheckOut] = useState(new Date());

    useEffect(() => {
        // Get the company's general information
        const companyListener = onValue(ref(database, `Company/${auth.currentUser.uid}`), (snapshot) => {
            const data = snapshot.val();

            const company = [
                { title: 'Name', Name: data['name'], id: v4() },
                { title: 'Abbreviation', Abbreviation: data['abbreviation'], id: v4() },
                { title: 'Age', Age: data['age'], id: v4() },
                { title: 'Email', Email: data['email'], id: v4() },
                { title: 'Industry', Industry: data['industry'], id: v4() },
            ];

            setCompany(company);
        });

        const settingsListener = onValue(ref(database, `Settings/${auth.currentUser.uid}`), (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();

                const check_in = new Date(`1899-12-31T${data['check_in']}`);
                const check_out = new Date(`1899-12-31T${data['check_out']}`);

                const settings = [
                    { title: 'Check-in', 'Check-in': format(check_in, 'hh:mm a'), active: 'active' },
                    { title: 'Check-out', 'Check-out': format(check_out, 'hh:mm a'), active: 'active' },
                    { title: 'Working Hours', 'Working Hours': data['working_hours'] },
                ];

                setCheckIn(check_in);
                setCheckOut(check_out);
                setSettings(settings);
                setLoading(false);
            }
            else {
                set(ref(database, `Settings/${auth.currentUser.uid}`), {
                    check_in: '08:00',
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

    const updateCheckIn = (time) => {
        setCheckIn(time)

        const workingHours = moment(checkOut).diff(moment(time), 'minutes');
        const hours = Math.floor(workingHours / 60);

        const update = [
            { title: 'Check-in', 'Check-in': format(time, 'hh:mm a'), active: 'active' },
            { title: 'Check-out', 'Check-out': settings[1]['Check-out'], active: 'active' },
            { title: 'Working Hours', 'Working Hours': hours },
        ];

        setSettings(update)
    }

    const updateCheckOut = (time) => {
        setCheckOut(time)

        const workingHours = moment(time).diff(moment(checkIn), 'minutes');
        const hours = Math.floor(workingHours / 60);

        const update = [
            { title: 'Check-in', 'Check-in': settings[0]['Check-in'], active: 'active' },
            { title: 'Check-out', 'Check-out': format(time, 'hh:mm a'), active: 'active' },
            { title: 'Working Hours', 'Working Hours': hours },
        ];

        setSettings(update)
        console.log(checkOut)

    }

    const save = () => {
        set(ref(database, `Settings/${auth.currentUser.uid}`), {
            check_in: `${format(checkIn, 'HH:mm')}`,
            check_out: `${format(checkOut, 'HH:mm')}`,
            working_hours: `${settings[2]['Working Hours']}`
        });
    }

    return (
        loading ? <ChecklyLogo /> :
            <Container>
                <Header>
                    <Title>Settings</Title>
                    <SaveButton onClick={save}>Save</SaveButton>
                </Header>
                <SectionWrapper>
                    <SectionTitle>Company Information</SectionTitle>
                    {company.map((info) => (
                        <Section key={info.id}>
                            <Detail>{info.title}</Detail>
                            <Info> {info[info.title]}</Info>
                        </Section>
                    ))}
                </SectionWrapper>
                <SectionWrapper>
                    <SectionTitle>Attendance Settings</SectionTitle>
                    <Subtitle>Changing the following settings will result in updating the dashboard’s calculations and employees attendance marking protocols.
                        Work hours are calculated by the system.</Subtitle>
                    <Section active id={v4()} onClick={() => setOpenCheckIn(true)}>
                        <Detail active>Check-in</Detail>
                        <Info> {settings[0]['Check-in']}</Info>
                    </Section>
                    <Section active id={v4()} onClick={() => setOpenCheckOut(true)}>
                        <Detail active>Check-out</Detail>
                        <Info> {settings[1]['Check-out']}</Info>
                    </Section>
                    <Section id={v4()}>
                        <Detail>Working Hours</Detail>
                        <Info> {settings[2]['Working Hours']}h</Info>
                    </Section>
                </SectionWrapper>
                <FormModal
                    title='Check-in time'
                    open={openCheckIn}
                    value={checkIn}
                    updateOpen={setOpenCheckIn}
                    updateTime={updateCheckIn}
                    max={new Date(0, 0, 0, checkOut.getHours() - 1)} />
                <FormModal
                    title='Check-out time'
                    open={openCheckOut}
                    value={checkOut}
                    updateOpen={setOpenCheckOut}
                    updateTime={updateCheckOut}
                    min={new Date(0, 0, 0, checkIn.getHours() + 1)} />
            </Container>
    );
};

export default Settings;