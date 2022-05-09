import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CheckIn from '../../../components/Charts/CheckIn';
import Overtime from '../../../components/Charts/Overtime';
import Timeline from '../../../components/Charts/Timeline';
import Total from '../../../components/Charts/Total';
import Weekly from '../../../components/Charts/Weekly';
import Worked from '../../../components/Charts/Worked';
import LateMinutes from '../../../components/Charts/LateMinutes';
import Arrival from '../../../components/Charts/Arrival';
import Departure from '../../../components/Charts/Departure';
import ChecklyLogo from '../../ChecklyLogo';
import { groupBy } from 'lodash';
import moment from 'moment';
import { ref, onValue } from 'firebase/database';
import { database, auth } from '../../../utilities/firebase';
import { getDates, toDate } from '../Dashboard';


const Container = styled.div`
    padding: 0;
    margin: 0;
    overflow-y: hidden;
    overflow-x: hidden;
    min-height: 100vh;
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
            grid-template-rows: repeat(3, 5%) repeat(2, 5%) 15% repeat(5, 10%) repeat(2, 5%);
            grid-template-areas:'cell0' 'cell01' 'cell02' 
                                'cell1' 'cell2' 'cell3' 
                                'cell4' 'cell5' 'cell6' 
                                'cell7' 'cell8' 'cell9' 
                                'cell10';
    }
`

const EmployeeStatistics = (props) => {
    const [data, setData] = useState([[]]);
    const [attendance, setAttendance] = useState(0);
    const [abscence, setAbscence] = useState(0);
    const [companyAbscences, setCompanyAbscences] = useState([]);
    const [companyAttendance, setcompanyAttendance] = useState([]);
    const [companyLate, setcompanyLate] = useState();
    const [refrenceHours, setRefrenceHours] = useState(6);
    const [refrenceCheckIn, setRefrenceCheckIn] = useState(new Date(1776, 6, 4, 8, 30, 0, 0));
    const [weeklyData, setWeeklyData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        // Fetch the company's settings
        const settingsListener = onValue(ref(database, `Settings/${auth.currentUser.uid}`), (snapshot) => {
            const data = snapshot.val();

            const settings = {
                check_in: data['check_in'],
                check_out: data['check_out'],
                working_hours: data['working_hours'],
            };

            const times = settings['check_in'].split(':')
            setRefrenceCheckIn(new Date(1776, 6, 4, parseInt(times[0], 10), parseInt(times[1])));
            setRefrenceHours(parseInt(settings['working_hours']));
        });

        // Fetch the attendance based on the employee's id
        const attendanceListener = onValue(ref(database, 'LocationAttendance'), (snapshot) => {
            const dataArray = snapshot.val();
            var dataStructured = [];
            for (let k in dataArray) {
                if (k !== `emp${props.uid}-Attendance`) // look for the employee's node
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
                    if (attendance['check-out'] === 'TBD') //if employee has not checked-out do not include it in the analytics
                        continue;

                    userArray.push(attendance);

                }
                dataStructured.push(userArray)
            }
            setData(dataStructured);
            setLoading(false);
        });

        return () => {
            attendanceListener();
            settingsListener();
        }

    }, [props.uid]);

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

        return () => {
            setCompanyAbscences();
            setcompanyAttendance();
            setcompanyLate();
            setAbscence();
            setAttendance();
        }
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

        return () => {
            setWeeklyData();
        }

    }, [companyAttendance, companyAbscences, companyLate]);

    return (
        loading ? <ChecklyLogo /> :
            <Container >
                <Total
                    cell='cell1'
                    title='Total attendance'
                    labels={['Attendance', 'Abscence']}
                    data={[attendance, abscence]}
                    background={['#3CB4FF', '#EEE']} />
                <Total
                    cell='cell2'
                    title='Total abscence'
                    labels={['Abscence', 'Attendance']}
                    data={[abscence, attendance]}
                    background={['#F65786', '#EEE']} />
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
    );
};

export default EmployeeStatistics;