
import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Firebase imports
import { ref, onValue } from 'firebase/database';
import { database, auth } from '../../../utilities/firebase';
// styles & icons imports
import styled from 'styled-components';
import { MdPeopleOutline } from 'react-icons/md'
import { Subtitle, Title, Wrapper } from '../Dashboard';
import { Header, MainWrapper } from '../Employee/AddLayout';


/**
 * Styled Components 
 */
const BoxesContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-top: 1em;
`

const Box = styled.div`
    position: relative;
    background-color: white;
    width: 270px;
    height: 200px;
    border-radius: 0.75em;
    padding: 1em;
    margin-bottom: 1.5em;
    margin-right: 2.4em;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    &:hover {
        background: #F6FCFF;
      }
`

const DepartmentName = styled.p`
    font-size: 1.2em;
    font-weight: 500;
    color: #2CB1EF;
    margin: 0.1em 0;
`

const AddButton = styled.button`
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

const SmallText = styled.p`
    float: right;
    display: inline;
    font-size: 1.2em;
    color: #A3A1A1;
`

const Container = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    margin-right: 1em;
`

const SmallIcon = styled.div`
    color: #A3A1A1;
    float: right;
    display: absolute;
    margin-right: 0.3em;
`

const LoadingNote = styled.div`
    margin-top: 5em;
    font-size: 1.5em;
    color: #A3A1A1;
    text-align: center;
`

const Departments = () => {

    /**
    * Use States
    */

    const [companyDepartments, setCompanyDepartments] = useState([{
        department: '',
        name: '',
        manager_id: ''
    }]);

    const [companyEmployees, setCompanyEmployees] = useState([{
        uid: '',
        department: '',
        name: '',
    }]);

    const [updatedCompanyDepartments, setUpdatedCompanyDepartments] = useState([{
        department_id: '',
        name: '',
        manager_id: '',
        manager_name: '',
        employees_count: 0,
    }])

    // to navigate to 'Add Department' & 'Edit Department'
    const navigate = useNavigate();

    /**
    * Use ??Effects
    */

    // Fetch departments of the logged-in company
    useEffect(() => {

        onValue(ref(database, 'Department'), (snapshot) => {
            const data = snapshot.val();
            var departments = [];
            for (let id in data) {
                if (data[id]['company_id'] === auth.currentUser.uid) {
                    const department = {
                        department: id,
                        name: data[id]['name'],
                        manager_id: data[id]['manager']
                    };
                    departments.push(department)
                }
            }
            setCompanyDepartments(departments);
        });
        return () => {
            setCompanyDepartments([]);
        }
    }, []);

    // Fetch employees of the logged-in company
    useEffect(() => {
        const departmentsKeys = [];
        for (let i in companyDepartments)
            departmentsKeys.push(companyDepartments[i]['department'])

        onValue(ref(database, 'Employee'), (snapshot) => {
            const data = snapshot.val();
            var employees = [];
            for (let id in data) {
                if (departmentsKeys.includes(data[id]['department']) && data[id]['deleted'] === 'false') {
                    const employee = {
                        uid: id,
                        department: data[id]['department'],
                        name: data[id]['name'],
                    };
                    employees.push(employee)
                }
            }
            setCompanyEmployees(employees);
        });
    }, [companyDepartments])

    // Update Departments Array to include managers names
    useEffect(() => {
        var updatedDepartments = [];
        for (let i in companyDepartments) {
            for (let j in companyEmployees) {
                if (companyDepartments[i].manager_id === companyEmployees[j].uid) {
                    const department = {
                        department_id: companyDepartments[i].department,
                        name: companyDepartments[i].name,
                        manager_id: companyEmployees[j].uid,
                        manager_name: companyEmployees[j].name,
                        employees_count: 0
                    };
                    updatedDepartments.push(department)
                }
            }
        }
        // count employees in each department
        for (let i in updatedDepartments) {
            for (let j in companyEmployees) {
                if (updatedDepartments[i].department_id === companyEmployees[j].department) {
                    updatedDepartments[i].employees_count = updatedDepartments[i].employees_count + 1;
                }
            }
        }
        setUpdatedCompanyDepartments(updatedDepartments);
    }, [companyDepartments, companyEmployees])

    // Navigate to Edit Department and pass dep info
    const toEditDepartment = (department) => {
        navigate('/admin/departments/edit', {
            state: {
                department_id: department.department_id,
                department_name: department.name,
                manager: { value: department.manager_id, label: department.manager_name }
            }
        });
    }

    return (
        <Wrapper>
            <Header>
                <MainWrapper>
                    <Title>Departments</Title>
                    <Subtitle>List of the Company's Departments</Subtitle>
                </MainWrapper>
                <AddButton onClick={() => navigate("/admin/departments/add")} >Add Department</AddButton>
            </Header>

            {updatedCompanyDepartments.length ?
                <BoxesContainer>
                    {updatedCompanyDepartments.map((department) => (
                        <Box onClick={() => toEditDepartment(department)} key={department.department_id}>
                            <DepartmentName>
                                {department.name} Department
                            </DepartmentName>
                            <Subtitle>
                                Managed By: {department.manager_name}
                            </Subtitle>
                            {department.employees_count === 0 ?
                                <Container>
                                    <SmallText>1</SmallText>
                                    <SmallIcon>
                                        <MdPeopleOutline size={22} />
                                    </SmallIcon>
                                </Container> :
                                <Container>
                                    <SmallText>{department.employees_count}</SmallText>
                                    <SmallIcon>
                                        <MdPeopleOutline size={22} />
                                    </SmallIcon>
                                </Container>}
                        </Box>
                    ))}

                </BoxesContainer>
                : <LoadingNote>No Departments..Start By adding one!</LoadingNote>
            }

        </Wrapper>
    );
};

export default Departments;