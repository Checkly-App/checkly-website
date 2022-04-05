import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CheckIn from '../../components/Charts/CheckIn';
import Overtime from '../../components/Charts/Overtime';
import Timeline from '../../components/Charts/Timeline';
import Total from '../../components/Charts/Total';
import Weekly from '../../components/Charts/Weekly';
import Worked from '../../components/Charts/Worked';
import LateMinutes from '../../components/Charts/LateMinutes';
import Arrival from '../../components/Charts/Arrival';
import Departure from '../../components/Charts/Departure';
import ChecklyLogo from '../ChecklyLogo';
import { groupBy } from 'lodash';
import moment from 'moment';
import { ref, onValue, get } from 'firebase/database';
import { database, auth } from '../../utilities/firebase';

export const Construction = styled.div`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    margin: 1em 4em;
    @media (max-width: 768px) {
            margin: 0;
            padding: 0;
    }
`
const Title = styled.h1`
    font-size: 2em;
    font-weight: 500;
    color: #2CB1EF;
    margin: 2em 0 0.25em 4rem;
`
const Subtitle = styled.h1`
    font-size: 1em;
    font-weight: 300;
    margin: 0 0 0 4rem;
`
const Container = styled.div`
    overflow-y: hidden;
    overflow-x: hidden;
    min-height: 100vh;
    padding: 3em 3rem;
    grid-template-columns: 30% 30% 30%;
    grid-template-rows: 10em 20em 20em 10em 10em;
    display: grid;
    grid-template-areas:'cell1 cell2 cell3' 
                        'cell4 cell4 cell3' 
                        'cell5 cell6 cell7' 
                        'cell8 cell8 cell9'
                        'cell8 cell8 cell10';
    grid-gap: 2em;
    justify-content: center;
    @media (max-width: 768px) {
            padding: 1rem;
            grid-gap: 1em;
            grid-template-columns: 100%; 
            grid-template-rows: repeat(2, 5%) 15% repeat(5, 10%) repeat(2, 5%);
            grid-template-areas:'cell1' 'cell2' 'cell3' 
                                'cell4' 'cell5' 'cell6' 
                                'cell7' 'cell8' 'cell9' 
                                'cell10';
    }
`

const Analytics = () => {
    const today = format(new Date(), 'MMMM dd, yyyy');
    const [company, setCompany] = useState({});
    const [data, setData] = useState([[]]);
    const [attendance, setAttendance] = useState(0);
    const [abscence, setAbscence] = useState(0);
    const [companyAbscences, setCompanyAbscences] = useState([]);
    const [companyAttendance, setcompanyAttendance] = useState([]);
    const [companyLate, setcompanyLate] = useState();
    const [refrenceHours, setRefrenceHours] = useState(6); // TODO
    const [refrenceCheckIn, setRefrenceCheckIn] = useState(new Date(1776, 6, 4, 8, 30, 0, 0));// TODO
    const [weeklyData, setWeeklyData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        get(ref(database, `Company/${auth.currentUser.uid}`)).then((snapshot) => {
            const data = snapshot.val();
            const company = {
                name: data['name'],
                abbreviation: data['abbreviation'],
                industry: data['industry'],
                location: data['location'],
                working_hours: data['working_hours'],
            };
            setRefrenceHours(parseInt(company['working_hours']));
            setCompany(company);
        }).catch((error) => {
            console.log(error);
        });

        const remove = onValue(ref(database, 'LocationAttendance'), (snapshot) => {
            const dataArray = snapshot.val();
            var dataStructured = [];
            for (let k in dataArray) {
                if (k.slice(k.indexOf('-') + 1) !== auth.currentUser.uid)
                    continue;

                const userArray = [];
                for (let i in dataArray[k]) {
                    const attendance = {
                        "date": i,
                        "check-in": dataArray[k][i]["check-in"],
                        "check-out": dataArray[k][i]["check-out"],
                        "status": dataArray[k][i]["status"],
                        "working-hours": dataArray[k][i]["working-hours"],
                    }
                    userArray.push(attendance);
                }
                dataStructured.push(userArray)
            }
            setData(dataStructured);
            setLoading(false);
        });


        return () => { remove(); }
    }, []);

    useEffect(() => {
        let abscenceArray = [];
        let attendanceArray = [];
        let lateArray = [];


        for (var k = 0; k < data.length; k++) {

            data[k].sort((a, b) => {
                var start = toDate(a['date']),
                    end = toDate(b['date']);

                if (start !== end) {
                    if (start > end) { return 1; }
                    if (start < end) { return -1; }
                }
                return start - end;
            });

            for (var i = 0; i < data[k].length; i++) {
                let start = data[k][i]['date'];
                let end = (i + 1 === data[k].length) ? moment().format("DD-MM-YYYY") : data[k][i + 1]['date'];

                let missingDates = getDates(toDate(start), toDate(end));

                missingDates.forEach(function (date) {
                    abscenceArray.push(date);
                })

                const check_out = moment(data[k][i]["check-out"].toLowerCase(), "hh:mm A");
                const check_in = moment(data[k][i]["check-in"].toLowerCase(), "hh:mm A");
                const wrokedHours = check_out.diff(check_in, 'hours');
                const overtimeHours = refrenceHours - wrokedHours;

                let attendance = {
                    "date": toDate(start),
                    "check-in": new Date(1776, 6, 4, check_in.hours(), check_in.minutes(), 0, 0),
                    "check-out": new Date(1776, 6, 4, check_out.hours(), check_out.minutes(), 0, 0),
                    "working-hours": parseInt(data[k][i]["working-hours"].slice(0, data[k][i]["working-hours"].indexOf(' '))),
                    "overtime": overtimeHours < 0 ? overtimeHours * -1 : 0,
                }

                if (data[k][i]['status'] === "Late")
                    lateArray.push(attendance);

                attendanceArray.push(attendance);
            }
        }

        setCompanyAbscences(abscenceArray);
        setcompanyAttendance(attendanceArray);
        setcompanyLate(lateArray);
        setAbscence(abscenceArray.length);
        setAttendance(attendanceArray.length);
    }, [data, refrenceHours]);

    useEffect(() => {
        let abscences = groupBy(companyAbscences, (dt) => moment(dt).format('ddd'));
        let attendance = groupBy(companyAttendance, (dt) => moment(dt['date']).format('ddd'));
        let late = groupBy(companyLate, (dt) => moment(dt['date']).format('ddd'));

        let daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu'];
        let weekly = [];

        for (let i = 0; i < daysOfWeek.length; i++) {
            const day = daysOfWeek[i];
            const week = {
                name: `${day}`,
                Abscence: day in abscences ? abscences[day].length : 0,
                Attendance: day in attendance ? attendance[day].length : 0,
                Late: day in late ? late[day].length : 0,
            }
            weekly.push(week);
        }

        setWeeklyData(weekly)
    }, [companyAttendance, companyAbscences, companyLate]);

    // Function that parses string to date 
    const toDate = (string) => {
        const firstDash = string.indexOf("-");
        const secondDash = string.indexOf("-", firstDash + 1);
        const day = parseInt(string.slice(0, firstDash));
        const month = parseInt(string.slice(firstDash + 1, secondDash)) - 1;
        const year = parseInt(string.slice(secondDash + 1));

        return new Date(year, month, day, 0, 0, 0, 0, 0);
    }

    // Function that gets the missing dates 
    const getDates = (startDate, endDate) => {
        const dates = []
        let currentDate = startDate
        currentDate.setDate(currentDate.getDate() + 1)

        const addDays = function (days) {
            const date = new Date(this.valueOf())
            date.setDate(date.getDate() + days)
            return date
        }

        while (currentDate < endDate) {
            dates.push(currentDate)
            currentDate = addDays.call(currentDate, 1)
        }

        return dates
    }

    return (
        loading ? <ChecklyLogo /> :
            data.length <= 0 ?
                <Construction>Not enough data </Construction> :
                <Wrapper>
                    <Title>{company['abbreviation']}</Title>
                    <Subtitle>{today}</Subtitle>
                    <Container>
                        <Total
                            cell='cell1'
                            title='Total attendance'
                            labels={['Attendance', 'Abscence']}
                            data={[attendance, abscence]}
                            background={['#2CB1EF', '#C4C4C4']} />
                        <Total
                            cell='cell2'
                            title='Total abscence'
                            labels={['Abscence', 'Attendance']}
                            data={[abscence, attendance]}
                            background={['#F65786', '#C4C4C4']} />
                        <Weekly data={weeklyData} />
                        <Timeline
                            attendanceData={companyAttendance}
                            abscenceData={companyAbscences} />
                        <Worked attendanceData={companyAttendance} />
                        <CheckIn attendanceData={companyAttendance} />
                        <Overtime attendanceData={companyAttendance} />
                        <LateMinutes
                            checkInRefrence={refrenceCheckIn}
                            lateData={companyLate} />
                        <Arrival attendanceData={companyAttendance} />
                        <Departure attendanceData={companyAttendance} />
                    </Container>
                </Wrapper>
    );
}

export default Analytics;