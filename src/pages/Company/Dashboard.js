import React, { useEffect, useState, useRef } from 'react';
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
import General from '../../components/Charts/General';
import ChecklyLogo from '../ChecklyLogo';
import { groupBy } from 'lodash';
import moment from 'moment';
import { ref, onValue, get } from 'firebase/database';
import { database, auth } from '../../utilities/firebase';
import { MdCalendarToday } from 'react-icons/md';
import { HiOutlineDownload } from 'react-icons/hi';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';


export const Construction = styled.div`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`
export const Title = styled.h1`
    font-size: 2em;
    font-weight: 500;
    color: #35435E;
`
export const Subtitle = styled.h1`
    font-size: 1em;
    font-weight: 350;
    color: #A3A3A1;
`
export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;

    margin: 1em 4em;
    padding: 1em 3rem;

    @media (max-width: 768px) {
            margin: 0;
            padding: 0;
    }
`
const DateWrapper = styled.div`
    display: flex;
    width: fit-content;
    align-items: center;
    justify-items: center;
    align-self: center;
    margin-top: 1rem;
    color: #35435E;
`
const Today = styled.h1`
    font-size: 1em;
    padding: 0;
    margin: 0 0.3em;
    font-weight: 400;
    color: #A3A3A1;
`

// Function that parses string to date 
export const toDate = (string) => {
    const firstDash = string.indexOf("-");
    const secondDash = string.indexOf("-", firstDash + 1);
    const day = parseInt(string.slice(0, firstDash));
    const month = parseInt(string.slice(firstDash + 1, secondDash)) - 1;
    const year = parseInt(string.slice(secondDash + 1));

    return new Date(year, month, day, 0, 0, 0, 0, 0);
}

const Container = styled.div`
    padding: 0;
    margin: 0;
    overflow-y: hidden;
    overflow-x: hidden;
    min-height: 100vh;
    grid-template-columns: 30% 30% 30%;
    grid-template-rows: 9em 10em 20em 20em 10em 10em;
    display: grid;
    grid-template-areas:'cell0 cell01 cell02' 
                        'cell1 cell2 cell3' 
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
const Header = styled.div`
    margin: 0 2em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2em;
`
const HeaderMain = styled.div`
    display: flex;
    flex-direction: column;
`
const PDFButton = styled.button`
    background-color: rgba(60,180,255,0.25);
    color: #3CB4FF;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    padding: 0.75em 1em;
    border-radius: 0.5em;
`
const ButtonTitle = styled.p`
    padding: 0;
    margin: 0;
    color: #3CB4FF;
    font-weight: 500;
    font-size: 1em;
    margin-right: 0.5em;
`

const Dashboard = () => {
    const today = moment().format('ddd, MMMM Do')
    const [greeting, setGreeting] = useState('Good evening');
    const [company, setCompany] = useState({});
    const [data, setData] = useState([[]]);
    const [attendance, setAttendance] = useState(0);
    const [abscence, setAbscence] = useState(0);
    const [companyAbscences, setCompanyAbscences] = useState([]);
    const [companyAttendance, setcompanyAttendance] = useState([]);
    const [companyLate, setcompanyLate] = useState();
    const [refrenceHours, setRefrenceHours] = useState(6);
    const [refrenceCheckIn, setRefrenceCheckIn] = useState(new Date(1776, 6, 4, 8, 30, 0, 0));// TODO
    const [weeklyData, setWeeklyData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [departments, setDepartments] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [meetings, setMeetings] = useState([]);
    const inputRef = useRef(null);

    useEffect(() => {

        const hour = moment().hour();

        if (hour > 16)
            setGreeting("Good evening");
        else if (hour > 11)
            setGreeting("Good afternoon");
        else
            setGreeting('Good morning');


        // Get the company's settings
        get(ref(database, `Settings/${auth.currentUser.uid}`)).then((snapshot) => {
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

        // Get the company's general information
        get(ref(database, `Company/${auth.currentUser.uid}`)).then((snapshot) => {
            const data = snapshot.val();
            const company = {
                name: data['name'],
                abbreviation: data['abbreviation'],
                industry: data['industry'],
                location: data['location'],
                working_hours: data['working_hours'],
            };
            setCompany(company);
        });

        // Fetch the departments and listen for any changes
        const departmentsListener = onValue(ref(database, 'Department'), (snapshot) => {
            const data = snapshot.val();
            var departments = [];
            for (let id in data) {
                if (data[id]['company_id'] === auth.currentUser.uid) {
                    const department = {
                        department: id,
                        name: data[id]['name']
                    };
                    departments.push(department)
                }
            }
            setDepartments(departments);
        });

        // Fetch the attendance based on the company's employees
        const attendanceListener = onValue(ref(database, 'LocationAttendance'), (snapshot) => {
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


        return () => {
            departmentsListener();
            attendanceListener();
        }

    }, []);

    useEffect(() => {
        const departmentsKeys = [];

        for (let i in departments)
            departmentsKeys.push(departments[i]['department'])

        // Fetch the company's employees    
        const employeesListener = onValue(ref(database, 'Employee'), (snapshot) => {
            const data = snapshot.val();
            var employees = [];
            for (let id in data) {
                if (departmentsKeys.includes(data[id]['department'])) {  // Fetch employees of a given company
                    const employee = {
                        uid: id,
                        nationalID: data[id]['national_id'],
                        phoneNumber: data[id]['phone_number'],
                        employeeID: data[id]['employee_id'],
                        department: data[id]['department'],
                        deleted: data[id]['deleted']
                    };
                    employees.push(employee)
                }
            }
            setEmployees(employees);

            return () => { employeesListener(); }

        });
    }, [departments])

    useEffect(() => {
        const employeesKeys = [];

        for (let i in employees)
            employeesKeys.push(employees[i]['uid'])

        // Fetch the company's meetings    
        const meetingsListener = onValue(ref(database, 'Meetings'), (snapshot) => {
            const data = snapshot.val();
            var meetings = [];
            for (let id in data) {
                if (employeesKeys.includes(data[id]['host'])) {  //Fetch employees of a given company
                    const meeting = {
                        end: data[id]['datetime_end'],
                        start: data[id]['datetime_start'],
                        host: data[id]['host'],
                        type: data[id]['type'],
                    }
                    meetings.push(meeting)
                }
            }
            setMeetings(meetings);

            return () => { meetingsListener(); }

        });
    }, [employees])

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

    const printDocument = () => {
        html2canvas(inputRef.current).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            pdf.addImage(imgData, "JPEG", 0, 0, 200, 300);
            pdf.save(`${company.abbreviation}_dashboard_${moment().format('DD_MM_yyyy')}.pdf`);
        });
    };

    return (
        loading ? <ChecklyLogo /> :
            <>
                <DateWrapper>
                    <MdCalendarToday color='#A3A3A1' />
                    <Today>Today is</Today>
                    {today}
                </DateWrapper>
                <Wrapper>
                    <Header>
                        <HeaderMain>
                            <Title>{greeting}</Title>
                            <Subtitle>{company['name']} — {company['abbreviation']}</Subtitle>
                        </HeaderMain>
                        <PDFButton onClick={printDocument}>
                            <ButtonTitle>
                                Export
                            </ButtonTitle>
                            <HiOutlineDownload size={24} />
                        </PDFButton>
                    </Header>
                    {data.length <= 0 ?
                        <Construction>Not enough data </Construction> :
                        <Container ref={inputRef}>
                            <General
                                cell='cell0'
                                title='Total employees'
                                val={employees.filter(function (x) { return (x.deleted === 'false') }).length}
                                background='linear-gradient(176.93deg, #3CB4FF 5%, #4F8FF7 115%)' />
                            <General
                                cell='cell01'
                                title='Total departments'
                                val={departments.length}
                                background='linear-gradient(170deg, #7B5EFF 50%, #4D21E6 180%)' />
                            <General
                                cell='cell02'
                                title='Conducted meetings'
                                val={meetings.length}
                                background='linear-gradient(160deg, #5FD1C6 5%, #01BDB2 90%)' />
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
                    }
                </Wrapper>
            </>

    );
}

export default Dashboard;