import React, { useState, useEffect } from 'react';
import MaterialTable from '@material-table/core'; import styled from 'styled-components';
import { ref, onValue } from 'firebase/database';
import { database, auth } from '../../utilities/firebase';
import ChecklyLogo from '../ChecklyLogo';
import { ExportCsv, ExportPdf } from '@material-table/exporters';

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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const remove = onValue(ref(database, 'Department'), (snapshot) => {
            const departments = snapshot.val();
            var dataArray = [];
            for (let depId in departments) { // for every department of the company
                if (departments[depId]['company_id'] === auth.currentUser.uid) {
                    onValue(ref(database, 'Employee'), (snapshot) => { // for every employee of that department
                        const employees = snapshot.val();
                        for (let employeId in employees) {
                            if (employees[employeId]['department'] === depId) {  // Fetch employees of a given company
                                onValue(ref(database, 'LocationAttendance'), (snapshot) => {
                                    const attendances = snapshot.val();
                                    for (let attendanceId in attendances) {
                                        if (attendanceId.slice(0, attendanceId.indexOf('-')) === employeId) {
                                            for (let i in attendances[attendanceId]) {
                                                const attendance = {
                                                    id: i,
                                                    date: i,
                                                    name: employees[employeId]['name'],
                                                    employeeid: employees[employeId]['employee_id'],
                                                    department: departments[depId]['name'],
                                                    checkin: attendances[attendanceId][i]["check-in"],
                                                    checkout: attendances[attendanceId][i]["check-out"],
                                                    workhours: attendances[attendanceId][i]["working-hours"],
                                                }
                                                dataArray.push(attendance);
                                            }
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
            }
            setData(dataArray);
            setLoading(false);
        });

        return () => { remove(); }

    }, []);

    const columns = [
        { title: 'Date', field: 'date', type: 'date', dateSetting: { locale: 'MMM dd yyyy' } },
        { title: 'Name', field: 'name', sorting: false },
        { title: 'Employee ID', field: 'employeeid' },
        { title: 'Department', field: 'department', sorting: false },
        { title: 'Check-in', field: 'checkin', type: 'time' },
        { title: 'Check-out', field: 'checkout', type: 'time' },
        { title: 'Work hours', field: 'workhours', type: 'numeric' },
    ]

    return (
        loading ? <ChecklyLogo /> :
            <Wrapper>
                <Title>Timesheets</Title>
                <Subtitle>Generate employee timesheets and export them</Subtitle>
                <Container>
                    <MaterialTable
                        components={{
                            Container: props => <Backdrop {...props} elevation={0} />
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
                            pageSize: 10,
                            pageSizeOptions: [10, 20, 50],
                            paginationType: 'stepped',
                            // searchFieldStyle: { minWidth: '100%', margin: '10em' },
                            searchFieldVariant: 'standard',
                            exportButton: true,
                            exportAllData: true,
                            // showTitle: false,
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