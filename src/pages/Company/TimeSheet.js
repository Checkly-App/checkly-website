import React, { useState, useEffect } from 'react';
import MaterialTable from '@material-table/core';
import styled from 'styled-components';
import { ref, onValue } from 'firebase/database';
import { database, auth } from '../../utilities/firebase';
import ChecklyLogo from '../ChecklyLogo';
import Pagination from '../../components/Table/Pagination';
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import { toDate } from './Dashboard';
import moment from 'moment';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    margin: 1em 4em;
`
const Backdrop = styled.div`
    background-color: white;
    border-radius: 1em;
    padding: 2em;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
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

const TimeSheet = () => {
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
                            id: i,
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
            setLoading(false);
        });

        return () => { attendanceListener(); }

    }, [employees])

    return (
        loading ? <ChecklyLogo /> :
            <Wrapper>
                <Title>Timesheets</Title>
                <Subtitle>Generate employee timesheets and export them</Subtitle>
                <Container>
                    <MaterialTable
                        components={{
                            Container: props => <Backdrop {...props} elevation={0} />,
                            Pagination: (props) => { return <Pagination {...props} />; }
                        }}
                        title=''
                        columns={columns}
                        data={data}
                        localization={{
                            pagination: {
                                labelDisplayedRows: '',
                                labelRowsPerPage: ''
                            }
                        }}
                        options={{
                            headerStyle: { fontSize: '1em', },
                            pageSize: 5,
                            pageSizeOptions: [10, 20, 50],
                            paginationType: 'stepped',
                            searchFieldVariant: 'standard',
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
                </Container>
            </Wrapper>
    );
};

export default TimeSheet;