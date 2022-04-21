import React, { useState, useEffect } from 'react';
import MaterialTable, { MTableToolbar } from '@material-table/core';
import styled from 'styled-components';
import { ref, onValue } from 'firebase/database';
import { database, auth } from '../../utilities/firebase';
import ChecklyLogo from '../ChecklyLogo';
import Pagination from '../../components/Table/Pagination';
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import { Subtitle, Title, toDate, Wrapper } from './Dashboard';
import moment from 'moment';
import { Formik, Form } from 'formik';
import DateRangeField from '../../components/Forms/DateRange';
import { v4 as uuidv4 } from 'uuid';
import { MdCalendarToday } from 'react-icons/md';
import { IoMdArrowDropdown } from 'react-icons/io';


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

const Backdrop = styled.div`
    margin-top: 1em;
    background-color: white;
    border-radius: 1em;
    padding: 1em;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
`
const Button = styled.button`
    width: fit-content;
    height: 100%;
    font-size: 1em;
    font-weight: 500;
    text-align :center;
    color: rgba(255,255,255,0.9);
    border-radius: 0.5em;
    border: none;
    background: linear-gradient(90deg, #56BBEB 0%, #58AAF3 100%);
    margin-left: auto;

`
const FormContainer = styled.div`
    display: grid;
    grid-template-columns: 2fr 2fr 1fr;
    column-gap: 2.5em;
    row-gap: 0.75em;
`
const HeaderSubtitle = styled.p`
    font-weight: 400;
    font-size: 1em;
    color: #3CB4FF;
    padding: 0 1.5em;
`
const Toolbar = styled(MTableToolbar)`
    padding: 0;
    margin: 0;
    align-items: flex-end;
`
const TimeSheet = () => {
    const [unfiltered, setUnfiltered] = useState([]);
    const [data, setData] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    const columns = [
        { title: 'Date', field: 'date', type: 'date' },
        { title: 'Name', field: 'name', sorting: false },
        { title: 'Employee ID', field: 'employeeid' },
        { title: 'Department', field: 'department', sorting: false },
        { title: 'Check-in', field: 'checkin', type: 'time' },
        { title: 'Check-out', field: 'checkout', type: 'time' },
        { title: 'Work hours', field: 'workhours', type: 'numeric', render: rowData => `${rowData.workhours}h` },
    ];

    const initialValues = {
        start: null,
        end: null,
    };

    useEffect(() => {
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

        return () => { departmentsListener(); }

    }, []);

    useEffect(() => {
        const departmentsKeys = [];

        for (let i in departments)
            departmentsKeys.push(departments[i]['department']);

        // Fetch the company's employees    
        const employeesListener = onValue(ref(database, 'Employee'), (snapshot) => {
            const data = snapshot.val();
            var employees = [];
            for (let id in data) {
                if (departmentsKeys.includes(data[id]['department'])) {  // Fetch employees of a given company
                    const employee = {
                        uid: id,
                        name: data[id]['name'],
                        nationalID: data[id]['national_id'],
                        phoneNumber: data[id]['phone_number'],
                        employeeID: data[id]['employee_id'],
                        department: data[id]['department'],
                    };
                    employees.push(employee)
                }
            }
            setEmployees(employees);
            console.log(employees)

            return () => { employeesListener(); }

        });
    }, [departments])

    useEffect(() => {
        const employeesIds = [];

        for (let i in employees)
            employeesIds.push(employees[i]['uid']);

        // Fetch the attendance based on the company's employees
        const attendanceListener = onValue(ref(database, 'LocationAttendance'), (snapshot) => {
            const dataArray = snapshot.val();
            var dataStructured = [];
            for (let k in dataArray) {
                const uid = k.slice(0, k.indexOf('-'));
                var userArray = [];
                if (employeesIds.includes(uid)) {
                    for (let i in dataArray[k]) {
                        const check_out = moment(dataArray[k][i]["check-out"].toLowerCase(), "hh:mm A");
                        const check_in = moment(dataArray[k][i]["check-in"].toLowerCase(), "hh:mm A");

                        let name, employee_id, department_id, department_name;

                        employees.forEach(employee => {
                            if (employee['uid'] === uid) {
                                name = employee['name'];
                                employee_id = employee['employeeID'];
                                department_id = employee['department'];
                            }
                        });

                        departments.forEach(department => {
                            if (department['department'] === department_id)
                                department_name = department['name'];
                        });

                        const attendance = {
                            id: uuidv4(),
                            date: toDate(i),
                            name: name,
                            employeeid: employee_id,
                            department: department_name,
                            checkin: new Date(1776, 6, 4, check_in.hours(), check_in.minutes()),
                            checkout: new Date(1776, 6, 4, check_out.hours(), check_out.minutes()),
                            workhours: parseInt(dataArray[k][i]["working-hours"].slice(0, dataArray[k][i]["working-hours"].indexOf(' '))),
                        }
                        userArray.push(attendance);
                    }
                }
                dataStructured.push(...userArray);
                console.log(dataStructured)
            }
            setData(dataStructured);
            setUnfiltered(dataStructured);
            setLoading(false);
        });

        return () => { attendanceListener(); }

    }, [employees])

    return (
        loading ? <ChecklyLogo /> :
            <>
                <DateWrapper>
                    <MdCalendarToday color='#A3A3A1' />
                    <Today>from</Today>
                    12 may 2022
                    <Today>to</Today>
                    10 may2022
                    <IoMdArrowDropdown />
                </DateWrapper>
                <Wrapper>
                    <Title>Timesheets</Title>
                    <Subtitle>Generate employee timesheets and export them</Subtitle>
                    <MaterialTable
                        components={{
                            Container: props => <Backdrop {...props} elevation={0} />,
                            Pagination: (props) => <Pagination {...props} />,
                            Toolbar: (props) => (
                                <>
                                    <Toolbar {...props} />
                                    <HeaderSubtitle>20 May, 2020 to 13 Jun, 2020</HeaderSubtitle>
                                </>

                                // <>
                                //     

                                //     <Formik
                                //         initialValues={{ ...initialValues }}
                                //         onSubmit={(values) => {
                                //             const filtered = unfiltered.filter(attendance => values.start <= attendance.date && attendance.date <= values.end);
                                //             setData(filtered)
                                //         }}>
                                //         <Form>
                                //             <FormContainer>
                                //                 <DateRangeField
                                //                     name='start'
                                //                     id='start'
                                //                     label='Start' />
                                //                 <DateRangeField
                                //                     name='end'
                                //                     id='end'
                                //                     label='End' />
                                //                 <Button type='submit'> Search </Button>
                                //             </FormContainer>
                                //         </Form>
                                //     </Formik>
                                // </>
                            ),
                        }}
                        title='Employees sheets'
                        columns={columns}
                        data={data}
                        localization={{
                            pagination: {
                                labelDisplayedRows: '',
                                labelRowsPerPage: ''
                            }
                        }}
                        options={{
                            headerStyle: { fontSize: '0.8em', fontWeight: 'bold', color: '#35435E' },
                            rowStyle: { fontSize: '0.9em' },
                            searchFieldStyle: { marginRight: '1em' },
                            pageSize: 7,
                            pageSizeOptions: [10, 20, 50],
                            paginationType: 'stepped',
                            searchFieldVariant: 'standard',
                            searchFieldAlignment: 'right',
                            exportButton: true,
                            exportAllData: true,
                            exportMenu: [{
                                label: 'Export to PDF',
                                exportFunc: (cols, datas) => ExportPdf(cols, datas, 'attendance_time_sheet')
                            }, {
                                label: 'Export to CSV',
                                exportFunc: (cols, datas) => ExportCsv(cols, datas, 'attendance_time_sheet')
                            }]
                        }}
                    />
                </Wrapper>
            </>
    );
};

export default TimeSheet;