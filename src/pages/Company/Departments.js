
import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Firebase imports
import { ref, onValue } from 'firebase/database';
import { database, auth } from '../../utilities/firebase';
// styles & icons imports
import styled from 'styled-components';
import { MdPeopleOutline } from 'react-icons/md'


/**
 * Styled Components 
 */

const SetionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 2em 8em;
`

const BoxesContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
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

const MainWrapper = styled.div`
    width: 100%;
    margin: 2em 0;
`

const MainTitle = styled.h1`
    font-size: 2em;
    font-weight: 500;
    color: #2CB1EF;
    margin: 0.25em 0;
`

const Subtitle = styled.p`
    font-size: 0.75em;
    color: #A3A1A1;
`

const AddButton = styled.button`
width: 10em;
height: 3em;
font-size: 0.7em;
font-weight: 500;
text-align :center;
color: rgba(255,255,255,0.9);
border-radius: 5em;
border: none;
background: linear-gradient(90deg, #56BBEB 0%, #58AAF3 100%);
margin-left: auto;
margin-bottom: 2em;
margin-right: 4em;
&:hover {
    background: #2CB1EF;
  }
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
    * Use ِEffects
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
        navigate('/admin/departments/edit-department', {
            state: {
                department_id: department.department_id,
                department_name: department.name,
                manager: { value: department.manager_id, label: department.manager_name }
            }
        });
    }

    return (
        <SetionWrapper>

            <MainWrapper>
                <MainTitle>Departments</MainTitle>
                <Subtitle>List of the Company's Departments</Subtitle>
            </MainWrapper>

            <AddButton onClick={() => navigate("/admin/departments/add-department")} >Add Department</AddButton>

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

        </SetionWrapper>

    );
};

export default Departments;